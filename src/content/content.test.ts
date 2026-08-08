import { beforeAll, describe, expect, it } from 'vitest'
import { PHASES } from './phases'
import { getLessonBody, loadAllLessons, PHASES_WITH_LESSONS } from './lessons'
import { getVisual } from '@/components/visuals'
import type { Block } from './blocks'
import type { Loc, LocList } from '@/i18n/types'

/**
 * The curriculum is 93 lessons of hand-written bilingual data. Nothing in the
 * type system stops an Arabic string from being blank, a table row from being a
 * cell short, or a quiz from having two right answers — so it is checked here.
 */

beforeAll(async () => {
  await loadAllLessons()
})

// ---------------------------------------------------------------- helpers

function locProblems(label: string, value: Loc | undefined): string[] {
  if (!value) return [`${label} is missing`]
  const out: string[] = []
  if (!value.en?.trim()) out.push(`${label}.en is empty`)
  if (!value.ar?.trim()) out.push(`${label}.ar is empty`)
  return out
}

function locListProblems(label: string, value: LocList | undefined): string[] {
  if (!value?.en || !value.ar) return [`${label} is missing`]
  const out: string[] = []
  if (value.en.length !== value.ar.length)
    out.push(`${label} length mismatch: en=${value.en.length} ar=${value.ar.length}`)
  if (value.en.length === 0) out.push(`${label} is empty`)
  value.en.forEach((s, i) => !s.trim() && out.push(`${label}.en[${i}] is empty`))
  value.ar.forEach((s, i) => !s.trim() && out.push(`${label}.ar[${i}] is empty`))
  return out
}

/** Every way a single block can be malformed, as human-readable strings. */
function blockProblems(block: Block, i: number): string[] {
  const at = `block[${i}] (${block.type})`
  const out: string[] = []

  switch (block.type) {
    case 'heading':
    case 'text':
      out.push(...locProblems(`${at}.text`, block.text))
      break

    case 'list':
    case 'keypoints':
      out.push(...locListProblems(`${at}.items`, block.items))
      break

    case 'code': {
      if (!block.code.trim()) out.push(`${at}.code is empty`)
      if (block.caption) out.push(...locProblems(`${at}.caption`, block.caption))
      const lines = block.code.split('\n').length
      for (const h of block.highlight ?? [])
        if (h < 1 || h > lines) out.push(`${at}.highlight ${h} outside 1..${lines}`)
      break
    }

    case 'callout':
      if (block.title) out.push(...locProblems(`${at}.title`, block.title))
      out.push(...locProblems(`${at}.body`, block.body))
      break

    case 'compare':
      if (!block.bad.code.trim()) out.push(`${at}.bad.code is empty`)
      if (!block.good.code.trim()) out.push(`${at}.good.code is empty`)
      if (block.bad.label) out.push(...locProblems(`${at}.bad.label`, block.bad.label))
      if (block.good.label) out.push(...locProblems(`${at}.good.label`, block.good.label))
      if (block.note) out.push(...locProblems(`${at}.note`, block.note))
      break

    case 'table': {
      // A leading blank corner cell is intentional in comparison tables, so only
      // head[0] may be empty.
      if (!block.head?.en || !block.head.ar) {
        out.push(`${at}.head is missing`)
        break
      }
      if (block.head.en.length !== block.head.ar.length)
        out.push(`${at}.head length mismatch`)
      block.head.en.forEach((s, c) => c > 0 && !s.trim() && out.push(`${at}.head.en[${c}] is empty`))
      block.head.ar.forEach((s, c) => c > 0 && !s.trim() && out.push(`${at}.head.ar[${c}] is empty`))

      const cols = block.head.en.length
      if (block.rows.length === 0) out.push(`${at} has no rows`)
      block.rows.forEach((row, r) => {
        out.push(...locListProblems(`${at}.rows[${r}]`, row))
        if (row.en?.length !== cols)
          out.push(`${at}.rows[${r}].en has ${row.en?.length} cells, head has ${cols}`)
        if (row.ar?.length !== cols)
          out.push(`${at}.rows[${r}].ar has ${row.ar?.length} cells, head has ${cols}`)
      })
      break
    }

    case 'steps':
      if (!block.steps.length) out.push(`${at} has no steps`)
      block.steps.forEach((s, n) => {
        out.push(...locProblems(`${at}.steps[${n}].title`, s.title))
        out.push(...locProblems(`${at}.steps[${n}].body`, s.body))
      })
      break

    case 'quiz': {
      out.push(...locProblems(`${at}.question`, block.question))
      out.push(...locProblems(`${at}.explain`, block.explain))
      block.options.forEach((o, n) => out.push(...locProblems(`${at}.options[${n}].text`, o.text)))
      if (block.options.length < 2) out.push(`${at} needs at least 2 options`)
      const correct = block.options.filter((o) => o.correct).length
      if (correct !== 1) out.push(`${at} has ${correct} correct options, expected exactly 1`)
      break
    }

    case 'playground':
      if (!block.code.trim()) out.push(`${at}.code is empty`)
      if (block.caption) out.push(...locProblems(`${at}.caption`, block.caption))
      break

    case 'visual':
      if (!getVisual(block.name)) out.push(`${at} references unknown visual "${block.name}"`)
      if (block.caption) out.push(...locProblems(`${at}.caption`, block.caption))
      break
  }

  return out
}

const declaredKeys = PHASES.flatMap((p) => p.lessons.map((l) => `${p.slug}/${l.slug}`))

/** Shape a lesson module's exported array is checked against before use. */
interface LessonBodyish {
  id: string
  blocks: Block[]
}

// ---------------------------------------------------------------- structure

describe('curriculum structure', () => {
  it('numbers phases 1..N in array order', () => {
    expect(PHASES.map((p) => p.id)).toEqual(PHASES.map((_, i) => i + 1))
  })

  it('has a unique slug per phase', () => {
    const slugs = PHASES.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has a unique lesson key per lesson', () => {
    expect(new Set(declaredKeys).size).toBe(declaredKeys.length)
  })

  it('has a lesson loader registered for every phase', () => {
    expect([...PHASES_WITH_LESSONS].sort()).toEqual(PHASES.map((p) => p.slug).sort())
  })

  it('gives every lesson a positive duration', () => {
    const bad = PHASES.flatMap((p) =>
      p.lessons.filter((l) => !(l.minutes > 0)).map((l) => `${p.slug}/${l.slug}`),
    )
    expect(bad).toEqual([])
  })

  it('writes a body for every declared lesson, and declares every written body', () => {
    const missing = declaredKeys.filter((k) => !getLessonBody(k))
    expect(missing).toEqual([])
  })
})

// ---------------------------------------------------------------- metadata

describe.each(PHASES)('phase $id — $slug', (phase) => {
  it('is fully bilingual', () => {
    expect([
      ...locProblems('title', phase.title),
      ...locProblems('tagline', phase.tagline),
      ...locProblems('description', phase.description),
      ...locListProblems('outcomes', phase.outcomes),
      ...locProblems('project.title', phase.project.title),
      ...locProblems('project.brief', phase.project.brief),
    ]).toEqual([])
  })

  it('links only to absolute resource URLs', () => {
    const bad = phase.resources.filter((r) => !r.label.trim() || !/^https?:\/\//.test(r.url))
    expect(bad).toEqual([])
  })

  it('gives every lesson a bilingual title and summary', () => {
    const problems = phase.lessons.flatMap((l) => [
      ...locProblems(`${l.slug}.title`, l.title),
      ...locProblems(`${l.slug}.summary`, l.summary),
    ])
    expect(problems).toEqual([])
  })
})

// ---------------------------------------------------------------- bodies

describe('lesson bodies', () => {
  it.each(declaredKeys)('%s is well-formed', (key) => {
    const body = getLessonBody(key)
    expect(body, `no body written for ${key}`).toBeDefined()
    expect(body!.blocks.length, `${key} has no blocks`).toBeGreaterThan(0)
    expect(body!.blocks.flatMap(blockProblems)).toEqual([])
  })

  it('has no orphan or duplicate body, and files it under the phase its id names', async () => {
    // Read the phase files directly rather than through the loader, so a body
    // that no phase declares still shows up here.
    const modules = import.meta.glob<Record<string, unknown>>('./lessons/*.ts')
    const declared = new Set(declaredKeys)
    const seen = new Set<string>()
    const orphans: string[] = []
    const duplicates: string[] = []
    const misfiled: string[] = []

    for (const [path, load] of Object.entries(modules)) {
      const file = path.replace('./lessons/', '').replace('.ts', '')
      if (file === 'index') continue

      const mod = await load()
      const bodies = Object.values(mod).find(
        (v): v is LessonBodyish[] => Array.isArray(v) && typeof v[0]?.id === 'string',
      )
      expect(bodies, `${path} exports no lesson array`).toBeDefined()

      for (const body of bodies!) {
        if (seen.has(body.id)) duplicates.push(body.id)
        seen.add(body.id)
        if (!declared.has(body.id)) orphans.push(body.id)
        if (!body.id.startsWith(`${file}/`)) misfiled.push(`${body.id} lives in ${file}.ts`)
      }
    }

    expect({ orphans, duplicates, misfiled }).toEqual({
      orphans: [],
      duplicates: [],
      misfiled: [],
    })
    expect(seen.size).toBe(declaredKeys.length)
  })

  it('keeps every lesson to the house standard: one quiz and one keypoints block', () => {
    const offenders = declaredKeys.filter((key) => {
      const blocks = getLessonBody(key)?.blocks ?? []
      return (
        blocks.filter((b) => b.type === 'quiz').length !== 1 ||
        blocks.filter((b) => b.type === 'keypoints').length !== 1
      )
    })
    expect(offenders).toEqual([])
  })
})

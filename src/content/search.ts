import { PHASES } from './phases'
import { getLessonBody, loadAllLessons } from './lessons'
import type { Block } from './blocks'
import type { Lang } from '@/i18n/types'

export interface SearchHit {
  type: 'phase' | 'lesson'
  path: string
  phaseId: number
  phaseSlug: string
  phaseIcon: string
  accent: string
  title: Record<Lang, string>
  subtitle: Record<Lang, string>
  /** Lower-cased haystack per language. */
  haystack: Record<Lang, string>
}

function normalise(value: string): string {
  return value
    .toLowerCase()
    // strip Arabic diacritics and normalise alef variants so "احترافي" matches "إحترافي"
    .replace(/[ً-ْٰ]/g, '')
    .replace(/[إأآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
}

/** Flat, pre-normalised index built once at module load. */
export const SEARCH_INDEX: SearchHit[] = PHASES.flatMap((phase) => {
  const phaseHit: SearchHit = {
    type: 'phase',
    path: `/phase/${phase.slug}`,
    phaseId: phase.id,
    phaseSlug: phase.slug,
    phaseIcon: phase.icon,
    accent: phase.accent,
    title: phase.title,
    subtitle: phase.tagline,
    haystack: {
      en: normalise([phase.title.en, phase.tagline.en, phase.description.en].join(' ')),
      ar: normalise([phase.title.ar, phase.tagline.ar, phase.description.ar].join(' ')),
    },
  }

  // Indexed from metadata only, so the search box costs nothing at load time —
  // lesson bodies live in per-phase chunks fetched on demand.
  const lessonHits: SearchHit[] = phase.lessons.map((lesson) => {
    return {
      type: 'lesson',
      path: `/phase/${phase.slug}/${lesson.slug}`,
      phaseId: phase.id,
      phaseSlug: phase.slug,
      phaseIcon: phase.icon,
      accent: phase.accent,
      title: lesson.title,
      subtitle: lesson.summary,
      haystack: {
        en: normalise(
          [lesson.title.en, lesson.summary.en, (lesson.tags ?? []).join(' '), phase.title.en].join(
            ' ',
          ),
        ),
        ar: normalise(
          [lesson.title.ar, lesson.summary.ar, (lesson.tags ?? []).join(' '), phase.title.ar].join(
            ' ',
          ),
        ),
      },
    }
  })

  return [phaseHit, ...lessonHits]
})

/**
 * Prose from a lesson body, per language — headings, paragraphs, callouts and
 * bullet points. Code and quiz options are skipped: they add bulk without
 * making the results any better.
 */
function bodyText(blocks: Block[], lang: Lang): string {
  let out = ''
  for (const block of blocks) {
    switch (block.type) {
      case 'heading':
      case 'text':
        out += ' ' + block.text[lang]
        break
      case 'callout':
        out += ' ' + block.body[lang]
        break
      case 'list':
      case 'keypoints':
        out += ' ' + block.items[lang].join(' ')
        break
      case 'steps':
        for (const step of block.steps) out += ' ' + step.title[lang] + ' ' + step.body[lang]
        break
    }
  }
  return out
}

let deepened = false
let deepening: Promise<void> | null = null

export function isSearchDeep(): boolean {
  return deepened
}

/**
 * Upgrade the index from titles-and-summaries to full lesson prose. Costs every
 * phase chunk, so it is triggered by opening the search box rather than at load:
 * results appear instantly from metadata and sharpen a moment later.
 */
export function deepenSearchIndex(): Promise<void> {
  if (deepened) return Promise.resolve()
  if (deepening) return deepening

  deepening = loadAllLessons()
    .then(() => {
      for (const hit of SEARCH_INDEX) {
        if (hit.type !== 'lesson') continue
        const body = getLessonBody(hit.path.replace('/phase/', ''))
        if (!body) continue
        hit.haystack.en += ' ' + normalise(bodyText(body.blocks, 'en'))
        hit.haystack.ar += ' ' + normalise(bodyText(body.blocks, 'ar'))
      }
      deepened = true
    })
    .finally(() => {
      deepening = null
    })

  return deepening
}

/** Ranked search across both languages, so English keywords work in Arabic mode. */
export function searchContent(query: string, lang: Lang, limit = 12): SearchHit[] {
  const q = normalise(query.trim())
  if (q.length < 2) return []

  const terms = q.split(/\s+/)
  const scored: { hit: SearchHit; score: number }[] = []

  for (const hit of SEARCH_INDEX) {
    const primary = hit.haystack[lang]
    const other = hit.haystack[lang === 'en' ? 'ar' : 'en']
    const title = normalise(hit.title[lang])

    let score = 0
    for (const term of terms) {
      if (title.startsWith(term)) score += 12
      else if (title.includes(term)) score += 8
      else if (primary.includes(term)) score += 3
      else if (other.includes(term)) score += 2
      else {
        score = 0
        break
      }
    }

    if (score > 0) {
      if (hit.type === 'lesson') score += 1
      scored.push({ hit, score })
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.hit.phaseId - b.hit.phaseId)
    .slice(0, limit)
    .map((s) => s.hit)
}

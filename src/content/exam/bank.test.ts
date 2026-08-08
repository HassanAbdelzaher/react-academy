import { describe, expect, it } from 'vitest'
import { beginnerBank } from './beginner'
import { intermediateBank } from './intermediate'
import { advancedBank } from './advanced'
import { proBank } from './pro'
import { QUESTIONS_PER_EXAM, TARGET_BANK_SIZE, type ExamQuestion, type ExamLevel } from './types'
import { PHASES } from '@/content/phases'
import { buildPaper, scorePaper, seededRng } from '@/lib/exam'
import type { Loc } from '@/i18n/types'

const BANKS: { level: ExamLevel; questions: ExamQuestion[] }[] = [
  { level: 'beginner', questions: beginnerBank },
  { level: 'intermediate', questions: intermediateBank },
  { level: 'advanced', questions: advancedBank },
  { level: 'pro', questions: proBank },
]

const ALL = BANKS.flatMap((b) => b.questions)

function locProblems(label: string, value: Loc | undefined): string[] {
  if (!value) return [`${label} is missing`]
  const out: string[] = []
  if (!value.en?.trim()) out.push(`${label}.en is empty`)
  if (!value.ar?.trim()) out.push(`${label}.ar is empty`)
  return out
}

describe('exam banks', () => {
  it('gives every question a unique id across all levels', () => {
    const ids = ALL.map((q) => q.id)
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(duplicates).toEqual([])
  })

  it('never repeats the same question text', () => {
    const seen = new Map<string, string>()
    const duplicates: string[] = []
    for (const q of ALL) {
      const key = q.question.en.trim().toLowerCase()
      const first = seen.get(key)
      if (first) duplicates.push(`${q.id} repeats ${first}`)
      else seen.set(key, q.id)
    }
    expect(duplicates).toEqual([])
  })

  it.each(BANKS)('$level questions are well-formed', ({ level, questions }) => {
    const levelPhases = new Set(PHASES.filter((p) => p.level === level).map((p) => p.slug))
    const problems: string[] = []

    for (const q of questions) {
      problems.push(...locProblems(`${q.id}.question`, q.question))
      problems.push(...locProblems(`${q.id}.explain`, q.explain))

      if (!levelPhases.has(q.phase))
        problems.push(`${q.id} names phase "${q.phase}", which is not a ${level} phase`)

      if (q.options.length < 2) problems.push(`${q.id} has fewer than 2 options`)

      const correct = q.options.filter((o) => o.correct).length
      if (correct !== 1) problems.push(`${q.id} has ${correct} correct options, expected exactly 1`)

      q.options.forEach((o, i) => problems.push(...locProblems(`${q.id}.options[${i}].text`, o.text)))

      // Two identical options make the question unanswerable. Compared
      // case-sensitively on purpose: options like `onchange` and `onChange` are
      // genuinely different answers, and telling them apart is the question.
      const texts = q.options.map((o) => o.text.en.trim())
      if (new Set(texts).size !== texts.length) problems.push(`${q.id} has duplicate options`)
    }

    expect(problems).toEqual([])
  })

  it('has a beginner bank at full target size', () => {
    expect(beginnerBank.length).toBeGreaterThanOrEqual(TARGET_BANK_SIZE)
  })

  it('draws beginner questions from all three beginner phases', () => {
    const covered = new Set(beginnerBank.map((q) => q.phase))
    const expected = PHASES.filter((p) => p.level === 'beginner').map((p) => p.slug)
    expect([...covered].sort()).toEqual(expected.sort())
  })

  it('keeps every beginner phase above the per-sitting draw, so no phase is token', () => {
    const counts = new Map<string, number>()
    for (const q of beginnerBank) counts.set(q.phase, (counts.get(q.phase) ?? 0) + 1)
    const thin = [...counts.entries()].filter(([, n]) => n < QUESTIONS_PER_EXAM)
    expect(thin).toEqual([])
  })
})

describe('a real sitting', () => {
  it('draws a full, markable paper from the actual beginner bank', () => {
    const paper = buildPaper(beginnerBank, QUESTIONS_PER_EXAM, seededRng(2024))

    expect(paper).toHaveLength(QUESTIONS_PER_EXAM)
    expect(new Set(paper.map((i) => i.question.id)).size).toBe(QUESTIONS_PER_EXAM)

    // Answering every question correctly must be a 100% pass, and answering
    // every one wrongly must be a 0% fail — anything else means the correct
    // flag was lost somewhere between the bank and the mark sheet.
    const right = paper.map((i) => i.options.findIndex((o) => o.correct))
    const wrong = paper.map((i) => i.options.findIndex((o) => !o.correct))

    expect(scorePaper(paper, right).percent).toBe(100)
    expect(scorePaper(paper, right).passed).toBe(true)
    expect(scorePaper(paper, wrong).percent).toBe(0)
    expect(scorePaper(paper, wrong).passed).toBe(false)
  })

  it('produces a different paper on a retake', () => {
    const a = buildPaper(beginnerBank, QUESTIONS_PER_EXAM, seededRng(1)).map((i) => i.question.id)
    const b = buildPaper(beginnerBank, QUESTIONS_PER_EXAM, seededRng(2)).map((i) => i.question.id)
    expect(a).not.toEqual(b)
  })
})

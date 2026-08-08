import { describe, expect, it } from 'vitest'
import { buildPaper, scorePaper, seededRng, shuffle } from './exam'
import type { ExamQuestion } from '@/content/exam/types'
import { PASS_PERCENT } from '@/content/exam/types'

const loc = (s: string) => ({ en: s, ar: s })

/** A synthetic bank — the real one is checked in the content suite. */
function makeBank(size: number, phase = 'p1'): ExamQuestion[] {
  return Array.from({ length: size }, (_, i) => ({
    id: `q-${i}`,
    phase,
    question: loc(`question ${i}`),
    options: [
      { text: loc(`right ${i}`), correct: true },
      { text: loc(`wrong a ${i}`) },
      { text: loc(`wrong b ${i}`) },
    ],
    explain: loc(`because ${i}`),
  }))
}

const answerAll = (paper: ReturnType<typeof buildPaper>, correctly: boolean) =>
  paper.map((item) =>
    correctly
      ? item.options.findIndex((o) => o.correct)
      : item.options.findIndex((o) => !o.correct),
  )

describe('shuffle', () => {
  it('keeps every element and leaves the input untouched', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input, seededRng(1))
    expect(out.slice().sort()).toEqual(input)
    expect(input).toEqual([1, 2, 3, 4, 5])
  })

  it('is deterministic for a given seed', () => {
    expect(shuffle([1, 2, 3, 4, 5], seededRng(42))).toEqual(shuffle([1, 2, 3, 4, 5], seededRng(42)))
  })
})

describe('buildPaper', () => {
  it('draws the requested number of questions', () => {
    expect(buildPaper(makeBank(100), 10, seededRng(1))).toHaveLength(10)
  })

  it('never repeats a question within one paper', () => {
    const ids = buildPaper(makeBank(100), 10, seededRng(7)).map((i) => i.question.id)
    expect(new Set(ids).size).toBe(10)
  })

  it('gives different papers from different seeds', () => {
    const a = buildPaper(makeBank(100), 10, seededRng(1)).map((i) => i.question.id)
    const b = buildPaper(makeBank(100), 10, seededRng(2)).map((i) => i.question.id)
    expect(a).not.toEqual(b)
  })

  it('caps at the bank size rather than padding or repeating', () => {
    expect(buildPaper(makeBank(4), 10, seededRng(1))).toHaveLength(4)
    expect(buildPaper([], 10, seededRng(1))).toEqual([])
  })

  it('carries exactly one correct option through the option shuffle', () => {
    for (const item of buildPaper(makeBank(50), 10, seededRng(3))) {
      expect(item.options.filter((o) => o.correct)).toHaveLength(1)
    }
  })

  it('does not always leave the correct answer in the same position', () => {
    // Authoring puts the right answer first; if shuffling broke, every paper
    // would be passable by picking A every time.
    const positions = buildPaper(makeBank(60), 40, seededRng(11)).map((i) =>
      i.options.findIndex((o) => o.correct),
    )
    expect(new Set(positions).size).toBeGreaterThan(1)
  })
})

describe('scorePaper', () => {
  const paper = buildPaper(makeBank(20), 10, seededRng(5))

  it('scores a perfect paper', () => {
    const result = scorePaper(paper, answerAll(paper, true))
    expect(result.correct).toBe(10)
    expect(result.percent).toBe(100)
    expect(result.passed).toBe(true)
    expect(result.wrong).toEqual([])
  })

  it('scores an all-wrong paper', () => {
    const result = scorePaper(paper, answerAll(paper, false))
    expect(result.correct).toBe(0)
    expect(result.percent).toBe(0)
    expect(result.passed).toBe(false)
    expect(result.wrong).toHaveLength(10)
  })

  it('counts an unanswered question as wrong, never as a pass', () => {
    const result = scorePaper(paper, new Array(10).fill(null))
    expect(result.correct).toBe(0)
    expect(result.passed).toBe(false)
  })

  it('passes exactly at the pass mark, not just above it', () => {
    const answers = answerAll(paper, true)
    // Spoil enough answers to land precisely on the threshold.
    const allowedWrong = 10 - PASS_PERCENT / 10
    for (let i = 0; i < allowedWrong; i++) answers[i] = paper[i].options.findIndex((o) => !o.correct)

    const result = scorePaper(paper, answers)
    expect(result.percent).toBe(PASS_PERCENT)
    expect(result.passed).toBe(true)
  })

  it('fails one mark below the threshold', () => {
    const answers = answerAll(paper, true)
    const allowedWrong = 10 - PASS_PERCENT / 10 + 1
    for (let i = 0; i < allowedWrong; i++) answers[i] = paper[i].options.findIndex((o) => !o.correct)

    expect(scorePaper(paper, answers).passed).toBe(false)
  })

  it('breaks the score down by phase', () => {
    const mixed = [
      ...makeBank(2, 'phase-a'),
      ...makeBank(2, 'phase-b').map((q) => ({ ...q, id: `b-${q.id}` })),
    ]
    const p = buildPaper(mixed, 4, seededRng(1))
    const result = scorePaper(p, answerAll(p, true))

    expect(result.byPhase.map((r) => r.phase).sort()).toEqual(['phase-a', 'phase-b'])
    expect(result.byPhase.every((r) => r.correct === r.total)).toBe(true)
    expect(result.byPhase.reduce((n, r) => n + r.total, 0)).toBe(4)
  })

  it('reports zero rather than dividing by zero on an empty paper', () => {
    const result = scorePaper([], [])
    expect(result.percent).toBe(0)
    expect(result.passed).toBe(false)
  })
})

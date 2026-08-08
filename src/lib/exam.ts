import type { ExamQuestion } from '@/content/exam/types'
import { PASS_PERCENT } from '@/content/exam/types'
import type { Loc } from '@/i18n/types'

/**
 * Selecting and marking a paper. Kept free of React so it can be tested
 * directly, and seeded so a test can assert on an exact draw.
 */

export type Rng = () => number

/** Small deterministic PRNG — only used to make tests reproducible. */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher-Yates on a copy — the input is never touched. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export interface PaperOption {
  text: Loc
  correct: boolean
}

export interface PaperItem {
  question: ExamQuestion
  /** Options in the order this sitting shows them. */
  options: PaperOption[]
}

/**
 * Draw `count` distinct questions and shuffle each one's options, so a repeat
 * sitting cannot be passed by remembering that the answer was third.
 */
export function buildPaper(
  bank: readonly ExamQuestion[],
  count: number,
  rng: Rng = Math.random,
): PaperItem[] {
  return shuffle(bank, rng)
    .slice(0, Math.min(count, bank.length))
    .map((question) => ({
      question,
      options: shuffle(
        question.options.map((o) => ({ text: o.text, correct: o.correct === true })),
        rng,
      ),
    }))
}

export interface PhaseScore {
  phase: string
  correct: number
  total: number
}

export interface ExamResult {
  total: number
  correct: number
  /** Rounded to a whole percent. */
  percent: number
  passed: boolean
  /** Per-phase breakdown, so a result can point at what to revise. */
  byPhase: PhaseScore[]
  /** Indices of the questions answered wrongly or skipped. */
  wrong: number[]
}

/**
 * Mark a paper. `answers[i]` is the index the learner chose for item `i`, or
 * `null` if they left it blank — a blank counts as wrong, never as a pass.
 */
export function scorePaper(paper: PaperItem[], answers: (number | null)[]): ExamResult {
  const byPhase = new Map<string, PhaseScore>()
  const wrong: number[] = []
  let correct = 0

  paper.forEach((item, i) => {
    const phase = item.question.phase
    const row = byPhase.get(phase) ?? { phase, correct: 0, total: 0 }
    row.total++

    const picked = answers[i]
    const isCorrect = picked !== null && picked !== undefined && item.options[picked]?.correct
    if (isCorrect) {
      correct++
      row.correct++
    } else {
      wrong.push(i)
    }

    byPhase.set(phase, row)
  })

  const total = paper.length
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)

  return {
    total,
    correct,
    percent,
    passed: percent >= PASS_PERCENT,
    byPhase: [...byPhase.values()],
    wrong,
  }
}

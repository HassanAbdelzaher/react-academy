import type { Loc } from '@/i18n/types'
import type { Level } from '@/content/types'

/**
 * A question in the exam bank. Exams draw a random sample from the bank, so a
 * question has to stand on its own — no "as we saw above", no dependence on the
 * question before it.
 */
export interface ExamQuestion {
  /**
   * Stable id, e.g. `b-js-01`. Never renumber an existing question: saved
   * results and the review screen refer to it.
   */
  id: string
  /** Phase slug the question draws on, so a result can point at weak areas. */
  phase: string
  question: Loc
  options: { text: Loc; correct?: boolean }[]
  explain: Loc
}

/** How many questions one sitting draws from the bank. */
export const QUESTIONS_PER_EXAM = 10

/** Percentage needed to pass. */
export const PASS_PERCENT = 70

/** The size every level's bank is being written towards. */
export const TARGET_BANK_SIZE = 100

export type ExamLevel = Level

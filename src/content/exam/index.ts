import type { ExamQuestion, ExamLevel } from './types'
import { QUESTIONS_PER_EXAM } from './types'
import { LEVEL_ORDER } from '@/content/types'
import { PHASES } from '@/content/phases'

/**
 * Banks are large and only needed once someone opens an exam, so each level is
 * its own chunk — the same treatment the lesson bodies get.
 */
const LOADERS: Record<ExamLevel, () => Promise<ExamQuestion[]>> = {
  beginner: () => import('./beginner').then((m) => m.beginnerBank),
  intermediate: () => import('./intermediate').then((m) => m.intermediateBank),
  advanced: () => import('./advanced').then((m) => m.advancedBank),
  pro: () => import('./pro').then((m) => m.proBank),
}

const cache = new Map<ExamLevel, ExamQuestion[]>()
const inFlight = new Map<ExamLevel, Promise<ExamQuestion[]>>()

export function loadBank(level: ExamLevel): Promise<ExamQuestion[]> {
  const cached = cache.get(level)
  if (cached) return Promise.resolve(cached)

  const existing = inFlight.get(level)
  if (existing) return existing

  const promise = LOADERS[level]()
    .then((questions) => {
      cache.set(level, questions)
      return questions
    })
    .catch(() => {
      // A failed chunk reads as an empty bank, which the UI already handles.
      cache.set(level, [])
      return []
    })
    .finally(() => inFlight.delete(level))

  inFlight.set(level, promise)
  return promise
}

/** Synchronous read — only populated once `loadBank` has resolved. */
export function getBank(level: ExamLevel): ExamQuestion[] | undefined {
  return cache.get(level)
}

/** Phases a level's exam draws on, in curriculum order. */
export function phasesForLevel(level: ExamLevel) {
  return PHASES.filter((p) => p.level === level)
}

/** A bank can only be sat once it holds a full paper. */
export function isBankReady(questionCount: number | undefined): boolean {
  return (questionCount ?? 0) >= QUESTIONS_PER_EXAM
}

export const EXAM_LEVELS = LEVEL_ORDER
export * from './types'

import { PHASES } from './phases'
import type { LessonMeta, Phase } from './types'

export interface FlatLesson {
  phase: Phase
  lesson: LessonMeta
  /** Position within the whole course. */
  index: number
  /** Position within its phase. */
  indexInPhase: number
  key: string
}

export const FLAT_LESSONS: FlatLesson[] = PHASES.flatMap((phase) =>
  phase.lessons.map((lesson, indexInPhase) => ({
    phase,
    lesson,
    indexInPhase,
    index: 0,
    key: `${phase.slug}/${lesson.slug}`,
  })),
).map((entry, index) => ({ ...entry, index }))

const BY_KEY = new Map(FLAT_LESSONS.map((l) => [l.key, l]))

export function findLesson(phaseSlug?: string, lessonSlug?: string): FlatLesson | undefined {
  if (!phaseSlug || !lessonSlug) return undefined
  return BY_KEY.get(`${phaseSlug}/${lessonSlug}`)
}

export function neighbours(current: FlatLesson) {
  return {
    prev: FLAT_LESSONS[current.index - 1],
    next: FLAT_LESSONS[current.index + 1],
  }
}

export function lessonPath(entry: Pick<FlatLesson, 'phase' | 'lesson'>) {
  return `/phase/${entry.phase.slug}/${entry.lesson.slug}`
}

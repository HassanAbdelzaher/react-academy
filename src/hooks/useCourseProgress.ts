import { useMemo } from 'react'
import { PHASES, TOTAL_LESSONS, phaseKeys } from '@/content/phases'
import type { Phase } from '@/content/types'
import { countDone, useProgress } from '@/lib/progress'

export interface PhaseStat {
  phase: Phase
  done: number
  total: number
  ratio: number
}

export function usePhaseStats(): PhaseStat[] {
  const map = useProgress()
  return useMemo(
    () =>
      PHASES.map((phase) => {
        const keys = phaseKeys(phase)
        const done = countDone(map, keys)
        return { phase, done, total: keys.length, ratio: keys.length ? done / keys.length : 0 }
      }),
    [map],
  )
}

export function usePhaseStat(phase: Phase): PhaseStat {
  const map = useProgress()
  return useMemo(() => {
    const keys = phaseKeys(phase)
    const done = countDone(map, keys)
    return { phase, done, total: keys.length, ratio: keys.length ? done / keys.length : 0 }
  }, [map, phase])
}

export interface OverallProgress {
  done: number
  total: number
  ratio: number
  /** First unfinished lesson in curriculum order, or null when everything is done. */
  next: { phaseSlug: string; lessonSlug: string } | null
  started: boolean
}

export function useOverallProgress(): OverallProgress {
  const map = useProgress()
  return useMemo(() => {
    let done = 0
    let next: OverallProgress['next'] = null
    for (const phase of PHASES) {
      for (const lesson of phase.lessons) {
        if (map[`${phase.slug}/${lesson.slug}`]) done++
        else if (!next) next = { phaseSlug: phase.slug, lessonSlug: lesson.slug }
      }
    }
    return {
      done,
      total: TOTAL_LESSONS,
      ratio: TOTAL_LESSONS ? done / TOTAL_LESSONS : 0,
      next,
      started: done > 0,
    }
  }, [map])
}

import { useSyncExternalStore } from 'react'
import type { ExamLevel } from '@/content/exam/types'

/**
 * Best and latest exam result per level, persisted the same way lesson progress
 * is. Deliberately small: a score, an attempt count, and whether the level has
 * ever been passed.
 */
const STORAGE_KEY = 'ra:exam:v1'

export interface LevelRecord {
  best: number
  last: number
  attempts: number
  passed: boolean
}

export type ExamRecords = Partial<Record<ExamLevel, LevelRecord>>

let snapshot: ExamRecords = load()
const listeners = new Set<() => void>()

function load(): ExamRecords {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ExamRecords
    }
  } catch {
    /* corrupted storage — start clean */
  }
  return {}
}

function commit(next: ExamRecords) {
  snapshot = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* private mode / quota — results just won't persist */
  }
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => snapshot

export const examStore = {
  get(level: ExamLevel): LevelRecord | undefined {
    return snapshot[level]
  },

  /** Record a finished sitting. `best` and `passed` only ever improve. */
  record(level: ExamLevel, percent: number, passed: boolean) {
    const prev = snapshot[level]
    commit({
      ...snapshot,
      [level]: {
        best: Math.max(prev?.best ?? 0, percent),
        last: percent,
        attempts: (prev?.attempts ?? 0) + 1,
        passed: (prev?.passed ?? false) || passed,
      },
    })
  },

  clear(level: ExamLevel) {
    const next = { ...snapshot }
    delete next[level]
    commit(next)
  },

  reset() {
    commit({})
  },
}

export function useExamRecords(): ExamRecords {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

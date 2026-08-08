import { useSyncExternalStore } from 'react'

/**
 * A tiny external store for lesson completion, persisted to localStorage.
 * Keys look like `p3/l2` (phase slug / lesson slug).
 */
const STORAGE_KEY = 'ra:progress:v1'

type ProgressMap = Record<string, true>

let snapshot: ProgressMap = load()
const listeners = new Set<() => void>()

function load(): ProgressMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ProgressMap
    }
  } catch {
    /* corrupted storage — start clean */
  }
  return {}
}

function commit(next: ProgressMap) {
  snapshot = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* private mode / quota — progress just won't persist */
  }
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => snapshot
const getServerSnapshot = () => snapshot

export const progressStore = {
  key: (phase: string, lesson: string) => `${phase}/${lesson}`,

  isDone(key: string) {
    return snapshot[key] === true
  },

  toggle(key: string) {
    const next = { ...snapshot }
    if (next[key]) delete next[key]
    else next[key] = true
    commit(next)
  },

  set(key: string, done: boolean) {
    const next = { ...snapshot }
    if (done) next[key] = true
    else delete next[key]
    commit(next)
  },

  setMany(keys: string[], done: boolean) {
    const next = { ...snapshot }
    for (const k of keys) {
      if (done) next[k] = true
      else delete next[k]
    }
    commit(next)
  },

  reset() {
    commit({})
  },
}

/** Subscribe a component to the whole progress map. */
export function useProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** How many of `keys` are marked done. */
export function countDone(map: ProgressMap, keys: string[]): number {
  let n = 0
  for (const k of keys) if (map[k]) n++
  return n
}

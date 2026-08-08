/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { countDone, progressStore } from './progress'

const KEY = 'ra:progress:v1'
const stored = () => JSON.parse(localStorage.getItem(KEY) ?? '{}')

beforeEach(() => {
  progressStore.reset()
})

describe('progress store', () => {
  it('builds a key from a phase and lesson slug', () => {
    expect(progressStore.key('hooks-in-depth', 'useeffect')).toBe('hooks-in-depth/useeffect')
  })

  it('marks a lesson done and persists it', () => {
    progressStore.set('a/b', true)
    expect(progressStore.isDone('a/b')).toBe(true)
    expect(stored()).toEqual({ 'a/b': true })
  })

  it('deletes rather than stores false, so the map only ever holds completions', () => {
    progressStore.set('a/b', true)
    progressStore.set('a/b', false)
    expect(progressStore.isDone('a/b')).toBe(false)
    expect(stored()).toEqual({})
  })

  it('toggles both ways', () => {
    progressStore.toggle('a/b')
    expect(progressStore.isDone('a/b')).toBe(true)
    progressStore.toggle('a/b')
    expect(progressStore.isDone('a/b')).toBe(false)
  })

  it('sets and clears a whole phase at once', () => {
    const keys = ['p/1', 'p/2', 'p/3']
    progressStore.setMany(keys, true)
    expect(stored()).toEqual({ 'p/1': true, 'p/2': true, 'p/3': true })
    progressStore.setMany(keys, false)
    expect(stored()).toEqual({})
  })

  it('leaves untouched keys alone when clearing a phase', () => {
    progressStore.set('other/x', true)
    progressStore.setMany(['p/1'], true)
    progressStore.setMany(['p/1'], false)
    expect(progressStore.isDone('other/x')).toBe(true)
  })

  it('counts only the keys asked about', () => {
    progressStore.setMany(['p/1', 'p/2', 'other/x'], true)
    const map = stored()
    expect(countDone(map, ['p/1', 'p/2', 'p/3'])).toBe(2)
    expect(countDone(map, [])).toBe(0)
  })

  it('starts clean when localStorage holds corrupted JSON', async () => {
    localStorage.setItem(KEY, 'not json at all')
    vi.resetModules()
    const fresh = await import('./progress')
    expect(fresh.progressStore.isDone('a/b')).toBe(false)
  })

  it('starts clean when localStorage holds a non-object', async () => {
    localStorage.setItem(KEY, '["a/b"]')
    vi.resetModules()
    const fresh = await import('./progress')
    expect(fresh.progressStore.isDone('a/b')).toBe(false)
  })
})

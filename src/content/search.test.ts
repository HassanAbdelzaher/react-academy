import { describe, expect, it } from 'vitest'
import { deepenSearchIndex, isSearchDeep, SEARCH_INDEX, searchContent } from './search'
import { PHASES } from './phases'

const paths = (hits: { path: string }[]) => hits.map((h) => h.path.replace('/phase/', ''))

describe('search index', () => {
  it('indexes every phase and every lesson', () => {
    const lessons = PHASES.reduce((n, p) => n + p.lessons.length, 0)
    expect(SEARCH_INDEX).toHaveLength(PHASES.length + lessons)
  })

  it('ignores queries shorter than two characters', () => {
    expect(searchContent('u', 'en')).toEqual([])
    expect(searchContent(' ', 'en')).toEqual([])
    expect(searchContent('', 'en')).toEqual([])
  })

  it('respects the result limit', () => {
    expect(searchContent('react', 'en', 3).length).toBeLessThanOrEqual(3)
  })

  it('ranks a title match above a description-only match', () => {
    const hits = searchContent('reconciliation', 'en')
    expect(paths(hits)[0]).toBe('how-react-works/reconciliation')
  })

  it('requires every term to match, not just one', () => {
    // "usestate" hits plenty; pairing it with a word that appears nowhere must
    // collapse the result set rather than fall back to the looser match.
    expect(searchContent('usestate zzzznotaword', 'en')).toEqual([])
  })

  it('finds English keywords while the UI is in Arabic', () => {
    expect(paths(searchContent('useReducer', 'ar')).join()).toContain('hooks-in-depth/usereducer')
  })

  it('normalises Arabic alef variants and diacritics', () => {
    const plain = paths(searchContent('اساسيات', 'ar'))
    const hamza = paths(searchContent('أساسيات', 'ar'))
    expect(plain.length).toBeGreaterThan(0)
    expect(hamza).toEqual(plain)
  })
})

describe('deepening', () => {
  it('reaches lesson prose only after the phase chunks load, and only loads once', async () => {
    // Before: "stale closure" is taught inside lesson bodies, never in a title,
    // summary or tag — so the shallow index cannot see it.
    expect(isSearchDeep()).toBe(false)
    expect(searchContent('stale closure', 'en')).toEqual([])

    await deepenSearchIndex()

    expect(isSearchDeep()).toBe(true)
    const deep = paths(searchContent('stale closure', 'en'))
    expect(deep.length).toBeGreaterThan(0)
    expect(deep.join()).toContain('hooks-in-depth/useeffect')

    // Deepening twice must not append the same prose again.
    const lesson = SEARCH_INDEX.find((h) => h.type === 'lesson')!
    const before = lesson.haystack.en.length
    await deepenSearchIndex()
    expect(lesson.haystack.en.length).toBe(before)
  })
})

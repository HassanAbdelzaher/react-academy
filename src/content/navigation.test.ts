import { describe, expect, it } from 'vitest'
import { FLAT_LESSONS, findLesson, lessonPath, neighbours } from './navigation'
import { PHASES } from './phases'

describe('lesson navigation', () => {
  it('flattens every lesson exactly once, in curriculum order', () => {
    const expected = PHASES.flatMap((p) => p.lessons.map((l) => `${p.slug}/${l.slug}`))
    expect(FLAT_LESSONS.map((l) => l.key)).toEqual(expected)
  })

  it('numbers entries sequentially from zero', () => {
    expect(FLAT_LESSONS.map((l) => l.index)).toEqual(FLAT_LESSONS.map((_, i) => i))
  })

  it('restarts indexInPhase at the top of each phase', () => {
    for (const phase of PHASES) {
      const inPhase = FLAT_LESSONS.filter((l) => l.phase.slug === phase.slug)
      expect(inPhase.map((l) => l.indexInPhase)).toEqual(phase.lessons.map((_, i) => i))
    }
  })

  it('finds a lesson by phase and lesson slug', () => {
    const first = FLAT_LESSONS[0]
    expect(findLesson(first.phase.slug, first.lesson.slug)).toBe(first)
  })

  it('returns undefined for unknown or partial slugs', () => {
    expect(findLesson('nope', 'nope')).toBeUndefined()
    expect(findLesson(undefined, 'jsx')).toBeUndefined()
    expect(findLesson('react-fundamentals', undefined)).toBeUndefined()
    // A real phase paired with another phase's lesson must not resolve.
    expect(findLesson('react-fundamentals', 'usestate')).toBeUndefined()
  })

  it('walks prev/next across phase boundaries', () => {
    const middle = FLAT_LESSONS[8]
    expect(neighbours(middle).prev).toBe(FLAT_LESSONS[7])
    expect(neighbours(middle).next).toBe(FLAT_LESSONS[9])
  })

  it('leaves the course with an open start and end', () => {
    expect(neighbours(FLAT_LESSONS[0]).prev).toBeUndefined()
    expect(neighbours(FLAT_LESSONS.at(-1)!).next).toBeUndefined()
  })

  it('builds the route a lesson link points at', () => {
    const entry = FLAT_LESSONS[0]
    expect(lessonPath(entry)).toBe(`/phase/${entry.phase.slug}/${entry.lesson.slug}`)
  })
})

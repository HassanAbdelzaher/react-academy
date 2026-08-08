/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { examStore } from './examResults'

const KEY = 'ra:exam:v1'

beforeEach(() => {
  examStore.reset()
})

describe('exam results store', () => {
  it('records a first attempt', () => {
    examStore.record('beginner', 80, true)
    expect(examStore.get('beginner')).toEqual({ best: 80, last: 80, attempts: 1, passed: true })
  })

  it('keeps the best score when a later attempt is worse', () => {
    examStore.record('beginner', 90, true)
    examStore.record('beginner', 40, false)

    const record = examStore.get('beginner')
    expect(record?.best).toBe(90)
    expect(record?.last).toBe(40)
    expect(record?.attempts).toBe(2)
  })

  it('never un-passes a level that was already passed', () => {
    examStore.record('beginner', 100, true)
    examStore.record('beginner', 10, false)
    expect(examStore.get('beginner')?.passed).toBe(true)
  })

  it('raises the best score when a later attempt is better', () => {
    examStore.record('beginner', 50, false)
    examStore.record('beginner', 95, true)

    const record = examStore.get('beginner')
    expect(record?.best).toBe(95)
    expect(record?.passed).toBe(true)
  })

  it('keeps levels independent', () => {
    examStore.record('beginner', 80, true)
    examStore.record('advanced', 30, false)

    expect(examStore.get('beginner')?.best).toBe(80)
    expect(examStore.get('advanced')?.best).toBe(30)
    expect(examStore.get('pro')).toBeUndefined()
  })

  it('persists to localStorage', () => {
    examStore.record('beginner', 70, true)
    expect(JSON.parse(localStorage.getItem(KEY) ?? '{}')).toEqual({
      beginner: { best: 70, last: 70, attempts: 1, passed: true },
    })
  })

  it('clears one level without touching the others', () => {
    examStore.record('beginner', 80, true)
    examStore.record('advanced', 80, true)
    examStore.clear('beginner')

    expect(examStore.get('beginner')).toBeUndefined()
    expect(examStore.get('advanced')?.best).toBe(80)
  })

  it('starts clean when localStorage holds corrupted JSON', async () => {
    localStorage.setItem(KEY, '{{{')
    vi.resetModules()
    const fresh = await import('./examResults')
    expect(fresh.examStore.get('beginner')).toBeUndefined()
  })
})

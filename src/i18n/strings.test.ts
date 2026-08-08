import { describe, expect, it } from 'vitest'
import { UI } from './strings'

const entries = Object.entries(UI)
const hasArabicLetter = (s: string) => /[؀-ۿ]/.test(s)

describe('UI strings', () => {
  it('has at least one string', () => {
    expect(entries.length).toBeGreaterThan(0)
  })

  it('fills both languages for every key', () => {
    const empty = entries
      .filter(([, v]) => !v.en?.trim() || !v.ar?.trim())
      .map(([k]) => k)
    expect(empty).toEqual([])
  })

  it('actually translates every key rather than reusing the English', () => {
    // Every chrome string is prose, so each one should carry Arabic script. This
    // is what catches a new label shipped in English only.
    const untranslated = entries.filter(([, v]) => !hasArabicLetter(v.ar)).map(([k]) => k)
    expect(untranslated).toEqual([])
  })
})

describe('components', () => {
  const sources = import.meta.glob<string>('../**/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
  })

  /**
   * A label written as a bare string literal cannot change with the language.
   * Both of these must come from `t(...)` or `L({ en, ar })` instead — that is
   * exactly how the skip link and the diagram controls shipped in English only.
   */
  it.each([
    ['aria-label', /aria-label="([^"]+)"/g],
    ['placeholder', /placeholder="([^"]+)"/g],
  ])('never hardcodes a %s', (_attr, pattern) => {
    const offenders: string[] = []
    for (const [path, code] of Object.entries(sources)) {
      for (const match of code.matchAll(pattern)) {
        offenders.push(`${path.replace('../', 'src/')}: ${match[0]}`)
      }
    }
    expect(offenders).toEqual([])
  })
})

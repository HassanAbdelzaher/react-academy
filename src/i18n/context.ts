import { createContext, use } from 'react'
import type { Lang, Loc } from './types'
import type { UIKey } from './strings'

export interface I18nValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  isRTL: boolean
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Translate a UI chrome key. */
  t: (key: UIKey) => string
  /** Resolve a bilingual content value. */
  L: (value: Loc | undefined) => string
  /** Resolve a bilingual list. */
  LL: (value: Record<Lang, string[]> | undefined) => string[]
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const ctx = use(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

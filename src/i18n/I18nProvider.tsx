import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type I18nValue } from './context'
import { UI, type UIKey } from './strings'
import type { Lang, Loc } from './types'

const STORAGE_KEY = 'ra:lang'

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ar') return saved
  return navigator.language?.startsWith('ar') ? 'ar' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(() => setLangState((p) => (p === 'en' ? 'ar' : 'en')), [])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isRTL: lang === 'ar',
      setLang,
      toggleLang,
      t: (key: UIKey) => UI[key][lang],
      L: (v: Loc | undefined) => (v ? v[lang] : ''),
      LL: (v: Record<Lang, string[]> | undefined) => (v ? v[lang] : []),
    }),
    [lang, setLang, toggleLang],
  )

  return <I18nContext value={value}>{children}</I18nContext>
}

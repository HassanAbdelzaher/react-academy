export type Lang = 'en' | 'ar'

/** A piece of text that exists in both site languages. */
export type Loc = Record<Lang, string>

/** A list that exists in both site languages. */
export type LocList = Record<Lang, string[]>

export const LANGS: { id: Lang; label: string; native: string; dir: 'ltr' | 'rtl' }[] = [
  { id: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { id: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
]

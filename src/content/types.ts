import type { Loc, LocList } from '@/i18n/types'

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'pro'

export interface Resource {
  label: string
  url: string
}

/** Card-level information about a lesson. The lesson body lives in `content/lessons`. */
export interface LessonMeta {
  slug: string
  title: Loc
  summary: Loc
  /** Realistic reading + practising time. */
  minutes: number
  /** Short code-ish keywords shown as chips. */
  tags?: string[]
}

export interface Phase {
  id: number
  slug: string
  level: Level
  /** Emoji used as the phase glyph. */
  icon: string
  /** Hex accent that drives the phase's gradient. */
  accent: string
  title: Loc
  tagline: Loc
  description: Loc
  outcomes: LocList
  project: { title: Loc; brief: Loc }
  resources: Resource[]
  lessons: LessonMeta[]
}

export const LEVEL_ORDER: Level[] = ['beginner', 'intermediate', 'advanced', 'pro']

export const LEVEL_COLOR: Record<Level, string> = {
  beginner: 'var(--color-level-beginner)',
  intermediate: 'var(--color-level-intermediate)',
  advanced: 'var(--color-level-advanced)',
  pro: 'var(--color-level-pro)',
}

export const LEVEL_LABEL_KEY = {
  beginner: 'levelBeginner',
  intermediate: 'levelIntermediate',
  advanced: 'levelAdvanced',
  pro: 'levelPro',
} as const

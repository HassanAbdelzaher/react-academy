import type { Loc, LocList } from '@/i18n/types'

/**
 * Lesson bodies are described as data, not JSX, so that both languages stay in
 * one place and the renderer can stay consistent across 90+ lessons.
 *
 * Prose supports a tiny inline syntax: `code`, **bold**, _italic_ and [label](url).
 */

export interface HeadingBlock {
  type: 'heading'
  text: Loc
}

export interface TextBlock {
  type: 'text'
  text: Loc
  /** Renders slightly larger — good for the opening paragraph. */
  lead?: boolean
}

export interface ListBlock {
  type: 'list'
  items: LocList
  ordered?: boolean
}

export interface CodeBlock {
  type: 'code'
  /** Code itself is written once, in English. */
  code: string
  lang?: 'tsx' | 'jsx' | 'ts' | 'js' | 'json' | 'bash' | 'css' | 'html'
  filename?: string
  caption?: Loc
  /** 1-based line numbers to highlight. */
  highlight?: number[]
}

export interface CalloutBlock {
  type: 'callout'
  tone: 'tip' | 'warn' | 'danger' | 'note'
  title?: Loc
  body: Loc
}

/** Side-by-side wrong/right comparison — the fastest way to teach a habit. */
export interface CompareBlock {
  type: 'compare'
  bad: { code: string; label?: Loc }
  good: { code: string; label?: Loc }
  lang?: CodeBlock['lang']
  note?: Loc
}

export interface TableBlock {
  type: 'table'
  head: LocList
  rows: LocList[]
}

export interface StepsBlock {
  type: 'steps'
  steps: { title: Loc; body: Loc }[]
}

export interface QuizBlock {
  type: 'quiz'
  question: Loc
  options: { text: Loc; correct?: boolean }[]
  explain: Loc
}

export interface KeyPointsBlock {
  type: 'keypoints'
  items: LocList
}

/** A runnable, editable example — wired up in stage 3. */
export interface PlaygroundBlock {
  type: 'playground'
  code: string
  caption?: Loc
  /** Extra values exposed to the example scope, by name. */
  scope?: string[]
}

/** A named animated diagram — wired up in stage 3. */
export interface VisualBlock {
  type: 'visual'
  name: 'render-commit' | 'reconciliation' | 'state-flow' | 'hooks-timeline' | 'server-client'
  caption?: Loc
}

export type Block =
  | HeadingBlock
  | TextBlock
  | ListBlock
  | CodeBlock
  | CalloutBlock
  | CompareBlock
  | TableBlock
  | StepsBlock
  | QuizBlock
  | KeyPointsBlock
  | PlaygroundBlock
  | VisualBlock

export interface LessonBody {
  /** `${phaseSlug}/${lessonSlug}` */
  id: string
  blocks: Block[]
}

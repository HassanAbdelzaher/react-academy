import type { ComponentType } from 'react'
import { RenderCommitVisual } from './RenderCommitVisual'
import { ReconciliationVisual } from './ReconciliationVisual'
import { StateFlowVisual } from './StateFlowVisual'
import { HooksTimelineVisual } from './HooksTimelineVisual'
import { ServerClientVisual } from './ServerClientVisual'
import type { VisualBlock } from '@/content/blocks'
import type { Loc } from '@/i18n/types'

export interface VisualEntry {
  name: VisualBlock['name']
  Component: ComponentType
  /** Phase the diagram belongs to. */
  phase: string
  title: Loc
}

export const VISUALS: VisualEntry[] = [
  {
    name: 'state-flow',
    Component: StateFlowVisual,
    phase: 'state-and-interactivity',
    title: { en: 'The one-way data loop', ar: 'حلقة البيانات أحادية الاتجاه' },
  },
  {
    name: 'render-commit',
    Component: RenderCommitVisual,
    phase: 'how-react-works',
    title: { en: 'Render and commit', ar: 'العرض والتثبيت' },
  },
  {
    name: 'reconciliation',
    Component: ReconciliationVisual,
    phase: 'how-react-works',
    title: { en: 'Reconciliation', ar: 'المطابقة' },
  },
  {
    name: 'hooks-timeline',
    Component: HooksTimelineVisual,
    phase: 'hooks-in-depth',
    title: { en: 'The life of an Effect', ar: 'دورة حياة التأثير' },
  },
  {
    name: 'server-client',
    Component: ServerClientVisual,
    phase: 'react-19-features',
    title: { en: 'Server vs. Client Components', ar: 'مكوّنات الخادم والعميل' },
  },
]

export function getVisual(name: VisualBlock['name']): VisualEntry | undefined {
  return VISUALS.find((v) => v.name === name)
}

import { useI18n } from '@/i18n/context'
import { RichText } from './RichText'
import { CodeBlock } from './CodeBlock'
import { Quiz } from './Quiz'
import { lazy, Suspense } from 'react'
import { getVisual } from '@/components/visuals'

// The editor is heavy; lessons without a playground never download it.
const Playground = lazy(() =>
  import('@/components/playground/Playground').then((m) => ({ default: m.Playground })),
)
import { IconCheck, IconClose, IconSparkles, IconTarget } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import type { Block, CalloutBlock } from '@/content/blocks'
import type { Loc } from '@/i18n/types'

const CALLOUT_STYLE: Record<
  CalloutBlock['tone'],
  { color: string; icon: string; label: Loc }
> = {
  tip: { color: 'var(--color-level-beginner)', icon: '💡', label: { en: 'Tip', ar: 'نصيحة' } },
  note: { color: 'var(--color-brand-400)', icon: '📌', label: { en: 'Note', ar: 'ملاحظة' } },
  warn: { color: 'var(--color-level-intermediate)', icon: '⚠️', label: { en: 'Watch out', ar: 'انتبه' } },
  danger: { color: '#fb7185', icon: '🚫', label: { en: 'Common bug', ar: 'خطأ شائع' } },
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="lesson-body">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  const { L, LL } = useI18n()

  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-10 mb-3 scroll-mt-24 text-xl font-black tracking-tight sm:text-2xl">
          {L(block.text)}
        </h2>
      )

    case 'text':
      return (
        <p
          className={cn(
            'my-4 leading-[1.85] text-content-muted',
            block.lead && 'text-[1.06rem] text-content',
          )}
        >
          <RichText>{L(block.text)}</RichText>
        </p>
      )

    case 'list': {
      const items = LL(block.items)
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className="my-4 space-y-2 ps-1">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-content-muted">
              {block.ordered ? (
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-surface-3 font-mono text-[0.65rem] font-bold text-content-faint">
                  {i + 1}
                </span>
              ) : (
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              )}
              <span>
                <RichText>{item}</RichText>
              </span>
            </li>
          ))}
        </List>
      )
    }

    case 'code':
      return (
        <figure className="my-5">
          <CodeBlock
            code={block.code}
            lang={block.lang}
            filename={block.filename}
            highlight={block.highlight}
          />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-content-faint">
              <RichText>{L(block.caption)}</RichText>
            </figcaption>
          )}
        </figure>
      )

    case 'callout': {
      const s = CALLOUT_STYLE[block.tone]
      return (
        <aside
          className="my-6 rounded-2xl border p-4 ps-5"
          style={{
            borderColor: `color-mix(in srgb, ${s.color} 35%, transparent)`,
            background: `color-mix(in srgb, ${s.color} 8%, transparent)`,
          }}
        >
          <p
            className="flex items-center gap-2 text-[0.7rem] font-black tracking-widest uppercase"
            style={{ color: s.color }}
          >
            <span aria-hidden="true">{s.icon}</span>
            {block.title ? L(block.title) : L(s.label)}
          </p>
          <p className="mt-1.5 leading-relaxed text-content-muted">
            <RichText>{L(block.body)}</RichText>
          </p>
        </aside>
      )
    }

    case 'compare':
      return (
        <div className="my-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#fb7185]">
                <IconClose width={13} height={13} strokeWidth={3} />
                {block.bad.label ? L(block.bad.label) : L({ en: 'Avoid', ar: 'تجنّب' })}
              </p>
              <CodeBlock code={block.bad.code} lang={block.lang} dense className="border-[#fb7185]/30" />
            </div>
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--color-level-beginner)]">
                <IconCheck width={13} height={13} />
                {block.good.label ? L(block.good.label) : L({ en: 'Prefer', ar: 'الأفضل' })}
              </p>
              <CodeBlock
                code={block.good.code}
                lang={block.lang}
                dense
                className="border-[var(--color-level-beginner)]/30"
              />
            </div>
          </div>
          {block.note && (
            <p className="mt-2 text-sm text-content-faint">
              <RichText>{L(block.note)}</RichText>
            </p>
          )}
        </div>
      )

    case 'table': {
      const head = LL(block.head)
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2">
                {head.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-start font-bold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-line">
                  {LL(row).map((cell, k) => (
                    <td key={k} className="px-4 py-2.5 align-top text-content-muted">
                      <RichText>{cell}</RichText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    case 'steps':
      return (
        <ol className="my-6 space-y-4 border-s-2 border-line ps-6">
          {block.steps.map((step, i) => (
            <li key={i} className="relative">
              <span className="absolute -start-[2.05rem] grid h-6 w-6 place-items-center rounded-full border border-line bg-surface font-mono text-[0.65rem] font-black text-brand-400">
                {i + 1}
              </span>
              <p className="font-bold">{L(step.title)}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-content-muted">
                <RichText>{L(step.body)}</RichText>
              </p>
            </li>
          ))}
        </ol>
      )

    case 'quiz':
      return <Quiz block={block} />

    case 'keypoints':
      return (
        <section className="my-8 rounded-2xl border border-brand-400/30 bg-brand-400/5 p-5">
          <p className="flex items-center gap-2 text-[0.7rem] font-black tracking-widest text-brand-400 uppercase">
            <IconTarget width={14} height={14} />
            {L({ en: 'Remember this', ar: 'تذكّر هذا' })}
          </p>
          <ul className="mt-3 space-y-2">
            {LL(block.items).map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-content-muted">
                <IconCheck className="mt-1 shrink-0 text-brand-400" width={13} height={13} />
                <span>
                  <RichText>{item}</RichText>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )

    case 'playground':
      return (
        <figure className="my-6">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-brand-400">
            <IconSparkles width={13} height={13} />
            {L({ en: 'Editable example', ar: 'مثال قابل للتعديل' })}
          </div>
          <Suspense
            fallback={
              <div className="h-64 animate-pulse rounded-2xl border border-line bg-surface-2/50" />
            }
          >
            <Playground code={block.code} stacked />
          </Suspense>
          {block.caption && (
            <figcaption className="mt-2 text-sm text-content-faint">{L(block.caption)}</figcaption>
          )}
        </figure>
      )

    case 'visual': {
      const visual = getVisual(block.name)
      if (!visual) return null
      return (
        <figure className="my-6">
          <visual.Component />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-content-faint">{L(block.caption)}</figcaption>
          )}
        </figure>
      )
    }
  }
}

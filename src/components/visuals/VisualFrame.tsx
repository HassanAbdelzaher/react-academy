import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { IconChevron } from '@/components/ui/icons'
import { RichText } from '@/components/lesson/RichText'
import { cn } from '@/lib/cn'
import type { Loc } from '@/i18n/types'

export interface VisualStep {
  label: Loc
  body: Loc
}

interface Props {
  title: Loc
  description?: Loc
  steps: VisualStep[]
  step: number
  playing: boolean
  onStep: (i: number) => void
  onNext: () => void
  onPrev: () => void
  onTogglePlay: () => void
  children: ReactNode
  accent?: string
}

/** Shared chrome for every animated diagram: stage, caption and controls. */
export function VisualFrame({
  title,
  description,
  steps,
  step,
  playing,
  onStep,
  onNext,
  onPrev,
  onTogglePlay,
  children,
  accent = 'var(--color-brand-400)',
}: Props) {
  const { t, L } = useI18n()
  const current = steps[step]

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <figcaption className="border-b border-line px-5 py-3.5">
        <h3 className="font-bold tracking-tight">{L(title)}</h3>
        {description && <p className="mt-0.5 text-sm text-content-muted">{L(description)}</p>}
      </figcaption>

      {/* stage */}
      <div className="relative min-h-[240px] overflow-hidden bg-surface-2/40 p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-25 blur-3xl"
          style={{ background: `radial-gradient(45% 60% at 50% 40%, ${accent}, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="relative">{children}</div>
      </div>

      {/* caption */}
      <div className="border-t border-line px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: accent }}>
              {step + 1}. {L(current.label)}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-content-muted">
              <RichText>{L(current.body)}</RichText>
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label={t('visualPrevStep')}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-content-muted transition-colors hover:text-content"
          >
            <IconChevron className="rotate-180 flip-rtl" width={14} height={14} />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="h-8 rounded-full border border-line px-3.5 text-xs font-bold text-content-muted transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            {playing ? L({ en: '❚❚ pause', ar: '❚❚ إيقاف' }) : L({ en: '▶ play', ar: '▶ تشغيل' })}
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label={t('visualNextStep')}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-content-muted transition-colors hover:text-content"
          >
            <IconChevron className="flip-rtl" width={14} height={14} />
          </button>

          <div className="ms-auto flex gap-1.5">
            {steps.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onStep(i)}
                aria-label={L(s.label)}
                aria-current={i === step}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === step ? 'w-6' : 'w-1.5 bg-line-strong hover:bg-content-faint',
                )}
                style={i === step ? { background: accent } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  )
}

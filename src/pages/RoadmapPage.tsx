import { useState } from 'react'
import { motion } from 'motion/react'
import { PhaseCard } from '@/components/phase/PhaseCard'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/context'
import { LEVEL_COLOR, LEVEL_LABEL_KEY, LEVEL_ORDER, type Level } from '@/content/types'
import { usePhaseStats, useOverallProgress } from '@/hooks/useCourseProgress'
import { progressStore } from '@/lib/progress'
import { cn } from '@/lib/cn'

type Filter = Level | 'all'

export function RoadmapPage() {
  const { t, L } = useI18n()
  const stats = usePhaseStats()
  const overall = useOverallProgress()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filter === 'all' ? stats : stats.filter((s) => s.phase.level === filter)

  return (
    <div className="relative">
      <div className="aurora opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6">
        <Reveal>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('roadmapTitle')}</h1>
          <p className="mt-2 max-w-2xl text-content-muted">{t('roadmapSub')}</p>
        </Reveal>

        {/* overall progress */}
        <Reveal delay={0.05}>
          <div className="mt-7 rounded-2xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{t('progressTitle')}</p>
                <p className="text-sm text-content-muted">
                  {overall.started
                    ? `${overall.done}/${overall.total} ${t('lessons')} · ${Math.round(overall.ratio * 100)}% ${t('complete')}`
                    : t('progressEmpty')}
                </p>
              </div>
              {overall.started && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.confirm(t('resetConfirm'))) progressStore.reset()
                  }}
                >
                  {t('resetProgress')}
                </Button>
              )}
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-3">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand-400),#4f8cff)]"
                initial={{ width: 0 }}
                animate={{ width: `${overall.ratio * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </Reveal>

        {/* filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(['all', ...LEVEL_ORDER] as Filter[]).map((f) => {
            const active = filter === f
            const color = f === 'all' ? 'var(--color-brand-400)' : LEVEL_COLOR[f]
            const count = f === 'all' ? stats.length : stats.filter((s) => s.phase.level === f).length
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-semibold transition-all',
                  active ? 'text-content' : 'border-line text-content-muted hover:text-content',
                )}
                style={
                  active
                    ? {
                        borderColor: `color-mix(in srgb, ${color} 55%, transparent)`,
                        background: `color-mix(in srgb, ${color} 14%, transparent)`,
                      }
                    : undefined
                }
              >
                {f === 'all' ? L({ en: 'All phases', ar: 'كل المراحل' }) : t(LEVEL_LABEL_KEY[f])}
                <span className="ms-1.5 font-mono text-xs text-content-faint">{count}</span>
              </button>
            )
          })}
        </div>

        {/* grid */}
        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((stat, i) => (
            <motion.div
              key={stat.phase.slug}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            >
              <PhaseCard stat={stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

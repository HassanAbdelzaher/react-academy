import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { Reveal } from '@/components/ui/Reveal'
import { IconChevron } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { usePhaseStats, useOverallProgress } from '@/hooks/useCourseProgress'
import { progressStore } from '@/lib/progress'
import { TOTAL_MINUTES } from '@/content/phases'
import { findLesson } from '@/content/navigation'

export function ProgressPage() {
  const { t, L } = useI18n()
  const stats = usePhaseStats()
  const overall = useOverallProgress()
  const nextEntry = overall.next
    ? findLesson(overall.next.phaseSlug, overall.next.lessonSlug)
    : undefined
  const nextLabel = nextEntry
    ? `${L(nextEntry.phase.title)} · ${L(nextEntry.lesson.title)}`
    : ''
  const doneMinutes = stats.reduce(
    (n, s) =>
      n +
      s.phase.lessons.reduce(
        (m, l) => m + (progressStore.isDone(`${s.phase.slug}/${l.slug}`) ? l.minutes : 0),
        0,
      ),
    0,
  )

  return (
    <div className="relative">
      <div className="aurora opacity-40" />
      <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-16 sm:px-6">
        <Reveal>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t('progressTitle')}</h1>
          <p className="mt-2 text-content-muted">
            {overall.started ? t('roadmapSub') : t('progressEmpty')}
          </p>
        </Reveal>

        {/* next up */}
        {overall.next && (
          <Reveal>
            <Link
              to={`/phase/${overall.next.phaseSlug}/${overall.next.lessonSlug}`}
              className="mt-7 flex items-center gap-4 rounded-2xl border border-brand-400/40 bg-brand-400/8 p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-400/15 text-xl">
                ▶
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.68rem] font-black tracking-widest text-brand-400 uppercase">
                  {overall.started ? t('ctaContinue') : t('ctaStart')}
                </span>
                <span className="block truncate font-bold">{nextLabel}</span>
              </span>
              <IconChevron className="flip-rtl shrink-0 text-brand-400" width={18} height={18} />
            </Link>
          </Reveal>
        )}

        {/* summary cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Reveal>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
              <ProgressRing value={overall.ratio} size={62} stroke={6} showLabel />
              <div>
                <p className="font-mono text-2xl font-black tabular-nums">
                  {overall.done}
                  <span className="text-content-faint">/{overall.total}</span>
                </p>
                <p className="text-sm text-content-muted">{t('lessons')}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-mono text-2xl font-black tabular-nums text-gradient">
                {Math.round(doneMinutes / 60)}h
              </p>
              <p className="text-sm text-content-muted">
                {L({ en: 'studied of', ar: 'من أصل' })} {Math.round(TOTAL_MINUTES / 60)}h
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-mono text-2xl font-black tabular-nums text-gradient">
                {stats.filter((s) => s.ratio === 1).length}
                <span className="text-content-faint">/{stats.length}</span>
              </p>
              <p className="text-sm text-content-muted">
                {L({ en: 'phases completed', ar: 'مرحلة مكتملة' })}
              </p>
            </div>
          </Reveal>
        </div>

        {/* per-phase bars */}
        <div className="mt-9 space-y-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.phase.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.35) }}
            >
              <Link
                to={`/phase/${s.phase.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-brand-400/60"
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-xs font-black"
                  style={{
                    color: s.phase.accent,
                    background: `color-mix(in srgb, ${s.phase.accent} 14%, transparent)`,
                  }}
                >
                  {s.phase.id}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{L(s.phase.title)}</p>
                    <LevelBadge level={s.phase.level} className="hidden sm:inline-flex" />
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${s.ratio * 100}%`, background: s.phase.accent }}
                    />
                  </div>
                </div>

                <span className="font-mono text-xs tabular-nums text-content-faint">
                  {s.done}/{s.total}
                </span>
                <IconChevron className="flip-rtl text-content-faint" width={15} height={15} />
              </Link>
            </motion.div>
          ))}
        </div>

        {overall.started && (
          <div className="mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (window.confirm(t('resetConfirm'))) progressStore.reset()
              }}
            >
              {t('resetProgress')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

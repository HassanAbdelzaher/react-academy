import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { getPhase, PHASES, phaseKeys } from '@/content/phases'
import { loadPhaseLessons } from '@/content/lessons'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import {
  IconCheck,
  IconChevron,
  IconClock,
  IconExternal,
  IconRocket,
  IconTarget,
} from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { usePhaseStat } from '@/hooks/useCourseProgress'
import { progressStore, useProgress } from '@/lib/progress'
import { NotFoundPage } from './NotFoundPage'
import { cn } from '@/lib/cn'

export function PhasePage() {
  const { phaseSlug } = useParams()
  const phase = getPhase(phaseSlug)
  const { t, L, LL } = useI18n()
  const progress = useProgress()
  const stat = usePhaseStat(phase ?? PHASES[0])

  // Warm the lesson chunk while the reader is still looking at the phase page.
  useEffect(() => {
    if (phaseSlug) void loadPhaseLessons(phaseSlug)
  }, [phaseSlug])

  if (!phase) return <NotFoundPage />

  const keys = phaseKeys(phase)
  const allDone = stat.done === stat.total
  const index = PHASES.findIndex((p) => p.slug === phase.slug)
  const prev = PHASES[index - 1]
  const next = PHASES[index + 1]
  const minutes = phase.lessons.reduce((n, l) => n + l.minutes, 0)

  return (
    <div className="relative">
      {/* ---------- phase header ---------- */}
      <div className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(40% 60% at 20% 0%, ${phase.accent}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-content-muted transition-colors hover:text-brand-400"
          >
            <IconChevron className="rotate-180 flip-rtl" width={15} height={15} />
            {t('backToRoadmap')}
          </Link>

          <div className="mt-5 flex flex-wrap items-start gap-5">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border text-3xl"
              style={{
                borderColor: `color-mix(in srgb, ${phase.accent} 40%, transparent)`,
                background: `color-mix(in srgb, ${phase.accent} 14%, transparent)`,
              }}
            >
              {phase.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-widest text-content-faint uppercase">
                  {t('phase')} {String(phase.id).padStart(2, '0')}
                </span>
                <LevelBadge level={phase.level} />
                <span className="inline-flex items-center gap-1 font-mono text-xs text-content-faint">
                  <IconClock width={13} height={13} />
                  {Math.round(minutes / 60)}h · {phase.lessons.length} {t('lessons')}
                </span>
              </div>
              <h1 className="mt-1.5 text-3xl font-black tracking-tight sm:text-4xl">
                {L(phase.title)}
              </h1>
              <p className="mt-2 max-w-2xl text-content-muted">{L(phase.tagline)}</p>
            </div>

            <div className="flex items-center gap-3">
              <ProgressRing value={stat.ratio} size={54} stroke={5} color={phase.accent} showLabel />
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-relaxed text-content-muted">{L(phase.description)}</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button
              size="sm"
              variant={allDone ? 'secondary' : 'primary'}
              onClick={() => progressStore.setMany(keys, !allDone)}
            >
              {allDone ? (
                t('markUndone')
              ) : (
                <>
                  <IconCheck />
                  {L({ en: 'Mark phase complete', ar: 'إتمام المرحلة كاملة' })}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* ---------- outcomes ---------- */}
        <Reveal>
          <section className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-black tracking-widest text-content-faint uppercase">
              <IconTarget width={16} height={16} />
              {t('youLearn')}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {LL(phase.outcomes).map((o) => (
                <li key={o} className="flex gap-2.5 text-sm text-content-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: phase.accent }}
                  />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ---------- lessons ---------- */}
        <h2 className="mt-10 mb-3 text-lg font-black tracking-tight">
          {t('navCurriculum')}
          <span className="ms-2 font-mono text-sm font-normal text-content-faint tabular-nums">
            {stat.done}/{stat.total}
          </span>
        </h2>

        <ol className="space-y-2">
          {phase.lessons.map((lesson, i) => {
            const key = `${phase.slug}/${lesson.slug}`
            const done = progress[key] === true
            return (
              <motion.li
                key={lesson.slug}
                id={lesson.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
              >
                <div
                  className={cn(
                    'group flex items-start gap-3.5 rounded-2xl border bg-surface p-4 transition-colors',
                    done ? 'border-line/60 bg-surface/50' : 'border-line hover:border-line-strong',
                  )}
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done}
                    aria-label={done ? t('markUndone') : t('markDone')}
                    onClick={() => progressStore.toggle(key)}
                    className={cn(
                      'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition-all',
                      done
                        ? 'border-transparent text-white'
                        : 'border-line-strong text-transparent hover:border-brand-400',
                    )}
                    style={done ? { background: phase.accent } : undefined}
                  >
                    <IconCheck />
                  </button>

                  <Link to={`/phase/${phase.slug}/${lesson.slug}`} className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="font-mono text-xs text-content-faint tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className={cn(
                          'font-bold tracking-tight transition-colors group-hover:text-brand-400',
                          done && 'text-content-faint line-through',
                        )}
                      >
                        {L(lesson.title)}
                      </h3>
                      <span className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-content-faint">
                        <IconClock width={12} height={12} />
                        {lesson.minutes} {t('minutes')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-content-muted">{L(lesson.summary)}</p>
                    {lesson.tags && (
                      <div className="mt-2 flex flex-wrap gap-1.5" dir="ltr">
                        {lesson.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.68rem] text-content-faint"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>

                  <IconChevron
                    width={16}
                    height={16}
                    className="mt-1 flip-rtl shrink-0 text-content-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand-400"
                  />
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* ---------- project ---------- */}
        <Reveal>
          <section
            className="mt-8 rounded-2xl border p-5"
            style={{
              borderColor: `color-mix(in srgb, ${phase.accent} 35%, transparent)`,
              background: `color-mix(in srgb, ${phase.accent} 8%, transparent)`,
            }}
          >
            <h2 className="flex items-center gap-2 text-sm font-black tracking-widest uppercase" style={{ color: phase.accent }}>
              <IconRocket width={16} height={16} />
              {t('projectLabel')}
            </h2>
            <p className="mt-2 font-bold">{L(phase.project.title)}</p>
            <p className="mt-1 text-content-muted">{L(phase.project.brief)}</p>
          </section>
        </Reveal>

        {/* ---------- resources ---------- */}
        <section className="mt-8">
          <h2 className="text-sm font-black tracking-widest text-content-faint uppercase">
            {t('resourcesLabel')}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {phase.resources.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-semibold text-content-muted transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-400"
              >
                <IconExternal />
                {r.label}
              </a>
            ))}
          </div>
        </section>

        {/* ---------- prev / next ---------- */}
        <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
          {prev ? (
            <ButtonLink to={`/phase/${prev.slug}`} variant="secondary" className="justify-start">
              <IconChevron className="rotate-180 flip-rtl" width={16} height={16} />
              <span className="truncate">
                {t('previous')} · {L(prev.title)}
              </span>
            </ButtonLink>
          ) : (
            <span />
          )}
          {next && (
            <ButtonLink to={`/phase/${next.slug}`} className="justify-end sm:col-start-2">
              <span className="truncate">
                {t('next')} · {L(next.title)}
              </span>
              <IconChevron className="flip-rtl" width={16} height={16} />
            </ButtonLink>
          )}
        </nav>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, useScroll } from 'motion/react'
import { findLesson, lessonPath, neighbours } from '@/content/navigation'
import { getPhase } from '@/content/phases'
import { getLessonBody, isPhaseLoaded, loadPhaseLessons } from '@/content/lessons'
import { BlockRenderer } from '@/components/lesson/BlockRenderer'
import { LessonSidebar } from '@/components/lesson/LessonSidebar'
import { Button, ButtonLink } from '@/components/ui/Button'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { IconCheck, IconChevron, IconClock, IconExternal } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { progressStore, useProgress } from '@/lib/progress'
import { NotFoundPage } from './NotFoundPage'
import { useDocumentTitle } from '@/lib/useDocumentTitle'
import { cn } from '@/lib/cn'

export function LessonPage() {
  const { phaseSlug, lessonSlug } = useParams()
  const entry = findLesson(phaseSlug, lessonSlug)
  const { t, L } = useI18n()
  const progress = useProgress()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const [justCompleted, setJustCompleted] = useState(false)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    setJustCompleted(false)
    window.scrollTo({ top: 0 })
  }, [phaseSlug, lessonSlug])

  // Lesson bodies live in a per-phase chunk, fetched on demand.
  useEffect(() => {
    if (!phaseSlug || isPhaseLoaded(phaseSlug)) return
    let alive = true
    loadPhaseLessons(phaseSlug).then(() => {
      if (alive) forceUpdate((n) => n + 1)
    })
    return () => {
      alive = false
    }
  }, [phaseSlug])

  useDocumentTitle(
    entry ? `${L(entry.lesson.title)} · ${L(entry.phase.title)}` : t('notFoundTitle'),
    entry ? L(entry.lesson.summary) : undefined,
  )

  if (!entry) return <NotFoundPage />

  const { phase, lesson, indexInPhase } = entry
  const { prev, next } = neighbours(entry)
  const body = getLessonBody(entry.key)
  const isDone = progress[entry.key] === true

  function completeAndContinue() {
    if (!entry) return
    progressStore.set(entry.key, true)
    setJustCompleted(true)
    if (next) navigate(lessonPath(next))
  }

  return (
    <div className="relative">
      {/* reading progress */}
      <motion.div
        className="fixed inset-x-0 top-16 z-40 h-0.5 origin-[left_center] bg-brand-400 rtl:origin-[right_center]"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
        {/* ---------- sidebar ---------- */}
        <aside className="hidden lg:block">
          <LessonSidebar phase={phase} />
        </aside>

        {/* ---------- article ---------- */}
        <article className="min-w-0 max-w-3xl">
          {/* breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-content-faint">
            <Link to="/roadmap" className="hover:text-brand-400">
              {t('roadmapTitle')}
            </Link>
            <IconChevron className="flip-rtl" width={13} height={13} />
            <Link to={`/phase/${phase.slug}`} className="hover:text-brand-400">
              {L(phase.title)}
            </Link>
          </div>

          <header className="mt-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold tracking-widest text-content-faint uppercase">
                {t('lesson')} {String(indexInPhase + 1).padStart(2, '0')}
              </span>
              <LevelBadge level={phase.level} />
              <span className="inline-flex items-center gap-1 font-mono text-xs text-content-faint">
                <IconClock width={13} height={13} />
                {lesson.minutes} {t('minutes')}
              </span>
              {isDone && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-level-beginner)_14%,transparent)] px-2.5 py-0.5 text-[0.66rem] font-bold text-[var(--color-level-beginner)]">
                  <IconCheck width={11} height={11} />
                  {t('completed')}
                </span>
              )}
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-[2.35rem] sm:leading-[1.15]">
              {L(lesson.title)}
            </h1>
            <p className="mt-2 text-[1.05rem] text-content-muted">{L(lesson.summary)}</p>

            {lesson.tags && (
              <div className="mt-3 flex flex-wrap gap-1.5" dir="ltr">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.7rem] text-content-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <hr className="my-7 border-line" />

          {/* body, loading skeleton, or outline fallback */}
          {body ? (
            <BlockRenderer blocks={body.blocks} />
          ) : isPhaseLoaded(phase.slug) ? (
            <OutlineFallback phaseSlug={phase.slug} />
          ) : (
            <div className="space-y-4" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl border border-line bg-surface-2/50"
                />
              ))}
            </div>
          )}

          {/* completion */}
          <div className="mt-10 rounded-2xl border border-line bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold">
                  {isDone ? t('lessonDone') : L({ en: 'Finished reading?', ar: 'أنهيت القراءة؟' })}
                </p>
                <p className="text-sm text-content-muted">
                  {next
                    ? `${t('nextLesson')}: ${L(next.lesson.title)}`
                    : t('courseFinished')}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isDone ? 'secondary' : 'primary'}
                  onClick={() => progressStore.toggle(entry.key)}
                  size="sm"
                >
                  <IconCheck />
                  {isDone ? t('markUndone') : t('completeLesson')}
                </Button>
                {next && (
                  <Button onClick={completeAndContinue} size="sm">
                    {t('completeAndNext')}
                    <IconChevron className="flip-rtl" width={15} height={15} />
                  </Button>
                )}
              </div>
            </div>

            {justCompleted && !next && (
              <p className="mt-3 text-sm font-bold text-[var(--color-level-beginner)]">
                {t('phaseFinished')}
              </p>
            )}
          </div>

          {/* prev / next */}
          <nav className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                to={lessonPath(prev)}
                className="group rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-400/60"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold text-content-faint">
                  <IconChevron className="rotate-180 flip-rtl" width={13} height={13} />
                  {t('prevLesson')}
                </span>
                <span className="mt-1 block font-semibold group-hover:text-brand-400">
                  {L(prev.lesson.title)}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                to={lessonPath(next)}
                className={cn(
                  'group rounded-2xl border border-line bg-surface p-4 text-end transition-colors hover:border-brand-400/60',
                  !prev && 'sm:col-start-2',
                )}
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-content-faint">
                  {t('nextLesson')}
                  <IconChevron className="flip-rtl" width={13} height={13} />
                </span>
                <span className="mt-1 block font-semibold group-hover:text-brand-400">
                  {L(next.lesson.title)}
                </span>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  )
}

/** Shown for lessons whose body has not been authored yet. */
function OutlineFallback({ phaseSlug }: { phaseSlug: string }) {
  const { t, LL } = useI18n()
  const phase = getPhase(phaseSlug)
  const outcomes = phase ? LL(phase.outcomes) : []

  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface-2/40 p-6">
      <p className="text-[0.7rem] font-black tracking-widest text-content-faint uppercase">
        {t('outlineLabel')}
      </p>
      <p className="mt-2 leading-relaxed text-content-muted">{t('outlineOnly')}</p>

      {outcomes.length > 0 && (
        <ul className="mt-4 space-y-2">
          {outcomes.map((o) => (
            <li key={o} className="flex gap-2.5 text-sm text-content-muted">
              <IconCheck className="mt-1 shrink-0 text-brand-400" width={13} height={13} />
              {o}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {phase?.resources.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-content-muted transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            <IconExternal />
            {r.label}
          </a>
        ))}
      </div>

      <ButtonLink to={`/phase/${phaseSlug}`} variant="secondary" size="sm" className="mt-5">
        {t('backToPhase')}
      </ButtonLink>
    </div>
  )
}

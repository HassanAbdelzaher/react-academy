import { Link, useParams } from 'react-router-dom'
import { useI18n } from '@/i18n/context'
import { useProgress, progressStore } from '@/lib/progress'
import { IconCheck } from '@/components/ui/icons'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { cn } from '@/lib/cn'
import type { Phase } from '@/content/types'

export function LessonSidebar({ phase }: { phase: Phase }) {
  const { lessonSlug } = useParams()
  const { t, L } = useI18n()
  const progress = useProgress()
  const done = phase.lessons.filter((l) => progress[`${phase.slug}/${l.slug}`]).length

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pe-1">
      <Link
        to={`/phase/${phase.slug}`}
        className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-colors hover:border-brand-400/60"
      >
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-lg"
          style={{ background: `color-mix(in srgb, ${phase.accent} 14%, transparent)` }}
        >
          {phase.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            {t('phase')} {String(phase.id).padStart(2, '0')}
          </span>
          <span className="block truncate text-sm font-bold">{L(phase.title)}</span>
        </span>
        <ProgressRing value={done / phase.lessons.length} size={26} stroke={3} color={phase.accent} />
      </Link>

      <p className="mt-5 mb-2 px-1 text-[0.68rem] font-black tracking-widest text-content-faint uppercase">
        {t('inThisPhase')}
      </p>

      <ol className="space-y-0.5">
        {phase.lessons.map((lesson, i) => {
          const key = `${phase.slug}/${lesson.slug}`
          const isDone = progress[key] === true
          const isCurrent = lesson.slug === lessonSlug
          return (
            <li key={lesson.slug} className="flex items-start gap-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={isDone}
                aria-label={isDone ? t('markUndone') : t('markDone')}
                onClick={() => progressStore.toggle(key)}
                className={cn(
                  'mt-2 grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors',
                  isDone ? 'border-transparent text-white' : 'border-line-strong text-transparent hover:border-brand-400',
                )}
                style={isDone ? { background: phase.accent } : undefined}
              >
                <IconCheck width={9} height={9} />
              </button>

              <Link
                to={`/phase/${phase.slug}/${lesson.slug}`}
                className={cn(
                  'flex-1 rounded-lg px-2 py-1.5 text-sm transition-colors',
                  isCurrent
                    ? 'bg-surface-2 font-bold text-content'
                    : 'text-content-muted hover:bg-surface-2/60 hover:text-content',
                  isDone && !isCurrent && 'text-content-faint',
                )}
              >
                <span className="me-1.5 font-mono text-[0.65rem] text-content-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {L(lesson.title)}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

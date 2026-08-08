import { Link } from 'react-router-dom'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { IconChevron, IconClock } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import type { PhaseStat } from '@/hooks/useCourseProgress'

export function PhaseCard({ stat }: { stat: PhaseStat }) {
  const { phase, done, total, ratio } = stat
  const { t, L } = useI18n()
  const minutes = phase.lessons.reduce((n, l) => n + l.minutes, 0)

  return (
    <Link
      to={`/phase/${phase.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 card-hover"
    >
      {/* accent wash */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(50% 60% at 50% 50%, ${phase.accent}, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="flex items-start gap-3.5">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border text-xl"
          style={{
            borderColor: `color-mix(in srgb, ${phase.accent} 35%, transparent)`,
            background: `color-mix(in srgb, ${phase.accent} 12%, transparent)`,
          }}
        >
          {phase.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono text-[0.68rem] font-bold tracking-widest text-content-faint uppercase">
            {t('phase')} {String(phase.id).padStart(2, '0')}
          </div>
          <h3 className="mt-0.5 text-[1.05rem] leading-snug font-bold tracking-tight">
            {L(phase.title)}
          </h3>
        </div>

        <ProgressRing value={ratio} size={40} color={phase.accent} />
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm text-content-muted">{L(phase.tagline)}</p>

      <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-3.5 text-xs text-content-faint">
        <LevelBadge level={phase.level} />
        <span className="font-mono tabular-nums">
          {done}/{total} {t('lessons')}
        </span>
        <span className="ms-auto inline-flex items-center gap-1 font-mono tabular-nums">
          <IconClock width={13} height={13} />
          {Math.round(minutes / 60)}h
        </span>
        <IconChevron
          width={15}
          height={15}
          className="flip-rtl text-content-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-400"
        />
      </div>
    </Link>
  )
}

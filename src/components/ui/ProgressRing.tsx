import { cn } from '@/lib/cn'

interface Props {
  /** 0 → 1 */
  value: number
  size?: number
  stroke?: number
  color?: string
  className?: string
  /** Render the percentage in the middle. */
  showLabel?: boolean
}

export function ProgressRing({
  value,
  size = 42,
  stroke = 4,
  color = 'var(--color-brand-400)',
  className,
  showLabel = false,
}: Props) {
  const clamped = Math.min(1, Math.max(0, value))
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const done = clamped >= 1

  return (
    <div className={cn('relative grid shrink-0 place-items-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={done ? 'var(--color-level-beginner)' : color}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          style={{ transition: 'stroke-dashoffset .5s var(--ease-out-quint), stroke .3s' }}
        />
      </svg>
      {showLabel && (
        <span className="absolute font-mono text-[0.62rem] font-bold tabular-nums text-content-muted">
          {Math.round(clamped * 100)}
        </span>
      )}
    </div>
  )
}

import { useI18n } from '@/i18n/context'
import { LEVEL_COLOR, LEVEL_LABEL_KEY, type Level } from '@/content/types'
import { cn } from '@/lib/cn'

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  const { t } = useI18n()
  const color = LEVEL_COLOR[level]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.66rem] font-bold tracking-wider uppercase',
        className,
      )}
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
    >
      {t(LEVEL_LABEL_KEY[level])}
    </span>
  )
}

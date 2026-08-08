import { cn } from '@/lib/cn'

/** The React atom, with an electron that orbits when `animated` is set. */
export function AtomLogo({
  size = 32,
  animated = true,
  className,
}: {
  size?: number
  animated?: boolean
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-12 -12 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0 overflow-visible', className)}
    >
      <defs>
        <linearGradient id="atomGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-300)" />
          <stop offset="100%" stopColor="#4f8cff" />
        </linearGradient>
      </defs>
      <circle cx="0" cy="0" r="2.1" fill="url(#atomGrad)" />
      <g stroke="url(#atomGrad)" strokeWidth="0.9" fill="none" opacity="0.9">
        <ellipse rx="10.6" ry="4.1" />
        <ellipse rx="10.6" ry="4.1" transform="rotate(60)" />
        <ellipse rx="10.6" ry="4.1" transform="rotate(120)" />
      </g>
      <g className={animated ? 'origin-center animate-[orbit_6s_linear_infinite]' : undefined}>
        <circle cx="10.6" cy="0" r="1.3" fill="var(--color-brand-200)" />
      </g>
    </svg>
  )
}

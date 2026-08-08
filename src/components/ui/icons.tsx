import type { SVGProps } from 'react'

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} satisfies SVGProps<SVGSVGElement>

type P = SVGProps<SVGSVGElement>

export const IconSun = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const IconMoon = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

export const IconMenu = (p: P) => (
  <svg {...base} width="20" height="20" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p: P) => (
  <svg {...base} width="20" height="20" {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconChevron = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const IconChevronDown = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const IconCheck = (p: P) => (
  <svg {...base} width="14" height="14" strokeWidth={3} {...p}>
    <path d="m20 6-11 11-5-5" />
  </svg>
)

export const IconGlobe = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </svg>
)

export const IconSparkles = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="M12 3v4M12 17v4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M3 12h4M17 12h4M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
)

export const IconBook = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
  </svg>
)

export const IconCode = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="m9 8-5 4 5 4M15 8l5 4-5 4" />
  </svg>
)

export const IconChart = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
)

export const IconLayers = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 14 9 5 9-5" />
  </svg>
)

export const IconTarget = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
)

export const IconClock = (p: P) => (
  <svg {...base} width="16" height="16" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconExternal = (p: P) => (
  <svg {...base} width="14" height="14" {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
)

export const IconRocket = (p: P) => (
  <svg {...base} width="18" height="18" {...p}>
    <path d="M14 4c3 0 6 3 6 6-2.5 4-6 7-10 8l-4-4c1-4 4-7.5 8-10Z" />
    <path d="M9 15l-3 3M6 12l-2 4 4-2" />
    <circle cx="14.5" cy="9.5" r="1.5" />
  </svg>
)

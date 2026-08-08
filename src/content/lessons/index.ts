import type { LessonBody } from '../blocks'

/**
 * Lesson bodies are loaded one phase at a time. Ninety-three bilingual lessons
 * are a lot of text — keeping them out of the initial bundle means the home page
 * downloads the app, not the whole course.
 */
const LOADERS: Record<string, () => Promise<LessonBody[]>> = {
  'javascript-essentials': () =>
    import('./javascript-essentials').then((m) => m.javascriptEssentials),
  'react-fundamentals': () => import('./react-fundamentals').then((m) => m.reactFundamentals),
  'state-and-interactivity': () =>
    import('./state-and-interactivity').then((m) => m.stateAndInteractivity),
  'hooks-in-depth': () => import('./hooks-in-depth').then((m) => m.hooksInDepth),
  'how-react-works': () => import('./how-react-works').then((m) => m.howReactWorks),
  'typescript-with-react': () =>
    import('./typescript-with-react').then((m) => m.typescriptWithReact),
  'tooling-and-setup': () => import('./tooling-and-setup').then((m) => m.toolingAndSetup),
  styling: () => import('./styling').then((m) => m.styling),
  'routing-and-data': () => import('./routing-and-data').then((m) => m.routingAndData),
  'state-management': () => import('./state-management').then((m) => m.stateManagement),
  'forms-and-validation': () => import('./forms-and-validation').then((m) => m.formsAndValidation),
  'react-19-features': () => import('./react-19-features').then((m) => m.react19Features),
  'nextjs-fullstack': () => import('./nextjs-fullstack').then((m) => m.nextjsFullstack),
  testing: () => import('./testing').then((m) => m.testing),
  'performance-and-a11y': () => import('./performance-and-a11y').then((m) => m.performanceAndA11y),
  'professional-practice': () =>
    import('./professional-practice').then((m) => m.professionalPractice),
}

const cache = new Map<string, LessonBody>()
const loaded = new Set<string>()
const inFlight = new Map<string, Promise<void>>()

/** Load (once) every lesson body belonging to a phase. */
export function loadPhaseLessons(phaseSlug: string): Promise<void> {
  if (loaded.has(phaseSlug)) return Promise.resolve()

  const existing = inFlight.get(phaseSlug)
  if (existing) return existing

  const loader = LOADERS[phaseSlug]
  if (!loader) return Promise.resolve()

  const promise = loader()
    .then((bodies) => {
      for (const body of bodies) cache.set(body.id, body)
      loaded.add(phaseSlug)
    })
    .catch(() => {
      /* a failed chunk falls back to the lesson outline */
    })
    .finally(() => inFlight.delete(phaseSlug))

  inFlight.set(phaseSlug, promise)
  return promise
}

/**
 * Pull in every phase. Only worth calling for something that genuinely needs the
 * whole course at once — full-text search is the one such caller.
 */
export function loadAllLessons(): Promise<void> {
  return Promise.all(Object.keys(LOADERS).map(loadPhaseLessons)).then(() => undefined)
}

/** Synchronous read — only returns something once the phase has been loaded. */
export function getLessonBody(id: string): LessonBody | undefined {
  return cache.get(id)
}

export function isPhaseLoaded(phaseSlug: string): boolean {
  return loaded.has(phaseSlug)
}

export const PHASES_WITH_LESSONS = Object.keys(LOADERS)

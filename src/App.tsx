import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { RoadmapPage } from '@/pages/RoadmapPage'
import { PhasePage } from '@/pages/PhasePage'
import { LessonPage } from '@/pages/LessonPage'
import { ProgressPage } from '@/pages/ProgressPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

// The playground pulls in a full code editor, so it loads on demand.
const PlaygroundPage = lazy(() =>
  import('@/pages/PlaygroundPage').then((m) => ({ default: m.PlaygroundPage })),
)
const VisualsPage = lazy(() =>
  import('@/pages/VisualsPage').then((m) => ({ default: m.VisualsPage })),
)

function Deferred({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="h-64 animate-pulse rounded-2xl border border-line bg-surface-2/50" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'roadmap', element: <RoadmapPage /> },
      { path: 'phase/:phaseSlug', element: <PhasePage /> },
      { path: 'phase/:phaseSlug/:lessonSlug', element: <LessonPage /> },
      { path: 'progress', element: <ProgressPage /> },
      {
        path: 'playground',
        element: (
          <Deferred>
            <PlaygroundPage />
          </Deferred>
        ),
      },
      {
        path: 'visuals',
        element: (
          <Deferred>
            <VisualsPage />
          </Deferred>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

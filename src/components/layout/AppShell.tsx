import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { useI18n } from '@/i18n/context'

export function AppShell() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  // Every route change starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-400 focus:px-4 focus:py-2 focus:font-bold focus:text-[#04121b]"
      >
        {t('skipToContent')}
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

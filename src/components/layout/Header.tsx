import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { AtomLogo } from '@/components/brand/AtomLogo'
import { IconClose, IconGlobe, IconMenu, IconMoon, IconSun } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { useTheme } from '@/theme/ThemeProvider'
import { useOverallProgress } from '@/hooks/useCourseProgress'
import { SearchDialog } from '@/components/search/SearchDialog'
import { cn } from '@/lib/cn'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

const NAV = [
  { to: '/', key: 'navHome' },
  { to: '/roadmap', key: 'navRoadmap' },
  { to: '/playground', key: 'navPlayground' },
  { to: '/visuals', key: 'navVisuals' },
  { to: '/exam', key: 'navExam' },
  { to: '/progress', key: 'navDashboard' },
] as const

export function Header() {
  const { t, lang, toggleLang } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const { ratio, done, total } = useOverallProgress()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  // ⌘K / Ctrl+K opens search from anywhere, and "/" when not already typing.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.tagName === 'INPUT' ||
          e.target.tagName === 'TEXTAREA' ||
          e.target.isContentEditable)

      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line glass">
      {/* overall progress hairline */}
      <div
        className="h-0.5 origin-[left_center] bg-[linear-gradient(90deg,var(--color-brand-400),#4f8cff,var(--color-level-advanced))] transition-transform duration-700 rtl:origin-[right_center]"
        style={{ transform: `scaleX(${Math.max(ratio, 0.004)})` }}
        aria-hidden="true"
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <AtomLogo size={30} />
          <span className="hidden sm:inline">{t('siteName')}</span>
        </NavLink>

        <nav className="ms-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'text-content' : 'text-content-muted hover:text-content',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2 ring-1 ring-line"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {t(item.key)}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <span className="hidden font-mono text-xs tabular-nums text-content-faint lg:inline">
            {done}/{total}
          </span>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t('navSearch')}
            className="flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-content-faint transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            <span aria-hidden="true">🔎</span>
            <span className="hidden sm:inline">{t('navSearch')}</span>
            <kbd className="hidden rounded border border-line px-1 font-mono text-[0.6rem] md:inline">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleLang}
            title={t('toggleLang')}
            aria-label={t('toggleLang')}
            className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-bold text-content-muted transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            <IconGlobe width={15} height={15} />
            {lang === 'en' ? 'ع' : 'EN'}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            title={t('toggleTheme')}
            aria-label={t('toggleTheme')}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-content-muted transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('navClose') : t('navMenu')}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-content-muted transition-colors hover:text-content lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                      isActive ? 'bg-surface-2 text-content' : 'text-content-muted hover:bg-surface-2',
                    )
                  }
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

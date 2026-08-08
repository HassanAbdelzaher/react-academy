import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { deepenSearchIndex, isSearchDeep, searchContent } from '@/content/search'
import { useI18n } from '@/i18n/context'
import { useProgress } from '@/lib/progress'
import { IconCheck, IconClose } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, L, lang } = useI18n()
  const navigate = useNavigate()
  const progress = useProgress()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [deep, setDeep] = useState(isSearchDeep)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Scoring ~110 entries against a short query is far cheaper than memoising it,
  // and recomputing on every render is what lets `deep` re-rank the results once
  // the full lesson text lands in the index.
  const results = searchContent(query, lang)

  // Opening the box is the signal that full-text search is about to be worth its
  // download, so the lesson chunks are fetched then rather than at page load.
  useEffect(() => {
    if (!open || deep) return
    let alive = true
    void deepenSearchIndex().then(() => {
      if (alive) setDeep(true)
    })
    return () => {
      alive = false
    }
  }, [open, deep])

  useEffect(() => {
    if (!open) return

    // remember where focus came from so we can hand it back on close
    const opener = document.activeElement as HTMLElement | null
    setQuery('')
    setActive(0)
    requestAnimationFrame(() => inputRef.current?.focus())

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      opener?.focus?.()
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  // keep the highlighted row in view while arrowing through results
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [active])

  /**
   * `aria-modal` tells assistive tech the rest of the page is inert, but it does
   * nothing to the tab order — without this, Tab walks out of the dialog and into
   * the page behind it while the overlay still covers everything.
   */
  function trapTab(e: React.KeyboardEvent) {
    if (e.key !== 'Tab') return
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const activeEl = document.activeElement

    if (e.shiftKey && activeEl === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault()
      first.focus()
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    trapTab(e)
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      navigate(results[active].path)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t('navSearch')}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="text-content-faint" aria-hidden="true">
                🔎
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={L({
                  en: 'Search lessons, phases, concepts…',
                  ar: 'ابحث في الدروس والمراحل والمفاهيم…',
                })}
                className="h-14 flex-1 bg-transparent text-[0.98rem] outline-none placeholder:text-content-faint"
                aria-label={t('navSearch')}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={t('navClose')}
                className="grid h-7 w-7 place-items-center rounded-lg text-content-faint hover:bg-surface-2 hover:text-content"
              >
                <IconClose width={16} height={16} />
              </button>
            </div>

            {query.trim().length >= 2 && (
              <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-content-faint">
                    {L({ en: 'Nothing matched that.', ar: 'لا نتائج مطابقة.' })}
                  </li>
                )}

                {results.map((hit, i) => {
                  const done = hit.type === 'lesson' && progress[hit.path.replace('/phase/', '')]
                  return (
                    <li key={hit.path}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => {
                          navigate(hit.path)
                          onClose()
                        }}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors',
                          i === active ? 'bg-surface-2' : 'hover:bg-surface-2/60',
                        )}
                      >
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-base"
                          style={{ background: `color-mix(in srgb, ${hit.accent} 14%, transparent)` }}
                        >
                          {hit.phaseIcon}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate font-semibold">{L(hit.title)}</span>
                            {done && (
                              <IconCheck
                                width={12}
                                height={12}
                                className="shrink-0 text-[var(--color-level-beginner)]"
                              />
                            )}
                          </span>
                          <span className="block truncate text-xs text-content-muted">
                            {L(hit.subtitle)}
                          </span>
                        </span>

                        <span className="shrink-0 font-mono text-[0.62rem] text-content-faint">
                          {hit.type === 'phase' ? t('phase') : t('lesson')} {hit.phaseId}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="flex items-center gap-3 border-t border-line px-4 py-2 text-[0.68rem] text-content-faint">
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono">↑↓</kbd>
              {L({ en: 'navigate', ar: 'تنقّل' })}
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono">↵</kbd>
              {L({ en: 'open', ar: 'فتح' })}
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono">esc</kbd>
              {L({ en: 'close', ar: 'إغلاق' })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

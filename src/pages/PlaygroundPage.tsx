import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Playground } from '@/components/playground/Playground'
import { Reveal } from '@/components/ui/Reveal'
import { IconChevron, IconSparkles } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { useDocumentTitle } from '@/lib/useDocumentTitle'
import { PLAYGROUND_EXAMPLES } from '@/content/playgroundExamples'
import { getPhase } from '@/content/phases'
import { cn } from '@/lib/cn'

export function PlaygroundPage() {
  const { t, L } = useI18n()
  const [activeId, setActiveId] = useState(PLAYGROUND_EXAMPLES[0].id)
  const active = PLAYGROUND_EXAMPLES.find((e) => e.id === activeId) ?? PLAYGROUND_EXAMPLES[0]
  const phase = active.phase ? getPhase(active.phase) : undefined

  useDocumentTitle(t('navPlayground'))

  return (
    <div className="relative">
      <div className="aurora opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6">
        <Reveal>
          <h1 className="flex items-center gap-2.5 text-3xl font-black tracking-tight sm:text-4xl">
            <IconSparkles className="text-brand-400" width={26} height={26} />
            {t('navPlayground')}
          </h1>
          <p className="mt-2 max-w-2xl text-content-muted">
            {L({
              en: 'Real React running in this page. Edit any example — the result re-renders as you type, and a mistake shows you the actual error message instead of a blank screen.',
              ar: 'رياكت حقيقية تعمل داخل هذه الصفحة. عدّل أي مثال — تُعاد المعاينة أثناء الكتابة، وأي خطأ يُظهر لك رسالة الخطأ الحقيقية بدل شاشة فارغة.',
            })}
          </p>
        </Reveal>

        {/* example picker */}
        <div className="mt-7 flex flex-wrap gap-2">
          {PLAYGROUND_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActiveId(ex.id)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all',
                ex.id === activeId
                  ? 'border-brand-400/60 bg-brand-400/12 text-brand-400'
                  : 'border-line text-content-muted hover:-translate-y-0.5 hover:text-content',
              )}
            >
              {L(ex.title)}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-3">
          <p className="text-content-muted">{L(active.note)}</p>
          {phase && (
            <Link
              to={`/phase/${phase.slug}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-400 hover:underline"
            >
              {L(phase.title)}
              <IconChevron className="flip-rtl" width={13} height={13} />
            </Link>
          )}
        </div>

        <Playground key={active.id} code={active.code} className="mt-4" />

        <p className="mt-4 text-sm text-content-faint">
          {L({
            en: 'Hooks are already in scope — you do not need to import anything. Finish with render(<Something />).',
            ar: 'الخطّافات متاحة مسبقًا — لا تحتاج إلى استيراد أي شيء. أنهِ الكود بـ render(<Something />).',
          })}
        </p>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { VISUALS } from '@/components/visuals'
import { IconChevron, IconLayers } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { useDocumentTitle } from '@/lib/useDocumentTitle'
import { getPhase } from '@/content/phases'

export function VisualsPage() {
  const { t, L } = useI18n()

  useDocumentTitle(t('navVisuals'))

  return (
    <div className="relative">
      <div className="aurora opacity-40" />

      <div className="relative mx-auto max-w-4xl px-4 pt-12 pb-16 sm:px-6">
        <Reveal>
          <h1 className="flex items-center gap-2.5 text-3xl font-black tracking-tight sm:text-4xl">
            <IconLayers className="text-brand-400" width={26} height={26} />
            {t('navVisuals')}
          </h1>
          <p className="mt-2 max-w-2xl text-content-muted">
            {L({
              en: 'The parts of React you cannot see in the code: how an update travels from a click to the screen, how the diff works, and what actually reaches the browser. Press play, or step through at your own pace.',
              ar: 'أجزاء رياكت التي لا تراها في الكود: كيف ينتقل التحديث من النقرة إلى الشاشة، وكيف تعمل المقارنة، وما الذي يصل فعلًا إلى المتصفّح. اضغط تشغيل أو تنقّل بالسرعة التي تريدها.',
            })}
          </p>
        </Reveal>

        <div className="mt-9 space-y-8">
          {VISUALS.map((v, i) => {
            const phase = getPhase(v.phase)
            return (
              <Reveal key={v.name} delay={i * 0.04}>
                <div>
                  {phase && (
                    <Link
                      to={`/phase/${phase.slug}`}
                      className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-content-faint transition-colors hover:text-brand-400"
                    >
                      {t('phase')} {phase.id} · {L(phase.title)}
                      <IconChevron className="flip-rtl" width={12} height={12} />
                    </Link>
                  )}
                  <v.Component />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}

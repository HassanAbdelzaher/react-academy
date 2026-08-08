import { ButtonLink } from '@/components/ui/Button'
import { AtomLogo } from '@/components/brand/AtomLogo'
import { useI18n } from '@/i18n/context'

export function NotFoundPage() {
  const { t } = useI18n()
  return (
    <div className="relative grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="aurora opacity-50" />
      <div className="relative">
        <AtomLogo size={64} className="mx-auto opacity-70" />
        <h1 className="mt-6 text-3xl font-black tracking-tight">{t('notFoundTitle')}</h1>
        <p className="mx-auto mt-2 max-w-sm text-content-muted">{t('notFoundBody')}</p>
        <ButtonLink to="/roadmap" className="mt-6">
          {t('backToRoadmap')}
        </ButtonLink>
      </div>
    </div>
  )
}

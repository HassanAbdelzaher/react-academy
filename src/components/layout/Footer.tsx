import { AtomLogo } from '@/components/brand/AtomLogo'
import { useI18n } from '@/i18n/context'
import { TOTAL_LESSONS, PHASES } from '@/content/phases'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <AtomLogo size={26} animated={false} />
          <div>
            <p className="font-bold">{t('siteName')}</p>
            <p className="text-sm text-content-muted">{t('siteTagline')}</p>
          </div>
        </div>
        <p className="max-w-sm text-sm text-content-faint">
          {PHASES.length} {t('statPhases')} · {TOTAL_LESSONS} {t('statTopics')} — {t('footerNote')}
        </p>
      </div>
    </footer>
  )
}

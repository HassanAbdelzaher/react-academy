import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { ButtonLink } from '@/components/ui/Button'
import { IconChevron, IconTarget } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { useDocumentTitle } from '@/lib/useDocumentTitle'
import { useExamRecords } from '@/lib/examResults'
import {
  EXAM_LEVELS,
  isBankReady,
  loadBank,
  phasesForLevel,
  PASS_PERCENT,
  QUESTIONS_PER_EXAM,
  type ExamLevel,
} from '@/content/exam'
import { LEVEL_COLOR, LEVEL_LABEL_KEY } from '@/content/types'
import { cn } from '@/lib/cn'

export function ExamPage() {
  const { t, L } = useI18n()
  const records = useExamRecords()
  const [sizes, setSizes] = useState<Partial<Record<ExamLevel, number>>>({})

  useDocumentTitle(t('examTitle'))

  // Bank sizes drive the cards, so every level is measured up front. The chunks
  // are small and this is the page you land on before sitting anything.
  useEffect(() => {
    let alive = true
    void Promise.all(
      EXAM_LEVELS.map((level) => loadBank(level).then((q) => [level, q.length] as const)),
    ).then((pairs) => {
      if (alive) setSizes(Object.fromEntries(pairs))
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="relative">
      <div className="aurora opacity-40" />

      <div className="relative mx-auto max-w-4xl px-4 pt-12 pb-16 sm:px-6">
        <Reveal>
          <h1 className="flex items-center gap-2.5 text-3xl font-black tracking-tight sm:text-4xl">
            <IconTarget className="text-brand-400" width={26} height={26} />
            {t('examTitle')}
          </h1>
          <p className="mt-2 max-w-2xl text-content-muted">{t('examIntro')}</p>
          <p className="mt-1 text-sm text-content-faint">
            {t('examPassMark')}: {PASS_PERCENT}%
          </p>
        </Reveal>

        <div className="mt-8 space-y-4">
          {EXAM_LEVELS.map((level, i) => {
            const size = sizes[level]
            const ready = isBankReady(size)
            const record = records[level]
            const phases = phasesForLevel(level)

            return (
              <Reveal key={level} delay={i * 0.05}>
                <div
                  className={cn(
                    'rounded-2xl border border-line bg-surface p-5 transition-colors',
                    ready && 'hover:border-brand-400/60',
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <LevelBadge level={level} />
                        <span className="text-sm text-content-faint">
                          {size !== undefined && `${size} ${t('examBankSize')}`}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-content-muted">
                        <span className="font-semibold text-content">{t('examCovers')}:</span>{' '}
                        {phases.map((p) => L(p.title)).join(' · ')}
                      </p>

                      {record && (
                        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <span
                            className={cn(
                              'font-bold',
                              record.passed
                                ? 'text-[var(--color-level-beginner)]'
                                : 'text-content-muted',
                            )}
                          >
                            {t('examBest')}: {record.best}%
                          </span>
                          <span className="text-content-faint">
                            {t('examAttempts')}: {record.attempts}
                          </span>
                          {record.passed && (
                            <span className="text-[var(--color-level-beginner)]">
                              ✓ {t('examPassed')}
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      {ready ? (
                        <ButtonLink to={`/exam/${level}`} size="sm">
                          {record ? t('examRetake') : t('examStart')}
                          <IconChevron className="flip-rtl" width={15} height={15} />
                        </ButtonLink>
                      ) : (
                        <span className="inline-block rounded-full border border-line px-3 py-1.5 text-xs font-bold text-content-faint">
                          {t('examNotReady')}
                        </span>
                      )}
                    </div>
                  </div>

                  {!ready && size !== undefined && (
                    <p className="mt-3 border-t border-line pt-3 text-sm text-content-faint">
                      {t('examNotReadyBody')}
                    </p>
                  )}

                  {ready && (
                    <p
                      className="mt-3 border-t border-line pt-3 text-xs text-content-faint"
                      style={{ borderColor: `color-mix(in srgb, ${LEVEL_COLOR[level]} 20%, transparent)` }}
                    >
                      {QUESTIONS_PER_EXAM} {t('examOf')} {size} · {t(LEVEL_LABEL_KEY[level])}
                    </p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-sm text-content-faint">
            <Link to="/roadmap" className="underline underline-offset-2 hover:text-content">
              {t('backToRoadmap')}
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  )
}

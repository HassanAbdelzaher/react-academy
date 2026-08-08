import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { RichText } from '@/components/lesson/RichText'
import { IconCheck, IconChevron, IconClose, IconTarget } from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { useDocumentTitle } from '@/lib/useDocumentTitle'
import { examStore } from '@/lib/examResults'
import { buildPaper, scorePaper, type PaperItem } from '@/lib/exam'
import {
  getBank,
  isBankReady,
  loadBank,
  PASS_PERCENT,
  QUESTIONS_PER_EXAM,
  type ExamLevel,
} from '@/content/exam'
import { getPhase } from '@/content/phases'
import { LEVEL_ORDER, LEVEL_LABEL_KEY } from '@/content/types'
import { NotFoundPage } from './NotFoundPage'
import { cn } from '@/lib/cn'

function isLevel(value: string | undefined): value is ExamLevel {
  return !!value && (LEVEL_ORDER as string[]).includes(value)
}

export function ExamRunPage() {
  const { level } = useParams()
  const { t, L } = useI18n()
  const valid = isLevel(level)

  const [paper, setPaper] = useState<PaperItem[] | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [current, setCurrent] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  /** Bumped to draw a fresh paper without remounting the route. */
  const [attempt, setAttempt] = useState(0)

  useDocumentTitle(valid ? `${t(LEVEL_LABEL_KEY[level])} — ${t('examTitle')}` : t('notFoundTitle'))

  useEffect(() => {
    if (!valid) return
    let alive = true

    setPaper(null)
    setSubmitted(false)
    setCurrent(0)

    void loadBank(level).then((bank) => {
      if (!alive) return
      const drawn = buildPaper(bank, QUESTIONS_PER_EXAM)
      setPaper(drawn)
      setAnswers(new Array(drawn.length).fill(null))
    })

    return () => {
      alive = false
    }
  }, [level, valid, attempt])

  const result = useMemo(
    () => (paper && submitted ? scorePaper(paper, answers) : null),
    [paper, submitted, answers],
  )

  if (!valid) return <NotFoundPage />

  const bank = getBank(level)
  if (bank && !isBankReady(bank.length)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-black">{t('examNotReady')}</h1>
        <p className="mt-2 text-content-muted">{t('examNotReadyBody')}</p>
        <ButtonLink to="/exam" className="mt-6">
          {t('examBackToList')}
        </ButtonLink>
      </div>
    )
  }

  if (!paper) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20" aria-busy="true">
        <p className="text-center text-content-muted">{t('examLoading')}</p>
        <div className="mt-6 h-40 animate-pulse rounded-2xl border border-line bg-surface-2/50" />
      </div>
    )
  }

  const answeredCount = answers.filter((a) => a !== null).length

  function choose(optionIndex: number) {
    if (submitted) return
    setAnswers((prev) => {
      const next = prev.slice()
      next[current] = optionIndex
      return next
    })
  }

  function finish() {
    if (!paper) return
    const marked = scorePaper(paper, answers)
    examStore.record(level as ExamLevel, marked.percent, marked.passed)
    setSubmitted(true)
    window.scrollTo({ top: 0 })
  }

  // ---------------------------------------------------------------- result
  if (submitted && result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm text-content-faint">
          <Link to="/exam" className="hover:text-content">
            {t('examBackToList')}
          </Link>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-line bg-surface p-6 text-center"
        >
          <p className="text-sm font-bold tracking-widest text-content-faint uppercase">
            {t('examResultTitle')}
          </p>
          <p
            className={cn(
              'mt-2 text-5xl font-black',
              result.passed ? 'text-[var(--color-level-beginner)]' : 'text-[#fb7185]',
            )}
          >
            {result.percent}%
          </p>
          <p className="mt-1 font-bold">
            {result.passed ? t('examPassed') : t('examFailed')}
          </p>
          <p className="mt-1 text-sm text-content-muted">
            {result.correct} / {result.total} · {t('examPassMark')} {PASS_PERCENT}%
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button size="sm" onClick={() => setAttempt((n) => n + 1)}>
              {t('examRetake')}
            </Button>
            <ButtonLink to="/exam" variant="secondary" size="sm">
              {t('examBackToList')}
            </ButtonLink>
          </div>
        </motion.div>

        {/* per-phase breakdown */}
        <section className="mt-8">
          <h2 className="text-lg font-black tracking-tight">{t('examByPhase')}</h2>
          <ul className="mt-3 space-y-2">
            {result.byPhase.map((row) => {
              const phase = getPhase(row.phase)
              const pct = Math.round((row.correct / row.total) * 100)
              return (
                <li
                  key={row.phase}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <span aria-hidden="true">{phase?.icon}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {phase ? L(phase.title) : row.phase}
                  </span>
                  <span className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-3">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: phase?.accent ?? 'var(--color-brand-400)',
                      }}
                    />
                  </span>
                  <span className="w-14 shrink-0 text-end font-mono text-xs text-content-muted">
                    {row.correct}/{row.total}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>

        {/* full review */}
        <section className="mt-8">
          <h2 className="text-lg font-black tracking-tight">{t('examReview')}</h2>
          <ol className="mt-3 space-y-4">
            {paper.map((item, i) => {
              const picked = answers[i]
              const correctIndex = item.options.findIndex((o) => o.correct)
              const gotIt = picked !== null && item.options[picked]?.correct
              return (
                <li key={item.question.id} className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white',
                        gotIt ? 'bg-[var(--color-level-beginner)]' : 'bg-[#fb7185]',
                      )}
                    >
                      {gotIt ? (
                        <IconCheck width={13} height={13} />
                      ) : (
                        <IconClose width={13} height={13} strokeWidth={3} />
                      )}
                    </span>
                    <p className="font-bold">
                      <RichText>{L(item.question.question)}</RichText>
                    </p>
                  </div>

                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex flex-wrap gap-x-2">
                      <dt className="text-content-faint">{t('examYourAnswer')}:</dt>
                      <dd className={cn(gotIt ? 'text-content' : 'text-[#fb7185]')}>
                        {picked === null ? (
                          <em>{t('examSkipped')}</em>
                        ) : (
                          <RichText>{L(item.options[picked].text)}</RichText>
                        )}
                      </dd>
                    </div>
                    {!gotIt && (
                      <div className="flex flex-wrap gap-x-2">
                        <dt className="text-content-faint">{t('examCorrectAnswer')}:</dt>
                        <dd className="text-[var(--color-level-beginner)]">
                          <RichText>{L(item.options[correctIndex].text)}</RichText>
                        </dd>
                      </div>
                    )}
                  </dl>

                  <p className="mt-2.5 border-t border-line pt-2.5 text-sm text-content-muted">
                    <RichText>{L(item.question.explain)}</RichText>
                  </p>
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    )
  }

  // ---------------------------------------------------------------- sitting
  const item = paper[current]
  const picked = answers[current]

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <LevelBadge level={level} />
        <p className="font-mono text-xs text-content-faint">
          {t('examQuestionCounter')} {current + 1} {t('examOf')} {paper.length} ·{' '}
          {answeredCount} {t('examAnswered')}
        </p>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-3">
        <motion.div
          className="h-full rounded-full bg-brand-400"
          animate={{ width: `${((current + 1) / paper.length) * 100}%` }}
          transition={{ duration: 0.25 }}
        />
      </div>

      <motion.div
        key={item.question.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6"
      >
        <p className="flex items-center gap-2 text-[0.7rem] font-black tracking-widest text-content-faint uppercase">
          <IconTarget width={14} height={14} />
          {getPhase(item.question.phase)?.icon} {L(getPhase(item.question.phase)?.title)}
        </p>

        <h1 className="mt-2 text-lg font-bold sm:text-xl">
          <RichText>{L(item.question.question)}</RichText>
        </h1>

        <ul className="mt-4 space-y-2">
          {item.options.map((opt, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                aria-pressed={picked === i}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-start text-sm transition-all',
                  picked === i
                    ? 'border-brand-400 bg-brand-400/10'
                    : 'border-line bg-surface hover:border-brand-400/60 hover:-translate-y-0.5',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border font-mono text-[0.65rem] font-bold',
                    picked === i
                      ? 'border-transparent bg-brand-400 text-[#04121b]'
                      : 'border-line-strong text-content-faint',
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">
                  <RichText>{L(opt.text)}</RichText>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrent((n) => Math.max(0, n - 1))}
          disabled={current === 0}
        >
          <IconChevron className="rotate-180 flip-rtl" width={15} height={15} />
          {t('examPrev')}
        </Button>

        {current < paper.length - 1 ? (
          <Button size="sm" onClick={() => setCurrent((n) => n + 1)}>
            {t('examNext')}
            <IconChevron className="flip-rtl" width={15} height={15} />
          </Button>
        ) : (
          <Button size="sm" onClick={finish}>
            {t('examFinish')}
          </Button>
        )}
      </div>

      {answeredCount < paper.length && current === paper.length - 1 && (
        <p className="mt-3 text-center text-sm text-content-faint">{t('examUnansweredWarning')}</p>
      )}
    </div>
  )
}

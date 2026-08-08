import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { RichText } from './RichText'
import { IconCheck, IconClose, IconTarget } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import type { QuizBlock } from '@/content/blocks'

export function Quiz({ block }: { block: QuizBlock }) {
  const { t, L } = useI18n()
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = answered && block.options[picked]?.correct === true

  return (
    <div className="my-6 rounded-2xl border border-line bg-surface-2/50 p-5">
      <p className="flex items-center gap-2 text-[0.7rem] font-black tracking-widest text-content-faint uppercase">
        <IconTarget width={14} height={14} />
        {L({ en: 'Check yourself', ar: 'اختبر نفسك' })}
      </p>

      <p className="mt-2 font-bold">
        <RichText>{L(block.question)}</RichText>
      </p>

      <ul className="mt-3.5 space-y-2">
        {block.options.map((opt, i) => {
          const isPicked = picked === i
          const showCorrect = answered && opt.correct
          const showWrong = isPicked && !opt.correct
          return (
            <li key={i}>
              <button
                type="button"
                // `aria-disabled` rather than `disabled`: a disabled button is
                // dropped from the tab order, so answering with the keyboard
                // would throw focus back to the top of the document and make the
                // options unreadable afterwards.
                aria-disabled={answered}
                onClick={() => !answered && setPicked(i)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-start text-sm transition-all',
                  !answered && 'border-line bg-surface hover:border-brand-400 hover:-translate-y-0.5',
                  showCorrect && 'border-[var(--color-level-beginner)] bg-[color-mix(in_srgb,var(--color-level-beginner)_12%,transparent)]',
                  showWrong && 'border-[#fb7185] bg-[color-mix(in_srgb,#fb7185_12%,transparent)]',
                  answered && !showCorrect && !showWrong && 'border-line bg-surface opacity-60',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border font-mono text-[0.65rem] font-bold',
                    showCorrect && 'border-transparent bg-[var(--color-level-beginner)] text-white',
                    showWrong && 'border-transparent bg-[#fb7185] text-white',
                    !showCorrect && !showWrong && 'border-line-strong text-content-faint',
                  )}
                >
                  {showCorrect ? (
                    <IconCheck width={11} height={11} />
                  ) : showWrong ? (
                    <IconClose width={11} height={11} strokeWidth={3} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="flex-1">
                  <RichText>{L(opt.text)}</RichText>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {/* The verdict appears without focus moving, so it has to announce itself. */}
            <div
              className="mt-3.5 rounded-xl border border-line bg-surface p-4 text-sm"
              role="status"
            >
              <p className={cn('font-bold', correct ? 'text-[var(--color-level-beginner)]' : 'text-[#fb7185]')}>
                {correct ? t('quizCorrect') : t('quizWrong')}
              </p>
              <p className="mt-1 text-content-muted">
                <RichText>{L(block.explain)}</RichText>
              </p>
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="mt-2.5 text-xs font-bold text-content-faint underline underline-offset-2 hover:text-content"
              >
                {L({ en: 'Try again', ar: 'حاول مرة أخرى' })}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

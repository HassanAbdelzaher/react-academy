import { motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { VisualFrame, type VisualStep } from './VisualFrame'
import { useStepper } from './useStepper'
import { cn } from '@/lib/cn'

const STEPS: VisualStep[] = [
  {
    label: { en: 'A user does something', ar: 'المستخدم يفعل شيئًا' },
    body: {
      en: 'A click, a keystroke, a response arriving. Your handler runs — this is ordinary JavaScript.',
      ar: 'نقرة أو ضغطة مفتاح أو وصول استجابة. يعمل معالجك — وهذه جافاسكربت عادية.',
    },
  },
  {
    label: { en: 'You set state', ar: 'تُحدِّث الحالة' },
    body: {
      en: '`setState` does not change a variable in place. It tells React "the next value is this" and schedules a render.',
      ar: '`setState` لا تغيّر متغيّرًا في مكانه، بل تخبر رياكت أن «القيمة التالية هي هذه» وتجدول عملية عرض.',
    },
  },
  {
    label: { en: 'React re-renders', ar: 'رياكت تعيد العرض' },
    body: {
      en: 'Your component function runs again with the new value and returns fresh JSX describing what the screen should look like.',
      ar: 'تعمل دالة مكوّنك مجددًا بالقيمة الجديدة وتُعيد JSX جديدة تصف ما يجب أن تبدو عليه الشاشة.',
    },
  },
  {
    label: { en: 'The screen matches state', ar: 'الشاشة تطابق الحالة' },
    body: {
      en: 'React updates the DOM for you. The loop is closed: UI is always a function of state, never something you patch by hand.',
      ar: 'تحدّث رياكت DOM نيابةً عنك. وتُغلق الحلقة: الواجهة دائمًا دالة للحالة، لا شيء ترقّعه يدويًا.',
    },
  },
]

const NODES = [
  { label: { en: 'Event', ar: 'حدث' }, icon: '👆' },
  { label: { en: 'setState', ar: 'setState' }, icon: '📥' },
  { label: { en: 'Render', ar: 'عرض' }, icon: '⚛️' },
  { label: { en: 'UI', ar: 'الواجهة' }, icon: '🖥️' },
]

/** Positions on a circle, in percent. */
const POS = [
  { x: 50, y: 6 },
  { x: 92, y: 50 },
  { x: 50, y: 94 },
  { x: 8, y: 50 },
]

export function StateFlowVisual() {
  const { L } = useI18n()
  const s = useStepper(STEPS.length, 2400)

  return (
    <VisualFrame
      title={{ en: 'The one-way data loop', ar: 'حلقة البيانات أحادية الاتجاه' }}
      description={{
        en: 'State changes, React re-renders, the screen follows. It only ever runs in this direction.',
        ar: 'تتغيّر الحالة فتُعيد رياكت العرض فتتبع الشاشة. ولا تسير الحلقة إلا في هذا الاتجاه.',
      }}
      steps={STEPS}
      step={s.step}
      playing={s.playing}
      onStep={s.setStep}
      onNext={s.next}
      onPrev={s.prev}
      onTogglePlay={s.togglePlay}
      accent="var(--color-level-beginner)"
    >
      <div className="relative mx-auto aspect-square w-full max-w-[320px]">
        {/* orbit ring */}
        <div className="absolute inset-[13%] rounded-full border-2 border-dashed border-line" />

        {/* travelling dot */}
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-[var(--color-level-beginner)] shadow-[0_0_14px_var(--color-level-beginner)]"
          animate={{
            left: `${POS[s.step].x}%`,
            top: `${POS[s.step].y}%`,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          style={{ translate: '-50% -50%' }}
        />

        {NODES.map((n, i) => {
          const active = i === s.step
          return (
            <motion.div
              key={i}
              animate={{ scale: active ? 1.06 : 1 }}
              className={cn(
                'absolute grid w-[86px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border px-2 py-2 text-center',
                active
                  ? 'border-[var(--color-level-beginner)] bg-[color-mix(in_srgb,var(--color-level-beginner)_14%,transparent)]'
                  : 'border-line bg-surface',
              )}
              style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
            >
              <span className="text-lg" aria-hidden="true">
                {n.icon}
              </span>
              <span
                className={cn(
                  'font-mono text-[0.66rem] font-bold',
                  active ? 'text-[var(--color-level-beginner)]' : 'text-content-muted',
                )}
              >
                {L(n.label)}
              </span>
            </motion.div>
          )
        })}

        {/* centre note */}
        <div className="absolute inset-0 grid place-items-center">
          <p className="max-w-[120px] text-center text-[0.68rem] leading-tight text-content-faint">
            {L({ en: 'UI = f(state)', ar: 'الواجهة = دالة(الحالة)' })}
          </p>
        </div>
      </div>
    </VisualFrame>
  )
}

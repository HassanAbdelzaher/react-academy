import { motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { VisualFrame, type VisualStep } from './VisualFrame'
import { useStepper } from './useStepper'
import { cn } from '@/lib/cn'

const STEPS: VisualStep[] = [
  {
    label: { en: 'Trigger', ar: 'التحفيز' },
    body: {
      en: 'Something asks React for an update — a click calls `setCount`, or the component mounts for the first time. Nothing has been drawn yet.',
      ar: 'شيء ما يطلب من رياكت تحديثًا — نقرة تستدعي `setCount`، أو المكوّن يُركَّب لأول مرة. لم يُرسم شيء بعد.',
    },
  },
  {
    label: { en: 'Render', ar: 'العرض' },
    body: {
      en: 'React calls your component function. It does not touch the DOM here — it just collects the JSX you return and compares it with the previous result.',
      ar: 'تستدعي رياكت دالة مكوّنك. لا تلمس DOM هنا — بل تجمع JSX الذي أعدته وتقارنه بالنتيجة السابقة.',
    },
  },
  {
    label: { en: 'Commit', ar: 'التثبيت' },
    body: {
      en: 'Only the differences are applied to the real DOM. One text node changed here, so exactly one text node is written.',
      ar: 'تُطبَّق الفروق فقط على DOM الحقيقي. تغيّرت عقدة نصية واحدة هنا، فتُكتب عقدة نصية واحدة بالضبط.',
    },
  },
  {
    label: { en: 'Browser paint', ar: 'رسم المتصفّح' },
    body: {
      en: 'The browser paints the updated DOM. Effects that you scheduled with `useEffect` run after this point.',
      ar: 'يرسم المتصفّح DOM المحدَّث. والتأثيرات التي جدولتها بـ `useEffect` تعمل بعد هذه النقطة.',
    },
  },
]

const LANES = [
  { en: 'Your event', ar: 'حدثك' },
  { en: 'React', ar: 'رياكت' },
  { en: 'React', ar: 'رياكت' },
  { en: 'Browser', ar: 'المتصفّح' },
]

export function RenderCommitVisual() {
  const { L } = useI18n()
  const s = useStepper(STEPS.length)

  return (
    <VisualFrame
      title={{ en: 'What happens when state changes', ar: 'ماذا يحدث عند تغيّر الحالة' }}
      description={{
        en: 'Trigger → render → commit → paint, one step at a time.',
        ar: 'تحفيز ← عرض ← تثبيت ← رسم، خطوة بخطوة.',
      }}
      steps={STEPS}
      step={s.step}
      playing={s.playing}
      onStep={s.setStep}
      onNext={s.next}
      onPrev={s.prev}
      onTogglePlay={s.togglePlay}
    >
      {/* pipeline */}
      <ol className="flex flex-wrap items-stretch gap-2" dir="ltr">
        {STEPS.map((step, i) => {
          const active = i === s.step
          const passed = i < s.step
          return (
            <li key={i} className="flex flex-1 items-center gap-2">
              <motion.div
                animate={{ scale: active ? 1 : 0.97, opacity: active || passed ? 1 : 0.45 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex-1 rounded-xl border px-3 py-2.5',
                  active ? 'border-brand-400 bg-brand-400/12' : 'border-line bg-surface',
                )}
              >
                <p className="text-[0.6rem] font-bold tracking-widest text-content-faint uppercase">
                  {L(LANES[i])}
                </p>
                <p className={cn('text-sm font-bold', active && 'text-brand-400')}>
                  {L(step.label)}
                </p>
              </motion.div>
              {i < STEPS.length - 1 && (
                <motion.span
                  animate={{ opacity: i < s.step ? 1 : 0.25 }}
                  className="text-content-faint"
                >
                  →
                </motion.span>
              )}
            </li>
          )
        })}
      </ol>

      {/* component / dom */}
      <div className="mt-5 grid gap-3 md:grid-cols-2" dir="ltr">
        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="mb-2 font-mono text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            Counter.tsx
          </p>
          <pre className="font-mono text-[0.72rem] leading-relaxed text-content-muted">
            <code>{`function Counter() {\n  const [n, setN] = useState(`}</code>
            <motion.code
              key={`n-${s.step}`}
              animate={{ color: s.step >= 1 ? 'var(--color-brand-400)' : 'inherit' }}
              className="font-bold"
            >
              {s.step >= 1 ? '1' : '0'}
            </motion.code>
            <code>{`);\n  return <p>{n} clicks</p>;\n}`}</code>
          </pre>
          {s.step === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs text-brand-400"
            >
              {L({ en: 'function called → JSX returned', ar: 'استُدعيت الدالة ← أُعيدت JSX' })}
            </motion.p>
          )}
        </div>

        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="mb-2 font-mono text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            DOM
          </p>
          <motion.div
            animate={
              s.step >= 2
                ? { borderColor: 'var(--color-brand-400)', backgroundColor: 'rgba(88,196,220,.08)' }
                : { borderColor: 'var(--surface-line)', backgroundColor: 'transparent' }
            }
            className="rounded-lg border border-dashed p-3 font-mono text-sm"
          >
            &lt;p&gt;
            <motion.span
              key={`dom-${s.step >= 2 ? 1 : 0}`}
              initial={{ opacity: 0.3, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn('font-bold', s.step >= 2 && 'text-brand-400')}
            >
              {s.step >= 2 ? '1' : '0'} clicks
            </motion.span>
            &lt;/p&gt;
          </motion.div>
          <p className="mt-2 text-xs text-content-faint">
            {s.step >= 2
              ? L({ en: '1 text node updated', ar: 'تحديث عقدة نصية واحدة' })
              : L({ en: 'untouched', ar: 'دون مساس' })}
          </p>
        </div>
      </div>
    </VisualFrame>
  )
}

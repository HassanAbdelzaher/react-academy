import { motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { VisualFrame, type VisualStep } from './VisualFrame'
import { useStepper } from './useStepper'
import { cn } from '@/lib/cn'

const STEPS: VisualStep[] = [
  {
    label: { en: 'Mount', ar: 'التركيب' },
    body: {
      en: 'The component renders for the first time and React puts it in the DOM. Your effect has not run yet.',
      ar: 'يُعرض المكوّن لأول مرة وتضعه رياكت في DOM. ولم يعمل تأثيرك بعد.',
    },
  },
  {
    label: { en: 'Effect runs', ar: 'تشغيل التأثير' },
    body: {
      en: 'After the browser paints, React runs your effect — subscribe, start a timer, fetch. This is the "connect" half.',
      ar: 'بعد رسم المتصفّح تشغّل رياكت تأثيرك — اشتراك أو مؤقّت أو جلب بيانات. وهذا نصف «الاتصال».',
    },
  },
  {
    label: { en: 'A dependency changes', ar: 'تغيّر اعتمادية' },
    body: {
      en: 'React first runs your cleanup with the **old** values, then runs the effect again with the new ones. Not "on update" — on _change of what it depends on_.',
      ar: 'تشغّل رياكت دالة التنظيف أولًا بالقيم **القديمة**، ثم تشغّل التأثير من جديد بالقيم الجديدة. ليس «عند كل تحديث» بل _عند تغيّر ما يعتمد عليه_.',
    },
  },
  {
    label: { en: 'Unmount', ar: 'الإزالة' },
    body: {
      en: 'The component leaves the screen and cleanup runs one last time. Forget this and you leak timers, sockets and listeners.',
      ar: 'يغادر المكوّن الشاشة وتعمل دالة التنظيف مرة أخيرة. أهملها وستُسرِّب مؤقّتات ومقابس ومستمعين.',
    },
  },
]

interface Marker {
  at: number
  label: string
  kind: 'render' | 'effect' | 'cleanup'
  step: number
}

const MARKERS: Marker[] = [
  { at: 6, label: 'render', kind: 'render', step: 0 },
  { at: 24, label: 'effect()', kind: 'effect', step: 1 },
  { at: 46, label: 'cleanup()', kind: 'cleanup', step: 2 },
  { at: 58, label: 'render', kind: 'render', step: 2 },
  { at: 70, label: 'effect()', kind: 'effect', step: 2 },
  { at: 92, label: 'cleanup()', kind: 'cleanup', step: 3 },
]

const KIND_COLOR: Record<Marker['kind'], string> = {
  render: 'var(--color-brand-400)',
  effect: 'var(--color-level-beginner)',
  cleanup: 'var(--color-level-intermediate)',
}

export function HooksTimelineVisual() {
  const { L } = useI18n()
  const s = useStepper(STEPS.length, 2800)
  const progress = [12, 30, 74, 100][s.step]

  return (
    <VisualFrame
      title={{ en: 'The life of an Effect', ar: 'دورة حياة التأثير' }}
      description={{
        en: 'When your effect body runs, when its cleanup runs, and why the order matters.',
        ar: 'متى يعمل جسم التأثير، ومتى تعمل دالة التنظيف، ولماذا يهمّ الترتيب.',
      }}
      steps={STEPS}
      step={s.step}
      playing={s.playing}
      onStep={s.setStep}
      onNext={s.next}
      onPrev={s.prev}
      onTogglePlay={s.togglePlay}
      accent="var(--color-level-intermediate)"
    >
      {/* timeline */}
      <div className="relative mt-10 mb-14 h-1 rounded-full bg-line" dir="ltr">
        <motion.div
          className="absolute inset-y-0 start-0 rounded-full bg-[var(--color-level-intermediate)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {MARKERS.map((m, i) => {
          const visible = m.step <= s.step
          const color = KIND_COLOR[m.kind]
          const above = i % 2 === 0
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.at}%` }}
              animate={{ opacity: visible ? 1 : 0.2, scale: visible ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="block h-3 w-3 rounded-full border-2"
                style={{ borderColor: color, background: visible ? color : 'var(--surface-1)' }}
              />
              <span
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 rounded-md border px-1.5 py-0.5 font-mono text-[0.62rem] whitespace-nowrap',
                  above ? 'bottom-5' : 'top-5',
                )}
                style={{
                  color,
                  borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                  background: `color-mix(in srgb, ${color} 10%, var(--surface-1))`,
                }}
              >
                {m.label}
              </span>
            </motion.div>
          )
        })}

        {/* phase labels */}
        {[
          { at: 6, text: { en: 'mount', ar: 'تركيب' } },
          { at: 58, text: { en: 'update', ar: 'تحديث' } },
          { at: 92, text: { en: 'unmount', ar: 'إزالة' } },
        ].map((p) => (
          <span
            key={p.at}
            className="absolute top-9 -translate-x-1/2 text-[0.6rem] font-bold tracking-widest text-content-faint uppercase"
            style={{ left: `${p.at}%` }}
          >
            {L(p.text)}
          </span>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-3.5" dir="ltr">
        <pre className="font-mono text-[0.72rem] leading-relaxed text-content-muted">
          <code>{`useEffect(() => {
  const id = setInterval(tick, 1000);   // ← effect body
  return () => clearInterval(id);       // ← cleanup
}, [delay]);                            // ← dependencies`}</code>
        </pre>
      </div>
    </VisualFrame>
  )
}

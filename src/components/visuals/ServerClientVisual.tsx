import { motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { VisualFrame, type VisualStep } from './VisualFrame'
import { useStepper } from './useStepper'
import { cn } from '@/lib/cn'

const STEPS: VisualStep[] = [
  {
    label: { en: 'One tree, two places', ar: 'شجرة واحدة ومكانان' },
    body: {
      en: 'In a Server Components app every component is a Server Component by default. Only files marked `"use client"` become part of the browser bundle.',
      ar: 'في تطبيق يستخدم مكوّنات الخادم، كل مكوّن هو مكوّن خادم افتراضيًا. وفقط الملفات المعلَّمة بـ `"use client"` تدخل حزمة المتصفّح.',
    },
  },
  {
    label: { en: 'The server renders first', ar: 'الخادم يعرض أولًا' },
    body: {
      en: 'Server Components run where your data is. They can read the database directly — no API route, no loading spinner, no client-side fetch.',
      ar: 'تعمل مكوّنات الخادم حيث توجد بياناتك. يمكنها قراءة قاعدة البيانات مباشرة — بلا مسار API ولا مؤشّر تحميل ولا جلب من العميل.',
    },
  },
  {
    label: { en: 'Only interactive parts ship', ar: 'فقط الأجزاء التفاعلية تُرسَل' },
    body: {
      en: 'The browser receives rendered output for server parts and JavaScript only for the client islands — the button, the form, the chart.',
      ar: 'يستقبل المتصفّح ناتجًا جاهزًا لأجزاء الخادم، وجافاسكربت فقط للجزر التفاعلية — الزر والنموذج والرسم البياني.',
    },
  },
  {
    label: { en: 'Why it matters', ar: 'لماذا يهمّ هذا' },
    body: {
      en: 'Less JavaScript downloaded and parsed means a faster first interaction, especially on a mid-range phone. That is the whole point.',
      ar: 'تنزيل وتحليل جافاسكربت أقل يعني تفاعلًا أوّل أسرع، خصوصًا على هاتف متوسط. وهذا هو الهدف كله.',
    },
  },
]

interface Piece {
  name: string
  client: boolean
  kb: number
}

const PIECES: Piece[] = [
  { name: '<Page>', client: false, kb: 0 },
  { name: '<ProductList>', client: false, kb: 0 },
  { name: '<Reviews>', client: false, kb: 0 },
  { name: '<AddToCart>', client: true, kb: 4 },
  { name: '<Rating>', client: true, kb: 3 },
]

export function ServerClientVisual() {
  const { L } = useI18n()
  const s = useStepper(STEPS.length, 3000)
  const shipped = PIECES.filter((p) => p.client).reduce((n, p) => n + p.kb, 0)

  return (
    <VisualFrame
      title={{ en: 'Server Components vs. Client Components', ar: 'مكوّنات الخادم مقابل مكوّنات العميل' }}
      description={{
        en: 'What runs where, and what actually reaches the browser.',
        ar: 'ما الذي يعمل أين، وما الذي يصل فعلًا إلى المتصفّح.',
      }}
      steps={STEPS}
      step={s.step}
      playing={s.playing}
      onStep={s.setStep}
      onNext={s.next}
      onPrev={s.prev}
      onTogglePlay={s.togglePlay}
      accent="var(--color-level-pro)"
    >
      <div className="grid gap-3 md:grid-cols-2" dir="ltr">
        {/* server */}
        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="mb-2.5 flex items-center gap-1.5 text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            🖧 {L({ en: 'Server', ar: 'الخادم' })}
          </p>
          <ul className="space-y-1.5">
            {PIECES.map((p, i) => {
              const stays = !p.client
              const active = s.step >= 1 && stays
              return (
                <motion.li
                  key={p.name}
                  animate={{
                    opacity: s.step >= 2 && p.client ? 0.28 : 1,
                    x: 0,
                  }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'rounded-lg border px-2.5 py-1.5 font-mono text-xs',
                    active
                      ? 'border-[var(--color-level-pro)] bg-[color-mix(in_srgb,var(--color-level-pro)_12%,transparent)] text-[var(--color-level-pro)]'
                      : 'border-line text-content-muted',
                  )}
                >
                  {p.name}
                  {p.client && (
                    <span className="ms-1.5 text-[0.62rem] text-content-faint">"use client"</span>
                  )}
                </motion.li>
              )
            })}
          </ul>
          <motion.p
            animate={{ opacity: s.step >= 1 ? 1 : 0.3 }}
            className="mt-2.5 text-[0.68rem] text-content-faint"
          >
            {L({ en: 'reads the database directly', ar: 'يقرأ قاعدة البيانات مباشرة' })}
          </motion.p>
        </div>

        {/* browser */}
        <div className="rounded-xl border border-line bg-surface p-3.5">
          <p className="mb-2.5 flex items-center gap-1.5 text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            🖥 {L({ en: 'Browser', ar: 'المتصفّح' })}
          </p>

          <motion.div
            animate={{ opacity: s.step >= 2 ? 1 : 0.25 }}
            className="rounded-lg border border-dashed border-line p-2.5"
          >
            <p className="mb-1.5 text-[0.62rem] text-content-faint">
              {L({ en: 'rendered output (no JS)', ar: 'ناتج جاهز (بلا جافاسكربت)' })}
            </p>
            <div className="space-y-1">
              {PIECES.filter((p) => !p.client).map((p) => (
                <div key={p.name} className="h-2 rounded-full bg-surface-3" />
              ))}
            </div>
          </motion.div>

          <motion.ul
            animate={{ opacity: s.step >= 2 ? 1 : 0.25 }}
            className="mt-2.5 space-y-1.5"
          >
            {PIECES.filter((p) => p.client).map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between rounded-lg border border-[var(--color-brand-400)]/40 bg-brand-400/10 px-2.5 py-1.5 font-mono text-xs text-brand-400"
              >
                {p.name}
                <span className="text-[0.62rem]">{p.kb} kB JS</span>
              </li>
            ))}
          </motion.ul>

          <motion.p
            animate={{ opacity: s.step >= 3 ? 1 : 0.3 }}
            className="mt-3 text-xs font-bold text-[var(--color-level-beginner)]"
          >
            {L({
              en: `JavaScript shipped: ${shipped} kB instead of the whole page`,
              ar: `جافاسكربت المُرسَلة: ${shipped} كيلوبايت بدل الصفحة كاملة`,
            })}
          </motion.p>
        </div>
      </div>
    </VisualFrame>
  )
}

import { motion } from 'motion/react'
import { useI18n } from '@/i18n/context'
import { VisualFrame, type VisualStep } from './VisualFrame'
import { useStepper } from './useStepper'
import { cn } from '@/lib/cn'

const STEPS: VisualStep[] = [
  {
    label: { en: 'Two trees', ar: 'شجرتان' },
    body: {
      en: 'After a render React holds the previous element tree and the new one. Both are plain JavaScript objects, not DOM nodes.',
      ar: 'بعد العرض تحتفظ رياكت بشجرة العناصر السابقة والجديدة. كلتاهما كائنات جافاسكربت عادية وليست عقد DOM.',
    },
  },
  {
    label: { en: 'Compare by position and type', ar: 'المقارنة بالموضع والنوع' },
    body: {
      en: 'React walks both trees together. Same type in the same position means "keep this node and its state" — it never re-creates it.',
      ar: 'تمشي رياكت في الشجرتين معًا. النوع نفسه في الموضع نفسه يعني «احتفظ بهذه العقدة وحالتها» — ولا تُعيد إنشاءها أبدًا.',
    },
  },
  {
    label: { en: 'Mark what differs', ar: 'تحديد المختلف' },
    body: {
      en: 'Only one text value actually changed. Everything else is marked untouched, no matter how big the tree is.',
      ar: 'قيمة نصية واحدة فقط تغيّرت فعلًا. وكل ما عداها يُعلَّم كما هو مهما كبرت الشجرة.',
    },
  },
  {
    label: { en: 'Patch the DOM', ar: 'ترقيع DOM' },
    body: {
      en: 'React applies the smallest set of DOM operations it can. This is why "the virtual DOM is fast" — it is really "React does less DOM work".',
      ar: 'تُطبّق رياكت أقل مجموعة ممكنة من عمليات DOM. ولهذا يُقال إن «DOM الافتراضي سريع» — والحقيقة أن رياكت تعمل أقل على DOM.',
    },
  },
]

interface NodeSpec {
  tag: string
  text?: string
  depth: number
  changed?: boolean
}

const OLD: NodeSpec[] = [
  { tag: 'div.card', depth: 0 },
  { tag: 'h2', text: 'Inbox', depth: 1 },
  { tag: 'span.badge', text: '3', depth: 1, changed: true },
  { tag: 'ul', depth: 1 },
]

const NEW: NodeSpec[] = [
  { tag: 'div.card', depth: 0 },
  { tag: 'h2', text: 'Inbox', depth: 1 },
  { tag: 'span.badge', text: '4', depth: 1, changed: true },
  { tag: 'ul', depth: 1 },
]

function Tree({ nodes, step, side }: { nodes: NodeSpec[]; step: number; side: 'old' | 'new' }) {
  return (
    <ul className="space-y-1.5" dir="ltr">
      {nodes.map((n, i) => {
        const compared = step >= 1
        const isChanged = n.changed && step >= 2
        return (
          <motion.li
            key={n.tag}
            animate={{
              opacity: compared && !n.changed && step >= 2 ? 0.4 : 1,
              x: compared ? (side === 'old' ? 4 : -4) : 0,
            }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            style={{ marginInlineStart: n.depth * 16 }}
            className={cn(
              'rounded-lg border px-2.5 py-1.5 font-mono text-xs',
              isChanged
                ? 'border-brand-400 bg-brand-400/12 text-brand-400'
                : 'border-line bg-surface text-content-muted',
            )}
          >
            &lt;{n.tag}&gt;
            {n.text && <span className="font-bold"> {n.text}</span>}
          </motion.li>
        )
      })}
    </ul>
  )
}

export function ReconciliationVisual() {
  const { L } = useI18n()
  const s = useStepper(STEPS.length, 3000)

  return (
    <VisualFrame
      title={{ en: 'Reconciliation: how React diffs', ar: 'المطابقة: كيف تقارن رياكت' }}
      description={{
        en: 'Previous tree versus next tree, and the single DOM write that results.',
        ar: 'الشجرة السابقة مقابل الجديدة، والكتابة الوحيدة الناتجة في DOM.',
      }}
      steps={STEPS}
      step={s.step}
      playing={s.playing}
      onStep={s.setStep}
      onNext={s.next}
      onPrev={s.prev}
      onTogglePlay={s.togglePlay}
      accent="var(--color-level-advanced)"
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="mb-2 text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            {L({ en: 'Previous render', ar: 'العرض السابق' })}
          </p>
          <Tree nodes={OLD} step={s.step} side="old" />
        </div>

        <motion.div
          animate={{ opacity: s.step >= 1 ? 1 : 0.3, scale: s.step >= 1 ? 1 : 0.9 }}
          className="hidden place-items-center text-2xl text-content-faint md:grid"
        >
          ⇄
        </motion.div>

        <div>
          <p className="mb-2 text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
            {L({ en: 'Next render', ar: 'العرض الجديد' })}
          </p>
          <Tree nodes={NEW} step={s.step} side="new" />
        </div>
      </div>

      <motion.div
        animate={{ opacity: s.step >= 3 ? 1 : 0.25 }}
        className="mt-4 rounded-xl border border-line bg-surface p-3.5"
        dir="ltr"
      >
        <p className="mb-1.5 text-[0.62rem] font-bold tracking-widest text-content-faint uppercase">
          {L({ en: 'DOM operations', ar: 'عمليات DOM' })}
        </p>
        {s.step >= 3 ? (
          <code className="font-mono text-xs text-[var(--color-level-beginner)]">
            badge.textContent = "4" &nbsp;
            <span className="text-content-faint">
              {L({ en: '// that is the whole update', ar: '// هذا هو كل التحديث' })}
            </span>
          </code>
        ) : (
          <code className="font-mono text-xs text-content-faint">
            {L({ en: 'nothing yet…', ar: 'لا شيء بعد…' })}
          </code>
        )}
      </motion.div>
    </VisualFrame>
  )
}

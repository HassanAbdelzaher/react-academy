import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { LevelBadge } from '@/components/ui/LevelBadge'
import { ProgressRing } from '@/components/ui/ProgressRing'
import {
  IconChart,
  IconChevron,
  IconCode,
  IconLayers,
  IconRocket,
  IconSparkles,
  IconTarget,
} from '@/components/ui/icons'
import { useI18n } from '@/i18n/context'
import { useDocumentTitle } from '@/lib/useDocumentTitle'
import { PHASES, TOTAL_LESSONS, TOTAL_MINUTES } from '@/content/phases'
import { LEVEL_ORDER, type Level } from '@/content/types'
import { usePhaseStats, useOverallProgress } from '@/hooks/useCourseProgress'
import type { Loc } from '@/i18n/types'

const STACK: { name: string; label: Loc; note: Loc; color: string }[] = [
  {
    name: 'TypeScript',
    color: '#3178c6',
    label: { en: 'Language', ar: 'اللغة' },
    note: { en: 'The industry default', ar: 'المعيار السائد' },
  },
  {
    name: 'Vite',
    color: '#a855f7',
    label: { en: 'Build tool', ar: 'أداة البناء' },
    note: { en: 'Instant dev server', ar: 'خادم تطوير فوري' },
  },
  {
    name: 'Next.js',
    color: '#ff7eb6',
    label: { en: 'Framework', ar: 'إطار العمل' },
    note: { en: 'Full-stack + RSC', ar: 'متكامل + مكوّنات خادم' },
  },
  {
    name: 'TanStack Query',
    color: '#22d3ee',
    label: { en: 'Server data', ar: 'بيانات الخادم' },
    note: { en: 'Caching & refetching', ar: 'تخزين وإعادة جلب' },
  },
  {
    name: 'Zustand',
    color: '#a98cff',
    label: { en: 'Client state', ar: 'حالة العميل' },
    note: { en: 'Tiny global store', ar: 'مخزن عام صغير' },
  },
  {
    name: 'Tailwind CSS',
    color: '#38bdf8',
    label: { en: 'Styling', ar: 'التنسيق' },
    note: { en: 'Utility-first', ar: 'نهج الأدوات' },
  },
  {
    name: 'RHF + Zod',
    color: '#c084fc',
    label: { en: 'Forms', ar: 'النماذج' },
    note: { en: 'Typed validation', ar: 'تحقّق مُنمَّط' },
  },
  {
    name: 'Vitest + Playwright',
    color: '#fb7185',
    label: { en: 'Testing', ar: 'الاختبار' },
    note: { en: 'Unit + end to end', ar: 'وحدة + شامل' },
  },
]

const FEATURES: { icon: typeof IconCode; title: Loc; body: Loc }[] = [
  {
    icon: IconCode,
    title: { en: 'Code you can edit', ar: 'كود يمكنك تعديله' },
    body: {
      en: 'Every example runs in the page. Change a line, break it on purpose, and watch what React does about it.',
      ar: 'كل مثال يعمل داخل الصفحة. غيّر سطرًا، واكسره عمدًا، وراقب كيف تتصرّف رياكت.',
    },
  },
  {
    icon: IconSparkles,
    title: { en: 'Animated explanations', ar: 'شروحات متحركة' },
    body: {
      en: 'Render and commit, reconciliation, state flow — the invisible parts of React drawn as moving diagrams.',
      ar: 'العرض والتثبيت والمطابقة وتدفّق الحالة — أجزاء رياكت الخفية مرسومة كرسوم متحركة.',
    },
  },
  {
    icon: IconTarget,
    title: { en: 'Build after every phase', ar: 'ابنِ بعد كل مرحلة' },
    body: {
      en: 'Sixteen concrete projects, each one slightly beyond what you already know. That is where learning actually happens.',
      ar: 'ستة عشر مشروعًا ملموسًا، كلٌّ منها أبعد قليلًا مما تعرفه. هناك يحدث التعلّم فعلًا.',
    },
  },
  {
    icon: IconChart,
    title: { en: 'Progress that persists', ar: 'تقدّم محفوظ' },
    body: {
      en: 'Tick a lesson and it stays ticked — in this browser, across sessions, with a resume button on the home page.',
      ar: 'ضع علامة على درس فتبقى — في هذا المتصفّح وعبر الجلسات، مع زر استئناف في الصفحة الرئيسية.',
    },
  },
]

const LEVEL_BLURB: Record<Level, Loc> = {
  beginner: {
    en: 'Syntax, components and state. By the end you can build a working interactive app.',
    ar: 'الصياغة والمكوّنات والحالة. في نهايتها تستطيع بناء تطبيق تفاعلي يعمل.',
  },
  intermediate: {
    en: 'Hooks, the rendering model, TypeScript, tooling, styling and real data.',
    ar: 'الخطّافات ونموذج العرض وتايب سكربت والأدوات والتنسيق والبيانات الحقيقية.',
  },
  advanced: {
    en: 'State at scale, production forms, and everything React 19 added.',
    ar: 'الحالة على نطاق واسع، ونماذج إنتاجية، وكل ما أضافته رياكت 19.',
  },
  pro: {
    en: 'Full-stack Next.js, testing, performance, accessibility and how teams actually work.',
    ar: 'Next.js متكامل، والاختبار والأداء والإتاحة وكيف تعمل الفرق فعليًا.',
  },
}

export function HomePage() {
  const { t, L, lang } = useI18n()
  const stats = usePhaseStats()
  const overall = useOverallProgress()

  // Bare site name — the home page is what the default description describes.
  useDocumentTitle('')

  const resumeHref = overall.next
    ? `/phase/${overall.next.phaseSlug}/${overall.next.lessonSlug}`
    : '/roadmap'

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="aurora animate-drift" />
        <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              {t('heroKicker')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 text-4xl leading-[1.08] font-black tracking-tight sm:text-5xl lg:text-[3.4rem]"
            >
              {t('heroTitleA')} <span className="text-gradient">{t('heroTitleAccent')}</span>{' '}
              {t('heroTitleB')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 max-w-xl text-[1.05rem] text-content-muted"
            >
              {t('heroBody')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink to={resumeHref} size="lg">
                <IconRocket />
                {overall.started ? t('ctaContinue') : t('ctaStart')}
              </ButtonLink>
              <ButtonLink to="/roadmap" variant="secondary" size="lg">
                {t('ctaRoadmap')}
                <IconChevron className="flip-rtl" width={16} height={16} />
              </ButtonLink>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
            >
              {[
                { v: PHASES.length, k: 'statPhases' as const },
                { v: TOTAL_LESSONS, k: 'statTopics' as const },
                { v: PHASES.length, k: 'statProjects' as const },
                { v: '4–6', k: 'statDuration' as const },
              ].map((s) => (
                <div key={s.k}>
                  <dt dir="ltr" className="font-mono text-2xl font-black tabular-nums text-gradient rtl:text-end">
                    {s.v}
                  </dt>
                  <dd className="text-xs text-content-faint">{t(s.k)}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* floating code preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="animate-float rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_var(--glow-b)]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ms-2 font-mono text-xs text-content-faint">Counter.tsx</span>
              </div>
              <pre
                dir="ltr"
                className="overflow-x-auto p-4 font-mono text-[0.78rem] leading-relaxed"
                style={{ background: 'var(--code-bg)', color: '#cdd9ec' }}
              >
                <code>{`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      clicked {count} times
    </button>
  );
}`}</code>
              </pre>
              <div className="flex items-center gap-3 border-t border-line px-4 py-3 text-xs text-content-muted">
                <ProgressRing value={overall.ratio} size={30} showLabel />
                {overall.started ? (
                  <span>
                    {overall.done}/{overall.total} {t('lessons')} · {Math.round(overall.ratio * 100)}%{' '}
                    {t('complete')}
                  </span>
                ) : (
                  <span>{L({ en: 'Your progress starts here', ar: 'تقدّمك يبدأ من هنا' })}</span>
                )}
              </div>
            </div>

            <div className="absolute -bottom-5 start-6 rounded-xl border border-line bg-surface px-4 py-3 shadow-lg">
              <p className="font-mono text-[0.68rem] text-content-faint">
                {Math.round(TOTAL_MINUTES / 60)}h {lang === 'ar' ? 'من المحتوى' : 'of material'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STACK ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{t('stackTitle')}</h2>
          <p className="mt-2 max-w-2xl text-content-muted">{t('stackSub')}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {STACK.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-line bg-surface p-4 card-hover">
                <span
                  className="absolute inset-x-0 top-0 h-0.5 opacity-70"
                  style={{ background: s.color }}
                />
                <p className="text-[0.66rem] font-bold tracking-widest text-content-faint uppercase">
                  {L(s.label)}
                </p>
                <p className="mt-1 font-bold" style={{ color: s.color }}>
                  {s.name}
                </p>
                <p className="mt-0.5 text-sm text-content-muted">{L(s.note)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="relative overflow-hidden border-y border-line bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{t('whyTitle')}</h2>
            <p className="mt-2 max-w-2xl text-content-muted">{t('whySub')}</p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title.en} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-5 card-hover">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-400/30 bg-brand-400/10 text-brand-400">
                    <f.icon />
                  </div>
                  <div>
                    <h3 className="font-bold">{L(f.title)}</h3>
                    <p className="mt-1 text-sm text-content-muted">{L(f.body)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PATH ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{t('pathTitle')}</h2>
          <p className="mt-2 max-w-2xl text-content-muted">{t('pathSub')}</p>
        </Reveal>

        <div className="mt-9 space-y-5">
          {LEVEL_ORDER.map((level, li) => {
            const group = stats.filter((s) => s.phase.level === level)
            return (
              <Reveal key={level} delay={li * 0.05}>
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <LevelBadge level={level} />
                    <p className="text-sm text-content-muted">{L(LEVEL_BLURB[level])}</p>
                  </div>

                  <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {group.map((s) => (
                      <li key={s.phase.slug}>
                        <Link
                          to={`/phase/${s.phase.slug}`}
                          className="group flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3 py-2.5 transition-colors hover:border-brand-400/60"
                        >
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-xs font-black"
                            style={{
                              color: s.phase.accent,
                              background: `color-mix(in srgb, ${s.phase.accent} 14%, transparent)`,
                            }}
                          >
                            {s.phase.id}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                            {L(s.phase.title)}
                          </span>
                          <ProgressRing value={s.ratio} size={22} stroke={3} color={s.phase.accent} />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
            <div className="aurora animate-drift opacity-60" />
            <div className="relative">
              <IconLayers className="mx-auto mb-4 text-brand-400" width={28} height={28} />
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                {L({
                  en: 'Sixteen phases. One habit: build something every week.',
                  ar: 'ست عشرة مرحلة. وعادة واحدة: ابنِ شيئًا كل أسبوع.',
                })}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-content-muted">
                {L({
                  en: 'Start with phase 1 even if you think you know JavaScript — it takes twenty minutes and it will save you weeks.',
                  ar: 'ابدأ بالمرحلة الأولى حتى لو ظننت أنك تعرف جافاسكربت — تأخذ عشرين دقيقة وتوفّر عليك أسابيع.',
                })}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <ButtonLink to={resumeHref} size="lg">
                  <IconRocket />
                  {overall.started ? t('ctaContinue') : t('ctaStart')}
                </ButtonLink>
                <ButtonLink to="/roadmap" variant="secondary" size="lg">
                  {t('ctaRoadmap')}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}

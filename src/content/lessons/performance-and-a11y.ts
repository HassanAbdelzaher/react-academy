import type { LessonBody } from '../blocks'

export const performanceAndA11y: LessonBody[] = [
  {
    id: 'performance-and-a11y/profiling',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Never optimise from a hunch. Every experienced developer has spent an afternoon memoising a component that was never the problem — the profiler exists so that never happens twice.',
          ar: 'لا تحسّن أبدًا بناءً على حدس. فكل مطوّر خبير أضاع بعد ظهر في تخزين مكوّن لم يكن المشكلة أصلًا — والمحلّل موجود كي لا يتكرّر ذلك.',
        },
      },
      {
        type: 'steps',
        steps: [
          {
            title: { en: 'Reproduce the slowness', ar: 'أعد إنتاج البطء' },
            body: {
              en: 'Find the exact interaction. "The app feels slow" is not something you can measure or fix.',
              ar: 'حدّد التفاعل بالضبط. فـ«التطبيق يبدو بطيئًا» ليس شيئًا يمكن قياسه أو إصلاحه.',
            },
          },
          {
            title: { en: 'Record it in the Profiler', ar: 'سجّله في المحلّل' },
            body: {
              en: 'React DevTools shows every component that rendered, how long it took, and — crucially — **why** it rendered.',
              ar: 'تُظهر React DevTools كل مكوّن أُعيد عرضه ومدّته، والأهم: **لماذا** أُعيد عرضه.',
            },
          },
          {
            title: { en: 'Throttle the CPU', ar: 'أبطئ المعالج' },
            body: {
              en: 'Set a 4× or 6× slowdown in the Performance tab. Your laptop hides problems that a mid-range phone will not.',
              ar: 'اضبط إبطاءً بأربعة أو ستة أضعاف في تبويب الأداء. فحاسوبك يُخفي مشاكل لن يُخفيها هاتف متوسط.',
            },
          },
          {
            title: { en: 'Fix one thing, then measure again', ar: 'أصلح شيئًا واحدًا ثم قِس ثانيةً' },
            body: {
              en: 'Two changes at once and you will not know which one helped — or which one made it worse.',
              ar: 'تغييران معًا يعني ألّا تعرف أيهما ساعد — أو أيهما زاد الأمر سوءًا.',
            },
          },
        ],
      },
      {
        type: 'callout',
        tone: 'note',
        title: { en: 'Read the "why did this render" panel', ar: 'اقرأ لوحة «لماذا أُعيد العرض»' },
        body: {
          en: 'It names the exact prop, state or context that changed. That one line usually points straight at an inline object, an unstable callback or a context that is doing too much.',
          ar: 'تُسمّي الخاصية أو الحالة أو السياق الذي تغيّر بالضبط. وذلك السطر الواحد يشير عادةً مباشرة إلى كائن داخل الوسم أو ردّ غير مستقر أو سياق يحمل أكثر مما ينبغي.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'React 19.2 adds Performance Tracks to the browser profiler, so React work appears on the same timeline as everything else.',
            'A component rendering many times is not automatically a problem — check the milliseconds before reacting.',
            'The `<Profiler>` component can log render timings in production builds if you need field data.',
            'Rendering is rarely the real cost. Bundle size, blocking requests and images usually matter more.',
          ],
          ar: [
            'يضيف رياكت 19.2 مسارات أداء إلى محلّل المتصفّح، فيظهر عمل رياكت على الخط الزمني نفسه مع غيره.',
            'كثرة إعادة عرض مكوّن ليست مشكلة تلقائيًا — راجع المللي ثانية قبل التصرّف.',
            'ويمكن لمكوّن `<Profiler>` تسجيل أزمنة العرض في بناء الإنتاج إن احتجت بيانات ميدانية.',
            'ونادرًا ما يكون العرض هو التكلفة الحقيقية. فحجم الحزمة والطلبات الحاجبة والصور أهمّ عادةً.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'The Profiler shows a component rendering 30 times in a second, each taking 0.2 ms. What do you do?',
          ar: 'يُظهر المحلّل مكوّنًا يُعاد عرضه 30 مرة في الثانية، كلٌّ منها 0.2 مللي ثانية. ماذا تفعل؟',
        },
        options: [
          {
            text: { en: 'Nothing — six milliseconds total is not a problem worth solving.', ar: 'لا شيء — فستّ مللي ثانية إجمالًا ليست مشكلة تستحق الحل.' },
            correct: true,
          },
          { text: { en: 'Wrap it in `React.memo` immediately.', ar: 'غلّفه بـ `React.memo` فورًا.' } },
          { text: { en: 'Move its state to a global store.', ar: 'انقل حالته إلى مخزن عام.' } },
          { text: { en: 'Split it into smaller components.', ar: 'قسّمه إلى مكوّنات أصغر.' } },
        ],
        explain: {
          en: 'Render counts are a symptom, not a metric. Optimising this would add complexity and a maintenance cost in exchange for nothing a user could perceive.',
          ar: 'عدد مرات العرض عرَض لا مقياس. وتحسينه سيضيف تعقيدًا وتكلفة صيانة مقابل شيء لا يستطيع المستخدم إدراكه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Measure before changing anything.',
            'The Profiler tells you which component and why it rendered.',
            'Throttle the CPU to see what real devices see.',
            'Change one thing at a time, then re-measure.',
          ],
          ar: [
            'قِس قبل تغيير أي شيء.',
            'يخبرك المحلّل بأي مكوّن ولماذا أُعيد عرضه.',
            'أبطئ المعالج لترى ما تراه الأجهزة الحقيقية.',
            'غيّر شيئًا واحدًا في كل مرة ثم أعد القياس.',
          ],
        },
      },
    ],
  },

  {
    id: 'performance-and-a11y/code-splitting',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A visitor landing on your login page should not download the admin dashboard, the chart library and the rich-text editor. Code splitting delays that code until something actually needs it.',
          ar: 'الزائر الذي يصل إلى صفحة تسجيل الدخول لا يجب أن ينزّل لوحة الإدارة ومكتبة الرسوم ومحرّر النصوص الغني. وتقسيم الكود يؤجّل ذلك حتى يحتاجه شيء فعلًا.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const Dashboard = lazy(() => import('./pages/Dashboard'));
const Editor = lazy(() => import('./features/Editor'));

<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>`,
      },
      {
        type: 'list',
        items: {
          en: [
            'Route boundaries are the natural split point — a user visits one page at a time.',
            'Split heavy, rarely-used features too: editors, charts, PDF viewers, map widgets.',
            'Prefetch on hover or on intent, so the chunk is usually already there when the click happens.',
            'Do not split tiny components — a request has overhead, and dozens of micro-chunks can be slower than one.',
          ],
          ar: [
            'حدود المسارات هي نقطة التقسيم الطبيعية — فالمستخدم يزور صفحة واحدة في كل مرة.',
            'قسّم أيضًا الميزات الثقيلة نادرة الاستخدام: المحرّرات والرسوم وعارضات PDF وأدوات الخرائط.',
            'اجلب مسبقًا عند مرور المؤشّر أو عند النية، فتكون القطعة جاهزة عادةً عند النقر.',
            'ولا تقسّم المكوّنات الصغيرة — فللطلب تكلفة، وعشرات القطع الدقيقة قد تكون أبطأ من واحدة.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'Look at the bundle before you guess', ar: 'انظر إلى الحزمة قبل التخمين' },
        body: {
          en: 'Run a bundle visualiser. It is common to find one date library, one icon set imported wholesale, or a moment-style dependency accounting for a third of the JavaScript — and removing it beats any amount of memoisation.',
          ar: 'شغّل أداة تصوّر للحزمة. فمن الشائع اكتشاف مكتبة تواريخ واحدة أو مجموعة أيقونات مستوردة بالكامل أو اعتمادية بحجم moment تشكّل ثلث جافاسكربت — وإزالتها تتفوّق على أي قدر من التخزين.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Which import pattern accidentally ships an entire library?',
          ar: 'أي نمط استيراد يرسل مكتبة كاملة عن غير قصد؟',
        },
        options: [
          {
            text: { en: '`import _ from "lodash"` then using two functions.', ar: '`import _ from "lodash"` ثم استخدام دالتين.' },
            correct: true,
          },
          { text: { en: '`import { debounce } from "lodash-es"`', ar: '`import { debounce } from "lodash-es"`' } },
          { text: { en: '`const X = lazy(() => import("./X"))`', ar: '`const X = lazy(() => import("./X"))`' } },
          { text: { en: '`import type { User } from "./types"`', ar: '`import type { User } from "./types"`' } },
        ],
        explain: {
          en: 'A default import of a CommonJS bundle cannot be tree-shaken. Prefer ES-module builds and named imports, or import the single function’s path directly.',
          ar: 'الاستيراد الافتراضي لحزمة CommonJS لا يمكن هزّه شجريًا. فضّل بناءات وحدات ES والاستيراد المسمّى، أو استورد مسار الدالة الواحدة مباشرة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Split by route first, then by heavy feature.',
            'Prefetch on hover to hide the loading delay.',
            'Analyse the bundle instead of guessing what is large.',
            'Named imports from ES modules tree-shake; default CJS imports do not.',
          ],
          ar: [
            'قسّم حسب المسار أولًا ثم حسب الميزة الثقيلة.',
            'اجلب مسبقًا عند مرور المؤشّر لإخفاء تأخير التحميل.',
            'حلّل الحزمة بدل تخمين ما هو كبير.',
            'الاستيراد المسمّى من وحدات ES قابل للهزّ الشجري بخلاف الاستيراد الافتراضي من CJS.',
          ],
        },
      },
    ],
  },

  {
    id: 'performance-and-a11y/core-web-vitals',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Three numbers describe how a page feels: how fast the main content appears, how quickly it responds to a tap, and how much it jumps around while loading.',
          ar: 'ثلاثة أرقام تصف إحساس الصفحة: سرعة ظهور المحتوى الرئيسي، وسرعة استجابتها للمس، ومقدار قفزها أثناء التحميل.',
        },
      },
      {
        type: 'table',
        head: { en: ['Metric', 'Measures', 'Good'], ar: ['المؤشّر', 'يقيس', 'جيد'] },
        rows: [
          { en: ['LCP', 'when the largest element appears', 'under 2.5 s'], ar: ['LCP', 'متى يظهر أكبر عنصر', 'أقل من 2.5 ثانية'] },
          { en: ['INP', 'delay between an interaction and the visual response', 'under 200 ms'], ar: ['INP', 'التأخير بين التفاعل والاستجابة المرئية', 'أقل من 200 مللي'] },
          { en: ['CLS', 'how much the layout shifts unexpectedly', 'under 0.1'], ar: ['CLS', 'مقدار انزياح التخطيط غير المتوقّع', 'أقل من 0.1'] },
        ],
      },
      {
        type: 'list',
        items: {
          en: [
            '**LCP** is usually a hero image or a web font. Preload it, size it, serve modern formats, and do not lazy-load what is above the fold.',
            '**INP** is usually a long task blocking the main thread. Split the work, use a transition, or move it to a worker.',
            '**CLS** is usually an image without dimensions, an injected banner, or a font swap. Reserve the space before the content arrives.',
            'Skeletons must match the final layout, or your loading state is itself the source of layout shift.',
          ],
          ar: [
            '**LCP** غالبًا صورة رئيسية أو خط ويب. حمّلها مسبقًا وحدّد أبعادها وقدّم صيغًا حديثة ولا تؤجّل تحميل ما هو فوق الطيّة.',
            '**INP** غالبًا مهمّة طويلة تحجب الخيط الرئيسي. قسّم العمل أو استخدم انتقالًا أو انقله إلى عامل.',
            '**CLS** غالبًا صورة بلا أبعاد أو شريط مُحقَن أو تبديل خط. احجز المساحة قبل وصول المحتوى.',
            'ويجب أن تطابق الهياكل التخطيط النهائي، وإلا صارت حالة التحميل نفسها مصدر الانزياح.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Lighthouse is not the truth', ar: 'Lighthouse ليس الحقيقة' },
        body: {
          en: 'A lab score on your machine is a useful signal, not a measurement of your users. Real-user monitoring on real devices and networks is what actually tells you whether the site is fast.',
          ar: 'الدرجة المخبرية على جهازك إشارة مفيدة لا قياسًا لمستخدميك. أما المراقبة الحقيقية على أجهزة وشبكات فعلية فهي ما يخبرك حقًا إن كان الموقع سريعًا.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Users complain that the page jumps just as they go to tap a button. Which metric is failing?',
          ar: 'يشتكي المستخدمون من قفز الصفحة لحظة همّهم بالنقر على زر. أي مؤشّر يفشل؟',
        },
        options: [
          { text: { en: 'CLS — cumulative layout shift.', ar: 'CLS — الانزياح التراكمي للتخطيط.' }, correct: true },
          { text: { en: 'LCP', ar: 'LCP' } },
          { text: { en: 'INP', ar: 'INP' } },
          { text: { en: 'Time to first byte.', ar: 'زمن أول بايت.' } },
        ],
        explain: {
          en: 'Late-arriving content pushes the button away mid-tap — annoying at best, and a wrong click at worst. Always reserve space with `width`, `height` or `aspect-ratio`.',
          ar: 'المحتوى المتأخّر يدفع الزر أثناء اللمس — وهو مزعج في أحسن الأحوال ونقرة خاطئة في أسوئها. احجز المساحة دائمًا بـ `width` أو `height` أو `aspect-ratio`.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'LCP for loading, INP for responsiveness, CLS for stability.',
            'Size images and reserve space to avoid shifts.',
            'Break up long tasks to protect INP.',
            'Trust field data over a single lab score.',
          ],
          ar: [
            'LCP للتحميل و INP للاستجابة و CLS للاستقرار.',
            'حدّد أبعاد الصور واحجز المساحة لتجنّب الانزياح.',
            'جزّئ المهام الطويلة لحماية INP.',
            'ثق ببيانات الميدان أكثر من درجة مخبرية واحدة.',
          ],
        },
      },
    ],
  },

  {
    id: 'performance-and-a11y/accessibility',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Accessibility is not a feature you add at the end. Most of it is free if you use the right element — and most of the cost comes from having used a `div` where a `button` belonged.',
          ar: 'إتاحة الوصول ليست ميزة تُضاف في النهاية. فمعظمها مجاني إن استخدمت العنصر الصحيح — ومعظم تكلفتها تأتي من استخدام `div` مكان `button`.',
        },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          code: `<div className="btn" onClick={save}>
  Save
</div>
{/* not focusable, no Enter or
    Space, announced as nothing */}`,
        },
        good: {
          code: `<button onClick={save}>
  Save
</button>
{/* focusable, keyboard-operable,
    announced as a button */}`,
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Every input needs a real `<label>`. A placeholder disappears as soon as typing starts and is not a label.',
            'Images need `alt`; decorative ones need `alt=""` so screen readers skip them.',
            'Keep a visible focus ring. Removing the outline without replacing it makes keyboard navigation impossible.',
            'Colour alone must never carry meaning — pair it with text or an icon, and check the contrast ratio.',
            'Manage focus when the UI moves: into a dialog when it opens, back to the trigger when it closes.',
          ],
          ar: [
            'كل حقل يحتاج `<label>` حقيقية. فالنص النائب يختفي مع بدء الكتابة وليس تسمية.',
            'الصور تحتاج `alt`، والزخرفية منها تحتاج `alt=""` لتتخطّاها قارئات الشاشة.',
            'أبقِ حلقة تركيز مرئية. فإزالة الإطار دون بديل تجعل التنقّل بلوحة المفاتيح مستحيلًا.',
            'ولا يجوز أن يحمل اللون المعنى وحده — اقرنه بنص أو أيقونة وافحص نسبة التباين.',
            'وأدر التركيز حين تتحرّك الواجهة: إلى المربّع الحواري عند فتحه، وإلى الزر عند إغلاقه.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'The five-minute audit', ar: 'تدقيق الخمس دقائق' },
        body: {
          en: 'Put the mouse away and press Tab through a whole page. Can you reach every control, see where you are, open and close the menu, and submit the form? Most accessibility bugs are found this way, without a single tool.',
          ar: 'أبعد الفأرة واضغط Tab عبر الصفحة كاملة. هل تصل إلى كل عنصر تحكّم وترى موضعك وتفتح القائمة وتغلقها وترسل النموذج؟ هكذا تُكتشف معظم أخطاء الإتاحة، دون أي أداة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// ARIA fills the gaps native HTML cannot express
<button aria-expanded={open} aria-controls="menu">Menu</button>
<ul id="menu" hidden={!open}>…</ul>

// announce changes that happen away from the user's focus
<div role="status" aria-live="polite">{savedMessage}</div>`,
      },
      {
        type: 'quiz',
        question: {
          en: 'What is the first rule of ARIA?',
          ar: 'ما القاعدة الأولى لـ ARIA؟',
        },
        options: [
          {
            text: {
              en: 'Do not use ARIA if a native HTML element already has the semantics you need.',
              ar: 'لا تستخدم ARIA إذا كان عنصر HTML أصلي يحمل الدلالة التي تحتاجها.',
            },
            correct: true,
          },
          { text: { en: 'Add `role` to every element.', ar: 'أضف `role` إلى كل عنصر.' } },
          { text: { en: 'Always use `aria-label` instead of a visible label.', ar: 'استخدم `aria-label` دائمًا بدل تسمية مرئية.' } },
          { text: { en: 'ARIA replaces semantic HTML.', ar: 'ARIA تحلّ محلّ HTML الدلالي.' } },
        ],
        explain: {
          en: 'A `<button>` already announces itself, focuses, and responds to Enter and Space. `<div role="button">` gets one of those and you must implement the rest by hand — usually incompletely.',
          ar: '`<button>` يعلن نفسه ويتلقّى التركيز ويستجيب لـ Enter و Space. أما `<div role="button">` فينال واحدة من ذلك وعليك تنفيذ الباقي يدويًا — وغالبًا ناقصًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Semantic HTML first; ARIA only for what it cannot express.',
            'Label every control and keep focus visible.',
            'Never rely on colour alone.',
            'Tab through the page — it finds most problems in minutes.',
          ],
          ar: [
            'HTML الدلالي أولًا، و ARIA لما لا يستطيع التعبير عنه فقط.',
            'سمِّ كل عنصر تحكّم وأبقِ التركيز مرئيًا.',
            'لا تعتمد على اللون وحده أبدًا.',
            'تنقّل بـ Tab عبر الصفحة — فهو يجد معظم المشاكل في دقائق.',
          ],
        },
      },
    ],
  },

  {
    id: 'performance-and-a11y/assets-and-bundles',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'On most sites, images and fonts weigh more than all the JavaScript combined. That makes them the cheapest performance win available — and the one most often skipped.',
          ar: 'في معظم المواقع تزن الصور والخطوط أكثر من جافاسكربت كلها. وهذا يجعلها أرخص مكسب أداء متاح — وأكثره تجاهلًا.',
        },
      },
      {
        type: 'code',
        lang: 'html',
        code: `<!-- always give dimensions: they prevent layout shift -->
<img src="hero.avif" width="1200" height="630" alt="" />

<!-- below the fold: let the browser skip it until needed -->
<img src="thumb.avif" loading="lazy" decoding="async" width="320" height="180" alt="" />

<!-- the one image that matters most: fetch it early -->
<link rel="preload" as="image" href="hero.avif" />`,
      },
      {
        type: 'list',
        items: {
          en: [
            'Serve AVIF or WebP with a JPEG fallback; the saving is routinely 50–70%.',
            'Never lazy-load your LCP image — you are delaying the exact thing being measured.',
            'Self-host fonts, subset them to the characters you use, and set `font-display: swap`.',
            'Both Latin and Arabic subsets are needed for a bilingual site — check both, and check the fallback metrics so the swap does not shift the layout.',
          ],
          ar: [
            'قدّم AVIF أو WebP مع بديل JPEG، والتوفير عادةً بين 50 و70 بالمئة.',
            'لا تؤجّل أبدًا تحميل صورة LCP — فأنت تؤخّر تحديدًا ما يُقاس.',
            'استضف الخطوط ذاتيًا واقتطعها للأحرف المستخدمة واضبط `font-display: swap`.',
            'ويحتاج الموقع ثنائي اللغة مجموعتَي اللاتينية والعربية — افحص كليهما وافحص مقاييس البديل كي لا يُزيح التبديل التخطيط.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'The dependency audit', ar: 'تدقيق الاعتماديات' },
        body: {
          en: 'Before adding a package, look at its size and whether it tree-shakes. A 40 kB date library to format one timestamp is a bad trade when `Intl.DateTimeFormat` is built into every browser.',
          ar: 'قبل إضافة حزمة، انظر إلى حجمها وهل تقبل الهزّ الشجري. فمكتبة تواريخ بأربعين كيلوبايت لتنسيق طابع زمني واحد صفقة سيّئة بينما `Intl.DateTimeFormat` مدمجة في كل متصفّح.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Which change most reliably improves LCP on an image-heavy landing page?',
          ar: 'أي تغيير يحسّن LCP بشكل أوثق في صفحة هبوط مليئة بالصور؟',
        },
        options: [
          {
            text: {
              en: 'Compress and correctly size the hero image, preload it, and do not lazy-load it.',
              ar: 'ضغط الصورة الرئيسية وضبط أبعادها وتحميلها مسبقًا وعدم تأجيلها.',
            },
            correct: true,
          },
          { text: { en: 'Wrap the page components in `React.memo`.', ar: 'تغليف مكوّنات الصفحة بـ `React.memo`.' } },
          { text: { en: 'Move state into a global store.', ar: 'نقل الحالة إلى مخزن عام.' } },
          { text: { en: 'Switch from Tailwind to CSS Modules.', ar: 'التحوّل من Tailwind إلى CSS Modules.' } },
        ],
        explain: {
          en: 'LCP is almost always the hero image. No amount of React optimisation moves a metric that is waiting on a 1.8 MB JPEG.',
          ar: 'LCP هو الصورة الرئيسية دائمًا تقريبًا. ولا يحرّك أي قدر من تحسين رياكت مؤشّرًا ينتظر صورة بحجم 1.8 ميجابايت.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Modern formats and correct dimensions on every image.',
            'Lazy-load below the fold, preload the LCP image.',
            'Self-host and subset fonts, including the Arabic subset.',
            'Weigh every dependency before adding it.',
          ],
          ar: [
            'صيغ حديثة وأبعاد صحيحة لكل صورة.',
            'أجّل ما تحت الطيّة وحمّل صورة LCP مسبقًا.',
            'استضف الخطوط واقتطعها، بما فيها المجموعة العربية.',
            'زِن كل اعتمادية قبل إضافتها.',
          ],
        },
      },
    ],
  },
]

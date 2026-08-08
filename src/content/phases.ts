import type { Phase } from './types'

/**
 * The 16-phase curriculum. Each entry carries everything the roadmap and phase
 * pages need; individual lesson bodies are added under `content/lessons`.
 */
export const PHASES: Phase[] = [
  {
    id: 1,
    slug: 'javascript-essentials',
    level: 'beginner',
    icon: '🟨',
    accent: '#f0b64a',
    title: { en: 'JavaScript You Need First', ar: 'أساسيات جافاسكربت المطلوبة أولًا' },
    tagline: {
      en: 'The 20% of modern JS that React leans on every single day.',
      ar: 'العشرون بالمئة من جافاسكربت الحديثة التي تعتمد عليها رياكت يوميًا.',
    },
    description: {
      en: 'React is not a language — it is JavaScript with a rendering model on top. Most "React is confusing" moments are really "I never learned this JS feature" moments. This phase closes that gap fast.',
      ar: 'رياكت ليست لغة، بل هي جافاسكربت مع نموذج عرض فوقها. معظم لحظات «رياكت صعبة» هي في الحقيقة «لم أتعلّم هذه الميزة في جافاسكربت». هذه المرحلة تسدّ تلك الفجوة بسرعة.',
    },
    outcomes: {
      en: [
        'Read dense modern JavaScript without stalling',
        'Transform arrays with map / filter / reduce by reflex',
        'Copy objects and arrays immutably',
        'Handle asynchronous work with promises and async/await',
      ],
      ar: [
        'قراءة جافاسكربت الحديثة المكثّفة دون تعثّر',
        'تحويل المصفوفات بـ map / filter / reduce بشكل تلقائي',
        'نسخ الكائنات والمصفوفات دون تعديل الأصل',
        'التعامل مع العمليات غير المتزامنة عبر الوعود و async/await',
      ],
    },
    project: {
      title: { en: 'Warm-up drills', ar: 'تمارين إحماء' },
      brief: {
        en: 'Rewrite three plain functions — a filter, a mapper and an async fetch — using only modern syntax. No framework yet.',
        ar: 'أعد كتابة ثلاث دوال بسيطة — تصفية، وتحويل، وجلب غير متزامن — باستخدام الصياغة الحديثة فقط. بدون أي إطار عمل بعد.',
      },
    },
    resources: [
      { label: 'JavaScript.info', url: 'https://javascript.info/' },
      {
        label: 'MDN — Array',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
      },
    ],
    lessons: [
      {
        slug: 'arrow-functions-and-syntax',
        minutes: 18,
        tags: ['=>', '`${}`', '{ }'],
        title: {
          en: 'Arrow functions, template literals, destructuring',
          ar: 'الدوال السهمية، القوالب النصية، والتفكيك',
        },
        summary: {
          en: 'The three syntax features that appear on almost every line of React code.',
          ar: 'ثلاث ميزات صياغية تظهر في كل سطر تقريبًا من كود رياكت.',
        },
      },
      {
        slug: 'array-methods',
        minutes: 22,
        tags: ['.map()', '.filter()', '.reduce()'],
        title: { en: 'Array methods: map, filter, reduce, find', ar: 'دوال المصفوفات: map و filter و reduce و find' },
        summary: {
          en: 'You will render lists with .map() every day — these must be automatic.',
          ar: 'ستعرض القوائم بـ .map() يوميًا — يجب أن تصبح هذه تلقائية عندك.',
        },
      },
      {
        slug: 'spread-and-safe-access',
        minutes: 16,
        tags: ['...', '?.', '??'],
        title: {
          en: 'Spread / rest, optional chaining, nullish coalescing',
          ar: 'النشر والتجميع، الوصول الآمن، والمعامل العدمي',
        },
        summary: {
          en: 'Immutable updates and safe property access — the backbone of state updates.',
          ar: 'التحديثات غير المتغيّرة والوصول الآمن للخصائص — أساس تحديث الحالة.',
        },
      },
      {
        slug: 'async-javascript',
        minutes: 24,
        tags: ['async', 'await', 'fetch'],
        title: { en: 'Promises, async/await and fetch', ar: 'الوعود و async/await و fetch' },
        summary: {
          en: 'How data arrives from a server, and why it always arrives late.',
          ar: 'كيف تصل البيانات من الخادم، ولماذا تصل دائمًا متأخّرة.',
        },
      },
      {
        slug: 'es-modules',
        minutes: 12,
        tags: ['import', 'export'],
        title: { en: 'ES Modules: import and export', ar: 'وحدات ES: import و export' },
        summary: {
          en: 'How every file in a React project finds every other file.',
          ar: 'كيف يجد كل ملف في مشروع رياكت بقية الملفات.',
        },
      },
      {
        slug: 'conditional-expressions',
        minutes: 14,
        tags: ['? :', '&&', '||'],
        title: { en: 'Ternaries and short-circuit logic', ar: 'العامل الثلاثي والمنطق المختصر' },
        summary: {
          en: 'Because JSX only accepts expressions, these become your if-statements.',
          ar: 'لأن JSX يقبل التعابير فقط، تصبح هذه بديلًا عن جُمل if.',
        },
      },
    ],
  },

  {
    id: 2,
    slug: 'react-fundamentals',
    level: 'beginner',
    icon: '⚛️',
    accent: '#58c4dc',
    title: { en: 'React Fundamentals', ar: 'أساسيات رياكت' },
    tagline: {
      en: 'Components, JSX and props — the atoms of every React app.',
      ar: 'المكوّنات و JSX والخصائص — ذرّات أي تطبيق رياكت.',
    },
    description: {
      en: 'Everything in React is a component: a function that takes data and returns a description of UI. Get this mental model right and the rest of the course is downhill.',
      ar: 'كل شيء في رياكت مكوّن: دالة تأخذ بيانات وتُعيد وصفًا للواجهة. اضبط هذا النموذج الذهني وسيصبح باقي المسار أسهل بكثير.',
    },
    outcomes: {
      en: [
        'Write components and compose them into a page',
        'Use JSX confidently, including its gotchas',
        'Pass data down with props and children',
        'Render lists with correct keys and hide UI conditionally',
      ],
      ar: [
        'كتابة المكوّنات وتركيبها لبناء صفحة',
        'استخدام JSX بثقة مع معرفة مزالقه',
        'تمرير البيانات عبر props و children',
        'عرض القوائم بمفاتيح صحيحة وإخفاء الواجهة شرطيًا',
      ],
    },
    project: {
      title: { en: 'Profile card + product list', ar: 'بطاقة ملف شخصي + قائمة منتجات' },
      brief: {
        en: 'A static profile card and a product grid rendered from an array. No state yet — props, .map() and conditional rendering only.',
        ar: 'بطاقة ملف شخصي ثابتة وشبكة منتجات تُعرض من مصفوفة. بدون حالة بعد — فقط props و .map() والعرض الشرطي.',
      },
    },
    resources: [
      { label: 'react.dev — Learn', url: 'https://react.dev/learn' },
      { label: 'Describing the UI', url: 'https://react.dev/learn/describing-the-ui' },
    ],
    lessons: [
      {
        slug: 'what-react-is',
        minutes: 15,
        tags: ['mental model'],
        title: { en: 'What React is and why it exists', ar: 'ما هي رياكت ولماذا وُجدت' },
        summary: {
          en: 'UI as a function of state: the one idea the whole library is built on.',
          ar: 'الواجهة كدالة للحالة: الفكرة الوحيدة التي بُنيت عليها المكتبة كلها.',
        },
      },
      {
        slug: 'jsx',
        minutes: 20,
        tags: ['JSX', '<>', 'className'],
        title: { en: 'JSX syntax and its rules', ar: 'صياغة JSX وقواعدها' },
        summary: {
          en: 'One root element, {expressions}, className, fragments and self-closing tags.',
          ar: 'عنصر جذر واحد، والتعابير بين أقواس، و className، والأجزاء، والوسوم ذاتية الإغلاق.',
        },
      },
      {
        slug: 'components-and-composition',
        minutes: 20,
        tags: ['function', 'composition'],
        title: { en: 'Components and composition', ar: 'المكوّنات والتركيب' },
        summary: {
          en: 'Build large interfaces out of small, boring, reusable pieces.',
          ar: 'ابنِ واجهات كبيرة من قطع صغيرة بسيطة قابلة لإعادة الاستخدام.',
        },
      },
      {
        slug: 'props-and-children',
        minutes: 22,
        tags: ['props', 'children'],
        title: { en: 'Props and the children prop', ar: 'الخصائص وخاصية children' },
        summary: {
          en: 'How data flows down, and how a component wraps arbitrary content.',
          ar: 'كيف تتدفق البيانات للأسفل، وكيف يغلّف المكوّن محتوى عشوائيًا.',
        },
      },
      {
        slug: 'lists-and-keys',
        minutes: 18,
        tags: ['key', '.map()'],
        title: { en: 'Rendering lists with keys', ar: 'عرض القوائم باستخدام المفاتيح' },
        summary: {
          en: 'Why keys exist, and the specific bug index-as-key creates.',
          ar: 'لماذا وُجدت المفاتيح، وما الخلل الذي يسبّبه استخدام الفهرس كمفتاح.',
        },
      },
      {
        slug: 'conditional-rendering',
        minutes: 14,
        tags: ['&&', '? :'],
        title: { en: 'Conditional rendering', ar: 'العرض الشرطي' },
        summary: {
          en: 'Show, hide and swap UI — plus the falsy-zero trap everyone hits once.',
          ar: 'إظهار وإخفاء وتبديل الواجهة — مع فخّ الصفر الذي يقع فيه الجميع مرة.',
        },
      },
      {
        slug: 'handling-events',
        minutes: 16,
        tags: ['onClick', 'onChange'],
        title: { en: 'Handling events', ar: 'التعامل مع الأحداث' },
        summary: {
          en: 'Passing a function versus calling it — the classic beginner mistake.',
          ar: 'تمرير الدالة مقابل استدعائها — الخطأ الكلاسيكي للمبتدئين.',
        },
      },
    ],
  },

  {
    id: 3,
    slug: 'state-and-interactivity',
    level: 'beginner',
    icon: '🎚️',
    accent: '#3fca86',
    title: { en: 'State & Interactivity', ar: 'الحالة والتفاعلية' },
    tagline: {
      en: 'Making components remember things and react to users.',
      ar: 'جعل المكوّنات تتذكّر وتتفاعل مع المستخدم.',
    },
    description: {
      en: 'State is a component\'s memory. Change state and React re-renders that part of the screen for you — you never touch the DOM yourself.',
      ar: 'الحالة هي ذاكرة المكوّن. غيّر الحالة فتُعيد رياكت رسم ذلك الجزء من الشاشة نيابةً عنك — دون أن تلمس DOM بنفسك.',
    },
    outcomes: {
      en: [
        'Use useState correctly, including the updater form',
        'Update objects and arrays without mutating them',
        'Build controlled forms',
        'Decide what belongs in state and what should be derived',
      ],
      ar: [
        'استخدام useState بشكل صحيح بما في ذلك صيغة التحديث الدالّية',
        'تحديث الكائنات والمصفوفات دون تعديلها مباشرة',
        'بناء نماذج مُتحكَّم بها',
        'تحديد ما يستحق أن يكون حالة وما يجب اشتقاقه',
      ],
    },
    project: {
      title: { en: 'A real to-do app', ar: 'تطبيق مهام حقيقي' },
      brief: {
        en: 'Add, toggle, delete and filter tasks, with a live "N items left" counter that is derived — not stored.',
        ar: 'إضافة وتبديل وحذف وتصفية المهام، مع عدّاد حيّ «تبقّى N» يكون مشتقًّا وليس مخزّنًا.',
      },
    },
    resources: [
      { label: 'Adding Interactivity', url: 'https://react.dev/learn/adding-interactivity' },
      { label: 'Managing State', url: 'https://react.dev/learn/managing-state' },
    ],
    lessons: [
      {
        slug: 'usestate',
        minutes: 20,
        tags: ['useState'],
        title: { en: 'useState — a component\'s memory', ar: 'useState — ذاكرة المكوّن' },
        summary: {
          en: 'Declare state, read it, update it, and understand why the update is not instant.',
          ar: 'أعلن الحالة واقرأها وحدّثها، وافهم لماذا لا يحدث التحديث فورًا.',
        },
      },
      {
        slug: 'immutability',
        minutes: 22,
        tags: ['...spread'],
        title: { en: 'State is immutable — never mutate it', ar: 'الحالة غير قابلة للتعديل المباشر' },
        summary: {
          en: 'The number one beginner bug: pushing into an array that lives in state.',
          ar: 'الخطأ الأول للمبتدئين: إضافة عنصر مباشرةً إلى مصفوفة داخل الحالة.',
        },
      },
      {
        slug: 'updater-functions',
        minutes: 14,
        tags: ['setX(p => …)'],
        title: { en: 'Updater functions', ar: 'دوال التحديث' },
        summary: {
          en: 'When the next value depends on the previous one, pass a function.',
          ar: 'حين تعتمد القيمة الجديدة على السابقة، مرّر دالة بدل القيمة.',
        },
      },
      {
        slug: 'controlled-inputs',
        minutes: 22,
        tags: ['value', 'onChange'],
        title: { en: 'Controlled inputs and forms', ar: 'المدخلات والنماذج المُتحكَّم بها' },
        summary: {
          en: 'Bind an input to state so React owns the single source of truth.',
          ar: 'اربط الحقل بالحالة لتصبح رياكت هي المصدر الوحيد للحقيقة.',
        },
      },
      {
        slug: 'lifting-state-up',
        minutes: 20,
        tags: ['lifting'],
        title: { en: 'Lifting state up', ar: 'رفع الحالة للأعلى' },
        summary: {
          en: 'Two siblings need the same data — move it to their closest parent.',
          ar: 'عندما يحتاج مكوّنان شقيقان البيانات نفسها — انقلها إلى أقرب أب مشترك.',
        },
      },
      {
        slug: 'derived-state',
        minutes: 16,
        tags: ['derived'],
        title: { en: 'Derived state: compute, do not store', ar: 'الحالة المشتقّة: احسبها ولا تخزّنها' },
        summary: {
          en: 'Duplicated state goes out of sync. Calculate during render instead.',
          ar: 'الحالة المكرّرة تفقد التزامن. احسبها أثناء العرض بدلًا من ذلك.',
        },
      },
    ],
  },

  {
    id: 4,
    slug: 'hooks-in-depth',
    level: 'intermediate',
    icon: '🪝',
    accent: '#4f8cff',
    title: { en: 'Hooks in Depth', ar: 'الخطّافات بعمق' },
    tagline: {
      en: 'The full hook toolkit — and the rules that govern it.',
      ar: 'صندوق أدوات الخطّافات كاملًا — والقواعد التي تحكمه.',
    },
    description: {
      en: 'Hooks let a plain function have state, side effects and shared logic. This phase also teaches the harder skill: knowing when *not* to reach for one.',
      ar: 'تمنح الخطّافات الدالة العادية حالةً وتأثيرات جانبية ومنطقًا مشتركًا. تعلّمك هذه المرحلة أيضًا المهارة الأصعب: متى *لا* تستخدمها.',
    },
    outcomes: {
      en: [
        'Apply the Rules of Hooks and understand why they exist',
        'Use useEffect for synchronisation — and avoid it when it is wrong',
        'Reach the DOM and keep values with useRef',
        'Extract reusable logic into custom hooks',
      ],
      ar: [
        'تطبيق قواعد الخطّافات وفهم سبب وجودها',
        'استخدام useEffect للمزامنة — وتجنّبه حين يكون خاطئًا',
        'الوصول إلى DOM وحفظ القيم عبر useRef',
        'استخراج المنطق القابل لإعادة الاستخدام في خطّافات مخصّصة',
      ],
    },
    project: {
      title: { en: 'Your own hook library', ar: 'مكتبة خطّافاتك الخاصة' },
      brief: {
        en: 'Write useFetch, useLocalStorage and useDebounce from scratch, then power a theme switcher with useContext.',
        ar: 'اكتب useFetch و useLocalStorage و useDebounce من الصفر، ثم شغّل مبدّل مظهر عبر useContext.',
      },
    },
    resources: [
      { label: 'Escape Hatches', url: 'https://react.dev/learn/escape-hatches' },
      { label: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect' },
      { label: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
    ],
    lessons: [
      {
        slug: 'rules-of-hooks',
        minutes: 12,
        tags: ['rules'],
        title: { en: 'The Rules of Hooks', ar: 'قواعد الخطّافات' },
        summary: {
          en: 'Top level only, components only — and the call-order reason behind both.',
          ar: 'في المستوى الأعلى فقط وداخل المكوّنات فقط — وسبب ذلك المرتبط بترتيب الاستدعاء.',
        },
      },
      {
        slug: 'useeffect',
        minutes: 26,
        tags: ['useEffect', 'cleanup'],
        title: { en: 'useEffect and synchronisation', ar: 'useEffect والمزامنة' },
        summary: {
          en: 'Effects connect React to the outside world. Dependencies and cleanup explained properly.',
          ar: 'التأثيرات تربط رياكت بالعالم الخارجي. شرح دقيق للاعتماديات ودالة التنظيف.',
        },
      },
      {
        slug: 'you-might-not-need-an-effect',
        minutes: 20,
        tags: ['anti-pattern'],
        title: { en: 'You might not need an Effect', ar: 'ربما لا تحتاج إلى Effect' },
        summary: {
          en: 'Most effects beginners write are bugs waiting to happen. Here is the replacement for each.',
          ar: 'معظم التأثيرات التي يكتبها المبتدئون أخطاء مؤجّلة. إليك البديل لكل حالة.',
        },
      },
      {
        slug: 'useref',
        minutes: 18,
        tags: ['useRef'],
        title: { en: 'useRef — values and DOM access', ar: 'useRef — القيم والوصول إلى DOM' },
        summary: {
          en: 'A box that survives re-renders without causing them.',
          ar: 'صندوق يبقى عبر عمليات إعادة العرض دون أن يتسبّب بها.',
        },
      },
      {
        slug: 'usecontext',
        minutes: 22,
        tags: ['useContext'],
        title: { en: 'useContext — ending prop drilling', ar: 'useContext — إنهاء تمرير الخصائص المتسلسل' },
        summary: {
          en: 'Share a value with a whole subtree without threading it through every layer.',
          ar: 'شارك قيمة مع شجرة كاملة دون تمريرها عبر كل طبقة.',
        },
      },
      {
        slug: 'usereducer',
        minutes: 22,
        tags: ['useReducer'],
        title: { en: 'useReducer for complex state', ar: 'useReducer للحالة المعقّدة' },
        summary: {
          en: 'When several values change together, model transitions instead of setters.',
          ar: 'حين تتغيّر عدة قيم معًا، اِنمذج الانتقالات بدل الدوال المُحدِّثة.',
        },
      },
      {
        slug: 'custom-hooks',
        minutes: 24,
        tags: ['useSomething'],
        title: { en: 'Custom hooks', ar: 'الخطّافات المخصّصة' },
        summary: {
          en: 'Extracting stateful logic is what separates tidy React from spaghetti.',
          ar: 'استخراج المنطق ذي الحالة هو ما يفصل رياكت المنظّمة عن الفوضى.',
        },
      },
      {
        slug: 'usememo-usecallback',
        minutes: 20,
        tags: ['useMemo', 'useCallback'],
        title: { en: 'useMemo & useCallback (and when not to)', ar: 'useMemo و useCallback (ومتى تتجنّبهما)' },
        summary: {
          en: 'Manual memoisation — mostly automated now by the React Compiler.',
          ar: 'التخزين اليدوي للنتائج — أصبح غالبًا آليًا بفضل مُصرِّف رياكت.',
        },
      },
    ],
  },

  {
    id: 5,
    slug: 'how-react-works',
    level: 'intermediate',
    icon: '🔬',
    accent: '#2ea9c8',
    title: { en: 'How React Really Works', ar: 'كيف تعمل رياكت فعليًا' },
    tagline: {
      en: 'The rendering model that separates juniors from seniors.',
      ar: 'نموذج العرض الذي يفصل المبتدئ عن المحترف.',
    },
    description: {
      en: 'Once you can picture trigger → render → commit, re-render bugs stop being mysterious and performance work becomes measurement instead of guessing.',
      ar: 'حين تتخيّل: مُحفِّز ← عرض ← تثبيت، تتوقف أخطاء إعادة العرض عن كونها لغزًا، ويصبح تحسين الأداء قياسًا بدل التخمين.',
    },
    outcomes: {
      en: [
        'Describe what happens between setState and pixels on screen',
        'Explain reconciliation and why keys matter for identity',
        'Predict exactly which components re-render and why',
        'Fix re-render problems with composition before memoisation',
      ],
      ar: [
        'وصف ما يحدث بين setState وظهور البكسلات على الشاشة',
        'شرح المطابقة ولماذا تهمّ المفاتيح في تحديد الهوية',
        'التنبّؤ بدقّة بأي المكوّنات ستُعاد وسبب ذلك',
        'إصلاح مشاكل إعادة العرض بالتركيب قبل اللجوء للتخزين',
      ],
    },
    project: {
      title: { en: 'Profiler investigation', ar: 'تحقيق باستخدام المحلّل' },
      brief: {
        en: 'Use the React DevTools Profiler to find an unnecessary re-render in your to-do app, then remove it with composition — not memo.',
        ar: 'استخدم محلّل React DevTools لاكتشاف إعادة عرض غير ضرورية في تطبيق المهام، ثم أزلها بالتركيب لا بـ memo.',
      },
    },
    resources: [
      { label: 'Render and Commit', url: 'https://react.dev/learn/render-and-commit' },
      { label: 'Preserving and Resetting State', url: 'https://react.dev/learn/preserving-and-resetting-state' },
    ],
    lessons: [
      {
        slug: 'render-and-commit',
        minutes: 20,
        tags: ['render', 'commit'],
        title: { en: 'Render and commit phases', ar: 'مرحلتا العرض والتثبيت' },
        summary: {
          en: 'Trigger, render, commit — the three beats of every React update.',
          ar: 'التحفيز ثم العرض ثم التثبيت — النبضات الثلاث لكل تحديث في رياكت.',
        },
      },
      {
        slug: 'reconciliation',
        minutes: 22,
        tags: ['diffing', 'virtual DOM'],
        title: { en: 'Reconciliation and the virtual DOM', ar: 'المطابقة و DOM الافتراضي' },
        summary: {
          en: 'How React compares two trees and touches the least DOM possible.',
          ar: 'كيف تقارن رياكت شجرتين وتلمس أقل قدر ممكن من DOM.',
        },
      },
      {
        slug: 'why-components-rerender',
        minutes: 20,
        tags: ['re-render'],
        title: { en: 'Why and when components re-render', ar: 'لماذا ومتى يُعاد عرض المكوّنات' },
        summary: {
          en: 'Debunking the myths — including "my parent re-rendered so I must be slow".',
          ar: 'تفنيد الخرافات — ومنها «الأب أُعيد عرضه إذًا التطبيق بطيء».',
        },
      },
      {
        slug: 'keys-and-identity',
        minutes: 18,
        tags: ['key', 'identity'],
        title: { en: 'Keys and component identity', ar: 'المفاتيح وهوية المكوّن' },
        summary: {
          en: 'The same key keeps state; a new key resets it. Use that on purpose.',
          ar: 'المفتاح نفسه يحفظ الحالة، والمفتاح الجديد يعيد ضبطها. استخدم ذلك عن قصد.',
        },
      },
      {
        slug: 'composition-over-configuration',
        minutes: 22,
        tags: ['composition'],
        title: { en: 'Composition over configuration', ar: 'التركيب بدل الإعدادات' },
        summary: {
          en: 'Slots and children beat a component with nineteen boolean props.',
          ar: 'الفتحات و children أفضل من مكوّن بتسعة عشر خاصية منطقية.',
        },
      },
      {
        slug: 'state-colocation',
        minutes: 16,
        tags: ['colocation'],
        title: { en: 'State colocation and structure', ar: 'توطين الحالة وهيكلتها' },
        summary: {
          en: 'Keep state as close to where it is used as possible — performance follows.',
          ar: 'اجعل الحالة أقرب ما يمكن لمكان استخدامها — والأداء سيتبع.',
        },
      },
    ],
  },

  {
    id: 6,
    slug: 'typescript-with-react',
    level: 'intermediate',
    icon: '🔷',
    accent: '#3178c6',
    title: { en: 'TypeScript with React', ar: 'تايب سكربت مع رياكت' },
    tagline: {
      en: 'The industry default — typed props, state and events.',
      ar: 'المعيار السائد — خصائص وحالة وأحداث مُنمَّطة.',
    },
    description: {
      en: 'Nearly every React job posting says TypeScript. You do not need a separate course — you need the slice of TS that makes components safe.',
      ar: 'تقريبًا كل إعلان وظيفة رياكت يذكر تايب سكربت. لا تحتاج دورة منفصلة — تحتاج الجزء الذي يجعل المكوّنات آمنة.',
    },
    outcomes: {
      en: [
        'Type props, children and default values',
        'Type hooks including generics for useState and useRef',
        'Type events and form handlers without guessing',
        'Write a generic, reusable component',
      ],
      ar: [
        'تنميط الخصائص و children والقيم الافتراضية',
        'تنميط الخطّافات بما فيها الأنواع العامة لـ useState و useRef',
        'تنميط الأحداث ومعالجات النماذج دون تخمين',
        'كتابة مكوّن عام قابل لإعادة الاستخدام',
      ],
    },
    project: {
      title: { en: 'Port the to-do app to TypeScript', ar: 'نقل تطبيق المهام إلى تايب سكربت' },
      brief: {
        en: 'Type every component and piece of state, then add a generic <List<T> /> that works for tasks and users alike.',
        ar: 'نمّط كل مكوّن وكل جزء من الحالة، ثم أضف <List<T> /> عامًا يعمل مع المهام والمستخدمين معًا.',
      },
    },
    resources: [
      { label: 'React + TS Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/' },
      { label: 'react.dev — TypeScript', url: 'https://react.dev/learn/typescript' },
      { label: 'TS Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
    ],
    lessons: [
      {
        slug: 'ts-essentials',
        minutes: 24,
        tags: ['type', 'interface', 'union'],
        title: { en: 'TypeScript essentials for React', ar: 'أساسيات تايب سكربت لرياكت' },
        summary: {
          en: 'Types, interfaces, unions and inference — the productive minimum.',
          ar: 'الأنواع والواجهات والاتحادات والاستنتاج — الحد الأدنى المنتج.',
        },
      },
      {
        slug: 'typing-props',
        minutes: 20,
        tags: ['Props', 'ReactNode'],
        title: { en: 'Typing props and children', ar: 'تنميط الخصائص و children' },
        summary: {
          en: 'Required, optional and union props, plus what ReactNode really allows.',
          ar: 'الخصائص الإلزامية والاختيارية والاتحادية، وما الذي يسمح به ReactNode فعلًا.',
        },
      },
      {
        slug: 'typing-hooks',
        minutes: 20,
        tags: ['useState<T>'],
        title: { en: 'Typing useState, useRef and useReducer', ar: 'تنميط useState و useRef و useReducer' },
        summary: {
          en: 'When inference is enough, and when you must be explicit.',
          ar: 'متى يكفي الاستنتاج، ومتى يجب التصريح بالنوع.',
        },
      },
      {
        slug: 'typing-events',
        minutes: 16,
        tags: ['ChangeEvent'],
        title: { en: 'Typing events and handlers', ar: 'تنميط الأحداث والمعالجات' },
        summary: {
          en: 'ChangeEvent, MouseEvent, FormEvent — how to find the right one every time.',
          ar: 'ChangeEvent و MouseEvent و FormEvent — كيف تجد النوع الصحيح دائمًا.',
        },
      },
      {
        slug: 'generic-components',
        minutes: 22,
        tags: ['<T>', 'Omit', 'Pick'],
        title: { en: 'Generic components and utility types', ar: 'المكوّنات العامة والأنواع المساعدة' },
        summary: {
          en: 'One <List /> that stays type-safe no matter what it renders.',
          ar: 'مكوّن <List /> واحد يبقى آمن الأنواع مهما عرض.',
        },
      },
    ],
  },

  {
    id: 7,
    slug: 'tooling-and-setup',
    level: 'intermediate',
    icon: '⚙️',
    accent: '#8b93ff',
    title: { en: 'Tooling & Project Setup', ar: 'الأدوات وإعداد المشروع' },
    tagline: {
      en: 'Vite, linting and the way professionals lay out a codebase.',
      ar: 'Vite وأدوات الفحص وطريقة المحترفين في تنظيم المشروع.',
    },
    description: {
      en: 'A tidy project setup pays back every day: fast dev server, automatic formatting, lint rules that catch hook mistakes before you do.',
      ar: 'الإعداد المرتّب يردّ لك الجميل يوميًا: خادم تطوير سريع، وتنسيق تلقائي، وقواعد فحص تلتقط أخطاء الخطّافات قبلك.',
    },
    outcomes: {
      en: [
        'Scaffold a Vite + TypeScript app from scratch',
        'Configure ESLint flat config and Prettier',
        'Organise files by feature instead of by type',
        'Handle environment variables safely',
      ],
      ar: [
        'إنشاء مشروع Vite + تايب سكربت من الصفر',
        'إعداد ESLint بصيغة flat config مع Prettier',
        'تنظيم الملفات حسب الميزة لا حسب النوع',
        'التعامل الآمن مع متغيّرات البيئة',
      ],
    },
    project: {
      title: { en: 'A clean starter repo', ar: 'مستودع بداية نظيف' },
      brief: {
        en: 'Create a fresh Vite + TS project, wire ESLint and Prettier, add scripts, and push it to GitHub with a real README.',
        ar: 'أنشئ مشروع Vite + TS جديدًا، واربط ESLint و Prettier، وأضف السكربتات، وارفعه إلى GitHub مع README حقيقي.',
      },
    },
    resources: [
      { label: 'Vite Guide', url: 'https://vite.dev/guide/' },
      { label: 'Build a React App from Scratch', url: 'https://react.dev/learn/build-a-react-app-from-scratch' },
    ],
    lessons: [
      {
        slug: 'vite-scaffold',
        minutes: 14,
        tags: ['vite'],
        title: { en: 'Scaffolding with Vite + TS', ar: 'إنشاء المشروع بـ Vite + TS' },
        summary: {
          en: 'One command, a dev server that starts instantly, and what each generated file does.',
          ar: 'أمر واحد، وخادم تطوير يبدأ فورًا، وشرح لكل ملف يُولَّد.',
        },
      },
      {
        slug: 'eslint-prettier',
        minutes: 18,
        tags: ['eslint', 'prettier'],
        title: { en: 'ESLint flat config + Prettier', ar: 'ESLint flat config مع Prettier' },
        summary: {
          en: 'Catch bugs automatically, and stop arguing about formatting forever.',
          ar: 'اكتشف الأخطاء تلقائيًا، وأنهِ الجدال حول التنسيق للأبد.',
        },
      },
      {
        slug: 'folder-structure',
        minutes: 18,
        tags: ['features/'],
        title: { en: 'Folder structure that scales', ar: 'هيكلة مجلدات قابلة للتوسّع' },
        summary: {
          en: 'Feature folders beat components/ hooks/ utils/ once the app grows.',
          ar: 'مجلدات الميزات تتفوّق على components/ hooks/ utils/ مع نمو التطبيق.',
        },
      },
      {
        slug: 'env-variables',
        minutes: 14,
        tags: ['.env', 'import.meta.env'],
        title: { en: 'Environment variables and config', ar: 'متغيّرات البيئة والإعدادات' },
        summary: {
          en: 'Why anything in a frontend .env file is public — and what to do about it.',
          ar: 'لماذا يُعدّ كل ما في ملف .env للواجهة علنيًا — وما البديل.',
        },
      },
      {
        slug: 'npm-scripts',
        minutes: 12,
        tags: ['scripts'],
        title: { en: 'npm scripts and package.json', ar: 'سكربتات npm و package.json' },
        summary: {
          en: 'dev, build, preview, lint, test — the five commands you will type forever.',
          ar: 'dev و build و preview و lint و test — الأوامر الخمسة التي ستكتبها دائمًا.',
        },
      },
      {
        slug: 'git-basics',
        minutes: 20,
        tags: ['git'],
        title: { en: 'Git basics for real projects', ar: 'أساسيات Git للمشاريع الحقيقية' },
        summary: {
          en: 'Branches, meaningful commits, .gitignore and a pull request that gets approved.',
          ar: 'الفروع، والرسائل الواضحة، و .gitignore، وطلب دمج يُقبل.',
        },
      },
    ],
  },

  {
    id: 8,
    slug: 'styling',
    level: 'intermediate',
    icon: '🎨',
    accent: '#38bdf8',
    title: { en: 'Styling Modern React', ar: 'تنسيق رياكت الحديثة' },
    tagline: {
      en: 'Tailwind, CSS Modules and headless component libraries.',
      ar: 'Tailwind و CSS Modules ومكتبات المكوّنات بلا تنسيق.',
    },
    description: {
      en: 'Styling in React is a choice with consequences. This phase covers the two approaches that dominate 2026 job listings, and how to layer accessible primitives on top.',
      ar: 'اختيار طريقة التنسيق في رياكت له تبعات. تغطّي هذه المرحلة الأسلوبين الأكثر طلبًا في 2026، وكيفية البناء فوق مكوّنات أساسية متاحة للجميع.',
    },
    outcomes: {
      en: [
        'Build a full responsive UI with Tailwind utilities',
        'Scope styles safely with CSS Modules',
        'Use headless primitives (Radix / shadcn) accessibly',
        'Ship a working dark mode',
      ],
      ar: [
        'بناء واجهة متجاوبة كاملة بأدوات Tailwind',
        'عزل التنسيقات بأمان عبر CSS Modules',
        'استخدام المكوّنات الأساسية (Radix / shadcn) بشكل متاح للجميع',
        'إطلاق وضع داكن يعمل فعليًا',
      ],
    },
    project: {
      title: { en: 'Redesign the to-do app', ar: 'إعادة تصميم تطبيق المهام' },
      brief: {
        en: 'Rebuild the UI with Tailwind plus two shadcn/ui components — responsive, keyboard friendly, with a dark-mode toggle.',
        ar: 'أعد بناء الواجهة بـ Tailwind ومكوّنَي shadcn/ui — متجاوبة وصديقة للوحة المفاتيح مع مبدّل وضع داكن.',
      },
    },
    resources: [
      { label: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' },
      { label: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
      { label: 'Radix Primitives', url: 'https://www.radix-ui.com/primitives' },
    ],
    lessons: [
      {
        slug: 'tailwind',
        minutes: 24,
        tags: ['tailwind'],
        title: { en: 'Tailwind CSS, utility-first', ar: 'Tailwind CSS والنهج الأدواتي' },
        summary: {
          en: 'Why long class strings win in components, and how the v4 engine is configured.',
          ar: 'لماذا تنجح سلاسل الأصناف الطويلة داخل المكوّنات، وكيف يُضبط محرّك الإصدار الرابع.',
        },
      },
      {
        slug: 'css-modules',
        minutes: 16,
        tags: ['.module.css'],
        title: { en: 'CSS Modules and scoped styles', ar: 'CSS Modules والتنسيقات المعزولة' },
        summary: {
          en: 'Locally scoped class names with zero runtime cost.',
          ar: 'أسماء أصناف معزولة محليًا دون أي تكلفة وقت تشغيل.',
        },
      },
      {
        slug: 'headless-libraries',
        minutes: 22,
        tags: ['shadcn', 'Radix'],
        title: { en: 'Headless component libraries', ar: 'مكتبات المكوّنات بلا تنسيق' },
        summary: {
          en: 'Accessible behaviour you own the styling of — dialogs, menus, tooltips.',
          ar: 'سلوك متاح للجميع تملك تنسيقه — الحوارات والقوائم والتلميحات.',
        },
      },
      {
        slug: 'responsive-and-dark-mode',
        minutes: 20,
        tags: ['dark:', 'md:'],
        title: { en: 'Responsive design and dark mode', ar: 'التصميم المتجاوب والوضع الداكن' },
        summary: {
          en: 'Breakpoints, container queries and a theme switch that survives reload.',
          ar: 'نقاط التوقّف واستعلامات الحاويات ومبدّل مظهر يصمد بعد إعادة التحميل.',
        },
      },
      {
        slug: 'class-merging',
        minutes: 12,
        tags: ['clsx', 'cva'],
        title: { en: 'Conditional classes and variants', ar: 'الأصناف الشرطية والمتغيّرات' },
        summary: {
          en: 'clsx, tailwind-merge and variant APIs for component libraries.',
          ar: 'clsx و tailwind-merge وواجهات المتغيّرات لمكتبات المكوّنات.',
        },
      },
    ],
  },

  {
    id: 9,
    slug: 'routing-and-data',
    level: 'intermediate',
    icon: '🛰️',
    accent: '#22d3ee',
    title: { en: 'Routing & Data Fetching', ar: 'التوجيه وجلب البيانات' },
    tagline: {
      en: 'Multi-page apps, and talking to servers properly.',
      ar: 'تطبيقات متعدّدة الصفحات، والتواصل الصحيح مع الخوادم.',
    },
    description: {
      en: 'Fetching in a useEffect works until it does not: race conditions, no caching, double requests. TanStack Query solves this class of problem once, for good.',
      ar: 'الجلب داخل useEffect ينجح حتى يفشل: تعارض الطلبات، بلا تخزين مؤقّت، وطلبات مكرّرة. تحلّ TanStack Query هذه الفئة من المشاكل مرّة واحدة وللأبد.',
    },
    outcomes: {
      en: [
        'Build nested routes, layouts and dynamic params',
        'Handle loading, error and empty states deliberately',
        'Cache and refetch server data with TanStack Query',
        'Add optimistic updates and infinite lists',
      ],
      ar: [
        'بناء مسارات متداخلة وتخطيطات ومعاملات ديناميكية',
        'التعامل الواعي مع حالات التحميل والخطأ والفراغ',
        'تخزين وإعادة جلب بيانات الخادم عبر TanStack Query',
        'إضافة التحديثات التفاؤلية والقوائم اللانهائية',
      ],
    },
    project: {
      title: { en: 'GitHub explorer', ar: 'مستكشف GitHub' },
      brief: {
        en: 'Search users, route to /user/:name, fetch repos with TanStack Query, and page through results with proper states.',
        ar: 'ابحث عن المستخدمين، وانتقل إلى ‎/user/:name، واجلب المستودعات بـ TanStack Query، وتصفّح النتائج بحالات صحيحة.',
      },
    },
    resources: [
      { label: 'TanStack Query', url: 'https://tanstack.com/query/latest' },
      { label: 'React Router', url: 'https://reactrouter.com/' },
      { label: 'TanStack Router', url: 'https://tanstack.com/router/latest' },
    ],
    lessons: [
      {
        slug: 'client-routing',
        minutes: 24,
        tags: ['router', 'params'],
        title: { en: 'Client-side routing', ar: 'التوجيه من جهة العميل' },
        summary: {
          en: 'Routes, nested layouts, URL params and programmatic navigation.',
          ar: 'المسارات والتخطيطات المتداخلة ومعاملات الرابط والتنقّل البرمجي.',
        },
      },
      {
        slug: 'fetching-fundamentals',
        minutes: 22,
        tags: ['fetch', 'AbortController'],
        title: { en: 'Data fetching fundamentals', ar: 'أساسيات جلب البيانات' },
        summary: {
          en: 'Loading and error states, race conditions and why cleanup matters.',
          ar: 'حالات التحميل والخطأ، وتعارض الطلبات، ولماذا يهمّ التنظيف.',
        },
      },
      {
        slug: 'tanstack-query',
        minutes: 28,
        tags: ['useQuery'],
        title: { en: 'TanStack Query — server state', ar: 'TanStack Query — حالة الخادم' },
        summary: {
          en: 'Cache keys, stale time, background refetching and mutations.',
          ar: 'مفاتيح التخزين، ومدة التقادم، وإعادة الجلب في الخلفية، والتعديلات.',
        },
      },
      {
        slug: 'optimistic-updates',
        minutes: 20,
        tags: ['optimistic'],
        title: { en: 'Optimistic updates', ar: 'التحديثات التفاؤلية' },
        summary: {
          en: 'Show the result instantly, roll back cleanly when the server disagrees.',
          ar: 'اعرض النتيجة فورًا، وتراجع بنظافة حين يرفض الخادم.',
        },
      },
      {
        slug: 'pagination-infinite',
        minutes: 20,
        tags: ['infinite'],
        title: { en: 'Pagination and infinite scroll', ar: 'الترقيم والتمرير اللانهائي' },
        summary: {
          en: 'Cursor patterns, useInfiniteQuery and not breaking the back button.',
          ar: 'أنماط المؤشّر، و useInfiniteQuery، وعدم تعطيل زر الرجوع.',
        },
      },
    ],
  },

  {
    id: 10,
    slug: 'state-management',
    level: 'advanced',
    icon: '🗃️',
    accent: '#a98cff',
    title: { en: 'State Management at Scale', ar: 'إدارة الحالة على نطاق واسع' },
    tagline: {
      en: 'Choosing the right tool — and not over-engineering.',
      ar: 'اختيار الأداة الصحيحة — دون هندسة زائدة.',
    },
    description: {
      en: 'Most "global state" problems disappear once you separate server cache from client state. What remains is small, and a 3 KB store handles it.',
      ar: 'تختفي معظم مشاكل «الحالة العامة» بمجرد فصل ذاكرة الخادم عن حالة العميل. ما يتبقّى صغير، ويكفيه مخزن بحجم ٣ كيلوبايت.',
    },
    outcomes: {
      en: [
        'Tell server state and client state apart instantly',
        'Build a global store with Zustand',
        'Know when Context is the right answer and when it is not',
        'Read and maintain a Redux Toolkit codebase',
      ],
      ar: [
        'التمييز الفوري بين حالة الخادم وحالة العميل',
        'بناء مخزن عام باستخدام Zustand',
        'معرفة متى يكون Context هو الحل ومتى لا يكون',
        'قراءة وصيانة مشروع يستخدم Redux Toolkit',
      ],
    },
    project: {
      title: { en: 'Mini store with a cart', ar: 'متجر مصغّر بعربة تسوّق' },
      brief: {
        en: 'Products come from TanStack Query, the cart lives in Zustand. Feel where the boundary sits.',
        ar: 'المنتجات من TanStack Query والعربة في Zustand. اشعر بموضع الحدّ بينهما.',
      },
    },
    resources: [
      { label: 'Zustand', url: 'https://zustand.docs.pmnd.rs/' },
      { label: 'Jotai', url: 'https://jotai.org/' },
      { label: 'Redux Toolkit', url: 'https://redux-toolkit.js.org/' },
    ],
    lessons: [
      {
        slug: 'server-vs-client-state',
        minutes: 18,
        tags: ['distinction'],
        title: { en: 'Server state vs. client state', ar: 'حالة الخادم مقابل حالة العميل' },
        summary: {
          en: 'The single distinction that shrinks most state-management problems.',
          ar: 'التمييز الوحيد الذي يُقلّص معظم مشاكل إدارة الحالة.',
        },
      },
      {
        slug: 'zustand',
        minutes: 22,
        tags: ['zustand'],
        title: { en: 'Zustand — a simple global store', ar: 'Zustand — مخزن عام بسيط' },
        summary: {
          en: 'Create a store, select slices, avoid the re-render traps.',
          ar: 'أنشئ مخزنًا، واختر أجزاءً منه، وتجنّب مصائد إعادة العرض.',
        },
      },
      {
        slug: 'jotai',
        minutes: 16,
        tags: ['jotai', 'atoms'],
        title: { en: 'Jotai — atomic state', ar: 'Jotai — الحالة الذرّية' },
        summary: {
          en: 'Bottom-up atoms when fine-grained reactivity matters.',
          ar: 'ذرّات من الأسفل للأعلى حين تهمّ التفاعلية الدقيقة.',
        },
      },
      {
        slug: 'context-limits',
        minutes: 18,
        tags: ['context'],
        title: { en: 'When Context is enough — and its limits', ar: 'متى يكفي Context — وأين حدوده' },
        summary: {
          en: 'Context is dependency injection, not a performance-tuned store.',
          ar: 'Context حقن اعتماديات، وليس مخزنًا مُحسَّنًا للأداء.',
        },
      },
      {
        slug: 'redux-toolkit',
        minutes: 24,
        tags: ['redux', 'RTK'],
        title: { en: 'Redux Toolkit — the legacy giant', ar: 'Redux Toolkit — العملاق القديم' },
        summary: {
          en: 'Still everywhere in enterprise code: slices, RTK Query and the DevTools.',
          ar: 'ما زال منتشرًا في كود الشركات: الشرائح و RTK Query وأدوات المطوّر.',
        },
      },
    ],
  },

  {
    id: 11,
    slug: 'forms-and-validation',
    level: 'advanced',
    icon: '📝',
    accent: '#c084fc',
    title: { en: 'Forms & Validation', ar: 'النماذج والتحقّق' },
    tagline: {
      en: 'Production-grade forms without the pain.',
      ar: 'نماذج بمستوى الإنتاج دون معاناة.',
    },
    description: {
      en: 'Real forms have async validation, field arrays, server errors and accessibility requirements. React Hook Form plus Zod handles all of it with one schema.',
      ar: 'النماذج الحقيقية فيها تحقّق غير متزامن، ومصفوفات حقول، وأخطاء من الخادم، ومتطلّبات إتاحة. يتكفّل React Hook Form مع Zod بكل ذلك بمخطّط واحد.',
    },
    outcomes: {
      en: [
        'Build fast forms with minimal re-renders',
        'Validate with a Zod schema that also gives you types',
        'Handle field arrays, async checks and server errors',
        'Make forms usable with a keyboard and a screen reader',
      ],
      ar: [
        'بناء نماذج سريعة بأقل إعادة عرض',
        'التحقّق عبر مخطّط Zod يمنحك الأنواع أيضًا',
        'التعامل مع مصفوفات الحقول والفحوص غير المتزامنة وأخطاء الخادم',
        'جعل النماذج قابلة للاستخدام بلوحة المفاتيح وقارئ الشاشة',
      ],
    },
    project: {
      title: { en: 'Multi-step signup', ar: 'تسجيل متعدّد الخطوات' },
      brief: {
        en: 'Three steps, per-field errors, a review screen, and full keyboard accessibility.',
        ar: 'ثلاث خطوات، وأخطاء لكل حقل، وشاشة مراجعة، وإتاحة كاملة بلوحة المفاتيح.',
      },
    },
    resources: [
      { label: 'React Hook Form', url: 'https://react-hook-form.com/' },
      { label: 'Zod', url: 'https://zod.dev/' },
    ],
    lessons: [
      {
        slug: 'react-hook-form',
        minutes: 24,
        tags: ['RHF', 'register'],
        title: { en: 'React Hook Form', ar: 'React Hook Form' },
        summary: {
          en: 'Uncontrolled by default, which is why it stays fast on big forms.',
          ar: 'غير مُتحكَّم به افتراضيًا، ولهذا يبقى سريعًا في النماذج الكبيرة.',
        },
      },
      {
        slug: 'zod',
        minutes: 22,
        tags: ['zod', 'infer'],
        title: { en: 'Zod schema validation', ar: 'التحقّق بمخطّطات Zod' },
        summary: {
          en: 'Write the shape once; get runtime validation and TypeScript types together.',
          ar: 'اكتب الشكل مرّة واحصل على تحقّق وقت التشغيل وأنواع تايب سكربت معًا.',
        },
      },
      {
        slug: 'rhf-zod-resolver',
        minutes: 18,
        tags: ['resolver'],
        title: { en: 'RHF + Zod together', ar: 'دمج RHF مع Zod' },
        summary: {
          en: 'The standard combination, wired end to end with typed errors.',
          ar: 'التركيبة القياسية، موصولة من البداية للنهاية بأخطاء مُنمَّطة.',
        },
      },
      {
        slug: 'complex-fields',
        minutes: 22,
        tags: ['a11y', 'field arrays'],
        title: { en: 'Complex fields and form UX', ar: 'الحقول المعقّدة وتجربة النموذج' },
        summary: {
          en: 'Dynamic rows, async availability checks, error summaries and focus management.',
          ar: 'صفوف ديناميكية، وفحوص توفّر غير متزامنة، وملخّصات أخطاء، وإدارة التركيز.',
        },
      },
    ],
  },

  {
    id: 12,
    slug: 'react-19-features',
    level: 'advanced',
    icon: '✨',
    accent: '#f472b6',
    title: { en: 'Modern React 19+ Features', ar: 'ميزات رياكت 19+ الحديثة' },
    tagline: {
      en: 'The genuinely new material that defines React today.',
      ar: 'الجديد فعليًا الذي يُعرّف رياكت اليوم.',
    },
    description: {
      en: 'Actions, the use() hook, useOptimistic, the compiler and Server Components. This is the phase that makes your knowledge current rather than 2021-shaped.',
      ar: 'الإجراءات، وخطّاف use()، و useOptimistic، والمُصرِّف، ومكوّنات الخادم. هذه المرحلة تجعل معرفتك حديثة بدل أن تكون بنكهة 2021.',
    },
    outcomes: {
      en: [
        'Let the React Compiler handle memoisation for you',
        'Use Actions and useActionState for form submissions',
        'Build optimistic UI with a built-in hook',
        'Explain Server Components to someone else',
      ],
      ar: [
        'ترك التخزين التلقائي لمُصرِّف رياكت',
        'استخدام Actions و useActionState لإرسال النماذج',
        'بناء واجهة تفاؤلية بخطّاف مدمج',
        'شرح مكوّنات الخادم لشخص آخر',
      ],
    },
    project: {
      title: { en: 'Chat with optimistic send', ar: 'محادثة بإرسال تفاؤلي' },
      brief: {
        en: 'Messages appear instantly with useOptimistic, and a form uses useActionState for pending and error states.',
        ar: 'تظهر الرسائل فورًا عبر useOptimistic، ويستخدم النموذج useActionState لحالتي الانتظار والخطأ.',
      },
    },
    resources: [
      { label: 'React 19 blog', url: 'https://react.dev/blog/2024/12/05/react-19' },
      { label: 'React 19.2 blog', url: 'https://react.dev/blog/2025/10/01/react-19-2' },
      { label: 'React Compiler 1.0', url: 'https://react.dev/blog/2025/10/07/react-compiler-1' },
    ],
    lessons: [
      {
        slug: 'react-compiler',
        minutes: 20,
        tags: ['compiler'],
        title: { en: 'The React Compiler', ar: 'مُصرِّف رياكت' },
        summary: {
          en: 'Automatic memoisation — what it does, what it needs from your code.',
          ar: 'تخزين تلقائي للنتائج — ماذا يفعل، وما الذي يطلبه من كودك.',
        },
      },
      {
        slug: 'actions-useactionstate',
        minutes: 24,
        tags: ['actions'],
        title: { en: 'Actions and useActionState', ar: 'الإجراءات و useActionState' },
        summary: {
          en: 'Pending, error and success states handled by React instead of by you.',
          ar: 'حالات الانتظار والخطأ والنجاح تديرها رياكت بدلًا عنك.',
        },
      },
      {
        slug: 'use-hook',
        minutes: 16,
        tags: ['use()'],
        title: { en: 'The use() hook', ar: 'خطّاف use()' },
        summary: {
          en: 'Read a promise or context — and the one rule that makes it different.',
          ar: 'اقرأ وعدًا أو سياقًا — والقاعدة الوحيدة التي تجعله مختلفًا.',
        },
      },
      {
        slug: 'useoptimistic',
        minutes: 18,
        tags: ['useOptimistic'],
        title: { en: 'useOptimistic', ar: 'useOptimistic' },
        summary: {
          en: 'Instant feedback with automatic rollback, built into React itself.',
          ar: 'استجابة فورية مع تراجع تلقائي، مدمجة في رياكت نفسها.',
        },
      },
      {
        slug: 'transitions-and-suspense',
        minutes: 24,
        tags: ['useTransition', 'Suspense'],
        title: { en: 'Transitions and Suspense', ar: 'الانتقالات و Suspense' },
        summary: {
          en: 'Keep the interface responsive while something slow is happening.',
          ar: 'حافظ على استجابة الواجهة أثناء حدوث شيء بطيء.',
        },
      },
      {
        slug: 'activity-and-effect-event',
        minutes: 16,
        tags: ['<Activity>', 'useEffectEvent'],
        title: { en: '<Activity> and useEffectEvent', ar: '<Activity> و useEffectEvent' },
        summary: {
          en: 'Pre-render hidden UI, and separate event logic from effect dependencies.',
          ar: 'اعرض مسبقًا واجهة مخفية، وافصل منطق الحدث عن اعتماديات التأثير.',
        },
      },
      {
        slug: 'server-components-model',
        minutes: 26,
        tags: ['RSC'],
        title: { en: 'Server Components — the mental model', ar: 'مكوّنات الخادم — النموذج الذهني' },
        summary: {
          en: 'Components that run on the server and ship zero JavaScript. The biggest shift in years.',
          ar: 'مكوّنات تعمل على الخادم ولا ترسل أي جافاسكربت. أكبر تحوّل منذ سنوات.',
        },
      },
    ],
  },

  {
    id: 13,
    slug: 'nextjs-fullstack',
    level: 'pro',
    icon: '▲',
    accent: '#ff7eb6',
    title: { en: 'Full-Stack with Next.js', ar: 'تطبيقات متكاملة بـ Next.js' },
    tagline: {
      en: 'Where Server Components come alive and you ship real products.',
      ar: 'حيث تنبض مكوّنات الخادم بالحياة وتُطلق منتجات حقيقية.',
    },
    description: {
      en: 'Next.js is the reference implementation of React\'s full-stack vision: routing, data loading, mutations and deployment in one framework.',
      ar: 'Next.js هو التطبيق المرجعي لرؤية رياكت المتكاملة: التوجيه وتحميل البيانات والتعديلات والنشر في إطار واحد.',
    },
    outcomes: {
      en: [
        'Build routes, layouts and loading UI with the App Router',
        'Split server and client work deliberately',
        'Mutate data with Server Actions',
        'Choose a rendering strategy per route and deploy it',
      ],
      ar: [
        'بناء المسارات والتخطيطات وواجهات التحميل بـ App Router',
        'تقسيم عمل الخادم والعميل عن قصد',
        'تعديل البيانات عبر Server Actions',
        'اختيار استراتيجية عرض لكل مسار ثم النشر',
      ],
    },
    project: {
      title: { en: 'Capstone: a real product', ar: 'المشروع الختامي: منتج حقيقي' },
      brief: {
        en: 'A task manager or blog with auth, a Postgres database, Server Actions for writes and RSC for reads — deployed and public.',
        ar: 'مدير مهام أو مدوّنة مع مصادقة وقاعدة بيانات Postgres، و Server Actions للكتابة و RSC للقراءة — منشور وعلني.',
      },
    },
    resources: [
      { label: 'Next.js Docs', url: 'https://nextjs.org/docs' },
      { label: 'Next.js Learn', url: 'https://nextjs.org/learn' },
    ],
    lessons: [
      {
        slug: 'app-router',
        minutes: 24,
        tags: ['app/'],
        title: { en: 'The App Router', ar: 'موجّه App' },
        summary: {
          en: 'File-based routing, nested layouts, loading.tsx and error.tsx conventions.',
          ar: 'توجيه قائم على الملفات، وتخطيطات متداخلة، واصطلاحات loading.tsx و error.tsx.',
        },
      },
      {
        slug: 'server-vs-client-components',
        minutes: 26,
        tags: ["'use client'"],
        title: { en: 'Server vs. Client Components', ar: 'مكوّنات الخادم مقابل العميل' },
        summary: {
          en: 'Where each runs, what each can do, and how to compose them without fighting.',
          ar: 'أين يعمل كل نوع وما الذي يستطيعه، وكيف تركّبهما دون صراع.',
        },
      },
      {
        slug: 'server-actions',
        minutes: 24,
        tags: ["'use server'"],
        title: { en: 'Server Actions and mutations', ar: 'إجراءات الخادم والتعديلات' },
        summary: {
          en: 'Call a server function straight from a form — no API route in between.',
          ar: 'استدعِ دالة خادم مباشرة من نموذج — دون مسار API بينهما.',
        },
      },
      {
        slug: 'nextjs-data-caching',
        minutes: 24,
        tags: ['revalidate'],
        title: { en: 'Data fetching and caching', ar: 'جلب البيانات والتخزين المؤقّت' },
        summary: {
          en: 'Fetch in a Server Component, revalidate on demand, stream with Suspense.',
          ar: 'اجلب داخل مكوّن خادم، وأعد التحقّق عند الطلب، وابثّ عبر Suspense.',
        },
      },
      {
        slug: 'rendering-strategies',
        minutes: 22,
        tags: ['SSR', 'SSG', 'ISR', 'PPR'],
        title: { en: 'Rendering strategies', ar: 'استراتيجيات العرض' },
        summary: {
          en: 'Static, dynamic, incremental and partial pre-rendering — chosen per route.',
          ar: 'ثابت وديناميكي وتدريجي وجزئي — يُختار لكل مسار.',
        },
      },
      {
        slug: 'auth-and-middleware',
        minutes: 26,
        tags: ['auth'],
        title: { en: 'Auth, middleware and route handlers', ar: 'المصادقة والوسيط ومعالجات المسارات' },
        summary: {
          en: 'Sessions, protecting pages, and building the API endpoints you still need.',
          ar: 'الجلسات، وحماية الصفحات، وبناء نقاط النهاية التي ما زلت تحتاجها.',
        },
      },
      {
        slug: 'deploying',
        minutes: 20,
        tags: ['deploy'],
        title: { en: 'Deploying to production', ar: 'النشر إلى الإنتاج' },
        summary: {
          en: 'Environment variables, preview deployments and what breaks on the first deploy.',
          ar: 'متغيّرات البيئة، ونشرات المعاينة، وما الذي يتعطّل في أول نشر.',
        },
      },
    ],
  },

  {
    id: 14,
    slug: 'testing',
    level: 'pro',
    icon: '🧪',
    accent: '#fb7185',
    title: { en: 'Testing & Quality', ar: 'الاختبار والجودة' },
    tagline: {
      en: 'How professional teams keep code from breaking.',
      ar: 'كيف تمنع الفرق المحترفة الكود من الانهيار.',
    },
    description: {
      en: 'Tests are not about coverage numbers. They are about being able to change code on a Friday afternoon without fear.',
      ar: 'الاختبارات ليست أرقام تغطية، بل قدرتك على تعديل الكود عصر الخميس دون خوف.',
    },
    outcomes: {
      en: [
        'Write unit and integration tests with Vitest',
        'Test components the way a user experiences them',
        'Handle async UI, mocks and custom hooks in tests',
        'Cover the critical path end to end with Playwright',
      ],
      ar: [
        'كتابة اختبارات وحدة وتكامل بـ Vitest',
        'اختبار المكوّنات كما يختبرها المستخدم',
        'التعامل مع الواجهات غير المتزامنة والمحاكاة والخطّافات في الاختبارات',
        'تغطية المسار الحرج من طرف لطرف بـ Playwright',
      ],
    },
    project: {
      title: { en: 'Test suite for the capstone', ar: 'حزمة اختبارات للمشروع الختامي' },
      brief: {
        en: 'Unit tests for utilities, React Testing Library for one important component, and a single Playwright happy path.',
        ar: 'اختبارات وحدة للأدوات، و React Testing Library لمكوّن مهم، ومسار نجاح واحد بـ Playwright.',
      },
    },
    resources: [
      { label: 'Vitest', url: 'https://vitest.dev/' },
      { label: 'Testing Library', url: 'https://testing-library.com/docs/react-testing-library/intro/' },
      { label: 'Playwright', url: 'https://playwright.dev/' },
    ],
    lessons: [
      {
        slug: 'vitest',
        minutes: 20,
        tags: ['vitest'],
        title: { en: 'Vitest for unit and integration tests', ar: 'Vitest لاختبارات الوحدة والتكامل' },
        summary: {
          en: 'Setup, watch mode, and structuring tests that stay readable.',
          ar: 'الإعداد، ووضع المراقبة، وهيكلة اختبارات تبقى مقروءة.',
        },
      },
      {
        slug: 'react-testing-library',
        minutes: 24,
        tags: ['RTL', 'getByRole'],
        title: { en: 'React Testing Library', ar: 'React Testing Library' },
        summary: {
          en: 'Query by role and label, never by class name — test behaviour, not internals.',
          ar: 'ابحث بالدور والتسمية لا باسم الصنف — اختبر السلوك لا التفاصيل الداخلية.',
        },
      },
      {
        slug: 'testing-async-and-hooks',
        minutes: 22,
        tags: ['waitFor', 'renderHook'],
        title: { en: 'Testing async UI and hooks', ar: 'اختبار الواجهات غير المتزامنة والخطّافات' },
        summary: {
          en: 'findBy vs waitFor, faking timers, and mocking the network properly.',
          ar: 'الفرق بين findBy و waitFor، وتزييف المؤقّتات، ومحاكاة الشبكة بشكل صحيح.',
        },
      },
      {
        slug: 'playwright',
        minutes: 24,
        tags: ['playwright', 'e2e'],
        title: { en: 'Playwright end-to-end tests', ar: 'اختبارات Playwright من طرف لطرف' },
        summary: {
          en: 'Real browser, real navigation — the tests that catch integration mistakes.',
          ar: 'متصفّح حقيقي وتنقّل حقيقي — الاختبارات التي تلتقط أخطاء التكامل.',
        },
      },
      {
        slug: 'testing-strategy',
        minutes: 18,
        tags: ['strategy'],
        title: { en: 'What to test and what to skip', ar: 'ما تختبره وما تتجاهله' },
        summary: {
          en: 'Confidence per line of test — and the brittle tests to delete on sight.',
          ar: 'الثقة مقابل كل سطر اختبار — والاختبارات الهشّة التي تُحذف فورًا.',
        },
      },
    ],
  },

  {
    id: 15,
    slug: 'performance-and-a11y',
    level: 'pro',
    icon: '⚡',
    accent: '#f59e0b',
    title: { en: 'Performance & Accessibility', ar: 'الأداء وإتاحة الوصول' },
    tagline: {
      en: 'Fast and inclusive — both are non-negotiable professionally.',
      ar: 'سريع ومتاح للجميع — كلاهما غير قابل للتفاوض مهنيًا.',
    },
    description: {
      en: 'Performance work starts with measurement, and accessibility starts with semantic HTML. Both are far cheaper to do early than to retrofit.',
      ar: 'يبدأ تحسين الأداء بالقياس، وتبدأ الإتاحة بـ HTML الدلالي. وكلاهما أرخص بكثير مبكرًا من إصلاحه لاحقًا.',
    },
    outcomes: {
      en: [
        'Profile a real app and find the actual bottleneck',
        'Split code by route and lazy-load heavy parts',
        'Move Core Web Vitals in the right direction',
        'Pass a keyboard-only and screen-reader walkthrough',
      ],
      ar: [
        'تحليل تطبيق حقيقي وإيجاد الاختناق الفعلي',
        'تقسيم الكود حسب المسار وتحميل الأجزاء الثقيلة عند الحاجة',
        'تحسين مؤشّرات Core Web Vitals',
        'اجتياز جولة بلوحة المفاتيح وحدها ومع قارئ الشاشة',
      ],
    },
    project: {
      title: { en: 'Optimisation pass', ar: 'جولة تحسين' },
      brief: {
        en: 'Run Lighthouse on the capstone, fix the top three findings, add route-based splitting, then navigate the whole app without a mouse.',
        ar: 'شغّل Lighthouse على المشروع الختامي، وأصلح أهم ثلاث ملاحظات، وأضف تقسيمًا حسب المسار، ثم تنقّل في التطبيق كله دون فأرة.',
      },
    },
    resources: [
      { label: 'web.dev — Core Web Vitals', url: 'https://web.dev/articles/vitals' },
      { label: 'react.dev — Accessibility', url: 'https://react.dev/learn/accessibility' },
    ],
    lessons: [
      {
        slug: 'profiling',
        minutes: 20,
        tags: ['profiler'],
        title: { en: 'Profiling with React DevTools', ar: 'التحليل بأدوات React DevTools' },
        summary: {
          en: 'Measure first. The Performance Tracks show you what actually cost time.',
          ar: 'قِس أولًا. مسارات الأداء تُظهر ما استهلك الوقت فعلًا.',
        },
      },
      {
        slug: 'code-splitting',
        minutes: 20,
        tags: ['lazy', 'Suspense'],
        title: { en: 'Code splitting and lazy loading', ar: 'تقسيم الكود والتحميل المؤجّل' },
        summary: {
          en: 'React.lazy, dynamic imports and splitting on route boundaries.',
          ar: 'React.lazy والاستيراد الديناميكي والتقسيم عند حدود المسارات.',
        },
      },
      {
        slug: 'core-web-vitals',
        minutes: 22,
        tags: ['LCP', 'INP', 'CLS'],
        title: { en: 'Core Web Vitals', ar: 'مؤشّرات Core Web Vitals' },
        summary: {
          en: 'LCP, INP and CLS — what they measure and the React patterns that hurt them.',
          ar: 'LCP و INP و CLS — ماذا تقيس وأي أنماط رياكت تضرّها.',
        },
      },
      {
        slug: 'accessibility',
        minutes: 26,
        tags: ['a11y', 'ARIA'],
        title: { en: 'Accessibility fundamentals', ar: 'أساسيات إتاحة الوصول' },
        summary: {
          en: 'Semantic HTML first, ARIA second, focus management always.',
          ar: 'HTML الدلالي أولًا، ثم ARIA، وإدارة التركيز دائمًا.',
        },
      },
      {
        slug: 'assets-and-bundles',
        minutes: 20,
        tags: ['bundle'],
        title: { en: 'Images, fonts and bundle size', ar: 'الصور والخطوط وحجم الحزمة' },
        summary: {
          en: 'The cheapest wins in frontend performance are almost always assets.',
          ar: 'أسهل مكاسب أداء الواجهة تكون دائمًا تقريبًا في الأصول.',
        },
      },
    ],
  },

  {
    id: 16,
    slug: 'professional-practice',
    level: 'pro',
    icon: '🏆',
    accent: '#fbbf24',
    title: { en: 'Professional Practice', ar: 'الممارسة الاحترافية' },
    tagline: {
      en: 'The habits that get the job — and keep it.',
      ar: 'العادات التي تجلب الوظيفة — وتحافظ عليها.',
    },
    description: {
      en: 'Writing React is one skill. Working as a React engineer — reviewing, documenting, shipping safely, explaining trade-offs — is another. This phase covers the second one.',
      ar: 'كتابة رياكت مهارة، والعمل كمهندس رياكت — مراجعة وتوثيق وإطلاق آمن وشرح المفاضلات — مهارة أخرى. هذه المرحلة تغطّي الثانية.',
    },
    outcomes: {
      en: [
        'Recognise and apply the common React design patterns',
        'Navigate an unfamiliar codebase and review a pull request',
        'Automate lint, tests and deployment with CI',
        'Present your work so it survives an interview',
      ],
      ar: [
        'التعرّف على أنماط تصميم رياكت الشائعة وتطبيقها',
        'التنقّل في مشروع غير مألوف ومراجعة طلبات الدمج',
        'أتمتة الفحص والاختبار والنشر عبر CI',
        'عرض عملك بشكل يصمد في المقابلات',
      ],
    },
    project: {
      title: { en: 'Portfolio polish', ar: 'صقل معرض الأعمال' },
      brief: {
        en: 'Add CI that lints and tests on every push, document your components in Storybook, and write the decisions behind each project.',
        ar: 'أضف CI يفحص ويختبر عند كل دفع، ووثّق مكوّناتك في Storybook، واكتب القرارات وراء كل مشروع.',
      },
    },
    resources: [
      { label: 'Patterns.dev', url: 'https://www.patterns.dev/' },
      { label: 'Storybook', url: 'https://storybook.js.org/' },
      { label: 'React Blog', url: 'https://react.dev/blog' },
    ],
    lessons: [
      {
        slug: 'design-patterns',
        minutes: 24,
        tags: ['patterns'],
        title: { en: 'React design patterns', ar: 'أنماط تصميم رياكت' },
        summary: {
          en: 'Compound components, providers, render props and the container split.',
          ar: 'المكوّنات المركّبة، والمزوّدات، ودوال العرض، وفصل الحاوية عن العرض.',
        },
      },
      {
        slug: 'reading-codebases',
        minutes: 20,
        tags: ['PRs', 'review'],
        title: { en: 'Reading and reviewing code', ar: 'قراءة الكود ومراجعته' },
        summary: {
          en: 'How to get productive in a 200-file repo in an afternoon.',
          ar: 'كيف تصبح منتجًا في مستودع من ٢٠٠ ملف خلال بعد ظهر واحد.',
        },
      },
      {
        slug: 'ci-cd',
        minutes: 20,
        tags: ['CI/CD'],
        title: { en: 'CI/CD basics', ar: 'أساسيات CI/CD' },
        summary: {
          en: 'A GitHub Actions workflow that lints, tests and deploys on every push.',
          ar: 'سير عمل GitHub Actions يفحص ويختبر وينشر عند كل دفع.',
        },
      },
      {
        slug: 'storybook',
        minutes: 18,
        tags: ['storybook'],
        title: { en: 'Storybook and component docs', ar: 'Storybook وتوثيق المكوّنات' },
        summary: {
          en: 'Develop components in isolation and document every state they can be in.',
          ar: 'طوّر المكوّنات بمعزل ووثّق كل حالة يمكن أن تكون عليها.',
        },
      },
      {
        slug: 'portfolio-and-interviews',
        minutes: 24,
        tags: ['portfolio'],
        title: { en: 'Portfolio and interview prep', ar: 'المعرض والتحضير للمقابلات' },
        summary: {
          en: 'Two or three deep projects beat ten clones — and know why you chose each tool.',
          ar: 'مشروعان أو ثلاثة بعمق أفضل من عشرة نسخ — واعرف لماذا اخترت كل أداة.',
        },
      },
      {
        slug: 'staying-current',
        minutes: 14,
        tags: ['learning'],
        title: { en: 'Staying current without burning out', ar: 'مواكبة الجديد دون إنهاك' },
        summary: {
          en: 'What to follow, what to ignore, and how to evaluate a new library in ten minutes.',
          ar: 'ما تتابعه وما تتجاهله، وكيف تُقيّم مكتبة جديدة في عشر دقائق.',
        },
      },
    ],
  },
]

export const TOTAL_LESSONS = PHASES.reduce((n, p) => n + p.lessons.length, 0)
export const TOTAL_MINUTES = PHASES.reduce(
  (n, p) => n + p.lessons.reduce((m, l) => m + l.minutes, 0),
  0,
)

export function getPhase(slug: string | undefined): Phase | undefined {
  return PHASES.find((p) => p.slug === slug)
}

export function phaseKeys(phase: Phase): string[] {
  return phase.lessons.map((l) => `${phase.slug}/${l.slug}`)
}

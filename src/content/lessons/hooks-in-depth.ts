import type { LessonBody } from '../blocks'

export const hooksInDepth: LessonBody[] = [
  {
    id: 'hooks-in-depth/rules-of-hooks',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Hooks look like magic until you know how React finds them: it does not know their names, only the **order** in which they were called. Both rules follow from that one implementation detail.',
          ar: 'تبدو الخطّافات سحرًا حتى تعرف كيف تجدها رياكت: فهي لا تعرف أسماءها بل **ترتيب** استدعائها فقط. والقاعدتان تنبعان من هذه التفصيلة وحدها.',
        },
      },
      {
        type: 'list',
        ordered: true,
        items: {
          en: [
            '**Only call hooks at the top level** — never inside a condition, loop, or nested function.',
            '**Only call hooks from React functions** — a component, or another hook.',
          ],
          ar: [
            '**استدعِ الخطّافات في المستوى الأعلى فقط** — لا داخل شرط أو حلقة أو دالة متداخلة.',
            '**استدعِ الخطّافات من دوال رياكت فقط** — من مكوّن أو من خطّاف آخر.',
          ],
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// 🚫 the hook count changes between renders
function Profile({ user }) {
  if (user) {
    const [name, setName] = useState(user.name);  // sometimes called
  }
  const [age, setAge] = useState(0);              // slot shifts!
}

// ✅ always the same number, in the same order
function Profile({ user }) {
  const [name, setName] = useState(user?.name ?? '');
  const [age, setAge] = useState(0);

  if (!user) return <Empty />;   // conditions go *after* the hooks
}`,
      },
      {
        type: 'callout',
        tone: 'note',
        title: { en: 'What actually goes wrong', ar: 'ما الذي يحدث فعلًا' },
        body: {
          en: 'React stores hook state in a list attached to the component. Render one, skip a hook, and every later hook reads the slot belonging to a different one — so your `age` suddenly contains a name.',
          ar: 'تخزّن رياكت حالة الخطّافات في قائمة مرتبطة بالمكوّن. اعرض مرة، وتخطَّ خطّافًا، فيقرأ كل خطّاف لاحق خانة تعود لغيره — فتجد `age` وقد صارت اسمًا.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'You will not have to police this by hand: `eslint-plugin-react-hooks` catches both rules, and the React Compiler refuses to optimise a component that breaks them. Install the lint rule on day one.',
          ar: 'لن تراقب هذا يدويًا: فـ `eslint-plugin-react-hooks` يلتقط القاعدتين، ومُصرِّف رياكت يرفض تحسين مكوّن يخالفهما. ثبّت قاعدة الفحص من اليوم الأول.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Why can a custom hook call `useState`, but a normal utility function cannot?',
          ar: 'لماذا يستطيع خطّاف مخصّص استدعاء `useState` بينما لا تستطيع دالة مساعدة عادية؟',
        },
        options: [
          {
            text: {
              en: 'A custom hook is only ever called during a component’s render, so React knows which component the state belongs to.',
              ar: 'لأن الخطّاف المخصّص لا يُستدعى إلا أثناء عرض مكوّن، فتعرف رياكت لأي مكوّن تعود الحالة.',
            },
            correct: true,
          },
          { text: { en: 'Because its name starts with "use", which React detects at runtime.', ar: 'لأن اسمه يبدأ بـ "use" وتكتشفه رياكت وقت التشغيل.' } },
          { text: { en: 'Because custom hooks are compiled differently.', ar: 'لأن الخطّافات المخصّصة تُصرَّف بطريقة مختلفة.' } },
          { text: { en: 'It cannot — only components may call `useState`.', ar: 'لا يستطيع — فالمكوّنات وحدها تستدعي `useState`.' } },
        ],
        explain: {
          en: 'The `use` prefix is a convention for humans and linters. What matters at runtime is that the call happens while React is rendering a component, so there is a hook list to read from.',
          ar: 'بادئة `use` عرف للبشر وأدوات الفحص. والمهم وقت التشغيل أن يحدث الاستدعاء أثناء عرض رياكت لمكوّن، فتكون هناك قائمة خطّافات تُقرأ منها.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Hooks are matched by call order, not by name.',
            'Top level only: no conditions, loops or nested functions.',
            'Put early returns after your hooks, never before.',
            'Let the ESLint plugin enforce it for you.',
          ],
          ar: [
            'تُطابَق الخطّافات بترتيب الاستدعاء لا بالاسم.',
            'المستوى الأعلى فقط: بلا شروط أو حلقات أو دوال متداخلة.',
            'ضع الإرجاع المبكر بعد الخطّافات لا قبلها.',
            'دع إضافة ESLint تفرض ذلك عنك.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/useeffect',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'An Effect is not a lifecycle callback. It is a way to **synchronise** your component with something outside React — a subscription, a timer, a browser API, a third-party widget. Read it as "keep this external thing in step with these values".',
          ar: 'التأثير ليس ردّ نداء لدورة الحياة، بل وسيلة **لمزامنة** مكوّنك مع شيء خارج رياكت — اشتراك أو مؤقّت أو واجهة متصفّح أو أداة خارجية. اقرأه هكذا: «أبقِ هذا الشيء الخارجي متوافقًا مع هذه القيم».',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        highlight: [2, 5, 6],
        code: `useEffect(() => {
  const connection = createConnection(roomId);   // set up
  connection.connect();

  return () => connection.disconnect();          // tear down
}, [roomId]);                                    // re-sync when roomId changes`,
      },
      { type: 'visual', name: 'hooks-timeline' },
      {
        type: 'heading',
        text: { en: 'The dependency array', ar: 'مصفوفة الاعتماديات' },
      },
      {
        type: 'table',
        head: { en: ['You write', 'React runs the effect'], ar: ['ما تكتبه', 'متى تشغّل رياكت التأثير'] },
        rows: [
          {
            en: ['`[]`', 'once after mount, cleanup on unmount'],
            ar: ['`[]`', 'مرة بعد التركيب، والتنظيف عند الإزالة'],
          },
          {
            en: ['`[a, b]`', 'after mount, then whenever `a` or `b` changes'],
            ar: ['`[a, b]`', 'بعد التركيب، ثم كلما تغيّرت `a` أو `b`'],
          },
          {
            en: ['nothing at all', 'after **every** render — almost always a mistake'],
            ar: ['بلا مصفوفة', 'بعد **كل** عرض — وهذا خطأ في الغالب'],
          },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Do not fight the linter', ar: 'لا تصارع أداة الفحص' },
        body: {
          en: 'If the lint rule wants a dependency you "know" is stable, the honest fix is to move the value inside the effect, wrap it properly, or use `useEffectEvent`. Silencing the rule is how stale-closure bugs are born.',
          ar: 'إذا طلبت قاعدة الفحص اعتمادية «تعرف» أنها ثابتة، فالحلّ الصادق نقل القيمة داخل التأثير أو تغليفها بشكل صحيح أو استخدام `useEffectEvent`. أما إسكات القاعدة فمن هناك تولد أخطاء الإغلاقات القديمة.',
        },
      },
      {
        type: 'heading',
        text: { en: 'Cleanup is not optional', ar: 'التنظيف ليس اختياريًا' },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// fetching with cancellation — the pattern to memorise
useEffect(() => {
  let cancelled = false;

  (async () => {
    const res = await fetch(\`/api/users/\${id}\`);
    const data = await res.json();
    if (!cancelled) setUser(data);   // ignore a response we no longer want
  })();

  return () => { cancelled = true; };
}, [id]);`,
        caption: {
          en: 'Without the flag, a slow request for user 1 can overwrite the already-rendered user 2.',
          ar: 'بلا هذه الراية، قد يستبدل طلب بطيء للمستخدم 1 المستخدمَ 2 المعروض بالفعل.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'In development, React 19 mounts every component twice on purpose. If an effect misbehaves under double-mounting — duplicate connections, doubled counters — it is missing cleanup, and that bug is real in production too.',
          ar: 'في بيئة التطوير تُركّب رياكت 19 كل مكوّن مرتين عن قصد. وإذا أساء تأثير التصرّف تحت التركيب المزدوج — اتصالات مكرّرة أو عدّادات مضاعفة — فهو ينقصه التنظيف، وذلك الخلل حقيقي في الإنتاج أيضًا.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'An effect with `[]` sets state, and the component re-renders forever. What happened?',
          ar: 'تأثير بمصفوفة `[]` يحدّث الحالة، فيُعاد عرض المكوّن بلا توقف. ماذا حدث؟',
        },
        options: [
          {
            text: {
              en: 'The dependency array is not really empty — an object or function created during render is in it, so it is new every time.',
              ar: 'المصفوفة ليست فارغة فعلًا — ففيها كائن أو دالة تُنشأ أثناء العرض، فتكون جديدة في كل مرة.',
            },
            correct: true,
          },
          { text: { en: '`useEffect` always loops when it sets state.', ar: '`useEffect` تدخل حلقة دائمًا عند تحديث الحالة.' } },
          { text: { en: 'The cleanup function is missing.', ar: 'دالة التنظيف مفقودة.' } },
          { text: { en: 'Strict Mode causes it and it disappears in production.', ar: 'يسبّبه الوضع الصارم ويختفي في الإنتاج.' } },
        ],
        explain: {
          en: 'A truly empty array runs once. An infinite loop means a dependency changes identity on every render — typically `{}`, `[]` or an inline function. Move it inside the effect or memoise it.',
          ar: 'المصفوفة الفارغة فعلًا تعمل مرة واحدة. والحلقة اللانهائية تعني أن اعتمادية تتغيّر هويتها في كل عرض — عادةً `{}` أو `[]` أو دالة داخلية. انقلها داخل التأثير أو خزّنها.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Effects synchronise with the outside world; they are not lifecycle hooks.',
            'Dependencies are every reactive value the effect reads.',
            'Return a cleanup for anything you started.',
            'Double-mounting in development exposes missing cleanup — fix the effect, not the mode.',
          ],
          ar: [
            'التأثيرات تُزامن مع العالم الخارجي، وليست خطّافات دورة حياة.',
            'الاعتماديات هي كل قيمة متفاعلة يقرأها التأثير.',
            'أعِد دالة تنظيف لكل ما بدأته.',
            'التركيب المزدوج في التطوير يكشف التنظيف الناقص — أصلح التأثير لا الوضع.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/you-might-not-need-an-effect',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Most Effects in a beginner codebase are not synchronising with anything external — they are reacting to a state change that could have been handled directly. Each one costs an extra render and a class of bugs.',
          ar: 'معظم التأثيرات في كود المبتدئين لا تُزامن شيئًا خارجيًا، بل تتفاعل مع تغيّر حالة كان يمكن التعامل معه مباشرة. وكلٌّ منها يكلّف عرضًا إضافيًا وفئة كاملة من الأخطاء.',
        },
      },
      {
        type: 'heading',
        text: { en: 'Case 1 — deriving data', ar: 'الحالة الأولى — اشتقاق البيانات' },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          code: `const [full, setFull] = useState('');

useEffect(() => {
  setFull(first + ' ' + last);
}, [first, last]);
// renders twice per change`,
        },
        good: {
          code: `const full = first + ' ' + last;
// no state, no effect,
// always correct`,
        },
      },
      {
        type: 'heading',
        text: { en: 'Case 2 — responding to an event', ar: 'الحالة الثانية — الاستجابة لحدث' },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          code: `useEffect(() => {
  if (submitted) {
    showToast('Saved');
    setSubmitted(false);
  }
}, [submitted]);`,
        },
        good: {
          code: `function handleSubmit() {
  save();
  showToast('Saved');
}`,
        },
        note: {
          en: 'If the logic belongs to "the user did X", it belongs in the handler for X — not in an effect watching a flag.',
          ar: 'إذا كان المنطق يخصّ «المستخدم فعل كذا»، فمكانه معالج ذلك الفعل — لا تأثيرٌ يراقب راية.',
        },
      },
      {
        type: 'heading',
        text: { en: 'Case 3 — resetting on a prop change', ar: 'الحالة الثالثة — إعادة الضبط عند تغيّر خاصية' },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// 🚫 an effect that clears state when userId changes
useEffect(() => { setDraft(''); }, [userId]);

// ✅ give the component a key — React resets it for you
<ProfileEditor key={userId} userId={userId} />`,
      },
      {
        type: 'table',
        head: { en: ['You want to…', 'Use'], ar: ['تريد أن…', 'استخدم'] },
        rows: [
          { en: ['Transform data for rendering', 'A plain calculation during render'], ar: ['تحوّل بيانات للعرض', 'حسابًا عاديًا أثناء العرض'] },
          { en: ['React to a user action', 'The event handler'], ar: ['تستجيب لفعل المستخدم', 'معالج الحدث'] },
          { en: ['Reset state when a prop changes', 'A `key`, or state derived from the prop'], ar: ['تعيد ضبط الحالة عند تغيّر خاصية', '`key`، أو حالة مشتقّة من الخاصية'] },
          { en: ['Share logic between components', 'A custom hook'], ar: ['تشارك منطقًا بين المكوّنات', 'خطّافًا مخصّصًا'] },
          { en: ['Talk to a non-React system', '**An Effect** — this is the real use case'], ar: ['تتحدث إلى نظام خارج رياكت', '**تأثيرًا** — وهذه هي الحالة الحقيقية'] },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Before writing an Effect, finish this sentence: "I am keeping ____ (something outside React) in sync with ____ (props or state)." If you cannot, you probably do not need one.',
          ar: 'قبل كتابة تأثير أكمل هذه الجملة: «أنا أُبقي ____ (شيئًا خارج رياكت) متزامنًا مع ____ (خصائص أو حالة)». إذا عجزت، فالأرجح أنك لا تحتاجه.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A component fetches a list, then an Effect filters it into a second state variable whenever the query changes. What is wrong?',
          ar: 'مكوّن يجلب قائمة، ثم يصفّيها تأثيرٌ إلى متغيّر حالة ثانٍ كلما تغيّر البحث. ما الخطأ؟',
        },
        options: [
          {
            text: {
              en: 'The filtered list is derived data — compute it during render instead of storing it.',
              ar: 'القائمة المصفّاة بيانات مشتقّة — احسبها أثناء العرض بدل تخزينها.',
            },
            correct: true,
          },
          { text: { en: 'The effect is missing a cleanup function.', ar: 'التأثير ينقصه دالة تنظيف.' } },
          { text: { en: 'The filter should run inside `useLayoutEffect`.', ar: 'يجب أن تعمل التصفية داخل `useLayoutEffect`.' } },
          { text: { en: 'Nothing — this is the recommended approach.', ar: 'لا شيء — فهذا النهج الموصى به.' } },
        ],
        explain: {
          en: 'Every keystroke triggers a render, then an effect, then another render — and the two lists can disagree for one frame. `const visible = items.filter(…)` removes the state, the effect and the flash.',
          ar: 'كل ضغطة تُطلق عرضًا ثم تأثيرًا ثم عرضًا آخر — وقد تتعارض القائمتان لإطار واحد. و`const visible = items.filter(…)` تُزيل الحالة والتأثير والوميض.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Effects are for external systems, not for reacting to your own state.',
            'Derived values belong in the render body.',
            'Event-driven logic belongs in event handlers.',
            'Use a `key` to reset a subtree instead of an effect.',
          ],
          ar: [
            'التأثيرات للأنظمة الخارجية لا للتفاعل مع حالتك أنت.',
            'القيم المشتقّة مكانها جسم العرض.',
            'المنطق المرتبط بالأحداث مكانه معالجات الأحداث.',
            'استخدم `key` لإعادة ضبط شجرة فرعية بدل تأثير.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/useref',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A ref is a box that survives re-renders but never causes one. Two uses: reaching a DOM node, and remembering a value that the screen does not display.',
          ar: 'المرجع صندوق يبقى عبر عمليات العرض ولا يتسبّب بأيٍّ منها. وله استخدامان: الوصول إلى عقدة DOM، وتذكّر قيمة لا تعرضها الشاشة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `function SearchBox() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>focus</button>
    </>
  );
}`,
      },
      {
        type: 'table',
        head: { en: ['', 'state', 'ref'], ar: ['', 'الحالة', 'المرجع'] },
        rows: [
          { en: ['Triggers a re-render', 'yes', 'no'], ar: ['تُسبّب إعادة عرض', 'نعم', 'لا'] },
          { en: ['Survives re-renders', 'yes', 'yes'], ar: ['تبقى عبر العروض', 'نعم', 'نعم'] },
          { en: ['Readable during render', 'yes', '**no** — do not read `.current` while rendering'], ar: ['تُقرأ أثناء العرض', 'نعم', '**لا** — لا تقرأ `.current` أثناء العرض'] },
          { en: ['Use it for', 'anything shown on screen', 'timers, previous values, DOM nodes'], ar: ['استخدمها لـ', 'كل ما يظهر على الشاشة', 'المؤقّتات والقيم السابقة وعقد DOM'] },
        ],
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// keeping a timer id without re-rendering
const timer = useRef(null);

function start() {
  timer.current = setInterval(tick, 1000);
}
function stop() {
  clearInterval(timer.current);
  timer.current = null;
}`,
      },
      {
        type: 'callout',
        tone: 'warn',
        body: {
          en: 'If changing a value should change what the user sees, it is state — not a ref. Writing to `.current` renders nothing, so the screen silently falls behind.',
          ar: 'إذا كان تغيير قيمة يجب أن يغيّر ما يراه المستخدم، فهي حالة لا مرجع. فالكتابة في `.current` لا تعرض شيئًا، فتتخلّف الشاشة بصمت.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'In React 19 a function component can take `ref` as a normal prop — `forwardRef` is no longer needed for new code, though you will still meet it in existing codebases.',
          ar: 'في رياكت 19 يمكن للمكوّن الدالّي استقبال `ref` كخاصية عادية — فلم تعد `forwardRef` ضرورية للكود الجديد، وإن كنت ستصادفها في المشاريع القائمة.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You store a counter in a ref and render `{countRef.current}`. Clicking increments it but the screen never changes. Why?',
          ar: 'تخزّن عدّادًا في مرجع وتعرض `{countRef.current}`. النقر يزيده لكن الشاشة لا تتغيّر. لماذا؟',
        },
        options: [
          {
            text: { en: 'Mutating a ref does not schedule a render, so React never repaints.', ar: 'تعديل المرجع لا يجدول عرضًا، فلا تعيد رياكت الرسم أبدًا.' },
            correct: true,
          },
          { text: { en: 'Refs are read-only.', ar: 'المراجع للقراءة فقط.' } },
          { text: { en: 'You must call `useRef` inside an effect.', ar: 'عليك استدعاء `useRef` داخل تأثير.' } },
          { text: { en: 'Numbers cannot be stored in refs.', ar: 'لا يمكن تخزين الأرقام في المراجع.' } },
        ],
        explain: {
          en: 'That is exactly what a ref is for — changing without rendering. Anything the user must see belongs in state.',
          ar: 'وهذا بالضبط هدف المرجع — التغيّر دون عرض. وكل ما يجب أن يراه المستخدم مكانه الحالة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Refs persist across renders and never trigger one.',
            'Use them for DOM access, timer ids and previous values.',
            'Do not read or write `.current` during rendering.',
            'If the UI depends on it, use state instead.',
          ],
          ar: [
            'تبقى المراجع عبر العروض ولا تُطلق أيًّا منها.',
            'استخدمها للوصول إلى DOM ومعرّفات المؤقّتات والقيم السابقة.',
            'لا تقرأ `.current` ولا تكتب فيها أثناء العرض.',
            'إذا اعتمدت الواجهة عليها فاستخدم الحالة.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/usecontext',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Context lets a value skip the middle of the tree. A provider high up publishes it; any descendant reads it directly, no matter how deep, without a single intermediate prop.',
          ar: 'يتيح السياق للقيمة تخطّي وسط الشجرة. فالمزوّد في الأعلى ينشرها، وأي سليل يقرأها مباشرة مهما عمُق، دون خاصية وسيطة واحدة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'theme.tsx',
        code: `const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext value={value}>   {/* React 19: no .Provider needed */}
      <Layout />
    </ThemeContext>
  );
}

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme}</button>;
}`,
      },
      {
        type: 'list',
        items: {
          en: [
            'A component reads the value from the **nearest** provider above it — providers can be nested and overridden.',
            'With no provider at all, the default passed to `createContext` is used.',
            'When the provider value changes, **every** consumer re-renders. That is the cost.',
          ],
          ar: [
            'يقرأ المكوّن القيمة من **أقرب** مزوّد فوقه — ويمكن تداخل المزوّدين وتجاوزهم.',
            'وبلا أي مزوّد تُستخدم القيمة الافتراضية المُمرَّرة لـ `createContext`.',
            'وعند تغيّر قيمة المزوّد يُعاد عرض **كل** المستهلكين. وهذه هي التكلفة.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Context is injection, not a store', ar: 'السياق حقن لا مخزن' },
        body: {
          en: 'It is perfect for values that rarely change: theme, locale, the current user, a service instance. For values that change many times a second — a mouse position, a text field — every consumer re-renders and you need a real store (phase 10).',
          ar: 'هو مثالي للقيم نادرة التغيّر: المظهر واللغة والمستخدم الحالي ونسخة خدمة. أما ما يتغيّر عدة مرات في الثانية — موضع الفأرة أو حقل نصّي — فيُعاد عرض كل المستهلكين وتحتاج مخزنًا حقيقيًا (المرحلة العاشرة).',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// 🚫 a new object every render → every consumer re-renders every time
<ThemeContext value={{ theme, setTheme }}>

// ✅ stable identity
const value = useMemo(() => ({ theme, setTheme }), [theme]);
<ThemeContext value={value}>`,
      },
      {
        type: 'text',
        text: {
          en: 'The usual pattern is to hide the context behind a custom hook that throws a helpful error when it is used outside its provider — you will see this in almost every professional codebase.',
          ar: 'النمط المعتاد إخفاء السياق خلف خطّاف مخصّص يرمي خطأً واضحًا عند استخدامه خارج مزوّده — وستراه في كل مشروع احترافي تقريبًا.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}`,
      },
      {
        type: 'quiz',
        question: {
          en: 'Your whole app re-renders on every keystroke in a search box whose value sits in context. What is the fix?',
          ar: 'يُعاد عرض تطبيقك كله عند كل ضغطة في حقل بحث قيمته في السياق. ما الحل؟',
        },
        options: [
          {
            text: {
              en: 'Keep fast-changing values out of context — colocate them, or move them to a store with selectors.',
              ar: 'أبقِ القيم سريعة التغيّر خارج السياق — وطّنها محليًا أو انقلها إلى مخزن يدعم الانتقاء.',
            },
            correct: true,
          },
          { text: { en: 'Wrap every consumer in `React.memo`.', ar: 'غلّف كل مستهلك بـ `React.memo`.' } },
          { text: { en: 'Move the provider lower in the tree only.', ar: 'انقل المزوّد أسفل الشجرة فقط.' } },
          { text: { en: 'Use two providers instead of one.', ar: 'استخدم مزوّدين بدل واحد.' } },
        ],
        explain: {
          en: '`React.memo` does not help: a context change re-renders consumers regardless. Splitting contexts helps a little, but a value that changes per keystroke should not be broadcast to the whole tree at all.',
          ar: 'لا يفيد `React.memo` هنا: فتغيّر السياق يُعيد عرض المستهلكين على أي حال. وتقسيم السياقات يساعد قليلًا، لكن قيمة تتغيّر مع كل ضغطة لا يجب بثّها للشجرة كلها أصلًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Context removes prop drilling; it does not manage state.',
            'Consumers read the nearest provider above them.',
            'Memoise object values, or every consumer re-renders needlessly.',
            'Wrap each context in a custom hook with a clear error.',
          ],
          ar: [
            'يُنهي السياق تمرير الخصائص المتسلسل، ولا يدير الحالة.',
            'يقرأ المستهلكون أقرب مزوّد فوقهم.',
            'خزّن قيم الكائنات، وإلا أُعيد عرض كل مستهلك بلا داعٍ.',
            'غلّف كل سياق بخطّاف مخصّص برسالة خطأ واضحة.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/usereducer',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'When several pieces of state change together, `useState` scatters the rules across your handlers. A reducer collects them in one function: given the current state and an action, what is the next state?',
          ar: 'حين تتغيّر عدة أجزاء من الحالة معًا، تُبعثر `useState` القواعد بين معالجاتك. أما المُختزِل فيجمعها في دالة واحدة: بمعرفة الحالة الحالية والإجراء، ما الحالة التالية؟',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `function reducer(state, action) {
  switch (action.type) {
    case 'submitting':
      return { ...state, status: 'loading', error: null };
    case 'success':
      return { status: 'done', data: action.data, error: null };
    case 'failure':
      return { ...state, status: 'idle', error: action.error };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { status: 'idle', data: null, error: null });

dispatch({ type: 'submitting' });`,
      },
      {
        type: 'list',
        items: {
          en: [
            'A reducer is a **pure function** — no fetching, no timers, no randomness. Same inputs, same output.',
            'An action describes **what happened**, not what to set: `{ type: "removed", id }`, not `{ type: "setItems", items }`.',
            'Reducers are trivial to unit test: call the function, assert the result. No rendering needed.',
          ],
          ar: [
            'المُختزِل **دالة نقية** — بلا جلب ولا مؤقّتات ولا عشوائية. المدخلات نفسها تعطي المخرجات نفسها.',
            'الإجراء يصف **ما حدث** لا ما يُضبط: `{ type: "removed", id }` لا `{ type: "setItems", items }`.',
            'اختبار المُختزِلات سهل جدًا: استدعِ الدالة وتحقّق من النتيجة، بلا حاجة لعرض.',
          ],
        },
      },
      {
        type: 'table',
        head: { en: ['Reach for', 'When'], ar: ['استخدم', 'متى'] },
        rows: [
          { en: ['`useState`', 'one or two independent values'], ar: ['`useState`', 'قيمة أو قيمتان مستقلّتان'] },
          { en: ['`useReducer`', 'values that must change together, or many actions'], ar: ['`useReducer`', 'قيم تتغيّر معًا، أو إجراءات كثيرة'] },
          { en: ['A store (phase 10)', 'the same state needed far apart in the tree'], ar: ['مخزن (المرحلة العاشرة)', 'الحالة نفسها مطلوبة في أماكن متباعدة'] },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Reducer plus context is a complete "global state" solution for small apps — and it is exactly how Redux works underneath, minus the package.',
          ar: 'المُختزِل مع السياق حلٌّ كامل لـ«الحالة العامة» في التطبيقات الصغيرة — وهو تحديدًا ما تفعله Redux في الداخل، بلا حزمة.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Which of these belongs **outside** a reducer?',
          ar: 'أيٌّ من هذه مكانه **خارج** المُختزِل؟',
        },
        options: [
          {
            text: { en: 'The `fetch` call that loads the data.', ar: 'استدعاء `fetch` الذي يحمّل البيانات.' },
            correct: true,
          },
          { text: { en: 'Deciding the next `status` value.', ar: 'تحديد قيمة `status` التالية.' } },
          { text: { en: 'Removing an item from the list by id.', ar: 'حذف عنصر من القائمة بالمعرّف.' } },
          { text: { en: 'Clearing the error when a new attempt starts.', ar: 'مسح الخطأ عند بدء محاولة جديدة.' } },
        ],
        explain: {
          en: 'Reducers must stay pure so React can call them safely — including twice in development. Side effects live in the event handler or an effect, which then dispatches the result.',
          ar: 'يجب أن تبقى المُختزِلات نقيّة لتستدعيها رياكت بأمان — بما في ذلك مرتين في التطوير. أما التأثيرات الجانبية فمكانها معالج الحدث أو تأثير، ثم يُرسِل النتيجة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'A reducer centralises "how state may change" in one pure function.',
            'Actions name events, not setters.',
            'Great for multi-field forms, wizards and request status.',
            'Pure means testable — and safe under Strict Mode.',
          ],
          ar: [
            'يجمع المُختزِل «كيف يجوز أن تتغيّر الحالة» في دالة نقية واحدة.',
            'الإجراءات تسمّي الأحداث لا دوال الضبط.',
            'ممتاز للنماذج متعدّدة الحقول والمعالجات المتدرّجة وحالات الطلبات.',
            'النقاء يعني قابلية الاختبار — والأمان تحت الوضع الصارم.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/custom-hooks',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A custom hook is a function whose name starts with `use` and which calls other hooks. That is all. It lets you share **stateful logic** between components without sharing state itself — each caller gets its own copy.',
          ar: 'الخطّاف المخصّص دالة يبدأ اسمها بـ `use` وتستدعي خطّافات أخرى. هذا كل شيء. يتيح لك مشاركة **المنطق ذي الحالة** بين المكوّنات دون مشاركة الحالة نفسها — فكل مستدعٍ يحصل على نسخته.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'useDebounced.ts',
        code: `export function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// in a component
const query = useDebounced(input, 400);`,
      },
      {
        type: 'playground',
        caption: {
          en: 'Two independent toggles from one hook — each panel keeps its own state.',
          ar: 'مبدّلان مستقلّان من خطّاف واحد — كل لوحة تحتفظ بحالتها.',
        },
        code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return [on, () => setOn((v) => !v)];
}

function Panel({ title }) {
  const [open, toggle] = useToggle();
  return (
    <div style={{ border: '1px solid #888', borderRadius: 10, padding: 10, marginBottom: 8 }}>
      <button onClick={toggle}>{open ? '▾' : '▸'} {title}</button>
      {open && <p style={{ margin: '8px 0 0', fontSize: 14 }}>Its own state, from shared logic.</p>}
    </div>
  );
}

render(<div><Panel title="First" /><Panel title="Second" /></div>);`,
      },
      {
        type: 'list',
        items: {
          en: [
            'Name it after **what it does**, not what it uses: `useOnlineStatus`, not `useEffectAndState`.',
            'Return whatever shape reads best — a value, a tuple like `useState`, or an object for three or more things.',
            'Extract when logic is duplicated **or** when a component has grown hard to read. Do not pre-extract.',
            'A hook is not a service: calling it twice gives two independent states, not one shared one.',
          ],
          ar: [
            'سمِّه بما **يفعله** لا بما يستخدمه: `useOnlineStatus` لا `useEffectAndState`.',
            'أعِد الشكل الأوضح للقراءة — قيمة أو ثنائية مثل `useState` أو كائنًا لثلاثة عناصر فأكثر.',
            'استخرجه عند تكرار المنطق **أو** عندما يصعب قراءة المكوّن. ولا تستخرج مسبقًا.',
            'الخطّاف ليس خدمة: استدعاؤه مرتين يعطي حالتين مستقلّتين لا واحدة مشتركة.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Custom hooks are where Effects should end up. Instead of three components each running a subscription, write `useOnlineStatus()` once and the messy part exists in exactly one file.',
          ar: 'الخطّافات المخصّصة هي المكان الذي يجب أن تنتهي إليه التأثيرات. فبدل ثلاثة مكوّنات كلٌّ منها يشغّل اشتراكًا، اكتب `useOnlineStatus()` مرة واحدة فيوجد الجزء الفوضوي في ملف واحد فقط.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Two components both call `useCart()`. Do they share the same cart?',
          ar: 'مكوّنان يستدعيان `useCart()`. هل يتشاركان العربة نفسها؟',
        },
        options: [
          {
            text: {
              en: 'No — each call creates its own state. Sharing requires context or a store.',
              ar: 'لا — فكل استدعاء ينشئ حالته الخاصة. والمشاركة تحتاج سياقًا أو مخزنًا.',
            },
            correct: true,
          },
          { text: { en: 'Yes, hooks are singletons.', ar: 'نعم، فالخطّافات مفردة.' } },
          { text: { en: 'Yes, if the hook is exported from the same file.', ar: 'نعم، إذا صُدّر الخطّاف من الملف نفسه.' } },
          { text: { en: 'Only in development.', ar: 'في بيئة التطوير فقط.' } },
        ],
        explain: {
          en: 'Hooks share **logic**, never state. This surprises people once, and then the rule sticks forever: to share the value, lift it into a provider or a store.',
          ar: 'الخطّافات تشارك **المنطق** لا الحالة أبدًا. تفاجئ هذه الحقيقة الناس مرة واحدة ثم تترسّخ القاعدة: لمشاركة القيمة ارفعها إلى مزوّد أو مخزن.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Any `use`-prefixed function that calls hooks is a custom hook.',
            'They share logic; every call has independent state.',
            'Name them by behaviour and keep them small.',
            'Move Effects into hooks to keep components readable.',
          ],
          ar: [
            'أي دالة تبدأ بـ `use` وتستدعي خطّافات هي خطّاف مخصّص.',
            'تشارك المنطق، ولكل استدعاء حالة مستقلّة.',
            'سمِّها بحسب السلوك وأبقِها صغيرة.',
            'انقل التأثيرات إلى خطّافات لتبقى المكوّنات مقروءة.',
          ],
        },
      },
    ],
  },

  {
    id: 'hooks-in-depth/usememo-usecallback',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'These two hooks cache things between renders: `useMemo` caches a **value**, `useCallback` caches a **function**. In 2026 you will reach for them far less often than tutorials from 2021 suggest.',
          ar: 'يخزّن هذان الخطّافان أشياء بين العروض: `useMemo` يخزّن **قيمة** و `useCallback` يخزّن **دالة**. وفي 2026 ستحتاجهما أقل بكثير مما توحي به دروس 2021.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// recomputed only when items or query change
const results = useMemo(
  () => items.filter((i) => i.name.includes(query)),
  [items, query],
);

// the same function identity across renders
const handleSelect = useCallback((id) => setSelected(id), []);`,
      },
      {
        type: 'heading',
        text: { en: 'The three legitimate reasons', ar: 'الأسباب الثلاثة المشروعة' },
      },
      {
        type: 'list',
        ordered: true,
        items: {
          en: [
            'The calculation is genuinely expensive and you **measured** it — sorting thousands of rows, not filtering twenty.',
            'The value is a dependency of an Effect, and a new identity each render would re-run it in a loop.',
            'You are passing it to a `React.memo` child, whose whole point is reference equality.',
          ],
          ar: [
            'الحساب مكلف فعلًا وقد **قِسته** — ترتيب آلاف الصفوف لا تصفية عشرين.',
            'القيمة اعتمادية لتأثير، وهوية جديدة في كل عرض ستُعيد تشغيله في حلقة.',
            'تمرّرها إلى ابن مغلّف بـ `React.memo`، وهدفه كله تساوي المراجع.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'note',
        title: { en: 'The React Compiler changed the maths', ar: 'مُصرِّف رياكت غيّر الحسبة' },
        body: {
          en: 'React Compiler 1.0 memoises components and values automatically at build time. On a compiled codebase, most manual `useMemo` and `useCallback` calls are noise the compiler would have added for you — you keep only the ones covering the three cases above. Phase 12 covers this properly.',
          ar: 'يخزّن مُصرِّف رياكت 1.0 المكوّنات والقيم تلقائيًا وقت البناء. وفي مشروع مُصرَّف تصبح معظم استدعاءات `useMemo` و `useCallback` اليدوية ضجيجًا كان المُصرِّف سيضيفه عنك — فتبقي فقط ما يغطّي الحالات الثلاث أعلاه. والمرحلة الثانية عشرة تشرح هذا بالتفصيل.',
        },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          label: { en: 'Cost without benefit', ar: 'تكلفة بلا فائدة' },
          code: `const total = useMemo(
  () => a + b,
  [a, b],
);
// the memo costs more than
// the addition it caches`,
        },
        good: {
          label: { en: 'Just calculate it', ar: 'احسبها فحسب' },
          code: `const total = a + b;`,
        },
        note: {
          en: 'Every memo has a price: an entry in the hook list, a dependency comparison, and one more thing that can go stale.',
          ar: 'لكل تخزين ثمن: خانة في قائمة الخطّافات، ومقارنة اعتماديات، وشيء إضافي يمكن أن يتقادم.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Wrapping a child in `React.memo` did not stop it re-rendering. Why?',
          ar: 'تغليف ابن بـ `React.memo` لم يمنع إعادة عرضه. لماذا؟',
        },
        options: [
          {
            text: {
              en: 'It receives a prop whose identity changes every render — an inline object, array or function.',
              ar: 'لأنه يستقبل خاصية تتغيّر هويتها في كل عرض — كائنًا أو مصفوفة أو دالة داخل الوسم.',
            },
            correct: true,
          },
          { text: { en: '`React.memo` only works on class components.', ar: '`React.memo` تعمل مع مكوّنات الصنف فقط.' } },
          { text: { en: 'The parent must also be memoised.', ar: 'يجب تغليف الأب أيضًا.' } },
          { text: { en: '`React.memo` was removed in React 19.', ar: 'أُزيلت `React.memo` في رياكت 19.' } },
        ],
        explain: {
          en: '`React.memo` compares props by reference. `style={{ margin: 8 }}` or `onClick={() => …}` creates a new value every render, so the comparison always fails. Fix the prop identity — or let the compiler handle all of it.',
          ar: 'تقارن `React.memo` الخصائص بالمرجع. و`style={{ margin: 8 }}` أو `onClick={() => …}` تنشئ قيمة جديدة في كل عرض فتفشل المقارنة دائمًا. أصلح هوية الخاصية — أو دع المُصرِّف يتكفّل بكل ذلك.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            '`useMemo` caches a value, `useCallback` caches a function.',
            'Memoise for measured cost, effect dependencies, or `React.memo` children.',
            'Memoising cheap work makes the app slower, not faster.',
            'The React Compiler now does most of this automatically.',
          ],
          ar: [
            '`useMemo` تخزّن قيمة و `useCallback` تخزّن دالة.',
            'خزّن لتكلفة مقيسة أو لاعتماديات تأثير أو لأبناء `React.memo`.',
            'تخزين العمل الرخيص يبطئ التطبيق لا يسرّعه.',
            'مُصرِّف رياكت يقوم بمعظم هذا تلقائيًا الآن.',
          ],
        },
      },
    ],
  },
]

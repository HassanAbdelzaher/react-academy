import type { ExamQuestion } from './types'

/**
 * Advanced exam bank — phases 10-12 (state management at scale, forms and
 * validation, modern React 19+ features).
 *
 * Weighted by lesson count — React 19 features 45, state management 30, forms
 * 25 — and every question is self-contained: a sitting draws at random, so
 * nothing may refer to the question before it.
 */
export const advancedBank: ExamQuestion[] = [
  // --------------------------------------------------------------- phase 10
  {
    id: 'a-sm-01',
    phase: 'state-management',
    question: {
      en: 'Which question shrinks most "global state" problems before you pick a library?',
      ar: 'أي سؤال يُقلّص معظم مشاكل «الحالة العامة» قبل أن تختار مكتبة؟',
    },
    options: [
      { text: { en: 'Is this server data I am caching, or state this client owns?', ar: 'هل هذه بيانات خادم أخزّنها، أم حالة يملكها هذا العميل؟' }, correct: true },
      { text: { en: 'How many components need it?', ar: 'كم مكوّنًا يحتاجها؟' } },
      { text: { en: 'How large is the object?', ar: 'ما حجم الكائن؟' } },
      { text: { en: 'Does it need to persist?', ar: 'هل تحتاج إلى الحفظ؟' } },
    ],
    explain: {
      en: 'Most of what feels like global state is a cached copy of the server. Move that to a query cache and what remains is small enough for a tiny store.',
      ar: 'معظم ما يبدو حالة عامة هو نسخة مخزّنة من الخادم. انقلها إلى ذاكرة استعلام مؤقتة، فيبقى القليل الذي يكفيه مخزن صغير جدًا.',
    },
  },
  {
    id: 'a-sm-02',
    phase: 'state-management',
    question: {
      en: 'Why is Context described as dependency injection rather than a store?',
      ar: 'لماذا يُوصف Context بأنه حقن اعتماديات لا مخزن؟',
    },
    options: [
      { text: { en: 'It distributes a value but has no selective subscription.', ar: 'لأنه يوزّع قيمة لكن بلا اشتراك انتقائي.' }, correct: true },
      { text: { en: 'It cannot hold objects.', ar: 'لأنه لا يستطيع حمل كائنات.' } },
      { text: { en: 'It is limited to one provider per app.', ar: 'لأنه محدود بمزوّد واحد لكل تطبيق.' } },
      { text: { en: 'Its values are read-only.', ar: 'لأن قيمه للقراءة فقط.' } },
    ],
    explain: {
      en: 'Every consumer re-renders when the value changes, even one reading a field that did not. A store lets a component subscribe to just the slice it uses.',
      ar: 'يُعاد عرض كل مستهلك عند تغيّر القيمة، حتى من يقرأ حقلًا لم يتغيّر. أما المخزن فيتيح للمكوّن الاشتراك في الجزء الذي يستخدمه فقط.',
    },
  },
  {
    id: 'a-sm-03',
    phase: 'state-management',
    question: {
      en: 'What does a Zustand selector like `useStore((s) => s.cartCount)` achieve?',
      ar: 'ماذا يحقّق مُنتقٍ في Zustand مثل `useStore((s) => s.cartCount)`؟',
    },
    options: [
      { text: { en: 'The component re-renders only when that slice changes.', ar: 'أن يُعاد عرض المكوّن فقط عند تغيّر ذلك الجزء.' }, correct: true },
      { text: { en: 'It makes the read synchronous.', ar: 'أن تصبح القراءة متزامنة.' } },
      { text: { en: 'It copies the store into local state.', ar: 'أن يُنسخ المخزن إلى حالة محلية.' } },
      { text: { en: 'It prevents other components writing to the store.', ar: 'أن يمنع المكوّنات الأخرى من الكتابة في المخزن.' } },
    ],
    explain: {
      en: 'Subscribing to a slice instead of the whole store is the entire performance story. `useStore((s) => s)` gives back the Context problem you were escaping.',
      ar: 'الاشتراك في جزء بدل المخزن كله هو قصّة الأداء كلها. أما `useStore((s) => s)` فتُعيد إليك مشكلة Context التي كنت تهرب منها.',
    },
  },
  {
    id: 'a-sm-04',
    phase: 'state-management',
    question: {
      en: 'A Zustand selector returns `{ a: s.a, b: s.b }`. Why might the component re-render constantly?',
      ar: 'مُنتقٍ في Zustand يُعيد `{ a: s.a, b: s.b }`. لماذا قد يُعاد عرض المكوّن باستمرار؟',
    },
    options: [
      { text: { en: 'A new object each call is never reference-equal to the last.', ar: 'لأن كائنًا جديدًا في كل استدعاء لا يساوي السابق مرجعيًا أبدًا.' }, correct: true },
      { text: { en: 'Selectors cannot return objects.', ar: 'لأن المُنتقيات لا تستطيع إعادة كائنات.' } },
      { text: { en: 'The store is not memoised.', ar: 'لأن المخزن غير مخزّن.' } },
      { text: { en: 'Two fields exceed the subscription limit.', ar: 'لأن حقلين يتجاوزان حدّ الاشتراك.' } },
    ],
    explain: {
      en: 'Either select each field with its own hook call, or pass a shallow comparison so the store compares the fields rather than the wrapper.',
      ar: 'إما أن تنتقي كل حقل باستدعاء خطّاف مستقل، أو تمرّر مقارنة سطحية ليقارن المخزن الحقول بدل الغلاف.',
    },
  },
  {
    id: 'a-sm-05',
    phase: 'state-management',
    question: {
      en: 'What is the defining idea of Jotai?',
      ar: 'ما الفكرة المميّزة في Jotai؟',
    },
    options: [
      { text: { en: 'Many small atoms composed bottom-up, with derived atoms as first-class.', ar: 'ذرّات صغيرة كثيرة تُركَّب من الأسفل للأعلى، والذرّات المشتقّة أصيلة فيها.' }, correct: true },
      { text: { en: 'One store with reducers and actions.', ar: 'مخزن واحد بمُختزِلات وإجراءات.' } },
      { text: { en: 'Automatic server synchronisation.', ar: 'مزامنة تلقائية مع الخادم.' } },
      { text: { en: 'A required provider per component.', ar: 'مزوّد إلزامي لكل مكوّن.' } },
    ],
    explain: {
      en: 'An atom feels like a `useState` that can be shared. Zustand starts from one store you select out of; Jotai starts from pieces you compose together.',
      ar: 'تبدو الذرّة كـ `useState` قابلة للمشاركة. فـ Zustand يبدأ من مخزن واحد تنتقي منه، أما Jotai فيبدأ من قطع تُركّبها معًا.',
    },
  },
  {
    id: 'a-sm-06',
    phase: 'state-management',
    question: {
      en: 'What does Redux Toolkit\'s Immer integration let you write inside a reducer?',
      ar: 'ماذا يتيح لك تكامل Immer في Redux Toolkit كتابته داخل المُختزِل؟',
    },
    options: [
      { text: { en: '`state.items.push(item)` — mutating a draft that produces a new state.', ar: '`state.items.push(item)` — تعديل مسوّدة تُنتج حالة جديدة.' }, correct: true },
      { text: { en: 'Direct mutation of the real store, permanently.', ar: 'تعديلًا مباشرًا ودائمًا للمخزن الحقيقي.' } },
      { text: { en: 'Asynchronous fetches inside the reducer.', ar: 'عمليات جلب غير متزامنة داخل المُختزِل.' } },
      { text: { en: 'Nothing — RTK forbids mutation syntax.', ar: 'لا شيء — فـ RTK يمنع صياغة التعديل.' } },
    ],
    explain: {
      en: 'You are writing to a proxy draft; Immer produces the immutable next state from your changes. This only applies inside RTK reducers, not in React state.',
      ar: 'أنت تكتب إلى مسوّدة وسيطة، وينتج Immer الحالة التالية غير القابلة للتعديل من تغييراتك. وهذا داخل مُختزِلات RTK فقط لا في حالة رياكت.',
    },
  },
  {
    id: 'a-sm-07',
    phase: 'state-management',
    question: {
      en: 'Which belongs in a client store rather than a server cache?',
      ar: 'أيٌّ ينتمي إلى مخزن العميل لا إلى ذاكرة الخادم المؤقتة؟',
    },
    options: [
      { text: { en: 'Which items are selected in a bulk-edit toolbar.', ar: 'أي عناصر محدّدة في شريط التحرير الجماعي.' }, correct: true },
      { text: { en: 'The list of products.', ar: 'قائمة المنتجات.' } },
      { text: { en: 'The signed-in user\'s profile from the API.', ar: 'ملف المستخدم المسجَّل من الواجهة البرمجية.' } },
      { text: { en: 'A page of search results.', ar: 'صفحة من نتائج البحث.' } },
    ],
    explain: {
      en: 'Selection exists only in this tab and cannot go stale. The other three are copies of server data with a lifetime you do not control.',
      ar: 'التحديد موجود في هذا التبويب فقط ولا يمكن أن يتقادم. أما الثلاثة الأخرى فنسخ من بيانات الخادم بعمر لا تتحكّم فيه.',
    },
  },
  {
    id: 'a-sm-08',
    phase: 'state-management',
    question: {
      en: 'What is the cost of putting a frequently-changing value in a high-level Context?',
      ar: 'ما تكلفة وضع قيمة كثيرة التغيّر في Context عالي المستوى؟',
    },
    options: [
      { text: { en: 'Every consumer in the subtree re-renders on each change.', ar: 'أن يُعاد عرض كل مستهلك في الشجرة الفرعية عند كل تغيير.' }, correct: true },
      { text: { en: 'The value is throttled automatically.', ar: 'أن تُخنق القيمة تلقائيًا.' } },
      { text: { en: 'React drops intermediate updates.', ar: 'أن تُسقط رياكت التحديثات الوسيطة.' } },
      { text: { en: 'Nothing measurable.', ar: 'لا شيء قابل للقياس.' } },
    ],
    explain: {
      en: 'Splitting rarely-changing values (theme, user) from fast-changing ones (mouse position, form draft) into separate contexts is the usual fix.',
      ar: 'الحل المعتاد هو فصل القيم نادرة التغيّر (المظهر والمستخدم) عن سريعة التغيّر (موضع المؤشّر ومسوّدة النموذج) في سياقات منفصلة.',
    },
  },
  {
    id: 'a-sm-09',
    phase: 'state-management',
    question: {
      en: 'What does RTK Query add on top of Redux Toolkit?',
      ar: 'ماذا يضيف RTK Query فوق Redux Toolkit؟',
    },
    options: [
      { text: { en: 'Server-cache handling — fetching, caching, invalidation and tags.', ar: 'إدارة ذاكرة الخادم — الجلب والتخزين والإبطال والوسوم.' }, correct: true },
      { text: { en: 'A router.', ar: 'موجّهًا.' } },
      { text: { en: 'A styling system.', ar: 'نظام تنسيق.' } },
      { text: { en: 'TypeScript support.', ar: 'دعم تايب سكربت.' } },
    ],
    explain: {
      en: 'It plays the role TanStack Query plays elsewhere. If you already run RTK, reaching for a second data library is usually duplication.',
      ar: 'يؤدّي الدور نفسه الذي تؤدّيه TanStack Query في مكان آخر. فإن كنت تستخدم RTK أصلًا، فاللجوء لمكتبة بيانات ثانية تكرار في الغالب.',
    },
  },
  {
    id: 'a-sm-10',
    phase: 'state-management',
    question: {
      en: 'Why is a module-level `let` a poor substitute for a store?',
      ar: 'لماذا يُعدّ `let` على مستوى الوحدة بديلًا رديئًا للمخزن؟',
    },
    options: [
      { text: { en: 'React never learns it changed, so nothing re-renders.', ar: 'لأن رياكت لا تعلم بتغيّره أبدًا فلا يُعاد عرض شيء.' }, correct: true },
      { text: { en: 'Modules cannot hold mutable values.', ar: 'لأن الوحدات لا تحمل قيمًا قابلة للتعديل.' } },
      { text: { en: 'It is garbage-collected between renders.', ar: 'لأنه يُجمع كنفاية بين عمليات العرض.' } },
      { text: { en: 'It breaks TypeScript inference.', ar: 'لأنه يكسر استنتاج تايب سكربت.' } },
    ],
    explain: {
      en: 'A store is a value plus a subscription mechanism. Without the second half React has no way to know it should render again.',
      ar: 'المخزن قيمة مع آلية اشتراك. وبدون النصف الثاني لا سبيل لرياكت لمعرفة أنها يجب أن تعرض من جديد.',
    },
  },
  {
    id: 'a-sm-11',
    phase: 'state-management',
    question: {
      en: 'Which React API do external stores use to subscribe safely?',
      ar: 'أي واجهة في رياكت تستخدمها المخازن الخارجية للاشتراك بأمان؟',
    },
    options: [
      { text: { en: '`useSyncExternalStore`', ar: '`useSyncExternalStore`' }, correct: true },
      { text: { en: '`useEffect` with a subscription', ar: '`useEffect` مع اشتراك' } },
      { text: { en: '`useMemo`', ar: '`useMemo`' } },
      { text: { en: '`useImperativeHandle`', ar: '`useImperativeHandle`' } },
    ],
    explain: {
      en: 'It exists to avoid tearing — two components in one render reading different versions of the same external value while React is rendering concurrently.',
      ar: 'وُجدت لتجنّب التمزّق — أن يقرأ مكوّنان في عرض واحد نسختين مختلفتين من القيمة الخارجية نفسها أثناء العرض المتزامن.',
    },
  },
  {
    id: 'a-sm-12',
    phase: 'state-management',
    question: {
      en: 'What is the strongest argument for keeping state local until proven otherwise?',
      ar: 'ما أقوى حجّة لإبقاء الحالة محلية حتى يثبت العكس؟',
    },
    options: [
      { text: { en: 'Local state has the smallest render blast radius and no coordination cost.', ar: 'أن الحالة المحلية أصغر نطاق إعادة عرض وبلا تكلفة تنسيق.' }, correct: true },
      { text: { en: 'Global stores are slow.', ar: 'أن المخازن العامة بطيئة.' } },
      { text: { en: 'React forbids more than one store.', ar: 'أن رياكت تمنع أكثر من مخزن واحد.' } },
      { text: { en: 'Local state persists automatically.', ar: 'أن الحالة المحلية تُحفظ تلقائيًا.' } },
    ],
    explain: {
      en: 'Lifting state is cheap to do later and expensive to undo. Global by default turns every small change into a question about who else is listening.',
      ar: 'رفع الحالة رخيص لاحقًا ومكلف التراجع. أما جعلها عامة افتراضيًا فيحوّل كل تغيير صغير إلى سؤال عمّن يستمع أيضًا.',
    },
  },
  {
    id: 'a-sm-13',
    phase: 'state-management',
    question: {
      en: 'A cart lives in Zustand and products come from a query cache. Where should the total price live?',
      ar: 'العربة في Zustand والمنتجات من ذاكرة استعلام مؤقتة. أين يجب أن يعيش السعر الإجمالي؟',
    },
    options: [
      { text: { en: 'Nowhere — derive it from the cart and the products.', ar: 'في لا مكان — اشتقّه من العربة والمنتجات.' }, correct: true },
      { text: { en: 'In the Zustand store, updated on every change.', ar: 'في مخزن Zustand يُحدَّث مع كل تغيير.' } },
      { text: { en: 'In the query cache.', ar: 'في ذاكرة الاستعلام المؤقتة.' } },
      { text: { en: 'In Context.', ar: 'في Context.' } },
    ],
    explain: {
      en: 'Derived values do not become less derived because they span two sources. Storing the total means a price change silently leaves it wrong.',
      ar: 'القيم المشتقّة لا تكفّ عن كونها مشتقّة لأنها تمتدّ عبر مصدرين. وتخزين الإجمالي يعني أن تغيّر السعر يتركه خاطئًا بصمت.',
    },
  },
  {
    id: 'a-sm-14',
    phase: 'state-management',
    question: {
      en: 'What is the practical benefit of the Redux DevTools time-travel view?',
      ar: 'ما الفائدة العملية من عرض السفر عبر الزمن في Redux DevTools؟',
    },
    options: [
      { text: { en: 'Every state change is a named, replayable action you can step through.', ar: 'أن كل تغيير في الحالة إجراء مُسمّى قابل لإعادة التشغيل يمكنك تتبّعه خطوة بخطوة.' }, correct: true },
      { text: { en: 'It undoes network requests.', ar: 'أنه يتراجع عن طلبات الشبكة.' } },
      { text: { en: 'It speeds up rendering.', ar: 'أنه يُسرّع العرض.' } },
      { text: { en: 'It removes the need for tests.', ar: 'أنه يُلغي الحاجة للاختبارات.' } },
    ],
    explain: {
      en: 'Naming transitions is what buys the traceability. It is also why RTK feels heavier than a store where you just assign a value.',
      ar: 'تسمية الانتقالات هي ما يشتري إمكانية التتبّع. وهي أيضًا سبب شعورك بأن RTK أثقل من مخزن تُسند فيه قيمة فحسب.',
    },
  },
  {
    id: 'a-sm-15',
    phase: 'state-management',
    question: {
      en: 'When is Context genuinely the right answer?',
      ar: 'متى يكون Context هو الجواب الصحيح فعلًا؟',
    },
    options: [
      { text: { en: 'For a rarely-changing value a whole subtree needs — theme, locale, current user.', ar: 'لقيمة نادرة التغيّر تحتاجها شجرة كاملة — المظهر واللغة والمستخدم الحالي.' }, correct: true },
      { text: { en: 'For anything two components share.', ar: 'لأي شيء يتشاركه مكوّنان.' } },
      { text: { en: 'For high-frequency values like scroll position.', ar: 'للقيم عالية التردّد مثل موضع التمرير.' } },
      { text: { en: 'For all server data.', ar: 'لكل بيانات الخادم.' } },
    ],
    explain: {
      en: 'Rarely-changing and widely-needed is exactly its sweet spot. Two components sharing a value usually just needs lifting state up.',
      ar: 'نادرة التغيّر وواسعة الحاجة هي نقطة قوّته تمامًا. أما مكوّنان يتشاركان قيمة فيكفيهما رفع الحالة للأعلى عادةً.',
    },
  },
  {
    id: 'a-sm-16',
    phase: 'state-management',
    question: {
      en: 'What breaks if two browser tabs each hold their own copy of "unsaved draft" state?',
      ar: 'ما الذي ينكسر إذا احتفظ تبويبان بنسختهما من حالة «المسوّدة غير المحفوظة»؟',
    },
    options: [
      { text: { en: 'Nothing — client state is per-tab by nature.', ar: 'لا شيء — فحالة العميل بطبيعتها لكل تبويب.' }, correct: true },
      { text: { en: 'The store throws a synchronisation error.', ar: 'يُطلق المخزن خطأ مزامنة.' } },
      { text: { en: 'React refuses to render the second tab.', ar: 'ترفض رياكت عرض التبويب الثاني.' } },
      { text: { en: 'Both drafts are lost.', ar: 'تضيع كلتا المسوّدتين.' } },
    ],
    explain: {
      en: 'That independence is the point of client state. It is server data held in two tabs that needs invalidation to stay consistent.',
      ar: 'هذا الاستقلال هو غاية حالة العميل. أما بيانات الخادم المحفوظة في تبويبين فهي ما يحتاج إبطالًا ليبقى متّسقًا.',
    },
  },
  {
    id: 'a-sm-17',
    phase: 'state-management',
    question: {
      en: 'Why is "one big store for everything" a warning sign?',
      ar: 'لماذا يُعدّ «مخزن واحد كبير لكل شيء» علامة تحذير؟',
    },
    options: [
      { text: { en: 'It mixes server cache with UI state, so each inherits the other\'s problems.', ar: 'لأنه يخلط ذاكرة الخادم بحالة الواجهة، فيرث كلٌّ مشاكل الآخر.' }, correct: true },
      { text: { en: 'Stores have a size limit.', ar: 'لأن للمخازن حدًّا في الحجم.' } },
      { text: { en: 'It cannot be typed.', ar: 'لأنه لا يمكن تنميطه.' } },
      { text: { en: 'It prevents code splitting.', ar: 'لأنه يمنع تقسيم الكود.' } },
    ],
    explain: {
      en: 'Server data needs refetching and invalidation; UI state does not. Handling both in one place means writing cache logic by hand for the half that needs it.',
      ar: 'بيانات الخادم تحتاج إعادة جلب وإبطالًا، وحالة الواجهة لا. وإدارتهما في مكان واحد تعني كتابة منطق التخزين يدويًا للنصف الذي يحتاجه.',
    },
  },
  {
    id: 'a-sm-18',
    phase: 'state-management',
    question: {
      en: 'What does a derived atom in Jotai do?',
      ar: 'ماذا تفعل الذرّة المشتقّة في Jotai؟',
    },
    options: [
      { text: { en: 'Computes from other atoms and updates when they change.', ar: 'تحسب من ذرّات أخرى وتتحدّث عند تغيّرها.' }, correct: true },
      { text: { en: 'Copies another atom\'s value once.', ar: 'تنسخ قيمة ذرّة أخرى مرة واحدة.' } },
      { text: { en: 'Persists an atom to storage.', ar: 'تحفظ ذرّة في التخزين.' } },
      { text: { en: 'Creates a new store instance.', ar: 'تنشئ نسخة مخزن جديدة.' } },
    ],
    explain: {
      en: 'It is the derived-state principle built into the library, so the dependency graph is explicit instead of recomputed by hand in each component.',
      ar: 'إنها مبدأ الحالة المشتقّة مدمجًا في المكتبة، فيصبح رسم الاعتماديات صريحًا بدل إعادة حسابه يدويًا في كل مكوّن.',
    },
  },
  {
    id: 'a-sm-19',
    phase: 'state-management',
    question: {
      en: 'Which is a legitimate reason to add Redux Toolkit to a new project?',
      ar: 'ما السبب الوجيه لإضافة Redux Toolkit إلى مشروع جديد؟',
    },
    options: [
      { text: { en: 'The team already maintains RTK codebases and wants one pattern.', ar: 'أن الفريق يصون مشاريع RTK أصلًا ويريد نمطًا واحدًا.' }, correct: true },
      { text: { en: 'It is faster than Zustand.', ar: 'أنه أسرع من Zustand.' } },
      { text: { en: 'React recommends it by default.', ar: 'أن رياكت توصي به افتراضيًا.' } },
      { text: { en: 'It removes the need for Context.', ar: 'أنه يُلغي الحاجة إلى Context.' } },
    ],
    explain: {
      en: 'Consistency across a team is a real engineering reason. Performance is not the differentiator people assume, and RTK is far lighter than classic Redux.',
      ar: 'الاتّساق عبر الفريق سبب هندسي حقيقي. أما الأداء فليس عامل التفريق الذي يفترضه الناس، و RTK أخفّ بكثير من Redux الكلاسيكي.',
    },
  },
  {
    id: 'a-sm-20',
    phase: 'state-management',
    question: {
      en: 'Where should a "sidebar is collapsed" flag live in a large app?',
      ar: 'أين يجب أن يعيش عَلَم «الشريط الجانبي مطوي» في تطبيق كبير؟',
    },
    options: [
      { text: { en: 'A small client store or Context — it is app-wide UI state.', ar: 'في مخزن عميل صغير أو Context — فهي حالة واجهة على مستوى التطبيق.' }, correct: true },
      { text: { en: 'The server cache.', ar: 'في ذاكرة الخادم المؤقتة.' } },
      { text: { en: 'A URL parameter.', ar: 'في معامل رابط.' } },
      { text: { en: 'A ref in the root component.', ar: 'في مرجع بالمكوّن الجذر.' } },
    ],
    explain: {
      en: 'It is small, client-owned and read in several places, which is exactly the residue left once server data moves to a query cache.',
      ar: 'إنها صغيرة يملكها العميل وتُقرأ في مواضع عدّة، وهي بالضبط ما يتبقّى بعد نقل بيانات الخادم إلى ذاكرة استعلام مؤقتة.',
    },
  },
  {
    id: 'a-sm-21',
    phase: 'state-management',
    question: {
      en: 'What does "tearing" mean in a concurrent React app?',
      ar: 'ماذا يعني «التمزّق» في تطبيق رياكت متزامن؟',
    },
    options: [
      { text: { en: 'Different parts of one render showing different versions of the same value.', ar: 'أن تُظهر أجزاء مختلفة من عرض واحد نسخًا مختلفة من القيمة نفسها.' }, correct: true },
      { text: { en: 'A component unmounting mid-render.', ar: 'أن يُزال مكوّن أثناء العرض.' } },
      { text: { en: 'CSS layout shifting.', ar: 'أن ينزاح تخطيط CSS.' } },
      { text: { en: 'A memory leak from subscriptions.', ar: 'تسرّب ذاكرة من الاشتراكات.' } },
    ],
    explain: {
      en: 'React can pause a render, and an external store may change in between. `useSyncExternalStore` is what guarantees one consistent snapshot per render.',
      ar: 'يمكن لرياكت إيقاف العرض مؤقتًا وقد يتغيّر المخزن الخارجي بينهما. و `useSyncExternalStore` هي ما يضمن لقطة متّسقة واحدة لكل عرض.',
    },
  },
  {
    id: 'a-sm-22',
    phase: 'state-management',
    question: {
      en: 'Which state is best kept in the URL rather than any store?',
      ar: 'أي حالة يُفضَّل حفظها في الرابط بدل أي مخزن؟',
    },
    options: [
      { text: { en: 'The active filters and page of a results view.', ar: 'المُرشِّحات النشطة وصفحة عرض النتائج.' }, correct: true },
      { text: { en: 'Whether a tooltip is showing.', ar: 'ما إذا كان التلميح ظاهرًا.' } },
      { text: { en: 'The auth token.', ar: 'رمز المصادقة.' } },
      { text: { en: 'Draft text in an unsaved form.', ar: 'نص مسوّدة في نموذج غير محفوظ.' } },
    ],
    explain: {
      en: 'If a user would reasonably want to send that exact view to a colleague, it belongs in the URL. A token in the URL is a security problem.',
      ar: 'إن كان من المعقول أن يرغب المستخدم بإرسال ذلك العرض بعينه لزميل، فمكانه الرابط. أما وضع الرمز في الرابط فمشكلة أمنية.',
    },
  },
  {
    id: 'a-sm-23',
    phase: 'state-management',
    question: {
      en: 'What problem does normalising cached entities solve?',
      ar: 'ما المشكلة التي يحلّها تطبيع الكيانات المخزّنة؟',
    },
    options: [
      { text: { en: 'The same record duplicated across lists drifting out of sync.', ar: 'تكرار السجل نفسه عبر قوائم متعدّدة وفقدانه التزامن.' }, correct: true },
      { text: { en: 'Requests taking too long.', ar: 'استغراق الطلبات وقتًا طويلًا.' } },
      { text: { en: 'Bundle size.', ar: 'حجم الحزمة.' } },
      { text: { en: 'TypeScript errors.', ar: 'أخطاء تايب سكربت.' } },
    ],
    explain: {
      en: 'One user appearing in three lists means three copies to update. Keying entities by id and referencing them keeps a single source of truth.',
      ar: 'ظهور مستخدم واحد في ثلاث قوائم يعني ثلاث نسخ للتحديث. أما فهرسة الكيانات بالمعرّف والإشارة إليها فتُبقي مصدرًا واحدًا للحقيقة.',
    },
  },
  {
    id: 'a-sm-24',
    phase: 'state-management',
    question: {
      en: 'Why does persisting an entire store to `localStorage` often cause bugs?',
      ar: 'لماذا يسبّب حفظ المخزن كاملًا في `localStorage` أخطاءً غالبًا؟',
    },
    options: [
      { text: { en: 'Stale server data and old shapes get restored after a deploy.', ar: 'لأن بيانات الخادم القديمة والأشكال القديمة تُستعاد بعد النشر.' }, correct: true },
      { text: { en: '`localStorage` cannot hold objects.', ar: 'لأن `localStorage` لا يحمل كائنات.' } },
      { text: { en: 'It blocks the main thread permanently.', ar: 'لأنه يحجب الخيط الرئيسي دائمًا.' } },
      { text: { en: 'Persistence is disallowed in React.', ar: 'لأن الحفظ ممنوع في رياكت.' } },
    ],
    explain: {
      en: 'Persist the small, client-owned slice deliberately, and version it. Restoring a cached API response from last week is how users see data that no longer exists.',
      ar: 'احفظ الجزء الصغير الذي يملكه العميل عن قصد وأعطه إصدارًا. فاستعادة استجابة واجهة من الأسبوع الماضي هي كيف يرى المستخدمون بيانات لم تعد موجودة.',
    },
  },
  {
    id: 'a-sm-25',
    phase: 'state-management',
    question: {
      en: 'Two distant components need the same server data. What is the simplest correct approach?',
      ar: 'مكوّنان متباعدان يحتاجان بيانات الخادم نفسها. ما أبسط نهج صحيح؟',
    },
    options: [
      { text: { en: 'Both call the same query key and let the cache deduplicate.', ar: 'أن يستدعي كلاهما مفتاح الاستعلام نفسه وتتكفّل الذاكرة المؤقتة بإزالة التكرار.' }, correct: true },
      { text: { en: 'Fetch once at the root and prop-drill it down.', ar: 'الجلب مرة عند الجذر وتمريره عبر الخصائص.' } },
      { text: { en: 'Copy the response into a global store.', ar: 'نسخ الاستجابة إلى مخزن عام.' } },
      { text: { en: 'Fetch separately in each component with `useEffect`.', ar: 'الجلب منفصلًا في كل مكوّن بـ `useEffect`.' } },
    ],
    explain: {
      en: 'The cache already solves sharing. Copying it into a store creates a second source of truth that will not refetch or invalidate itself.',
      ar: 'الذاكرة المؤقتة تحلّ المشاركة أصلًا. أما نسخها إلى مخزن فيُنشئ مصدرًا ثانيًا للحقيقة لن يُعيد الجلب أو يُبطل نفسه.',
    },
  },
  {
    id: 'a-sm-26',
    phase: 'state-management',
    question: {
      en: 'What does it mean that Zustand works outside React components?',
      ar: 'ماذا يعني أن Zustand يعمل خارج مكوّنات رياكت؟',
    },
    options: [
      { text: { en: 'The store can be read and written from plain modules, not only hooks.', ar: 'أن المخزن يمكن قراءته والكتابة فيه من وحدات عادية لا من الخطّافات فقط.' }, correct: true },
      { text: { en: 'It renders its own components.', ar: 'أنه يعرض مكوّناته الخاصة.' } },
      { text: { en: 'It runs in a service worker.', ar: 'أنه يعمل في عامل خدمة.' } },
      { text: { en: 'It does not need a provider because it uses Context internally.', ar: 'أنه لا يحتاج مزوّدًا لأنه يستخدم Context داخليًا.' } },
    ],
    explain: {
      en: 'Handy for calling from a websocket handler or an interceptor. It also means no provider is needed at all — the store is just a module.',
      ar: 'مفيد للاستدعاء من معالج websocket أو معترض. ويعني أيضًا عدم الحاجة إلى مزوّد إطلاقًا — فالمخزن مجرّد وحدة.',
    },
  },
  {
    id: 'a-sm-27',
    phase: 'state-management',
    question: {
      en: 'What is the risk of selecting the whole store object in every component?',
      ar: 'ما خطر انتقاء كائن المخزن كاملًا في كل مكوّن؟',
    },
    options: [
      { text: { en: 'Any change anywhere re-renders every component.', ar: 'أن أي تغيير في أي مكان يُعيد عرض كل مكوّن.' }, correct: true },
      { text: { en: 'The store becomes read-only.', ar: 'أن يصبح المخزن للقراءة فقط.' } },
      { text: { en: 'Selectors stop working.', ar: 'أن تتوقّف المُنتقيات عن العمل.' } },
      { text: { en: 'Memory usage doubles.', ar: 'أن يتضاعف استخدام الذاكرة.' } },
    ],
    explain: {
      en: 'You have rebuilt the Context problem inside a library designed to avoid it. Select the narrowest slice each component actually reads.',
      ar: 'تكون قد أعدت بناء مشكلة Context داخل مكتبة صُمّمت لتجنّبها. انتقِ أضيق جزء يقرؤه كل مكوّن فعلًا.',
    },
  },
  {
    id: 'a-sm-28',
    phase: 'state-management',
    question: {
      en: 'When does prop drilling stop being acceptable?',
      ar: 'متى يتوقّف تمرير الخصائص المتسلسل عن كونه مقبولًا؟',
    },
    options: [
      { text: { en: 'When intermediate components pass props they do not use themselves.', ar: 'حين تمرّر المكوّنات الوسيطة خصائص لا تستخدمها بنفسها.' }, correct: true },
      { text: { en: 'After exactly three levels.', ar: 'بعد ثلاثة مستويات بالضبط.' } },
      { text: { en: 'As soon as more than one prop is passed.', ar: 'بمجرّد تمرير أكثر من خاصية واحدة.' } },
      { text: { en: 'It is never acceptable.', ar: 'إنه غير مقبول أبدًا.' } },
    ],
    explain: {
      en: 'Depth alone is fine. The smell is a component forced to know about data purely to hand it onwards — and composition often fixes that without any store.',
      ar: 'العمق وحده لا بأس به. أما الرائحة الكريهة فهي مكوّن يُجبَر على معرفة بيانات لمجرّد تمريرها — والتركيب يحلّ ذلك غالبًا دون أي مخزن.',
    },
  },
  {
    id: 'a-sm-29',
    phase: 'state-management',
    question: {
      en: 'What makes a store action easier to test than a component handler?',
      ar: 'ما الذي يجعل إجراء المخزن أسهل اختبارًا من معالج المكوّن؟',
    },
    options: [
      { text: { en: 'It is a plain function over state, with no rendering involved.', ar: 'أنه دالة عادية على الحالة دون أي عرض.' }, correct: true },
      { text: { en: 'Stores ship with their own test runner.', ar: 'أن المخازن تأتي بمُشغّل اختبارات خاص.' } },
      { text: { en: 'Actions cannot fail.', ar: 'أن الإجراءات لا تفشل.' } },
      { text: { en: 'Components cannot be tested at all.', ar: 'أن المكوّنات لا يمكن اختبارها إطلاقًا.' } },
    ],
    explain: {
      en: 'No DOM, no render, no user event simulation — just call it and assert the next state. That is a good reason to keep logic out of handlers.',
      ar: 'لا DOM ولا عرض ولا محاكاة أحداث — استدعِه فقط وتحقّق من الحالة التالية. وهذا سبب وجيه لإبقاء المنطق خارج المعالجات.',
    },
  },
  {
    id: 'a-sm-30',
    phase: 'state-management',
    question: {
      en: 'Which sequence best describes choosing a state solution?',
      ar: 'أي تسلسل يصف اختيار حلّ الحالة على أفضل وجه؟',
    },
    options: [
      { text: { en: 'Local state → lift it → server cache or a small store, only if needed.', ar: 'حالة محلية ← ارفعها ← ذاكرة خادم أو مخزن صغير عند الحاجة فقط.' }, correct: true },
      { text: { en: 'Global store first, then narrow it down.', ar: 'مخزن عام أولًا ثم ضيّقه.' } },
      { text: { en: 'Context for everything, then optimise.', ar: 'Context لكل شيء ثم حسّن.' } },
      { text: { en: 'Whatever the most popular library is this year.', ar: 'أيًّا كانت المكتبة الأشهر هذا العام.' } },
    ],
    explain: {
      en: 'Each step is only taken when the previous one genuinely fails. Starting at the end is how projects end up with a global store holding a modal flag.',
      ar: 'لا تُتّخذ كل خطوة إلا حين تفشل السابقة فعلًا. والبدء من النهاية هو كيف تنتهي المشاريع بمخزن عام يحمل عَلَم نافذة منبثقة.',
    },
  },

  // --------------------------------------------------------------- phase 11
  {
    id: 'a-fv-01',
    phase: 'forms-and-validation',
    question: {
      en: 'Why does React Hook Form stay fast on a form with fifty fields?',
      ar: 'لماذا يبقى React Hook Form سريعًا في نموذج بخمسين حقلًا؟',
    },
    options: [
      { text: { en: 'Fields are uncontrolled by default, so typing does not re-render the form.', ar: 'لأن الحقول غير مُتحكَّم بها افتراضيًا، فلا تُعيد الكتابة عرض النموذج.' }, correct: true },
      { text: { en: 'It debounces every keystroke.', ar: 'لأنه يؤخّر كل ضغطة مفتاح.' } },
      { text: { en: 'It renders fields in a worker thread.', ar: 'لأنه يعرض الحقول في خيط عامل.' } },
      { text: { en: 'It disables validation until submit.', ar: 'لأنه يُعطّل التحقّق حتى الإرسال.' } },
    ],
    explain: {
      en: 'A controlled form re-renders on every character in any field. RHF subscribes to the DOM inputs and only re-renders the parts that need it.',
      ar: 'النموذج المُتحكَّم به يُعاد عرضه مع كل حرف في أي حقل. أما RHF فيشترك في حقول DOM ولا يُعيد عرض إلا ما يحتاج ذلك.',
    },
  },
  {
    id: 'a-fv-02',
    phase: 'forms-and-validation',
    question: {
      en: 'What does `z.infer<typeof schema>` give you?',
      ar: 'ماذا يمنحك `z.infer<typeof schema>`؟',
    },
    options: [
      { text: { en: 'The TypeScript type of the validated data, derived from the schema.', ar: 'نوع تايب سكربت للبيانات المُتحقَّق منها، مشتقًّا من المخطّط.' }, correct: true },
      { text: { en: 'A runtime validator function.', ar: 'دالة تحقّق وقت التشغيل.' } },
      { text: { en: 'A list of validation errors.', ar: 'قائمة بأخطاء التحقّق.' } },
      { text: { en: 'A React component.', ar: 'مكوّن رياكت.' } },
    ],
    explain: {
      en: 'One schema produces both the runtime check and the static type, so they cannot drift apart the way a hand-written interface does.',
      ar: 'مخطّط واحد يُنتج الفحص وقت التشغيل والنوع الساكن معًا، فلا يمكن أن يفترقا كما تفعل واجهة مكتوبة يدويًا.',
    },
  },
  {
    id: 'a-fv-03',
    phase: 'forms-and-validation',
    question: {
      en: 'Where does client-side validation stop being enough?',
      ar: 'أين يتوقّف التحقّق من جهة العميل عن الكفاية؟',
    },
    options: [
      { text: { en: 'Always — the server must validate too, since the client can be bypassed.', ar: 'دائمًا — فيجب أن يتحقّق الخادم أيضًا لأن العميل يمكن تجاوزه.' }, correct: true },
      { text: { en: 'Only for file uploads.', ar: 'في رفع الملفات فقط.' } },
      { text: { en: 'Only when using Zod.', ar: 'عند استخدام Zod فقط.' } },
      { text: { en: 'Never — client validation is authoritative.', ar: 'أبدًا — فتحقّق العميل هو المرجع.' } },
    ],
    explain: {
      en: 'Client validation is a user-experience feature, not a security boundary. Anyone can post directly to your endpoint with whatever body they like.',
      ar: 'تحقّق العميل ميزة لتجربة المستخدم لا حدّ أمني. فبإمكان أي شخص إرسال طلب مباشرةً إلى نقطتك بأي جسم يريد.',
    },
  },
  {
    id: 'a-fv-04',
    phase: 'forms-and-validation',
    question: {
      en: 'What does a resolver do in React Hook Form?',
      ar: 'ماذا يفعل الـ resolver في React Hook Form؟',
    },
    options: [
      { text: { en: 'Bridges an external schema library to RHF\'s error format.', ar: 'يجسر مكتبة مخطّطات خارجية إلى صيغة أخطاء RHF.' }, correct: true },
      { text: { en: 'Resolves the form\'s submit promise.', ar: 'يحسم وعد إرسال النموذج.' } },
      { text: { en: 'Fetches default values from the server.', ar: 'يجلب القيم الافتراضية من الخادم.' } },
      { text: { en: 'Registers the fields automatically.', ar: 'يسجّل الحقول تلقائيًا.' } },
    ],
    explain: {
      en: 'It runs the schema and maps failures onto `formState.errors`, keyed by field path, so the same schema drives both validation and messages.',
      ar: 'يُشغّل المخطّط ويحوّل الإخفاقات إلى `formState.errors` مفهرسةً بمسار الحقل، فيقود المخطّط نفسه التحقّق والرسائل معًا.',
    },
  },
  {
    id: 'a-fv-05',
    phase: 'forms-and-validation',
    question: {
      en: 'A username must be checked for availability against the server. Where does that belong?',
      ar: 'يجب فحص توفّر اسم المستخدم لدى الخادم. أين ينتمي ذلك؟',
    },
    options: [
      { text: { en: 'An async validation rule, debounced, with a pending indicator.', ar: 'قاعدة تحقّق غير متزامنة مؤخَّرة مع مؤشّر انتظار.' }, correct: true },
      { text: { en: 'A synchronous regex rule.', ar: 'قاعدة تعبير نمطي متزامنة.' } },
      { text: { en: 'Only after submit fails.', ar: 'بعد فشل الإرسال فقط.' } },
      { text: { en: 'In a `useEffect` on every keystroke.', ar: 'في `useEffect` مع كل ضغطة مفتاح.' } },
    ],
    explain: {
      en: 'Without debouncing you fire a request per character. Without a pending state the field looks valid while the answer is still in flight.',
      ar: 'بدون التأخير تُطلق طلبًا لكل حرف. وبدون حالة انتظار يبدو الحقل صالحًا بينما الجواب ما زال في الطريق.',
    },
  },
  {
    id: 'a-fv-06',
    phase: 'forms-and-validation',
    question: {
      en: 'How should a server-side validation error be surfaced after submit?',
      ar: 'كيف يجب إظهار خطأ تحقّق من الخادم بعد الإرسال؟',
    },
    options: [
      { text: { en: 'Attached to the specific field it concerns, and announced.', ar: 'مرتبطًا بالحقل المعني تحديدًا ومُعلَنًا.' }, correct: true },
      { text: { en: 'As a browser `alert`.', ar: 'كتنبيه `alert` من المتصفح.' } },
      { text: { en: 'Logged to the console.', ar: 'مسجَّلًا في وحدة التحكّم.' } },
      { text: { en: 'By clearing the whole form.', ar: 'بمسح النموذج كله.' } },
    ],
    explain: {
      en: 'RHF exposes `setError` for exactly this, so a "that email is taken" reply lands on the email input rather than in a generic banner.',
      ar: 'يوفّر RHF الدالة `setError` لهذا تمامًا، فيهبط ردّ «هذا البريد مستخدم» على حقل البريد لا في شريط عام.',
    },
  },
  {
    id: 'a-fv-07',
    phase: 'forms-and-validation',
    question: {
      en: 'What is a field array used for?',
      ar: 'فيمَ تُستخدم مصفوفة الحقول؟',
    },
    options: [
      { text: { en: 'A repeating group of inputs the user can add to and remove.', ar: 'مجموعة حقول متكرّرة يستطيع المستخدم الإضافة إليها والحذف منها.' }, correct: true },
      { text: { en: 'Validating an array of strings.', ar: 'التحقّق من مصفوفة نصوص.' } },
      { text: { en: 'Storing the form in an array.', ar: 'تخزين النموذج في مصفوفة.' } },
      { text: { en: 'Splitting a form across pages.', ar: 'تقسيم النموذج عبر صفحات.' } },
    ],
    explain: {
      en: 'Think invoice line items or multiple addresses. The library manages stable ids for each row, which is what keeps React from mixing rows up.',
      ar: 'فكّر ببنود فاتورة أو عناوين متعدّدة. تدير المكتبة معرّفات ثابتة لكل صف، وهذا ما يمنع رياكت من الخلط بين الصفوف.',
    },
  },
  {
    id: 'a-fv-08',
    phase: 'forms-and-validation',
    question: {
      en: 'Why is `<label htmlFor>` non-negotiable on a form field?',
      ar: 'لماذا لا يمكن التنازل عن `<label htmlFor>` في حقل النموذج؟',
    },
    options: [
      { text: { en: 'It names the field for screen readers and makes the label clickable.', ar: 'لأنها تُسمّي الحقل لقارئات الشاشة وتجعل التسمية قابلة للنقر.' }, correct: true },
      { text: { en: 'It is required for validation to run.', ar: 'لأنها مطلوبة لعمل التحقّق.' } },
      { text: { en: 'It improves typing performance.', ar: 'لأنها تُحسّن أداء الكتابة.' } },
      { text: { en: 'It sets the field\'s default value.', ar: 'لأنها تضبط القيمة الافتراضية للحقل.' } },
    ],
    explain: {
      en: 'A placeholder is not a label — it disappears the moment typing starts and is often skipped by assistive tech. It also enlarges the tap target.',
      ar: 'النص النائب ليس تسمية — فهو يختفي بمجرّد بدء الكتابة وتتخطّاه تقنيات الإتاحة غالبًا. كما أن التسمية توسّع مساحة اللمس.',
    },
  },
  {
    id: 'a-fv-09',
    phase: 'forms-and-validation',
    question: {
      en: 'How should an invalid field be linked to its error message?',
      ar: 'كيف يجب ربط حقل غير صالح برسالة خطئه؟',
    },
    options: [
      { text: { en: 'With `aria-invalid` on the input and `aria-describedby` pointing at the message.', ar: 'بـ `aria-invalid` على الحقل و `aria-describedby` تشير إلى الرسالة.' }, correct: true },
      { text: { en: 'By colouring the border red.', ar: 'بتلوين الحدّ بالأحمر.' } },
      { text: { en: 'By placing the message nearby in the DOM.', ar: 'بوضع الرسالة قريبة في DOM.' } },
      { text: { en: 'With a `title` attribute.', ar: 'بخاصية `title`.' } },
    ],
    explain: {
      en: 'Colour and proximity are visual only. The ARIA pair is what makes a screen reader announce the reason when focus reaches the field.',
      ar: 'اللون والقرب بصريان فقط. أما زوج ARIA فهو ما يجعل قارئ الشاشة يُعلن السبب حين يصل التركيز إلى الحقل.',
    },
  },
  {
    id: 'a-fv-10',
    phase: 'forms-and-validation',
    question: {
      en: 'A long form fails validation on submit. What is the most helpful behaviour?',
      ar: 'نموذج طويل يفشل تحقّقه عند الإرسال. ما التصرّف الأنفع؟',
    },
    options: [
      { text: { en: 'Move focus to the first invalid field and summarise the errors.', ar: 'نقل التركيز إلى أول حقل غير صالح وتلخيص الأخطاء.' }, correct: true },
      { text: { en: 'Scroll to the top silently.', ar: 'التمرير للأعلى بصمت.' } },
      { text: { en: 'Disable the submit button.', ar: 'تعطيل زر الإرسال.' } },
      { text: { en: 'Clear the invalid fields.', ar: 'مسح الحقول غير الصالحة.' } },
    ],
    explain: {
      en: 'Otherwise the error may be three screens away with no indication. Clearing fields is actively hostile — it throws away work the user just did.',
      ar: 'وإلا فقد يكون الخطأ على بعد ثلاث شاشات دون أي إشارة. أما مسح الحقول فعدائي فعلًا — إذ يرمي عملًا أنجزه المستخدم للتوّ.',
    },
  },
  {
    id: 'a-fv-11',
    phase: 'forms-and-validation',
    question: {
      en: 'Why disable the submit button only while a request is in flight, not while the form is invalid?',
      ar: 'لماذا يُعطَّل زر الإرسال أثناء الطلب فقط لا حين يكون النموذج غير صالح؟',
    },
    options: [
      { text: { en: 'A permanently disabled button gives no explanation of what is wrong.', ar: 'لأن الزر المعطّل دائمًا لا يشرح ما الخطأ.' }, correct: true },
      { text: { en: 'Disabled buttons are not clickable by keyboard.', ar: 'لأن الأزرار المعطّلة لا تُنقر بلوحة المفاتيح.' } },
      { text: { en: 'It prevents validation from running.', ar: 'لأنه يمنع تشغيل التحقّق.' } },
      { text: { en: 'The form cannot submit while disabled.', ar: 'لأن النموذج لا يُرسَل أثناء التعطيل.' } },
    ],
    explain: {
      en: 'Letting the submit attempt through and then showing the errors tells the user what to fix. A greyed-out button leaves them hunting.',
      ar: 'السماح بمحاولة الإرسال ثم إظهار الأخطاء يخبر المستخدم بما يُصلحه. أما الزر الباهت فيتركه يبحث.',
    },
  },
  {
    id: 'a-fv-12',
    phase: 'forms-and-validation',
    question: {
      en: 'What does `mode: "onBlur"` change in React Hook Form?',
      ar: 'ماذا يُغيّر `mode: "onBlur"` في React Hook Form؟',
    },
    options: [
      { text: { en: 'Validation runs when a field loses focus rather than on every keystroke.', ar: 'يُشغَّل التحقّق حين يفقد الحقل التركيز بدل كل ضغطة مفتاح.' }, correct: true },
      { text: { en: 'The form submits on blur.', ar: 'يُرسَل النموذج عند فقد التركيز.' } },
      { text: { en: 'Errors are hidden entirely.', ar: 'تُخفى الأخطاء تمامًا.' } },
      { text: { en: 'Fields become controlled.', ar: 'تصبح الحقول مُتحكَّمًا بها.' } },
    ],
    explain: {
      en: 'Validating on every character shouts "invalid email" at someone who has typed two letters. Blur waits until they are finished with the field.',
      ar: 'التحقّق مع كل حرف يصرخ «بريد غير صالح» في وجه من كتب حرفين. أما فقد التركيز فينتظر حتى ينتهي من الحقل.',
    },
  },
  {
    id: 'a-fv-13',
    phase: 'forms-and-validation',
    question: {
      en: 'Which Zod schema makes a field optional but still validated when present?',
      ar: 'أي مخطّط Zod يجعل الحقل اختياريًا مع التحقّق منه عند وجوده؟',
    },
    options: [
      { text: { en: '`z.string().email().optional()`', ar: '`z.string().email().optional()`' }, correct: true },
      { text: { en: '`z.optional()`', ar: '`z.optional()`' } },
      { text: { en: '`z.string().nullable().email()`', ar: '`z.string().nullable().email()`' } },
      { text: { en: '`z.any()`', ar: '`z.any()`' } },
    ],
    explain: {
      en: '`optional()` allows `undefined` while keeping the rules for a supplied value. Note that `nullable()` allows `null`, which is a different absence.',
      ar: 'تسمح `optional()` بـ `undefined` مع إبقاء القواعد للقيمة المُقدَّمة. ولاحظ أن `nullable()` تسمح بـ `null` وهو غياب مختلف.',
    },
  },
  {
    id: 'a-fv-14',
    phase: 'forms-and-validation',
    question: {
      en: 'A password and its confirmation must match. Where does that rule belong?',
      ar: 'يجب أن تتطابق كلمة المرور مع تأكيدها. أين تنتمي هذه القاعدة؟',
    },
    options: [
      { text: { en: 'On the object schema, since it compares two fields.', ar: 'على مخطّط الكائن لأنها تقارن حقلين.' }, correct: true },
      { text: { en: 'On the confirmation field alone.', ar: 'على حقل التأكيد وحده.' } },
      { text: { en: 'In the submit handler only.', ar: 'في معالج الإرسال فقط.' } },
      { text: { en: 'On the password field alone.', ar: 'على حقل كلمة المرور وحده.' } },
    ],
    explain: {
      en: 'A single-field rule cannot see its sibling. Zod\'s `refine` at the object level can, and it lets you attach the error to the confirmation input.',
      ar: 'قاعدة الحقل الواحد لا ترى شقيقه. أما `refine` على مستوى الكائن في Zod فتراه، وتتيح لك إلحاق الخطأ بحقل التأكيد.',
    },
  },
  {
    id: 'a-fv-15',
    phase: 'forms-and-validation',
    question: {
      en: 'What is the benefit of parsing an API response with the same schema library?',
      ar: 'ما فائدة تحليل استجابة الواجهة البرمجية بمكتبة المخطّطات نفسها؟',
    },
    options: [
      { text: { en: 'Bad data fails loudly at the boundary instead of deep inside a component.', ar: 'أن البيانات السيئة تفشل بوضوح عند الحدّ بدل عمق المكوّن.' }, correct: true },
      { text: { en: 'It makes requests faster.', ar: 'أنه يُسرّع الطلبات.' } },
      { text: { en: 'It removes the need for TypeScript.', ar: 'أنه يُلغي الحاجة إلى تايب سكربت.' } },
      { text: { en: 'It caches the response.', ar: 'أنه يخزّن الاستجابة مؤقتًا.' } },
    ],
    explain: {
      en: 'A TypeScript type is a promise about data you never verified. Parsing turns "the server said it was a User" into something actually checked.',
      ar: 'نوع تايب سكربت وعدٌ ببيانات لم تتحقّق منها قط. أما التحليل فيحوّل «قال الخادم إنه User» إلى شيء مفحوص فعلًا.',
    },
  },
  {
    id: 'a-fv-16',
    phase: 'forms-and-validation',
    question: {
      en: 'A multi-step form must keep values between steps. What is the cleanest approach?',
      ar: 'نموذج متعدّد الخطوات يجب أن يحفظ القيم بين الخطوات. ما أنظف نهج؟',
    },
    options: [
      { text: { en: 'One form state spanning all steps, with each step rendering a slice.', ar: 'حالة نموذج واحدة تمتدّ عبر كل الخطوات، وكل خطوة تعرض جزءًا منها.' }, correct: true },
      { text: { en: 'A separate form per step, merged at the end.', ar: 'نموذج منفصل لكل خطوة يُدمج في النهاية.' } },
      { text: { en: 'Writing each step to `localStorage`.', ar: 'كتابة كل خطوة إلى `localStorage`.' } },
      { text: { en: 'Hidden inputs carrying earlier answers.', ar: 'حقول مخفية تحمل الإجابات السابقة.' } },
    ],
    explain: {
      en: 'Unmounting a step must not discard its answers. One state also lets the review screen and the final submit read a single object.',
      ar: 'إزالة خطوة يجب ألّا تُلغي إجاباتها. كما تتيح الحالة الواحدة لشاشة المراجعة وللإرسال النهائي قراءة كائن واحد.',
    },
  },
  {
    id: 'a-fv-17',
    phase: 'forms-and-validation',
    question: {
      en: 'Why does a controlled `<select>` sometimes lose its value on re-render?',
      ar: 'لماذا يفقد `<select>` المُتحكَّم به قيمته أحيانًا عند إعادة العرض؟',
    },
    options: [
      { text: { en: 'Its options were rebuilt with new values that no longer include the selection.', ar: 'لأن خياراته أُعيد بناؤها بقيم جديدة لم تعد تشمل المحدَّد.' }, correct: true },
      { text: { en: '`<select>` cannot be controlled.', ar: 'لأن `<select>` لا يمكن التحكّم به.' } },
      { text: { en: 'React resets selects on every render.', ar: 'لأن رياكت تعيد ضبط عناصر الاختيار في كل عرض.' } },
      { text: { en: 'The `value` prop is ignored for selects.', ar: 'لأن خاصية `value` تُتجاهَل مع عناصر الاختيار.' } },
    ],
    explain: {
      en: 'The DOM cannot select an option that is not there, so it falls back to the first one. Async-loaded options are the usual culprit.',
      ar: 'لا يستطيع DOM تحديد خيار غير موجود فيرتدّ إلى الأول. والخيارات المُحمّلة لاحقًا هي السبب المعتاد.',
    },
  },
  {
    id: 'a-fv-18',
    phase: 'forms-and-validation',
    question: {
      en: 'What should happen to a form while its submission is in flight?',
      ar: 'ماذا يجب أن يحدث للنموذج أثناء تنفيذ إرساله؟',
    },
    options: [
      { text: { en: 'Show a pending state and prevent a second submit.', ar: 'إظهار حالة انتظار ومنع إرسال ثانٍ.' }, correct: true },
      { text: { en: 'Clear the fields immediately.', ar: 'مسح الحقول فورًا.' } },
      { text: { en: 'Navigate away at once.', ar: 'المغادرة فورًا.' } },
      { text: { en: 'Nothing visible.', ar: 'لا شيء مرئي.' } },
    ],
    explain: {
      en: 'Without it an impatient double-click creates two records. Clearing or navigating before the reply means a failure has nothing to return to.',
      ar: 'بدون ذلك تُنشئ نقرة مزدوجة متعجّلة سجلّين. ومسح الحقول أو المغادرة قبل الردّ يعني ألّا يجد الفشل ما يعود إليه.',
    },
  },
  {
    id: 'a-fv-19',
    phase: 'forms-and-validation',
    question: {
      en: 'Which input type gives the best mobile keyboard for an email field?',
      ar: 'أي نوع إدخال يمنح أفضل لوحة مفاتيح للجوّال في حقل بريد إلكتروني؟',
    },
    options: [
      { text: { en: '`type="email"` with `autoComplete="email"`', ar: '`type="email"` مع `autoComplete="email"`' }, correct: true },
      { text: { en: '`type="text"`', ar: '`type="text"`' } },
      { text: { en: '`type="search"`', ar: '`type="search"`' } },
      { text: { en: '`type="password"`', ar: '`type="password"`' } },
    ],
    explain: {
      en: 'The type changes the on-screen keyboard, and `autoComplete` lets the browser or password manager fill it. Both are free usability wins.',
      ar: 'يُغيّر النوع لوحة المفاتيح الظاهرة، وتتيح `autoComplete` للمتصفح أو لمدير كلمات المرور تعبئته. وكلاهما مكسب مجاني في سهولة الاستخدام.',
    },
  },
  {
    id: 'a-fv-20',
    phase: 'forms-and-validation',
    question: {
      en: 'Why keep `<form onSubmit>` instead of a button `onClick`?',
      ar: 'لماذا تُبقي `<form onSubmit>` بدل `onClick` على الزر؟',
    },
    options: [
      { text: { en: 'It gives Enter-to-submit and correct semantics for free.', ar: 'لأنها تمنح الإرسال بمفتاح Enter ودلالات صحيحة مجانًا.' }, correct: true },
      { text: { en: '`onClick` does not work on buttons.', ar: 'لأن `onClick` لا تعمل على الأزرار.' } },
      { text: { en: 'Forms validate automatically without a schema.', ar: 'لأن النماذج تتحقّق تلقائيًا دون مخطّط.' } },
      { text: { en: 'It prevents all page reloads by default.', ar: 'لأنها تمنع كل إعادات تحميل الصفحة افتراضيًا.' } },
    ],
    explain: {
      en: 'Users press Enter in a text field and expect it to submit. Reproducing that on a click handler means reimplementing keyboard behaviour by hand.',
      ar: 'يضغط المستخدمون Enter في حقل نصي متوقّعين الإرسال. وإعادة إنتاج ذلك في معالج نقر تعني إعادة بناء سلوك لوحة المفاتيح يدويًا.',
    },
  },
  {
    id: 'a-fv-21',
    phase: 'forms-and-validation',
    question: {
      en: 'What is the risk of validating only with HTML attributes like `required`?',
      ar: 'ما خطر التحقّق بخصائص HTML فقط مثل `required`؟',
    },
    options: [
      { text: { en: 'Messages and styling are browser-controlled and inconsistent.', ar: 'أن الرسائل والتنسيق يتحكّم فيها المتصفح وغير متّسقة.' }, correct: true },
      { text: { en: 'They do not work at all in React.', ar: 'أنها لا تعمل إطلاقًا في رياكت.' } },
      { text: { en: 'They block form submission permanently.', ar: 'أنها تحجب إرسال النموذج دائمًا.' } },
      { text: { en: 'They are ignored on mobile.', ar: 'أنها تُتجاهَل على الجوّال.' } },
    ],
    explain: {
      en: 'They are a decent baseline and worth keeping for the semantics. They just cannot express cross-field rules or be styled and translated consistently.',
      ar: 'إنها أساس لا بأس به ويستحق الإبقاء عليه لدلالاته. لكنها لا تعبّر عن قواعد بين الحقول ولا تُنسَّق وتُترجَم باتّساق.',
    },
  },
  {
    id: 'a-fv-22',
    phase: 'forms-and-validation',
    question: {
      en: 'A validation error appears after submit but focus stays on the button. What is missing?',
      ar: 'يظهر خطأ تحقّق بعد الإرسال لكن التركيز يبقى على الزر. ما الناقص؟',
    },
    options: [
      { text: { en: 'A live region or focus move, so the error is announced.', ar: 'منطقة حيّة أو نقل تركيز ليُعلَن الخطأ.' }, correct: true },
      { text: { en: 'A red border on the field.', ar: 'حدّ أحمر على الحقل.' } },
      { text: { en: 'A longer error message.', ar: 'رسالة خطأ أطول.' } },
      { text: { en: 'Nothing — this is correct behaviour.', ar: 'لا شيء — فهذا سلوك صحيح.' } },
    ],
    explain: {
      en: 'A screen-reader user gets no signal that anything changed. Either move focus to the first error or announce a summary politely.',
      ar: 'لا يتلقّى مستخدم قارئ الشاشة أي إشارة بأن شيئًا تغيّر. فإما أن تنقل التركيز إلى أول خطأ أو تُعلن ملخّصًا بلطف.',
    },
  },
  {
    id: 'a-fv-23',
    phase: 'forms-and-validation',
    question: {
      en: 'What does `defaultValues` do in `useForm`?',
      ar: 'ماذا تفعل `defaultValues` في `useForm`؟',
    },
    options: [
      { text: { en: 'Seeds the fields and gives `isDirty` something to compare against.', ar: 'تُهيّئ الحقول وتمنح `isDirty` مرجعًا للمقارنة.' }, correct: true },
      { text: { en: 'Sets the validation rules.', ar: 'تضبط قواعد التحقّق.' } },
      { text: { en: 'Locks the fields until they are edited.', ar: 'تُقفل الحقول حتى تُعدَّل.' } },
      { text: { en: 'Submits those values if the form is empty.', ar: 'ترسل تلك القيم إذا كان النموذج فارغًا.' } },
    ],
    explain: {
      en: 'Without a baseline the library cannot tell edited from untouched, so an "unsaved changes" prompt has nothing to work from.',
      ar: 'بدون خطّ أساس لا تستطيع المكتبة تمييز المُعدَّل من غير الملموس، فلا يجد تنبيه «تغييرات غير محفوظة» ما ينطلق منه.',
    },
  },
  {
    id: 'a-fv-24',
    phase: 'forms-and-validation',
    question: {
      en: 'When editing an existing record, when should `defaultValues` be applied?',
      ar: 'عند تحرير سجل موجود، متى يجب تطبيق `defaultValues`؟',
    },
    options: [
      { text: { en: 'Once the record has loaded — reset the form with it.', ar: 'بعد تحميل السجل — أعِد ضبط النموذج به.' }, correct: true },
      { text: { en: 'On first render, before the fetch resolves.', ar: 'في العرض الأول قبل حسم الجلب.' } },
      { text: { en: 'On every render.', ar: 'في كل عرض.' } },
      { text: { en: 'Only after the first edit.', ar: 'بعد أول تعديل فقط.' } },
    ],
    explain: {
      en: 'Defaults are read at initialisation, so passing data that arrives later does nothing. Reset the form when the data lands, or key the form on the record id.',
      ar: 'تُقرأ القيم الافتراضية عند التهيئة، فتمرير بيانات تصل لاحقًا لا يفعل شيئًا. أعِد ضبط النموذج عند وصول البيانات أو اربط مفتاحه بمعرّف السجل.',
    },
  },
  {
    id: 'a-fv-25',
    phase: 'forms-and-validation',
    question: {
      en: 'Which is the strongest reason to share one schema between client and server?',
      ar: 'ما أقوى سبب لمشاركة مخطّط واحد بين العميل والخادم؟',
    },
    options: [
      { text: { en: 'The two can never disagree about what valid input means.', ar: 'أن الطرفين لا يمكن أن يختلفا أبدًا حول معنى المُدخل الصالح.' }, correct: true },
      { text: { en: 'It halves the bundle size.', ar: 'أنه ينصّف حجم الحزمة.' } },
      { text: { en: 'It removes the need for server validation.', ar: 'أنه يُلغي الحاجة لتحقّق الخادم.' } },
      { text: { en: 'It makes the form render faster.', ar: 'أنه يجعل النموذج يُعرض أسرع.' } },
    ],
    explain: {
      en: 'Two hand-maintained copies drift, and the symptom is a form that passes locally then fails on the server with a worse message.',
      ar: 'النسختان المصانتان يدويًا تفترقان، والعَرَض نموذج ينجح محليًا ثم يفشل على الخادم برسالة أسوأ.',
    },
  },

  // --------------------------------------------------------------- phase 12
  {
    id: 'a-r19-01',
    phase: 'react-19-features',
    question: {
      en: 'What does the React Compiler do to your components?',
      ar: 'ماذا يفعل مُصرِّف رياكت بمكوّناتك؟',
    },
    options: [
      { text: { en: 'Inserts memoisation automatically, so most manual `useMemo` becomes unnecessary.', ar: 'يُدرج التخزين تلقائيًا، فيصبح معظم `useMemo` اليدوي غير ضروري.' }, correct: true },
      { text: { en: 'Converts JSX into HTML at build time.', ar: 'يحوّل JSX إلى HTML وقت البناء.' } },
      { text: { en: 'Compiles components into web components.', ar: 'يُصرّف المكوّنات إلى مكوّنات ويب.' } },
      { text: { en: 'Removes unused components from the bundle.', ar: 'يحذف المكوّنات غير المستخدمة من الحزمة.' } },
    ],
    explain: {
      en: 'It analyses what a component reads and caches accordingly. It relies on your code following the Rules of React — it will skip anything it cannot prove safe.',
      ar: 'يحلّل ما يقرؤه المكوّن ويخزّن وفق ذلك. ويعتمد على التزام كودك بقواعد رياكت — إذ يتخطّى ما لا يستطيع إثبات أمانه.',
    },
  },
  {
    id: 'a-r19-02',
    phase: 'react-19-features',
    question: {
      en: 'What does `useActionState` return?',
      ar: 'ماذا تُعيد `useActionState`؟',
    },
    options: [
      { text: { en: 'The current state, an action to pass to a form, and a pending flag.', ar: 'الحالة الحالية وإجراءً يُمرَّر للنموذج وعَلَم انتظار.' }, correct: true },
      { text: { en: 'Just the form values.', ar: 'قيم النموذج فقط.' } },
      { text: { en: 'A promise resolving to the response.', ar: 'وعدًا يُحسم بالاستجابة.' } },
      { text: { en: 'A reducer and a dispatch function.', ar: 'مُختزِلًا ودالة إرسال.' } },
    ],
    explain: {
      en: 'The pending flag is the part that removes boilerplate — no more `const [loading, setLoading] = useState(false)` wrapped around every submit.',
      ar: 'عَلَم الانتظار هو ما يزيل الكود المتكرّر — فلا حاجة بعد الآن لـ `const [loading, setLoading] = useState(false)` حول كل إرسال.',
    },
  },
  {
    id: 'a-r19-03',
    phase: 'react-19-features',
    question: {
      en: 'What makes the `use()` hook different from every other hook?',
      ar: 'ما الذي يجعل خطّاف `use()` مختلفًا عن كل الخطّافات الأخرى؟',
    },
    options: [
      { text: { en: 'It may be called conditionally, including inside an `if`.', ar: 'أنه يمكن استدعاؤه شرطيًا بما في ذلك داخل `if`.' }, correct: true },
      { text: { en: 'It can only be called once per component.', ar: 'أنه يُستدعى مرة واحدة لكل مكوّن.' } },
      { text: { en: 'It runs only on the server.', ar: 'أنه يعمل على الخادم فقط.' } },
      { text: { en: 'It does not need to be inside a component.', ar: 'أنه لا يحتاج أن يكون داخل مكوّن.' } },
    ],
    explain: {
      en: 'It reads a promise or a context and is exempt from the top-level rule. Reading a promise suspends the component until it resolves.',
      ar: 'يقرأ وعدًا أو سياقًا وهو مستثنى من قاعدة المستوى الأعلى. وقراءة الوعد تُعلّق المكوّن حتى يُحسم.',
    },
  },
  {
    id: 'a-r19-04',
    phase: 'react-19-features',
    question: {
      en: 'What does `useOptimistic` give you during a pending action?',
      ar: 'ماذا تمنحك `useOptimistic` أثناء إجراء معلّق؟',
    },
    options: [
      { text: { en: 'A temporary state showing the expected result, reverted automatically when the action settles.', ar: 'حالة مؤقتة تُظهر النتيجة المتوقّعة وتُستعاد تلقائيًا عند حسم الإجراء.' }, correct: true },
      { text: { en: 'A cached copy of the previous state.', ar: 'نسخة مخزّنة من الحالة السابقة.' } },
      { text: { en: 'Automatic retries on failure.', ar: 'إعادة محاولة تلقائية عند الفشل.' } },
      { text: { en: 'A queue of pending requests.', ar: 'طابور من الطلبات المعلّقة.' } },
    ],
    explain: {
      en: 'The automatic revert is the important half. When the real state arrives — success or failure — the optimistic value simply disappears.',
      ar: 'الاستعادة التلقائية هي النصف المهم. فحين تصل الحالة الحقيقية — نجاحًا أو فشلًا — تختفي القيمة التفاؤلية ببساطة.',
    },
  },
  {
    id: 'a-r19-05',
    phase: 'react-19-features',
    question: {
      en: 'Which is true of a Server Component?',
      ar: 'ما الصحيح بشأن مكوّن الخادم؟',
    },
    options: [
      { text: { en: 'It runs only on the server and ships no JavaScript to the browser.', ar: 'أنه يعمل على الخادم فقط ولا يُرسل جافاسكربت إلى المتصفح.' }, correct: true },
      { text: { en: 'It runs on the server first, then hydrates on the client.', ar: 'أنه يعمل على الخادم أولًا ثم يترطّب على العميل.' } },
      { text: { en: 'It can use `useState` as normal.', ar: 'أنه يستطيع استخدام `useState` كالمعتاد.' } },
      { text: { en: 'It replaces Client Components entirely.', ar: 'أنه يحلّ محلّ مكوّنات العميل بالكامل.' } },
    ],
    explain: {
      en: 'No state, no effects, no browser APIs, no event handlers — and in exchange, its code never reaches the bundle. That last part is the whole point.',
      ar: 'لا حالة ولا تأثيرات ولا واجهات متصفح ولا معالجات أحداث — وفي المقابل لا يصل كوده إلى الحزمة أبدًا. وهذا الجزء الأخير هو الغاية كلها.',
    },
  },
  {
    id: 'a-r19-06',
    phase: 'react-19-features',
    question: {
      en: 'What does `"use client"` at the top of a file mark?',
      ar: 'ماذا يُعلّم `"use client"` في أعلى الملف؟',
    },
    options: [
      { text: { en: 'The boundary where the client bundle begins.', ar: 'الحدّ الذي تبدأ عنده حزمة العميل.' }, correct: true },
      { text: { en: 'That the file runs only in the browser and never on the server.', ar: 'أن الملف يعمل في المتصفح فقط ولا يعمل على الخادم أبدًا.' } },
      { text: { en: 'That the component is interactive.', ar: 'أن المكوّن تفاعلي.' } },
      { text: { en: 'That server rendering is disabled for it.', ar: 'أن العرض من الخادم مُعطّل له.' } },
    ],
    explain: {
      en: 'Client Components still render on the server for the initial HTML — they just also ship to the browser to hydrate. Everything imported below the boundary joins the bundle.',
      ar: 'ما زالت مكوّنات العميل تُعرض على الخادم لإنتاج HTML الأولي — لكنها تُشحن أيضًا للمتصفح للترطيب. وكل ما يُستورد تحت الحدّ ينضمّ إلى الحزمة.',
    },
  },
  {
    id: 'a-r19-07',
    phase: 'react-19-features',
    question: {
      en: 'What does marking an update with `startTransition` change?',
      ar: 'ماذا يُغيّر تعليم تحديث بـ `startTransition`؟',
    },
    options: [
      { text: { en: 'It becomes interruptible, so urgent updates like typing stay responsive.', ar: 'يصبح قابلًا للمقاطعة، فتبقى التحديثات العاجلة كالكتابة سريعة الاستجابة.' }, correct: true },
      { text: { en: 'It is delayed by a fixed timeout.', ar: 'يتأخّر بمهلة ثابتة.' } },
      { text: { en: 'It runs in a web worker.', ar: 'يعمل في عامل ويب.' } },
      { text: { en: 'It is cancelled if it takes too long.', ar: 'يُلغى إذا استغرق وقتًا طويلًا.' } },
    ],
    explain: {
      en: 'The classic case is a search box filtering a huge list: the keystroke stays urgent while the expensive list re-render yields to it.',
      ar: 'الحالة الكلاسيكية مربّع بحث يُرشّح قائمة ضخمة: تبقى ضغطة المفتاح عاجلة بينما تتنازل إعادة عرض القائمة المكلفة لها.',
    },
  },
  {
    id: 'a-r19-08',
    phase: 'react-19-features',
    question: {
      en: 'What does `<Suspense fallback={...}>` show the fallback for?',
      ar: 'لماذا تعرض `<Suspense fallback={...}>` البديل؟',
    },
    options: [
      { text: { en: 'While a child is suspended — loading lazily or waiting on a promise.', ar: 'بينما يكون ابن معلّقًا — يُحمَّل بكسل أو ينتظر وعدًا.' }, correct: true },
      { text: { en: 'While a child throws an error.', ar: 'بينما يُطلق ابن خطأً.' } },
      { text: { en: 'Whenever any state updates.', ar: 'كلما تحدّثت أي حالة.' } },
      { text: { en: 'Only on the initial page load.', ar: 'عند تحميل الصفحة الأول فقط.' } },
    ],
    explain: {
      en: 'Errors are a different mechanism — that is an error boundary. Suspense is specifically about "not ready yet", not "went wrong".',
      ar: 'الأخطاء آلية مختلفة — فتلك حدود خطأ. أما Suspense فتخصّ «ليس جاهزًا بعد» لا «حدث خطأ».',
    },
  },
  {
    id: 'a-r19-09',
    phase: 'react-19-features',
    question: {
      en: 'What is `useEffectEvent` for?',
      ar: 'فيمَ تُستخدم `useEffectEvent`؟',
    },
    options: [
      { text: { en: 'Reading the latest props or state inside an effect without making them dependencies.', ar: 'قراءة أحدث الخصائص أو الحالة داخل تأثير دون جعلها اعتماديات.' }, correct: true },
      { text: { en: 'Attaching DOM event listeners.', ar: 'ربط مستمعي أحداث DOM.' } },
      { text: { en: 'Replacing `useCallback`.', ar: 'استبدال `useCallback`.' } },
      { text: { en: 'Dispatching custom events.', ar: 'إرسال أحداث مخصّصة.' } },
    ],
    explain: {
      en: 'It separates the reactive part from the non-reactive part. An analytics call reading the current theme should not cause the effect to re-run when the theme changes.',
      ar: 'تفصل الجزء التفاعلي عن غير التفاعلي. فاستدعاء تحليلات يقرأ المظهر الحالي لا ينبغي أن يُعيد تشغيل التأثير عند تغيّر المظهر.',
    },
  },
  {
    id: 'a-r19-10',
    phase: 'react-19-features',
    question: {
      en: 'What does `<Activity mode="hidden">` do that unmounting does not?',
      ar: 'ماذا تفعل `<Activity mode="hidden">` ولا يفعله الإزالة؟',
    },
    options: [
      { text: { en: 'Keeps the subtree\'s state alive while it is not visible.', ar: 'تُبقي حالة الشجرة الفرعية حيّة وهي غير مرئية.' }, correct: true },
      { text: { en: 'Removes it from the bundle.', ar: 'تحذفها من الحزمة.' } },
      { text: { en: 'Renders it on the server only.', ar: 'تعرضها على الخادم فقط.' } },
      { text: { en: 'Prevents it from ever rendering.', ar: 'تمنعها من العرض إطلاقًا.' } },
    ],
    explain: {
      en: 'Switching tabs no longer throws away scroll position and form input. Unmounting loses all of it; `display: none` keeps it but still costs the same render work.',
      ar: 'لم يعد تبديل التبويبات يرمي موضع التمرير ومُدخلات النموذج. فالإزالة تفقدها كلها، و `display: none` يُبقيها لكن بتكلفة العرض نفسها.',
    },
  },
  {
    id: 'a-r19-11',
    phase: 'react-19-features',
    question: {
      en: 'In React 19, how do you forward a ref to a function component?',
      ar: 'في رياكت 19 كيف تُمرّر مرجعًا إلى مكوّن دالّي؟',
    },
    options: [
      { text: { en: 'Accept `ref` as an ordinary prop — `forwardRef` is no longer needed.', ar: 'اقبل `ref` كخاصية عادية — فلم تعد `forwardRef` مطلوبة.' }, correct: true },
      { text: { en: 'Wrap the component in `forwardRef`, as before.', ar: 'غلّف المكوّن بـ `forwardRef` كما في السابق.' } },
      { text: { en: 'Use `useImperativeHandle` instead.', ar: 'استخدم `useImperativeHandle` بدلًا منها.' } },
      { text: { en: 'Pass it as `innerRef`.', ar: 'مرّرها باسم `innerRef`.' } },
    ],
    explain: {
      en: '`ref` became a regular prop for function components. `forwardRef` still works, so existing code is fine, but new code does not need the wrapper.',
      ar: 'أصبحت `ref` خاصية عادية للمكوّنات الدالّية. وما زالت `forwardRef` تعمل فالكود القائم بخير، لكن الكود الجديد لا يحتاج الغلاف.',
    },
  },
  {
    id: 'a-r19-12',
    phase: 'react-19-features',
    question: {
      en: 'What is an Action, in React 19 terms?',
      ar: 'ما الإجراء (Action) بمصطلحات رياكت 19؟',
    },
    options: [
      { text: { en: 'An async function React manages, tracking pending, error and optimistic state.', ar: 'دالة غير متزامنة تديرها رياكت وتتتبّع حالات الانتظار والخطأ والتفاؤل.' }, correct: true },
      { text: { en: 'A Redux-style dispatched object.', ar: 'كائنًا مُرسَلًا بأسلوب Redux.' } },
      { text: { en: 'A DOM event handler.', ar: 'معالج حدث DOM.' } },
      { text: { en: 'A server-only route handler.', ar: 'معالج مسار على الخادم فقط.' } },
    ],
    explain: {
      en: 'Passing one to `<form action={...}>` lets React own the submission lifecycle, which is what `useActionState` and `useFormStatus` read from.',
      ar: 'تمريره إلى `<form action={...}>` يجعل رياكت تملك دورة حياة الإرسال، وهو ما تقرأ منه `useActionState` و `useFormStatus`.',
    },
  },
  {
    id: 'a-r19-13',
    phase: 'react-19-features',
    question: {
      en: 'What does `useFormStatus` read, and where must it be called?',
      ar: 'ماذا تقرأ `useFormStatus` وأين يجب استدعاؤها؟',
    },
    options: [
      { text: { en: 'The parent form\'s pending state, from a component inside that form.', ar: 'حالة انتظار النموذج الأب، من مكوّن داخل ذلك النموذج.' }, correct: true },
      { text: { en: 'Any form on the page, from anywhere.', ar: 'أي نموذج في الصفحة ومن أي مكان.' } },
      { text: { en: 'The form\'s values, from the form component itself.', ar: 'قيم النموذج من مكوّن النموذج نفسه.' } },
      { text: { en: 'The server response, after submit.', ar: 'استجابة الخادم بعد الإرسال.' } },
    ],
    explain: {
      en: 'It reads from context, so calling it in the same component that renders the `<form>` returns nothing useful — it has to be in a child, such as the submit button.',
      ar: 'تقرأ من السياق، فاستدعاؤها في المكوّن نفسه الذي يعرض `<form>` لا يُعيد شيئًا مفيدًا — بل يجب أن تكون في ابن مثل زر الإرسال.',
    },
  },
  {
    id: 'a-r19-14',
    phase: 'react-19-features',
    question: {
      en: 'Why can a Server Component not use `onClick`?',
      ar: 'لماذا لا يستطيع مكوّن الخادم استخدام `onClick`؟',
    },
    options: [
      { text: { en: 'Its JavaScript never reaches the browser, so there is nothing to attach.', ar: 'لأن جافاسكربت الخاصة به لا تصل إلى المتصفح، فلا يوجد ما يُربط.' }, correct: true },
      { text: { en: 'React forbids handlers in async components.', ar: 'لأن رياكت تمنع المعالجات في المكوّنات غير المتزامنة.' } },
      { text: { en: 'Server Components render to plain strings.', ar: 'لأن مكوّنات الخادم تُعرض إلى نصوص عادية.' } },
      { text: { en: 'Handlers are only allowed on native elements.', ar: 'لأن المعالجات مسموحة على العناصر الأصلية فقط.' } },
    ],
    explain: {
      en: 'A function cannot be serialised and sent. Anything interactive lives in a Client Component, which is why the two compose rather than compete.',
      ar: 'لا يمكن تسلسل دالة وإرسالها. فكل ما هو تفاعلي يعيش في مكوّن عميل، ولهذا يتكاملان بدل أن يتنافسا.',
    },
  },
  {
    id: 'a-r19-15',
    phase: 'react-19-features',
    question: {
      en: 'What must be true of data passed from a Server to a Client Component?',
      ar: 'ما الذي يجب توفّره في البيانات المُمرَّرة من مكوّن خادم إلى مكوّن عميل؟',
    },
    options: [
      { text: { en: 'It must be serialisable — no functions or class instances.', ar: 'أن تكون قابلة للتسلسل — بلا دوال أو نسخ أصناف.' }, correct: true },
      { text: { en: 'It must be under 1 MB.', ar: 'أن تكون أقل من ميغابايت.' } },
      { text: { en: 'It must be an array.', ar: 'أن تكون مصفوفة.' } },
      { text: { en: 'It must be fetched with `use()`.', ar: 'أن تُجلب بـ `use()`.' } },
    ],
    explain: {
      en: 'The props cross a network boundary. A `Date` or a plain object is fine; a callback or a class instance cannot make the trip.',
      ar: 'تعبر الخصائص حدًّا شبكيًا. فـ `Date` أو كائن عادي لا بأس بهما، أما دالة رد نداء أو نسخة صنف فلا تستطيع العبور.',
    },
  },
  {
    id: 'a-r19-16',
    phase: 'react-19-features',
    question: {
      en: 'What does `isPending` from `useTransition` tell you?',
      ar: 'بمَ تخبرك `isPending` من `useTransition`؟',
    },
    options: [
      { text: { en: 'That a transition update is still rendering in the background.', ar: 'أن تحديث انتقال ما زال يُعرض في الخلفية.' }, correct: true },
      { text: { en: 'That a network request is in flight.', ar: 'أن طلبًا شبكيًا جارٍ.' } },
      { text: { en: 'That the component is suspended.', ar: 'أن المكوّن معلّق.' } },
      { text: { en: 'That an error occurred.', ar: 'أن خطأً وقع.' } },
    ],
    explain: {
      en: 'It is about React\'s own rendering work, not the network. It is what lets you dim stale results instead of replacing them with a spinner.',
      ar: 'تتعلّق بعمل العرض في رياكت لا بالشبكة. وهي ما يتيح لك تعتيم النتائج القديمة بدل استبدالها بأيقونة تحميل.',
    },
  },
  {
    id: 'a-r19-17',
    phase: 'react-19-features',
    question: {
      en: 'Which code does the React Compiler struggle with?',
      ar: 'أي كود يواجه مُصرِّف رياكت صعوبة معه؟',
    },
    options: [
      { text: { en: 'Code that mutates props or state during render.', ar: 'كود يُعدّل الخصائص أو الحالة أثناء العرض.' }, correct: true },
      { text: { en: 'Components with many props.', ar: 'مكوّنات بخصائص كثيرة.' } },
      { text: { en: 'Deeply nested JSX.', ar: 'JSX عميقة التداخل.' } },
      { text: { en: 'TypeScript generics.', ar: 'أنواع تايب سكربت العامة.' } },
    ],
    explain: {
      en: 'Its guarantees depend on purity. Where it cannot prove a component follows the rules it bails out and leaves that component uncompiled.',
      ar: 'تعتمد ضماناته على النقاء. فحيث لا يستطيع إثبات التزام المكوّن بالقواعد ينسحب ويترك ذلك المكوّن دون تصريف.',
    },
  },
  {
    id: 'a-r19-18',
    phase: 'react-19-features',
    question: {
      en: 'Reading a promise with `use()` inside a component does what?',
      ar: 'قراءة وعد بـ `use()` داخل مكوّن تفعل ماذا؟',
    },
    options: [
      { text: { en: 'Suspends the component until it resolves, then returns the value.', ar: 'تُعلّق المكوّن حتى يُحسم ثم تُعيد القيمة.' }, correct: true },
      { text: { en: 'Returns `undefined` until it resolves.', ar: 'تُعيد `undefined` حتى يُحسم.' } },
      { text: { en: 'Blocks the main thread.', ar: 'تحجب الخيط الرئيسي.' } },
      { text: { en: 'Throws unless wrapped in `try`.', ar: 'تُطلق خطأً ما لم تُغلَّف بـ `try`.' } },
    ],
    explain: {
      en: 'It needs a `<Suspense>` boundary above it to show something meanwhile. Creating the promise during render is the trap — it would be new every time.',
      ar: 'تحتاج حدود `<Suspense>` فوقها لعرض شيء في الأثناء. والفخّ هو إنشاء الوعد أثناء العرض — إذ سيكون جديدًا في كل مرة.',
    },
  },
  {
    id: 'a-r19-19',
    phase: 'react-19-features',
    question: {
      en: 'Can `use()` read a context?',
      ar: 'هل تستطيع `use()` قراءة سياق؟',
    },
    options: [
      { text: { en: 'Yes — and unlike `useContext`, it can be called conditionally.', ar: 'نعم — وخلافًا لـ `useContext` يمكن استدعاؤها شرطيًا.' }, correct: true },
      { text: { en: 'No, it only accepts promises.', ar: 'لا، فهي تقبل الوعود فقط.' } },
      { text: { en: 'Only inside Server Components.', ar: 'داخل مكوّنات الخادم فقط.' } },
      { text: { en: 'Only with a default value.', ar: 'مع قيمة افتراضية فقط.' } },
    ],
    explain: {
      en: 'That flexibility is the reason it exists as a new primitive rather than an addition to `useContext`.',
      ar: 'هذه المرونة هي سبب وجودها كأساس جديد بدل أن تكون إضافة إلى `useContext`.',
    },
  },
  {
    id: 'a-r19-20',
    phase: 'react-19-features',
    question: {
      en: 'What happens to an optimistic message if the send fails?',
      ar: 'ماذا يحدث لرسالة تفاؤلية إذا فشل الإرسال؟',
    },
    options: [
      { text: { en: 'It disappears when the action settles, since state reverts to the real value.', ar: 'تختفي عند حسم الإجراء لأن الحالة تعود للقيمة الحقيقية.' }, correct: true },
      { text: { en: 'It stays until manually removed.', ar: 'تبقى حتى تُحذف يدويًا.' } },
      { text: { en: 'It is retried automatically.', ar: 'يُعاد إرسالها تلقائيًا.' } },
      { text: { en: 'The whole list is cleared.', ar: 'تُمسح القائمة كلها.' } },
    ],
    explain: {
      en: 'Which means you still owe the user an error message. Silent disappearance looks like the message was sent and then lost.',
      ar: 'وهذا يعني أنك ما زلت مدينًا للمستخدم برسالة خطأ. فالاختفاء الصامت يبدو وكأن الرسالة أُرسلت ثم ضاعت.',
    },
  },
  {
    id: 'a-r19-21',
    phase: 'react-19-features',
    question: {
      en: 'What is the main bundle-size argument for Server Components?',
      ar: 'ما الحجّة الرئيسية المتعلّقة بحجم الحزمة لمكوّنات الخادم؟',
    },
    options: [
      { text: { en: 'Their dependencies never ship — a heavy markdown parser stays on the server.', ar: 'أن اعتمادياتها لا تُشحن أبدًا — فمحلّل markdown الثقيل يبقى على الخادم.' }, correct: true },
      { text: { en: 'They compress better.', ar: 'أنها تُضغط بشكل أفضل.' } },
      { text: { en: 'They remove the need for code splitting.', ar: 'أنها تُلغي الحاجة لتقسيم الكود.' } },
      { text: { en: 'They are minified more aggressively.', ar: 'أنها تُصغَّر بشكل أقوى.' } },
    ],
    explain: {
      en: 'A dependency used only in a Server Component costs the browser nothing at all — not a smaller download, but zero.',
      ar: 'الاعتمادية المستخدمة في مكوّن خادم فقط لا تكلّف المتصفح شيئًا إطلاقًا — ليس تنزيلًا أصغر بل صفرًا.',
    },
  },
  {
    id: 'a-r19-22',
    phase: 'react-19-features',
    question: {
      en: 'Where should a `<Suspense>` boundary usually be placed?',
      ar: 'أين يجب وضع حدود `<Suspense>` عادةً؟',
    },
    options: [
      { text: { en: 'Around the section that can load independently, not the whole page.', ar: 'حول القسم الذي يمكن تحميله باستقلال لا حول الصفحة كلها.' }, correct: true },
      { text: { en: 'At the root, always.', ar: 'عند الجذر دائمًا.' } },
      { text: { en: 'Around every single component.', ar: 'حول كل مكوّن على حدة.' } },
      { text: { en: 'Inside the suspending component itself.', ar: 'داخل المكوّن المعلَّق نفسه.' } },
    ],
    explain: {
      en: 'One root boundary means a slow widget blanks the entire page. Placement is a design decision about what the user sees while waiting.',
      ar: 'حدود جذرية واحدة تعني أن أداة بطيئة تُفرغ الصفحة كلها. فالموضع قرار تصميمي حول ما يراه المستخدم أثناء الانتظار.',
    },
  },
  {
    id: 'a-r19-23',
    phase: 'react-19-features',
    question: {
      en: 'What does React 19 do with a `<title>` rendered deep inside a component?',
      ar: 'ماذا تفعل رياكت 19 بوسم `<title>` معروض في عمق مكوّن؟',
    },
    options: [
      { text: { en: 'Hoists it into the document head automatically.', ar: 'ترفعه إلى رأس المستند تلقائيًا.' }, correct: true },
      { text: { en: 'Renders it inline as text.', ar: 'تعرضه مضمّنًا كنص.' } },
      { text: { en: 'Ignores it.', ar: 'تتجاهله.' } },
      { text: { en: 'Throws a warning.', ar: 'تُطلق تحذيرًا.' } },
    ],
    explain: {
      en: 'The same applies to `<meta>` and `<link>`, which removes the need for a separate head-management library in many apps.',
      ar: 'وينطبق الأمر نفسه على `<meta>` و `<link>`، ما يُلغي الحاجة إلى مكتبة منفصلة لإدارة الرأس في تطبيقات كثيرة.',
    },
  },
  {
    id: 'a-r19-24',
    phase: 'react-19-features',
    question: {
      en: 'Why does the compiler not remove the need to understand re-rendering?',
      ar: 'لماذا لا يُلغي المُصرِّف الحاجة لفهم إعادة العرض؟',
    },
    options: [
      { text: { en: 'It caches computation but cannot fix badly-placed state or structure.', ar: 'لأنه يخزّن الحسابات لكنه لا يُصلح حالة أو بنية موضوعة في غير مكانها.' }, correct: true },
      { text: { en: 'It only works in development.', ar: 'لأنه يعمل في التطوير فقط.' } },
      { text: { en: 'It is disabled by default in React 19.', ar: 'لأنه معطّل افتراضيًا في رياكت 19.' } },
      { text: { en: 'It only handles class components.', ar: 'لأنه يتعامل مع مكوّنات الأصناف فقط.' } },
    ],
    explain: {
      en: 'State at the wrong level still re-renders a large subtree. Memoisation was always the second-best fix; structure is the first.',
      ar: 'الحالة في المستوى الخطأ ما زالت تُعيد عرض شجرة فرعية كبيرة. فالتخزين كان دائمًا الحلّ الثاني، والبنية هي الأول.',
    },
  },
  {
    id: 'a-r19-25',
    phase: 'react-19-features',
    question: {
      en: 'What is the relationship between an Action and a Server Function?',
      ar: 'ما العلاقة بين الإجراء ودالة الخادم؟',
    },
    options: [
      { text: { en: 'A Server Function can be used as an Action; Actions also work fully client-side.', ar: 'يمكن استخدام دالة الخادم كإجراء، والإجراءات تعمل أيضًا على العميل بالكامل.' }, correct: true },
      { text: { en: 'They are the same thing.', ar: 'إنهما الشيء نفسه.' } },
      { text: { en: 'Actions require a server.', ar: 'الإجراءات تتطلّب خادمًا.' } },
      { text: { en: 'Server Functions cannot be used in forms.', ar: 'دوال الخادم لا تُستخدم في النماذج.' } },
    ],
    explain: {
      en: 'Actions are a client-side concept about pending and error handling. Server Functions are one thing you can call from inside them.',
      ar: 'الإجراءات مفهوم على جهة العميل يخصّ الانتظار ومعالجة الأخطاء. أما دوال الخادم فشيء يمكنك استدعاؤه من داخلها.',
    },
  },
  {
    id: 'a-r19-26',
    phase: 'react-19-features',
    question: {
      en: 'A search input filters a 10,000-row table and typing lags. Which tool fits best?',
      ar: 'حقل بحث يُرشّح جدولًا بعشرة آلاف صف والكتابة متلعثمة. أي أداة تناسب أكثر؟',
    },
    options: [
      { text: { en: '`useDeferredValue` on the query used by the table.', ar: '`useDeferredValue` على الاستعلام الذي يستخدمه الجدول.' }, correct: true },
      { text: { en: '`useMemo` on the input value.', ar: '`useMemo` على قيمة الحقل.' } },
      { text: { en: '`useRef` for the input.', ar: '`useRef` للحقل.' } },
      { text: { en: '`useEffect` with a timeout.', ar: '`useEffect` مع مهلة.' } },
    ],
    explain: {
      en: 'The input keeps the urgent value so typing stays instant, while the table renders from a value that lags behind — no manual debounce needed.',
      ar: 'يحتفظ الحقل بالقيمة العاجلة فتبقى الكتابة فورية، بينما يُعرض الجدول من قيمة متأخّرة — دون أي تأخير يدوي.',
    },
  },
  {
    id: 'a-r19-27',
    phase: 'react-19-features',
    question: {
      en: 'What is hydration?',
      ar: 'ما الترطيب (hydration)؟',
    },
    options: [
      { text: { en: 'Attaching React and its handlers to server-rendered HTML already on the page.', ar: 'ربط رياكت ومعالجاتها بـ HTML المعروض من الخادم والموجود في الصفحة.' }, correct: true },
      { text: { en: 'Fetching data after mount.', ar: 'جلب البيانات بعد التركيب.' } },
      { text: { en: 'Rebuilding the DOM from scratch on load.', ar: 'إعادة بناء DOM من الصفر عند التحميل.' } },
      { text: { en: 'Caching HTML on a CDN.', ar: 'تخزين HTML على شبكة توزيع.' } },
    ],
    explain: {
      en: 'A hydration mismatch warning means the server and client produced different markup — often from reading a date or a random value during render.',
      ar: 'تحذير عدم تطابق الترطيب يعني أن الخادم والعميل أنتجا وسومًا مختلفة — غالبًا بقراءة تاريخ أو قيمة عشوائية أثناء العرض.',
    },
  },
  {
    id: 'a-r19-28',
    phase: 'react-19-features',
    question: {
      en: 'What is a common cause of a hydration mismatch?',
      ar: 'ما السبب الشائع لعدم تطابق الترطيب؟',
    },
    options: [
      { text: { en: 'Rendering `Date.now()`, a random value or `window` during render.', ar: 'عرض `Date.now()` أو قيمة عشوائية أو `window` أثناء العرض.' }, correct: true },
      { text: { en: 'Using too many components.', ar: 'استخدام مكوّنات كثيرة جدًا.' } },
      { text: { en: 'Importing CSS.', ar: 'استيراد CSS.' } },
      { text: { en: 'Passing too many props.', ar: 'تمرير خصائص كثيرة جدًا.' } },
    ],
    explain: {
      en: 'The server rendered one value and the browser produced another. Move it to an effect, or render a stable placeholder for the first pass.',
      ar: 'عرض الخادم قيمة وأنتج المتصفح أخرى. انقلها إلى تأثير أو اعرض عنصرًا نائبًا ثابتًا في المرور الأول.',
    },
  },
  {
    id: 'a-r19-29',
    phase: 'react-19-features',
    question: {
      en: 'Which is NOT allowed inside a Server Component?',
      ar: 'أيٌّ غير مسموح داخل مكوّن خادم؟',
    },
    options: [
      { text: { en: '`useState`', ar: '`useState`' }, correct: true },
      { text: { en: '`await` on a database query', ar: '`await` على استعلام قاعدة بيانات' } },
      { text: { en: 'Rendering a Client Component', ar: 'عرض مكوّن عميل' } },
      { text: { en: 'Reading a file from disk', ar: 'قراءة ملف من القرص' } },
    ],
    explain: {
      en: 'It renders once and is gone — there is no re-render for state to trigger. Server Components can be `async`, which Client Components cannot.',
      ar: 'يُعرض مرة واحدة ثم ينتهي — فلا إعادة عرض تُحفّزها الحالة. ويمكن لمكوّنات الخادم أن تكون `async` وهو ما لا تستطيعه مكوّنات العميل.',
    },
  },
  {
    id: 'a-r19-30',
    phase: 'react-19-features',
    question: {
      en: 'Why is `useOptimistic` better than manually setting state before the request?',
      ar: 'لماذا تُعدّ `useOptimistic` أفضل من ضبط الحالة يدويًا قبل الطلب؟',
    },
    options: [
      { text: { en: 'React reverts it automatically, so you cannot forget the rollback.', ar: 'لأن رياكت تستعيدها تلقائيًا فلا يمكنك نسيان التراجع.' }, correct: true },
      { text: { en: 'It is faster.', ar: 'لأنها أسرع.' } },
      { text: { en: 'It retries the request.', ar: 'لأنها تُعيد محاولة الطلب.' } },
      { text: { en: 'It validates the payload.', ar: 'لأنها تتحقّق من الحمولة.' } },
    ],
    explain: {
      en: 'Hand-rolled optimism usually gets the happy path right and the failure path wrong — leaving the UI showing something the server rejected.',
      ar: 'التفاؤل المكتوب يدويًا يُصيب مسار النجاح ويُخطئ مسار الفشل عادةً — فتبقى الواجهة تعرض شيئًا رفضه الخادم.',
    },
  },
  {
    id: 'a-r19-31',
    phase: 'react-19-features',
    question: {
      en: 'How does a Client Component receive a Server Component as a child?',
      ar: 'كيف يستقبل مكوّن العميل مكوّن خادم كابن؟',
    },
    options: [
      { text: { en: 'Passed as `children` from a server parent, already rendered.', ar: 'يُمرَّر كـ `children` من أب على الخادم بعد عرضه.' }, correct: true },
      { text: { en: 'By importing it directly.', ar: 'باستيراده مباشرةً.' } },
      { text: { en: 'With a dynamic import.', ar: 'باستيراد ديناميكي.' } },
      { text: { en: 'It is impossible.', ar: 'هذا مستحيل.' } },
    ],
    explain: {
      en: 'Importing a Server Component into a client file turns it into client code. Passing it through the children slot keeps it on the server.',
      ar: 'استيراد مكوّن خادم داخل ملف عميل يحوّله إلى كود عميل. أما تمريره عبر فتحة الأبناء فيُبقيه على الخادم.',
    },
  },
  {
    id: 'a-r19-32',
    phase: 'react-19-features',
    question: {
      en: 'What does the compiler assume about a component that reads `Math.random()` in render?',
      ar: 'ماذا يفترض المُصرِّف عن مكوّن يقرأ `Math.random()` أثناء العرض؟',
    },
    options: [
      { text: { en: 'That it is impure, so it cannot safely cache it.', ar: 'أنه غير نقي فلا يستطيع تخزينه بأمان.' }, correct: true },
      { text: { en: 'That it should re-render on a timer.', ar: 'أنه يجب أن يُعاد عرضه عبر مؤقّت.' } },
      { text: { en: 'That the value is constant.', ar: 'أن القيمة ثابتة.' } },
      { text: { en: 'Nothing — randomness is fine.', ar: 'لا شيء — فالعشوائية لا بأس بها.' } },
    ],
    explain: {
      en: 'Impurity is also what breaks server rendering and Strict Mode. Randomness belongs in an event handler or an effect, not in render.',
      ar: 'عدم النقاء هو أيضًا ما يكسر العرض من الخادم والوضع الصارم. فالعشوائية تنتمي إلى معالج حدث أو تأثير لا إلى العرض.',
    },
  },
  {
    id: 'a-r19-33',
    phase: 'react-19-features',
    question: {
      en: 'What state does `useActionState` hold between submissions?',
      ar: 'أي حالة تحفظها `useActionState` بين عمليات الإرسال؟',
    },
    options: [
      { text: { en: 'Whatever the action returned last time, such as an error message.', ar: 'ما أعاده الإجراء آخر مرة مثل رسالة خطأ.' }, correct: true },
      { text: { en: 'The form\'s field values.', ar: 'قيم حقول النموذج.' } },
      { text: { en: 'The HTTP status code.', ar: 'رمز حالة HTTP.' } },
      { text: { en: 'Nothing — it resets each time.', ar: 'لا شيء — فهي تُعاد ضبطها كل مرة.' } },
    ],
    explain: {
      en: 'The action receives the previous state as its first argument and returns the next one, which is how validation errors survive to be displayed.',
      ar: 'يستقبل الإجراء الحالة السابقة كوسيط أول ويُعيد التالية، وهكذا تبقى أخطاء التحقّق لتُعرض.',
    },
  },
  {
    id: 'a-r19-34',
    phase: 'react-19-features',
    question: {
      en: 'Why does `<Activity mode="hidden">` still cost something?',
      ar: 'لماذا ما زالت `<Activity mode="hidden">` تكلّف شيئًا؟',
    },
    options: [
      { text: { en: 'The subtree stays mounted, so its state and effects still exist.', ar: 'لأن الشجرة الفرعية تبقى مركّبة فتظلّ حالتها وتأثيراتها موجودة.' }, correct: true },
      { text: { en: 'It re-renders on every frame.', ar: 'لأنها تُعاد عرضها في كل إطار.' } },
      { text: { en: 'It duplicates the DOM.', ar: 'لأنها تُكرّر DOM.' } },
      { text: { en: 'It disables the compiler.', ar: 'لأنها تُعطّل المُصرِّف.' } },
    ],
    explain: {
      en: 'It is a memory-for-responsiveness trade. React deprioritises hidden work, but keeping many hidden trees alive is not free.',
      ar: 'إنها مقايضة ذاكرة مقابل استجابة. فرياكت تُخفّض أولوية العمل المخفي، لكن إبقاء أشجار مخفية كثيرة حيّة ليس مجانًا.',
    },
  },
  {
    id: 'a-r19-35',
    phase: 'react-19-features',
    question: {
      en: 'What is the practical effect of adopting the compiler on an existing codebase?',
      ar: 'ما الأثر العملي لتبنّي المُصرِّف في مشروع قائم؟',
    },
    options: [
      { text: { en: 'Existing `useMemo` and `useCallback` still work, and most become redundant.', ar: 'أن `useMemo` و `useCallback` القائمة ما زالت تعمل ويصبح معظمها زائدًا.' }, correct: true },
      { text: { en: 'All manual memoisation must be removed first.', ar: 'أنه يجب حذف كل التخزين اليدوي أولًا.' } },
      { text: { en: 'Class components must be converted.', ar: 'أنه يجب تحويل مكوّنات الأصناف.' } },
      { text: { en: 'Effects stop running.', ar: 'أن التأثيرات تتوقّف عن العمل.' } },
    ],
    explain: {
      en: 'Adoption is incremental. The lint rule that flags rule-breaking code is the useful first step, well before turning the compiler on.',
      ar: 'التبنّي تدريجي. وقاعدة الفحص التي تُعلّم الكود المخالف هي الخطوة الأولى المفيدة قبل تشغيل المُصرِّف بوقت طويل.',
    },
  },
  {
    id: 'a-r19-36',
    phase: 'react-19-features',
    question: {
      en: 'Which best describes the RSC payload sent to the browser?',
      ar: 'أيٌّ يصف حمولة RSC المُرسَلة للمتصفح على أفضل وجه؟',
    },
    options: [
      { text: { en: 'A serialised description of the rendered tree, not HTML and not a bundle.', ar: 'وصفًا مُسلسلًا للشجرة المعروضة، ليس HTML وليس حزمة.' }, correct: true },
      { text: { en: 'A complete HTML document.', ar: 'مستند HTML كاملًا.' } },
      { text: { en: 'A JavaScript bundle of the server components.', ar: 'حزمة جافاسكربت لمكوّنات الخادم.' } },
      { text: { en: 'A JSON array of props only.', ar: 'مصفوفة JSON من الخصائص فقط.' } },
    ],
    explain: {
      en: 'Because it is a tree description rather than HTML, React can merge it into the existing page without losing client state below it.',
      ar: 'ولأنها وصف شجرة لا HTML، تستطيع رياكت دمجها في الصفحة القائمة دون فقد حالة العميل تحتها.',
    },
  },
  {
    id: 'a-r19-37',
    phase: 'react-19-features',
    question: {
      en: 'When is `useTransition` preferable to a loading boolean you set yourself?',
      ar: 'متى تُفضَّل `useTransition` على قيمة تحميل منطقية تضبطها بنفسك؟',
    },
    options: [
      { text: { en: 'When the slowness is React rendering, not a network wait.', ar: 'حين يكون البطء من عرض رياكت لا من انتظار الشبكة.' }, correct: true },
      { text: { en: 'Always — it replaces loading state.', ar: 'دائمًا — فهي تحلّ محلّ حالة التحميل.' } },
      { text: { en: 'Only for form submissions.', ar: 'لإرسال النماذج فقط.' } },
      { text: { en: 'Only on the server.', ar: 'على الخادم فقط.' } },
    ],
    explain: {
      en: 'A boolean cannot make a render interruptible. For a slow fetch, a normal loading flag or a query library is still the right tool.',
      ar: 'لا تستطيع قيمة منطقية جعل العرض قابلًا للمقاطعة. أما لجلب بطيء فما زال عَلَم التحميل المعتاد أو مكتبة استعلام هو الأداة الصحيحة.',
    },
  },
  {
    id: 'a-r19-38',
    phase: 'react-19-features',
    question: {
      en: 'What does passing a `formAction` to a submit button allow?',
      ar: 'ماذا يتيح تمرير `formAction` إلى زر إرسال؟',
    },
    options: [
      { text: { en: 'Two buttons in one form running different actions.', ar: 'أن يُشغّل زرّان في نموذج واحد إجراءين مختلفين.' }, correct: true },
      { text: { en: 'Submitting without validation.', ar: 'الإرسال دون تحقّق.' } },
      { text: { en: 'Skipping the pending state.', ar: 'تخطّي حالة الانتظار.' } },
      { text: { en: 'Disabling the form action.', ar: 'تعطيل إجراء النموذج.' } },
    ],
    explain: {
      en: 'Think "Save draft" beside "Publish" — one form, one set of fields, two outcomes, without branching on which button was pressed.',
      ar: 'فكّر بـ «حفظ كمسوّدة» بجانب «نشر» — نموذج واحد وحقول واحدة ونتيجتان، دون التفريع على أي زر ضُغط.',
    },
  },
  {
    id: 'a-r19-39',
    phase: 'react-19-features',
    question: {
      en: 'Why can a Server Component be `async` while a Client Component cannot?',
      ar: 'لماذا يمكن لمكوّن الخادم أن يكون `async` ولا يمكن لمكوّن العميل؟',
    },
    options: [
      { text: { en: 'It renders once on the server, so awaiting fits; client components re-render.', ar: 'لأنه يُعرض مرة واحدة على الخادم فيناسبه الانتظار، أما مكوّنات العميل فتُعاد عرضها.' }, correct: true },
      { text: { en: 'Client Components cannot use promises at all.', ar: 'لأن مكوّنات العميل لا تستطيع استخدام الوعود إطلاقًا.' } },
      { text: { en: 'It is an arbitrary restriction.', ar: 'لأنه قيد اعتباطي.' } },
      { text: { en: 'Because of TypeScript typing.', ar: 'بسبب تنميط تايب سكربت.' } },
    ],
    explain: {
      en: 'A client render must be synchronous and interruptible. To await on the client you suspend with `use()` and a Suspense boundary instead.',
      ar: 'يجب أن يكون عرض العميل متزامنًا وقابلًا للمقاطعة. وللانتظار على العميل تُعلّق باستخدام `use()` وحدود Suspense بدلًا من ذلك.',
    },
  },
  {
    id: 'a-r19-40',
    phase: 'react-19-features',
    question: {
      en: 'What problem does `useEffectEvent` solve that adding a dependency does not?',
      ar: 'ما المشكلة التي تحلّها `useEffectEvent` ولا تحلّها إضافة اعتمادية؟',
    },
    options: [
      { text: { en: 'Reading a fresh value without re-running the effect when it changes.', ar: 'قراءة قيمة حديثة دون إعادة تشغيل التأثير عند تغيّرها.' }, correct: true },
      { text: { en: 'Making the effect run more often.', ar: 'جعل التأثير يعمل أكثر.' } },
      { text: { en: 'Removing the need for cleanup.', ar: 'إلغاء الحاجة إلى التنظيف.' } },
      { text: { en: 'Running the effect before paint.', ar: 'تشغيل التأثير قبل الرسم.' } },
    ],
    explain: {
      en: 'Adding it as a dependency would reconnect the chat room every time the theme changed. Omitting it would read a stale theme. This is the third option.',
      ar: 'إضافتها كاعتمادية ستُعيد الاتصال بغرفة المحادثة كلما تغيّر المظهر. وحذفها سيقرأ مظهرًا قديمًا. وهذه هي الخيار الثالث.',
    },
  },
  {
    id: 'a-r19-41',
    phase: 'react-19-features',
    question: {
      en: 'What is streaming SSR?',
      ar: 'ما العرض المتدفّق من الخادم؟',
    },
    options: [
      { text: { en: 'Sending HTML in chunks as it becomes ready, rather than waiting for all of it.', ar: 'إرسال HTML على دفعات فور جاهزيتها بدل انتظارها كلها.' }, correct: true },
      { text: { en: 'Streaming video from the server.', ar: 'بثّ فيديو من الخادم.' } },
      { text: { en: 'Sending state updates over a websocket.', ar: 'إرسال تحديثات الحالة عبر websocket.' } },
      { text: { en: 'Loading JavaScript in parallel.', ar: 'تحميل جافاسكربت بالتوازي.' } },
    ],
    explain: {
      en: 'Suspense boundaries are the chunk edges: the shell arrives immediately and each slow section fills in as its data resolves.',
      ar: 'حدود Suspense هي حواف الدفعات: فيصل الهيكل فورًا ويمتلئ كل قسم بطيء عند حسم بياناته.',
    },
  },
  {
    id: 'a-r19-42',
    phase: 'react-19-features',
    question: {
      en: 'Which is the clearest sign a value should be a Client Component rather than a Server one?',
      ar: 'ما أوضح علامة على أن قيمة يجب أن تكون مكوّن عميل لا مكوّن خادم؟',
    },
    options: [
      { text: { en: 'It needs state, an effect, or a browser API.', ar: 'أنها تحتاج حالة أو تأثيرًا أو واجهة متصفح.' }, correct: true },
      { text: { en: 'It renders a list.', ar: 'أنها تعرض قائمة.' } },
      { text: { en: 'It takes more than three props.', ar: 'أنها تأخذ أكثر من ثلاث خصائص.' } },
      { text: { en: 'It is more than 100 lines.', ar: 'أنها أكثر من مئة سطر.' } },
    ],
    explain: {
      en: 'Interactivity is the boundary. Push `"use client"` as far down the tree as possible so the static shell above it stays off the bundle.',
      ar: 'التفاعلية هي الحدّ. ادفع `"use client"` لأسفل الشجرة قدر الإمكان ليبقى الهيكل الساكن فوقه خارج الحزمة.',
    },
  },
  {
    id: 'a-r19-43',
    phase: 'react-19-features',
    question: {
      en: 'What happens if you create a promise inside render and pass it to `use()`?',
      ar: 'ماذا يحدث إذا أنشأت وعدًا داخل العرض ومرّرته إلى `use()`؟',
    },
    options: [
      { text: { en: 'A new promise every render, so the component can suspend forever.', ar: 'وعد جديد في كل عرض، فقد يبقى المكوّن معلّقًا إلى الأبد.' }, correct: true },
      { text: { en: 'React caches it automatically.', ar: 'تخزّنه رياكت تلقائيًا.' } },
      { text: { en: 'It resolves immediately.', ar: 'يُحسم فورًا.' } },
      { text: { en: 'Nothing — this is the recommended pattern.', ar: 'لا شيء — فهذا هو النمط الموصى به.' } },
    ],
    explain: {
      en: 'The promise must come from outside the render — a cache, a framework loader, or a Server Component passing it down as a prop.',
      ar: 'يجب أن يأتي الوعد من خارج العرض — من ذاكرة مؤقتة أو مُحمِّل إطار عمل أو مكوّن خادم يمرّره كخاصية.',
    },
  },
  {
    id: 'a-r19-44',
    phase: 'react-19-features',
    question: {
      en: 'Which React 19 change most reduces boilerplate in forms?',
      ar: 'أي تغيير في رياكت 19 يقلّل الكود المتكرّر في النماذج أكثر؟',
    },
    options: [
      { text: { en: 'Actions with `useActionState` and `useFormStatus` handling pending and error state.', ar: 'الإجراءات مع `useActionState` و `useFormStatus` لإدارة حالتَي الانتظار والخطأ.' }, correct: true },
      { text: { en: '`ref` as a prop.', ar: '`ref` كخاصية.' } },
      { text: { en: 'Document metadata hoisting.', ar: 'رفع بيانات المستند الوصفية.' } },
      { text: { en: 'The `<Activity>` component.', ar: 'المكوّن `<Activity>`.' } },
    ],
    explain: {
      en: 'The three-`useState` pattern around every submit — loading, error, success — is what these replace.',
      ar: 'نمط ثلاث `useState` حول كل إرسال — تحميل وخطأ ونجاح — هو ما تحلّ هذه محلّه.',
    },
  },
  {
    id: 'a-r19-45',
    phase: 'react-19-features',
    question: {
      en: 'Do you need a framework to use Server Components?',
      ar: 'هل تحتاج إطار عمل لاستخدام مكوّنات الخادم؟',
    },
    options: [
      { text: { en: 'In practice yes — they need a bundler and router integration.', ar: 'عمليًا نعم — فهي تحتاج تكامل مُجمِّع وموجّه.' }, correct: true },
      { text: { en: 'No, they work in any Vite app by default.', ar: 'لا، فهي تعمل في أي تطبيق Vite افتراضيًا.' } },
      { text: { en: 'No, the browser supports them natively.', ar: 'لا، فالمتصفح يدعمها أصلًا.' } },
      { text: { en: 'Only for production builds.', ar: 'لبنى الإنتاج فقط.' } },
    ],
    explain: {
      en: 'React defines the model; something has to implement the server, the bundler graph and the request handling. Today that means Next.js or a comparable setup.',
      ar: 'رياكت تُعرّف النموذج، ويجب أن يُنفّذ شيءٌ ما الخادم ورسم المُجمِّع ومعالجة الطلبات. واليوم يعني ذلك Next.js أو إعدادًا مماثلًا.',
    },
  },
]

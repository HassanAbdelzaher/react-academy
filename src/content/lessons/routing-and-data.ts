import type { LessonBody } from '../blocks'

export const routingAndData: LessonBody[] = [
  {
    id: 'routing-and-data/client-routing',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A router maps the URL to a component tree and swaps it without a full page load. Everything else it offers — nested layouts, params, guarded routes — is built on that one idea.',
          ar: 'يربط الموجّه الرابط بشجرة مكوّنات ويبدّلها دون إعادة تحميل الصفحة. وكل ما يقدّمه بعد ذلك — تخطيطات متداخلة ومعاملات ومسارات محميّة — مبني على تلك الفكرة وحدها.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,          // header, nav, <Outlet />
    children: [
      { index: true, element: <Home /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/:id', element: <UserDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);`,
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const { id } = useParams();                  // "42" — always a string
const [params, setParams] = useSearchParams(); // ?q=react&page=2
const navigate = useNavigate();

navigate('/users/42');
navigate(-1);                                  // back
setParams({ q: 'react', page: '2' });`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Use links, not click handlers', ar: 'استخدم الروابط لا معالجات النقر' },
        body: {
          en: '`<Link to="/users">` renders a real `<a href>`: middle-click opens a tab, the browser shows the destination, and screen readers announce it as a link. `<div onClick={navigate}>` does none of that.',
          ar: '`<Link to="/users">` يعرض `<a href>` حقيقيًا: فالنقر الأوسط يفتح تبويبًا، والمتصفّح يُظهر الوجهة، وقارئات الشاشة تعلنه كرابط. أما `<div onClick={navigate}>` فلا يفعل شيئًا من ذلك.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Nested routes let a layout stay mounted while only the `<Outlet />` changes — no flicker in the sidebar.',
            'Put filters, tabs and pagination in the query string: the back button and shareable links then work for free.',
            'Add a `*` route or a lost user sees a blank page.',
            'React Router is the incumbent; TanStack Router is the typed alternative, with params and search params fully type-checked.',
          ],
          ar: [
            'المسارات المتداخلة تُبقي التخطيط مركّبًا بينما يتغيّر `<Outlet />` فقط — فلا وميض في الشريط الجانبي.',
            'ضع التصفيات والتبويبات والترقيم في نصّ الاستعلام: فيعمل زر الرجوع والروابط القابلة للمشاركة مجانًا.',
            'أضف مسار `*` وإلا رأى المستخدم التائه صفحة فارغة.',
            'React Router هو السائد، و TanStack Router بديل مُنمَّط تُفحص فيه المعاملات ونصوص الاستعلام بالأنواع.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Why should a search query live in the URL rather than in `useState`?',
          ar: 'لماذا يجب أن يعيش نصّ البحث في الرابط لا في `useState`؟',
        },
        options: [
          {
            text: {
              en: 'So the result can be shared, bookmarked and restored by the back button.',
              ar: 'كي تكون النتيجة قابلة للمشاركة والحفظ والاسترجاع بزر الرجوع.',
            },
            correct: true,
          },
          { text: { en: 'Because `useState` cannot hold strings that long.', ar: 'لأن `useState` لا تتّسع لنصوص بهذا الطول.' } },
          { text: { en: 'Because URL state re-renders less often.', ar: 'لأن حالة الرابط تُعيد العرض أقل.' } },
          { text: { en: 'Because routers cache URL state automatically.', ar: 'لأن الموجّهات تخزّن حالة الرابط تلقائيًا.' } },
        ],
        explain: {
          en: 'The URL is state the browser already persists for you. Copying a link should reproduce exactly what the sender was looking at — that only works if the filters are in it.',
          ar: 'الرابط حالة يحفظها المتصفّح لك أصلًا. ونسخ رابط يجب أن يعيد إنتاج ما كان يراه المرسل بالضبط — ولا يحدث ذلك إلا إذا كانت التصفيات فيه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Routes map URLs to components; nested routes share a layout via `<Outlet />`.',
            '`useParams` for `/:id`, `useSearchParams` for `?q=`.',
            'Always navigate with `<Link>`, never a clickable div.',
            'Filters and pagination belong in the URL.',
          ],
          ar: [
            'المسارات تربط الروابط بالمكوّنات، والمتداخلة تتشارك التخطيط عبر `<Outlet />`.',
            '`useParams` لـ `/:id` و `useSearchParams` لـ `?q=`.',
            'تنقّل دائمًا بـ `<Link>` ولا تستخدم div قابلًا للنقر.',
            'التصفيات والترقيم مكانها الرابط.',
          ],
        },
      },
    ],
  },

  {
    id: 'routing-and-data/fetching-fundamentals',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Fetching by hand teaches you what a data library actually does for you. Write it once properly — with loading, error, empty and cancellation — and you will understand why nobody keeps doing it manually.',
          ar: 'الجلب اليدوي يعلّمك ما تفعله مكتبة البيانات نيابةً عنك. اكتبه مرة بشكل صحيح — مع التحميل والخطأ والفراغ والإلغاء — وستفهم لماذا لا يستمر أحد في فعله يدويًا.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `function useUser(id) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: null, error: null });

    fetch(\`/api/users/\${id}\`)
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then((data) => !cancelled && setState({ status: 'success', data, error: null }))
      .catch((error) => !cancelled && setState({ status: 'error', data: null, error }));

    return () => { cancelled = true; };
  }, [id]);

  return state;
}`,
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'The race condition', ar: 'تعارض الطلبات' },
        body: {
          en: 'Without the `cancelled` flag, a slow request for user 1 can resolve **after** a fast request for user 2 and overwrite the screen with the wrong person. This bug is invisible on fast connections and obvious to your users on slow ones.',
          ar: 'بلا راية `cancelled`، قد يُحسم طلب بطيء للمستخدم 1 **بعد** طلب سريع للمستخدم 2 فيستبدل الشاشة بالشخص الخطأ. وهذا الخلل غير مرئي على الاتصالات السريعة وواضح لمستخدميك على البطيئة.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Model status as one union — `loading | success | error` — not three independent booleans that can all be true.',
            'Treat **empty** as its own case: a successful response with zero rows is not an error.',
            'Reset state when the id changes, or the previous user is shown while the new one loads.',
            '`AbortController` cancels the request itself, which the flag does not.',
          ],
          ar: [
            'اجعل الحالة اتحادًا واحدًا — `loading | success | error` — لا ثلاث قيم منطقية مستقلّة قد تصدق معًا.',
            'عامل **الفراغ** كحالة مستقلّة: فاستجابة ناجحة بصفر صفوف ليست خطأً.',
            'أعد ضبط الحالة عند تغيّر المعرّف، وإلا ظهر المستخدم السابق أثناء تحميل الجديد.',
            '`AbortController` يلغي الطلب نفسه، وهو ما لا تفعله الراية.',
          ],
        },
      },
      {
        type: 'text',
        text: {
          en: 'Count what this hook still lacks: caching, deduplication of identical requests, retry on failure, refetch when the tab regains focus, and shared state between two components asking for the same user. That list is the next lesson.',
          ar: 'أحصِ ما ينقص هذا الخطّاف: التخزين المؤقّت، وإزالة الطلبات المتطابقة، وإعادة المحاولة عند الفشل، وإعادة الجلب عند عودة التركيز للتبويب، ومشاركة الحالة بين مكوّنين يطلبان المستخدم نفسه. وتلك القائمة هي الدرس التالي.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Two components both render `useUser(42)`. What happens with this hand-rolled hook?',
          ar: 'مكوّنان يعرضان `useUser(42)`. ماذا يحدث مع هذا الخطّاف اليدوي؟',
        },
        options: [
          {
            text: { en: 'Two identical network requests are sent and two copies of the state are kept.', ar: 'يُرسل طلبان متطابقان وتُحفظ نسختان من الحالة.' },
            correct: true,
          },
          { text: { en: 'React deduplicates the requests automatically.', ar: 'تزيل رياكت الطلبات المكرّرة تلقائيًا.' } },
          { text: { en: 'The second component reuses the first one’s data.', ar: 'يعيد المكوّن الثاني استخدام بيانات الأول.' } },
          { text: { en: 'The browser cache prevents the second request.', ar: 'تمنع ذاكرة المتصفّح الطلب الثاني.' } },
        ],
        explain: {
          en: 'Hooks share logic, never state — so each call fetches independently. Deduplication by cache key is one of the main reasons TanStack Query exists.',
          ar: 'الخطّافات تشارك المنطق لا الحالة — فيجلب كل استدعاء بشكل مستقل. وإزالة التكرار عبر مفتاح التخزين أحد أهم أسباب وجود TanStack Query.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Every fetch needs loading, error, empty and cancellation.',
            'Use a status union rather than several booleans.',
            'Guard against out-of-order responses.',
            'Manual fetching has no cache, no dedupe, no retry — that is the gap a library fills.',
          ],
          ar: [
            'كل جلب يحتاج تحميلًا وخطأً وفراغًا وإلغاءً.',
            'استخدم اتحاد حالة بدل عدة قيم منطقية.',
            'احتَط من الاستجابات التي تصل خارج الترتيب.',
            'الجلب اليدوي بلا تخزين ولا إزالة تكرار ولا إعادة محاولة — وتلك الفجوة تسدّها المكتبة.',
          ],
        },
      },
    ],
  },

  {
    id: 'routing-and-data/tanstack-query',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'TanStack Query treats server data as a **cache**, not as state you own. You declare what you want and how fresh it must be; the library handles fetching, deduplication, retries, background updates and invalidation.',
          ar: 'تعامل TanStack Query بيانات الخادم كـ**ذاكرة مؤقّتة** لا كحالة تملكها. أنت تعلن ما تريده ومدى حداثته المطلوبة، والمكتبة تتكفّل بالجلب وإزالة التكرار وإعادة المحاولة والتحديث في الخلفية والإبطال.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const { data, isPending, isError, error } = useQuery({
  queryKey: ['user', id],
  queryFn: async () => {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error('Failed to load user');
    return res.json();
  },
  staleTime: 60_000,     // treat as fresh for a minute
});

if (isPending) return <Skeleton />;
if (isError) return <ErrorBox message={error.message} />;
return <Profile user={data} />;`,
      },
      {
        type: 'list',
        items: {
          en: [
            'The **query key** is the cache identity. Every value the fetcher depends on must be in it — `["user", id]`, not `["user"]`.',
            '`staleTime` controls when a background refetch happens; `gcTime` controls how long unused data is kept.',
            'Two components with the same key share one request and one cache entry, automatically.',
            'Mutations write; then you `invalidateQueries` to tell the cache what is now out of date.',
          ],
          ar: [
            '**مفتاح الاستعلام** هو هوية الذاكرة. وكل قيمة تعتمد عليها دالة الجلب يجب أن تكون فيه — `["user", id]` لا `["user"]`.',
            '`staleTime` يحدّد متى تحدث إعادة جلب في الخلفية، و`gcTime` يحدّد مدة الاحتفاظ بالبيانات غير المستخدمة.',
            'مكوّنان بالمفتاح نفسه يتشاركان طلبًا واحدًا ومدخلًا واحدًا في الذاكرة تلقائيًا.',
            'التعديلات تكتب، ثم تستدعي `invalidateQueries` لتخبر الذاكرة بما صار قديمًا.',
          ],
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const queryClient = useQueryClient();

const addTodo = useMutation({
  mutationFn: (text) =>
    fetch('/api/todos', { method: 'POST', body: JSON.stringify({ text }) }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });   // refetch the list
  },
});

addTodo.mutate('Learn caching');`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'This is why "global state" shrinks', ar: 'ولهذا تتقلّص «الحالة العامة»' },
        body: {
          en: 'Most of what teams put in Redux was server data waiting to go stale. Move it into a query cache and what remains — a theme, a cart, an open modal — is small enough for `useState` plus a tiny store.',
          ar: 'معظم ما وضعته الفرق في Redux كان بيانات خادم تنتظر أن تتقادم. انقلها إلى ذاكرة استعلامات فيصبح المتبقّي — مظهر وعربة ومربّع حواري مفتوح — صغيرًا يكفيه `useState` مع مخزن ضئيل.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Your list shows stale data after switching filters, even though the fetcher uses the filter value. What is wrong?',
          ar: 'تعرض قائمتك بيانات قديمة بعد تغيير التصفية رغم أن دالة الجلب تستخدم قيمتها. ما الخطأ؟',
        },
        options: [
          {
            text: { en: 'The filter is not part of the query key, so the cache thinks it is the same query.', ar: 'التصفية ليست جزءًا من مفتاح الاستعلام، فتظنّ الذاكرة أنه الاستعلام نفسه.' },
            correct: true,
          },
          { text: { en: '`staleTime` is set too low.', ar: '`staleTime` منخفض جدًا.' } },
          { text: { en: 'Mutations need to be awaited.', ar: 'يجب انتظار التعديلات.' } },
          { text: { en: 'The query needs `refetchOnMount: false`.', ar: 'يحتاج الاستعلام `refetchOnMount: false`.' } },
        ],
        explain: {
          en: 'The key is the identity of the data. If two different results can share a key, the cache cannot tell them apart — treat the key like the arguments of the function it caches.',
          ar: 'المفتاح هو هوية البيانات. وإذا تشارك ناتجان مختلفان مفتاحًا واحدًا فلن تميّزهما الذاكرة — عامل المفتاح كوسائط الدالة التي يخزّنها.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Server data is a cache, not state you own.',
            'The query key must contain every input the fetcher uses.',
            '`staleTime` decides freshness; invalidation decides correctness after writes.',
            'Identical keys share one request across the whole app.',
          ],
          ar: [
            'بيانات الخادم ذاكرة مؤقّتة لا حالة تملكها.',
            'يجب أن يحوي مفتاح الاستعلام كل مدخل تستخدمه دالة الجلب.',
            '`staleTime` يقرّر الحداثة، والإبطال يقرّر الصحّة بعد الكتابة.',
            'المفاتيح المتطابقة تتشارك طلبًا واحدًا عبر التطبيق كله.',
          ],
        },
      },
    ],
  },

  {
    id: 'routing-and-data/optimistic-updates',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'An optimistic update shows the result before the server confirms it. Done well, the app feels instant; done carelessly, it lies to the user. The difference is the rollback.',
          ar: 'التحديث التفاؤلي يعرض النتيجة قبل تأكيد الخادم. وإذا أُحسن، بدا التطبيق فوريًا، وإن أُهمل كذب على المستخدم. والفرق هو التراجع.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `useMutation({
  mutationFn: toggleLike,

  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['post', postId] });
    const previous = queryClient.getQueryData(['post', postId]);

    queryClient.setQueryData(['post', postId], (old) => ({
      ...old, liked: !old.liked, likes: old.likes + (old.liked ? -1 : 1),
    }));

    return { previous };                     // context for a rollback
  },

  onError: (_err, postId, context) => {
    queryClient.setQueryData(['post', postId], context.previous);   // undo
  },

  onSettled: (_data, _err, postId) => {
    queryClient.invalidateQueries({ queryKey: ['post', postId] });  // reconcile
  },
});`,
      },
      {
        type: 'steps',
        steps: [
          {
            title: { en: 'Cancel in-flight queries', ar: 'ألغِ الاستعلامات الجارية' },
            body: {
              en: 'Otherwise a response that is already on its way will overwrite your optimistic value a moment later.',
              ar: 'وإلا فإن استجابة في الطريق ستستبدل قيمتك التفاؤلية بعد لحظة.',
            },
          },
          {
            title: { en: 'Snapshot, then update', ar: 'خذ لقطة ثم حدّث' },
            body: {
              en: 'Keep the previous value so you have something to restore. Return it as context.',
              ar: 'احتفظ بالقيمة السابقة ليكون لديك ما تسترجعه. وأعِدها كسياق.',
            },
          },
          {
            title: { en: 'Roll back on failure', ar: 'تراجع عند الفشل' },
            body: {
              en: 'Put the snapshot back and tell the user. Silently reverting a like is worse than an error message.',
              ar: 'أعِد اللقطة وأخبر المستخدم. فالتراجع الصامت عن إعجاب أسوأ من رسالة خطأ.',
            },
          },
          {
            title: { en: 'Reconcile either way', ar: 'وفّق في الحالتين' },
            body: {
              en: 'Invalidate afterwards so the server remains the source of truth — your guess was only a placeholder.',
              ar: 'أبطِل بعدها ليبقى الخادم مصدر الحقيقة — فتخمينك كان مجرّد عنصر نائب.',
            },
          },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        body: {
          en: 'Be optimistic only about actions that almost never fail and are easy to undo: likes, toggles, reordering, marking as read. Never about payments, deletions or anything the user would be upset to see reversed.',
          ar: 'كن تفاؤليًا فقط في الإجراءات التي نادرًا ما تفشل ويسهل التراجع عنها: الإعجابات والتبديلات وإعادة الترتيب ووضع علامة مقروء. ولا تفعل ذلك أبدًا في المدفوعات أو الحذف أو أي شيء يزعج المستخدم أن يراه ملغى.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Why does the pattern call `cancelQueries` before writing the optimistic value?',
          ar: 'لماذا يستدعي النمط `cancelQueries` قبل كتابة القيمة التفاؤلية؟',
        },
        options: [
          {
            text: {
              en: 'So an in-flight refetch cannot land afterwards and overwrite the optimistic value.',
              ar: 'كي لا تصل إعادة جلب جارية بعدها فتستبدل القيمة التفاؤلية.',
            },
            correct: true,
          },
          { text: { en: 'To reduce server load.', ar: 'لتقليل الحمل على الخادم.' } },
          { text: { en: 'Because mutations and queries cannot run at the same time.', ar: 'لأن التعديلات والاستعلامات لا تعمل معًا.' } },
          { text: { en: 'To clear the cache before writing.', ar: 'لمسح الذاكرة قبل الكتابة.' } },
        ],
        explain: {
          en: 'It is the same race condition as manual fetching, one level up. A request started 200 ms ago knows nothing about the update you just made.',
          ar: 'إنه تعارض الطلبات نفسه لكن بمستوى أعلى. فطلب بدأ قبل 200 مللي ثانية لا يعرف شيئًا عن التحديث الذي أجريته للتوّ.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Cancel, snapshot, update, roll back on error, invalidate at the end.',
            'Always keep a way to restore the previous value.',
            'Reserve optimism for cheap, reversible, rarely-failing actions.',
            'Tell the user when a rollback happens.',
          ],
          ar: [
            'ألغِ، وخذ لقطة، وحدّث، وتراجع عند الخطأ، وأبطِل في النهاية.',
            'احتفظ دائمًا بوسيلة لاسترجاع القيمة السابقة.',
            'اقصر التفاؤل على الإجراءات الرخيصة القابلة للعكس ونادرة الفشل.',
            'أخبر المستخدم عند حدوث تراجع.',
          ],
        },
      },
    ],
  },

  {
    id: 'routing-and-data/pagination-infinite',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Nobody wants ten thousand rows. The two ways to break them up are pages and endless scrolling, and the choice affects the API, the cache and whether the back button works.',
          ar: 'لا أحد يريد عشرة آلاف صف. وطريقتا التقسيم هما الصفحات والتمرير اللانهائي، والاختيار يؤثّر في الواجهة البرمجية والذاكرة وفي عمل زر الرجوع.',
        },
      },
      {
        type: 'table',
        head: { en: ['', 'Offset (`?page=3`)', 'Cursor (`?after=abc`)'], ar: ['', 'الإزاحة (`?page=3`)', 'المؤشّر (`?after=abc`)'] },
        rows: [
          { en: ['Jump to page 7', 'easy', 'not possible'], ar: ['القفز للصفحة 7', 'سهل', 'غير ممكن'] },
          { en: ['New rows inserted while browsing', 'items shift and repeat', 'stable'], ar: ['إدراج صفوف أثناء التصفّح', 'تنزاح العناصر وتتكرّر', 'مستقرّ'] },
          { en: ['Cost on a large table', 'grows with the offset', 'constant'], ar: ['التكلفة على جدول كبير', 'تنمو مع الإزاحة', 'ثابتة'] },
          { en: ['Best for', 'admin tables', 'feeds and timelines'], ar: ['الأنسب لـ', 'جداول الإدارة', 'الخلاصات والتسلسلات الزمنية'] },
        ],
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => fetchFeed({ cursor: pageParam }),
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});

const items = data?.pages.flatMap((p) => p.items) ?? [];`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Infinite scroll has real costs', ar: 'للتمرير اللانهائي تكاليف حقيقية' },
        body: {
          en: 'The footer becomes unreachable, the back button loses the scroll position, and the DOM grows until the page stutters. Always offer a "load more" button as well, and virtualise the list once it passes a few hundred rows.',
          ar: 'يصبح التذييل بعيد المنال، ويفقد زر الرجوع موضع التمرير، وينمو DOM حتى تتلعثم الصفحة. قدّم دائمًا زر «تحميل المزيد» أيضًا، وطبّق العرض الافتراضي بعد بضع مئات من الصفوف.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'For classic pagination, keep the page number in the URL and use `placeholderData` so the table does not blank out between pages.',
            'Prefetch the next page on hover — the click then feels instant.',
            'Render a skeleton with the same height as a row, so nothing jumps when data arrives.',
            'Above roughly 200 visible rows, use a virtualiser such as TanStack Virtual.',
          ],
          ar: [
            'في الترقيم الكلاسيكي، أبقِ رقم الصفحة في الرابط واستخدم `placeholderData` كي لا يفرغ الجدول بين الصفحات.',
            'اجلب الصفحة التالية مسبقًا عند مرور المؤشّر — فتبدو النقرة فورية.',
            'اعرض هيكلًا بارتفاع الصف نفسه كي لا يقفز شيء عند وصول البيانات.',
            'فوق نحو 200 صف مرئي، استخدم أداة عرض افتراضي مثل TanStack Virtual.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Users report seeing the same post twice while scrolling a busy feed. Which pagination style causes this?',
          ar: 'يُبلّغ المستخدمون عن رؤية المنشور نفسه مرتين أثناء تصفّح خلاصة نشطة. أي أسلوب ترقيم يسبّب ذلك؟',
        },
        options: [
          {
            text: { en: 'Offset pagination — new items at the top push everything down between requests.', ar: 'الترقيم بالإزاحة — إذ تدفع العناصر الجديدة في الأعلى كل شيء للأسفل بين الطلبات.' },
            correct: true,
          },
          { text: { en: 'Cursor pagination.', ar: 'الترقيم بالمؤشّر.' } },
          { text: { en: 'Any pagination without `staleTime`.', ar: 'أي ترقيم بلا `staleTime`.' } },
          { text: { en: 'It is always a server bug.', ar: 'إنه دائمًا خلل في الخادم.' } },
        ],
        explain: {
          en: '"Rows 20–40" means something different once three posts have been added. A cursor points at a specific record, so the next page starts exactly where the last one ended.',
          ar: '«الصفوف من 20 إلى 40» تعني شيئًا مختلفًا بعد إضافة ثلاثة منشورات. أما المؤشّر فيشير إلى سجلّ محدّد، فتبدأ الصفحة التالية من حيث انتهت السابقة بالضبط.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Cursors are stable under inserts; offsets are simpler but shift.',
            '`useInfiniteQuery` gives you pages plus `fetchNextPage`.',
            'Keep the page number in the URL for classic pagination.',
            'Virtualise long lists and always offer an explicit "load more".',
          ],
          ar: [
            'المؤشّرات مستقرّة عند الإدراج، والإزاحات أبسط لكنها تنزاح.',
            '`useInfiniteQuery` يمنحك الصفحات مع `fetchNextPage`.',
            'أبقِ رقم الصفحة في الرابط في الترقيم الكلاسيكي.',
            'استخدم العرض الافتراضي للقوائم الطويلة وقدّم دائمًا زر «تحميل المزيد».',
          ],
        },
      },
    ],
  },
]

import type { LessonBody } from '../blocks'

export const nextjsFullstack: LessonBody[] = [
  {
    id: 'nextjs-fullstack/app-router',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'In the App Router, folders are routes and a handful of reserved filenames give you layouts, loading states and error handling without any configuration.',
          ar: 'في موجّه App تكون المجلدات مساراتٍ، وحفنة من أسماء الملفات المحجوزة تمنحك التخطيطات وحالات التحميل ومعالجة الأخطاء بلا أي إعدادات.',
        },
      },
      {
        type: 'code',
        lang: 'bash',
        code: `app/
  layout.tsx          → wraps everything (html, body, providers)
  page.tsx            → /
  loading.tsx         → shown while a segment loads
  error.tsx           → catches errors in this segment
  not-found.tsx       → 404
  products/
    page.tsx          → /products
    [id]/
      page.tsx        → /products/42`,
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'app/products/[id]/page.tsx',
        code: `export default async function ProductPage({ params }) {
  const { id } = await params;                    // params is a promise
  const product = await getProduct(id);

  if (!product) notFound();                       // renders not-found.tsx
  return <article><h1>{product.name}</h1></article>;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product.name };                 // real per-page SEO
}`,
      },
      {
        type: 'list',
        items: {
          en: [
            'A `layout.tsx` **does not re-render** when you navigate between its children — sidebar scroll and state survive.',
            '`loading.tsx` is sugar for a `<Suspense>` boundary around that segment.',
            '`error.tsx` must be a Client Component; it receives the error and a `reset()` function.',
            'Folders in `(parentheses)` group routes without adding a URL segment — useful for `(marketing)` and `(app)` layouts.',
          ],
          ar: [
            '`layout.tsx` **لا يُعاد عرضه** عند التنقّل بين أبنائه — فيبقى تمرير الشريط الجانبي وحالته.',
            '`loading.tsx` اختصار لحدّ `<Suspense>` حول ذلك المقطع.',
            '`error.tsx` يجب أن يكون مكوّن عميل، ويستقبل الخطأ ودالة `reset()`.',
            'المجلدات بين `(أقواس)` تجمع المسارات دون إضافة مقطع للرابط — مفيدة لتخطيطات `(marketing)` و `(app)`.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'note',
        body: {
          en: 'Every file here is a Server Component unless it says `"use client"`. That default is the whole point of the App Router, and it is what makes phase 12 practical rather than theoretical.',
          ar: 'كل ملف هنا مكوّن خادم إلا إذا كتب `"use client"`. وهذا الافتراض هو جوهر موجّه App، وهو ما يجعل المرحلة الثانية عشرة عملية لا نظرية.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You navigate from `/products` to `/products/42`. What happens to the sidebar defined in `app/layout.tsx`?',
          ar: 'انتقلت من `/products` إلى `/products/42`. ماذا يحدث للشريط الجانبي المعرَّف في `app/layout.tsx`؟',
        },
        options: [
          {
            text: { en: 'It stays mounted — layouts persist across navigations within them.', ar: 'يبقى مركّبًا — فالتخطيطات تستمرّ عبر التنقّلات داخلها.' },
            correct: true,
          },
          { text: { en: 'It re-mounts, losing its scroll position.', ar: 'يُعاد تركيبه فيفقد موضع تمريره.' } },
          { text: { en: 'It only persists if wrapped in `<Activity>`.', ar: 'يستمرّ فقط إذا غُلّف بـ `<Activity>`.' } },
          { text: { en: 'It re-renders on the client each time.', ar: 'يُعاد عرضه على العميل في كل مرة.' } },
        ],
        explain: {
          en: 'Only the changed segment re-renders. That is why a layout is the right place for navigation, and the wrong place for anything specific to one page.',
          ar: 'المقطع المتغيّر وحده يُعاد عرضه. ولهذا يكون التخطيط المكان الصحيح للتنقّل، والمكان الخطأ لأي شيء يخصّ صفحة واحدة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Folders are routes; `page.tsx` makes one public.',
            'Layouts persist; only the changing segment re-renders.',
            '`loading.tsx` and `error.tsx` are conventions, not configuration.',
            'Everything is a Server Component by default.',
          ],
          ar: [
            'المجلدات مسارات، و`page.tsx` يجعل المسار علنيًا.',
            'التخطيطات تستمرّ، والمقطع المتغيّر وحده يُعاد عرضه.',
            '`loading.tsx` و `error.tsx` اصطلاحات لا إعدادات.',
            'كل شيء مكوّن خادم افتراضيًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'nextjs-fullstack/server-vs-client-components',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'The skill here is drawing the boundary in the right place: as far down the tree as possible, so the interactive island is small and everything above it ships no JavaScript.',
          ar: 'المهارة هنا رسم الحدّ في المكان الصحيح: أدنى ما يمكن في الشجرة، لتكون الجزيرة التفاعلية صغيرة ولا يرسل ما فوقها أي جافاسكربت.',
        },
      },
      { type: 'visual', name: 'server-client' },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          label: { en: 'Boundary too high', ar: 'الحدّ مرتفع جدًا' },
          code: `'use client';

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HugeArticle />   {/* now client too */}
      <Toggle onClick={setOpen} />
    </>
  );
}`,
        },
        good: {
          label: { en: 'Boundary at the leaf', ar: 'الحدّ عند الورقة' },
          code: `export default function Page() {
  return (
    <>
      <HugeArticle />   {/* stays on server */}
      <Toggle />        {/* only this ships JS */}
    </>
  );
}`,
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'A Client Component may render a Server Component only if it arrives as `children` — never through an import.',
            'Props crossing the boundary must be serialisable — no functions, class instances or Dates with methods you rely on.',
            'A Client Component can still be server-rendered to HTML; `"use client"` decides where it *hydrates*, not whether it renders on the server.',
            'Third-party packages that use hooks need a `"use client"` wrapper before you can use them in a server tree.',
          ],
          ar: [
            'يستطيع مكوّن العميل عرض مكوّن خادم فقط إذا وصله كـ `children` — لا عبر استيراد أبدًا.',
            'الخصائص العابرة للحدّ يجب أن تكون قابلة للتسلسل — بلا دوال ولا نسخ أصناف ولا تواريخ تعتمد على دوالها.',
            'ما زال بإمكان مكوّن العميل أن يُعرض على الخادم إلى HTML، فـ `"use client"` يحدّد أين *يترطّب* لا هل يُعرض على الخادم.',
            'الحزم الخارجية التي تستخدم الخطّافات تحتاج غلافًا بـ `"use client"` قبل استخدامها في شجرة خادم.',
          ],
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// the composition pattern that keeps the boundary low
'use client';
export function Collapsible({ children }) {          // client shell
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && children}                              {/* server content */}
    </>
  );
}

// usage from a Server Component
<Collapsible><ServerRenderedReport /></Collapsible>`,
      },
      {
        type: 'quiz',
        question: {
          en: 'Why can a Client Component receive a Server Component as `children` but not import one?',
          ar: 'لماذا يستقبل مكوّن العميل مكوّن خادم كـ `children` ولا يستطيع استيراده؟',
        },
        options: [
          {
            text: {
              en: 'The server already rendered it and passes the output down; an import would require running server code in the browser.',
              ar: 'لأن الخادم عرضه مسبقًا ويمرّر الناتج للأسفل، أما الاستيراد فيتطلّب تشغيل كود خادم في المتصفّح.',
            },
            correct: true,
          },
          { text: { en: 'Imports are asynchronous and children are not.', ar: 'الاستيرادات غير متزامنة بخلاف الأبناء.' } },
          { text: { en: 'It is an arbitrary framework restriction.', ar: 'إنه قيد اعتباطي من الإطار.' } },
          { text: { en: 'Both are actually allowed.', ar: 'كلاهما مسموح فعلًا.' } },
        ],
        explain: {
          en: 'By the time the client renders, `children` is finished output — a serialised element tree. An import would drag the server module, and its database client, into the browser bundle.',
          ar: 'حين يعرض العميل، تكون `children` ناتجًا جاهزًا — شجرة عناصر مُسلسلة. أما الاستيراد فسيجرّ وحدة الخادم وعميل قاعدة بياناتها إلى حزمة المتصفّح.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Push `"use client"` as far down the tree as it will go.',
            'Pass server content into client shells as `children`.',
            'Only serialisable props cross the boundary.',
            'Client Components still render to HTML on the server.',
          ],
          ar: [
            'ادفع `"use client"` إلى أدنى نقطة ممكنة في الشجرة.',
            'مرّر محتوى الخادم إلى أغلفة العميل كـ `children`.',
            'الخصائص القابلة للتسلسل وحدها تعبر الحدّ.',
            'مكوّنات العميل تُعرض إلى HTML على الخادم أيضًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'nextjs-fullstack/server-actions',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A Server Function lets a form call server code directly. No API route, no `fetch`, no manually serialising a request body — you write a function, mark it, and pass it to a form.',
          ar: 'تتيح دالة الخادم للنموذج استدعاء كود الخادم مباشرة. بلا مسار API ولا `fetch` ولا تسلسل يدوي لجسم الطلب — تكتب دالة وتعلّمها وتمرّرها لنموذج.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'app/todos/actions.ts',
        code: `'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const schema = z.object({ text: z.string().min(1).max(200) });

export async function addTodo(prevState, formData) {
  const session = await auth();                    // check the caller, every time
  if (!session) return { error: 'Not signed in' };

  const parsed = schema.safeParse({ text: formData.get('text') });
  if (!parsed.success) return { error: 'Text is required' };

  await db.todo.create({ data: { text: parsed.data.text, userId: session.userId } });
  revalidatePath('/todos');                        // refresh the cached page
  return { error: null };
}`,
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'A Server Function is a public endpoint', ar: 'دالة الخادم نقطة نهاية علنية' },
        body: {
          en: 'It compiles to an HTTP endpoint anyone can call with any payload. Hiding the button does not protect it. Authenticate, authorise and validate **inside** every action — the UI is not a security layer.',
          ar: 'تُصرَّف إلى نقطة نهاية HTTP يمكن لأي شخص استدعاؤها بأي حمولة. وإخفاء الزر لا يحميها. تحقّق من الهوية والصلاحية والبيانات **داخل** كل إجراء — فالواجهة ليست طبقة أمان.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `'use client';
import { useActionState } from 'react';
import { addTodo } from './actions';

export function TodoForm() {
  const [state, action, isPending] = useActionState(addTodo, { error: null });

  return (
    <form action={action}>
      <input name="text" required />
      <button disabled={isPending}>{isPending ? 'Adding…' : 'Add'}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}`,
      },
      {
        type: 'list',
        items: {
          en: [
            '`revalidatePath` and `revalidateTag` tell the cache what is now stale — without them the page shows old data.',
            'Return an error object rather than throwing, so the form can display it.',
            'Actions work without JavaScript: the browser posts the form and the server responds.',
            'For heavier client state you can still combine actions with TanStack Query — they are not exclusive.',
          ],
          ar: [
            '`revalidatePath` و `revalidateTag` تخبران الذاكرة بما تقادم — وبدونهما تعرض الصفحة بيانات قديمة.',
            'أعِد كائن خطأ بدل رمي استثناء ليتمكّن النموذج من عرضه.',
            'تعمل الإجراءات بلا جافاسكربت: يرسل المتصفّح النموذج ويستجيب الخادم.',
            'ولحالة عميل أثقل يمكنك دمج الإجراءات مع TanStack Query — فهما ليسا متعارضين.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Your action only runs from an admin-only page. Do you still need an authorisation check inside it?',
          ar: 'إجراؤك يعمل من صفحة للمشرفين فقط. هل تحتاج فحص صلاحية بداخله؟',
        },
        options: [
          {
            text: { en: 'Yes — the endpoint is callable directly, independently of your UI.', ar: 'نعم — فنقطة النهاية قابلة للاستدعاء مباشرة بغضّ النظر عن واجهتك.' },
            correct: true,
          },
          { text: { en: 'No, the route guard already covers it.', ar: 'لا، فحارس المسار يغطّيها.' } },
          { text: { en: 'No, Next.js verifies the caller automatically.', ar: 'لا، فـ Next.js تتحقّق من المستدعي تلقائيًا.' } },
          { text: { en: 'Only in production.', ar: 'في الإنتاج فقط.' } },
        ],
        explain: {
          en: 'Treat every action exactly like a public REST endpoint, because that is what it is. The page guard controls what is rendered, not what can be requested.',
          ar: 'عامل كل إجراء كنقطة نهاية REST علنية تمامًا، لأنه كذلك فعلًا. فحارس الصفحة يتحكّم بما يُعرض لا بما يمكن طلبه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            '`"use server"` turns a function into a callable endpoint.',
            'Authenticate, authorise and validate inside every action.',
            'Revalidate the cache after a write.',
            'Pair with `useActionState` for pending and error handling.',
          ],
          ar: [
            '`"use server"` يحوّل الدالة إلى نقطة نهاية قابلة للاستدعاء.',
            'تحقّق من الهوية والصلاحية والبيانات داخل كل إجراء.',
            'أعد التحقّق من الذاكرة بعد كل كتابة.',
            'اقرنه بـ `useActionState` لمعالجة الانتظار والأخطاء.',
          ],
        },
      },
    ],
  },

  {
    id: 'nextjs-fullstack/nextjs-data-caching',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'In a Server Component you fetch data by awaiting it — no `useEffect`, no loading state, no waterfall on the client. What you do need to understand is when the result is cached and how to invalidate it.',
          ar: 'في مكوّن الخادم تجلب البيانات بانتظارها — بلا `useEffect` ولا حالة تحميل ولا سلسلة انتظار على العميل. لكن ما تحتاج فهمه هو متى تُخزَّن النتيجة وكيف تُبطلها.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// two independent requests, started together
async function Dashboard() {
  const [stats, activity] = await Promise.all([getStats(), getActivity()]);
  return <><Stats data={stats} /><Activity data={activity} /></>;
}

// per-request caching options
await fetch(url, { next: { revalidate: 60 } });          // refresh at most once a minute
await fetch(url, { next: { tags: ['products'] } });      // invalidate by tag later
await fetch(url, { cache: 'no-store' });                 // always fresh`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Sequential awaits create waterfalls', ar: 'الانتظارات المتتابعة تخلق شلالات' },
        body: {
          en: 'Two `await`s on separate lines run one after the other on the server, adding both latencies together. Use `Promise.all` unless the second request genuinely needs the first result.',
          ar: 'انتظاران في سطرين منفصلين يعملان بالتتابع على الخادم فتُجمع الفترتان معًا. استخدم `Promise.all` إلا إذا كان الطلب الثاني يحتاج نتيجة الأول فعلًا.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// stream the slow part instead of blocking the whole page
export default function Page() {
  return (
    <>
      <Header />                        {/* instant */}
      <Suspense fallback={<FeedSkeleton />}>
        <SlowFeed />                    {/* arrives when ready */}
      </Suspense>
    </>
  );
}`,
      },
      {
        type: 'list',
        items: {
          en: [
            'Reading cookies, headers or search params makes a route dynamic — it can no longer be fully static.',
            '`revalidateTag("products")` after a write is more precise than revalidating a whole path.',
            'Streaming with Suspense sends the shell immediately, so users see something while data loads.',
            'Cache defaults change between Next.js versions — check the docs for the version you are actually on.',
          ],
          ar: [
            'قراءة الكوكيز أو الترويسات أو معاملات البحث تجعل المسار ديناميكيًا — فلا يعود ثابتًا بالكامل.',
            '`revalidateTag("products")` بعد الكتابة أدقّ من إبطال مسار كامل.',
            'البثّ عبر Suspense يرسل الهيكل فورًا فيرى المستخدمون شيئًا أثناء التحميل.',
            'تتغيّر افتراضات التخزين بين إصدارات Next.js — راجع توثيق الإصدار الذي تستخدمه فعلًا.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A product page still shows the old price after an admin edits it. What is the most likely cause?',
          ar: 'ما زالت صفحة المنتج تعرض السعر القديم بعد تعديله من المشرف. ما السبب الأرجح؟',
        },
        options: [
          {
            text: { en: 'The page is cached and nothing revalidated the path or tag after the write.', ar: 'الصفحة مخزّنة ولم يُبطل شيء المسار أو الوسم بعد الكتابة.' },
            correct: true,
          },
          { text: { en: 'Server Components cannot show fresh data.', ar: 'لا تستطيع مكوّنات الخادم عرض بيانات حديثة.' } },
          { text: { en: 'The browser cached the HTML.', ar: 'خزّن المتصفّح صفحة HTML.' } },
          { text: { en: 'The database write failed silently.', ar: 'فشلت الكتابة في قاعدة البيانات بصمت.' } },
        ],
        explain: {
          en: 'Caching is what makes these pages fast; invalidation is your responsibility. Call `revalidateTag` or `revalidatePath` in the same action that performed the write.',
          ar: 'التخزين هو ما يجعل هذه الصفحات سريعة، والإبطال مسؤوليتك. استدعِ `revalidateTag` أو `revalidatePath` في الإجراء نفسه الذي نفّذ الكتابة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Fetch by awaiting inside Server Components.',
            'Parallelise independent requests with `Promise.all`.',
            'Revalidate by tag or path after every write.',
            'Wrap slow sections in Suspense to stream them.',
          ],
          ar: [
            'اجلب بالانتظار داخل مكوّنات الخادم.',
            'وازِ الطلبات المستقلّة بـ `Promise.all`.',
            'أبطِل بالوسم أو المسار بعد كل كتابة.',
            'غلّف الأقسام البطيئة بـ Suspense لبثّها.',
          ],
        },
      },
    ],
  },

  {
    id: 'nextjs-fullstack/rendering-strategies',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'The same framework can render a page at build time, on every request, or somewhere in between — and the decision is made per route by what that route actually does.',
          ar: 'يستطيع الإطار نفسه عرض صفحة وقت البناء أو عند كل طلب أو بين ذلك — ويُتّخذ القرار لكل مسار بحسب ما يفعله فعلًا.',
        },
      },
      {
        type: 'table',
        head: { en: ['Strategy', 'Rendered', 'Use for'], ar: ['الاستراتيجية', 'متى يُعرض', 'الاستخدام'] },
        rows: [
          { en: ['Static (SSG)', 'at build time', 'marketing pages, docs, blog posts'], ar: ['ثابت (SSG)', 'وقت البناء', 'الصفحات التسويقية والتوثيق والمقالات'] },
          { en: ['ISR', 'at build, refreshed on a schedule', 'catalogues that change hourly'], ar: ['ISR', 'وقت البناء مع تحديث مجدول', 'الكتالوجات التي تتغيّر كل ساعة'] },
          { en: ['Dynamic (SSR)', 'on every request', 'dashboards, anything per-user'], ar: ['ديناميكي (SSR)', 'عند كل طلب', 'لوحات التحكّم وكل ما يخصّ المستخدم'] },
          { en: ['PPR', 'static shell + dynamic holes', 'a page that is mostly static with a personal corner'], ar: ['PPR', 'هيكل ثابت مع فجوات ديناميكية', 'صفحة ثابتة في معظمها مع ركن شخصي'] },
        ],
      },
      {
        type: 'text',
        text: {
          en: 'You rarely choose explicitly. Reading `cookies()`, `headers()` or `searchParams` marks a route dynamic; using none of them leaves it static. Partial Pre-rendering then lets one page be both: the shell is served instantly from the edge while the personalised part streams in.',
          ar: 'نادرًا ما تختار صراحةً. فقراءة `cookies()` أو `headers()` أو `searchParams` تجعل المسار ديناميكيًا، وعدم استخدامها يبقيه ثابتًا. ثم يتيح العرض المسبق الجزئي للصفحة الواحدة أن تكون الاثنين: يُقدَّم الهيكل فورًا من الحافة بينما يُبثّ الجزء الشخصي.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// pre-render the known paths at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// or refresh this route at most once an hour
export const revalidate = 3600;`,
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Default to static and let a genuine requirement — a session, a search param, a per-user price — pull a route into dynamic rendering. Starting dynamic "just in case" gives away the biggest performance win the framework offers.',
          ar: 'اجعل الافتراضي ثابتًا ودع متطلّبًا حقيقيًا — جلسة أو معامل بحث أو سعر خاص بالمستخدم — يجرّ المسار إلى العرض الديناميكي. فالبدء ديناميكيًا «احتياطًا» يفرّط بأكبر مكسب أداء يقدّمه الإطار.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A pricing page is identical for everyone except a small "your plan" banner. What is the best fit?',
          ar: 'صفحة أسعار متطابقة للجميع عدا شريط صغير «خطتك». ما الأنسب؟',
        },
        options: [
          {
            text: { en: 'A static page with the banner in a dynamic Suspense hole — partial pre-rendering.', ar: 'صفحة ثابتة مع الشريط في فجوة Suspense ديناميكية — عرض مسبق جزئي.' },
            correct: true,
          },
          { text: { en: 'Fully dynamic, so the banner is always right.', ar: 'ديناميكية بالكامل ليكون الشريط صحيحًا دائمًا.' } },
          { text: { en: 'Fully static, with the banner fetched in a `useEffect`.', ar: 'ثابتة بالكامل مع جلب الشريط في `useEffect`.' } },
          { text: { en: 'Client-side rendering for the whole page.', ar: 'عرض الصفحة كاملة على العميل.' } },
        ],
        explain: {
          en: 'Going fully dynamic for one banner throws away caching for the other 95% of the page. The `useEffect` version ships a slower, flash-prone page for the same result.',
          ar: 'جعلها ديناميكية بالكامل لأجل شريط واحد يهدر التخزين لبقية 95% من الصفحة. ونسخة `useEffect` تُنتج صفحة أبطأ وأكثر وميضًا للنتيجة نفسها.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Static by default; dynamic when the route reads request data.',
            'ISR refreshes static pages on a schedule.',
            'PPR combines a cached shell with streamed personal content.',
            'Choose per route, not per application.',
          ],
          ar: [
            'ثابت افتراضيًا، وديناميكي حين يقرأ المسار بيانات الطلب.',
            'ISR يحدّث الصفحات الثابتة وفق جدول.',
            'PPR يجمع هيكلًا مخزّنًا مع محتوى شخصي مبثوث.',
            'اختر لكل مسار لا لكل تطبيق.',
          ],
        },
      },
    ],
  },

  {
    id: 'nextjs-fullstack/auth-and-middleware',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Authentication is where a full-stack app becomes real — and where most tutorials get dangerously vague. The rule that keeps you safe: check the session **where the data is accessed**, not where the link is rendered.',
          ar: 'المصادقة هي حيث يصبح التطبيق المتكامل حقيقيًا — وحيث تصبح معظم الدروس غامضة بشكل خطر. والقاعدة التي تحميك: افحص الجلسة **حيث تُقرأ البيانات** لا حيث يُعرض الرابط.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// in every protected page, layout and action
const session = await auth();
if (!session) redirect('/login');

// route handler — a normal HTTP endpoint when you need one
export async function GET(request: Request) {
  const session = await auth();
  if (!session) return new Response('Unauthorized', { status: 401 });
  return Response.json(await getData(session.userId));
}`,
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'Middleware is not a security boundary', ar: 'الوسيط ليس حدًّا أمنيًا' },
        body: {
          en: 'Middleware runs early and is perfect for redirecting an obviously signed-out visitor. But it can be bypassed by anything that calls your data layer directly, and it does not know your row-level permissions. Always check again server-side where the query happens.',
          ar: 'يعمل الوسيط مبكرًا وهو مثالي لتحويل زائر غير مسجَّل بوضوح. لكن يمكن تجاوزه بأي شيء يستدعي طبقة بياناتك مباشرة، وهو لا يعرف صلاحياتك على مستوى السجلّ. افحص دائمًا مرة أخرى على الخادم حيث يقع الاستعلام.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Sessions belong in **httpOnly** cookies — JavaScript cannot read them, so an XSS bug cannot steal the token.',
            'Authorisation is per resource: "is this invoice owned by this user" cannot be answered by a route guard.',
            'Use a maintained library (Auth.js, Clerk, Supabase Auth, Lucia) rather than hand-rolling password hashing and session rotation.',
            'Never trust a user id sent from the client — read it from the session on the server.',
          ],
          ar: [
            'الجلسات مكانها كوكيز **httpOnly** — فلا تستطيع جافاسكربت قراءتها، ولا يستطيع خلل XSS سرقة الرمز.',
            'التخويل لكل مورد: «هل هذه الفاتورة مملوكة لهذا المستخدم» لا يجيب عنه حارس مسار.',
            'استخدم مكتبة مُصانة (Auth.js أو Clerk أو Supabase Auth أو Lucia) بدل بناء التجزئة وتدوير الجلسات يدويًا.',
            'لا تثق أبدًا بمعرّف مستخدم قادم من العميل — اقرأه من الجلسة على الخادم.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A user changes the id in `/invoices/1042` to `1043` and sees someone else’s invoice. What was missing?',
          ar: 'غيّر مستخدم المعرّف في `/invoices/1042` إلى `1043` فرأى فاتورة شخص آخر. ما الناقص؟',
        },
        options: [
          {
            text: {
              en: 'An ownership check in the query — authentication proved who they are, not what they may read.',
              ar: 'فحص ملكية في الاستعلام — فالمصادقة أثبتت من هو لا ما يحقّ له قراءته.',
            },
            correct: true,
          },
          { text: { en: 'Middleware on the `/invoices` path.', ar: 'وسيط على مسار `/invoices`.' } },
          { text: { en: 'An httpOnly cookie.', ar: 'كوكي httpOnly.' } },
          { text: { en: 'HTTPS.', ar: 'HTTPS.' } },
        ],
        explain: {
          en: 'This is the most common real-world vulnerability in CRUD apps. The query must be scoped: `where: { id, userId: session.userId }` — not just `where: { id }`.',
          ar: 'هذه أشهر ثغرة واقعية في تطبيقات CRUD. ويجب تقييد الاستعلام: `where: { id, userId: session.userId }` لا `where: { id }` فقط.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Check the session where data is accessed, in every page and action.',
            'Middleware redirects; it does not authorise.',
            'Scope every query by the owner from the session.',
            'Use httpOnly cookies and a maintained auth library.',
          ],
          ar: [
            'افحص الجلسة حيث تُقرأ البيانات، في كل صفحة وإجراء.',
            'الوسيط يحوّل ولا يخوّل.',
            'قيّد كل استعلام بالمالك المأخوذ من الجلسة.',
            'استخدم كوكيز httpOnly ومكتبة مصادقة مُصانة.',
          ],
        },
      },
    ],
  },

  {
    id: 'nextjs-fullstack/deploying',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Deployment is the step that turns a project into a portfolio piece. Most first deployments fail for the same three reasons, and all of them are avoidable.',
          ar: 'النشر هو الخطوة التي تحوّل المشروع إلى عمل في معرضك. ومعظم النشرات الأولى تفشل للأسباب الثلاثة نفسها، وكلها قابلة للتجنّب.',
        },
      },
      {
        type: 'steps',
        steps: [
          {
            title: { en: 'Set the environment variables', ar: 'اضبط متغيّرات البيئة' },
            body: {
              en: 'Your `.env` is not deployed. Add every variable in the host’s dashboard, and remember that only `NEXT_PUBLIC_` ones reach the browser.',
              ar: 'ملف `.env` لا يُنشر. أضف كل متغيّر في لوحة الاستضافة، وتذكّر أن ما يبدأ بـ `NEXT_PUBLIC_` وحده يصل المتصفّح.',
            },
          },
          {
            title: { en: 'Run migrations against the real database', ar: 'شغّل الترحيلات على قاعدة البيانات الحقيقية' },
            body: {
              en: 'A production database starts empty. Wire migrations into the build or run them as a release step.',
              ar: 'قاعدة بيانات الإنتاج تبدأ فارغة. اربط الترحيلات بالبناء أو شغّلها كخطوة إصدار.',
            },
          },
          {
            title: { en: 'Fix what only breaks in a build', ar: 'أصلح ما لا ينكسر إلا في البناء' },
            body: {
              en: 'Type errors, case-sensitive imports (`Button` vs `button` — fine on Windows, fatal on Linux) and code that touches `window` during server rendering.',
              ar: 'أخطاء الأنواع، والاستيرادات الحسّاسة لحالة الأحرف (`Button` مقابل `button` — مقبولة على ويندوز وقاتلة على لينكس)، وكود يلمس `window` أثناء العرض على الخادم.',
            },
          },
          {
            title: { en: 'Verify on the deployed URL', ar: 'تحقّق على الرابط المنشور' },
            body: {
              en: 'Check auth, a write path, and one page on a real phone. Localhost is a forgiving environment; production is not.',
              ar: 'افحص المصادقة ومسار كتابة وصفحة على هاتف حقيقي. فالمحلي بيئة متسامحة والإنتاج ليس كذلك.',
            },
          },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Preview deployments — one URL per pull request — are the single most useful habit here. You review a working page instead of imagining one from a diff.',
          ar: 'نشرات المعاينة — رابط لكل طلب دمج — هي أنفع عادة هنا. فتراجع صفحة تعمل بدل تخيّلها من فروق الكود.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Vercel is the path of least resistance for Next.js; a Node host or a container works too and avoids lock-in.',
            'A Vite SPA is just static files — any static host will serve it, but configure the fallback to `index.html` or refreshing a route returns 404.',
            'Add error monitoring (Sentry or similar) before you have users, not after your first silent failure.',
            'Never commit `.env` — rotate any secret that has ever been pushed.',
          ],
          ar: [
            'Vercel أقلّ الطرق مقاومة لـ Next.js، ويعمل مضيف Node أو حاوية أيضًا ويتجنّب الارتهان.',
            'تطبيق Vite أحادي الصفحة مجرّد ملفات ثابتة — يخدمه أي مضيف ثابت، لكن اضبط الارتداد إلى `index.html` وإلا أعاد تحديث المسار خطأ 404.',
            'أضف مراقبة الأخطاء (Sentry أو نظيره) قبل أن يكون لديك مستخدمون لا بعد أول فشل صامت.',
            'لا تُودع `.env` أبدًا — وغيّر أي سرّ سبق دفعه.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Your app builds locally but fails on the host with "Module not found: ./components/button".',
          ar: 'يُبنى تطبيقك محليًا لكنه يفشل على المضيف بـ «Module not found: ./components/button».',
        },
        options: [
          {
            text: {
              en: 'The import case does not match the filename — Windows and macOS ignore case, Linux does not.',
              ar: 'حالة أحرف الاستيراد لا تطابق اسم الملف — فويندوز وماك يتجاهلان الحالة ولينكس لا.',
            },
            correct: true,
          },
          { text: { en: 'The dependency is missing from `package.json`.', ar: 'الاعتمادية مفقودة من `package.json`.' } },
          { text: { en: 'The build ran out of memory.', ar: 'نفدت ذاكرة البناء.' } },
          { text: { en: 'The host needs a different Node version.', ar: 'يحتاج المضيف إصدار Node مختلفًا.' } },
        ],
        explain: {
          en: 'A classic. Build servers run Linux, where `Button.tsx` and `button.tsx` are two different files. Keep filename casing consistent and let CI catch it before the deploy does.',
          ar: 'خطأ كلاسيكي. فخوادم البناء تعمل بلينكس حيث `Button.tsx` و `button.tsx` ملفان مختلفان. حافظ على اتساق حالة الأحرف ودع CI يلتقطها قبل النشر.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Set env vars on the host — `.env` never ships.',
            'Migrate the production database as part of releasing.',
            'Linux is case-sensitive; your laptop probably is not.',
            'Use preview deployments and add error monitoring early.',
          ],
          ar: [
            'اضبط متغيّرات البيئة على المضيف — فـ `.env` لا يُنشر أبدًا.',
            'رحّل قاعدة بيانات الإنتاج كجزء من الإصدار.',
            'لينكس حسّاس لحالة الأحرف، وحاسوبك غالبًا ليس كذلك.',
            'استخدم نشرات المعاينة وأضف مراقبة الأخطاء مبكرًا.',
          ],
        },
      },
    ],
  },
]

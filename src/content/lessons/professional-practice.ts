import type { LessonBody } from '../blocks'

export const professionalPractice: LessonBody[] = [
  {
    id: 'professional-practice/design-patterns',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Patterns are not rules to apply — they are names for solutions you will keep rediscovering. Knowing the names makes code reviews shorter and design discussions possible.',
          ar: 'الأنماط ليست قواعد تُطبَّق، بل أسماء لحلول ستعيد اكتشافها مرارًا. ومعرفة الأسماء تختصر مراجعات الكود وتجعل نقاش التصميم ممكنًا.',
        },
      },
      {
        type: 'table',
        head: { en: ['Pattern', 'Solves'], ar: ['النمط', 'يحلّ'] },
        rows: [
          { en: ['Compound components', 'a component with too many layout props'], ar: ['المكوّنات المركّبة', 'مكوّن بخصائص تخطيط أكثر من اللازم'] },
          { en: ['Provider', 'a value many descendants need'], ar: ['المزوّد', 'قيمة يحتاجها أحفاد كثيرون'] },
          { en: ['Custom hook', 'stateful logic used in several places'], ar: ['الخطّاف المخصّص', 'منطق ذو حالة يُستخدم في أماكن عدة'] },
          { en: ['Container / presentational', 'a component doing both fetching and rendering'], ar: ['الحاوية/العرض', 'مكوّن يجلب ويعرض معًا'] },
          { en: ['Render prop / slots', 'the caller must control part of the markup'], ar: ['دالة العرض/الفتحات', 'حاجة المستدعي للتحكّم بجزء من الوسوم'] },
        ],
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// compound components: shared state through context, markup owned by the caller
const TabsContext = createContext(null);

function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  const ctx = useMemo(() => ({ value, setValue }), [value]);
  return <TabsContext value={ctx}>{children}</TabsContext>;
}

Tabs.Trigger = function Trigger({ value, children }) {
  const { value: active, setValue } = useContext(TabsContext);
  return (
    <button aria-selected={active === value} onClick={() => setValue(value)}>
      {children}
    </button>
  );
};`,
      },
      {
        type: 'callout',
        tone: 'warn',
        body: {
          en: 'Reach for a pattern when the pain is real, not in anticipation. A compound component with one consumer is more machinery than a plain component with three props — and machinery is what future readers have to understand.',
          ar: 'استخدم النمط حين يكون الألم حقيقيًا لا استباقًا. فمكوّن مركّب بمستهلك واحد آليّة أثقل من مكوّن عادي بثلاث خصائص — والآليّة هي ما سيضطر القرّاء لفهمه لاحقًا.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A `<DataTable>` has grown to 14 props controlling headers, footers, empty states and toolbars. Which pattern fits?',
          ar: 'نما `<DataTable>` إلى 14 خاصية تتحكّم بالترويسات والتذييلات وحالات الفراغ وأشرطة الأدوات. أي نمط يناسب؟',
        },
        options: [
          {
            text: { en: 'Compound components — let the caller compose the parts.', ar: 'المكوّنات المركّبة — دع المستدعي يركّب الأجزاء.' },
            correct: true,
          },
          { text: { en: 'A provider around the table.', ar: 'مزوّد حول الجدول.' } },
          { text: { en: 'Move all 14 props into one config object.', ar: 'انقل الخصائص الأربع عشرة إلى كائن إعداد واحد.' } },
          { text: { en: 'Split it into 14 separate tables.', ar: 'قسّمه إلى أربعة عشر جدولًا منفصلًا.' } },
        ],
        explain: {
          en: 'A config object just renames the problem — it is still one component trying to anticipate every layout. Composition lets callers build layouts you never thought of, without touching the table.',
          ar: 'كائن الإعداد يعيد تسمية المشكلة فقط — فهو ما زال مكوّنًا واحدًا يحاول توقّع كل تخطيط. أما التركيب فيتيح للمستدعين بناء تخطيطات لم تخطر لك دون لمس الجدول.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Patterns are shared vocabulary, not obligations.',
            'Compound components replace prop explosions.',
            'Custom hooks are the main reuse mechanism in React.',
            'Introduce a pattern when the pain exists, not before.',
          ],
          ar: [
            'الأنماط مفردات مشتركة لا التزامات.',
            'المكوّنات المركّبة تُنهي انفجار الخصائص.',
            'الخطّافات المخصّصة آلية إعادة الاستخدام الأساسية في رياكت.',
            'أدخل النمط حين يوجد الألم لا قبله.',
          ],
        },
      },
    ],
  },

  {
    id: 'professional-practice/reading-codebases',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Your first week on a new team is spent reading, not writing. There is a method that beats scrolling through folders hoping something clicks.',
          ar: 'أسبوعك الأول في فريق جديد للقراءة لا للكتابة. وهناك طريقة تتفوّق على تصفّح المجلدات على أمل أن يتّضح شيء.',
        },
      },
      {
        type: 'steps',
        steps: [
          {
            title: { en: 'Run it first', ar: 'شغّله أولًا' },
            body: {
              en: 'Get the app working locally before reading a single component. Nothing makes code legible faster than seeing what it produces.',
              ar: 'شغّل التطبيق محليًا قبل قراءة أي مكوّن. فلا شيء يجعل الكود مقروءًا أسرع من رؤية ما ينتجه.',
            },
          },
          {
            title: { en: 'Follow one feature end to end', ar: 'تتبّع ميزة واحدة من طرف لطرف' },
            body: {
              en: 'Pick something visible, then trace it from the route to the component to the data layer to the API. One vertical slice teaches you the conventions of the whole codebase.',
              ar: 'اختر شيئًا مرئيًا ثم تتبّعه من المسار إلى المكوّن إلى طبقة البيانات إلى الواجهة. فشريحة رأسية واحدة تعلّمك أعراف المشروع كله.',
            },
          },
          {
            title: { en: 'Read the tests', ar: 'اقرأ الاختبارات' },
            body: {
              en: 'They document intended behaviour and the edge cases someone already hit. Often they are the only accurate documentation present.',
              ar: 'فهي توثّق السلوك المقصود والحالات الحدّية التي واجهها أحدهم. وغالبًا تكون التوثيق الدقيق الوحيد الموجود.',
            },
          },
          {
            title: { en: 'Use git as an oracle', ar: 'استخدم git كمرجع' },
            body: {
              en: '`git log -p path/to/file` and `git blame` tell you why odd code exists. That "unnecessary" check usually has an incident behind it.',
              ar: '`git log -p path/to/file` و `git blame` يخبرانك لماذا وُجد الكود الغريب. فذلك الفحص «غير الضروري» وراءه حادثة عادةً.',
            },
          },
        ],
      },
      {
        type: 'heading',
        text: { en: 'Reviewing someone else’s pull request', ar: 'مراجعة طلب دمج لغيرك' },
      },
      {
        type: 'list',
        items: {
          en: [
            'Read the description first. If you cannot tell what problem it solves, that is your first comment.',
            'Correctness, then clarity, then style — and let the formatter own style entirely.',
            'Ask questions instead of issuing orders: "what happens if `items` is empty here?" invites a fix and a conversation.',
            'Say what is good. A review that only lists faults is exhausting to receive and teaches nothing.',
            'Approve with minor comments rather than blocking on preferences — a blocked PR costs the team more than an imperfect variable name.',
          ],
          ar: [
            'اقرأ الوصف أولًا. وإن لم تعرف أي مشكلة يحلّ، فتلك ملاحظتك الأولى.',
            'الصحّة ثم الوضوح ثم الأسلوب — ودع أداة التنسيق تملك الأسلوب كاملًا.',
            'اطرح أسئلة بدل إصدار أوامر: «ماذا يحدث إذا كانت `items` فارغة هنا؟» تدعو إلى إصلاح وحوار.',
            'اذكر ما هو جيد. فمراجعة تسرد العيوب فقط مرهقة للمتلقّي ولا تعلّم شيئًا.',
            'وافق مع ملاحظات بسيطة بدل التعطيل لأجل تفضيلات — فطلب معطَّل يكلّف الفريق أكثر من اسم متغيّر غير مثالي.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You find a strange-looking `if` with no comment. What is the best first move?',
          ar: 'وجدت جملة `if` غريبة الشكل بلا تعليق. ما أفضل خطوة أولى؟',
        },
        options: [
          {
            text: { en: '`git blame` it and read the commit message and linked issue.', ar: 'شغّل `git blame` واقرأ رسالة الإيداع والمسألة المرتبطة.' },
            correct: true,
          },
          { text: { en: 'Delete it and see whether the tests still pass.', ar: 'احذفها وانظر هل تنجح الاختبارات.' } },
          { text: { en: 'Rewrite the function around it.', ar: 'أعد كتابة الدالة حولها.' } },
          { text: { en: 'Leave it and work around it.', ar: 'اتركها واعمل حولها.' } },
        ],
        explain: {
          en: 'History is documentation. Tests rarely cover the production edge case that caused someone to add that line at 2 a.m.',
          ar: 'السجل توثيق. ونادرًا ما تغطّي الاختبارات الحالة الإنتاجية الحدّية التي دفعت أحدهم لإضافة ذلك السطر في الثانية فجرًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Run the app before reading it.',
            'Trace one vertical slice to learn the conventions.',
            'Tests and git history are the real documentation.',
            'Review for correctness first, and ask rather than instruct.',
          ],
          ar: [
            'شغّل التطبيق قبل قراءته.',
            'تتبّع شريحة رأسية واحدة لتتعلّم الأعراف.',
            'الاختبارات وسجلّ git هما التوثيق الحقيقي.',
            'راجع الصحّة أولًا، واسأل بدل أن تأمر.',
          ],
        },
      },
    ],
  },

  {
    id: 'professional-practice/ci-cd',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Continuous integration is a machine that runs your checks on every push, so "it works on my machine" stops being an argument anyone can make.',
          ar: 'التكامل المستمر آلة تشغّل فحوصك عند كل دفع، فتتوقف «تعمل على جهازي» عن كونها حجّة يستطيع أحد استخدامها.',
        },
      },
      {
        type: 'code',
        lang: 'json',
        filename: '.github/workflows/ci.yml',
        code: `name: CI
on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test -- --run`,
      },
      {
        type: 'list',
        items: {
          en: [
            '`npm ci` installs exactly the lockfile — never `npm install` in CI.',
            'Run lint, type-check (via the build) and tests. In that order, because the cheapest check should fail first.',
            'Protect the main branch: require the checks to pass before a merge is possible.',
            'Keep the pipeline under about five minutes, or people will start merging without waiting for it.',
          ],
          ar: [
            '`npm ci` يثبّت ما في ملف القفل بالضبط — ولا تستخدم `npm install` في CI أبدًا.',
            'شغّل الفحص وفحص الأنواع (عبر البناء) والاختبارات. بهذا الترتيب لأن الأرخص يجب أن يفشل أولًا.',
            'احمِ الفرع الرئيسي: اشترط نجاح الفحوص قبل إمكانية الدمج.',
            'أبقِ خطّ الأنابيب تحت خمس دقائق تقريبًا، وإلا بدأ الناس بالدمج دون انتظاره.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'The real payoff is social', ar: 'المكسب الحقيقي اجتماعي' },
        body: {
          en: 'CI removes the awkward conversation. Nobody has to tell a colleague their branch is broken — the pipeline does it immediately, consistently, and without any judgement attached.',
          ar: 'يزيل CI المحادثة المحرجة. فلا يحتاج أحد إلى إخبار زميله بأن فرعه معطّل — إذ يفعلها خطّ الأنابيب فورًا وباتساق ودون أي حكم شخصي.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Why should CI use `npm ci` rather than `npm install`?',
          ar: 'لماذا يجب أن يستخدم CI الأمر `npm ci` بدل `npm install`؟',
        },
        options: [
          {
            text: {
              en: 'It installs the exact locked versions, so CI tests the same code every time.',
              ar: 'لأنه يثبّت الإصدارات المقفلة بالضبط، فيختبر CI الكود نفسه في كل مرة.',
            },
            correct: true,
          },
          { text: { en: 'It is the only command that works on Linux.', ar: 'لأنه الأمر الوحيد الذي يعمل على لينكس.' } },
          { text: { en: 'It automatically updates dependencies.', ar: 'لأنه يحدّث الاعتماديات تلقائيًا.' } },
          { text: { en: 'It skips devDependencies.', ar: 'لأنه يتخطّى اعتماديات التطوير.' } },
        ],
        explain: {
          en: '`npm install` may resolve a newer compatible version and quietly change what is being tested. `npm ci` is deterministic — and it fails loudly if the lockfile and `package.json` disagree.',
          ar: 'قد يحسم `npm install` إصدارًا أحدث متوافقًا فيغيّر ما يُختبر بصمت. أما `npm ci` فحتمي — ويفشل بوضوح إذا اختلف ملف القفل عن `package.json`.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Lint, build and test on every push.',
            '`npm ci` for reproducible installs.',
            'Require passing checks before merging.',
            'Keep it fast enough that nobody routes around it.',
          ],
          ar: [
            'افحص وابنِ واختبر عند كل دفع.',
            '`npm ci` لتثبيت قابل لإعادة الإنتاج.',
            'اشترط نجاح الفحوص قبل الدمج.',
            'أبقِه سريعًا كي لا يتحايل عليه أحد.',
          ],
        },
      },
    ],
  },

  {
    id: 'professional-practice/storybook',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Storybook renders a component in isolation, in every state it can be in. It is how you build a loading state without breaking the network on purpose, and an error state without a real failure.',
          ar: 'يعرض Storybook المكوّن بمعزل في كل حالة يمكن أن يكون عليها. وبه تبني حالة تحميل دون قطع الشبكة عمدًا، وحالة خطأ دون فشل حقيقي.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'Button.stories.tsx',
        code: `import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = { component: Button };
export default meta;

export const Primary: StoryObj<typeof Button> = { args: { children: 'Save' } };
export const Loading: StoryObj<typeof Button> = { args: { children: 'Save', isLoading: true } };
export const Disabled: StoryObj<typeof Button> = { args: { children: 'Save', disabled: true } };`,
      },
      {
        type: 'list',
        items: {
          en: [
            'A story is a component in one specific state — every story you write is documentation that cannot go stale silently.',
            'It surfaces states nobody tests by hand: a very long label, an empty list, an error, a right-to-left layout.',
            'The a11y addon reports contrast and ARIA problems per story, while you are still building.',
            'Designers and product people can review a component without running your dev server.',
          ],
          ar: [
            'القصة مكوّن في حالة محدّدة — وكل قصة تكتبها توثيق لا يتقادم بصمت.',
            'وتُظهر حالات لا يختبرها أحد يدويًا: تسمية طويلة جدًا أو قائمة فارغة أو خطأ أو تخطيط من اليمين لليسار.',
            'وإضافة الإتاحة تُبلّغ عن مشاكل التباين و ARIA لكل قصة أثناء البناء.',
            'ويستطيع المصمّمون وفريق المنتج مراجعة مكوّن دون تشغيل خادم التطوير لديك.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'note',
        body: {
          en: 'For a bilingual product, add a story with the direction set to RTL. Mirroring bugs are almost invisible until you look at them side by side — and then they are obvious.',
          ar: 'وفي منتج ثنائي اللغة، أضف قصة باتجاه من اليمين لليسار. فأخطاء الانعكاس تكاد تكون خفية حتى تنظر إليهما جنبًا إلى جنب — عندها تصبح واضحة.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'What does Storybook give you that a normal page in the app does not?',
          ar: 'ما الذي يمنحك إياه Storybook ولا تمنحه صفحة عادية في التطبيق؟',
        },
        options: [
          {
            text: {
              en: 'Direct access to every state — loading, error, empty, extreme content — without arranging the data to produce it.',
              ar: 'وصولًا مباشرًا إلى كل حالة — تحميل وخطأ وفراغ ومحتوى متطرّف — دون ترتيب بيانات لإنتاجها.',
            },
            correct: true,
          },
          { text: { en: 'Faster production builds.', ar: 'بناءات إنتاج أسرع.' } },
          { text: { en: 'It replaces unit tests.', ar: 'يحلّ محلّ اختبارات الوحدة.' } },
          { text: { en: 'Automatic accessibility fixes.', ar: 'إصلاحات إتاحة تلقائية.' } },
        ],
        explain: {
          en: 'Reaching an error state inside a real app can mean breaking the API on purpose. In Storybook it is one exported object.',
          ar: 'الوصول إلى حالة خطأ داخل تطبيق حقيقي قد يعني تعطيل الواجهة عمدًا. أما في Storybook فهو كائن مُصدَّر واحد.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'One story per meaningful state.',
            'Documentation that stays in sync because it is code.',
            'Catches edge cases and accessibility issues early.',
            'Add an RTL story for bilingual products.',
          ],
          ar: [
            'قصة واحدة لكل حالة ذات معنى.',
            'توثيق يبقى متزامنًا لأنه كود.',
            'يلتقط الحالات الحدّية ومشاكل الإتاحة مبكرًا.',
            'أضف قصة بالاتجاه من اليمين للمنتجات ثنائية اللغة.',
          ],
        },
      },
    ],
  },

  {
    id: 'professional-practice/portfolio-and-interviews',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A reviewer spends about two minutes on your portfolio. Two or three finished, deployed projects with a clear README will beat fifteen half-built tutorial clones every single time.',
          ar: 'يقضي المراجع دقيقتين تقريبًا على معرضك. ومشروعان أو ثلاثة مكتملة ومنشورة مع README واضح تتفوّق على خمسة عشر تقليدًا نصف مبني في كل مرة.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Deploy it. A GitHub repository with no live link asks the reviewer to do work they will not do.',
            'The README should open with a screenshot, one sentence on what it does, the live URL, and how to run it.',
            'Add a short "decisions" section: why Zustand and not Redux, why this data shape, what you would change with another week.',
            'Solve a real problem you had. A niche tool you actually use is more memorable than another to-do app.',
            'Make it accessible and responsive — that alone puts you above most submissions.',
          ],
          ar: [
            'انشره. فمستودع GitHub بلا رابط حيّ يطلب من المراجع عملًا لن يقوم به.',
            'يجب أن يبدأ README بلقطة شاشة وجملة عمّا يفعله والرابط الحيّ وكيفية تشغيله.',
            'أضف قسمًا قصيرًا للقرارات: لماذا Zustand لا Redux، ولماذا هذا الشكل للبيانات، وما الذي كنت ستغيّره بأسبوع إضافي.',
            'حلّ مشكلة حقيقية واجهتك. فأداة متخصّصة تستخدمها فعلًا أبقى في الذاكرة من تطبيق مهام آخر.',
            'واجعله متاحًا ومتجاوبًا — فهذا وحده يضعك فوق معظم المشاركات.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'Interviews test explanation, not recall', ar: 'المقابلات تختبر الشرح لا الحفظ' },
        body: {
          en: 'Nobody will ask you to recite the `useEffect` signature. They will ask why you chose something, what the trade-off was, and what broke. Be able to walk through one of your own pull requests out loud.',
          ar: 'لن يطلب منك أحد سرد توقيع `useEffect`. بل سيسألون لماذا اخترت شيئًا وما المقايضة وما الذي انكسر. كن قادرًا على شرح أحد طلبات الدمج الخاصة بك بصوت عالٍ.',
        },
      },
      {
        type: 'table',
        head: { en: ['Likely question', 'What they are really checking'], ar: ['سؤال محتمل', 'ما يفحصونه فعلًا'] },
        rows: [
          { en: ['"Why did you pick this library?"', 'Can you weigh trade-offs, or do you follow trends?'], ar: ['«لماذا اخترت هذه المكتبة؟»', 'هل تزن المفاضلات أم تتبع الموضة؟'] },
          { en: ['"How would you debug a slow page?"', 'Do you measure, or do you guess?'], ar: ['«كيف تصحّح صفحة بطيئة؟»', 'هل تقيس أم تخمّن؟'] },
          { en: ['"Tell me about a bug that took a long time."', 'How do you reason under uncertainty?'], ar: ['«حدّثني عن خلل استغرق وقتًا طويلًا».', 'كيف تفكّر تحت عدم اليقين؟'] },
          { en: ['"What would you refactor here?"', 'Can you critique your own work honestly?'], ar: ['«ما الذي كنت ستعيد هيكلته هنا؟»', 'هل تنقد عملك بصدق؟'] },
        ],
      },
      {
        type: 'quiz',
        question: {
          en: 'Which portfolio is strongest for a first React role?',
          ar: 'أي معرض أقوى لأول وظيفة رياكت؟',
        },
        options: [
          {
            text: {
              en: 'Two deployed apps with tests, a real README and documented decisions.',
              ar: 'تطبيقان منشوران مع اختبارات و README حقيقي وقرارات موثّقة.',
            },
            correct: true,
          },
          { text: { en: 'Twelve tutorial projects with no live links.', ar: 'اثنا عشر مشروعًا تعليميًا بلا روابط حيّة.' } },
          { text: { en: 'One very large unfinished app.', ar: 'تطبيق واحد ضخم غير مكتمل.' } },
          { text: { en: 'A list of courses completed.', ar: 'قائمة بالدورات المكتملة.' } },
        ],
        explain: {
          en: 'Depth signals that you can finish and maintain something. Breadth of half-finished clones signals the opposite, however much time went into them.',
          ar: 'العمق يدلّ على قدرتك على الإنهاء والصيانة. أما اتساع النسخ نصف المكتملة فيدلّ على العكس مهما بذلت فيها من وقت.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Deploy everything you want reviewed.',
            'Screenshot, live link, and how to run it — at the top of the README.',
            'Document your decisions and their trade-offs.',
            'Practise explaining your own code out loud.',
          ],
          ar: [
            'انشر كل ما تريد مراجعته.',
            'لقطة شاشة ورابط حيّ وطريقة التشغيل — في أعلى README.',
            'وثّق قراراتك ومفاضلاتها.',
            'تدرّب على شرح كودك بصوت عالٍ.',
          ],
        },
      },
    ],
  },

  {
    id: 'professional-practice/staying-current',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'The ecosystem moves quickly, but far less than social media suggests. Fundamentals from five years ago still hold; what changes is which library is fashionable this quarter.',
          ar: 'تتحرّك المنظومة بسرعة، لكن أقلّ بكثير مما توحي به وسائل التواصل. فالأساسيات من خمس سنوات ما زالت صالحة، والمتغيّر هو أي مكتبة رائجة هذا الربع.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Follow the primary sources: the React blog, the Next.js blog, release notes and RFCs. One hour a month covers the real news.',
            'Ignore "X is dead" posts. Something with millions of downloads does not die in a quarter.',
            'Learn a new tool by rebuilding something you already know. You are then comparing, not learning two things at once.',
            'Read the code of libraries you depend on when something surprises you — it is the fastest way to stop being surprised.',
          ],
          ar: [
            'تابع المصادر الأصلية: مدوّنة رياكت ومدوّنة Next.js وملاحظات الإصدارات والمقترحات. فساعة شهريًا تغطّي الأخبار الحقيقية.',
            'تجاهل منشورات «س قد مات». فما له ملايين التنزيلات لا يموت في ربع سنة.',
            'تعلّم أداة جديدة بإعادة بناء شيء تعرفه. فتكون حينها تقارن لا تتعلّم أمرين معًا.',
            'واقرأ كود المكتبات التي تعتمد عليها حين يفاجئك شيء — فهو أسرع طريق للتوقّف عن المفاجأة.',
          ],
        },
      },
      {
        type: 'heading',
        text: { en: 'Evaluating a new library in ten minutes', ar: 'تقييم مكتبة جديدة في عشر دقائق' },
      },
      {
        type: 'table',
        head: { en: ['Check', 'Why'], ar: ['الفحص', 'السبب'] },
        rows: [
          { en: ['Last release and open-issue trend', 'is anyone still maintaining it?'], ar: ['آخر إصدار واتجاه المسائل المفتوحة', 'هل ما زال أحد يصونها؟'] },
          { en: ['Bundle size and tree-shaking', 'what does it cost your users?'], ar: ['حجم الحزمة وقابلية الهزّ الشجري', 'كم تكلّف مستخدميك؟'] },
          { en: ['TypeScript types shipped', 'first-class, or an afterthought?'], ar: ['هل الأنواع مرفقة', 'أصيلة أم فكرة لاحقة؟'] },
          { en: ['How hard is it to remove?', 'the most underrated question of all'], ar: ['ما صعوبة إزالتها؟', 'أكثر الأسئلة تقليلًا من شأنه'] },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'The most valuable thing you can carry forward from this whole roadmap is not any library. It is the habit of asking "what problem does this solve, and what does it cost?" — that question outlives every tool on this page.',
          ar: 'أثمن ما تحمله من هذه الخارطة كلها ليس مكتبة. بل عادة السؤال: «ما المشكلة التي يحلّها هذا وما تكلفته؟» — وهذا السؤال يعمّر أطول من كل أداة في هذه الصفحة.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A popular new state library is trending. What is the sensible response?',
          ar: 'مكتبة حالة جديدة رائجة. ما التصرّف المعقول؟',
        },
        options: [
          {
            text: {
              en: 'Build one small thing with it, see what it solves that your current tool does not, and only then consider adopting it.',
              ar: 'ابنِ بها شيئًا صغيرًا، وانظر ما تحلّه ولا تحلّه أداتك الحالية، ثم فكّر في تبنّيها.',
            },
            correct: true,
          },
          { text: { en: 'Migrate the main project this sprint.', ar: 'رحّل المشروع الرئيسي هذه الدورة.' } },
          { text: { en: 'Ignore everything new on principle.', ar: 'تجاهل كل جديد من حيث المبدأ.' } },
          { text: { en: 'Adopt it because the ecosystem will move anyway.', ar: 'تبنَّها لأن المنظومة ستتحرّك على أي حال.' } },
        ],
        explain: {
          en: 'Curiosity without commitment. You learn what it offers at a cost of one evening, instead of committing a team to a migration for a problem you may not have.',
          ar: 'فضول بلا التزام. فتتعلّم ما تقدّمه بكلفة أمسية واحدة بدل إلزام فريق بترحيل لأجل مشكلة قد لا تكون لديك.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Primary sources beat hot takes.',
            'Fundamentals age far better than libraries.',
            'Try new tools on small projects first.',
            'Always ask what a dependency costs and how you would remove it.',
          ],
          ar: [
            'المصادر الأصلية تتفوّق على الآراء المتسرّعة.',
            'الأساسيات تعمّر أطول بكثير من المكتبات.',
            'جرّب الأدوات الجديدة في مشاريع صغيرة أولًا.',
            'اسأل دائمًا عن تكلفة الاعتمادية وكيف ستزيلها.',
          ],
        },
      },
    ],
  },
]

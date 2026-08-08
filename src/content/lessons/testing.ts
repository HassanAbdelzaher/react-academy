import type { LessonBody } from '../blocks'

export const testing: LessonBody[] = [
  {
    id: 'testing/vitest',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Vitest reuses your Vite config, so it understands your aliases, TypeScript and JSX with no extra setup. If you already have a Vite project, you are about four lines away from a test suite.',
          ar: 'يعيد Vitest استخدام إعدادات Vite لديك، فيفهم اختصاراتك وتايب سكربت و JSX بلا إعداد إضافي. وإذا كان لديك مشروع Vite فأنت على بُعد أربعة أسطر من حزمة اختبارات.',
        },
      },
      {
        type: 'code',
        lang: 'ts',
        filename: 'vite.config.ts',
        code: `export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',        // a fake DOM for component tests
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});`,
      },
      {
        type: 'code',
        lang: 'ts',
        code: `import { describe, it, expect } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('adds two decimals and a currency symbol', () => {
    expect(formatPrice(5)).toBe('$5.00');
  });

  it('handles zero without turning it into an empty string', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'Name the behaviour, not the function', ar: 'سمِّ السلوك لا الدالة' },
        body: {
          en: '`it("returns correctly")` tells a future reader nothing. `it("keeps zero as $0.00")` documents a decision — and when it fails, the report already explains what broke.',
          ar: '`it("returns correctly")` لا يقول شيئًا لقارئ لاحق. أما `it("keeps zero as $0.00")` فيوثّق قرارًا — وعند فشله يشرح التقرير ما انكسر فعلًا.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            '`vitest` runs in watch mode by default; `vitest run` is the single-pass version for CI.',
            'Put a test next to the file it covers: `format.ts` and `format.test.ts`.',
            'Start with pure functions — they are the cheapest tests you will ever write and they never flake.',
            '`expect(...).toMatchInlineSnapshot()` is useful for stable output, and a trap for anything that changes often.',
          ],
          ar: [
            '`vitest` يعمل في وضع المراقبة افتراضيًا، و`vitest run` هو التمريرة الواحدة لـ CI.',
            'ضع الاختبار بجوار الملف الذي يغطّيه: `format.ts` و `format.test.ts`.',
            'ابدأ بالدوال النقية — فهي أرخص اختبارات ستكتبها ولا تتذبذب أبدًا.',
            '`expect(...).toMatchInlineSnapshot()` مفيد للمخرجات المستقرّة وفخّ لما يتغيّر كثيرًا.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Which of these deserves a unit test first?',
          ar: 'أيٌّ من هذه يستحق اختبار وحدة أولًا؟',
        },
        options: [
          {
            text: { en: 'A discount calculation with several branches and edge cases.', ar: 'حساب خصم بعدة فروع وحالات حدّية.' },
            correct: true,
          },
          { text: { en: 'A component that renders a heading and nothing else.', ar: 'مكوّن يعرض عنوانًا فقط.' } },
          { text: { en: 'A wrapper that re-exports a library function.', ar: 'غلاف يعيد تصدير دالة مكتبة.' } },
          { text: { en: 'A CSS module.', ar: 'وحدة CSS.' } },
        ],
        explain: {
          en: 'Test where the logic and the risk are. Branch-heavy pure functions give you the most confidence per line of test; trivial rendering gives you almost none.',
          ar: 'اختبر حيث المنطق والمخاطرة. فالدوال النقية كثيرة الفروع تمنحك أكبر ثقة لكل سطر اختبار، والعرض التافه لا يمنحك شيئًا تقريبًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Vitest reuses the Vite config — near-zero setup.',
            'Colocate tests with the code they cover.',
            'Test names should describe behaviour.',
            'Pure logic first; it is the best value per line.',
          ],
          ar: [
            'يعيد Vitest استخدام إعدادات Vite — بإعداد شبه معدوم.',
            'ضع الاختبارات بجوار الكود الذي تغطّيه.',
            'أسماء الاختبارات يجب أن تصف السلوك.',
            'المنطق النقي أولًا، فهو الأعلى قيمة لكل سطر.',
          ],
        },
      },
    ],
  },

  {
    id: 'testing/react-testing-library',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'React Testing Library has one guiding rule: **test what the user experiences**. Query the way a person finds things — by role, label and text — never by class name or component internals.',
          ar: 'لمكتبة React Testing Library قاعدة موجّهة واحدة: **اختبر ما يعيشه المستخدم**. ابحث كما يبحث الإنسان — بالدور والتسمية والنص — لا باسم صنف أو تفاصيل داخلية.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('adds a todo and clears the input', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  await user.type(screen.getByLabelText('New task'), 'Write tests');
  await user.click(screen.getByRole('button', { name: 'Add' }));

  expect(screen.getByText('Write tests')).toBeInTheDocument();
  expect(screen.getByLabelText('New task')).toHaveValue('');
});`,
      },
      {
        type: 'table',
        head: { en: ['Query', 'When'], ar: ['الاستعلام', 'متى'] },
        rows: [
          { en: ['`getByRole`', 'first choice — buttons, headings, inputs, links'], ar: ['`getByRole`', 'الخيار الأول — الأزرار والعناوين والحقول والروابط'] },
          { en: ['`getByLabelText`', 'form fields, exactly as a user identifies them'], ar: ['`getByLabelText`', 'حقول النماذج كما يعرفها المستخدم تمامًا'] },
          { en: ['`getByText`', 'visible content'], ar: ['`getByText`', 'المحتوى المرئي'] },
          { en: ['`getByTestId`', 'last resort, when nothing else identifies it'], ar: ['`getByTestId`', 'الملاذ الأخير حين لا يميّزه شيء آخر'] },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'A failing query is an accessibility report', ar: 'فشل الاستعلام تقرير إتاحة' },
        body: {
          en: 'If `getByRole("button", { name: "Save" })` cannot find your button, a screen reader cannot either. Fixing the test usually means adding the label your users needed all along.',
          ar: 'إذا عجز `getByRole("button", { name: "Save" })` عن إيجاد زرّك، فلن يجده قارئ الشاشة أيضًا. وإصلاح الاختبار يعني عادةً إضافة التسمية التي كان يحتاجها مستخدموك منذ البداية.',
        },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          label: { en: 'Tests the implementation', ar: 'يختبر التنفيذ' },
          code: `expect(wrapper.state.isOpen)
  .toBe(true);
expect(container
  .querySelector('.menu-open'))
  .toBeTruthy();`,
        },
        good: {
          label: { en: 'Tests the behaviour', ar: 'يختبر السلوك' },
          code: `await user.click(
  screen.getByRole('button', { name: 'Menu' })
);
expect(
  screen.getByRole('menu')
).toBeVisible();`,
        },
        note: {
          en: 'The second test survives a rewrite from `useState` to a reducer, or a rename of every class. The first one breaks on both.',
          ar: 'الاختبار الثاني يصمد أمام تحويل من `useState` إلى مُختزِل، أو إعادة تسمية كل الأصناف. أما الأول فينكسر في الحالتين.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A test breaks after you refactor a component from `useState` to `useReducer`, with no change in behaviour. What does that tell you?',
          ar: 'انكسر اختبار بعد تحويل مكوّن من `useState` إلى `useReducer` دون تغيير في السلوك. ماذا يعني ذلك؟',
        },
        options: [
          {
            text: { en: 'The test was checking internals rather than what the user sees.', ar: 'أن الاختبار كان يفحص التفاصيل الداخلية لا ما يراه المستخدم.' },
            correct: true,
          },
          { text: { en: 'The refactor introduced a bug.', ar: 'أن إعادة الهيكلة أدخلت خللًا.' } },
          { text: { en: 'Reducers are untestable.', ar: 'أن المُختزِلات غير قابلة للاختبار.' } },
          { text: { en: 'The test needs a longer timeout.', ar: 'أن الاختبار يحتاج مهلة أطول.' } },
        ],
        explain: {
          en: 'A good test only fails when behaviour changes. Tests coupled to internals punish you for improving code — which is how suites end up deleted.',
          ar: 'الاختبار الجيد لا يفشل إلا عند تغيّر السلوك. أما الاختبارات المرتبطة بالتفاصيل الداخلية فتعاقبك على تحسين الكود — وهكذا تنتهي الحزم بالحذف.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Query by role, label and text; `getByTestId` is a fallback.',
            'Use `userEvent`, not `fireEvent` — it simulates real interaction.',
            'Never assert on state or class names.',
            'Unfindable elements are an accessibility problem first.',
          ],
          ar: [
            'ابحث بالدور والتسمية والنص، و`getByTestId` احتياطي.',
            'استخدم `userEvent` لا `fireEvent` — فهو يحاكي تفاعلًا حقيقيًا.',
            'لا تتحقّق أبدًا من الحالة أو أسماء الأصناف.',
            'العناصر التي لا تُوجد مشكلة إتاحة أولًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'testing/testing-async-and-hooks',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Most flaky tests are async tests written impatiently. The cure is to wait for the thing you expect instead of guessing how long it takes.',
          ar: 'معظم الاختبارات المتذبذبة اختبارات غير متزامنة كُتبت بنفاد صبر. والعلاج انتظار ما تتوقّعه بدل تخمين مدّته.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// ✅ findBy* waits for the element to appear
expect(await screen.findByText('Loaded')).toBeInTheDocument();

// ✅ waitFor retries an assertion until it passes
await waitFor(() => expect(mockSave).toHaveBeenCalledTimes(1));

// ✅ waiting for a disappearance
await waitForElementToBeRemoved(() => screen.queryByText('Loading…'));

// 🚫 never do this
await new Promise((r) => setTimeout(r, 500));`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Mock the network, not your own modules', ar: 'حاكِ الشبكة لا وحداتك' },
        body: {
          en: 'Intercepting HTTP with MSW keeps the test realistic: your component, your fetching code and your error handling all run. Mocking your own data module skips exactly the code most likely to be wrong.',
          ar: 'اعتراض HTTP بـ MSW يبقي الاختبار واقعيًا: فمكوّنك وكود الجلب ومعالجة الأخطاء كلها تعمل. أما محاكاة وحدة بياناتك فتتخطّى تحديدًا الكود الأرجح أن يكون خاطئًا.',
        },
      },
      {
        type: 'code',
        lang: 'ts',
        code: `import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => result.current.increment());

  expect(result.current.count).toBe(1);
});`,
      },
      {
        type: 'list',
        items: {
          en: [
            'Wrap anything that triggers a state update outside an event in `act`.',
            'Test a hook directly only when it is genuinely reusable; otherwise test the component that uses it.',
            'Use fake timers for debounce and interval logic, and advance them explicitly.',
            'Assert on the visible result — "the row disappeared" — rather than on how many times a mock was called, wherever you can.',
          ],
          ar: [
            'غلّف بـ `act` كل ما يُطلق تحديث حالة خارج حدث.',
            'اختبر الخطّاف مباشرة فقط إذا كان قابلًا لإعادة الاستخدام فعلًا، وإلا فاختبر المكوّن الذي يستخدمه.',
            'استخدم مؤقّتات مزيّفة لمنطق التأخير والفواصل وقدّمها صراحةً.',
            'تحقّق من النتيجة المرئية — «اختفى الصف» — لا من عدد استدعاءات المحاكي، كلما أمكن.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A test passes locally and fails in CI about one run in five. What is the most likely cause?',
          ar: 'اختبار ينجح محليًا ويفشل في CI مرة كل خمس تقريبًا. ما السبب الأرجح؟',
        },
        options: [
          {
            text: { en: 'A fixed `setTimeout` wait that is long enough on a fast machine and not on a loaded CI runner.', ar: 'انتظار ثابت بـ `setTimeout` يكفي على جهاز سريع ولا يكفي على منفّذ CI مُحمَّل.' },
            correct: true,
          },
          { text: { en: 'CI uses a different React version.', ar: 'يستخدم CI إصدار رياكت مختلفًا.' } },
          { text: { en: 'jsdom does not support async code.', ar: 'لا يدعم jsdom الكود غير المتزامن.' } },
          { text: { en: 'The test file needs to run in isolation.', ar: 'يحتاج ملف الاختبار للعمل بمعزل.' } },
        ],
        explain: {
          en: 'Timing assumptions are the number-one source of flakiness. `findBy*` and `waitFor` poll until the condition is true, so they adapt to whatever machine they run on.',
          ar: 'افتراضات التوقيت أول أسباب التذبذب. أما `findBy*` و `waitFor` فتستطلع حتى يتحقّق الشرط، فتتكيّف مع أي جهاز تعمل عليه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            '`findBy*` and `waitFor` instead of arbitrary sleeps.',
            'Intercept HTTP with MSW rather than mocking your own modules.',
            '`renderHook` plus `act` for reusable hooks.',
            'Fake timers for debounce and polling logic.',
          ],
          ar: [
            '`findBy*` و `waitFor` بدل الانتظارات الاعتباطية.',
            'اعترض HTTP بـ MSW بدل محاكاة وحداتك.',
            '`renderHook` مع `act` للخطّافات القابلة لإعادة الاستخدام.',
            'مؤقّتات مزيّفة لمنطق التأخير والاستطلاع.',
          ],
        },
      },
    ],
  },

  {
    id: 'testing/playwright',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Unit tests prove the parts work. An end-to-end test proves the **assembled product** works — real browser, real routing, real network, real database if you let it.',
          ar: 'اختبارات الوحدة تُثبت أن الأجزاء تعمل. أما الاختبار الشامل فيُثبت أن **المنتج المجمَّع** يعمل — متصفّح حقيقي وتوجيه حقيقي وشبكة حقيقية وقاعدة بيانات حقيقية إن سمحت بذلك.',
        },
      },
      {
        type: 'code',
        lang: 'ts',
        filename: 'e2e/checkout.spec.ts',
        code: `import { test, expect } from '@playwright/test';

test('a visitor can buy a product', async ({ page }) => {
  await page.goto('/products/42');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(page.getByText('1 item')).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
});`,
      },
      {
        type: 'list',
        items: {
          en: [
            'Playwright **auto-waits** for elements to be visible and actionable — no manual sleeps required.',
            'The same queries as Testing Library: `getByRole`, `getByLabel`. The habits transfer directly.',
            'On failure it saves a trace: a video, the DOM at each step, and the network log. Debugging CI stops being guesswork.',
            'It runs the same spec in Chromium, Firefox and WebKit if you ask it to.',
          ],
          ar: [
            'ينتظر Playwright **تلقائيًا** ظهور العناصر وقابليتها للتفاعل — بلا انتظارات يدوية.',
            'الاستعلامات نفسها كما في Testing Library: `getByRole` و `getByLabel`. فالعادات تنتقل مباشرة.',
            'وعند الفشل يحفظ أثرًا: فيديو و DOM عند كل خطوة وسجلّ الشبكة. فيتوقف تصحيح CI عن كونه تخمينًا.',
            'ويشغّل الاختبار نفسه في Chromium و Firefox و WebKit إن طلبت ذلك.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Keep the suite small on purpose', ar: 'أبقِ الحزمة صغيرة عن قصد' },
        body: {
          en: 'End-to-end tests are slow and, when overused, brittle. Cover the two or three flows that would cost you money if they broke — signup, checkout, the main create-and-save path — and leave the rest to faster tests.',
          ar: 'الاختبارات الشاملة بطيئة وهشّة عند الإفراط بها. غطِّ المسارين أو الثلاثة التي ستكلّفك مالًا إن انكسرت — التسجيل والدفع ومسار الإنشاء والحفظ الرئيسي — واترك الباقي لاختبارات أسرع.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Which failure would only an end-to-end test catch?',
          ar: 'أي فشل لا يلتقطه إلا اختبار شامل؟',
        },
        options: [
          {
            text: {
              en: 'The form posts to the wrong route, so nothing is ever saved even though every component works.',
              ar: 'النموذج يرسل إلى مسار خاطئ فلا يُحفظ شيء رغم أن كل مكوّن يعمل.',
            },
            correct: true,
          },
          { text: { en: 'A discount function rounds incorrectly.', ar: 'دالة الخصم تقرّب بشكل خاطئ.' } },
          { text: { en: 'A button has the wrong padding.', ar: 'حشو الزر خاطئ.' } },
          { text: { en: 'A reducer returns the wrong state for one action.', ar: 'مُختزِل يُعيد حالة خاطئة لإجراء واحد.' } },
        ],
        explain: {
          en: 'Everything else is testable in isolation. Wiring — routes, env config, auth cookies, redirects — only exists once the pieces are assembled.',
          ar: 'كل ما عداه قابل للاختبار بمعزل. أما التوصيل — المسارات وإعداد البيئة وكوكيز المصادقة والتحويلات — فلا يوجد إلا بعد تجميع القطع.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'E2E covers the wiring between working parts.',
            'Playwright auto-waits and records traces on failure.',
            'Use the same role-based queries as unit tests.',
            'Two or three critical flows beat fifty slow ones.',
          ],
          ar: [
            'الاختبار الشامل يغطّي التوصيل بين الأجزاء العاملة.',
            'ينتظر Playwright تلقائيًا ويسجّل آثارًا عند الفشل.',
            'استخدم استعلامات الأدوار نفسها كاختبارات الوحدة.',
            'مساران أو ثلاثة حرجة أفضل من خمسين بطيئة.',
          ],
        },
      },
    ],
  },

  {
    id: 'testing/testing-strategy',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Coverage percentage is the wrong target. The right question is: **if this breaks, how much does it cost, and how likely is it to break?** Test where those two numbers are highest.',
          ar: 'نسبة التغطية هدف خاطئ. والسؤال الصحيح: **إذا انكسر هذا، كم يكلّف، وما احتمال انكساره؟** اختبر حيث يكون الرقمان أعلى.',
        },
      },
      {
        type: 'table',
        head: { en: ['Worth testing', 'Rarely worth it'], ar: ['يستحق الاختبار', 'نادرًا ما يستحق'] },
        rows: [
          { en: ['Business rules with branches', 'A component that renders one prop'], ar: ['قواعد العمل ذات الفروع', 'مكوّن يعرض خاصية واحدة'] },
          { en: ['Anything involving money or permissions', 'Styling and layout'], ar: ['كل ما يتعلّق بالمال أو الصلاحيات', 'التنسيق والتخطيط'] },
          { en: ['Every bug you fix — as a regression test', 'Third-party library internals'], ar: ['كل خلل تصلحه — كاختبار انحدار', 'تفاصيل المكتبات الخارجية'] },
          { en: ['The critical user journey, end to end', 'Trivial getters and pass-through wrappers'], ar: ['رحلة المستخدم الحرجة من طرف لطرف', 'الدوال البسيطة والأغلفة العابرة'] },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'Write the test when you fix the bug', ar: 'اكتب الاختبار حين تصلح الخلل' },
        body: {
          en: 'This is the highest-value habit in the whole phase. A bug that happened once can happen again, and you already understand the exact conditions — the test almost writes itself in that moment.',
          ar: 'هذه أعلى العادات قيمة في المرحلة كلها. فالخلل الذي وقع مرة قد يقع مجددًا، وأنت تفهم ظروفه بدقّة الآن — فيكاد الاختبار يكتب نفسه في تلك اللحظة.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Many fast unit tests, a healthy number of component tests, a handful of end-to-end tests.',
            'A test that fails without a real bug is worse than no test — it trains the team to ignore red.',
            'If a test is hard to write, that is usually feedback about the design, not the tooling.',
            '100% coverage on trivial code is a comfortable way to look busy while the risky paths stay untested.',
          ],
          ar: [
            'اختبارات وحدة سريعة كثيرة، وعدد معقول من اختبارات المكوّنات، وحفنة من الاختبارات الشاملة.',
            'الاختبار الذي يفشل بلا خلل حقيقي أسوأ من عدمه — فهو يدرّب الفريق على تجاهل الأحمر.',
            'وإذا صعب كتابة اختبار فذلك عادةً ملاحظة عن التصميم لا عن الأدوات.',
            'وتغطية 100% لكود تافه طريقة مريحة للظهور بمظهر المنشغل بينما تبقى المسارات الخطرة بلا اختبار.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Your team has 95% coverage and still ships regressions every sprint. What is most likely wrong?',
          ar: 'فريقك عند تغطية 95% وما زال يُطلق انحدارات كل دورة. ما الخطأ الأرجح؟',
        },
        options: [
          {
            text: {
              en: 'The tests cover easy code and assert on implementation, so they miss the behaviour that actually breaks.',
              ar: 'أن الاختبارات تغطّي الكود السهل وتتحقّق من التنفيذ، فتفوتها السلوكيات التي تنكسر فعلًا.',
            },
            correct: true,
          },
          { text: { en: 'Coverage should be 100%.', ar: 'يجب أن تكون التغطية 100%.' } },
          { text: { en: 'They need a different test runner.', ar: 'يحتاجون منفّذ اختبارات مختلفًا.' } },
          { text: { en: 'Unit tests are useless in general.', ar: 'اختبارات الوحدة عديمة الفائدة عمومًا.' } },
        ],
        explain: {
          en: 'Coverage measures which lines ran, not whether anything meaningful was asserted. A suite can execute every line and still verify nothing a user cares about.',
          ar: 'التغطية تقيس أي الأسطر نُفّذت لا ما إذا تحقّقنا من شيء ذي معنى. فقد تنفّذ الحزمة كل سطر ولا تتحقّق من شيء يهمّ المستخدم.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Optimise for confidence per test, not for coverage.',
            'Every fixed bug earns a regression test.',
            'Flaky tests must be fixed or deleted immediately.',
            'Hard-to-test code is usually badly structured code.',
          ],
          ar: [
            'حسّن للثقة لكل اختبار لا للتغطية.',
            'كل خلل تصلحه يستحق اختبار انحدار.',
            'الاختبارات المتذبذبة تُصلَح أو تُحذف فورًا.',
            'الكود الصعب اختباره كود سيّئ البنية عادةً.',
          ],
        },
      },
    ],
  },
]

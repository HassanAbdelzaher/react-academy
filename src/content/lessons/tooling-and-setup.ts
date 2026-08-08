import type { LessonBody } from '../blocks'

export const toolingAndSetup: LessonBody[] = [
  {
    id: 'tooling-and-setup/vite-scaffold',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Vite is the default way to start a React app that is not a Next.js project. One command gives you a dev server that starts in under a second and a production build that is already optimised.',
          ar: 'Vite هي الطريقة الافتراضية لبدء تطبيق رياكت خارج مشاريع Next.js. أمر واحد يمنحك خادم تطوير يبدأ في أقل من ثانية وبناء إنتاج مُحسَّن مسبقًا.',
        },
      },
      {
        type: 'code',
        lang: 'bash',
        code: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev`,
      },
      {
        type: 'table',
        head: { en: ['File', 'What it does'], ar: ['الملف', 'وظيفته'] },
        rows: [
          { en: ['`index.html`', 'The real entry point — Vite starts here, not at a JS file'], ar: ['`index.html`', 'نقطة الدخول الحقيقية — تبدأ Vite منه لا من ملف جافاسكربت'] },
          { en: ['`src/main.tsx`', 'Creates the React root and mounts `<App />`'], ar: ['`src/main.tsx`', 'ينشئ جذر رياكت ويركّب `<App />`'] },
          { en: ['`vite.config.ts`', 'Plugins, path aliases, dev-server options'], ar: ['`vite.config.ts`', 'الإضافات واختصارات المسارات وخيارات خادم التطوير'] },
          { en: ['`tsconfig.json`', 'How TypeScript checks your code'], ar: ['`tsconfig.json`', 'كيف يفحص تايب سكربت كودك'] },
          { en: ['`public/`', 'Files copied as-is, referenced from the root path'], ar: ['`public/`', 'ملفات تُنسخ كما هي ويُشار إليها من المسار الجذر'] },
        ],
      },
      {
        type: 'callout',
        tone: 'note',
        title: { en: 'Why it feels instant', ar: 'لماذا يبدو فوريًا' },
        body: {
          en: 'In development Vite serves your files as native ES modules — it only transforms the file you just changed instead of rebuilding a bundle. For production it still bundles properly, so you get both.',
          ar: 'في التطوير تقدّم Vite ملفاتك كوحدات ES أصلية — فتحوّل الملف الذي عدّلته فقط بدل إعادة بناء الحزمة كاملة. أما في الإنتاج فتحزم بشكل كامل، فتحصل على الميزتين.',
        },
      },
      {
        type: 'code',
        lang: 'ts',
        filename: 'vite.config.ts',
        code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
});`,
        caption: {
          en: 'The alias turns `../../../components/Button` into `@/components/Button`. Add the same paths to `tsconfig.json` or the editor will not follow them.',
          ar: 'يحوّل الاختصار `../../../components/Button` إلى `@/components/Button`. وأضف المسارات نفسها إلى `tsconfig.json` وإلا لن يتبعها المحرّر.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Why does a Vite project put `index.html` at the project root instead of inside `public/`?',
          ar: 'لماذا يضع مشروع Vite ملف `index.html` في جذر المشروع لا داخل `public/`؟',
        },
        options: [
          {
            text: {
              en: 'Because it is the entry point Vite parses — the `<script type="module">` inside it points at your code.',
              ar: 'لأنه نقطة الدخول التي تحلّلها Vite — و`<script type="module">` بداخله يشير إلى كودك.',
            },
            correct: true,
          },
          { text: { en: 'For search-engine optimisation.', ar: 'لتحسين محرّكات البحث.' } },
          { text: { en: 'Because `public/` is deleted on every build.', ar: 'لأن `public/` يُحذف عند كل بناء.' } },
          { text: { en: 'It is only a naming convention with no effect.', ar: 'مجرّد عرف تسمية بلا أثر.' } },
        ],
        explain: {
          en: 'Vite treats HTML as the graph root, follows the module script, and processes everything it imports. Files in `public/` are copied untouched — no hashing, no transformation.',
          ar: 'تعامل Vite ملف HTML كجذر للرسم البياني، فتتبع سكربت الوحدة وتعالج كل ما يستورده. أما ملفات `public/` فتُنسخ كما هي بلا بصمة ولا تحويل.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            '`npm create vite@latest my-app -- --template react-ts` is the starting line.',
            '`index.html` is the entry point, not a template.',
            'Set a path alias early — it survives every refactor.',
            'Dev uses native modules; production is still bundled and minified.',
          ],
          ar: [
            '`npm create vite@latest my-app -- --template react-ts` هو خط البداية.',
            '`index.html` نقطة الدخول لا قالبًا.',
            'اضبط اختصار المسارات مبكرًا — فهو يصمد أمام كل إعادة هيكلة.',
            'التطوير يستخدم الوحدات الأصلية، والإنتاج يبقى محزومًا ومصغّرًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'tooling-and-setup/eslint-prettier',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'These two tools solve different problems. Prettier decides how code **looks**; ESLint decides whether it is **correct**. Configure both once and never argue about either again.',
          ar: 'تحلّ الأداتان مشكلتين مختلفتين. Prettier يقرّر **شكل** الكود، و ESLint يقرّر **صحّته**. اضبطهما مرة ولا تجادل فيهما بعدها أبدًا.',
        },
      },
      {
        type: 'code',
        lang: 'bash',
        code: `npm i -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks prettier`,
      },
      {
        type: 'code',
        lang: 'js',
        filename: 'eslint.config.js',
        code: `import js from '@eslint/js';
import ts from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  reactHooks.configs['recommended-latest'],
  { ignores: ['dist/'] },
];`,
        caption: {
          en: 'Flat config is the current format — a plain array exported from a JS file, no `.eslintrc` and no `extends` strings.',
          ar: 'الصيغة المسطّحة هي الحالية — مصفوفة عادية تُصدَّر من ملف جافاسكربت، بلا `.eslintrc` ولا سلاسل `extends`.',
        },
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'The one rule that saves the most time', ar: 'القاعدة الأكثر توفيرًا للوقت' },
        body: {
          en: '`react-hooks/exhaustive-deps` catches missing effect dependencies — the source of most "it works, then it silently uses old data" bugs. Keep it on, and fix the code instead of disabling the line.',
          ar: '`react-hooks/exhaustive-deps` تلتقط الاعتماديات الناقصة — مصدر معظم أخطاء «يعمل ثم يستخدم بيانات قديمة بصمت». أبقِها مفعّلة وأصلح الكود بدل تعطيل السطر.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Turn on **format on save** in your editor — otherwise formatting shows up as noise in every pull request.',
            'Never put formatting rules in ESLint; that job belongs to Prettier alone.',
            'Add `"lint": "eslint ."` and `"format": "prettier --write ."` to your scripts.',
            'Run lint in CI (phase 16) so a broken rule cannot reach the main branch.',
          ],
          ar: [
            'فعّل **التنسيق عند الحفظ** في محرّرك — وإلا ظهر التنسيق كضجيج في كل طلب دمج.',
            'لا تضع قواعد التنسيق في ESLint أبدًا، فهذه وظيفة Prettier وحده.',
            'أضف `"lint": "eslint ."` و `"format": "prettier --write ."` إلى سكربتاتك.',
            'شغّل الفحص في CI (المرحلة السادسة عشرة) كي لا تصل مخالفة إلى الفرع الرئيسي.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'ESLint complains that an effect is missing a dependency you are sure is stable. What is the right response?',
          ar: 'يشتكي ESLint من اعتمادية ناقصة في تأثير وأنت واثق أنها ثابتة. ما التصرّف الصحيح؟',
        },
        options: [
          {
            text: {
              en: 'Restructure: move the value inside the effect, memoise it, or use `useEffectEvent`.',
              ar: 'أعد الهيكلة: انقل القيمة داخل التأثير أو خزّنها أو استخدم `useEffectEvent`.',
            },
            correct: true,
          },
          { text: { en: 'Add an `eslint-disable-next-line` comment.', ar: 'أضف تعليق `eslint-disable-next-line`.' } },
          { text: { en: 'Remove the dependency array entirely.', ar: 'احذف مصفوفة الاعتماديات كليًا.' } },
          { text: { en: 'Switch the effect to `useLayoutEffect`.', ar: 'حوّل التأثير إلى `useLayoutEffect`.' } },
        ],
        explain: {
          en: 'The rule is right far more often than developers are. Disabling it hides a stale closure that will surface later as data that quietly stops updating.',
          ar: 'القاعدة محقّة أكثر بكثير من المطوّرين. وتعطيلها يُخفي إغلاقًا قديمًا سيظهر لاحقًا كبيانات تتوقف عن التحديث بصمت.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Prettier formats, ESLint finds bugs — do not mix the jobs.',
            'Flat config (`eslint.config.js`) is the current standard.',
            'Keep `react-hooks` rules on and fix what they report.',
            'Format on save; lint in CI.',
          ],
          ar: [
            'Prettier ينسّق و ESLint يكشف الأخطاء — لا تخلط الوظيفتين.',
            'الصيغة المسطّحة (`eslint.config.js`) هي المعيار الحالي.',
            'أبقِ قواعد `react-hooks` مفعّلة وأصلح ما تُبلّغ عنه.',
            'نسّق عند الحفظ، وافحص في CI.',
          ],
        },
      },
    ],
  },

  {
    id: 'tooling-and-setup/folder-structure',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Sorting files by what they *are* works until roughly twenty components. After that, every feature is smeared across four folders and a simple change means opening `components/`, `hooks/`, `utils/` and `types/` at once.',
          ar: 'ترتيب الملفات بحسب *نوعها* ينجح حتى نحو عشرين مكوّنًا. بعدها تتوزّع كل ميزة على أربعة مجلدات، ويصبح أي تغيير بسيط فتحًا لـ `components/` و `hooks/` و `utils/` و `types/` معًا.',
        },
      },
      {
        type: 'compare',
        lang: 'bash',
        bad: {
          label: { en: 'By type', ar: 'حسب النوع' },
          code: `src/
  components/  (43 files)
  hooks/       (18 files)
  utils/       (22 files)
  types/`,
        },
        good: {
          label: { en: 'By feature', ar: 'حسب الميزة' },
          code: `src/
  features/
    checkout/
      CheckoutForm.tsx
      useCheckout.ts
      checkout.types.ts
    catalog/
  components/   (shared UI only)
  lib/          (shared helpers)`,
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'A feature folder holds **everything** for that feature: components, hooks, types, tests, helpers.',
            '`components/` keeps only genuinely shared UI — the button, the modal, the input.',
            'Move a file to the shared folder the **third** time it is imported from elsewhere, not the first.',
            'Deleting a feature should mean deleting one folder. If it does not, the boundaries are wrong.',
          ],
          ar: [
            'مجلد الميزة يحوي **كل شيء** يخصّها: المكوّنات والخطّافات والأنواع والاختبارات والمساعدات.',
            '`components/` لا يحوي إلا الواجهة المشتركة فعلًا — الزر والمربّع الحواري والحقل.',
            'انقل الملف إلى المجلد المشترك في **المرة الثالثة** التي يُستورد فيها من خارجه لا الأولى.',
            'حذف ميزة يجب أن يعني حذف مجلد واحد. وإن لم يكن كذلك فالحدود خاطئة.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'note',
        body: {
          en: 'Do not design the perfect structure on day one. Start flat, let the duplication appear, and move files when the pattern is obvious. Premature structure is as expensive as no structure.',
          ar: 'لا تصمّم الهيكل المثالي في اليوم الأول. ابدأ مسطّحًا، ودع التكرار يظهر، وانقل الملفات حين يتّضح النمط. فالهيكلة المبكرة مكلفة كغيابها تمامًا.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A `formatCurrency` helper is used by the checkout feature and nothing else. Where does it go?',
          ar: 'دالة `formatCurrency` تستخدمها ميزة الدفع فقط. أين مكانها؟',
        },
        options: [
          {
            text: { en: 'Inside the checkout feature folder, next to what uses it.', ar: 'داخل مجلد ميزة الدفع بجوار ما يستخدمها.' },
            correct: true,
          },
          { text: { en: 'In a global `utils/` folder, in case someone needs it later.', ar: 'في مجلد `utils/` عام تحسّبًا لاحتياج أحد لها لاحقًا.' } },
          { text: { en: 'In `lib/format/currency/index.ts`.', ar: 'في `lib/format/currency/index.ts`.' } },
          { text: { en: 'Inline in every component that formats a price.', ar: 'مضمّنة في كل مكوّن يعرض سعرًا.' } },
        ],
        explain: {
          en: 'Colocation applies to files as well as state. Promote it to shared code when a second feature actually imports it — speculation produces a `utils/` folder nobody can navigate.',
          ar: 'التوطين ينطبق على الملفات كما على الحالة. ارفعها إلى الكود المشترك حين تستوردها ميزة ثانية فعلًا — فالتوقّع ينتج مجلد `utils/` لا يستطيع أحد التنقّل فيه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Organise by feature once the app outgrows a handful of components.',
            'Shared folders hold only what is genuinely shared.',
            'One feature should equal one deletable folder.',
            'Let structure emerge; do not impose it up front.',
          ],
          ar: [
            'نظّم حسب الميزة حين يتجاوز التطبيق حفنة من المكوّنات.',
            'المجلدات المشتركة لا تحوي إلا المشترك فعلًا.',
            'الميزة الواحدة تساوي مجلدًا واحدًا قابلًا للحذف.',
            'دع الهيكل ينشأ ولا تفرضه مسبقًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'tooling-and-setup/env-variables',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Environment variables let one codebase point at a local API, a staging API or production. In a frontend build they come with one rule that people learn the hard way: **everything in them is public**.',
          ar: 'تتيح متغيّرات البيئة لكودٍ واحد أن يشير إلى واجهة محلية أو تجريبية أو إنتاجية. وفي بناء الواجهة تأتي بقاعدة يتعلّمها الناس بالطريقة الصعبة: **كل ما فيها علني**.',
        },
      },
      {
        type: 'code',
        lang: 'bash',
        filename: '.env',
        code: `VITE_API_URL=https://api.example.com
VITE_ENABLE_BETA=true

# no VITE_ prefix → not exposed to the browser at all
DATABASE_URL=postgres://…`,
      },
      {
        type: 'code',
        lang: 'ts',
        code: `const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;     // built in`,
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'A frontend has no secrets', ar: 'لا أسرار في الواجهة' },
        body: {
          en: 'Vite replaces `import.meta.env.VITE_X` with the literal value at build time. Anyone can read it in the shipped JavaScript. API keys that must stay private belong on a server — that is one of the reasons phase 13 exists.',
          ar: 'تستبدل Vite `import.meta.env.VITE_X` بالقيمة الحرفية وقت البناء. ويستطيع أي شخص قراءتها في جافاسكربت المنشورة. أما المفاتيح التي يجب أن تبقى سرية فمكانها الخادم — وهذا أحد أسباب وجود المرحلة الثالثة عشرة.',
        },
      },
      {
        type: 'list',
        items: {
          en: [
            'Commit `.env.example` with empty values; add `.env` to `.gitignore`.',
            'Variables are read at **build** time — changing one means rebuilding and redeploying.',
            'Validate them once at startup and fail loudly, instead of debugging `undefined` in three screens.',
            'Vite exposes only the `VITE_` prefix; Next.js uses `NEXT_PUBLIC_` for the same purpose.',
          ],
          ar: [
            'ارفع `.env.example` بقيم فارغة، وأضف `.env` إلى `.gitignore`.',
            'تُقرأ المتغيّرات وقت **البناء** — وتغيير واحد يعني إعادة بناء ونشر.',
            'تحقّق منها مرة عند الإقلاع وافشل بوضوح، بدل تتبّع `undefined` في ثلاث شاشات.',
            'تكشف Vite بادئة `VITE_` فقط، وتستخدم Next.js `NEXT_PUBLIC_` للغرض نفسه.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You put a third-party secret key in `VITE_SECRET_KEY` and deploy. Who can read it?',
          ar: 'وضعت مفتاحًا سريًّا لخدمة خارجية في `VITE_SECRET_KEY` ونشرت. من يستطيع قراءته؟',
        },
        options: [
          {
            text: { en: 'Anyone — it is inlined into the JavaScript bundle the browser downloads.', ar: 'أي شخص — فهو مدمج في حزمة جافاسكربت التي ينزّلها المتصفّح.' },
            correct: true,
          },
          { text: { en: 'Only your server.', ar: 'خادمك فقط.' } },
          { text: { en: 'Only logged-in users.', ar: 'المستخدمون المسجّلون فقط.' } },
          { text: { en: 'Nobody — Vite encrypts env values.', ar: 'لا أحد — فـ Vite تشفّر قيم البيئة.' } },
        ],
        explain: {
          en: 'Open DevTools, search the bundle, and there it is. Rotate any key that has ever been exposed this way, and move the call behind a server route.',
          ar: 'افتح أدوات المطوّر وابحث في الحزمة فتجده. غيّر أي مفتاح انكشف بهذه الطريقة، وانقل الاستدعاء خلف مسار على الخادم.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Only `VITE_`-prefixed variables reach the browser — and they are public.',
            'Never put a real secret in a frontend build.',
            'Values are baked in at build time, not read at runtime.',
            'Commit `.env.example`, ignore `.env`.',
          ],
          ar: [
            'المتغيّرات ببادئة `VITE_` فقط تصل المتصفّح — وهي علنية.',
            'لا تضع سرًّا حقيقيًا في بناء الواجهة أبدًا.',
            'تُدمج القيم وقت البناء ولا تُقرأ وقت التشغيل.',
            'ارفع `.env.example` وتجاهل `.env`.',
          ],
        },
      },
    ],
  },

  {
    id: 'tooling-and-setup/npm-scripts',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Scripts are the documented way to run your project. If a task needs a remembered flag, it belongs in `package.json` — otherwise the knowledge lives in one person’s shell history.',
          ar: 'السكربتات هي الطريقة الموثّقة لتشغيل مشروعك. وإذا احتاجت مهمة راية يجب تذكّرها، فمكانها `package.json` — وإلا عاشت المعرفة في سجلّ طرفية شخص واحد.',
        },
      },
      {
        type: 'code',
        lang: 'json',
        filename: 'package.json',
        code: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  }
}`,
      },
      {
        type: 'table',
        head: { en: ['Command', 'When you use it'], ar: ['الأمر', 'متى تستخدمه'] },
        rows: [
          { en: ['`npm run dev`', 'all day, while writing code'], ar: ['`npm run dev`', 'طوال اليوم أثناء الكتابة'] },
          { en: ['`npm run build`', 'before pushing — it type-checks as well'], ar: ['`npm run build`', 'قبل الدفع — فهو يفحص الأنواع أيضًا'] },
          { en: ['`npm run preview`', 'to test the real production output locally'], ar: ['`npm run preview`', 'لاختبار ناتج الإنتاج الحقيقي محليًا'] },
          { en: ['`npm ci`', 'in CI — installs exactly the lockfile, nothing newer'], ar: ['`npm ci`', 'في CI — يثبّت ما في ملف القفل بالضبط دون أي تحديث'] },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Commit the lockfile', ar: 'ارفع ملف القفل' },
        body: {
          en: '`package-lock.json` pins the exact version of every transitive dependency. Without it, two developers can install different code from the same `package.json` — and "works on my machine" becomes literally true.',
          ar: '`package-lock.json` يثبّت الإصدار الدقيق لكل اعتمادية متفرّعة. وبدونه قد يثبّت مطوّران كودًا مختلفًا من `package.json` نفسه — فتصبح عبارة «يعمل على جهازي» حقيقة حرفية.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'Note that `dev` and `build` do different things: the dev server does not type-check, so a project can run happily while `npm run build` fails. Run the build before you open a pull request.',
          ar: 'لاحظ أن `dev` و `build` يفعلان أشياء مختلفة: فخادم التطوير لا يفحص الأنواع، فقد يعمل المشروع بسلاسة بينما يفشل `npm run build`. شغّل البناء قبل فتح طلب الدمج.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Your app runs fine with `npm run dev` but the build fails with type errors. How is that possible?',
          ar: 'يعمل تطبيقك مع `npm run dev` لكن البناء يفشل بأخطاء أنواع. كيف يحدث ذلك؟',
        },
        options: [
          {
            text: {
              en: 'The dev server strips types without checking them; `tsc -b` in the build script does the actual checking.',
              ar: 'خادم التطوير يزيل الأنواع دون فحصها، بينما `tsc -b` في سكربت البناء هو من يفحص فعلًا.',
            },
            correct: true,
          },
          { text: { en: 'The build uses a different TypeScript version.', ar: 'يستخدم البناء إصدار تايب سكربت مختلفًا.' } },
          { text: { en: 'Type errors only exist in production mode.', ar: 'أخطاء الأنواع تظهر في وضع الإنتاج فقط.' } },
          { text: { en: 'The dev server caches an older build.', ar: 'يخزّن خادم التطوير بناءً أقدم.' } },
        ],
        explain: {
          en: 'Speed is the reason: transpiling without checking is much faster. Your editor shows the errors live, and `tsc -b` is the gate that stops them shipping.',
          ar: 'السبب السرعة: فالتحويل دون فحص أسرع بكثير. ومحرّرك يُظهر الأخطاء مباشرة، و`tsc -b` هو البوابة التي تمنع وصولها للإنتاج.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Put every repeatable command in `scripts`.',
            '`npm run build` type-checks; `npm run dev` does not.',
            'Use `npm ci` in automation, `npm install` locally.',
            'Always commit the lockfile.',
          ],
          ar: [
            'ضع كل أمر متكرّر في `scripts`.',
            '`npm run build` يفحص الأنواع بخلاف `npm run dev`.',
            'استخدم `npm ci` في الأتمتة و `npm install` محليًا.',
            'ارفع ملف القفل دائمًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'tooling-and-setup/git-basics',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'You do not need to master Git. You need a small loop you can perform without thinking, plus the confidence that nothing you commit is ever really lost.',
          ar: 'لا تحتاج إتقان Git. تحتاج حلقة صغيرة تنفّذها دون تفكير، مع ثقة بأن ما تُودعه لا يضيع فعلًا أبدًا.',
        },
      },
      {
        type: 'code',
        lang: 'bash',
        code: `git switch -c feature/cart-badge   # branch off main
git add -p                         # review changes hunk by hunk
git commit -m "Show item count on the cart icon"
git push -u origin feature/cart-badge
# open a pull request, get a review, merge`,
      },
      {
        type: 'list',
        items: {
          en: [
            'One branch per piece of work, named after the work — not `test2` or `fix`.',
            'Commit messages say **why**, in the imperative: "Fix cart badge count after removal".',
            'Small commits are easier to review, revert and bisect than one enormous one.',
            'Never commit `node_modules`, `.env`, or build output. A generated `.gitignore` covers all three.',
          ],
          ar: [
            'فرع واحد لكل مهمة، مسمّى باسم المهمة — لا `test2` ولا `fix`.',
            'رسائل الإيداع تقول **لماذا** بصيغة الأمر: «أصلح عدّاد العربة بعد الحذف».',
            'الإيداعات الصغيرة أسهل للمراجعة والتراجع والتنقيب من إيداع ضخم واحد.',
            'لا تُودع `node_modules` ولا `.env` ولا ناتج البناء أبدًا. وملف `.gitignore` مولّد يغطّي الثلاثة.',
          ],
        },
      },
      {
        type: 'table',
        head: { en: ['Situation', 'Command'], ar: ['الموقف', 'الأمر'] },
        rows: [
          { en: ['Undo unstaged edits in a file', '`git restore path/to/file`'], ar: ['التراجع عن تعديلات غير مُدرَجة في ملف', '`git restore path/to/file`'] },
          { en: ['Unstage something added by mistake', '`git restore --staged file`'], ar: ['إخراج ملف أُدرج بالخطأ', '`git restore --staged file`'] },
          { en: ['Park work to switch branches', '`git stash` / `git stash pop`'], ar: ['تعليق العمل للانتقال بين الفروع', '`git stash` / `git stash pop`'] },
          { en: ['Undo a commit that is already pushed', '`git revert <sha>`'], ar: ['التراجع عن إيداع مدفوع بالفعل', '`git revert <sha>`'] },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Once something is committed, it is recoverable — `git reflog` remembers where every branch pointed, even after a bad reset. What is genuinely at risk is work you never committed.',
          ar: 'ما إن يُودَع شيء حتى يصبح قابلًا للاسترجاع — فـ `git reflog` يتذكّر أين كان كل فرع حتى بعد إعادة ضبط سيّئة. أما المعرّض للخطر فعلًا فهو العمل الذي لم تُودعه.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You pushed a commit that broke production. What is the safest fix?',
          ar: 'دفعت إيداعًا عطّل الإنتاج. ما أأمن حل؟',
        },
        options: [
          {
            text: { en: '`git revert` the commit — it adds a new commit that undoes it, and history stays intact.', ar: '`git revert` للإيداع — فيضيف إيداعًا جديدًا يلغيه ويبقى السجل سليمًا.' },
            correct: true,
          },
          { text: { en: '`git reset --hard` and force-push over the branch.', ar: '`git reset --hard` ثم الدفع القسري فوق الفرع.' } },
          { text: { en: 'Delete the branch and recreate it.', ar: 'احذف الفرع وأعد إنشاءه.' } },
          { text: { en: 'Edit the files on the server directly.', ar: 'عدّل الملفات على الخادم مباشرة.' } },
        ],
        explain: {
          en: 'Force-pushing a shared branch rewrites history under everyone else’s feet. `revert` is additive: the fix is reviewable, and the original commit is still there for the post-mortem.',
          ar: 'الدفع القسري لفرع مشترك يعيد كتابة السجل تحت أقدام الجميع. أما `revert` فإضافي: الإصلاح قابل للمراجعة، والإيداع الأصلي باقٍ للتحليل لاحقًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Branch → commit small → push → pull request → merge.',
            'Write messages that explain why, in the imperative.',
            'Ignore `node_modules`, `.env` and `dist/`.',
            '`revert` shared history; never force-push over it.',
          ],
          ar: [
            'فرِّع ← أودِع بإيداعات صغيرة ← ادفع ← اطلب دمجًا ← ادمج.',
            'اكتب رسائل تشرح السبب بصيغة الأمر.',
            'تجاهل `node_modules` و `.env` و `dist/`.',
            'استخدم `revert` للسجل المشترك ولا تدفع فوقه قسريًا أبدًا.',
          ],
        },
      },
    ],
  },
]

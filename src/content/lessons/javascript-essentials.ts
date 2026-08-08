import type { LessonBody } from '../blocks'

export const javascriptEssentials: LessonBody[] = [
  {
    id: 'javascript-essentials/arrow-functions-and-syntax',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Three pieces of syntax appear on almost every line of React code. None of them adds new power to the language — they just make the same code shorter, and React leans on that shortness constantly.',
          ar: 'ثلاث ميزات صياغية تظهر في كل سطر تقريبًا من كود رياكت. لا تضيف أيًّا منها قدرة جديدة للغة — بل تجعل الكود نفسه أقصر، ورياكت تعتمد على هذا الاختصار باستمرار.',
        },
      },

      { type: 'heading', text: { en: 'Arrow functions', ar: 'الدوال السهمية' } },
      {
        type: 'code',
        lang: 'js',
        code: `// the same function, three ways
function double(n) { return n * 2; }
const double2 = (n) => { return n * 2; };
const double3 = (n) => n * 2;   // implicit return`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'The implicit-return trap', ar: 'فخّ الإرجاع الضمني' },
        body: {
          en: 'The moment you add `{ }` after the arrow, you are writing a function **body** and must `return` yourself. This one detail causes more "why is my list empty?" bugs than anything else in React.',
          ar: 'بمجرد إضافة `{ }` بعد السهم تصبح تكتب **جسم** دالة وعليك كتابة `return` بنفسك. هذه التفصيلة وحدها تسبّب أخطاء «لماذا قائمتي فارغة؟» أكثر من أي شيء آخر في رياكت.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'To return an **object** from a concise arrow, wrap it in parentheses — otherwise JavaScript reads `{` as the start of a body: `() => ({ ok: true })`.',
          ar: 'لإرجاع **كائن** من سهم مختصر، ضعه بين قوسين — وإلا قرأت جافاسكربت `{` كبداية جسم الدالة: `() => ({ ok: true })`.',
        },
      },

      { type: 'heading', text: { en: 'Template literals', ar: 'القوالب النصية' } },
      {
        type: 'code',
        lang: 'js',
        code: `const name = 'Hassan';
const items = 3;

const old = 'Hi ' + name + ', you have ' + items + ' items';
const now = \`Hi \${name}, you have \${items} item\${items === 1 ? '' : 's'}\`;

// they can span lines, which plain quotes cannot
const query = \`
  SELECT *
  FROM users
\`;`,
      },

      { type: 'heading', text: { en: 'Destructuring', ar: 'التفكيك' } },
      {
        type: 'text',
        text: {
          en: 'Destructuring pulls values out of an object or array into named variables. Every React component you will write uses it for props, and every `useState` call uses the array form.',
          ar: 'يستخرج التفكيك القيم من كائن أو مصفوفة إلى متغيّرات مسمّاة. كل مكوّن رياكت تكتبه يستخدمه للخصائص، وكل استدعاء لـ `useState` يستخدم صيغة المصفوفة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const user = { name: 'Sara', role: 'admin', city: 'Cairo' };

const { name, role } = user;                 // two variables
const { city, country = 'Egypt' } = user;    // with a default
const { name: displayName } = user;          // renamed

const [first, second] = ['a', 'b'];          // arrays go by position

// this is why props look the way they do
function Badge({ label, tone = 'neutral' }) {
  return <span className={tone}>{label}</span>;
}`,
      },
      {
        type: 'callout',
        tone: 'note',
        body: {
          en: 'Object destructuring matches by **name**, array destructuring matches by **position**. That is why `const [count, setCount] = useState(0)` lets you choose any two names you like.',
          ar: 'تفكيك الكائنات يطابق بالاسم، وتفكيك المصفوفات يطابق بالموضع. ولهذا يتيح لك `const [count, setCount] = useState(0)` اختيار أي اسمين تريد.',
        },
      },

      {
        type: 'quiz',
        question: {
          en: 'What does `const rows = data.map((d) => { id: d.id })` return?',
          ar: 'ماذا يُعيد `const rows = data.map((d) => { id: d.id })`؟',
        },
        options: [
          { text: { en: 'An array of objects with an `id` key.', ar: 'مصفوفة كائنات فيها مفتاح `id`.' } },
          {
            text: {
              en: 'An array of `undefined` — the braces are a function body with no `return`.',
              ar: 'مصفوفة من `undefined` — فالأقواس جسم دالة بلا `return`.',
            },
            correct: true,
          },
          { text: { en: 'A syntax error.', ar: 'خطأ في الصياغة.' } },
          { text: { en: 'An array of `id` values.', ar: 'مصفوفة من قيم `id`.' } },
        ],
        explain: {
          en: 'JavaScript reads `{` after the arrow as the start of a body, so `id: d.id` becomes a label statement and the function returns nothing. Write `(d) => ({ id: d.id })` instead.',
          ar: 'تقرأ جافاسكربت `{` بعد السهم كبداية جسم الدالة، فيصبح `id: d.id` عبارة تسمية ولا تُعيد الدالة شيئًا. اكتب `(d) => ({ id: d.id })` بدلًا من ذلك.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'A concise arrow returns its expression; adding `{ }` means you must `return`.',
            'Return an object literal from a concise arrow with `({ … })`.',
            'Template literals interpolate with `${}` and can span lines.',
            'Objects destructure by name, arrays by position.',
          ],
          ar: [
            'السهم المختصر يُعيد تعبيره، وإضافة `{ }` تعني أن عليك كتابة `return`.',
            'أعِد كائنًا من سهم مختصر عبر `({ … })`.',
            'القوالب النصية تدمج القيم بـ `${}` ويمكن أن تمتدّ لأسطر.',
            'الكائنات تُفكَّك بالاسم والمصفوفات بالموضع.',
          ],
        },
      },
    ],
  },
  {
    id: 'javascript-essentials/array-methods',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A React screen is almost always a list of things: rows, cards, messages, options. So the single most-used piece of JavaScript in React is `.map()` — and its two siblings `.filter()` and `.reduce()`.',
          ar: 'شاشة رياكت في الغالب قائمة من العناصر: صفوف وبطاقات ورسائل وخيارات. لذلك فإن أكثر أجزاء جافاسكربت استخدامًا في رياكت هي `.map()` — وأختاها `.filter()` و `.reduce()`.',
        },
      },
      {
        type: 'callout',
        tone: 'note',
        body: {
          en: 'All three of these **return a new array** and never change the original. That is exactly why React likes them: state must never be mutated in place.',
          ar: 'الثلاث جميعها **تُعيد مصفوفة جديدة** ولا تغيّر الأصلية أبدًا. ولهذا تحبّها رياكت: يجب ألّا تُعدَّل الحالة في مكانها.',
        },
      },

      {
        type: 'heading',
        text: { en: 'map — transform every item', ar: 'map — حوّل كل عنصر' },
      },
      {
        type: 'text',
        text: {
          en: '`.map()` takes a function, runs it on every item, and gives you back an array of the results. Same length, different contents.',
          ar: 'تأخذ `.map()` دالة، وتشغّلها على كل عنصر، وتُعيد لك مصفوفة النتائج. الطول نفسه والمحتوى مختلف.',
        },
      },
      {
        type: 'code',
        lang: 'js',
        filename: 'map.js',
        code: `const prices = [10, 25, 40];

// classic loop — 4 lines, a temporary array, an index
const withTax = [];
for (let i = 0; i < prices.length; i++) {
  withTax.push(prices[i] * 1.15);
}

// the same thing with map — one expression
const withTaxMapped = prices.map((price) => price * 1.15);
// → [11.5, 28.75, 46]`,
      },
      {
        type: 'text',
        text: {
          en: 'In React you use exactly this to turn data into elements. Notice the `key` — you will learn why it matters in phase 2.',
          ar: 'في رياكت تستخدم هذا تمامًا لتحويل البيانات إلى عناصر. لاحظ `key` — وستعرف أهميتها في المرحلة الثانية.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'ProductList.tsx',
        highlight: [4, 5, 6],
        code: `function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`,
      },

      {
        type: 'heading',
        text: { en: 'filter — keep some items', ar: 'filter — احتفظ ببعض العناصر' },
      },
      {
        type: 'text',
        text: {
          en: '`.filter()` keeps every item for which your function returns `true`. The result is usually shorter, and each item is untouched.',
          ar: 'تحتفظ `.filter()` بكل عنصر تُعيد دالتك لأجله `true`. النتيجة عادةً أقصر، وكل عنصر يبقى كما هو.',
        },
      },
      {
        type: 'code',
        lang: 'js',
        code: `const todos = [
  { id: 1, text: 'Learn map', done: true },
  { id: 2, text: 'Learn filter', done: false },
  { id: 3, text: 'Build something', done: false },
];

const remaining = todos.filter((todo) => !todo.done);
// → two items

// deleting an item from state is just a filter
const withoutSecond = todos.filter((todo) => todo.id !== 2);`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'This is how you delete in React', ar: 'هكذا تحذف في رياكت' },
        body: {
          en: 'You never remove an item from state. You build a new array **without** it and set that as the new state — which is precisely what `.filter()` gives you.',
          ar: 'أنت لا تحذف عنصرًا من الحالة أبدًا. بل تبني مصفوفة جديدة **بدونه** وتجعلها الحالة الجديدة — وهذا بالضبط ما تمنحك إياه `.filter()`.',
        },
      },

      {
        type: 'heading',
        text: { en: 'reduce — collapse into one value', ar: 'reduce — اجمعها في قيمة واحدة' },
      },
      {
        type: 'text',
        text: {
          en: '`.reduce()` walks the array while carrying an accumulator, and returns that accumulator at the end. Totals, counts and grouping are all reduces.',
          ar: 'تمرّ `.reduce()` على المصفوفة حاملةً قيمة متراكمة، ثم تُعيدها في النهاية. المجاميع والعدّ والتجميع كلها reduce.',
        },
      },
      {
        type: 'code',
        lang: 'js',
        code: `const cart = [
  { name: 'Keyboard', price: 90, qty: 1 },
  { name: 'Mouse', price: 40, qty: 2 },
];

const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
// →  170          ↑ accumulator          ↑ starting value`,
      },

      {
        type: 'heading',
        text: { en: 'The mistakes that cost the most time', ar: 'الأخطاء التي تكلّفك أكثر وقت' },
      },
      {
        type: 'compare',
        lang: 'js',
        bad: {
          code: `// forEach returns undefined
const names = users.forEach((u) => u.name);

// missing return in a block body
const ids = users.map((u) => {
  u.id;
});`,
        },
        good: {
          code: `// map returns the new array
const names = users.map((u) => u.name);

// either return explicitly…
const ids = users.map((u) => {
  return u.id;
});
// …or use a concise arrow body
const ids2 = users.map((u) => u.id);`,
        },
        note: {
          en: 'If your list renders as nothing, an accidental `forEach` or a missing `return` is the first thing to check.',
          ar: 'إذا ظهرت قائمتك فارغة، فإن `forEach` بالخطأ أو `return` مفقود هما أول ما يجب فحصه.',
        },
      },
      {
        type: 'callout',
        tone: 'danger',
        body: {
          en: '`.sort()` and `.reverse()` **do** change the original array — unlike the three above. In React, copy first: `[...items].sort(…)`.',
          ar: '`.sort()` و `.reverse()` **تُعدّلان** المصفوفة الأصلية — بعكس الثلاث السابقة. في رياكت انسخ أولًا: `[...items].sort(…)`.',
        },
      },

      {
        type: 'heading',
        text: { en: 'Chaining them together', ar: 'ربطها معًا' },
      },
      {
        type: 'text',
        text: {
          en: 'Because each method returns an array, you can chain them. This reads top to bottom like a sentence, which is why React codebases are full of it.',
          ar: 'لأن كل دالة تُعيد مصفوفة، يمكنك ربطها. تُقرأ من الأعلى للأسفل كالجملة، ولهذا تمتلئ بها مشاريع رياكت.',
        },
      },
      {
        type: 'code',
        lang: 'js',
        code: `const activeNames = users
  .filter((u) => u.isActive)
  .map((u) => u.name ?? 'Anonymous')
  .sort();`,
      },

      {
        type: 'quiz',
        question: {
          en: 'You need to remove the task with `id === 4` from state. Which line do you write?',
          ar: 'تريد حذف المهمة ذات `id === 4` من الحالة. أي سطر تكتب؟',
        },
        options: [
          { text: { en: '`tasks.splice(4, 1)`', ar: '`tasks.splice(4, 1)`' } },
          {
            text: { en: '`setTasks(tasks.filter((t) => t.id !== 4))`', ar: '`setTasks(tasks.filter((t) => t.id !== 4))`' },
            correct: true,
          },
          { text: { en: '`tasks.map((t) => t.id !== 4)`', ar: '`tasks.map((t) => t.id !== 4)`' } },
          { text: { en: '`delete tasks[4]`', ar: '`delete tasks[4]`' } },
        ],
        explain: {
          en: '`.filter()` builds a brand new array without that task, and you hand that new array to the state setter. `splice` and `delete` mutate the existing array, so React sees the same reference and may not re-render; `.map()` here would return booleans, not tasks.',
          ar: 'تبني `.filter()` مصفوفة جديدة تمامًا بلا تلك المهمة، ثم تمرّرها لدالة تحديث الحالة. أما `splice` و `delete` فتعدّلان المصفوفة نفسها، فترى رياكت المرجع ذاته وقد لا تعيد العرض؛ و `.map()` هنا ستُعيد قيمًا منطقية لا مهامًّا.',
        },
      },

      {
        type: 'keypoints',
        items: {
          en: [
            '`.map()` transforms — same length, new array. This is how lists become UI.',
            '`.filter()` selects — this is how you delete from state.',
            '`.reduce()` collapses to one value — totals, counts, grouping.',
            'These three never mutate; `.sort()`, `.reverse()`, `.push()` and `.splice()` do.',
            'A missing `return` inside a block-bodied arrow is the classic empty-list bug.',
          ],
          ar: [
            '`.map()` تحوّل — الطول نفسه ومصفوفة جديدة. هكذا تتحوّل القوائم إلى واجهة.',
            '`.filter()` تنتقي — وهكذا تحذف من الحالة.',
            '`.reduce()` تختزل إلى قيمة واحدة — مجاميع وعدّ وتجميع.',
            'هذه الثلاث لا تعدّل الأصل أبدًا، بينما `.sort()` و `.reverse()` و `.push()` و `.splice()` تعدّله.',
            'نسيان `return` داخل سهم ذي قوسين هو السبب الكلاسيكي لقائمة فارغة.',
          ],
        },
      },
    ],
  },

  {
    id: 'javascript-essentials/spread-and-safe-access',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'React state must never be edited in place. These three operators are how you copy, extend and read data safely — you will use them in every component that owns state.',
          ar: 'يجب ألّا تُعدَّل حالة رياكت في مكانها أبدًا. هذه المعاملات الثلاثة هي وسيلتك للنسخ والتوسيع والقراءة الآمنة — وستستخدمها في كل مكوّن يملك حالة.',
        },
      },

      { type: 'heading', text: { en: 'Spread: copy, then change', ar: 'النشر: انسخ ثم غيّر' } },
      {
        type: 'code',
        lang: 'js',
        code: `const user = { name: 'Sara', role: 'admin' };

const copy = { ...user };                    // a new object
const promoted = { ...user, role: 'owner' }; // later keys win
const merged = { ...defaults, ...overrides };

const list = [1, 2, 3];
const appended = [...list, 4];               // add to the end
const prepended = [0, ...list];              // add to the front
const combined = [...listA, ...listB];`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { en: 'Spread copies one level deep', ar: 'النشر ينسخ مستوى واحدًا فقط' },
        body: {
          en: '`{ ...user }` copies the top-level keys. If a value is itself an object, both copies still point at the same nested object — so spread that level too: `{ ...user, address: { ...user.address, city } }`.',
          ar: '`{ ...user }` ينسخ المفاتيح العليا فقط. وإذا كانت إحدى القيم كائنًا، فستشير النسختان إلى الكائن المتداخل نفسه — لذا انشر ذلك المستوى أيضًا: `{ ...user, address: { ...user.address, city } }`.',
        },
      },

      { type: 'heading', text: { en: 'Rest: collect what is left', ar: 'التجميع: اجمع الباقي' } },
      {
        type: 'code',
        lang: 'tsx',
        code: `// in destructuring, ... collects the remainder
const { id, ...rest } = product;

// the React pattern: take what you need, forward the rest
function Input({ label, ...inputProps }) {
  return (
    <label>
      {label}
      <input {...inputProps} />
    </label>
  );
}`,
        caption: {
          en: 'Same three dots, opposite jobs: spread expands, rest collects.',
          ar: 'النقاط الثلاث نفسها بوظيفتين متعاكستين: النشر يوسّع والتجميع يلمّ.',
        },
      },

      { type: 'heading', text: { en: 'Optional chaining and ??', ar: 'الوصول الآمن والمعامل العدمي' } },
      {
        type: 'code',
        lang: 'js',
        code: `// crashes when settings is undefined
const theme = user.settings.theme;

// undefined instead of a crash
const theme2 = user.settings?.theme;
const first = list?.[0];
const result = callback?.();

// ?? falls back only on null / undefined
const count = data.count ?? 0;   // 0 stays 0
const count2 = data.count || 0;  // 0 becomes 0 too… and so does '' and false`,
      },
      {
        type: 'compare',
        lang: 'js',
        bad: {
          label: { en: '|| swallows valid values', ar: '|| يبتلع قيمًا صحيحة' },
          code: `const votes = poll.votes || 10;
// votes === 0 → you show 10
const title = post.title || 'Untitled';
// title === '' → 'Untitled' (maybe fine)`,
        },
        good: {
          label: { en: '?? only replaces null/undefined', ar: '?? يستبدل null/undefined فقط' },
          code: `const votes = poll.votes ?? 10;
// votes === 0 → you show 0 ✅`,
        },
        note: {
          en: 'Use `??` whenever `0`, `""` or `false` are legitimate values — which in a UI is most of the time.',
          ar: 'استخدم `??` كلما كانت `0` أو `""` أو `false` قيمًا مشروعة — وهذا هو الحال غالبًا في الواجهات.',
        },
      },

      {
        type: 'quiz',
        question: {
          en: 'You need to toggle `done` on one task inside a state array. Which expression is safe?',
          ar: 'تريد تبديل `done` لمهمة واحدة داخل مصفوفة في الحالة. أي تعبير آمن؟',
        },
        options: [
          { text: { en: '`task.done = !task.done`', ar: '`task.done = !task.done`' } },
          {
            text: {
              en: '`tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))`',
              ar: '`tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))`',
            },
            correct: true,
          },
          { text: { en: '`tasks[i].done = true; setTasks(tasks)`', ar: '`tasks[i].done = true; setTasks(tasks)`' } },
          { text: { en: '`Object.assign(task, { done: true })`', ar: '`Object.assign(task, { done: true })`' } },
        ],
        explain: {
          en: 'The correct answer creates a new array **and** a new object for the one task that changed, leaving the others as they were. The other three mutate existing objects, so React sees the same references and may skip the update.',
          ar: 'الإجابة الصحيحة تنشئ مصفوفة جديدة **وكائنًا** جديدًا للمهمة المتغيّرة فقط، وتترك البقية كما هي. أما الخيارات الأخرى فتعدّل الكائنات القائمة، فترى رياكت المراجع نفسها وقد تتجاهل التحديث.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            '`...` spreads a copy; later keys overwrite earlier ones.',
            'Spread is shallow — nested objects need their own spread.',
            '`?.` returns `undefined` instead of throwing.',
            '`??` falls back only for `null` and `undefined`, unlike `||`.',
          ],
          ar: [
            '`...` ينشر نسخة، والمفاتيح المتأخرة تتغلّب على السابقة.',
            'النشر سطحي — والكائنات المتداخلة تحتاج نشرًا خاصًا بها.',
            '`?.` تُعيد `undefined` بدل أن ترمي خطأ.',
            '`??` يستبدل عند `null` و `undefined` فقط، بخلاف `||`.',
          ],
        },
      },
    ],
  },

  {
    id: 'javascript-essentials/async-javascript',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Data from a server always arrives later than the code that asked for it. Promises are how JavaScript represents "a value that is not here yet", and every data-fetching pattern in React sits on top of them.',
          ar: 'البيانات القادمة من الخادم تصل دائمًا بعد الكود الذي طلبها. الوعود هي طريقة جافاسكربت لتمثيل «قيمة لم تصل بعد»، وكل أنماط جلب البيانات في رياكت مبنية عليها.',
        },
      },
      {
        type: 'code',
        lang: 'js',
        code: `// a promise has three states: pending → fulfilled | rejected
fetch('/api/todos')
  .then((res) => res.json())
  .then((todos) => console.log(todos))
  .catch((err) => console.error(err));`,
      },

      { type: 'heading', text: { en: 'async / await', ar: 'async / await' } },
      {
        type: 'text',
        text: {
          en: '`await` pauses inside an `async` function until the promise settles. The code reads top to bottom, but it still does not block the browser.',
          ar: '`await` توقف التنفيذ داخل دالة `async` حتى يُحسم الوعد. يُقرأ الكود من الأعلى للأسفل، ومع ذلك لا يُجمّد المتصفّح.',
        },
      },
      {
        type: 'code',
        lang: 'js',
        highlight: [4, 5],
        code: `async function loadTodos() {
  try {
    const res = await fetch('/api/todos');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const todos = await res.json();
    return todos;
  } catch (err) {
    console.error('Could not load todos', err);
    return [];
  }
}`,
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'fetch does not reject on 404', ar: 'fetch لا ترفض عند 404' },
        body: {
          en: 'A `fetch` promise only rejects when the network itself fails. A 404 or 500 is a **successful** response with a bad status — you must check `res.ok` yourself, or you will parse an error page as JSON.',
          ar: 'وعد `fetch` يُرفض فقط عند فشل الشبكة نفسها. أما 404 أو 500 فهي استجابة **ناجحة** بحالة سيّئة — عليك فحص `res.ok` بنفسك، وإلا حلّلت صفحة خطأ على أنها JSON.',
        },
      },

      { type: 'heading', text: { en: 'Parallel versus sequential', ar: 'التوازي مقابل التتابع' } },
      {
        type: 'compare',
        lang: 'js',
        bad: {
          label: { en: 'Sequential — 600 ms', ar: 'متتابع — ٦٠٠ مللي' },
          code: `const user = await getUser();
const posts = await getPosts();
// the second request waits for
// the first one for no reason`,
        },
        good: {
          label: { en: 'Parallel — 300 ms', ar: 'متوازٍ — ٣٠٠ مللي' },
          code: `const [user, posts] = await Promise.all([
  getUser(),
  getPosts(),
]);
// both start immediately`,
        },
        note: {
          en: 'Only await sequentially when the second call genuinely needs the first result.',
          ar: 'لا تنتظر بالتتابع إلا حين يحتاج الاستدعاء الثاني فعلًا نتيجة الأول.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'In React you will rarely write these calls by hand for long — phase 9 replaces them with TanStack Query, which handles caching, retries and race conditions. But you cannot debug that library without understanding this page.',
          ar: 'في رياكت لن تكتب هذه الاستدعاءات يدويًا طويلًا — إذ تستبدلها المرحلة التاسعة بـ TanStack Query التي تتكفّل بالتخزين وإعادة المحاولة وتعارض الطلبات. لكن لا يمكنك تصحيح تلك المكتبة دون فهم هذه الصفحة.',
        },
      },

      {
        type: 'quiz',
        question: {
          en: 'Why does `const data = fetch(url)` give you a Promise instead of the response?',
          ar: 'لماذا يعطيك `const data = fetch(url)` وعدًا بدل الاستجابة؟',
        },
        options: [
          {
            text: {
              en: 'Because the request has only been started — the value arrives later, so JavaScript hands you a placeholder for it.',
              ar: 'لأن الطلب بدأ للتوّ — والقيمة تصل لاحقًا، فتعطيك جافاسكربت عنصرًا نائبًا عنها.',
            },
            correct: true,
          },
          { text: { en: 'Because `fetch` is deprecated in favour of `axios`.', ar: 'لأن `fetch` مهجورة لصالح `axios`.' } },
          { text: { en: 'Because the URL is wrong.', ar: 'لأن الرابط خاطئ.' } },
          { text: { en: 'Because you forgot to parse it as JSON.', ar: 'لأنك نسيت تحليلها كـ JSON.' } },
        ],
        explain: {
          en: 'Network calls cannot block the single JavaScript thread, so `fetch` returns immediately with a promise. `await` (or `.then`) is how you say "continue this part once it settles".',
          ar: 'لا يمكن لاستدعاءات الشبكة أن توقف خيط جافاسكربت الوحيد، لذا تُعيد `fetch` وعدًا فورًا. و `await` (أو `.then`) هي طريقة قولك: «تابع هذا الجزء عند حسم الوعد».',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'A promise is a value that has not arrived yet.',
            '`await` only works inside an `async` function, and returns the settled value.',
            'Always check `res.ok` — `fetch` does not throw on 4xx or 5xx.',
            'Use `Promise.all` for independent requests.',
          ],
          ar: [
            'الوعد قيمة لم تصل بعد.',
            '`await` تعمل داخل دالة `async` فقط وتُعيد القيمة بعد حسمها.',
            'افحص `res.ok` دائمًا — فـ `fetch` لا ترمي خطأ عند 4xx أو 5xx.',
            'استخدم `Promise.all` للطلبات المستقلّة.',
          ],
        },
      },
    ],
  },

  {
    id: 'javascript-essentials/es-modules',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Every file in a React project is a module: it declares what it shares and what it needs. Getting the two export styles straight removes a whole category of confusing build errors.',
          ar: 'كل ملف في مشروع رياكت وحدة: يعلن ما يشاركه وما يحتاجه. وفهم أسلوبَي التصدير بوضوح يزيل فئة كاملة من أخطاء البناء المحيّرة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'Button.tsx',
        code: `// named exports — as many as you like
export const SIZES = ['sm', 'md'];
export function Button() { /* … */ }

// default export — at most one per file
export default function Card() { /* … */ }`,
      },
      {
        type: 'code',
        lang: 'tsx',
        filename: 'App.tsx',
        code: `import Card from './Button';              // default: any name works
import { Button, SIZES } from './Button'; // named: exact names
import Card2, { Button as Btn } from './Button';
import * as everything from './Button';`,
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Prefer **named** exports in an app. They survive renames, they autocomplete, and every file that imports a component calls it the same thing.',
          ar: 'فضّل التصدير **المسمّى** في التطبيقات. فهو يصمد أمام إعادة التسمية، ويعمل مع الإكمال التلقائي، ويجعل كل ملف يستورد المكوّن يسمّيه بالاسم نفسه.',
        },
      },
      {
        type: 'list',
        ordered: true,
        items: {
          en: [
            'Imports are hoisted and evaluated once — a module runs the first time it is imported, not every time.',
            'Paths starting with `./` or `../` are your files; bare names like `react` come from `node_modules`.',
            'A tool alias such as `@/components/Button` is configured in `vite.config.ts` and `tsconfig.json` — it is not a JavaScript feature.',
            'Dynamic `import()` returns a promise and is the basis of code splitting in phase 15.',
          ],
          ar: [
            'تُرفع الاستيرادات وتُنفَّذ مرة واحدة — فالوحدة تعمل عند أول استيراد لا في كل مرة.',
            'المسارات التي تبدأ بـ `./` أو `../` هي ملفاتك، والأسماء المجرّدة مثل `react` تأتي من `node_modules`.',
            'الاختصار مثل `@/components/Button` يُضبط في `vite.config.ts` و `tsconfig.json` — وليس ميزة في جافاسكربت.',
            'الاستيراد الديناميكي `import()` يُعيد وعدًا وهو أساس تقسيم الكود في المرحلة الخامسة عشرة.',
          ],
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You rename `Card` to `ProductCard` in the file that default-exports it. What happens in the file that imports it?',
          ar: 'أعدت تسمية `Card` إلى `ProductCard` في الملف الذي يصدّرها افتراضيًا. ماذا يحدث في الملف المستورِد؟',
        },
        options: [
          {
            text: {
              en: 'Nothing — the import name is independent, which is exactly why default exports drift out of sync.',
              ar: 'لا شيء — فاسم الاستيراد مستقلّ، ولهذا بالضبط تفقد التصديرات الافتراضية التزامن.',
            },
            correct: true,
          },
          { text: { en: 'A build error, until you rename the import too.', ar: 'خطأ بناء حتى تُعيد تسمية الاستيراد أيضًا.' } },
          { text: { en: 'The import becomes `undefined`.', ar: 'يصبح الاستيراد `undefined`.' } },
          { text: { en: 'TypeScript renames it automatically everywhere.', ar: 'يعيد تايب سكربت تسميته تلقائيًا في كل مكان.' } },
        ],
        explain: {
          en: 'A default export has no name at the boundary, so importers invent their own. Named exports fail loudly instead — which is the behaviour you want in a large codebase.',
          ar: 'التصدير الافتراضي بلا اسم عند الحدّ، فيخترع المستوردون أسماءهم. أما التصدير المسمّى فيفشل بوضوح — وهو السلوك المطلوب في المشاريع الكبيرة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'One default export per file, unlimited named exports.',
            'Named imports must match the exported name; default imports can be called anything.',
            'A module is evaluated once, no matter how many files import it.',
          ],
          ar: [
            'تصدير افتراضي واحد لكل ملف، وتصديرات مسمّاة بلا حدّ.',
            'الاستيراد المسمّى يجب أن يطابق الاسم المصدَّر، أما الافتراضي فيمكن تسميته بأي اسم.',
            'تُنفَّذ الوحدة مرة واحدة مهما بلغ عدد الملفات المستورِدة لها.',
          ],
        },
      },
    ],
  },

  {
    id: 'javascript-essentials/conditional-expressions',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'JSX can only hold **expressions** — things that produce a value. An `if` statement produces nothing, so React developers lean on ternaries and logical operators instead.',
          ar: 'لا تحمل JSX إلا **التعابير** — أي ما يُنتج قيمة. وجملة `if` لا تُنتج شيئًا، لذا يعتمد مطوّرو رياكت على العامل الثلاثي والمعاملات المنطقية.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// ternary: pick between two values
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// && : render only when the left side is true
{hasError && <p className="error">{error}</p>}

// ?? : provide a fallback for null / undefined
<h1>{title ?? 'Untitled'}</h1>`,
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'The zero trap', ar: 'فخّ الصفر' },
        body: {
          en: '`{items.length && <List />}` renders the number `0` when the list is empty, because `0` is falsy but still a valid React child. Compare explicitly: `items.length > 0 && …`.',
          ar: '`{items.length && <List />}` يعرض الرقم `0` حين تكون القائمة فارغة، لأن `0` قيمة كاذبة لكنها ابن صالح في رياكت. قارن صراحةً: `items.length > 0 && …`.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'When the logic grows past two branches, stop nesting ternaries. Run the `if` **above** the `return` and store the result — it stays readable and diffs cleanly in review.',
          ar: 'حين يتجاوز المنطق فرعين، توقّف عن تداخل العامل الثلاثي. نفّذ `if` **قبل** `return` واحفظ النتيجة — يبقى الكود مقروءًا وتتضح تغييراته في المراجعة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `function Status({ state, error }) {
  let content;
  if (state === 'loading') content = <Spinner />;
  else if (state === 'error') content = <Error message={error} />;
  else content = <Result />;

  return <section>{content}</section>;
}`,
      },
      {
        type: 'quiz',
        question: {
          en: 'Which of these renders nothing when `count` is `0`?',
          ar: 'أيٌّ من هذه لا يعرض شيئًا حين تكون `count` مساوية لـ `0`؟',
        },
        options: [
          { text: { en: '`{count && <Badge value={count} />}`', ar: '`{count && <Badge value={count} />}`' } },
          {
            text: { en: '`{count > 0 && <Badge value={count} />}`', ar: '`{count > 0 && <Badge value={count} />}`' },
            correct: true,
          },
          { text: { en: '`{count || <Badge value={count} />}`', ar: '`{count || <Badge value={count} />}`' } },
          { text: { en: 'All three behave identically.', ar: 'الثلاثة تتصرّف بالطريقة نفسها.' } },
        ],
        explain: {
          en: 'React skips `false`, `null` and `undefined` but prints numbers — including `0`. A real comparison produces a boolean, so nothing is rendered.',
          ar: 'تتجاهل رياكت `false` و `null` و `undefined` لكنها تطبع الأرقام — بما فيها `0`. والمقارنة الحقيقية تُنتج قيمة منطقية فلا يُعرض شيء.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'JSX holds expressions, so ternaries replace `if` inside the markup.',
            '`&&` with a number renders that number — compare instead.',
            'More than two branches? Compute above the `return`.',
          ],
          ar: [
            'تحمل JSX التعابير، فيحلّ العامل الثلاثي محلّ `if` داخل الوسوم.',
            '`&&` مع رقم يعرض ذلك الرقم — استخدم مقارنة بدلًا من ذلك.',
            'أكثر من فرعين؟ احسب النتيجة قبل `return`.',
          ],
        },
      },
    ],
  },
]

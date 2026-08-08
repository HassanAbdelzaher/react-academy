import type { ExamQuestion } from './types'

/**
 * Beginner exam bank — phases 1-3 (JavaScript essentials, React fundamentals,
 * state and interactivity).
 *
 * These are deliberately not the lesson quizzes. A lesson quiz checks that the
 * paragraph above it landed; an exam question has to be answerable weeks later,
 * out of order, with no surrounding context.
 */
export const beginnerBank: ExamQuestion[] = [
  // ---------------------------------------------------------------- phase 1
  {
    id: 'b-js-01',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `const total = items.reduce((sum, i) => sum + i.price, 0)` return when `items` is empty?',
      ar: 'ماذا تُعيد `const total = items.reduce((sum, i) => sum + i.price, 0)` عندما تكون `items` فارغة؟',
    },
    options: [
      { text: { en: '`0` — the initial value is returned untouched.', ar: '`0` — تُعاد القيمة الابتدائية كما هي.' }, correct: true },
      { text: { en: '`undefined`', ar: '`undefined`' } },
      { text: { en: '`NaN`', ar: '`NaN`' } },
      { text: { en: 'It throws a TypeError.', ar: 'تُطلق خطأ TypeError.' } },
    ],
    explain: {
      en: 'The second argument to `reduce` is the starting accumulator. With no elements the callback never runs, so that starting value comes straight back. Omitting it on an empty array is what throws.',
      ar: 'الوسيط الثاني لـ `reduce` هو القيمة الابتدائية للمُجمِّع. مع عدم وجود عناصر لا تعمل الدالة إطلاقًا، فتعود القيمة الابتدائية كما هي. الحذف هو ما يسبّب الخطأ مع مصفوفة فارغة.',
    },
  },
  {
    id: 'b-js-02',
    phase: 'javascript-essentials',
    question: {
      en: 'Which expression safely reads a nested value that may not exist?',
      ar: 'أي تعبير يقرأ قيمة متداخلة قد لا تكون موجودة بأمان؟',
    },
    options: [
      { text: { en: '`user?.address?.city`', ar: '`user?.address?.city`' }, correct: true },
      { text: { en: '`user.address.city`', ar: '`user.address.city`' } },
      { text: { en: '`user && address && city`', ar: '`user && address && city`' } },
      { text: { en: '`user!.address!.city`', ar: '`user!.address!.city`' } },
    ],
    explain: {
      en: 'Optional chaining stops and evaluates to `undefined` the moment a link is `null` or `undefined`, instead of throwing "cannot read property of undefined".',
      ar: 'يتوقّف الوصول الآمن ويُعيد `undefined` بمجرد أن تكون إحدى الحلقات `null` أو `undefined`، بدلًا من إطلاق خطأ «لا يمكن قراءة خاصية من undefined».',
    },
  },
  {
    id: 'b-js-03',
    phase: 'javascript-essentials',
    question: {
      en: 'What is the difference between `??` and `||` when the left side is `0`?',
      ar: 'ما الفرق بين `??` و `||` عندما يكون الطرف الأيسر `0`؟',
    },
    options: [
      { text: { en: '`??` keeps `0`; `||` replaces it with the right side.', ar: '`??` تُبقي `0`، و `||` تستبدلها بالطرف الأيمن.' }, correct: true },
      { text: { en: '`||` keeps `0`; `??` replaces it.', ar: '`||` تُبقي `0`، و `??` تستبدلها.' } },
      { text: { en: 'They behave identically.', ar: 'يتصرّفان بالطريقة نفسها.' } },
      { text: { en: 'Both throw on `0`.', ar: 'كلاهما يُطلق خطأ مع `0`.' } },
    ],
    explain: {
      en: '`??` only falls through for `null` and `undefined`. `||` falls through for every falsy value, so `0`, `""` and `false` get silently replaced — the classic bug in `count || 10`.',
      ar: '`??` تنتقل للطرف الآخر فقط مع `null` و `undefined`، بينما `||` تنتقل مع كل قيمة falsy، فتُستبدل `0` و `""` و `false` بصمت — وهو الخطأ الكلاسيكي في `count || 10`.',
    },
  },
  {
    id: 'b-js-04',
    phase: 'javascript-essentials',
    question: {
      en: 'Which line copies an array and adds an item without changing the original?',
      ar: 'أي سطر ينسخ مصفوفة ويضيف عنصرًا دون تغيير الأصل؟',
    },
    options: [
      { text: { en: '`const next = [...items, item]`', ar: '`const next = [...items, item]`' }, correct: true },
      { text: { en: '`items.push(item)`', ar: '`items.push(item)`' } },
      { text: { en: '`const next = items; next.push(item)`', ar: '`const next = items; next.push(item)`' } },
      { text: { en: '`items.length = items.length + 1`', ar: '`items.length = items.length + 1`' } },
    ],
    explain: {
      en: 'Spreading builds a brand-new array. `push` mutates in place, and assigning an array to another variable copies the reference, not the contents — both leave the original changed.',
      ar: 'ينشئ النشر مصفوفة جديدة تمامًا. أما `push` فتُعدّل في مكانها، وإسناد المصفوفة لمتغيّر آخر ينسخ المرجع لا المحتوى — وكلاهما يُغيّر الأصل.',
    },
  },
  {
    id: 'b-js-05',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `const { name, age = 18 } = user` do when `user.age` is `undefined`?',
      ar: 'ماذا تفعل `const { name, age = 18 } = user` عندما تكون `user.age` قيمتها `undefined`؟',
    },
    options: [
      { text: { en: '`age` becomes `18`.', ar: 'تصبح `age` بقيمة `18`.' }, correct: true },
      { text: { en: '`age` becomes `undefined`.', ar: 'تصبح `age` بقيمة `undefined`.' } },
      { text: { en: 'It throws, because `age` is missing.', ar: 'يُطلق خطأ لأن `age` غير موجودة.' } },
      { text: { en: '`age` becomes `null`.', ar: 'تصبح `age` بقيمة `null`.' } },
    ],
    explain: {
      en: 'A destructuring default fills in only for `undefined`. Note that an explicit `null` does not trigger it — `age` would be `null`, not `18`.',
      ar: 'تعمل القيمة الافتراضية في التفكيك فقط مع `undefined`. لاحظ أن `null` الصريحة لا تُفعّلها — فتكون `age` بقيمة `null` لا `18`.',
    },
  },
  {
    id: 'b-js-06',
    phase: 'javascript-essentials',
    question: {
      en: 'Why does `const double = (n) => { n * 2 }` return `undefined`?',
      ar: 'لماذا تُعيد `const double = (n) => { n * 2 }` قيمة `undefined`؟',
    },
    options: [
      { text: { en: 'Braces make it a body, so it needs an explicit `return`.', ar: 'الأقواس المعقوفة تجعله جسمًا للدالة، فيحتاج `return` صريحة.' }, correct: true },
      { text: { en: 'Arrow functions cannot return numbers.', ar: 'الدوال السهمية لا تستطيع إعادة أرقام.' } },
      { text: { en: '`n` is not defined.', ar: '`n` غير معرّفة.' } },
      { text: { en: 'It needs `function` instead of an arrow.', ar: 'يحتاج `function` بدل السهم.' } },
    ],
    explain: {
      en: '`(n) => n * 2` returns implicitly. Adding `{}` opens a statement body, where the value must be returned by hand. Watch for this when returning an object: `() => ({ a: 1 })`.',
      ar: 'الصيغة `(n) => n * 2` تُعيد القيمة ضمنيًا. وإضافة `{}` تفتح جسمًا للجُمل، فيجب إعادة القيمة يدويًا. انتبه لهذا عند إعادة كائن: `() => ({ a: 1 })`.',
    },
  },
  {
    id: 'b-js-07',
    phase: 'javascript-essentials',
    question: {
      en: 'Which array method returns a new array of the same length?',
      ar: 'أي دالة مصفوفات تُعيد مصفوفة جديدة بالطول نفسه؟',
    },
    options: [
      { text: { en: '`.map()`', ar: '`.map()`' }, correct: true },
      { text: { en: '`.filter()`', ar: '`.filter()`' } },
      { text: { en: '`.find()`', ar: '`.find()`' } },
      { text: { en: '`.reduce()`', ar: '`.reduce()`' } },
    ],
    explain: {
      en: '`.map()` transforms every element one-for-one. `.filter()` may return fewer, `.find()` returns a single element or `undefined`, and `.reduce()` returns whatever you accumulate.',
      ar: '`.map()` تُحوّل كل عنصر واحدًا مقابل واحد. أما `.filter()` فقد تُعيد أقل، و `.find()` تُعيد عنصرًا واحدًا أو `undefined`، و `.reduce()` تُعيد ما تُجمّعه.',
    },
  },
  {
    id: 'b-js-08',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `await` actually do inside an `async` function?',
      ar: 'ماذا تفعل `await` فعليًا داخل دالة `async`؟',
    },
    options: [
      { text: { en: 'Pauses that function until the promise settles, without blocking the page.', ar: 'توقف تلك الدالة حتى تُحسم الوعد، دون تجميد الصفحة.' }, correct: true },
      { text: { en: 'Blocks the whole browser until the promise settles.', ar: 'تُجمّد المتصفح بأكمله حتى يُحسم الوعد.' } },
      { text: { en: 'Converts a promise into a synchronous call.', ar: 'تُحوّل الوعد إلى استدعاء متزامن.' } },
      { text: { en: 'Retries the promise until it succeeds.', ar: 'تُعيد محاولة الوعد حتى ينجح.' } },
    ],
    explain: {
      en: 'The async function suspends and hands control back to the event loop; other work keeps running. It reads like blocking code but nothing else is frozen.',
      ar: 'تتوقّف الدالة غير المتزامنة وتعيد التحكّم إلى حلقة الأحداث، فيستمر باقي العمل. تُقرأ كأنها كود متزامن لكن لا شيء آخر يتجمّد.',
    },
  },
  {
    id: 'b-js-09',
    phase: 'javascript-essentials',
    question: {
      en: 'A `fetch()` call resolves but the server replied 404. What is `response.ok`?',
      ar: 'استدعاء `fetch()` حُسم لكن الخادم ردّ بـ 404. ما قيمة `response.ok`؟',
    },
    options: [
      { text: { en: '`false` — fetch only rejects on network failure, not on HTTP errors.', ar: '`false` — لا يرفض fetch إلا عند فشل الشبكة، لا عند أخطاء HTTP.' }, correct: true },
      { text: { en: '`true` — the request completed.', ar: '`true` — لأن الطلب اكتمل.' } },
      { text: { en: 'The promise rejects, so there is no response.', ar: 'يُرفض الوعد فلا توجد استجابة.' } },
      { text: { en: '`undefined`', ar: '`undefined`' } },
    ],
    explain: {
      en: 'This surprises nearly everyone: a 404 or 500 is a successful round trip as far as `fetch` is concerned. You have to check `response.ok` yourself and throw.',
      ar: 'يفاجئ هذا الجميع تقريبًا: فبالنسبة لـ `fetch` يُعدّ 404 أو 500 رحلة ناجحة. عليك فحص `response.ok` بنفسك وإطلاق الخطأ.',
    },
  },
  {
    id: 'b-js-10',
    phase: 'javascript-essentials',
    question: {
      en: 'Which import matches `export default function Button() {}`?',
      ar: 'أي استيراد يطابق `export default function Button() {}`؟',
    },
    options: [
      { text: { en: '`import Button from "./Button"`', ar: '`import Button from "./Button"`' }, correct: true },
      { text: { en: '`import { Button } from "./Button"`', ar: '`import { Button } from "./Button"`' } },
      { text: { en: '`import * as Button from "./Button"`', ar: '`import * as Button from "./Button"`' } },
      { text: { en: '`import default Button from "./Button"`', ar: '`import default Button from "./Button"`' } },
    ],
    explain: {
      en: 'A default export is imported without braces and can be renamed freely. Braces are for named exports, where the name must match.',
      ar: 'يُستورد التصدير الافتراضي دون أقواس معقوفة ويمكن إعادة تسميته بحرية. أما الأقواس فهي للتصديرات المُسمّاة حيث يجب مطابقة الاسم.',
    },
  },
  {
    id: 'b-js-11',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `items.filter(Boolean)` do?',
      ar: 'ماذا تفعل `items.filter(Boolean)`؟',
    },
    options: [
      { text: { en: 'Removes every falsy entry, such as `null`, `undefined`, `0` and `""`.', ar: 'تحذف كل قيمة falsy مثل `null` و `undefined` و `0` و `""`.' }, correct: true },
      { text: { en: 'Keeps only entries that are literally `true`.', ar: 'تُبقي العناصر التي قيمتها `true` حرفيًا فقط.' } },
      { text: { en: 'Converts every entry to a boolean.', ar: 'تُحوّل كل عنصر إلى قيمة منطقية.' } },
      { text: { en: 'Nothing — `Boolean` is not a valid callback.', ar: 'لا شيء — `Boolean` ليست دالة صالحة.' } },
    ],
    explain: {
      en: '`Boolean` is a function that returns the truthiness of its argument, so it works as a filter predicate. Careful: it drops `0`, which is sometimes a value you wanted.',
      ar: '`Boolean` دالة تُعيد مدى صدق وسيطها، فتصلح كشرط للتصفية. انتبه: فهي تحذف `0` الذي قد يكون قيمة تريدها.',
    },
  },
  {
    id: 'b-js-12',
    phase: 'javascript-essentials',
    question: {
      en: 'How do you merge two objects so the second one wins on conflicts?',
      ar: 'كيف تدمج كائنين بحيث يفوز الثاني عند التعارض؟',
    },
    options: [
      { text: { en: '`{ ...defaults, ...overrides }`', ar: '`{ ...defaults, ...overrides }`' }, correct: true },
      { text: { en: '`{ ...overrides, ...defaults }`', ar: '`{ ...overrides, ...defaults }`' } },
      { text: { en: '`defaults + overrides`', ar: '`defaults + overrides`' } },
      { text: { en: '`defaults.concat(overrides)`', ar: '`defaults.concat(overrides)`' } },
    ],
    explain: {
      en: 'Later keys overwrite earlier ones, so the object you spread last takes precedence. This is exactly how default props and config merging are written.',
      ar: 'المفاتيح اللاحقة تستبدل السابقة، فالكائن الذي تنشره أخيرًا له الأولوية. وهكذا تُكتب الخصائص الافتراضية ودمج الإعدادات تمامًا.',
    },
  },
  {
    id: 'b-js-13',
    phase: 'javascript-essentials',
    question: {
      en: 'What is logged? `const a = [1, 2]; const b = a; b.push(3); console.log(a.length)`',
      ar: 'ماذا يُطبع؟ `const a = [1, 2]; const b = a; b.push(3); console.log(a.length)`',
    },
    options: [
      { text: { en: '`3` — both names point at the same array.', ar: '`3` — كلا الاسمين يشيران إلى المصفوفة نفسها.' }, correct: true },
      { text: { en: '`2` — `b` is a copy.', ar: '`2` — لأن `b` نسخة.' } },
      { text: { en: 'It throws, because `a` is `const`.', ar: 'يُطلق خطأ لأن `a` معرّفة بـ `const`.' } },
      { text: { en: '`undefined`', ar: '`undefined`' } },
    ],
    explain: {
      en: 'Assignment copies the reference, not the data. `const` only stops you rebinding the name — the array it points at is still mutable. This is the root of most "why did my state change?" bugs.',
      ar: 'الإسناد ينسخ المرجع لا البيانات. و `const` تمنع فقط إعادة ربط الاسم — أما المصفوفة نفسها فتبقى قابلة للتعديل. وهذا أصل معظم أخطاء «لماذا تغيّرت حالتي؟».',
    },
  },
  {
    id: 'b-js-14',
    phase: 'javascript-essentials',
    question: {
      en: 'Which runs the two requests concurrently rather than one after the other?',
      ar: 'أيٌّ يُشغّل الطلبين بالتوازي بدل الواحد تلو الآخر؟',
    },
    options: [
      { text: { en: '`const [a, b] = await Promise.all([getA(), getB()])`', ar: '`const [a, b] = await Promise.all([getA(), getB()])`' }, correct: true },
      { text: { en: '`const a = await getA(); const b = await getB()`', ar: '`const a = await getA(); const b = await getB()`' } },
      { text: { en: '`await getA(); await getB()` inside a loop', ar: '`await getA(); await getB()` داخل حلقة' } },
      { text: { en: 'Both options run concurrently.', ar: 'كلا الخيارين يعملان بالتوازي.' } },
    ],
    explain: {
      en: 'Two sequential `await`s wait for the first to finish before starting the second. `Promise.all` starts both immediately and waits for the slower one — often half the total time.',
      ar: 'تنتظر جملتا `await` المتتاليتان انتهاء الأولى قبل بدء الثانية. أما `Promise.all` فتبدأ الاثنين فورًا وتنتظر الأبطأ — وغالبًا يكون ذلك نصف الزمن الكلي.',
    },
  },
  {
    id: 'b-js-15',
    phase: 'javascript-essentials',
    question: {
      en: 'In JSX you write `{items.length > 0 && <List />}` rather than `{items.length && <List />}`. Why?',
      ar: 'في JSX تكتب `{items.length > 0 && <List />}` بدل `{items.length && <List />}`. لماذا؟',
    },
    options: [
      { text: { en: 'A length of `0` would render the number 0 on the page.', ar: 'لأن الطول `0` سيعرض الرقم 0 على الصفحة.' }, correct: true },
      { text: { en: '`&&` does not work with numbers.', ar: 'لأن `&&` لا تعمل مع الأرقام.' } },
      { text: { en: 'The second version always renders the list.', ar: 'لأن الصيغة الثانية تعرض القائمة دائمًا.' } },
      { text: { en: 'There is no difference.', ar: 'لا يوجد فرق.' } },
    ],
    explain: {
      en: 'React skips `false`, `null` and `undefined` but happily renders the number `0`. Comparing to get a real boolean is the fix — a bare `0` on the screen is the classic symptom.',
      ar: 'تتجاهل رياكت `false` و `null` و `undefined` لكنها تعرض الرقم `0` بلا تردّد. والحل هو المقارنة للحصول على قيمة منطقية حقيقية — وظهور `0` وحيدًا على الشاشة هو العَرَض الكلاسيكي.',
    },
  },
  {
    id: 'b-js-16',
    phase: 'javascript-essentials',
    question: {
      en: 'What does the rest element collect in `const [first, ...others] = list`?',
      ar: 'ماذا يجمع عنصر التجميع في `const [first, ...others] = list`؟',
    },
    options: [
      { text: { en: 'A new array of every element after the first.', ar: 'مصفوفة جديدة بكل العناصر بعد الأول.' }, correct: true },
      { text: { en: 'A reference to the original array.', ar: 'مرجعًا للمصفوفة الأصلية.' } },
      { text: { en: 'Only the second element.', ar: 'العنصر الثاني فقط.' } },
      { text: { en: 'An object keyed by index.', ar: 'كائنًا مفاتيحه الفهارس.' } },
    ],
    explain: {
      en: 'Rest gathers the remainder into a fresh array, which is why `const [, ...tail] = list` is a tidy way to drop the head without mutating anything.',
      ar: 'يجمع التجميع البقية في مصفوفة جديدة، ولهذا تُعدّ `const [, ...tail] = list` طريقة أنيقة لحذف العنصر الأول دون تعديل أي شيء.',
    },
  },
  {
    id: 'b-js-17',
    phase: 'javascript-essentials',
    question: {
      en: 'Which is true of a `try` / `catch` around `await fetch(...)`?',
      ar: 'ما الصحيح بشأن `try` / `catch` حول `await fetch(...)`؟',
    },
    options: [
      { text: { en: 'It catches network failures, but not a 500 response.', ar: 'تلتقط أعطال الشبكة، لا استجابة 500.' }, correct: true },
      { text: { en: 'It catches every HTTP error status.', ar: 'تلتقط كل حالات أخطاء HTTP.' } },
      { text: { en: 'It is unnecessary — `fetch` never throws.', ar: 'غير ضرورية — فـ `fetch` لا تُطلق أخطاء أبدًا.' } },
      { text: { en: 'It only works with `.then()`.', ar: 'تعمل فقط مع `.then()`.' } },
    ],
    explain: {
      en: '`fetch` rejects when the request could not be made at all — offline, DNS failure, CORS. An HTTP error status is a completed request, so you must check `response.ok` and throw yourself.',
      ar: 'يرفض `fetch` عندما يتعذّر إرسال الطلب أصلًا — انقطاع الاتصال أو فشل DNS أو CORS. أما حالة خطأ HTTP فهي طلب مكتمل، لذا عليك فحص `response.ok` وإطلاق الخطأ بنفسك.',
    },
  },
  {
    id: 'b-js-18',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `` `${user.name} has ${count} items` `` demonstrate?',
      ar: 'ماذا يوضّح `` `${user.name} has ${count} items` ``؟',
    },
    options: [
      { text: { en: 'A template literal interpolating expressions.', ar: 'قالبًا نصيًا يُدرج تعابير بداخله.' }, correct: true },
      { text: { en: 'String concatenation with `+`.', ar: 'ربط نصوص باستخدام `+`.' } },
      { text: { en: 'A tagged template function.', ar: 'دالة قالب موسوم.' } },
      { text: { en: 'JSX syntax.', ar: 'صياغة JSX.' } },
    ],
    explain: {
      en: 'Backticks allow embedded expressions and real line breaks. Any expression works inside `${}`, not just variables.',
      ar: 'تسمح العلامات المائلة الخلفية بتضمين التعابير وبأسطر حقيقية. وأي تعبير يعمل داخل `${}` وليس المتغيّرات فقط.',
    },
  },
  {
    id: 'b-js-19',
    phase: 'javascript-essentials',
    question: {
      en: 'Which updates one object inside an array without mutating anything?',
      ar: 'أيٌّ يُحدّث كائنًا واحدًا داخل مصفوفة دون تعديل أي شيء؟',
    },
    options: [
      { text: { en: '`list.map((t) => (t.id === id ? { ...t, done: true } : t))`', ar: '`list.map((t) => (t.id === id ? { ...t, done: true } : t))`' }, correct: true },
      { text: { en: '`list.find((t) => t.id === id).done = true`', ar: '`list.find((t) => t.id === id).done = true`' } },
      { text: { en: '`list.forEach((t) => { if (t.id === id) t.done = true })`', ar: '`list.forEach((t) => { if (t.id === id) t.done = true })`' } },
      { text: { en: '`list[id].done = true`', ar: '`list[id].done = true`' } },
    ],
    explain: {
      en: 'Only the `map` version produces a new array with a new object for the changed item. The other three reach into the existing objects and edit them in place.',
      ar: 'صيغة `map` وحدها تُنتج مصفوفة جديدة بكائن جديد للعنصر المتغيّر. أما الثلاثة الأخرى فتصل إلى الكائنات الموجودة وتُعدّلها في مكانها.',
    },
  },
  {
    id: 'b-js-20',
    phase: 'javascript-essentials',
    question: {
      en: 'What is the value of `condition ? a : b` called?',
      ar: 'ماذا يُسمّى التعبير `condition ? a : b`؟',
    },
    options: [
      { text: { en: 'A ternary — an expression, so it can live inside JSX.', ar: 'عامل ثلاثي — وهو تعبير، لذا يمكن وضعه داخل JSX.' }, correct: true },
      { text: { en: 'A short-circuit statement.', ar: 'جملة قصر دائرة.' } },
      { text: { en: 'An inline `if` statement.', ar: 'جملة `if` مضمّنة.' } },
      { text: { en: 'A switch expression.', ar: 'تعبير switch.' } },
    ],
    explain: {
      en: 'The distinction matters in React: JSX curly braces accept expressions, never statements. That is why ternaries and `&&` replace `if` inside markup.',
      ar: 'يهمّ هذا التمييز في رياكت: فأقواس JSX المعقوفة تقبل التعابير لا الجُمل. ولهذا يحلّ العامل الثلاثي و `&&` محلّ `if` داخل الوسوم.',
    },
  },
  {
    id: 'b-js-21',
    phase: 'javascript-essentials',
    question: {
      en: 'Why is `arr.sort()` risky on an array held in React state?',
      ar: 'لماذا تُعدّ `arr.sort()` خطرة على مصفوفة محفوظة في حالة رياكت؟',
    },
    options: [
      { text: { en: 'It sorts in place, mutating the state array.', ar: 'لأنها ترتّب في المكان فتُعدّل مصفوفة الحالة.' }, correct: true },
      { text: { en: 'It always returns `undefined`.', ar: 'لأنها تُعيد `undefined` دائمًا.' } },
      { text: { en: 'It removes duplicate entries.', ar: 'لأنها تحذف العناصر المكرّرة.' } },
      { text: { en: 'It only works on numbers.', ar: 'لأنها تعمل مع الأرقام فقط.' } },
    ],
    explain: {
      en: '`sort` mutates and returns the same array, so React sees an unchanged reference and may skip the re-render. Copy first: `[...arr].sort()`.',
      ar: 'تُعدّل `sort` المصفوفة نفسها وتُعيدها، فترى رياكت المرجع نفسه دون تغيير وقد تتخطّى إعادة العرض. انسخ أولًا: `[...arr].sort()`.',
    },
  },
  {
    id: 'b-js-22',
    phase: 'javascript-essentials',
    question: {
      en: 'What does an `async` function always return?',
      ar: 'ماذا تُعيد الدالة `async` دائمًا؟',
    },
    options: [
      { text: { en: 'A promise, whatever you write in the `return`.', ar: 'وعدًا، مهما كتبت في `return`.' }, correct: true },
      { text: { en: 'Exactly the value you return.', ar: 'القيمة التي تُعيدها بالضبط.' } },
      { text: { en: '`undefined` unless you `await` it.', ar: '`undefined` إلا إذا استخدمت `await`.' } },
      { text: { en: 'A generator.', ar: 'مولّدًا.' } },
    ],
    explain: {
      en: 'Returning `5` from an async function gives you a promise resolving to `5`. This is why calling one without `await` hands you a pending promise rather than the value.',
      ar: 'إعادة `5` من دالة غير متزامنة تمنحك وعدًا يُحسم بالقيمة `5`. ولهذا فاستدعاؤها دون `await` يمنحك وعدًا معلّقًا بدل القيمة.',
    },
  },
  {
    id: 'b-js-23',
    phase: 'javascript-essentials',
    question: {
      en: 'Which correctly removes an item by id without mutation?',
      ar: 'أيٌّ يحذف عنصرًا بمعرّفه دون تعديل الأصل؟',
    },
    options: [
      { text: { en: '`list.filter((t) => t.id !== id)`', ar: '`list.filter((t) => t.id !== id)`' }, correct: true },
      { text: { en: '`list.splice(index, 1)`', ar: '`list.splice(index, 1)`' } },
      { text: { en: '`delete list[index]`', ar: '`delete list[index]`' } },
      { text: { en: '`list.pop()`', ar: '`list.pop()`' } },
    ],
    explain: {
      en: '`filter` returns a new array. `splice` and `pop` mutate, and `delete` leaves an empty hole behind while keeping the length the same.',
      ar: 'تُعيد `filter` مصفوفة جديدة. أما `splice` و `pop` فتُعدّلان الأصل، و `delete` تترك فجوة فارغة مع بقاء الطول كما هو.',
    },
  },
  {
    id: 'b-js-24',
    phase: 'javascript-essentials',
    question: {
      en: 'What is the difference between a named and a default export in one file?',
      ar: 'ما الفرق بين التصدير المُسمّى والتصدير الافتراضي في الملف الواحد؟',
    },
    options: [
      { text: { en: 'A file may have many named exports but only one default.', ar: 'يمكن أن يحوي الملف تصديرات مُسمّاة كثيرة لكن افتراضيًا واحدًا فقط.' }, correct: true },
      { text: { en: 'A file may have many defaults but one named export.', ar: 'يمكن أن يحوي الملف افتراضيات كثيرة وتصديرًا مُسمّى واحدًا.' } },
      { text: { en: 'They are interchangeable.', ar: 'يمكن استبدال أحدهما بالآخر.' } },
      { text: { en: 'Named exports cannot be renamed on import.', ar: 'لا يمكن إعادة تسمية التصديرات المُسمّاة عند الاستيراد.' } },
    ],
    explain: {
      en: 'Named exports must be imported by their exact name (though `as` can rename them). The single default can be imported under any name at all.',
      ar: 'يجب استيراد التصديرات المُسمّاة باسمها الدقيق (مع إمكانية إعادة التسمية بـ `as`). أما الافتراضي الوحيد فيمكن استيراده بأي اسم كان.',
    },
  },
  {
    id: 'b-js-25',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `.find()` return when nothing matches?',
      ar: 'ماذا تُعيد `.find()` عندما لا يطابق أي عنصر؟',
    },
    options: [
      { text: { en: '`undefined`', ar: '`undefined`' }, correct: true },
      { text: { en: '`null`', ar: '`null`' } },
      { text: { en: 'An empty array.', ar: 'مصفوفة فارغة.' } },
      { text: { en: '`-1`', ar: '`-1`' } },
    ],
    explain: {
      en: 'This is why `list.find(...)?.name` is such a common pattern — reading a property straight off the result throws whenever nothing matched. `.findIndex()` is the one that returns `-1`.',
      ar: 'ولهذا يشيع نمط `list.find(...)?.name` — فقراءة خاصية مباشرة من النتيجة تُطلق خطأ عند عدم وجود مطابقة. أما `.findIndex()` فهي التي تُعيد `-1`.',
    },
  },
  {
    id: 'b-js-26',
    phase: 'javascript-essentials',
    question: {
      en: 'Which values are falsy in JavaScript?',
      ar: 'أي القيم تُعدّ falsy في جافاسكربت؟',
    },
    options: [
      { text: { en: '`0`, `""`, `null`, `undefined`, `NaN` and `false`', ar: '`0` و `""` و `null` و `undefined` و `NaN` و `false`' }, correct: true },
      { text: { en: 'Only `false` and `null`', ar: '`false` و `null` فقط' } },
      { text: { en: 'Empty arrays and empty objects too', ar: 'والمصفوفات والكائنات الفارغة أيضًا' } },
      { text: { en: 'Only `undefined`', ar: '`undefined` فقط' } },
    ],
    explain: {
      en: 'Note what is missing: `[]` and `{}` are both truthy. That is why `if (arr)` is never the check you want for "has items" — use `arr.length > 0`.',
      ar: 'لاحظ ما هو غائب: `[]` و `{}` كلاهما truthy. ولهذا لا تصلح `if (arr)` أبدًا للتحقّق من «وجود عناصر» — استخدم `arr.length > 0`.',
    },
  },
  {
    id: 'b-js-27',
    phase: 'javascript-essentials',
    question: {
      en: 'What is wrong with `const copy = { ...user }` if `user.address` is an object you then edit?',
      ar: 'ما الخطأ في `const copy = { ...user }` إذا كانت `user.address` كائنًا ستُعدّله بعد ذلك؟',
    },
    options: [
      { text: { en: 'The copy is shallow, so `copy.address` is the same object as `user.address`.', ar: 'النسخة سطحية، فـ `copy.address` هي الكائن نفسه `user.address`.' }, correct: true },
      { text: { en: 'Spread does not copy nested keys at all.', ar: 'النشر لا ينسخ المفاتيح المتداخلة إطلاقًا.' } },
      { text: { en: 'Nothing — spread is a deep copy.', ar: 'لا شيء — فالنشر نسخة عميقة.' } },
      { text: { en: 'It throws on nested objects.', ar: 'يُطلق خطأ مع الكائنات المتداخلة.' } },
    ],
    explain: {
      en: 'Spread copies one level. Nested objects are shared by reference, so editing `copy.address.city` also changes `user.address.city`. Spread each level you intend to change.',
      ar: 'ينسخ النشر مستوى واحدًا. أما الكائنات المتداخلة فتُشارَك بالمرجع، فتعديل `copy.address.city` يُغيّر `user.address.city` أيضًا. انشر كل مستوى تنوي تغييره.',
    },
  },
  {
    id: 'b-js-28',
    phase: 'javascript-essentials',
    question: {
      en: 'Why can `.map()` be given a function reference, as in `names.map(trim)`?',
      ar: 'لماذا يمكن تمرير مرجع دالة إلى `.map()` كما في `names.map(trim)`؟',
    },
    options: [
      { text: { en: 'Functions are values, so they can be passed like any other argument.', ar: 'لأن الدوال قيم، فيمكن تمريرها كأي وسيط آخر.' }, correct: true },
      { text: { en: 'Because `.map()` compiles the function name to a string.', ar: 'لأن `.map()` تُحوّل اسم الدالة إلى نص.' } },
      { text: { en: 'Only built-in functions can be passed this way.', ar: 'لأن الدوال المدمجة فقط تُمرَّر بهذه الطريقة.' } },
      { text: { en: 'It only works with arrow functions.', ar: 'لأنها تعمل مع الدوال السهمية فقط.' } },
    ],
    explain: {
      en: 'First-class functions are the reason `onClick={handleClick}` works too. Watch the trap: `onClick={handleClick()}` calls it during render instead of passing it.',
      ar: 'الدوال كقيم من الدرجة الأولى هي سبب عمل `onClick={handleClick}` أيضًا. انتبه للفخّ: `onClick={handleClick()}` تستدعيها أثناء العرض بدل تمريرها.',
    },
  },
  {
    id: 'b-js-29',
    phase: 'javascript-essentials',
    question: {
      en: 'What does `Object.entries({ a: 1, b: 2 })` produce?',
      ar: 'ماذا تُنتج `Object.entries({ a: 1, b: 2 })`؟',
    },
    options: [
      { text: { en: '`[["a", 1], ["b", 2]]`', ar: '`[["a", 1], ["b", 2]]`' }, correct: true },
      { text: { en: '`["a", "b"]`', ar: '`["a", "b"]`' } },
      { text: { en: '`[1, 2]`', ar: '`[1, 2]`' } },
      { text: { en: '`{ a: 1, b: 2 }`', ar: '`{ a: 1, b: 2 }`' } },
    ],
    explain: {
      en: 'Entries gives key/value pairs, which is what lets you `.map()` over an object in JSX. `Object.keys` gives the first column, `Object.values` the second.',
      ar: 'تمنحك entries أزواج المفتاح والقيمة، وهو ما يتيح استخدام `.map()` على كائن داخل JSX. و `Object.keys` تمنحك العمود الأول، و `Object.values` الثاني.',
    },
  },
  {
    id: 'b-js-30',
    phase: 'javascript-essentials',
    question: {
      en: 'Which statement about `let` and `const` is correct?',
      ar: 'أي عبارة صحيحة عن `let` و `const`؟',
    },
    options: [
      { text: { en: 'Both are block-scoped; `const` cannot be reassigned.', ar: 'كلاهما محصور بالكتلة، و `const` لا يمكن إعادة إسنادها.' }, correct: true },
      { text: { en: 'Both are function-scoped like `var`.', ar: 'كلاهما محصور بالدالة مثل `var`.' } },
      { text: { en: '`const` values can never be changed in any way.', ar: 'لا يمكن تغيير قيم `const` بأي شكل إطلاقًا.' } },
      { text: { en: '`let` cannot be reassigned.', ar: '`let` لا يمكن إعادة إسنادها.' } },
    ],
    explain: {
      en: '`const` freezes the binding, not the value. A `const` object or array can still have its contents changed — which is exactly why immutable update patterns matter in React.',
      ar: 'تُجمّد `const` الارتباط لا القيمة. فالكائن أو المصفوفة المعرّفة بـ `const` يمكن تغيير محتواها — ولهذا بالضبط تهمّ أنماط التحديث غير المتغيّرة في رياكت.',
    },
  },
  {
    id: 'b-js-31',
    phase: 'javascript-essentials',
    question: {
      en: 'What happens to code written after a `return` inside a function?',
      ar: 'ماذا يحدث للكود المكتوب بعد `return` داخل دالة؟',
    },
    options: [
      { text: { en: 'It never runs — `return` exits the function immediately.', ar: 'لا يعمل أبدًا — فـ `return` تُنهي الدالة فورًا.' }, correct: true },
      { text: { en: 'It runs after the returned value is used.', ar: 'يعمل بعد استخدام القيمة المُعادة.' } },
      { text: { en: 'It runs only in async functions.', ar: 'يعمل في الدوال غير المتزامنة فقط.' } },
      { text: { en: 'It causes a syntax error.', ar: 'يسبّب خطأً في الصياغة.' } },
    ],
    explain: {
      en: 'This is behind the React "early return" pattern: `if (!data) return <Spinner />` skips the rest of the component entirely.',
      ar: 'وهذا أساس نمط «الإعادة المبكرة» في رياكت: فـ `if (!data) return <Spinner />` تتخطّى بقية المكوّن بالكامل.',
    },
  },
  {
    id: 'b-js-32',
    phase: 'javascript-essentials',
    question: {
      en: 'Why does `[1, 2, 3].map((n) => n * 2)` not change the original array?',
      ar: 'لماذا لا تُغيّر `[1, 2, 3].map((n) => n * 2)` المصفوفة الأصلية؟',
    },
    options: [
      { text: { en: '`.map()` builds and returns a new array.', ar: 'لأن `.map()` تبني مصفوفة جديدة وتُعيدها.' }, correct: true },
      { text: { en: 'Because the array is a literal.', ar: 'لأن المصفوفة قيمة حرفية.' } },
      { text: { en: 'Because arrow functions cannot mutate.', ar: 'لأن الدوال السهمية لا تستطيع التعديل.' } },
      { text: { en: 'It does change it.', ar: 'بل تُغيّرها فعلًا.' } },
    ],
    explain: {
      en: 'Non-mutating by design, which is why `map`, `filter` and `slice` are safe in React while `push`, `splice` and `sort` are not.',
      ar: 'مصمّمة لعدم التعديل، ولهذا تُعدّ `map` و `filter` و `slice` آمنة في رياكت بينما `push` و `splice` و `sort` ليست كذلك.',
    },
  },

  // ---------------------------------------------------------------- phase 2
  {
    id: 'b-rf-01',
    phase: 'react-fundamentals',
    question: {
      en: 'In one sentence, what is a React component?',
      ar: 'في جملة واحدة، ما المكوّن في رياكت؟',
    },
    options: [
      { text: { en: 'A function that takes data and returns a description of UI.', ar: 'دالة تأخذ بيانات وتُعيد وصفًا للواجهة.' }, correct: true },
      { text: { en: 'A class that writes directly to the DOM.', ar: 'صنف يكتب مباشرةً إلى DOM.' } },
      { text: { en: 'An HTML file with embedded JavaScript.', ar: 'ملف HTML بجافاسكربت مضمّنة.' } },
      { text: { en: 'A template compiled at runtime by the browser.', ar: 'قالب يُصرَّف وقت التشغيل بواسطة المتصفح.' } },
    ],
    explain: {
      en: 'The key word is *description*. You never touch the DOM; you describe what it should look like for the current data and React works out the changes.',
      ar: 'الكلمة المفتاح هي *وصف*. فأنت لا تلمس DOM إطلاقًا، بل تصف الشكل المطلوب للبيانات الحالية وتتكفّل رياكت باستنتاج التغييرات.',
    },
  },
  {
    id: 'b-rf-02',
    phase: 'react-fundamentals',
    question: {
      en: 'Why must a component name start with a capital letter?',
      ar: 'لماذا يجب أن يبدأ اسم المكوّن بحرف كبير؟',
    },
    options: [
      { text: { en: 'JSX treats lower-case tags as built-in HTML elements.', ar: 'لأن JSX تعامل الوسوم صغيرة الأحرف كعناصر HTML مدمجة.' }, correct: true },
      { text: { en: 'It is only a style convention with no effect.', ar: 'لأنه عرف تنسيقي فقط بلا أثر.' } },
      { text: { en: 'Lower-case names break TypeScript.', ar: 'لأن الأسماء صغيرة الأحرف تُعطّل تايب سكربت.' } },
      { text: { en: 'React sorts components alphabetically by case.', ar: 'لأن رياكت ترتّب المكوّنات حسب حالة الأحرف.' } },
    ],
    explain: {
      en: '`<button />` compiles to the string `"button"`, while `<Button />` compiles to a reference to your function. A lower-case component silently renders an unknown HTML tag.',
      ar: 'تُترجَم `<button />` إلى النص `"button"`، بينما تُترجَم `<Button />` إلى مرجع لدالتك. والمكوّن صغير الأحرف يعرض وسمًا مجهولًا بصمت.',
    },
  },
  {
    id: 'b-rf-03',
    phase: 'react-fundamentals',
    question: {
      en: 'Why does JSX use `className` instead of `class`?',
      ar: 'لماذا تستخدم JSX الخاصية `className` بدل `class`؟',
    },
    options: [
      { text: { en: '`class` is a reserved word in JavaScript.', ar: 'لأن `class` كلمة محجوزة في جافاسكربت.' }, correct: true },
      { text: { en: 'React uses a different CSS engine.', ar: 'لأن رياكت تستخدم محرّك CSS مختلفًا.' } },
      { text: { en: '`class` only works on custom components.', ar: 'لأن `class` تعمل مع المكوّنات المخصّصة فقط.' } },
      { text: { en: 'It is a legacy naming choice with no reason.', ar: 'لأنه اختيار تسمية قديم بلا سبب.' } },
    ],
    explain: {
      en: 'JSX is JavaScript, so attribute names avoid reserved words. The same reason gives you `htmlFor` in place of `for`.',
      ar: 'JSX هي جافاسكربت، فتتجنّب أسماء الخصائص الكلمات المحجوزة. والسبب نفسه يمنحك `htmlFor` بدل `for`.',
    },
  },
  {
    id: 'b-rf-04',
    phase: 'react-fundamentals',
    question: {
      en: 'A component returns two sibling elements. What must wrap them?',
      ar: 'مكوّن يُعيد عنصرين شقيقين. بماذا يجب تغليفهما؟',
    },
    options: [
      { text: { en: 'A single parent — a real element or a fragment `<>...</>`.', ar: 'بأب واحد — عنصر حقيقي أو جزء `<>...</>`.' }, correct: true },
      { text: { en: 'An array literal, always.', ar: 'بمصفوفة حرفية دائمًا.' } },
      { text: { en: 'A `<div>` specifically.', ar: 'بعنصر `<div>` تحديدًا.' } },
      { text: { en: 'Nothing — JSX allows multiple roots.', ar: 'لا شيء — فـ JSX تسمح بجذور متعدّدة.' } },
    ],
    explain: {
      en: 'A function can only return one value. A fragment groups children without adding a node to the DOM, which matters inside flex, grid and table layouts.',
      ar: 'لا تستطيع الدالة إعادة أكثر من قيمة واحدة. والجزء يجمع الأبناء دون إضافة عقدة إلى DOM، وهو ما يهمّ داخل تخطيطات flex و grid والجداول.',
    },
  },
  {
    id: 'b-rf-05',
    phase: 'react-fundamentals',
    question: {
      en: 'What is wrong with `<button onClick={handleDelete()}>`?',
      ar: 'ما الخطأ في `<button onClick={handleDelete()}>`؟',
    },
    options: [
      { text: { en: 'It calls the function during render instead of on click.', ar: 'تستدعي الدالة أثناء العرض بدل النقر.' }, correct: true },
      { text: { en: 'Nothing — this is the correct form.', ar: 'لا شيء — هذه هي الصيغة الصحيحة.' } },
      { text: { en: '`onClick` must be lower-case.', ar: 'يجب أن تكون `onClick` بحروف صغيرة.' } },
      { text: { en: 'It needs `bind(this)`.', ar: 'تحتاج `bind(this)`.' } },
    ],
    explain: {
      en: 'The parentheses call it immediately and hand the *result* to `onClick`. Pass the reference — `onClick={handleDelete}` — or wrap it: `onClick={() => handleDelete(id)}`.',
      ar: 'الأقواس تستدعيها فورًا وتُمرّر *النتيجة* إلى `onClick`. مرّر المرجع — `onClick={handleDelete}` — أو غلّفه: `onClick={() => handleDelete(id)}`.',
    },
  },
  {
    id: 'b-rf-06',
    phase: 'react-fundamentals',
    question: {
      en: 'What is the specific bug caused by using an array index as a `key`?',
      ar: 'ما الخلل المحدّد الناتج عن استخدام فهرس المصفوفة كـ `key`؟',
    },
    options: [
      { text: { en: 'After inserting or reordering, state sticks to the wrong row.', ar: 'بعد الإدراج أو إعادة الترتيب تلتصق الحالة بالصف الخطأ.' }, correct: true },
      { text: { en: 'React refuses to render the list.', ar: 'ترفض رياكت عرض القائمة.' } },
      { text: { en: 'It always causes an infinite loop.', ar: 'يسبّب حلقة لا نهائية دائمًا.' } },
      { text: { en: 'The list renders in reverse.', ar: 'تُعرض القائمة معكوسة.' } },
    ],
    explain: {
      en: 'Keys tell React which element is which across renders. Index 0 stays index 0 even when a different item moves into that slot, so checkbox ticks and input text follow the position rather than the data.',
      ar: 'تُخبر المفاتيح رياكت أي عنصر هو أي عبر عمليات العرض. فالفهرس 0 يبقى 0 حتى لو انتقل عنصر مختلف إلى ذلك الموضع، فتتبع علامات الاختيار ونصوص الحقول الموضعَ بدل البيانات.',
    },
  },
  {
    id: 'b-rf-07',
    phase: 'react-fundamentals',
    question: {
      en: 'Where must a `key` be placed when rendering a list?',
      ar: 'أين يجب وضع `key` عند عرض قائمة؟',
    },
    options: [
      { text: { en: 'On the outermost element returned by the `.map()` callback.', ar: 'على العنصر الأخارجي الذي تُعيده دالة `.map()`.' }, correct: true },
      { text: { en: 'On the `<ul>` wrapping the list.', ar: 'على `<ul>` التي تغلّف القائمة.' } },
      { text: { en: 'On the innermost text node.', ar: 'على أعمق عقدة نصية.' } },
      { text: { en: 'Anywhere inside the item.', ar: 'في أي مكان داخل العنصر.' } },
    ],
    explain: {
      en: 'The key belongs on the element the map returns — if you extract a `<Row />` component, the key goes on `<Row key={...} />` at the call site, not inside `Row`.',
      ar: 'ينتمي المفتاح إلى العنصر الذي تُعيده map — فإذا استخرجت مكوّن `<Row />` يوضع المفتاح على `<Row key={...} />` عند الاستدعاء لا داخل `Row`.',
    },
  },
  {
    id: 'b-rf-08',
    phase: 'react-fundamentals',
    question: {
      en: 'Can a child component change a prop it received?',
      ar: 'هل يستطيع المكوّن الابن تغيير خاصية استلمها؟',
    },
    options: [
      { text: { en: 'No — props are read-only; the owner of the data must change it.', ar: 'لا — الخصائص للقراءة فقط، ومالك البيانات هو من يُغيّرها.' }, correct: true },
      { text: { en: 'Yes, by assigning to `props.value`.', ar: 'نعم بالإسناد إلى `props.value`.' } },
      { text: { en: 'Yes, but only objects and arrays.', ar: 'نعم لكن الكائنات والمصفوفات فقط.' } },
      { text: { en: 'Only when the parent allows it with `mutable`.', ar: 'فقط عندما يسمح الأب بذلك عبر `mutable`.' } },
    ],
    explain: {
      en: 'One-way data flow is the whole point: data travels down, events travel up. To change a prop, call a function the parent passed you.',
      ar: 'التدفّق أحادي الاتجاه هو الفكرة كلها: البيانات تنزل والأحداث تصعد. ولتغيير خاصية، استدعِ دالةً مرّرها لك الأب.',
    },
  },
  {
    id: 'b-rf-09',
    phase: 'react-fundamentals',
    question: {
      en: 'What does the `children` prop hold?',
      ar: 'ماذا تحمل خاصية `children`؟',
    },
    options: [
      { text: { en: 'Whatever JSX was placed between the component\'s opening and closing tags.', ar: 'أي JSX وُضعت بين وسمَي فتح المكوّن وإغلاقه.' }, correct: true },
      { text: { en: 'Only the component\'s direct DOM nodes.', ar: 'عقد DOM المباشرة للمكوّن فقط.' } },
      { text: { en: 'A list of every nested component name.', ar: 'قائمة بأسماء كل المكوّنات المتداخلة.' } },
      { text: { en: 'The parent component.', ar: 'المكوّن الأب.' } },
    ],
    explain: {
      en: '`children` is what makes wrappers like `<Card>…</Card>` possible, and it is the foundation of composition — a `Card` need know nothing about what it wraps.',
      ar: '`children` هي ما يجعل الأغلفة مثل `<Card>…</Card>` ممكنة، وهي أساس التركيب — فلا حاجة لأن يعرف `Card` شيئًا عمّا يغلّفه.',
    },
  },
  {
    id: 'b-rf-10',
    phase: 'react-fundamentals',
    question: {
      en: 'Which renders nothing at all in React?',
      ar: 'أيٌّ لا يعرض شيئًا إطلاقًا في رياكت؟',
    },
    options: [
      { text: { en: '`null`, `undefined`, `false` and `true`', ar: '`null` و `undefined` و `false` و `true`' }, correct: true },
      { text: { en: '`0` and `""`', ar: '`0` و `""`' } },
      { text: { en: 'Empty arrays only', ar: 'المصفوفات الفارغة فقط' } },
      { text: { en: 'Every falsy value', ar: 'كل قيمة falsy' } },
    ],
    explain: {
      en: 'Booleans, `null` and `undefined` are skipped. `0` is a number and gets printed — the reason `{count && <Badge />}` shows a stray zero.',
      ar: 'تُتجاهَل القيم المنطقية و `null` و `undefined`. أما `0` فهو رقم ويُطبع — وهو سبب ظهور صفر شارد في `{count && <Badge />}`.',
    },
  },
  {
    id: 'b-rf-11',
    phase: 'react-fundamentals',
    question: {
      en: 'How do you write a comment inside JSX markup?',
      ar: 'كيف تكتب تعليقًا داخل وسوم JSX؟',
    },
    options: [
      { text: { en: '`{/* like this */}`', ar: '`{/* هكذا */}`' }, correct: true },
      { text: { en: '`<!-- like this -->`', ar: '`<!-- هكذا -->`' } },
      { text: { en: '`// like this`', ar: '`// هكذا`' } },
      { text: { en: 'Comments are not allowed in JSX.', ar: 'التعليقات ممنوعة في JSX.' } },
    ],
    explain: {
      en: 'Curly braces drop you into JavaScript, so a normal block comment works there. HTML comment syntax would be rendered as text.',
      ar: 'تُدخلك الأقواس المعقوفة إلى جافاسكربت، فيعمل التعليق الكتلي المعتاد هناك. أما صياغة تعليق HTML فستُعرض كنص.',
    },
  },
  {
    id: 'b-rf-12',
    phase: 'react-fundamentals',
    question: {
      en: 'What does `<img src={url} />` need that HTML does not?',
      ar: 'ما الذي تحتاجه `<img src={url} />` ولا تحتاجه HTML؟',
    },
    options: [
      { text: { en: 'An explicit self-closing slash — every JSX tag must be closed.', ar: 'شرطة إغلاق ذاتي صريحة — فكل وسم في JSX يجب أن يُغلق.' }, correct: true },
      { text: { en: 'A `key` prop.', ar: 'خاصية `key`.' } },
      { text: { en: 'A wrapping fragment.', ar: 'جزءًا يغلّفه.' } },
      { text: { en: 'Nothing extra.', ar: 'لا شيء إضافي.' } },
    ],
    explain: {
      en: 'JSX has no void elements. `<img>`, `<br>` and `<input>` all need `/>` or the parser will look for a closing tag.',
      ar: 'لا توجد عناصر فارغة في JSX. فـ `<img>` و `<br>` و `<input>` تحتاج جميعها `/>` وإلا بحث المحلّل عن وسم إغلاق.',
    },
  },
  {
    id: 'b-rf-13',
    phase: 'react-fundamentals',
    question: {
      en: 'Which is a better fix for a component with nine boolean props?',
      ar: 'أي حلٍّ أفضل لمكوّن بتسع خصائص منطقية؟',
    },
    options: [
      { text: { en: 'Compose smaller pieces and pass JSX through `children` or slots.', ar: 'ركّب قطعًا أصغر ومرّر JSX عبر `children` أو فتحات.' }, correct: true },
      { text: { en: 'Replace them with one `variant` string listing all combinations.', ar: 'استبدلها بنص `variant` واحد يسرد كل التركيبات.' } },
      { text: { en: 'Move them into a global store.', ar: 'انقلها إلى مخزن عام.' } },
      { text: { en: 'Group them into a single object prop.', ar: 'اجمعها في خاصية كائن واحدة.' } },
    ],
    explain: {
      en: 'Boolean props multiply: nine of them describe 512 states, most untested. Composition lets the caller supply the variation directly instead of enumerating it.',
      ar: 'تتضاعف الخصائص المنطقية: فتسع منها تصف 512 حالة معظمها غير مُختبَر. والتركيب يتيح للمستدعي تقديم الاختلاف مباشرةً بدل تعداده.',
    },
  },
  {
    id: 'b-rf-14',
    phase: 'react-fundamentals',
    question: {
      en: 'What does `{condition ? <A /> : <B />}` do that `{condition && <A />}` cannot?',
      ar: 'ما الذي تفعله `{condition ? <A /> : <B />}` ولا تستطيعه `{condition && <A />}`؟',
    },
    options: [
      { text: { en: 'Render an alternative when the condition is false.', ar: 'عرض بديل عندما يكون الشرط خاطئًا.' }, correct: true },
      { text: { en: 'Handle more than two branches.', ar: 'التعامل مع أكثر من فرعين.' } },
      { text: { en: 'Avoid re-rendering.', ar: 'تجنّب إعادة العرض.' } },
      { text: { en: 'Work with async values.', ar: 'العمل مع القيم غير المتزامنة.' } },
    ],
    explain: {
      en: '`&&` renders something or nothing. A ternary picks between two things. For three or more branches, an early return or a lookup object reads better than nesting ternaries.',
      ar: '`&&` تعرض شيئًا أو لا شيء، بينما يختار العامل الثلاثي بين شيئين. ولثلاثة فروع أو أكثر تكون الإعادة المبكرة أو كائن البحث أوضح من تداخل العوامل الثلاثية.',
    },
  },
  {
    id: 'b-rf-15',
    phase: 'react-fundamentals',
    question: {
      en: 'Two `<Counter />` elements are rendered side by side. Do they share state?',
      ar: 'عُرض عنصران `<Counter />` جنبًا إلى جنب. هل يتشاركان الحالة؟',
    },
    options: [
      { text: { en: 'No — each element gets its own independent state.', ar: 'لا — كل عنصر يحصل على حالته المستقلّة.' }, correct: true },
      { text: { en: 'Yes, because they are the same component.', ar: 'نعم لأنهما المكوّن نفسه.' } },
      { text: { en: 'Only if they have the same props.', ar: 'فقط إذا تطابقت خصائصهما.' } },
      { text: { en: 'Only when wrapped in a fragment.', ar: 'فقط عند تغليفهما بجزء.' } },
    ],
    explain: {
      en: 'State belongs to a position in the tree, not to the function. Rendering a component twice creates two separate instances with separate state.',
      ar: 'تنتمي الحالة إلى موضع في الشجرة لا إلى الدالة. فعرض المكوّن مرتين يُنشئ نسختين منفصلتين بحالتين منفصلتين.',
    },
  },
  {
    id: 'b-rf-16',
    phase: 'react-fundamentals',
    question: {
      en: 'What is the correct way to spread props onto a child?',
      ar: 'ما الطريقة الصحيحة لنشر الخصائص على مكوّن ابن؟',
    },
    options: [
      { text: { en: '`<Input {...rest} />`', ar: '`<Input {...rest} />`' }, correct: true },
      { text: { en: '`<Input props={rest} />`', ar: '`<Input props={rest} />`' } },
      { text: { en: '`<Input ...rest />`', ar: '`<Input ...rest />`' } },
      { text: { en: '`<Input spread={rest} />`', ar: '`<Input spread={rest} />`' } },
    ],
    explain: {
      en: 'Combined with rest destructuring — `function Input({ label, ...rest })` — this is the standard way to pass unknown DOM attributes straight through to the element.',
      ar: 'بدمجها مع تفكيك التجميع — `function Input({ label, ...rest })` — تكون هذه الطريقة القياسية لتمرير خصائص DOM المجهولة مباشرةً إلى العنصر.',
    },
  },
  {
    id: 'b-rf-17',
    phase: 'react-fundamentals',
    question: {
      en: 'Why is `style={{ color: "red" }}` written with two braces?',
      ar: 'لماذا تُكتب `style={{ color: "red" }}` بقوسين معقوفين؟',
    },
    options: [
      { text: { en: 'The outer braces enter JavaScript; the inner ones are an object literal.', ar: 'القوسان الخارجيان يدخلان إلى جافاسكربت، والداخليان كائن حرفي.' }, correct: true },
      { text: { en: 'It is a special React syntax for CSS.', ar: 'إنها صياغة خاصة في رياكت لـ CSS.' } },
      { text: { en: 'One pair escapes the other.', ar: 'أحد الزوجين يُهرِّب الآخر.' } },
      { text: { en: 'It is a typo that still works.', ar: 'إنه خطأ مطبعي لكنه يعمل.' } },
    ],
    explain: {
      en: 'There is nothing special going on — `style` takes an object, and any JSX value goes in braces. Property names are camelCase: `backgroundColor`, not `background-color`.',
      ar: 'لا شيء خاص هنا — فـ `style` تأخذ كائنًا، وأي قيمة في JSX توضع بين قوسين. وأسماء الخصائص بصيغة camelCase: `backgroundColor` لا `background-color`.',
    },
  },
  {
    id: 'b-rf-18',
    phase: 'react-fundamentals',
    question: {
      en: 'Which key is the best choice for a list of tasks from a database?',
      ar: 'أي مفتاح هو الخيار الأفضل لقائمة مهام من قاعدة بيانات؟',
    },
    options: [
      { text: { en: 'The task\'s own stable id.', ar: 'المعرّف الثابت الخاص بالمهمة.' }, correct: true },
      { text: { en: 'The array index.', ar: 'فهرس المصفوفة.' } },
      { text: { en: 'A random number generated each render.', ar: 'رقم عشوائي يُولَّد في كل عرض.' } },
      { text: { en: 'The task title.', ar: 'عنوان المهمة.' } },
    ],
    explain: {
      en: 'A key must be stable, unique among siblings, and tied to the data. A fresh random number each render forces React to destroy and rebuild every row.',
      ar: 'يجب أن يكون المفتاح ثابتًا وفريدًا بين الأشقّاء ومرتبطًا بالبيانات. أما رقم عشوائي جديد في كل عرض فيُجبر رياكت على هدم كل صف وإعادة بنائه.',
    },
  },
  {
    id: 'b-rf-19',
    phase: 'react-fundamentals',
    question: {
      en: 'What does React do with the object a component returns?',
      ar: 'ماذا تفعل رياكت بالكائن الذي يُعيده المكوّن؟',
    },
    options: [
      { text: { en: 'Compares it with the previous one and updates only what differs.', ar: 'تقارنه بالسابق وتُحدّث ما اختلف فقط.' }, correct: true },
      { text: { en: 'Writes it straight to `innerHTML`.', ar: 'تكتبه مباشرةً إلى `innerHTML`.' } },
      { text: { en: 'Stores it in localStorage.', ar: 'تخزّنه في localStorage.' } },
      { text: { en: 'Rebuilds the whole page from scratch.', ar: 'تعيد بناء الصفحة كلها من الصفر.' } },
    ],
    explain: {
      en: 'The returned tree is a plain description. React diffs it against the last one and applies the minimum set of DOM operations.',
      ar: 'الشجرة المُعادة مجرّد وصف. تقارنها رياكت بالسابقة وتُطبّق أقل مجموعة ممكنة من عمليات DOM.',
    },
  },
  {
    id: 'b-rf-20',
    phase: 'react-fundamentals',
    question: {
      en: 'Which prop name is wrong for a DOM input in JSX?',
      ar: 'أي اسم خاصية خاطئ لحقل إدخال DOM في JSX؟',
    },
    options: [
      { text: { en: '`onchange`', ar: '`onchange`' }, correct: true },
      { text: { en: '`onChange`', ar: '`onChange`' } },
      { text: { en: '`value`', ar: '`value`' } },
      { text: { en: '`autoFocus`', ar: '`autoFocus`' } },
    ],
    explain: {
      en: 'DOM event props are camelCase in JSX. An all-lowercase `onchange` is treated as an unknown attribute and silently does nothing.',
      ar: 'خصائص أحداث DOM بصيغة camelCase في JSX. أما `onchange` بحروف صغيرة بالكامل فتُعامَل كخاصية مجهولة ولا تفعل شيئًا بصمت.',
    },
  },
  {
    id: 'b-rf-21',
    phase: 'react-fundamentals',
    question: {
      en: 'How do you stop a form from reloading the page on submit?',
      ar: 'كيف تمنع النموذج من إعادة تحميل الصفحة عند الإرسال؟',
    },
    options: [
      { text: { en: 'Call `e.preventDefault()` in the submit handler.', ar: 'استدعِ `e.preventDefault()` في معالج الإرسال.' }, correct: true },
      { text: { en: 'Return `false` from the handler.', ar: 'أعِد `false` من المعالج.' } },
      { text: { en: 'Use `<div>` instead of `<form>`.', ar: 'استخدم `<div>` بدل `<form>`.' } },
      { text: { en: 'Set `method="none"`.', ar: 'اضبط `method="none"`.' } },
    ],
    explain: {
      en: 'Returning `false` works in inline HTML handlers but not in React\'s synthetic events. Keep the `<form>` — it gives you Enter-to-submit and correct semantics for free.',
      ar: 'إعادة `false` تعمل في معالجات HTML المضمّنة لا في أحداث رياكت الاصطناعية. وأبقِ على `<form>` — فهو يمنحك الإرسال بمفتاح Enter ودلالات صحيحة مجانًا.',
    },
  },
  {
    id: 'b-rf-22',
    phase: 'react-fundamentals',
    question: {
      en: 'What is "composition" in React?',
      ar: 'ما «التركيب» في رياكت؟',
    },
    options: [
      { text: { en: 'Building big UI by nesting small, reusable components.', ar: 'بناء واجهة كبيرة بتداخل مكوّنات صغيرة قابلة لإعادة الاستخدام.' }, correct: true },
      { text: { en: 'Extending a base component class.', ar: 'توريث صنف مكوّن أساسي.' } },
      { text: { en: 'Merging two components into one file.', ar: 'دمج مكوّنين في ملف واحد.' } },
      { text: { en: 'Compiling JSX to JavaScript.', ar: 'تصريف JSX إلى جافاسكربت.' } },
    ],
    explain: {
      en: 'React has no inheritance model for UI. Everything is solved by nesting and by passing elements as props — which is why `children` shows up everywhere.',
      ar: 'لا تملك رياكت نموذج وراثة للواجهة. فكل شيء يُحلّ بالتداخل وبتمرير العناصر كخصائص — ولهذا تظهر `children` في كل مكان.',
    },
  },
  {
    id: 'b-rf-23',
    phase: 'react-fundamentals',
    question: {
      en: 'What happens if you call a component as a function, `Header()`, instead of `<Header />`?',
      ar: 'ماذا يحدث إذا استدعيت المكوّن كدالة `Header()` بدل `<Header />`؟',
    },
    options: [
      { text: { en: 'React never sees a component, so it gets no state or lifecycle of its own.', ar: 'لا ترى رياكت مكوّنًا، فلا يحصل على حالة أو دورة حياة خاصة به.' }, correct: true },
      { text: { en: 'It behaves identically.', ar: 'يتصرّف بالطريقة نفسها.' } },
      { text: { en: 'It throws immediately.', ar: 'يُطلق خطأً فورًا.' } },
      { text: { en: 'It renders twice.', ar: 'يُعرض مرتين.' } },
    ],
    explain: {
      en: 'The output is inlined into the caller. Any hooks inside now belong to the parent, which breaks the moment the parent renders it conditionally.',
      ar: 'يُدرَج الناتج داخل المستدعي. وأي خطّافات بداخله تصبح تابعة للأب، وهو ما ينكسر بمجرد أن يعرضه الأب شرطيًا.',
    },
  },
  {
    id: 'b-rf-24',
    phase: 'react-fundamentals',
    question: {
      en: 'Which correctly gives a prop a default value?',
      ar: 'أيٌّ يمنح الخاصية قيمة افتراضية بشكل صحيح؟',
    },
    options: [
      { text: { en: '`function Badge({ tone = "info" }) {}`', ar: '`function Badge({ tone = "info" }) {}`' }, correct: true },
      { text: { en: '`function Badge(props = "info") {}`', ar: '`function Badge(props = "info") {}`' } },
      { text: { en: '`Badge.default = "info"`', ar: '`Badge.default = "info"`' } },
      { text: { en: '`<Badge tone?="info" />`', ar: '`<Badge tone?="info" />`' } },
    ],
    explain: {
      en: 'Destructuring defaults in the parameter list replaced the old `defaultProps` API, which is removed for function components in React 19.',
      ar: 'حلّت القيم الافتراضية في تفكيك الوسائط محلّ واجهة `defaultProps` القديمة التي أُزيلت للمكوّنات الدالّية في رياكت 19.',
    },
  },
  {
    id: 'b-rf-25',
    phase: 'react-fundamentals',
    question: {
      en: 'Why should a component avoid writing to the DOM directly with `document.querySelector`?',
      ar: 'لماذا يجب أن يتجنّب المكوّن الكتابة مباشرةً إلى DOM عبر `document.querySelector`؟',
    },
    options: [
      { text: { en: 'React owns the DOM and will overwrite the change on the next render.', ar: 'لأن رياكت تملك DOM وستستبدل التغيير في العرض التالي.' }, correct: true },
      { text: { en: '`querySelector` is not available in React apps.', ar: 'لأن `querySelector` غير متاحة في تطبيقات رياكت.' } },
      { text: { en: 'It is slower than JSX.', ar: 'لأنها أبطأ من JSX.' } },
      { text: { en: 'It only works in class components.', ar: 'لأنها تعمل في مكوّنات الأصناف فقط.' } },
    ],
    explain: {
      en: 'You describe the output, React reconciles it. Any manual edit is outside that model and gets wiped whenever the component re-renders.',
      ar: 'أنت تصف الناتج ورياكت تُطابقه. وأي تعديل يدوي يقع خارج هذا النموذج ويُمحى كلما أُعيد عرض المكوّن.',
    },
  },
  {
    id: 'b-rf-26',
    phase: 'react-fundamentals',
    question: {
      en: 'What does `<>` mean in JSX?',
      ar: 'ماذا تعني `<>` في JSX؟',
    },
    options: [
      { text: { en: 'A fragment — groups children without adding a DOM node.', ar: 'جزءًا — يجمع الأبناء دون إضافة عقدة إلى DOM.' }, correct: true },
      { text: { en: 'A placeholder for a component name.', ar: 'عنصرًا نائبًا لاسم مكوّن.' } },
      { text: { en: 'A comment.', ar: 'تعليقًا.' } },
      { text: { en: 'A generic type parameter.', ar: 'معامل نوع عام.' } },
    ],
    explain: {
      en: 'Shorthand for `<React.Fragment>`. Use the long form when you need to give it a `key`, such as inside a `.map()`.',
      ar: 'اختصار لـ `<React.Fragment>`. استخدم الصيغة الطويلة حين تحتاج إعطاءه `key`، كما داخل `.map()`.',
    },
  },
  {
    id: 'b-rf-27',
    phase: 'react-fundamentals',
    question: {
      en: 'A parent needs data from a click inside a child. How does it get it?',
      ar: 'يحتاج الأب بيانات من نقرة داخل الابن. كيف يحصل عليها؟',
    },
    options: [
      { text: { en: 'The parent passes a callback down; the child calls it with the data.', ar: 'يمرّر الأب دالة رد نداء للأسفل، ويستدعيها الابن مع البيانات.' }, correct: true },
      { text: { en: 'The child writes to the parent\'s props.', ar: 'يكتب الابن إلى خصائص الأب.' } },
      { text: { en: 'The parent reads the child\'s state directly.', ar: 'يقرأ الأب حالة الابن مباشرةً.' } },
      { text: { en: 'Through a global variable.', ar: 'عبر متغيّر عام.' } },
    ],
    explain: {
      en: 'Data down, events up. `onSelect={(id) => setChosen(id)}` is the whole pattern, and it is what "lifting state up" is built on.',
      ar: 'البيانات تنزل والأحداث تصعد. و `onSelect={(id) => setChosen(id)}` هي النمط كله، وعليها يقوم «رفع الحالة للأعلى».',
    },
  },
  {
    id: 'b-rf-28',
    phase: 'react-fundamentals',
    question: {
      en: 'Which is valid inside JSX curly braces?',
      ar: 'أيٌّ صالح داخل أقواس JSX المعقوفة؟',
    },
    options: [
      { text: { en: 'Any expression, including a ternary or a function call.', ar: 'أي تعبير، بما في ذلك عامل ثلاثي أو استدعاء دالة.' }, correct: true },
      { text: { en: 'An `if` statement.', ar: 'جملة `if`.' } },
      { text: { en: 'A `for` loop.', ar: 'حلقة `for`.' } },
      { text: { en: 'A variable declaration.', ar: 'تصريح متغيّر.' } },
    ],
    explain: {
      en: 'Expressions produce a value; statements do not. This single rule explains why lists use `.map()` and conditions use ternaries inside markup.',
      ar: 'التعابير تُنتج قيمة والجُمل لا. وهذه القاعدة وحدها تفسّر لماذا تستخدم القوائم `.map()` وتستخدم الشروط العوامل الثلاثية داخل الوسوم.',
    },
  },
  {
    id: 'b-rf-29',
    phase: 'react-fundamentals',
    question: {
      en: 'What is the return value of `items.map((item) => <li key={item.id}>{item.name}</li>)`?',
      ar: 'ما القيمة المُعادة من `items.map((item) => <li key={item.id}>{item.name}</li>)`؟',
    },
    options: [
      { text: { en: 'An array of elements, which JSX renders in order.', ar: 'مصفوفة عناصر تعرضها JSX بالترتيب.' }, correct: true },
      { text: { en: 'A single concatenated string.', ar: 'نصًا واحدًا مدموجًا.' } },
      { text: { en: 'A fragment.', ar: 'جزءًا.' } },
      { text: { en: 'Nothing, until it is awaited.', ar: 'لا شيء حتى يُنتظَر.' } },
    ],
    explain: {
      en: 'React accepts arrays of elements as children, which is exactly why `.map()` is the idiomatic way to render a list.',
      ar: 'تقبل رياكت مصفوفات العناصر كأبناء، ولهذا بالضبط تُعدّ `.map()` الطريقة المعتادة لعرض قائمة.',
    },
  },
  {
    id: 'b-rf-30',
    phase: 'react-fundamentals',
    question: {
      en: 'When is it right to split a component into smaller ones?',
      ar: 'متى يكون تقسيم المكوّن إلى مكوّنات أصغر صحيحًا؟',
    },
    options: [
      { text: { en: 'When a part has its own clear responsibility or is reused.', ar: 'حين يكون لجزءٍ مسؤولية واضحة خاصة به أو يُعاد استخدامه.' }, correct: true },
      { text: { en: 'Whenever it passes 20 lines, always.', ar: 'كلما تجاوز عشرين سطرًا، دائمًا.' } },
      { text: { en: 'Only when React warns about it.', ar: 'فقط حين تُحذّر رياكت من ذلك.' } },
      { text: { en: 'Never — fewer files is always better.', ar: 'أبدًا — فقلّة الملفات أفضل دائمًا.' } },
    ],
    explain: {
      en: 'Line count is a symptom, not the rule. Split along responsibilities; splitting for its own sake just spreads one idea across several files.',
      ar: 'عدد الأسطر عَرَض لا قاعدة. قسّم حسب المسؤوليات، فالتقسيم لذاته يوزّع فكرة واحدة على عدة ملفات فحسب.',
    },
  },
  {
    id: 'b-rf-31',
    phase: 'react-fundamentals',
    question: {
      en: 'What does React call the object passed as the first argument to a component?',
      ar: 'ماذا تُسمّي رياكت الكائن المُمرَّر كوسيط أول للمكوّن؟',
    },
    options: [
      { text: { en: 'Props.', ar: 'الخصائص (props).' }, correct: true },
      { text: { en: 'State.', ar: 'الحالة (state).' } },
      { text: { en: 'Context.', ar: 'السياق (context).' } },
      { text: { en: 'Refs.', ar: 'المراجع (refs).' } },
    ],
    explain: {
      en: 'A component always receives exactly one argument. Destructuring it in the signature — `function Card({ title })` — is just convenience.',
      ar: 'يستقبل المكوّن دائمًا وسيطًا واحدًا بالضبط. وتفكيكه في التوقيع — `function Card({ title })` — مجرّد تسهيل.',
    },
  },
  {
    id: 'b-rf-32',
    phase: 'react-fundamentals',
    question: {
      en: 'Which of these belongs in props rather than state?',
      ar: 'أيٌّ من هذه ينتمي للخصائص لا للحالة؟',
    },
    options: [
      { text: { en: 'A product\'s name coming from the parent list.', ar: 'اسم منتج قادم من القائمة الأب.' }, correct: true },
      { text: { en: 'Whether a dropdown is currently open.', ar: 'ما إذا كانت القائمة المنسدلة مفتوحة الآن.' } },
      { text: { en: 'The text typed into a search box.', ar: 'النص المكتوب في مربّع البحث.' } },
      { text: { en: 'Which tab the user just clicked.', ar: 'أي تبويب نقره المستخدم للتوّ.' } },
    ],
    explain: {
      en: 'Props are data owned elsewhere and handed to you. State is data this component owns and changes over time in response to interaction.',
      ar: 'الخصائص بيانات يملكها غيرك وتُسلَّم إليك. أما الحالة فبيانات يملكها هذا المكوّن ويُغيّرها بمرور الوقت استجابةً للتفاعل.',
    },
  },
  {
    id: 'b-rf-33',
    phase: 'react-fundamentals',
    question: {
      en: 'What does "UI is a function of state" mean in practice?',
      ar: 'ماذا تعني «الواجهة دالة للحالة» عمليًا؟',
    },
    options: [
      { text: { en: 'For the same data, the component always describes the same UI.', ar: 'لنفس البيانات يصف المكوّن الواجهة نفسها دائمًا.' }, correct: true },
      { text: { en: 'Every component must be a pure arrow function.', ar: 'يجب أن يكون كل مكوّن دالة سهمية نقية.' } },
      { text: { en: 'State must live in one global object.', ar: 'يجب أن تعيش الحالة في كائن عام واحد.' } },
      { text: { en: 'The UI updates on a timer.', ar: 'تتحدّث الواجهة عبر مؤقّت.' } },
    ],
    explain: {
      en: 'You never write "add a row" or "hide the button". You describe the screen for the current data, change the data, and let React work out the difference.',
      ar: 'أنت لا تكتب «أضف صفًا» أو «أخفِ الزر» أبدًا. بل تصف الشاشة للبيانات الحالية، ثم تُغيّر البيانات وتترك رياكت تستنتج الفرق.',
    },
  },
  {
    id: 'b-rf-34',
    phase: 'react-fundamentals',
    question: {
      en: 'Which attribute replaces HTML\'s `for` on a `<label>` in JSX?',
      ar: 'أي خاصية تحلّ محلّ `for` في HTML على `<label>` داخل JSX؟',
    },
    options: [
      { text: { en: '`htmlFor`', ar: '`htmlFor`' }, correct: true },
      { text: { en: '`labelFor`', ar: '`labelFor`' } },
      { text: { en: '`for` works unchanged.', ar: '`for` تعمل كما هي.' } },
      { text: { en: '`inputId`', ar: '`inputId`' } },
    ],
    explain: {
      en: '`for` is a reserved word, so JSX renames it. Getting this right is an accessibility issue, not a cosmetic one — it is what links a label to its input.',
      ar: '`for` كلمة محجوزة، لذا تُعيد JSX تسميتها. وضبط هذا مسألة إتاحة لا مسألة شكلية — فهو ما يربط التسمية بحقلها.',
    },
  },
  {
    id: 'b-rf-35',
    phase: 'react-fundamentals',
    question: {
      en: 'A list renders but React logs a key warning. What is the risk of ignoring it?',
      ar: 'تُعرض القائمة لكن رياكت تسجّل تحذير مفتاح. ما خطر تجاهله؟',
    },
    options: [
      { text: { en: 'Wrong DOM reuse when the list changes, causing subtle state bugs.', ar: 'إعادة استخدام خاطئة لـ DOM عند تغيّر القائمة، ما يسبّب أخطاء حالة خفيّة.' }, correct: true },
      { text: { en: 'None — it is purely cosmetic.', ar: 'لا خطر — فهو شكلي بحت.' } },
      { text: { en: 'The build will fail in production.', ar: 'سيفشل البناء في الإنتاج.' } },
      { text: { en: 'The list will render in random order.', ar: 'ستُعرض القائمة بترتيب عشوائي.' } },
    ],
    explain: {
      en: 'Everything looks fine until items are added, removed or reordered. Then inputs and checkboxes appear to jump rows, because React matched the wrong elements.',
      ar: 'يبدو كل شيء سليمًا حتى تُضاف عناصر أو تُحذف أو يُعاد ترتيبها. عندها تبدو الحقول وصناديق الاختيار وكأنها تقفز بين الصفوف، لأن رياكت طابقت العناصر الخطأ.',
    },
  },
  {
    id: 'b-rf-36',
    phase: 'react-fundamentals',
    question: {
      en: 'What is passed to your handler in `onChange={(e) => ...}`?',
      ar: 'ما الذي يُمرَّر إلى معالجك في `onChange={(e) => ...}`؟',
    },
    options: [
      { text: { en: 'A synthetic event; the typed text is at `e.target.value`.', ar: 'حدث اصطناعي، والنص المكتوب في `e.target.value`.' }, correct: true },
      { text: { en: 'The new value directly as a string.', ar: 'القيمة الجديدة مباشرةً كنص.' } },
      { text: { en: 'The DOM element itself.', ar: 'عنصر DOM نفسه.' } },
      { text: { en: 'The previous value.', ar: 'القيمة السابقة.' } },
    ],
    explain: {
      en: 'React wraps the native event for consistent behaviour across browsers. It behaves like the real thing — `preventDefault` and `stopPropagation` both work.',
      ar: 'تغلّف رياكت الحدث الأصلي لسلوك متّسق عبر المتصفحات. ويتصرّف كالحدث الحقيقي — فـ `preventDefault` و `stopPropagation` كلاهما يعمل.',
    },
  },

  // ---------------------------------------------------------------- phase 3
  {
    id: 'b-si-01',
    phase: 'state-and-interactivity',
    question: {
      en: 'Why does `console.log(count)` right after `setCount(count + 1)` print the old value?',
      ar: 'لماذا تطبع `console.log(count)` مباشرةً بعد `setCount(count + 1)` القيمة القديمة؟',
    },
    options: [
      { text: { en: '`count` is a const from this render; the new value arrives in the next one.', ar: 'لأن `count` ثابت من هذا العرض، والقيمة الجديدة تصل في العرض التالي.' }, correct: true },
      { text: { en: 'Because `setCount` is asynchronous and never finishes.', ar: 'لأن `setCount` غير متزامنة ولا تنتهي أبدًا.' } },
      { text: { en: 'Because `console.log` caches its arguments.', ar: 'لأن `console.log` تخزّن وسائطها مؤقتًا.' } },
      { text: { en: 'Because state updates require a page reload.', ar: 'لأن تحديثات الحالة تتطلّب إعادة تحميل الصفحة.' } },
    ],
    explain: {
      en: 'Each render has its own snapshot of state. Setting it schedules a new render; the variable in the current scope can never change.',
      ar: 'لكل عرض لقطته الخاصة من الحالة. وضبطها يجدول عرضًا جديدًا، أما المتغيّر في النطاق الحالي فلا يتغيّر أبدًا.',
    },
  },
  {
    id: 'b-si-02',
    phase: 'state-and-interactivity',
    question: {
      en: 'Which correctly increments a counter three times in one handler?',
      ar: 'أيٌّ يزيد العدّاد ثلاث مرات بشكل صحيح في معالج واحد؟',
    },
    options: [
      { text: { en: '`setN((p) => p + 1)` three times', ar: '`setN((p) => p + 1)` ثلاث مرات' }, correct: true },
      { text: { en: '`setN(n + 1)` three times', ar: '`setN(n + 1)` ثلاث مرات' } },
      { text: { en: '`setN(n + 3)` then `setN(n)`', ar: '`setN(n + 3)` ثم `setN(n)`' } },
      { text: { en: '`n = n + 3`', ar: '`n = n + 3`' } },
    ],
    explain: {
      en: 'All three `setN(n + 1)` calls read the same stale `n`, so the total only rises by one. The updater form receives the latest pending value each time.',
      ar: 'تقرأ استدعاءات `setN(n + 1)` الثلاثة القيمة القديمة نفسها، فلا يرتفع المجموع إلا بواحد. أما صيغة التحديث الدالّية فتستقبل أحدث قيمة معلّقة في كل مرة.',
    },
  },
  {
    id: 'b-si-03',
    phase: 'state-and-interactivity',
    question: {
      en: 'Why does `tasks.push(newTask); setTasks(tasks)` fail to update the screen?',
      ar: 'لماذا تفشل `tasks.push(newTask); setTasks(tasks)` في تحديث الشاشة؟',
    },
    options: [
      { text: { en: 'The array reference is unchanged, so React sees no new state.', ar: 'لأن مرجع المصفوفة لم يتغيّر، فلا ترى رياكت حالة جديدة.' }, correct: true },
      { text: { en: '`push` is not a function on state arrays.', ar: 'لأن `push` ليست دالة على مصفوفات الحالة.' } },
      { text: { en: 'The new task is added at the wrong index.', ar: 'لأن المهمة الجديدة تُضاف في الفهرس الخطأ.' } },
      { text: { en: 'It does update — the bug is elsewhere.', ar: 'بل تُحدّثها — والخلل في مكان آخر.' } },
    ],
    explain: {
      en: 'React compares by identity. The same array is the same array, however different its contents. Pass a new one: `setTasks([...tasks, newTask])`.',
      ar: 'تقارن رياكت بالهوية. فالمصفوفة نفسها تبقى نفسها مهما اختلف محتواها. مرّر واحدة جديدة: `setTasks([...tasks, newTask])`.',
    },
  },
  {
    id: 'b-si-04',
    phase: 'state-and-interactivity',
    question: {
      en: 'A list and a "3 items left" counter. Where should the count live?',
      ar: 'قائمة وعدّاد «تبقّى 3 عناصر». أين يجب أن يعيش العدد؟',
    },
    options: [
      { text: { en: 'Nowhere — compute it from the list during render.', ar: 'في لا مكان — احسبه من القائمة أثناء العرض.' }, correct: true },
      { text: { en: 'In its own `useState`, updated alongside the list.', ar: 'في `useState` خاصة به تُحدَّث مع القائمة.' } },
      { text: { en: 'In a ref, to avoid re-renders.', ar: 'في مرجع لتجنّب إعادة العرض.' } },
      { text: { en: 'In localStorage.', ar: 'في localStorage.' } },
    ],
    explain: {
      en: 'Anything derivable from existing state should be derived. A stored copy is a second source of truth that will drift out of sync the first time you forget to update it.',
      ar: 'كل ما يمكن اشتقاقه من حالة موجودة يجب اشتقاقه. فالنسخة المخزّنة مصدر ثانٍ للحقيقة سيفقد التزامن أول مرة تنسى تحديثه.',
    },
  },
  {
    id: 'b-si-05',
    phase: 'state-and-interactivity',
    question: {
      en: 'What makes an input "controlled"?',
      ar: 'ما الذي يجعل حقل الإدخال «مُتحكَّمًا به»؟',
    },
    options: [
      { text: { en: 'Its `value` comes from state and `onChange` writes back to it.', ar: 'أن تأتي قيمته `value` من الحالة وتُعيدها `onChange` إليها.' }, correct: true },
      { text: { en: 'It has the `controlled` attribute.', ar: 'أن يحمل الخاصية `controlled`.' } },
      { text: { en: 'It is wrapped in a `<form>`.', ar: 'أن يكون داخل `<form>`.' } },
      { text: { en: 'It uses a ref instead of state.', ar: 'أن يستخدم مرجعًا بدل الحالة.' } },
    ],
    explain: {
      en: 'React becomes the single source of truth for the field. Supply `value` without `onChange` and the input goes read-only — React warns about exactly this.',
      ar: 'تصبح رياكت المصدر الوحيد للحقيقة لهذا الحقل. وتمرير `value` دون `onChange` يجعل الحقل للقراءة فقط — وتحذّر رياكت من هذا تحديدًا.',
    },
  },
  {
    id: 'b-si-06',
    phase: 'state-and-interactivity',
    question: {
      en: 'Two sibling components need the same value. What is the standard fix?',
      ar: 'يحتاج مكوّنان شقيقان القيمة نفسها. ما الحل القياسي؟',
    },
    options: [
      { text: { en: 'Move the state to their closest common parent.', ar: 'انقل الحالة إلى أقرب أب مشترك بينهما.' }, correct: true },
      { text: { en: 'Duplicate the state in both.', ar: 'كرّر الحالة في كليهما.' } },
      { text: { en: 'Put it in a module-level variable.', ar: 'ضعها في متغيّر على مستوى الوحدة.' } },
      { text: { en: 'Have one sibling import the other.', ar: 'اجعل أحد الشقيقين يستورد الآخر.' } },
    ],
    explain: {
      en: 'Lifting state up. The parent owns the value and passes it down with a setter, so both children read from one place.',
      ar: 'هذا هو رفع الحالة للأعلى. يملك الأب القيمة ويمرّرها للأسفل مع دالة ضبط، فيقرأ الابنان من مكان واحد.',
    },
  },
  {
    id: 'b-si-07',
    phase: 'state-and-interactivity',
    question: {
      en: 'What does `useState` return?',
      ar: 'ماذا تُعيد `useState`؟',
    },
    options: [
      { text: { en: 'An array of the current value and a setter function.', ar: 'مصفوفة من القيمة الحالية ودالة ضبط.' }, correct: true },
      { text: { en: 'An object with `value` and `set` keys.', ar: 'كائنًا بمفتاحَي `value` و `set`.' } },
      { text: { en: 'Just the current value.', ar: 'القيمة الحالية فقط.' } },
      { text: { en: 'A promise resolving to the value.', ar: 'وعدًا يُحسم بالقيمة.' } },
    ],
    explain: {
      en: 'An array, which is why array destructuring names the pair: `const [open, setOpen] = useState(false)`. The names are yours to choose.',
      ar: 'مصفوفة، ولهذا يُسمّي تفكيك المصفوفات الزوج: `const [open, setOpen] = useState(false)`. والأسماء اختيارك.',
    },
  },
  {
    id: 'b-si-08',
    phase: 'state-and-interactivity',
    question: {
      en: 'How do you update one field of an object held in state?',
      ar: 'كيف تُحدّث حقلًا واحدًا من كائن محفوظ في الحالة؟',
    },
    options: [
      { text: { en: '`setForm({ ...form, email: value })`', ar: '`setForm({ ...form, email: value })`' }, correct: true },
      { text: { en: '`form.email = value; setForm(form)`', ar: '`form.email = value; setForm(form)`' } },
      { text: { en: '`setForm.email(value)`', ar: '`setForm.email(value)`' } },
      { text: { en: '`setForm({ email: value })`', ar: '`setForm({ email: value })`' } },
    ],
    explain: {
      en: 'Spread the old object, then override the one key. The last option looks close but silently drops every other field — state is replaced, not merged.',
      ar: 'انشر الكائن القديم ثم استبدل المفتاح المطلوب. والخيار الأخير يبدو قريبًا لكنه يحذف بقية الحقول بصمت — فالحالة تُستبدَل لا تُدمَج.',
    },
  },
  {
    id: 'b-si-09',
    phase: 'state-and-interactivity',
    question: {
      en: 'What does the argument to `useState(0)` actually do?',
      ar: 'ما الذي يفعله الوسيط في `useState(0)` فعليًا؟',
    },
    options: [
      { text: { en: 'Sets the value on the first render only; it is ignored afterwards.', ar: 'يضبط القيمة في العرض الأول فقط، ويُتجاهَل بعد ذلك.' }, correct: true },
      { text: { en: 'Resets the value on every render.', ar: 'يعيد ضبط القيمة في كل عرض.' } },
      { text: { en: 'Sets a minimum allowed value.', ar: 'يضبط أدنى قيمة مسموحة.' } },
      { text: { en: 'Declares the value\'s type.', ar: 'يُصرّح بنوع القيمة.' } },
    ],
    explain: {
      en: 'It is the initial state, not a default that reapplies. If a prop changes and you expect state to follow, it will not — that needs a `key` or a deliberate reset.',
      ar: 'إنها الحالة الابتدائية لا قيمة افتراضية تُعاد. فإذا تغيّرت خاصية وتوقّعت أن تتبعها الحالة فلن تفعل — وهذا يحتاج `key` أو إعادة ضبط متعمّدة.',
    },
  },
  {
    id: 'b-si-10',
    phase: 'state-and-interactivity',
    question: {
      en: 'Why prefer `setItems(items.filter(...))` over `items.splice(...)`?',
      ar: 'لماذا تُفضَّل `setItems(items.filter(...))` على `items.splice(...)`؟',
    },
    options: [
      { text: { en: '`filter` returns a new array; `splice` mutates the existing one.', ar: 'لأن `filter` تُعيد مصفوفة جديدة و `splice` تُعدّل الموجودة.' }, correct: true },
      { text: { en: '`splice` is deprecated.', ar: 'لأن `splice` مهملة.' } },
      { text: { en: '`filter` is faster in every case.', ar: 'لأن `filter` أسرع في كل الحالات.' } },
      { text: { en: 'They are equivalent in React.', ar: 'لأنهما متكافئتان في رياكت.' } },
    ],
    explain: {
      en: 'React needs a new reference to know something changed. Mutating methods keep the same array, so the re-render never happens.',
      ar: 'تحتاج رياكت مرجعًا جديدًا لتعرف أن شيئًا تغيّر. والدوال المُعدِّلة تُبقي المصفوفة نفسها، فلا تحدث إعادة العرض أبدًا.',
    },
  },
  {
    id: 'b-si-11',
    phase: 'state-and-interactivity',
    question: {
      en: 'A form has six fields. What is a reasonable state design?',
      ar: 'نموذج فيه ستة حقول. ما تصميم الحالة المعقول؟',
    },
    options: [
      { text: { en: 'One object holding all six, updated by key.', ar: 'كائن واحد يحمل الستة، يُحدَّث حسب المفتاح.' }, correct: true },
      { text: { en: 'Six separate `useState` calls, always.', ar: 'ست استدعاءات `useState` منفصلة، دائمًا.' } },
      { text: { en: 'One string with the values joined by commas.', ar: 'نص واحد بالقيم مفصولة بفواصل.' } },
      { text: { en: 'A ref per field.', ar: 'مرجع لكل حقل.' } },
    ],
    explain: {
      en: 'Either works, but one object plus a generic `onChange` keyed by `e.target.name` scales better and keeps related data together. Six independent hooks is fine for two or three fields.',
      ar: 'كلاهما يعمل، لكن كائنًا واحدًا مع `onChange` عامة تعتمد على `e.target.name` يتوسّع أفضل ويُبقي البيانات المترابطة معًا. وست خطّافات مستقلّة مقبولة لحقلين أو ثلاثة.',
    },
  },
  {
    id: 'b-si-12',
    phase: 'state-and-interactivity',
    question: {
      en: 'What is wrong with storing `fullName` in state alongside `first` and `last`?',
      ar: 'ما الخطأ في تخزين `fullName` في الحالة إلى جانب `first` و `last`؟',
    },
    options: [
      { text: { en: 'It duplicates state and will drift out of sync.', ar: 'أنه يكرّر الحالة وسيفقد التزامن.' }, correct: true },
      { text: { en: 'Strings cannot be stored in state.', ar: 'أن النصوص لا يمكن تخزينها في الحالة.' } },
      { text: { en: 'It causes an infinite render loop.', ar: 'أنه يسبّب حلقة عرض لا نهائية.' } },
      { text: { en: 'Nothing — it is good practice.', ar: 'لا شيء — إنها ممارسة جيدة.' } },
    ],
    explain: {
      en: 'Compute it: `const fullName = first + " " + last`. Every stored duplicate is a bug waiting for the one code path that forgets to update it.',
      ar: 'احسبها: `const fullName = first + " " + last`. فكل نسخة مخزّنة خطأ ينتظر مسار الكود الوحيد الذي ينسى تحديثها.',
    },
  },
  {
    id: 'b-si-13',
    phase: 'state-and-interactivity',
    question: {
      en: 'When does React re-render a component?',
      ar: 'متى تُعيد رياكت عرض المكوّن؟',
    },
    options: [
      { text: { en: 'When its state changes, or when its parent re-renders.', ar: 'حين تتغيّر حالته أو حين يُعاد عرض أبيه.' }, correct: true },
      { text: { en: 'Only when a prop changes value.', ar: 'فقط حين تتغيّر قيمة خاصية.' } },
      { text: { en: 'On every mouse movement.', ar: 'مع كل حركة للفأرة.' } },
      { text: { en: 'Only when you call `forceUpdate`.', ar: 'فقط حين تستدعي `forceUpdate`.' } },
    ],
    explain: {
      en: 'A parent re-render re-renders children by default, whether or not their props changed. That is normal and usually cheap — measure before reaching for memoisation.',
      ar: 'إعادة عرض الأب تُعيد عرض الأبناء افتراضيًا سواء تغيّرت خصائصهم أم لا. وهذا طبيعي ورخيص غالبًا — قِس قبل اللجوء إلى التخزين.',
    },
  },
  {
    id: 'b-si-14',
    phase: 'state-and-interactivity',
    question: {
      en: 'Setting state to the same value it already holds. What happens?',
      ar: 'ضبط الحالة على القيمة نفسها التي تحملها. ماذا يحدث؟',
    },
    options: [
      { text: { en: 'React bails out and skips the re-render.', ar: 'تنسحب رياكت وتتخطّى إعادة العرض.' }, correct: true },
      { text: { en: 'It always re-renders anyway.', ar: 'تُعيد العرض على أي حال دائمًا.' } },
      { text: { en: 'It throws a warning and stops.', ar: 'تُطلق تحذيرًا وتتوقّف.' } },
      { text: { en: 'It clears the state.', ar: 'تمسح الحالة.' } },
    ],
    explain: {
      en: 'React compares with `Object.is`. This is why setting a new object with identical contents *does* re-render — different reference, different value.',
      ar: 'تقارن رياكت باستخدام `Object.is`. ولهذا فضبط كائن جديد بمحتوى مطابق *يُعيد* العرض فعلًا — فالمرجع مختلف إذًا القيمة مختلفة.',
    },
  },
  {
    id: 'b-si-15',
    phase: 'state-and-interactivity',
    question: {
      en: 'Which belongs in state?',
      ar: 'أيٌّ ينتمي إلى الحالة؟',
    },
    options: [
      { text: { en: 'Whether a modal is currently open.', ar: 'ما إذا كانت النافذة المنبثقة مفتوحة الآن.' }, correct: true },
      { text: { en: 'The number of items in a list you already have.', ar: 'عدد العناصر في قائمة تملكها أصلًا.' } },
      { text: { en: 'A formatted version of a date you already store.', ar: 'صيغة منسّقة لتاريخ تخزّنه أصلًا.' } },
      { text: { en: 'The result of filtering a list you already store.', ar: 'نتيجة تصفية قائمة تخزّنها أصلًا.' } },
    ],
    explain: {
      en: 'State is for what cannot be worked out from something else. The other three are all derivable, so computing them during render keeps one source of truth.',
      ar: 'الحالة لما لا يمكن استنتاجه من غيره. والثلاثة الأخرى كلها قابلة للاشتقاق، فحسابها أثناء العرض يُبقي مصدرًا واحدًا للحقيقة.',
    },
  },
  {
    id: 'b-si-16',
    phase: 'state-and-interactivity',
    question: {
      en: 'What is the effect of changing a component\'s `key`?',
      ar: 'ما أثر تغيير `key` الخاص بمكوّن؟',
    },
    options: [
      { text: { en: 'React treats it as a different component and resets its state.', ar: 'تعامله رياكت كمكوّن مختلف وتعيد ضبط حالته.' }, correct: true },
      { text: { en: 'It only affects list ordering.', ar: 'يؤثّر في ترتيب القائمة فقط.' } },
      { text: { en: 'It forces a parent re-render.', ar: 'يُجبر الأب على إعادة العرض.' } },
      { text: { en: 'Nothing outside of lists.', ar: 'لا شيء خارج القوائم.' } },
    ],
    explain: {
      en: 'Useful on purpose: `<Form key={userId} />` clears the form whenever the user changes, with no effect and no manual resetting.',
      ar: 'مفيد عن قصد: فـ `<Form key={userId} />` يمسح النموذج كلما تغيّر المستخدم، دون أي تأثير ودون إعادة ضبط يدوية.',
    },
  },
  {
    id: 'b-si-17',
    phase: 'state-and-interactivity',
    question: {
      en: 'Why does typing feel broken when an input has `value={name}` but no `onChange`?',
      ar: 'لماذا تبدو الكتابة معطّلة حين يكون للحقل `value={name}` بلا `onChange`؟',
    },
    options: [
      { text: { en: 'React keeps forcing the field back to the state value.', ar: 'لأن رياكت تُعيد الحقل باستمرار إلى قيمة الحالة.' }, correct: true },
      { text: { en: 'The keyboard events are blocked by the browser.', ar: 'لأن المتصفح يحجب أحداث لوحة المفاتيح.' } },
      { text: { en: '`value` must be a number.', ar: 'لأن `value` يجب أن تكون رقمًا.' } },
      { text: { en: 'The input needs a `name` attribute.', ar: 'لأن الحقل يحتاج خاصية `name`.' } },
    ],
    explain: {
      en: 'State is the source of truth and nothing updates it, so every keystroke is immediately overwritten. Add the handler, or use `defaultValue` for an uncontrolled field.',
      ar: 'الحالة هي مصدر الحقيقة ولا شيء يُحدّثها، فيُستبدَل كل ضغط مفتاح فورًا. أضف المعالج أو استخدم `defaultValue` لحقل غير مُتحكَّم به.',
    },
  },
  {
    id: 'b-si-18',
    phase: 'state-and-interactivity',
    question: {
      en: 'Which handler correctly toggles a boolean?',
      ar: 'أي معالج يبدّل قيمة منطقية بشكل صحيح؟',
    },
    options: [
      { text: { en: '`setOpen((o) => !o)`', ar: '`setOpen((o) => !o)`' }, correct: true },
      { text: { en: '`setOpen(!setOpen)`', ar: '`setOpen(!setOpen)`' } },
      { text: { en: '`open = !open`', ar: '`open = !open`' } },
      { text: { en: '`setOpen(open => open)`', ar: '`setOpen(open => open)`' } },
    ],
    explain: {
      en: '`setOpen(!open)` also works for a single toggle, but the updater form stays correct if two toggles land in the same batch.',
      ar: 'تعمل `setOpen(!open)` أيضًا لتبديل واحد، لكن صيغة التحديث الدالّية تبقى صحيحة إذا وقع تبديلان في الدفعة نفسها.',
    },
  },
  {
    id: 'b-si-19',
    phase: 'state-and-interactivity',
    question: {
      en: 'What does it mean that React batches state updates?',
      ar: 'ماذا يعني أن رياكت تُجمّع تحديثات الحالة؟',
    },
    options: [
      { text: { en: 'Several updates in one event produce a single re-render.', ar: 'أن عدة تحديثات في حدث واحد تُنتج إعادة عرض واحدة.' }, correct: true },
      { text: { en: 'Updates are delayed by one second.', ar: 'أن التحديثات تتأخّر ثانية واحدة.' } },
      { text: { en: 'Only the last update is applied.', ar: 'أن آخر تحديث فقط يُطبَّق.' } },
      { text: { en: 'Updates run in a background thread.', ar: 'أن التحديثات تعمل في خيط خلفي.' } },
    ],
    explain: {
      en: 'All the updates still apply — they are just flushed together. Batching is what makes the stale-`n` trap visible, and the updater form is the way around it.',
      ar: 'تُطبَّق كل التحديثات فعلًا، لكنها تُنفَّذ معًا. والتجميع هو ما يُظهر فخّ `n` القديمة، وصيغة التحديث الدالّية هي الحل.',
    },
  },
  {
    id: 'b-si-20',
    phase: 'state-and-interactivity',
    question: {
      en: 'A child needs to change a value the parent owns. What does the parent pass?',
      ar: 'يحتاج الابن تغيير قيمة يملكها الأب. ماذا يمرّر الأب؟',
    },
    options: [
      { text: { en: 'Both the value and a function to change it.', ar: 'القيمة ودالة لتغييرها معًا.' }, correct: true },
      { text: { en: 'Only the value; the child mutates it.', ar: 'القيمة فقط، ويُعدّلها الابن.' } },
      { text: { en: 'The parent\'s entire state object.', ar: 'كائن حالة الأب بالكامل.' } },
      { text: { en: 'A ref to the parent component.', ar: 'مرجعًا للمكوّن الأب.' } },
    ],
    explain: {
      en: 'The pair is the pattern: `<Search query={query} onQueryChange={setQuery} />`. The child stays free of state and can be reused anywhere.',
      ar: 'الزوج هو النمط: `<Search query={query} onQueryChange={setQuery} />`. فيبقى الابن خاليًا من الحالة وقابلًا لإعادة الاستخدام في أي مكان.',
    },
  },
  {
    id: 'b-si-21',
    phase: 'state-and-interactivity',
    question: {
      en: 'Is it safe to call `useState` inside an `if` block?',
      ar: 'هل من الآمن استدعاء `useState` داخل كتلة `if`؟',
    },
    options: [
      { text: { en: 'No — hooks must run in the same order on every render.', ar: 'لا — يجب أن تعمل الخطّافات بالترتيب نفسه في كل عرض.' }, correct: true },
      { text: { en: 'Yes, as long as the condition rarely changes.', ar: 'نعم، ما دام الشرط نادر التغيّر.' } },
      { text: { en: 'Yes, `useState` is exempt from the rules.', ar: 'نعم، فـ `useState` مستثناة من القواعد.' } },
      { text: { en: 'Only in development builds.', ar: 'في بنى التطوير فقط.' } },
    ],
    explain: {
      en: 'React matches hooks to their state by call order, not by name. Skip one and every hook after it silently reads the wrong slot.',
      ar: 'تطابق رياكت الخطّافات بحالتها حسب ترتيب الاستدعاء لا الاسم. فتخطّي واحد يجعل كل خطّاف بعده يقرأ الخانة الخطأ بصمت.',
    },
  },
  {
    id: 'b-si-22',
    phase: 'state-and-interactivity',
    question: {
      en: 'Which is the correct generic `onChange` for a form object?',
      ar: 'أي `onChange` عامة صحيحة لكائن نموذج؟',
    },
    options: [
      { text: { en: '`setForm({ ...form, [e.target.name]: e.target.value })`', ar: '`setForm({ ...form, [e.target.name]: e.target.value })`' }, correct: true },
      { text: { en: '`setForm({ ...form, e.target.name: e.target.value })`', ar: '`setForm({ ...form, e.target.name: e.target.value })`' } },
      { text: { en: '`setForm({ name: e.target.value })`', ar: '`setForm({ name: e.target.value })`' } },
      { text: { en: '`form[e.target.name] = e.target.value`', ar: '`form[e.target.name] = e.target.value`' } },
    ],
    explain: {
      en: 'Square brackets make the key dynamic — a computed property name. Without them the key would literally be the string `"e.target.name"`.',
      ar: 'تجعل الأقواس المربّعة المفتاح ديناميكيًا — أي اسم خاصية محسوب. وبدونها سيكون المفتاح حرفيًا النص `"e.target.name"`.',
    },
  },
  {
    id: 'b-si-23',
    phase: 'state-and-interactivity',
    question: {
      en: 'What is the risk of putting all app state in one top-level component?',
      ar: 'ما خطر وضع كل حالة التطبيق في مكوّن واحد بالأعلى؟',
    },
    options: [
      { text: { en: 'Every change re-renders the whole tree and props get drilled deep.', ar: 'أن كل تغيير يُعيد عرض الشجرة كلها وتُمرَّر الخصائص عميقًا.' }, correct: true },
      { text: { en: 'React limits how much state one component may hold.', ar: 'أن رياكت تحدّ من كمية الحالة في المكوّن الواحد.' } },
      { text: { en: 'State cannot be shared from the top.', ar: 'أن الحالة لا يمكن مشاركتها من الأعلى.' } },
      { text: { en: 'There is no risk.', ar: 'لا يوجد خطر.' } },
    ],
    explain: {
      en: 'Keep state as close to where it is used as possible. Colocation limits both the render blast radius and the number of components that have to know about it.',
      ar: 'أبقِ الحالة أقرب ما يمكن لمكان استخدامها. فالتوطين يحدّ من نطاق إعادة العرض ومن عدد المكوّنات التي يجب أن تعرف عنها.',
    },
  },
  {
    id: 'b-si-24',
    phase: 'state-and-interactivity',
    question: {
      en: 'How do you reset a controlled form after a successful submit?',
      ar: 'كيف تُعيد ضبط نموذج مُتحكَّم به بعد إرسال ناجح؟',
    },
    options: [
      { text: { en: 'Set the state back to the initial values.', ar: 'أعِد ضبط الحالة إلى القيم الابتدائية.' }, correct: true },
      { text: { en: 'Call `form.reset()` on the DOM node.', ar: 'استدعِ `form.reset()` على عقدة DOM.' } },
      { text: { en: 'Reload the page.', ar: 'أعِد تحميل الصفحة.' } },
      { text: { en: 'Set every input\'s `value` attribute to `""` manually.', ar: 'اضبط خاصية `value` لكل حقل على `""` يدويًا.' } },
    ],
    explain: {
      en: 'The inputs mirror state, so clearing state clears the fields. `form.reset()` only touches the DOM, which React will overwrite on the next render.',
      ar: 'الحقول تعكس الحالة، فمسح الحالة يمسحها. أما `form.reset()` فتلمس DOM فقط وستستبدله رياكت في العرض التالي.',
    },
  },
  {
    id: 'b-si-25',
    phase: 'state-and-interactivity',
    question: {
      en: 'What does `useState` do with a function passed as the initial value, `useState(() => expensive())`?',
      ar: 'ماذا تفعل `useState` بدالة مُمرَّرة كقيمة ابتدائية، `useState(() => expensive())`؟',
    },
    options: [
      { text: { en: 'Calls it once on mount — a lazy initialiser.', ar: 'تستدعيها مرة واحدة عند التركيب — تهيئة كسولة.' }, correct: true },
      { text: { en: 'Stores the function itself as the state.', ar: 'تخزّن الدالة نفسها كحالة.' } },
      { text: { en: 'Calls it on every render.', ar: 'تستدعيها في كل عرض.' } },
      { text: { en: 'Throws — the initial value must not be a function.', ar: 'تُطلق خطأً — فالقيمة الابتدائية يجب ألّا تكون دالة.' } },
    ],
    explain: {
      en: 'Passing `expensive()` runs the work on every render and throws the result away. Passing the function defers it to the first render only.',
      ar: 'تمرير `expensive()` يُنفّذ العمل في كل عرض ويرمي النتيجة. أما تمرير الدالة فيؤجّله للعرض الأول فقط.',
    },
  },
  {
    id: 'b-si-26',
    phase: 'state-and-interactivity',
    question: {
      en: 'Which array update adds an item to the front without mutating?',
      ar: 'أي تحديث للمصفوفة يضيف عنصرًا في المقدّمة دون تعديل؟',
    },
    options: [
      { text: { en: '`setItems([item, ...items])`', ar: '`setItems([item, ...items])`' }, correct: true },
      { text: { en: '`items.unshift(item)`', ar: '`items.unshift(item)`' } },
      { text: { en: '`setItems(items.unshift(item))`', ar: '`setItems(items.unshift(item))`' } },
      { text: { en: '`items = [item, ...items]`', ar: '`items = [item, ...items]`' } },
    ],
    explain: {
      en: '`unshift` mutates and returns the new *length*, so option three would set state to a number. Spread order decides the position.',
      ar: 'تُعدّل `unshift` المصفوفة وتُعيد *الطول* الجديد، فالخيار الثالث سيضبط الحالة على رقم. وترتيب النشر هو ما يحدّد الموضع.',
    },
  },
  {
    id: 'b-si-27',
    phase: 'state-and-interactivity',
    question: {
      en: 'What is the "single source of truth" principle?',
      ar: 'ما مبدأ «المصدر الوحيد للحقيقة»؟',
    },
    options: [
      { text: { en: 'Each piece of data lives in exactly one place; everything else derives from it.', ar: 'أن تعيش كل بيانات في مكان واحد بالضبط ويُشتق كل شيء آخر منها.' }, correct: true },
      { text: { en: 'All state lives in one global store.', ar: 'أن تعيش كل الحالة في مخزن عام واحد.' } },
      { text: { en: 'Only one component may call `useState`.', ar: 'أن مكوّنًا واحدًا فقط يستدعي `useState`.' } },
      { text: { en: 'Data must come from a server.', ar: 'أن البيانات يجب أن تأتي من خادم.' } },
    ],
    explain: {
      en: 'It is about avoiding duplicates, not about centralising everything. Two copies of the same fact will eventually disagree.',
      ar: 'الأمر يتعلّق بتجنّب التكرار لا بمركزة كل شيء. فنسختان من الحقيقة نفسها ستختلفان في النهاية.',
    },
  },
  {
    id: 'b-si-28',
    phase: 'state-and-interactivity',
    question: {
      en: 'A checkbox list keeps ticking the wrong row after deleting an item. Likely cause?',
      ar: 'قائمة صناديق اختيار تؤشّر الصف الخطأ بعد حذف عنصر. السبب المرجّح؟',
    },
    options: [
      { text: { en: 'The list uses the array index as its key.', ar: 'أن القائمة تستخدم فهرس المصفوفة كمفتاح.' }, correct: true },
      { text: { en: 'The checkboxes are uncontrolled.', ar: 'أن صناديق الاختيار غير مُتحكَّم بها.' } },
      { text: { en: 'State updates are batched.', ar: 'أن تحديثات الحالة مُجمَّعة.' } },
      { text: { en: 'The delete handler is async.', ar: 'أن معالج الحذف غير متزامن.' } },
    ],
    explain: {
      en: 'Deleting shifts every later index down by one, so React reuses the DOM node — and its checked state — for a different item. A stable id fixes it.',
      ar: 'يُزيح الحذف كل فهرس لاحق بمقدار واحد، فتعيد رياكت استخدام عقدة DOM — وحالة اختيارها — لعنصر مختلف. والمعرّف الثابت يحلّ المشكلة.',
    },
  },
  {
    id: 'b-si-29',
    phase: 'state-and-interactivity',
    question: {
      en: 'Where should `useState` be called inside a component?',
      ar: 'أين يجب استدعاء `useState` داخل المكوّن؟',
    },
    options: [
      { text: { en: 'At the top level, before any conditional return.', ar: 'في المستوى الأعلى قبل أي إعادة شرطية.' }, correct: true },
      { text: { en: 'Anywhere, as long as it is inside the function.', ar: 'في أي مكان ما دام داخل الدالة.' } },
      { text: { en: 'Inside the JSX return.', ar: 'داخل إعادة JSX.' } },
      { text: { en: 'Inside an event handler.', ar: 'داخل معالج حدث.' } },
    ],
    explain: {
      en: 'An early `return` before a hook changes the call order between renders — the same failure as putting one inside an `if`.',
      ar: 'إعادة مبكرة قبل خطّاف تُغيّر ترتيب الاستدعاء بين عمليات العرض — وهو الفشل نفسه الناتج عن وضعه داخل `if`.',
    },
  },
  {
    id: 'b-si-30',
    phase: 'state-and-interactivity',
    question: {
      en: 'What is stored when you write `const [user, setUser] = useState(null)`?',
      ar: 'ماذا يُخزَّن حين تكتب `const [user, setUser] = useState(null)`؟',
    },
    options: [
      { text: { en: '`null` initially — a deliberate "nothing yet" value.', ar: '`null` ابتداءً — قيمة «لا شيء بعد» متعمّدة.' }, correct: true },
      { text: { en: 'An empty object.', ar: 'كائن فارغ.' } },
      { text: { en: '`undefined`', ar: '`undefined`' } },
      { text: { en: 'Nothing — state starts unset.', ar: 'لا شيء — تبدأ الحالة غير مضبوطة.' } },
    ],
    explain: {
      en: 'Using `null` for "not loaded yet" lets you branch on it: `if (!user) return <Spinner />`. Remember to guard before reading properties off it.',
      ar: 'استخدام `null` لـ «لم يُحمَّل بعد» يتيح لك التفريع عليه: `if (!user) return <Spinner />`. وتذكّر الحماية قبل قراءة خصائصه.',
    },
  },
  {
    id: 'b-si-31',
    phase: 'state-and-interactivity',
    question: {
      en: 'Why can a component not simply write `count = count + 1` to update?',
      ar: 'لماذا لا يستطيع المكوّن ببساطة كتابة `count = count + 1` للتحديث؟',
    },
    options: [
      { text: { en: 'React would never learn about the change, so nothing re-renders.', ar: 'لأن رياكت لن تعلم بالتغيير إطلاقًا فلا يُعاد عرض شيء.' }, correct: true },
      { text: { en: 'Because `count` is always a string.', ar: 'لأن `count` نص دائمًا.' } },
      { text: { en: 'Because assignment is banned inside components.', ar: 'لأن الإسناد ممنوع داخل المكوّنات.' } },
      { text: { en: 'It works fine.', ar: 'إنها تعمل بشكل سليم.' } },
    ],
    explain: {
      en: 'The setter is not just a way to assign — it is the notification. It records the new value and schedules the re-render.',
      ar: 'دالة الضبط ليست وسيلة إسناد فحسب، بل هي الإشعار. فهي تسجّل القيمة الجديدة وتجدول إعادة العرض.',
    },
  },
  {
    id: 'b-si-32',
    phase: 'state-and-interactivity',
    question: {
      en: 'Which is the cleanest way to render a filtered list from state?',
      ar: 'ما أنظف طريقة لعرض قائمة مُصفّاة من الحالة؟',
    },
    options: [
      { text: { en: 'Store the full list and the filter; compute the visible list during render.', ar: 'خزّن القائمة الكاملة والمُرشِّح، واحسب القائمة الظاهرة أثناء العرض.' }, correct: true },
      { text: { en: 'Store both the full list and the filtered list in state.', ar: 'خزّن القائمة الكاملة والمُصفّاة معًا في الحالة.' } },
      { text: { en: 'Overwrite the list in state whenever the filter changes.', ar: 'استبدل القائمة في الحالة كلما تغيّر المُرشِّح.' } },
      { text: { en: 'Keep the filtered list in a ref.', ar: 'احفظ القائمة المُصفّاة في مرجع.' } },
    ],
    explain: {
      en: 'Option three destroys the original data — clearing the filter cannot bring it back. Deriving during render keeps the full list intact and the filter reversible.',
      ar: 'الخيار الثالث يُتلف البيانات الأصلية — فمسح المُرشِّح لا يستطيع استعادتها. أما الاشتقاق أثناء العرض فيُبقي القائمة كاملة والمُرشِّح قابلًا للعكس.',
    },
  },
]

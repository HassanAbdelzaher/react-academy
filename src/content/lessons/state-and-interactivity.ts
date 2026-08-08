import type { LessonBody } from '../blocks'

export const stateAndInteractivity: LessonBody[] = [
  {
    id: 'state-and-interactivity/usestate',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A component is a function, and functions forget everything when they finish. `useState` is how React gives a component a memory that survives between renders.',
          ar: 'المكوّن دالة، والدوال تنسى كل شيء عند انتهائها. و `useState` هي الطريقة التي تمنح بها رياكت المكوّن ذاكرةً تبقى بين عمليات العرض.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        highlight: [2],
        code: `function Counter() {
  const [count, setCount] = useState(0);
  //     ↑ current value   ↑ the only way to change it   ↑ initial value

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
      },
      {
        type: 'list',
        items: {
          en: [
            '`count` is the value **for this render**. It never changes during a render.',
            '`setCount` asks React for a new render with a different value.',
            'The `0` is only used the very first time the component renders.',
          ],
          ar: [
            '`count` هي القيمة **لهذه العملية من العرض**. ولا تتغيّر أثناءها أبدًا.',
            '`setCount` تطلب من رياكت عرضًا جديدًا بقيمة مختلفة.',
            'القيمة `0` تُستخدم فقط في أول مرة يُعرض فيها المكوّن.',
          ],
        },
      },

      {
        type: 'heading',
        text: { en: 'Try it', ar: 'جرّبها' },
      },
      {
        type: 'playground',
        caption: {
          en: 'Change the initial value, or make one button multiply. The preview re-renders as you type.',
          ar: 'غيّر القيمة الابتدائية، أو اجعل أحد الأزرار يضرب. تُعاد المعاينة أثناء الكتابة.',
        },
        code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}>
      <p style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>{count}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count * 2)}>double</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    </div>
  );
}

render(<Counter />);`,
      },

      {
        type: 'heading',
        text: { en: 'State does not change instantly', ar: 'الحالة لا تتغيّر فورًا' },
      },
      {
        type: 'text',
        text: {
          en: 'This is the first thing that surprises everyone. Setting state does not modify the variable you are holding — it schedules a new render, and the new value arrives in the _next_ one.',
          ar: 'هذا أول ما يفاجئ الجميع. تحديث الحالة لا يعدّل المتغيّر الذي بين يديك — بل يجدول عرضًا جديدًا، وتصل القيمة الجديدة في العرض _التالي_.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `function handleClick() {
  console.log(count);   // 0
  setCount(count + 1);
  console.log(count);   // still 0 — not a bug
}`,
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Think of `count` as a photograph of this render, not a live variable. React will call your function again with a fresh photograph.',
          ar: 'اعتبر `count` صورةً فوتوغرافية لهذا العرض، لا متغيّرًا حيًّا. وستستدعي رياكت دالتك مجددًا بصورة جديدة.',
        },
      },
      {
        type: 'visual',
        name: 'state-flow',
      },

      {
        type: 'heading',
        text: { en: 'Two calls, one render', ar: 'استدعاءان وعرض واحد' },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          label: { en: 'Adds 1, not 3', ar: 'يضيف 1 لا 3' },
          code: `setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// all three read the same
// count from this render`,
        },
        good: {
          label: { en: 'Adds 3', ar: 'يضيف 3' },
          code: `setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);
// each one receives the
// result of the previous`,
        },
        note: {
          en: 'When the next value depends on the current one, always pass a function. This is covered on its own in the updater-functions lesson.',
          ar: 'حين تعتمد القيمة الجديدة على الحالية، مرّر دالة دائمًا. وهذا مشروح بالتفصيل في درس دوال التحديث.',
        },
      },

      {
        type: 'heading',
        text: { en: 'Where to put state', ar: 'أين تضع الحالة' },
      },
      {
        type: 'table',
        head: {
          en: ['Question', 'Answer'],
          ar: ['السؤال', 'الجواب'],
        },
        rows: [
          {
            en: ['Does it change over time?', 'If no, it is a prop or a constant — not state.'],
            ar: ['هل تتغيّر مع الوقت؟', 'إذا لا، فهي خاصية أو ثابت — وليست حالة.'],
          },
          {
            en: [
              'Can it be calculated from other state or props?',
              'Then calculate it during render. Do not store it twice.',
            ],
            ar: [
              'هل يمكن حسابها من حالة أو خصائص أخرى؟',
              'إذًا احسبها أثناء العرض ولا تخزّنها مرتين.',
            ],
          },
          {
            en: ['Which components need it?', 'Put it in their closest shared parent, and no higher.'],
            ar: ['أي المكوّنات تحتاجها؟', 'ضعها في أقرب أب مشترك بينها، ولا ترفعها أعلى من ذلك.'],
          },
        ],
      },

      {
        type: 'quiz',
        question: {
          en: 'A component calls `setTheme("dark")` inside a click handler and immediately reads `theme` on the next line. What does it see?',
          ar: 'مكوّن يستدعي `setTheme("dark")` داخل معالج نقرة ثم يقرأ `theme` في السطر التالي مباشرة. ماذا يرى؟',
        },
        options: [
          { text: { en: '`"dark"` — state updates immediately.', ar: '`"dark"` — لأن الحالة تتحدّث فورًا.' } },
          {
            text: {
              en: 'The old value — the new one only exists in the next render.',
              ar: 'القيمة القديمة — فالجديدة لا توجد إلا في العرض التالي.',
            },
            correct: true,
          },
          { text: { en: '`undefined`, until the render finishes.', ar: '`undefined` حتى ينتهي العرض.' } },
          { text: { en: 'It depends on whether the component is memoised.', ar: 'يعتمد على ما إذا كان المكوّن مخزَّنًا.' } },
        ],
        explain: {
          en: 'Every render gets its own snapshot of state. `setTheme` schedules the next render; the variable in the current one is frozen until React calls your function again.',
          ar: 'كل عملية عرض تحصل على لقطتها الخاصة من الحالة. `setTheme` تجدول العرض التالي، أما المتغيّر في العرض الحالي فيبقى ثابتًا حتى تستدعي رياكت دالتك مجددًا.',
        },
      },

      {
        type: 'keypoints',
        items: {
          en: [
            '`useState` returns the current value and a setter — always in that order.',
            'The initial value is used once, on the first render only.',
            'Reading state right after setting it gives the old value. That is by design.',
            'If a value can be calculated from something else, it should not be state.',
          ],
          ar: [
            '`useState` تُعيد القيمة الحالية ودالة التحديث — بهذا الترتيب دائمًا.',
            'القيمة الابتدائية تُستخدم مرة واحدة، في أول عرض فقط.',
            'قراءة الحالة بعد تحديثها مباشرة تعطي القيمة القديمة. وهذا سلوك مقصود.',
            'إذا أمكن حساب قيمة من شيء آخر، فلا يجب أن تكون حالة.',
          ],
        },
      },
    ],
  },

  {
    id: 'state-and-interactivity/immutability',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'React decides whether to re-render by comparing the **reference** of the new state with the old one. Edit an object in place and the reference is identical, so React concludes nothing changed — and your screen freezes while your data quietly moves on.',
          ar: 'تقرّر رياكت إعادة العرض بمقارنة **مرجع** الحالة الجديدة بالقديمة. عدّل الكائن في مكانه فيبقى المرجع نفسه، فتستنتج رياكت أن شيئًا لم يتغيّر — فتتجمّد شاشتك بينما بياناتك تتقدّم بصمت.',
        },
      },
      {
        type: 'compare',
        lang: 'js',
        bad: {
          label: { en: 'Mutation — screen may not update', ar: 'تعديل مباشر — قد لا تتحدّث الشاشة' },
          code: `todos.push(newTodo);
setTodos(todos);

user.name = 'Sara';
setUser(user);

list.sort();
setList(list);`,
        },
        good: {
          label: { en: 'New value every time', ar: 'قيمة جديدة في كل مرة' },
          code: `setTodos([...todos, newTodo]);

setUser({ ...user, name: 'Sara' });

setList([...list].sort());`,
        },
      },
      {
        type: 'heading',
        text: { en: 'The four operations you actually need', ar: 'العمليات الأربع التي تحتاجها فعلًا' },
      },
      {
        type: 'code',
        lang: 'js',
        code: `// add
setItems([...items, item]);            // end
setItems([item, ...items]);            // start

// remove
setItems(items.filter((i) => i.id !== id));

// update one
setItems(items.map((i) => (i.id === id ? { ...i, done: true } : i)));

// nested update — spread every level you touch
setForm({ ...form, address: { ...form.address, city: 'Cairo' } });`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'Deep nesting is the real warning sign', ar: 'التداخل العميق هو التحذير الحقيقي' },
        body: {
          en: 'If you are spreading four levels deep, the problem is the shape of your state, not the syntax. Flatten it, or reach for a reducer (phase 4) — libraries like Immer exist for the cases where you genuinely cannot.',
          ar: 'إذا كنت تنشر أربعة مستويات، فالمشكلة في شكل حالتك لا في الصياغة. سطّحها أو استخدم reducer (المرحلة الرابعة) — ومكتبات مثل Immer موجودة للحالات التي يستحيل فيها ذلك فعلًا.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'Immutability is not about purity for its own sake. It gives you cheap change detection, a working undo history, safe `React.memo`, and time-travel debugging in DevTools — all for the price of one spread operator.',
          ar: 'التغيير غير المباشر ليس نقاءً لذاته. بل يمنحك كشف تغيّر رخيصًا، وسجلّ تراجع يعمل، و`React.memo` آمنًا، وتصحيحًا بالسفر عبر الزمن في أدوات المطوّر — بثمن معامل نشر واحد.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'You call `setUser(user)` after `user.name = "Sara"`. The name in the UI does not change. Why?',
          ar: 'استدعيت `setUser(user)` بعد `user.name = "Sara"` فلم يتغيّر الاسم في الواجهة. لماذا؟',
        },
        options: [
          {
            text: {
              en: 'React compares references, and you passed the same object it already had.',
              ar: 'تقارن رياكت المراجع، وقد مرّرت الكائن نفسه الذي لديها.',
            },
            correct: true,
          },
          { text: { en: 'State updates are asynchronous, so it will appear later.', ar: 'تحديثات الحالة غير متزامنة فستظهر لاحقًا.' } },
          { text: { en: 'Strings cannot be stored in state.', ar: 'لا يمكن تخزين النصوص في الحالة.' } },
          { text: { en: 'You need to call `setUser` twice.', ar: 'عليك استدعاء `setUser` مرتين.' } },
        ],
        explain: {
          en: 'React uses `Object.is` on the previous and next state. Same reference means "no change", so it bails out of rendering. `setUser({ ...user, name: "Sara" })` creates a new reference and the update goes through.',
          ar: 'تستخدم رياكت `Object.is` بين الحالة السابقة والجديدة. المرجع نفسه يعني «لا تغيير» فتتوقف عن العرض. أما `setUser({ ...user, name: "Sara" })` فينشئ مرجعًا جديدًا فيمرّ التحديث.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Never mutate state — always hand the setter a new object or array.',
            'add = spread, remove = filter, update = map.',
            'Spread every nested level you modify.',
            '`sort`, `reverse`, `push`, `splice` mutate — copy first.',
          ],
          ar: [
            'لا تعدّل الحالة مباشرة — مرّر لدالة التحديث كائنًا أو مصفوفة جديدة دائمًا.',
            'الإضافة نشر، والحذف filter، والتعديل map.',
            'انشر كل مستوى متداخل تعدّله.',
            '`sort` و `reverse` و `push` و `splice` تعدّل الأصل — انسخ أولًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'state-and-interactivity/updater-functions',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Passing a value says "make it this". Passing a function says "take whatever is current and transform it". The second is correct in every case where the new value depends on the old one.',
          ar: 'تمرير قيمة يعني «اجعلها هذه». وتمرير دالة يعني «خذ الحالي وحوّله». والثاني هو الصحيح في كل حالة تعتمد فيها القيمة الجديدة على القديمة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `setCount(count + 1);        // uses the count from this render
setCount((c) => c + 1);     // uses the latest queued value`,
      },
      {
        type: 'heading',
        text: { en: 'Where the difference bites', ar: 'أين يظهر الفرق' },
      },
      {
        type: 'list',
        ordered: true,
        items: {
          en: [
            'Two or more updates in the same handler — React batches them, and value form reads a stale variable each time.',
            'Inside a `setTimeout`, a promise callback or an event listener that was created in an earlier render.',
            'Any update triggered by rapid input: fast clicking, keypresses, incoming websocket messages.',
          ],
          ar: [
            'تحديثان أو أكثر في المعالج نفسه — إذ تجمعها رياكت، وصيغة القيمة تقرأ متغيّرًا قديمًا في كل مرة.',
            'داخل `setTimeout` أو ردّ وعد أو مستمع حدث أُنشئ في عرض سابق.',
            'أي تحديث ناتج عن إدخال سريع: نقر متتابع أو ضغطات مفاتيح أو رسائل websocket واردة.',
          ],
        },
      },
      {
        type: 'playground',
        caption: {
          en: 'Both buttons call their setter three times. Only one of them adds three.',
          ar: 'كلا الزرّين يستدعي دالة التحديث ثلاث مرات. وواحد فقط منهما يضيف ثلاثة.',
        },
        code: `function Compare() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  function bumpValue() {
    setA(a + 1);
    setA(a + 1);
    setA(a + 1);
  }

  function bumpUpdater() {
    setB((n) => n + 1);
    setB((n) => n + 1);
    setB((n) => n + 1);
  }

  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}>
      <button onClick={bumpValue}>value form → {a}</button>
      <button onClick={bumpUpdater}>updater form → {b}</button>
    </div>
  );
}

render(<Compare />);`,
      },
      {
        type: 'callout',
        tone: 'note',
        body: {
          en: 'React queues updater functions and runs them in order during the next render, each receiving the result of the previous one. That is why three `+ 1` updaters really add three.',
          ar: 'تصفّ رياكت دوال التحديث وتشغّلها بالترتيب أثناء العرض التالي، وكلٌّ منها يستلم نتيجة سابقتها. ولهذا تضيف ثلاث دوال `+ 1` ثلاثةً فعلًا.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Inside `setInterval`, `setCount(count + 1)` stops advancing after the first tick. Why?',
          ar: 'داخل `setInterval`، تتوقف `setCount(count + 1)` عن التقدّم بعد أول نبضة. لماذا؟',
        },
        options: [
          {
            text: {
              en: 'The callback closed over `count` from the render that created it, so it keeps computing the same value.',
              ar: 'أغلق الردّ على قيمة `count` من العرض الذي أنشأه، فيحسب القيمة نفسها دائمًا.',
            },
            correct: true,
          },
          { text: { en: '`setInterval` cannot be used with React state.', ar: 'لا يمكن استخدام `setInterval` مع حالة رياكت.' } },
          { text: { en: 'The interval is cleared automatically after one tick.', ar: 'يُلغى المؤقّت تلقائيًا بعد نبضة واحدة.' } },
          { text: { en: 'You must wrap the call in `useMemo`.', ar: 'عليك تغليف الاستدعاء بـ `useMemo`.' } },
        ],
        explain: {
          en: 'The interval callback was created once and captured that render’s `count`. `setCount((c) => c + 1)` does not read the captured variable at all, so it keeps working no matter how stale the closure is.',
          ar: 'أُنشئ ردّ المؤقّت مرة واحدة والتقط قيمة `count` لذلك العرض. أما `setCount((c) => c + 1)` فلا تقرأ المتغيّر الملتقط أصلًا، فتستمر بالعمل مهما قدُم الإغلاق.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'New value depends on old value → pass a function.',
            'React queues updaters and applies them in order.',
            'The updater form is immune to stale closures in timers and callbacks.',
          ],
          ar: [
            'القيمة الجديدة تعتمد على القديمة ← مرّر دالة.',
            'تصفّ رياكت دوال التحديث وتطبّقها بالترتيب.',
            'صيغة الدالة محصّنة ضد الإغلاقات القديمة في المؤقّتات وردود النداء.',
          ],
        },
      },
    ],
  },

  {
    id: 'state-and-interactivity/controlled-inputs',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A controlled input takes its value from state and reports every change back. React becomes the single source of truth, which is what lets you validate, format, disable and reset with ordinary code.',
          ar: 'الحقل المُتحكَّم به يأخذ قيمته من الحالة ويُبلّغ عن كل تغيير. فتصبح رياكت مصدر الحقيقة الوحيد، وهذا ما يتيح لك التحقّق والتنسيق والتعطيل وإعادة الضبط بكود عادي.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        highlight: [5, 6],
        code: `function EmailField() {
  const [email, setEmail] = useState('');

  return (
    <input
      value={email}                                   // state → input
      onChange={(e) => setEmail(e.target.value)}      // input → state
      type="email"
    />
  );
}`,
      },
      {
        type: 'table',
        head: { en: ['Element', 'Prop to control it'], ar: ['العنصر', 'الخاصية للتحكّم به'] },
        rows: [
          { en: ['`<input type="text">`', '`value` + `onChange`'], ar: ['`<input type="text">`', '`value` + `onChange`'] },
          { en: ['`<input type="checkbox">`', '`checked` + `onChange`'], ar: ['`<input type="checkbox">`', '`checked` + `onChange`'] },
          { en: ['`<select>`', '`value` on the select, not on the options'], ar: ['`<select>`', '`value` على select لا على الخيارات'] },
          { en: ['`<textarea>`', '`value`, never children'], ar: ['`<textarea>`', '`value` لا العناصر الأبناء'] },
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'The uncontrolled-to-controlled warning', ar: 'تحذير الانتقال من غير متحكَّم إلى متحكَّم' },
        body: {
          en: 'Starting state as `undefined` or `null` makes the input uncontrolled on the first render and controlled later — React warns loudly. Always initialise text state with `""`.',
          ar: 'بدء الحالة بـ `undefined` أو `null` يجعل الحقل غير متحكَّم به في أول عرض ثم متحكَّمًا لاحقًا — وتحذّر رياكت بصوت عالٍ. ابدأ حالة النص دائمًا بـ `""`.',
        },
      },
      {
        type: 'heading',
        text: { en: 'One handler for a whole form', ar: 'معالج واحد للنموذج كله' },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const [form, setForm] = useState({ name: '', email: '' });

function handleChange(e) {
  const { name, value } = e.target;
  setForm((f) => ({ ...f, [name]: value }));   // computed key
}

<input name="name" value={form.name} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />`,
      },
      {
        type: 'playground',
        caption: {
          en: 'Everything below is derived from one piece of state — try typing.',
          ar: 'كل ما بالأسفل مشتقّ من قطعة حالة واحدة — جرّب الكتابة.',
        },
        code: `function Signup() {
  const [form, setForm] = useState({ name: '', email: '' });
  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const valid = form.name.trim().length > 1 && form.email.includes('@');

  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 260 }}>
      <input name="name" value={form.name} onChange={change} placeholder="Name" />
      <input name="email" value={form.email} onChange={change} placeholder="Email" />
      <button disabled={!valid}>{valid ? 'Create account' : 'Fill both fields'}</button>
    </div>
  );
}

render(<Signup />);`,
      },
      {
        type: 'quiz',
        question: {
          en: 'An input renders but refuses to accept typing. What is the most likely cause?',
          ar: 'يظهر الحقل لكنه يرفض قبول الكتابة. ما السبب الأرجح؟',
        },
        options: [
          {
            text: { en: 'It has a `value` prop but no `onChange`, so state never updates.', ar: 'له خاصية `value` بلا `onChange`، فلا تتحدّث الحالة أبدًا.' },
            correct: true,
          },
          { text: { en: 'The input is missing a `key`.', ar: 'الحقل ينقصه `key`.' } },
          { text: { en: 'React inputs need `defaultValue` as well.', ar: 'حقول رياكت تحتاج `defaultValue` أيضًا.' } },
          { text: { en: 'The form needs `noValidate`.', ar: 'يحتاج النموذج إلى `noValidate`.' } },
        ],
        explain: {
          en: 'With `value` fixed to a state variable that never changes, React re-renders the same value after every keystroke. The pair is `value` + `onChange`; leave one out and the field is frozen.',
          ar: 'مع تثبيت `value` على متغيّر حالة لا يتغيّر، تعيد رياكت عرض القيمة نفسها بعد كل ضغطة. الزوج هو `value` + `onChange`؛ وحذف أحدهما يجمّد الحقل.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Controlled = `value` from state + `onChange` back into state.',
            'Initialise text state with `""`, never `undefined`.',
            'Checkboxes use `checked`, not `value`.',
            'A computed key `[name]: value` handles a whole form with one handler.',
          ],
          ar: [
            'المتحكَّم به = `value` من الحالة + `onChange` إلى الحالة.',
            'ابدأ حالة النص بـ `""` لا `undefined`.',
            'مربّعات الاختيار تستخدم `checked` لا `value`.',
            'المفتاح المحسوب `[name]: value` يدير نموذجًا كاملًا بمعالج واحد.',
          ],
        },
      },
    ],
  },

  {
    id: 'state-and-interactivity/lifting-state-up',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Two components need the same value. State cannot flow sideways, so you move it up to their closest common parent and pass it back down — that is the entire technique.',
          ar: 'مكوّنان يحتاجان القيمة نفسها. والحالة لا تنتقل جانبيًا، لذا ترفعها إلى أقرب أب مشترك ثم تمرّرها للأسفل — وهذه هي التقنية كلها.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `function Converter() {
  const [celsius, setCelsius] = useState(20);   // ← the single source of truth

  return (
    <>
      <TempInput label="°C" value={celsius} onChange={setCelsius} />
      <TempInput label="°F" value={celsius * 1.8 + 32} onChange={(f) => setCelsius((f - 32) / 1.8)} />
    </>
  );
}

function TempInput({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input value={Math.round(value)} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}`,
        caption: {
          en: 'The child is now **controlled**: it owns no state, it just displays a value and reports changes.',
          ar: 'صار الابن **متحكَّمًا به**: لا يملك حالة، بل يعرض قيمة ويبلّغ عن التغييرات.',
        },
      },
      {
        type: 'steps',
        steps: [
          {
            title: { en: 'Find every component that reads the value', ar: 'حدّد كل مكوّن يقرأ القيمة' },
            body: {
              en: 'Include the ones that only need it to decide whether to show something.',
              ar: 'وشمّل تلك التي تحتاجها فقط لتقرّر إظهار شيء ما.',
            },
          },
          {
            title: { en: 'Move the state to their closest shared parent', ar: 'انقل الحالة إلى أقرب أب مشترك' },
            body: {
              en: 'Closest — not the top of the app. Lifting too high makes half your tree re-render for nothing.',
              ar: 'الأقرب — لا أعلى التطبيق. فالرفع الزائد يجعل نصف شجرتك تُعاد بلا سبب.',
            },
          },
          {
            title: { en: 'Pass the value down and a setter with it', ar: 'مرّر القيمة ومعها دالة التحديث' },
            body: {
              en: 'The children become controlled: props in, events out, no local copy of the truth.',
              ar: 'يصبح الأبناء متحكَّمًا بهم: خصائص للداخل وأحداث للخارج، بلا نسخة محلية من الحقيقة.',
            },
          },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        body: {
          en: 'Do not copy a prop into state "so the child can edit it". You now have two values that disagree the moment the parent changes. Either control the child, or give the copy a `key` so it resets intentionally.',
          ar: 'لا تنسخ خاصية إلى حالة «كي يعدّلها الابن». فستحصل على قيمتين تتعارضان لحظة تغيّر الأب. إما أن تتحكّم بالابن، أو أعطِ النسخة `key` لتُعاد ضبطها عن قصد.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'A filter box and a results list both need the query string. Where does it belong?',
          ar: 'حقل التصفية وقائمة النتائج يحتاجان نصّ البحث. أين مكانه؟',
        },
        options: [
          {
            text: { en: 'In their closest common parent, passed down to both.', ar: 'في أقرب أب مشترك بينهما، ويُمرَّر إليهما.' },
            correct: true,
          },
          { text: { en: 'In the filter box, since it owns the input.', ar: 'في حقل التصفية لأنه يملك المدخل.' } },
          { text: { en: 'In the root component of the whole app.', ar: 'في المكوّن الجذر للتطبيق كله.' } },
          { text: { en: 'Duplicated in both, kept in sync with an effect.', ar: 'مكرّرًا فيهما مع مزامنته بتأثير.' } },
        ],
        explain: {
          en: 'Closest common parent keeps the re-render surface small and there is only ever one copy. Syncing duplicates with an effect is the classic anti-pattern taught against in phase 4.',
          ar: 'أقرب أب مشترك يُبقي مساحة إعادة العرض صغيرة ويضمن نسخة واحدة فقط. أما مزامنة النسخ بتأثير فهي النمط السيّئ الكلاسيكي الذي تحذّر منه المرحلة الرابعة.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'State lives in the closest common parent of everyone who needs it.',
            'Children receive `value` and a change handler — they own nothing.',
            'Do not mirror props into state; you will fight to keep them in sync.',
          ],
          ar: [
            'تعيش الحالة في أقرب أب مشترك لكل من يحتاجها.',
            'يستقبل الأبناء `value` ومعالج تغيير — ولا يملكون شيئًا.',
            'لا تعكس الخصائص في الحالة، وإلا صارعت لإبقائها متزامنة.',
          ],
        },
      },
    ],
  },

  {
    id: 'state-and-interactivity/derived-state',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'If a value can be calculated from state you already have, calculating it is always better than storing it. Two copies of the same fact will disagree eventually — usually in front of a user.',
          ar: 'إذا أمكن حساب قيمة من حالة لديك، فحسابها أفضل دائمًا من تخزينها. فنسختان من الحقيقة نفسها ستتعارضان في النهاية — عادةً أمام المستخدم.',
        },
      },
      {
        type: 'compare',
        lang: 'tsx',
        bad: {
          label: { en: 'Stored and synced', ar: 'مخزّنة ومتزامنة' },
          code: `const [items, setItems] = useState([]);
const [count, setCount] = useState(0);

function add(item) {
  setItems([...items, item]);
  setCount(count + 1);   // must never be forgotten
}`,
        },
        good: {
          label: { en: 'Derived during render', ar: 'مشتقّة أثناء العرض' },
          code: `const [items, setItems] = useState([]);
const count = items.length;   // always correct

function add(item) {
  setItems([...items, item]);
}`,
        },
      },
      {
        type: 'text',
        text: {
          en: 'The same applies to filtering, sorting, totals, "is the form valid", "how many are selected" and every progress bar you will ever write. Compute them in the component body — it runs on every render anyway.',
          ar: 'ينطبق هذا نفسه على التصفية والترتيب والمجاميع و«هل النموذج صالح» و«كم عنصرًا مُحدَّدًا» وكل شريط تقدّم ستكتبه. احسبها في جسم المكوّن — فهو يعمل في كل عرض على أي حال.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const visible = items
  .filter((i) => (showDone ? true : !i.done))
  .filter((i) => i.text.toLowerCase().includes(query.toLowerCase()));

const remaining = items.filter((i) => !i.done).length;
const allDone = items.length > 0 && remaining === 0;
const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);`,
      },
      {
        type: 'callout',
        tone: 'note',
        title: { en: 'Is this slow?', ar: 'هل هذا بطيء؟' },
        body: {
          en: 'Almost never. Filtering a few hundred items takes microseconds. If profiling proves otherwise you wrap it in `useMemo` — and with the React Compiler (phase 12) even that is usually done for you.',
          ar: 'نادرًا جدًا. فتصفية بضع مئات من العناصر تستغرق ميكروثوانٍ. وإذا أثبت القياس عكس ذلك تغلّفها بـ `useMemo` — ومع مُصرِّف رياكت (المرحلة الثانية عشرة) يُفعل ذلك عادةً نيابةً عنك.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'When is a copy of derived data in state actually justified?',
          ar: 'متى يكون تخزين نسخة مشتقّة في الحالة مبرَّرًا فعلًا؟',
        },
        options: [
          {
            text: {
              en: 'When it must survive independently — for example the text the user typed before a save, kept separate from the saved record.',
              ar: 'حين يجب أن تبقى مستقلّة — مثل النص الذي كتبه المستخدم قبل الحفظ، منفصلًا عن السجلّ المحفوظ.',
            },
            correct: true,
          },
          { text: { en: 'Whenever the calculation has more than one step.', ar: 'كلما تجاوز الحساب خطوة واحدة.' } },
          { text: { en: 'Whenever the list has more than ten items.', ar: 'كلما تجاوزت القائمة عشرة عناصر.' } },
          { text: { en: 'Never — derived data must never be stored.', ar: 'أبدًا — لا يجوز تخزين البيانات المشتقّة إطلاقًا.' } },
        ],
        explain: {
          en: 'A draft is genuinely its own piece of state: it can differ from the source on purpose. Everything that must always agree with the source should be computed instead.',
          ar: 'المسودّة حالة قائمة بذاتها فعلًا: يمكن أن تختلف عن المصدر عن قصد. أما كل ما يجب أن يوافق المصدر دائمًا فيُحسب بدل تخزينه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Can it be calculated from existing state? Then it is not state.',
            'Compute totals, filters and validity during render.',
            'Two stored copies of one fact will drift apart.',
            'Optimise with `useMemo` only after measuring.',
          ],
          ar: [
            'هل يمكن حسابها من حالة قائمة؟ إذًا ليست حالة.',
            'احسب المجاميع والتصفيات والصلاحية أثناء العرض.',
            'نسختان مخزّنتان لحقيقة واحدة ستفترقان.',
            'حسّن بـ `useMemo` بعد القياس فقط.',
          ],
        },
      },
    ],
  },
]

import{S as e,a as t,b as n,h as r,n as i,v as a,y as o}from"./context-Bj_zG0nQ.js";import{d as s,g as c,h as l,o as u}from"./index-9F_gpvdW.js";import{Playground as d}from"./Playground-Ch_XJ7cY.js";var f=e(n(),1),p=[{id:`counter`,level:`beginner`,phase:`state-and-interactivity`,title:{en:`State: a counter`,ar:`الحالة: عدّاد`},note:{en:`Change the starting value, or make the button subtract instead. The preview updates as you type.`,ar:`غيّر القيمة الابتدائية، أو اجعل الزر يطرح بدل أن يجمع. تتحدّث المعاينة أثناء الكتابة.`},code:`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <p style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>{count}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setCount(count - 1)}>−1</button>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    </div>
  );
}

render(<Counter />);`},{id:`props`,level:`beginner`,phase:`react-fundamentals`,title:{en:`Props and lists`,ar:`الخصائص والقوائم`},note:{en:`One component, three different results. Try adding a fourth product to the array.`,ar:`مكوّن واحد وثلاث نتائج مختلفة. جرّب إضافة منتج رابع إلى المصفوفة.`},code:`const products = [
  { id: 1, name: 'Keyboard', price: 90, inStock: true },
  { id: 2, name: 'Mouse', price: 40, inStock: false },
  { id: 3, name: 'Monitor', price: 320, inStock: true },
];

function Product({ name, price, inStock }) {
  return (
    <li style={{ marginBottom: 6 }}>
      <strong>{name}</strong> — \${price}{' '}
      {inStock ? '✅' : <span style={{ opacity: 0.6 }}>sold out</span>}
    </li>
  );
}

function ProductList() {
  return (
    <ul style={{ paddingInlineStart: 18, margin: 0 }}>
      {products.map((p) => (
        <Product key={p.id} {...p} />
      ))}
    </ul>
  );
}

render(<ProductList />);`},{id:`controlled-form`,level:`beginner`,phase:`state-and-interactivity`,title:{en:`A controlled input`,ar:`حقل مُتحكَّم به`},note:{en:`State is the single source of truth: the input can never disagree with it.`,ar:`الحالة هي مصدر الحقيقة الوحيد: لا يمكن للحقل أن يخالفها.`},code:`function NameForm() {
  const [name, setName] = useState('');
  const clean = name.trim();

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
        style={{ padding: 8, borderRadius: 8, border: '1px solid #888' }}
      />
      <p style={{ margin: 0 }}>
        {clean ? \`Hello, \${clean}! (\${clean.length} characters)\` : 'Waiting for input…'}
      </p>
    </div>
  );
}

render(<NameForm />);`},{id:`immutability`,level:`beginner`,phase:`state-and-interactivity`,title:{en:`Immutable list updates`,ar:`تحديث القوائم دون تعديل الأصل`},note:{en:`Add and remove without ever mutating: spread to add, filter to remove.`,ar:`أضف واحذف دون تعديل الأصل: النشر للإضافة و filter للحذف.`},code:`function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn useState', done: true },
    { id: 2, text: 'Never mutate state', done: false },
  ]);
  const [draft, setDraft] = useState('');

  function add() {
    if (!draft.trim()) return;
    setTodos([...todos, { id: Date.now(), text: draft, done: false }]);
    setDraft('');
  }

  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="New task" />
        <button onClick={add}>add</button>
      </div>
      <ul style={{ paddingInlineStart: 18, margin: 0 }}>
        {todos.map((t) => (
          <li key={t.id} onClick={() => toggle(t.id)} style={{ cursor: 'pointer' }}>
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
          </li>
        ))}
      </ul>
      <small>{todos.filter((t) => !t.done).length} left — click a task to toggle it</small>
    </div>
  );
}

render(<TodoList />);`},{id:`derived-state`,level:`intermediate`,phase:`state-and-interactivity`,title:{en:`Derive, do not duplicate`,ar:`اشتقّ ولا تكرّر`},note:{en:`The filtered list is calculated during render — there is no second piece of state to keep in sync.`,ar:`القائمة المصفّاة تُحسب أثناء العرض — لا توجد حالة ثانية تحتاج إلى مزامنة.`},code:`const people = ['Amina', 'Bilal', 'Carla', 'Dawud', 'Elena', 'Faisal'];

function Search() {
  const [query, setQuery] = useState('');

  // derived — not stored in state
  const matches = people.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" />
      {matches.length === 0 ? (
        <p style={{ opacity: 0.6, margin: 0 }}>No matches</p>
      ) : (
        <ul style={{ paddingInlineStart: 18, margin: 0 }}>
          {matches.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

render(<Search />);`},{id:`effect-cleanup`,level:`intermediate`,phase:`hooks-in-depth`,title:{en:`useEffect with cleanup`,ar:`useEffect مع التنظيف`},note:{en:`The interval is started on mount and cleared on unmount. Remove the cleanup and you leak a timer.`,ar:`يبدأ المؤقّت عند التركيب ويُلغى عند الإزالة. احذف التنظيف وستُسرِّب مؤقّتًا.`},code:`function Clock() {
  const [now, setNow] = useState(() => new Date());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id); // ← cleanup
  }, [running]);

  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}>
      <p style={{ fontSize: 24, fontFamily: 'monospace', margin: 0 }}>
        {now.toLocaleTimeString()}
      </p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? 'pause' : 'resume'}
      </button>
    </div>
  );
}

render(<Clock />);`},{id:`custom-hook`,level:`intermediate`,phase:`hooks-in-depth`,title:{en:`Writing a custom hook`,ar:`كتابة خطّاف مخصّص`},note:{en:`A hook is just a function that uses other hooks. Two components, one shared behaviour, no duplication.`,ar:`الخطّاف مجرّد دالة تستخدم خطّافات أخرى. مكوّنان وسلوك مشترك واحد بلا تكرار.`},code:`function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle];
}

function Panel({ title }) {
  const [open, toggle] = useToggle();
  return (
    <div style={{ border: '1px solid #888', borderRadius: 10, padding: 10, marginBottom: 8 }}>
      <button onClick={toggle}>{open ? '▾' : '▸'} {title}</button>
      {open && <p style={{ margin: '8px 0 0' }}>Shared logic, zero duplication.</p>}
    </div>
  );
}

render(
  <div>
    <Panel title="First panel" />
    <Panel title="Second panel" />
  </div>
);`},{id:`reducer`,level:`advanced`,phase:`hooks-in-depth`,title:{en:`useReducer for related state`,ar:`useReducer للحالة المترابطة`},note:{en:`When several values change together, describing transitions beats juggling setters.`,ar:`حين تتغيّر عدة قيم معًا، وصف الانتقالات أفضل من التلاعب بعدة دوال تحديث.`},code:`const initial = { count: 0, step: 1, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count],
      };
    case 'step':
      return { ...state, step: Number(action.value) || 1 };
    case 'undo': {
      if (state.history.length === 0) return state;
      const history = state.history.slice(0, -1);
      return { ...state, count: state.history.at(-1), history };
    }
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}>
      <p style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>{state.count}</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => dispatch({ type: 'inc' })}>+{state.step}</button>
        <button onClick={() => dispatch({ type: 'undo' })} disabled={!state.history.length}>
          undo
        </button>
        <input
          type="number"
          value={state.step}
          onChange={(e) => dispatch({ type: 'step', value: e.target.value })}
          style={{ width: 60 }}
        />
      </div>
    </div>
  );
}

render(<Counter />);`}],m=o();function h(){let{t:e,L:n}=i(),[o,h]=(0,f.useState)(p[0].id),g=p.find(e=>e.id===o)??p[0],_=g.phase?l(g.phase):void 0;return u(e(`navPlayground`)),(0,m.jsxs)(`div`,{className:`relative`,children:[(0,m.jsx)(`div`,{className:`aurora opacity-40`}),(0,m.jsxs)(`div`,{className:`relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6`,children:[(0,m.jsxs)(s,{children:[(0,m.jsxs)(`h1`,{className:`flex items-center gap-2.5 text-3xl font-black tracking-tight sm:text-4xl`,children:[(0,m.jsx)(r,{className:`text-brand-400`,width:26,height:26}),e(`navPlayground`)]}),(0,m.jsx)(`p`,{className:`mt-2 max-w-2xl text-content-muted`,children:n({en:`Real React running in this page. Edit any example — the result re-renders as you type, and a mistake shows you the actual error message instead of a blank screen.`,ar:`رياكت حقيقية تعمل داخل هذه الصفحة. عدّل أي مثال — تُعاد المعاينة أثناء الكتابة، وأي خطأ يُظهر لك رسالة الخطأ الحقيقية بدل شاشة فارغة.`})})]}),(0,m.jsx)(`div`,{className:`mt-7 flex flex-wrap gap-2`,children:p.map(e=>(0,m.jsx)(`button`,{type:`button`,onClick:()=>h(e.id),className:a(`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all`,e.id===o?`border-brand-400/60 bg-brand-400/12 text-brand-400`:`border-line text-content-muted hover:-translate-y-0.5 hover:text-content`),children:n(e.title)},e.id))}),(0,m.jsxs)(`div`,{className:`mt-4 flex flex-wrap items-baseline gap-3`,children:[(0,m.jsx)(`p`,{className:`text-content-muted`,children:n(g.note)}),_&&(0,m.jsxs)(c,{to:`/phase/${_.slug}`,className:`inline-flex items-center gap-1 text-sm font-bold text-brand-400 hover:underline`,children:[n(_.title),(0,m.jsx)(t,{className:`flip-rtl`,width:13,height:13})]})]}),(0,m.jsx)(d,{code:g.code,className:`mt-4`},g.id),(0,m.jsx)(`p`,{className:`mt-4 text-sm text-content-faint`,children:n({en:`Hooks are already in scope — you do not need to import anything. Finish with render(<Something />).`,ar:`الخطّافات متاحة مسبقًا — لا تحتاج إلى استيراد أي شيء. أنهِ الكود بـ render(<Something />).`})})]})]})}export{h as PlaygroundPage};
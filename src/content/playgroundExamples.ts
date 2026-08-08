import type { Loc } from '@/i18n/types'

export interface PlaygroundExample {
  id: string
  title: Loc
  note: Loc
  /** Phase slug this example belongs to, for the "open the lesson" link. */
  phase?: string
  level: 'beginner' | 'intermediate' | 'advanced'
  code: string
}

/**
 * Every example is self-contained and ends with `render(<X />)`.
 * Styling stays inline so the sandbox needs no CSS of its own.
 */
export const PLAYGROUND_EXAMPLES: PlaygroundExample[] = [
  {
    id: 'counter',
    level: 'beginner',
    phase: 'state-and-interactivity',
    title: { en: 'State: a counter', ar: 'الحالة: عدّاد' },
    note: {
      en: 'Change the starting value, or make the button subtract instead. The preview updates as you type.',
      ar: 'غيّر القيمة الابتدائية، أو اجعل الزر يطرح بدل أن يجمع. تتحدّث المعاينة أثناء الكتابة.',
    },
    code: `function Counter() {
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

render(<Counter />);`,
  },

  {
    id: 'props',
    level: 'beginner',
    phase: 'react-fundamentals',
    title: { en: 'Props and lists', ar: 'الخصائص والقوائم' },
    note: {
      en: 'One component, three different results. Try adding a fourth product to the array.',
      ar: 'مكوّن واحد وثلاث نتائج مختلفة. جرّب إضافة منتج رابع إلى المصفوفة.',
    },
    code: `const products = [
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

render(<ProductList />);`,
  },

  {
    id: 'controlled-form',
    level: 'beginner',
    phase: 'state-and-interactivity',
    title: { en: 'A controlled input', ar: 'حقل مُتحكَّم به' },
    note: {
      en: 'State is the single source of truth: the input can never disagree with it.',
      ar: 'الحالة هي مصدر الحقيقة الوحيد: لا يمكن للحقل أن يخالفها.',
    },
    code: `function NameForm() {
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

render(<NameForm />);`,
  },

  {
    id: 'immutability',
    level: 'beginner',
    phase: 'state-and-interactivity',
    title: { en: 'Immutable list updates', ar: 'تحديث القوائم دون تعديل الأصل' },
    note: {
      en: 'Add and remove without ever mutating: spread to add, filter to remove.',
      ar: 'أضف واحذف دون تعديل الأصل: النشر للإضافة و filter للحذف.',
    },
    code: `function TodoList() {
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

render(<TodoList />);`,
  },

  {
    id: 'derived-state',
    level: 'intermediate',
    phase: 'state-and-interactivity',
    title: { en: 'Derive, do not duplicate', ar: 'اشتقّ ولا تكرّر' },
    note: {
      en: 'The filtered list is calculated during render — there is no second piece of state to keep in sync.',
      ar: 'القائمة المصفّاة تُحسب أثناء العرض — لا توجد حالة ثانية تحتاج إلى مزامنة.',
    },
    code: `const people = ['Amina', 'Bilal', 'Carla', 'Dawud', 'Elena', 'Faisal'];

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

render(<Search />);`,
  },

  {
    id: 'effect-cleanup',
    level: 'intermediate',
    phase: 'hooks-in-depth',
    title: { en: 'useEffect with cleanup', ar: 'useEffect مع التنظيف' },
    note: {
      en: 'The interval is started on mount and cleared on unmount. Remove the cleanup and you leak a timer.',
      ar: 'يبدأ المؤقّت عند التركيب ويُلغى عند الإزالة. احذف التنظيف وستُسرِّب مؤقّتًا.',
    },
    code: `function Clock() {
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

render(<Clock />);`,
  },

  {
    id: 'custom-hook',
    level: 'intermediate',
    phase: 'hooks-in-depth',
    title: { en: 'Writing a custom hook', ar: 'كتابة خطّاف مخصّص' },
    note: {
      en: 'A hook is just a function that uses other hooks. Two components, one shared behaviour, no duplication.',
      ar: 'الخطّاف مجرّد دالة تستخدم خطّافات أخرى. مكوّنان وسلوك مشترك واحد بلا تكرار.',
    },
    code: `function useToggle(initial = false) {
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
);`,
  },

  {
    id: 'reducer',
    level: 'advanced',
    phase: 'hooks-in-depth',
    title: { en: 'useReducer for related state', ar: 'useReducer للحالة المترابطة' },
    note: {
      en: 'When several values change together, describing transitions beats juggling setters.',
      ar: 'حين تتغيّر عدة قيم معًا، وصف الانتقالات أفضل من التلاعب بعدة دوال تحديث.',
    },
    code: `const initial = { count: 0, step: 1, history: [] };

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

render(<Counter />);`,
  },
]

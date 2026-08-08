import type { LessonBody } from '../blocks'

export const typescriptWithReact: LessonBody[] = [
  {
    id: 'typescript-with-react/ts-essentials',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'You do not need to master TypeScript to use it in React. You need about six ideas, and the compiler teaches you the rest by complaining at the right moments.',
          ar: 'لا تحتاج إتقان تايب سكربت لاستخدامه في رياكت. تحتاج نحو ستّ أفكار، والمُصرِّف يعلّمك الباقي باعتراضه في اللحظات المناسبة.',
        },
      },
      {
        type: 'code',
        lang: 'ts',
        code: `// 1 — annotate only what inference cannot guess
let title = 'Hello';              // string, inferred
const ids: number[] = [];          // [] alone would be never[]

// 2 — object shapes
type User = { id: number; name: string; email?: string };  // ? = optional

// 3 — unions are the workhorse
type Status = 'idle' | 'loading' | 'error';

// 4 — functions
function greet(user: User, loud = false): string {
  return loud ? user.name.toUpperCase() : user.name;
}`,
      },
      {
        type: 'table',
        head: { en: ['Feature', 'Use it for'], ar: ['الميزة', 'استخدمها لـ'] },
        rows: [
          { en: ['`type`', 'unions, primitives, function types — the default choice'], ar: ['`type`', 'الاتحادات والأنواع الأولية وأنواع الدوال — الخيار الافتراضي'] },
          { en: ['`interface`', 'object shapes meant to be extended, especially in libraries'], ar: ['`interface`', 'أشكال الكائنات المعدّة للتوسيع، خصوصًا في المكتبات'] },
          { en: ['`unknown`', 'a value you must check before using — the safe `any`'], ar: ['`unknown`', 'قيمة يجب فحصها قبل الاستخدام — البديل الآمن لـ `any`'] },
          { en: ['`as const`', 'freezing a literal so its exact values become the type'], ar: ['`as const`', 'تجميد قيمة لتصبح قيمها الدقيقة هي النوع'] },
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: { en: 'Every `any` is a hole', ar: 'كل `any` ثقب' },
        body: {
          en: '`any` switches type-checking off for that value **and everything it touches**. When you genuinely do not know a type, use `unknown` and narrow it — you keep the safety and the compiler tells you where to check.',
          ar: '`any` يوقف فحص الأنواع لتلك القيمة **ولكل ما تلمسه**. وحين تجهل النوع فعلًا استخدم `unknown` ثم ضيّقه — فتحتفظ بالأمان ويخبرك المُصرِّف أين تفحص.',
        },
      },
      {
        type: 'code',
        lang: 'ts',
        code: `// narrowing: TypeScript follows your checks
function render(status: Status, error: unknown) {
  if (status === 'error') {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return message;                    // string, guaranteed
  }
  return status;                       // 'idle' | 'loading'
}`,
      },
      {
        type: 'quiz',
        question: {
          en: 'Why is `unknown` safer than `any` for an API response?',
          ar: 'لماذا `unknown` أأمن من `any` لاستجابة واجهة برمجية؟',
        },
        options: [
          {
            text: {
              en: 'TypeScript refuses to let you use an `unknown` value until you have checked its shape.',
              ar: 'لأن تايب سكربت يرفض استخدام قيمة `unknown` قبل التحقّق من شكلها.',
            },
            correct: true,
          },
          { text: { en: '`unknown` validates the response at runtime.', ar: '`unknown` يتحقّق من الاستجابة وقت التشغيل.' } },
          { text: { en: '`unknown` is faster to compile.', ar: '`unknown` أسرع في التصريف.' } },
          { text: { en: 'There is no practical difference.', ar: 'لا فرق عملي بينهما.' } },
        ],
        explain: {
          en: 'Neither type validates anything at runtime — that is Zod’s job in phase 11. The difference is that `any` silently allows `data.user.name.first` on a 500 error page, while `unknown` forces you to look first.',
          ar: 'لا يتحقّق أيٌّ منهما وقت التشغيل — فتلك مهمّة Zod في المرحلة الحادية عشرة. الفرق أن `any` يسمح بصمت بـ `data.user.name.first` على صفحة خطأ 500، بينما `unknown` يجبرك على الفحص أولًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Let inference work; annotate boundaries and empty containers.',
            '`type` for unions, `interface` for extendable object shapes.',
            'Unions plus narrowing replace most defensive `if`s.',
            'Prefer `unknown` over `any`, always.',
          ],
          ar: [
            'دع الاستنتاج يعمل، وحدّد الأنواع عند الحدود والحاويات الفارغة.',
            '`type` للاتحادات و `interface` لأشكال الكائنات القابلة للتوسيع.',
            'الاتحادات مع التضييق تُغني عن معظم جُمل `if` الدفاعية.',
            'فضّل `unknown` على `any` دائمًا.',
          ],
        },
      },
    ],
  },

  {
    id: 'typescript-with-react/typing-props',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Typing props is where TypeScript pays for itself immediately: autocomplete on every component, a red squiggle the moment a prop is missing, and refactors that actually finish.',
          ar: 'تنميط الخصائص هو المكان الذي يردّ فيه تايب سكربت ثمنه فورًا: إكمال تلقائي لكل مكوّن، وخطّ أحمر لحظة نسيان خاصية، وإعادة هيكلة تكتمل فعلًا.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `type ButtonProps = {
  label: string;                       // required
  onClick: () => void;
  variant?: 'primary' | 'ghost';       // optional, with fixed choices
  children?: React.ReactNode;          // anything renderable
};

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button className={variant} onClick={onClick}>{label}</button>;
}`,
      },
      {
        type: 'table',
        head: { en: ['You want', 'Type to use'], ar: ['تريد', 'النوع المناسب'] },
        rows: [
          { en: ['Any renderable content', '`React.ReactNode`'], ar: ['أي محتوى قابل للعرض', '`React.ReactNode`'] },
          { en: ['A single element only', '`React.ReactElement`'], ar: ['عنصرًا واحدًا فقط', '`React.ReactElement`'] },
          { en: ['A component, not an element', '`React.ComponentType<P>`'], ar: ['مكوّنًا لا عنصرًا', '`React.ComponentType<P>`'] },
          { en: ['All the native button props', '`React.ComponentProps<"button">`'], ar: ['كل خصائص الزر الأصلية', '`React.ComponentProps<"button">`'] },
        ],
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// extend a native element instead of retyping 40 attributes
type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error?: string;
};

function Input({ label, error, ...rest }: InputProps) {
  return (
    <label>
      {label}
      <input aria-invalid={!!error} {...rest} />
      {error && <span role="alert">{error}</span>}
    </label>
  );
}`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'Make impossible props impossible', ar: 'اجعل الخصائص المستحيلة مستحيلة' },
        body: {
          en: 'A discriminated union stops callers from combining props that make no sense: `{ status: "error"; error: string } | { status: "ok"; data: User }`. Now `data` simply does not exist on an error, and TypeScript enforces it at every call site.',
          ar: 'الاتحاد المميَّز يمنع المستدعين من دمج خصائص لا معنى لها: `{ status: "error"; error: string } | { status: "ok"; data: User }`. فلا وجود لـ `data` في حالة الخطأ أصلًا، ويفرض تايب سكربت ذلك في كل موضع استدعاء.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Which type should a `children` prop use if it may be text, an element, a list, or nothing?',
          ar: 'أي نوع يجب أن تستخدمه خاصية `children` إذا كانت قد تكون نصًّا أو عنصرًا أو قائمة أو لا شيء؟',
        },
        options: [
          { text: { en: '`React.ReactNode`', ar: '`React.ReactNode`' }, correct: true },
          { text: { en: '`React.ReactElement`', ar: '`React.ReactElement`' } },
          { text: { en: '`JSX.Element`', ar: '`JSX.Element`' } },
          { text: { en: '`any`', ar: '`any`' } },
        ],
        explain: {
          en: '`ReactNode` covers strings, numbers, elements, arrays, `null` and `undefined` — everything React can render. `ReactElement` and `JSX.Element` only accept a single element and will reject plain text.',
          ar: '`ReactNode` يشمل النصوص والأرقام والعناصر والمصفوفات و`null` و`undefined` — كل ما تستطيع رياكت عرضه. أما `ReactElement` و `JSX.Element` فيقبلان عنصرًا واحدًا فقط ويرفضان النص المجرّد.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Define a `Props` type and destructure it in the signature.',
            'Union types beat `string` for variants — you get autocomplete and safety.',
            'Extend `ComponentProps<"tag">` instead of retyping native attributes.',
            'Discriminated unions make invalid prop combinations unrepresentable.',
          ],
          ar: [
            'عرّف نوع `Props` وفكّكه في توقيع الدالة.',
            'الاتحادات أفضل من `string` للمتغيّرات — فتحصل على إكمال تلقائي وأمان.',
            'وسّع `ComponentProps<"tag">` بدل إعادة كتابة الخصائص الأصلية.',
            'الاتحادات المميَّزة تجعل التركيبات غير الصالحة غير قابلة للتمثيل.',
          ],
        },
      },
    ],
  },

  {
    id: 'typescript-with-react/typing-hooks',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Most hooks need no annotation at all — TypeScript infers from the initial value. You only step in when the initial value does not represent the full range of what the state can hold.',
          ar: 'معظم الخطّافات لا تحتاج تحديد نوع — إذ يستنتج تايب سكربت من القيمة الابتدائية. ولا تتدخّل إلا حين لا تمثّل تلك القيمة كل ما يمكن أن تحمله الحالة.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `const [count, setCount] = useState(0);          // number — inferred
const [name, setName] = useState('');           // string — inferred

// inference says null, but it will hold a User later
const [user, setUser] = useState<User | null>(null);

// an empty array is never[] without help
const [items, setItems] = useState<Todo[]>([]);`,
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// DOM refs: the null is required, React sets it after mount
const inputRef = useRef<HTMLInputElement>(null);

// mutable value refs: no null needed
const timer = useRef<number | undefined>(undefined);

inputRef.current?.focus();   // optional chaining, because it starts null`,
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// reducers: type the state and the actions, then everything else follows
type State = { status: 'idle' | 'loading'; items: Todo[] };
type Action =
  | { type: 'loading' }
  | { type: 'loaded'; items: Todo[] }
  | { type: 'removed'; id: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loaded':
      return { status: 'idle', items: action.items };   // action.items is Todo[]
    case 'removed':
      return { ...state, items: state.items.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}`,
        caption: {
          en: 'Inside each `case`, TypeScript knows exactly which action shape you have. Misspell a type and it will not compile.',
          ar: 'داخل كل `case` يعرف تايب سكربت شكل الإجراء بالضبط. وأي خطأ إملائي في النوع يمنع التصريف.',
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        body: {
          en: 'Resist `useState<any>` and `as` casts when a type is inconvenient. A cast silences the compiler without changing the value — the crash simply moves to runtime, in front of a user.',
          ar: 'قاوم `useState<any>` و`as` حين يكون النوع مزعجًا. فالتحويل يُسكت المُصرِّف دون تغيير القيمة — والانهيار ينتقل إلى وقت التشغيل أمام المستخدم فقط.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'Why does `useState([])` cause an error when you later push a `Todo` into it?',
          ar: 'لماذا يسبّب `useState([])` خطأً عند إضافة `Todo` إليها لاحقًا؟',
        },
        options: [
          {
            text: { en: 'An empty array is inferred as `never[]`, which accepts no elements.', ar: 'تُستنتج المصفوفة الفارغة كـ `never[]` وهي لا تقبل أي عنصر.' },
            correct: true,
          },
          { text: { en: 'Arrays cannot be stored in state.', ar: 'لا يمكن تخزين المصفوفات في الحالة.' } },
          { text: { en: 'You must use `useReducer` for arrays.', ar: 'يجب استخدام `useReducer` للمصفوفات.' } },
          { text: { en: 'The array needs `as const`.', ar: 'تحتاج المصفوفة `as const`.' } },
        ],
        explain: {
          en: 'TypeScript has nothing to infer from, so it picks the empty type. `useState<Todo[]>([])` tells it what will live there.',
          ar: 'لا يجد تايب سكربت ما يستنتج منه فيختار النوع الفارغ. و`useState<Todo[]>([])` يخبره بما سيسكنها.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Let inference handle primitives; annotate `null` starts and empty arrays.',
            'DOM refs are `useRef<HTMLXElement>(null)` and need `?.`.',
            'Type the action union and reducers become self-checking.',
            'Casting with `as` hides bugs rather than fixing them.',
          ],
          ar: [
            'دع الاستنتاج يتولّى الأنواع الأولية، وحدّد النوع عند البدء بـ `null` والمصفوفات الفارغة.',
            'مراجع DOM تُكتب `useRef<HTMLXElement>(null)` وتحتاج `?.`.',
            'نمّط اتحاد الإجراءات فتصبح المُختزِلات ذاتية الفحص.',
            'التحويل بـ `as` يُخفي الأخطاء ولا يصلحها.',
          ],
        },
      },
    ],
  },

  {
    id: 'typescript-with-react/typing-events',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'Event types look intimidating because they are generic over the element. In practice you need about five of them, and there is a trick that saves you from remembering any.',
          ar: 'تبدو أنواع الأحداث مخيفة لأنها عامة بحسب العنصر. لكنك عمليًا تحتاج خمسة منها تقريبًا، وهناك حيلة تُغنيك عن حفظ أيٍّ منها.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// inline handlers are typed for you — hover to see what you get
<input onChange={(e) => setValue(e.target.value)} />

// a named handler must say what it receives
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log(e.currentTarget.name);
}

function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Enter') submit();
}`,
      },
      {
        type: 'callout',
        tone: 'tip',
        title: { en: 'The trick: never memorise', ar: 'الحيلة: لا تحفظ شيئًا' },
        body: {
          en: 'Write the handler inline first, hover over the parameter in your editor, and copy the type it shows. It is always correct, and it takes three seconds.',
          ar: 'اكتب المعالج داخل الوسم أولًا، ثم مرّر المؤشّر فوق المعامل في المحرّر وانسخ النوع الظاهر. فهو صحيح دائمًا ولا يستغرق سوى ثلاث ثوانٍ.',
        },
      },
      {
        type: 'text',
        text: {
          en: 'One distinction matters: `e.target` is whatever the event started on and may be any element, while `e.currentTarget` is the element your handler is attached to — so it carries the precise type.',
          ar: 'وهناك تمييز مهم: `e.target` هو ما بدأ عليه الحدث وقد يكون أي عنصر، أما `e.currentTarget` فهو العنصر المرتبط بمعالجك — ولذلك يحمل النوع الدقيق.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `type ListProps = {
  onSelect: (id: number) => void;              // your own event, your own shape
  onClose?: () => void;
};

// forwarding a native handler type
type Props = { onChange: React.ChangeEventHandler<HTMLSelectElement> };`,
      },
      {
        type: 'quiz',
        question: {
          en: 'Inside a `<form>` submit handler, which property is guaranteed to be the form element?',
          ar: 'داخل معالج إرسال `<form>`، أي خاصية مضمونة أن تكون عنصر النموذج؟',
        },
        options: [
          { text: { en: '`e.currentTarget`', ar: '`e.currentTarget`' }, correct: true },
          { text: { en: '`e.target`', ar: '`e.target`' } },
          { text: { en: '`e.srcElement`', ar: '`e.srcElement`' } },
          { text: { en: 'Both are identical in React.', ar: 'كلاهما متطابق في رياكت.' } },
        ],
        explain: {
          en: '`e.target` is where the event originated — often the submit button. `e.currentTarget` is where the handler is attached, so `new FormData(e.currentTarget)` always works.',
          ar: '`e.target` هو منشأ الحدث — وغالبًا زر الإرسال. أما `e.currentTarget` فهو موضع ارتباط المعالج، ولذلك يعمل `new FormData(e.currentTarget)` دائمًا.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'Inline handlers are inferred; named handlers need an explicit type.',
            '`ChangeEvent`, `FormEvent`, `MouseEvent`, `KeyboardEvent` cover almost everything.',
            'Hover the inline version and copy the type.',
            '`currentTarget` carries the precise element type; `target` does not.',
          ],
          ar: [
            'المعالجات داخل الوسوم يُستنتج نوعها، والمسمّاة تحتاج نوعًا صريحًا.',
            '`ChangeEvent` و `FormEvent` و `MouseEvent` و `KeyboardEvent` تغطّي كل شيء تقريبًا.',
            'مرّر المؤشّر فوق النسخة الداخلية وانسخ النوع.',
            '`currentTarget` يحمل النوع الدقيق للعنصر بخلاف `target`.',
          ],
        },
      },
    ],
  },

  {
    id: 'typescript-with-react/generic-components',
    blocks: [
      {
        type: 'text',
        lead: true,
        text: {
          en: 'A generic component works with any kind of item while keeping full type safety for each caller. One `<List />` can render users, invoices and messages — and each usage still autocompletes its own fields.',
          ar: 'المكوّن العام يعمل مع أي نوع من العناصر مع الحفاظ على أمان الأنواع لكل مستدعٍ. فمكوّن `<List />` واحد يعرض المستخدمين والفواتير والرسائل — ويبقى لكل استخدام إكماله التلقائي لحقوله.',
        },
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyOf: (item: T) => string | number;
};

function List<T>({ items, renderItem, keyOf }: ListProps<T>) {
  return <ul>{items.map((item) => <li key={keyOf(item)}>{renderItem(item)}</li>)}</ul>;
}

// T is inferred as User — item.name autocompletes inside renderItem
<List
  items={users}
  keyOf={(u) => u.id}
  renderItem={(u) => <strong>{u.name}</strong>}
/>`,
      },
      {
        type: 'heading',
        text: { en: 'Utility types worth knowing', ar: 'أنواع مساعدة تستحق المعرفة' },
      },
      {
        type: 'table',
        head: { en: ['Type', 'What it gives you'], ar: ['النوع', 'ما يمنحك'] },
        rows: [
          { en: ['`Partial<T>`', 'every property optional — patch objects, drafts'], ar: ['`Partial<T>`', 'كل خاصية اختيارية — للتحديثات الجزئية والمسودّات'] },
          { en: ['`Pick<T, K>` / `Omit<T, K>`', 'a subset of a type — perfect for props'], ar: ['`Pick<T, K>` / `Omit<T, K>`', 'مجموعة جزئية من النوع — مثالية للخصائص'] },
          { en: ['`Record<K, V>`', 'a dictionary: `Record<Status, string>`'], ar: ['`Record<K, V>`', 'قاموس: `Record<Status, string>`'] },
          { en: ['`ReturnType<typeof fn>`', 'the type a function returns, without writing it twice'], ar: ['`ReturnType<typeof fn>`', 'نوع ما تُعيده دالة دون كتابته مرتين'] },
        ],
      },
      {
        type: 'code',
        lang: 'tsx',
        code: `// derive instead of duplicating
type User = { id: number; name: string; email: string; passwordHash: string };

type PublicUser = Omit<User, 'passwordHash'>;
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
type Labels = Record<'idle' | 'loading' | 'error', string>;`,
      },
      {
        type: 'callout',
        tone: 'tip',
        body: {
          en: 'Derive types from one source of truth rather than declaring the same shape twice. When a field is added, every derived type updates for free — and the ones that must not include it stay correct.',
          ar: 'اشتقّ الأنواع من مصدر حقيقة واحد بدل تكرار الشكل نفسه. فعند إضافة حقل تتحدّث كل الأنواع المشتقّة مجانًا، وتبقى التي يجب ألّا تشمله صحيحة.',
        },
      },
      {
        type: 'quiz',
        question: {
          en: 'What does `T` in `function List<T>({ items }: { items: T[] })` actually do?',
          ar: 'ماذا يفعل `T` فعلًا في `function List<T>({ items }: { items: T[] })`؟',
        },
        options: [
          {
            text: {
              en: 'It is a placeholder filled in per call site, so each usage keeps its own item type.',
              ar: 'هو عنصر نائب يُملأ عند كل موضع استدعاء، فيحتفظ كل استخدام بنوع عناصره.',
            },
            correct: true,
          },
          { text: { en: 'It means the items can be of any type, like `any[]`.', ar: 'يعني أن العناصر من أي نوع، مثل `any[]`.' } },
          { text: { en: 'It creates a runtime check on the array contents.', ar: 'ينشئ فحصًا وقت التشغيل لمحتويات المصفوفة.' } },
          { text: { en: 'It is only needed when the component has state.', ar: 'يُحتاج فقط حين يملك المكوّن حالة.' } },
        ],
        explain: {
          en: 'Generics disappear at compile time — they add zero runtime code. Their entire job is to carry the caller’s type through the component so `renderItem` knows exactly what it received.',
          ar: 'تختفي الأنواع العامة عند التصريف — فلا تضيف أي كود وقت التشغيل. ومهمّتها كلها نقل نوع المستدعي عبر المكوّن ليعرف `renderItem` بالضبط ما استلمه.',
        },
      },
      {
        type: 'keypoints',
        items: {
          en: [
            'A generic keeps one component reusable and still fully typed.',
            'TypeScript usually infers `T` — you rarely pass it explicitly.',
            'Derive prop types with `Pick`, `Omit` and `Partial`.',
            'Generics vanish at runtime; they cost nothing in the bundle.',
          ],
          ar: [
            'النوع العام يُبقي المكوّن قابلًا لإعادة الاستخدام ومُنمَّطًا بالكامل.',
            'يستنتج تايب سكربت `T` عادةً، ونادرًا ما تمرّره صراحةً.',
            'اشتقّ أنواع الخصائص بـ `Pick` و `Omit` و `Partial`.',
            'تختفي الأنواع العامة وقت التشغيل ولا تكلّف شيئًا في الحزمة.',
          ],
        },
      },
    ],
  },
]

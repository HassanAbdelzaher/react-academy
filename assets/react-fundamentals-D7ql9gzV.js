var e=[{id:`react-fundamentals/what-react-is`,blocks:[{type:`text`,lead:!0,text:{en:`React exists to solve one problem: keeping a screen in sync with data that keeps changing. Before it, you wrote instructions — find this element, change its text, hide that one. With React you describe the result and let it work out the instructions.`,ar:`وُجدت رياكت لحلّ مشكلة واحدة: إبقاء الشاشة متزامنة مع بيانات تتغيّر باستمرار. قبلها كنت تكتب تعليمات — جد هذا العنصر، غيّر نصه، أخفِ ذاك. ومع رياكت تصف النتيجة وتترك لها استنتاج التعليمات.`}},{type:`compare`,lang:`js`,bad:{label:{en:`Imperative — how`,ar:`أمري — كيف`},code:`const el = document.getElementById('count');
el.textContent = count;
if (count > 9) {
  el.classList.add('warn');
} else {
  el.classList.remove('warn');
}`},good:{label:{en:`Declarative — what`,ar:`تصريحي — ماذا`},code:`<span className={count > 9 ? 'warn' : ''}>
  {count}
</span>`},note:{en:`On the left you must remember to undo every change. On the right there is nothing to undo — the markup always describes the current state.`,ar:`على اليسار عليك تذكّر التراجع عن كل تغيير. وعلى اليمين لا شيء لتتراجع عنه — فالوسوم تصف الحالة الحالية دائمًا.`}},{type:`heading`,text:{en:`UI = f(state)`,ar:`الواجهة = دالة(الحالة)`}},{type:`text`,text:{en:`This is the whole mental model. Your component is a function: give it the same data and it produces the same screen. Change the data and React re-runs the function and updates only what differs.`,ar:`هذا هو النموذج الذهني كله. مكوّنك دالة: أعطها البيانات نفسها فتنتج الشاشة نفسها. غيّر البيانات فتُعيد رياكت تشغيل الدالة وتحدّث ما اختلف فقط.`}},{type:`visual`,name:`state-flow`},{type:`heading`,text:{en:`What React is not`,ar:`ما ليست رياكت`}},{type:`list`,items:{en:[`It is **not a framework**. Routing, data fetching and forms come from separate libraries you choose — that is why this roadmap has so many phases.`,`It is **not a language**. Everything you write is JavaScript, which is why phase 1 exists.`,`It does **not make your app fast by itself**. It makes DOM updates cheap; the rest is your architecture (phase 15).`],ar:[`ليست **إطار عمل**. فالتوجيه وجلب البيانات والنماذج تأتي من مكتبات منفصلة تختارها — ولهذا في هذه الخارطة مراحل كثيرة.`,`ليست **لغة**. فكل ما تكتبه جافاسكربت، ولهذا وُجدت المرحلة الأولى.`,`**لا تجعل تطبيقك سريعًا وحدها**. بل تجعل تحديث DOM رخيصًا، والباقي معماريتك (المرحلة الخامسة عشرة).`]}},{type:`callout`,tone:`note`,title:{en:`Why it won`,ar:`لماذا انتشرت`},body:{en:`Components made UI **composable**: a piece of interface plus its behaviour in one file, reusable and testable. Every framework that came after copied that idea.`,ar:`جعلت المكوّنات الواجهة **قابلة للتركيب**: جزء من الواجهة مع سلوكه في ملف واحد، قابل لإعادة الاستخدام وللاختبار. وكل إطار جاء بعدها نسخ الفكرة.`}},{type:`quiz`,question:{en:`What does "declarative UI" actually change for you as a developer?`,ar:`ما الذي تغيّره «الواجهة التصريحية» فعليًا بالنسبة لك كمطوّر؟`},options:[{text:{en:`You describe what the screen should look like for the current state, and never write the steps to get there.`,ar:`تصف كيف يجب أن تبدو الشاشة للحالة الحالية، ولا تكتب خطوات الوصول إليها أبدًا.`},correct:!0},{text:{en:`The browser renders faster because there is no DOM.`,ar:`يعرض المتصفّح أسرع لأنه لا يوجد DOM.`}},{text:{en:`You no longer need JavaScript, only JSX.`,ar:`لم تعد تحتاج جافاسكربت، فقط JSX.`}},{text:{en:`State updates become synchronous.`,ar:`تصبح تحديثات الحالة متزامنة.`}}],explain:{en:`There is still a DOM and still JavaScript. What changes is responsibility: you own the description, React owns the sequence of DOM operations.`,ar:`ما زال هناك DOM وما زالت هناك جافاسكربت. ما يتغيّر هو المسؤولية: أنت تملك الوصف، ورياكت تملك تسلسل عمليات DOM.`}},{type:`keypoints`,items:{en:[`React keeps the screen in sync with changing data.`,`You describe the result; React works out the DOM operations.`,`A component is a function of its data.`,`React is a library, not a framework — the ecosystem fills the gaps.`],ar:[`تُبقي رياكت الشاشة متزامنة مع البيانات المتغيّرة.`,`أنت تصف النتيجة، ورياكت تستنتج عمليات DOM.`,`المكوّن دالة لبياناته.`,`رياكت مكتبة لا إطار عمل — والمنظومة تسدّ الفراغات.`]}}]},{id:`react-fundamentals/jsx`,blocks:[{type:`text`,lead:!0,text:{en:"JSX is the HTML-looking syntax inside your JavaScript. It is not HTML and it is not a string — it is a compact way of writing `React.createElement()` calls, and the build tool rewrites it before the browser ever sees it.",ar:"JSX هي الصياغة الشبيهة بـ HTML داخل جافاسكربت. ليست HTML وليست نصًّا — بل طريقة مختصرة لكتابة استدعاءات `React.createElement()`، وأداة البناء تحوّلها قبل أن يراها المتصفّح."}},{type:`code`,lang:`jsx`,caption:{en:`These two are the same thing. You will never write the second one by hand.`,ar:`الاثنان شيء واحد. ولن تكتب الثاني يدويًا أبدًا.`},code:`// what you write
const title = <h1 className="big">Hello</h1>;

// what the compiler produces
const title = React.createElement('h1', { className: 'big' }, 'Hello');`},{type:`callout`,tone:`note`,body:{en:`Because JSX becomes a normal JavaScript value, you can store it in a variable, put it in an array, return it from a function or pass it as a prop. That is the whole trick.`,ar:`ولأن JSX تتحوّل إلى قيمة جافاسكربت عادية، يمكنك تخزينها في متغيّر أو وضعها في مصفوفة أو إعادتها من دالة أو تمريرها كخاصية. هذه هي الحيلة كلها.`}},{type:`heading`,text:{en:`The five rules`,ar:`القواعد الخمس`}},{type:`steps`,steps:[{title:{en:`Return one root element`,ar:`أعِد عنصر جذر واحدًا`},body:{en:"A function can only return one value, so your JSX needs a single wrapper. Use a fragment `<>…</>` when you do not want an extra `div` in the DOM.",ar:"الدالة تُعيد قيمة واحدة فقط، لذا تحتاج JSX إلى غلاف واحد. استخدم الجزء `<>…</>` حين لا تريد `div` إضافيًا في DOM."}},{title:{en:`Close every tag`,ar:`أغلق كل وسم`},body:{en:"`<img>` and `<br>` are legal HTML but invalid JSX. Write `<img />` and `<br />`.",ar:"`<img>` و `<br>` صالحان في HTML لكنهما غير صالحين في JSX. اكتب `<img />` و `<br />`."}},{title:{en:`Attributes use camelCase`,ar:`الخصائص بصيغة camelCase`},body:{en:"`class` becomes `className`, `for` becomes `htmlFor`, `onclick` becomes `onClick` — because these are JavaScript object keys, and `class` is a reserved word.",ar:"`class` تصبح `className`، و `for` تصبح `htmlFor`، و `onclick` تصبح `onClick` — لأنها مفاتيح كائن جافاسكربت، و `class` كلمة محجوزة."}},{title:{en:`Curly braces escape into JavaScript`,ar:`الأقواس المعقوفة تنقلك إلى جافاسكربت`},body:{en:"Anything inside `{ }` is a JavaScript **expression**. `{user.name}`, `{2 + 2}` and `{items.map(…)}` all work; an `if` statement does not, because it is not an expression.",ar:"كل ما بين `{ }` هو **تعبير** جافاسكربت. `{user.name}` و `{2 + 2}` و `{items.map(…)}` تعمل جميعها؛ أما جملة `if` فلا، لأنها ليست تعبيرًا."}},{title:{en:`Components start with a capital letter`,ar:`أسماء المكوّنات تبدأ بحرف كبير`},body:{en:"`<button>` is a DOM tag; `<Button>` is your component. Lowercase means React looks for a real HTML element and renders nothing useful.",ar:"`<button>` وسم DOM، أما `<Button>` فهو مكوّنك. الحرف الصغير يجعل رياكت تبحث عن عنصر HTML حقيقي فلا تعرض شيئًا مفيدًا."}}]},{type:`code`,lang:`tsx`,filename:`Card.tsx`,highlight:[3,5,7],code:`function Card({ user }) {
  return (
    <>
      <img className="avatar" src={user.avatar} alt="" />
      <h2 className="name">{user.name}</h2>
      <p>Joined {new Date(user.joinedAt).getFullYear()}</p>
      {user.isAdmin && <span className="badge">admin</span>}
    </>
  );
}`},{type:`heading`,text:{en:`Two curly-brace gotchas`,ar:`مزلقان في الأقواس المعقوفة`}},{type:`compare`,lang:`jsx`,bad:{label:{en:`Renders "0"`,ar:`يعرض «0»`},code:`{items.length && <List items={items} />}

// when the array is empty this is
// 0 && … → 0, and React prints 0`},good:{label:{en:`Renders nothing`,ar:`لا يعرض شيئًا`},code:`{items.length > 0 && <List items={items} />}

// a real boolean — false renders
// nothing at all`},note:{en:"React skips `false`, `null` and `undefined`, but it happily prints the number `0`. Always compare, never rely on a truthy number.",ar:"تتجاهل رياكت `false` و `null` و `undefined`، لكنها تطبع الرقم `0` بلا تردّد. قارن دائمًا ولا تعتمد على رقم صادق."}},{type:`code`,lang:`jsx`,caption:{en:`Double braces are not special syntax — it is an object literal inside the expression slot.`,ar:`الأقواس المزدوجة ليست صياغة خاصة — بل كائن داخل مكان التعبير.`},code:`<div style={{ padding: 12, backgroundColor: 'teal' }} />
//        ↑ JSX expression
//         ↑ plain JS object, camelCase CSS keys`},{type:`callout`,tone:`warn`,body:{en:"A comment inside JSX must also live in an expression slot: `{/* like this */}`. A bare `// comment` will render as text.",ar:"التعليق داخل JSX يجب أن يكون في مكان تعبير أيضًا: `{/* هكذا */}`. أما `// تعليق` المجرّد فسيظهر كنص."}},{type:`quiz`,question:{en:"Why does `{count === 0 ? <Empty /> : <List />}` work inside JSX, while an `if` statement does not?",ar:"لماذا يعمل `{count === 0 ? <Empty /> : <List />}` داخل JSX بينما لا تعمل جملة `if`؟"},options:[{text:{en:"Because curly braces accept expressions, and a ternary is an expression while `if` is a statement.",ar:"لأن الأقواس المعقوفة تقبل التعابير، والعامل الثلاثي تعبير بينما `if` جملة."},correct:!0},{text:{en:"Because React removed support for `if` in version 19.",ar:"لأن رياكت أزالت دعم `if` في الإصدار 19."}},{text:{en:"Because `if` is too slow to run during rendering.",ar:"لأن `if` بطيئة أثناء العرض."}},{text:{en:"Because ternaries are compiled but `if` is not.",ar:"لأن العامل الثلاثي يُصرَّف بينما `if` لا."}}],explain:{en:"JSX curly braces hold a value. A ternary evaluates to a value; an `if` block does not evaluate to anything. When the logic gets long, run the `if` **above** the `return` and store the result in a variable.",ar:"أقواس JSX تحمل قيمة. العامل الثلاثي ينتج قيمة، أما كتلة `if` فلا تنتج شيئًا. وحين يطول المنطق، نفّذ `if` **قبل** `return` واحفظ النتيجة في متغيّر."}},{type:`keypoints`,items:{en:[`JSX compiles to function calls — it is a value you can store and pass around.`,`One root element, every tag closed, camelCase attributes.`,"`{ }` holds an expression, never a statement.","`0 && <X />` prints `0` — compare with `> 0` instead.",`Capitalised tags are components; lowercase tags are DOM elements.`],ar:[`تُصرَّف JSX إلى استدعاءات دوال — فهي قيمة يمكن تخزينها وتمريرها.`,`عنصر جذر واحد، وكل وسم مغلق، وخصائص بصيغة camelCase.`,"`{ }` تحمل تعبيرًا لا جملة.","`0 && <X />` يطبع `0` — قارن بـ `> 0` بدلًا من ذلك.",`الوسوم بحرف كبير مكوّنات، وبحرف صغير عناصر DOM.`]}}]},{id:`react-fundamentals/components-and-composition`,blocks:[{type:`text`,lead:!0,text:{en:`A component is a function that returns JSX. That is the entire definition. Everything else — reuse, testing, teams working in parallel — comes from how you combine them.`,ar:`المكوّن دالة تُعيد JSX. هذا هو التعريف كاملًا. وكل ما عداه — إعادة الاستخدام والاختبار وعمل الفرق بالتوازي — يأتي من طريقة تركيبك لها.`}},{type:`code`,lang:`tsx`,filename:`App.tsx`,code:`function Avatar({ src }) {
  return <img className="avatar" src={src} alt="" />;
}

function UserRow({ user }) {
  return (
    <div className="row">
      <Avatar src={user.avatar} />
      <span>{user.name}</span>
    </div>
  );
}

function UserList({ users }) {
  return users.map((u) => <UserRow key={u.id} user={u} />);
}`},{type:`callout`,tone:`tip`,title:{en:`How small is too small?`,ar:`ما حدّ الصِّغَر؟`},body:{en:`Split when a piece is **reused**, when it has **its own state**, or when the parent has stopped fitting on one screen. Splitting for its own sake just adds files to jump between.`,ar:`قسّم حين يكون الجزء **معادًا استخدامه**، أو حين تكون له **حالته الخاصة**، أو حين يتوقف الأب عن الظهور في شاشة واحدة. أما التقسيم لمجرّد التقسيم فيزيد الملفات التي تتنقّل بينها.`}},{type:`heading`,text:{en:`Composition beats configuration`,ar:`التركيب يتفوّق على الإعدادات`}},{type:`compare`,lang:`tsx`,bad:{label:{en:`A prop for every case`,ar:`خاصية لكل حالة`},code:`<Card
  title="Sales"
  showFooter
  footerText="Updated"
  hasIcon
  iconName="chart"
  isCompact
/>`},good:{label:{en:`Pass the content in`,ar:`مرّر المحتوى نفسه`},code:`<Card>
  <Card.Header icon={<Chart />}>Sales</Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer>Updated</Card.Footer>
</Card>`},note:{en:`The second version never needs a new prop when a designer invents a new layout. This idea returns in full in phase 5.`,ar:`النسخة الثانية لا تحتاج خاصية جديدة كلما ابتكر المصمّم تخطيطًا جديدًا. وتعود هذه الفكرة بالتفصيل في المرحلة الخامسة.`}},{type:`text`,text:{en:"Two rules keep components predictable: **never define a component inside another component** (it gets a new identity on every render and loses its state), and **never call a component as a function** — write `<Row />`, not `Row()`.",ar:"قاعدتان تُبقيان المكوّنات متوقّعة: **لا تعرّف مكوّنًا داخل مكوّن آخر** (فسيحصل على هوية جديدة في كل عرض ويفقد حالته)، و**لا تستدعِ مكوّنًا كدالة** — اكتب `<Row />` لا `Row()`."}},{type:`quiz`,question:{en:"Why does defining `function Row() {…}` inside `function Table() {…}` break things?",ar:"لماذا يسبّب تعريف `function Row() {…}` داخل `function Table() {…}` مشاكل؟"},options:[{text:{en:`Every render of Table creates a brand-new Row type, so React unmounts the old one and Row loses its state and DOM.`,ar:`كل عرض لـ Table ينشئ نوع Row جديدًا، فتزيل رياكت القديم ويفقد Row حالته وعناصره.`},correct:!0},{text:{en:`Nested functions are not allowed in JavaScript.`,ar:`الدوال المتداخلة غير مسموحة في جافاسكربت.`}},{text:{en:`It only breaks in production builds.`,ar:`يتعطّل في بناء الإنتاج فقط.`}},{text:{en:`It is fine — this is the recommended pattern.`,ar:`لا مشكلة — فهذا النمط الموصى به.`}}],explain:{en:`React identifies a component by its function reference. A new reference each render means "a different component", so state, focus and scroll position are thrown away.`,ar:`تُعرّف رياكت المكوّن بمرجع دالته. ومرجع جديد في كل عرض يعني «مكوّنًا مختلفًا»، فتُفقد الحالة والتركيز وموضع التمرير.`}},{type:`keypoints`,items:{en:[`A component is a function returning JSX, named with a capital letter.`,`Split for reuse, state or size — not for symmetry.`,`Prefer passing content over adding boolean props.`,`Never declare a component inside another component.`],ar:[`المكوّن دالة تُعيد JSX ويبدأ اسمها بحرف كبير.`,`قسّم لإعادة الاستخدام أو الحالة أو الحجم — لا للتناظر.`,`فضّل تمرير المحتوى على إضافة خصائص منطقية.`,`لا تعرّف مكوّنًا داخل مكوّن آخر أبدًا.`]}}]},{id:`react-fundamentals/props-and-children`,blocks:[{type:`text`,lead:!0,text:{en:`Props are the arguments of a component. Data flows **down** the tree, one direction only, which is what makes a React app traceable: to find where a value came from, you walk upward.`,ar:`الخصائص هي وسائط المكوّن. تتدفّق البيانات **للأسفل** في الشجرة باتجاه واحد فقط، وهذا ما يجعل تطبيق رياكت قابلًا للتتبّع: لتعرف من أين جاءت قيمة، تصعد للأعلى.`}},{type:`code`,lang:`tsx`,code:`function Alert({ tone = 'info', title, children, onDismiss }) {
  return (
    <div className={\`alert alert--\${tone}\`}>
      <strong>{title}</strong>
      <div>{children}</div>
      {onDismiss && <button onClick={onDismiss}>×</button>}
    </div>
  );
}

<Alert tone="error" title="Upload failed" onDismiss={close}>
  The file is larger than 5&nbsp;MB.   {/* ← this is children */}
</Alert>`},{type:`list`,items:{en:[`Props are **read-only**. A component never writes to its own props — that is what state is for.`,"`children` is just a prop with special syntax: whatever you put between the tags.",`Anything can be a prop: strings, objects, functions, and even other JSX.`,`Passing a function down is how a child talks back to its parent.`],ar:[`الخصائص **للقراءة فقط**. لا يكتب المكوّن في خصائصه أبدًا — فهذه وظيفة الحالة.`,"`children` مجرّد خاصية بصياغة خاصة: كل ما تضعه بين الوسمين.",`أي شيء يصلح كخاصية: نصوص وكائنات ودوال وحتى JSX أخرى.`,`تمرير دالة للأسفل هو كيف يردّ الابن على أبيه.`]}},{type:`callout`,tone:`warn`,title:{en:`Prop drilling`,ar:`تمرير الخصائص المتسلسل`},body:{en:"Threading the same prop through four components that do not use it is a smell. Two cures exist: pass JSX as `children` so the data never has to travel, or use context (phase 4).",ar:"تمرير الخاصية نفسها عبر أربعة مكوّنات لا تستخدمها رائحة كريهة. وللعلاج طريقان: مرّر JSX كـ `children` كي لا تسافر البيانات أصلًا، أو استخدم context (المرحلة الرابعة)."}},{type:`playground`,caption:{en:`Change the props on the two Alert elements and watch each instance update independently.`,ar:`غيّر خصائص عنصرَي Alert وراقب تحديث كل نسخة بشكل مستقلّ.`},code:`function Alert({ tone = 'info', title, children }) {
  const colors = { info: '#4f8cff', error: '#fb7185', ok: '#3fca86' };
  return (
    <div style={{
      border: \`1px solid \${colors[tone]}\`,
      borderRadius: 10,
      padding: 10,
      marginBottom: 8,
    }}>
      <strong style={{ color: colors[tone] }}>{title}</strong>
      <div style={{ fontSize: 14, opacity: 0.8 }}>{children}</div>
    </div>
  );
}

render(
  <div>
    <Alert tone="ok" title="Saved">Your changes are live.</Alert>
    <Alert tone="error" title="Upload failed">The file is too large.</Alert>
  </div>
);`},{type:`quiz`,question:{en:`A child needs to tell its parent that a row was selected. What do you pass?`,ar:`يحتاج الابن أن يخبر أباه بأن صفًّا قد اختير. ماذا تمرّر؟`},options:[{text:{en:"A function prop such as `onSelect`, which the child calls.",ar:"خاصية دالة مثل `onSelect` يستدعيها الابن."},correct:!0},{text:{en:`The parent’s state variable, which the child assigns to.`,ar:`متغيّر حالة الأب ليكتب فيه الابن.`}},{text:{en:`A global variable both can read.`,ar:`متغيّر عام يقرأه الاثنان.`}},{text:{en:`Nothing — the parent can read the child’s state.`,ar:`لا شيء — فالأب يقرأ حالة الابن.`}}],explain:{en:`Data goes down as props, events come back up as function calls. The parent owns the state and decides what to do; the child only reports what happened.`,ar:`تنزل البيانات كخصائص، وتصعد الأحداث كاستدعاءات دوال. الأب يملك الحالة ويقرّر ما يفعل، والابن يبلّغ فقط بما حدث.`}},{type:`keypoints`,items:{en:[`Props flow down; events flow up through function props.`,`Props are read-only inside the component that receives them.`,"`children` lets a component wrap content it knows nothing about.",`Deep prop drilling is a signal to restructure, not to push harder.`],ar:[`تنزل الخصائص وتصعد الأحداث عبر خصائص من نوع دالة.`,`الخصائص للقراءة فقط داخل المكوّن الذي يستقبلها.`,"`children` تتيح للمكوّن تغليف محتوى لا يعرف عنه شيئًا.",`التمرير العميق إشارة لإعادة الهيكلة لا للاستمرار.`]}}]},{id:`react-fundamentals/lists-and-keys`,blocks:[{type:`text`,lead:!0,text:{en:"Rendering a list is just `.map()`. The interesting part is the `key`, which is how React tells the items apart between two renders.",ar:"عرض قائمة هو مجرّد `.map()`. والجزء المهم هو `key`، فهي كيف تميّز رياكت العناصر بين عرضين."}},{type:`code`,lang:`tsx`,highlight:[4],code:`function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.text}</li>
      ))}
    </ul>
  );
}`},{type:`heading`,text:{en:`Why index-as-key breaks`,ar:`لماذا يفشل استخدام الفهرس كمفتاح`}},{type:`steps`,steps:[{title:{en:"You render three inputs with `key={index}`",ar:"تعرض ثلاثة حقول بـ `key={index}`"},body:{en:`Keys are 0, 1, 2. The user types "hello" into the second one. That text lives in the DOM, not in your array.`,ar:`المفاتيح 0 و1 و2. يكتب المستخدم «hello» في الثاني. وهذا النص يعيش في DOM لا في مصفوفتك.`}},{title:{en:`You delete the first item`,ar:`تحذف العنصر الأول`},body:{en:`The array shifts. The item that was at index 1 is now at index 0.`,ar:`تنزاح المصفوفة. فالعنصر الذي كان عند الفهرس 1 صار عند 0.`}},{title:{en:`React compares keys, not contents`,ar:`رياكت تقارن المفاتيح لا المحتويات`},body:{en:`It sees key 0 in both renders and concludes "same element, different props" — so it keeps the DOM node and its typed value, which now sits next to the wrong data.`,ar:`ترى المفتاح 0 في العرضين وتستنتج «العنصر نفسه بخصائص مختلفة» — فتحتفظ بعقدة DOM وقيمتها المكتوبة، وقد صارت الآن بجوار بيانات خاطئة.`}}]},{type:`callout`,tone:`tip`,body:{en:`A key must be **stable, unique among siblings, and derived from the data** — a database id, a slug, a generated uuid. Index is acceptable only for a list that never reorders, filters or deletes.`,ar:`يجب أن يكون المفتاح **ثابتًا وفريدًا بين الإخوة ومشتقًّا من البيانات** — معرّف قاعدة بيانات أو slug أو uuid مولّد. والفهرس مقبول فقط لقائمة لا تُرتَّب ولا تُصفَّى ولا يُحذف منها.`}},{type:`code`,lang:`tsx`,code:`// ✅ stable id from the data
{users.map((u) => <Row key={u.id} user={u} />)}

// 🚫 do not generate a key while rendering — it changes every time
{users.map((u) => <Row key={Math.random()} user={u} />)}

// ✅ fragments can take a key too
{rows.map((r) => (
  <Fragment key={r.id}>
    <dt>{r.term}</dt>
    <dd>{r.definition}</dd>
  </Fragment>
))}`},{type:`quiz`,question:{en:`Your list renders correctly but checkboxes end up ticked on the wrong rows after a delete. What is the likely cause?`,ar:`قائمتك تُعرض صحيحة لكن مربّعات الاختيار تظهر مؤشّرة على صفوف خاطئة بعد الحذف. ما السبب المرجّح؟`},options:[{text:{en:`The list uses the array index as its key.`,ar:`القائمة تستخدم فهرس المصفوفة كمفتاح.`},correct:!0},{text:{en:"The state update was not wrapped in `useEffect`.",ar:"لم يُغلَّف تحديث الحالة بـ `useEffect`."}},{text:{en:"React needs `key` on the `<ul>` as well.",ar:"تحتاج رياكت `key` على `<ul>` أيضًا."}},{text:{en:`The array must be sorted before rendering.`,ar:`يجب ترتيب المصفوفة قبل العرض.`}}],explain:{en:`DOM state that React does not own — checked boxes, typed text, focus, scroll — is preserved per key. Shift the indices and that state stays behind on the wrong row.`,ar:`حالة DOM التي لا تملكها رياكت — مربّعات مؤشّرة ونصوص مكتوبة وتركيز وتمرير — تُحفظ لكل مفتاح. وبانزياح الفهارس تبقى تلك الحالة على الصف الخاطئ.`}},{type:`keypoints`,items:{en:[`Keys identify siblings between renders — they are not shown anywhere.`,"Use a stable id from your data, never `Math.random()`.",`Index keys corrupt DOM state as soon as the list reorders or shrinks.`,`Keys only need to be unique among siblings, not globally.`],ar:[`المفاتيح تُعرّف الإخوة بين عمليات العرض — ولا تُعرض في أي مكان.`,"استخدم معرّفًا ثابتًا من بياناتك، ولا تستخدم `Math.random()` أبدًا.",`مفاتيح الفهرس تفسد حالة DOM بمجرّد إعادة ترتيب القائمة أو تقليصها.`,`يكفي أن تكون المفاتيح فريدة بين الإخوة لا على مستوى التطبيق.`]}}]},{id:`react-fundamentals/conditional-rendering`,blocks:[{type:`text`,lead:!0,text:{en:`Real screens are mostly conditions: loading, empty, error, one result, many results, logged out. Handling them deliberately is what separates a demo from a product.`,ar:`الشاشات الحقيقية شروط في معظمها: تحميل، فراغ، خطأ، نتيجة واحدة، نتائج كثيرة، غير مسجّل الدخول. والتعامل الواعي معها هو ما يفصل العرض التجريبي عن المنتج.`}},{type:`code`,lang:`tsx`,code:`function Results({ status, items, error }) {
  if (status === 'loading') return <Skeleton />;
  if (status === 'error') return <ErrorBox message={error} />;
  if (items.length === 0) return <Empty />;

  return (
    <ul>
      {items.map((i) => <li key={i.id}>{i.title}</li>)}
    </ul>
  );
}`,caption:{en:`Early returns keep each case flat and readable — no nesting, no ternary pyramid.`,ar:`الإرجاع المبكر يُبقي كل حالة مسطّحة ومقروءة — بلا تداخل ولا هرم من العوامل الثلاثية.`}},{type:`table`,head:{en:[`Situation`,`Reach for`],ar:[`الحالة`,`استخدم`]},rows:[{en:[`Show something or nothing`,"`{cond && <X />}` — with a real boolean"],ar:[`إظهار شيء أو لا شيء`,"`{cond && <X />}` — مع قيمة منطقية حقيقية"]},{en:[`Choose between two`,"`{cond ? <A /> : <B />}`"],ar:[`الاختيار بين اثنين`,"`{cond ? <A /> : <B />}`"]},{en:[`Three or more branches`,"Early `return`s or a lookup object"],ar:[`ثلاثة فروع أو أكثر`,`إرجاع مبكر أو كائن بحث`]},{en:[`Keep the element but change its look`,"A conditional `className`, not two elements"],ar:[`إبقاء العنصر مع تغيير مظهره`,"`className` شرطي لا عنصران"]}]},{type:`callout`,tone:`danger`,body:{en:"Rendering two different components for the same slot resets state. `{isEditing ? <Input /> : <Input readOnly />}` throws away what the user typed — change the prop instead of swapping the element.",ar:"عرض مكوّنين مختلفين في المكان نفسه يعيد ضبط الحالة. فـ `{isEditing ? <Input /> : <Input readOnly />}` يمحو ما كتبه المستخدم — غيّر الخاصية بدل تبديل العنصر."}},{type:`quiz`,question:{en:`Which pattern preserves what the user typed while toggling between edit and view mode?`,ar:`أي نمط يحافظ على ما كتبه المستخدم أثناء التبديل بين وضعَي التحرير والعرض؟`},options:[{text:{en:"`<input readOnly={!isEditing} value={value} />`",ar:"`<input readOnly={!isEditing} value={value} />`"},correct:!0},{text:{en:"`{isEditing ? <input /> : <p>{value}</p>}`",ar:"`{isEditing ? <input /> : <p>{value}</p>}`"}},{text:{en:"`{isEditing && <input />}{!isEditing && <input />}`",ar:"`{isEditing && <input />}{!isEditing && <input />}`"}},{text:{en:`All of them behave the same.`,ar:`جميعها تتصرّف بالطريقة نفسها.`}}],explain:{en:`React keeps a DOM node alive as long as the same component type stays in the same position. Changing a prop keeps the node; swapping element types destroys it along with its uncontrolled value, focus and scroll.`,ar:`تُبقي رياكت عقدة DOM حيّة ما دام نوع المكوّن نفسه في الموضع نفسه. تغيير خاصية يُبقي العقدة، أما تبديل نوع العنصر فيدمّرها مع قيمتها غير المتحكَّم بها وتركيزها وتمريرها.`}},{type:`keypoints`,items:{en:[`Handle loading, error and empty as first-class cases, not afterthoughts.`,`Early returns beat nested ternaries once there are three branches.`,`Change props rather than swapping element types, to keep state alive.`],ar:[`تعامل مع التحميل والخطأ والفراغ كحالات أساسية لا كأفكار لاحقة.`,`الإرجاع المبكر أفضل من العوامل الثلاثية المتداخلة عند ثلاثة فروع.`,`غيّر الخصائص بدل تبديل أنواع العناصر للحفاظ على الحالة.`]}}]},{id:`react-fundamentals/handling-events`,blocks:[{type:`text`,lead:!0,text:{en:`React event handlers are ordinary functions attached with camelCase props. The one rule that trips everyone up: you pass the function, you do not call it.`,ar:`معالجات الأحداث في رياكت دوال عادية تُربط بخصائص بصيغة camelCase. والقاعدة الوحيدة التي تُوقع الجميع: تمرّر الدالة ولا تستدعيها.`}},{type:`compare`,lang:`tsx`,bad:{label:{en:`Runs during render`,ar:`تعمل أثناء العرض`},code:`<button onClick={remove(id)}>
  delete
</button>
// remove(id) is called immediately
// and its return value is the handler`},good:{label:{en:`Runs on click`,ar:`تعمل عند النقر`},code:`<button onClick={() => remove(id)}>
  delete
</button>

<button onClick={remove}>delete</button>`},note:{en:`If a handler fires by itself on page load — sometimes in an infinite loop — this is why.`,ar:`إذا عمل المعالج وحده عند تحميل الصفحة — وربما في حلقة لا نهائية — فهذا هو السبب.`}},{type:`code`,lang:`tsx`,code:`function SearchForm({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();          // stop the browser reloading the page
    const data = new FormData(e.currentTarget);
    onSearch(data.get('q'));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="q" />
      <button type="submit">Search</button>
    </form>
  );
}`},{type:`list`,items:{en:[`The event object is a **synthetic event** — a thin cross-browser wrapper with the same API you already know.`,"`e.preventDefault()` stops the default browser behaviour: form submits, link navigation.","`e.stopPropagation()` stops the event bubbling to parent handlers — use it sparingly.","Handlers can be defined inline or above the `return`; both are fine, and the compiler removes the performance argument (phase 12)."],ar:[`كائن الحدث **حدث اصطناعي** — غلاف رفيع متوافق مع المتصفّحات بالواجهة التي تعرفها.`,"`e.preventDefault()` توقف سلوك المتصفّح الافتراضي: إرسال النموذج والانتقال بالرابط.","`e.stopPropagation()` توقف تصاعد الحدث إلى معالجات الأب — استخدمها بحذر.","يمكن تعريف المعالجات داخل الوسم أو قبل `return`، وكلاهما مقبول، والمُصرِّف يُلغي حجة الأداء (المرحلة الثانية عشرة)."]}},{type:`playground`,caption:{en:`The first button passes a function; the second calls one immediately. Open the console and click both.`,ar:`الزر الأول يمرّر دالة، والثاني يستدعيها فورًا. افتح الطرفية وانقر كليهما.`},code:`function Demo() {
  const [log, setLog] = useState([]);
  const add = (what) => setLog((l) => [...l, what]);

  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => add('clicked')}>correct</button>
        <button onClick={() => add('cleared')}>another</button>
        <button onClick={() => setLog([])}>clear</button>
      </div>
      <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 14 }}>
        {log.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
    </div>
  );
}

render(<Demo />);`},{type:`quiz`,question:{en:`A form reloads the whole page whenever it is submitted. What is missing?`,ar:`يُعيد النموذج تحميل الصفحة كاملة عند كل إرسال. ما الناقص؟`},options:[{text:{en:"`e.preventDefault()` inside the submit handler.",ar:"`e.preventDefault()` داخل معالج الإرسال."},correct:!0},{text:{en:"`e.stopPropagation()` inside the submit handler.",ar:"`e.stopPropagation()` داخل معالج الإرسال."}},{text:{en:"A `key` prop on the form.",ar:"خاصية `key` على النموذج."}},{text:{en:'The button must be `type="button"`.',ar:'يجب أن يكون الزر `type="button"`.'}}],explain:{en:"Submitting a form is a native browser navigation. React does not disable it for you — you opt out with `preventDefault`, then handle the data yourself.",ar:"إرسال النموذج انتقال أصلي في المتصفّح. ولا تعطّله رياكت نيابةً عنك — بل تنسحب منه بـ `preventDefault` ثم تتعامل مع البيانات بنفسك."}},{type:`keypoints`,items:{en:["Pass the function (`onClick={fn}`), do not call it (`onClick={fn()}`).",`Use an arrow when you need to pass arguments.`,"`preventDefault` for forms and links; `stopPropagation` rarely.",`Handlers are plain functions — no binding ceremony needed.`],ar:["مرّر الدالة (`onClick={fn}`) ولا تستدعِها (`onClick={fn()}`).",`استخدم سهمًا حين تحتاج تمرير وسائط.`,"`preventDefault` للنماذج والروابط، و `stopPropagation` نادرًا.",`المعالجات دوال عادية — بلا طقوس ربط.`]}}]}];export{e as reactFundamentals};
# React Academy

An interactive, bilingual (English / العربية) course that takes a learner from plain JavaScript to
professional React 19 — built with the stack it teaches.

**16 phases · 93 lessons · ~31 hours of material · every lesson written in both languages.**

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

| Script               | What it does                       |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Vite dev server with fast refresh  |
| `npm run build`      | Type-check, then build to `dist/`  |
| `npm run preview`    | Serve the production build locally |
| `npm run lint`       | Lint with oxlint                   |
| `npm test`           | Run the test suite once            |
| `npm run test:watch` | Re-run tests as files change       |

## What is in it

- **Roadmap → phase → lesson**, with progress saved per lesson in `localStorage`.
- **Bilingual everything.** One toggle switches all UI and content, flips the document to RTL and
  swaps to an Arabic typeface.
- **Live playground.** `react-live` runs real React in the page; edit an example and the preview
  re-renders as you type. Available standalone at `/playground` and embedded inside lessons.
- **Five animated diagrams** at `/visuals`: the one-way data loop, render → commit, reconciliation,
  the life of an Effect, and Server vs. Client Components. Each one is steppable and narrated in
  both languages.
- **Search** (`⌘K` / `Ctrl+K` / `/`) across phases and lessons, matching either language regardless
  of the current one, with Arabic text normalised for diacritics and alef variants. It opens on
  titles, summaries and tags, then deepens to the full prose of every lesson once the phase chunks
  arrive — so "race condition" or "stale closure" finds the lesson that teaches it.
- **Level exams** at `/exam`. Each of the four levels draws 10 questions at random from its own
  bank, marks them at 70% to pass, and reports a per-phase breakdown plus a full review of every
  question with the correct answer and an explanation. Retaking draws a different paper, and option
  order is shuffled per sitting, so a level cannot be passed by memorising positions. Best score
  and attempt count persist per level.
- **Dark and light themes**, applied before first paint so there is no flash.
- **Keyboard and screen-reader support** — a skip link, a focus trap in the search dialog, row and
  column headers on comparison tables, quiz verdicts announced through a live region, and
  `prefers-reduced-motion` honoured by both the CSS and the JavaScript animations.

## Layout

```text
src/
  content/
    phases.ts        the 16-phase curriculum (metadata for all 93 lessons)
    blocks.ts        the lesson block types
    lessons/         one file per phase, loaded on demand
    navigation.ts    flat lesson order, prev/next
    search.ts        pre-normalised bilingual search index
    exam/            one question bank per level, loaded on demand
  i18n/              UI strings, language provider, RTL handling
  theme/             dark / light provider
  lib/progress.ts    localStorage progress store (useSyncExternalStore)
  components/
    lesson/          block renderer, code block, quiz, sidebar
    playground/      react-live editor + preview
    visuals/         animated concept diagrams
    layout/ ui/      shell and shared UI
  pages/             routed pages
```

## Adding content

A lesson body is data, not JSX:

```ts
{
  id: 'phase-slug/lesson-slug',
  blocks: [
    { type: 'text', lead: true, text: { en: '…', ar: '…' } },
    { type: 'code', lang: 'tsx', code: '…', highlight: [3] },
    { type: 'compare', bad: { code: '…' }, good: { code: '…' } },
    { type: 'quiz', question: {…}, options: [{ text: {…}, correct: true }], explain: {…} },
    { type: 'keypoints', items: { en: [...], ar: [...] } },
  ],
}
```

Available block types: `text`, `heading`, `list`, `code`, `callout` (tip / note / warn / danger),
`compare`, `table`, `steps`, `quiz`, `keypoints`, `playground`, `visual`.

Prose supports a small inline syntax: `` `code` ``, `**bold**`, `_italic_` and `[label](url)`.

To add a phase, append one entry to `src/content/phases.ts` — the roadmap, progress totals,
navigation and search all derive from that array.

### Adding exam questions

Append to the bank file for the level in `src/content/exam/`. Each question is self-contained —
it is drawn at random, so it cannot refer to the question before it:

```ts
{
  id: 'b-js-33',                    // stable; never renumber an existing one
  phase: 'javascript-essentials',   // must belong to this file's level
  question: { en: '…', ar: '…' },
  options: [
    { text: { en: '…', ar: '…' }, correct: true },   // exactly one correct
    { text: { en: '…', ar: '…' } },
  ],
  explain: { en: '…', ar: '…' },
}
```

A level becomes sittable once its bank holds at least `QUESTIONS_PER_EXAM` questions; below that
the exam page shows it as in preparation. `npm test` enforces the rules above.

## Performance notes

The build is split so the first load stays small:

- Each phase's lessons are a separate ~20–40 kB chunk, fetched when you open the phase page.
- The playground editor (~213 kB) only loads on a page that actually uses one.
- The main chunk is ~654 kB (207 kB gzipped): React, the router, Motion, the syntax highlighter
  and the curriculum metadata.
- Opening search pulls every phase chunk (~150 kB gzipped total) so it can match lesson prose.
  That is deliberate: it happens on an explicit action, not at load, and only once per session.

## Tests

`npm test` — 174 tests, no browser, about a second. They guard the things the type system
cannot:

- **Content invariants** ([`content.test.ts`](src/content/content.test.ts)) — every declared
  lesson has a body and every body a lesson; no duplicate or misfiled ids; every `{en, ar}` pair
  filled on both sides; every bilingual list the same length in both languages; table rows matching
  their header's column count; exactly one correct answer per quiz; `highlight` line numbers inside
  the snippet; `visual` blocks naming a diagram that exists.
- **Search** ([`search.test.ts`](src/content/search.test.ts)) — ranking, the every-term-must-match
  rule, Arabic alef and diacritic normalisation, cross-language matching, and that lesson prose
  becomes searchable only after deepening and only once.
- **Navigation** ([`navigation.test.ts`](src/content/navigation.test.ts)) — flat lesson order,
  prev/next across phase boundaries, open ends, and that a phase paired with another phase's lesson
  does not resolve.
- **Progress store** ([`progress.test.ts`](src/lib/progress.test.ts)) — persistence, that clearing
  deletes rather than storing `false`, and recovery from corrupted `localStorage`.
- **Bilingual chrome** ([`strings.test.ts`](src/i18n/strings.test.ts)) — every UI key filled in
  both languages and actually carrying Arabic script, plus a scan of every component for a
  hardcoded `aria-label` or `placeholder`, which by definition cannot translate.
- **Exam banks** ([`bank.test.ts`](src/content/exam/bank.test.ts)) — unique ids, no repeated
  question, one correct answer each, no two identical options, and every question tagged with a
  phase that actually belongs to its level. Any bank with questions in it must also be at full
  size and cover every phase of its level, so a half-written bank fails rather than shipping.
- **Exam engine** ([`exam.test.ts`](src/lib/exam.test.ts)) — a paper never repeats a question,
  the correct answer does not stay in one position, an unanswered question counts as wrong, and
  the pass mark passes *at* the threshold rather than just above it.

Adding a phase or a lesson needs no new test: the content suite is generated from
`PHASES`, so new entries are checked the moment they exist.

## Deploying

`npm run build` emits a static `dist/` — any file host will serve it, with one catch. Routes like
`/phase/hooks-in-depth/useeffect` exist only in the client router, so a refresh or a shared link
asks the host for a file that is not there. Every request has to fall back to `index.html`:

- **Netlify / Cloudflare Pages** — [`public/_redirects`](public/_redirects) is copied into the
  build and handles this.
- **Vercel** — [`vercel.json`](vercel.json) rewrites all paths to `/index.html`.
- **GitHub Pages** — no rewrite support; copy `dist/index.html` to `dist/404.html` after building.
- **nginx** — `try_files $uri $uri/ /index.html;`

## Storage keys

`ra:progress:v1` (lesson completion) · `ra:lang` · `ra:theme`. Clearing them resets the site.

## Built with

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · Motion · react-live ·
prism-react-renderer

Content verified against React 19.2 and React Compiler 1.0.

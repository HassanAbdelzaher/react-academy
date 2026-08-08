# React Academy

An interactive, bilingual (English / العربية) course that takes a learner from plain JavaScript to
professional React 19 — built with the stack it teaches.

**16 phases · 93 lessons · ~31 hours of material · every lesson written in both languages.**

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Script            | What it does                       |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Vite dev server with fast refresh  |
| `npm run build`   | Type-check, then build to `dist/`  |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Lint with oxlint                   |

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
  of the current one, with Arabic text normalised for diacritics and alef variants.
- **Dark and light themes**, applied before first paint so there is no flash.

## Layout

```
src/
  content/
    phases.ts        the 16-phase curriculum (metadata for all 93 lessons)
    blocks.ts        the lesson block types
    lessons/         one file per phase, loaded on demand
    navigation.ts    flat lesson order, prev/next
    search.ts        pre-normalised bilingual search index
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

## Performance notes

The build is split so the first load stays small:

- Each phase's lessons are a separate ~20–40 kB chunk, fetched when you open the phase page.
- The playground editor (~213 kB) only loads on a page that actually uses one.
- The main chunk is ~654 kB (207 kB gzipped): React, the router, Motion, the syntax highlighter
  and the curriculum metadata.

## Storage keys

`ra:progress:v1` (lesson completion) · `ra:lang` · `ra:theme`. Clearing them resets the site.

## Built with

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · Motion · react-live ·
prism-react-renderer

Content verified against React 19.2 and React Compiler 1.0.

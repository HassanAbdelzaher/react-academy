import type { ReactNode } from 'react'

/**
 * Minimal inline formatter for lesson prose:
 *   `code`   **bold**   _italic_   [label](https://…)
 * Anything else is plain text, which keeps the content files readable.
 */
const PATTERN = /(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g

export function RichText({ children }: { children: string }) {
  const parts = children.split(PATTERN).filter(Boolean)

  return (
    <>
      {parts.map((part, i) => {
        const key = `${i}-${part.slice(0, 12)}`

        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={key}
              dir="ltr"
              className="mx-px rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-400"
            >
              {part.slice(1, -1)}
            </code>
          )
        }

        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={key} className="font-bold text-content">
              {part.slice(2, -2)}
            </strong>
          )
        }

        if (part.startsWith('_') && part.endsWith('_')) {
          return (
            <em key={key} className="italic">
              {part.slice(1, -1)}
            </em>
          )
        }

        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
        if (link) {
          return (
            <a
              key={key}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-400 underline decoration-brand-400/40 underline-offset-2 hover:decoration-brand-400"
            >
              {link[1]}
            </a>
          )
        }

        return <span key={key}>{part as ReactNode}</span>
      })}
    </>
  )
}

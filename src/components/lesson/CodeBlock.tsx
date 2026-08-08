import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { useI18n } from '@/i18n/context'
import { IconCheck } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import type { CodeBlock as CodeBlockData } from '@/content/blocks'

const codeTheme = {
  ...themes.nightOwl,
  plain: { ...themes.nightOwl.plain, backgroundColor: 'transparent' },
}

interface Props {
  code: string
  lang?: CodeBlockData['lang']
  filename?: string
  highlight?: number[]
  /** Compact styling used inside comparison columns. */
  dense?: boolean
  className?: string
}

export function CodeBlock({ code, lang = 'tsx', filename, highlight, dense, className }: Props) {
  const { L } = useI18n()
  const [copied, setCopied] = useState(false)
  const source = code.replace(/\n+$/, '')
  const marked = new Set(highlight ?? [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <div
      dir="ltr"
      className={cn(
        'group relative overflow-hidden rounded-xl border border-line',
        className,
      )}
      style={{ background: 'var(--code-bg)' }}
    >
      {filename && (
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ms-1.5 font-mono text-xs text-[#7d8ba5]">{filename}</span>
        </div>
      )}

      <button
        type="button"
        onClick={copy}
        className="absolute end-2 top-2 z-10 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.68rem] text-[#9fb0c9] opacity-0 transition-opacity hover:bg-white/10 focus-visible:opacity-100 group-hover:opacity-100"
        style={filename ? { top: '2.6rem' } : undefined}
      >
        {copied ? (
          <span className="flex items-center gap-1 text-[#3fca86]">
            <IconCheck width={11} height={11} /> {L({ en: 'copied', ar: 'نُسخ' })}
          </span>
        ) : (
          L({ en: 'copy', ar: 'نسخ' })
        )}
      </button>

      <Highlight theme={codeTheme} code={source} language={lang}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              'overflow-x-auto font-mono leading-relaxed',
              dense ? 'p-3 text-[0.74rem]' : 'p-4 text-[0.8rem]',
            )}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line })
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={cn(
                    lineProps.className,
                    'px-1',
                    marked.has(i + 1) &&
                      'border-s-2 border-brand-400 bg-brand-400/10 -mx-1 ps-2',
                  )}
                >
                  {line.map((token, k) => (
                    <span key={k} {...getTokenProps({ token })} />
                  ))}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

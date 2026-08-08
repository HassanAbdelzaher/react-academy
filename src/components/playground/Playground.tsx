import { useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { themes } from 'prism-react-renderer'
import * as React from 'react'
import { useI18n } from '@/i18n/context'
import { IconCode, IconSparkles } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

/** Everything an example is allowed to reference. */
const SCOPE = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useMemo: React.useMemo,
  useCallback: React.useCallback,
  useRef: React.useRef,
  useReducer: React.useReducer,
  useId: React.useId,
  useTransition: React.useTransition,
  useOptimistic: React.useOptimistic,
  useDeferredValue: React.useDeferredValue,
}

const editorTheme = {
  ...themes.nightOwl,
  plain: { ...themes.nightOwl.plain, backgroundColor: 'transparent' },
}

interface Props {
  code: string
  /** Preview sits under the editor instead of beside it. */
  stacked?: boolean
  /** Examples declare components and finish with `render(<App />)`. */
  noInline?: boolean
  className?: string
}

export function Playground({ code, stacked = false, noInline = true, className }: Props) {
  const { L } = useI18n()
  const [source, setSource] = useState(code.trim())
  const dirty = source !== code.trim()

  return (
    <LiveProvider code={source} scope={SCOPE} theme={editorTheme} noInline={noInline}>
      <div
        className={cn(
          'overflow-hidden rounded-2xl border border-line bg-surface',
          className,
        )}
      >
        <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-2">
          <IconSparkles width={14} height={14} className="text-brand-400" />
          <span className="text-xs font-bold text-content-muted">
            {L({ en: 'Editable — change the code and watch', ar: 'قابل للتعديل — غيّر الكود وراقب' })}
          </span>
          {dirty && (
            <button
              type="button"
              onClick={() => setSource(code.trim())}
              className="ms-auto rounded-full border border-line px-2.5 py-1 text-[0.68rem] font-bold text-content-faint transition-colors hover:text-content"
            >
              {L({ en: 'Reset', ar: 'إعادة' })}
            </button>
          )}
        </div>

        <div className={cn('grid', !stacked && 'md:grid-cols-2')}>
          {/* editor */}
          <div dir="ltr" className="relative min-w-0" style={{ background: 'var(--code-bg)' }}>
            <LiveEditor
              onChange={setSource}
              className="!font-mono !text-[0.78rem] !leading-relaxed"
              style={{ fontFamily: 'var(--font-mono)', minHeight: '100%' }}
            />
          </div>

          {/* preview */}
          <div className="relative min-w-0 border-t border-line md:border-t-0 md:border-s">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-1.5 text-[0.66rem] font-bold tracking-widest text-content-faint uppercase">
              <IconCode width={12} height={12} />
              {L({ en: 'Result', ar: 'النتيجة' })}
            </div>
            <div className="playground-preview p-4">
              <LivePreview />
            </div>
            <LiveError className="!m-3 !rounded-xl !border !border-[#fb7185]/40 !bg-[#fb7185]/10 !p-3 !font-mono !text-xs !text-[#fb7185]" />
          </div>
        </div>
      </div>
    </LiveProvider>
  )
}

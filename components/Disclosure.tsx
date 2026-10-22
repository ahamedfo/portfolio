import type { ReactNode } from 'react'

/**
 * Expandable detail, built on <details> on purpose.
 *
 * No JavaScript, no state, no hydration. It opens with a click, with Enter, and
 * with Space, because the browser already knows how to do that correctly. It is
 * also findable by in-page search in browsers that expand matches inside a
 * closed details element, and it prints open-or-closed exactly as rendered.
 *
 * Anything a technical reader needs goes in here. Anything a first-pass reader
 * needs stays outside it.
 */
export default function Disclosure({
  summary,
  hint,
  children,
  open = false,
}: {
  summary: string
  /** A few words saying what is inside, so the control is worth clicking. */
  hint?: string
  children: ReactNode
  open?: boolean
}) {
  return (
    <details open={open} className="group border-t border-rule py-4 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-baseline gap-3 rounded-sm">
        <span
          aria-hidden
          className="mt-[0.1rem] select-none font-mono text-[0.9375rem] leading-none text-ink-3 transition-colors group-open:text-research"
        >
          <span className="inline-block group-open:hidden">+</span>
          <span className="hidden group-open:inline-block">&minus;</span>
        </span>
        <span className="flex-1">
          <span className="text-[1.0625rem] text-ink-1 group-hover:text-research">{summary}</span>
          {hint && (
            <span className="ml-2 font-mono text-[0.75rem] text-ink-3 group-open:hidden">{hint}</span>
          )}
        </span>
      </summary>

      <div className="pl-[1.6rem] pt-4">{children}</div>
    </details>
  )
}

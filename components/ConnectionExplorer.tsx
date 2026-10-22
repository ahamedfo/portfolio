'use client'

import { useState } from 'react'
import Link from 'next/link'
import { lenses, nodeById } from '@/content/lenses'

/**
 * "How the work connects."
 *
 * Deliberately not a force graph. A graph of employers joined by decorative
 * lines tells a reader nothing, needs a mouse, needs dragging, and hides its
 * content behind hover. This does the opposite:
 *
 *   - Every lens and every connection is in the markup at all times. With
 *     JavaScript off, or before hydration, the whole thing reads as a list.
 *     Nothing here is JavaScript-only content.
 *   - The buttons filter. They are plain <button> elements with aria-pressed,
 *     so they work with a keyboard, a screen reader, and a touch tap.
 *   - "Show everything" is always available as a reset, and the current state
 *     is announced in a live region rather than only shown by colour.
 *   - The reason a thing belongs to a lens is the content. It is never behind
 *     a tooltip.
 */
const kindLabel: Record<string, string> = {
  case: 'Featured work',
  secondary: 'Additional work',
  research: 'Research',
  role: 'Earlier role',
}

export default function ConnectionExplorer() {
  /** null means show every lens. That is also the no-JavaScript state. */
  const [active, setActive] = useState<string | null>(null)
  const shown = active ? lenses.filter((l) => l.id === active) : lenses
  const activeLens = lenses.find((l) => l.id === active)

  return (
    <div>
      <div role="group" aria-label="Filter connections by capability" className="flex flex-wrap gap-2">
        {lenses.map((l) => {
          const on = l.id === active
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(on ? null : l.id)}
              className={`border px-3 py-1.5 text-left font-mono text-[0.8125rem] transition-colors ${
                on
                  ? 'border-ink-1 bg-ink-1 text-paper'
                  : 'border-line-control text-ink-2 hover:border-ink-1 hover:text-ink-1'
              }`}
            >
              {l.label}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => setActive(null)}
          disabled={active === null}
          className="border border-dashed border-line-control px-3 py-1.5 font-mono text-[0.8125rem] text-ink-3 transition-colors hover:border-ink-1 hover:text-ink-1 disabled:cursor-default disabled:opacity-50 disabled:hover:border-line-control disabled:hover:text-ink-3"
        >
          Show everything
        </button>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-[0.8125rem] text-ink-3">
        {activeLens
          ? `${activeLens.label}: ${activeLens.members.length} connected pieces of work.`
          : `All ${lenses.length} capabilities shown.`}
      </p>

      <div className="mt-8">
        {shown.map((l) => (
          <section key={l.id} className="border-t border-line py-9 first:border-t-0 first:pt-0">
            <h3 className="text-[1.375rem] text-ink-1">{l.label}</h3>
            <p className="mt-2.5 max-w-prose text-[1.0625rem] leading-[1.7] text-ink-2">
              {l.summary}
            </p>

            <ul className="mt-6 space-y-5">
              {l.members.map((m) => {
                const n = nodeById(m.nodeId)
                if (!n) return null
                return (
                  <li key={m.nodeId} className="grid gap-x-8 gap-y-1.5 lg:grid-cols-[18rem_1fr]">
                    <div>
                      <p className="text-[1rem] leading-snug text-ink-1">
                        {n.href ? (
                          <Link href={n.href} className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal">
                            {n.label}
                          </Link>
                        ) : (
                          n.label
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-label text-ink-3">
                        {kindLabel[n.kind]} · {n.where}
                      </p>
                    </div>
                    <p className="max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
                      {m.reason}
                    </p>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

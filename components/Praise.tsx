'use client'

import { useState } from 'react'
import { praiseFor } from '@/content/praise'

/**
 * The rolodex.
 *
 * One card at a time, with the others stacked behind it so you can see there
 * are more. Clicking a card or a dot brings it forward.
 *
 * It does not autoplay. A panel that moves on its own while someone is halfway
 * through reading it is a worse experience than one that waits, and it is a
 * guaranteed accessibility complaint. The stack makes the count obvious
 * without needing motion to advertise it.
 *
 * Every card carries its author's real name, their title, how they knew him,
 * the date, and a link to go verify it. That is the whole reason these two are
 * publishable and the internal ones are not: a reader can check.
 */
export default function Praise({ roleId }: { roleId: string }) {
  const items = praiseFor(roleId)
  const [active, setActive] = useState(0)

  if (items.length === 0) return null
  const current = items[active]

  return (
    <div className="mt-8">
      <div className="relative">
        {/* The stack. Purely decorative depth, so it is hidden from the a11y
            tree and never holds content. */}
        {items.length > 1 && (
          <>
            <div
              aria-hidden
              className="absolute inset-x-3 -bottom-2 h-full rounded-lg border border-hairline bg-surface-1 opacity-50"
            />
            {items.length > 2 && (
              <div
                aria-hidden
                className="absolute inset-x-6 -bottom-4 h-full rounded-lg border border-hairline bg-surface-1 opacity-25"
              />
            )}
          </>
        )}

        <figure className="panel relative p-6 sm:p-8">
          <blockquote className="max-w-prose text-body-lg leading-relaxed text-ink">
            {current.quote}
            {current.excerpt && (
              <span className="text-ink-subtle"> […]</span>
            )}
          </blockquote>

          <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-body-sm font-medium text-ink">{current.author}</span>
            <span className="text-body-sm text-ink-subtle">{current.title}</span>
          </figcaption>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] text-ink-subtle">
            <span>{current.relationship}</span>
            <span aria-hidden>·</span>
            <span className="tnum">{current.date}</span>
            {current.excerpt && (
              <>
                <span aria-hidden>·</span>
                <span>excerpt</span>
              </>
            )}
            {current.verifyUrl && (
              <>
                <span aria-hidden>·</span>
                <a
                  href={current.verifyUrl}
                  className="text-primary-hover underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary-hover"
                >
                  verify on LinkedIn
                </a>
              </>
            )}
          </div>
        </figure>
      </div>

      {items.length > 1 && (
        <div className="mt-7 flex items-center gap-3">
          <div role="group" aria-label="Choose a recommendation" className="flex gap-2">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Recommendation from ${p.author}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-6 bg-ink' : 'w-2 bg-hairline-strong hover:bg-ink-subtle'
                }`}
              />
            ))}
          </div>
          <span aria-live="polite" className="font-mono text-[0.6875rem] tnum text-ink-subtle">
            {active + 1} of {items.length}
          </span>
        </div>
      )}
    </div>
  )
}

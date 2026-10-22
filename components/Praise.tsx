'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { praiseFor } from '@/content/praise'

/**
 * The rolodex.
 *
 * It advances on its own every eight seconds, which Ahamed asked for twice.
 * Three things keep that from being the usual autoplay nuisance:
 *
 *   - it pauses while the pointer is over it, and while anything inside it has
 *     keyboard focus, so it never moves out from under someone reading
 *   - `prefers-reduced-motion` turns the timer off entirely
 *   - the dots are real buttons, so taking manual control is always possible,
 *     and doing so stops the timer for good
 *
 * Eight seconds is deliberate. These quotes run about sixty words, which is
 * roughly six seconds of reading, so the interval gives a slow reader a margin
 * rather than racing them.
 */
const INTERVAL_MS = 8000

export default function Praise({ roleId }: { roleId: string }) {
  const items = praiseFor(roleId)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [tookControl, setTookControl] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const stop = useCallback((i: number) => {
    setActive(i)
    setTookControl(true)
  }, [])

  useEffect(() => {
    if (items.length < 2 || paused || tookControl || reduced.current) return
    const t = setInterval(() => setActive((i) => (i + 1) % items.length), INTERVAL_MS)
    return () => clearInterval(t)
  }, [items.length, paused, tookControl])

  if (items.length === 0) return null
  const current = items[active]

  return (
    <section
      aria-label="What people who worked with Ahamed said"
      className="mt-9"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Say what this is. It was previously just a quote sitting on the page
          with no label, which left the reader to work out why it was there. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="eyebrow text-primary-hover">What they said about working with me</h4>
        {items.length > 1 && (
          <span aria-live="polite" className="font-mono text-[0.6875rem] tnum text-ink-subtle">
            {active + 1} of {items.length}
          </span>
        )}
      </div>

      <div className="relative mt-4">
        {items.length > 1 && (
          <div
            aria-hidden
            className="absolute inset-x-3 -bottom-2 h-full rounded-lg border border-hairline bg-surface-1 opacity-50"
          />
        )}

        <figure className="panel relative p-6 sm:p-8">
          <blockquote className="max-w-prose text-body-lg leading-relaxed text-ink">
            {current.quote}
            {current.excerpt && <span className="text-ink-subtle"> […]</span>}
          </blockquote>

          <figcaption className="mt-6">
            {/* The relationship leads, because that is what makes the quote
                mean something: a manager and a mentor are vouching, not a
                stranger. */}
            <p className="text-body-sm text-primary-hover">{current.relationship}</p>
            <p className="mt-1.5 text-body font-medium text-ink">{current.author}</p>
            <p className="text-body-sm text-ink-muted">{current.title}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-2.5 font-mono text-[0.6875rem] text-ink-subtle">
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
                    className="underline decoration-control underline-offset-4 transition-colors hover:text-ink hover:decoration-primary-hover"
                  >
                    read it on LinkedIn
                  </a>
                </>
              )}
            </p>
          </figcaption>
        </figure>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center gap-3">
          <div role="group" aria-label="Choose a recommendation" className="flex gap-2">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`From ${p.author}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => stop(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-7 bg-primary' : 'w-2 bg-hairline-strong hover:bg-ink-subtle'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

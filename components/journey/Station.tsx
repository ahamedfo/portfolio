'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { LogEntry } from '@/content/log'
import type { Station as StationData, Stint } from '@/content/route'
import { formatMonth, formatRange, formatYearRange } from '@/content/route'
import { markClass, statusLabel, lineStroke } from './marks'

/**
 * One place. One screen.
 *
 * Layout is a header band - code, dates, city, claim, employers - over a list
 * of one-line entry rows, two columns once there are more than six. The last
 * station has ten and still fits a laptop screen without scrolling inside
 * itself.
 *
 * The density fix is this shape, not editing. A screen that holds a city, a
 * date range, one sentence, the roles, and a list of one-line rows has nowhere
 * to put a paragraph. The prose that used to sit under every entry now lives
 * in a readout slot that fills on hover or focus.
 *
 * The slot is a fixed height so the page does not jump as you move across the
 * rows, and it holds the last thing you pointed at rather than emptying.
 *
 * Hover and focus drive it identically, so a keyboard gets the same page a
 * mouse does. Rows that link somewhere are anchors; rows that do not are
 * buttons. Both are focusable, which is the point.
 */
export default function Station({
  station,
  stints,
  entries,
  isLast,
}: {
  station: StationData
  stints: (Stint & { line: 'industry' | 'research' })[]
  entries: LogEntry[]
  isLast: boolean
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = entries.find((e) => e.id === activeId) ?? null

  // Past six rows a single column runs off the bottom of a laptop screen.
  const twoUp = entries.length > 6

  return (
    <section
      id={station.id}
      aria-labelledby={`${station.id}-city`}
      className="flex min-h-[86vh] flex-col justify-center py-20"
    >
      <div className="mx-auto w-full max-w-frame px-6">
        <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="eyebrow text-ink-subtle">{station.code}</span>
          <span className="font-mono text-caption tnum text-ink-subtle">
            {formatRange(station.start, station.end)}
          </span>
          {isLast && (
            <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted">
              where I am now
            </span>
          )}
        </div>

        <h2
          id={`${station.id}-city`}
          className="mt-4 text-display-md text-ink sm:text-display-lg"
        >
          {station.city}
        </h2>

        <p className="mt-6 max-w-[30ch] text-subhead text-ink-muted sm:text-headline sm:text-ink">
          {station.claim}
        </p>

        {stints.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {stints.map((st) => (
              <li key={`${st.org}-${st.start}`} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="block h-[2px] w-4 rounded-full"
                  style={{ background: lineStroke[st.line] }}
                />
                <span className="text-body-sm text-ink-muted">{st.org}</span>
                <span className="font-mono text-[0.6875rem] tnum text-ink-subtle">
                  {formatYearRange(st.start, st.end)}
                </span>
              </li>
            ))}
          </ul>
        )}
        </div>

        {entries.length > 0 && (
          <div className="mt-12">
            <ul className={twoUp ? 'grid gap-x-10 sm:grid-cols-2' : ''}>
              {entries.map((e) => {
                const on = e.id === activeId
                const inner = (
                  <>
                    <span aria-hidden className={markClass(e.line, e.status)} />
                    <span
                      className={`flex-1 text-body-sm transition-colors ${
                        on ? 'text-ink' : 'text-ink-muted'
                      }`}
                    >
                      {e.title}
                    </span>
                    <span className="font-mono text-[0.6875rem] tnum text-ink-subtle">
                      {formatMonth(e.date)}
                    </span>
                  </>
                )
                const cls =
                  'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-surface-1'

                return (
                  <li key={e.id}>
                    {e.href ? (
                      <Link
                        href={e.href}
                        className={cls}
                        onMouseEnter={() => setActiveId(e.id)}
                        onFocus={() => setActiveId(e.id)}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={cls}
                        onMouseEnter={() => setActiveId(e.id)}
                        onFocus={() => setActiveId(e.id)}
                        onClick={() => setActiveId(e.id)}
                      >
                        {inner}
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Reserved height. The page must not move as you cross the rows. */}
            <div
              aria-live="polite"
              className="mt-6 min-h-[4.5rem] border-t border-hairline pt-4"
            >
              {active ? (
                <div className="max-w-prose">
                  <p className="text-body-sm leading-relaxed text-ink-muted">{active.readout}</p>
                  <p className="mt-1.5 font-mono text-[0.6875rem] text-ink-subtle">
                    {statusLabel[active.status]}
                    {active.href ? ' · press to read the full record' : ''}
                  </p>
                </div>
              ) : (
                <p className="text-body-sm text-ink-subtle">
                  {station.note}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

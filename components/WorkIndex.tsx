'use client'

import { useState } from 'react'
import Link from 'next/link'
import { log } from '@/content/log'
import { lenses } from '@/content/lenses'
import { formatMonth, stationById, lineById } from '@/content/route'
import { markClass, statusLabel, statusMeaning } from '@/components/journey/marks'

/**
 * Everything, in one list.
 *
 * This is where the capability filters live now. They used to sit on the home
 * page above the chart, where they were a row of seven buttons a visitor had
 * to decode before the page made sense. A filterable list is the place a
 * filter belongs.
 *
 * Every entry and every lens summary is in the markup at all times. The
 * buttons narrow what is shown; they do not fetch or reveal anything, so with
 * JavaScript off this is a complete list of the work and nothing is missing.
 */
export default function WorkIndex() {
  const [lens, setLens] = useState<string | null>(null)
  const active = lenses.find((l) => l.id === lens)

  const shown = lens ? log.filter((e) => (e.lenses ?? []).includes(lens)) : log
  const ordered = [...shown].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <div role="group" aria-label="Filter by capability" className="flex flex-wrap gap-2">
        {lenses.map((l) => {
          const on = l.id === lens
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              onClick={() => setLens(on ? null : l.id)}
              className={`rounded-md px-3 py-1.5 text-body-sm transition-colors ${
                on
                  ? 'bg-primary text-white'
                  : 'bg-surface-1 text-ink-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              {l.label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setLens(null)}
          disabled={lens === null}
          className="rounded-md px-3 py-1.5 text-body-sm text-ink-subtle transition-colors hover:text-ink disabled:cursor-default disabled:opacity-40 disabled:hover:text-ink-subtle"
        >
          Show all
        </button>
      </div>

      {/* The label is two words. This is where the meaning lives, so nobody
          has to guess what a filter does before pressing it. */}
      <p aria-live="polite" className="mt-5 min-h-[3rem] max-w-prose text-body-sm leading-relaxed text-ink-subtle">
        {active ? (
          <>
            <span className="text-ink-muted">{active.summary}</span>{' '}
            <span className="font-mono text-caption tnum">
              {ordered.length} of {log.length}
            </span>
          </>
        ) : (
          <>
            Filter by what the work has in common.{' '}
            <span className="font-mono text-caption tnum">{log.length} items</span>
          </>
        )}
      </p>

      <ul className="mt-6">
        {ordered.map((e) => {
          const station = stationById(e.station)
          const row = (
            <>
              <span aria-hidden className={`${markClass(e.line, e.status)} mt-[7px]`} />
              <span className="min-w-0 flex-1">
                <span className="block text-body text-ink">{e.title}</span>
                <span className="mt-1 block text-body-sm text-ink-subtle">{e.readout}</span>
                <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] text-ink-subtle">
                  <span className="tnum">{formatMonth(e.date)}</span>
                  <span>{station?.city}</span>
                  <span>{lineById(e.line)?.label}</span>
                  <span className="text-ink-muted">{statusLabel[e.status]}</span>
                </span>
              </span>
              {e.href && (
                <span aria-hidden className="mt-1 text-body-sm text-primary-hover">
                  &rarr;
                </span>
              )}
            </>
          )

          return (
            <li key={e.id} className="border-b border-hairline last:border-b-0">
              {e.href ? (
                <Link
                  href={e.href}
                  className="flex gap-4 rounded-md px-3 py-5 transition-colors hover:bg-surface-1"
                >
                  {row}
                </Link>
              ) : (
                <div className="flex gap-4 px-3 py-5">{row}</div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="panel mt-12 p-6">
        <p className="eyebrow text-ink-subtle">What the shapes mean</p>
        <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {(['shipped', 'demo', 'research', 'held'] as const).map((s) => (
            <li key={s} className="flex items-start gap-3">
              <span aria-hidden className={`${markClass('research', s)} mt-[5px]`} />
              <span className="text-body-sm">
                <span className="text-ink">{statusLabel[s]}</span>{' '}
                <span className="text-ink-subtle">{statusMeaning[s]}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

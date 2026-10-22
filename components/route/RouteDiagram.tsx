'use client'

import { useMemo, useState } from 'react'
import { log, logByRecency, type LogEntry } from '@/content/log'
import {
  stations,
  lines,
  entryPositions,
  stationCenters,
  stationBoundaries,
  lineExtent,
  formatYearRange,
} from '@/content/route'
import { lenses } from '@/content/lenses'
import { markClass, lineStroke, statusLabel, statusMeaning } from './marks'
import Readout from './Readout'

/**
 * The route.
 *
 * Construction notes, because the obvious implementation is worse:
 *
 * The SVG draws only the ground. Lines, station rules, the dot field, the live
 * edge. It is aria-hidden and contains nothing interactive, because making SVG
 * children focusable and sensible to a screen reader is fiddly and fragile.
 *
 * Every interactive mark is a real HTML <button> positioned over that ground.
 * That buys native focus, native hover, native keyboard, native touch, and real
 * semantics for free, and it is why there is no key handling code here.
 *
 * Positions arrive as 0..1 from content/route.ts and are mapped into an inset
 * track so nothing sits flush against an edge.
 *
 * Hover and focus set the same state, so pointing and tabbing fill the readout
 * identically. The readout never empties.
 *
 * Below `lg` this whole thing is hidden and RouteList carries the content. A
 * horizontal diagram cannot be made good on a 390px screen, and shrinking it
 * until it technically fits is worse than showing the list.
 */

/** Track inset, as a percentage, so marks and labels never touch the edges. */
const PAD = 4
const x = (pos: number) => PAD + pos * (100 - PAD * 2)

const LINE_Y: Record<string, number> = { industry: 148, research: 240 }
const VIEW_H = 302
const TRACK_TOP = 100
const TRACK_BOTTOM = 276

export default function RouteDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [lens, setLens] = useState<string | null>(null)
  /* Bumping this remounts the animated nodes, which is how the sequence is
     replayed. Restarting a CSS animation any other way means poking at
     `animation-name` and forcing a reflow. */
  const [run, setRun] = useState(0)

  const positions = useMemo(() => entryPositions(), [])
  const centers = useMemo(() => stationCenters(), [])
  const boundaries = useMemo(() => stationBoundaries(), [])

  /* Arrival order follows the route, so the sequence reads as travel rather
     than as seventeen things appearing at random. */
  const ordered = useMemo(() => {
    const pos = entryPositions()
    return [...log].sort((a, b) => (pos.get(a.id) ?? 0) - (pos.get(b.id) ?? 0))
  }, [])

  const active: LogEntry = log.find((e) => e.id === activeId) ?? logByRecency[0]
  const dimmed = (e: LogEntry) => lens !== null && !(e.lenses ?? []).includes(lens)
  const matchCount = lens ? log.filter((e) => (e.lenses ?? []).includes(lens)).length : log.length

  return (
    <div>
      {/* Filters. These are the capability lenses, turned into a way to light
          up the route rather than a separate list further down the page. */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="label mr-1 text-ink-3">Light up</span>
        {lenses.map((l) => {
          const on = l.id === lens
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              onClick={() => setLens(on ? null : l.id)}
              className={`border px-2.5 py-1 font-mono text-[0.75rem] transition-colors ${
                on
                  ? 'border-ink-1 bg-ink-1 text-void'
                  : 'border-edge text-ink-2 hover:border-ink-1 hover:text-ink-1'
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
          className="border border-dashed border-edge px-2.5 py-1 font-mono text-[0.75rem] text-ink-3 transition-colors hover:border-ink-1 hover:text-ink-1 disabled:cursor-default disabled:opacity-50 disabled:hover:border-edge disabled:hover:text-ink-3"
        >
          All
        </button>
        <span aria-live="polite" className="ml-1 font-mono text-[0.75rem] tnum text-ink-3">
          {lens ? `${matchCount} of ${log.length}` : `${log.length} entries`}
        </span>
      </div>

      <div className="mt-6 border border-rule bg-plate">
        <div className="relative field" style={{ height: VIEW_H }}>
          {/* ── the ground ───────────────────────────────────────────────── */}
          <svg
            aria-hidden
            viewBox={`0 0 1000 ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* Where the city changed. One rule per move, none before the
                first station because nothing precedes it. */}
            {boundaries.map((b) => (
              <line
                key={b.id}
                x1={x(b.pos) * 10}
                x2={x(b.pos) * 10}
                y1={TRACK_TOP}
                y2={TRACK_BOTTOM}
                stroke="#2A3A55"
                strokeWidth={1}
                strokeDasharray="2 5"
              />
            ))}

            {/* The two lines, each spanning only where it actually runs. */}
            {lines.map((l, i) => {
              const { from, to } = lineExtent(l.id)
              return (
                <g key={`${l.id}-${run}`}>
                  <line
                    className="route-draw"
                    pathLength={1}
                    strokeDasharray={1}
                    style={{ ['--draw-delay' as string]: `${i * 160}ms` }}
                    x1={x(from) * 10}
                    x2={x(to) * 10}
                    y1={LINE_Y[l.id]}
                    y2={LINE_Y[l.id]}
                    stroke={lineStroke[l.id]}
                    strokeWidth={2}
                    opacity={lens ? 0.35 : 0.85}
                  />
                  {/* a cap where the line begins, so it reads as a terminus
                      rather than as something running off the edge */}
                  <circle
                    className="route-fade"
                    style={{ ['--fade-delay' as string]: `${i * 160}ms` }}
                    cx={x(from) * 10}
                    cy={LINE_Y[l.id]}
                    r={4}
                    fill="#131C2E"
                    stroke={lineStroke[l.id]}
                    strokeWidth={2}
                    opacity={lens ? 0.35 : 0.85}
                  />
                </g>
              )
            })}

            {/* the live edge */}
            <line
              key={`now-${run}`}
              className="route-fade"
              style={{ ['--fade-delay' as string]: '2600ms' }}
              x1={(100 - PAD) * 10}
              x2={(100 - PAD) * 10}
              y1={TRACK_TOP + 8}
              y2={TRACK_BOTTOM}
              stroke="#FFFFFF"
              strokeWidth={1.5}
            />
          </svg>

          {/* ── stations ─────────────────────────────────────────────────── */}
          {/* Code, city, years. The employers live in the list below: the
              narrowest slot here is about 100px, which fits three short lines
              and not an org list. */}
          {stations.map((s) => (
            <div
              key={s.id}
              className="absolute top-6 w-28 -translate-x-1/2 text-center"
              style={{ left: `${x(centers.get(s.id) ?? 0)}%` }}
            >
              <p className="label text-ink-1">{s.code}</p>
              <p className="mt-1 font-mono text-[0.75rem] leading-tight text-ink-2">{s.city}</p>
              <p className="mt-1 font-mono text-[0.6875rem] tnum leading-tight text-ink-3">
                {formatYearRange(s.start, s.end)}
              </p>
            </div>
          ))}

          {/* ── the marks ────────────────────────────────────────────────── */}
          {ordered.map((e, i) => {
            const pos = positions.get(e.id) ?? 0
            const up = i % 2 === 0
            const lineY = LINE_Y[e.line]
            const offset = up ? -22 : 22
            const isActive = e.id === active.id
            const isDim = dimmed(e)
            /* Each mark departs from the terminus of its own line. */
            const origin = x(lineExtent(e.line).from)

            return (
              <div
                key={`${e.id}-${run}`}
                className="route-ride absolute -translate-x-1/2"
                style={{
                  left: `${x(pos)}%`,
                  top: lineY + offset - 11,
                  ['--from-left' as string]: `${origin}%`,
                  ['--from-top' as string]: `${lineY - 11}px`,
                  ['--to-left' as string]: `${x(pos)}%`,
                  ['--to-top' as string]: `${lineY + offset - 11}px`,
                  ['--ride-delay' as string]: `${600 + i * 95}ms`,
                }}
              >
                {/* the stem: the mark hangs off its line */}
                <span
                  aria-hidden
                  className="absolute left-1/2 w-px -translate-x-1/2 bg-rule"
                  style={
                    up
                      ? { top: '100%', height: Math.abs(offset) - 11 }
                      : { bottom: '100%', height: Math.abs(offset) - 11 }
                  }
                />
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(e.id)}
                  onFocus={() => setActiveId(e.id)}
                  onClick={() => setActiveId(e.id)}
                  aria-label={`${e.title}. ${statusLabel[e.status]}.`}
                  className={`grid h-[22px] w-[22px] place-items-center rounded-full transition-opacity ${
                    isDim ? 'opacity-25' : 'opacity-100'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`${markClass(e.line, e.status)} ${
                      isActive ? 'scale-150' : 'scale-100'
                    }`}
                  />
                </button>
              </div>
            )
          })}

          {/* ── the live edge label ──────────────────────────────────────── */}
          <div
            key={`now-label-${run}`}
            className="route-fade absolute -translate-x-1/2"
            style={{
              left: `${100 - PAD}%`,
              top: TRACK_TOP - 18,
              ['--fade-delay' as string]: '2600ms',
            }}
          >
            <p className="label whitespace-nowrap text-now">Now</p>
          </div>

          {/* Replay. Small, bottom left, out of the way of the route. */}
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="absolute bottom-3 left-4 border border-edge px-2 py-1 font-mono text-[0.6875rem] text-ink-3 transition-colors hover:border-ink-1 hover:text-ink-1"
          >
            Replay
          </button>
        </div>

        <Readout entry={active} />
      </div>

      {/* ── legend ─────────────────────────────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap items-start gap-x-8 gap-y-4">
        <div>
          <p className="label text-ink-3">Lines</p>
          <ul className="mt-2 space-y-1.5">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="block h-0.5 w-6"
                  style={{ background: lineStroke[l.id] }}
                />
                <span className="font-mono text-[0.75rem] text-ink-2">
                  {l.label}
                  <span className="text-ink-3"> · {l.summary}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label text-ink-3">Shapes</p>
          <ul className="mt-2 grid gap-x-7 gap-y-1.5 sm:grid-cols-2">
            {(['shipped', 'demo', 'research', 'held'] as const).map((s) => (
              <li key={s} className="flex items-center gap-2.5">
                <span aria-hidden className={markClass('research', s)} />
                <span className="font-mono text-[0.75rem] text-ink-2">
                  {statusLabel[s]}
                  <span className="text-ink-3"> · {statusMeaning[s]}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import type { LogEntry } from '@/content/log'
import { formatMonth, stationById } from '@/content/route'
import { statusLabel, markClass } from './marks'

/**
 * The readout.
 *
 * Hover and keyboard focus both drive this one strip, which is why the diagram
 * needs no tooltips. A tooltip is content that only exists while a pointer is
 * held still over a target, which means it does not exist at all for a keyboard
 * or a touchscreen. A fixed readout is how real instrumentation solves the same
 * problem: the panel is always there, and pointing at something fills it in.
 *
 * It never collapses. An empty readout would make the diagram jump every time
 * the pointer left a mark, so it holds the last thing you looked at.
 */
export default function Readout({ entry }: { entry: LogEntry }) {
  const station = stationById(entry.station)

  return (
    <div
      aria-live="polite"
      className="min-h-[7.5rem] border-t border-rule bg-plate px-5 py-4 sm:px-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span aria-hidden className={markClass(entry.line, entry.status)} />
        <span className="label text-ink-3">
          {statusLabel[entry.status]}
        </span>
        <span className="font-mono text-[0.75rem] tnum text-ink-3">
          {formatMonth(entry.date)}
          {station ? ` · ${station.city}` : ''}
        </span>
      </div>

      <p className="mt-2.5 text-[1.0625rem] leading-snug text-ink-1">{entry.title}</p>
      <p className="mt-1.5 max-w-[68ch] text-[0.9375rem] leading-[1.6] text-ink-2">
        {entry.readout}
      </p>

      {entry.href && (
        <Link
          href={entry.href}
          className="mt-2.5 inline-block border-b border-research/50 pb-0.5 font-mono text-[0.75rem] text-research transition-colors hover:border-research"
        >
          Read the full record &rarr;
        </Link>
      )}
    </div>
  )
}

import Link from 'next/link'
import { stations, entriesAtStation, stintsAtStation, formatRange, formatMonth } from '@/content/route'
import { lineById } from '@/content/route'
import { markClass, statusLabel } from './marks'

/**
 * The route as text.
 *
 * This is not a fallback bolted on at the end. It is the same journey in the
 * form that works on a 390px screen, with JavaScript off, in a screen reader,
 * and in a printout. The diagram is the version for people who have a wide
 * screen and a pointer.
 *
 * Always in the DOM. Shown below `lg`, and shown at every width underneath the
 * diagram, because reading the stops in order is useful even when you can see
 * the chart.
 */
export default function RouteList() {
  return (
    <ol className="space-y-px">
      {stations.map((station, i) => {
        const entries = entriesAtStation(station.id)
        const stints = stintsAtStation(station.id)
        const isLast = i === stations.length - 1

        return (
          <li key={station.id} className="border border-rule bg-plate p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="label text-ink-1">{station.code}</span>
              <span className="text-[1.125rem] text-ink-1">{station.city}</span>
              <span className="font-mono text-[0.75rem] tnum text-ink-3">
                {formatRange(station.start, station.end)}
              </span>
              {isLast && <span className="label text-now">Now</span>}
            </div>

            <p className="mt-2 max-w-prose text-[0.9375rem] leading-[1.6] text-ink-2">
              {station.note}
            </p>

            {stints.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {stints.map((st) => (
                  <li
                    key={`${st.org}-${st.start}`}
                    className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5"
                  >
                    <span
                      aria-hidden
                      className="block h-0.5 w-4 translate-y-[-0.25rem]"
                      style={{
                        background: st.line === 'industry' ? '#B47819' : '#04999B',
                      }}
                    />
                    <span className="text-[0.9375rem] text-ink-1">{st.org}</span>
                    <span className="font-mono text-[0.75rem] text-ink-3">{st.role}</span>
                    {st.remoteNote && (
                      <span className="font-mono text-[0.75rem] text-ink-3">
                        ({st.remoteNote})
                      </span>
                    )}
                    <span className="font-mono text-[0.75rem] tnum text-ink-3">
                      {formatRange(st.start, st.end)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {entries.length > 0 && (
              <ul className="mt-5 space-y-3.5 border-t border-rule pt-5">
                {entries.map((e) => (
                  <li key={e.id} className="flex gap-3.5">
                    <span aria-hidden className={`${markClass(e.line, e.status)} mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-[1rem] leading-snug text-ink-1">
                        {e.href ? (
                          <Link
                            href={e.href}
                            className="underline decoration-edge underline-offset-4 transition-colors hover:decoration-research"
                          >
                            {e.title}
                          </Link>
                        ) : (
                          e.title
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-label text-ink-3">
                        {formatMonth(e.date)} · {lineById(e.line)?.label} · {statusLabel[e.status]}
                      </p>
                      <p className="mt-1.5 max-w-prose text-[0.9375rem] leading-[1.6] text-ink-2">
                        {e.readout}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ol>
  )
}

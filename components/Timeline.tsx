import Link from 'next/link'
import type { Entry, Tone } from '@/lib/entries'

/**
 * Tone is the only colour on the page and it always means the same thing.
 * Hollow is reserved for work that has not been measured yet.
 */
const dot: Record<Tone, string> = {
  ongoing: 'bg-signal border-signal',
  starting: 'bg-paper border-line-strong',
  finished: 'bg-hi border-hi',
  paused: 'bg-control border-control',
  stopped: 'bg-lo border-lo',
  role: 'bg-ink-1 border-ink-1',
}

const labelTone: Record<Tone, string> = {
  ongoing: 'text-signal',
  starting: 'text-ink-3',
  finished: 'text-hi',
  paused: 'text-ink-3',
  stopped: 'text-lo',
  role: 'text-ink-3',
}

/**
 * A single spine. Left edge on narrow screens, centred with entries
 * alternating around it once there is room.
 */
export default function Timeline({
  entries,
  title,
}: {
  entries: Entry[]
  /** Omitted when a tab already labels the section. */
  title?: string
}) {
  return (
    <section>
      {title && <h2 className="border-b border-line pb-5 text-2xl text-ink-1">{title}</h2>}

      <div className="relative mt-12">
        <span
          aria-hidden
          className="absolute bottom-3 left-1 top-3 w-px bg-line lg:left-1/2 lg:-translate-x-1/2"
        />

        <ol>
          {entries.map((e, i) => {
            const left = i % 2 === 0
            return (
              <li key={e.id} className="relative pb-14 last:pb-0">
                {/* Anchored to the full-width row, so it sits exactly on the
                    spine at any breakpoint. */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-[0.5rem] z-10 h-[9px] w-[9px] rounded-full border lg:left-1/2 lg:-translate-x-1/2 ${dot[e.tone]}`}
                />
                <span
                  aria-hidden
                  className={`absolute top-[0.72rem] hidden h-px w-5 bg-line lg:block ${
                    left ? 'right-1/2 mr-2' : 'left-1/2 ml-2'
                  }`}
                />

                <div
                  className={`pl-9 lg:w-1/2 lg:pl-0 ${
                    left ? 'lg:pr-12 lg:text-right' : 'lg:ml-auto lg:pl-12'
                  }`}
                >
                  <div
                    className={`flex flex-wrap items-baseline gap-x-3 ${
                      left ? 'lg:justify-end' : ''
                    }`}
                  >
                    {e.dateLabel && (
                      <time
                        dateTime={e.date}
                        className="font-mono text-[0.8125rem] tnum text-ink-3"
                      >
                        {e.dateLabel}
                      </time>
                    )}
                    <span
                      className={`font-mono text-label uppercase tracking-label ${labelTone[e.tone]}`}
                    >
                      {e.label}
                    </span>
                  </div>

                  <h3 className="mt-2.5 max-w-[30ch] text-xl leading-snug text-ink-1 lg:inline-block">
                    {e.href ? (
                      <Link href={e.href} className="transition-colors hover:text-signal">
                        {e.title}
                      </Link>
                    ) : (
                      e.title
                    )}
                  </h3>

                  {e.line && (
                    <p className="mt-1.5 font-mono text-[0.8125rem] text-ink-3">{e.line}</p>
                  )}

                  {/* Inherits the entry's alignment. Left-aligning this inside
                      a right-aligned entry leaves a ragged edge that lines up
                      with nothing. */}
                  {e.summary && (
                    <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
                      {e.summary}
                    </p>
                  )}

                  {e.where && (
                    <p className="mt-3 max-w-prose font-mono text-[0.8125rem] leading-[1.5] text-ink-3">
                      {e.where}
                    </p>
                  )}

                  {/* An explicit affordance. The title is a link too, but a
                      linked heading alone does not read as clickable. */}
                  {e.href && (
                    <Link
                      href={e.href}
                      className="mt-4 inline-block border-b border-signal/40 pb-0.5 font-mono text-[0.8125rem] text-signal transition-colors hover:border-signal"
                    >
                      {e.hrefLabel ?? 'Read more'} &rarr;
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

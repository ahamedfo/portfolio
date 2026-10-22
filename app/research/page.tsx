import type { Metadata } from 'next'
import Link from 'next/link'
import { researchAreas } from '@/content/research'

/* Counted from the data so the heading cannot go stale when an area is added. */
const live = researchAreas.filter((a) =>
  ['Manuscript drafted', 'Scoping'].includes(a.status),
).length

export const metadata: Metadata = {
  title: 'Research | Ahamed Fofana',
  description:
    'Quantization across agent architectures, human-in-the-loop network monitoring, ransomware ecosystems, and earlier NLP work.',
}

/**
 * The hub.
 *
 * This page used to be the entire quantization study plus everything else,
 * end to end, on one scroll. Five panels instead. Each one says what the
 * question is and where it happens, and the detail is one click in for the
 * people who want it.
 */
export default function Research() {
  return (
    <div className="mx-auto max-w-frame px-6 py-20">
      <header className="max-w-prose">
        <p className="eyebrow text-ink-subtle">Research</p>
        <h1 className="mt-4 text-display-md text-ink">What I research</h1>
        <p className="mt-5 text-subhead text-ink-muted">
          {researchAreas.length} areas. {live} are running now, the rest are finished or
          stopped. Pick whichever you want the detail on.
        </p>
      </header>

      <ul className="mt-14 grid gap-3 lg:grid-cols-2">
        {researchAreas.map((a) => (
          <li key={a.id}>
            <Link
              href={a.href}
              className="panel group flex h-full flex-col p-6 transition-colors hover:border-hairline-strong hover:bg-surface-2 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted group-hover:bg-surface-3">
                  {a.status}
                </span>
                <span className="font-mono text-[0.6875rem] tnum text-ink-subtle">{a.period}</span>
              </div>

              <h2 className="mt-5 max-w-[22ch] text-card-title text-ink">{a.title}</h2>
              <p className="mt-3 max-w-prose flex-1 text-body-sm leading-relaxed text-ink-muted">
                {a.line}
              </p>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  {a.stat && (
                    <p className="font-mono text-headline tnum leading-none text-ink">
                      {a.stat.value}
                      <span className="ml-2 font-sans text-body-sm text-ink-subtle">
                        {a.stat.label}
                      </span>
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[0.6875rem] text-ink-subtle">{a.affiliation}</p>
                </div>
                <span
                  aria-hidden
                  className="text-body text-primary-hover transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

import Link from 'next/link'
import { profile } from '@/content/profile'
import { log } from '@/content/log'
import { cases } from '@/content/cases'

/**
 * The end of the line.
 *
 * The journey deliberately carries no case cards, no research panel and no
 * contact section along the way, so this screen is where those paths are
 * offered. Four destinations, equal weight, nothing to read.
 */
const destinations = [
  {
    href: '/work',
    label: 'Everything, in one list',
    detail: `All ${log.length} entries, filterable.`,
  },
  {
    href: `/work/${cases[1].id}`,
    label: 'The one I would show first',
    detail: 'An agent tried to delete. The hook refused.',
  },
  {
    href: '/research',
    label: 'The research',
    detail: '87 configurations, and the bound on each finding.',
  },
  {
    href: '/about',
    label: 'Roles, education, credentials',
    detail: 'The resume version.',
  },
]

export default function Closing() {
  return (
    <section className="flex min-h-[calc(100vh-7.5rem)] flex-col justify-center py-20">
      <div className="mx-auto w-full max-w-frame px-6">
        <p className="eyebrow text-ink-subtle">End of the line</p>
        <h2 className="mt-4 max-w-[20ch] text-display-md text-ink">Where to next.</h2>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {destinations.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="panel group p-6 transition-colors hover:bg-surface-2 hover:border-hairline-strong"
            >
              <p className="text-card-title text-ink">{d.label}</p>
              <p className="mt-2 text-body-sm text-ink-subtle">{d.detail}</p>
              <span
                aria-hidden
                className="mt-5 inline-block text-body-sm text-primary-hover transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md bg-primary px-4 py-2.5 text-body-sm font-medium text-white transition-shadow hover:shadow-[0_0_0_1px_#828fff]"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

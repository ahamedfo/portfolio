import Link from 'next/link'
import StatusTag from './StatusTag'
import type { CaseStudy } from '@/content/cases'

/**
 * The home page card. Readable on its own, and the first thing on the page
 * after the headline.
 *
 * Two columns once there is room: metadata on the left, the thing itself on
 * the right. One column below that, with the metadata on top where it reads
 * as a label rather than a stranded rail.
 *
 * Architecture, contribution, validation, and limits live on the case page so
 * the first scan stays short.
 */
export default function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article className="grid gap-x-10 gap-y-4 border-t border-hairline py-9 first:border-t-0 first:pt-0 lg:grid-cols-[13rem_1fr]">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-2 lg:block">
        <StatusTag status={item.status} />
        <p className="font-mono text-[0.8125rem] leading-[1.5] text-ink-subtle lg:mt-3">
          {item.org} · {item.client}
        </p>
      </div>

      <div>
        <h3 className="max-w-[40ch] text-[1.5rem] leading-snug text-ink">
          <Link href={`/work/${item.id}`} className="transition-colors hover:text-primary-hover">
            {item.title}
          </Link>
        </h3>

        <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.7] text-ink-muted">{item.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
          {item.stack.map((s) => (
            <li key={s} className="font-mono text-[0.8125rem] text-ink-subtle">
              {s}
            </li>
          ))}
        </ul>

        <Link
          href={`/work/${item.id}`}
          className="mt-6 inline-block border-b border-primary/40 pb-0.5 font-mono text-[0.8125rem] text-primary-hover transition-colors hover:border-primary"
        >
          Architecture, what I checked, and what it does not prove &rarr;
        </Link>
      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StatusTag from '@/components/StatusTag'
import Disclosure from '@/components/Disclosure'
import Testimonial from '@/components/Testimonial'
import PolicyHookDiagram from '@/components/diagrams/PolicyHookDiagram'
import DocumentGisDiagram from '@/components/diagrams/DocumentGisDiagram'
import AgentFleetDiagram from '@/components/diagrams/AgentFleetDiagram'
import { cases, byId } from '@/content/cases'
import { lenses } from '@/content/lenses'
import { entryById } from '@/content/log'
import { formatMonth, stationById } from '@/content/route'

/**
 * One route for every case study. Adding a case to content/cases.ts adds its
 * page, its static HTML file, and its link from the home page.
 *
 * Reading order was changed deliberately. It used to open with two paragraphs
 * of problem setup before saying what Ahamed did, which is the wrong order for
 * someone deciding in ten seconds whether to keep reading. Now it leads with
 * the contribution and the check, and the background sits at the bottom behind
 * a disclosure for the reader who wants it.
 *
 * Static export emits one HTML file per id, so every case URL is directly
 * linkable without client-side routing.
 */
export function generateStaticParams() {
  return cases.map((c) => ({ id: c.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const item = byId(params.id)
  if (!item) return { title: 'Not found | Ahamed Fofana' }
  return { title: `${item.title} | Ahamed Fofana`, description: item.blurb }
}

const diagrams = {
  'policy-hook': PolicyHookDiagram,
  'document-gis': DocumentGisDiagram,
  'agent-fleet': AgentFleetDiagram,
}

export default function CasePage({ params }: { params: { id: string } }) {
  const item = byId(params.id)
  if (!item) notFound()

  const Diagram = item.diagram ? diagrams[item.diagram] : null
  const related = lenses.filter((l) => item.lenses.includes(l.id))

  /* Where this sits on the route, if it is on it. Keeps the two views of the
     same work agreeing with each other instead of drifting apart. */
  const entry = entryById(item.id)
  const station = entry ? stationById(entry.station) : undefined

  /* The check argument opens with two paragraphs; the rest is for the reader
     who wants the whole thing. */
  const checkLead = item.check.body.slice(0, 2)
  const checkRest = item.check.body.slice(2)

  return (
    <article className="mx-auto max-w-frame px-6 py-20">
      <Link
        href="/#route"
        className="font-mono text-[0.8125rem] text-ink-subtle transition-colors hover:text-ink"
      >
        &larr; The route
      </Link>

      <header className="mt-9 border-b border-hairline pb-9">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StatusTag status={item.status} />
          <span className="font-mono text-[0.75rem] text-ink-subtle">
            {item.org} · {item.client}
            {entry ? ` · ${formatMonth(entry.date)}` : ` · ${item.period}`}
            {station ? ` · ${station.city}` : ''}
          </span>
        </div>

        <h1 className="mt-6 max-w-[24ch] text-display-md text-ink">
          {item.title}
        </h1>

        <p className="mt-5 max-w-prose text-[1.125rem] leading-[1.6] text-ink">{item.blurb}</p>
      </header>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">What I built</h2>
        <ul className="mt-5 space-y-3.5">
          {item.contribution.map((c) => (
            <li
              key={c.slice(0, 24)}
              className="max-w-prose border-l border-hairline pl-4 text-[1rem] leading-[1.7] text-ink-muted"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* The check. This is the section the site exists for. */}
      <section className="border-b border-hairline py-14">
        <span className="eyebrow text-ink-subtle">The check</span>
        <h2 className="mt-3 max-w-[34ch] text-card-title text-ink">
          {item.check.title}
        </h2>
        <div className="mt-5 space-y-4">
          {checkLead.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-muted">
              {p}
            </p>
          ))}
        </div>

        {Diagram && <Diagram />}

        {checkRest.length > 0 && (
          <div className="mt-6">
            <Disclosure summary="The rest of the argument" hint={`${checkRest.length} more`}>
              <div className="space-y-4">
                {checkRest.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="max-w-prose text-[1rem] leading-[1.75] text-ink-muted"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Disclosure>
          </div>
        )}
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Architecture</h2>
        <p className="mt-2 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-subtle">
          Open a step for what it does and why it is there.
        </p>
        <div className="mt-5">
          {item.system.map((s, i) => (
            <Disclosure key={s.step} summary={`${s.step}`} open={i === 0}>
              <p className="max-w-prose text-[1rem] leading-[1.7] text-ink-muted">{s.detail}</p>
            </Disclosure>
          ))}
        </div>
      </section>

      <section className="border-b border-hairline py-14">
        <h2 className="text-headline text-ink">Outcome</h2>
        <div className="mt-5 space-y-4">
          {item.outcome.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-muted">
              {p}
            </p>
          ))}
        </div>
        <Testimonial caseId={item.id} />
      </section>

      <section className="border-b border-hairline py-14">
        <Disclosure summary="Why this needed doing" hint="the background">
          <div className="space-y-4">
            {item.problem.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-muted">
                {p}
              </p>
            ))}
          </div>
        </Disclosure>
        <Disclosure summary="Built with" hint={`${item.stack.length} things`}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {item.stack.map((s) => (
              <li key={s} className="font-mono text-[0.8125rem] text-ink-muted">
                {s}
              </li>
            ))}
          </ul>
        </Disclosure>
      </section>

      <section className="py-10">
        <h2 className="text-headline text-ink">Connects to</h2>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2.5">
          {related.map((l) => (
            <li key={l.id}>
              <Link
                href="/#route"
                className="inline-block border border-control px-3 py-1.5 font-mono text-[0.8125rem] text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="max-w-prose border-t border-hairline pt-8 font-mono text-[0.75rem] leading-[1.6] text-ink-subtle">
        Clients are described by sector rather than named. Colleagues and client staff are not
        named. Internal documents, recordings, screenshots, and identifiers are not published.
      </p>
    </article>
  )
}

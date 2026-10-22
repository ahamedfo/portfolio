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
    <article className="pt-12">
      <Link
        href="/#route"
        className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
      >
        &larr; The route
      </Link>

      <header className="mt-9 border-b border-rule pb-9">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StatusTag status={item.status} />
          <span className="font-mono text-[0.75rem] text-ink-3">
            {item.org} · {item.client}
            {entry ? ` · ${formatMonth(entry.date)}` : ` · ${item.period}`}
            {station ? ` · ${station.city}` : ''}
          </span>
        </div>

        <h1 className="display-wide mt-5 max-w-[26ch] text-[2rem] leading-[1.08] text-ink-1 sm:text-[2.75rem]">
          {item.title}
        </h1>

        <p className="mt-5 max-w-prose text-[1.125rem] leading-[1.6] text-ink-1">{item.blurb}</p>
      </header>

      <section className="border-b border-rule py-10">
        <h2 className="text-[1.375rem] text-ink-1">What I built</h2>
        <ul className="mt-5 space-y-3.5">
          {item.contribution.map((c) => (
            <li
              key={c.slice(0, 24)}
              className="max-w-prose border-l border-rule pl-4 text-[1rem] leading-[1.7] text-ink-2"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* The check. This is the section the site exists for. */}
      <section className="border-b border-rule py-10">
        <span className="label text-ink-3">The check</span>
        <h2 className="mt-3 max-w-[36ch] text-[1.375rem] leading-snug text-ink-1">
          {item.check.title}
        </h2>
        <div className="mt-5 space-y-4">
          {checkLead.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-2">
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
                    className="max-w-prose text-[1rem] leading-[1.75] text-ink-2"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Disclosure>
          </div>
        )}
      </section>

      <section className="border-b border-rule py-10">
        <h2 className="text-[1.375rem] text-ink-1">Architecture</h2>
        <p className="mt-2 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-3">
          Open a step for what it does and why it is there.
        </p>
        <div className="mt-5">
          {item.system.map((s, i) => (
            <Disclosure key={s.step} summary={`${s.step}`} open={i === 0}>
              <p className="max-w-prose text-[1rem] leading-[1.7] text-ink-2">{s.detail}</p>
            </Disclosure>
          ))}
        </div>
      </section>

      <section className="border-b border-rule py-10">
        <h2 className="text-[1.375rem] text-ink-1">Outcome</h2>
        <div className="mt-5 space-y-4">
          {item.outcome.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>
        <Testimonial caseId={item.id} />
      </section>

      {/* Published on purpose. A bounded claim is a usable one. */}
      <section className="border-b border-rule py-10">
        <h2 className="text-[1.375rem] text-ink-1">What this does not establish</h2>
        <ul className="mt-5 max-w-prose space-y-3">
          {item.limits.map((l) => (
            <li
              key={l.slice(0, 24)}
              className="border-l-2 border-held/50 pl-4 text-[1rem] leading-[1.7] text-ink-2"
            >
              {l}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-rule py-10">
        <Disclosure summary="Why this needed doing" hint="the background">
          <div className="space-y-4">
            {item.problem.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-prose text-[1rem] leading-[1.75] text-ink-2">
                {p}
              </p>
            ))}
          </div>
        </Disclosure>
        <Disclosure summary="Built with" hint={`${item.stack.length} things`}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {item.stack.map((s) => (
              <li key={s} className="font-mono text-[0.8125rem] text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </Disclosure>
      </section>

      <section className="py-10">
        <h2 className="text-[1.375rem] text-ink-1">Connects to</h2>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2.5">
          {related.map((l) => (
            <li key={l.id}>
              <Link
                href="/#route"
                className="inline-block border border-edge px-3 py-1.5 font-mono text-[0.8125rem] text-ink-2 transition-colors hover:border-ink-1 hover:text-ink-1"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="max-w-prose border-t border-rule pt-8 font-mono text-[0.75rem] leading-[1.6] text-ink-3">
        Clients are described by sector rather than named. Colleagues and client staff are not
        named. Internal documents, recordings, screenshots, and identifiers are not published.
      </p>
    </article>
  )
}

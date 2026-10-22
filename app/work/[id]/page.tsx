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

/**
 * One route for every case study. Adding a case to content/cases.ts adds its
 * page, its static HTML file, and its link from the home page. No layout
 * change, no new route.
 *
 * Static export emits one HTML file per id, so every case URL is directly
 * linkable and does not depend on client-side routing.
 */
export function generateStaticParams() {
  return cases.map((c) => ({ id: c.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const item = byId(params.id)
  if (!item) return { title: 'Not found | Ahamed Fofana' }
  return {
    title: `${item.title} | Ahamed Fofana`,
    description: item.blurb,
  }
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

  return (
    <article className="pt-12">
      <Link
        href="/#work"
        className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
      >
        &larr; Selected work
      </Link>

      <header className="mt-9 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StatusTag status={item.status} />
          <span className="font-mono text-[0.8125rem] text-ink-3">
            {item.org} · {item.client} · {item.period}
          </span>
        </div>

        <h1 className="mt-6 max-w-[40ch] text-[2rem] leading-[1.15] tracking-[-0.01em] text-ink-1 sm:text-[2.75rem]">
          {item.title}
        </h1>

        <div className="mt-7 space-y-4">
          {item.problem.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </header>

      {/* What I did, kept visibly separate from what the team achieved. */}
      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">What I built</h2>
        <ul className="mt-5 space-y-3.5">
          {item.contribution.map((c) => (
            <li
              key={c.slice(0, 24)}
              className="max-w-prose border-l border-line-strong pl-4 text-[1.0625rem] leading-[1.7] text-ink-2"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* The check. This is the section the site exists for. */}
      <section className="border-b border-line py-11">
        <span className="label">The check</span>
        <h2 className="mt-3 max-w-[38ch] text-[1.5rem] leading-snug text-ink-1">
          {item.check.title}
        </h2>
        <div className="mt-5 space-y-4">
          {item.check.body.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>

        {Diagram && <Diagram />}
      </section>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Architecture</h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-[1.7] text-ink-3">
          Open a step for what it does and why it is there.
        </p>
        <div className="mt-6">
          {item.system.map((s, i) => (
            <Disclosure key={s.step} summary={`${i + 1}. ${s.step}`} open={i === 0}>
              <p className="max-w-prose text-[1rem] leading-[1.7] text-ink-2">{s.detail}</p>
            </Disclosure>
          ))}
        </div>
      </section>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Outcome</h2>
        <div className="mt-5 space-y-4">
          {item.outcome.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
              {p}
            </p>
          ))}
        </div>

        <Testimonial caseId={item.id} />
      </section>

      {/* Published on purpose. A bounded claim is a usable one. */}
      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">What this does not establish</h2>
        <ul className="mt-5 max-w-prose list-disc space-y-3 pl-5 text-[1rem] leading-[1.7] text-ink-2">
          {item.limits.map((l) => (
            <li key={l.slice(0, 24)}>{l}</li>
          ))}
        </ul>
      </section>

      <section className="border-b border-line py-11">
        <h2 className="text-[1.5rem] text-ink-1">Built with</h2>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {item.stack.map((s) => (
            <li key={s} className="font-mono text-[0.875rem] text-ink-2">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-11">
        <h2 className="text-[1.5rem] text-ink-1">Connects to</h2>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2.5">
          {related.map((l) => (
            <li key={l.id}>
              <Link
                href="/#connections"
                className="inline-block border border-line-control px-3 py-1.5 font-mono text-[0.8125rem] text-ink-2 transition-colors hover:border-ink-1 hover:text-ink-1"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="max-w-prose border-t border-line pt-8 font-mono text-[0.8125rem] leading-[1.6] text-ink-3">
        Clients are described by sector rather than named. Colleagues and client staff are not
        named. Internal documents, recordings, screenshots, and identifiers are not published.
      </p>
    </article>
  )
}

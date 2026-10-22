import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Disclosure from '@/components/Disclosure'
import {
  researchAreas,
  areaById,
  quantizationStudy,
  otherResearch,
  nlpBuffalo,
  sideProjects,
} from '@/content/research'

/**
 * One page per research area.
 *
 * The quantization study gets the full treatment because it is the one with a
 * frozen analysis behind it. The others get what they actually have, which in
 * two cases is a paragraph, and that is the honest size for them.
 */
export function generateStaticParams() {
  return researchAreas.map((a) => ({ area: a.id }))
}

export function generateMetadata({ params }: { params: { area: string } }): Metadata {
  const a = areaById(params.area)
  if (!a) return { title: 'Not found | Ahamed Fofana' }
  return { title: `${a.title} | Ahamed Fofana`, description: a.line }
}

function Shell({
  area,
  children,
}: {
  area: NonNullable<ReturnType<typeof areaById>>
  children: React.ReactNode
}) {
  return (
    <article className="mx-auto max-w-frame px-6 py-20">
      <Link
        href="/research"
        className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
      >
        &larr; Research
      </Link>

      <header className="mt-9 max-w-prose">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted">
            {area.status}
          </span>
          <span className="font-mono text-[0.6875rem] tnum text-ink-subtle">
            {area.affiliation} &middot; {area.period}
          </span>
        </div>
        <h1 className="mt-5 text-display-md text-ink">{area.title}</h1>
      </header>

      <div className="mt-12">{children}</div>
    </article>
  )
}

export default function ResearchArea({ params }: { params: { area: string } }) {
  const area = areaById(params.area)
  if (!area) notFound()

  if (area.id === 'quantization') {
    const s = quantizationStudy
    return (
      <Shell area={area}>
        <div className="max-w-prose space-y-4">
          {s.question.map((q) => (
            <p key={q.slice(0, 24)} className="text-body-lg leading-relaxed text-ink-muted">
              {q}
            </p>
          ))}
        </div>

        <section className="mt-section">
          <h2 className="text-headline text-ink">How it was set up</h2>
          <dl className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {s.design.map((d) => (
              <div key={d.label} className="panel p-5">
                <dd className="font-mono text-headline tnum leading-none text-ink">{d.value}</dd>
                <dt className="eyebrow mt-3 text-ink-subtle">{d.label}</dt>
                <dd className="mt-3 text-body-sm leading-relaxed text-ink-muted">{d.note}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-prose text-body leading-relaxed text-ink-muted">{s.kuber}</p>
        </section>

        <section className="mt-section">
          <h2 className="text-headline text-ink">What came back</h2>
          <p className="mt-3 max-w-prose text-body text-ink-subtle">
            Each result comes with the edge of what it covers. That edge is not a hedge. It is
            what separates a finding from a slogan.
          </p>

          <div className="mt-10 space-y-6">
            {s.findings.map((f) => (
              <div key={f.claim.slice(0, 24)} className="panel p-6 sm:p-8">
                <h3 className="max-w-[44ch] text-card-title text-ink">{f.claim}</h3>
                <p className="mt-4 max-w-prose text-body leading-relaxed text-ink-muted">
                  {f.detail}
                </p>
                <p className="mt-5 max-w-prose rounded-md bg-surface-2 p-4 text-body-sm leading-relaxed text-ink-muted">
                  <span className="eyebrow mr-2 text-chart-held">Edge</span>
                  {f.bound}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-section max-w-prose">
          <h2 className="text-headline text-ink">How it was kept honest</h2>
          <div className="mt-6">
            <Disclosure summary="Method and statistics" hint={`${s.method.length} points`}>
              <ul className="list-disc space-y-3 pl-5 text-body-sm leading-relaxed text-ink-muted">
                {s.method.map((m) => (
                  <li key={m.slice(0, 24)}>{m}</li>
                ))}
              </ul>
            </Disclosure>
            <Disclosure summary="What is still open" hint={`${s.openWork.length} points`}>
              <ul className="list-disc space-y-3 pl-5 text-body-sm leading-relaxed text-ink-muted">
                {s.openWork.map((m) => (
                  <li key={m.slice(0, 24)}>{m}</li>
                ))}
              </ul>
            </Disclosure>
          </div>
        </section>
      </Shell>
    )
  }

  if (area.id === 'nlp-buffalo') {
    return (
      <Shell area={area}>
        <div className="max-w-prose space-y-5">
          {nlpBuffalo.body.map((b) => (
            <p key={b.slice(0, 24)} className="text-body-lg leading-relaxed text-ink-muted">
              {b}
            </p>
          ))}
          <a
            href={nlpBuffalo.repo}
            className="inline-block rounded-md bg-surface-1 px-4 py-2.5 text-body-sm text-ink transition-colors hover:bg-surface-2"
          >
            The topic-modelling code on GitHub &rarr;
          </a>
        </div>
      </Shell>
    )
  }

  if (area.id === 'earlier') {
    return (
      <Shell area={area}>
        <p className="max-w-prose text-body-lg leading-relaxed text-ink-muted">
          Side projects, and experiments that stopped. They are here because a result that did
          not work out is still a result, and because the rule that killed one of them was
          written down before anything ran.
        </p>
        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          {sideProjects.map((p) => (
            <div key={p.id} className="panel p-6">
              <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted">
                {p.stage}
              </span>
              <h3 className="mt-4 max-w-[30ch] text-body text-ink">{p.title}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Shell>
    )
  }

  const project = otherResearch.find((o) => o.id === area.id)
  if (!project) notFound()
  return (
    <Shell area={area}>
      <p className="max-w-prose text-body-lg leading-relaxed text-ink-muted">{project.question}</p>
    </Shell>
  )
}

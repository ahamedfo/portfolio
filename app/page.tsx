import Link from 'next/link'
import RouteDiagram from '@/components/route/RouteDiagram'
import RouteList from '@/components/route/RouteList'
import Disclosure from '@/components/Disclosure'
import CaseCard from '@/components/CaseCard'
import StatusTag from '@/components/StatusTag'
import { featuredCases } from '@/content/cases'
import { secondary } from '@/content/secondary'
import { quantizationStudy } from '@/content/research'
import { profile } from '@/content/profile'
import { award } from '@/content/recognition'
import { latestDate } from '@/content/log'
import { formatMonth } from '@/content/route'

/**
 * The route owns the first viewport.
 *
 * Everything that used to be a stacked text section on this page is either in
 * the diagram now or has moved behind it. The capability lenses in particular
 * are gone as a section: they are the filters above the route.
 */
export default function Home() {
  return (
    <div>
      <section className="pb-10 pt-14">
        <h1 className="display-wide max-w-[22ch] text-[2.25rem] leading-[1.04] text-ink-1 sm:text-[3.5rem]">
          {profile.headline}
        </h1>

        <div className="mt-7 grid gap-x-14 gap-y-5 lg:grid-cols-[1.1fr_1fr]">
          <p className="max-w-[46ch] text-[1.125rem] leading-[1.55] text-ink-1 sm:text-[1.25rem]">
            {profile.supportingLine}
          </p>
          <p className="max-w-prose text-[1rem] leading-[1.7] text-ink-2">{profile.intro[0]}</p>
        </div>
      </section>

      <section id="route" className="scroll-mt-8 border-t border-rule pt-10">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <h2 className="text-[1.625rem] text-ink-1">The route</h2>
            <p className="mt-2 max-w-prose text-[1rem] leading-[1.7] text-ink-2">
              Four places, two lines, and everything I have put down along the way. Point at a
              mark to see what it was. The two lines run at once on purpose: research overlapping
              a job is not a gap in it.
            </p>
          </div>
          <p className="font-mono text-[0.75rem] tnum text-ink-3">
            Last entry {formatMonth(latestDate)}
          </p>
        </div>

        {/* Below lg the diagram is hidden entirely and the list carries it. */}
        <div className="mt-8 hidden lg:block">
          <RouteDiagram />
        </div>

        <div className="mt-8 lg:mt-12">
          <h3 className="sr-only">The route in full</h3>
          <RouteList />
        </div>
      </section>

      <section id="work" className="scroll-mt-8 border-t border-rule pt-12">
        <h2 className="text-[1.625rem] text-ink-1">Selected work</h2>
        <p className="mt-2 max-w-prose text-[1rem] leading-[1.7] text-ink-2">
          Four of those marks, in full. Each page carries the architecture, what I personally did,
          the check I put around the model, and what the work does not establish.
        </p>

        <div className="mt-9">
          {featuredCases.map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </div>
      </section>

      <section id="additional" className="scroll-mt-8 border-t border-rule pt-12">
        <h2 className="text-[1.625rem] text-ink-1">Additional client work</h2>
        <p className="mt-2 max-w-prose text-[1rem] leading-[1.7] text-ink-2">
          Shorter engagements where the honest version is smaller than a case study. Open one for
          what is supported and, just as importantly, what is not.
        </p>

        <div className="mt-7">
          {secondary.map((item) => (
            <Disclosure key={item.id} summary={item.title} hint={item.client}>
              <div className="space-y-4">
                <p className="max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
                  {item.established}
                </p>
                <p className="max-w-prose border-l-2 border-held/50 pl-4 text-[0.9375rem] leading-[1.7] text-ink-2">
                  <span className="mr-2 font-mono text-[0.6875rem] uppercase leading-4 tracking-label text-held">
                    Not established
                  </span>
                  {item.notEstablished}
                </p>
              </div>
            </Disclosure>
          ))}
        </div>
      </section>

      <section id="research" className="scroll-mt-8 border-t border-rule pt-12">
        <h2 className="text-[1.625rem] text-ink-1">Research</h2>

        <div className="mt-7 border border-rule bg-plate p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusTag status="Research in progress" />
            <span className="font-mono text-[0.75rem] text-ink-3">
              {quantizationStudy.affiliation}
            </span>
          </div>

          <h3 className="mt-4 max-w-[34ch] text-[1.5rem] leading-snug text-ink-1">
            <Link href="/research" className="transition-colors hover:text-research">
              {quantizationStudy.title}
            </Link>
          </h3>

          <p className="mt-3 max-w-prose text-[1rem] leading-[1.7] text-ink-2">
            {quantizationStudy.question[0]}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {quantizationStudy.design.map((d) => (
              <div key={d.label}>
                <dt className="label text-ink-3">{d.label}</dt>
                <dd className="mt-1 font-mono text-[1.125rem] tnum text-ink-1">{d.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/research"
            className="mt-8 inline-block border-b border-research/50 pb-0.5 font-mono text-[0.75rem] text-research transition-colors hover:border-research"
          >
            Findings, and the bound on each one &rarr;
          </Link>
        </div>
      </section>

      <section id="recognition" className="scroll-mt-8 border-t border-rule pt-12">
        <h2 className="text-[1.625rem] text-ink-1">Recognition</h2>
        <div className="mt-6">
          <Disclosure summary={`${award.category}, ${award.event}`} hint={award.date}>
            <div className="max-w-prose space-y-2.5 text-[0.9375rem] leading-[1.7] text-ink-2">
              <p>
                Judged on the {award.criterion.toLowerCase()}. {award.shared}
              </p>
              <p className="text-ink-3">{award.note}</p>
            </div>
          </Disclosure>
          <Disclosure summary="Written feedback from clients and colleagues" hint="none published">
            <p className="max-w-prose text-[0.9375rem] leading-[1.7] text-ink-2">
              It sits on the case study it corroborates rather than in a wall of quotes, and none
              of it is published yet, because reuse permission for the wording and the attribution
              has not been obtained.
            </p>
          </Disclosure>
        </div>
      </section>

      <section id="contact" className="scroll-mt-8 border-t border-rule pt-12">
        <h2 className="text-[1.625rem] text-ink-1">Contact</h2>
        <p className="mt-2 max-w-prose text-[1rem] leading-[1.7] text-ink-2">
          Email is the fastest way to reach me. More on the{' '}
          <Link
            href="/about"
            className="text-ink-1 underline decoration-edge underline-offset-4 transition-colors hover:decoration-research"
          >
            about page
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          {[
            [`mailto:${profile.email}`, profile.email],
            [profile.linkedin, 'LinkedIn'],
            [profile.github, 'GitHub'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-[0.875rem] text-ink-1 underline decoration-edge underline-offset-4 transition-colors hover:decoration-research"
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

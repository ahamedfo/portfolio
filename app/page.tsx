import Link from 'next/link'
import Praise from '@/components/Praise'
import Disclosure from '@/components/Disclosure'
import { profile, skills, education, languages } from '@/content/profile'
import { industryRoles, researchRoles, type Role } from '@/content/roles'
import { hasPraise } from '@/content/praise'
import { quantizationStudy, otherResearch } from '@/content/research'
import { secondary } from '@/content/secondary'
import { award } from '@/content/recognition'
import { byId } from '@/content/cases'
import { log } from '@/content/log'
import { teaching, earlier } from '@/content/teaching'

export const dynamic = 'force-static'

/**
 * The landing page is the resume version.
 *
 * It used to be the journey. Ahamed's call to swap them: someone arriving cold
 * wants to know who he is and what he has done before they want to travel
 * anywhere, and a plain page reads smoother as a first impression even if it
 * is quieter. The journey is still there, one click away, and it is the thing
 * worth seeing second.
 *
 * Two things sit where they belong rather than in a generic section:
 *   - the quantization study links directly under Queen Mary, not under a
 *     broad "Research" heading several screens away
 *   - praise sits under the role it is about
 */
function RoleBlock({ role, children }: { role: Role; children?: React.ReactNode }) {
  return (
    <div className="border-t border-hairline py-10 first:border-t-0 first:pt-0">
      <div className="grid gap-x-12 gap-y-4 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="font-mono text-caption tnum text-ink-subtle">{role.period}</p>
          <p className="eyebrow mt-1.5 text-ink-subtle">{role.location}</p>
        </div>
        <div>
          <h3 className="text-card-title text-ink">{role.org}</h3>
          <p className="mt-1 text-body text-ink-muted">{role.title}</p>

          <ul className="mt-5 max-w-prose space-y-3">
            {role.bullets.map((b) => (
              <li key={b.slice(0, 24)} className="text-body-sm leading-relaxed text-ink-muted">
                {b}
              </li>
            ))}
          </ul>

          {children}

          {role.seeAlso && role.seeAlso.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {role.seeAlso.map((id) => (
                <Link
                  key={id}
                  href={`/work/${id}`}
                  className="rounded-md bg-surface-1 px-3 py-1.5 text-body-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {byId(id)?.shortTitle ?? id}
                </Link>
              ))}
            </div>
          )}

          {hasPraise(role.id) && <Praise roleId={role.id} />}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const qm = researchRoles.find((r) => r.id === 'queen-mary')
  const otherResearchRoles = researchRoles.filter((r) => r.id !== 'queen-mary')

  return (
    <div className="mx-auto max-w-frame px-6 py-20">
      <header className="max-w-prose">
        <h1 className="text-display-md text-ink">{profile.name}</h1>
        <p className="mt-3 text-subhead text-ink-muted">
          AI Forward Deployed Engineer, IBM Client Engineering &middot; {profile.location}
        </p>
        <p className="mt-7 text-body-lg leading-relaxed text-ink">{profile.headline}</p>
        <p className="mt-4 text-body leading-relaxed text-ink-muted">{profile.intro[0]}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/journey"
            className="rounded-md bg-primary px-4 py-2.5 text-body-sm font-medium text-white transition-shadow hover:shadow-[0_0_0_1px_#828fff]"
          >
            Walk it as a journey
          </Link>
          <Link
            href="/work"
            className="rounded-md bg-surface-1 px-4 py-2.5 text-body-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            All {log.length - 1} pieces of work
          </Link>
        </div>
      </header>

      <section className="mt-section">
        <h2 className="text-headline text-ink">Experience</h2>
        <div className="mt-8">
          {industryRoles.map((r) => (
            <RoleBlock key={r.id} role={r} />
          ))}
        </div>
      </section>

      <section className="mt-section">
        <h2 className="text-headline text-ink">Research</h2>
        <p className="mt-3 max-w-prose text-body text-ink-subtle">
          Listed apart from the roles above because they overlap with them. An overlapping
          research appointment is not a gap in employment.
        </p>

        <div className="mt-8">
          {qm && (
            <RoleBlock role={qm}>
              {/* The study lives here, under the appointment it belongs to. */}
              <Link
                href="/research"
                className="panel mt-6 block max-w-prose p-5 transition-colors hover:bg-surface-2"
              >
                <p className="eyebrow text-ink-subtle">The study, in full</p>
                <p className="mt-2 text-body text-ink">{quantizationStudy.title}</p>
                <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                  {quantizationStudy.design.slice(0, 4).map((d) => (
                    <div key={d.label} className="flex items-baseline gap-2">
                      <dd className="font-mono text-body-sm tnum text-ink">{d.value}</dd>
                      <dt className="font-mono text-[0.6875rem] text-ink-subtle">
                        {d.label.toLowerCase()}
                      </dt>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-body-sm text-primary-hover">
                  Findings, and the bound on each one &rarr;
                </p>
              </Link>
            </RoleBlock>
          )}

          {otherResearchRoles.map((r) => (
            <RoleBlock key={r.id} role={r}>
              {otherResearch.some((o) => o.affiliation.includes(r.org.split(',')[0])) && (
                <Link
                  href={`/research#${
                    otherResearch.find((o) => o.affiliation.includes(r.org.split(',')[0]))?.id ?? ''
                  }`}
                  className="mt-5 inline-block text-body-sm text-primary-hover underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary-hover"
                >
                  Read more &rarr;
                </Link>
              )}
            </RoleBlock>
          ))}
        </div>
      </section>

      <section id="teaching" className="mt-section scroll-mt-32">
        <h2 className="text-headline text-ink">Teaching</h2>
        <p className="mt-3 max-w-prose text-body text-ink-muted">
          Three years of undergraduate computer science, across three courses. It is on this
          page rather than buried because the job is the same one I do now: explain a technical
          thing to someone who does not have it yet, watch whether it landed, adjust.
        </p>

        <div className="mt-8">
          {teaching.map((t) => (
            <div
              key={t.id}
              className="grid gap-x-12 gap-y-4 border-t border-hairline py-8 first:border-t-0 first:pt-0 lg:grid-cols-[14rem_1fr]"
            >
              <div>
                <p className="font-mono text-caption tnum text-ink-subtle">{t.period}</p>
                <p className="eyebrow mt-1.5 text-ink-subtle">{t.institution}</p>
              </div>
              <div>
                <h3 className="text-body text-ink">
                  {t.course}
                  <span className="text-ink-subtle"> &middot; {t.subject}</span>
                </h3>
                <p className="mt-2.5 max-w-prose text-body-sm leading-relaxed text-ink-muted">
                  {t.detail}
                </p>
                {t.topics.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                    {t.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-sm bg-surface-1 px-2 py-1 font-mono text-[0.6875rem] text-ink-subtle"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-hairline pt-6">
          <p className="eyebrow text-ink-subtle">Earlier</p>
          <ul className="mt-4 space-y-3">
            {earlier.map((e) => (
              <li key={e.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-body-sm text-ink">{e.org}</span>
                <span className="text-body-sm text-ink-muted">{e.role}</span>
                <span className="font-mono text-[0.6875rem] tnum text-ink-subtle">{e.period}</span>
                <span className="w-full max-w-prose text-body-sm text-ink-subtle">{e.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-section grid gap-x-12 gap-y-10 lg:grid-cols-2">
        <div>
          <h2 className="text-headline text-ink">Education</h2>
          <dl className="mt-7">
            {education.map((e) => (
              <div key={e.school} className="border-t border-hairline py-5 first:border-t-0 first:pt-0">
                <dt className="text-body text-ink">{e.school}</dt>
                <dd className="mt-1 text-body-sm text-ink-muted">{e.degree}</dd>
                <dd className="mt-1 font-mono text-caption tnum text-ink-subtle">
                  {e.note} &middot; {e.location}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-headline text-ink">Credentials and tools</h2>
          <dl className="mt-7">
            {skills.map((g) => (
              <div key={g.group} className="border-t border-hairline py-5 first:border-t-0 first:pt-0">
                <dt className="eyebrow text-ink-subtle">{g.group}</dt>
                <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                  {g.items.map((i) => (
                    <span key={i} className="text-body-sm text-ink-muted">
                      {i}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
            <div className="border-t border-hairline py-5">
              <dt className="eyebrow text-ink-subtle">Languages</dt>
              <dd className="mt-2 text-body-sm text-ink-muted">{languages.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-section">
        <h2 className="text-headline text-ink">More</h2>
        <div className="mt-6 max-w-prose">
          <Disclosure summary="Shorter client engagements" hint={`${secondary.length} of them`}>
            <div className="space-y-7">
              {secondary.map((item) => (
                <div key={item.id}>
                  <p className="text-body text-ink">{item.title}</p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-ink-subtle">{item.client}</p>
                  <p className="mt-2.5 max-w-prose text-body-sm leading-relaxed text-ink-muted">
                    {item.established}
                  </p>
                  <p className="mt-3 max-w-prose border-l-2 border-chart-held/50 pl-4 text-body-sm leading-relaxed text-ink-muted">
                    <span className="eyebrow mr-2 text-chart-held">Not established</span>
                    {item.notEstablished}
                  </p>
                </div>
              ))}
            </div>
          </Disclosure>

          <Disclosure summary={`${award.category}, ${award.event}`} hint={award.date}>
            <div className="max-w-prose space-y-2.5 text-body-sm leading-relaxed text-ink-muted">
              <p>
                Judged on the {award.criterion.toLowerCase()}. {award.shared}
              </p>
              <p className="text-ink-subtle">{award.note}</p>
            </div>
          </Disclosure>
        </div>
      </section>

      <section className="mt-section">
        <h2 className="text-headline text-ink">Contact</h2>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          {[
            [`mailto:${profile.email}`, profile.email],
            [profile.linkedin, 'LinkedIn'],
            [profile.github, 'GitHub'],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-body text-ink underline decoration-control underline-offset-4 transition-colors hover:decoration-primary-hover"
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

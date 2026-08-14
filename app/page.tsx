import Timeline from '@/components/Timeline'
import { getWorkEntries, getExperienceEntries } from '@/lib/entries'
import { personalInfo } from '@/lib/data'

export default function Home() {
  const work = getWorkEntries()
  const experience = getExperienceEntries()

  return (
    <div>
      <section className="pb-24 pt-16 sm:pt-20">
        <h1 className="max-w-[19ch] text-[2.5rem] leading-[1.1] tracking-[-0.01em] text-ink-1 sm:text-[3.5rem]">
          Inference, and the infrastructure agents run on.
        </h1>

        <p className="mt-8 max-w-[54ch] text-[1.125rem] leading-[1.7] text-ink-2 sm:text-[1.25rem]">
          I&rsquo;m Ahamed Fofana. I&rsquo;m an AI engineer at IBM and a researcher at NYU&rsquo;s
          OSIRIS Lab and Queen Mary London, finishing an MS in Cybersecurity at NYU. I work on what
          happens to language models once they leave the benchmark: compressed to fit the hardware,
          split across machines, and wired into systems that have to keep running.
        </p>
      </section>

      <Timeline title="What I&rsquo;m working on" entries={work} />

      <div className="mt-28">
        <Timeline title="Experience" entries={experience} />
      </div>

      <section className="mt-28 border-t border-line pt-10">
        <h2 className="text-2xl text-ink-1">Contact</h2>
        <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
          The fastest way to reach me is email.
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="mt-5 inline-block font-mono text-[0.9375rem] text-ink-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
        >
          {personalInfo.email}
        </a>
      </section>
    </div>
  )
}

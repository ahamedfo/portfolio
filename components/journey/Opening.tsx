import { profile } from '@/content/profile'
import { stations } from '@/content/route'

/**
 * The first screen. A thesis and nothing else.
 *
 * Display runs at 80px with -3px tracking, which is the system's largest step
 * and the only place it is used. Everything under it is one line. The scroll
 * cue is the only other thing on the screen, because the next thing a visitor
 * should do is travel.
 */
export default function Opening() {
  const first = stations[0]

  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col justify-center py-20">
      <div className="mx-auto w-full max-w-frame px-6">
        <p className="eyebrow rise text-ink-subtle">Applied AI engineer &middot; New York</p>

        <h1
          className="rise mt-7 max-w-[17ch] text-display-md text-ink sm:text-display-lg lg:text-display-xl"
          style={{ ['--rise-delay' as string]: '70ms' }}
        >
          {profile.headline}
        </h1>

        <p
          className="rise mt-9 max-w-[52ch] text-subhead text-ink-muted"
          style={{ ['--rise-delay' as string]: '150ms' }}
        >
          {profile.supportingLine}
        </p>

        <a
          href={`#${first.id}`}
          className="rise mt-14 inline-flex items-center gap-3 rounded-md text-body-sm text-ink-subtle transition-colors hover:text-ink"
          style={{ ['--rise-delay' as string]: '230ms' }}
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full border border-hairline-strong"
          >
            &darr;
          </span>
          Start in {first.city}, 2019
        </a>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { profile } from '@/content/profile'

/**
 * Name on the left, the three destinations on the right, one hairline under it.
 *
 * A skip link comes first in the DOM so a keyboard or screen reader user can
 * get past the header without tabbing through it on every page.
 */
export default function Nav() {
  return (
    <header className="border-b border-line">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink-1 focus:bg-paper focus:px-3 focus:py-2 focus:font-mono focus:text-[0.8125rem] focus:text-ink-1"
      >
        Skip to content
      </a>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-6">
        <Link
          href="/"
          className="font-mono text-[0.8125rem] font-medium text-ink-1 transition-colors hover:text-signal"
        >
          Ahamed Fofana
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <Link
            href="/#work"
            className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
          >
            Work
          </Link>
          <Link
            href="/research"
            className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
          >
            Research
          </Link>
          <Link
            href="/about"
            className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
          >
            About
          </Link>
          <a
            href={profile.github}
            className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  )
}

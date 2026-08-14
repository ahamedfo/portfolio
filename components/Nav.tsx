import Link from 'next/link'
import { personalInfo } from '@/lib/data'

/**
 * Name on the left, one outbound link on the right, a single hairline under
 * it. This is the only rule on the page that is not part of the timeline.
 */
export default function Nav() {
  return (
    <header className="flex items-baseline justify-between border-b border-line py-7">
      <Link
        href="/"
        className="font-mono text-[0.8125rem] font-medium text-ink-1 transition-colors hover:text-signal"
      >
        Ahamed Fofana
      </Link>

      <nav className="flex items-baseline gap-6">
        <Link
          href="/about"
          className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
        >
          About
        </Link>
        <a
          href={personalInfo.github}
          className="font-mono text-[0.8125rem] text-ink-3 transition-colors hover:text-ink-1"
        >
          GitHub
        </a>
      </nav>
    </header>
  )
}

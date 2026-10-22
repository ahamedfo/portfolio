import Link from 'next/link'
import { profile } from '@/content/profile'

/**
 * 56px sticky bar on canvas, wordmark left, links right.
 *
 * It is translucent with a blur so the journey scrolls under it rather than
 * being chopped by an opaque band. The skip link is first in the DOM.
 */
const links = [
  ['/work', 'Work'],
  ['/research', 'Research'],
  ['/about', 'About'],
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-body-sm focus:text-ink"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-14 max-w-frame items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-body-sm font-medium text-ink transition-opacity hover:opacity-80"
        >
          {/* The brand mark is one of the three places lavender is allowed. */}
          <span aria-hidden className="block h-2 w-2 rounded-[2px] bg-primary" />
          Ahamed Fofana
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-1.5 text-body-sm text-ink-subtle transition-colors hover:text-ink"
            >
              {label}
            </Link>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="ml-2 rounded-md bg-primary px-3.5 py-2 text-body-sm font-medium text-white transition-shadow hover:shadow-[0_0_0_1px_#828fff]"
          >
            Email me
          </a>
        </nav>
      </div>
    </header>
  )
}

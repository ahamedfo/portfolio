import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-frame px-6 py-32">
      <h1 className="text-display-md text-ink">That page is not here</h1>
      <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted">
        The link may be old, or the work may have moved. The selected work and the research are
        both on the home page.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block border-b border-primary/40 pb-0.5 font-mono text-[0.8125rem] text-primary-hover transition-colors hover:border-primary"
      >
        Go home &rarr;
      </Link>
    </div>
  )
}

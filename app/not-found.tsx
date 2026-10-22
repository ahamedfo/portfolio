import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-24">
      <h1 className="text-[2rem] leading-tight text-ink-1">That page is not here</h1>
      <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-2">
        The link may be old, or the work may have moved. The selected work and the research are
        both on the home page.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block border-b border-research/40 pb-0.5 font-mono text-[0.8125rem] text-research transition-colors hover:border-research"
      >
        Go home &rarr;
      </Link>
    </div>
  )
}

import type { Metadata } from 'next'
import WorkIndex from '@/components/WorkIndex'
import { log } from '@/content/log'

export const metadata: Metadata = {
  title: 'Work | Ahamed Fofana',
  description:
    'Every piece of work, newest first, filterable by capability. Agent workflows, the checks around them, client delivery, and research.',
}

export default function Work() {
  return (
    <div className="mx-auto max-w-frame px-6 py-20">
      <header className="max-w-prose">
        <p className="eyebrow text-ink-subtle">Work</p>
        <h1 className="mt-4 text-display-md text-ink">What I have built</h1>
        <p className="mt-5 text-subhead text-ink-muted">
          Client work, research and credentials, newest first. Filter it by what the work has
          in common.
        </p>
      </header>

      <div className="mt-14">
        <WorkIndex />
      </div>
    </div>
  )
}

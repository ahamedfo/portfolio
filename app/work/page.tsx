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
        <p className="eyebrow text-ink-subtle">{log.length} entries</p>
        <h1 className="mt-4 text-display-md text-ink">Everything, in one list.</h1>
        <p className="mt-5 text-subhead text-ink-muted">
          The same work the journey walks through, without the walking. Two of these are
          marked not established, which is deliberate.
        </p>
      </header>

      <div className="mt-14">
        <WorkIndex />
      </div>
    </div>
  )
}

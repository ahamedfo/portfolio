import Rail from '@/components/journey/Rail'
import Opening from '@/components/journey/Opening'
import Station from '@/components/journey/Station'
import Closing from '@/components/journey/Closing'
import { stations, entriesAtStation, stintsAtStation } from '@/content/route'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The journey | Ahamed Fofana',
  description:
    'Buffalo, New York, San Francisco, New York again. Every piece of work, at the place it happened.',
}

/**
 * The journey.
 *
 * This page is six screens and nothing else. No case cards, no research panel,
 * no contact block, no list of seventeen entries with their prose. All of that
 * is reachable from the marks, from the nav, and from the closing screen.
 *
 * It used to be eight stacked sections rendering 2,104 words. A chart on top
 * of a document is still a document, which is what the last version was.
 */
export default function Home() {
  return (
    <>
      <Opening />
      <Rail />
      {stations.map((s, i) => (
        <Station
          key={s.id}
          station={s}
          stints={stintsAtStation(s.id)}
          entries={entriesAtStation(s.id)}
          isLast={i === stations.length - 1}
        />
      ))}
      <Closing />
    </>
  )
}

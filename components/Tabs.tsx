'use client'

import { useState } from 'react'

export type Panel = { id: string; label: string; content: React.ReactNode }

/**
 * Two panels, one visible at a time.
 *
 * Both panels stay mounted in the DOM and the inactive one is hidden with the
 * `hidden` attribute rather than unmounted, so the content is present for
 * search engines and for anyone who lands with JavaScript disabled or still
 * loading. The crossfade is 200ms and disappears under prefers-reduced-motion.
 */
export default function Tabs({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(panels[0]?.id)

  return (
    <div>
      <div role="tablist" aria-label="Sections" className="flex border-b border-line">
        {panels.map((p) => {
          const on = p.id === active
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={on}
              aria-controls={`panel-${p.id}`}
              onClick={() => setActive(p.id)}
              className={`-mb-px border-b-2 pb-4 pr-9 text-left text-2xl transition-colors ${
                on
                  ? 'border-ink-1 text-ink-1'
                  : 'border-transparent text-ink-3 hover:text-ink-2'
              }`}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      {panels.map((p) => (
        <div
          key={p.id}
          role="tabpanel"
          id={`panel-${p.id}`}
          aria-labelledby={`tab-${p.id}`}
          hidden={p.id !== active}
          className={p.id === active ? 'settle' : undefined}
        >
          {p.content}
        </div>
      ))}
    </div>
  )
}

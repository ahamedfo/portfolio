'use client'

import { useEffect, useState } from 'react'
import { stations } from '@/content/route'
import { lineStroke } from './marks'

/**
 * The rail. Pinned under the nav for the whole journey.
 *
 * Two things make this work without being a scroll-hijacking mess:
 *
 * 1. Every station is a plain anchor link to its screen's id. That is the
 *    entire navigation. Keyboard, browser history, middle-click and the
 *    no-JavaScript case all work with no code, because they are just links.
 *    `scroll-padding-top` in globals.css keeps the landing heading clear of
 *    this bar.
 *
 * 2. An IntersectionObserver watches the screens and marks one active. It
 *    only moves a highlight. Nothing about reading or navigating the page
 *    depends on it running, so the progressive-enhancement story is honest.
 *
 * The marker slides between stations. Under reduced motion the transition is
 * dropped and it jumps, which is correct: the information is "where am I",
 * not the travel itself.
 */
export default function Rail() {
  const [active, setActive] = useState<string>(stations[0].id)

  useEffect(() => {
    const screens = stations
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (screens.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        // The screen covering the middle of the viewport is the one you are at.
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    screens.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    stations.findIndex((s) => s.id === active),
  )
  // Evenly spaced stops. The rail is a diagram of the sequence, not of elapsed
  // time, so the gaps carry no meaning and should not pretend to.
  const step = 100 / (stations.length - 1)

  return (
    <div className="sticky top-14 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto max-w-frame px-6 py-4">
        <div className="relative">
          {/* the line */}
          <div aria-hidden className="absolute left-0 right-0 top-[5px] h-px bg-hairline-strong" />
          <div
            aria-hidden
            className="absolute left-0 top-[5px] h-px transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${activeIndex * step}%`,
              background: lineStroke.industry,
            }}
          />

          <nav aria-label="Journey" className="relative flex justify-between">
            {stations.map((s, i) => {
              const on = s.id === active
              const passed = i <= activeIndex
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={on ? 'true' : undefined}
                  className="group flex flex-col items-center gap-2 rounded-md px-1"
                >
                  <span
                    aria-hidden
                    className={`block h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300 motion-reduce:transition-none ${
                      on
                        ? 'border-ink bg-ink'
                        : passed
                          ? 'border-hairline-strong bg-hairline-strong'
                          : 'border-hairline-strong bg-canvas'
                    }`}
                  />
                  <span
                    className={`eyebrow transition-colors duration-300 motion-reduce:transition-none ${
                      on ? 'text-ink' : 'text-ink-subtle group-hover:text-ink-muted'
                    }`}
                  >
                    {s.code}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

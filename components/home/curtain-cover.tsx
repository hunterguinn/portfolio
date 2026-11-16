"use client"

import { useEffect, useRef } from "react"

/**
 * Scroll-linked curtain: a panel covers the cover media and lifts away as it scrolls
 * through the viewport, while the media settles from a slight zoom.
 */
export function CurtainCover({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const curtain = panel.current
    const inner = media.current
    if (!el || !curtain || !inner) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      const progress = reduced.matches
        ? 1
        : (() => {
            const rect = el.getBoundingClientRect()
            const start = window.innerHeight * 0.95
            const end = window.innerHeight * 0.4
            return Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
          })()
      const eased = 1 - Math.pow(1 - progress, 3)
      curtain.style.transform = `scaleY(${1 - eased})`
      curtain.style.visibility = eased >= 1 ? "hidden" : "visible"
      inner.style.transform = `scale(${1.08 - 0.08 * eased})`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <div ref={root} className="relative overflow-hidden rounded-lg">
      <div ref={media} className="origin-center will-change-transform">
        {children}
      </div>
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-top bg-background will-change-transform"
      />
    </div>
  )
}

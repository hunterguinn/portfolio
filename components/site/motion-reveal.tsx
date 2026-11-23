"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Keep in sync with --motion-trigger-offset, --motion-stagger and --motion-stagger-cap in styles/tokens.css. */
const TRIGGER_OFFSET = 48
const STAGGER_MS = 120
const STAGGER_CAP_MS = 360

/**
 * Reveals every [data-reveal] content unit once, as its leading edge passes 48px inside the viewport.
 * Units already on screen at load are never hidden. Units skipped by a fast scroll or anchor jump appear
 * instantly so no backlog of delayed reveals builds up. Units entering in the same frame stagger in
 * reading order (heading, then intro, then cards) by 120ms, capped at 360ms.
 */
export function MotionReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return

    const threshold = window.innerHeight - TRIGGER_OFFSET
    const pending = new Set(
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
        (element) => element.getBoundingClientRect().top >= threshold,
      ),
    )
    if (pending.size === 0) return
    pending.forEach((element) => element.setAttribute("data-pending", ""))

    const reveal = (element: HTMLElement, delay: number, instant = false) => {
      if (!pending.delete(element)) return
      observer.unobserve(element)
      if (instant) element.setAttribute("data-instant", "")
      element.style.setProperty("--reveal-delay", `${delay}ms`)
      element.removeAttribute("data-pending")
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting && pending.has(entry.target as HTMLElement))
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        entering.forEach((element, index) => reveal(element, Math.min(index * STAGGER_MS, STAGGER_CAP_MS)))
      },
      { rootMargin: `0px 0px -${TRIGGER_OFFSET}px 0px` },
    )
    pending.forEach((element) => observer.observe(element))

    let frame = 0
    const revealSkipped = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        for (const element of pending) {
          if (element.getBoundingClientRect().bottom < 0) reveal(element, 0, true)
        }
        if (pending.size === 0) window.removeEventListener("scroll", revealSkipped)
      })
    }
    window.addEventListener("scroll", revealSkipped, { passive: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", revealSkipped)
    }
  }, [pathname])

  return null
}

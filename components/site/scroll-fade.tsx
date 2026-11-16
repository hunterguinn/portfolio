"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Must match the targets listed under "Scroll fade" in globals.css. */
const TARGETS = "main :is(h1, h2, h3, p, blockquote, figure, article, .card-surface, .fade-item)"

/**
 * Fades every title, text block and card in as it enters the viewport. Elements are hidden by CSS from the
 * first paint; this marks them as shown. Targets nested inside another target ride along with their parent.
 */
export function ScrollFade() {
  const pathname = usePathname()

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGETS))
    const show = (el: HTMLElement) => el.setAttribute("data-in", "")

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach(show)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    )

    for (const el of targets) {
      const nested = el.parentElement?.closest(TARGETS)
      if (nested) show(el)
      else observer.observe(el)
    }
    return () => observer.disconnect()
  }, [pathname])

  return null
}

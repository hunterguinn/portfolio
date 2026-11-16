"use client"

import { useEffect, useRef, useState } from "react"

type EyebrowEntry = {
  element: HTMLParagraphElement
  setActive: (active: boolean) => void
}

const entries = new Set<EyebrowEntry>()
let updateFrame = 0

function updateActiveEyebrow() {
  cancelAnimationFrame(updateFrame)
  updateFrame = requestAnimationFrame(() => {
    const viewportCenter = window.innerHeight / 2
    let activeEntry: EyebrowEntry | undefined
    let closestDistance = Number.POSITIVE_INFINITY

    for (const entry of entries) {
      const bounds = entry.element.getBoundingClientRect()
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight
      const distance = Math.abs((bounds.top + bounds.bottom) / 2 - viewportCenter)
      if (isVisible && distance < closestDistance) {
        closestDistance = distance
        activeEntry = entry
      }
    }

    for (const entry of entries) {
      entry.setActive(entry === activeEntry)
    }
  })
}

/** Only the visible section label closest to the viewport center is fully opaque. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const entry = { element, setActive }
    const isFirstEntry = entries.size === 0
    entries.add(entry)
    if (isFirstEntry) {
      window.addEventListener("scroll", updateActiveEyebrow, { passive: true })
      window.addEventListener("resize", updateActiveEyebrow)
    }
    updateActiveEyebrow()

    return () => {
      entries.delete(entry)
      if (entries.size === 0) {
        window.removeEventListener("scroll", updateActiveEyebrow)
        window.removeEventListener("resize", updateActiveEyebrow)
      }
      updateActiveEyebrow()
    }
  }, [])

  return (
    <p ref={ref} className="type-eyebrow section-eyebrow" data-active={active}>
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

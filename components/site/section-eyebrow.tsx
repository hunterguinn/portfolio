"use client"

import { useEffect, useRef, useState } from "react"

type EyebrowEntry = {
  element: HTMLParagraphElement
  setActive: (active: boolean) => void
}

const ACTIVATION_LINE = 0.2
const entries = new Set<EyebrowEntry>()
let updateFrame = 0

function updateActiveEyebrow() {
  cancelAnimationFrame(updateFrame)
  updateFrame = requestAnimationFrame(() => {
    // A section becomes active once its label scrolls past this line, so the dim state is visible first.
    const triggerLine = window.innerHeight * ACTIVATION_LINE
    const scrollBottom = window.scrollY + window.innerHeight
    const isAtPageEnd = scrollBottom >= document.documentElement.scrollHeight - 2
    let activeEntry: EyebrowEntry | undefined
    let activeTop = Number.NEGATIVE_INFINITY

    for (const entry of entries) {
      const top = entry.element.getBoundingClientRect().top
      const sectionBottom = (entry.element.closest("section") ?? entry.element).getBoundingClientRect().bottom
      if (top <= triggerLine && sectionBottom > triggerLine && top > activeTop) {
        activeTop = top
        activeEntry = entry
      }
    }

    // Short final sections can never push their label past the line, so hand them the highlight at the page end.
    if (isAtPageEnd) {
      let lastTop = Number.NEGATIVE_INFINITY
      for (const entry of entries) {
        const top = entry.element.getBoundingClientRect().top
        if (top > lastTop && top < window.innerHeight) {
          lastTop = top
          activeEntry = entry
        }
      }
    }

    for (const entry of entries) {
      entry.setActive(entry === activeEntry)
    }
  })
}

/** Exactly one section label per page is fully opaque: the section currently crossing the activation line. */
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
    <p ref={ref} className="text-eyebrow section-eyebrow" data-active={active}>
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

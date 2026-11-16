"use client"

import { useEffect, useRef, useState } from "react"

/** Left-side section label: half strength by default, full strength while its section is in view. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const section = ref.current?.closest("section")
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "-30% 0px -30% 0px",
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className="type-eyebrow section-eyebrow" data-active={active}>
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

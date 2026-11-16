"use client"

import { useEffect, useRef, useState } from "react"

/** Section label: 40% transparent by default, fully opaque while the label is in view. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const label = ref.current
    if (!label) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(label)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className="type-eyebrow section-eyebrow" data-active={active}>
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

/** Left-side section label: half strength by default, full strength while its section is in view. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const section = ref.current?.closest("section")
    if (!section) return
    const observer = new IntersectionObserver(
      () => {
        const sections = Array.from(document.querySelectorAll("main section"))
        const center = window.innerHeight / 2
        const candidates = sections
          .map((item) => ({ item, bounds: item.getBoundingClientRect() }))
          .filter(({ bounds }) => bounds.top < center && bounds.bottom > center)
          .sort(
            (left, right) =>
              Math.abs((left.bounds.top + left.bounds.bottom) / 2 - center) -
              Math.abs((right.bounds.top + right.bounds.bottom) / 2 - center),
          )
        setActive(candidates[0]?.item === section)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
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

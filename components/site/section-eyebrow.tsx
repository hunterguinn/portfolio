"use client"

import { useEffect, useRef, useState } from "react"

type SectionEyebrowProps = {
  children: React.ReactNode
}

const ACTIVATION_DELAY = 1000

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isActive = useRef(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (timer.current || isActive.current) return
        timer.current = setTimeout(() => {
          timer.current = null
          isActive.current = true
          setActive(true)
        }, ACTIVATION_DELAY)
        return
      }

      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
      isActive.current = false
      setActive(false)
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (timer.current) clearTimeout(timer.current)
      timer.current = null
    }
  }, [])

  return (
    <p ref={ref} className="text-eyebrow section-eyebrow" data-active={active}>
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

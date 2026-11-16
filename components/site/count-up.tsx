"use client"

import { useEffect, useRef, useState } from "react"

/** Counts from 0 to `to` the first time it scrolls into view, after an optional stagger delay. */
export function CountUp({
  to,
  suffix = "",
  delay = 0,
  duration = 1600,
}: {
  to: number
  suffix?: string
  delay?: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to)
      return
    }

    let frame = 0
    let timer = 0

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(run, delay)
      },
      { threshold: 0.6 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [to, delay, duration])

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  )
}

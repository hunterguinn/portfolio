"use client"

import { useEffect, useRef, useState } from "react"

/** Counts from 0 to `to` the first time it scrolls into view. Width is reserved for the final value. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay = 0,
  duration = 1000,
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
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
        setValue(to * (1 - Math.pow(1 - progress, 3)))
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

  const finalText = `${prefix}${to.toFixed(decimals)}${suffix}`

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {finalText}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

const TEXT_ENTRY =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"]):not([type="hidden"]), textarea, [contenteditable="true"]'
const INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], [role="link"], summary, input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [contenteditable="true"], [tabindex]:not([tabindex="-1"])'

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)")
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const root = document.documentElement
    root.classList.add("has-custom-cursor")

    const label = el.querySelector<HTMLElement>(".cursor-pill-label")
    const measure = () => {
      if (!label) return
      el.style.setProperty("--cursor-label-width", `${label.offsetWidth}px`)
      el.style.setProperty("--cursor-label-height", `${label.offsetHeight}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (label) observer.observe(label)

    let x = -100
    let y = -100
    let frame = 0
    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = 0
    }
    const updateTarget = (target: Element | null) => {
      const isTextEntry = Boolean(target?.closest(TEXT_ENTRY))
      el.dataset.hidden = isTextEntry ? "true" : "false"
      el.dataset.interactive = !isTextEntry && Boolean(target?.closest(INTERACTIVE)) ? "true" : "false"
    }
    const onScroll = () => updateTarget(document.elementFromPoint(x, y))
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        el.dataset.hidden = "true"
        return
      }
      x = event.clientX
      y = event.clientY
      const target = event.target instanceof Element ? event.target : null
      updateTarget(target)
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onDown = () => (el.dataset.pressed = "true")
    const onUp = () => (el.dataset.pressed = "false")
    const onLeave = () => (el.dataset.hidden = "true")

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true, capture: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("blur", onLeave)
    document.addEventListener("pointerleave", onLeave)
    return () => {
      observer.disconnect()
      root.classList.remove("has-custom-cursor")
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("blur", onLeave)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={ref} className="cursor-root" data-hidden="true" aria-hidden="true">
      <span className="cursor-shape">
        <span className="cursor-pill-label text-caption">Read more</span>
      </span>
    </div>
  )
}

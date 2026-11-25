"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight"

const TEXT_ENTRY =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"]):not([type="hidden"]), textarea, [contenteditable="true"]'
/** Labels that show the right-arrow icon. */
const ARROW_LABELS = new Set(["View project", "Read more", "Go to link"])

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
    const labelText = el.querySelector<HTMLElement>(".cursor-pill-text")
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
      const text = isTextEntry ? undefined : target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor
      if (text && labelText && labelText.textContent !== text) labelText.textContent = text
      el.dataset.arrow = text && ARROW_LABELS.has(text) ? "true" : "false"
      el.dataset.interactive = text ? "true" : "false"
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
    // A click can change the hovered element's label (theme toggle), so re-read it after React updates.
    const onClick = () => requestAnimationFrame(() => updateTarget(document.elementFromPoint(x, y)))
    const onLeave = () => (el.dataset.hidden = "true")

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true, capture: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("click", onClick)
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
      window.removeEventListener("click", onClick)
      window.removeEventListener("blur", onLeave)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={ref} className="cursor-root" data-hidden="true" aria-hidden="true">
      <span className="cursor-shape">
        <span className="cursor-pill-label text-caption">
          <span className="cursor-pill-text" />
          <ArrowRight weight="regular" className="cursor-pill-arrow size-3.5" aria-hidden="true" />
        </span>
      </span>
    </div>
  )
}

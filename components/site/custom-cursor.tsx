"use client"

import { useEffect, useRef, useState } from "react"
import { CaretRight } from "@phosphor-icons/react/dist/csr/CaretRight"

const TEXT_ENTRY = 'input, textarea, select, [contenteditable="true"]'

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

    let x = -100
    let y = -100
    let frame = 0
    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = 0
    }
    const updateTarget = (target: Element | null) => {
      el.dataset.hidden = target?.closest(TEXT_ENTRY) ? "true" : "false"
      el.dataset.project = target?.closest('[data-cursor="project"]') ? "true" : "false"
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
        <span className="cursor-project-label text-caption">
          View project
          <CaretRight weight="regular" className="size-4 shrink-0" aria-hidden="true" />
        </span>
      </span>
    </div>
  )
}

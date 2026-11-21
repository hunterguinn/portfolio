"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft"
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown"
import { ThemeToggle } from "./theme-toggle"
import { RESTORE_HOME_KEY } from "./home-scroll-memory"

export type RailSection = { id: string; name: string }

function useActiveSection(sections: RailSection[]) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    if (sections.length === 0) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = sections[0].id
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= line) current = section.id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = sections[sections.length - 1].id
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [sections])

  return active
}

function BackButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      onClick={() => sessionStorage.setItem(RESTORE_HOME_KEY, "1")}
      className={`btn-secondary inline-flex h-9 items-center gap-2 rounded-full border border-transparent pl-3 pr-4 text-caption ${className}`}
    >
      <ArrowLeft weight="regular" className="size-4" aria-hidden="true" />
      Portfolio
    </Link>
  )
}

const LINE_BASE = 16
const LINE_ACTIVE = 24
const LINE_BOOST = 20
const PROXIMITY_FALLOFF = 32
const PROXIMITY_REACH = 120
const WIDTH_SMOOTHING = 14

function DesktopRail({ sections, active }: { sections: RailSection[]; active?: string }) {
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const widths = useRef<number[]>([])
  const centers = useRef<number[]>([])
  const pointer = useRef({ y: 0, reach: 0 })
  const focused = useRef(-1)
  const wake = useRef<() => void>(() => {})

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let lastTime = 0

    const targetWidth = (index: number) => {
      const base = sections[index].id === active ? LINE_ACTIVE : LINE_BASE
      let boost = 0
      const center = centers.current[index]
      if (pointer.current.reach > 0 && Number.isFinite(center)) {
        const distance = pointer.current.y - center
        boost =
          LINE_BOOST *
          pointer.current.reach *
          Math.exp(-(distance * distance) / (2 * PROXIMITY_FALLOFF * PROXIMITY_FALLOFF))
      }
      if (focused.current === index) boost = Math.max(boost, LINE_BOOST)
      return base + boost
    }

    const step = (time: number) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      const ease = reducedMotion.matches ? 1 : 1 - Math.exp(-WIDTH_SMOOTHING * elapsed)
      let moving = false
      sections.forEach((_, index) => {
        const line = lineRefs.current[index]
        if (!line) return
        const target = targetWidth(index)
        const from = widths.current[index] ?? target
        let next = from + (target - from) * ease
        if (Math.abs(target - next) < 0.1) next = target
        else moving = true
        widths.current[index] = next
        line.style.width = `${next}px`
      })
      frame = moving ? requestAnimationFrame(step) : 0
    }

    const start = () => {
      if (frame) return
      lastTime = performance.now()
      frame = requestAnimationFrame(step)
    }

    const release = () => {
      if (pointer.current.reach === 0) return
      pointer.current.reach = 0
      start()
    }

    const onPointerMove = (event: PointerEvent) => {
      const nav = navRef.current
      const enabled = event.pointerType === "mouse" && !reducedMotion.matches
      const rect = nav?.getBoundingClientRect()
      if (!enabled || !rect || rect.width === 0) {
        release()
        return
      }
      const gap = Math.max(rect.left - event.clientX, event.clientX - rect.right, 0)
      const closeness = Math.max(0, 1 - gap / PROXIMITY_REACH)
      centers.current = linkRefs.current.map((link) => {
        const box = link?.getBoundingClientRect()
        return box ? box.top + box.height / 2 : Number.NaN
      })
      pointer.current = { y: event.clientY, reach: closeness * closeness * (3 - 2 * closeness) }
      start()
    }

    wake.current = start
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("blur", release)
    document.documentElement.addEventListener("pointerleave", release)
    start()

    return () => {
      cancelAnimationFrame(frame)
      frame = 0
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("blur", release)
      document.documentElement.removeEventListener("pointerleave", release)
    }
  }, [sections, active])

  return (
    <nav
      ref={navRef}
      aria-label="Sections"
      className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 lg:block xl:left-5"
    >
      <ul className="flex flex-col">
        {sections.map((section, index) => {
          const current = section.id === active
          return (
            <li key={section.id}>
              <a
                ref={(element) => {
                  linkRefs.current[index] = element
                }}
                href={`#${section.id}`}
                aria-current={current ? "location" : undefined}
                onFocus={(event) => {
                  if (!event.currentTarget.matches(":focus-visible")) return
                  focused.current = index
                  wake.current()
                }}
                onBlur={() => {
                  if (focused.current !== index) return
                  focused.current = -1
                  wake.current()
                }}
                className="group relative flex w-[4.75rem] items-center px-3 py-2 focus-visible:outline-offset-0"
              >
                <span
                  ref={(element) => {
                    lineRefs.current[index] = element
                  }}
                  aria-hidden="true"
                  className={`block h-0.5 w-4 rounded-full transition-colors duration-300 ${
                    current ? "bg-foreground" : "bg-border group-hover:bg-secondary group-focus-visible:bg-secondary"
                  }`}
                />
                <span className="pointer-events-none absolute left-[4.75rem] whitespace-nowrap rounded-full border bg-page px-3 py-1 text-caption text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {section.name}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function MobileSectionMenu({ sections, active }: { sections: RailSection[]; active?: string }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const current = sections.find((section) => section.id === active) ?? sections[0]

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  if (!current) return null

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 max-w-full items-center gap-2 rounded-full px-3 text-caption text-secondary transition-colors hover:text-primary"
      >
        <span className="sr-only">Current section: </span>
        <span className="truncate">{current.name}</span>
        <CaretDown
          weight="regular"
          className={`size-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <nav
        id={menuId}
        aria-label="Sections"
        hidden={!open}
        className="card-surface modal-card absolute left-0 top-11 w-64 max-w-[calc(100vw-2.5rem)] rounded-md p-2"
      >
        <ul className="flex flex-col">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={section.id === active ? "location" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xs px-3 py-2 text-caption transition-colors hover:bg-surface-strong ${
                  section.id === active ? "text-primary" : "text-secondary"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-3 w-1 rounded-full ${section.id === active ? "bg-foreground" : "bg-border"}`}
                />
                {section.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

/** Persistent page chrome: theme toggle, back link on nested pages, and the section rail. */
export function SiteChrome({ sections, back = false }: { sections: RailSection[]; back?: boolean }) {
  const active = useActiveSection(sections)

  useEffect(() => {
    if (!back) return
    const onPop = () => sessionStorage.setItem(RESTORE_HOME_KEY, "1")
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [back])

  return (
    <>
      <div className="sticky top-0 z-40 lg:hidden">
        <div className="page-band border-b border-b-surface bg-page/85 backdrop-blur-md">
          <div className="page-container flex h-14 items-center gap-2">
            {back ? <BackButton /> : null}
            <MobileSectionMenu sections={sections} active={active} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {back ? <BackButton className="fixed left-6 top-6 z-40 hidden lg:inline-flex" /> : null}
      <div className="fixed right-6 top-6 z-40 hidden lg:block">
        <ThemeToggle />
      </div>
      <DesktopRail sections={sections} active={active} />
    </>
  )
}

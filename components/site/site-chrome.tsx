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

function DesktopRail({ sections, active }: { sections: RailSection[]; active?: string }) {
  return (
    <nav aria-label="Sections" className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 lg:block xl:left-5">
      <ul className="flex flex-col">
        {sections.map((section) => {
          const current = section.id === active
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "location" : undefined}
                className="group relative flex items-center px-3 py-2 focus-visible:outline-offset-0"
              >
                <span
                  aria-hidden="true"
                  className={`block w-1 rounded-full transition-[height,background-color] duration-300 ${
                    current ? "h-6 bg-foreground" : "h-4 bg-border group-hover:bg-secondary"
                  }`}
                />
                <span className="pointer-events-none absolute left-8 whitespace-nowrap rounded-full border bg-page px-3 py-1 text-caption text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
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

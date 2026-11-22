"use client"

import { useEffect } from "react"

export const RESTORE_HOME_KEY = "restore-home"
const HOME_SCROLL_KEY = "home-scroll"

/** Remembers the portfolio scroll position and restores it when returning from a project. */
export function HomeScrollMemory() {
  useEffect(() => {
    const saved = Number(sessionStorage.getItem(HOME_SCROLL_KEY))
    const shouldRestore = sessionStorage.getItem(RESTORE_HOME_KEY) === "1"
    sessionStorage.removeItem(RESTORE_HOME_KEY)

    let restoreFrame = 0
    if (shouldRestore && saved > 0) {
      // Two frames: let the route transition's scroll-to-top run first.
      restoreFrame = requestAnimationFrame(() => {
        restoreFrame = requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: "instant" }))
      })
    }

    let frame = 0
    const save = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        sessionStorage.setItem(HOME_SCROLL_KEY, String(Math.round(window.scrollY)))
      })
    }
    window.addEventListener("scroll", save, { passive: true })
    return () => {
      cancelAnimationFrame(restoreFrame)
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", save)
    }
  }, [])

  return null
}

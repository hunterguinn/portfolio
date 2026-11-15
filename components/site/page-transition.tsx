"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

const COVER_MS = 620
const REVEAL_MS = 760
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)"
const COVER_EDGE = "50% 50% 0 0 / 14vh 14vh 0 0"
const REVEAL_EDGE = "0 0 50% 50% / 0 0 14vh 14vh"

/** Fluid curtain that sweeps over the page, swaps the route underneath, then lifts away. */
export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const curtain = useRef<HTMLDivElement>(null)
  const pending = useRef<{ path: string; hash: string } | null>(null)
  const failsafe = useRef<number>(0)
  const currentPath = useRef(pathname)

  useEffect(() => {
    currentPath.current = pathname
    const el = curtain.current
    const target = pending.current
    if (!el || !target || target.path !== pathname) return
    pending.current = null
    window.clearTimeout(failsafe.current)

    if (!target.hash) window.scrollTo({ top: 0, behavior: "instant" })
    el.animate(
      [
        { transform: "translateY(0)", borderRadius: "0" },
        { transform: "translateY(-105%)", borderRadius: REVEAL_EDGE },
      ],
      { duration: REVEAL_MS, easing: EASE, fill: "forwards", delay: 80 },
    ).finished.then(() => {
      el.style.visibility = "hidden"
      el.getAnimations().forEach((animation) => animation.cancel())
    })
  }, [pathname])

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const onClick = (event: MouseEvent) => {
      if (motionQuery.matches || event.defaultPrevented) return
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest("a") : null
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === currentPath.current) return

      const el = curtain.current
      if (!el || pending.current) return
      event.preventDefault()
      pending.current = { path: url.pathname, hash: url.hash }

      el.style.visibility = "visible"
      el.animate(
        [
          { transform: "translateY(105%)", borderRadius: COVER_EDGE },
          { transform: "translateY(0)", borderRadius: "0" },
        ],
        { duration: COVER_MS, easing: EASE, fill: "forwards" },
      ).finished.then(() => router.push(url.pathname + url.search + url.hash))

      failsafe.current = window.setTimeout(() => {
        pending.current = null
        el.style.visibility = "hidden"
        el.getAnimations().forEach((animation) => animation.cancel())
      }, 6000)
    }

    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      window.clearTimeout(failsafe.current)
    }
  }, [router])

  return <div ref={curtain} className="page-curtain" aria-hidden="true" />
}

"use client"

import { useEffect, useRef, type RefObject } from "react"

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"])'
const IGNORED_TAGS = new Set(["SCRIPT", "STYLE", "NEXTJS-PORTAL"])

type Options = {
  /** Called on Escape. */
  onClose: () => void
  /** Escape is ignored while false, for example during a pending submission. */
  canClose: boolean
  /** Element that opened the dialog; receives focus again on close. */
  returnFocusTo?: HTMLElement | null
}

/** Scroll lock, inert background, focus trap, Escape-to-close, and focus restoration for a modal dialog. */
export function useModalBehavior(dialogRef: RefObject<HTMLElement | null>, { onClose, canClose, returnFocusTo }: Options) {
  const latest = useRef({ onClose, canClose })
  latest.current = { onClose, canClose }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousFocus = returnFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const previousGutter = root.style.scrollbarGutter
    root.style.scrollbarGutter = "stable"
    root.style.overflow = "hidden"

    const madeInert: Element[] = []
    for (const element of Array.from(document.body.children)) {
      if (IGNORED_TAGS.has(element.tagName) || element.contains(dialog) || element.hasAttribute("inert")) continue
      element.setAttribute("inert", "")
      madeInert.push(element)
    }

    if (!dialog.contains(document.activeElement)) dialog.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!latest.current.canClose) return
        event.preventDefault()
        latest.current.onClose()
        return
      }
      if (event.key !== "Tab") return

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (!dialog.contains(active)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      root.style.overflow = previousOverflow
      root.style.scrollbarGutter = previousGutter
      madeInert.forEach((element) => element.removeAttribute("inert"))
      const focusIsFree = !document.activeElement || document.activeElement === document.body
      if (previousFocus?.isConnected && focusIsFree) previousFocus.focus()
    }
  }, [dialogRef, returnFocusTo])
}

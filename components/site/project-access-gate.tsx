"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { checkProjectAccess } from "@/app/actions/project-access"
import { findProtectedPath, type ProtectedProjectPath } from "@/lib/auth/protected-routes"
import { PasswordModal } from "./password-modal"

type OpenModal = { next: ProtectedProjectPath; trigger: HTMLElement }

/**
 * Intercepts clicks on protected project links. Visitors with a valid session continue to the
 * project; everyone else sees the password modal over the page they are on.
 */
export function ProjectAccessGate() {
  const pathname = usePathname()
  const [open, setOpen] = useState<OpenModal | null>(null)
  const allowedAnchor = useRef<HTMLAnchorElement | null>(null)
  const checking = useRef(false)

  useEffect(() => {
    setOpen(null)
  }, [pathname])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest("a") : null
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      const next = findProtectedPath(url.pathname)
      if (!next || url.pathname === window.location.pathname) return

      if (allowedAnchor.current === anchor) {
        allowedAnchor.current = null
        return
      }

      event.preventDefault()
      if (checking.current) return
      checking.current = true
      checkProjectAccess()
        .catch(() => false)
        .then((hasAccess) => {
          if (hasAccess) {
            allowedAnchor.current = anchor
            anchor.click()
          } else {
            setOpen({ next, trigger: anchor })
          }
        })
        .finally(() => {
          checking.current = false
        })
    }

    // Capture phase so the check runs before client-side navigation handlers.
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  if (!open) return null
  return <PasswordModal next={open.next} returnFocusTo={open.trigger} onClose={() => setOpen(null)} />
}

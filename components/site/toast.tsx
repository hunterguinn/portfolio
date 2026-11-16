"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

const TOAST_EVENT = "site:toast"
const VISIBLE_MS = 2600

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }))
}

/** Single toast host, mounted once in the root layout. Sits at the bottom centre of the viewport. */
export function ToastHost() {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<number>(0)
  const clearTimer = useRef<number>(0)

  useEffect(() => {
    const onToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(clearTimer.current)
      setToast({ id: Date.now(), message })
      requestAnimationFrame(() => setVisible(true))
      hideTimer.current = window.setTimeout(() => {
        setVisible(false)
        clearTimer.current = window.setTimeout(() => setToast(null), 300)
      }, VISIBLE_MS)
    }
    window.addEventListener(TOAST_EVENT, onToast)
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast)
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(clearTimer.current)
    }
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4"
    >
      {toast ? (
        <div
          key={toast.id}
          data-visible={visible}
          className="toast flex items-center gap-2.5 rounded-full bg-surface-strong py-2.5 pl-3 pr-5 shadow-lg shadow-black/20 ring-1 ring-border"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-green text-background" aria-hidden="true">
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className="type-supporting">{toast.message}</span>
        </div>
      ) : null}
    </div>
  )
}

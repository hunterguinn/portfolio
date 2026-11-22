"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "@phosphor-icons/react/dist/csr/X"
import { useModalBehavior } from "@/components/site/use-modal-behavior"

/** Matches the longest exit animation (`sheet-drop`) in globals.css. */
const EXIT_MS = 280

export function ArticleModal({
  title,
  onClose,
  returnFocusTo,
}: {
  title: string
  onClose: () => void
  returnFocusTo: HTMLElement | null
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const [closing, setClosing] = useState(false)
  const closingRef = useRef(false)
  const exitTimer = useRef<number | undefined>(undefined)

  const requestClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    exitTimer.current = window.setTimeout(onClose, EXIT_MS)
  }, [onClose])

  useEffect(() => () => window.clearTimeout(exitTimer.current), [])

  useModalBehavior(dialogRef, { onClose: requestClose, canClose: true, returnFocusTo })

  return createPortal(
    <div
      data-state={closing ? "closed" : "open"}
      className="sheet-backdrop fixed inset-0 z-50 flex items-center justify-center"
      onClick={requestClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="sheet-panel modal-panel flex max-h-[calc(100dvh-2rem)] w-[90vw] max-w-lg flex-col gap-4 outline-none"
      >
        <div className="flex shrink-0 items-start justify-between gap-4">
          <h2 id={titleId} className="text-heading text-strong">
            {title}
          </h2>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close article"
            className="modal-close"
          >
            <X weight="regular" className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <p className="text-body text-muted">[Article content coming soon]</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

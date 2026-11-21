"use client"

import { useId, useRef } from "react"
import { createPortal } from "react-dom"
import { X } from "@phosphor-icons/react/dist/csr/X"
import { useModalBehavior } from "@/components/site/use-modal-behavior"

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
  useModalBehavior(dialogRef, { onClose, canClose: true, returnFocusTo })

  return createPortal(
    <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className="card-surface modal-card article-modal flex max-h-[85svh] w-full max-w-xl flex-col gap-6 overflow-y-auto rounded-lg p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="text-heading text-balance">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="btn-secondary flex size-9 shrink-0 items-center justify-center rounded-full"
          >
            <X weight="regular" className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="text-body text-secondary">[Article content coming soon]</p>
      </div>
    </div>,
    document.body,
  )
}

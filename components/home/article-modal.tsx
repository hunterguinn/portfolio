"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "@phosphor-icons/react/dist/csr/X"
import { useModalBehavior } from "@/components/site/use-modal-behavior"
import type { ArticleSection } from "@/lib/content/types"
import { ContextualPromptDemo } from "./contextual-prompt-demo"

/** Matches the longest exit animation (`sheet-drop`) in globals.css. */
const EXIT_MS = 280

export function ArticleModal({
  title,
  content,
  onClose,
  returnFocusTo,
}: {
  title: string
  content: ArticleSection[]
  onClose: () => void
  returnFocusTo: HTMLElement | null
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasDemonstration = content.some((section) => section.demonstration === "contextual-prompt")
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
        className={`sheet-panel modal-panel flex max-h-[calc(100dvh-2rem)] w-[90vw] flex-col gap-4 outline-none ${hasDemonstration ? "max-w-4xl" : "max-w-lg"}`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4">
          <h2 id={titleId} className="text-heading">
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
        <div ref={scrollRef} className="min-h-0 space-y-5 overflow-y-auto overscroll-contain">
          {content.map((section, index) => (
            <section key={`${section.heading ?? "intro"}-${index}`} className="space-y-2">
              {section.heading ? <h3 className="text-caption text-strong">{section.heading}</h3> : null}
              {section.body.split("\n\n").map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-body text-muted">{paragraph}</p>
              ))}
              {section.items ? (
                <ul className="list-disc space-y-2 pl-5 text-body text-muted">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              {section.conclusion ? <p className="text-body text-muted">{section.conclusion}</p> : null}
              {section.demonstration === "contextual-prompt" ? <ContextualPromptDemo scrollRootRef={scrollRef} /> : null}
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

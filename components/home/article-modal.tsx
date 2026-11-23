"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "@phosphor-icons/react/dist/csr/X"
import { useModalBehavior } from "@/components/site/use-modal-behavior"
import type { ArticleBlock, ArticleSection } from "@/lib/content/types"
import { ProjectMetrics } from "@/components/site/project-metrics"
import { Callout } from "@/components/site/callout"
import { Figure } from "@/components/case-study/figure"
import { ContextualPromptDemo } from "./contextual-prompt-demo"

/** Matches the longest exit animation (`sheet-drop`) in globals.css. */
const EXIT_MS = 280

function ArticleList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-body text-muted">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-body text-muted">{block.text}</p>
    case "list":
      return <ArticleList items={block.items} />
    case "metrics":
      return (
        <div className="space-y-2">
          <ProjectMetrics metrics={block.metrics} />
          {block.note ? <p className="text-caption text-muted">{block.note}</p> : null}
        </div>
      )
    case "callout":
      return <Callout text={block.text} attribution={block.attribution} />
    case "figure":
      return <Figure figure={block.figure} />
  }
}

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
  const titleId = useId()
  const [closing, setClosing] = useState(false)
  const largerHeadings = new Set([
    "Building a shared foundation",
    "Connecting design and code",
    "Automation needs structure",
    "Making the approach reproducible",
    "Choosing the right medium",
  ])
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
        className="sheet-panel modal-panel flex max-h-[calc(100dvh-2rem)] w-[90vw] flex-col gap-6 outline-none"
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
              {section.heading ? (
                <h3 className={largerHeadings.has(section.heading) ? "text-body text-strong" : "text-caption text-strong"}>
                  {section.heading}
                </h3>
              ) : null}
              {section.body.split("\n\n").map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-body text-muted">{paragraph}</p>
              ))}
              {section.items ? <ArticleList items={section.items} /> : null}
              {section.conclusion ? <p className="text-body text-muted">{section.conclusion}</p> : null}
              {section.demonstration === "contextual-prompt" ? <ContextualPromptDemo scrollRootRef={scrollRef} /> : null}
              {section.blocks?.map((block, blockIndex) => <ArticleBlockView key={blockIndex} block={block} />)}
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

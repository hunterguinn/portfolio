"use client"

import { useEffect, useId, useRef, type RefObject } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight"
import { Warning } from "@phosphor-icons/react/dist/csr/Warning"

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

/** Static components shared by the source and its validation variant. */
function PurchaseScreen({ validation = false }: { validation?: boolean }) {
  return (
    <>
      <div className="space-y-1 border-b pb-4">
        <p className="text-body font-medium">Buy VTI</p>
        <p className="text-caption text-muted">Vanguard Total Stock Market ETF</p>
      </div>
      <dl className="space-y-4 text-caption">
        <Detail label="Illustrative share price" value="$300" />
        <div className="space-y-2">
          <dt className="text-muted">Number of shares</dt>
          <dd className={`rounded-md border bg-surface px-4 py-3 ${validation ? "border-red" : "border-border"}`}>
            {validation ? "10" : "2"}
          </dd>
        </div>
        <Detail label="Estimated cost" value={validation ? "$3,000" : "$600"} />
        <Detail label="Available buying power" value="$1,000" />
      </dl>
      {validation ? (
        <p className="flex items-start gap-2 text-caption text-red">
          <Warning weight="regular" className="mt-1 size-4 shrink-0" aria-hidden="true" />
          Insufficient buying power. Enter 3 shares or fewer.
        </p>
      ) : null}
      <StaticAction disabled={validation}>Review order</StaticAction>
    </>
  )
}

/** Display-only button treatment: no trading controls or keyboard stops. */
function StaticAction({ children, disabled = false }: { children: string; disabled?: boolean }) {
  return (
    <div className="mt-auto pt-4">
      <span className={`btn-primary flex justify-center rounded-full px-4 py-2 text-caption font-medium ${disabled ? "opacity-50" : ""}`}>
        {children}
        {disabled ? <span className="sr-only"> (disabled)</span> : null}
      </span>
    </div>
  )
}

function ReviewScreen() {
  return (
    <>
      <p className="border-b pb-4 text-body font-medium">Review order</p>
      <dl className="space-y-4 text-caption">
        <Detail label="Investment" value="VTI" />
        <Detail label="Order type" value="Market buy" />
        <Detail label="Number of shares" value="2" />
        <Detail label="Estimated cost" value="$600" />
        <Detail label="Remaining buying power" value="$400" />
      </dl>
      <StaticAction>Submit order</StaticAction>
    </>
  )
}

const screens = [
  { label: "Source design", delay: undefined },
  { label: "Validation state", delay: "calc(var(--motion-stagger-cap) * 2)" },
  { label: "Review state", delay: "calc(var(--motion-stagger-cap) * 2 + var(--motion-stagger))" },
] as const

export function ContextualPromptDemo({ scrollRootRef }: { scrollRootRef: RefObject<HTMLElement | null> }) {
  const figureRef = useRef<HTMLElement>(null)
  const titleId = useId()

  useEffect(() => {
    const figure = figureRef.current
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!figure || reducedMotion.matches || !("IntersectionObserver" in window)) return

    const stages = figure.querySelectorAll<HTMLElement>("[data-demo-stage]")
    stages.forEach((stage) => stage.setAttribute("data-pending", ""))
    const reveal = () => {
      stages.forEach((stage) => stage.removeAttribute("data-pending"))
      observer.disconnect()
    }
    const offset = getComputedStyle(document.documentElement).getPropertyValue("--motion-trigger-offset").trim()
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) reveal()
    }, { root: scrollRootRef.current, rootMargin: `0px 0px -${offset || "0px"} 0px` })
    observer.observe(figure)
    const onMotionChange = () => { if (reducedMotion.matches) reveal() }
    reducedMotion.addEventListener("change", onMotionChange)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener("change", onMotionChange)
    }
  }, [scrollRootRef])

  return (
    <figure ref={figureRef} aria-labelledby={titleId} className="@container flex min-w-0 flex-col gap-4 py-4">
      <div className="space-y-2">
        <h4 id={titleId} className="text-body font-medium">Extending designs with contextual prompts</h4>
        <p className="text-caption text-muted">Existing screen + written requirements + explicit constraints</p>
      </div>
      <div data-demo-stage="prompt" data-reveal="fade" style={{ transitionDelay: "var(--motion-stagger-cap)" }} className="space-y-2 rounded-md border bg-surface p-4">
        <p className="text-eyebrow text-muted">Contextual prompt</p>
        <blockquote className="text-caption">
          “Using the selected investment screen, create an insufficient buying power validation state and an order review screen. Reuse existing components, preserve the visual hierarchy, and only modify elements necessary to support each scenario.”
        </blockquote>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-4 @2xl:grid-cols-3">
        {screens.map((screen, index) => (
          <section
            key={screen.label}
            aria-labelledby={`${titleId}-${index}`}
            data-demo-stage={index === 0 ? "source" : "result"}
            data-reveal=""
            style={{ transitionDelay: screen.delay }}
            className="mx-auto flex w-full min-w-0 max-w-xs flex-col gap-3 @2xl:max-w-none"
          >
            <div className="flex items-center gap-2">
              {index > 0 ? <ArrowRight weight="regular" className="size-4 shrink-0 rotate-90 text-muted @2xl:rotate-0" aria-hidden="true" /> : null}
              <h5 id={`${titleId}-${index}`} className="text-eyebrow text-muted">{screen.label}</h5>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-lg border bg-background p-4">
              {index === 2 ? <ReviewScreen /> : <PurchaseScreen validation={index === 1} />}
            </div>
          </section>
        ))}
      </div>
      <figcaption className="space-y-2 text-caption text-muted">
        <p>An illustrative example of how contextual prompts can extend an existing design into additional application states while preserving its underlying components and visual structure.</p>
        <p>All financial values are illustrative. Static demonstration only; no trading functionality or live Figma integration.</p>
      </figcaption>
    </figure>
  )
}

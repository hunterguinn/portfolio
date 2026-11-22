"use client"

import { useId, useState } from "react"
import { CircleDashed } from "@phosphor-icons/react/dist/csr/CircleDashed"
import { Lightning } from "@phosphor-icons/react/dist/csr/Lightning"
import { MinusCircle } from "@phosphor-icons/react/dist/csr/MinusCircle"
import { User } from "@phosphor-icons/react/dist/csr/User"

type Source = "api" | "you" | "conditional"

type Step = {
  step: string
  title: string
  requirement: "Required" | "Conditional"
  items: { label: string; source: Source }[]
}

type Scenario = "success" | "partial" | "failure"
type Resolved = "api" | "you" | "requested" | "skipped"

const scenarios: { id: Scenario; label: string }[] = [
  { id: "success", label: "API Success" },
  { id: "partial", label: "Partial Data" },
  { id: "failure", label: "API Failure" },
]

const legend = [
  {
    title: "What Open Finance captures",
    description: "Securely pulls account and asset details from the external firm, reducing manual entry.",
    source: "api",
  },
  {
    title: "What you still provide",
    description: "A few selections and confirmations, like your Merrill account, transfer type, and terms acceptance.",
    source: "you",
  },
  {
    title: "When we ask for more details",
    description: "If the API cannot retrieve certain information, we’ll request it from you in context.",
    source: "requested",
  },
] as const

function resolve(source: Source, scenario: Scenario): Resolved {
  if (source === "you") return "you"
  if (source === "conditional") return scenario === "success" ? "skipped" : "requested"
  return scenario === "failure" ? "you" : "api"
}

const badge: Record<Resolved, { text: string; className: string; Icon: typeof Lightning }> = {
  api: { text: "API", className: "text-green", Icon: Lightning },
  you: { text: "You", className: "text-foreground", Icon: User },
  requested: { text: "Requested", className: "border-dashed text-foreground", Icon: CircleDashed },
  skipped: { text: "Not needed", className: "border-dashed text-muted", Icon: MinusCircle },
}

export function TransferSteps({ steps }: { steps: Step[] }) {
  const [scenario, setScenario] = useState<Scenario>("success")
  const groupId = useId()
  const availableSteps = Array.isArray(steps) ? steps : []

  const counts = { api: 0, you: 0, requested: 0 }
  for (const step of availableSteps) {
    for (const item of step.items) {
      const value = resolve(item.source, scenario)
      if (value !== "skipped") counts[value] += 1
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="radiogroup" aria-labelledby={`${groupId}-label`} className="grid w-full grid-cols-3 gap-1 rounded-full border bg-surface p-1 sm:w-auto">
          <span id={`${groupId}-label`} className="sr-only">
            API scenario
          </span>
          {scenarios.map((option) => {
            const selected = option.id === scenario
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setScenario(option.id)}
                className={`rounded-full px-2 py-2 text-caption sm:px-4 transition-colors duration-300 ${
                  selected ? "bg-foreground text-background" : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <p role="status" aria-live="polite" className="text-caption text-muted tabular-nums">
          {`API ${counts.api} · You ${counts.you} · Requested ${counts.requested}`}
        </p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2">
        {availableSteps.map((step) => {
          const resolved = step.items.map((item) => resolve(item.source, scenario))
          const asksForMore = resolved.includes("requested")
          const stepState =
            step.requirement === "Conditional" ? (asksForMore ? "Required" : "No input needed") : step.requirement

          return (
            <li
              key={step.step}
              className={`card-hover flex flex-col gap-4 rounded-lg border p-4 transition-colors duration-300 md:p-5 lg:p-6 ${
                asksForMore ? "bg-surface" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-caption text-muted tabular-nums">{step.step}</span>
                <span
                  className={`rounded-full border px-2 py-1 text-eyebrow transition-colors duration-300 ${
                    stepState === "Required" ? "text-foreground" : "border-dashed text-muted"
                  }`}
                >
                  {stepState}
                </span>
              </div>
              <h3 className="text-body text-strong">{step.title}</h3>
              <ul className="flex flex-col divide-y">
                {step.items.map((item, index) => {
                  const state = badge[resolved[index]]
                  return (
                    <li key={item.label} className="flex min-w-0 items-center gap-3 py-2.5 text-caption text-muted">
                      <state.Icon
                        weight="regular"
                        className={`size-4 shrink-0 transition-colors duration-300 ${state.className}`}
                        aria-hidden="true"
                      />
                      <span className={`min-w-0 flex-1 ${resolved[index] === "skipped" ? "line-through" : ""}`}>
                        {item.label}
                      </span>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-eyebrow transition-colors duration-300 ${state.className}`}
                      >
                        {state.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ol>

      <ul aria-label="Transfer step legend" className="grid gap-x-6 gap-y-4 sm:grid-cols-3">
        {legend.map((item) => {
          const state = badge[item.source]
          return (
            <li key={item.title} className="flex items-start gap-3">
              <state.Icon weight="regular" className={`mt-0.5 size-4 shrink-0 ${state.className}`} aria-hidden="true" />
              <div className="flex min-w-0 flex-col gap-1">
                <h4 className="text-caption text-strong">{item.title}</h4>
                <p className="text-caption text-muted">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="text-eyebrow text-muted">Illustrative scenarios · no live API connection</p>
    </div>
  )
}

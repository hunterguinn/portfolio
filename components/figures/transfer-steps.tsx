"use client"

import { useId, useState } from "react"
import { Link as LinkIcon } from "@phosphor-icons/react/dist/csr/Link"
import { Question } from "@phosphor-icons/react/dist/csr/Question"
import { User } from "@phosphor-icons/react/dist/csr/User"

type Source = "api" | "you" | "conditional"

type Step = {
  step: string
  title: string
  requirement: "Required" | "Conditional"
  items: { label: string; source: Source }[]
}

type Scenario = "success" | "partial" | "failure"
type Resolved = "api" | "you" | "requested"

const scenarios: { id: Scenario; label: string }[] = [
  { id: "success", label: "API Success" },
  { id: "partial", label: "Partial Data" },
  { id: "failure", label: "API Failure" },
]

function resolve(item: Step["items"][number], scenario: Scenario): Resolved {
  const { source } = item
  if (scenario === "success" && item.label === "Full or partial transfer") return "api"
  if (source === "you") return "you"
  if (source === "conditional") return scenario === "success" ? "api" : "requested"
  return scenario === "failure" ? "you" : "api"
}

const badge: Record<Resolved, { text: string; className: string; Icon?: typeof LinkIcon }> = {
  api: { text: "API", className: "bg-green/10 text-green", Icon: LinkIcon },
  you: { text: "Req", className: "bg-red/10 text-red", Icon: Question },
  requested: { text: "Cond", className: "bg-muted/10 text-muted", Icon: User },
}

export function TransferSteps({ steps }: { steps: Step[] }) {
  const [scenario, setScenario] = useState<Scenario>("success")
  const groupId = useId()
  const availableSteps = Array.isArray(steps) ? steps : []

  const selectedIndex = scenarios.findIndex((option) => option.id === scenario)

  return (
    <div className="flex flex-col gap-4">
      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        className="relative isolate grid w-full grid-cols-3 rounded-full border bg-surface p-1 sm:w-fit"
        onKeyDown={(event) => {
          const directions: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
          let index: number
          if (event.key === "Home") index = 0
          else if (event.key === "End") index = scenarios.length - 1
          else if (event.key in directions) index = (selectedIndex + directions[event.key] + scenarios.length) % scenarios.length
          else return
          event.preventDefault()
          setScenario(scenarios[index].id)
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[index]?.focus()
        }}
      >
        <span id={`${groupId}-label`} className="sr-only">API scenario</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ width: "calc((100% - var(--spacing) * 2) / 3)", transform: `translateX(${selectedIndex * 100}%)` }}
        />
        {scenarios.map((option) => {
          const selected = option.id === scenario
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setScenario(option.id)}
              className={`relative z-10 rounded-full px-2 py-1 text-caption transition-colors duration-300 sm:px-4 motion-reduce:transition-none ${
                selected ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <ol className="grid gap-4 lg:grid-cols-3">
        {availableSteps.map((step) => {
          const resolved = step.items.map((item) => resolve(item, scenario))
          const inactive = scenario === "success" && step.requirement === "Conditional"

          return (
            <li
              key={step.step}
              className={`card-hover min-w-0 flex flex-col gap-3 rounded-lg border p-4 md:p-5 transition-[opacity,background-color,border-color] duration-300 motion-reduce:transition-none ${
                inactive ? "opacity-60" : "opacity-100"
              }`}
            >
              <span className="text-eyebrow text-muted tabular-nums">{`Step ${step.step}`}</span>
              <h3 className="text-body text-strong">{step.title}</h3>
              <ul className="flex flex-col divide-y">
                {step.items.map((item, index) => {
                  const state = badge[resolved[index]]
                  return (
                    <li key={item.label} className="flex min-w-0 flex-col items-start gap-0.5 py-2 text-caption text-foreground">
                      <span className={`min-w-0 flex-1 lg:flex-none ${resolved[index] === "api" ? "opacity-40" : ""}`}>
                        {item.label}
                      </span>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-eyebrow transition-colors duration-300 ${state.className}`}
                      >
                        {state.text}
                        {state.Icon ? <state.Icon size={14} weight="regular" aria-hidden="true" /> : null}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ol>

    </div>
  )
}

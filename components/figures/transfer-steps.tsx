import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { CircleDashed } from "@phosphor-icons/react/dist/ssr/CircleDashed"
import { Lightning } from "@phosphor-icons/react/dist/ssr/Lightning"
import { User } from "@phosphor-icons/react/dist/ssr/User"

type Step = {
  step: string
  title: string
  requirement: "Required" | "Conditional"
  items: { label: string; source: "api" | "you" | "conditional" }[]
}

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
    source: "conditional",
  },
] as const

export function TransferSteps({ steps }: { steps: Step[] }) {
  const availableSteps = Array.isArray(steps) ? steps : []

  return (
    <div className="flex flex-col gap-6">
      <ol className="grid gap-6 xl:grid-cols-4">
        {availableSteps.map((step, index) => {
          const items = Array.isArray(step.items) ? step.items : []

          return (
            <li key={step.step} className="relative min-w-0">
              <div className="card-surface flex h-full flex-col gap-4 rounded-lg p-4 md:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-caption text-secondary tabular-nums">{step.step}</span>
                  <span
                    className={`rounded-full border px-2 py-1 text-eyebrow ${
                      step.requirement === "Required" ? "text-primary" : "border-dashed text-secondary"
                    }`}
                  >
                    {step.requirement}
                  </span>
                </div>
                <h3 className="text-body text-strong">{step.title}</h3>
                <ul className="flex flex-col gap-3 rounded-md border p-3">
                  {items.map((item) => {
                    const ItemIcon =
                      item.source === "api" ? Lightning : item.source === "you" ? User : CircleDashed
                    const sourceLabel =
                      item.source === "api" ? "API" : item.source === "you" ? "You" : "If needed"

                    return (
                      <li key={item.label} className="flex min-w-0 items-center gap-2 text-caption text-secondary">
                        <ItemIcon
                          weight="regular"
                          className={`size-4 shrink-0 ${item.source === "api" ? "text-[var(--green)]" : "text-primary"}`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1">{item.label}</span>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-eyebrow ${
                            item.source === "api"
                              ? "text-[var(--green)]"
                              : item.source === "conditional"
                                ? "border-dashed text-secondary"
                                : "text-primary"
                          }`}
                        >
                          {sourceLabel}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {index < availableSteps.length - 1 ? (
                <ArrowRight
                  weight="regular"
                  className="absolute -bottom-5 left-1/2 z-10 size-4 rotate-90 text-secondary xl:bottom-auto xl:left-auto xl:right-[-1.25rem] xl:top-1/2 xl:rotate-0"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          )
        })}
      </ol>
      <ul aria-label="Transfer step legend" className="grid gap-3 xl:grid-cols-3">
        {legend.map((item) => {
          const LegendIcon = item.source === "api" ? Lightning : item.source === "you" ? User : CircleDashed

          return (
            <li key={item.title} className="card-surface flex items-start gap-3 rounded-lg p-4">
              <LegendIcon
                weight="regular"
                className={`mt-0.5 size-5 shrink-0 ${item.source === "api" ? "text-[var(--green)]" : "text-primary"}`}
                aria-hidden="true"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <h4 className="text-body text-strong">{item.title}</h4>
                <p className="text-caption text-secondary">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

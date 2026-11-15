type Step = { step: string; title: string; requirement: "Required" | "Conditional"; items: string[] }

export function TransferSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {steps.map((step) => (
        <li key={step.step} className="card-surface flex flex-col gap-5 rounded-lg border p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-muted">{step.step}</span>
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider ${
                step.requirement === "Required" ? "text-foreground" : "border-dashed text-muted"
              }`}
            >
              {step.requirement}
            </span>
          </div>
          <h3 className="text-base font-medium">{step.title}</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {step.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

export function ResearchSummary({
  questions,
  findings,
}: {
  questions: { title: string; items: string[] }
  findings: { title: string; items: { text: string; status: "Confirmed" | "Unconfirmed" }[] }
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <section className="card-surface flex flex-col gap-5 rounded-lg p-6" aria-labelledby="research-questions">
        <h3 id="research-questions" className="text-body text-strong">
          {questions.title}
        </h3>
        <ul className="flex flex-col gap-3 text-caption text-muted">
          {questions.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-foreground">
                ?
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="card-surface flex flex-col gap-5 rounded-lg p-6" aria-labelledby="research-findings">
        <h3 id="research-findings" className="text-body text-strong">
          {findings.title}
        </h3>
        <ul className="text-caption flex flex-col gap-4">
          {findings.items.map((item) => (
            <li key={item.text} className="flex flex-col items-start gap-2">
              <span
                className={`rounded-full border px-2 py-1 text-eyebrow ${
                  item.status === "Confirmed" ? "text-green" : "border-dashed text-yellow"
                }`}
              >
                {item.status}
              </span>
              <span className="text-muted">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="card-surface flex flex-col gap-5 rounded-lg p-6" aria-labelledby="research-questions-copy">
        <h3 id="research-questions-copy" className="text-body text-strong">
          {questions.title}
        </h3>
        <ul className="flex flex-col gap-3 text-caption text-muted">
          {questions.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-foreground">
                ?
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

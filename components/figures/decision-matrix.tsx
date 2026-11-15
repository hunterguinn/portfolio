type Row = { category: string; trigger: string; reason: string; decision: "Sales" | "Stop" }

export function DecisionMatrix({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <caption className="sr-only">Conditions that route an applicant to Sales or stop the digital application</caption>
        <thead className="border-b bg-surface font-mono text-[0.625rem] uppercase tracking-widest text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-normal">
              Category
            </th>
            <th scope="col" className="px-4 py-3 font-normal">
              Trigger
            </th>
            <th scope="col" className="px-4 py-3 font-normal">
              Why
            </th>
            <th scope="col" className="px-4 py-3 font-normal">
              Decision
            </th>
          </tr>
        </thead>
        <tbody className="divide-y align-top">
          {rows.map((row) => (
            <tr key={`${row.category}-${row.trigger}`}>
              <th scope="row" className="px-4 py-4 font-medium">
                {row.category}
              </th>
              <td className="px-4 py-4">{row.trigger}</td>
              <td className="px-4 py-4 text-muted">{row.reason}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider ${
                    row.decision === "Sales" ? "text-positive" : "text-negative"
                  }`}
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                  {row.decision === "Sales" ? "Route to Sales" : "Stop"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type Cell = { label: string; detail?: string[]; milestone?: boolean }
type Lane = { track: string; cells: Cell[][] }

export function DeliveryTimeline({ periods, lanes }: { periods: string[]; lanes: Lane[] }) {
  const columns = { gridTemplateColumns: `6rem repeat(${periods.length}, minmax(0, 1fr))` }

  return (
    <div className="card-surface overflow-x-auto rounded-lg border">
      <div className="min-w-[44rem]">
        <div className="grid border-b bg-surface" style={columns} aria-hidden="true">
          <span />
          {periods.map((period) => (
            <span key={period} className="border-l px-4 py-3 type-eyebrow text-muted">
              {period}
            </span>
          ))}
        </div>
        <ul className="divide-y">
          {lanes.map((lane) => (
            <li key={lane.track} className="grid" style={columns}>
              <h3 className="px-4 py-5 type-eyebrow text-muted">{lane.track}</h3>
              {lane.cells.map((cells, index) => (
                <div key={periods[index] ?? index} className="flex flex-col gap-2 border-l p-3">
                  <span className="sr-only">{periods[index]}</span>
                  {cells.map((cell) => (
                    <div
                      key={cell.label}
                      className={`rounded-md border px-3 py-2 type-supporting ${
                        cell.milestone ? "border-foreground bg-foreground text-background" : "bg-surface"
                      }`}
                    >
                      <p className="type-strong">
                        {cell.milestone ? <span className="sr-only">Milestone: </span> : null}
                        {cell.label}
                      </p>
                      {cell.detail?.map((line) => (
                        <p key={line} className={`type-supporting ${cell.milestone ? "opacity-85" : "text-muted"}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

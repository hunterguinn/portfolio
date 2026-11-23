import type { Metric } from "@/lib/content/types"

export function MetricValue({ metric }: { metric: Metric }) {
  if (metric.value === null) {
    return (
      <span className="text-heading text-muted/50">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Metric pending</span>
      </span>
    )
  }
  if (metric.counter) {
    const { prefix = "", suffix = "", decimals = 0, to } = metric.counter
    return <span className="text-heading tabular-nums">{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>
  }
  return <span className="text-heading tabular-nums">{metric.value}</span>
}

/** The project-preview metrics, shared without changing their existing treatment. */
export function ProjectMetrics({ metrics, spaciousBottom = false }: { metrics: Metric[]; spaciousBottom?: boolean }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          data-reveal=""
          className={`card-static flex flex-col-reverse gap-1 rounded-md border p-4 lg:px-6 lg:pt-5 ${spaciousBottom ? "lg:pb-6" : "lg:pb-5"}`}
        >
          <dt className="text-caption text-muted">{metric.label}</dt>
          <dd>
            <MetricValue metric={metric} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

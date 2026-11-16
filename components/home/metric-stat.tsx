import type { Metric } from "@/lib/content/types"
import { Pending } from "@/components/site/pending"

export function MetricStat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="type-supporting text-muted">{metric.label}</dt>
      <dd className="type-display tabular-nums">
        {metric.value ?? <Pending>Metric pending</Pending>}
      </dd>
    </div>
  )
}

import type { Metric } from "@/lib/content/types"
import { Pending } from "@/components/site/pending"

export function MetricStat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-caption text-secondary">{metric.label}</dt>
      <dd className="text-display tabular-nums">
        {metric.value ?? <Pending>Metric pending</Pending>}
      </dd>
    </div>
  )
}

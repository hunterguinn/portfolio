import type { Metric } from "@/lib/content/types"
import { Pending } from "@/components/site/pending"

export function MetricStat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-[0.8125rem] text-muted">{metric.label}</dt>
      <dd className="text-2xl font-normal tracking-tight tabular-nums md:text-[1.75rem]">
        {metric.value ?? <Pending>Metric pending</Pending>}
      </dd>
    </div>
  )
}

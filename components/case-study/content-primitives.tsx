import type { Card, Metric, Testimonial } from "@/lib/content/types"

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="max-w-2xl text-base leading-relaxed text-muted text-pretty md:text-lg">{children}</p>
}

export function Cards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 }) {
  const grid = columns === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
  return (
    <ul className={`grid gap-px overflow-hidden rounded-lg border bg-border ${grid}`}>
      {cards.map((card) => (
        <li key={card.title} className="flex flex-col gap-3 bg-background p-6">
          <h3 className="text-base font-medium">{card.title}</h3>
          <p className="text-sm leading-relaxed text-muted text-pretty">{card.body}</p>
        </li>
      ))}
    </ul>
  )
}

export function Callout({ text }: { text: string }) {
  return (
    <blockquote className="max-w-3xl border-l-2 border-foreground py-1 pl-6 text-xl font-medium leading-snug tracking-tight text-balance md:text-2xl">
      <p>{text}</p>
    </blockquote>
  )
}

export function TestimonialQuote({ testimonial, compact = false }: { testimonial: Testimonial; compact?: boolean }) {
  return (
    <figure className={`flex h-full flex-col justify-between gap-6 rounded-lg border bg-surface ${compact ? "p-6" : "p-6 md:p-10"}`}>
      <blockquote>
        <p className={`leading-relaxed text-pretty ${compact ? "text-base" : "text-lg md:text-xl"}`}>
          {`“${testimonial.quote}”`}
        </p>
      </blockquote>
      <figcaption className="text-sm">
        <span className="block font-medium">{testimonial.name}</span>
        <span className="block text-muted">{testimonial.role}</span>
      </figcaption>
    </figure>
  )
}

export function MetricValue({ metric, size = "lg" }: { metric: Metric; size?: "lg" | "md" }) {
  const sizeClass = size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
  if (metric.value === null) {
    return (
      <span className={`${sizeClass} font-medium tracking-tight text-muted/50`}>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Metric pending</span>
      </span>
    )
  }
  return <span className={`${sizeClass} font-medium tracking-tight tabular-nums`}>{metric.value}</span>
}

export function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse gap-3 bg-background p-6 md:p-8">
          <dt className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {metric.label}
            {metric.value === null ? (
              <span className="rounded-full border border-dashed px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider">
                Metric pending
              </span>
            ) : null}
          </dt>
          <dd>
            <MetricValue metric={metric} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

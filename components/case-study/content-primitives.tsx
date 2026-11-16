import {
  Activity,
  Eye,
  Layers,
  LifeBuoy,
  ListChecks,
  MessageSquareText,
  Minimize2,
  MousePointerClick,
  Repeat,
  Route,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Split,
  Target,
  Timer,
  Quote,
  Unlink,
  Unplug,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import type { Card, CardIcon, CardTone, Metric, Testimonial } from "@/lib/content/types"
import { Avatar } from "@/components/site/avatar"

const cardIcons: Record<CardIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  "shield-alert": ShieldAlert,
  unplug: Unplug,
  "list-checks": ListChecks,
  split: Split,
  sliders: SlidersHorizontal,
  message: MessageSquareText,
  timer: Timer,
  layers: Layers,
  eye: Eye,
  repeat: Repeat,
  target: Target,
  pointer: MousePointerClick,
  minimize: Minimize2,
  route: Route,
  smartphone: Smartphone,
  users: Users,
  unlink: Unlink,
  "user-check": UserCheck,
  activity: Activity,
  "life-buoy": LifeBuoy,
}

const toneColors: Record<CardTone, string> = {
  problem: "var(--red)",
  approach: "var(--blue)",
  solution: "var(--green)",
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="type-body text-muted text-pretty">{children}</p>
}

export function Cards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 }) {
  const grid = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
  return (
    <ul className={`grid gap-3 ${grid}`}>
      {cards.map((card) => {
        const tone = toneColors[card.tone ?? "approach"]
        const Icon = card.icon ? cardIcons[card.icon] : null
        return (
          <li
            key={card.title}
            style={{ "--tone": tone } as React.CSSProperties}
            className="card-surface flex flex-col gap-3 rounded-lg p-5 md:gap-7"
          >
            {Icon ? (
              <span className="inline-flex size-8 items-center justify-center self-start rounded-[0.625rem] bg-[color-mix(in_oklab,var(--tone)_16%,transparent)] text-[var(--tone)]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
            ) : null}
            <div className="flex flex-col gap-0.5 md:gap-1.5">
              <h3 className="type-body type-strong">{card.title}</h3>
              <p className="type-supporting text-muted text-pretty">{card.body}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function Callout({ text }: { text: string }) {
  return (
    <blockquote className="type-project-title border-l-2 border-foreground py-0.5 pl-5 text-pretty">
      <p>{text}</p>
    </blockquote>
  )
}

export function TestimonialQuote({ testimonial, compact = false }: { testimonial: Testimonial; compact?: boolean }) {
  if (compact) {
    return (
      <figure className="flex h-full flex-col justify-between gap-8 card-surface rounded-3xl p-6">
        <blockquote>
          <p className="type-quote italic text-pretty">{testimonial.quote}</p>
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar name={testimonial.name} size={40} />
          <span className="flex flex-col">
            <span className="type-supporting type-strong">{testimonial.name}</span>
            <span className="type-caption block text-muted">{testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    )
  }

  return (
    <figure
      className={`flex h-full flex-col justify-between gap-8 card-surface ${compact ? "rounded-3xl p-6" : "rounded-lg p-5 md:p-8"}`}
    >
      <div className="flex flex-col gap-5">
        {compact ? <Quote className="size-5 text-muted" aria-hidden="true" /> : null}
        <blockquote>
          <p className={`${compact ? "type-quote" : "type-body"} text-pretty`}>
            {compact ? testimonial.quote : `“${testimonial.quote}”`}
          </p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t pt-5">
        <Avatar name={testimonial.name} size={40} />
        <span className="flex flex-col">
          <span className="type-supporting type-strong">{testimonial.name}</span>
          <span className="type-caption block text-muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function MetricValue({ metric, size = "lg" }: { metric: Metric; size?: "lg" | "md" }) {
  const sizeClass = size === "lg" ? "type-display" : "type-project-title"
  if (metric.value === null) {
    return (
      <span className={`${sizeClass} text-muted/50`}>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Metric pending</span>
      </span>
    )
  }
  return <span className={`${sizeClass} tabular-nums`}>{metric.value}</span>
}

export function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="card-surface flex flex-col-reverse gap-3 rounded-lg p-5 md:p-6">
          <dt className="flex flex-wrap items-center gap-2 type-supporting text-muted">
            {metric.label}
            {metric.value === null ? (
              <span className="rounded-full border border-dashed px-2 py-0.5 type-eyebrow">
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

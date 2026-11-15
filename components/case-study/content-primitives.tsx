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
  Unlink,
  Unplug,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import type { Card, CardIcon, CardTone, Metric, Testimonial } from "@/lib/content/types"
import { avatars } from "@/lib/content/avatars"
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

const toneStyles: Record<CardTone, { label: string; color: string }> = {
  problem: { label: "Challenge", color: "var(--tone-problem)" },
  approach: { label: "Approach", color: "var(--tone-approach)" },
  solution: { label: "Solution", color: "var(--tone-solution)" },
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.9375rem] leading-[1.7] text-muted text-pretty">{children}</p>
}

export function Cards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 }) {
  const grid = columns === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
  return (
    <ul className={`grid gap-3 ${grid}`}>
      {cards.map((card) => {
        const tone = toneStyles[card.tone ?? "approach"]
        const Icon = card.icon ? cardIcons[card.icon] : null
        return (
          <li
            key={card.title}
            style={
              {
                "--tone": tone.color,
                "--card-border": "color-mix(in oklab, var(--tone) 24%, var(--border))",
              } as React.CSSProperties
            }
            className="card-surface flex flex-col gap-4 rounded-lg border p-5"
          >
            <div className="flex items-center justify-between gap-3">
              {Icon ? (
                <span className="inline-flex size-8 items-center justify-center rounded-[0.625rem] bg-[color-mix(in_oklab,var(--tone)_16%,transparent)] text-[var(--tone)]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              ) : null}
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[var(--tone)]">
                {tone.label}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[0.9375rem] font-medium tracking-tight">{card.title}</h3>
              <p className="text-[0.8125rem] leading-relaxed text-muted text-pretty">{card.body}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function Callout({ text }: { text: string }) {
  return (
    <blockquote className="border-l-2 border-foreground py-0.5 pl-5 text-lg font-medium leading-snug tracking-tight text-pretty md:text-xl">
      <p>{text}</p>
    </blockquote>
  )
}

export function TestimonialQuote({ testimonial, compact = false }: { testimonial: Testimonial; compact?: boolean }) {
  return (
    <figure className={`flex h-full flex-col justify-between gap-6 card-surface rounded-lg border ${compact ? "p-5" : "p-5 md:p-8"}`}>
      <blockquote>
        <p className={`leading-relaxed text-pretty ${compact ? "text-[0.9375rem]" : "text-base md:text-[1.0625rem]"}`}>
          {`“${testimonial.quote}”`}
        </p>
      </blockquote>
      <figcaption className="flex items-center gap-3 text-[0.8125rem]">
        <Avatar name={testimonial.name} src={avatars[testimonial.name]} size={36} />
        <span>
          <span className="block font-medium">{testimonial.name}</span>
          <span className="block text-muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function MetricValue({ metric, size = "lg" }: { metric: Metric; size?: "lg" | "md" }) {
  const sizeClass = size === "lg" ? "text-3xl md:text-[2.25rem]" : "text-2xl md:text-3xl"
  if (metric.value === null) {
    return (
      <span className={`${sizeClass} font-normal tracking-tight text-muted/50`}>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Metric pending</span>
      </span>
    )
  }
  return <span className={`${sizeClass} font-normal tracking-tight tabular-nums`}>{metric.value}</span>
}

export function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="card-surface flex flex-col-reverse gap-3 rounded-lg border p-5 md:p-6">
          <dt className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-muted">
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

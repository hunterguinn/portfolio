import { Pulse } from "@phosphor-icons/react/dist/ssr/Pulse"
import { Eye } from "@phosphor-icons/react/dist/ssr/Eye"
import { Stack } from "@phosphor-icons/react/dist/ssr/Stack"
import { Lifebuoy } from "@phosphor-icons/react/dist/ssr/Lifebuoy"
import { ListChecks } from "@phosphor-icons/react/dist/ssr/ListChecks"
import { ChatText } from "@phosphor-icons/react/dist/ssr/ChatText"
import { ArrowsIn } from "@phosphor-icons/react/dist/ssr/ArrowsIn"
import { CursorClick } from "@phosphor-icons/react/dist/ssr/CursorClick"
import { Repeat } from "@phosphor-icons/react/dist/ssr/Repeat"
import { Path } from "@phosphor-icons/react/dist/ssr/Path"
import { ShieldWarning } from "@phosphor-icons/react/dist/ssr/ShieldWarning"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import { SlidersHorizontal } from "@phosphor-icons/react/dist/ssr/SlidersHorizontal"
import { DeviceMobile } from "@phosphor-icons/react/dist/ssr/DeviceMobile"
import { GitFork } from "@phosphor-icons/react/dist/ssr/GitFork"
import { Target } from "@phosphor-icons/react/dist/ssr/Target"
import { Timer } from "@phosphor-icons/react/dist/ssr/Timer"
import { Quotes } from "@phosphor-icons/react/dist/ssr/Quotes"
import { LinkBreak } from "@phosphor-icons/react/dist/ssr/LinkBreak"
import { Plugs } from "@phosphor-icons/react/dist/ssr/Plugs"
import { UserCheck } from "@phosphor-icons/react/dist/ssr/UserCheck"
import { Users } from "@phosphor-icons/react/dist/ssr/Users"
import type { Icon } from "@phosphor-icons/react"
import type { Card, CardIcon, CardTone, Metric, Testimonial } from "@/lib/content/types"
import { Avatar } from "@/components/site/avatar"
import { CountUp } from "@/components/site/count-up"

const cardIcons: Record<CardIcon, Icon> = {
  "shield-check": ShieldCheck,
  "shield-alert": ShieldWarning,
  unplug: Plugs,
  "list-checks": ListChecks,
  split: GitFork,
  sliders: SlidersHorizontal,
  message: ChatText,
  timer: Timer,
  layers: Stack,
  eye: Eye,
  repeat: Repeat,
  target: Target,
  pointer: CursorClick,
  minimize: ArrowsIn,
  route: Path,
  smartphone: DeviceMobile,
  users: Users,
  unlink: LinkBreak,
  "user-check": UserCheck,
  activity: Pulse,
  "life-buoy": Lifebuoy,
}

const toneColors: Record<CardTone, string> = {
  problem: "var(--red)",
  approach: "var(--blue)",
  solution: "var(--green)",
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-body text-muted">{children}</p>
}

export function Cards({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 }) {
  const count = Math.min(columns, cards.length)
  const grid = count >= 3 ? "md:grid-cols-3" : count === 2 ? "md:grid-cols-2" : ""
  const spanOrphan = count === 2 && cards.length % 2 === 1 ? "md:last:col-span-2" : ""
  return (
    <ul className={`grid gap-3 ${grid} ${spanOrphan}`}>
      {cards.map((card, index) => {
        const tone = toneColors[card.tone ?? "approach"]
        const Icon = card.icon ? cardIcons[card.icon] : null
        return (
          <li
            key={`${card.title}-${index}`}
            style={{ "--tone": tone } as React.CSSProperties}
            className="card-surface flex flex-col justify-between gap-3 rounded-lg p-5 md:gap-7 lg:p-6"
          >
            {Icon ? (
              <span className="inline-flex size-8 items-center justify-center self-start rounded-sm bg-tone/16 text-tone">
                <Icon weight="regular" className="size-4" aria-hidden="true" />
              </span>
            ) : null}
            <div className="flex flex-col gap-title-desc">
              <h3 className="text-body text-strong">{card.title}</h3>
              <p className="text-caption text-muted">{card.body}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function Callout({ text }: { text: string }) {
  return (
    <blockquote className="text-heading border-l-2 border-foreground py-1 pl-5">
      <p>{text}</p>
    </blockquote>
  )
}

export function TestimonialQuote({
  testimonial,
  compact = false,
  quoteWeight = "normal",
}: {
  testimonial: Testimonial
  compact?: boolean
  quoteWeight?: "light" | "normal"
}) {
  if (compact) {
    return (
      <figure className="group flex h-full w-full flex-col justify-between gap-8 card-surface rounded-3xl p-8 lg:p-6">
        <div className="flex flex-col gap-3 md:gap-7">
          <blockquote>
            <p
              className="text-heading text-muted transition-colors duration-300 group-hover:text-foreground"
              style={{ fontWeight: quoteWeight === "light" ? 300 : 400 }}
            >
              {testimonial.quote}
            </p>
          </blockquote>
        </div>
        <figcaption className="flex items-center gap-3">
          <Avatar name={testimonial.name} size={40} />
          <span className="flex flex-col gap-title-desc">
            <span className="text-body font-normal">{testimonial.name}</span>
            <span className="text-eyebrow block text-muted">{testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    )
  }

  return (
    <figure
      className={`group flex h-full flex-col justify-between gap-8 card-surface ${compact ? "rounded-3xl p-8 lg:p-6" : "rounded-lg p-8 lg:p-6"}`}
    >
      <div className="flex flex-col gap-5">
        {compact ? <Quotes weight="regular" className="size-5 text-muted" aria-hidden="true" /> : null}
        <blockquote>
          <p className="text-body text-muted transition-colors duration-300 group-hover:text-foreground">
            {compact ? testimonial.quote : `“${testimonial.quote}”`}
          </p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t pt-5">
        <Avatar name={testimonial.name} size={40} />
        <span className="flex flex-col gap-title-desc">
          <span className="text-caption text-strong">{testimonial.name}</span>
          <span className="text-eyebrow block text-muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

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
    return (
      <span className="text-heading tabular-nums">
        <CountUp {...metric.counter} />
      </span>
    )
  }
  return <span className="text-heading tabular-nums">{metric.value}</span>
}

export function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid gap-3 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <div key={`${metric.label}-${index}`} className="card-surface flex flex-col-reverse gap-3 rounded-lg p-5 md:p-6">
          <dt className="flex flex-wrap items-center gap-2 text-caption text-muted">
            {metric.label}
            {metric.value === null ? (
              <span className="rounded-full border border-dashed px-2 py-1 text-eyebrow">
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

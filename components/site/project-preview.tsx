import type { Icon } from "@phosphor-icons/react"
import { Bank } from "@phosphor-icons/react/dist/ssr/Bank"
import { Briefcase } from "@phosphor-icons/react/dist/ssr/Briefcase"
import { CreditCard } from "@phosphor-icons/react/dist/ssr/CreditCard"
import { Stack } from "@phosphor-icons/react/dist/ssr/Stack"
import { Storefront } from "@phosphor-icons/react/dist/ssr/Storefront"
import { Wallet } from "@phosphor-icons/react/dist/ssr/Wallet"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"
import Image from "next/image"
import Link from "next/link"
import { IconBadge } from "@/components/site/icon-badge"
import { MetricValue } from "@/components/site/project-metrics"
import type { ProjectIcon, ProjectSummary } from "@/lib/content/types"

const metricIconComponents: Partial<Record<ProjectIcon, Icon>> = {
  landmark: Bank,
  wallet: Wallet,
  "credit-card": CreditCard,
  store: Storefront,
  layers: Stack,
  briefcase: Briefcase,
}

export function ProjectPreview({
  project,
  titleId,
}: {
  project: ProjectSummary
  titleId?: string
}) {
  return (
    <Link
      href={project.href}
      aria-label={`View project: ${project.title}`}
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,0.72fr)]"
    >
      <div className="relative flex h-112 flex-col overflow-hidden rounded-lg border border-border xl:h-140">
        <Image
          src={project.background}
          alt=""
          fill
          sizes="(min-width: 1280px) 28vw, 90vw"
          className="object-cover"
        />
        <div className="relative ml-6 flex min-h-0 flex-1 items-center justify-center rounded-bl-md bg-surface p-16">
          {project.cover.src ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.mockup.width}
              height={project.mockup.height}
              sizes="(min-width: 1280px) 30vw, 80vw"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          ) : (
            <span className="text-caption text-muted">{project.cover.placeholder}</span>
          )}
        </div>
        <div className="relative flex flex-col gap-2 px-6 pb-3 pt-6 text-overlay-white">
          <h3 id={titleId} className="text-heading">
            {project.title}
          </h3>
          <div className="flex items-center justify-between text-caption">
            <span>{project.category}</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-112 flex-col justify-between gap-8 rounded-lg border border-border bg-surface p-6 xl:min-h-140">
        <p className="rounded-md bg-background px-6 py-12 text-body">{project.description}</p>
        <span className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-caption font-medium text-background">
          View project
          <CaretRight weight="regular" className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="grid gap-6 xl:grid-rows-2">
        {project.metrics.map((metric, index) => {
          const MetricIcon = metricIconComponents[project.metricIcons[index]]

          return (
            <div
              key={metric.label}
              className="flex min-h-52 flex-col justify-between gap-8 rounded-lg border border-border bg-surface p-6 xl:min-h-0"
            >
              {MetricIcon ? (
                <IconBadge>
                  <MetricIcon weight="regular" className="size-5 text-muted" />
                </IconBadge>
              ) : null}
              <dl className="flex flex-col gap-2">
                <dt className="text-heading tabular-nums">
                  <MetricValue metric={metric} />
                </dt>
                <dd className="text-caption text-muted">{metric.label}</dd>
              </dl>
            </div>
          )
        })}
      </div>
    </Link>
  )
}

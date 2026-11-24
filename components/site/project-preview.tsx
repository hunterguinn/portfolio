import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"
import Image from "next/image"
import Link from "next/link"
import { MetricValue } from "@/components/site/project-metrics"
import type { ProjectSummary } from "@/lib/content/types"

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
      className="btn-primary-group grid gap-3 md:grid-cols-2"
    >
      <div className="relative flex h-112 flex-col gap-3 overflow-hidden rounded-lg border border-border xl:h-140">
        <Image
          src={project.background}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 90vw"
          className="object-cover"
        />
        <div className="project-preview-scrim absolute inset-0" aria-hidden="true" />
        <div className="relative ml-6 flex min-h-0 flex-1 items-center justify-center rounded-bl-md bg-surface px-6 pb-6 pt-3">
          {project.cover.src ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.mockup.width}
              height={project.mockup.height}
              sizes="(min-width: 768px) 50vw, 80vw"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          ) : (
            <span className="text-caption text-muted">{project.cover.placeholder}</span>
          )}
        </div>
        <div className="relative flex flex-col gap-2 px-6 pb-3 text-foreground">
          <h3 id={titleId} className="text-heading">
            {project.title}
          </h3>
          <div className="flex items-center justify-between text-caption">
            <span>{project.category}</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-112 flex-col gap-3 xl:min-h-140">
        <div className="flex flex-1 flex-col justify-center rounded-lg border border-border bg-surface p-6">
          <p className="rounded-md bg-background px-6 py-12 text-body">{project.description}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-0.5 rounded-lg border border-border bg-surface p-5"
            >
              <dt className="text-heading tabular-nums">
                <MetricValue metric={metric} />
              </dt>
              <dd className="text-caption text-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>

        <span className="btn btn-primary text-caption w-full">
          View project
          <CaretRight weight="regular" className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

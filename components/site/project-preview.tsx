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
      data-cursor="View project"
      className="btn-primary-group grid gap-3 md:grid-cols-2"
    >
      {/* The text column sets the row height; this card fills it and the cover scales to fit. */}
      <div className="relative min-h-112 overflow-hidden rounded-lg border border-border md:min-h-96">
        <Image
          src={project.background}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 90vw"
          className="object-cover"
        />
        <div className="project-preview-scrim absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col">
          <div className="ml-6 flex min-h-0 flex-1 items-center justify-center rounded-bl-md bg-surface px-6 pb-6 pt-3">
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
          <div className="flex flex-col gap-2 p-6 text-foreground">
            <h3 id={titleId} className="text-heading">
              {project.title}
            </h3>
            <div className="flex items-center justify-between text-caption">
              <span>{project.category}</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-1 flex-col justify-center rounded-lg border border-border bg-surface p-5">
          <p className="rounded-md bg-background px-6 py-15 text-body">{project.description}</p>
        </div>

        <dl className="hidden grid-cols-2 gap-3 lg:grid">
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

        <span className="btn btn-primary text-caption w-full lg:hidden">
          View project
          <CaretRight weight="regular" className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

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
      className="project-preview btn-primary-group grid min-w-0 gap-3 md:grid-cols-2"
    >
      {/* Keep a portrait stage for the device composition; longer text can still grow the row. */}
      <div className="relative aspect-[4/5] min-h-112 w-full min-w-0 overflow-hidden rounded-lg border border-border md:min-h-128">
        <Image
          src={project.background}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 90vw"
          className="object-cover"
        />
        <div className="project-preview-scrim absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col">
          <div className="flex min-h-0 flex-1 pl-5 pt-5">
            <div className={`flex min-h-0 w-full overflow-hidden rounded-lg bg-surface ${project.mockups.layout === "browser" ? "px-6 pt-12" : "p-5"}`}>
              <div data-layout={project.mockups.layout} className="project-preview-mockups flex h-full w-full min-w-0 items-center justify-center gap-4">
                {project.mockups.images.map((image) => (
                  <Image
                    key={image.src.src}
                    src={image.src}
                    alt={image.alt}
                    sizes={project.mockups.layout === "browser" ? "(min-width: 768px) 40vw, 80vw" : "(min-width: 768px) 24vw, 48vw"}
                    className="block h-full w-auto shrink-0 object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 p-6 text-foreground">
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

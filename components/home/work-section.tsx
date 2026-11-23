import Image from "next/image"
import Link from "next/link"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionHeader, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { MetricValue } from "@/components/case-study/content-primitives"

function ProjectCover({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={project.href}
      aria-label={`View project: ${project.title}`}
      data-cursor="project"
      className="card-hover group relative block overflow-hidden rounded-lg border"
      style={{ aspectRatio: project.cover.aspect }}
    >
      <div className="media-settle cover-zoom absolute inset-0">
        <Image
          src={project.background}
          alt=""
          fill
          sizes="(min-width: 768px) 40rem, 100vw"
          className="object-cover"
        />
        <div className="absolute top-[16.6%] right-0 bottom-0 left-[11%] overflow-hidden rounded-tl-lg bg-surface">
          {project.cover.src ? (
            <div
              className="absolute"
              style={{ left: project.mockup.left, top: project.mockup.top, width: project.mockup.size }}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.mockup.width}
                height={project.mockup.height}
                sizes="(min-width: 768px) 30rem, 80vw"
                className="h-auto w-full"
              />
            </div>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-caption text-muted">
              {project.cover.placeholder}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function ProjectEntry({ project }: { project: ProjectSummary }) {
  const [category, year] = project.meta.split(" · ")
  const titleId = `project-${project.slug}-title`

  return (
    <article aria-labelledby={titleId} className="flex min-w-0 flex-col gap-6">
      <div data-reveal="media">
        <ProjectCover project={project} />
      </div>
      <div className="flex flex-col gap-4">
        <div data-reveal="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h3 id={titleId} className="text-heading">
              {project.title}
            </h3>
            <p className="text-body text-muted">{project.description}</p>
          </div>
          <div className="flex items-baseline justify-between gap-4 text-caption text-muted tabular-nums">
            <span>{category}</span>
            <span>{year}</span>
          </div>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} data-reveal="" className="flex flex-col-reverse gap-1 rounded-md border p-4 lg:p-6">
              <dt className="text-caption text-muted">{metric.label}</dt>
              <dd>
                <MetricValue metric={metric} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

export function WorkSection() {
  return (
    <SectionShell id="work">
      <SectionHeader>
        <SectionTitle id="work">{home.work.title}</SectionTitle>
      </SectionHeader>
      <div className="flex flex-col gap-16 md:gap-24">
        {home.work.projects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  )
}

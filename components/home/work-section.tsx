import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { MetricValue } from "@/components/case-study/content-primitives"

function ProjectCover({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={project.href}
      aria-label={`View project: ${project.title}`}
      className="card-hover group relative block overflow-hidden rounded-lg border bg-surface"
      style={{ aspectRatio: project.cover.aspect }}
    >
      <Image
        src={project.background}
        alt=""
        fill
        sizes="(min-width: 768px) 40rem, 100vw"
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
      />
      {project.cover.src ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 768px) 40rem, 100vw"
          className="object-contain p-6 transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-1 md:p-10"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-caption text-muted">
          {project.cover.placeholder}
        </span>
      )}
      <span className="gallery-pill absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors group-hover:text-foreground">
        View project
        <ArrowRight weight="regular" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  )
}

function ProjectEntry({ project }: { project: ProjectSummary }) {
  const [category, year] = project.meta.split(" · ")
  const titleId = `project-${project.slug}-title`

  return (
    <article aria-labelledby={titleId} className="flex min-w-0 flex-col gap-6">
      <ProjectCover project={project} />
      <div className="flex flex-col gap-4">
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
        <dl className="grid gap-3 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="card-hover flex flex-col-reverse gap-1 rounded-md border p-4 lg:p-6">
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
      <SectionTitle id="work">{home.work.title}</SectionTitle>
      <div className="flex flex-col gap-16 md:gap-24">
        {home.work.projects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  )
}

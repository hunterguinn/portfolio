import Image from "next/image"
import Link from "next/link"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { MediaSlot } from "@/components/case-study/figure"
import { CountUp } from "@/components/site/count-up"
import { Pending } from "@/components/site/pending"

function CoverMedia({ cover }: { cover: ProjectSummary["cover"] }) {
  if (cover.src && cover.kind === "image") {
    return (
      <div className="card-surface relative min-h-64 overflow-hidden rounded-3xl md:min-h-[26rem]">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain p-6 md:p-10"
        />
      </div>
    )
  }
  return (
    <div className="card-surface flex min-h-64 flex-col overflow-hidden rounded-3xl p-3 md:min-h-[26rem]">
      <MediaSlot slot={cover} />
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const [category, year] = project.meta.split(" · ")

  return (
    <article data-cursor="view-project" className="group relative">
      <div className="grid gap-3 text-foreground">
        <div className="card-surface rounded-3xl p-5 md:p-7">
          <h3 className="type-project-title text-balance">
            <Link
              href={project.href}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              {project.title}
            </Link>
          </h3>
          <div className="mt-4 flex items-center justify-between gap-4 type-caption text-muted">
            <span>{category}</span>
            <span>{year}</span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <CoverMedia cover={project.cover} />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-3">
            {project.metrics.map((metric) => (
              <dl key={metric.label} className="card-surface flex min-h-32 flex-col justify-between gap-5 rounded-3xl p-4 md:p-5">
                <dd className="type-display tabular-nums">
                  {metric.counter ? (
                    <CountUp {...metric.counter} />
                  ) : metric.value ?? (
                    <Pending>Metric pending</Pending>
                  )}
                </dd>
                <dt className="type-supporting text-muted text-pretty">{metric.label}</dt>
              </dl>
            ))}
            <div className="card-surface flex min-h-32 flex-col justify-between gap-4 rounded-3xl p-4 md:p-5 sm:col-span-2 md:col-span-1">
              <p className="type-caption text-muted">The Team</p>
              <p className="type-body text-muted">Digital Leadership</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function WorkSection() {
  return (
    <SectionShell id="work" label={home.work.label}>
      <div className="flex flex-col gap-6 md:gap-14 lg:gap-8">
        <SectionTitle id="work">{home.work.title}</SectionTitle>
        <div className="flex flex-col gap-10 md:gap-14">
          {home.work.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

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
      <div className="relative min-h-64 overflow-hidden rounded-2xl bg-background md:min-h-[26rem]">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-contain p-6 md:p-10"
        />
      </div>
    )
  }
  return (
    <div className="flex min-h-64 flex-col overflow-hidden rounded-2xl bg-background p-3 md:min-h-[26rem]">
      <MediaSlot slot={cover} />
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const [category, year] = project.meta.split(" · ")

  return (
    <article data-cursor="view-project" className="group relative">
      <div className="card-surface flex flex-col gap-6 rounded-3xl p-5 text-foreground md:gap-8 md:p-8">
        <div>
          <h3 className="type-project-title text-balance">
            <Link
              href={project.href}
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              {project.title}
            </Link>
          </h3>
          <p className="type-body mt-3 max-w-4xl text-pretty text-muted">{project.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {project.metrics.map((metric) => (
            <dl key={metric.label} className="flex flex-col gap-2">
              <dd className="type-display tabular-nums">
                {metric.counter ? (
                  <CountUp {...metric.counter} />
                ) : metric.value ?? (
                  <Pending>Metric pending</Pending>
                )}
              </dd>
              <dt className="type-supporting text-pretty text-muted">{metric.label}</dt>
            </dl>
          ))}
        </div>

        <CoverMedia cover={project.cover} />

        <div className="flex items-center justify-between gap-4 type-caption text-muted">
          <span>{category}</span>
          <span>{year}</span>
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

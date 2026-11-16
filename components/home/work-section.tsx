import Image from "next/image"
import Link from "next/link"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Pending } from "@/components/site/pending"
import { MediaSlot } from "@/components/case-study/figure"

function CoverMedia({ cover }: { cover: ProjectSummary["cover"] }) {
  if (cover.src && cover.kind === "image") {
    return (
      <div className="relative min-h-64 overflow-hidden rounded-2xl bg-[#ecebe7] lg:min-h-[26rem]">
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
    <div className="flex min-h-64 flex-col lg:min-h-[26rem]">
      <MediaSlot slot={cover} />
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const [format] = project.meta.split(" · ")

  return (
    <article data-cursor="view-project" className="group relative">
      <div
        data-project={project.slug}
        className="cover-gradient grid gap-3 rounded-3xl p-3 text-foreground lg:grid-cols-2"
      >
        <div className="flex flex-col justify-between gap-10 px-3 py-4 md:gap-14 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="type-project-title text-balance">
                <Link
                  href={project.href}
                  className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="type-body text-muted">{format}</p>
            </div>
            <p className="type-body text-pretty">{project.description}</p>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dd className="type-display tabular-nums">
                  {metric.value ?? <Pending>Metric pending</Pending>}
                </dd>
                <dt className="type-body text-muted text-pretty">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <CoverMedia cover={project.cover} />
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

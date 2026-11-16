import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Database, Workflow } from "lucide-react"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Pending } from "@/components/site/pending"
import { IconBadge } from "@/components/site/icon-badge"
import { MediaSlot } from "@/components/case-study/figure"

function CoverMedia({ cover }: { cover: ProjectSummary["cover"] }) {
  if (cover.src && cover.kind === "image") {
    return (
      <div className="relative min-h-64 flex-1 overflow-hidden rounded-2xl bg-[#ecebe7]">
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
    <div className="flex min-h-64 flex-1 flex-col">
      <MediaSlot slot={cover} />
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const [format, year] = project.meta.split(" · ")

  return (
    <article data-cursor="view-project" className="group relative">
      <div className="overflow-hidden rounded-lg">
          <div className="grid gap-3 lg:grid-cols-2">
            <div
              data-project={project.slug}
              className="cover-gradient flex min-h-[28rem] flex-col gap-6 rounded-3xl p-3 pb-5 text-white lg:col-span-2 lg:min-h-[30rem]"
            >
              <CoverMedia cover={project.cover} />
              <div className="flex flex-col gap-1 px-2">
                <h3 className="type-project-title text-balance">{project.title}</h3>
                <p className="flex items-baseline justify-between gap-4 type-body">
                  <span>{format}</span>
                  <span className="tabular-nums">{year}</span>
                </p>
              </div>
            </div>

            <div className="card-surface flex flex-col gap-8 rounded-3xl p-3">
              <p className="type-body rounded-2xl bg-background p-6 text-pretty">{project.description}</p>
              <div className="flex flex-1 flex-col justify-between gap-8 px-3 pb-2">
                <div className="flex flex-col gap-1">
                  <p className="type-body type-strong">The Team:</p>
                  {project.team.map((member) => (
                    <p key={member.role} className="type-body text-muted">
                      {member.role} &bull; {member.name}
                    </p>
                  ))}
                </div>
                <Link
                  href={project.href}
                  className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 font-mono text-sm text-background after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                >
                  View project
                  <ChevronRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">: {project.title}</span>
                </Link>
              </div>
            </div>

            <dl className="flex flex-col gap-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="card-surface flex flex-1 flex-col justify-between gap-6 rounded-3xl p-6">
                  <IconBadge>
                    <Database className="size-4" />
                  </IconBadge>
                  <div className="flex flex-col gap-1">
                    <dd className="type-display tabular-nums">
                      {metric.value ?? <Pending>Metric pending</Pending>}
                    </dd>
                    <dt className="type-body text-muted">{metric.label}</dt>
                  </div>
                </div>
              ))}
              <div className="card-surface flex flex-1 flex-col justify-between gap-6 rounded-3xl p-6">
                <IconBadge>
                  <Workflow className="size-4" />
                </IconBadge>
                <div className="flex flex-col gap-1">
                  <dd className="type-project-title text-balance">{project.highlight.title}</dd>
                  <dt className="type-body text-muted text-pretty">{project.highlight.body}</dt>
                </div>
              </div>
            </dl>
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

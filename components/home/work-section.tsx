import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Reveal } from "@/components/site/reveal"
import { MediaSlot } from "@/components/case-study/figure"
import { MetricStat } from "./metric-stat"
import { CurtainCover } from "./curtain-cover"

function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Reveal>
      <article
        data-cursor="view-project"
        className="group relative flex flex-col gap-6 border-t pt-10 first:border-t-0 first:pt-0"
      >
        <CurtainCover>
          <MediaSlot slot={project.cover} />
        </CurtainCover>
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="type-eyebrow text-muted">{project.meta}</p>
            <h3 className="type-project-title text-balance">
              <Link
                href={project.href}
                className="inline-flex items-start gap-2 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                {project.title}
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </h3>
            <p className="type-body type-measure text-muted text-pretty">{project.description}</p>
          </div>
          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-2 gap-6">
              {project.metrics.map((metric) => (
                <MetricStat key={metric.label} metric={metric} />
              ))}
            </dl>
            <div className="card-surface rounded-lg border p-4">
              <p className="type-supporting type-strong">{project.highlight.title}</p>
              <p className="mt-1 type-supporting text-muted text-pretty">{project.highlight.body}</p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function WorkSection() {
  return (
    <SectionShell id="work" label={home.work.label}>
      <div className="flex flex-col gap-10 md:gap-14">
        <SectionTitle id="work">{home.work.title}</SectionTitle>
        <div className="flex flex-col gap-14 md:gap-20">
          {home.work.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

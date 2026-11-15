import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Reveal } from "@/components/site/reveal"
import { MediaSlot } from "@/components/case-study/figure"
import { MetricStat } from "./metric-stat"

function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Reveal>
      <article className="group relative flex flex-col gap-8 border-t pt-8 first:border-t-0 first:pt-0">
        <MediaSlot slot={project.cover} />
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{project.meta}</p>
            <h3 className="text-2xl font-medium tracking-tight text-balance md:text-3xl">
              <Link
                href={project.href}
                className="inline-flex items-start gap-2 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                {project.title}
                <ArrowUpRight
                  className="mt-1.5 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </h3>
            <p className="text-muted text-pretty leading-relaxed">{project.description}</p>
          </div>
          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-2 gap-6">
              {project.metrics.map((metric) => (
                <MetricStat key={metric.label} metric={metric} />
              ))}
            </dl>
            <div className="rounded-lg border bg-surface p-4">
              <p className="text-sm font-medium">{project.highlight.title}</p>
              <p className="mt-1 text-sm text-muted text-pretty">{project.highlight.body}</p>
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
      <div className="flex flex-col gap-12 md:gap-16">
        <SectionTitle id="work">{home.work.title}</SectionTitle>
        <div className="flex flex-col gap-16 md:gap-24">
          {home.work.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionHeader, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { ProjectMetrics } from "@/components/site/project-metrics"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { ProjectPreview } from "@/components/site/project-preview"

function ProjectEntry({ project }: { project: ProjectSummary }) {
  const titleId = `project-${project.slug}-title`

  return (
    <article aria-labelledby={titleId} className="flex min-w-0 flex-col gap-6">
      <div data-reveal="media">
        <ProjectPreview project={project} />
      </div>
      <div className="flex flex-col gap-4">
        <div data-reveal="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h3 id={titleId} className="text-[36px] leading-[1.2] font-light">
              {project.title}
            </h3>
            <p className="text-body text-muted">{project.description}</p>
          </div>
        </div>
        <ProjectMetrics metrics={project.metrics} spaciousBottom={project.slug === "pos"} />
      </div>
    </article>
  )
}

export function WorkSection() {
  return (
    <SectionShell id="work">
      <SectionHeader>
        <SectionEyebrow>{home.work.label}</SectionEyebrow>
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

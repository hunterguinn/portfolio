import { home } from "@/lib/content/home"
import type { ProjectSummary } from "@/lib/content/types"
import { SectionHeader, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { ProjectPreview } from "@/components/site/project-preview"

function ProjectEntry({ project }: { project: ProjectSummary }) {
  const titleId = `project-${project.slug}-title`

  return (
    <article aria-labelledby={titleId} className="min-w-0">
      <div data-reveal="media">
        <ProjectPreview project={project} titleId={titleId} />
      </div>
    </article>
  )
}

export function WorkSection() {
  return (
    <SectionShell id="work" className="!max-w-none">
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

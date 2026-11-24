import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import type { CaseStudy, Section } from "@/lib/content/types"
import { home } from "@/lib/content/home"
import { nextProject } from "@/lib/content/site"
import { ProjectPreview } from "@/components/site/project-preview"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { SiteChrome, type RailSection } from "@/components/site/site-chrome"
import { Blocks } from "./block-renderer"
import { SectionEyebrow } from "@/components/site/section-eyebrow"

function MetaList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <dt className="text-eyebrow text-muted">{title}</dt>
      <dd>
        <ul className="flex flex-col gap-1 text-caption">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

type ResolvedChapter = { id: string; name: string; sections: Section[] }

function resolveChapters(study: CaseStudy): ResolvedChapter[] {
  const byId = new Map(study.sections.map((section) => [section.id, section]))
  const used = new Set<string>()
  const chapters = study.chapters.map((chapter) => {
    const sections = chapter.sections.flatMap((id) => {
      const section = byId.get(id)
      if (!section) return []
      used.add(id)
      return [section]
    })
    return { id: sections[0]?.id ?? chapter.name, name: chapter.name, sections }
  })
  for (const section of study.sections) {
    if (!used.has(section.id)) chapters.push({ id: section.id, name: section.title, sections: [section] })
  }
  return chapters.filter((chapter) => chapter.sections.length > 0)
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const next = nextProject[study.slug]
  const nextSummary = home.work.projects.find((project) => project.href === next.href)
  const chapters = resolveChapters(study)
  const rail: RailSection[] = [
    { id: "overview", name: "Overview" },
    ...chapters.map((chapter) => ({ id: chapter.id, name: chapter.name })),
    { id: "next-project", name: "Next project" },
  ]

  return (
    <>
      <SiteChrome sections={rail} back />
      <article className="case-study flex flex-col gap-28 md:gap-40 lg:gap-48">
        <SectionShell
          id="overview"
          bordered={false}
          className="relative flex h-[min(100svh,1000px)] max-h-[1000px] flex-col justify-center"
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <p data-intro="fade" className="text-eyebrow text-muted">
              {study.eyebrow}
            </p>
            <h1 id="overview-title" data-intro="" data-intro-step="1" className="text-[36px] leading-[1.1] font-light tracking-[-0.02em]">
              {study.title}
            </h1>
            <p data-intro="" data-intro-step="2" className="text-body text-muted">
              {study.intro}
            </p>
          </div>
          <dl
            data-intro=""
            data-intro-step="3"
            className={`grid gap-6 sm:grid-cols-2 ${study.slug === "merrill" ? "" : "border-t"}`}
          >
            <MetaList title="The Team" items={study.team} />
            <MetaList title="The Timeline" items={study.timeline} />
          </dl>
          <Link
            href={`#${chapters[0]?.id ?? "next-project"}`}
            aria-label="Continue to case study"
            className="absolute bottom-10 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <CaretDown weight="regular" className="size-5" aria-hidden="true" />
          </Link>
        </SectionShell>

        {chapters.map((chapter, chapterIndex) => (
          <SectionShell key={chapter.id} id={chapter.id}>
            <div data-reveal="" className="flex flex-col gap-4">
              <SectionEyebrow>{`Section ${String(chapterIndex + 1).padStart(2, "0")}`}</SectionEyebrow>
              <SectionTitle id={chapter.id}>{chapter.name}</SectionTitle>
            </div>
            <div className="flex flex-col gap-16 md:gap-20">
              {chapter.sections.map((section, sectionIndex) => (
                <Blocks
                  key={section.id}
                  blocks={section.blocks}
                  heading={
                    section.title !== chapter.name ? (
                      <h3 id={sectionIndex === 0 ? undefined : section.id} className="text-heading">
                        {section.title}
                      </h3>
                    ) : undefined
                  }
                />
              ))}
            </div>
          </SectionShell>
        ))}

        <SectionShell id="next-project">
          <div data-reveal="" className="flex flex-col gap-4 md:gap-6">
            <SectionEyebrow>Next project</SectionEyebrow>
            {nextSummary ? <ProjectPreview project={nextSummary} /> : null}
            <Link href={next.href} className="group flex flex-col gap-3">
              <span id="next-project-title" className="text-display transition-colors group-hover:text-muted">
                {next.title}
              </span>
              <span className="inline-flex items-center gap-2 text-caption text-muted transition-colors group-hover:text-foreground">
                View project
                <ArrowRight weight="regular" className="arrow-nudge size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </SectionShell>
      </article>
    </>
  )
}

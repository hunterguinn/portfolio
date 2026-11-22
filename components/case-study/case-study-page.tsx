import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import type { CaseStudy, Section } from "@/lib/content/types"
import { nextProject } from "@/lib/content/site"
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
  const chapters = resolveChapters(study)
  const rail: RailSection[] = [
    { id: "overview", name: "Overview" },
    ...chapters.map((chapter) => ({ id: chapter.id, name: chapter.name })),
    { id: "next-project", name: "Next project" },
  ]

  return (
    <>
      <SiteChrome sections={rail} back />
      <article className="case-study">
        <SectionShell
          id="overview"
          bordered={false}
          className={study.slug === "merrill" ? "flex min-h-svh flex-col justify-center" : "pt-28 md:pt-36"}
        >
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-eyebrow text-muted">{study.eyebrow}</p>
            <h1 id="overview-title" className="text-display">
              {study.title}
            </h1>
            <p className="text-body text-muted">{study.intro}</p>
          </div>
          <dl className={`grid gap-6 sm:grid-cols-2 ${study.slug === "merrill" ? "" : "border-t pt-6"}`}>
            <MetaList title="The Team" items={study.team} />
            <MetaList title="The Timeline" items={study.timeline} />
          </dl>
        </SectionShell>

        {chapters.map((chapter, chapterIndex) => (
          <SectionShell key={chapter.id} id={chapter.id}>
            <div className="flex flex-col gap-4">
              <SectionEyebrow>{`Section ${String(chapterIndex + 1).padStart(2, "0")}`}</SectionEyebrow>
              <SectionTitle id={chapter.id}>{chapter.name}</SectionTitle>
            </div>
            <div className="flex flex-col gap-16 md:gap-20">
              {chapter.sections.map((section, sectionIndex) => (
                <div key={section.id} className="flex min-w-0 flex-col gap-6">
                  {section.title !== chapter.name ? (
                    <h3 id={sectionIndex === 0 ? undefined : section.id} className="text-heading">
                      {section.title}
                    </h3>
                  ) : null}
                  <Blocks blocks={section.blocks} />
                </div>
              ))}
            </div>
          </SectionShell>
        ))}

        <SectionShell id="next-project">
          <SectionEyebrow>Next project</SectionEyebrow>
          <Link href={next.href} className="group -mt-6 flex flex-col gap-3">
            <span id="next-project-title" className="text-display transition-colors group-hover:text-muted">
              {next.title}
            </span>
            <span className="inline-flex items-center gap-2 text-caption text-muted transition-colors group-hover:text-foreground">
              View project
              <ArrowRight weight="regular" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </SectionShell>
      </article>
    </>
  )
}

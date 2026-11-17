import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import type { CaseStudy } from "@/lib/content/types"
import { nextProject } from "@/lib/content/site"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Blocks } from "./block-renderer"

function MetaList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <dt className="text-eyebrow text-secondary">{title}</dt>
      <dd>
        <ul className="text-caption flex flex-col gap-1">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const next = nextProject[study.slug]
  const jumpLinks = study.sections.reduce<{ id: string; name: string }[]>((links, section) => {
    const name = section.label.replace(/^\d+\s*[–-]\s*/, "")
    if (!links.some((link) => link.name === name)) links.push({ id: section.id, name })
    return links
  }, [])

  return (
    <article>
      <SectionShell bordered={false} label={study.eyebrow}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-display text-balance">{study.title}</h1>
            <p className="text-body text-secondary">{study.intro}</p>
          </div>
          <dl className="grid grid-cols-2 gap-8">
            <MetaList title="The Team" items={study.team} />
            <MetaList title="The Timeline" items={study.timeline} />
          </dl>
          <nav aria-label="Jump to section">
            <ul className="flex flex-wrap gap-3">
              {jumpLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="btn-secondary inline-flex items-center rounded-full text-caption px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SectionShell>

      {study.sections.map((section) => (
        <SectionShell key={section.id} id={section.id} label={section.label}>
          <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
            <SectionTitle id={section.id}>{section.title}</SectionTitle>
            <Blocks blocks={section.blocks} />
          </div>
        </SectionShell>
      ))}

      <SectionShell id="next-project" label="00 – Next Project">
        <Link
          href={next.href}
          className="group inline-flex flex-col gap-3 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-foreground"
        >
          <span id="next-project-title" className="text-heading text-balance">
            {next.title}
          </span>
          <span className="inline-flex items-center gap-2 text-caption text-secondary transition-colors group-hover:text-primary">
            View project
            <ArrowRight weight="regular" className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </SectionShell>
    </article>
  )
}

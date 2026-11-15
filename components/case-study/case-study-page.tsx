import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudy } from "@/lib/content/types"
import { nextProject } from "@/lib/content/site"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Blocks } from "./block-renderer"

function MetaList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-widest text-muted">{title}</dt>
      <dd className="mt-3">
        <ul className="flex flex-col gap-1.5 text-sm">
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

  return (
    <article>
      <SectionShell
        bordered={false}
        label={study.eyebrow}
        aside={
          <dl className="mt-10 hidden gap-8 lg:grid">
            <MetaList title="The Team" items={study.team} />
            <MetaList title="The Timeline" items={study.timeline} />
          </dl>
        }
      >
        <h1 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
          {study.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted text-pretty md:text-xl">{study.intro}</p>
        <dl className="mt-12 grid grid-cols-2 gap-8 border-t pt-8 lg:hidden">
          <MetaList title="The Team" items={study.team} />
          <MetaList title="The Timeline" items={study.timeline} />
        </dl>
      </SectionShell>

      {study.sections.map((section) => (
        <SectionShell key={section.id} id={section.id} label={section.label}>
          <div className="flex flex-col gap-10 md:gap-12">
            <SectionTitle id={section.id}>{section.title}</SectionTitle>
            <Blocks blocks={section.blocks} />
          </div>
        </SectionShell>
      ))}

      <SectionShell id="next-project" label="00 – Next Project">
        <Link
          href={next.href}
          className="group inline-flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-foreground"
        >
          <span id="next-project-title" className="text-3xl font-medium tracking-tight text-balance md:text-5xl">
            {next.title}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-foreground">
            View project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </SectionShell>
    </article>
  )
}

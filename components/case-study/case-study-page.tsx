import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudy } from "@/lib/content/types"
import { nextProject } from "@/lib/content/site"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Blocks } from "./block-renderer"

function MetaList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{title}</dt>
      <dd className="mt-2.5">
        <ul className="flex flex-col gap-1 text-[0.8125rem] leading-snug">
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
          <dl className="mt-10 hidden gap-7 lg:grid">
            <MetaList title="The Team" items={study.team} />
            <MetaList title="The Timeline" items={study.timeline} />
          </dl>
        }
      >
        <h1 className="text-3xl font-normal leading-[1.08] tracking-[-0.03em] text-balance md:text-[2.75rem]">
          {study.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted text-pretty md:text-[1.0625rem]">{study.intro}</p>
        <dl className="mt-10 grid grid-cols-2 gap-8 border-t pt-8 lg:hidden">
          <MetaList title="The Team" items={study.team} />
          <MetaList title="The Timeline" items={study.timeline} />
        </dl>
      </SectionShell>

      {study.sections.map((section) => (
        <SectionShell key={section.id} id={section.id} label={section.label}>
          <div className="flex flex-col gap-8 md:gap-10">
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
          <span id="next-project-title" className="text-2xl font-normal tracking-[-0.02em] text-balance md:text-[1.875rem]">
            {next.title}
          </span>
          <span className="inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors group-hover:text-foreground">
            View project
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </SectionShell>
    </article>
  )
}

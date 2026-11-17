import Image from "next/image"
import { Shapes } from "@phosphor-icons/react/dist/ssr/Shapes"
import { Briefcase } from "@phosphor-icons/react/dist/ssr/Briefcase"
import { CreditCard } from "@phosphor-icons/react/dist/ssr/CreditCard"
import { Database } from "@phosphor-icons/react/dist/ssr/Database"
import { Bank } from "@phosphor-icons/react/dist/ssr/Bank"
import { Stack } from "@phosphor-icons/react/dist/ssr/Stack"
import { Storefront } from "@phosphor-icons/react/dist/ssr/Storefront"
import { Wallet } from "@phosphor-icons/react/dist/ssr/Wallet"
import { FlowArrow } from "@phosphor-icons/react/dist/ssr/FlowArrow"
import type { Icon } from "@phosphor-icons/react"
import { home } from "@/lib/content/home"
import type { ProjectIcon, ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { MediaSlot } from "@/components/case-study/figure"
import { CountUp } from "@/components/site/count-up"
import { Pending } from "@/components/site/pending"
import { ArrowLink } from "@/components/site/arrow-link"

const projectIcons: Record<ProjectIcon, Icon> = {
  landmark: Bank,
  wallet: Wallet,
  "credit-card": CreditCard,
  store: Storefront,
  layers: Stack,
  briefcase: Briefcase,
  database: Database,
  blocks: Shapes,
  workflow: FlowArrow,
}

function CoverMedia({ cover }: { cover: ProjectSummary["cover"] }) {
  if (cover.src && cover.kind === "image") {
    return (
      <div className="relative min-h-64 flex-1 overflow-hidden rounded-2xl rounded-tl-none rounded-br-none bg-page md:min-h-[24rem]">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-contain bg-surface p-6 md:p-10"
        />
      </div>
    )
  }
  return (
    <div className="flex min-h-64 flex-1 flex-col overflow-hidden rounded-2xl bg-page p-3 md:min-h-[24rem]">
      <MediaSlot slot={cover} />
    </div>
  )
}

function ProjectCard({ project }: { project: ProjectSummary }) {
  const [category, year] = project.meta.split(" · ")
  const InsightIcon = projectIcons[project.insight.icon]

  return (
    <article className="flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="relative isolate flex flex-col gap-3 overflow-hidden rounded-3xl border border-subtle pb-4 pl-4 pr-0 pt-0 text-primary md:gap-4 md:pb-6 md:pl-6 md:pr-0 md:pt-0 lg:col-span-7">
          <Image
            src={project.background}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="-z-20 object-cover"
          />
          <div className="project-preview-overlay absolute inset-0 -z-10 backdrop-blur-sm" aria-hidden="true" />
          <div className="project-preview-gradient absolute inset-0 -z-10" aria-hidden="true" />
          <CoverMedia cover={project.cover} />
          <div className="flex flex-col gap-2 pl-1 pr-5 md:pr-8">
            <h3 className="text-heading text-balance">{project.title}</h3>
            <div className="flex items-center justify-between gap-4 text-caption">
              <span>{category}</span>
              <span>{year}</span>
            </div>
          </div>
        </div>

        <div className="card-surface project-preview-card flex flex-col gap-2 rounded-3xl p-3 md:p-5 lg:col-span-5">
          <div className="rounded-2xl bg-page px-4 py-8 md:px-5 md:py-12">
            <p className="text-body">{project.description}</p>
          </div>
          <div className="mt-auto flex flex-col gap-4 pt-2">
            <div className="hidden flex-col gap-title-desc md:flex">
              <p className="text-body font-semibold">The Team:</p>
              <ul className="text-body text-secondary">
                {project.team.map((member) => (
                  <li key={member} className="text-caption">{member}</li>
                ))}
              </ul>
            </div>
            <ArrowLink href={project.href} className="w-full">
              View project<span className="sr-only">: {project.title}</span>
            </ArrowLink>
          </div>
        </div>
      </div>

      <ul className="hidden w-full min-w-0 gap-3 md:grid md:grid-cols-3">
        {project.metrics.map((metric, index) => {
          const Icon = projectIcons[project.metricIcons[index]]
          return (
            <li key={metric.label} className="card-surface project-preview-card flex w-full min-w-0 flex-col justify-between gap-3 rounded-lg p-5 md:gap-7">
              <span className="inline-flex size-8 items-center justify-center self-start rounded-sm bg-surface-strong text-secondary" aria-hidden="true">
                <Icon weight="regular" className="size-4" />
              </span>
              <div className="flex w-full min-w-0 flex-col gap-title-desc">
                <p className="text-heading w-full tabular-nums">
                  {metric.counter ? (
                    <CountUp {...metric.counter} />
                  ) : metric.value ?? (
                    <Pending>Metric pending</Pending>
                  )}
                </p>
                <p className="text-caption w-full text-wrap text-secondary">{metric.label}</p>
              </div>
            </li>
          )
        })}
        <li className="card-surface project-preview-card flex w-full min-w-0 flex-col gap-3 rounded-lg p-5 md:gap-7">
          <span className="inline-flex size-8 items-center justify-center self-start rounded-sm bg-surface-strong text-secondary" aria-hidden="true">
            <InsightIcon weight="regular" className="size-4" />
          </span>
          <div className="flex w-full min-w-0 flex-col gap-title-desc">
            <h4 className="text-body text-strong w-full">{project.insight.title}</h4>
            <p className="text-caption w-full text-wrap text-secondary">{project.insight.body}</p>
          </div>
        </li>
      </ul>
    </article>
  )
}

export function WorkSection() {
  return (
    <SectionShell id="work" label={home.work.label}>
      <div className="flex flex-col gap-12 md:gap-16">
        <SectionTitle id="work">{home.work.title}</SectionTitle>
        {home.work.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  )
}

import Image from "next/image"
import {
  Blocks,
  Briefcase,
  CreditCard,
  Database,
  Landmark,
  Layers,
  Store,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { home } from "@/lib/content/home"
import type { ProjectIcon, ProjectSummary } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { MediaSlot } from "@/components/case-study/figure"
import { CountUp } from "@/components/site/count-up"
import { Pending } from "@/components/site/pending"
import { ArrowLink } from "@/components/site/arrow-link"

const projectIcons: Record<ProjectIcon, LucideIcon> = {
  landmark: Landmark,
  wallet: Wallet,
  "credit-card": CreditCard,
  store: Store,
  layers: Layers,
  briefcase: Briefcase,
  database: Database,
  blocks: Blocks,
  workflow: Workflow,
}

function CoverMedia({ cover }: { cover: ProjectSummary["cover"] }) {
  if (cover.src && cover.kind === "image") {
    return (
      <div className="relative min-h-64 flex-1 overflow-hidden rounded-2xl rounded-tl-none rounded-br-none bg-background md:min-h-[24rem]">
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
    <div className="flex min-h-64 flex-1 flex-col overflow-hidden rounded-2xl bg-background p-3 md:min-h-[24rem]">
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
        <div className="relative isolate flex flex-col gap-3 overflow-hidden rounded-3xl border border-border pb-4 pl-4 pr-0 pt-0 text-foreground md:gap-4 md:pb-6 md:pl-6 md:pr-0 md:pt-0 lg:col-span-7">
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
            <h3 className="type-project-title text-balance">{project.title}</h3>
            <div className="flex items-center justify-between gap-4 type-supporting">
              <span>{category}</span>
              <span>{year}</span>
            </div>
          </div>
        </div>

        <div className="card-surface project-preview-card flex flex-col gap-2 rounded-3xl p-3 md:p-5 lg:col-span-5">
          <div className="rounded-2xl bg-background px-3 py-8 md:px-5 md:py-12">
            <p className="type-body text-pretty">{project.description}</p>
          </div>
          <div className="mt-auto flex flex-col gap-4 pt-2">
            <div className="hidden flex-col gap-1 md:flex">
              <p className="type-body">The Team:</p>
              <ul className="type-body text-muted">
                {project.team.map((member) => (
                  <li key={member}>{member}</li>
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
              <span className="inline-flex size-8 items-center justify-center self-start rounded-[0.625rem] bg-surface-strong text-muted" aria-hidden="true">
                <Icon className="size-4" />
              </span>
              <div className="flex w-full min-w-0 flex-col gap-0.5 md:gap-1.5">
                <p className="type-project-title w-full tabular-nums">
                  {metric.counter ? (
                    <CountUp {...metric.counter} />
                  ) : metric.value ?? (
                    <Pending>Metric pending</Pending>
                  )}
                </p>
                <p className="type-supporting w-full text-wrap text-muted">{metric.label}</p>
              </div>
            </li>
          )
        })}
        <li className="card-surface project-preview-card flex w-full min-w-0 flex-col gap-3 rounded-lg p-5 md:gap-7">
          <span className="inline-flex size-8 items-center justify-center self-start rounded-[0.625rem] bg-surface-strong text-muted" aria-hidden="true">
            <InsightIcon className="size-4" />
          </span>
          <div className="flex w-full min-w-0 flex-col gap-0.5 md:gap-1.5">
            <h4 className="type-body type-strong w-full">{project.insight.title}</h4>
            <p className="type-supporting w-full text-wrap text-muted">{project.insight.body}</p>
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

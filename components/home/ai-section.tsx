import Image from "next/image"
import { GraduationCap } from "@phosphor-icons/react/dist/ssr/GraduationCap"
import { Sparkle } from "@phosphor-icons/react/dist/ssr/Sparkle"
import { Users } from "@phosphor-icons/react/dist/ssr/Users"
import type { Icon } from "@phosphor-icons/react"
import { home } from "@/lib/content/home"
import type { ExperienceMetric } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { CountUp } from "@/components/site/count-up"

const metricIcons: Record<ExperienceMetric["icon"], Icon> = {
  users: Users,
  "graduation-cap": GraduationCap,
  sparkles: Sparkle,
}

export function AiSection() {
  const { ai, stack } = home

  return (
    <SectionShell id="experience" label={ai.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
          <SectionTitle id="experience">{ai.title}</SectionTitle>
          <div className="flex flex-col gap-4 text-body text-secondary">
            {ai.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ul aria-label="Tools I use" className="flex flex-wrap items-center gap-4">
          {stack.map((tool) => (
            <li key={tool.name}>
              <Image
                src={tool.src}
                alt={tool.name}
                title={tool.name}
                width={36}
                height={36}
                className="size-9 rounded-icon opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
        <ul className="grid gap-3 md:grid-cols-3">
          {ai.metrics.map((item, index) => {
            const Icon = metricIcons[item.icon]
            return (
              <li key={item.title} className="card-surface project-preview-card flex flex-col justify-between gap-3 rounded-lg p-5 md:gap-7">
                <span className="inline-flex size-8 items-center justify-center self-start rounded-sm bg-surface-strong text-secondary" aria-hidden="true">
                  <Icon weight="regular" className="size-4" />
                </span>
                <div className="flex flex-col gap-0 md:gap-2">
                  <p className="text-heading tabular-nums">
                    <CountUp to={item.count} suffix={item.suffix} delay={index * 350} />
                  </p>
                  <h3 className="text-body text-strong text-balance">{item.title}</h3>
                  <p className="text-caption text-secondary">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionShell>
  )
}

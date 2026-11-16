import { GraduationCap, Sparkles, Users, type LucideIcon } from "lucide-react"
import { home } from "@/lib/content/home"
import type { ExperienceMetric } from "@/lib/content/types"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { IconBadge } from "@/components/site/icon-badge"
import { CountUp } from "@/components/site/count-up"
import { TestimonialQuote } from "@/components/case-study/content-primitives"

const metricIcons: Record<ExperienceMetric["icon"], LucideIcon> = {
  users: Users,
  "graduation-cap": GraduationCap,
  sparkles: Sparkles,
}

export function AiSection() {
  const { ai, testimonials } = home

  return (
    <SectionShell id="experience" label={ai.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
          <SectionTitle id="experience">{ai.title}</SectionTitle>
          <div className="flex flex-col gap-4 type-body text-muted text-pretty">
            {ai.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {ai.metrics.map((item, index) => {
            const Icon = metricIcons[item.icon]
            return (
              <li key={item.title} className="card-surface flex flex-col justify-between gap-8 rounded-3xl p-6">
                <IconBadge>
                  <Icon className="size-4" />
                </IconBadge>
                <div className="flex flex-col gap-1">
                  <p className="type-display">
                    <CountUp to={item.count} suffix={item.suffix} delay={index * 350} />
                  </p>
                  <h3 className="type-project-title text-balance">{item.title}</h3>
                  <p className="type-body text-muted text-pretty">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="ticker fade-item">
          <div className="ticker-track">
            {[false, true].map((duplicate) => (
              <ul key={String(duplicate)} className="flex shrink-0" aria-hidden={duplicate || undefined}>
                {testimonials.items.map((item) => (
                  <li key={item.name} className="w-[21rem] shrink-0 pr-3 md:w-[24rem]">
                    <TestimonialQuote testimonial={item} compact />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Pending } from "@/components/site/pending"
import { TestimonialQuote } from "@/components/case-study/content-primitives"
import { MetricStat } from "./metric-stat"

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
          {ai.metrics.map((item) => (
            <li key={item.metric.label} className="card-surface flex flex-col gap-4 rounded-lg p-5 md:p-6">
              <dl>
                <MetricStat metric={item.metric} />
              </dl>
              <p className="type-supporting text-muted text-pretty">{item.body}</p>
            </li>
          ))}
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
        <div className="flex flex-col gap-3">
          <h3 className="type-eyebrow text-muted">{ai.stack.title}</h3>
          {ai.stack.items.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {ai.stack.items.map((item) => (
                <li key={item.title} className="type-supporting rounded-full bg-surface px-3 py-1">
                  {item.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <Pending>{ai.stack.pending}</Pending>
            </p>
          )}
        </div>
      </div>
    </SectionShell>
  )
}

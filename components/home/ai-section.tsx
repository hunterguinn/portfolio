import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Pending } from "@/components/site/pending"
import { Reveal } from "@/components/site/reveal"
import { MetricStat } from "./metric-stat"

export function AiSection() {
  const { ai } = home

  return (
    <SectionShell id="experience" label={ai.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionTitle id="experience">{ai.title}</SectionTitle>
        <div className="flex flex-col gap-4 type-body type-measure text-muted text-pretty">
          {ai.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Reveal>
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
        </Reveal>
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

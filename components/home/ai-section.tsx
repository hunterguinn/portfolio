import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Pending } from "@/components/site/pending"
import { Reveal } from "@/components/site/reveal"
import { MetricStat } from "./metric-stat"

export function AiSection() {
  const { ai } = home

  return (
    <SectionShell id="experience" label={ai.label}>
      <div className="flex flex-col gap-10 md:gap-12">
        <SectionTitle id="experience">{ai.title}</SectionTitle>
        <div className="flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-muted text-pretty">
          {ai.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
            {ai.metrics.map((item) => (
              <li key={item.metric.label} className="flex flex-col gap-4 bg-background p-6">
                <dl>
                  <MetricStat metric={item.metric} />
                </dl>
                <p className="text-sm text-muted text-pretty">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{ai.stack.title}</h3>
          {ai.stack.items.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {ai.stack.items.map((item) => (
                <li key={item.title} className="rounded-full border px-3 py-1 text-sm">
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

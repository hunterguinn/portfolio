import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Reveal } from "@/components/site/reveal"

export function TestimonialsSection() {
  const { testimonials } = home

  return (
    <SectionShell id="testimonials" label={testimonials.title}>
      <div className="flex flex-col gap-10 md:gap-12">
        <SectionTitle id="testimonials">What colleagues say</SectionTitle>
        <ul className="grid gap-6 xl:grid-cols-3">
          {testimonials.items.map((item) => (
            <li key={item.name}>
              <Reveal className="h-full">
                <figure className="flex h-full flex-col justify-between gap-8 rounded-lg border bg-surface p-6">
                  <blockquote className="text-base leading-relaxed text-pretty">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex flex-col gap-0.5 text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted">{item.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

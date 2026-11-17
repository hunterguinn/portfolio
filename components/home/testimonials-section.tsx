import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { TestimonialQuote } from "@/components/case-study/content-primitives"

function TestimonialTicker({ reverse = false }: { reverse?: boolean }) {
  const { items } = home.testimonials

  return (
    <div className={`ticker fade-item ${reverse ? "ticker-reverse" : ""}`} aria-hidden={reverse || undefined}>
      <div className="ticker-track">
        {[false, true].map((duplicate) => (
          <ul key={String(duplicate)} className="flex shrink-0" aria-hidden={duplicate || undefined}>
            {items.map((item) => (
              <li key={item.name} className="w-[26rem] shrink-0 pr-3 md:w-[28rem]">
                <TestimonialQuote testimonial={item} compact />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { testimonials } = home

  return (
    <SectionShell id="testimonials" label={testimonials.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionTitle id="testimonials">{testimonials.title}</SectionTitle>
        <div className="flex flex-col gap-3">
          <TestimonialTicker />
          <TestimonialTicker reverse />
        </div>
      </div>
    </SectionShell>
  )
}

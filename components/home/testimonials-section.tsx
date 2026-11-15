import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Reveal } from "@/components/site/reveal"
import { TestimonialQuote } from "@/components/case-study/content-primitives"

export function TestimonialsSection() {
  const { testimonials } = home

  return (
    <SectionShell id="testimonials" label={testimonials.title}>
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionTitle id="testimonials">What colleagues say</SectionTitle>
        <ul className="grid gap-3 xl:grid-cols-3">
          {testimonials.items.map((item) => (
            <li key={item.name}>
              <Reveal className="h-full">
                <TestimonialQuote testimonial={item} compact />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

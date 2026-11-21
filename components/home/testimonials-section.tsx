import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"

export function TestimonialsSection() {
  const { testimonials } = home

  return (
    <SectionShell id="testimonials">
      <SectionTitle id="testimonials">{testimonials.title}</SectionTitle>
      <ul className="grid gap-3 md:grid-cols-2">
        {testimonials.items.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            <figure className="flex h-full flex-col justify-between gap-8 card-hover rounded-lg border p-6 lg:p-6">
              <blockquote>
                <p className="text-body text-quote">{`“${item.quote}”`}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Avatar name={item.name} size={36} />
                <span className="flex flex-col gap-0">
                  <span className="text-body font-normal">{item.name}</span>
                  <span className="text-caption font-sans font-normal normal-case text-secondary">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

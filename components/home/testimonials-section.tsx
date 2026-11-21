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
            <figure className="flex h-full flex-col justify-between gap-8 rounded-lg border p-6 transition-colors duration-300 hover:bg-surface lg:p-6">
              <blockquote>
                <p className="text-body text-quote">{`“${item.quote}”`}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Avatar name={item.name} size={36} />
                <span className="flex flex-col gap-title-desc">
                  <span className="text-caption text-strong">{item.name}</span>
                  <span className="text-eyebrow text-secondary">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

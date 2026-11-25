import { home } from "@/lib/content/home"
import { SectionHeader, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"
import { SectionEyebrow } from "@/components/site/section-eyebrow"

export function TestimonialsSection() {
  const { testimonials } = home

  return (
    <SectionShell id="testimonials">
      <SectionHeader>
        <SectionEyebrow>{testimonials.label}</SectionEyebrow>
        <SectionTitle id="testimonials">{testimonials.title}</SectionTitle>
      </SectionHeader>
      <ul className="grid gap-3 md:grid-cols-2">
        {testimonials.items.map((item, index) => (
          <li key={`${item.name}-${index}`} data-reveal="">
            <figure className="card-static flex h-full flex-col justify-between gap-10 rounded-lg border p-6">
              <div className="flex flex-col gap-3">
                <blockquote>
                  <p className="text-body font-medium text-muted transition-colors duration-200">{`“${item.quote}”`}</p>
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3">
                <Avatar name={item.name} size={36} />
                <span className="flex flex-col gap-0">
                  <span className="text-body font-normal">{item.name}</span>
                  <span className="text-caption font-sans font-normal normal-case text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

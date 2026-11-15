import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { Pending } from "@/components/site/pending"

const buttonClass =
  "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[0.8125rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function AboutSection() {
  const { about } = home

  return (
    <SectionShell id="about" label={about.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <SectionTitle id="about">{about.title}</SectionTitle>
        <p className="text-[0.9375rem] leading-[1.7] text-muted text-pretty">{about.body}</p>
        <ul className="flex flex-wrap gap-3">
          {about.actions.map((action) => (
            <li key={action.label}>
              {action.href ? (
                <a href={action.href} className={`${buttonClass} hover:bg-foreground hover:text-background`}>
                  {action.label}
                </a>
              ) : (
                <span className={`${buttonClass} border-dashed text-muted`}>
                  {action.label}
                  <Pending>Link pending</Pending>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

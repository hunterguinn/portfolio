import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight"
import { site } from "@/lib/content/site"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"

const links = [
  { label: "LinkedIn", handle: "/hunterguinn", href: site.linkedin },
  { label: "GitHub", handle: "@hunterguinn", href: site.github },
]

export function ContactSection() {
  return (
    <SectionShell id="contact">
      <SectionTitle id="contact">{"Let's connect"}</SectionTitle>
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-6">
        <p className="text-body text-secondary">
          Always interested in new opportunities, collaborations, and conversations about technology and design.
        </p>
        <ul className="grid grid-cols-2 gap-3">
          {links.map((link) => (
            <li key={link.label} className="flex">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex w-full flex-col justify-between gap-6 rounded-lg border p-5 text-left"
              >
                <span className="text-body">{link.label}</span>
                <span className="inline-flex items-center gap-1 font-mono text-caption text-secondary transition-colors group-hover:text-primary">
                  {link.handle}
                  <ArrowUpRight weight="regular" className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

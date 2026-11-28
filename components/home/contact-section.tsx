import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight"
import { site } from "@/lib/content/site"
import { SectionHeader, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { SectionEyebrow } from "@/components/site/section-eyebrow"

const links = [
  { label: "LinkedIn", handle: "/in/hunterguinn", href: site.linkedin },
  { label: "GitHub", handle: "@hunterguinn", href: site.github },
]

export function ContactSection() {
  return (
    <SectionShell id="contact" className="pb-12 md:pb-14">
      <SectionHeader>
        <SectionEyebrow>Contact</SectionEyebrow>
        <SectionTitle id="contact">
          <a
            href={`mailto:${site.email}`}
            data-cursor="Go to link"
            className="group inline-flex items-center gap-3 transition-colors hover:text-muted"
          >
            {"Let's connect"}
            <span className="arrow-nudge-diagonal inline-flex">
              <ArrowUpRight weight="regular" className="size-6 shrink-0" aria-hidden="true" />
            </span>
          </a>
        </SectionTitle>
      </SectionHeader>
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4">
          <p data-reveal="" className="text-body text-muted">
            Always interested in new opportunities, collaborations, and conversations about technology and design.
          </p>
          <p className="text-caption text-muted">{site.copyright}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {links.map((link) => (
            <li key={link.label} data-reveal="" className="flex">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Go to link"
                className="card-hover group flex w-full flex-col justify-between gap-6 rounded-lg border p-5 text-left"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-body">{link.label}</span>
                  <ArrowUpRight weight="regular" className="arrow-nudge-diagonal size-4 shrink-0 text-foreground" aria-hidden="true" />
                </span>
                <span className="font-mono text-mono text-muted transition-colors group-hover:text-foreground">
                  {link.handle}
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

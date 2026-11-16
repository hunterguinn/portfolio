import { Download } from "lucide-react"
import { home } from "@/lib/content/home"
import { site } from "@/lib/content/site"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { CopyEmailButton } from "@/components/site/copy-email"
import { AboutGallery } from "./about-gallery"

const buttonClass =
  "inline-flex items-center gap-2 rounded-full type-supporting px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function AboutSection() {
  const { about } = home

  return (
    <SectionShell id="about" label={about.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
          <SectionTitle id="about">{about.title}</SectionTitle>
          <p className="type-body text-muted text-pretty">{about.body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <CopyEmailButton className={`${buttonClass} bg-foreground text-background hover:opacity-90`} />
          <a
            href={site.resume.href}
            download={site.resume.filename}
            className={`${buttonClass} border hover:bg-foreground hover:text-background`}
          >
            <Download className="size-4" aria-hidden="true" />
            Download CV
          </a>
        </div>
        <AboutGallery columns={about.gallery} />
      </div>
    </SectionShell>
  )
}

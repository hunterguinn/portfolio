import { home } from "@/lib/content/home"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { AboutGallery } from "./about-gallery"

export function AboutSection() {
  const { about } = home

  return (
    <SectionShell id="about" label={about.label}>
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
          <SectionTitle id="about">{about.title}</SectionTitle>
          <p className="type-body text-muted text-pretty">{about.body}</p>
        </div>
        <AboutGallery columns={about.gallery} />
      </div>
    </SectionShell>
  )
}

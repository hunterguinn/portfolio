import { Hero } from "@/components/home/hero"
import { WorkSection } from "@/components/home/work-section"
import { AiSection } from "@/components/home/ai-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { ContactSection } from "@/components/home/contact-section"
import { SiteChrome } from "@/components/site/site-chrome"
import { HomeScrollMemory } from "@/components/site/home-scroll-memory"

const rail = [
  { id: "intro", name: "Intro" },
  { id: "work", name: "Selected Work" },
  { id: "ai", name: "Scaling design through AI" },
  { id: "testimonials", name: "What others say" },
  { id: "contact", name: "Let's connect" },
]

export default function HomePage() {
  return (
    <>
      <SiteChrome sections={rail} />
      <HomeScrollMemory />
      <Hero />
      <WorkSection />
      <AiSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}

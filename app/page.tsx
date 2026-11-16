import { Hero } from "@/components/home/hero"
import { WorkSection } from "@/components/home/work-section"
import { AiSection } from "@/components/home/ai-section"
import { AboutSection } from "@/components/home/about-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <AiSection />
      <AboutSection />
    </>
  )
}

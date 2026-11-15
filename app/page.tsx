import { Hero } from "@/components/home/hero"
import { WorkSection } from "@/components/home/work-section"
import { AiSection } from "@/components/home/ai-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { AboutSection } from "@/components/home/about-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <AiSection />
      <TestimonialsSection />
      <AboutSection />
    </>
  )
}

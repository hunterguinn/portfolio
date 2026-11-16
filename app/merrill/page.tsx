import type { Metadata } from "next"
import { merrill } from "@/lib/content/merrill"
import { CaseStudyPage } from "@/components/case-study/case-study-page"

export const metadata: Metadata = { title: merrill.title, description: merrill.description }

export default function MerrillPage() {
  return <CaseStudyPage study={merrill} />
}

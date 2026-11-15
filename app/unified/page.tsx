import type { Metadata } from "next"
import { unified } from "@/lib/content/unified"
import { CaseStudyPage } from "@/components/case-study/case-study-page"

export const metadata: Metadata = { title: unified.title, description: unified.description }

export default function UnifiedPage() {
  return <CaseStudyPage study={unified} />
}

import type { Metadata } from "next"
import { pos } from "@/lib/content/pos"
import { CaseStudyPage } from "@/components/case-study/case-study-page"

export const metadata: Metadata = { title: pos.title, description: pos.description }

export default function PosPage() {
  return <CaseStudyPage study={pos} />
}

import type { Metadata } from "next"
import { pos } from "@/lib/content/pos"
import { CaseStudyPage } from "@/components/case-study/case-study-page"
import { PasswordGate, protectedMetadata } from "@/components/site/password-gate"
import { hasProjectAccess } from "@/lib/auth/session"

export async function generateMetadata(): Promise<Metadata> {
  if (!(await hasProjectAccess())) return protectedMetadata
  return { title: pos.title, description: pos.description, robots: protectedMetadata.robots }
}

export default async function PosPage() {
  if (!(await hasProjectAccess())) return <PasswordGate next="/pos" />
  return <CaseStudyPage study={pos} />
}

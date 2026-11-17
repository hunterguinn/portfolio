import type { Metadata } from "next"
import { unified } from "@/lib/content/unified"
import { CaseStudyPage } from "@/components/case-study/case-study-page"
import { PasswordGate, protectedMetadata } from "@/components/site/password-gate"
import { hasProjectAccess } from "@/lib/auth/session"

export async function generateMetadata(): Promise<Metadata> {
  if (!(await hasProjectAccess())) return protectedMetadata
  return { title: unified.title, description: unified.description, robots: protectedMetadata.robots }
}

export default async function UnifiedPage() {
  if (!(await hasProjectAccess())) return <PasswordGate next="/unified" />
  return <CaseStudyPage study={unified} />
}

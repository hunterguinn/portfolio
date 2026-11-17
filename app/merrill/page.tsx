import type { Metadata } from "next"
import { merrill } from "@/lib/content/merrill"
import { CaseStudyPage } from "@/components/case-study/case-study-page"
import { PasswordGate, protectedMetadata } from "@/components/site/password-gate"
import { hasProjectAccess } from "@/lib/auth/session"

export async function generateMetadata(): Promise<Metadata> {
  if (!(await hasProjectAccess())) return protectedMetadata
  return { title: merrill.title, description: merrill.description, robots: protectedMetadata.robots }
}

export default async function MerrillPage() {
  if (!(await hasProjectAccess())) return <PasswordGate next="/merrill" />
  return <CaseStudyPage study={merrill} />
}

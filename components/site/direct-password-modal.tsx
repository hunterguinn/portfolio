"use client"

import { useRouter } from "next/navigation"
import type { ProtectedProjectPath } from "@/lib/auth/protected-routes"
import { PasswordModal } from "./password-modal"

/** Password modal for visitors who open a protected project URL directly; Back returns to the homepage. */
export function DirectPasswordModal({ next }: { next: ProtectedProjectPath }) {
  const router = useRouter()
  return <PasswordModal next={next} onClose={() => router.push("/")} />
}

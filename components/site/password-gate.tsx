import type { Metadata } from "next"
import type { ProtectedProjectPath } from "@/lib/auth/protected-routes"
import { DirectPasswordModal } from "./direct-password-modal"

export const protectedMetadata: Metadata = {
  title: "Protected Page",
  robots: { index: false, follow: false },
}

/** Shown instead of a protected project: a neutral backdrop with the password modal, and no project content. */
export function PasswordGate({ next }: { next: ProtectedProjectPath }) {
  return (
    <>
      <div className="min-h-dvh bg-background" aria-hidden="true" />
      <DirectPasswordModal next={next} />
    </>
  )
}

import type { Metadata } from "next"
import { Lock } from "@phosphor-icons/react/dist/ssr/Lock"
import type { ProtectedProjectPath } from "@/lib/auth/protected-routes"
import { PasswordForm } from "./password-form"

export const protectedMetadata: Metadata = {
  title: "Protected Page",
  robots: { index: false, follow: false },
}

export function PasswordGate({ next }: { next: ProtectedProjectPath }) {
  return (
    <section aria-labelledby="protected-title" className="page-band">
      <div className="page-container flex justify-center py-section-lg md:py-section-xl">
        <div className="flex w-full flex-col items-center gap-8 md:w-3/5">
          <div className="flex flex-col items-center gap-4 text-center">
            <Lock size={32} aria-hidden="true" />
            <h1 id="protected-title" className="text-display text-balance">
              Protected Page
            </h1>
            <p className="text-body text-pretty text-secondary">
              This project is password protected. Enter the password below or{" "}
              <a
                href="mailto:hunterg26@icloud.com"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
                contact me
              </a>
            </p>
          </div>
          <PasswordForm next={next} />
        </div>
      </div>
    </section>
  )
}

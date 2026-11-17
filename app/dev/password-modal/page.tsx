import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PasswordModalPreview } from "@/components/site/password-modal-preview"
import { PREVIEW_STATES, type PreviewStateName } from "@/components/site/password-modal-preview-states"

export const metadata: Metadata = {
  title: "Password modal preview",
  robots: { index: false, follow: false },
}

/** Development-only: /dev/password-modal?state=default|incorrect|rate-limited|unavailable|pending */
export default async function PasswordModalPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>
}) {
  if (process.env.NODE_ENV !== "development") notFound()
  const { state } = await searchParams
  const name = PREVIEW_STATES.find((candidate) => candidate === state) ?? "default"
  return (
    <>
      <div className="min-h-dvh bg-background" aria-hidden="true" />
      <PasswordModalPreview name={name satisfies PreviewStateName} />
    </>
  )
}

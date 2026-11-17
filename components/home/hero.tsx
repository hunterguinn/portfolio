import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { home } from "@/lib/content/home"
import { profileImage } from "@/lib/content/avatars"
import { CopyEmailButton } from "@/components/site/copy-email"
import { SectionShell } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"

const buttonClass =
  "inline-flex items-center gap-2 rounded-full type-supporting px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function Hero() {
  return (
    <SectionShell bordered={false} label={home.welcome}>
      <div className="flex flex-col gap-8 pt-2 md:pt-6">
        <div className="relative inline-flex shrink-0">
          <Avatar name="Hunter Guinn" src={profileImage} size={54} alt="Portrait of Hunter Guinn" />
          <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center" role="img" aria-label="Available">
            <span className="profile-availability-dot" />
          </span>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="type-display max-w-3xl text-balance">{home.headline}</h1>
          <div className="flex flex-wrap gap-3">
            <Link href="#work" className={`${buttonClass} btn-primary`}>
              See work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <CopyEmailButton className={`${buttonClass} btn-secondary`} />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

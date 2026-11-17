import Link from "next/link"
import { ChevronRight } from "lucide-react"
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="relative inline-flex shrink-0">
              <Avatar name="Hunter Guinn" src={profileImage} size={54} alt="Portrait of Hunter Guinn" />
              <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center" role="img" aria-label="Available">
                <span className="profile-availability-dot" />
              </span>
            </span>
            <p className="type-body">{home.greeting}</p>
          </div>
          <h1 className="type-display max-w-3xl text-balance">{home.headline}</h1>
          <p className="type-body flex flex-wrap items-center gap-2">
            Currently at
            <span className="btn-secondary inline-flex -rotate-2 items-center rounded-full px-3 py-1 type-supporting text-muted!">
              {home.currentCompany}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="#work" className={`${buttonClass} btn-primary hero-primary group`}>
            See work
            <span className="arrow-slot" aria-hidden="true">
              <ChevronRight className="arrow-slot-icon arrow-slot-icon-current size-4" />
              <ChevronRight className="arrow-slot-icon arrow-slot-icon-next size-4" />
            </span>
          </Link>
          <CopyEmailButton className={`${buttonClass} btn-secondary`} />
        </div>
      </div>
    </SectionShell>
  )
}

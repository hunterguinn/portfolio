import Link from "next/link"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { home } from "@/lib/content/home"
import { profileImage } from "@/lib/content/avatars"
import { CopyEmailButton } from "@/components/site/copy-email"
import { SectionShell } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"

const buttonClass =
  "inline-flex items-center gap-2 rounded-full text-caption px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function Hero() {
  return (
    <SectionShell bordered={false} label={home.welcome}>
      <div className="flex flex-col gap-8 pt-2 md:pt-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="relative inline-flex shrink-0">
              <Avatar name="Hunter Guinn" src={profileImage} size={54} alt="Portrait of Hunter Guinn" />
              <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center" role="img" aria-label="Available">
                <span className="profile-availability-dot" />
              </span>
            </span>
            <p className="text-body">{home.greeting}</p>
          </div>
          <h1 className="text-display text-balance">{home.headline}</h1>
          <p className="text-body text-secondary">Currently at {home.currentCompany}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="#work" className={`${buttonClass} btn-primary hero-primary group`}>
            <span className="reel-text">
              <span className="reel-text-item reel-text-current">See work</span>
              <span className="reel-text-item reel-text-next" aria-hidden="true">
                See work
              </span>
            </span>
            <span className="arrow-slot" aria-hidden="true">
              <CaretDown weight="regular" className="arrow-slot-icon arrow-slot-icon-current size-4" />
              <CaretDown weight="regular" className="arrow-slot-icon arrow-slot-icon-next size-4" />
            </span>
          </Link>
          <CopyEmailButton className={`${buttonClass} btn-secondary`} />
        </div>
      </div>
    </SectionShell>
  )
}

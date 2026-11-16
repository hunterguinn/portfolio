import { home } from "@/lib/content/home"
import { profileImage } from "@/lib/content/avatars"
import { SectionShell } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"

export function Hero() {
  return (
    <SectionShell bordered={false} label={home.welcome}>
      <div className="flex flex-col gap-8 pt-2 md:pt-6">
        <div className="flex items-center gap-4">
          <span className="relative inline-flex shrink-0">
            <Avatar name="Hunter Guinn" src={profileImage} size={54} alt="Portrait of Hunter Guinn" />
            <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center" role="img" aria-label="Available">
              <span className="profile-availability-dot" />
            </span>
          </span>
          <p className="type-body">{home.greeting}</p>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="type-display max-w-3xl text-balance">{home.headline}</h1>
          <p className="type-body max-w-2xl text-muted text-pretty">{home.intro}</p>
        </div>
      </div>
    </SectionShell>
  )
}

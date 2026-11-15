import { home } from "@/lib/content/home"
import { profileImage } from "@/lib/content/avatars"
import { SectionShell } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"

export function Hero() {
  return (
    <SectionShell bordered={false} label={home.currently}>
      <div className="flex flex-col gap-8 pt-2 md:pt-6">
        <Avatar name="Hunter Guinn" src={profileImage} size={64} alt="Portrait of Hunter Guinn" />
        <h1 className="type-display max-w-3xl text-balance">
          {home.headline}
        </h1>
      </div>
    </SectionShell>
  )
}

import { home } from "@/lib/content/home"
import { profileImage } from "@/lib/content/avatars"
import { SectionShell } from "@/components/site/section-shell"
import { Avatar } from "@/components/site/avatar"

export function Hero() {
  return (
    <SectionShell bordered={false} label={home.currently}>
      <div className="flex flex-col gap-8 pt-2 md:pt-6">
        <Avatar name="Hunter Guinn" src={profileImage} size={64} alt="Portrait of Hunter Guinn" />
        <h1 className="max-w-3xl text-[1.75rem] font-normal leading-[1.14] tracking-[-0.025em] text-balance md:text-4xl lg:text-[2.75rem]">
          {home.headline}
        </h1>
      </div>
    </SectionShell>
  )
}

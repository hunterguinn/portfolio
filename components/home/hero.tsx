import Image from "next/image"
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
              <span className="absolute inline-flex size-full rounded-full bg-green opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-3 rounded-full border border-background bg-green" />
            </span>
          </span>
          <p className="type-body">{home.greeting}</p>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="type-display max-w-3xl text-balance">{home.headline}</h1>
          <p className="type-body max-w-2xl text-muted text-pretty">{home.intro}</p>
        </div>
        <ul aria-label="Tools I use" className="flex flex-wrap items-center gap-3">
          {home.stack.map((tool) => (
            <li key={tool.name}>
              <Image
                src={tool.src}
                alt={tool.name}
                title={tool.name}
                width={32}
                height={32}
                className="size-8 rounded-lg opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

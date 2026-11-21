import Link from "next/link"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { home } from "@/lib/content/home"
import { site } from "@/lib/content/site"
import { profileImage } from "@/lib/content/avatars"
import { CopyEmailButton } from "@/components/site/copy-email"
import { Avatar } from "@/components/site/avatar"

const buttonClass =
  "inline-flex items-center gap-2 rounded-full text-caption px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

export function Hero() {
  const [firstName, ...rest] = site.name.split(" ")

  return (
    <section id="intro" aria-labelledby="intro-title" className="page-band">
      <div className="page-container flex min-h-[70svh] flex-col justify-center py-section md:py-section-lg lg:min-h-[80svh]">
        <div className="mx-auto grid w-full max-w-3xl gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex shrink-0">
                <Avatar name={site.name} src={profileImage} size={40} alt="Portrait of Hunter Guinn" />
                <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center" role="img" aria-label="Available">
                  <span className="profile-availability-dot" />
                </span>
              </span>
              <p className="text-caption text-secondary">{home.greeting}</p>
            </div>
            <h1 id="intro-title" className="text-display text-balance">
              {firstName}
              <span className="block text-secondary">{rest.join(" ")}</span>
            </h1>
            <p className="max-w-md text-body text-pretty">{home.headline}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="#work" className={`${buttonClass} btn-primary group`}>
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

          <dl className="flex flex-col gap-8 md:pt-16">
            <div className="flex flex-col gap-2">
              <dt className="text-eyebrow text-secondary">Currently</dt>
              <dd className="text-caption">{home.currentCompany}</dd>
            </div>
            <div className="flex flex-col gap-3">
              <dt className="text-eyebrow text-secondary">Tools</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {home.stack.map((tool) => (
                    <li key={tool.name} className="rounded-full border px-3 py-1 text-eyebrow normal-case text-secondary">
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

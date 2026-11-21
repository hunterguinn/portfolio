import Link from "next/link"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { home } from "@/lib/content/home"
import { site } from "@/lib/content/site"
import { profileImage } from "@/lib/content/avatars"
import { Avatar } from "@/components/site/avatar"

export function Hero() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="page-band min-h-svh">
      <div className="page-container flex min-h-svh flex-col justify-center py-section md:py-section-lg">
        <div className="mx-auto grid w-full max-w-[740px] gap-10 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex shrink-0">
                <Avatar name={site.name} src={profileImage} size={40} alt="Portrait of Hunter Guinn" />
                <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center" role="img" aria-label="Available">
                  <span className="profile-availability-dot" />
                </span>
              </span>
              <p className="text-body text-secondary">{home.greeting}</p>
            </div>
            <h1 id="intro-title" className="text-display font-light">
              {home.headline}
            </h1>
            <Link
              href="#work"
              aria-label="Continue to selected work"
              className="mt-24 flex size-10 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <CaretDown weight="regular" className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <dl className="flex flex-col gap-8 md:pt-16">
            <div className="flex flex-col gap-2">
              <dt className="text-eyebrow text-secondary">Currently</dt>
              <dd className="flex flex-col gap-1">
                <span className="text-body">{home.current.role}</span>
                <span className="text-body text-secondary">{home.current.company}</span>
                <span className="text-eyebrow font-sans normal-case text-secondary">{home.current.period}</span>
              </dd>
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

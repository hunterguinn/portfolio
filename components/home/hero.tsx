import Link from "next/link"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { home } from "@/lib/content/home"
import { site } from "@/lib/content/site"

export function Hero() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="page-band min-h-[90svh]">
      <div className="page-container flex min-h-[90svh] flex-col justify-center py-section md:py-section-lg">
        <div className="mx-auto grid w-full max-w-[740px] gap-10 md:grid-cols-[minmax(0,1fr)_150px] md:gap-20">
          <div className="flex min-w-0 flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-eyebrow text-secondary">Portfolio / 2027</p>
              <h1 id="intro-title" className="text-hero whitespace-nowrap">
                {site.name}
              </h1>
              <p className="text-body text-secondary">{home.headline}</p>
            </div>
            <dl className="flex flex-col gap-2">
              <dt className="text-eyebrow text-secondary">Currently</dt>
              <dd className="flex flex-col gap-1">
                <span className="text-body">{home.current.role}</span>
                <span className="text-body text-secondary">{home.current.company}</span>
                <span className="text-eyebrow font-sans normal-case text-secondary">{home.current.period}</span>
              </dd>
            </dl>
            <Link
              href="#work"
              aria-label="Continue to selected work"
              className="mt-16 flex size-10 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <CaretDown weight="regular" className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <dl className="flex flex-col gap-3 md:w-[150px] md:shrink-0 md:pt-16">
            <dt className="text-eyebrow text-secondary">Tools</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {home.stack.map((tool) => (
                  <li key={tool.name} className="card-hover rounded-full border px-3 py-1 text-caption text-secondary">
                    {tool.name}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  )
}

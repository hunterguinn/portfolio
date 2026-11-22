import Link from "next/link"
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown"
import { home } from "@/lib/content/home"
import { site } from "@/lib/content/site"

export function Hero() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="page-band min-h-[90svh]">
      <div className="page-container relative flex min-h-[90svh] flex-col justify-center py-section-xl">
        <div className="mx-auto grid w-full max-w-[740px] gap-10 md:grid-cols-[minmax(0,1fr)_150px] md:gap-20">
          <div className="flex min-w-0 flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-eyebrow text-muted">Portfolio / 2027</p>
              <h1 id="intro-title" className="text-hero whitespace-nowrap">
                {site.name}
              </h1>
              <p className="text-body text-muted">{home.headline}</p>
            </div>
            <dl className="flex flex-col gap-2">
              <dt className="text-eyebrow text-muted">Currently</dt>
              <dd className="flex flex-col gap-1">
                <span className="text-body">{home.current.role}</span>
                <span className="text-body text-muted">{home.current.company}</span>
                <span className="text-eyebrow font-sans normal-case text-muted">{home.current.period}</span>
              </dd>
            </dl>
          </div>

          <dl className="flex flex-col gap-3 md:w-[150px] md:shrink-0 md:pt-16">
            <dt className="text-eyebrow text-muted">Tools</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {home.stack.map((tool) => (
                  <li key={tool.name} className="card-hover rounded-full border px-3 py-1 text-caption text-muted">
                    {tool.name}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
        <Link
          href="#work"
          aria-label="Continue to selected work"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <CaretDown weight="regular" className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

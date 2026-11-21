import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight"
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr/DownloadSimple"
import { site } from "@/lib/content/site"
import { SectionShell, SectionTitle } from "@/components/site/section-shell"
import { CopyEmailButton } from "@/components/site/copy-email"

const tileClass =
  "group flex flex-col justify-between gap-6 rounded-lg border p-5 text-left lg:p-6 transition-colors duration-300 hover:border-secondary/40 hover:bg-surface"

export function ContactSection() {
  return (
    <SectionShell id="contact">
      <SectionTitle id="contact">{"Let's connect"}</SectionTitle>
      <ul className="grid gap-3 sm:grid-cols-3">
        <li className="flex">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`${tileClass} w-full`}>
            <span className="text-body">LinkedIn</span>
            <span className="inline-flex items-center gap-1 text-caption text-secondary transition-colors group-hover:text-primary">
              /in/hunterguinn
              <ArrowUpRight weight="regular" className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </a>
        </li>
        <li className="flex">
          <a href={site.resume.href} download={site.resume.filename} className={`${tileClass} w-full`}>
            <span className="text-body">Resume</span>
            <span className="inline-flex items-center gap-1 text-caption text-secondary transition-colors group-hover:text-primary">
              Download PDF
              <DownloadSimple weight="regular" className="size-3.5" aria-hidden="true" />
            </span>
          </a>
        </li>
        <li className="flex">
          <div className={`${tileClass} w-full`}>
            <span className="text-body">Email</span>
            <CopyEmailButton className="text-caption text-secondary transition-colors hover:text-primary" />
          </div>
        </li>
      </ul>
    </SectionShell>
  )
}

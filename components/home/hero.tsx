import { home } from "@/lib/content/home"
import { SectionShell } from "@/components/site/section-shell"

export function Hero() {
  return (
    <SectionShell bordered={false} label={home.currently}>
      <h1 className="max-w-5xl pt-10 text-4xl font-medium leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
        {home.headline}
      </h1>
    </SectionShell>
  )
}

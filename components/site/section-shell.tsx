import { SectionEyebrow } from "./section-eyebrow"

/** Two-column section: sticky label/metadata column on the left, content filling the remaining width on the right. */
export function SectionShell({
  id,
  label,
  aside,
  children,
  bordered = true,
}: {
  id?: string
  label?: string
  aside?: React.ReactNode
  children: React.ReactNode
  bordered?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={`page-band ${bordered ? "border-t" : ""}`}
    >
      <div className="page-container grid gap-3 py-14 md:gap-6 md:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-[10.5rem]">
        <div className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
          {label ? <SectionEyebrow>{label}</SectionEyebrow> : null}
          {aside}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id ? `${id}-title` : undefined} className="type-display text-balance">
      {children}
    </h2>
  )
}

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
      className={bordered ? "border-t" : undefined}
    >
      <div className="page-container grid gap-6 py-14 md:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-[10.5rem]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          {label ? <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{label}</p> : null}
          {aside}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id ? `${id}-title` : undefined}
      className="text-2xl font-normal leading-[1.15] tracking-[-0.02em] text-balance md:text-[1.875rem]"
    >
      {children}
    </h2>
  )
}

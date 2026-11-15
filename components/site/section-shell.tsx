/** Two-column section: sticky label/metadata column on the left, content on the right. */
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
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16 lg:py-36">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {label ? <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p> : null}
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
      className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl"
    >
      {children}
    </h2>
  )
}

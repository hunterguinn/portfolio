/** Editorial section: a single centred reading column inside the page container. */
export function SectionShell({
  id,
  children,
  bordered = true,
  className = "",
}: {
  id?: string
  children: React.ReactNode
  bordered?: boolean
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={`page-band ${bordered ? "border-t" : ""}`}
    >
      <div className={`page-container py-section md:py-section-lg lg:py-section-xl ${className}`}>
        <div className="mx-auto flex w-full max-w-[740px] flex-col gap-10 md:gap-12">{children}</div>
      </div>
    </section>
  )
}

export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id ? `${id}-title` : undefined} className="text-display">
      {children}
    </h2>
  )
}

/** Section title and its intro copy, revealed together as one unit. */
export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div data-reveal="" className="flex flex-col gap-6">
      {children}
    </div>
  )
}

/** Intro copy under a section title, filling the reading column. Place inside SectionHeader. */
export function SectionIntro({ children }: { children: React.ReactNode }) {
  return <p className="text-body text-muted">{children}</p>
}

/** Numbered row: a narrow index column (number or label) beside content that fills the remaining column. */
export function IndexedRow({
  index,
  children,
  className = "",
}: {
  index: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`grid gap-3 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-6 ${className}`}>
      <div className="text-caption text-muted tabular-nums md:pt-1">{index}</div>
      <div className="flex min-w-0 flex-col gap-6">{children}</div>
    </div>
  )
}

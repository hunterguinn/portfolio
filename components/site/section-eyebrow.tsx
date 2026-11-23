export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow section-eyebrow pt-16 lg:pt-24">
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

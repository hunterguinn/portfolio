export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow section-eyebrow">
      <span className="section-eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}

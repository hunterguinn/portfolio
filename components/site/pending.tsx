export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed px-2 py-0.5 type-eyebrow text-muted">
      {children}
    </span>
  )
}

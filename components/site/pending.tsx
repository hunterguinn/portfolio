export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed px-2 py-1 text-eyebrow text-secondary">
      {children}
    </span>
  )
}

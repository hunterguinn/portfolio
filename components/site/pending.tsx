export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
      {children}
    </span>
  )
}

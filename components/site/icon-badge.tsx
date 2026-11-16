export function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-12 items-center justify-center rounded-full bg-surface-strong" aria-hidden="true">
      {children}
    </span>
  )
}

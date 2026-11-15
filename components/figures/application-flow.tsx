type Group = { label: string; title: string; items: string[] }

function Chip({ children }: { children: React.ReactNode }) {
  return <li className="type-supporting rounded-full border px-3 py-1">{children}</li>
}

function Stage({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface flex flex-col gap-4 rounded-lg border p-5">
      <div>
        <p className="type-eyebrow text-muted">{label}</p>
        <h3 className="mt-1 type-body type-strong">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Connector() {
  return <div aria-hidden="true" className="mx-auto h-6 w-px bg-border" />
}

export function ApplicationFlow({
  once,
  selection,
  paths,
  review,
}: {
  once: Group
  selection: { label: string; title: string; products: { name: string; count: number }[] }
  paths: { label: string; items: string[]; appliesTo: string[] }[]
  review: Group
}) {
  return (
    <div className="flex flex-col">
      <Stage label={once.label} title={once.title}>
        <ul className="flex flex-wrap gap-2">
          {once.items.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </ul>
      </Stage>
      <Connector />
      <Stage label={selection.label} title={selection.title}>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {selection.products.map((product) => (
            <li key={product.name} className="flex items-center justify-between gap-3 card-surface rounded-md border px-3 py-2 type-supporting">
              {product.name}
              <span className="type-supporting text-muted tabular-nums">{product.count}</span>
            </li>
          ))}
        </ul>
      </Stage>
      <Connector />
      <div className="grid gap-4 lg:grid-cols-3">
        {paths.map((path) => (
          <div key={path.label} className="flex flex-col gap-4 card-surface rounded-lg border border-dashed p-5">
            <div>
              <p className="type-eyebrow text-muted">Product path</p>
              <h3 className="mt-1 type-body type-strong">{path.label}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {path.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ul>
            <p className="mt-auto type-supporting text-muted">Applies to: {path.appliesTo.join(", ")}</p>
          </div>
        ))}
      </div>
      <Connector />
      <Stage label={review.label} title={review.title}>
        <ul className="flex flex-wrap gap-2">
          {review.items.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </ul>
      </Stage>
    </div>
  )
}

import { Minus, Plus } from "lucide-react"

const items = [
  { name: "Classic Burger", note: "No onions", price: 12.5, qty: 2 },
  { name: "Side Fries", note: "Large", price: 4.75, qty: 1 },
  { name: "Lemonade", note: "", price: 3.25, qty: 3 },
]

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

/** Coded stand-in for the redesigned POS Order screen, shown until the real asset is supplied. */
export function OrderScreen({ aspect }: { aspect: string }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div
      role="img"
      aria-label="Coded stand-in for the redesigned Order screen: three item rows with quantity counters and a visible subtotal"
      className="flex flex-col card-surface overflow-hidden rounded-lg border"
      style={{ aspectRatio: aspect }}
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="type-supporting type-strong">Order #1042</span>
        <span className="type-eyebrow text-muted">Table 6</span>
      </div>
      <ul className="flex flex-1 flex-col divide-y overflow-hidden">
        {items.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate type-supporting type-strong">{item.name}</p>
              <p className="truncate type-supporting text-muted">{item.note || money.format(item.price)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full border" aria-hidden="true">
                <Minus className="size-3" />
              </span>
              <span className="w-4 text-center type-supporting tabular-nums">{item.qty}</span>
              <span className="flex size-6 items-center justify-center rounded-full border" aria-hidden="true">
                <Plus className="size-3" />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 border-t bg-surface-strong px-4 py-4">
        <div className="flex items-baseline justify-between">
          <span className="type-supporting text-muted">Subtotal</span>
          <span className="type-body type-strong tabular-nums">{money.format(subtotal)}</span>
        </div>
        <div className="rounded-md bg-foreground py-2.5 text-center type-supporting type-strong text-background">Pay</div>
      </div>
    </div>
  )
}

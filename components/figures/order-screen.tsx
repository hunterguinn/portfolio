import { Minus } from "@phosphor-icons/react/dist/ssr/Minus"
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus"

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
      className="flex flex-col card-surface overflow-hidden rounded-lg"
      style={{ aspectRatio: aspect }}
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-caption text-strong">Order #1042</span>
        <span className="text-eyebrow text-muted">Table 6</span>
      </div>
      <ul className="flex flex-1 flex-col divide-y overflow-hidden">
        {items.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-caption text-strong">{item.name}</p>
              <p className="truncate text-caption text-muted">{item.note || money.format(item.price)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full border" aria-hidden="true">
                <Minus weight="regular" className="size-3" />
              </span>
              <span className="w-4 text-center text-caption tabular-nums">{item.qty}</span>
              <span className="flex size-6 items-center justify-center rounded-full border" aria-hidden="true">
                <Plus weight="regular" className="size-3" />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 border-t bg-surface-strong px-4 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-caption text-muted">Subtotal</span>
          <span className="text-body text-strong tabular-nums">{money.format(subtotal)}</span>
        </div>
        <div className="rounded-md bg-foreground py-3 text-center text-caption text-strong text-background">Pay</div>
      </div>
    </div>
  )
}

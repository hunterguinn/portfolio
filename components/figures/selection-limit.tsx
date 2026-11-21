"use client"

import { useId, useState } from "react"

const DEFAULT_HOLDINGS = 30

export function SelectionLimit({ limit }: { limit: number }) {
  const baseId = useId()
  const max = limit * 2
  const [holdings, setHoldings] = useState(DEFAULT_HOLDINGS)
  const [selected, setSelected] = useState(DEFAULT_HOLDINGS)

  const overLimit = holdings > limit
  const selectable = Math.min(holdings, limit)
  const clampedSelected = Math.min(selected, selectable)
  const atCap = overLimit && clampedSelected === limit

  const setHoldingCount = (value: number) => {
    setHoldings(value)
    setSelected((current) => Math.min(current, Math.min(value, limit)))
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg border p-4 md:p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${baseId}-holdings`} className="flex items-baseline justify-between text-caption text-secondary">
            Securities in external account
            <span className="text-body text-primary tabular-nums">{holdings}</span>
          </label>
          <input
            id={`${baseId}-holdings`}
            type="range"
            min={1}
            max={max}
            value={holdings}
            onChange={(event) => setHoldingCount(Number(event.target.value))}
            className="w-full accent-foreground"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${baseId}-selected`} className="flex items-baseline justify-between text-caption text-secondary">
            Selected individually
            <span className="text-body text-primary tabular-nums">
              {clampedSelected}
              <span className="text-caption text-secondary">{` / ${selectable}`}</span>
            </span>
          </label>
          <input
            id={`${baseId}-selected`}
            type="range"
            min={0}
            max={selectable}
            value={clampedSelected}
            onChange={(event) => setSelected(Number(event.target.value))}
            className="w-full accent-foreground"
          />
        </div>
      </div>

      <div
        className="relative h-2 overflow-hidden rounded-full bg-surface-strong"
        role="img"
        aria-label={`${clampedSelected} of ${limit} selection limit used`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${(clampedSelected / limit) * 100}%` }}
        />
      </div>

      <ul className="grid gap-3 sm:grid-cols-2" aria-live="polite">
        <li className="flex flex-col gap-1 rounded-md border p-4">
          <span className="text-eyebrow text-secondary">Full transfer</span>
          <span className="text-caption text-primary">{`All ${holdings} securities`}</span>
        </li>
        <li
          className={`flex flex-col gap-1 rounded-md border p-4 transition-colors duration-300 ${atCap ? "bg-surface" : ""}`}
        >
          <span className="text-eyebrow text-secondary">Partial transfer</span>
          <span className="text-caption text-primary">
            {overLimit ? `Up to ${limit} of ${holdings} securities` : `Any of ${holdings} securities`}
          </span>
          {atCap ? <span className="text-caption text-secondary">{`Limit of ${limit} reached`}</span> : null}
        </li>
      </ul>
      <p className="text-eyebrow text-secondary">{`Illustrative state · ${limit}-security limit`}</p>
    </div>
  )
}

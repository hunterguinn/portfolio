"use client"

import { useId, useState } from "react"
import type { TransferRow, TransferRules } from "@/lib/content/types"

type RowState = { checked: boolean; amount: string }

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function initialState(rows: TransferRow[]): RowState[] {
  return rows.map((row) => ({ checked: true, amount: String(row.amount) }))
}

export function TransferDemo({
  mode,
  rows,
  initialStatus,
  rules = {},
}: {
  mode: "synchronized" | "amount-only"
  rows: TransferRow[]
  initialStatus: string
  rules?: TransferRules
}) {
  const baseId = useId()
  const [state, setState] = useState<RowState[]>(() => initialState(rows))
  const [touched, setTouched] = useState(false)
  const [appliedRule, setAppliedRule] = useState<string | null>(null)
  const synchronized = mode === "synchronized"

  const update = (index: number, next: Partial<RowState>) => {
    setTouched(true)
    setState((current) => current.map((row, i) => (i === index ? { ...row, ...next } : row)))
  }

  const onAmountChange = (index: number, raw: string) => {
    const amount = raw.replace(/[^0-9.]/g, "")
    const positive = toNumber(amount) > 0
    if (amount !== "" && !positive) setAppliedRule(rules.zeroDeselects ?? null)
    else if (synchronized && positive && !state[index].checked) setAppliedRule(rules.amountReselects ?? null)
    update(index, { amount, checked: synchronized ? positive : true })
  }

  const onToggle = (index: number, checked: boolean) => {
    setAppliedRule((checked ? rules.reselectRequiresAmount : rules.deselectZeroes) ?? null)
    update(index, { checked, amount: checked ? "" : "0" })
  }

  const full = state.filter((row, i) => toNumber(row.amount) >= rows[i].amount).length
  const entered = state.filter((row) => toNumber(row.amount) > 0).length
  const missing = state.filter((row) => row.checked && toNumber(row.amount) === 0).length

  let status = initialStatus
  if (touched) {
    status = synchronized
      ? `${entered} of ${rows.length} securities have an amount entered`
      : `${full} of ${rows.length} securities transferred in full`
    if (synchronized && missing > 0) status += ` · ${missing} selected without an amount`
    if (!synchronized && entered < rows.length) status += ` · ${rows.length - entered} excluded`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card-static overflow-x-auto rounded-lg border">
        <table className="text-caption w-full min-w-[34rem] text-left">
          <caption className="sr-only">
            {synchronized
              ? "Securities with a selection checkbox synchronized to an amount field"
              : "Securities where the amount field alone determines what transfers"}
          </caption>
          <thead className="border-b bg-surface text-eyebrow text-muted">
            <tr>
              {synchronized ? (
                <th scope="col" className="w-12 px-4 py-3">
                  <span className="sr-only">Select</span>
                </th>
              ) : null}
              <th scope="col" className="px-4 py-3">
                Security
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Shares
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Amount to transfer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, index) => {
              const current = state[index]
              const needsAmount = synchronized && current.checked && toNumber(current.amount) === 0
              const amountId = `${baseId}-amount-${index}`
              return (
                <tr key={row.symbol}>
                  {synchronized ? (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={current.checked}
                        onChange={(event) => onToggle(index, event.target.checked)}
                        aria-label={`Select ${row.name}`}
                        className="size-4 accent-foreground"
                      />
                    </td>
                  ) : null}
                  <th scope="row" className="px-4 py-3">
                    <span className="block text-strong">{row.symbol}</span>
                    <span className="block text-caption text-muted">{row.name}</span>
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums text-muted">{row.shares}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <label htmlFor={amountId} className="sr-only">
                        Amount to transfer for {row.name}
                      </label>
                      <div className="flex w-36 items-center rounded-md border bg-background focus-within:outline-2 focus-within:outline-foreground">
                        <span aria-hidden="true" className="pl-3 text-muted">
                          $
                        </span>
                        <input
                          id={amountId}
                          inputMode="decimal"
                          value={current.amount}
                          onChange={(event) => onAmountChange(index, event.target.value)}
                          aria-invalid={needsAmount}
                          placeholder="0"
                          className="w-full bg-transparent px-2 py-2 text-right tabular-nums outline-none"
                        />
                      </div>
                      <p className="text-caption text-muted">
                        {needsAmount ? <span className="text-red">Enter an amount</span> : `Up to ${money.format(row.amount)}`}
                      </p>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p
        aria-live="polite"
        className={`rounded-md border-l-2 px-3 py-2 text-caption transition-opacity duration-300 ${
          appliedRule ? "border-foreground bg-surface text-foreground opacity-100" : "border-transparent opacity-0"
        }`}
      >
        {appliedRule ? <><span className="text-muted">Rule applied: </span>{appliedRule}</> : "\u00a0"}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-caption text-muted">
          {status}
        </p>
        <button
          type="button"
          onClick={() => {
            setState(initialState(rows))
            setTouched(false)
            setAppliedRule(null)
          }}
          className="btn-secondary text-caption rounded-full px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

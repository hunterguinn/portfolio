"use client"

import { useId, useState } from "react"
import { Warning } from "@phosphor-icons/react/dist/csr/Warning"

const TOTAL_ASSETS = 100
const ASSET_TYPES = ["Stocks", "ETFs", "Bonds", "Crypto", "Prop Funds"] as const
type AssetType = (typeof ASSET_TYPES)[number]
type TransferType = "full" | "partial"

const hasRestrictedAssets = (assets: AssetType[]) => assets.includes("Crypto") || assets.includes("Prop Funds")

export function SelectionLimit({ limit }: { limit: number }) {
  const baseId = useId()
  const [assets, setAssets] = useState<AssetType[]>(["Stocks", "ETFs"])
  const [transfer, setTransfer] = useState<TransferType>("full")
  const [selected, setSelected] = useState(30)
  const restricted = hasRestrictedAssets(assets)
  const isFull = transfer === "full"
  const overLimit = !isFull && restricted && selected > limit
  const errorId = `${baseId}-error`
  const hintId = `${baseId}-hint`

  const toggleAsset = (asset: AssetType) => {
    const next = assets.includes(asset) ? assets.filter((value) => value !== asset) : [...assets, asset]
    setAssets(next)
    // Keep the transfer selection valid as asset types change.
    if (hasRestrictedAssets(next)) setTransfer("partial")
  }

  return (
    <div className="card-static flex min-w-0 flex-col gap-6 rounded-lg border p-4 md:p-6">
      <p className="text-body text-foreground">100 assets in this transfer</p>

      <fieldset className="flex min-w-0 flex-col gap-3">
        <legend className="mb-3 text-caption text-foreground">What types of assets do you have?</legend>
        <div className="flex flex-wrap gap-2">
          {ASSET_TYPES.map((asset) => (
            <button
              key={asset}
              type="button"
              aria-pressed={assets.includes(asset)}
              onClick={() => toggleAsset(asset)}
              className={`rounded-full border px-3 py-1 text-caption transition-colors ${
                assets.includes(asset) ? "border-foreground bg-foreground text-background" : "pill-hover text-muted"
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-3" aria-describedby={hintId}>
        <legend className="mb-3 text-caption text-foreground">How would you like to transfer?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["full", "partial"] as const).map((value) => {
            const disabled = value === "full" && restricted
            return (
              <label
                key={value}
                className={`flex min-h-11 items-center gap-3 rounded-md border p-4 transition-colors ${
                  disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                } ${transfer === value ? "border-foreground bg-surface" : "border-border"}`}
              >
                <input
                  type="radio"
                  name={`${baseId}-transfer`}
                  value={value}
                  checked={transfer === value}
                  disabled={disabled}
                  onChange={() => setTransfer(value)}
                  className="size-4 shrink-0 accent-foreground"
                />
                <span className="text-caption text-foreground">{value === "full" ? "Full Transfer" : "Partial Transfer"}</span>
              </label>
            )
          })}
        </div>
        <p id={hintId} className="text-caption text-muted">
          {restricted ? `Crypto and Prop Funds require a partial transfer of ${limit} assets or fewer.` : "Full Transfer includes all 100 assets. Partial Transfer lets you choose how many to move."}
        </p>
      </fieldset>

      <fieldset disabled={isFull} className={`flex min-w-0 flex-col gap-3 transition-opacity duration-300 motion-reduce:transition-none ${isFull ? "opacity-50" : "opacity-100"}`}>
        <legend className="mb-3 text-caption text-foreground">Assets in this partial transfer</legend>
        <label htmlFor={`${baseId}-selected`} className="flex flex-wrap items-baseline justify-between gap-2 text-caption text-muted">
          Select assets
          <span className="text-body text-foreground tabular-nums">{selected} / {TOTAL_ASSETS}</span>
        </label>
        <input
          id={`${baseId}-selected`}
          type="range"
          min={0}
          max={TOTAL_ASSETS}
          step={1}
          value={selected}
          list={`${baseId}-ticks`}
          onChange={(event) => setSelected(Number(event.target.value))}
          aria-valuetext={`${selected} of ${TOTAL_ASSETS} assets`}
          aria-invalid={overLimit || undefined}
          aria-describedby={overLimit ? `${hintId} ${errorId}` : hintId}
          className="w-full accent-foreground disabled:cursor-not-allowed"
        />
        <datalist id={`${baseId}-ticks`}>
          {[0, 25, 50, 75, 100].map((value) => <option key={value} value={value} />)}
        </datalist>
        <div aria-hidden="true" className="flex justify-between text-eyebrow text-muted tabular-nums">
          {[0, 25, 50, 75, 100].map((value) => <span key={value}>{value}</span>)}
        </div>
      </fieldset>

      <div aria-live="polite" className="min-h-6">
        {overLimit ? (
          <p id={errorId} className="text-caption flex items-center justify-start gap-1.5 text-left text-red">
            <Warning size={16} weight="regular" className="shrink-0" aria-hidden="true" />
            {`Transfers containing Crypto or Prop Funds are limited to ${limit} assets. Select ${limit} or fewer.`}
          </p>
        ) : null}
      </div>
    </div>
  )
}

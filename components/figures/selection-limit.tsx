"use client"

import { useId, useState, type CSSProperties } from "react"
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle"
import { Warning } from "@phosphor-icons/react/dist/csr/Warning"

const TOTAL_ASSETS = 100
const ASSET_TYPES = ["Equities", "Bonds", "Crypto", "Prop Funds"] as const
type AssetType = (typeof ASSET_TYPES)[number]
type TransferType = "full" | "partial"

const hasRestrictedAssets = (assets: AssetType[]) => assets.includes("Crypto") || assets.includes("Prop Funds")

export function SelectionLimit({ limit }: { limit: number }) {
  const baseId = useId()
  const [assets, setAssets] = useState<AssetType[]>(["Equities"])
  const [transfer, setTransfer] = useState<TransferType>("full")
  const [selected, setSelected] = useState(30)
  const restricted = hasRestrictedAssets(assets)
  const isFull = transfer === "full"
  const sliderValue = isFull ? TOTAL_ASSETS : selected
  const overLimit = !isFull && selected > limit
  const errorId = `${baseId}-error`
  const hintId = `${baseId}-hint`

  const toggleAsset = (asset: AssetType) => {
    const next = assets.includes(asset) ? assets.filter((value) => value !== asset) : [...assets, asset]
    setAssets(next)
    // Keep the transfer selection valid as asset types change.
    if (hasRestrictedAssets(next)) setTransfer("partial")
  }

  return (
    <div className="card-static flex min-w-0 flex-col gap-8 font-normal rounded-lg border p-4 md:p-6">
      <h3 className="text-body font-medium text-foreground">Transfer Logic – 100 Assets in Transfer</h3>

      <fieldset className="flex min-w-0 flex-col gap-3">
        <legend className="mb-3 text-body text-foreground">What types of assets do you have?</legend>
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
        <legend className="mb-3 text-body text-foreground">How would you like to transfer?</legend>
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
        <div id={hintId} aria-live="polite" className="min-h-6">
          {restricted ? (
            <p className="text-caption flex items-center justify-start gap-1.5 text-left text-yellow">
              <Warning size={16} weight="regular" className="shrink-0" aria-hidden="true" />
              Full transfer is not possible due to ineligible assets.
            </p>
          ) : null}
        </div>
      </fieldset>

      <fieldset disabled={isFull} className={`flex min-w-0 flex-col gap-1 transition-opacity duration-300 motion-reduce:transition-none ${isFull ? "opacity-50" : "opacity-100"}`}>
        <legend className="sr-only">Partial transfer asset count</legend>
        <label htmlFor={`${baseId}-selected`} className="flex flex-wrap items-baseline justify-between gap-2 text-body text-foreground">
          Assets in this partial transfer
          <span className="font-mono text-caption font-normal text-muted tabular-nums">{sliderValue} / {TOTAL_ASSETS}</span>
        </label>
        <div className="relative min-w-0 pt-3">
          <span className="sr-only" id={`${baseId}-threshold`}>{`Partial transfer limit: ${limit} assets.`}</span>
          <span
            aria-hidden="true"
            className="absolute top-3 h-2 w-px -translate-x-1/2 bg-muted"
            style={{ left: `calc(var(--spacing) * 2 + (100% - var(--spacing) * 4) * ${limit / TOTAL_ASSETS})` }}
          />
          <input
            id={`${baseId}-selected`}
            type="range"
            min={0}
            max={TOTAL_ASSETS}
            step={1}
            value={sliderValue}
            onChange={(event) => setSelected(Number(event.target.value))}
            aria-valuetext={`${sliderValue} of ${TOTAL_ASSETS} assets`}
            aria-invalid={overLimit || undefined}
            aria-describedby={`${hintId} ${baseId}-threshold${overLimit ? ` ${errorId}` : ""}`}
            className="transfer-range block w-full disabled:cursor-not-allowed"
            style={{ "--range-progress": `${sliderValue}%` } as CSSProperties}
          />
          <div aria-hidden="true" className="relative mx-2 h-8 font-mono text-caption font-normal text-muted tabular-nums">
            {[0, 25, 50, 75, 100].map((value) => (
              <span key={value} className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1" style={{ left: `${value}%` }}>
                <span className="h-1.5 w-px bg-muted/50" />
                <span>{value}</span>
              </span>
            ))}
          </div>
        </div>
      </fieldset>

      <div aria-live="polite" className="min-h-6">
        {overLimit ? (
          <p id={errorId} className="text-caption flex items-center justify-start gap-1.5 text-left text-red">
            <Warning size={16} weight="regular" className="shrink-0" aria-hidden="true" />
            {`Partial transfers are limited to ${limit} assets.`}
          </p>
        ) : (
          <p className="text-caption flex items-center justify-start gap-1.5 text-left text-green">
            <CheckCircle size={16} weight="regular" className="shrink-0" aria-hidden="true" />
            {isFull ? "This full transfer of 100 assets is eligible." : "This partial transfer is eligible."}
          </p>
        )}
      </div>
    </div>
  )
}

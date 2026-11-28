import { useId } from "react"
import type { CitizenshipCopy } from "@/lib/content/types"

const field =
  "w-full rounded-md border bg-background px-3 py-3 text-body read-only:text-foreground disabled:cursor-not-allowed disabled:text-muted"

/** Read-only recreation of the citizenship step, shown as a figure. */
export function CitizenshipForm({ copy }: { copy: CitizenshipCopy }) {
  const id = useId()

  return (
    <form
      action="#"
      aria-label="Citizenship step example"
      className="flex flex-col gap-6 card-surface rounded-lg p-5 md:p-8 lg:p-6"
    >
      <div className="flex flex-col gap-title-desc">
        <h3 className="text-heading">{copy.heading}</h3>
        <p className="text-caption text-muted">{copy.required}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-country`} className="text-caption text-strong">
          {copy.countryLabel}
        </label>
        <input id={`${id}-country`} readOnly value={copy.countryValue} aria-describedby={`${id}-country-hint`} className={field} />
        <p id={`${id}-country-hint`} className="text-caption text-muted">
          {copy.countryHint}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-status`} className="text-caption text-strong">
          {copy.statusLabel}
        </label>
        <input id={`${id}-status`} disabled value={copy.statusValue} className={field} />
        <details className="text-caption text-muted">
          <summary className="w-fit cursor-pointer underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
            {copy.statusHelpLabel}
          </summary>
          <p className="pt-2">{copy.statusHelp}</p>
        </details>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-ssn`} className="text-caption text-strong">
          {copy.ssnLabel}
        </label>
        <input id={`${id}-ssn`} readOnly placeholder={copy.ssnPlaceholder} className={field} />
      </div>
    </form>
  )
}

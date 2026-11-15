import { useId } from "react"
import type { CitizenshipCopy } from "@/lib/content/types"

const field =
  "w-full rounded-md border bg-background px-3 py-2.5 type-body read-only:text-foreground disabled:cursor-not-allowed disabled:text-muted"

/** Read-only recreation of the citizenship step, shown as a figure. */
export function CitizenshipForm({ copy }: { copy: CitizenshipCopy }) {
  const id = useId()

  return (
    <form
      action="#"
      aria-label="Citizenship step example"
      className="flex max-w-xl flex-col gap-6 card-surface rounded-lg border p-6 md:p-8"
    >
      <div>
        <h3 className="type-project-title">{copy.heading}</h3>
        <p className="mt-1 type-supporting text-muted">{copy.required}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-country`} className="type-supporting type-strong">
          {copy.countryLabel}
        </label>
        <input id={`${id}-country`} readOnly value={copy.countryValue} aria-describedby={`${id}-country-hint`} className={field} />
        <p id={`${id}-country-hint`} className="type-supporting text-muted">
          {copy.countryHint}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-status`} className="type-supporting type-strong">
          {copy.statusLabel}
        </label>
        <input id={`${id}-status`} disabled value={copy.statusValue} className={field} />
        <details className="type-supporting text-muted">
          <summary className="w-fit cursor-pointer underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
            {copy.statusHelpLabel}
          </summary>
          <p className="mt-2 max-w-md">{copy.statusHelp}</p>
        </details>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-ssn`} className="type-supporting type-strong">
          {copy.ssnLabel}
        </label>
        <input id={`${id}-ssn`} readOnly placeholder={copy.ssnPlaceholder} className={field} />
      </div>
    </form>
  )
}

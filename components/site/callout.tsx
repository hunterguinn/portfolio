export function Callout({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote data-reveal="" className="text-heading border-l-2 border-foreground py-1 pl-5">
      <p>{text}</p>
      {attribution ? <footer className="mt-4 text-caption text-muted">{attribution}</footer> : null}
    </blockquote>
  )
}

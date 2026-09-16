import type { ReactNode } from "react"

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
        {children}
      </div>
    </div>
  )
}

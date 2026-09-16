export function ProductGridSkeleton() {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <span className="sr-only">Loading products…</span>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-border">
          <div className="aspect-square animate-pulse bg-muted" />
          <div className="space-y-2 border-t border-border p-4">
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}

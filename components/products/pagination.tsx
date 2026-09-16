import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function buildHref(params: Record<string, string | undefined>, page: number) {
  const search = new URLSearchParams()
  if (params.category) search.set("category", params.category)
  if (params.sub) search.set("sub", params.sub)
  if (page > 1) search.set("page", String(page))
  const query = search.toString()
  return query ? `/products?${query}` : "/products"
}

export function ProductPagination({
  page,
  totalPages,
  category,
  sub,
}: {
  page: number
  totalPages: number
  category?: string
  sub?: string
}) {
  if (totalPages <= 1) return null

  const params = { category, sub }

  return (
    <nav aria-label="Product pages" className="mt-8 flex items-center justify-center gap-1.5">
      <Link
        href={buildHref(params, Math.max(1, page - 1))}
        aria-disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm transition-colors hover:bg-secondary",
          page === 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Link>

      <span aria-current="page" className="flex h-9 min-w-9 items-center justify-center rounded-md border border-primary bg-primary px-3 text-sm font-medium text-primary-foreground">
        {page} / {totalPages}
      </span>

      <Link
        href={buildHref(params, Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm transition-colors hover:bg-secondary",
          page === totalPages && "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </nav>
  )
}

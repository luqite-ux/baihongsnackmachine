import Link from "next/link"
import { cn } from "@/lib/utils"

function buildHref(params: Record<string, string | undefined>, page: number) {
  const search = new URLSearchParams()
  if (params.category) search.set("category", params.category)
  if (params.sub) search.set("sub", params.sub)
  if (params.search) search.set("q", params.search)
  if (page > 1) search.set("page", String(page))
  const query = search.toString()
  return query ? `/products?${query}` : "/products"
}

export function ProductPagination({
  page,
  totalPages,
  category,
  sub,
  search,
}: {
  page: number
  totalPages: number
  category?: string
  sub?: string
  search?: string
}) {
  if (totalPages <= 1) return null

  const params = { category, sub, search }

  return (
    <nav aria-label="Product pages" className="mt-9 flex items-center justify-center gap-2">
      <Link
        href={buildHref(params, Math.max(1, page - 1))}
        scroll={false}
        aria-disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          "flex h-9 min-w-16 items-center justify-center border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white",
          page === 1 && "pointer-events-none opacity-40",
        )}
      >
        Prev
      </Link>

      <span aria-current="page" className="flex h-9 min-w-9 items-center justify-center border border-[#f39a00] bg-[#f39a00] px-3 text-sm font-bold text-white">
        {page}
      </span>

      <Link
        href={buildHref(params, Math.min(totalPages, page + 1))}
        scroll={false}
        aria-disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          "flex h-9 min-w-16 items-center justify-center border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white",
          page === totalPages && "pointer-events-none opacity-40",
        )}
      >
        Next
      </Link>
    </nav>
  )
}

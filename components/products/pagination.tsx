import Link from "next/link"
import { cn } from "@/lib/utils"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

function buildHref(params: Record<string, string | undefined>, page: number) {
  const search = new URLSearchParams()
  if (params.category) search.set("category", params.category)
  if (params.sub) search.set("sub", params.sub)
  if (params.search) search.set("q", params.search)
  if (page > 1) search.set("page", String(page))
  const query = search.toString()
  return query ? `/products?${query}` : "/products"
}

function pageItems(page: number, totalPages: number) {
  const pages = new Set([1, totalPages])
  for (let item = page - 1; item <= page + 1; item += 1) {
    if (item >= 1 && item <= totalPages) pages.add(item)
  }
  const sorted = [...pages].sort((a, b) => a - b)
  return sorted.flatMap((item, index) => {
    const previous = sorted[index - 1]
    return previous && item - previous > 1 ? (["ellipsis", item] as const) : ([item] as const)
  })
}

export function ProductPagination({
  page,
  totalPages,
  category,
  sub,
  search,
  locale,
}: {
  page: number
  totalPages: number
  category?: string
  sub?: string
  search?: string
  locale: Locale
}) {
  if (totalPages <= 1) return null

  const params = { category, sub, search }

  return (
    <nav aria-label="Product pages" className="mt-9 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={localePath(buildHref(params, Math.max(1, page - 1)), locale)}
        scroll={false}
        aria-disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          "flex h-9 min-w-16 items-center justify-center border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white",
          page === 1 && "pointer-events-none opacity-40",
        )}
      >
        {locale === "zh" ? "上一页" : "Prev"}
      </Link>

      {pageItems(page, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="flex h-9 min-w-9 items-center justify-center px-2 text-sm text-neutral-400" aria-hidden="true">
            ...
          </span>
        ) : item === page ? (
          <span key={item} aria-current="page" className="flex h-9 min-w-9 items-center justify-center border border-[#f39a00] bg-[#f39a00] px-3 text-sm font-bold text-white">
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={localePath(buildHref(params, item), locale)}
            aria-label={locale === "zh" ? `第 ${item} 页` : `Page ${item}`}
            className="flex h-9 min-w-9 items-center justify-center border border-neutral-200 px-3 text-sm font-semibold text-neutral-600 transition-colors hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white"
          >
            {item}
          </Link>
        ),
      )}

      <Link
        href={localePath(buildHref(params, Math.min(totalPages, page + 1)), locale)}
        scroll={false}
        aria-disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          "flex h-9 min-w-16 items-center justify-center border border-neutral-200 px-3 text-sm text-neutral-600 transition-colors hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white",
          page === totalPages && "pointer-events-none opacity-40",
        )}
      >
        {locale === "zh" ? "下一页" : "Next"}
      </Link>
    </nav>
  )
}

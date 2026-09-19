import { PackageSearch } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductPagination } from "@/components/products/pagination"
import type { ProductPage } from "@/lib/products-db"
import type { ProductCategory } from "@/lib/types"
import { resolveText } from "@/lib/locale"
import type { Locale } from "@/lib/types"

/**
 * Right-hand catalog segment (MOT-BAIHONG-02). This is composed inside the
 * Suspense boundary rendered by app/products/page.tsx, while the left
 * `CategoryNav` lives one level up in app/products/layout.tsx and never
 * remounts. Rendering `ProductPagination` and `ProductCard` here keeps the
 * grid, the "showing N of total" status and the pager updating together as
 * a single unit whenever category, subcategory or page changes, with no
 * effect on the stable shell around it.
 */
export function ProductCatalog({
  data,
  activeCategory,
  category,
  sub,
  search,
  locale,
}: {
  data: ProductPage
  activeCategory?: ProductCategory
  category?: string
  sub?: string
  search?: string
  locale: Locale
}) {
  return (
    <div
      key={`${category ?? "all"}-${sub ?? "all"}-${data.page}`}
      className="animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div role="status" aria-live="polite" className="mb-4 border-b border-neutral-200 pb-3 text-sm text-neutral-500">
        {search ? `${locale === "zh" ? "搜索" : "Search"} “${search}”: ` : activeCategory ? `${resolveText(activeCategory.name, locale)}: ` : ""}
        {locale === "zh" ? `显示 ${data.items.length} / ${data.total} 个产品` : `Showing ${data.items.length} of ${data.total} product${data.total === 1 ? "" : "s"}`}
      </div>

      {data.items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
          <PackageSearch className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">{locale === "zh" ? "该分类暂无产品。" : "No products found in this category yet."}</p>
        </div>
      ) : (
        <ul aria-label="Products" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale} />
          ))}
        </ul>
      )}

      <ProductPagination page={data.page} totalPages={data.totalPages} category={category} sub={sub} search={search} locale={locale} />
    </div>
  )
}

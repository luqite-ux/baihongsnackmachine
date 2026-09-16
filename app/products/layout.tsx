import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/page-header"
import { CategoryNav } from "@/components/products/category-nav"
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton"
import { fetchCategories } from "@/lib/products-db"

export const metadata: Metadata = {
  title: "Products",
  description: "Commercial snack machines and kitchen equipment from Baihong, organized by category.",
}

/**
 * This shell (header, explanatory copy, left category navigation) is a
 * stable layout segment. Only the Suspense boundary below re-renders when
 * category, subcategory, page, Previous or Next change — the shell never
 * reloads, flashes or loses scroll position (MOT-BAIHONG-02).
 */
export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const categories = await fetchCategories()
  return (
    <>
      <PageHeader
        eyebrow="Product Catalog"
        title="Products"
        description="Browse Baihong commercial snack machines and kitchen equipment by category. Contact us for pricing and customization."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <aside className="md:sticky md:top-24 md:self-start">
            <Suspense fallback={<div className="h-64 rounded-md bg-muted/40" aria-hidden="true" />}>
              <CategoryNav categories={categories} />
            </Suspense>
          </aside>
          <div>
            <Suspense fallback={<ProductGridSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

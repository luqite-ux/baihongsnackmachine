import type { Metadata } from "next"
import { Suspense } from "react"
import { CategoryNav } from "@/components/products/category-nav"
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton"
import { ProductDisplayHero } from "@/components/products/product-display-hero"
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
      <ProductDisplayHero />
      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-0">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-neutral-950">Main Product Category</h2>
          <p className="mt-3 max-w-5xl text-sm leading-6 text-neutral-600">
            Our main products include barbecue grills, aluminum plate machines, deep fryers and commercial snack
            machines. Select a category to update the product list on the right.
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-[255px_1fr]">
          <aside className="md:sticky md:top-4 md:self-start">
            <Suspense fallback={<div className="h-64 bg-neutral-100" aria-hidden="true" />}>
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

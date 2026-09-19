import { Suspense } from "react"
import { CategoryNav } from "@/components/products/category-nav"
import { ProductDisplayHero } from "@/components/products/product-display-hero"
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton"
import { ProductPageIntro } from "@/components/products/product-page-intro"
import { QualityServiceSection } from "@/components/quality-service-section"
import { fetchCategories } from "@/lib/products-db"
import { getRequestLocale } from "@/lib/request-locale"

/** The catalogue shell persists across filters and pagination, but never wraps product details. */
export default async function ProductCatalogLayout({ children }: { children: React.ReactNode }) {
  const categories = await fetchCategories()
  const locale = await getRequestLocale()

  return (
    <>
      <ProductDisplayHero locale={locale} />
      <div className="mx-auto max-w-[1248px] px-4 py-12 lg:px-0">
        <ProductPageIntro locale={locale} />
        <div className="grid gap-7 md:grid-cols-[255px_1fr]">
          <aside className="md:self-start">
            <Suspense fallback={<div className="h-[560px] bg-[#f3f3f3]" aria-hidden="true" />}>
              <CategoryNav categories={categories} locale={locale} />
            </Suspense>
          </aside>
          <Suspense fallback={<ProductGridSkeleton />}>{children}</Suspense>
        </div>
      </div>
      <QualityServiceSection locale={locale} />
    </>
  )
}

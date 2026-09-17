import type { Metadata } from "next"
import { Suspense } from "react"
import { ProductCatalog } from "@/components/product-catalog"
import { CategoryNav } from "@/components/products/category-nav"
import { ProductDisplayHero } from "@/components/products/product-display-hero"
import { ProductGridSkeleton } from "@/components/products/product-grid-skeleton"
import { fetchCategories, fetchProducts } from "@/lib/products-db"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Baihong commercial snack machines and kitchen equipment by category.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Products", description: "Browse Baihong commercial snack machines and kitchen equipment by category.", url: "/products", type: "website", images: [siteConfig.logo] },
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; sub?: string; page?: string }>
}

const PAGE_SIZE = 6

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const categories = await fetchCategories()
  const activeCategory = params.category ? categories.find((item) => item.slug === params.category) : undefined
  const category = activeCategory?.slug
  const sub = category
    ? params.sub && activeCategory?.subcategories.some((s) => s.slug === params.sub)
      ? params.sub
      : undefined
    : undefined
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1)

  const data = await fetchProducts({ category, subcategory: sub, page, pageSize: PAGE_SIZE })

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
            <CategoryNav categories={categories} />
          </aside>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductCatalog data={data} activeCategory={activeCategory} category={category} sub={sub} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

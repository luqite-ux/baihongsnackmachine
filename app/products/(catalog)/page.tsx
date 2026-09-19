import type { Metadata } from "next"
import { ProductCatalog } from "@/components/product-catalog"
import { fetchCategories, fetchProducts } from "@/lib/products-db"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Baihong commercial snack machines and kitchen equipment by category.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Products", description: "Browse Baihong commercial snack machines and kitchen equipment by category.", url: "/products", type: "website", images: [siteConfig.logo] },
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; sub?: string; page?: string; q?: string }>
}

const PAGE_SIZE = 6

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const locale = await getRequestLocale()
  const params = await searchParams
  const categories = await fetchCategories()
  const activeCategory = params.category ? categories.find((item) => item.slug === params.category) : undefined
  const category = activeCategory?.slug
  const sub = category
    ? params.sub && activeCategory?.subcategories.some((item) => item.slug === params.sub)
      ? params.sub
      : undefined
    : undefined
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1)
  const search = params.q?.trim()
  const data = await fetchProducts({ category, subcategory: sub, search, page, pageSize: PAGE_SIZE })

  return <ProductCatalog data={data} activeCategory={activeCategory} category={category} sub={sub} search={search} locale={locale} />
}

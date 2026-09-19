import type { Metadata } from "next"
import { ProductCatalog } from "@/components/product-catalog"
import { fetchCategories, fetchProducts } from "@/lib/products-db"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"
import { buildLocaleAlternates } from "@/lib/seo-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale(); const title = locale === "zh" ? "产品中心" : "Products"; const description = locale === "zh" ? "按分类浏览百泓商用小吃机械与厨房设备。" : "Browse Baihong commercial snack machines and kitchen equipment by category."
  return { title, description, alternates: buildLocaleAlternates("/products", locale), openGraph: { title, description, url: locale === "zh" ? "/zh/products" : "/products", type: "website", images: [siteConfig.logo] } }
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

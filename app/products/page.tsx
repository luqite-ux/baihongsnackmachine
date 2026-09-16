import { ProductCatalog } from "@/components/product-catalog"
import { fetchCategories, fetchProducts } from "@/lib/products-db"

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

  return <ProductCatalog data={data} activeCategory={activeCategory} category={category} sub={sub} />
}

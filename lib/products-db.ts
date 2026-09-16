import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import type { LocalizedText, Product, ProductCategory } from "@/lib/types"

export interface ProductFilters {
  category?: string
  subcategory?: string
  page?: number
  pageSize?: number
}

export interface ProductPage {
  items: Product[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

type ProductRow = {
  slug: string | null
  name: string | null
  name_i18n: LocalizedText | null
  description: string | null
  description_i18n: LocalizedText | null
  category_slug: string | null
  image_url: string | null
  extra_data: Record<string, unknown> | null
}

type CategoryRow = {
  slug: string | null
  name: string | null
  name_i18n: LocalizedText | null
  description: string | null
  description_i18n: LocalizedText | null
  extra_data: Record<string, unknown> | null
}

function localized(value: LocalizedText | null, fallback: string): LocalizedText {
  if (value && Object.values(value).some(Boolean)) return value
  return { en: fallback }
}

function mapProduct(row: ProductRow): Product {
  const extra = row.extra_data || {}
  const width = typeof extra.image_width === "number" ? extra.image_width : 1000
  const height = typeof extra.image_height === "number" ? extra.image_height : 1000
  const subcategorySlug = typeof extra.subcategory === "string" ? extra.subcategory : undefined
  const name = localized(row.name_i18n, row.name || "Commercial Food Machine")
  return {
    slug: row.slug || "product",
    name,
    categorySlug: row.category_slug || "uncategorized",
    subcategorySlug,
    summary: localized(row.description_i18n, row.description || ""),
    description: localized(row.description_i18n, row.description || ""),
    image: {
      src: row.image_url || "/placeholder.svg?height=1000&width=1000",
      width,
      height,
      alt: { en: name.en || name.zh || row.name || "Commercial food machine" },
    },
    isVerifiedImage: Boolean(row.image_url),
  }
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<ProductPage> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  const pageSize = Math.max(1, filters.pageSize || 6)
  const requestedPage = Math.max(1, filters.page || 1)
  if (!db || !tenantId) return { items: [], page: 1, pageSize, total: 0, totalPages: 1 }

  let countQuery = db.from("products").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("is_active", true)
  let dataQuery = db
    .from("products")
    .select("slug,name,name_i18n,description,description_i18n,category_slug,image_url,extra_data")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
  if (filters.category) {
    countQuery = countQuery.eq("category_slug", filters.category)
    dataQuery = dataQuery.eq("category_slug", filters.category)
  }
  if (filters.subcategory) {
    countQuery = countQuery.contains("extra_data", { subcategory: filters.subcategory })
    dataQuery = dataQuery.contains("extra_data", { subcategory: filters.subcategory })
  }
  const { count, error: countError } = await countQuery
  if (countError) throw new Error(`Unable to count products: ${countError.message}`)
  const total = count || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(requestedPage, totalPages)
  const from = (page - 1) * pageSize
  const { data, error } = await dataQuery.order("sort_order").range(from, from + pageSize - 1)
  if (error) throw new Error(`Unable to load products: ${error.message}`)
  return { items: (data as ProductRow[]).map(mapProduct), page, pageSize, total, totalPages }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return null
  const { data, error } = await db
    .from("products")
    .select("slug,name,name_i18n,description,description_i18n,category_slug,image_url,extra_data")
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle()
  if (error) throw new Error(`Unable to load product: ${error.message}`)
  return data ? mapProduct(data as ProductRow) : null
}

export async function fetchRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const page = await fetchProducts({ category: product.categorySlug, pageSize: limit + 1 })
  return page.items.filter((item) => item.slug !== product.slug).slice(0, limit)
}

export async function fetchCategories(): Promise<ProductCategory[]> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return []
  const { data, error } = await db
    .from("product_categories")
    .select("slug,name,name_i18n,description,description_i18n,extra_data")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order")
  if (error) throw new Error(`Unable to load categories: ${error.message}`)
  return (data as CategoryRow[]).map((row) => {
    const subcategories = Array.isArray(row.extra_data?.subcategories)
      ? (row.extra_data?.subcategories as Array<{ slug?: string; name?: string }>).flatMap((item) =>
          item.slug && item.name ? [{ slug: item.slug, name: { en: item.name } }] : [],
        )
      : []
    return {
      slug: row.slug || "category",
      name: localized(row.name_i18n, row.name || "Category"),
      description: localized(row.description_i18n, row.description || ""),
      icon: typeof row.extra_data?.icon === "string" ? row.extra_data.icon : "CookingPot",
      subcategories,
    }
  })
}

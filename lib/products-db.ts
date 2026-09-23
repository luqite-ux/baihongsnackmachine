import { cache } from "react"
import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import type { LocalizedText, Product, ProductCategory } from "@/lib/types"

export interface ProductFilters {
  category?: string
  subcategory?: string
  page?: number
  pageSize?: number
  search?: string
}

export interface ProductPage {
  items: Product[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type ProductRow = {
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
  id: string
  parent_id?: string | null
  slug: string | null
  name: string | null
  name_i18n: LocalizedText | null
  description: string | null
  description_i18n: LocalizedText | null
  extra_data: Record<string, unknown> | null
}

export function mapCategoryHierarchy(rows: CategoryRow[]): ProductCategory[] {
  const childrenByParent = new Map<string, CategoryRow[]>()
  for (const row of rows) {
    if (!row.parent_id) continue
    const children = childrenByParent.get(row.parent_id) || []
    children.push(row)
    childrenByParent.set(row.parent_id, children)
  }

  return rows.filter((row) => !row.parent_id).map((row) => {
    const childRows = childrenByParent.get(row.id) || []
    const embedded = Array.isArray(row.extra_data?.subcategories)
      ? (row.extra_data?.subcategories as Array<{ slug?: string; name?: string }>).flatMap((item) =>
          item.slug && item.name ? [{ slug: item.slug, name: { en: item.name } }] : [],
        )
      : []
    const subcategories = childRows.length > 0
      ? childRows.map((child) => ({ slug: child.slug || "subcategory", name: localized(child.name_i18n, child.name || "Subcategory") }))
      : embedded

    return {
      slug: row.slug || "category",
      name: localized(row.name_i18n, row.name || "Category"),
      description: localized(row.description_i18n, row.description || ""),
      icon: typeof row.extra_data?.icon === "string" ? row.extra_data.icon : "CookingPot",
      subcategories,
    }
  })
}

type CategoryFilterRow = Pick<CategoryRow, "id" | "parent_id" | "slug" | "extra_data">

const fetchCategoryRows = cache(async (tenantId: string): Promise<CategoryRow[]> => {
  const db = getSupabaseClient()
  if (!db) return []
  const { data, error } = await db
    .from("product_categories")
    .select("id,slug,name,name_i18n,description,description_i18n,extra_data,parent_id")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order")
  if (error) throw new Error(`Unable to load categories: ${error.message}`)
  return data as CategoryRow[]
})

export function categoryFilterSlugs(rows: CategoryFilterRow[], category: string, subcategory?: string): string[] {
  const root = rows.find((row) => !row.parent_id && row.slug === category)
  if (!root) return [category]
  const children = rows.filter((row) => row.parent_id === root.id)
  if (subcategory) {
    const child = children.find((row) => row.slug === subcategory || row.extra_data?.public_slug === subcategory)
    return child?.slug ? [child.slug] : [subcategory]
  }
  return [root.slug || category, ...children.flatMap((row) => row.slug ? [row.slug] : [])]
}

function localized(value: LocalizedText | null, fallback: string): LocalizedText {
  if (value && Object.values(value).some(Boolean)) return value
  return { en: fallback }
}

export function mapProduct(row: ProductRow): Product {
  const extra = row.extra_data || {}
  const width = typeof extra.image_width === "number" ? extra.image_width : 1000
  const height = typeof extra.image_height === "number" ? extra.image_height : 1000
  const subcategorySlug = typeof extra.public_subcategory === "string"
    ? extra.public_subcategory
    : typeof extra.subcategory === "string" ? extra.subcategory : undefined
  const categorySlug = typeof extra.parent_category === "string" ? extra.parent_category : row.category_slug || "uncategorized"
  const name = localized(row.name_i18n, row.name || "Commercial Food Machine")
  const rawImages = Array.isArray(extra.images) ? extra.images.filter((item): item is string => typeof item === "string" && item.length > 0) : []
  const imageSources = Array.from(new Set([row.image_url, ...rawImages].filter((item): item is string => Boolean(item))))
  const images = imageSources.map((src) => ({ src, width, height, alt: { en: name.en || name.zh || row.name || "Commercial food machine" } }))
  return {
    slug: row.slug || "product",
    name,
    categorySlug,
    subcategorySlug,
    summary: localized(row.description_i18n, row.description || ""),
    description: localized(row.description_i18n, row.description || ""),
    image: {
      src: row.image_url || "/placeholder.svg?height=1000&width=1000",
      width,
      height,
      alt: { en: name.en || name.zh || row.name || "Commercial food machine" },
    },
    images,
    model: typeof extra.model === "string" && extra.model.trim() ? extra.model.trim() : undefined,
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
    const categoryRows = await fetchCategoryRows(tenantId)
    const slugs = categoryFilterSlugs(categoryRows as CategoryFilterRow[], filters.category, filters.subcategory)
    countQuery = countQuery.in("category_slug", slugs)
    dataQuery = dataQuery.in("category_slug", slugs)
  }
  if (filters.search?.trim()) {
    const term = `%${filters.search.trim().replaceAll("%", "")}%`
    countQuery = countQuery.ilike("name", term)
    dataQuery = dataQuery.ilike("name", term)
  }
  const requestedFrom = (requestedPage - 1) * pageSize
  const requestedTo = requestedPage * pageSize - 1
  const [{ count, error: countError }, requestedData] = await Promise.all([
    countQuery,
    dataQuery.order("sort_order").range(requestedFrom, requestedTo),
  ])
  if (countError) throw new Error(`Unable to count products: ${countError.message}`)
  const total = count || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(requestedPage, totalPages)
  const { data, error } = page === requestedPage
    ? requestedData
    : await dataQuery.order("sort_order").range((page - 1) * pageSize, page * pageSize - 1)
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
  const tenantId = getTenantId()
  if (!tenantId) return []
  return mapCategoryHierarchy(await fetchCategoryRows(tenantId))
}

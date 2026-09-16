import { getSupabaseClient, getTenantId } from "@/lib/supabase"

export type PublishedArticle = {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  updatedAt: string
  featuredImage: string | null
}

function pick(value: Record<string, string> | null, fallback: string | null) {
  return value?.en || value?.zh || fallback || ""
}

export async function getPublishedArticles(limit?: number): Promise<PublishedArticle[]> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return []
  let query = db
    .from("articles")
    .select("slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,published_at,updated_at,featured_image")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error) throw new Error(`Unable to load news: ${error.message}`)
  return (data || []).map((row) => ({
    slug: row.slug || "",
    title: pick(row.title_i18n, row.title),
    excerpt: pick(row.excerpt_i18n, row.excerpt),
    content: pick(row.content_i18n, row.content),
    publishedAt: row.published_at || "",
    updatedAt: row.updated_at || row.published_at || "",
    featuredImage: row.featured_image,
  }))
}

export async function getArticleBySlug(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug) || null
}

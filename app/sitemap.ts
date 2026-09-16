import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { fetchProducts } from "@/lib/products-db"
import { getPublishedArticles } from "@/lib/articles-db"

/**
 * Covers every currently public route. Product and article detail pages
 * are generated from the same sample data used by their pages; once the
 * full 278-product / 47-page catalog is connected by the backend this file
 * will automatically expand with it.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const [productPage, articles] = await Promise.all([
    fetchProducts({ page: 1, pageSize: 1000 }),
    getPublishedArticles(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ]

  const productRoutes: MetadataRoute.Sitemap = productPage.items.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}/news/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.4,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}

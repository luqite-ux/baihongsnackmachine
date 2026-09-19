import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { fetchProducts } from "@/lib/products-db"
import { getPublishedArticles } from "@/lib/articles-db"
import { localizedPaths } from "@/lib/locale"

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
    ["/", "weekly", 1], ["/about", "monthly", 0.7], ["/products", "weekly", 0.9],
    ["/news", "weekly", 0.6], ["/faq", "monthly", 0.5], ["/contact", "monthly", 0.8],
  ].flatMap(([path, changeFrequency, priority]) => localizedPaths(String(path)).map((localizedPath) => ({
    url: `${siteConfig.url}${localizedPath === "/" ? "" : localizedPath}`,
    lastModified: now,
    changeFrequency: changeFrequency as "weekly" | "monthly",
    priority: Number(priority),
    alternates: { languages: { en: `${siteConfig.url}${path === "/" ? "" : path}`, zh: `${siteConfig.url}${localizedPaths(String(path))[1]}`, "x-default": `${siteConfig.url}${path === "/" ? "" : path}` } },
  })))

  const productRoutes: MetadataRoute.Sitemap = productPage.items.flatMap((product) => localizedPaths(`/products/${product.slug}`).map((localizedPath) => ({
    url: `${siteConfig.url}${localizedPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: { languages: { en: `${siteConfig.url}/products/${product.slug}`, zh: `${siteConfig.url}/zh/products/${product.slug}`, "x-default": `${siteConfig.url}/products/${product.slug}` } },
  })))

  const articleRoutes: MetadataRoute.Sitemap = articles.flatMap((article) => localizedPaths(`/news/${article.slug}`).map((localizedPath) => ({
    url: `${siteConfig.url}${localizedPath}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.4,
    alternates: { languages: { en: `${siteConfig.url}/news/${article.slug}`, zh: `${siteConfig.url}/zh/news/${article.slug}`, "x-default": `${siteConfig.url}/news/${article.slug}` } },
  })))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}

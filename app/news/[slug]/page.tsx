import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/articles-db"
import { siteConfig } from "@/lib/site-config"

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  const description = article.excerpt || undefined
  const url = `/news/${article.slug}`
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description, url, type: "article", images: article.featuredImage ? [article.featuredImage] : [siteConfig.logo] },
    twitter: { card: "summary_large_image", title: article.title, description, images: article.featuredImage ? [article.featuredImage] : [siteConfig.logo] },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${siteConfig.url}/news/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || article.publishedAt || undefined,
    image: article.featuredImage || undefined,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}/news/${article.slug}`,
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <h1 className="text-3xl font-bold text-foreground">{article.title}</h1>
      {article.publishedAt && (
        <p className="mt-2 text-sm text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString()}</p>
      )}
      {article.content && <div className="article-prose mt-8" dangerouslySetInnerHTML={{ __html: article.content }} />}
    </article>
  )
}

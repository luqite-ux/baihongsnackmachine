import type { Metadata } from "next"
import Link from "next/link"
import { Newspaper } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { getPublishedArticles } from "@/lib/articles-db"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "News",
  description: "Company news and updates from Xuzhou Baihong Kitchen Equipment Co., Ltd.",
  alternates: { canonical: "/news" },
  openGraph: { title: "News", description: "Company news and updates from Xuzhou Baihong Kitchen Equipment Co., Ltd.", url: "/news", type: "website", images: [siteConfig.logo] },
}

export const revalidate = 60

export default async function NewsPage() {
  const articles = await getPublishedArticles()
  return (
    <>
      <PageHeader eyebrow="News" title="Company News" description="Updates from Baihong will be published here." />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 py-20 text-center">
            <Newspaper className="h-9 w-9 text-muted-foreground" aria-hidden="true" />
            <p className="max-w-sm text-sm text-muted-foreground">
              No news articles have been published yet. Please check back soon, or contact us directly for the
              latest updates.
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <li key={article.slug} className="rounded-lg border border-border p-6">
                <Link href={`/news/${article.slug}`} className="hover:text-primary">
                  <h2 className="line-clamp-2 font-semibold text-foreground">{article.title}</h2>
                </Link>
                {article.publishedAt && <time className="mt-2 block text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString("en-US")}</time>}
                {article.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

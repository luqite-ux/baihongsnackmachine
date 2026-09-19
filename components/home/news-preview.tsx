import Link from "next/link"
import { Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { getPublishedArticles } from "@/lib/articles-db"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export async function NewsPreview({ locale }: { locale: Locale }) {
  const articles = await getPublishedArticles(3, locale)
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{locale === "zh" ? "新闻" : "News"}</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{locale === "zh" ? "公司新闻" : "Company News"}</h2>
        </div>
        <Button asChild variant="outline">
          <Link href={localePath("/news", locale)}>{locale === "zh" ? "查看全部新闻" : "View All News"}</Link>
        </Button>
      </Reveal>

      {articles.length === 0 ? (
        <Reveal delay={100} className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 py-14 text-center">
          <Newspaper className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No news articles have been published yet. Check back soon.</p>
        </Reveal>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <li key={article.slug} className="rounded-lg border border-border p-5">
              <h3 className="line-clamp-2 font-semibold text-foreground">{article.title}</h3>
              {article.publishedAt && <time className="mt-2 block text-xs text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString("en-US")}</time>}
              {article.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

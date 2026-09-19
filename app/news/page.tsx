import type { Metadata } from "next"
import Link from "next/link"
import { Newspaper } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { getPublishedArticles } from "@/lib/articles-db"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"
import { localePath } from "@/lib/locale"
import { buildLocaleAlternates } from "@/lib/seo-locale"

export async function generateMetadata(): Promise<Metadata> { const locale = await getRequestLocale(); const title = locale === "zh" ? "新闻资讯" : "News"; const description = locale === "zh" ? "徐州百泓厨房设备有限公司新闻与动态。" : "Company news and updates from Xuzhou Baihong Kitchen Equipment Co., Ltd."; return { title, description, alternates: buildLocaleAlternates("/news", locale), openGraph: { title, description, url: locale === "zh" ? "/zh/news" : "/news", type: "website", images: [siteConfig.logo] } } }

export const revalidate = 60

export default async function NewsPage() {
  const locale = await getRequestLocale()
  const articles = await getPublishedArticles(undefined, locale)
  return (
    <>
      <PageHeader
        title="NEWS"
        description="A manufacturer specializing in the design, production, and processing of food machinery"
        secondaryDescription="Introducing advanced technology, integrating research and development, manufacturing, and sales internally, possessing comprehensive quality inspection and testing instruments, experienced engineers, and a production and after-sales service team with over 10 years of experience."
      />
      <div className="mx-auto max-w-[1248px] px-5 py-14 md:px-6 lg:px-0">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-4 text-[14px] text-neutral-500">
          <Link href={localePath("/", locale)} className="transition-colors hover:text-[#f39a00]">{locale === "zh" ? "首页" : "HOME"}</Link><span aria-hidden="true">›</span><span>{locale === "zh" ? "新闻资讯" : "NEWS"}</span>
        </nav>
        <h2 className="mb-9 text-[38px] font-black text-neutral-950">{locale === "zh" ? "新闻与资讯" : "News and Information"}</h2>
        {articles.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 py-20 text-center">
            <Newspaper className="h-9 w-9 text-muted-foreground" aria-hidden="true" />
            <p className="max-w-sm text-sm text-muted-foreground">
              No news articles have been published yet. Please check back soon, or contact us directly for the
              latest updates.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <li key={article.slug} className="flex min-h-[235px] flex-col bg-white p-7 shadow-[0_5px_24px_rgba(0,0,0,0.07)]">
                {article.publishedAt && <time className="text-[15px] font-bold text-neutral-500">{new Date(article.publishedAt).toISOString().slice(0, 10)}</time>}
                <Link href={localePath(`/news/${article.slug}`, locale)} className="hover:text-primary">
                  <h3 className="mt-5 line-clamp-3 text-[18px] font-bold leading-6 text-neutral-950">{article.title}</h3>
                </Link>
                {article.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-5 text-neutral-600">{article.excerpt}</p>}
                <Link href={localePath(`/news/${article.slug}`, locale)} className="mt-auto pt-5 text-sm font-bold text-[#f39a00]">{locale === "zh" ? "更多" : "more"} &gt;</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

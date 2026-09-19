import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { faqItems } from "@/lib/data/faq"
import { localePath, resolveText } from "@/lib/locale"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"
import { buildLocaleAlternates } from "@/lib/seo-locale"

export async function generateMetadata(): Promise<Metadata> { const locale = await getRequestLocale(); const title = locale === "zh" ? "常见问题" : "FAQ"; const description = locale === "zh" ? "百泓产品与采购常见问题。" : "Answers to common questions about ordering from Baihong."; return { title, description, alternates: buildLocaleAlternates("/faq", locale), openGraph: { title, description, url: locale === "zh" ? "/zh/faq" : "/faq", type: "website", images: [siteConfig.logo] } } }

export default async function FaqPage() {
  const locale = await getRequestLocale()
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/faq#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: resolveText(item.question, locale),
      acceptedAnswer: { "@type": "Answer", text: resolveText(item.answer, locale) },
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHeader
        title="FAQ"
        description="A manufacturer specializing in the design, production, and processing of food machinery"
        secondaryDescription="Introducing advanced technology, integrating research and development, manufacturing, and sales internally, possessing comprehensive quality inspection and testing instruments, experienced engineers, and a production and after-sales service team with over 10 years of experience."
      />
      <div className="mx-auto max-w-[1248px] px-5 py-14 md:px-6 lg:px-0">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-4 text-[14px] text-neutral-500">
          <Link href={localePath("/", locale)} className="transition-colors hover:text-[#f39a00]">{locale === "zh" ? "首页" : "HOME"}</Link><span aria-hidden="true">›</span><span>{locale === "zh" ? "常见问题" : "FAQ"}</span>
        </nav>
        <h2 className="mb-9 text-[38px] font-black text-neutral-950">{locale === "zh" ? "常见问题" : "Frequently Asked Questions"}</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {faqItems.map((item, i) => (
            <li key={i} className="flex min-h-[250px] flex-col bg-white p-7 shadow-[0_5px_24px_rgba(0,0,0,0.07)]">
              <h3 className="text-[17px] font-bold leading-6 text-neutral-950">{resolveText(item.question, locale)}</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{resolveText(item.answer, locale)}</p>
              <Link href={localePath("/contact", locale)} className="mt-auto pt-5 text-sm font-bold text-[#f39a00]">{locale === "zh" ? "更多" : "more"} &gt;</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

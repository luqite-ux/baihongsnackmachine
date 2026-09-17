import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { faqItems } from "@/lib/data/faq"
import { resolveText } from "@/lib/locale"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ordering from Baihong.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ", description: "Answers to common questions about ordering from Baihong.", url: "/faq", type: "website", images: [siteConfig.logo] },
}

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/faq#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: resolveText(item.question),
      acceptedAnswer: { "@type": "Answer", text: resolveText(item.answer) },
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
          <Link href="/" className="transition-colors hover:text-[#f39a00]">HOME</Link><span aria-hidden="true">›</span><span>FAQ</span>
        </nav>
        <h2 className="mb-9 text-[38px] font-black text-neutral-950">Frequently Asked Questions</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {faqItems.map((item, i) => (
            <li key={i} className="flex min-h-[250px] flex-col bg-white p-7 shadow-[0_5px_24px_rgba(0,0,0,0.07)]">
              <h3 className="text-[17px] font-bold leading-6 text-neutral-950">{resolveText(item.question)}</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{resolveText(item.answer)}</p>
              <Link href="/contact" className="mt-auto pt-5 text-sm font-bold text-[#f39a00]">more &gt;</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

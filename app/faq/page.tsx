import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
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
        description={siteConfig.positioning}
        secondaryDescription="Introducing advanced technology, integrating research and development, manufacturing and sales internally, with complete quality inspection instruments and an experienced production and service team."
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-black text-foreground">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{resolveText(item.question)}</AccordionTrigger>
              <AccordionContent>{resolveText(item.answer)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-lg border border-border bg-secondary/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">Still have a question?</p>
          <Button asChild className="mt-3">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

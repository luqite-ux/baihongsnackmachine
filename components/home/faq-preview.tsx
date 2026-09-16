import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { faqItems } from "@/lib/data/faq"
import { resolveText } from "@/lib/locale"

export function FaqPreview() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
          <h2 className="mt-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <Accordion type="single" collapsible>
            {faqItems.slice(0, 3).map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{resolveText(item.question)}</AccordionTrigger>
                <AccordionContent>{resolveText(item.answer)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/site-config"

export function CtaSection() {
  return (
    <section className="bg-primary py-14 text-primary-foreground">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to Discuss Your Snack Equipment Order?</h2>
        <p className="max-w-xl text-primary-foreground/90">
          Send your requirement and our team will follow up with pricing and options.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
            <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
            <a href={siteConfig.phoneHref}>
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}

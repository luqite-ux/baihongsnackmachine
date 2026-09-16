import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/site-config"

export function CtaSection() {
  return (
    <section className="bg-[#f39a00] py-10 text-white">
      <Reveal className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 text-center lg:px-0">
        <h2 className="text-2xl font-black uppercase sm:text-3xl">Quality Service</h2>
        <p className="max-w-xl text-white/90">
          Send your requirement and our team will follow up with pricing and options.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary" className="rounded-none bg-neutral-950 text-white hover:bg-white hover:text-neutral-950">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-none border-white bg-transparent text-white hover:bg-white hover:text-neutral-950">
            <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-none border-white bg-transparent text-white hover:bg-white hover:text-neutral-950">
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

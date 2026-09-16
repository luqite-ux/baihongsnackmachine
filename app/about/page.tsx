import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Factory, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { PageHeader } from "@/components/page-header"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About Us",
  description: siteConfig.positioning,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Us", description: siteConfig.positioning, url: "/about", type: "website" },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={siteConfig.legalNameEn}
        description={siteConfig.positioning}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/about/factory.jpg"
                alt="Entrance to the Xuzhou Baihong Kitchen Equipment Co., Ltd. facility"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Who We Are</p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{siteConfig.brand}</h2>
            <p className="text-muted-foreground">
              {siteConfig.legalNameEn} ({siteConfig.legalNameZh}) is a manufacturer specializing in the design,
              production and processing of food machinery, supplying commercial snack and kitchen equipment under
              the BAIHONG brand.
            </p>
            <p className="text-muted-foreground">
              Our facility is located at {siteConfig.address}.
            </p>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-4">
              <Factory className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Design, production and processing are carried out in-house at our Xuzhou facility.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Get in Touch</h2>
            <p className="mt-3 text-muted-foreground">
              Reach out directly, or use the contact form to send your equipment requirement.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-8">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              {siteConfig.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              {siteConfig.email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {siteConfig.address}
            </span>
          </Reveal>
          <Reveal delay={150} className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}

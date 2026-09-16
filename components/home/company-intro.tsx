import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/site-config"

export function CompanyIntro() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal as="div">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/about/factory.jpg"
              alt="Xuzhou Baihong Kitchen Equipment Co., Ltd. factory entrance"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal as="div" delay={100}>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">About Baihong</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{siteConfig.legalNameEn}</h2>
          <p className="mt-4 text-muted-foreground">{siteConfig.positioning}</p>
          <p className="mt-3 text-muted-foreground">
            Based in Tongshan District, Xuzhou City, Jiangsu Province, Baihong supplies commercial grills, aluminum
            plate machines, fryers and other snack-machinery equipment under the BAIHONG brand.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/site-config"

export function CompanyIntro() {
  return (
    <>
      <section className="bg-[#f39a00] py-8 text-white">
        <Reveal className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-4 text-center sm:flex-row sm:text-left lg:px-0">
          <div>
            <p className="text-4xl font-black leading-none">13+</p>
            <h2 className="mt-1 text-lg font-bold uppercase tracking-wide">Years of Manufacturing Experience</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-white/90">
            Focused on the design, production and processing of commercial food machinery.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1200px] px-4 py-14 lg:px-0">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal as="div">
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
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
          <p className="text-sm font-bold uppercase tracking-wide text-[#f39a00]">About Us</p>
          <h2 className="mt-2 text-2xl font-black text-neutral-950 sm:text-3xl">{siteConfig.legalNameEn}</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">{siteConfig.positioning}</p>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            Based in Tongshan District, Xuzhou City, Jiangsu Province, Baihong supplies commercial grills, aluminum
            plate machines, fryers and other snack-machinery equipment under the BAIHONG brand.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-none border-neutral-900 font-bold uppercase hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </Reveal>
      </div>
      </section>
    </>
  )
}

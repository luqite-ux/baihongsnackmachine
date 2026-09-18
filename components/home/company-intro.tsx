import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/site-config"

export function CompanyIntro() {
  return (
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
          <p className="mt-4 text-sm font-semibold leading-7 text-neutral-700">
            The company was established in 2013, with the establishment of Tongshan District Baiping Machinery Factory in 2013 and the establishment of Xuzhou Baihong Kitchen Equipment Co., Ltd. in 2018. Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines, cotton candy machines, etc. We introduce advanced equipment and technology, and integrate research and development, manufacturing, and sales internally. We have complete quality inspection and testing instruments, experienced engineers, and a production and after-sales service team of more than 10 years.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-none border-neutral-900 font-bold uppercase hover:border-[#f39a00] hover:bg-[#f39a00] hover:text-white">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"

export function ProductDisplayHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#061c34] text-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] opacity-90 max-md:w-full max-md:opacity-45">
        <Image
          src="/images/banners/banner-2.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-contain object-right md:object-cover md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061c34] via-[#061c34]/75 to-[#061c34]/5" />
      </div>
      <div className="relative mx-auto flex min-h-[250px] max-w-[1200px] items-center px-4 py-12 lg:px-0">
        <Reveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f39a00]">Baihong Equipment</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">PRODUCT DISPLAY</h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/80">
            Commercial barbecue grills, aluminum plate machines, fryers and snack equipment for food-service buyers.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

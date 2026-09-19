import Image from "next/image"
import type { Locale } from "@/lib/types"

export function ProductDisplayHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/banners/product-display-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center max-md:object-left"
        />
        <div className="absolute inset-0 bg-black/35 md:hidden" />
      </div>
      <div className="relative mx-auto grid min-h-[445px] max-w-[1248px] items-center gap-4 px-5 py-10 md:h-[445px] md:min-h-0 md:grid-cols-[53%_47%] md:px-6 md:py-0 lg:px-0">
        <div className="relative z-10 max-w-[650px] self-center">
          <h1 className="text-[40px] font-black leading-none tracking-[0.01em] sm:text-[50px]">{locale === "zh" ? "产品展示" : "PRODUCT DISPLAY"}</h1>
          <p className="mt-7 max-w-[620px] text-[17px] font-bold leading-[1.35]">
            {locale === "zh" ? "专注于食品机械设计、生产与加工的制造商" : "A manufacturer specializing in the design, production, and processing of food machinery"}
          </p>
          <p className="mt-4 max-w-[650px] text-[17px] font-bold leading-[1.35]">
            {locale === "zh" ? "引进设备与技术，集研发、制造和销售于一体，配备质量检测仪器，并拥有经验丰富的工程、生产及售后服务团队。" : "Introducing advanced technology, integrating research and development, manufacturing, and sales internally, possessing comprehensive quality inspection and testing instruments, experienced engineers, and a production and after-sales service team with over 10 years of experience."}
          </p>
        </div>
        <div className="relative mx-auto aspect-[880/658] w-full max-w-[590px] self-center max-md:mt-2 max-md:max-w-[430px]">
          <Image src="/images/banners/product-display-collage.png" alt="Baihong product range" fill priority sizes="(min-width: 768px) 47vw, 92vw" className="object-contain" />
        </div>
      </div>
    </section>
  )
}

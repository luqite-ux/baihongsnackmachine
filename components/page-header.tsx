import type { ReactNode } from "react"
import Image from "next/image"

export function PageHeader({
  eyebrow,
  title,
  description,
  secondaryDescription,
  variant = "image",
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  secondaryDescription?: string
  variant?: "image" | "solid"
  children?: ReactNode
}) {
  return (
    <section
      data-testid="legacy-page-hero"
      className="relative isolate overflow-hidden bg-black text-white"
    >
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
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f39a00]">{eyebrow}</p>}
          <h1 className="text-[40px] font-black uppercase leading-none tracking-[0.01em] sm:text-[50px]">{title}</h1>
          {description && <p className="mt-7 max-w-[620px] text-[17px] font-bold leading-[1.35] text-white">{description}</p>}
          {secondaryDescription && <p className="mt-4 max-w-[650px] text-[17px] font-bold leading-[1.35] text-white">{secondaryDescription}</p>}
          {children}
        </div>
        <div className="relative mx-auto aspect-[880/658] w-full max-w-[590px] self-center max-md:mt-2 max-md:max-w-[430px]">
          <Image
            src="/images/banners/product-display-collage.png"
            alt="Baihong product range"
            fill
            priority
            sizes="(min-width: 768px) 47vw, 92vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}

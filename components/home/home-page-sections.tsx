import type { ReactNode } from "react"
import { BannerCarousel, type BannerSlide } from "@/components/home/banner-carousel"
import { PopularSearch } from "@/components/home/popular-search"
import { HomeProductCatalog } from "@/components/home/home-product-catalog"
import { CompanyIntro } from "@/components/home/company-intro"
import { CapabilitySection } from "@/components/home/capability-section"
import { CtaSection } from "@/components/home/cta-section"
import { FaqPreview } from "@/components/home/faq-preview"
import type { Locale, Product, ProductCategory } from "@/lib/types"

export function HomePageSections({
  slides,
  categories,
  products,
  newsSlot,
  locale = "en",
}: {
  slides: BannerSlide[]
  categories: ProductCategory[]
  products: Product[]
  newsSlot: ReactNode
  locale?: Locale
}) {
  return (
    <>
      <BannerCarousel slides={slides} />
      <PopularSearch categories={categories} locale={locale} />
      <HomeProductCatalog categories={categories} products={products} locale={locale} />
      <CompanyIntro />
      <CapabilitySection locale={locale} />
      <CtaSection />
      {newsSlot}
      <FaqPreview locale={locale} />
    </>
  )
}

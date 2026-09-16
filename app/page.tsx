import { BannerCarousel } from "@/components/home/banner-carousel"
import { CompanyIntro } from "@/components/home/company-intro"
import { CategoriesGrid } from "@/components/home/categories-grid"
import { CapabilitySection } from "@/components/home/capability-section"
import { FaqPreview } from "@/components/home/faq-preview"
import { NewsPreview } from "@/components/home/news-preview"
import { CtaSection } from "@/components/home/cta-section"
import { fetchBannerSlides } from "@/lib/data/banners"

export const revalidate = 60

export default async function HomePage() {
  const bannerSlides = await fetchBannerSlides()
  return (
    <>
      <BannerCarousel slides={bannerSlides} />
      <CompanyIntro />
      <CategoriesGrid />
      <CapabilitySection />
      <NewsPreview />
      <FaqPreview />
      <CtaSection />
    </>
  )
}

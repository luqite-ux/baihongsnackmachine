import type { BannerSlide } from "@/components/home/banner-carousel"
import { getSupabaseClient, getTenantId } from "@/lib/supabase"

/**
 * The three approved customer Banner images, kept as full-width visual
 * assets. Each has an explicit focal position for both desktop and the
 * 390px mobile safe area instead of a blind center crop.
 */
export const bannerSlides: BannerSlide[] = [
  {
    id: "grill",
    image: "/images/banners/banner-1.jpg",
    desktopFocalPosition: "center 38%",
    mobileFocalPosition: "28% 38%",
    eyebrow: "Commercial Grill Equipment",
    title: "BLACK DIAMOND BBQ GRILL",
    body: "Faster heating speed. Higher temperature up to 850 °C. Suitable for group dining, barbecue parties, stall setups and shop barbecues.",
    bullets: ["High Temperature Resistance", "Customization Supported", "Easy To Clean", "Sturdy and Durable"],
    ctaLabel: "Request a Quote",
    ctaHref: "/contact",
  },
  {
    id: "collection",
    image: "/images/banners/banner-2.jpg",
    desktopFocalPosition: "center 42%",
    mobileFocalPosition: "78% 42%",
    eyebrow: "ODM & OEM",
    title: "R&D, MANUFACTURING AND SALES",
    body: "Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines and cotton candy machines.",
    bullets: ["Quality inspection instruments", "Experienced engineers", "Production team", "After-sales service team"],
    ctaLabel: "View Products",
    ctaHref: "/products",
  },
  {
    id: "manufacturing",
    image: "/images/banners/banner-3.jpg",
    desktopFocalPosition: "center 50%",
    mobileFocalPosition: "58% 50%",
    eyebrow: "Baihong Manufacturing",
    title: "DESIGN, PRODUCTION & PROCESSING",
    body: "Xuzhou Baihong Kitchen Equipment Co., Ltd. specializes in the design, production and processing of food machinery.",
    bullets: ["6000 m² factory area", "3 workshops", "6 production lines", "Published monthly capacity: 30000"],
    ctaLabel: "About Baihong",
    ctaHref: "/about",
  },
]

export async function fetchBannerSlides(): Promise<BannerSlide[]> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return bannerSlides
  const { data } = await db.from("tenants").select("extra_settings").eq("id", tenantId).maybeSingle()
  const images = data?.extra_settings?.site_assets?.banners
  if (!Array.isArray(images) || images.length !== bannerSlides.length) return bannerSlides
  return bannerSlides.map((slide, index) => ({ ...slide, image: typeof images[index] === "string" ? images[index] : slide.image }))
}

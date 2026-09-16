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
    eyebrow: "Grill Equipment",
    title: "Commercial Barbecue Grills Built for Volume",
    body: "Smokeless gas and electric barbecue grills designed for busy snack stalls and commercial kitchens.",
    ctaLabel: "Request a Quote",
    ctaHref: "/contact",
  },
  {
    id: "collection",
    image: "/images/banners/banner-2.jpg",
    desktopFocalPosition: "center 42%",
    mobileFocalPosition: "78% 42%",
    eyebrow: "Full Product Line",
    title: "A Complete Line of Snack & Aluminum Plate Equipment",
    body: "From grills to octopus ball machines and iron plate cookers, Baihong covers the equipment a snack operation needs.",
    ctaLabel: "View Products",
    ctaHref: "/products",
  },
  {
    id: "manufacturing",
    image: "/images/banners/banner-3.jpg",
    desktopFocalPosition: "center 50%",
    mobileFocalPosition: "58% 50%",
    eyebrow: "Manufacturing",
    title: "Designed, Produced and Processed In-House",
    body: "Xuzhou Baihong Kitchen Equipment Co., Ltd. specializes in the design, production and processing of food machinery.",
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

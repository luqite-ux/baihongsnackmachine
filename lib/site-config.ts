/**
 * Verified company identity and contact facts only. Do not add
 * certifications, capacity figures, export countries or client claims here
 * unless they are confirmed by the source site.
 */
export const siteConfig = {
  brand: "BAIHONG",
  legalNameEn: "Xuzhou Baihong Kitchen Equipment Co., Ltd.",
  legalNameZh: "徐州百泓厨房设备有限公司",
  positioning: "A manufacturer specializing in the design, production and processing of food machinery.",
  url: "https://baihongsnackmachine.com",
  phone: "+86 15252102737",
  phoneHref: "tel:+8615252102737",
  whatsappHref: "https://wa.me/8615252102737",
  email: "info@baihongsnackmachine.com",
  emailHref: "mailto:info@baihongsnackmachine.com",
  address: "Group 3, Dailou Village, Zhengji Town, Tongshan District, Xuzhou City, Jiangsu Province",
  logo: "/images/brand/baihong-logo.png",
} as const

export const legacyRouteMap: Record<string, string> = {
  "/sy": "/",
  "/xwzx": "/about",
  "/skhx": "/products",
  "/lxwm": "/news",
  "/gywm": "/faq",
  "/gywm_05191117_662": "/contact",
}

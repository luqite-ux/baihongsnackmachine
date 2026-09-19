import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { navItems } from "@/lib/nav"
import { siteConfig } from "@/lib/site-config"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const year = new Date().getFullYear()
  const copyrightOwner = siteConfig.legalNameEn.replace(/[.;:!?。；：！？\s]+$/u, "")
  const copyright = locale === "zh" ? `© ${year} 徐州百泓厨房设备有限公司。保留所有权利。` : `© ${year} ${copyrightOwner}. All rights reserved.`
  const productLinks = [
    { label: "Barbecue Grill", href: "/products?category=grill" },
    { label: "Hamburger Grill", href: "/products?category=aluminum-plate" },
    { label: "Sausage Oven", href: "/products?q=sausage" },
    { label: "Bird Egg Grill", href: "/products?q=bird+egg" },
    { label: "Octopus Ball Machine", href: "/products?q=octopus" },
    { label: "Deep Fryer, Grill", href: "/products?category=deep-fryer" },
    { label: "Popcorn Maker", href: "/products?category=popcorn-machine" },
    { label: "Marshmallow Maker", href: "/products?q=marshmallow" },
  ]

  return (
    <footer className="border-t-4 border-[#f39a00] bg-[#111] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
        <div>
          <div className="inline-flex bg-white p-2">
            <Logo locale={locale} imageClassName="h-20 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">{locale === "zh" ? "专注于食品机械设计、生产与加工的制造商。" : siteConfig.positioning}</p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">{locale === "zh" ? "快速链接" : "Quick Links"}</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={localePath(item.href, locale)} className="text-white/65 hover:text-[#f39a00]">
                  {locale === "zh" ? ({ Home: "首页", "About Us": "关于我们", Products: "产品中心", News: "新闻资讯", FAQ: "常见问题", Contact: "联系我们" }[item.label] ?? item.label) : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product category links" className="text-sm">
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">{locale === "zh" ? "主要产品" : "Main Products"}</h2>
          <ul className="mt-3 space-y-2">
            {productLinks.map((item) => (
              <li key={item.href}>
                <Link href={localePath(item.href, locale)} className="text-white/65 hover:text-[#f39a00]">
                  {locale === "zh" ? ({ "Barbecue Grill": "烧烤炉", "Hamburger Grill": "汉堡炉", "Sausage Oven": "香肠机", "Bird Egg Grill": "鹌鹑蛋机", "Octopus Ball Machine": "章鱼小丸子机", "Deep Fryer, Grill": "油炸炉与煎炉", "Popcorn Maker": "爆米花机", "Marshmallow Maker": "棉花糖机" }[item.label] ?? item.label) : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">{locale === "zh" ? "联系方式" : "Contact Information"}</h2>
          <ul className="mt-3 space-y-3 text-white/65">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#f39a00]" aria-hidden="true" />
              <a href={siteConfig.phoneHref} className="hover:text-[#f39a00]">
                {siteConfig.phone} (WhatsApp)
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#f39a00]" aria-hidden="true" />
              <a href={siteConfig.emailHref} className="hover:text-[#f39a00]">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f39a00]" aria-hidden="true" />
              <span>{locale === "zh" ? "江苏省徐州市铜山区郑集镇代楼村三组" : siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#0b0b0b]">
        <p className="mx-auto max-w-[1200px] px-4 py-4 text-xs text-white/55 lg:px-0">
          {copyright}
        </p>
      </div>
    </footer>
  )
}

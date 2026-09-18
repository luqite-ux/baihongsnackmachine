import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { navItems } from "@/lib/nav"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const year = new Date().getFullYear()
  const copyrightOwner = siteConfig.legalNameEn.replace(/[.;:!?。；：！？\s]+$/u, "")
  const copyright = `© ${year} ${copyrightOwner}. All rights reserved.`
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
            <Logo imageClassName="h-20 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">{siteConfig.positioning}</p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/65 hover:text-[#f39a00]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product category links" className="text-sm">
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">Main Products</h2>
          <ul className="mt-3 space-y-2">
            {productLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/65 hover:text-[#f39a00]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">Contact Information</h2>
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
              <span>{siteConfig.address}</span>
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

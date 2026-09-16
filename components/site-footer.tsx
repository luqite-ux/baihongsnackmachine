import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { navItems } from "@/lib/nav"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const year = new Date().getFullYear()
  const copyrightOwner = siteConfig.legalNameEn.replace(/[.;:!?。；：！？\s]+$/u, "")
  const productLinks = [
    { label: "Grill", href: "/products?category=grill" },
    { label: "Aluminum Plate Category", href: "/products?category=aluminum-plate" },
    { label: "Deep Fryer", href: "/products?category=deep-fryer" },
    { label: "Popcorn Machine", href: "/products?category=popcorn-machine" },
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
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">Product Categories</h2>
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
          <h2 className="border-l-2 border-[#f39a00] pl-3 text-base font-bold uppercase">Contact</h2>
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
          © {year} {copyrightOwner}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

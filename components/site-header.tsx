import Link from "next/link"
import { Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  return (
    <header className="relative z-50 w-full border-b border-neutral-200 bg-white text-neutral-950">
      <div className="hidden border-b border-neutral-200 bg-white md:block">
        <div className="mx-auto flex h-9 max-w-[1200px] items-stretch justify-between px-4 text-[12px] lg:px-0">
          <p className="flex items-center text-neutral-600">{siteConfig.positioning}</p>
          <div className="flex items-center gap-5 bg-[#f39a00] px-5 font-semibold text-white">
            <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:text-neutral-950">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <span aria-label="Current language">EN</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-[78px] max-w-[1200px] items-center justify-between gap-5 px-4 lg:px-0">
        <Logo />
        <MainNav />
        <MobileNav />
      </div>
    </header>
  )
}

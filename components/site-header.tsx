import Link from "next/link"
import { Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { siteConfig } from "@/lib/site-config"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Locale } from "@/lib/types"

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="relative z-50 w-full border-b border-neutral-200 bg-white text-neutral-950">
      <div className="hidden border-b border-neutral-200 bg-white md:block">
        <div className="mx-auto flex h-[50px] max-w-[1250px] items-stretch justify-between px-6 text-[16px] lg:px-0">
          <p className="flex items-center font-bold text-neutral-950">{locale === "zh" ? "专注于食品机械设计、生产与加工的制造商" : siteConfig.positioning}</p>
          <div className="flex items-stretch bg-[#f39a00] font-semibold text-white">
            <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:text-neutral-950">
              <Phone className="ml-8 h-5 w-5" aria-hidden="true" />
              <span className="px-3 text-[17px]">{locale === "zh" ? "服务热线" : "Service Hotline"}： {siteConfig.phone}</span>
            </a>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
      <div data-testid="primary-header-row" className="mx-auto flex h-[76px] max-w-[1250px] items-center justify-between gap-8 px-6 md:h-[130px] lg:px-0">
        <Logo locale={locale} imageClassName="h-14 w-auto object-contain md:h-[112px]" />
        <MainNav locale={locale} />
        <MobileNav locale={locale} />
      </div>
    </header>
  )
}

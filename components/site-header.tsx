import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="hidden border-b border-border bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:opacity-90">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a href={siteConfig.emailHref} className="flex items-center gap-1.5 hover:opacity-90">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <MainNav />
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

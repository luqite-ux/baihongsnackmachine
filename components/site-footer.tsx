import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { navItems } from "@/lib/nav"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{siteConfig.positioning}</p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="font-semibold text-foreground">Site</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="font-semibold text-foreground">Contact</h2>
          <ul className="mt-3 space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={siteConfig.phoneHref} className="hover:text-primary">
                {siteConfig.phone} (WhatsApp)
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={siteConfig.emailHref} className="hover:text-primary">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {year} {siteConfig.legalNameEn} All rights reserved.
        </p>
      </div>
    </footer>
  )
}

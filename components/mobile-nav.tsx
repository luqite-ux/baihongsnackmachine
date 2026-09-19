"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { localePath, stripLocalePrefix } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const plainPathname = stripLocalePrefix(pathname).pathname
  const zhLabels: Record<string, string> = { Home: "首页", "About Us": "关于我们", Products: "产品中心", News: "新闻资讯", FAQ: "常见问题", Contact: "联系我们" }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="rounded-none text-neutral-950 hover:bg-[#f39a00] hover:text-white"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </Button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-40 border-b border-neutral-200 bg-white shadow-lg"
        >
          <nav aria-label="Mobile" className="flex flex-col px-4 py-3">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? plainPathname === "/" : plainPathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={localePath(item.href, locale)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "border-b border-neutral-100 px-3 py-3 text-sm font-bold uppercase text-neutral-800 hover:bg-neutral-100 hover:text-[#f39a00]",
                    isActive && "text-[#f39a00]",
                  )}
                >
                  {locale === "zh" ? zhLabels[item.label] : item.label}
                </Link>
              )
            })}
            <Link
              href={localePath("/contact", locale)}
              onClick={() => setOpen(false)}
              className="mt-3 bg-[#f39a00] px-3 py-3 text-center text-sm font-bold uppercase text-white"
            >
              {locale === "zh" ? "获取报价" : "Request a Quote"}
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

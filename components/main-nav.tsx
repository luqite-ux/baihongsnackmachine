"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { localePath, stripLocalePrefix } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function MainNav({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const plainPathname = stripLocalePrefix(pathname).pathname
  const zhLabels: Record<string, string> = { Home: "首页", "About Us": "关于我们", Products: "产品中心", News: "新闻资讯", FAQ: "常见问题", Contact: "联系我们" }

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-8 text-[18px] font-bold uppercase">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? plainPathname === "/" : plainPathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={localePath(item.href, locale)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative block px-4 py-8 text-neutral-950 transition-colors hover:text-[#f39a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39a00]",
                  isActive && "text-[#f39a00]",
                )}
              >
                {(locale === "zh" ? zhLabels[item.label] : item.label).toUpperCase()}
                {isActive && <span className="absolute inset-x-5 bottom-4 h-0.5 bg-[#f39a00]" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

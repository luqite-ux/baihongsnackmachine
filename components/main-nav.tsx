"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-0 text-[13px] font-bold uppercase tracking-[0.02em]">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative block px-5 py-7 text-neutral-950 transition-colors hover:text-[#f39a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39a00]",
                  isActive && "text-[#f39a00]",
                )}
              >
                {item.label.toUpperCase()}
                {isActive && <span className="absolute inset-x-5 bottom-4 h-0.5 bg-[#f39a00]" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

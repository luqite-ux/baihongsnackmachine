"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-2 text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                  isActive && "text-primary",
                )}
              >
                {item.label}
                {isActive && <span className="absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full bg-primary" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

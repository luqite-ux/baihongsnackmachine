"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </Button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-[57px] z-40 border-b border-border bg-background shadow-lg"
        >
          <nav aria-label="Mobile" className="flex flex-col px-4 py-3">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary",
                    isActive && "bg-muted text-primary",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-base font-semibold text-primary-foreground"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

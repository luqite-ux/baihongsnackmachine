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
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "border-b border-neutral-100 px-3 py-3 text-sm font-bold uppercase text-neutral-800 hover:bg-neutral-100 hover:text-[#f39a00]",
                    isActive && "text-[#f39a00]",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 bg-[#f39a00] px-3 py-3 text-center text-sm font-bold uppercase text-white"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

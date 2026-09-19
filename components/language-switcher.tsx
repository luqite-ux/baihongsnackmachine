"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

const languages: Array<{ label: string; code: Locale }> = [
  { label: "English", code: "en" },
  { label: "简体中文", code: "zh" },
]

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="relative h-full">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
        className="flex h-full min-w-32 items-center justify-between gap-5 bg-black px-4 text-[16px] font-bold text-white"
      >
        {locale === "zh" ? "简体中文" : "English"} <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </button>
      {open && (
        <div role="menu" onMouseLeave={() => setOpen(false)} className="absolute right-0 top-full z-[70] min-w-32 bg-black py-1 text-white shadow-xl">
          {languages.map((language) => (
            <Link key={language.code} role="menuitem" href={localePath(pathname, language.code)} className="block w-full px-4 py-2 text-left text-[15px] font-bold hover:bg-[#f39a00] focus:bg-[#f39a00]">
              {language.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

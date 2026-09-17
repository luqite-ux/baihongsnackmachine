"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { ChevronDown } from "lucide-react"

const languages = [
  { label: "English", code: "en" },
  { label: "日本語", code: "ja" },
  { label: "한국어", code: "ko" },
  { label: "Español", code: "es" },
  { label: "Русский", code: "ru" },
]

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: new (options: object, elementId: string) => unknown } }
    googleTranslateElementInit?: () => void
  }
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "en,ja,ko,es,ru", autoDisplay: false }, "google_translate_element")
      }
    }
  }, [])

  function choose(code: string) {
    document.cookie = `googtrans=/en/${code};path=/`
    document.cookie = `googtrans=/en/${code};path=/;domain=.${location.hostname}`
    location.reload()
  }

  return (
    <div className="relative h-full">
      <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
        className="flex h-full min-w-32 items-center justify-between gap-5 bg-black px-4 text-[16px] font-bold text-white"
      >
        English <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </button>
      {open && (
        <div role="menu" onMouseLeave={() => setOpen(false)} className="absolute right-0 top-full z-[70] min-w-32 bg-black py-1 text-white shadow-xl">
          {languages.map((language) => (
            <button key={language.code} role="menuitem" type="button" onClick={() => choose(language.code)} className="block w-full px-4 py-2 text-left text-[15px] font-bold hover:bg-[#f39a00] focus:bg-[#f39a00]">
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

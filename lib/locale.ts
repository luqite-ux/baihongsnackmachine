import { DEFAULT_LOCALE, type Locale, type LocalizedText } from "./types"

/**
 * Resolves a localized text field using: requested locale -> default locale
 * -> first non-empty locale. Keeps every component locale-ready even though
 * only English copy exists at launch.
 */
export function resolveText(text: LocalizedText | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!text) return ""
  if (text[locale]) return text[locale] as string
  if (text[DEFAULT_LOCALE]) return text[DEFAULT_LOCALE] as string
  const firstNonEmpty = Object.values(text).find((value) => Boolean(value))
  return firstNonEmpty ?? ""
}

export function stripLocalePrefix(pathname: string): { locale: Locale; pathname: string } {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    return { locale: "zh", pathname: pathname.slice(3) || "/" }
  }
  return { locale: "en", pathname }
}

export function localePath(path: string, locale: Locale): string {
  const [pathname, suffix = ""] = path.split(/(?=[?#])/u, 2)
  const normalized = stripLocalePrefix(pathname || "/").pathname
  return `${locale === "zh" ? `/zh${normalized === "/" ? "" : normalized}` : normalized}${suffix}` || "/"
}

export function localizedPaths(path: string): string[] {
  return [localePath(path, "en"), localePath(path, "zh")]
}

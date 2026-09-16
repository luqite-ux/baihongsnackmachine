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

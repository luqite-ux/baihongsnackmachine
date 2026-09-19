import type { Metadata } from "next"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function buildLocaleAlternates(path: string, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(path, locale),
    languages: { en: localePath(path, "en"), "zh-CN": localePath(path, "zh"), "x-default": localePath(path, "en") },
  }
}

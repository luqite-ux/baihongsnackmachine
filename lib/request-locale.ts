import { headers } from "next/headers"
import type { Locale } from "@/lib/types"

export async function getRequestLocale(): Promise<Locale> {
  return (await headers()).get("x-site-locale") === "zh" ? "zh" : "en"
}

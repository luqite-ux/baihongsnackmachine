import { describe, expect, test } from "vitest"
import { localizedPaths, localePath, stripLocalePrefix } from "@/lib/locale"
import { buildLocaleAlternates } from "@/lib/seo-locale"

describe("formal English and Chinese routes", () => {
  test("uses unprefixed English URLs and /zh Chinese URLs", () => {
    expect(localePath("/products?category=grill", "en")).toBe("/products?category=grill")
    expect(localePath("/products?category=grill", "zh")).toBe("/zh/products?category=grill")
    expect(stripLocalePrefix("/zh/products")).toEqual({ locale: "zh", pathname: "/products" })
    expect(stripLocalePrefix("/products")).toEqual({ locale: "en", pathname: "/products" })
  })

  test("expands every public route into English and Chinese sitemap paths", () => {
    expect(localizedPaths("/products/item-1")).toEqual(["/products/item-1", "/zh/products/item-1"])
  })

  test("builds locale-specific canonical and bidirectional language alternates", () => {
    expect(buildLocaleAlternates("/products", "zh")).toEqual({
      canonical: "/zh/products",
      languages: { en: "/products", "zh-CN": "/zh/products", "x-default": "/products" },
    })
  })
})

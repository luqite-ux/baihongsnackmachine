import { describe, expect, test } from "vitest"
import { buildLegacyRedirects } from "@/lib/legacy-redirects.mjs"

describe("legacy route coverage", () => {
  test("maps every public product and news detail URL to its migrated route", () => {
    const redirects = buildLegacyRedirects()
    const productRedirects = redirects.filter((item) => item.source.startsWith("/productinfo/"))
    const newsRedirects = redirects.filter((item) => item.source.startsWith("/newsinfo/"))

    expect(productRedirects).toHaveLength(278)
    expect(newsRedirects).toHaveLength(4)
    expect(redirects).toContainEqual({
      source: "/productinfo/1583100.html",
      destination: "/products/60-manual-barbecue-grill-1583100",
      permanent: true,
    })
    expect(redirects).toContainEqual({
      source: "/newsinfo/1142077.html",
      destination: "/news/complete-guide-to-choosing-the-perfect-electric-grill",
      permanent: true,
    })
  })
})

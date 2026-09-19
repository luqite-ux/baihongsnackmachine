import fs from "node:fs"
import path from "node:path"

export const legacyStaticRedirects = [
  { source: "/sy", destination: "/", permanent: true },
  { source: "/xwzx", destination: "/about", permanent: true },
  { source: "/skhx", destination: "/products", permanent: true },
  { source: "/lxwm", destination: "/news", permanent: true },
  { source: "/gywm", destination: "/faq", permanent: true },
  { source: "/gywm_05191117_662", destination: "/contact", permanent: true },
]

export const legacyNewsRedirects = [
  ["1142077", "complete-guide-to-choosing-the-perfect-electric-grill"],
  ["1142076", "healthier-way-to-grill-electric-barbecues"],
  ["1137332", "is-cooking-with-deep-fryers-safe"],
  ["1137331", "heat-retention-and-fuel-efficiency-in-modern-barbecue-grills"],
].map(([id, slug]) => ({ source: `/newsinfo/${id}.html`, destination: `/news/${slug}`, permanent: true }))

export function buildLegacyProductRedirects() {
  const catalogPath = path.resolve(process.cwd(), ".codex-delivery/catalog/catalog.json")
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"))
  return catalog.products.map((product) => ({
    source: `/productinfo/${product.sourceId}.html`,
    destination: `/products/${product.slug}`,
    permanent: true,
  }))
}

export function buildLegacyRedirects() {
  return [...legacyStaticRedirects, ...buildLegacyProductRedirects(), ...legacyNewsRedirects]
}

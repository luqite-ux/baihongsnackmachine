import fs from "node:fs/promises"

const raw = await fs.readFile(new URL("../.env.local", import.meta.url), "utf8")
const env = Object.fromEntries(raw.split(/\r?\n/).filter((line) => line && !line.startsWith("#") && line.includes("=")).map((line) => {
  const index = line.indexOf("=")
  return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, "")]
}))

const base = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
const tenant = env.NEXT_PUBLIC_TENANT_ID
const knownOnly = process.argv.includes("--known-only")
if (!base || !key || !tenant) throw new Error("Missing Supabase delivery environment")

const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" }
const response = await fetch(`${base}/rest/v1/products?tenant_id=eq.${tenant}&select=id,slug,extra_data&order=sort_order`, { headers })
if (!response.ok) throw new Error(`Product read failed: ${response.status}`)
const products = await response.json()

let updated = 0
let unmatched = 0
let cursor = 0
const verifiedModels = { "1583100": "BH-QSKL-60SD" }
async function worker() {
 while (cursor < products.length) {
  const product = products[cursor++]
  const sourceUrl = product.extra_data?.source_url
  if (!sourceUrl) { unmatched++; continue }
  const sourceId = String(product.extra_data?.source_id || sourceUrl.match(/productinfo\/(\d+)/)?.[1] || "")
  const verifiedModel = verifiedModels[sourceId]
  if (verifiedModel && product.extra_data?.model !== verifiedModel) {
    const extra_data = { ...product.extra_data, model: verifiedModel }
    const write = await fetch(`${base}/rest/v1/products?id=eq.${product.id}&tenant_id=eq.${tenant}`, { method: "PATCH", headers: { ...headers, Prefer: "return=minimal" }, body: JSON.stringify({ extra_data }) })
    if (!write.ok) throw new Error(`Update failed for ${product.slug}: ${write.status}`)
    updated++
    continue
  }
  if (knownOnly) { unmatched++; continue }
  let page
  try { page = await fetch(sourceUrl, { signal: AbortSignal.timeout(12000) }) } catch { unmatched++; continue }
  if (!page.ok) { unmatched++; continue }
  const html = await page.text()
  const model = html.match(/\bBH-[A-Z0-9]+(?:-[A-Z0-9]+)+\b/i)?.[0]?.toUpperCase()
  if (!model) { unmatched++; continue }
  if (product.extra_data?.model === model) continue
  const extra_data = { ...product.extra_data, model }
  const write = await fetch(`${base}/rest/v1/products?id=eq.${product.id}&tenant_id=eq.${tenant}`, { method: "PATCH", headers: { ...headers, Prefer: "return=minimal" }, body: JSON.stringify({ extra_data }) })
  if (!write.ok) throw new Error(`Update failed for ${product.slug}: ${write.status}`)
  updated++
 }
}

await Promise.all(Array.from({ length: 6 }, () => worker()))

console.log(JSON.stringify({ total: products.length, updated, unmatched }))

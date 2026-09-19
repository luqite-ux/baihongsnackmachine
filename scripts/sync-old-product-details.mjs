import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

function parseEnv(raw) {
  return Object.fromEntries(
    raw.split(/\r?\n/).filter((line) => line && !line.startsWith("#") && line.includes("=")).map((line) => {
      const index = line.indexOf("=")
      return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, "")]
    }),
  )
}

const root = process.cwd()
const apply = process.argv.includes("--apply")
const env = parseEnv(await fs.readFile(path.join(root, ".env.local"), "utf8"))
const manifest = JSON.parse(await fs.readFile(path.join(root, ".codex-migration", "source", "product-details.json"), "utf8"))
const base = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
const tenant = env.NEXT_PUBLIC_TENANT_ID
if (!base || !key || !tenant) throw new Error("Missing Supabase delivery environment")

const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" }
const response = await fetch(
  `${base}/rest/v1/products?tenant_id=eq.${tenant}&select=id,slug,name,name_i18n,description,description_i18n,overview_i18n,image_url,extra_data&order=sort_order`,
  { headers },
)
if (!response.ok) throw new Error(`Product read failed: ${response.status}`)
const products = await response.json()
const bySourceId = new Map(products.map((product) => [
  String(product.extra_data?.source_id || product.extra_data?.source_url?.match(/productinfo\/(\d+)/)?.[1] || ""),
  product,
]))

const changes = []
const unmatched = []
let alreadySynchronized = 0
for (const source of manifest.products) {
  const product = bySourceId.get(String(source.sourceId))
  if (!product) {
    unmatched.push(source.sourceId)
    continue
  }
  const name = source.title || product.name
  const payload = {
    name,
    name_en: name,
    name_i18n: { ...(product.name_i18n || {}), en: name },
    description: source.description,
    description_en: source.description,
    description_i18n: { ...(product.description_i18n || {}), en: source.description },
    overview_i18n: { ...(product.overview_i18n || {}), en: source.description },
    extra_data: {
      ...(product.extra_data || {}),
      model: source.model,
      source_detail_images: source.images,
      source_detail_captured_at: manifest.capturedAt,
    },
  }
  if (
    product.name === payload.name &&
    product.description === payload.description &&
    product.description_i18n?.en === payload.description_i18n.en &&
    product.overview_i18n?.en === payload.overview_i18n.en &&
    product.extra_data?.model === payload.extra_data.model
  ) {
    alreadySynchronized += 1
    continue
  }
  changes.push({ id: product.id, slug: product.slug, sourceId: source.sourceId, model: source.model, payload })
}

if (apply) {
  for (const change of changes) {
    const write = await fetch(`${base}/rest/v1/products?id=eq.${change.id}&tenant_id=eq.${tenant}`, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify(change.payload),
    })
    if (!write.ok) throw new Error(`Update failed for ${change.slug}: ${write.status} ${await write.text()}`)
  }
}

console.log(JSON.stringify({
  mode: apply ? "apply" : "dry-run",
  tenant,
  databaseProducts: products.length,
  capturedProducts: manifest.products.length,
  plannedChanges: changes.length,
  alreadySynchronized,
  unmatched,
  examples: changes.slice(0, 5).map(({ slug, sourceId, model }) => ({ slug, sourceId, model })),
}, null, 2))

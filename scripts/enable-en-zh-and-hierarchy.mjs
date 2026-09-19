import fs from "node:fs"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"

const apply = process.argv.includes("--apply")
const root = process.cwd()
const tenantId = "373be627-6f4f-4058-9147-483dacb60de6"

function readEnv(file) {
  const result = {}
  if (!fs.existsSync(file)) return result
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/u)) {
    const match = line.match(/^\s*([^#][^=]*)=(.*)$/u)
    if (match) result[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/gu, "")
  }
  return result
}

const siteEnv = readEnv(path.join(root, ".env.local"))
const adminEnv = readEnv("D:/Cursor/Grand/huanqiu-admin/.env")
const supabase = createClient(siteEnv.NEXT_PUBLIC_SUPABASE_URL, siteEnv.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})
const deepseekKey = adminEnv.DEEPSEEK_API_KEY
const deepseekBase = adminEnv.DEEPSEEK_BASE_URL || "https://api.deepseek.com"
const deepseekModel = adminEnv.DEEPSEEK_MODEL || "deepseek-chat"
if (!deepseekKey) throw new Error("DEEPSEEK_API_KEY is missing")

const forbidden = /\b(?:warrant(?:y|ies)|guarantee(?:d)?)\b|质保|保修|质量保证/iu

async function translateItems(items, fields, context) {
  if (items.length === 0) return new Map()
  const response = await fetch(`${deepseekBase}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${deepseekKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: deepseekModel,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Translate verified English commercial food-machinery content into concise, natural Simplified Chinese for a B2B website. ${context} Preserve Baihong, model numbers, source IDs, numbers, units and HTML structure exactly. Do not add products, parameters, certifications, capabilities, promises, warranty, guarantee, 质保、保修或质量保证. Return only JSON: {"items":[{"id":"...",${fields.map((field) => `"${field}":"..."`).join(",")}}]}. Every input item and every requested field is required.`,
        },
        { role: "user", content: JSON.stringify({ items }) },
      ],
    }),
  })
  if (!response.ok) throw new Error(`DeepSeek ${response.status}: ${await response.text()}`)
  const json = await response.json()
  const parsed = JSON.parse(json.choices?.[0]?.message?.content || "{}")
  if (!Array.isArray(parsed.items) || parsed.items.length !== items.length) throw new Error("DeepSeek returned an incomplete batch")
  const output = new Map()
  for (const item of parsed.items) {
    if (!item.id || fields.some((field) => typeof item[field] !== "string")) throw new Error("DeepSeek returned an invalid item")
    if (fields.some((field) => forbidden.test(item[field]))) throw new Error(`Forbidden promise in translation ${item.id}`)
    output.set(item.id, item)
  }
  return output
}

async function translateBatches(items, fields, context, size = 10) {
  const output = new Map()
  for (let index = 0; index < items.length; index += size) {
    const batch = await translateItems(items.slice(index, index + size), fields, context)
    for (const [key, value] of batch) output.set(key, value)
    process.stdout.write(`translated ${Math.min(index + size, items.length)}/${items.length}\n`)
  }
  return output
}

const [{ data: tenant, error: tenantError }, { data: categories, error: categoryError }, { data: products, error: productError }, { data: articles, error: articleError }] = await Promise.all([
  supabase.from("tenants").select("*").eq("id", tenantId).single(),
  supabase.from("product_categories").select("*").eq("tenant_id", tenantId).order("sort_order"),
  supabase.from("products").select("id,name,name_i18n,description,description_i18n,category_slug,extra_data").eq("tenant_id", tenantId).order("sort_order"),
  supabase.from("articles").select("id,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n").eq("tenant_id", tenantId),
])
if (tenantError || categoryError || productError || articleError) throw tenantError || categoryError || productError || articleError

const roots = categories.filter((category) => !category.parent_id)
const categoryItems = []
for (const rootCategory of roots) {
  categoryItems.push({ id: rootCategory.id, name: rootCategory.name || rootCategory.name_i18n?.en || rootCategory.slug })
  for (const sub of Array.isArray(rootCategory.extra_data?.subcategories) ? rootCategory.extra_data.subcategories : []) {
    categoryItems.push({ id: `${rootCategory.id}:${sub.slug}`, name: sub.name })
  }
}
const categoryZh = await translateBatches(categoryItems, ["name"], "Translate category names consistently.", 20)

const productItems = products.map((product) => ({
  id: product.id,
  name: product.name_i18n?.en || product.name || "",
  description: product.description_i18n?.en || product.description || "",
}))
const productZh = await translateBatches(productItems, ["name", "description"], "Translate each product name and its related description consistently.", 12)

const articleItems = articles.map((article) => ({
  id: article.id,
  title: article.title_i18n?.en || article.title || "",
  excerpt: article.excerpt_i18n?.en || article.excerpt || "",
  content: article.content_i18n?.en || article.content || "",
}))
const articleZh = await translateBatches(articleItems, ["title", "excerpt", "content"], "Preserve article paragraph and HTML structure.", 2)

const tenantSource = {
  id: tenant.id,
  site_title: tenant.site_title_i18n?.en || "Baihong Commercial Food Machinery",
  site_tagline: tenant.site_tagline_i18n?.en || "Commercial food machinery manufacturer",
  site_description: tenant.site_description_i18n?.en || "Commercial food machinery for overseas B2B buyers.",
  contact_address: tenant.contact_address_i18n?.en || tenant.contact_address_short || "",
  seo_title: tenant.seo_title_i18n?.en || "Baihong Commercial Food Machinery",
  seo_description: tenant.seo_description_i18n?.en || tenant.site_description_i18n?.en || "",
}
const tenantZh = (await translateItems([tenantSource], ["site_title", "site_tagline", "site_description", "contact_address", "seo_title", "seo_description"], "Translate verified company and SEO fields without adding claims.")).get(tenant.id)

const childRows = []
for (const rootCategory of roots) {
  const rootTranslation = categoryZh.get(rootCategory.id)
  if (apply) {
    const { error } = await supabase.from("product_categories").update({ name_i18n: { ...(rootCategory.name_i18n || {}), en: rootCategory.name_i18n?.en || rootCategory.name, zh: rootTranslation.name } }).eq("id", rootCategory.id).eq("tenant_id", tenantId)
    if (error) throw error
  }
  const subs = Array.isArray(rootCategory.extra_data?.subcategories) ? rootCategory.extra_data.subcategories : []
  for (const [index, sub] of subs.entries()) {
    const slug = `${rootCategory.slug}__${sub.slug}`
    const translated = categoryZh.get(`${rootCategory.id}:${sub.slug}`)
    childRows.push({
      tenant_id: tenantId,
      parent_id: rootCategory.id,
      slug,
      name: sub.name,
      name_i18n: { en: sub.name, zh: translated.name },
      sort_order: (index + 1) * 10,
      is_active: true,
      extra_data: { source: "published CloudDream taxonomy", source_id: sub.source_id, public_slug: sub.slug },
    })
  }
}

if (apply && childRows.length) {
  const { error } = await supabase.from("product_categories").upsert(childRows, { onConflict: "tenant_id,slug" })
  if (error) throw error
}

for (const product of products) {
  const translated = productZh.get(product.id)
  const publicSub = product.extra_data?.subcategory
  const leafSlug = publicSub ? `${product.category_slug}__${publicSub}` : product.category_slug
  const payload = {
    category_slug: leafSlug,
    name_i18n: { ...(product.name_i18n || {}), en: product.name_i18n?.en || product.name, zh: translated.name },
    description_i18n: { ...(product.description_i18n || {}), en: product.description_i18n?.en || product.description || "", zh: translated.description },
    extra_data: { ...(product.extra_data || {}), parent_category: product.category_slug, public_subcategory: publicSub || null },
  }
  if (apply) {
    const { error } = await supabase.from("products").update(payload).eq("id", product.id).eq("tenant_id", tenantId)
    if (error) throw error
  }
}

for (const article of articles) {
  const translated = articleZh.get(article.id)
  if (apply) {
    const { error } = await supabase.from("articles").update({
      title_i18n: { ...(article.title_i18n || {}), en: article.title_i18n?.en || article.title, zh: translated.title },
      excerpt_i18n: { ...(article.excerpt_i18n || {}), en: article.excerpt_i18n?.en || article.excerpt || "", zh: translated.excerpt },
      content_i18n: { ...(article.content_i18n || {}), en: article.content_i18n?.en || article.content || "", zh: translated.content },
    }).eq("id", article.id).eq("tenant_id", tenantId)
    if (error) throw error
  }
}

if (apply) {
  const { error } = await supabase.from("tenants").update({
    supported_languages: ["en", "zh"],
    site_title_i18n: { ...(tenant.site_title_i18n || {}), zh: tenantZh.site_title },
    site_tagline_i18n: { ...(tenant.site_tagline_i18n || {}), zh: tenantZh.site_tagline },
    site_description_i18n: { ...(tenant.site_description_i18n || {}), zh: tenantZh.site_description },
    contact_address_i18n: { ...(tenant.contact_address_i18n || {}), zh: tenantZh.contact_address },
    seo_title_i18n: { ...(tenant.seo_title_i18n || {}), zh: tenantZh.seo_title },
    seo_description_i18n: { ...(tenant.seo_description_i18n || {}), zh: tenantZh.seo_description },
  }).eq("id", tenantId)
  if (error) throw error
}

console.log(JSON.stringify({ apply, roots: roots.length, children: childRows.length, products: products.length, articles: articles.length, languages: ["en", "zh"] }, null, 2))

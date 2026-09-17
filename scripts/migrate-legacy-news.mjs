import fs from "node:fs"
import { createClient } from "@supabase/supabase-js"

function loadEnv(file) {
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2]
  }
}

loadEnv(new URL("../.env.local", import.meta.url))

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const sourceArticles = [
  {
    slug: "complete-guide-to-choosing-the-perfect-electric-grill",
    legacyId: "1142077",
    title: "Complete Guide to Choosing the Perfect Electric Grill",
    excerpt: "A practical guide to electric grill types, cooking area, wattage, temperature control, safety and cleaning.",
    publishedAt: "2026-08-10T17:05:00+08:00",
    imageKind: "grill",
    content: `
      <h2>Choosing the Right Electric Grill</h2>
      <p>Electric grills bring controllable heat, low-smoke cooking and straightforward operation to kitchens, patios and other food-service settings. Start by deciding whether the equipment will be used indoors, outdoors or in both environments.</p>
      <h2>Compare the Core Specifications</h2>
      <p>Review wattage, maximum temperature, cooking area and preheat time against the intended menu and serving volume. A larger cooking area supports higher throughput, while accurate temperature control helps operators handle different ingredients consistently.</p>
      <h2>Cooking Surface and Grease Management</h2>
      <p>Consider the grate or plate material, whether food-contact parts can be removed, and how grease is directed into a drip tray. Accessible components and a clear drainage path make routine cleaning easier.</p>
      <h2>Safety and Daily Use</h2>
      <p>Look for stable feet, thermostat control, overheat protection and surfaces designed to reduce accidental contact with hot components. Confirm that the unit fits the available electrical supply and working space before ordering.</p>
      <h2>Final Selection Checklist</h2>
      <ul><li>Confirm indoor or outdoor placement.</li><li>Match the cooking area to expected volume.</li><li>Check voltage, wattage and temperature range.</li><li>Review cleaning access and grease collection.</li><li>Confirm dimensions and available counter space.</li></ul>
    `,
  },
  {
    slug: "healthier-way-to-grill-electric-barbecues",
    legacyId: "1142076",
    title: "A Healthier Way to Grill: How Electric Barbecues Reduce Harmful Compounds",
    excerpt: "How controlled electric heating and grease management can support cleaner, more consistent grilling.",
    publishedAt: "2026-08-10T16:40:00+08:00",
    imageKind: "grill",
    content: `
      <h2>Controlled Heat for More Consistent Grilling</h2>
      <p>Electric barbecue equipment allows operators to set and maintain a steady cooking temperature without an open flame. Consistent heat makes it easier to avoid excessive charring while still cooking food thoroughly.</p>
      <h2>Reduce Smoke from Dripping Fat</h2>
      <p>A well-designed grease channel and removable drip tray keep rendered fat away from the heating area. Less contact between grease and intense heat can reduce smoke and simplify cleanup after service.</p>
      <h2>Practical Operating Habits</h2>
      <ul><li>Preheat the cooking surface before loading food.</li><li>Use the appropriate temperature for each ingredient.</li><li>Remove accumulated grease between batches.</li><li>Clean food-contact surfaces after use.</li></ul>
      <p>Equipment selection is only one part of the process. Ingredient choice, cooking temperature, timing and regular cleaning all contribute to better grilling results.</p>
    `,
  },
  {
    slug: "is-cooking-with-deep-fryers-safe",
    legacyId: "1137332",
    title: "Is Cooking with Deep Fryers Safe? Everything You Need to Know",
    excerpt: "Key operating, temperature-control and cleaning practices for commercial deep fryers.",
    publishedAt: "2026-07-10T16:20:00+08:00",
    imageKind: "fryer",
    content: `
      <h2>Safe Deep-Fryer Operation</h2>
      <p>Commercial deep fryers can be operated safely when the equipment is installed correctly and staff follow consistent procedures. Keep the fryer on a stable surface with adequate clearance and use the electrical or fuel supply specified for the model.</p>
      <h2>Control Oil Temperature</h2>
      <p>Use the thermostat to maintain the temperature required by the recipe. Avoid overfilling the oil tank or loading wet and frozen food too quickly, as displaced oil and rapid bubbling can create avoidable hazards.</p>
      <h2>Cleaning and Routine Checks</h2>
      <ul><li>Allow the unit and oil to cool before draining or cleaning.</li><li>Keep controls and electrical connections dry.</li><li>Remove food debris and clean the oil tank regularly.</li><li>Inspect baskets, handles, drains and power cables before use.</li></ul>
      <p>Operators should follow the instructions supplied for the specific fryer and keep the work area organized throughout service.</p>
    `,
  },
  {
    slug: "heat-retention-and-fuel-efficiency-in-modern-barbecue-grills",
    legacyId: "1137331",
    title: "Heat Retention and Fuel Efficiency in Modern Barbecue Grills",
    excerpt: "How construction, insulation and temperature control influence grill efficiency and cooking consistency.",
    publishedAt: "2026-07-10T16:00:00+08:00",
    imageKind: "grill",
    content: `
      <h2>Why Heat Retention Matters</h2>
      <p>A grill that holds heat steadily can recover more quickly after food is loaded and can maintain a consistent cooking surface through repeated batches. This supports predictable cooking times during busy service.</p>
      <h2>Construction and Heat Distribution</h2>
      <p>Body material, plate thickness, lid design and the position of heating elements or burners all influence how heat moves through the equipment. Even distribution helps reduce hot spots and unnecessary energy use.</p>
      <h2>Match the Grill to the Workload</h2>
      <p>Select the cooking area and power level according to the menu and expected output. Oversized equipment may consume more energy than the application requires, while undersized equipment can struggle to recover between batches.</p>
      <h2>Operating Practices</h2>
      <ul><li>Preheat only for the required period.</li><li>Keep lids or covers closed when the process allows.</li><li>Clean cooking surfaces and heat-transfer areas regularly.</li><li>Use temperature controls instead of running continuously at maximum output.</li></ul>
    `,
  },
]

const forbidden = /warrant(?:y|ies)|guarantee(?:d)?|质保|保修/gi
for (const article of sourceArticles) {
  if (forbidden.test(`${article.title} ${article.excerpt} ${article.content}`)) {
    throw new Error(`Forbidden commitment found in ${article.slug}`)
  }
}

const { data: products, error: productError } = await db
  .from("products")
  .select("name,image_url")
  .eq("tenant_id", tenantId)
  .eq("is_active", true)

if (productError) throw productError

const imageFor = (kind) =>
  products.find((product) => product.name?.toLowerCase().includes(kind) && /^https:\/\//.test(product.image_url || ""))
    ?.image_url || null

for (const article of sourceArticles) {
  const payload = {
    tenant_id: tenantId,
    slug: article.slug,
    title: article.title,
    title_en: article.title,
    title_i18n: { en: article.title },
    excerpt: article.excerpt,
    excerpt_en: article.excerpt,
    excerpt_i18n: { en: article.excerpt },
    content: article.content.trim(),
    content_en: article.content.trim(),
    content_i18n: { en: article.content.trim() },
    featured_image: imageFor(article.imageKind),
    is_published: true,
    published_at: article.publishedAt,
  }

  const { data: existing, error: findError } = await db
    .from("articles")
    .select("id")
    .eq("tenant_id", tenantId)
    .eq("slug", article.slug)
    .maybeSingle()
  if (findError) throw findError

  const query = existing
    ? db.from("articles").update(payload).eq("tenant_id", tenantId).eq("id", existing.id)
    : db.from("articles").insert(payload)
  const { error } = await query
  if (error) throw error
}

const { data: saved, error: readbackError } = await db
  .from("articles")
  .select("slug,title,featured_image,is_published,published_at")
  .eq("tenant_id", tenantId)
  .in("slug", sourceArticles.map((article) => article.slug))
  .order("published_at", { ascending: false })

if (readbackError) throw readbackError
if (saved.length !== sourceArticles.length || saved.some((article) => !article.is_published || !article.featured_image)) {
  throw new Error("Legacy article migration readback failed")
}

console.log(JSON.stringify(saved, null, 2))

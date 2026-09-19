import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import ts from "typescript"
import { JSDOM } from "jsdom"

const ROOT = process.cwd()
const CATALOG_PATH = path.join(ROOT, ".codex-delivery", "catalog", "catalog.json")
const OUTPUT_DIR = path.join(ROOT, ".codex-migration", "source", "products")
const MANIFEST_PATH = path.join(ROOT, ".codex-migration", "source", "product-details.json")
const VERSION = "20260916120444"
const ONLY_ID = process.argv.find((value) => value.startsWith("--only="))?.split("=")[1]

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

function normalizeAssetUrl(value) {
  if (!value) return null
  if (value.startsWith("//")) return `https:${value}`
  if (value.startsWith("/")) return `https://baihongsnackmachine.com${value}`
  return value
}

function decodeDocumentWrite(source) {
  const sourceFile = ts.createSourceFile("product-body.js", source, ts.ScriptTarget.Latest, true)
  let html = ""

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sourceFile) === "document.write" &&
      node.arguments[0] &&
      ts.isStringLiteralLike(node.arguments[0])
    ) {
      html += node.arguments[0].text
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  if (!html) throw new Error("No document.write HTML payload found")
  return html
}

function compactText(value) {
  return value?.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim() || ""
}

function extractProduct(sourceId, sourceUrl, html) {
  const document = new JSDOM(html).window.document
  const detail = document.querySelector('[id$="_txt"] .w-detail')
  const breadcrumbParts = [...document.querySelectorAll(".w-crumbs-caption")]
    .map((node) => compactText(node.textContent))
    .filter(Boolean)
  const title = breadcrumbParts.at(-1) || ""
  const categoryParts = [...document.querySelectorAll(".w-crumbs-category")]
    .filter((node) => node.matches("a"))
    .map((node) => compactText(node.textContent))
    .filter(Boolean)
  const detailParagraphs = detail
    ? [...detail.querySelectorAll(":scope > p")].map((node) => compactText(node.textContent)).filter(Boolean)
    : []
  const sliderImages = [...document.querySelectorAll('[ctype="productSlideBind"] img[data-u="image"]')]
    .map((node) => normalizeAssetUrl(node.getAttribute("src") || node.getAttribute("data-src")))
    .filter(Boolean)
  const detailImages = detail
    ? [...detail.querySelectorAll("img")]
        .map((node) => normalizeAssetUrl(node.getAttribute("src") || node.getAttribute("data-src")))
        .filter(Boolean)
    : []
  const images = [...new Set([...sliderImages, ...detailImages])]

  return {
    sourceId,
    sourceUrl,
    title,
    categories: categoryParts,
    model: detailParagraphs[0] || "",
    description: detailParagraphs.slice(1).join("\n\n"),
    detailHtml: detail?.innerHTML.trim() || "",
    images,
  }
}

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"))
  } catch {
    return { capturedAt: null, source: "public-old-site", products: [], failures: [] }
  }
}

async function saveManifest(manifest) {
  manifest.capturedAt = new Date().toISOString()
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
}

async function fetchBody(bodyUrl) {
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(bodyUrl, {
        headers: { "User-Agent": "Baihong migration archive/1.0 (+low-concurrency public-site capture)" },
        signal: AbortSignal.timeout(30_000),
      })
      if ([403, 429].includes(response.status)) {
        throw new Error(`Source protection response ${response.status}; capture stopped`)
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.text()
    } catch (error) {
      lastError = error
      if (String(error).includes("capture stopped")) throw error
      if (attempt < 3) await sleep(attempt * 1_000)
    }
  }
  throw lastError
}

async function main() {
  const catalog = JSON.parse(await fs.readFile(CATALOG_PATH, "utf8"))
  const manifest = await loadManifest()
  const captured = new Map(manifest.products.map((product) => [String(product.sourceId), product]))
  const failures = new Map(manifest.failures.map((failure) => [String(failure.sourceId), failure]))
  const targets = catalog.products.filter((product) => !ONLY_ID || String(product.sourceId) === ONLY_ID)

  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  for (let index = 0; index < targets.length; index += 1) {
    const product = targets[index]
    const sourceId = String(product.sourceId)
    if (captured.has(sourceId)) continue

    const bodyUrl = `https://nwzimg.wezhan.net/pubsf/18048/18048092/cdn-static-pages/productinfo/pc/${sourceId}_en-us.html.Body.js?version=${VERSION}`
    try {
      const html = decodeDocumentWrite(await fetchBody(bodyUrl))
      await fs.writeFile(path.join(OUTPUT_DIR, `${sourceId}.html`), html, "utf8")
      captured.set(sourceId, extractProduct(sourceId, product.sourceUrl, html))
      failures.delete(sourceId)
      manifest.products = [...captured.values()]
      manifest.failures = [...failures.values()]
      await saveManifest(manifest)
      console.log(`[${index + 1}/${targets.length}] captured ${sourceId}`)
    } catch (error) {
      failures.set(sourceId, { sourceId, sourceUrl: product.sourceUrl, error: String(error) })
      manifest.products = [...captured.values()]
      manifest.failures = [...failures.values()]
      await saveManifest(manifest)
      console.error(`[${index + 1}/${targets.length}] failed ${sourceId}: ${error}`)
      if (String(error).includes("capture stopped")) process.exitCode = 2
      if (process.exitCode === 2) break
    }

    await sleep(300)
  }

  console.log(JSON.stringify({ captured: captured.size, failures: failures.size, manifest: MANIFEST_PATH }))
}

await main()

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const deliveryRoot = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/, '$1'))
const materialRoot = path.join(deliveryRoot, 'materials')
const outputPath = path.join(deliveryRoot, 'material-fact-manifest.json')

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const candidate = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(candidate) : [candidate]
  })
}

const factDefinitions = [
  ['company-cn', 'organization', 'baihong', 'legal_name_zh', '徐州百泓厨房设备有限公司', ['backend', 'frontend']],
  ['company-en', 'organization', 'baihong', 'legal_name_en', 'Xuzhou Baihong Kitchen Equipment Co., Ltd.', ['backend', 'frontend']],
  ['brand', 'organization', 'baihong', 'brand', 'BAIHONG', ['backend', 'frontend']],
  ['domain', 'organization', 'baihong', 'domain', 'baihongsnackmachine.com', ['backend', 'frontend']],
  ['phone', 'organization', 'baihong', 'phone', '+86 15252102737', ['backend', 'frontend']],
  ['email', 'organization', 'baihong', 'email', 'info@baihongsnackmachine.com', ['backend', 'frontend']],
  ['address', 'organization', 'baihong', 'address', 'Group 3, Dailou Village, Zhengji Town, Tongshan District, Xuzhou City, Jiangsu Province', ['backend', 'frontend']],
  ['catalog-count', 'catalog', 'products', 'published_product_count', '278', ['backend', 'frontend']],
  ['catalog-pages', 'catalog', 'products', 'published_page_count', '47', ['frontend']],
  ['banner-1', 'asset', '174208172.jpg', 'approved_banner', '174208172.jpg', ['frontend']],
  ['banner-2', 'asset', '174208173.jpg', 'approved_banner', '174208173.jpg', ['frontend']],
  ['banner-3', 'asset', '174208174.jpg', 'approved_banner', '174208174.jpg', ['frontend']],
  ['logo', 'asset', '174184857.png', 'official_logo', '174184857.png', ['backend', 'frontend']],
  ['product-interaction', 'requirement', 'products-page', 'partial_refresh', 'Left category navigation remains stable; category and pagination actions update only the right product region without a full-page refresh.', ['frontend']],
]

const facts = factDefinitions.map(([factId, entityType, entityKey, field, value, destinations]) => ({
  fact_id: factId,
  entity_type: entityType,
  entity_key: entityKey,
  field,
  decision: 'use',
  source_value_hash: hash(value),
  source_refs: [{ source_id: 'requirements', unit_id: factId }],
  expected_destinations: destinations,
}))

const sources = walk(materialRoot).sort().map((file) => {
  const relative = path.relative(materialRoot, file).replaceAll('\\', '/')
  const buffer = fs.readFileSync(file)
  if (relative === 'requirements.md') {
    return {
      source_id: 'requirements',
      path: file,
      type: 'markdown',
      fingerprint: hash(buffer),
      decision: 'extract',
      extraction_evidence: 'Requester requirements, supplied screenshots and public-site verification consolidated in UTF-8 markdown.',
      units: factDefinitions.map(([factId]) => ({
        unit_id: factId,
        locator: `requirements.md#${factId}`,
        decision: 'fact',
        fact_ids: [factId],
      })),
    }
  }
  if (relative === 'asset-ledger.md') {
    return {
      source_id: 'asset-ledger',
      path: file,
      type: 'markdown',
      fingerprint: hash(buffer),
      decision: 'extract',
      extraction_evidence: 'Human-readable provenance ledger; atomic asset facts are normalized through the requirements units and machine-readable published asset manifest.',
      no_fact_reason: 'No additional atomic fact beyond the normalized requirement and asset manifest records.',
      units: [],
    }
  }
  if (relative === 'published-assets-manifest.json') {
    return {
      source_id: 'published-assets-manifest',
      path: file,
      type: 'json',
      fingerprint: hash(buffer),
      decision: 'extract',
      extraction_evidence: 'Machine-readable URL, dimensions, byte size and SHA-256 inventory for every downloaded public asset.',
      no_fact_reason: 'Asset provenance is consumed by the separate asset ledger and product-media mapping; no duplicate business facts are created here.',
      units: [],
    }
  }
  return {
    source_id: `asset-${path.basename(file)}`,
    path: file,
    type: path.extname(file).slice(1) || 'binary',
    fingerprint: hash(buffer),
    decision: 'reference_only',
    reason: 'Binary source asset is fully fingerprinted and represented by published-assets-manifest.json; visual use is governed by the asset ledger and product-media mapping.',
  }
})

fs.writeFileSync(outputPath, `${JSON.stringify({ material_roots: [materialRoot], sources, facts }, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ sources: sources.length, facts: facts.length, outputPath }))

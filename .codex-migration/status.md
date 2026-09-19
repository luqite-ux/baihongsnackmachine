# Baihong public-site migration status

- Workbench task: `7b7b4519-ab9b-4c8c-9a5c-9ce1eb17c5d1`
- Site: `c5565021-196f-4a1d-a2cc-1abdc518e0d3`
- Source: `https://baihongsnackmachine.com/`
- Current phase: `cleanup_approved`
- Source catalogue: 278 products
- Public product details captured: 98
- Captured detail fields: title, category trail, model, description, source gallery and original HTML
- Backend readback: 98 synchronized, 0 pending, 0 unmatched
- Public-source limitation: later legacy product shells reference missing CDN bodies and return HTTP 404. These are retained in the catalogue from verified list evidence; missing models or detail copy are not fabricated.
- Route compatibility: 6 legacy static routes, 278 legacy product routes and 4 legacy news routes mapped with permanent redirects.
- Verification: 22/22 tests passed; Next.js production build passed; 28 bilingual route/viewport checks passed without overflow or broken images.
- Cutover: `baihongsnackmachine.com` and `www.baihongsnackmachine.com` are attached to the READY Vercel Production deployment at commit `e1d690e9ba17d577bdefc780aea4366408b3d202`.
- English/Chinese delivery: tenant languages are `en` and `zh`; 278 product names, every non-empty product description, 4 articles, 31 category labels and key public-page copy have Chinese content. `/zh` routes, language-aware canonical/hreflang and the bilingual Sitemap are live.
- Category hierarchy: 15 root rows and 16 standard `parent_id` child rows; 236 products with legacy subcategories point to leaf category slugs while public legacy filters remain compatible.
- Verification revision: `fb96a972d1407c6c5b129839a84465eaf2c62d9d`; GitHub `main` and Vercel Production match and the formal English/Chinese representative routes return HTTP 200.
- Cleanup gate: approved. The parity manifest passes, browser checks pass, product/article translation actions pass, and tenant-limited save/reopen readback preserved the original public content.
- Source evidence archive: `.codex-migration/source/products-public-html-2026-09-19.zip` contains 98 readable source HTML files; SHA-256 `A53007F6330A96144858B0DD074A5EA2870C8EF98EDE42C6895D48A3AFC225CA`.

## Remaining cleanup sequence

1. Commit and push the evidence archive and final manifest.
2. Confirm GitHub `main` and Vercel Production use the same final SHA.
3. Complete workbench task `7b7b4519-ab9b-4c8c-9a5c-9ce1eb17c5d1`.
4. Delete the temporary remote branch and remove the local customer directory. Keep the legacy platform account/site/data intact.

# Baihong public-site migration status

- Workbench task: `7b7b4519-ab9b-4c8c-9a5c-9ce1eb17c5d1`
- Site: `c5565021-196f-4a1d-a2cc-1abdc518e0d3`
- Source: `https://baihongsnackmachine.com/`
- Current phase: `cutover_verified`
- Source catalogue: 278 products
- Public product details captured: 98
- Captured detail fields: title, category trail, model, description, source gallery and original HTML
- Backend readback: 98 synchronized, 0 pending, 0 unmatched
- Public-source limitation: later legacy product shells reference missing CDN bodies and return HTTP 404. These are retained in the catalogue from verified list evidence; missing models or detail copy are not fabricated.
- Route compatibility: 6 legacy static routes, 278 legacy product routes and 4 legacy news routes mapped with permanent redirects.
- Verification: 16/16 tests passed; Next.js production build passed; the formal domain and representative catalogue/product-detail routes return HTTP 200.
- Cutover: `baihongsnackmachine.com` and `www.baihongsnackmachine.com` are attached to the READY Vercel Production deployment at commit `e1d690e9ba17d577bdefc780aea4366408b3d202`.
- English/Chinese delivery: tenant languages are `en` and `zh`; 278 product names, every non-empty product description, 4 articles, 31 category labels and key public-page copy have Chinese content. `/zh` routes, language-aware canonical/hreflang and the bilingual Sitemap are live.
- Category hierarchy: 15 root rows and 16 standard `parent_id` child rows; 236 products with legacy subcategories point to leaf category slugs while public legacy filters remain compatible.
- Verification revision: `9a1c11125579853aa88dd28919b37ddb71e192ca`; GitHub `main` and Vercel Production match and the formal English/Chinese representative routes return HTTP 200.
- Cleanup gate: the two previously identified blockers are closed. Final destructive cleanup still waits for the remaining full parity evidence refresh and workbench completion sequence.

## Next steps

1. Re-run the full desktop/mobile parity manifest and backend editability checks for English and Chinese.
2. Verify one reversible product/article translation edit-save-reopen cycle in the proxied customer后台, then restore the original value.
3. After those gates pass: mark `cleanup_approved`, complete workbench task `7b7b4519-ab9b-4c8c-9a5c-9ce1eb17c5d1`, delete the temporary remote branch, and remove the local customer directory.
4. Keep the legacy platform account/site/data intact unless a separate explicit production-destruction authorization is given.

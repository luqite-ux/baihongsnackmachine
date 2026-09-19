# Final delivery gate — 2026-09-19

## Passed

- Local, GitHub `main`, and Vercel Production resolve to revision `fb96a972d1407c6c5b129839a84465eaf2c62d9d` before the evidence-only closeout commit.
- Vercel Production is `READY`.
- `https://baihongsnackmachine.com/`, the six main route families, `robots.txt`, `sitemap.xml`, and representative legacy product/news redirects return HTTP 200 after redirects.
- Sitemap contains 576 URLs: 288 English and 288 Simplified Chinese.
- The database contains 278 products, all 278 main images use the tenant R2 host, 98 publicly recoverable legacy models are synchronized, and 4 published articles exist.
- Tenant domain, Chinese backend display name, group `2`, branded Logo/Favicon, and `info@baihongsnackmachine.com` administrator are present; forced first-login password change is disabled.
- Fresh production build passed.
- Fresh isolated test run passed: 11 test files, 22 tests.

## Resolved after the initial gate

1. The tenant now enables `en` and `zh`; Google Translate was removed. `/zh` routes render Chinese product/category/article data and localized public copy, with language-specific canonical/hreflang and 288 English plus 288 Chinese Sitemap URLs.
2. The tenant now has 15 root category rows and 16 standard child rows using `parent_id`; 236 products with legacy subcategories point to the matching leaf category rows.
3. Production revision `fb96a972d1407c6c5b129839a84465eaf2c62d9d` is READY and representative English/Chinese routes return HTTP 200.
4. The final parity manifest passes with 28 desktop/mobile route checks and no unresolved findings.
5. Product and article one-click translation returned Chinese content in the proxied customer backend. Tenant-limited save/reopen checks preserved the original public content and left no test records.

## Remaining before destructive cleanup

- Push this final evidence set and verify the deployed SHA.
- Complete the workbench task and remove the temporary remote branch/local checkout.
- Public-source gaps for unavailable legacy detail bodies remain documented and are not fabricated.

## Cleanup decision

The explicit cleanup request remains recorded. All functional and evidence gates have passed. Cleanup is approved after the final evidence commit is pushed and the workbench completion is confirmed. The legacy platform account/site/data remains intact because no production-destruction authorization was given.

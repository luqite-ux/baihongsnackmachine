# Final delivery gate — 2026-09-19

## Passed

- Local, GitHub `main`, and Vercel Production resolve to `e1d690e9ba17d577bdefc780aea4366408b3d202`.
- Vercel Production is `READY`.
- `https://baihongsnackmachine.com/`, the six main route families, `robots.txt`, `sitemap.xml`, and representative legacy product/news redirects return HTTP 200 after redirects.
- Sitemap contains 288 URLs.
- The database contains 278 products, all 278 main images use the tenant R2 host, 98 publicly recoverable legacy models are synchronized, and 4 published articles exist.
- Tenant domain, Chinese backend display name, group `2`, branded Logo/Favicon, and `info@baihongsnackmachine.com` administrator are present; forced first-login password change is disabled.
- Fresh production build passed.
- Fresh isolated test run passed: 9 test files, 16 tests. A parallel test/build run initially caused one home-page test to exceed its 5-second timeout; the same test and then the full suite passed when run without concurrent build contention.

## Resolved after the initial gate

1. The tenant now enables `en` and `zh`; Google Translate was removed. `/zh` routes render Chinese product/category/article data and localized public copy, with language-specific canonical/hreflang and 288 English plus 288 Chinese Sitemap URLs.
2. The tenant now has 15 root category rows and 16 standard child rows using `parent_id`; 236 products with legacy subcategories point to the matching leaf category rows.
3. Production revision `9a1c11125579853aa88dd28919b37ddb71e192ca` is READY and representative English/Chinese routes return HTTP 200.

## Remaining before destructive cleanup

- Refresh the full desktop/mobile parity evidence for both enabled languages.
- Complete one reversible product/article后台 edit-save-reopen check and restore the original content.
- Public-source gaps for unavailable legacy detail bodies remain documented and are not fabricated.

## Cleanup decision

The explicit cleanup request remains recorded. The original two blockers are closed, but destructive cleanup remains deferred until the final bilingual parity evidence and reversible后台 edit-save-reopen checks pass. The workbench task, temporary branch, local repository and legacy platform evidence therefore remain intact.

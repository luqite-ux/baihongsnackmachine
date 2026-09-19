# Baihong public-site migration status

- Workbench task: `7b7b4519-ab9b-4c8c-9a5c-9ce1eb17c5d1`
- Site: `c5565021-196f-4a1d-a2cc-1abdc518e0d3`
- Source: `https://baihongsnackmachine.com/`
- Current phase: `replica_implemented`
- Source catalogue: 278 products
- Public product details captured: 98
- Captured detail fields: title, category trail, model, description, source gallery and original HTML
- Backend readback: 98 synchronized, 0 pending, 0 unmatched
- Public-source limitation: later legacy product shells reference missing CDN bodies and return HTTP 404. These are retained in the catalogue from verified list evidence; missing models or detail copy are not fabricated.
- Route compatibility: 6 legacy static routes, 278 legacy product routes and 4 legacy news routes mapped with permanent redirects.
- Verification: 16/16 tests passed; Next.js production build passed; representative catalogue and product-detail pages inspected in a real browser.

## Next steps

1. Deploy this revision and repeat visual checks against the actual Production URL.
2. Finish desktop/mobile evidence for every route family and registered interaction state.
3. Re-run source/target route, asset and content set comparisons.
4. Keep the old public site live until cutover verification is complete.

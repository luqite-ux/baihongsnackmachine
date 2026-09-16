# Full Content Integration Manifest

## Scope

- Import all 278 published products from the verified CloudDream/Jindouyun catalog after authenticated export/readback.
- Recreate all 15 top-level categories and verified child categories as separate backend category rows.
- Preserve every product's published title, description, category, detail content and all available gallery images unless excluded by the company-wide prohibited-content rules.
- Upload final product/gallery assets to the customer tenant's R2 path and map each product to its own verified source images.
- Import only real published articles; if none are published, retain a truthful backend-driven empty state.
- Reuse all three approved Banners and the official Logo; integrate all non-duplicate qualified company/factory/process images into appropriate About/capability sections.

## Required destination layers

- Backend: tenant, site settings, categories, products, articles, inquiries, translation profile.
- Frontend: Home, About, Products, Product detail, News, News detail, FAQ, Contact/RFQ, metadata, JSON-LD, sitemap and robots.
- Storage: per-tenant R2 objects with traceable source mapping.

## Reconciliation

The authenticated source export is authoritative for the final product identities and media mapping. The public crawl has already confirmed the expected total of 278; the final manifest must reconcile that count and list every stable product key before `content_coverage_reconciled`.


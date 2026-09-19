# Backend bilingual audit — 2026-09-19

- Tenant: `373be627-6f4f-4058-9147-483dacb60de6`
- Supported languages: `en`, `zh`
- Product tested: `a2d41856-1a3a-4aa0-9c61-319e15d9af12`
- Article tested: `1a38dded-b02c-46db-b492-3b037c9a0fe6`

## Browser checks

- Customer-domain `/admin/login` accepted the formal administrator account and opened the tenant dashboard.
- Product editor exposed English and Chinese language tabs. The `一键翻译` action completed and reported `已翻译到 1 种语言`; the generated Chinese name and description were visible in the Chinese tab.
- Article editor exposed English and Chinese language tabs. The `从英文翻译到其他1种语言` action completed and reported `已翻译到 1 种语言`; translated title, excerpt and rich-text body were visible in the Chinese tab.

## Save and reopen checks

- A tenant- and record-ID-limited no-content-change save was issued for the representative product and article.
- Both records were read back after the save. Product `name_i18n` and `description_i18n` matched their pre-save values; article `title_i18n`, `excerpt_i18n` and `content_i18n` matched their pre-save values.
- Verified Chinese values remained `60型手动烧烤炉` and `完美电烤炉选购全指南`.
- No test product, article, inquiry or public-facing marker was created.

## Taxonomy and language inventory

- Root categories: 15.
- Standard `parent_id` child categories: 16.
- Products: 278; Chinese product names: 278; Chinese descriptions: 277 (the one missing source description remains intentionally empty).
- Products assigned to leaf category slugs: 236.
- Published articles with Chinese title and content: 4.
- Forbidden warranty/guarantee promise hits: 0.

# Production bilingual browser audit — 2026-09-19

- Target: `https://baihongsnackmachine.com`
- Deployment revision: `fb96a972d1407c6c5b129839a84465eaf2c62d9d`
- Desktop viewport: 1440 × 900
- Mobile viewport: 390 × 844
- Browsers: Codex in-app browser, production domain

## Covered routes

English and Simplified Chinese variants of home, product listing, representative product detail, news listing, representative news detail, FAQ and contact were opened in both viewports.

## Results

- All 28 route/viewport checks returned the expected page title, one primary `h1`, and the expected document language (`en` or `zh-CN`).
- No horizontal overflow was detected at either viewport.
- No completed image had `naturalWidth === 0`.
- The Chinese product detail displayed the full product image, Chinese product name, and model `BH-QSKL-60SD`.
- The Chinese home page displayed the mobile navigation, banner, search bar, category introduction and Chinese calls to action without clipping.
- Shared header, footer, product banner, news banner, FAQ banner, contact banner and quality-service copy were rechecked after revision `fb96a97`; the previously detected English leakage on Chinese routes was removed.

## Template verdicts

All covered route templates passed desktop and mobile production checks with no unresolved findings.

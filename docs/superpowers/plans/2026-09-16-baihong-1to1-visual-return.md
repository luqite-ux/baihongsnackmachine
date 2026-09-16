# Baihong 1:1 Visual Return Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Return the Baihong public site to the approved CloudDream visual system without regressing its integrated backend and delivery contracts.

**Architecture:** Keep the current Next.js App Router and server-side data functions. Replace the public presentation layer with focused legacy-style sections, pass real product/category data into the home catalogue, and preserve the existing query-driven product shell so only the result region changes during navigation.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-16-baihong-1to1-visual-return-design.md`

## Global Constraints

- The existing CloudDream site is the sole visual source of truth.
- Retain all existing routes, Supabase queries, admin proxy, inquiry CAPTCHA, SEO, schema, sitemap, and locale-ready data behavior.
- Use verified customer facts and real customer assets only.
- Do not introduce warranty or guarantee language.
- Product imagery must remain complete with `object-fit: contain` and a clean continuous background.
- Do not merge or deploy Production before desktop and 390px Taste review reaches `PASS`.

---

### Task 1: Accessible legacy header and banner shell

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/logo.tsx`
- Modify: `components/main-nav.tsx`
- Modify: `components/mobile-nav.tsx`
- Modify: `components/home/banner-carousel.tsx`
- Modify: `lib/data/banners.ts`
- Test: `tests/legacy-header-banner.test.tsx`

**Interfaces:**
- Consumes: `navItems`, `siteConfig`, and `BannerSlide[]`.
- Produces: an accessible header containing Home navigation and a banner carousel that displays original artwork without replacement hero copy.

- [ ] **Step 1: Write the failing test**

Render the real header and banner components. Assert that the header exposes the Home link, utility contact links, official logo home link, and uppercase desktop navigation; assert that the banner contains three labelled slides and no `Request a Quote` hero button.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/legacy-header-banner.test.tsx`

Expected: FAIL because the current banner renders replacement CTA content and the header does not expose the legacy utility message/structure.

- [ ] **Step 3: Write minimal implementation**

Implement the compact white/orange utility bar, large official logo, black uppercase navigation, and artwork-first banner with accessible controls and reduced-motion handling.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/legacy-header-banner.test.tsx`

Expected: PASS.

### Task 2: Database-driven legacy home sequence

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/popular-search.tsx`
- Create: `components/home/home-product-catalog.tsx`
- Modify: `components/home/company-intro.tsx`
- Modify: `components/home/categories-grid.tsx`
- Modify: `components/home/capability-section.tsx`
- Modify: `components/home/cta-section.tsx`
- Modify: `components/home/news-preview.tsx`
- Modify: `components/home/faq-preview.tsx`
- Test: `tests/legacy-home.test.tsx`

**Interfaces:**
- Consumes: `fetchCategories()`, `fetchProducts({ pageSize: 6 })`, `fetchBannerSlides()`.
- Produces: the approved nine-section home sequence using real categories and products.

- [ ] **Step 1: Write the failing test**

Render the home section composition with literal product/category fixtures and assert the visible sequence: popular search, Main Product Category, company introduction, About Us, Business Advantages, Quality Service, News, FAQ.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/legacy-home.test.tsx`

Expected: FAIL because the current home page lacks the popular-search and legacy catalogue/service sequence.

- [ ] **Step 3: Write minimal implementation**

Add the missing sections, pass six real products and category data from the server component, and restyle retained sections to the compact white/grey/orange system.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/legacy-home.test.tsx`

Expected: PASS.

### Task 3: Legacy product-display hero and persistent catalogue shell

**Files:**
- Modify: `app/products/layout.tsx`
- Modify: `components/product-catalog.tsx`
- Modify: `components/product-card.tsx`
- Modify: `components/products/category-nav.tsx`
- Modify: `components/products/pagination.tsx`
- Create: `components/products/product-display-hero.tsx`
- Test: `tests/legacy-product-catalog.test.tsx`

**Interfaces:**
- Consumes: `ProductCategory[]`, `ProductPage`, `activeCategory`, `category`, and `sub`.
- Produces: deep-navy product hero, left grey category rail, three-column desktop grid, six-card page, and query-link navigation.

- [ ] **Step 1: Write the failing test**

Render the product layout pieces with literal fixtures. Assert `PRODUCT DISPLAY`, the category rail, six complete product links/images, and Prev/Next pagination URLs that preserve category/subcategory parameters.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/legacy-product-catalog.test.tsx`

Expected: FAIL because the current page uses the generic light page header and modern card system.

- [ ] **Step 3: Write minimal implementation**

Implement the navy hero and compact old-site catalogue treatment while preserving Next links, search parameters, Suspense boundaries, and `object-contain` product stages.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/legacy-product-catalog.test.tsx`

Expected: PASS.

### Task 4: Global theme and legacy footer

**Files:**
- Modify: `app/globals.css`
- Modify: `components/site-footer.tsx`
- Test: `tests/legacy-footer.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` and `navItems`.
- Produces: compact dark footer with readable official logo, legal owner text, site links, and verified contact information.

- [ ] **Step 1: Write the failing test**

Render the real footer and assert the official legal owner, phone, email, address, home-linked Logo, and all navigation destinations.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/legacy-footer.test.tsx`

Expected: FAIL on the approved dark legacy footer landmark and punctuation-normalized copyright contract.

- [ ] **Step 3: Write minimal implementation**

Apply the black/orange/white tokens globally, normalize the legal owner punctuation, and implement the compact dark footer without changing contact facts.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/legacy-footer.test.tsx`

Expected: PASS.

### Task 5: Build, browser verification, and Taste gate

**Files:**
- Modify: visual implementation files only when evidence identifies a defect.
- Create: `.codex-delivery/evidence/visual-return/` screenshots in the non-committed delivery evidence area.

**Interfaces:**
- Consumes: the completed local application and the public CloudDream reference.
- Produces: build evidence and desktop/mobile Taste verdict.

- [ ] **Step 1: Run automated verification**

Run: `pnpm vitest run && pnpm build`

Expected: all tests PASS and Next production build succeeds.

- [ ] **Step 2: Start local preview**

Run: `pnpm dev`

Expected: local site responds successfully.

- [ ] **Step 3: Capture real browser evidence**

Capture homepage and product-page screenshots at 1440px desktop and 390px mobile in the in-app browser. Verify banner artwork, section order, category rail, six-card grid, product image completeness, footer Logo, and mobile navigation.

- [ ] **Step 4: Apply Taste verdict**

Score Banner, brand specificity, hierarchy, image quality, narrative rhythm, and mobile adaptation. Require at least 20/24, every dimension at least 3/4, and no project-rule blocker for `PASS`; otherwise fix the evidenced defects and repeat screenshots.

- [ ] **Step 5: Prepare integration only after PASS**

Run final diff review and the repository's verification commands. Do not merge to `main` or update Production until the visual gate passes.

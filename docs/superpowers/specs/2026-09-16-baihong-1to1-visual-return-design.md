# Baihong 1:1 Visual Return Design

## Objective

Rebuild the current Next.js customer site so its public visual system follows the existing CloudDream site at `https://baihongsnackmachine.com/` as closely as practical while retaining the already completed Supabase, admin, inquiry CAPTCHA, SEO, locale-ready data, and ISR integrations.

## Approved visual source of truth

The existing public CloudDream site is the sole visual reference. The current Vercel preview is not a design reference where it conflicts with that site. The supplied old-site screenshots establish the following non-negotiable characteristics:

- White page chrome with a thin utility bar, large official logo, black uppercase navigation, and orange active/utility accents.
- Original 1920 × 800 banner artwork, with the artwork's own typography and composition remaining visible instead of being replaced by a modern text-and-CTA hero.
- Dense B2B catalogue rhythm rather than large modern landing-page cards.
- Product landing hero in deep navy with `PRODUCT DISPLAY` copy and a right-side equipment composition.
- Product catalogue using a grey left category rail and a three-column, six-products-per-page grid on desktop.
- Category and pagination navigation preserve the surrounding catalogue shell; only the right product result region changes.
- Orange hover/active treatments and mostly square, lightly bordered surfaces.

## Information architecture

The existing public routes and backend contracts remain unchanged. The home page follows this sequence:

1. Original banner carousel
2. Popular search strip
3. Main Product Category catalogue preview
4. Company history/years introduction
5. About Us
6. Business Advantages
7. Quality Service contact band
8. News
9. FAQ

The product page follows this sequence:

1. `PRODUCT DISPLAY` navy hero
2. `Main Product Category` heading and verified descriptive copy
3. Desktop left category rail plus right product grid
4. Mobile collapsible category rail plus product grid

## Data and content constraints

- Product cards and categories continue to read from Supabase through `fetchProducts()` and `fetchCategories()`.
- The home catalogue uses six real active products and the existing category data.
- News remains database-driven and retains a truthful empty state.
- Company facts must come from verified customer materials or the existing published customer site.
- No warranty, guarantee, certification, rating, price, stock, export-market, or unsupported capacity claims may be introduced.
- The official Logo, favicon, three banner artworks, factory image, legal company name, contact details, and R2 product images are retained.

## Responsive behavior

- Desktop target: 1440px-wide browser, with a centered 1200px content container matching the old site's density.
- Mobile target: 390px viewport, with a compact header, non-cropped banner focal area, single-column product cards, and a collapsible category list.
- Product images use `object-fit: contain` with a clean white image stage so equipment remains fully visible.
- All major sections retain viewport-entry motion through the existing `Reveal` component; reduced-motion users receive visible content without forced animation.

## Visual tokens

- Primary text/nav: near-black.
- Accent: warm orange matching the old site.
- Product hero: deep navy.
- Page surfaces: white and very light neutral grey.
- Corners: square to small radius; no pill-shaped card language.
- Typography: compact sans-serif with strong uppercase navigation and bold section headings.

## Acceptance criteria

- Desktop and 390px screenshots visibly match the old site's header, banner treatment, density, section order, product hero, sidebar, card grid, and orange accent system.
- Banner artwork is not obscured by rewritten hero copy or large CTA controls.
- Desktop product category and pagination interactions do not cause a full document reload and preserve the left rail.
- Product pages render six cards per page, with complete equipment images and consistent image-stage backgrounds.
- Existing admin, products, articles, inquiry CAPTCHA, metadata, schema, sitemap, and routes continue to build.
- Taste review reaches `PASS` before the branch is merged or Production is overwritten.

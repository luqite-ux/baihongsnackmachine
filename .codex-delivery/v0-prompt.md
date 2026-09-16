# Build the Baihong Snack Machine website as a faithful, maintainable reconstruction

Create a complete, runnable Next.js 16 App Router frontend for Xuzhou Baihong Kitchen Equipment Co., Ltd. This is an English-first B2B inquiry website for commercial snack and food machinery. The published reference site is https://baihongsnackmachine.com/ and its approved appearance is the sole visual reference.

## Non-negotiable fidelity requirement

Reconstruct the current website as close to 1:1 as practical: preserve the recognizable header proportions, Baihong blue/orange brand palette, typography scale, spacing density, three existing homepage Banner images and message topics, section order, product-card appearance, footer information, and desktop visual rhythm. Do not freely redesign it, replace it with a generic modern template, or reinterpret it as a dark-tech site. Improvements are limited to responsive behavior, accessibility, maintainability, and the requested partial-refresh product interaction.

Use the attached published assets as customer-owned source material. The three Banner attachments are already approved; do not replace or regenerate them. Use them as full-width backgrounds/complete visual assets and overlay accessible real DOM headings, body copy and CTA controls. Preserve their focal subjects on desktop and build an explicit 390 px crop/safe area for each Banner.

## Verified identity and contact facts

- Formal Chinese company name: 徐州百泓厨房设备有限公司.
- Published English company name: Xuzhou Baihong Kitchen Equipment Co., Ltd.
- Brand: BAIHONG.
- Website: https://baihongsnackmachine.com/
- Phone / WhatsApp: +86 15252102737.
- Email: info@baihongsnackmachine.com.
- Address: Group 3, Dailou Village, Zhengji Town, Tongshan District, Xuzhou City, Jiangsu Province.
- Published positioning: a manufacturer specializing in the design, production and processing of food machinery.

Do not add certifications, factory scale, production capacity numbers, export countries, clients, guarantees, warranty or product specifications that are not present in the supplied material.

## Brand and asset mapping

- `174184857.png`: official visible Baihong logo source for header, footer and a same-brand favicon derivative. Keep its aspect ratio; do not redraw or recolor it.
- `174208172.jpg`, `174208173.jpg`, `174208174.jpg`: the three existing homepage Banner backgrounds. All three must remain in the carousel.
- `174184178.jpg`, `174184179.jpg`, `174185436.png`: representative product assets for establishing the card and product-detail image stages. They are samples only, not the full catalog.
- `174185470.jpg`: representative company/factory image for the About visual treatment.

The full published catalog contains 278 products across 15 top-level product groups and 47 public pages. Do not infer the catalog size from the attached sample images and do not hard-code the sample set as the final catalog. Codex will connect the complete catalog and shared backend after source handoff.

## Required page structure

Create independent routes and complete templates for:

- Home (`/`)
- About Us (`/about`)
- Products (`/products`)
- Product detail (`/products/[slug]`)
- News (`/news`) with a truthful empty state when no published articles exist
- News detail (`/news/[slug]`)
- FAQ (`/faq`)
- Contact / Request a Quote (`/contact`)

Keep explicit Home navigation and make the Logo link to Home. Preserve compatibility intent for the old routes `/sy`, `/xwzx`, `/skhx`, `/lxwm`, `/gywm`, and `/gywm_05191117_662` so Codex can add redirects after handoff.

## Product catalog interaction — exact customer requirement

The desktop Products page must preserve the current two-column composition: a stable left product-category navigation and a right product list/pagination area. Clicking a category, subcategory, page number, Previous or Next must update only the right product region; the page shell, header, explanatory copy and left category column must not fully reload, jump, flash, or lose position. Provide a clear loading state in the right region, URL/search-param state that can be shared and revisited, keyboard focus retention, and accessible announcements.

The verified product taxonomy is:

1. Grill — Gas barbecue grill; Black King Kong Barbecue Stove; Electric barbecue grill; Graphene barbecue grill; Dual control barbecue grill.
2. Aluminum Plate Category — Hamburger machine; Sausage Machine; Aluminum plate fryer combination machine; Aluminum plate combination machine; Bird Egg Machine; Octopus Ball Machine.
3. Deep Fryer — electric deep fryer; deep fryer.
4. Iron plate machine.
5. Crispy egg cake machine.
6. Pancake stove — Fried bun stove; Gas fryer; Gas pancake stove.
7. popcorn machine.
8. Bag bread.
9. Sweet potato stove.
10. Fire stove.
11. Gluten Forming Machine.
12. pizza machine.
13. Cut flower machine.
14. Commercial electric heating pan.
15. Meatball Machine.

Product images are product-subject images: show the entire machine with `object-fit: contain` or equivalent, preserve aspect ratio, add safe breathing room, and use a clean continuous light image stage matching the original photo background. Never crop product edges to force equal cards. Hover must not zoom far enough to clip the product.

## Visual system

- Preserve the existing Baihong blue/orange identity, white/light-neutral content backgrounds, compact industrial B2B typography and squared/lightly rounded geometry.
- Keep header, navigation, Banner, product/category and footer proportions visually close to the reference site.
- Avoid generic blue-tech gradients, glassmorphism, excessive pills, giant rounded cards, neon effects, random icon sets and decorative imagery unrelated to actual kitchen equipment.
- Every information-card group must use consistent, semantically relevant line icons; never use Emoji.
- Maintain WCAG AA contrast and visible keyboard focus states.

## Home content and truthful data

Preserve the current narrative: three Banner slides, main product categories, company introduction, product/manufacturing capability using only verified copy, service/contact CTA, FAQ, news-ready area and footer. Do not invent news. The news section must be data-ready and render an honest empty state until real articles are published.

## B2B inquiry behavior

No prices, shopping cart, checkout or online payment. Banner CTAs, product cards, product detail CTAs and the Contact page must lead to inquiry/RFQ flows. The form UI must include name, company, email, phone/WhatsApp, target product, procurement requirement and message, plus pending/success/error states. Do not fake successful submission with `alert`, `console.log` or `setTimeout`; leave the backend integration boundary clear for Codex.

## Locale and data architecture

English is the visible launch language. Keep locale-aware interfaces and field mapping for future languages using request locale → default locale → first non-empty locale fallback. Do not generate empty language pages. Product, category, article and site-setting data must be replaceable by server-side backend queries without redesigning components.

## Motion plan

Implement the attached motion plan faithfully. Most importantly, no 15-second or other global timeout may mark off-screen sections as revealed. Off-screen sections must remain pending until they actually enter the viewport. Under reduced motion or script failure, content remains immediately visible and the Banner does not autoplay.

## Footer, SEO and favicon

- Copyright format: `© {runtime current year} Xuzhou Baihong Kitchen Equipment Co., Ltd. All rights reserved.` Normalize punctuation to avoid double periods.
- Use the same verified company identity in Organization/WebSite structured data.
- Create dynamic metadata-ready page boundaries for products and news.
- Derive a square, legible favicon from the official Baihong logo, remove all v0/Next.js/template default icon conflicts, and wire valid App Router icon metadata.

## Technical output

Return complete, downloadable source for a production-buildable Next.js 16 App Router project. Use maintainable components, TypeScript, responsive images and clear Server/Client boundaries. All public routes must be usable at 1440 px and 390 px, have no horizontal overflow, support keyboard and touch, and preserve content when JavaScript animation enhancements fail.

Deliver the complete route set and source code, not a screenshot or image-only concept. Do not configure Supabase, R2, Vercel, DNS or the shared admin; Codex handles those after source handoff.

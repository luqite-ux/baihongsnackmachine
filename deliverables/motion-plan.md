# Baihong Snack Machine Motion Plan

## Goal

Preserve the current Baihong website's restrained industrial-commercial presentation while rebuilding it as a maintainable Next.js site. Motion may improve clarity, but it must not visually redesign the approved CloudDream/Jindouyun reference.

## Selected combination

- `MOT-BAIHONG-01` — Keep the three existing customer Banner images and their existing message hierarchy. Use a short cross-fade, manual controls, pause-on-hover/focus, touch swipe, and stop autoplay under `prefers-reduced-motion`.
- `MOT-BAIHONG-02` — Product category interactions update only the right product grid. The left category navigation remains stable; grid items use a 160–220 ms opacity/8 px transition after data changes.
- `MOT-BAIHONG-03` — Major sections reveal once on entering the viewport with 12–20 px bounded movement and no global/fixed timeout. Off-screen sections remain pending until actually viewed.
- `MOT-BAIHONG-04` — Navigation, category rows, pagination, product cards, FAQ, CTA and inquiry controls receive short hover/focus/press feedback. No required information is hover-only.

## Industry-specific motion

For food-machinery process and capability sections, use a single short heat-flow/process-line trace that travels from preparation to cooking/output. This is an abstract information aid only; it must not imply unverified equipment or production capability.

## External candidates considered

- Motion viewport/in-view bounded reveal — adopt the one-shot viewport lifecycle and cleanup mechanism.
- CSS scroll-driven timelines — use only as optional progressive enhancement; core content must not depend on it.
- Deep parallax, continuous steam/particle loops, rotating equipment and scroll hijacking — reject because they reduce product legibility and mobile performance.

## Responsive and failure behavior

- Desktop reference: 1440 px; mobile reference: 390 px.
- Mobile Banner uses an explicit safe focal area per original image, never a blind center crop.
- With reduced motion or script failure, all content is immediately visible and usable.
- No timer may mark off-screen content as already revealed or consume its later entrance animation.

## Acceptance checklist

- Three current Banner images remain recognizable and preserve their existing text topics.
- Left category navigation does not jump or rerender during filter/pagination changes.
- Right grid change is clear without a full-page reload.
- Desktop and 390 px layouts have no clipped products, horizontal overflow, or hidden content.
- Reduced-motion and no-script states remain complete and readable.


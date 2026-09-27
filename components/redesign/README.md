# Redesign ("Monografie") — design system

The redesign reads like a small architecture monograph of H16's own work:
photographs are numbered plates with factual captions, Balerno is the only
display voice, the brand blue `#0E468C` is the ink for headings, links and
captions, reading text is near-black on a warm near-white paper, the brand
guide's pale aqua is used for one calm band, and every page ends on a solid
blue "back cover". No text ever sits on a photograph.

It is a **staging preview**: `next.config.js` rewrites each public path to
`pages/v2/*` only for the host `h16.peleman.io`; on `h16.be` every v2 page is
a 404. Production keeps the old pages until the client approves.

## Page mechanics (every `pages/v2/*` page)

```jsx
import PagesMetaHead from "../../components/PagesMetaHead";
import V2Page from "../../components/redesign/V2Page";
import { isProductionHost } from "../../lib/staging";

function Page(props) {
  return (
    <>
      <PagesMetaHead title="…" description="…" jsonLd={[…]} />  {/* identical to the current page */}
      <V2Page>{/* sections */}</V2Page>
    </>
  );
}
Page.ownLayout = true;           // _app skips the old DefaultLayout
export default Page;

export async function getServerSideProps({ req, params }) {
  if (isProductionHost(req)) return { notFound: true };
  // …fetch with fetcher() from lib/api, project with toProjectCard / toProjectDetail / toHomeProject
  return { props: { … } };
}
```

- Links always use the **public paths** (`/about`, `/realisaties/<slug>`, …), never `/v2/…`.
- Keep the current page's `<title>`, description, JSON-LD and in-page anchors
  (`/bouwcoordinatie#werkwijze`, `/samenwerken#professionals`, `/contact?dienst=…`, `/contact?project=…`).
- `V2Page` renders the skip link, `SiteHeader`, `<main id="inhoud">`, `SiteFooter` and runs the plate reveal.
- Never import `data/diensten.js` into client code (it holds draft notes); read it in `getServerSideProps` and pass strings as props.

## Tokens (Tailwind)

| Token | Hex | Use |
|---|---|---|
| `primary` | #0E468C | headings, links, buttons, the blue back cover |
| `primary-deep` | #0A3570 | hover/pressed of blue buttons |
| `primary-muted` | #31609B | eyebrows, captions, "Afb. n", meta lines (5.92:1 on paper) |
| `paper` | #F6F6F3 | page ground, header, chips, button on blue |
| `ink` | #262626 | reading text |
| `aqua-pale` | #E0EFF0 | one calm band per page / panels (ink 12.8:1, primary 7.8:1) |
| `aqua-light` | #BCE1E3 | labels/meta/underlines **on blue only** |
| `rule` / `rule-aqua` / `rule-blue` | #C8D3DE / #B6CDDC / #4B7CAA | 1px hairlines on paper / aqua / blue |
| `plate` | #E9EAE6 | image placeholder |
| `accent` | #D83415 | only the 8px «Te koop» dot |

Not used in the redesign: the cream `background`, `gray-*`, black. `accent-deep` (#A62710, 6.65:1 on paper) is allowed for **form error states only** (error text, the invalid-field edge, the alert rule).

## Type roles (fonts and fluid sizes unchanged)

| Element | Classes |
|---|---|
| Page title (h1) | `font-display text-display font-normal text-primary` |
| Section title (h2) | `font-display text-h1 font-normal text-primary` (via `SectionHead`) |
| Sub-section (h2/h3) | `font-display text-h2 font-normal text-primary` — `font-normal` is mandatory (Balerno has one weight) |
| Item names (h3) | `font-display text-h3 font-normal text-primary` |
| Lead | `text-lead text-ink` |
| Body | `text-body text-ink hyphens-auto`, measure `max-w-[62ch]` |
| Eyebrow / caption / meta | `text-meta text-primary-muted`, sentence case, never uppercase |
| UI (nav, buttons, small links) | `text-ui` |

## Layout

- Sections: full-width wrapper + inner `container mx-auto`; desktop grid `lg:grid lg:grid-cols-12 lg:gap-x-6`.
- First section of a page: `pt-6 md:pt-10 lg:pt-14`.
- Between sections: `mt-[4.5rem] md:mt-section`. Inside a section: `mt-group`, `mt-10`, `mt-8`, `mt-4`.
- Spacing rule: margin-top on the **later** element only; no `mb-*` seams, no spacer divs.
- Radius 0 everywhere (square buttons, plates, panels). Focus: `focus-ring` (paper/aqua) or `focus-ring-inverse` (blue).
- Grounds per page: paper by default; at most one `bg-aqua-pale` band (or aqua panels); the blue only for the closing `BackCover` + footer.
- Phone-first: full-bleed photos on phones with `-mx-4 sm:-mx-6 md:mx-0` (captions then get `px-4 sm:px-6 md:px-0`). No horizontal overflow at 320px.

## Components

- `ui.jsx`: `ArrowLink` (text link + glued arrow; `size="lead"|"ui"`, `tone="light"|"blue"`), `TextLink`, `ButtonLink` (`variant="primary"|"inverse"`), `SectionHead` (eyebrow + heading), `Arrow`.
- `Plate.jsx`: `Plate` (fixed-ratio photo box via next/image `fill`; `image={{src, alt, op:{sm, md}}}`, `ratio="aspect-[4/5] md:aspect-[3/2]"`, `sizes`, `href` for a clickable photo, `reveal` for the scroll reveal, `as="div"` + `lg:contents` to place box and caption separately), `PlateLine` (two-line "Afb. n + linked name / meta" caption), `SaleChip`.
- `BackCover.jsx`: the blue contact band («Jouw bouwproject onder onze vleugels?», one line, the contact button; `contactHref`/`track` props). No contact list here — phone, e-mail and address are in the footer. End every page with it, except `/contact` itself.
- `Professionals.jsx`, `Werkwijze.jsx` (compact), `Mensen.jsx`, `Spread.jsx`, `Realisaties.jsx`, `Interlude.jsx`: homepage sections; reuse where they fit.
- `realisatie/ZoomPlate.jsx`: a plate that is never cropped (intrinsic width/height from Strapi, `sizes` = rendered width) and opens the Lightbox; use it for galleries (a `<div>` may not sit inside a `<button>`, so `Plate` cannot be used there).
- Forms (`ContactForm variant="v2"`): white field, 1px `primary-muted` edge, 2px `primary` outline on focus, inset `accent-deep` edge when invalid; labels `text-ui`, visible required markers.
- Strapi images: `assetUrl(path)` from `lib/seo`; allowed by `images.remotePatterns`. **`sizes` must account for object-cover overscan**: a 3:2 photo in a 1:1 box renders 1.5× the box width, in a 4:5 box 1.875×.

## Content rules

- Only existing copy from the site or the CMS; no invented facts, numbers, testimonials or claims. UI labels ("Afb. n", "Adres", "Naar de inhoud") are fine.
- Formal **u/uw** for clients. Informal only for «Jouw bouwproject onder onze vleugels?» and the professionals copy («Ben je architect?»…).
- Numbered plates: "Afb. n" restarts at 1 on every page, in DOM order.
- Never put `data-track` on `tel:`/`mailto:` links (Analytics tracks them automatically). Buttons/CTAs get `data-track="<page>-<what>"`.

## Accessibility

One h1 per page, logical heading order, `aria-labelledby` on sections, alt text in Dutch that names the project, decorative images `alt=""`, 44px tap targets below 1024px, visible focus, `prefers-reduced-motion` respected (no loops, no autoplay).

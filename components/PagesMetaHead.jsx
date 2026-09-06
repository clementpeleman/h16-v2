import Head from "next/head";
import { useRouter } from "next/router";
import { absoluteUrl, organizationJsonLd, SITE_URL } from "../lib/seo";

const BRAND = "H16 Vastgoedontwikkeling";
const DEFAULT_DESCRIPTION =
  "Bouwcoördinatie en projectontwikkeling door een klein familiebedrijf uit Oosterzele. Uw bouwproject van begin tot eind opgevolgd.";
// 1200x630 brand card. Every share on Facebook, Instagram or WhatsApp used
// to unfurl as a text block; twitter:card was summary_large_image with no
// image behind it.
const DEFAULT_IMAGE = "/images/og-default.jpg";

// Indexing is opt-in, not opt-out. h16.peleman.io is going up before h16.be,
// and a staging host that Google indexes will compete with the real domain for
// the firm's own name — and keep ranking after the move. Only the deployment
// that sets this to "true" is indexable. pages/robots.txt.js reads the same
// flag, so meta-robots and robots.txt cannot disagree.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// DefaultLayout renders one of these with defaults as a site-wide fallback and
// every page renders its own on top. Next de-duplicates <title> and
// <meta name=...> by itself but NOT <link>, og `property` or <script>, so
// every one of those carries an explicit key — without it the canonical
// rendered twice and og:title showed the default title on every page.
function PagesMetaHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  // Pages get "<title> | H16 Vastgoedontwikkeling"; the homepage sets its
  // full title itself.
  titleTemplate = true,
  // Extra JSON-LD blocks (breadcrumbs, a listing). The Organization block is
  // always included so it exists on every page exactly once.
  jsonLd = [],
}) {
  const router = useRouter();
  // asPath carries query strings; canonical must not.
  const path = (router?.asPath || "/").split(/[?#]/)[0];
  const canonical = SITE_URL ? absoluteUrl(path) : null;
  const fullTitle = !title ? BRAND : titleTemplate ? `${title} | ${BRAND}` : title;
  const imageUrl = SITE_URL ? absoluteUrl(image) : image;
  const structured = [organizationJsonLd(), ...jsonLd.filter(Boolean)];

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{fullTitle}</title>

      {canonical && <link rel="canonical" href={canonical} key="canonical" />}
      {!ALLOW_INDEXING && (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      )}

      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:locale" content="nl_BE" key="og:locale" />
      <meta property="og:site_name" content={BRAND} key="og:site_name" />
      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      {canonical && <meta property="og:url" content={canonical} key="og:url" />}
      <meta property="og:image" content={imageUrl} key="og:image" />
      {image === DEFAULT_IMAGE && (
        <>
          <meta property="og:image:width" content="1200" key="og:image:width" />
          <meta property="og:image:height" content="630" key="og:image:height" />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={fullTitle} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />

      <script
        type="application/ld+json"
        key="jsonld"
        // JSON.stringify output is safe to inline; "<" is escaped so a value
        // can never close the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
    </Head>
  );
}

export default PagesMetaHead;

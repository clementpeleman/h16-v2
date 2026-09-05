import Head from "next/head";
import { useRouter } from "next/router";

// Absolute base for canonical and og:url. Set per deployment.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

// Indexing is opt-in, not opt-out. h16.peleman.io is going up before h16.be,
// and a staging host that Google indexes will compete with the real domain for
// the firm's own name — and keep ranking after the move. Only the deployment
// that sets this to "true" is indexable.
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

function PagesMetaHead({ title, keywords, description }) {
  const router = useRouter();
  // asPath carries query strings; canonical must not.
  const path = (router?.asPath || "/").split(/[?#]/)[0];
  const canonical = SITE_URL ? `${SITE_URL}${path === "/" ? "" : path}` : null;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>

      {canonical && <link rel="canonical" href={canonical} key="canonical" />}
      {!ALLOW_INDEXING && (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      )}

      {/* The firm links to its own Facebook and Instagram, so project links get
          shared — and an unfurl with no title or description is a wasted one. */}
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:locale" content="nl_BE" key="og:locale" />
      <meta property="og:site_name" content="H16 Vastgoedontwikkeling" key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      {canonical && <meta property="og:url" content={canonical} key="og:url" />}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
    </Head>
  );
}

PagesMetaHead.defaultProps = {
  title: "H16 Vastgoedontwikkeling",
  keywords:
    "vastgoed, Gent, Oosterzele, Bouwgrond, Merelbeke, Huizen, Huis, Appartement, Project, Werf",
  description: "Wij geven een nieuwe invulling aan huizen en gronden.",
};

export default PagesMetaHead;

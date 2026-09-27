import { ALLOW_INDEXING } from "../components/PagesMetaHead";
import { absoluteUrl, isCanonicalHost } from "../lib/seo";

// NEXT_PUBLIC_ALLOW_INDEXING says whether this BUILD may be indexed, but
// h16.be, www.h16.be and h16.peleman.io all run the same build — with the flag
// on for production, staging served "Allow: /" too. So the host decides as
// well: only the canonical host (NEXT_PUBLIC_SITE_URL) is ever crawlable.
// next.config.js adds an X-Robots-Tag: noindex header on every other host.
export async function getServerSideProps({ req, res }) {
  const indexable = ALLOW_INDEXING && isCanonicalHost(req);
  const body = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
    : `User-agent: *\nDisallow: /\n`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.setHeader("Vary", "Host");
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}

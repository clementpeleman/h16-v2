import { ALLOW_INDEXING } from "../components/PagesMetaHead";
import { absoluteUrl } from "../lib/seo";

// One env var (NEXT_PUBLIC_ALLOW_INDEXING) drives both meta-robots and this
// file, so a staging host cannot end up with a permissive robots.txt and the
// production host cannot end up blocked by a forgotten static file.
export async function getServerSideProps({ res }) {
  const body = ALLOW_INDEXING
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
    : `User-agent: *\nDisallow: /\n`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}

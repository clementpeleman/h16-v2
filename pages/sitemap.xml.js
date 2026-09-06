import { fetcher } from "../lib/api";
import { absoluteUrl } from "../lib/seo";

// Dynamic sitemap: the fixed pages plus every project slug from Strapi, with
// lastmod from the CMS. Regenerated at most hourly at the edge.
const STATIC = ["/", "/realisaties", "/samenwerken", "/about", "/contact"];

function entry(path, lastmod) {
  return (
    `<url><loc>${absoluteUrl(path)}</loc>` +
    (lastmod ? `<lastmod>${lastmod.substring(0, 10)}</lastmod>` : "") +
    `</url>`
  );
}

export async function getServerSideProps({ res }) {
  const projects = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=100`
  );
  const urls = [
    ...STATIC.map((p) => entry(p)),
    ...(projects?.data ?? [])
      .filter((p) => p?.attributes?.slug)
      .map((p) =>
        entry(`/realisaties/${p.attributes.slug}`, p.attributes.updatedAt)
      ),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.join("") +
    `</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}

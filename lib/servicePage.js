import { DIENSTEN } from "../data/diensten";
import { fetcher, toProjectCard } from "./api";
import { isCanonicalHost } from "./seo";

// Server-rendered rather than static because the answer depends on the host:
// a draft service is a 404 on h16.be but renders on h16.peleman.io (noindex,
// with the Tack review widget) and localhost, so H16 can review it in place.
export async function loadServicePage(slug, { req }) {
  const dienst = DIENSTEN[slug];
  if (!dienst || (!dienst.ready && isCanonicalHost(req))) {
    return { notFound: true };
  }

  const filters = dienst.realisaties
    .map((s, i) => `filters[slug][$in][${i}]=${encodeURIComponent(s)}`)
    .join("&");
  const response = filters
    ? await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?${filters}&populate=thumbnail`
      )
    : { data: [] };
  const cards = (response?.data ?? []).map(toProjectCard);
  // Keep the order chosen in data/diensten.js, and drop a slug that no longer
  // exists instead of rendering an empty card.
  const realisaties = dienst.realisaties
    .map((s) => cards.find((c) => c.slug === s))
    .filter(Boolean);

  return { props: { dienst, realisaties } };
}

import { isCanonicalHost } from "./seo";
import { fetcher } from "./api";

// Every pages/v2/* page starts its getServerSideProps with this: the
// redesign is a staging preview, so on the production host it does not exist.
export function isProductionHost(req) {
  return isCanonicalHost(req);
}

// Strapi fetch for the v2 pages with a timeout: a hanging CMS must fall back
// to the pages' empty states instead of blocking the request for minutes.
// (Not used by the production ISR pages, where a timeout would regenerate a
// good page as an empty one.)
export function v2fetch(url, timeoutMs = 5000) {
  return fetcher(url, { signal: AbortSignal.timeout(timeoutMs) });
}

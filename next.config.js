// The canonical origin, e.g. https://h16.be. Read at BUILD time (redirects and
// headers are compiled into the routes manifest), so Coolify must pass it as a
// build arg — see the Dockerfile.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
let CANONICAL_HOST = "";
try {
  CANONICAL_HOST = new URL(SITE_URL).host.toLowerCase();
} catch {
  // No SITE_URL (local dev without .env.local): no host rules at all.
}

// An indexable build without a canonical host would fail silently in the
// worst way: robots.txt answers "Disallow: /" on every host, h16.be included,
// and the www redirects vanish. Refuse to build instead.
if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" && !CANONICAL_HOST) {
  throw new Error(
    "NEXT_PUBLIC_ALLOW_INDEXING is true but NEXT_PUBLIC_SITE_URL is missing or not an absolute URL; set it as a build arg (e.g. https://h16.be)."
  );
}

// `has`/`missing` values are regexes anchored at both ends; the dots in a
// hostname must not match any character.
const hostPattern = (host) => host.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// The old site lived on www.h16.be, so that is the host Google still has
// indexed. Coolify's own www -> apex redirect is a 302 (temporary), which tells
// Google to keep the www URLs; and an old /projects/<slug> took two hops to
// reach /realisaties/<slug>. With Coolify set to serve both hosts, these send
// every www URL to its final apex URL in ONE permanent (308) hop.
const WWW_HOST =
  CANONICAL_HOST && !CANONICAL_HOST.startsWith("www.") ? `www.${CANONICAL_HOST}` : "";

function wwwRedirects() {
  if (!WWW_HOST) return [];
  const has = [{ type: "host", value: hostPattern(WWW_HOST) }];
  return [
    { source: "/projects", has, destination: `${SITE_URL}/realisaties`, permanent: true },
    { source: "/projects/:slug", has, destination: `${SITE_URL}/realisaties/:slug`, permanent: true },
    { source: "/colab", has, destination: `${SITE_URL}/samenwerken`, permanent: true },
    { source: "/:path*", has, destination: `${SITE_URL}/:path*`, permanent: true },
  ];
}

module.exports = {
  // Self-contained server build for the Coolify container.
  output: "standalone",

  async redirects() {
    return [
      // Host rules first: a www request must never be answered by a
      // path-only rule below, which would keep it on www for one more hop.
      ...wwwRedirects(),
      // 2026-09 rename to Dutch paths. The old site on www.h16.be used the
      // English ones, so these carry its indexed URLs over. Permanent.
      { source: "/projects", destination: "/realisaties", permanent: true },
      { source: "/projects/:slug", destination: "/realisaties/:slug", permanent: true },
      { source: "/colab", destination: "/samenwerken", permanent: true },
      {
        source: "/login",
        destination: "https://h16.strapi.peleman.io/admin",
        permanent: false,
      },
    ];
  },

  // Staging preview of the site redesign: on h16.peleman.io (and only there)
  // each public path is served by its counterpart under pages/v2/, which all
  // 404 on h16.be. Production keeps the current pages until the redesign is
  // approved. Links inside v2 pages use the public paths, so navigation stays
  // inside the redesign (the client router evaluates `has: host` too).
  async rewrites() {
    const has = [{ type: "host", value: hostPattern("h16.peleman.io") }];
    const V2_ROUTES = [
      ["/", "/v2"],
      ["/about", "/v2/about"],
      ["/samenwerken", "/v2/samenwerken"],
      ["/contact", "/v2/contact"],
      ["/realisaties", "/v2/realisaties"],
      ["/realisaties/:slug", "/v2/realisaties/:slug"],
      ["/bouwcoordinatie", "/v2/bouwcoordinatie"],
      ["/projectontwikkeling", "/v2/projectontwikkeling"],
    ];
    return {
      beforeFiles: V2_ROUTES.map(([source, destination]) => ({ source, has, destination })),
    };
  },

  async headers() {
    if (!CANONICAL_HOST) return [];
    return [
      {
        // Every host that is not the canonical one — h16.peleman.io (staging,
        // where the Tack review widget lives), the bare IP, localhost — is
        // served by the same build as production, so it must say noindex at
        // request time. A cross-domain canonical alone is only a hint.
        source: "/:path*",
        missing: [{ type: "host", value: hostPattern(CANONICAL_HOST) }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  reactStrictMode: true,
  images: {
    // Strapi sends max-age=0, which made the optimizer re-encode the 8000px
    // originals every 60s. Upload names are content-hashed and every deploy
    // starts a fresh container (empty cache), so a long TTL is safe.
    minimumCacheTTL: 31536000,
    // Only the self-hosted Strapi v5. The old EC2 Strapi v4 and the previous
    // strapi.peleman.io hostname are gone (timeout / 503); leaving them
    // allowed let crawlers holding old image URLs tie up the optimizer in
    // 10-second connect timeouts several times a day.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "h16.strapi.peleman.io",
        pathname: "/uploads/**",
      },
    ],
  },
};

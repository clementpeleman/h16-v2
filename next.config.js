module.exports = {
  // Self-contained server build for the Coolify container.
  output: "standalone",

  async redirects() {
    return [
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
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Self-hosted Strapi v5 — assets served from /uploads
      {
        protocol: "https",
        hostname: "h16.strapi.peleman.io",
        pathname: "/uploads/**",
      },
      // Previous hostname. Kept so the frontend can be deployed BEFORE the DNS
      // rename and keep serving images through the cutover. Remove once
      // h16.strapi.peleman.io is live and nothing 404s.
      {
        protocol: "https",
        hostname: "strapi.peleman.io",
        pathname: "/uploads/**",
      },
      // Old Strapi v4 backend — kept so images keep working until the env cutover
      {
        protocol: "http",
        hostname: "ec2-13-39-162-105.eu-west-3.compute.amazonaws.com",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
};

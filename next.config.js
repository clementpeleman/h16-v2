module.exports = {
  // Self-contained server build for the Coolify container.
  output: "standalone",

  async redirects() {
    return [
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

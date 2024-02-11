module.exports = {
  async redirects() {
    return [
      {
        source: "/login",
        destination:
          "http://ec2-13-39-162-105.eu-west-3.compute.amazonaws.com:1337/admin",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "ec2-13-39-162-105.eu-west-3.compute.amazonaws.com",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
};

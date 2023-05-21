module.exports = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://dolphin-app-4lkcd.ondigitalocean.app/admin',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dolphin-app-4lkcd.ondigitalocean.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

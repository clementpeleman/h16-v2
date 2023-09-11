module.exports = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://monkfish-app-9r4qk.ondigitalocean.app/admin',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'monkfish-app-9r4qk.ondigitalocean.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

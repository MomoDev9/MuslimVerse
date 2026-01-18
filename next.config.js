/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.quran.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "equran.id",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/alquran",
        destination: "/quran",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

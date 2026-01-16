/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ["api.quran.com", "equran.id", "cdn.jsdelivr.net"],
  // },
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

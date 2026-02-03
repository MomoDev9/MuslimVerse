export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/donat",
      },
    ],
    sitemap: "https://muslim-verse.vercel.app/sitemap.xml",
  };
}

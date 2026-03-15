import locData from "@/lib/loc.json";

const URL = process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-verse.vercel.app";
const LOCS_PER_SITEMAP = 10000;

function normalizeLocation(value) {
  if (!value || typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const locationList = Array.isArray(locData) ? locData : [];
  const locationSet = new Set(
    locationList
      .map((entry) => normalizeLocation(entry?.name))
      .filter(Boolean),
  );
  const locationCount = locationSet.size;
  const locSitemapCount = Math.max(
    1,
    Math.ceil(locationCount / LOCS_PER_SITEMAP),
  );

  const now = new Date().toISOString();
  const sitemapUrls = [
    `${URL}/sitemap-pages.xml`,
    ...Array.from({ length: locSitemapCount }, (_, index) => {
      const page = index + 1;
      return `${URL}/sitemap-loc/${page}.xml`;
    }),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemapUrls
      .map(
        (loc) =>
          `  <sitemap>\n` +
          `    <loc>${escapeXml(loc)}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `  </sitemap>\n`,
      )
      .join("") +
    `</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

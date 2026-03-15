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

function getPageNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export async function GET(request, { params }) {
  const { page } = await params;
  const pageNumber = getPageNumber(page);

  const locationList = Array.isArray(locData) ? locData : [];
  const locationSet = new Set(
    locationList
      .map((entry) => normalizeLocation(entry?.name))
      .filter(Boolean),
  );
  const locations = Array.from(locationSet).sort((a, b) =>
    a.localeCompare(b, "id"),
  );

  const totalPages = Math.max(1, Math.ceil(locations.length / LOCS_PER_SITEMAP));
  if (!pageNumber || pageNumber > totalPages) {
    return new Response("Not Found", { status: 404 });
  }

  const start = (pageNumber - 1) * LOCS_PER_SITEMAP;
  const end = start + LOCS_PER_SITEMAP;
  const chunk = locations.slice(start, end);

  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    chunk
      .map((name) => {
        const loc = `${URL}/prayer-times?kota=${encodeURIComponent(name)}`;
        return (
          `  <url>\n` +
          `    <loc>${escapeXml(loc)}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `  </url>\n`
        );
      })
      .join("") +
    `</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

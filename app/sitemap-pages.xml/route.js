import { quranAPI } from "@/lib/quranApi";
import doaData from "@/lib/doa.json";

const URL = process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-verse.vercel.app";

function slugify(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getHijriYear() {
  try {
    const fmt = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      year: "numeric",
    });
    const parts = fmt.formatToParts(new Date());
    const year = Number(parts.find((p) => p.type === "year")?.value);
    return Number.isFinite(year) ? year : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const now = new Date().toISOString();

  const staticPages = [
    "about",
    "calendar",
    "daily-dua",
    "favorite",
    "feedback",
    "prayer-times",
    "quran",
  ];

  const staticUrls = staticPages.map((page) => `${URL}/${page}`);

  const surahs = await quranAPI.getAllSurahs();
  const surahUrls = surahs.map((surah) => `${URL}/quran/${surah.id}`);

  const doaList = Array.isArray(doaData?.data) ? doaData.data : [];
  const doaUrls = doaList
    .map((item) => `${URL}/daily-dua/${slugify(item.nama)}`)
    .filter((url) => url !== `${URL}/daily-dua/`);

  const hijriYear = getHijriYear();
  const calendarUrls = hijriYear
    ? Array.from(
        { length: 12 },
        (_, idx) => `${URL}/calendar?hyear=${hijriYear}&hmonth=${idx + 1}`,
      )
    : [];

  const urls = [
    URL,
    ...staticUrls,
    ...surahUrls,
    ...doaUrls,
    ...calendarUrls,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (loc) =>
          `  <url>\n` +
          `    <loc>${escapeXml(loc)}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `  </url>\n`,
      )
      .join("") +
    `</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

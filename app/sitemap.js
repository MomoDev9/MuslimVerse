import { quranAPI } from "@/lib/quranApi";

const URL = "https://muslim-verse.vercel.app";

export default async function sitemap() {
  const staticPages = [
    "about",
    "calendar",
    "donate",
    "favorite",
    "feedback",
    "prayer-times",
    "quran",
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${URL}/${page}`,
    lastModified: new Date(),
  }));

  const surahs = await quranAPI.getAllSurahs();
  const surahUrls = surahs.map((surah) => ({
    url: `${URL}/quran/${surah.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    ...staticUrls,
    ...surahUrls,
  ];
}

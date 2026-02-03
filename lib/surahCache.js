import { cache } from "react";
import { quranAPI } from "@/lib/quranApi";

export const getSurahCached = cache(async (id) => {
  return quranAPI.getSurahDetail(id);
});

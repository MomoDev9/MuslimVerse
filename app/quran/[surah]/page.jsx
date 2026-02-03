import SurahDetailPage from "@/components/Quran/SurahDetailPage";
import Layout from "@/components/Layout/Layout";
import { getSurahCached } from "@/lib/surahCache";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  try {
    const { surah } = await params;
    const surahId = Number.parseInt(surah, 10);
    if (!Number.isInteger(surahId) || surahId < 1 || surahId > 114) {
      return {
        title: "Baca Al-Qur'an",
        description:
          "Baca dan dengarkan Al-Qur'an dan terjemahannya lengkap di MuslimVerse",
      };
    }

    const data = await getSurahCached(surahId);

    if (!data || !data.surahInfo) {
      return {
        title: "Baca Al-Qur'an - MuslimVerse",
        description:
          "Baca dan dengarkan Al-Qur'an dan terjemahannya lengkap di MuslimVerse.",
      };
    }

    const { namaLatin, arti } = data.surahInfo;

    return {
      title: `Surah ${namaLatin} - MuslimVerse`,
      description: `Baca dan dengarkan Surah ${namaLatin} (${arti}) dan terjemahannya lengkap di MuslimVerse.`,
    };
  } catch (error) {
    console.error("generateMetadata error:", error);

    return {
      title: "Baca Al-Qur'an - MuslimVerse",
      description:
        "Baca dan dengarkan Al-Qur'an dan terjemahannya lengkap di MuslimVerse.",
    };
  }
}

export default async function QuranSurahPage({ params }) {
  const { surah } = await params;
  return (
    <Layout>
      <SurahDetailPage surah={surah} />
    </Layout>
  );
}

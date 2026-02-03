import Layout from "@/components/Layout/Layout";
import SurahListPage from "@/components/Quran/SurahListPage";

export const metadata = {
  title: "List Surah",
  description:
    "Baca dan dengar Al-Qur'an dan terjemahannya lengkap di MuslimVerse.",
};

export default function QuranPage() {
  return (
    <Layout>
      <SurahListPage />
    </Layout>
  );
}

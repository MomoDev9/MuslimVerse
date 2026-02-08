import PrayerTimes from "@/components/Pray/PrayerTimesPage";
import Layout from "@/components/Layout/Layout";

export const metadata = {
  title: "Jadwal Sholat",
  description: "Lihat dan download Jadwal Sholat dan Imsakiyah di MuslimVerse",
};

export default function PrayerTimesPage() {
  return (
    <Layout>
      <PrayerTimes />
    </Layout>
  );
}

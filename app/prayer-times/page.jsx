import PrayerTimes from "@/components/OnePage/PrayerTimes";
import Layout from "@/components/Layout/Layout";

export const metadata = {
  title: "Jadwal Sholat",
  description: "Jadwal Sholat dan Imsakiyah di MuslimVerse",
};

export default function PrayerTimesPage() {
  return (
    <Layout>
      <PrayerTimes />
    </Layout>
  );
}

import Layout from "@/components/Layout/Layout";
import HijriMonthCalendar from "@/components/UI/Calendar";

export const metadata = {
  title: "Kalender Hijriyah | MuslimVerse",
};

export default function HijriCalendarPage() {
  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Kalender Hijriyah
        </h1>

        <HijriMonthCalendar year={1447} />
      </main>
    </Layout>
  );
}

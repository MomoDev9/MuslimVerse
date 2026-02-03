import Layout from "@/components/Layout/Layout";
import Calendar from "@/components/OnePage/Calendar";

export const metadata = {
  title: "Kalender Hijriyah",
  description:
    "Lihat kalender hijriyah dan hari-hari penting dalam kalender Islam.",
};

export default function HijriCalendarPage() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-4xl dark:text-white">
          Kalender Hijriyah
        </h1>

        <Calendar year={currentYear} />
      </main>
    </Layout>
  );
}

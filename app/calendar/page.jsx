import Layout from "@/components/Layout/Layout";
import Calendar from "@/components/OnePage/Calendar";
import { ISLAMIC_EVENTS } from "@/lib/islamicEvents";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-verse.vercel.app";

const DEFAULT_TITLE = "Kalender Hijriyah";
const DEFAULT_DESCRIPTION =
  "Lihat dan download kalender hijriyah dan hari-hari penting dalam kalender Islam.";

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabiul Awal",
  "Rabiul Akhir",
  "Jumadil Awal",
  "Jumadil Akhir",
  "Rajab",
  "Syaban",
  "Ramadhan",
  "Syawal",
  "Dzulqadah",
  "Dzulhijjah",
];

function normalizeNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeMonth(value) {
  const parsed = normalizeNumber(value);
  if (!parsed) return null;
  return parsed >= 1 && parsed <= 12 ? parsed : null;
}

function getHijriToday() {
  const today = new Date();
  const fmt = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const parts = fmt.formatToParts(today);
  const hDay = Number(parts.find((p) => p.type === "day")?.value);
  const hMonth = Number(parts.find((p) => p.type === "month")?.value);
  const hYear = Number(parts.find((p) => p.type === "year")?.value);

  return {
    hDay,
    hMonth,
    hYear,
  };
}

function getNextIslamicEvent() {
  const { hDay, hMonth, hYear } = getHijriToday();

  if (!hDay || !hMonth || !hYear) return null;

  const events = Object.entries(ISLAMIC_EVENTS)
    .map(([key, value]) => {
      const [day, month] = key.split("-").map(Number);
      return {
        day,
        month,
        ...value,
      };
    })
    .filter((event) => event.day && event.month)
    .sort((a, b) => a.month - b.month || a.day - b.day);

  if (!events.length) return null;

  const upcoming =
    events.find(
      (event) =>
        event.month > hMonth || (event.month === hMonth && event.day >= hDay),
    ) || events[0];

  const eventYear =
    upcoming.month > hMonth ||
    (upcoming.month === hMonth && upcoming.day >= hDay)
      ? hYear
      : hYear + 1;

  return {
    ...upcoming,
    eventYear,
  };
}

export async function generateMetadata({ searchParams }) {
  const resolvedParams = (await searchParams) ?? {};
  const hYear = normalizeNumber(
    resolvedParams?.hyear ?? resolvedParams?.tahun ?? resolvedParams?.year,
  );
  const hMonth = normalizeMonth(
    resolvedParams?.hmonth ?? resolvedParams?.bulan ?? resolvedParams?.month,
  );

  const monthLabel = hMonth ? HIJRI_MONTHS[hMonth - 1] : null;

  const title =
    monthLabel && hYear
      ? `Kalender Hijriyah ${monthLabel} ${hYear} H`
      : hYear
        ? `Kalender Hijriyah ${hYear} H`
        : DEFAULT_TITLE;

  const description =
    monthLabel && hYear
      ? `Lihat kalender hijriyah bulan ${monthLabel} ${hYear} H dan hari-hari penting Islam.`
      : hYear
        ? `Lihat kalender hijriyah tahun ${hYear} H dan hari-hari penting Islam.`
        : DEFAULT_DESCRIPTION;

  const nextEvent = getNextIslamicEvent();
  const nextEventDescription = nextEvent
    ? ` Event terdekat: ${nextEvent.title} pada ${nextEvent.day} ${
        HIJRI_MONTHS[nextEvent.month - 1]
      } ${nextEvent.eventYear} H.`
    : "";

  const finalDescription = `${description}${nextEventDescription}`;

  const params = new URLSearchParams();
  if (hYear) params.set("hyear", String(hYear));
  if (hMonth) {
    params.set("hmonth", String(hMonth));
  }
  const canonical = params.toString()
    ? `/calendar?${params.toString()}`
    : "/calendar";

  return {
    title,
    description: finalDescription,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description: finalDescription,
      url: canonical,
      siteName: "MuslimVerse",
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: finalDescription,
    },
  };
}

export default async function HijriCalendarPage({ searchParams }) {
  const resolvedParams = (await searchParams) ?? {};
  const hYear = normalizeNumber(
    resolvedParams?.hyear ?? resolvedParams?.tahun ?? resolvedParams?.year,
  );
  const hMonth = normalizeMonth(
    resolvedParams?.hmonth ?? resolvedParams?.bulan ?? resolvedParams?.month,
  );
  const currentYear = new Date().getFullYear();
  const nextEvent = getNextIslamicEvent();

  const params = new URLSearchParams();
  if (hYear) params.set("hyear", String(hYear));
  if (hMonth) params.set("hmonth", String(hMonth));
  const canonicalPath = params.toString()
    ? `/calendar?${params.toString()}`
    : "/calendar";

  const jsonLdDescription = nextEvent
    ? `${DEFAULT_DESCRIPTION} Event terdekat: ${nextEvent.title} pada ${nextEvent.day} ${
        HIJRI_MONTHS[nextEvent.month - 1]
      } ${nextEvent.eventYear} H.`
    : DEFAULT_DESCRIPTION;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kalender Hijriyah",
    description: jsonLdDescription,
    inLanguage: "id",
    url: `${SITE_URL}${canonicalPath}`,
    mainEntity: {
      "@type": "CreativeWork",
      name: "Kalender Hijriyah Islam",
      description: jsonLdDescription,
    },
  };

  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="text-2xl font-bold mb-6 text-center md:text-4xl dark:text-white">
          Kalender Hijriyah
        </h1>

        <Calendar
          year={currentYear}
          initialHYear={hYear}
          initialHMonth={hMonth}
        />
      </main>
    </Layout>
  );
}

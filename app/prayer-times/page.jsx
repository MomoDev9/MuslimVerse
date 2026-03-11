import PrayerTimes from "@/components/Pray/PrayerTimesPage";
import Layout from "@/components/Layout/Layout";

const DEFAULT_TITLE = "Jadwal Sholat";
const DEFAULT_DESCRIPTION =
  "Lihat dan download Jadwal Sholat dan Imsakiyah di MuslimVerse";

function normalizeLocation(value) {
  if (!value || typeof value !== "string") return "";
  const decoded = decodeURIComponent(value).trim();
  if (!decoded) return "";
  return decoded.replace(/\s+/g, " ");
}

export async function generateMetadata({ searchParams }) {
  const resolvedParams = (await searchParams) ?? {};
  const location =
    normalizeLocation(resolvedParams?.kota) ||
    normalizeLocation(resolvedParams?.city) ||
    normalizeLocation(resolvedParams?.location);

  const title = location ? `Jadwal Sholat di ${location}` : DEFAULT_TITLE;
  const description = location
    ? `Lihat jadwal sholat dan imsakiyah di ${location} di MuslimVerse`
    : DEFAULT_DESCRIPTION;

  const canonical = location
    ? `/prayer-times?kota=${encodeURIComponent(location)}`
    : "/prayer-times";

  return {
    title,
    description,
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
      description,
      url: canonical,
      siteName: "MuslimVerse",
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PrayerTimesPage({ searchParams }) {
  const resolvedParams = (await searchParams) ?? {};
  const location =
    normalizeLocation(resolvedParams?.kota) ||
    normalizeLocation(resolvedParams?.city) ||
    normalizeLocation(resolvedParams?.location);

  return (
    <Layout>
      <PrayerTimes initialLocationName={location} />
    </Layout>
  );
}

import SurahDetailPage from "@/components/Quran/SurahDetailPage";
import Layout from "@/components/Layout/Layout";
import { getSurahCached } from "@/lib/surahCache";

export const dynamic = "force-dynamic";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-verse.vercel.app";

export async function generateMetadata({ params }) {
  try {
    const { surah } = await params;
    const surahId = Number.parseInt(surah, 10);
    if (!Number.isInteger(surahId) || surahId < 1 || surahId > 114) {
      const fallbackTitle = "Baca Al-Qur'an";
      const fallbackDescription =
        "Baca dan dengarkan Al-Qur'an dan terjemahannya lengkap di MuslimVerse";

      return {
        title: fallbackTitle,
        description: fallbackDescription,
        alternates: {
          canonical: "/quran",
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
          title: fallbackTitle,
          description: fallbackDescription,
          url: "/quran",
          siteName: "MuslimVerse",
          type: "website",
          locale: "id_ID",
        },
        twitter: {
          card: "summary_large_image",
          title: fallbackTitle,
          description: fallbackDescription,
        },
      };
    }

    const data = await getSurahCached(surahId);

    if (!data || !data.surahInfo) {
      const fallbackTitle = "Baca Al-Qur'an - MuslimVerse";
      const fallbackDescription =
        "Baca dan dengarkan Al-Qur'an dan terjemahannya lengkap di MuslimVerse.";

      return {
        title: fallbackTitle,
        description: fallbackDescription,
        alternates: {
          canonical: "/quran",
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
          title: fallbackTitle,
          description: fallbackDescription,
          url: "/quran",
          siteName: "MuslimVerse",
          type: "website",
          locale: "id_ID",
        },
        twitter: {
          card: "summary_large_image",
          title: fallbackTitle,
          description: fallbackDescription,
        },
      };
    }

    const { namaLatin, arti } = data.surahInfo;
    const title = `Surah ${namaLatin} - MuslimVerse`;
    const description = `Baca dan dengarkan Surah ${namaLatin} (${arti}) dan terjemahannya lengkap di MuslimVerse.`;
    const canonical = `/quran/${surahId}`;

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
  } catch (error) {
    console.error("generateMetadata error:", error);

    const fallbackTitle = "Baca Al-Qur'an - MuslimVerse";
    const fallbackDescription =
      "Baca dan dengarkan Al-Qur'an dan terjemahannya lengkap di MuslimVerse.";

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: "/quran",
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
        title: fallbackTitle,
        description: fallbackDescription,
        url: "/quran",
        siteName: "MuslimVerse",
        type: "website",
        locale: "id_ID",
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
      },
    };
  }
}

export default async function QuranSurahPage({ params }) {
  const { surah } = await params;
  const surahId = Number.parseInt(surah, 10);
  const data =
    Number.isInteger(surahId) && surahId >= 1 && surahId <= 114
      ? await getSurahCached(surahId)
      : null;
  const surahInfo = data?.surahInfo;

  const jsonLd =
    surahInfo && Number.isInteger(surahId)
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `Surah ${surahInfo.namaLatin}`,
          alternateName: surahInfo.nama || surahInfo.namaLatin,
          description: `Surah ${surahInfo.namaLatin} (${surahInfo.arti}).`,
          inLanguage: "id",
          isPartOf: {
            "@type": "Book",
            name: "Al-Qur'an",
            alternateName: "Qur'an",
          },
          url: `${SITE_URL}/quran/${surahId}`,
          publisher: {
            "@type": "Organization",
            name: "MuslimVerse",
            url: SITE_URL,
          },
          position: surahId,
        }
      : null;

  return (
    <Layout>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <SurahDetailPage surah={surah} />
    </Layout>
  );
}

import Layout from "@/components/Layout/Layout";
import SearchDuaPage from "@/components/Dua/SearchDuaPage";

const DEFAULT_TITLE = "Kumpulan Doa Harian";
const DEFAULT_DESCRIPTION =
  "Cari dan baca kumpulan doa harian lengkap beserta artinya di MuslimVerse.";

function normalizeParam(value) {
  if (Array.isArray(value)) {
    value = value[0];
  }
  if (!value || typeof value !== "string") return "";
  const decoded = decodeURIComponent(value).trim();
  if (!decoded) return "";
  return decoded.replace(/\s+/g, " ");
}

function buildQueryString(params) {
  const entries = Object.entries(params).filter(([, value]) => value);
  if (entries.length === 0) return "";
  const query = entries
    .map(
      ([key, value]) => `${key}=${encodeURIComponent(String(value).trim())}`
    )
    .join("&");
  return `?${query}`;
}

function getSeoContent({ query, tag, grup }) {
  if (grup) {
    return {
      title: `Doa ${grup} - MuslimVerse`,
      description: `Kumpulan doa ${grup} lengkap beserta artinya di MuslimVerse.`,
    };
  }

  if (tag) {
    return {
      title: `Doa dengan tag ${tag} - MuslimVerse`,
      description: `Kumpulan doa dengan tag ${tag} lengkap beserta artinya di MuslimVerse.`,
    };
  }

  if (query) {
    return {
      title: `Hasil Pencarian Doa: ${query} - MuslimVerse`,
      description: `Hasil pencarian doa untuk kata kunci "${query}" di MuslimVerse.`,
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  };
}

export async function generateMetadata({ searchParams }) {
  const resolvedParams = (await searchParams) ?? {};
  const query = normalizeParam(resolvedParams?.q);
  const tag = normalizeParam(resolvedParams?.tag);
  const grup = normalizeParam(resolvedParams?.grup || resolvedParams?.group);

  const { title, description } = getSeoContent({ query, tag, grup });

  const canonical = `/daily-dua${buildQueryString({
    q: query,
    grup,
    tag,
  })}`;

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

export default async function DailyDuaPage({ searchParams }) {
  return (
    <Layout>
      <SearchDuaPage searchParams={searchParams} />
    </Layout>
  );
}

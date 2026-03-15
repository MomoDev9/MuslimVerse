import Layout from "@/components/Layout/Layout";
import DetailDuaPage from "@/components/Dua/DetailDuaPage";
import doaData from "@/lib/doa.json";

function normalizeParam(value) {
  if (Array.isArray(value)) {
    value = value[0];
  }
  if (!value || typeof value !== "string") return "";
  const decoded = decodeURIComponent(value).trim();
  if (!decoded) return "";
  return decoded.replace(/\s+/g, " ");
}

function normalizeText(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();
}

function findDuaByParam(param) {
  const cleaned = normalizeParam(param);
  if (!cleaned) return null;

  const doaList = Array.isArray(doaData?.data) ? doaData.data : [];
  const normalizedParam = slugify(cleaned);
  return doaList.find((item) => slugify(item.nama) === normalizedParam) || null;
}

export async function generateStaticParams() {
  const doaList = Array.isArray(doaData?.data) ? doaData.data : [];
  return doaList.map((item) => ({
    dua: slugify(item.nama),
  }));
}

export async function generateMetadata({ params }) {
  const { dua } = await params;
  const item = findDuaByParam(dua);

  if (!item) {
    return {
      title: "Doa Harian - MuslimVerse",
      description:
        "Cari dan baca kumpulan doa harian lengkap beserta artinya di MuslimVerse.",
      alternates: {
        canonical: "/daily-dua",
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
        title: "Doa Harian - MuslimVerse",
        description:
          "Cari dan baca kumpulan doa harian lengkap beserta artinya di MuslimVerse.",
        url: "/daily-dua",
        siteName: "MuslimVerse",
        type: "website",
        locale: "id_ID",
      },
      twitter: {
        card: "summary_large_image",
        title: "Doa Harian - MuslimVerse",
        description:
          "Cari dan baca kumpulan doa harian lengkap beserta artinya di MuslimVerse.",
      },
    };
  }

  const title = `${item.nama} - MuslimVerse`;
  const description = item.idn
    ? item.idn.slice(0, 160)
    : "Baca doa harian lengkap beserta artinya di MuslimVerse.";
  const canonical = `/daily-dua/${slugify(item.nama)}`;

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

export default async function DailyDuaDetailPage({ params }) {
  return (
    <Layout>
      <DetailDuaPage params={params} />
    </Layout>
  );
}

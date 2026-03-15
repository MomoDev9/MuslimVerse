import Link from "next/link";
import { notFound } from "next/navigation";
import doaData from "@/lib/doa.json";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://muslim-verse.vercel.app";

function normalizeParam(value) {
  if (Array.isArray(value)) {
    value = value[0];
  }
  if (!value || typeof value !== "string") return "";
  const decoded = decodeURIComponent(value).trim();
  if (!decoded) return "";
  return decoded.replace(/\s+/g, " ");
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

export default async function DetailDuaPage({ params }) {
  const { dua } = await params;
  const item = findDuaByParam(dua);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.nama,
    description: item.idn || item.nama,
    inLanguage: "id",
    url: `${SITE_URL}/daily-dua/${slugify(item.nama)}`,
    publisher: {
      "@type": "Organization",
      name: "MuslimVerse",
      url: SITE_URL,
    },
    keywords: Array.isArray(item.tag) ? item.tag.join(", ") : undefined,
    isPartOf: {
      "@type": "CollectionPage",
      name: "Kumpulan Doa Harian",
      url: `${SITE_URL}/daily-dua`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <Link
            href="/daily-dua"
            className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200"
          >
            Kembali ke daftar doa
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg dark:bg-gray-800 dark:shadow-gray-500">
          <p className="text-sm text-green-700 font-medium mb-2 dark:text-green-300">
            {item.grup}
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-white">
            {item.nama}
          </h1>

          {item.ar && (
            <p className="text-right text-3xl leading-relaxed font-arabic text-gray-800 mb-6 dark:text-white">
              {item.ar}
            </p>
          )}

          {item.tr && (
            <p className="text-sm text-gray-500 italic mb-4 dark:text-gray-400">
              {item.tr}
            </p>
          )}

          {item.idn && (
            <p className="text-gray-700 leading-relaxed mb-6 dark:text-gray-300">
              {item.idn}
            </p>
          )}

          {item.tentang && (
            <div className="border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400 whitespace-pre-line">
              {item.tentang}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            href={`/daily-dua?grup=${encodeURIComponent(item.grup)}`}
            className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors dark:bg-blue-900/40 dark:text-blue-200"
          >
            Lihat grup ini
          </Link>

          {Array.isArray(item.tag) &&
            item.tag.map((tagItem) => (
              <Link
                key={`${item.id}-${tagItem}`}
                href={`/daily-dua?tag=${encodeURIComponent(tagItem)}`}
                className="px-4 py-2 rounded-xl bg-amber-100 text-amber-700 text-sm font-medium hover:bg-amber-200 transition-colors dark:bg-amber-900/40 dark:text-amber-200"
              >
                {tagItem}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

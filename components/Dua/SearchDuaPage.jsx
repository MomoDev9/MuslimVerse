import Link from "next/link";
import SearchDua from "@/components/Dua/SearchDua";
import doaData from "@/lib/doa.json";

const DEFAULT_DESCRIPTION =
  "Cari dan baca kumpulan doa harian lengkap beserta artinya di MuslimVerse.";
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

function normalizeText(value) {
  if (!value || typeof value !== "string") return "";
  return value.toLowerCase().replace(/\s+/g, " ").trim();
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

function createExcerpt(value, maxLength = 180) {
  if (!value || typeof value !== "string") return "";
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength).trim()}...`;
}

function getUniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "id")
  );
}

function getHeadingTitle({ query, tag, grup }) {
  if (grup) return `Doa ${grup}`;
  if (tag) return `Doa dengan tag ${tag}`;
  if (query) return `Hasil Pencarian: ${query}`;
  return "Kumpulan Doa Harian";
}

function slugify(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();
}

function pickRandom(items, count, excludeIds = new Set()) {
  const pool = items.filter((item) => !excludeIds.has(item.id));
  if (pool.length <= count) return pool;
  const result = [];
  const used = new Set();
  while (result.length < count && used.size < pool.length) {
    const index = Math.floor(Math.random() * pool.length);
    if (used.has(index)) continue;
    used.add(index);
    result.push(pool[index]);
  }
  return result;
}

export default async function SearchDuaPage({ searchParams }) {
  const resolvedParams = (await searchParams) ?? {};
  const query = normalizeParam(resolvedParams?.q);
  const tag = normalizeParam(resolvedParams?.tag);
  const grup = normalizeParam(resolvedParams?.grup || resolvedParams?.group);

  const doaList = Array.isArray(doaData?.data) ? doaData.data : [];
  const normalizedQuery = normalizeText(query);
  const normalizedTag = normalizeText(tag);
  const normalizedGroup = normalizeText(grup);

  const filteredDoa = doaList.filter((item) => {
    if (!item) return false;

    const nameText = normalizeText(item.nama);
    const groupText = normalizeText(item.grup);
    const translationText = normalizeText(item.idn);
    const transliterationText = normalizeText(item.tr);
    const aboutText = normalizeText(item.tentang);
    const tagText = normalizeText((item.tag || []).join(" "));
    const arabicText = item.ar || "";

    const queryMatch =
      !normalizedQuery ||
      nameText.includes(normalizedQuery) ||
      groupText.includes(normalizedQuery) ||
      translationText.includes(normalizedQuery) ||
      transliterationText.includes(normalizedQuery) ||
      aboutText.includes(normalizedQuery) ||
      tagText.includes(normalizedQuery) ||
      arabicText.includes(query);

    const tagMatch =
      !normalizedTag ||
      (item.tag || []).some(
        (entry) =>
          normalizeText(entry) === normalizedTag ||
          normalizeText(entry).includes(normalizedTag)
      );

    const groupMatch =
      !normalizedGroup ||
      groupText === normalizedGroup ||
      groupText.includes(normalizedGroup);

    return queryMatch && tagMatch && groupMatch;
  });

  const groups = getUniqueSorted(doaList.map((item) => item?.grup));
  const tags = getUniqueSorted(
    doaList.flatMap((item) => (Array.isArray(item?.tag) ? item.tag : []))
  );
  const hasFilters = Boolean(query || tag || grup);
  const highlightIds = new Set([20, 30, 40]);
  const highlightedDoa = doaList.filter((item) => highlightIds.has(item.id));
  const randomDoa = pickRandom(doaList, 3, highlightIds);
  const displayDoa = hasFilters ? filteredDoa : [...highlightedDoa, ...randomDoa];

  const canonical = `/daily-dua${buildQueryString({
    q: query,
    grup,
    tag,
  })}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: getHeadingTitle({ query, tag, grup }),
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}${canonical}`,
    inLanguage: "id",
    publisher: {
      "@type": "Organization",
      name: "MuslimVerse",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: filteredDoa.slice(0, 50).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.nama,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 dark:text-white">
            {getHeadingTitle({ query, tag, grup })}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Temukan doa sesuai kebutuhanmu dengan cepat dan mudah.
          </p>
        </div>

        <SearchDua
          query={query}
          tag={tag}
          grup={grup}
          groups={groups}
          tags={tags}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {hasFilters
              ? `Menampilkan ${filteredDoa.length} dari ${doaList.length} doa.`
              : "Menampilkan rekomendasi pilihan dan doa acak."}
          </p>
          {hasFilters && (
            <div className="flex flex-wrap gap-2">
              {query && (
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200">
                  Kata kunci: {query}
                </span>
              )}
              {grup && (
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                  Grup: {grup}
                </span>
              )}
              {tag && (
                <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                  Tag: {tag}
                </span>
              )}
            </div>
          )}
        </div>

        {!hasFilters && highlightedDoa.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
              Doa Pilihan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlightedDoa.map((item) => (
                <article
                  key={`highlight-${item.id}`}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition dark:bg-gray-800 dark:shadow-gray-500 border-2 border-green-200 dark:border-green-700"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-green-700 font-medium dark:text-green-300">
                        {item.grup}
                      </p>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {item.nama}
                      </h2>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200">
                      #{item.id}
                    </span>
                  </div>

                  {item.ar && (
                    <p className="text-right text-2xl leading-relaxed font-arabic text-gray-800 mb-4 dark:text-white">
                      {item.ar}
                    </p>
                  )}

                  {item.tr && (
                    <p className="text-sm text-gray-500 italic mb-3 dark:text-gray-400">
                      {item.tr}
                    </p>
                  )}

                  {item.idn && (
                    <p className="text-gray-700 mb-4 leading-relaxed dark:text-gray-300">
                      {item.idn}
                    </p>
                  )}

                  {item.tentang && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {createExcerpt(item.tentang)}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 mt-5">
                    {Array.isArray(item.tag) && item.tag.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.tag.map((tagItem) => (
                          <span
                            key={`${item.id}-${tagItem}`}
                            className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                          >
                            {tagItem}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Tanpa tag
                      </span>
                    )}

                    <Link
                      href={`/daily-dua/${slugify(item.nama)}`}
                      className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {!hasFilters && randomDoa.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
              Doa Acak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {randomDoa.map((item) => (
                <article
                  key={`random-${item.id}`}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition dark:bg-gray-800 dark:shadow-gray-500"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-green-700 font-medium dark:text-green-300">
                        {item.grup}
                      </p>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {item.nama}
                      </h2>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                      #{item.id}
                    </span>
                  </div>

                  {item.ar && (
                    <p className="text-right text-2xl leading-relaxed font-arabic text-gray-800 mb-4 dark:text-white">
                      {item.ar}
                    </p>
                  )}

                  {item.tr && (
                    <p className="text-sm text-gray-500 italic mb-3 dark:text-gray-400">
                      {item.tr}
                    </p>
                  )}

                  {item.idn && (
                    <p className="text-gray-700 mb-4 leading-relaxed dark:text-gray-300">
                      {item.idn}
                    </p>
                  )}

                  {item.tentang && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {createExcerpt(item.tentang)}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 mt-5">
                    {Array.isArray(item.tag) && item.tag.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.tag.map((tagItem) => (
                          <span
                            key={`${item.id}-${tagItem}`}
                            className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                          >
                            {tagItem}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Tanpa tag
                      </span>
                    )}

                    <Link
                      href={`/daily-dua/${slugify(item.nama)}`}
                      className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {hasFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayDoa.map((item) => (
            <article
              key={item.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition dark:bg-gray-800 dark:shadow-gray-500"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-green-700 font-medium dark:text-green-300">
                    {item.grup}
                  </p>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.nama}
                  </h2>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                  #{item.id}
                </span>
              </div>

              {item.ar && (
                <p className="text-right text-2xl leading-relaxed font-arabic text-gray-800 mb-4 dark:text-white">
                  {item.ar}
                </p>
              )}

              {item.tr && (
                <p className="text-sm text-gray-500 italic mb-3 dark:text-gray-400">
                  {item.tr}
                </p>
              )}

              {item.idn && (
                <p className="text-gray-700 mb-4 leading-relaxed dark:text-gray-300">
                  {item.idn}
                </p>
              )}

              {item.tentang && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {createExcerpt(item.tentang)}
                </p>
              )}

              <div className="flex items-center justify-between gap-4 mt-5">
                {Array.isArray(item.tag) && item.tag.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {item.tag.map((tagItem) => (
                      <span
                        key={`${item.id}-${tagItem}`}
                        className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {tagItem}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Tanpa tag
                  </span>
                )}

                <Link
                  href={`/daily-dua/${slugify(item.nama)}`}
                  className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200"
                >
                  Lihat Detail
                </Link>
              </div>
            </article>
            ))}
          </div>
        )}

        {hasFilters && filteredDoa.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Doa tidak ditemukan. Coba kata kunci lain atau ubah filter.
          </div>
        )}
      </div>
    </>
  );
}

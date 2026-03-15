import Link from "next/link";
import { Search, Filter } from "lucide-react";

export default function SearchDua({
  query = "",
  tag = "",
  grup = "",
  groups = [],
  tags = [],
}) {
  const hasFilters = Boolean(query || tag || grup);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 dark:bg-gray-800 dark:shadow-gray-500">
      <form method="GET" action="/daily-dua" className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Cari doa, arti, kata kunci, atau grup..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">
                Filter:
              </span>
            </div>

            <select
              name="grup"
              defaultValue={grup}
              className="border rounded-xl px-4 py-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Semua Grup</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <select
              name="tag"
              defaultValue={tag}
              className="border rounded-xl px-4 py-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Semua Tag</option>
              {tags.map((tagItem) => (
                <option key={tagItem} value={tagItem}>
                  {tagItem}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {hasFilters && (
              <Link
                href="/daily-dua"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-center hover:bg-gray-100 transition-colors dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Reset Filter
              </Link>
            )}
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Cari Doa
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tips: Gunakan kata kunci bahasa Indonesia atau Arab. Contoh: "tidur",
            "wudhu", "perlindungan".
          </p>
        </div>
      </form>
    </div>
  );
}

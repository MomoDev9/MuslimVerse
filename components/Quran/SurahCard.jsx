"use client";
import Link from "next/link";
import { BookOpen, Volume2, Bookmark } from "lucide-react";

export default function SurahCard({ surah, viewMode = "grid" }) {
  const isGridView = viewMode === "grid";

  return (
    <Link
      href={`/quran/${surah.id || surah.nomor}`}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300 group ${
        isGridView ? "p-6" : "p-4 flex items-center justify-between"
      }`}
    >
      {isGridView ? (
        <>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                {surah.id || surah.nomor}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {surah.name_simple || surah.namaLatin}
                </h3>
                <p className="text-sm text-gray-500">
                  {surah.translated_name?.name || surah.arti}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-green-600 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-arabic text-gray-800 text-right leading-relaxed">
              {surah.name_arabic || surah.nama}
            </p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{surah.verses_count || surah.jumlahAyat} Ayat</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                (surah.revelation_place || surah.tempatTurun) === "makkah"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {(surah.revelation_place || surah.tempatTurun) === "makkah"
                ? "Makkiyah"
                : "Madaniyah"}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {surah.id || surah.nomor}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">
                {surah.name_simple || surah.namaLatin}
              </h3>
              <p className="text-sm text-gray-500">
                {surah.translated_name?.name || surah.arti}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-xl font-arabic text-gray-800 hidden md:block">
              {surah.name_arabic || surah.nama}
            </p>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {surah.verses_count || surah.jumlahAyat} Ayat
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs ${
                  (surah.revelation_place || surah.tempatTurun) === "makkah"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {(surah.revelation_place || surah.tempatTurun) === "makkah"
                  ? "Makkiyah"
                  : "Madaniyah"}
              </div>

              <button className="text-gray-400 hover:text-green-600 transition-colors">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </Link>
  );
}

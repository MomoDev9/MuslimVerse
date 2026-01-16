"use client";
import { useState } from "react";
import { Search, X, Filter } from "lucide-react";

export default function SearchQuran({ onSearch }) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("surah");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query, "type:", searchType);
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari surah atau ayat dalam Al-Quran..."
            className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Cari berdasarkan:</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSearchType("surah")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  searchType === "surah"
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Nama Surah
              </button>
              <button
                type="button"
                onClick={() => setSearchType("verse")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  searchType === "verse"
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Isi Ayat
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!query.trim()}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cari
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Tips: Gunakan kata kunci dalam bahasa Indonesia atau Arab. Contoh:
            "rahmat", "الصلاة", "Al-Fatihah"
          </p>
        </div>
      </form>
    </div>
  );
}

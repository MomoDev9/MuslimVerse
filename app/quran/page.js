"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { BookOpen, Search, Filter } from "lucide-react";
import Link from "next/link";
import { quranAPI } from "@/lib/api";

export default function QuranPage() {
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    loadSurahs();
  }, []);

  useEffect(() => {
    filterSurahs();
  }, [surahs, searchTerm, filterType]);

  const loadSurahs = async () => {
    try {
      setLoading(true);
      const data = await quranAPI.getAllSurahs();
      setSurahs(data);
      setFilteredSurahs(data);
    } catch (error) {
      console.error("Error loading surahs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterSurahs = () => {
    let result = [...surahs];

    if (searchTerm) {
      result = result.filter(
        (surah) =>
          surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          surah.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
          surah.nama.includes(searchTerm)
      );
    }

    if (filterType !== "all") {
      result = result.filter((surah) =>
        filterType === "makkah"
          ? surah.tempatTurun === "Mekah"
          : surah.tempatTurun === "Madinah"
      );
    }

    setFilteredSurahs(result);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Memuat daftar surah...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Al-Quran Digital
          </h1>
          <p className="text-xl text-gray-600">
            Pilih surah untuk mulai membaca
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari nama surah atau terjemahan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Semua Surah</option>
                <option value="makkah">Makkiyah</option>
                <option value="madinah">Madaniyah</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.id}
              href={`/quran/${surah.id}`}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {surah.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {surah.namaLatin}
                    </h3>
                    <p className="text-sm text-gray-500">{surah.arti}</p>
                  </div>
                </div>
                <BookOpen className="h-5 w-5 text-green-500" />
              </div>

              <div className="text-right mb-2">
                <p className="text-2xl font-arabic text-gray-800">
                  {surah.nama}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{surah.jumlahAyat} Ayat</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    surah.tempatTurun === "Mekah"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {surah.tempatTurun === "Mekah" ? "Makkiyah" : "Madaniyah"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Tidak ada surah yang ditemukan
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
              }}
              className="mt-4 text-green-600 hover:text-green-700"
            >
              Reset pencarian
            </button>
          </div>
        )}

        <div className="mt-12 p-6 bg-green-50 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">
                {surahs.length}
              </div>
              <div className="text-gray-600">Total Surah</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">
                {surahs.filter((s) => s.tempatTurun === "Mekah").length}
              </div>
              <div className="text-gray-600">Makkiyah</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">
                {surahs.filter((s) => s.tempatTurun === "Madinah").length}
              </div>
              <div className="text-gray-600">Madaniyah</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">
                {surahs.reduce((acc, surah) => acc + surah.jumlahAyat, 0)}
              </div>
              <div className="text-gray-600">Total Ayat</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

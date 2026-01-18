"use client";

import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout/Layout";
import { BookOpen, Search, Filter } from "lucide-react";
import Link from "next/link";
import { quranAPI } from "@/lib/api";

export default function QuranPage() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        setLoading(true);
        const data = await quranAPI.getAllSurahs();
        setSurahs(data);
      } catch (err) {
        console.error("Error loading surahs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();
  }, []);

  const filteredSurahs = useMemo(() => {
    return surahs.filter((surah) => {
      const matchSearch =
        surah.namaLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.nama.includes(searchTerm);

      const matchFilter =
        filterType === "all" ||
        (filterType === "makkah" && surah.tempatTurun === "Mekah") ||
        (filterType === "madinah" && surah.tempatTurun === "Madinah");

      return matchSearch && matchFilter;
    });
  }, [surahs, searchTerm, filterType]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-green-600 rounded-full" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Al-Quran Digital
          </h1>
          <p className="text-gray-600">Pilih surah untuk mulai membaca</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama surah atau terjemahan..."
                className="w-full pl-12 pr-4 py-3 border rounded-xl"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-xl px-4 py-3"
              >
                <option value="all">Semua Surah</option>
                <option value="makkah">Makkiyah</option>
                <option value="madinah">Madaniyah</option>
              </select>
            </div>
          </div>
        </div>

        {/* SURAH LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.id}
              href={`/quran/${surah.id}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                    {surah.id}
                  </div>
                  <div>
                    <h3 className="font-bold">{surah.namaLatin}</h3>
                    <p className="text-sm text-gray-500">{surah.arti}</p>
                  </div>
                </div>
                <BookOpen className="text-green-500" />
              </div>

              <p className="text-right text-2xl font-arabic mb-3">
                {surah.nama}
              </p>

              <div className="flex justify-between text-sm text-gray-600">
                <span>{surah.jumlahAyat} Ayat</span>
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
          <div className="text-center py-12 text-gray-500">
            Tidak ada surah ditemukan
          </div>
        )}
      </div>
    </Layout>
  );
}

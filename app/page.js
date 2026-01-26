"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { storage } from "@/utils/storage";
import { quranAPI } from "@/lib/quranApi";

import {
  BookOpen,
  Volume2,
  Search,
  Calendar,
  Heart,
  Star,
  TrendingUp,
  HandHelping,
  Clock,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Baca Al-Quran / Dengarkan Murattal",
      description: "Baca Al-Quran lengkap dengan terjemahan bahasa Indonesia",
      link: "/quran",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Search,
      title: "Cari Ayat",
      description: "Cari ayat Al-Quran berdasarkan kata kunci",
      link: "/quran?search=true",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Favorit",
      description: "Simpan ayat-ayat favorit untuk dibaca ulang",
      link: "/favorite",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: HandHelping,
      title: "Doa Harian",
      description: "Kumpulan doa-doa harian beserta artinya",
      link: "/duas",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Jadwal Sholat",
      description: "Cek jadwal sholat berdasarkan lokasi Anda",
      link: "/prayer-times",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Calendar,
      title: "Kalender Hijriyah",
      description: "Lihat Kalender Hijriyah beserta tanggal penting Islam",
      link: "/calendar",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { label: "Jumlah Surah", value: "114", icon: BookOpen },
    { label: "Total Ayat", value: "6.236", icon: Star },
    { label: "Terjemahan", value: "Bahasa Indonesia", icon: Volume2 },
    { label: "Audio Murattal", value: "Qari Ternama", icon: TrendingUp },
  ];

  const [lastRead, setLastRead] = useState(null);
  const [lastReadSurah, setLastReadSurah] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const currentLastRead = storage.getLastRead();
    setLastRead(currentLastRead);
    setBookmarkCount(storage.getBookmarks().length);
    setProgress(storage.getProgress());

    if (currentLastRead?.surah) {
      quranAPI
        .getSurahDetail(currentLastRead.surah)
        .then((data) => setLastReadSurah(data.surahInfo))
        .catch((err) => console.error("Failed to load surah info", err));
    }
  }, []);

  return (
    <Layout>
      <section className="bg-green-500 dark:bg-green-700 text-white rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 text-9xl font-arabic">﷽</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Al-Quran Digital
            <br />
            <span className="text-2xl md:text-4xl font-normal opacity-90">
              Baca dan Pahami dengan Mudah
            </span>
          </h1>

          <p className="text-xl opacity-90 mb-8 max-w-2xl">
            Akses Al-Quran lengkap dengan terjemahan dan audio murattal. Gratis
            untuk umat Islam.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quran"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              Mulai Membaca
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md text-center  dark:bg-gray-700 "
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1 dark:text-gray-200">
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <hr className="w-full border-gray-300 dark:border-gray-600" />
          <h2 className="text-3xl font-bold text-gray-800 px-4 text-center dark:text-gray-200 whitespace-nowrap">
            Fitur Lengkap
          </h2>
          <hr className="w-full border-gray-300 dark:border-gray-600" />
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 -mb-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className={`shrink-0 w-72 bg-linear-to-br ${feature.color} text-white p-6 rounded-xl card-hover dark:text-gray-900`}
            >
              <div className="mb-4">
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 mb-12 dark:bg-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Terakhir Dibaca
          </h2>
          <Link
            href="/history"
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
          >
            Lihat Semua →
          </Link>
        </div>

        {lastRead && (
          <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6" />
              <h3 className="text-xl font-bold">Terakhir Dibaca</h3>
            </div>

            <p className="mb-4 font-semibold">
              Anda terakhir membaca Surah {lastRead.surah} {" ("}
              {lastReadSurah ? lastReadSurah.namaLatin : lastRead.surah}
              {")"} Ayat {lastRead.verse}
            </p>

            <Link
              href={`/quran/${lastRead.surah}?verse=${lastRead.verse}`}
              className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              <BookOpen className="h-5 w-5" />
              Lanjutkan Membaca
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

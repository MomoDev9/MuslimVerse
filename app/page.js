"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { storage } from "@/utils/storage";

import {
  BookOpen,
  Volume2,
  Search,
  Calendar,
  Heart,
  Star,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Baca Al-Quran",
      description: "Baca Al-Quran lengkap dengan terjemahan bahasa Indonesia",
      link: "/quran",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Volume2,
      title: "Dengarkan Murattal",
      description: "Dengarkan bacaan Al-Quran dari qari ternama",
      link: "/quran?audio=true",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Search,
      title: "Cari Ayat",
      description: "Cari ayat Al-Quran berdasarkan kata kunci",
      link: "/quran?search=true",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Heart,
      title: "Simpan Favorit",
      description: "Simpan ayat-ayat favorit untuk dibaca ulang",
      link: "/favorite",
      color: "from-red-500 to-rose-600",
    },
  ];

  const stats = [
    { label: "Jumlah Surah", value: "114", icon: BookOpen },
    { label: "Total Ayat", value: "6.236", icon: Star },
    { label: "Terjemahan", value: "Bahasa Indonesia", icon: Volume2 },
    { label: "Audio Murattal", value: "5+ Qari", icon: TrendingUp },
  ];

  const [lastRead, setLastRead] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setLastRead(storage.getLastRead());
    setBookmarkCount(storage.getBookmarks().length);
    setProgress(storage.getProgress());
  }, []);

  return (
    <Layout>
      <section className="gradient-bg text-white rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
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
            Akses Al-Quran lengkap dengan terjemahan, tafsir, dan audio
            murattal. Gratis untuk semua umat Muslim.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quran"
              className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen className="h-5 w-5" />
              Mulai Membaca
            </Link>
            <Link
              href="/quran?audio=true"
              className="bg-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Volume2 className="h-5 w-5" />
              Dengarkan Murattal
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Fitur Lengkap
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className={`bg-linear-to-br ${feature.color} text-white p-6 rounded-xl card-hover`}
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

      <section className="bg-white rounded-xl shadow-md p-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Terakhir Dibaca</h2>
          <Link
            href="/history"
            className="text-green-600 hover:text-green-700 font-medium"
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

            <p className="mb-4">
              Anda terakhir membaca Surah {lastRead.surah} Ayat {lastRead.verse}
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

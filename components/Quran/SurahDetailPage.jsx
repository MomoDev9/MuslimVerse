"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import AyatCard from "@/components/Quran/AyatCard";
import SimpleAudioPlayer from "@/components/Quran/AudioPlayer";

import { storage } from "@/utils/storage";
import { quranAPI } from "@/lib/quranApi";

import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function SurahDetailPage() {
  const router = useRouter();
  const { surah } = useParams();
  const surahId = Number(surah) || 1;

  const [surahData, setSurahData] = useState(null);
  const [verses, setVerses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showTranslation, setShowTranslation] = useState(true);
  const [activeVerse, setActiveVerse] = useState(null);

  const [audioState, setAudioState] = useState({
    visible: false,
    verseNumber: 1,
  });
  const progressPercent =
    surahData && activeVerse
      ? Math.min((activeVerse / surahData.jumlahAyat) * 100, 100)
      : 0;

  useEffect(() => {
    if (!surahId) return;

    const loadSurah = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await quranAPI.getSurahDetail(surahId);
        console.log("Loading surah detail for ID:", surahId);
        console.log("Data:", data);
        setSurahData(data.surahInfo);
        setVerses(data.verses);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data surah.");
      } finally {
        setLoading(false);
      }
    };

    loadSurah();
  }, [surahId]);

  useEffect(() => {
    if (!verses.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const verseNumber = Number(visible[0].target.dataset.verse);
          setActiveVerse(verseNumber);
        }
      },
      { threshold: 0.6 },
    );

    document
      .querySelectorAll("[data-verse]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [verses]);

  useEffect(() => {
    if (!activeVerse) return;

    storage.saveLastRead(surahId, activeVerse);
    storage.saveProgress(surahId, activeVerse, 0);
  }, [activeVerse, surahId]);

  const playAudio = (verseNumber) => {
    setActiveVerse(verseNumber);
    setAudioState({ visible: true, verseNumber });
  };

  useEffect(() => {
    if (!verses.length) return;

    const lastRead = storage.getLastRead();
    if (!lastRead) return;
    if (lastRead.surah !== surahId) return;

    const el = document.getElementById(`verse-${lastRead.verse}`);
    if (!el) return;

    setTimeout(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);

    setActiveVerse(lastRead.verse);
  }, [verses, surahId]);

  const scrollToVerse = (verse) => {
    document
      .getElementById(`verse-${verse}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const nextVerse = () => {
    if (audioState.verseNumber < surahData.jumlahAyat) {
      const next = audioState.verseNumber + 1;
      setAudioState((s) => ({ ...s, verseNumber: next }));
      setActiveVerse(next);
      scrollToVerse(next);
    }
  };

  const prevVerse = () => {
    if (audioState.verseNumber > 1) {
      const prev = audioState.verseNumber - 1;
      setAudioState((s) => ({ ...s, verseNumber: prev }));
      setActiveVerse(prev);
      scrollToVerse(prev);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin border-b-2 border-green-600 rounded-full" />
      </div>
    );
  }

  if (error && !surahData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <AlertCircle className="mx-auto text-red-500 mb-3" />
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.push("/quran")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => router.push("/quran")}
          className="flex items-center gap-2 text-green-600"
        >
          <ArrowLeft size={18} />
          Semua Surah
        </button>

        <button
          onClick={() => setShowTranslation((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <BookOpen size={16} />
          {showTranslation ? "Sembunyikan" : "Tampilkan"} Terjemahan
        </button>
      </div>

      <div className="sticky top-24 z-100 bg-white/95 backdrop-blur mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Progress membaca</span>
          <span>
            Ayat {activeVerse || 1} / {surahData.jumlahAyat}
          </span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {audioState.visible && (
        <SimpleAudioPlayer
          surahNumber={surahId}
          verseNumber={audioState.verseNumber}
          surahName={surahData.namaLatin}
          totalVerses={surahData.jumlahAyat}
          onClose={() => setAudioState((s) => ({ ...s, visible: false }))}
          onNextVerse={nextVerse}
          onPrevVerse={prevVerse}
          autoNext
        />
      )}

      <div className="space-y-6">
        {verses.map((verse) => (
          <AyatCard
            key={verse.id}
            verse={verse}
            surahNumber={surahData.nomor}
            verseNumber={verse.id}
            surahName={surahData.namaLatin}
            showTranslation={showTranslation}
            onPlayAudio={() => playAudio(verse.id)}
            onRead={() => setActiveVerse(verse.id)}
            isActive={activeVerse === verse.id}
          />
        ))}
      </div>

      <div className="flex justify-between my-12">
        {surahData.nomor > 1 && (
          <button
            onClick={() => router.push(`/quran/${surahData.nomor - 1}`)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl"
          >
            <ChevronLeft />
            Surah {surahData.nomor - 1}
          </button>
        )}

        {surahData.nomor < 114 && (
          <button
            onClick={() => router.push(`/quran/${surahData.nomor + 1}`)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl ml-auto"
          >
            Surah {surahData.nomor + 1}
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

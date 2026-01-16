"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout/Layout";
import AyatCard from "@/components/Quran/AyatCard";
import SimpleAudioPlayer from "@/components/Quran/AudioPlayer";
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  AlertCircle,
} from "lucide-react";
import { quranAPI } from "@/lib/api";

export default function SurahDetailPage() {
  const router = useRouter();
  const params = useParams();
  const surahId = parseInt(params.surah) || 1;

  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentAudioVerse, setCurrentAudioVerse] = useState({
    surahNumber: 1,
    verseNumber: 1,
  });

  useEffect(() => {
    if (surahId) {
      loadSurah();
    }
  }, [surahId]);

  const loadSurah = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await quranAPI.getSurahDetail(surahId);
      setSurah(data.surahInfo);
      setVerses(data.verses);
    } catch (err) {
      console.error("Error loading surah:", err);
      setError("Gagal memuat data surah. Silakan coba lagi.");

      if (surahId === 1) {
        const mockData = {
          surahInfo: {
            nomor: 1,
            nama: "الفاتحة",
            namaLatin: "Al-Fatihah",
            arti: "Pembukaan",
            jumlahAyat: 7,
            tempatTurun: "Mekah",
            deskripsi: "Surah pertama dalam Al-Quran",
          },
          verses: [
            {
              id: 1,
              text_uthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
              translations: [
                {
                  text: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
                },
              ],
              audio: quranAPI.getAudioUrl(1, 1),
            },
            {
              id: 2,
              text_uthmani: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
              translations: [
                { text: "Segala puji bagi Allah, Tuhan seluruh alam," },
              ],
              audio: quranAPI.getAudioUrl(1, 2),
            },
            {
              id: 3,
              text_uthmani: "الرَّحْمَٰنِ الرَّحِيمِ",
              translations: [{ text: "Yang Maha Pengasih, Maha Penyayang," }],
              audio: quranAPI.getAudioUrl(1, 3),
            },
          ],
        };
        setSurah(mockData.surahInfo);
        setVerses(mockData.verses);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = (surahNumber, verseNumber) => {
    setCurrentAudioVerse({
      surahNumber: surahNumber || surahId,
      verseNumber: verseNumber || 1,
    });
    setShowAudioPlayer(true);
  };

  const testFirstVerseAudio = () => {
    handlePlayAudio(surahId, 1);
  };
  const handleNextVerse = () => {
    if (currentAudioVerse.verseNumber < surah?.jumlahAyat) {
      setCurrentAudioVerse((prev) => ({
        ...prev,
        verseNumber: prev.verseNumber + 1,
      }));

      const nextVerseElement = document.getElementById(
        `verse-${currentAudioVerse.verseNumber + 1}`
      );
      if (nextVerseElement) {
        nextVerseElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  const handlePrevVerse = () => {
    if (currentAudioVerse.verseNumber > 1) {
      setCurrentAudioVerse((prev) => ({
        ...prev,
        verseNumber: prev.verseNumber - 1,
      }));

      const prevVerseElement = document.getElementById(
        `verse-${currentAudioVerse.verseNumber - 1}`
      );
      if (prevVerseElement) {
        prevVerseElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Memuat Surah {surahId}...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && !surah) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/quran")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Kembali ke Daftar Surah
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => router.push("/quran")}
            className="flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Semua Surah</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <BookOpen className="h-4 w-4" />
              <span>
                {showTranslation ? "Sembunyikan" : "Tampilkan"} Terjemahan
              </span>
            </button>

            <button
              onClick={testFirstVerseAudio}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Headphones className="h-4 w-4" />
              <span>Test Audio</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-700">{error}</p>
                <p className="text-yellow-600 text-sm mt-1">
                  Menampilkan data contoh. Beberapa ayat mungkin tidak tersedia.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-linear-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="inline-block bg-white/20 p-4 rounded-full mb-4">
              <div className="bg-white text-green-700 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                {surah.nomor}
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2">{surah.namaLatin}</h1>
            <p className="text-3xl font-arabic mb-4">{surah.nama}</p>
            <p className="text-xl opacity-90 mb-6">{surah.arti}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {surah.jumlahAyat} Ayat
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {surah.tempatTurun}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                Audio Tersedia
              </span>
            </div>
          </div>
        </div>

        {showAudioPlayer && (
          <SimpleAudioPlayer
            surahNumber={currentAudioVerse.surahNumber}
            verseNumber={currentAudioVerse.verseNumber}
            surahName={surah.namaLatin}
            totalVerses={surah.jumlahAyat}
            onClose={() => setShowAudioPlayer(false)}
            onNextVerse={handleNextVerse}
            onPrevVerse={handlePrevVerse}
            autoNext={true}
          />
        )}

        <div className="space-y-6 mb-12">
          {verses.length > 0 ? (
            verses.map((verse) => (
              <AyatCard
                key={verse.id}
                verse={verse}
                surahNumber={surah.nomor}
                verseNumber={verse.id}
                surahName={surah.namaLatin}
                showTranslation={showTranslation}
                onPlayAudio={() => handlePlayAudio(surah.nomor, verse.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500">Data ayat tidak tersedia</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mb-12">
          {surah.nomor > 1 && (
            <button
              onClick={() => router.push(`/quran/${surah.nomor - 1}`)}
              className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              <ChevronLeft className="h-5 w-5" />
              <div className="text-left">
                <div className="text-sm opacity-90">Surah Sebelumnya</div>
                <div>Surah {surah.nomor - 1}</div>
              </div>
            </button>
          )}

          {surah.nomor < 114 && (
            <button
              onClick={() => router.push(`/quran/${surah.nomor + 1}`)}
              className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 ml-auto"
            >
              <div className="text-right">
                <div className="text-sm opacity-90">Surah Berikutnya</div>
                <div>Surah {surah.nomor + 1}</div>
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Surah {surah.nomor} • {surah.namaLatin}
          </h3>
          <p className="text-blue-700 mb-3">
            {surah.deskripsi ||
              `Surah ${surah.namaLatin} (${surah.arti}) adalah surah ke-${surah.nomor} dalam Al-Quran.`}
          </p>
          <div className="text-sm text-blue-600">
            <p>• Jumlah Ayat: {surah.jumlahAyat}</p>
            <p>• Tempat Turun: {surah.tempatTurun}</p>
            <p>
              • Jenis:{" "}
              {surah.tempatTurun === "Mekah" ? "Makkiyah" : "Madaniyah"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

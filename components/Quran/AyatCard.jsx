"use client";

import { useState, useEffect } from "react";
import { Volume2, Bookmark, Share2, Copy, Heart } from "lucide-react";
import { storage } from "@/utils/storage";

export default function AyatCard({
  verse,
  surahNumber,
  verseNumber,
  surahName,
  showTranslation = true,
  onPlayAudio,
  onRead,
  isActive,
}) {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(storage.isBookmarked(surahNumber, verseNumber));
  }, [surahNumber, verseNumber]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      storage.removeBookmark(surahNumber, verseNumber);
    } else {
      storage.saveBookmark({
        surah: surahNumber,
        verse: verseNumber,
        text: verse.text_uthmani,
        translation: verse.translations?.[0]?.text,
        timestamp: Date.now(),
      });
    }
    setIsBookmarked((v) => !v);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(verse.text_uthmani);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareVerse = async () => {
    const text = `${verse.text_uthmani}\n\n${
      verse.translations?.[0]?.text || ""
    }`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quran ${surahName}:${verseNumber}`,
          text,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div
      id={`verse-${verseNumber}`}
      data-verse={verseNumber}
      className={`bg-white rounded-xl shadow-lg p-6 mb-6 transition-colors border ${
        isActive
          ? "border-green-500 bg-green-50 border-2"
          : "border-gray-200 hover:border-green-300"
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
            {verseNumber}
          </div>
          <div>
            <div className="text-sm text-gray-500">
              {surahName || `Surah ${surahNumber}`} • Ayat {verseNumber}
            </div>
            <div className="text-xs text-gray-400">Audio murattal tersedia</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onRead?.(verseNumber);
              onPlayAudio?.();
            }}
            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
            title="Dengarkan murattal"
          >
            <Volume2 className="h-5 w-5" />
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg ${
              isBookmarked
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600 hover:text-red-600"
            }`}
            title="Bookmark"
          >
            {isBookmarked ? (
              <Heart className="h-5 w-5 fill-current" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Salin ayat"
          >
            {copied ? "✓" : <Copy className="h-5 w-5" />}
          </button>

          <button
            onClick={shareVerse}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-800"
            title="Bagikan"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-3xl font-arabic text-gray-800 leading-loose text-right">
          {verse.text_uthmani}
        </p>
      </div>

      {showTranslation && verse.translations?.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-0.5 bg-green-500" />
            <span className="text-sm font-medium text-green-600">
              TERJEMAHAN
            </span>
          </div>
          <p className="text-gray-700 italic border-l-4 border-green-200 pl-4 py-2">
            {verse.translations[0].text}
          </p>
        </div>
      )}
    </div>
  );
}

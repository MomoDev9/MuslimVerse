"use client";
import { useState } from "react";
import { Volume2, Bookmark, Share2, Copy, Heart } from "lucide-react";

export default function AyatCard({
  verse,
  surahNumber,
  verseNumber,
  surahName,
  showTranslation = true,
  onPlayAudio,
  onToggleBookmark,
  isBookmarked = false,
}) {
  const [copied, setCopied] = useState(false);

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
          text: text,
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
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 hover:border-green-300 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
              {verseNumber}
            </div>
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
            onClick={() => onPlayAudio && onPlayAudio(surahNumber, verseNumber)}
            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            title="Dengarkan murattal"
          >
            <Volume2 className="h-5 w-5" />
          </button>

          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-lg ${
              isBookmarked
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600 hover:text-red-600"
            }`}
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
          >
            {copied ? "✓" : <Copy className="h-5 w-5" />}
          </button>

          <button
            onClick={shareVerse}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:text-gray-800"
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

      {showTranslation &&
        verse.translations &&
        verse.translations.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-sm font-medium text-green-600">
                TERJEMAHAN
              </span>
            </div>
            <p className="text-gray-700 italic border-l-4 border-green-200 pl-4 py-2">
              {verse.translations[0]?.text}
            </p>
          </div>
        )}
    </div>
  );
}

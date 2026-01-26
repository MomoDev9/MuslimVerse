"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  X,
  AlertCircle,
  CheckCircle,
  SkipBack,
  SkipForward,
  Repeat,
  ListMusic,
} from "lucide-react";

export default function AudioPlayer({
  surahNumber = 1,
  verseNumber = 1,
  surahName = "Al-Fatihah",
  totalVerses = 7,
  onClose,
  onNextVerse,
  onPrevVerse,
  autoNext = true,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAutoNext, setIsAutoNext] = useState(autoNext);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const safeSurahNumber = Number(surahNumber) || 1;
  const safeVerseNumber = Number(verseNumber) || 1;

  useEffect(() => {
    try {
      const surahPadded = safeSurahNumber.toString().padStart(3, "0");
      const versePadded = safeVerseNumber.toString().padStart(3, "0");
      const fileCode = `${surahPadded}${versePadded}`;

      const url = `https://everyayah.com/data/Alafasy_128kbps/${fileCode}.mp3`;
      setAudioUrl(url);
    } catch (err) {
      console.error("Error generating audio URL:", err);
      setError("Gagal membuat URL audio");
    }
  }, [safeSurahNumber, safeVerseNumber]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);

    if (isRepeat && audioRef.current) {
      setTimeout(() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
      }, 500);
    } else if (isAutoNext && onNextVerse && safeVerseNumber < totalVerses) {
      setTimeout(() => {
        onNextVerse();
      }, 500);
    }
  }, [isRepeat, isAutoNext, onNextVerse, safeVerseNumber, totalVerses]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = handleAudioEnded;
    const handleError = () => {
      setError("Gagal memuat audio");
      setIsPlaying(false);
      setIsLoading(false);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    audio.volume = volume;

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [volume, handleAudioEnded]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      loadAndPlayAudio();
    }
  }, [audioUrl]);

  const loadAndPlayAudio = async () => {
    if (!audioRef.current || !audioUrl) return;

    try {
      setIsLoading(true);
      setError(null);

      audioRef.current.src = audioUrl;
      audioRef.current.load();

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Gagal memutar audio. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);

        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Gagal memutar audio. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };
  const toggleRepeat = () => {
    const newRepeatState = !isRepeat;
    setIsRepeat(newRepeatState);

    if (newRepeatState) {
      setIsAutoNext(false);
    }
  };

  const toggleAutoNext = () => {
    const newAutoNextState = !isAutoNext;
    setIsAutoNext(newAutoNextState);

    if (newAutoNextState) {
      setIsRepeat(false);
    }
  };
  const handlePrevVerse = () => {
    if (onPrevVerse && safeVerseNumber > 1) {
      onPrevVerse();
    }
  };

  const handleNextVerse = () => {
    if (onNextVerse && safeVerseNumber < totalVerses) {
      onNextVerse();
    }
  };

  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-2xl z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {safeVerseNumber}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">
                {surahName} : Ayat {safeVerseNumber}
              </h4>
              <p className="text-sm text-gray-500">Surah {safeSurahNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoNext}
              className={`p-2 rounded-lg ${
                isAutoNext
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
              title={isAutoNext ? "Auto-next aktif" : "Auto-next nonaktif"}
            >
              <ListMusic className="h-5 w-5" />
            </button>

            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-lg ${
                isRepeat
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
              title={isRepeat ? "Repeat aktif" : "Repeat nonaktif"}
            >
              <Repeat className="h-5 w-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
              title="Tutup pemutar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleTimeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
          />
        </div>

        <div className="flex items-center justify-between py-3">
          <button
            onClick={handlePrevVerse}
            disabled={safeVerseNumber <= 1 || !onPrevVerse}
            className={`p-3 rounded-full ${
              safeVerseNumber <= 1 || !onPrevVerse
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Ayat sebelumnya"
          >
            <SkipBack className="h-6 w-6" />
          </button>

          <button
            onClick={togglePlay}
            disabled={isLoading || error}
            className={`
              relative p-4 rounded-full transition-all duration-300
              ${isLoading || error ? "opacity-50 cursor-not-allowed" : ""}
              ${
                isPlaying
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }
            `}
          >
            {isLoading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-600"></div>
            ) : isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </button>

          <button
            onClick={handleNextVerse}
            disabled={safeVerseNumber >= totalVerses || !onNextVerse}
            className={`p-3 rounded-full ${
              safeVerseNumber >= totalVerses || !onNextVerse
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Ayat berikutnya"
          >
            <SkipForward className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-gray-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600"
            />
          </div>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 text-sm">{error}</p>
                <p className="text-red-600 text-xs mt-1">
                  Surah {safeSurahNumber} Ayat {safeVerseNumber}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 py-2 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span
              className={`px-2 py-1 rounded ${
                isAutoNext
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isAutoNext ? "Auto-next: ON" : "Auto-next: OFF"}
            </span>
            <span
              className={`px-2 py-1 rounded ${
                isRepeat
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isRepeat ? "Repeat: ON" : "Repeat: OFF"}
            </span>
          </div>
          <div className="text-right">
            <p>Qari: Mishary Alafasy</p>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onError={() => {
          setError("Gagal memuat audio");
          setIsPlaying(false);
          setIsLoading(false);
        }}
        style={{ display: "none" }}
      />
    </div>
  );
}

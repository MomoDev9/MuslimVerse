"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import { storage } from "@/utils/storage";
import Link from "next/link";
import { Bookmark, Trash2 } from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(storage.getBookmarks());
  }, []);

  const removeBookmark = (surah, verse) => {
    storage.removeBookmark(surah, verse);
    setBookmarks((prev) =>
      prev.filter((b) => !(b.surah === surah && b.verse === verse))
    );
  };

  const clearAll = () => {
    if (confirm("Hapus semua bookmark?")) {
      storage.clearAll();
      setBookmarks([]);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            <Bookmark className="inline h-8 w-8 mr-3 text-green-600" />
            Ayat Favorit
          </h1>

          {bookmarks.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
              Hapus Semua
            </button>
          )}
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum ada ayat yang disimpan
            </h3>
            <p className="text-gray-500">
              Klik ikon bookmark di ayat untuk menyimpannya di sini
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmark, index) => (
              <div
                key={`${bookmark.surah}-${bookmark.verse}-${index}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      href={`/quran/${bookmark.surah}?verse=${bookmark.verse}`}
                      className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-green-600"
                    >
                      Surah {bookmark.surah} : Ayat {bookmark.verse}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Disimpan{" "}
                      {new Date(bookmark.timestamp).toLocaleDateString("id-ID")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        removeBookmark(bookmark.surah, bookmark.verse)
                      }
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Hapus bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-arabic text-right text-gray-800 dark:text-gray-200">
                    {bookmark.text}
                  </p>
                  {bookmark.translation && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
                      {bookmark.translation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

"use client";
import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">MuslimVerse</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Website untuk membaca dan mempelajari Al-Quran secara digital.
              Gratis untuk semua umat Muslim.
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-2 text-gray-400 mb-2">
              <Heart className="h-4 w-4" />
              <span>Dibuat dengan ❤️ untuk umat Islam</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MuslimVerse. Semua hak dilindungi.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>
            Data diambil dari API publik Quran.com dan EQuran.id. Website ini
            tidak berafiliasi dengan organisasi mana pun.
          </p>
        </div>
      </div>
    </footer>
  );
}

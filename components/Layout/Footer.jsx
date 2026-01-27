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
              Website untuk membaca Al-Quran dan informasi Islam secara digital.
              Gratis untuk semua umat Muslim.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Fitur</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/prayer-times" className="hover:text-green-400">
                    Waktu Sholat
                  </a>
                </li>
                <li>
                  <a href="/quran" className="hover:text-green-400">
                    Al-Quran
                  </a>
                </li>
                <li>
                  <a href="/calendar" className="hover:text-green-400">
                    Kalender Islam
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Lainnya</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-green-400">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="/donate" className="hover:text-green-400">
                    Donasi
                  </a>
                </li>
                <li>
                  <a href="/feedback" className="hover:text-green-400">
                    Saran & Masukan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm">
            <p className="mb-4 md:mb-0">
              © {new Date().getFullYear()} MuslimVerse. Semua hak dilindungi.
            </p>
            <div className="grid md:grid-cols-3">
              <div></div>
              <div>
                <p>
                  Dibuat oleh <a href="momodev.vercel.app">?</a>
                </p>
                <p>Dibuat dengan ❤️ untuk umat Islam</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs">
            Data diambil dari API publik. Website ini tidak berafiliasi dengan
            organisasi mana pun.
          </p>
        </div>
      </div>
    </footer>
  );
}

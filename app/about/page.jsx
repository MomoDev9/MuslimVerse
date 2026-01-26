import Layout from "@/components/Layout/Layout";
import { BookOpen } from "lucide-react";

function AboutContent() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <BookOpen className="h-10 w-10 text-green-500" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Tentang MuslimVerse
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Membawa Al-Quran dan sumber daya Islami ke ujung jari Anda, di mana
            pun Anda berada.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              MuslimVerse diciptakan dengan tujuan sederhana: menyediakan akses
              yang mudah, gratis, dan komprehensif terhadap Al-Quran dan alat
              bantu Islami lainnya bagi seluruh umat Muslim di dunia. Kami
              percaya bahwa teknologi dapat menjadi jembatan untuk mendekatkan
              diri kepada ajaran Islam. Melalui platform ini, kami berharap
              dapat membantu pengguna dalam membaca, mempelajari, dan
              merenungkan ayat-ayat suci Al-Quran dengan lebih mendalam.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sumber Data</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Untuk memastikan keakuratan dan kualitas data, MuslimVerse
              mengandalkan beberapa sumber API publik yang terpercaya, antara
              lain:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Quran.com API:</strong> Digunakan untuk teks Al-Quran,
                terjemahan, dan data audio.
              </li>
              <li>
                <strong>EQuran.id API:</strong> Sumber data tambahan untuk
                konten Islami.
              </li>
              <li>
                <strong>API Waktu Sholat:</strong> Untuk jadwal sholat yang
                akurat berdasarkan lokasi pengguna.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Kami tidak berafiliasi secara resmi dengan penyedia API ini, namun
              kami sangat berterima kasih atas layanan mereka yang memungkinkan
              proyek ini terwujud.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Kontribusi & Masukan
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Proyek ini bersifat sumber terbuka (open-source) dan akan segera
              tersedia di GitHub. Kami sangat terbuka untuk kontribusi dari
              komunitas, baik dalam bentuk kode, perbaikan bug, maupun ide-ide
              baru. Jika Anda memiliki saran atau menemukan masalah, jangan ragu
              untuk menghubungi kami melalui halaman{" "}
              <a href="/feedback" className="text-green-500 hover:underline">
                Saran & Masukan
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

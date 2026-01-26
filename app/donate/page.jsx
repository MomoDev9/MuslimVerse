import Layout from "@/components/Layout/Layout";
import { Heart } from "lucide-react";

export default function DonatePage() {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Heart className="h-10 w-10 text-red-500" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Dukung MuslimVerse
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Bantuan Anda memungkinkan kami untuk terus berkembang, memelihara
              infrastruktur, dan menghadirkan fitur-fitur baru.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Mengapa Donasi Anda Penting?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              MuslimVerse adalah proyek yang didedikasikan untuk menyediakan
              akses gratis ke Al-Quran dan alat Islami lainnya. Kami tidak
              menampilkan iklan dan tidak menjual data pengguna. Operasional
              kami sepenuhnya bergantung pada dukungan tulus dari komunitas
              seperti Anda.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Setiap donasi, berapapun jumlahnya, sangat berarti dan akan
              digunakan untuk:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Biaya Server & Infrastruktur:</strong> Menjaga agar
                  website tetap cepat, andal, dan dapat diakses 24/7.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Pengembangan Fitur:</strong> Menambahkan fitur baru
                  seperti tafsir, konten edukasi, dan personalisasi.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Pemeliharaan:</strong> Memastikan semua fungsi
                  berjalan dengan baik dan memperbaiki bug yang ada.
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-center">
              Salurkan Donasi Anda
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
              <p className="font-mono text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                [Informasi Rekening Bank atau Link Pembayaran Digital]
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Silakan ganti bagian ini dengan platform donasi pilihan Anda,
                misalnya Trakteer, Saweria, atau nomor rekening langsung.
              </p>
            </div>

            <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
              <p>
                Jazakumullah Khairan Katsiran atas dukungan Anda. Semoga menjadi
                amal jariyah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

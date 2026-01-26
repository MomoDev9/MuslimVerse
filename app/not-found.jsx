import Layout from "@/components/Layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-green-600">404</h1>

        <p className="mt-4 text-xl font-semibold dark:text-white">
          Halaman belum dibuat
        </p>

        <p className="mt-2 text-gray-500">
          Halaman yang kamu cari belum tersedia atau masih dalam pengembangan.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </Layout>
  );
}

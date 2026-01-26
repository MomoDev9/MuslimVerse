"use client";
import Layout from "@/components/Layout/Layout";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) {
      setStatus({
        type: "error",
        message: "Kolom saran tidak boleh kosong.",
      });
      return;
    }

    // Simulasi pengiriman form
    console.log("Saran:", feedback);
    console.log("Email:", email);

    setStatus({
      type: "success",
      message: "Terima kasih! Saran Anda telah kami terima.",
    });
    setFeedback("");
    setEmail("");
  };

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <MessageSquare className="h-10 w-10 text-blue-500" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Saran & Masukan
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
              Kami sangat menghargai setiap masukan dari Anda untuk menjadikan
              MuslimVerse lebih baik.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="feedback"
                  className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                >
                  Saran atau Laporan Bug
                </label>
                <textarea
                  id="feedback"
                  rows="6"
                  className="w-full px-4 py-3 text-base text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tuliskan ide, saran, atau masalah yang Anda temukan di sini..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                >
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 text-base text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Kami hanya akan menggunakan email ini untuk menghubungi Anda
                  jika ada pertanyaan terkait masukan Anda.
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Kirim Masukan
                </button>
              </div>
            </form>

            {status.message && (
              <div
                className={`mt-6 p-4 rounded-lg text-center ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

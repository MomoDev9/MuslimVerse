"use client";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}

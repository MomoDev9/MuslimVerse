"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Clock, Home, Search } from "lucide-react";
import DarkMode from "@/components/UI/DarkMode";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Al-Quran", href: "/quran", icon: BookOpen },
    { name: "Jadwal Sholat", href: "/jadwal-sholat", icon: Clock },
  ];

  return (
    <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xl font-bold">MuslimVerse</span>
          </Link>

          <div className="pt-4 border-t border-green-500 dark:border-green-700">
            <div className="py-2">
              <DarkMode />
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 transition-colors ${
                  pathname === item.href
                    ? "text-green-200 font-semibold"
                    : "hover:text-green-200"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-green-700 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-500">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 py-2 transition-colors ${
                    pathname === item.href
                      ? "text-green-200 font-semibold"
                      : "hover:text-green-200"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

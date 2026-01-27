"use client";
import { useState, useEffect } from "react";
import { Sun, MoonStar } from "lucide-react";

export default function DarkMode() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const getThemeIcon = () => {
    if (theme === "dark") {
      return <MoonStar className="h-5 w-5 bg-gray-600 text-amber-300" />;
    }
    return <Sun className="h-5 w-5 text-orange-500 bg-gray-300" />;
  };

  const getThemeLabel = () => {
    return theme === "dark" ? "Gelap" : "Terang";
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 animate-pulse">
        <div className="h-5 w-5 bg-gray-300 rounded text-gray-900 animate-pulse"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-black dark:text-white"
      title={`Tema: ${getThemeLabel()}`}
    >
      {getThemeIcon()}
      <span className="hidden md:inline text-sm font-medium">
        {getThemeLabel()}
      </span>
    </button>
  );
}

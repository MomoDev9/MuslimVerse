"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function DarkMode() {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (selectedTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (selectedTheme === "light") {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
      }
      localStorage.setItem("theme", "system");
    }
    setTheme(selectedTheme);
  };

  const toggleTheme = () => {
    const themes = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    applyTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "system":
        return <Monitor className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Terang";
      case "dark":
        return "Gelap";
      case "system":
        return "Sistem";
      default:
        return "Sistem";
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 animate-pulse">
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={`Tema: ${getThemeLabel()}`}
    >
      {getThemeIcon()}
      <span className="hidden md:inline text-sm font-medium">
        {getThemeLabel()}
      </span>
    </button>
  );
}

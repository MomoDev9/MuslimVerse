import { icons } from "lucide-react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "MuslimVerse - Website Islami",
    template: "%s - MuslimVerse",
  },
  description: "Website Islami modern untuk pembelajaran dan inspirasi",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}

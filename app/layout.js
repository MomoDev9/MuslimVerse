import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "MuslimVerse – Website Islami",
    template: "%s | MuslimVerse",
  },
  description: "Website islami modern untuk pembelajaran dan inspirasi",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}

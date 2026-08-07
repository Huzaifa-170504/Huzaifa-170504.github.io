import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huzaifa Waqar Butt | AI, Machine Learning & Data Science",
  description:
    "Portfolio of Huzaifa Waqar Butt — BSIT graduate focused on artificial intelligence, machine learning, data science, computer vision, and intelligent systems.",
  keywords: [
    "Huzaifa Waqar Butt",
    "AI Engineer",
    "Machine Learning",
    "Data Science",
    "Computer Vision",
    "Pakistan",
  ],
  authors: [{ name: "Huzaifa Waqar Butt" }],
  openGraph: {
    title: "Huzaifa Waqar Butt | AI & Machine Learning Portfolio",
    description: "Applied AI, machine learning, data science, and intelligent systems.",
    type: "website",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "192x192" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

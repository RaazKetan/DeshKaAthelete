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
  title: "Crests — India's verified national achievers, one booking away",
  description:
    "Book Olympians, national champions, and verified national achievers for school and institutional sessions. Aadhaar + Federation verified. Escrow-protected payments.",
  keywords: [
    "Indian athletes",
    "Olympian coaching",
    "school workshops",
    "national achievers",
    "Khelo India",
    "verified mentors",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  );
}

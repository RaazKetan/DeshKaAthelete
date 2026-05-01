import type { Metadata } from "next";
import "./globals.css";

// Geist stays around as the immediate fallback for Google Sans (which isn't
// in the official Google Fonts catalogue, so we load it via <link> below).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crests — India's finest, on your stage",
  description:
    "A verified bureau for India's national icons — Olympians, surgeons, founders, jawans, authors. Book them for your school, college, or all-hands without the WhatsApp circus.",
  keywords: [
    "national speakers",
    "speaker bureau India",
    "Olympic speakers",
    "school assembly speakers",
    "verified mentors",
    "Crests bureau",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700;1,900&display=swap"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  );
}

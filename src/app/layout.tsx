import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crests · National speaker bureau",
  description:
    "A bureau for India's national icons — Olympians, surgeons, founders, jawans, ambassadors, artists, authors. Brought to your school assembly, college fest, or all-hands.",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="app">{children}</body>
    </html>
  );
}

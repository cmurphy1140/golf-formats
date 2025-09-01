import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: "Golf Formats Database - Find Your Perfect Game",
  description: "Comprehensive database of golf game formats for recreational players. Discover 20+ ways to play golf with detailed rules, scoring, and strategies.",
  keywords: "golf formats, golf rules, golf games, recreational golf, tournament golf, betting games, team golf",
  authors: [{ name: "Golf Formats Team" }],
  openGraph: {
    title: "Golf Formats Database - Find Your Perfect Game",
    description: "Comprehensive database of golf game formats for recreational players. Discover 20+ ways to play golf with detailed rules, scoring, and strategies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golf Formats Database - Find Your Perfect Game",
    description: "Comprehensive database of golf game formats for recreational players. Discover 20+ ways to play golf with detailed rules, scoring, and strategies.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-masters-cream text-masters-slate antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

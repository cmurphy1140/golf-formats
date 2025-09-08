import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SettingsLoader from "@/components/settings-loader";
import KeyboardShortcutsHelp from "@/components/keyboard-shortcuts-help";
import MobileViewportDebugger from "@/components/mobile-viewport-debugger";

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
  title: "Format Finder - Discover Your Perfect Golf Game",
  description: "Comprehensive database of golf game formats for recreational players. Discover 20+ ways to play golf with detailed rules, scoring, and strategies.",
  keywords: "golf formats, golf rules, golf games, recreational golf, tournament golf, betting games, team golf",
  authors: [{ name: "Format Finder Team" }],
  openGraph: {
    title: "Format Finder - Discover Your Perfect Golf Game",
    description: "Comprehensive database of golf game formats for recreational players. Discover 20+ ways to play golf with detailed rules, scoring, and strategies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Format Finder - Discover Your Perfect Golf Game",
    description: "Comprehensive database of golf game formats for recreational players. Discover 20+ ways to play golf with detailed rules, scoring, and strategies.",
  },
  robots: "index, follow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Golf Formats",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover", // For iPhone notch support
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen text-masters-slate antialiased relative pb-safe">
        <div className="golf-pattern-overlay" aria-hidden="true" />
        <SettingsLoader />
        <Header />
        <main className="min-h-screen relative" style={{ zIndex: 1 }}>
          {children}
        </main>
        <Footer />
        <KeyboardShortcutsHelp />
        <MobileViewportDebugger />
      </body>
    </html>
  );
}

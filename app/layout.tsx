import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
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
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeonArcade — Play Beyond",
  description: "The future of browser gaming. Play beyond limits.",
  other: {
    "google-adsense-account": "ca-pub-9814325246389127",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-text-primary">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9814325246389127"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <div className="noise-overlay" />
          <Navbar />
          <main className="flex-1 relative z-10 pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

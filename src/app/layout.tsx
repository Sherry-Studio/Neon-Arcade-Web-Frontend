import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import SmoothScroll from "@/components/SmoothScroll";

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
      <body className="flex min-h-full flex-col text-text-primary">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9814325246389127"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <AuthProvider>
          <SmoothScroll />
          <div className="noise-overlay" />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

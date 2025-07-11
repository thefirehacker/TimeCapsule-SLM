import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "../components/analytics/Analytics";
import { SessionProvider } from "../components/providers/SessionProvider";
import { Navbar } from "@/components/ui/navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DeepResearch TimeCapsule - AI-Powered Research Studio",
  description:
    "Professional AI-powered research platform with advanced document analysis, vector search, and comprehensive research generation using multiple AI providers.",
  keywords:
    "AI research, document analysis, vector search, machine learning, academic research, market analysis",
  authors: [{ name: "FireHacker", url: "https://x.com/thefirehacker" }],
  creator: "FireHacker",
  publisher: "TimeCapsule",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/Media/TimeCapsule_04.png", sizes: "32x32", type: "image/png" },
      { url: "/Media/TimeCapsule_04.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/Media/TimeCapsule_04.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/Media/TimeCapsule_04.png", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "DeepResearch TimeCapsule",
    title: "DeepResearch TimeCapsule - AI-Powered Research Studio",
    description:
      "Professional AI-powered research platform with advanced document analysis, vector search, and comprehensive research generation.",
    images: [
      {
        url: "/Media/TimeCapsule_04.png",
        width: 1200,
        height: 630,
        alt: "DeepResearch TimeCapsule",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepResearch TimeCapsule - AI-Powered Research Studio",
    description:
      "Professional AI-powered research platform with advanced document analysis and research generation.",
    images: ["/Media/TimeCapsule_04.png"],
    creator: "@thefirehacker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Fix viewport warning by using the viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#667eea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Multiple favicon formats for better browser compatibility */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Media/TimeCapsule_04.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Media/TimeCapsule_04.png"
        />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Media/TimeCapsule_04.png"
        />

        {/* Additional meta tags */}
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta
          name="msapplication-TileImage"
          content="/Media/TimeCapsule_04.png"
        />

        {/* Force favicon cache refresh in development */}
        <link
          rel="icon"
          href={`/favicon.ico?v=${Date.now()}`}
          type="image/x-icon"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Analytics />
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

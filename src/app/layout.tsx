import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClientAppProviders } from "@/components/providers/ClientAppProviders";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://timecapsuleslm.com"
  ),
  title: {
    default: "TimeCapsule - AI-Powered Learning Platform",
    template: "%s | TimeCapsule",
  },
  description:
    "Transform your learning with TimeCapsule's AI-powered platform featuring AI-Frames, Deep Research, and Interactive Knowledge Graphs. Create personalized learning experiences with advanced AI technology.",
  keywords: [
    "AI learning platform",
    "AI-Frames",
    "Deep Research",
    "Knowledge Graphs",
    "Machine Learning",
    "Educational Technology",
    "Personalized Learning",
    "AI-powered education",
    "Interactive Learning",
    "TimeCapsule",
    "Learning Management System",
  ],
  authors: [{ name: "FireHacker", url: "https://x.com/thefirehacker" }],
  creator: "FireHacker",
  publisher: "TimeCapsule",
  category: "Education",
  classification: "Educational Technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    url: "/",
    siteName: "TimeCapsule",
    title: "TimeCapsule - AI-Powered Learning Platform",
    description:
      "Transform your learning with AI-Frames, Deep Research, and Interactive Knowledge Graphs. Create personalized learning experiences with advanced AI technology.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TimeCapsule - AI-Powered Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeCapsule - AI-Powered Learning Platform",
    description:
      "Transform your learning with AI-Frames, Deep Research, and Interactive Knowledge Graphs. Create personalized learning experiences with advanced AI technology.",
    images: ["/opengraph-image"],
    creator: "@thefirehacker",
    site: "@thefirehacker",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: "/",
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
  const resolvedBuildEnv =
    process.env.NEXT_BUILD_ENV ||
    process.env.NEXT_PUBLIC_BUILD_ENV ||
    "local";

  return (
    <html lang="en" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__NEXT_BUILD_ENV__ = ${JSON.stringify(
              resolvedBuildEnv
            )};`,
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ClientAppProviders>{children}</ClientAppProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/contact-details";

export const metadata: Metadata = {
  title: "Contact Us - BubblSpace",
  description:
    "Get in touch with BubblSpace team. We're here to help and answer any questions about our Build Enterprise AI. 24-hour response time guaranteed.",
  keywords: [
    "Contact",
    "Support",
    "BubblSpace",
    "AI Enterprise",
    "Customer Service",
    "Technical Support",
  ],
  authors: [{ name: "BubblSpace Team" }],
  creator: "BubblSpace",
  publisher: "BubblSpace",
  metadataBase: new URL("https://bubblspace.com"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us - BubblSpace",
    description:
      "Get in touch with BubblSpace team. We're here to help and answer any questions about our Build Enterprise AI.",
    url: "https://bubblspace.com/contact",
    siteName: "BubblSpace",
    images: [
      {
        url: "/api/og/contact",
        width: 1200,
        height: 630,
        alt: "Contact BubblSpace - Get Support for AI Enterprise Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - BubblSpace",
    description:
      "Get in touch with BubblSpace team. 24-hour response time guaranteed for all inquiries.",
    images: ["/api/og/contact"],
    creator: "@bubblspace",
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

export default function ContactPage() {
  return <ContactPageClient />;
}

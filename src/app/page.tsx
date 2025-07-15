"use client";

import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { GitHubSection } from "@/components/landing/github";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { usePageAnalytics } from "@/components/analytics/Analytics";
import Script from "next/script";

export default function Home() {
  // Initialize page analytics for Homepage
  const analytics = usePageAnalytics("Homepage", "landing");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://timecapsuleslm.com/#organization",
        name: "TimeCapsule",
        url: "https://timecapsuleslm.com",
        logo: {
          "@type": "ImageObject",
          url: "https://timecapsuleslm.com/Media/TimeCapsule_04.png",
          width: 180,
          height: 180,
        },
        description:
          "AI-Powered Learning Platform featuring AI-Frames, Deep Research, and Interactive Knowledge Graphs",
        foundingDate: "2024",
        founder: {
          "@type": "Person",
          name: "FireHacker",
          url: "https://x.com/thefirehacker",
        },
        sameAs: ["https://x.com/thefirehacker"],
      },
      {
        "@type": "WebSite",
        "@id": "https://timecapsuleslm.com/#website",
        url: "https://timecapsuleslm.com",
        name: "TimeCapsule",
        description: "AI-Powered Learning Platform",
        publisher: {
          "@id": "https://timecapsuleslm.com/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://timecapsuleslm.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "TimeCapsule",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
        description:
          "AI-Powered Learning Platform with AI-Frames, Deep Research, and Knowledge Graphs",
        url: "https://timecapsuleslm.com",
        author: {
          "@id": "https://timecapsuleslm.com/#organization",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "AI-Frames Learning",
          "Deep Research Tools",
          "Interactive Knowledge Graphs",
          "Personalized Learning Paths",
          "Document Analysis",
          "Vector Search",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GitHubSection />
      <Footer />
    </div>
  );
}

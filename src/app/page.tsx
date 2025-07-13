"use client";

import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { GitHubSection } from "@/components/landing/github";
import { Navbar } from "@/components/ui/navbar";
import { usePageAnalytics } from "@/components/analytics/Analytics";

export default function Home() {
  // Initialize page analytics for Homepage
  const analytics = usePageAnalytics("Homepage", "landing");

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GitHubSection />
    </div>
  );
}

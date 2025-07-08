import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { GitHubSection } from "@/components/landing/github";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GitHubSection />
    </div>
  );
}

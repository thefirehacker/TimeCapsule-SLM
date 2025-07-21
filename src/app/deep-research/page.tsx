"use client";

import { DeepResearchComponent } from "@/components/DeepResearch/DeepResearchApp";
import { usePageAnalytics } from "@/components/analytics/Analytics";

export default function DeepResearchPage() {
  // Initialize page analytics for DeepResearch TimeCapsule
  const pageAnalytics = usePageAnalytics('DeepResearch-TimeCapsule', 'research');

  return <DeepResearchComponent />;
}

"use client";

import { DeepResearchComponent } from "@/components/DeepResearch/DeepResearchApp";
import { VectorStoreProvider } from "@/components/providers/VectorStoreProvider";
import { usePageAnalytics } from "@/components/analytics/Analytics";

export default function DeepResearchPage() {
  // Initialize page analytics for DeepResearch TimeCapsule
  const pageAnalytics = usePageAnalytics('DeepResearch-TimeCapsule', 'research');

  return (
    <VectorStoreProvider>
      <DeepResearchComponent />
    </VectorStoreProvider>
  );
}

"use client";

import React from "react";
import LearningGraph from "@/components/ai-graphs/LearningGraph";

export default function AIGraphsPage() {
  return (
    <div className="h-screen w-full ">
      <div className="h-[calc(100vh-4rem)]">
        <LearningGraph />
      </div>
    </div>
  );
}

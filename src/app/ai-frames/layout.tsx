"use client";

import { VectorStoreProvider } from "@/components/providers/VectorStoreProvider";
import { Navbar } from "@/components/ui/navbar";

export default function AIFramesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VectorStoreProvider>
      <div className="min-h-screen">
        <Navbar />
        {children}
      </div>
    </VectorStoreProvider>
  );
} 
"use client";

import { VectorStoreProvider } from "@/components/providers/VectorStoreProvider";

export default function AIFramesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VectorStoreProvider>
      {children}
    </VectorStoreProvider>
  );
} 
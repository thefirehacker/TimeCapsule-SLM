"use client";

import { VectorStoreProvider } from "@/components/providers/VectorStoreProvider";

export default function TestUploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VectorStoreProvider>{children}</VectorStoreProvider>;
}


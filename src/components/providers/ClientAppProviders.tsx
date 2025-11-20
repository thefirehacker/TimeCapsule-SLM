"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { SessionProvider } from "./SessionProvider";
import { VectorStoreProvider } from "./VectorStoreProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const Analytics = dynamic(
  () => import("../analytics/Analytics").then((mod) => mod.Analytics),
  { ssr: false, loading: () => null }
);

interface ClientAppProvidersProps {
  children: ReactNode;
}

export function ClientAppProviders({ children }: ClientAppProvidersProps) {
  return (
    <>
      <Analytics />
      <VectorStoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </VectorStoreProvider>
    </>
  );
}

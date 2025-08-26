"use client";

import { Navbar } from "@/components/ui/navbar";
import { SessionProvider } from "next-auth/react";

export default function AIFramesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}

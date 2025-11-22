"use client";

import { Navbar } from "@/components/ui/navbar";

export default function AIFramesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      {children}
    </div>
  );
}

"use client";

import { Navbar } from "@/components/ui/navbar";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-6">
        {children}
      </div>
    </div>
  );
}


"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DeepResearchComponent } from "@/components/DeepResearch/DeepResearchApp";

export default function DeepResearchPage() {
  // Authentication check
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      // Redirect to sign-in with current URL as callback
      const currentUrl = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      router.push(`/auth/signin?callbackUrl=${currentUrl}`);
    }
  }, [session, status, router]);

  // Show loading while checking auth or redirecting
  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {status === "loading"
              ? "Checking authentication..."
              : "Redirecting to sign-in..."}
          </p>
        </div>
      </div>
    );
  }

  return <DeepResearchComponent />;
}

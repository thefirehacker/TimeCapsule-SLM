"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(providerId);
    try {
      await signIn(providerId, { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case "google":
        return <GoogleIcon />;
      case "github":
        return <Github className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getProviderButtonStyles = (providerId: string) => {
    switch (providerId) {
      case "google":
        return "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400";
      case "github":
        return "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700";
      default:
        return "bg-primary hover:bg-primary/90 text-primary-foreground";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/Media/TimeCapsule_04.png"
                  alt="TimeCapsule Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TimeCapsule
              </span>
            </div>
          </Link>

          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue your AI-powered research journey
          </p>
        </div>

        {/* Sign In Card */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-800/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
            <CardDescription>
              Choose your preferred authentication method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {providers ? (
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  disabled={isLoading !== null}
                  className={`w-full h-12 gap-3 text-base font-medium transition-all duration-200 ${getProviderButtonStyles(
                    provider.id
                  )}`}
                >
                  {isLoading === provider.id ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                  ) : (
                    getProviderIcon(provider.id)
                  )}
                  {isLoading === provider.id
                    ? "Signing in..."
                    : `Continue with ${provider.name}`}
                </Button>
              ))
            ) : (
              <div className="space-y-4">
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

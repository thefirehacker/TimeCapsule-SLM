"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const redirect = searchParams.get("redirect") || "/auth/signin";

  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setIsVerifying(false);
      setError("No verification token provided");
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setUserEmail(data.user?.email || "");
      } else {
        setError(data.error || "Email verification failed");
      }
    } catch (error) {
      console.error("Email verification error:", error);
      setError("An unexpected error occurred during verification");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (!userEmail) {
      setError("Unable to resend email - email address not found");
      return;
    }

    setIsResendingEmail(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          redirect: redirect,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        setError(null);
        alert("Verification email sent successfully! Please check your inbox.");
      } else {
        setError(data.error || "Failed to send verification email");
      }
    } catch (error) {
      console.error("Resend email error:", error);
      setError("Failed to send verification email. Please try again.");
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleContinue = () => {
    router.push(redirect);
  };

  // Loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-3">
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
            <CardTitle className="text-2xl font-bold">
              Verifying Email
            </CardTitle>
            <CardDescription>
              Please wait while we verify your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
            <p className="text-gray-600 dark:text-gray-400">
              Verifying your email address...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-3">
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
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              Email Verified Successfully!
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your email address has been confirmed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userEmail && (
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verified email:
                </p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {userEmail}
                </p>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can now sign in to your account and start using TimeCapsule!
              </p>
            </div>
            <Button onClick={handleContinue} className="w-full">
              Continue to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-3">
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
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
            Verification Failed
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Unable to verify your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The verification link may have expired or is invalid. You can
              request a new verification email below.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            {userEmail && (
              <Button
                onClick={handleResendEmail}
                disabled={isResendingEmail}
                variant="outline"
                className="w-full"
              >
                {isResendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            )}

            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

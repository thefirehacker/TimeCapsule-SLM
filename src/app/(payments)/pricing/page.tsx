"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen text-foreground">
      <div className="container px-4 py-24 mx-auto">
        <div className="text-center space-y-3 mb-16">
          <p className="text-primary font-medium">Pricing</p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Choose the right plan for you
          </h1>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader className="space-y-2">
              <h3 className="text-xl font-bold">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Feature included>Create up to 1 podcasts per month</Feature>
              <Feature included>
                Develop up to 5 microlearning modules per month
              </Feature>
              <Feature included>
                Unlimited access to view Public TimeCapsules
              </Feature>
              <Feature included>Basic AI Frame Creation</Feature>
              <Feature included>Learning Graph Generation</Feature>
              <Feature included>Document Processing</Feature>
              <Feature included>Browser Storage</Feature>
              <Feature included>Community Support</Feature>
              <Feature>Extended podcast duration (8-10 minutes)</Feature>
              <Feature>Live podcast with user interaction (Live Q&A)</Feature>
              <Feature>Advanced Creator Tools & Analytics</Feature>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative shadow-lg shadow-primary/20 border-primary/50">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-primary text-primary-foreground">
                Most popular
              </Badge>
            </div>
            <CardHeader className="space-y-4">
              <h3 className="text-xl font-bold">Pro</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-black/10 p-3 backdrop-blur-sm">
                    <span className="text-xs font-medium text-emerald-400">
                      USD
                    </span>
                    <div className="mt-1 space-y-1">
                      <div className="text-sm text-gray-400 line-through">
                        $99
                      </div>
                      <div className="text-3xl font-bold">$29</div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-black/10 p-3 backdrop-blur-sm">
                    <span className="text-xs font-medium text-emerald-400">
                      INR
                    </span>
                    <div className="mt-1 space-y-1">
                      <div className="text-sm text-gray-400 line-through">
                        ₹8,500
                      </div>
                      <div className="text-3xl font-bold">₹2,500</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-400/10 p-3 text-center">
                  <p className="text-sm font-medium text-emerald-400">
                    🎄 Holiday Special: 2 months free with annual subscription
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Feature included>
                Create up to 3 AI Sales Demos per month
              </Feature>
              <Feature included>Admin Dashboard for your Sales Team</Feature>
              <Feature included>
                Approval workflow to screen demo requests
              </Feature>
              <Feature included>
                Schedule demos with leads with a few clicks
              </Feature>
              <Feature included>Admin access to AI Persona</Feature>
              <Feature included>English language support</Feature>
              <Feature included>Advanced Analytics</Feature>
              <Feature included>Priority Support</Feature>
              <Feature included>Cloud Storage (10GB)</Feature>
              <Feature included>All Integrations</Feature>
              <Feature included>API Access</Feature>
              <Feature included>Custom AI Models</Feature>
              <Feature className="text-amber-500">
                Additional languages (Coming Soon)
              </Feature>
              <Feature className="text-amber-500">
                Top up option: $99 for 5 additional demos (Coming Soon)
              </Feature>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleGetStarted}>
                Get started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Enterprise Plan */}
          <Card className="relative">
            <CardHeader className="space-y-2">
              <h3 className="text-xl font-bold">Pro Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Coming Soon</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Feature included>Custom solutions</Feature>
              <Feature included>Priority support</Feature>
              <Feature included>Advanced features</Feature>
              <Feature included>Unlimited Team Members</Feature>
              <Feature included>Enterprise SSO</Feature>
              <Feature included>99.9% SLA Guarantee</Feature>
              <Feature included>Unlimited Storage</Feature>
              <Feature included>On-premise Deployment</Feature>
              <Feature included>24/7 Priority Support</Feature>
              <Feature included>Custom Integration</Feature>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="secondary" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Feature({
  children,
  included = false,
  className = "",
}: {
  children: React.ReactNode;
  included?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {included ? (
        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
      ) : (
        <X className="h-4 w-4 text-slate-500 shrink-0" />
      )}
      <span className="text-sm">{children}</span>
    </div>
  );
}

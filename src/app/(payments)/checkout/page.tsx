"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Country, State } from "country-state-city";
import Script from "next/script";
import { Loader } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  city: string;
  pincode: string;
  state: string;
}

type Currency = "USD" | "INR";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currency, setCurrency] = useState<Currency>("USD");

  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "US",
      addressLine1: "",
      city: "",
      pincode: "",
      state: "",
    },
  });

  const selectedCountry = watch("country");

  const [loading, setLoading] = useState(false);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  const retryScriptLoading = useCallback(() => {
    setScriptError(false);

    if (!window.Razorpay && !document.getElementById("razorpay-retry")) {
      const script = document.createElement("script");
      script.id = "razorpay-retry";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        setIsScriptReady(true);
        setScriptError(false);
      };

      script.onerror = () => {
        setScriptError(true);
        setIsScriptReady(false);
      };

      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const checkRazorpayAvailability = () => {
      if (window.Razorpay) {
        setIsScriptReady(true);
        return true;
      }
      return false;
    };

    const isAvailable = checkRazorpayAvailability();

    if (!isAvailable) {
      const timeout = setTimeout(() => {
        if (!checkRazorpayAvailability()) {
          setScriptError(true);
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
    }
  }, [session, setValue]);

  useEffect(() => {
    setCurrency(selectedCountry === "IN" ? "INR" : "USD");
  }, [selectedCountry]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
  }, [status, router]);

  const createOrderAndOpenRazorpay = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.userId || "",
          address: `${data.addressLine1}, ${data.city}, ${data.state}, ${data.country}, ${data.pincode}`,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          name: data.name,
          email: data.email,
          phone: data.phone,
          currency: currency,
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const orderData = await response.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: orderData.subscriptionId,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },

        handler: async (response: any) => {
          const verifyData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(verifyData),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.isOk) {
            router.push("/success");
          } else {
            alert(`Failed to verify: ${res.message}`);
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPrice = useCallback(() => {
    return currency === "USD" ? "$29 USD" : "₹25,00 INR";
  }, [currency]);

  const planFeatures = [
    "Create up to 3 AI Sales Demos per month",
    "Admin Dashboard for your Sales Team",
    "Approval workflow to screen demo requests",
    "Schedule demos with leads with a few clicks",
    "Admin access to AI Persona",
    "English language support",
    "Advanced Analytics",
    "Priority Support",
    "Cloud Storage (10GB)",
    "All Integrations",
    "API Access",
    "Custom AI Models",
    "Additional languages (Coming Soon)",
    "Top up option: $99 for 5 additional demos (Coming Soon)",
  ];

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          setIsScriptReady(true);
          setScriptError(false);
        }}
        onError={() => {
          setScriptError(true);
          setIsScriptReady(false);
        }}
        strategy="afterInteractive"
      />
      <div className="min-h-screen  py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Complete Your Subscription
          </h1>

          <Card className="overflow-hidden shadow-xl border-0">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Left side - Form */}
              <CardContent className="p-8 md:col-span-3 border-r border-border/50">
                <h2 className="text-2xl font-semibold mb-6">
                  Billing Information
                </h2>
                <form
                  onSubmit={handleSubmit(createOrderAndOpenRazorpay)}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <Input {...field} className="mt-1" />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <Input {...field} type="email" className="mt-1" />
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <Input {...field} type="tel" className="mt-1" />
                      )}
                    />
                  </div>

                  <div className="pt-2">
                    <h3 className="font-medium text-base mb-3">
                      Billing Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="country"
                          className="text-sm font-medium"
                        >
                          Country
                        </Label>
                        <Controller
                          name="country"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                              <SelectContent>
                                {Country.getAllCountries().map((country) => (
                                  <SelectItem
                                    key={country.isoCode}
                                    value={country.isoCode}
                                  >
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="addressLine1"
                          className="text-sm font-medium"
                        >
                          Street Address
                        </Label>
                        <Controller
                          name="addressLine1"
                          control={control}
                          rules={{ required: "Address is required" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Address"
                              className="mt-1"
                            />
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-sm font-medium">
                            City
                          </Label>
                          <Controller
                            name="city"
                            control={control}
                            rules={{ required: "City is required" }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="City"
                                className="mt-1"
                              />
                            )}
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="pincode"
                            className="text-sm font-medium"
                          >
                            PIN/ZIP Code
                          </Label>
                          <Controller
                            name="pincode"
                            control={control}
                            rules={{
                              required: "PIN/ZIP is required",
                              pattern: {
                                value: /^\d{5,6}$/,
                                message: "Invalid PIN/ZIP",
                              },
                            }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="PIN/ZIP"
                                maxLength={6}
                                className="mt-1"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-sm font-medium">
                          State/Province
                        </Label>
                        <Controller
                          name="state"
                          control={control}
                          rules={{ required: "State is required" }}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                              <SelectContent>
                                {State.getStatesOfCountry(selectedCountry).map(
                                  (state) => (
                                    <SelectItem
                                      key={state.isoCode}
                                      value={state.isoCode}
                                    >
                                      {state.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {scriptError && (
                    <div className="text-center p-4 mb-4 bg-destructive/10 rounded-md">
                      <p className="text-sm text-destructive mb-2">
                        Payment system failed to load
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={retryScriptLoading}
                      >
                        Retry Loading
                      </Button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-6 py-6 text-base font-medium"
                    disabled={loading || (!isScriptReady && !scriptError)}
                  >
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : isScriptReady ? (
                      `Pay ${getPrice()} Now`
                    ) : scriptError ? (
                      "Payment System Error - Click to Try Again"
                    ) : (
                      "Loading Payment System..."
                    )}
                  </Button>
                </form>
              </CardContent>

              {/* Right side - Plan details */}
              <CardContent className="bg-primary/5 p-8 md:col-span-2">
                <div className="sticky top-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Pro</h3>
                  </div>

                  <div className="mb-6 pb-6 border-b border-border/50">
                    <p className="text-3xl font-bold">{getPrice()}</p>
                    <p className="text-sm text-muted-foreground">
                      Billed monthly • Holiday Special: 2 months free with
                      annual
                    </p>
                  </div>

                  <h4 className="font-medium mb-4">Plan includes:</h4>
                  <ul className="space-y-3 mb-6">
                    {planFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-start"
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="bg-background rounded-lg p-4 text-sm">
                    <p className="font-medium mb-2">Secure Payment</p>
                    <p className="text-muted-foreground">
                      Your payment information is processed securely. We do not
                      store credit card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

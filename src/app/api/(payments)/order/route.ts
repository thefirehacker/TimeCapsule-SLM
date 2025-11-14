import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { updateCheckoutUserInfo } from "@/lib/razorpay/dynamodb-payments";
import { isLocalServerEnv } from "@/lib/env";

const getRazorpayClient = (): Razorpay | null => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    if (isLocalServerEnv()) {
      console.warn(
        "Razorpay credentials are not configured. Payment APIs are disabled in local mode."
      );
      return null;
    }

    throw new Error(
      "Razorpay credentials are not configured. Please check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables."
    );
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export async function POST(request: NextRequest) {
  try {
    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return NextResponse.json(
        {
          error: "Payment service disabled in local mode",
          code: "LOCAL_MODE_PAYMENT_DISABLED",
        },
        { status: 200 }
      );
    }

    const body = await request.json();

    let plan_id = "";

    if (body.country === "IN") {
      plan_id = "plan_PTydgsGdsdc3GB";
    } else {
      plan_id = "plan_PWKfQOxaPQglWK";
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: plan_id,
      total_count: 12,
      quantity: 1,
      customer_notify: 1,
      notes: {
        userId: body.userId,
        address: body.address,
        name: body.name,
        email: body.email,
        phone: body.phone,
        country: body.country,
        state: body.state,
        pincode: body.pincode,
      },
    });

    const userId = body.userId;
    const phone = body.phone;
    const address = body.address;
    const country = body.country;
    const state = body.state;
    const pincode = body.pincode;
    const razorpay_name = body.name;
    const razorpay_email = body.email;

    const subscriptionId = subscription.id;
    const updatedAt = new Date().toISOString();

    await updateCheckoutUserInfo({
      userId,
      phone,
      address,
      country,
      state,
      pincode,
      subscriptionId,
      updatedAt,
      razorpay_name,
      razorpay_email,
    });

    console.log("Subscription created", subscription);
    return NextResponse.json(
      { subscriptionId: subscription.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating subscription:", error);

    // Provide more specific error messages
    if (error.message?.includes("credentials are not configured")) {
      return NextResponse.json(
        {
          error: "Payment service configuration error",
          details: error.message,
          code: "CONFIG_ERROR",
        },
        { status: 500 }
      );
    }

    if (error.statusCode === 401) {
      return NextResponse.json(
        {
          error: "Payment service authentication failed",
          details:
            "Invalid Razorpay API credentials. Please check your key_id and key_secret.",
          code: "AUTH_ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create subscription",
        details: error.message || "Unknown error occurred",
        code: "SUBSCRIPTION_ERROR",
      },
      { status: 500 }
    );
  }
}

import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { updateCheckoutUserInfo } from "@/lib/razorpay/dynamodb-payments";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  let plan_id = "";

  if (body.country === "IN") {
    plan_id = "plan_PTydgsGdsdc3GB";
  } else {
    plan_id = "plan_PWKfQOxaPQglWK";
  }

  try {
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
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}

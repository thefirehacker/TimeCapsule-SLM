import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { WebhookRequest, updateUserStatus } from "@/lib/razorpay/razorpay";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const rawBody = await req.text();
    const razorpaySignature = req.headers.get("x-razorpay-signature");

    if (!razorpaySignature) {
      return NextResponse.json(
        { message: "Missing Razorpay signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event: WebhookRequest = JSON.parse(rawBody);
    const subscriptionId = event.payload.subscription.entity.id;

    if (!subscriptionId) {
      return NextResponse.json(
        { message: "Missing subscription ID" },
        { status: 400 }
      );
    }

    console.log(
      `Processing webhook event: ${event.event} for subscription: ${subscriptionId}`
    );

    // Process the webhook, which will also store order info
    const result = await updateUserStatus({
      subscriptionId,
      razorpay_payload: event,
      status: event.payload.subscription.entity.status,
    });

    console.log(`Webhook processed successfully for user: ${result.userId}`);

    return NextResponse.json({
      status: "ok",
      message: `Successfully processed ${event.event} event`,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        message: "Webhook error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

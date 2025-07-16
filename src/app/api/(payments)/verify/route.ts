import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getUserByIndex } from "@/lib/razorpay/dynamodb-payments";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/aws/dynamodb";

const verifySignature = (
  razorpay_payment_id: string,
  razorpay_subscription_id: string,
  razorpay_signature: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }
  const hmac = crypto.createHmac("sha256", keySecret);
  hmac.update(`${razorpay_payment_id}|${razorpay_subscription_id}`);
  const generated_signature = hmac.digest("hex");
  return generated_signature === razorpay_signature;
};

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = await request.json();

    const isValid = verifySignature(
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    // Find the user with this subscription ID
    try {
      const user = await getUserByIndex(
        "subscriptionId-index",
        "subscriptionId",
        razorpay_subscription_id
      );

      if (user) {
        // Immediately update user status to RegularPro after payment
        const updateParams = {
          TableName: "Users",
          Key: { userId: user.userId },
          UpdateExpression:
            "SET userType = :ut, payment_verified = :pv, immediate_access_until = :iau, updatedAt = :ua",
          ExpressionAttributeValues: {
            ":ut": "RegularPro",
            ":pv": true,
            ":iau": Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
            ":ua": new Date().toISOString(),
          },
          ReturnValues: "ALL_NEW" as const,
        };

        await docClient.send(new UpdateCommand(updateParams));

        console.log(
          `User ${user.userId} marked as RegularPro after payment verification`
        );
      } else {
        console.warn(
          `No user found with subscription ID: ${razorpay_subscription_id}`
        );
      }
    } catch (error) {
      console.error("Error updating user after payment verification:", error);
      // Don't fail the request, still return success to client
    }

    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during payment verification:", error);
    return NextResponse.json(
      {
        message: "Error verifying payment",
        error: error instanceof Error ? error.message : "Unknown error",
        isOk: false,
      },
      { status: 500 }
    );
  }
}

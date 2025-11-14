import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { getUserByEmail } from "@/lib/auth/auth";
import { docClient } from "@/lib/aws/dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import PasswordResetTemplate from "@/components/email/PasswordResetTemplate";
import { getResendClient } from "@/lib/email/resendClient";

const resend = getResendClient();
const RESET_TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get user from database
    const user = await getUserByEmail(email);

    console.log("User:", user);

    if (!user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({
        message: "The email you provided is not associated with any account.",
      });
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenHash = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Store hashed token in database
    const params = {
      TableName: "Users",
      Key: { userId: user.userId },
      UpdateExpression: "SET resetToken = :token, resetTokenExpiry = :expiry",
      ExpressionAttributeValues: {
        ":token": resetTokenHash,
        ":expiry": Date.now() + RESET_TOKEN_EXPIRY,
      },
    };

    await docClient.send(new UpdateCommand(params));

    // Construct reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}`;

    if (!resend) {
      console.info(
        "Skipping password reset email: RESEND_API_KEY not set (local mode)."
      );
      return NextResponse.json({
        message:
          "Password reset email skipped because email delivery is disabled in local mode.",
      });
    }

    try {
      // Send reset email using the new template
      const { data, error } = await resend.emails.send({
        from: "Bubblspace Support <support@bubblspace.com>",
        to: email,
        subject: "Reset Your Password",
        react: PasswordResetTemplate({ resetUrl }),
      });

      if (error) {
        console.error("Resend API error:", error);
        throw new Error("Failed to send reset email");
      }

      console.log("Reset email sent successfully:", data);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Remove the token from database if email fails
      const cleanupParams = {
        TableName: "Users",
        Key: { userId: user.userId },
        UpdateExpression: "REMOVE resetToken, resetTokenExpiry",
      };
      await docClient.send(new UpdateCommand(cleanupParams));

      throw new Error("Failed to send reset email");
    }

    return NextResponse.json({
      message:
        "If an account exists with this email, you will receive a password reset link.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash, randomBytes } from "crypto";
import { getUserByEmail, setVerificationToken } from "@/lib/auth/auth";
import VerificationEmailTemplate from "@/components/email/VerificationEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
const VERIFICATION_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function POST(request: NextRequest) {
  try {
    const { email, redirect } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get user from database
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate verification token
    const verificationToken = randomBytes(32).toString("hex");
    const verificationTokenHash = createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    // Store hashed token in database
    await setVerificationToken(
      user.userId,
      verificationTokenHash,
      Date.now() + VERIFICATION_TOKEN_EXPIRY
    );

    // Construct verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?token=${verificationToken}&redirect=${redirect}`;

    try {
      // Send verification email
      const { data, error } = await resend.emails.send({
        from: "Bubblspace Support <support@bubblspace.com>",
        to: email,
        subject: "Verify Your Email Address",
        react: VerificationEmailTemplate({
          name: user.name,
          verificationUrl,
        }),
      });

      if (error) {
        console.error("Resend API error:", error);
        throw new Error("Failed to send verification email");
      }

      console.log("Verification email sent successfully:", data);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      throw new Error("Failed to send verification email");
    }

    return NextResponse.json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.error("Send verification email error:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}

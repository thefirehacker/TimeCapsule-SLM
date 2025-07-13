import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getUserByVerificationToken, verifyUser } from "@/lib/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Hash the token to compare with the stored hash
    const tokenHash = createHash("sha256").update(token).digest("hex");

    // Get user by verification token
    const user = await getUserByVerificationToken(tokenHash);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (user.verificationTokenExpiry < Date.now()) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      );
    }

    // Verify the user
    await verifyUser(user.userId);

    return NextResponse.json({
      message: "Email verified successfully",
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}

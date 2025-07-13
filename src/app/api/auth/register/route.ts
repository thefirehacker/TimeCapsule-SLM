import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, company } = await request.json();

    // Validate input
    if (!name || !email || !password || !company) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create user
    const user = await createUser({
      email,
      name,
      password,
      role: "user",
      status: "active",
      userType: "Free",
      company,
    });

    // Send welcome emails after successful registration
    try {
      await fetch(
        `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/welcome-emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            company,
            userType: "Free",
          }),
        }
      );
    } catch (emailError) {
      console.error("Failed to send welcome emails:", emailError);
      // Don't fail the registration if emails fail
    }

    return NextResponse.json(
      { message: "User registered successfully", userId: user.userId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

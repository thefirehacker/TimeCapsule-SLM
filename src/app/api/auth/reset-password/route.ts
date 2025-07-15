import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { docClient } from "@/lib/aws/dynamodb";
import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    const hashedToken = createHash("sha256").update(token).digest("hex");

    // Query user by reset token
    const params = {
      TableName: "Users",
      IndexName: "resetToken-index",
      KeyConditionExpression: "resetToken = :token",
      ExpressionAttributeValues: {
        ":token": hashedToken,
      },
    };

    const { Items } = await docClient.send(new QueryCommand(params));
    const user = Items?.[0];

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and remove reset token
    const updateParams = {
      TableName: "Users",
      Key: { userId: user.userId },
      UpdateExpression:
        "SET password = :password REMOVE resetToken, resetTokenExpiry",
      ExpressionAttributeValues: {
        ":password": hashedPassword,
      },
    };

    await docClient.send(new UpdateCommand(updateParams));

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}

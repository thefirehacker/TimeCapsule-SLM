import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { docClient } from "@/lib/aws/dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const hashedToken = createHash("sha256").update(token).digest("hex");

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

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate reset token" },
      { status: 500 }
    );
  }
}

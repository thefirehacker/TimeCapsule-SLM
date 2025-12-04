import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserById } from "@/lib/auth/auth";
import { docClient } from "@/lib/aws/dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { AIFRAMES_TABLE } from "@/lib/timecapsule/aiframeSharing";

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserById(session.userId);
  if (!user?.email) {
    return NextResponse.json(
      { error: "Unable to resolve user email" },
      { status: 400 }
    );
  }

  const normalizedEmail = user.email.toLowerCase();

  try {
    const response = await docClient.send(
      new ScanCommand({
        TableName: AIFRAMES_TABLE,
        FilterExpression: "contains(allowedEmails, :email)",
        ExpressionAttributeValues: {
          ":email": normalizedEmail,
        },
        ExpressionAttributeNames: {
          "#version": "version",
        },
        ProjectionExpression:
          "frameSetId, #version, userId, title, updatedAt, shareToken, isShared",
      })
    );

    const shared = (response.Items || []).map((item) => ({
      frameSetId: item.frameSetId,
      version: item.version,
      ownerUserId: item.userId,
      title: item.title || null,
      updatedAt: item.updatedAt || null,
      shareToken: item.shareToken || null,
      isShared: Boolean(item.isShared),
    }));

    return NextResponse.json({ shared });
  } catch (error) {
    console.error("Failed to load shared TimeCapsules:", error);
    return NextResponse.json(
      { error: "Failed to load shared TimeCapsules" },
      { status: 500 }
    );
  }
}


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
          "frameSetId, #version, userId, title, updatedAt, shareToken, isShared, shareMode",
      })
    );

    const ownerIds = Array.from(
      new Set((response.Items || []).map((item) => item.userId))
    );
    const owners = await Promise.all(
      ownerIds.map(async (ownerId) => {
        try {
          const owner = await getUserById(ownerId);
          return owner
            ? {
                userId: ownerId,
                name: owner.name || null,
                email: owner.email || null,
              }
            : { userId: ownerId, name: null, email: null };
        } catch {
          return { userId: ownerId, name: null, email: null };
        }
      })
    );
    const ownerMap = new Map(owners.map((owner) => [owner.userId, owner]));

    const shared = (response.Items || []).map((item) => {
      const owner = ownerMap.get(item.userId);
      return {
        frameSetId: item.frameSetId,
        version: item.version,
        ownerUserId: item.userId,
        ownerName: owner?.name ?? null,
        ownerEmail: owner?.email ?? null,
        title: item.title || null,
        updatedAt: item.updatedAt || null,
        shareToken: item.shareToken || null,
        isShared: Boolean(item.isShared),
        shareMode: item.shareMode || null,
      };
    });

    return NextResponse.json({ shared });
  } catch (error) {
    console.error("Failed to load shared TimeCapsules:", error);
    return NextResponse.json(
      { error: "Failed to load shared TimeCapsules" },
      { status: 500 }
    );
  }
}


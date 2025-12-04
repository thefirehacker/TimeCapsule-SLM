import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  upsertTimeCapsuleRecord,
  TimeCapsuleSyncPayload,
} from "@/lib/timecapsule/aiframeSharing";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const frameSetId = body?.frameSetId;
    const frameVersion = body?.frameVersion || body?.version;
    const timeCapsuleName = body?.timeCapsuleName ?? null;
    const payload = body?.payload as TimeCapsuleSyncPayload | undefined;

    if (!frameSetId || !frameVersion) {
      return NextResponse.json(
        { error: "frameSetId and frameVersion are required" },
        { status: 400 }
      );
    }

    const record = await upsertTimeCapsuleRecord({
      userId: session.userId,
      frameSetId,
      frameVersion,
      title: timeCapsuleName,
      payload,
    });

    return NextResponse.json({
      ok: true,
      share: record,
      lastSyncedAt: record.lastSyncedAt,
    });
  } catch (error) {
    console.error("Failed to sync TimeCapsule:", error);
    return NextResponse.json(
      { error: "Failed to sync TimeCapsule to cloud" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getShareRecordByKey,
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
    const baselineChecksum =
      typeof body?.baselineChecksum === "string"
        ? body.baselineChecksum
        : null;
    const forceUpdate = Boolean(body?.force);

    if (!frameSetId || !frameVersion) {
      return NextResponse.json(
        { error: "frameSetId and frameVersion are required" },
        { status: 400 }
      );
    }

    const existingRecord =
      frameSetId && frameVersion
        ? await getShareRecordByKey(frameSetId, frameVersion)
        : null;
    const ownerUserId = existingRecord?.userId ?? session.userId;
    const shareMode = existingRecord?.shareMode ?? "collaborative";

    if (shareMode === "read-only" && ownerUserId !== session.userId) {
      return NextResponse.json(
        {
          error:
            "The owner enabled read-only mode. Fork your own copy to edit this TimeCapsule.",
        },
        { status: 403 }
      );
    }

    if (
      !forceUpdate &&
      baselineChecksum &&
      existingRecord?.payloadChecksum &&
      baselineChecksum !== existingRecord.payloadChecksum
    ) {
      return NextResponse.json(
        {
          error:
            "New changes were synced before yours. Review them before saving.",
          conflict: {
            latestChecksum: existingRecord.payloadChecksum,
            lastSyncedAt: existingRecord.lastSyncedAt ?? null,
            shareMode,
            snapshot: existingRecord.snapshotPayload ?? null,
          },
        },
        { status: 409 }
      );
    }

    const record = await upsertTimeCapsuleRecord({
      userId: ownerUserId,
      frameSetId,
      frameVersion,
      title: timeCapsuleName,
      payload,
    });

    return NextResponse.json({
      ok: true,
      share: record,
      lastSyncedAt: record.lastSyncedAt,
      payloadChecksum: record.payloadChecksum ?? null,
    });
  } catch (error) {
    console.error("Failed to sync TimeCapsule:", error);
    return NextResponse.json(
      { error: "Failed to sync TimeCapsule to cloud" },
      { status: 500 }
    );
  }
}


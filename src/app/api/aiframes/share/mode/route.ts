import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateShareMode } from "@/lib/timecapsule/aiframeSharing";

const parseBody = async (request: NextRequest) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

const normalizeFrameTarget = (
  frameSetId: unknown,
  frameVersion: unknown,
  legacyVersion?: unknown
): { frameSetId: string; frameVersion: string } | { error: string } => {
  if (typeof frameSetId !== "string" || !frameSetId.trim()) {
    return { error: "Select a TimeCapsule project before updating share mode." };
  }
  const resolvedVersion =
    typeof frameVersion === "string" && frameVersion.trim()
      ? frameVersion.trim()
      : typeof legacyVersion === "string" && legacyVersion.trim()
      ? legacyVersion.trim()
      : null;
  if (!resolvedVersion) {
    return { error: "TimeCapsule version is missing." };
  }
  return {
    frameSetId: frameSetId.trim(),
    frameVersion: resolvedVersion,
  };
};

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const { frameSetId, frameVersion, version, shareMode } = body || {};
  const normalized = normalizeFrameTarget(frameSetId, frameVersion, version);
  if ("error" in normalized) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  if (shareMode !== "collaborative" && shareMode !== "read-only") {
    return NextResponse.json(
      { error: "Share mode must be 'collaborative' or 'read-only'." },
      { status: 400 }
    );
  }

  try {
    const record = await updateShareMode({
      userId: session.userId,
      frameSetId: normalized.frameSetId,
      frameVersion: normalized.frameVersion,
      shareMode,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    console.error("Failed to update share mode:", error);
    return NextResponse.json(
      { error: "Failed to update share mode." },
      { status: 400 }
    );
  }
}


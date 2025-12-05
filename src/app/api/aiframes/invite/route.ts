import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { addInvites, removeInvites } from "@/lib/timecapsule/aiframeSharing";

const parseBody = async (request: NextRequest) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

const formatSharingError = (error: unknown, fallback: string) => {
  if (error instanceof Error) {
    if (
      error.name === "ValidationException" ||
      /provided key element does not match the schema/i.test(error.message)
    ) {
      return "TimeCapsule metadata could not be found. Refresh the page and try again.";
    }
    return error.message;
  }
  return fallback;
};

const normalizeFrameTarget = (
  frameSetId: unknown,
  frameVersion: unknown,
  legacyVersion?: unknown
): { frameSetId: string; frameVersion: string } | { error: string } => {
  if (typeof frameSetId !== "string" || !frameSetId.trim()) {
    return { error: "Select a TimeCapsule before sending invites." };
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
  const {
    frameSetId,
    frameVersion,
    version,
    emails,
    timeCapsuleName,
  } = body || {};
  const normalized = normalizeFrameTarget(frameSetId, frameVersion, version);
  if ("error" in normalized || !Array.isArray(emails)) {
    return NextResponse.json(
      {
        error:
          "error" in normalized
            ? normalized.error
            : "frameSetId, frameVersion, and emails[] are required",
      },
      { status: 400 }
    );
  }

  try {
    const record = await addInvites({
      userId: session.userId,
      frameSetId: normalized.frameSetId,
      frameVersion: normalized.frameVersion,
      emails,
      timeCapsuleName,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message = formatSharingError(
      error,
      "Failed to update invites"
    );
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const { frameSetId, frameVersion, version, emails } = body || {};
  const normalized = normalizeFrameTarget(frameSetId, frameVersion, version);
  if ("error" in normalized || !Array.isArray(emails)) {
    return NextResponse.json(
      {
        error:
          "error" in normalized
            ? normalized.error
            : "frameSetId, frameVersion, and emails[] are required",
      },
      { status: 400 }
    );
  }

  try {
    const record = await removeInvites({
      userId: session.userId,
      frameSetId: normalized.frameSetId,
      frameVersion: normalized.frameVersion,
      emails,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message = formatSharingError(
      error,
      "Failed to remove invites"
    );
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


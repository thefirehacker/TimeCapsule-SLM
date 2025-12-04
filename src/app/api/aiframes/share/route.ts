import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { toggleShareLink } from "@/lib/timecapsule/aiframeSharing";

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
      return "TimeCapsule metadata could not be found. Refresh and try again.";
    }
    return error.message;
  }
  return fallback;
};

const normalizeFrameTarget = (
  frameSetId: unknown,
  version: unknown
): { frameSetId: string; version: string } | { error: string } => {
  if (typeof frameSetId !== "string" || !frameSetId.trim()) {
    return { error: "Select a TimeCapsule project before sharing." };
  }
  if (typeof version !== "string" || !version.trim()) {
    return { error: "TimeCapsule version is missing." };
  }
  return {
    frameSetId: frameSetId.trim(),
    version: version.trim(),
  };
};

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const { frameSetId, version, enable = true, timeCapsuleName } = body || {};
  const normalized = normalizeFrameTarget(frameSetId, version);
  if ("error" in normalized) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  try {
    const record = await toggleShareLink({
      userId: session.userId,
      frameSetId: normalized.frameSetId,
      version: normalized.version,
      enable: Boolean(enable),
      timeCapsuleName,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message = formatSharingError(
      error,
      "Failed to update sharing state"
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
  const { frameSetId, version } = body || {};
  const normalized = normalizeFrameTarget(frameSetId, version);
  if ("error" in normalized) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  try {
    const record = await toggleShareLink({
      userId: session.userId,
      frameSetId: normalized.frameSetId,
      version: normalized.version,
      enable: false,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message = formatSharingError(
      error,
      "Failed to disable sharing"
    );
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  ensureInviteeAccessByToken,
  getShareRecordByKey,
  getShareRecordByToken,
} from "@/lib/timecapsule/aiframeSharing";
import { getUserById } from "@/lib/auth/auth";

const parseBody = async (request: NextRequest) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const token = typeof body?.token === "string" ? body.token.trim() : null;
  const frameSetId =
    typeof body?.frameSetId === "string" ? body.frameSetId.trim() : null;
  const frameVersion =
    typeof body?.frameVersion === "string"
      ? body.frameVersion.trim()
      : typeof body?.version === "string"
      ? body.version.trim()
      : null;

  if (!token && (!frameSetId || !frameVersion)) {
    return NextResponse.json(
      { error: "Provide a share token or frame key." },
      { status: 400 }
    );
  }

  let record =
    token && token.length
      ? await getShareRecordByToken(token)
      : frameSetId && frameVersion
      ? await getShareRecordByKey(frameSetId, frameVersion)
      : null;

  if (!record || !record.isShared) {
    return NextResponse.json(
      { error: "Shared project not found." },
      { status: 404 }
    );
  }

  const invitee = await getUserById(session.userId).catch(() => null);
  const inviteeEmail =
    invitee?.email?.toLowerCase() ?? session.user?.email?.toLowerCase();
  if (!inviteeEmail) {
    return NextResponse.json(
      { error: "Unable to resolve your account email." },
      { status: 400 }
    );
  }

  const normalizedToken = token ?? record.shareToken ?? undefined;
  if (
    !record.allowedEmails.some((email) => email.toLowerCase() === inviteeEmail)
  ) {
    if (normalizedToken) {
      const ensured = await ensureInviteeAccessByToken({
        shareToken: normalizedToken,
        inviteeEmail,
      });
      if (ensured) {
        record = ensured;
      }
    }
  }

  const isOwner = record.userId === session.userId;
  const hasAccess =
    isOwner ||
    record.allowedEmails.some(
      (email) => email.toLowerCase() === inviteeEmail
    );

  if (!hasAccess) {
    return NextResponse.json(
      { error: "You do not have access to this TimeCapsule." },
      { status: 403 }
    );
  }

  const owner = await getUserById(record.userId).catch(() => null);

  return NextResponse.json({
    selection: {
      frameSetId: record.frameSetId,
      frameVersion: record.frameVersion,
      title: record.title ?? null,
      ownerName: owner?.name ?? null,
      ownerEmail: owner?.email ?? null,
      shareMode: record.shareMode,
      shareToken: record.shareToken,
      lastSyncedAt: record.lastSyncedAt ?? null,
      syncSummary: record.syncSummary ?? null,
      snapshot: record.snapshotPayload ?? null,
      payloadChecksum: record.payloadChecksum ?? null,
      parentFrameSetId: record.parentFrameSetId ?? null,
      parentFrameVersion: record.parentFrameVersion ?? null,
      parentShareToken: record.parentShareToken ?? null,
    },
  });
}


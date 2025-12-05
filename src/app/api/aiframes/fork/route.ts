import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  ensureInviteeAccessByToken,
  forkSharedTimeCapsule,
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
  const targetFrameSetId =
    typeof body?.targetFrameSetId === "string"
      ? body.targetFrameSetId.trim()
      : null;
  const targetFrameVersion =
    typeof body?.targetFrameVersion === "string"
      ? body.targetFrameVersion.trim()
      : frameVersion;
  const targetName =
    typeof body?.targetName === "string" ? body.targetName : undefined;

  if (!targetFrameSetId) {
    return NextResponse.json(
      { error: "targetFrameSetId is required." },
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

  if (
    !record.allowedEmails.some((email) => email.toLowerCase() === inviteeEmail)
  ) {
    if (token) {
      const ensured = await ensureInviteeAccessByToken({
        shareToken: token,
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

  try {
    const forked = await forkSharedTimeCapsule({
      sourceRecord: record,
      targetUserId: session.userId,
      targetFrameSetId,
      targetFrameVersion: targetFrameVersion || record.frameVersion,
      targetTitle: targetName,
    });

    return NextResponse.json({
      ok: true,
      fork: {
        frameSetId: forked.frameSetId,
        frameVersion: forked.frameVersion,
        title: forked.title ?? null,
        snapshot: forked.snapshotPayload ?? null,
        payloadChecksum: forked.payloadChecksum ?? null,
        parentFrameSetId: forked.parentFrameSetId ?? null,
        parentFrameVersion: forked.parentFrameVersion ?? null,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fork TimeCapsule.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


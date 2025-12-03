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

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const { frameSetId, version, emails } = body || {};
  if (!frameSetId || !version || !Array.isArray(emails)) {
    return NextResponse.json(
      { error: "frameSetId, version, and emails[] are required" },
      { status: 400 }
    );
  }

  try {
    const record = await addInvites({
      userId: session.userId,
      frameSetId,
      version,
      emails,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update invites";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const { frameSetId, version, emails } = body || {};
  if (!frameSetId || !version || !Array.isArray(emails)) {
    return NextResponse.json(
      { error: "frameSetId, version, and emails[] are required" },
      { status: 400 }
    );
  }

  try {
    const record = await removeInvites({
      userId: session.userId,
      frameSetId,
      version,
      emails,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove invites";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


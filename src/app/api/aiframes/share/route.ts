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

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseBody(request);
  const { frameSetId, version, enable = true } = body || {};

  if (!frameSetId || !version) {
    return NextResponse.json(
      { error: "frameSetId and version are required" },
      { status: 400 }
    );
  }

  try {
    const record = await toggleShareLink({
      userId: session.userId,
      frameSetId,
      version,
      enable: Boolean(enable),
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update sharing state";
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
  if (!frameSetId || !version) {
    return NextResponse.json(
      { error: "frameSetId and version are required" },
      { status: 400 }
    );
  }

  try {
    const record = await toggleShareLink({
      userId: session.userId,
      frameSetId,
      version,
      enable: false,
    });
    return NextResponse.json({ ok: true, share: record });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to disable sharing";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


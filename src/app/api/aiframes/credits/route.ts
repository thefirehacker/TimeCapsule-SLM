import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  CreditType,
  consumeCredit,
  getCreditSnapshot,
} from "@/lib/timecapsule/credits";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const credits = await getCreditSnapshot(session.userId);
    return NextResponse.json({ ok: true, credits });
  } catch (error) {
    console.error("Failed to load TimeCapsule credits", error);
    return NextResponse.json(
      { error: "Failed to load credit snapshot" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, amount = 1, metadata = {} } = body || {};

    if (!type || !["sessions", "flowBuilders", "kbDocs", "agentCalls"].includes(type)) {
      return NextResponse.json(
        { error: "Unsupported credit type" },
        { status: 400 }
      );
    }

    const credits = await consumeCredit(
      session.userId,
      type as CreditType,
      Number(amount) || 1,
      metadata
    );

    return NextResponse.json({ ok: true, credits });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update credits";
    const status =
      (error as { code?: string }).code === "CREDIT_LIMIT_REACHED" ? 402 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}


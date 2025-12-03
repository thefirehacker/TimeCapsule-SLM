import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  fetchManagedModels,
  getServerOpenRouterKey,
} from "@/lib/timecapsule/openRouterServer";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!getServerOpenRouterKey()) {
      return NextResponse.json(
        { ok: false, managed: false, models: [] },
        { status: 503 }
      );
    }

    const models = await fetchManagedModels();
    return NextResponse.json({ ok: true, managed: true, models });
  } catch (error) {
    console.error("OpenRouter models proxy failed", error);
    return NextResponse.json(
      { error: "Failed to load OpenRouter models" },
      { status: 500 }
    );
  }
}


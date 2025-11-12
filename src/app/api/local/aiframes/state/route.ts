import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isLocalServerEnv } from "@/lib/env";

const DATA_DIR = path.join(process.cwd(), "Temp");
const DATA_FILE = path.join(DATA_DIR, "dev-aiframes-state.json");

const defaultState = {
  frames: [],
  chapters: [],
  graphState: { nodes: [], edges: [], selectedNodeId: null },
  metadata: {
    lastUpdated: null,
    source: "local-bridge",
  },
};

const ensureLocalAccess = () => {
  if (!isLocalServerEnv()) {
    return NextResponse.json(
      {
        error:
          "The local SWE bridge is only available when NEXT_BUILD_ENV=local.",
      },
      { status: 403 }
    );
  }
  return null;
};

const ensureDataDir = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
};

export async function GET() {
  const denied = ensureLocalAccess();
  if (denied) return denied;

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return NextResponse.json(defaultState);
    }
    console.error("Failed to read local AI Frames state:", error);
    return NextResponse.json(
      { error: "Unable to read local AI Frames state." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = ensureLocalAccess();
  if (denied) return denied;

  try {
    const body = await request.json();
    const payload = {
      ...defaultState,
      ...body,
      metadata: {
        ...defaultState.metadata,
        ...(body?.metadata || {}),
        lastUpdated: new Date().toISOString(),
      },
    };

    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), "utf-8");

    return NextResponse.json({
      ok: true,
      savedAt: payload.metadata.lastUpdated,
    });
  } catch (error) {
    console.error("Failed to persist local AI Frames state:", error);
    return NextResponse.json(
      { error: "Unable to persist local AI Frames state." },
      { status: 500 }
    );
  }
}

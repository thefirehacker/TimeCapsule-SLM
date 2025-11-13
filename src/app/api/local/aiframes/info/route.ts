import { NextResponse } from "next/server";
import { isLocalServerEnv } from "@/lib/env";

export async function GET(request: Request) {
  if (!isLocalServerEnv()) {
    return NextResponse.json(
      {
        error:
          "Local SWE tools are only available when NEXT_BUILD_ENV=local.",
      },
      { status: 403 }
    );
  }

  const origin = request.headers.get("origin") || "http://localhost:3000";
  const base = `${origin}/api/local/aiframes`;

  return NextResponse.json({
    title: "AI Frames Local SWE Bridge",
    description:
      "Developer-only API for Codex/Claude/Cursor agents to inspect and modify AI Frames content when NEXT_BUILD_ENV=local.",
    workflow: [
      "GET /info for documentation.",
      "GET /state to fetch the latest frames/chapters/graph snapshot.",
      "Modify frames or chapters in your tool and POST the entire payload back to /state.",
      "In the AI Frames UI, click “Pull from Local SWE” or reload to see the updates.",
    ],
    endpoints: [
      {
        method: "GET",
        path: "/info",
        url: `${base}/info`,
        summary: "Returns this documentation bundle.",
      },
      {
        method: "GET",
        path: "/state",
        url: `${base}/state`,
        summary:
          "Returns { frames, chapters, graphState, metadata } reflecting the last saved snapshot.",
      },
      {
        method: "POST",
        path: "/state",
        url: `${base}/state`,
        summary:
          "Accepts the full snapshot payload to replace the local SWE state. Include frames, chapters, and graphState.",
        bodySchema: {
          frames: "AIFrame[]",
          chapters: "Chapter[]",
          graphState: "GraphState",
        },
      },
    ],
    sampleTool: {
      name: "aiFramesLocalBridge",
      description:
        "Interact with the TimeCapsule AI Frames workspace when running locally. Use GET /state then POST /state with edits.",
      schema: {
        type: "object",
        properties: {
          action: {
            type: "string",
            enum: ["read_state", "write_state"],
          },
          payload: {
            type: "object",
            description:
              "When action=write_state, pass { frames, chapters, graphState }.",
          },
        },
        required: ["action"],
      },
    },
    baseUrl: base,
  });
}

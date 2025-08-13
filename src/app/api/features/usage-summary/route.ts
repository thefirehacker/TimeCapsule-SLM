import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { featureAccessManager } from "@/lib/feature-access/FeatureAccessManager";

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's feature usage summary
    const summary = await featureAccessManager.getUserFeatureSummary(
      session.userId
    );

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Error getting feature usage summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



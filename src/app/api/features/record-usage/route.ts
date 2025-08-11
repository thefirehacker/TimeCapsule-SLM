import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  featureAccessManager,
  FeatureType,
} from "@/lib/feature-access/FeatureAccessManager";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { feature } = await request.json();

    if (!feature || !Object.values(FeatureType).includes(feature)) {
      return NextResponse.json(
        { error: "Invalid feature specified" },
        { status: 400 }
      );
    }

    // Record feature usage
    const success = await featureAccessManager.recordFeatureUsage(
      session.userId,
      feature as FeatureType
    );

    if (!success) {
      return NextResponse.json(
        { error: "Failed to record usage or access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usage recorded successfully",
    });
  } catch (error) {
    console.error("Error recording feature usage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


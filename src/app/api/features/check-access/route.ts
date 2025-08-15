import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  featureAccessManager,
  FeatureType,
  FEATURE_LIMITS,
} from "@/lib/feature-access/FeatureAccessManager";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { feature } = await request.json();

    if (!feature || !Object.keys(FEATURE_LIMITS).includes(feature)) {
      return NextResponse.json(
        { error: "Invalid feature specified" },
        { status: 400 }
      );
    }

    // Check feature access
    const accessResult = await featureAccessManager.checkFeatureAccess(
      session.userId,
      feature as FeatureType
    );

    return NextResponse.json({
      success: true,
      access: accessResult,
    });
  } catch (error) {
    console.error("Error checking feature access:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



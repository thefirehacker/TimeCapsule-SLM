import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  featureAccessManager,
  FeatureType,
} from "../feature-access/FeatureAccessManager";

/**
 * Middleware to check feature access before allowing API operations
 */
export async function withFeatureAccess(
  request: NextRequest,
  feature: FeatureType,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check feature access
    const accessResult = await featureAccessManager.checkFeatureAccess(
      session.userId,
      feature
    );

    if (!accessResult.allowed) {
      return NextResponse.json(
        {
          error: "Feature access denied",
          reason: accessResult.reason,
          upgradeRequired: accessResult.upgradeRequired,
          remainingMonthly: accessResult.remainingMonthly,
          remainingDaily: accessResult.remainingDaily,
          nextReset: accessResult.nextReset,
        },
        { status: 403 }
      );
    }

    // Execute the actual handler
    return await handler(request);
  } catch (error) {
    console.error(`Feature access middleware error for ${feature}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Middleware to check feature access and record usage
 */
export async function withFeatureAccessAndUsage(
  request: NextRequest,
  feature: FeatureType,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check feature access
    const accessResult = await featureAccessManager.checkFeatureAccess(
      session.userId,
      feature
    );

    if (!accessResult.allowed) {
      return NextResponse.json(
        {
          error: "Feature access denied",
          reason: accessResult.reason,
          upgradeRequired: accessResult.upgradeRequired,
          remainingMonthly: accessResult.remainingMonthly,
          remainingDaily: accessResult.remainingDaily,
          nextReset: accessResult.nextReset,
        },
        { status: 403 }
      );
    }

    // Execute the actual handler
    const response = await handler(request);

    // If the operation was successful, record usage
    if (response.status >= 200 && response.status < 300) {
      await featureAccessManager.recordFeatureUsage(session.userId, feature);
    }

    return response;
  } catch (error) {
    console.error(
      `Feature access and usage middleware error for ${feature}:`,
      error
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Higher-order function to create feature-protected API handlers
 */
export function createFeatureProtectedHandler(
  feature: FeatureType,
  handler: (request: NextRequest) => Promise<NextResponse>,
  recordUsage: boolean = true
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    if (recordUsage) {
      return withFeatureAccessAndUsage(request, feature, handler);
    } else {
      return withFeatureAccess(request, feature, handler);
    }
  };
}

/**
 * Utility to extract feature from request body or query params
 */
export function extractFeatureFromRequest(
  request: NextRequest
): FeatureType | null {
  try {
    const url = new URL(request.url);
    const feature = url.searchParams.get("feature") as FeatureType;

    if (feature && Object.values(FeatureType).includes(feature)) {
      return feature;
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Utility to extract feature from request body
 */
export async function extractFeatureFromBody(
  request: NextRequest
): Promise<FeatureType | null> {
  try {
    const body = await request.json();
    const feature = body.feature as FeatureType;

    if (feature && Object.values(FeatureType).includes(feature)) {
      return feature;
    }

    return null;
  } catch (error) {
    return null;
  }
}



import { NextRequest, NextResponse } from "next/server";
import { getFirecrawlService } from "@/lib/FirecrawlService";

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 400 }
      );
    }

    // Initialize the Firecrawl service with the provided API key
    const firecrawlService = getFirecrawlService();

    try {
      await firecrawlService.initialize(apiKey);

      // Test the API key with a simple search
      const testResult = await firecrawlService.searchWeb("test", {
        limit: 1,
        maxContentLength: 100,
      });

      if (testResult && testResult.results.length > 0) {
        return NextResponse.json(
          { success: true, message: "API key is valid" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "API key is valid but no results returned" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Firecrawl API test failed:", error);
      return NextResponse.json(
        { error: "Invalid API key or service unavailable" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Test Firecrawl API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

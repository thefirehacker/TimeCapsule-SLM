import { NextRequest, NextResponse } from "next/server";
import { getDuckDuckGoService } from "@/lib/DuckDuckGoService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "test";

    console.log(`🦆 Testing DuckDuckGo with query: "${query}"`);

    const duckDuckGoService = getDuckDuckGoService();

    try {
      const testResult = await duckDuckGoService.searchWeb(query, {
        limit: 2,
        maxContentLength: 100,
      });

      if (testResult && testResult.results.length > 0) {
        return NextResponse.json(
          {
            success: true,
            message: "DuckDuckGo service is working",
            results: testResult.results.length,
            providers: testResult.metadata.providers || ["duckduckgo"],
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: true,
            message: "DuckDuckGo service is working but no results returned",
            results: 0,
            providers: ["duckduckgo"],
          },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error("DuckDuckGo API test failed:", error);
      return NextResponse.json(
        { error: "DuckDuckGo service test failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Test DuckDuckGo API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

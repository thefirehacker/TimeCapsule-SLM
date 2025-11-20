"use server";

import { NextRequest, NextResponse } from "next/server";
import { generateServerEmbeddings } from "@/lib/server/embedding";

/**
 * API endpoint for generating query embeddings on the server
 * Used by VectorStore for semantic search
 * 
 * Architecture: Server-side embedding generation, client-side vector search
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body = await req.json();
    const { query } = body;

    // Validate query field exists
    if (query === undefined || query === null) {
      return NextResponse.json(
        { error: "Missing 'query' field in request body" },
        { status: 400 }
      );
    }

    // Validate query is a string
    if (typeof query !== "string") {
      return NextResponse.json(
        { error: "'query' field must be a string" },
        { status: 400 }
      );
    }

    // Validate query is not empty
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      return NextResponse.json(
        { error: "Query cannot be empty" },
        { status: 400 }
      );
    }

    // Validate query length (max 1000 characters)
    if (trimmedQuery.length > 1000) {
      return NextResponse.json(
        { 
          error: "Query too long",
          details: `Query length: ${trimmedQuery.length} characters. Maximum: 1000 characters.`
        },
        { status: 400 }
      );
    }

    console.log(`🔍 Generating query embedding for: "${trimmedQuery.substring(0, 100)}${trimmedQuery.length > 100 ? '...' : ''}"`);
    console.log(`📏 Query length: ${trimmedQuery.length} characters`);

    // Generate embedding using server-side transformer
    const embeddings = await generateServerEmbeddings([trimmedQuery]);
    
    if (!embeddings || embeddings.length === 0) {
      throw new Error("Embedding generation returned empty result");
    }

    const embedding = embeddings[0];

    // Validate embedding format
    if (!Array.isArray(embedding)) {
      throw new Error("Invalid embedding format: expected array");
    }

    if (embedding.length !== 384) {
      throw new Error(`Invalid embedding dimensions: expected 384, got ${embedding.length}`);
    }

    const duration = Date.now() - startTime;
    console.log(`✅ Query embedding generated in ${duration}ms (${embedding.length} dimensions)`);

    return NextResponse.json({
      embedding,
      model: "bge-small-en-v1.5",
      timestamp: new Date().toISOString(),
      duration,
      queryLength: trimmedQuery.length
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error("❌ Query embedding generation failed:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate query embedding",
        details: error instanceof Error ? error.message : "Unknown error",
        duration
      },
      { status: 500 }
    );
  }
}


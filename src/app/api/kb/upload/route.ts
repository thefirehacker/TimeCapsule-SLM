import { NextRequest, NextResponse } from "next/server";
import { ingestDocumentBuffer } from "@/lib/server/documentIngestion";
import type { DocumentType } from "@/components/VectorStore/VectorStore";
import { auth } from "@/auth";
import {
  consumeCredit,
  ensureDocumentWithinLimits,
  estimateDocumentComplexity,
} from "@/lib/timecapsule/credits";

export async function POST(req: NextRequest) {
  console.log("🚨🚨🚨 UPLOAD API CALLED - CHECK CLOUDWATCH FOR THIS LINE 🚨🚨🚨");
  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    console.log(`📁 File received: ${file instanceof File ? file.name : 'NO FILE'} (${file instanceof File ? file.size : 0} bytes)`);
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing 'file' field in multipart payload." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const complexity = estimateDocumentComplexity(buffer);
    await ensureDocumentWithinLimits(session.userId, {
      ...complexity,
      filename: file.name,
      mimeType: file.type,
    });

    const documentType =
      (formData.get("documentType") as DocumentType) ?? "userdocs";

    await consumeCredit(session.userId, "kbDocs", 1, {
      ...complexity,
      documentType,
      filename: file.name,
    });

    const processed = await ingestDocumentBuffer({
      buffer,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      documentType,
    });

    return NextResponse.json({ document: processed });
  } catch (error: any) {
    console.error("❌ Server-side upload failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Server-side upload failed.",
      },
      { status: 500 }
    );
  }
}

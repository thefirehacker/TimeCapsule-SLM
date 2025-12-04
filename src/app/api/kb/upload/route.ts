import { NextRequest, NextResponse } from "next/server";
import {
  ingestDocumentBuffer,
  extractDocumentText,
} from "@/lib/server/documentIngestion";
import type { DocumentType } from "@/components/VectorStore/VectorStore";
import { auth } from "@/auth";
import {
  consumeCredit,
  ensureDocumentWithinLimits,
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

    const parsedDocument = await extractDocumentText({
      buffer,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
    });

    const pageEstimate = Math.max(1, parsedDocument.pageCount || 1);
    const tokenEstimate = Math.max(
      1,
      Math.ceil(parsedDocument.plainText.length / 4)
    );

    const complexity = {
      pageEstimate,
      tokenEstimate,
      filename: file.name,
      mimeType: file.type,
    };

    await ensureDocumentWithinLimits(session.userId, complexity);

    const documentType =
      (formData.get("documentType") as DocumentType) ?? "userdocs";

    await consumeCredit(session.userId, "kbDocs", 1, {
      ...complexity,
      documentType,
    });

    const processed = await ingestDocumentBuffer({
      buffer,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      documentType,
      parsed: parsedDocument,
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

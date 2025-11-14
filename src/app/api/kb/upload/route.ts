import { NextRequest, NextResponse } from "next/server";
import { ingestDocumentBuffer } from "@/lib/server/documentIngestion";
import type { DocumentType } from "@/components/VectorStore/VectorStore";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing 'file' field in multipart payload." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const documentType =
      (formData.get("documentType") as DocumentType) ?? "userdocs";

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

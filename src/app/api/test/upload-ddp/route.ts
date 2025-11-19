import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ingestDocumentBuffer } from "@/lib/server/documentIngestion";

/**
 * Test endpoint to upload and return processed DDP PDF
 * This allows the browser to fetch processed document data and import it to IndexedDB
 */
export async function GET(request: NextRequest) {
  try {
    const pdfPath = path.join(
      process.cwd(),
      "Delete/thefirehacker-github-io-til-ddp-python-basics-html.pdf"
    );

    const pdfBuffer = fs.readFileSync(pdfPath);

    // Process the document server-side (extract text, chunk, generate embeddings)
    const documentData = await ingestDocumentBuffer({
      buffer: pdfBuffer,
      filename: "ddp-python-basics.pdf",
      mimeType: "application/pdf",
      documentType: "userdocs",
    });

    // Return the processed document as JSON (browser will import to IndexedDB)
    return NextResponse.json({
      success: true,
      document: documentData,
      message: "Document processed successfully. Import to your Knowledge Base using vectorStore.importProcessedDocument()",
    });
  } catch (error: any) {
    console.error("❌ Failed to process PDF:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to process PDF" 
      },
      { status: 500 }
    );
  }
}


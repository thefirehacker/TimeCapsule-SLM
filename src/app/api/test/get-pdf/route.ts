import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Test endpoint to serve the DDP PDF for browser automation testing
 * This allows the automation browser to fetch the file and upload it
 */
export async function GET() {
  try {
    const pdfPath = path.join(
      process.cwd(),
      "Delete/thefirehacker-github-io-til-ddp-python-basics-html.pdf"
    );

    const pdfBuffer = fs.readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ddp-python-basics.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("❌ Failed to serve PDF:", error);
    return NextResponse.json(
      { error: "PDF file not found" },
      { status: 404 }
    );
  }
}


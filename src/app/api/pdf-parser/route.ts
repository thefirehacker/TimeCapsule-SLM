import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import { extractStructuredTextFromPdfData } from "@/lib/server/pdf/structuredText";
import { loadPdfParser } from "@/lib/server/pdf/loadPdfParser";

// structured text helpers moved to src/lib/server/pdf/structuredText.ts

export async function POST(req: NextRequest) {
  console.log("📄 PDF Parser API: Request received");

  try {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll("FILE");
    let fileName = "";
    let parsedText = "";
    let pageCount = 1;

    console.log(
      `📄 PDF Parser API: Found ${uploadedFiles.length} uploaded files`
    );

    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[0];
      console.log("Uploaded file:", uploadedFile);
      console.log("Uploaded file type:", typeof uploadedFile);

      // Check if uploadedFile has the necessary properties instead of using instanceof File
      // This works better in serverless environments where File constructor might not be available
      if (
        uploadedFile &&
        typeof uploadedFile === "object" &&
        "arrayBuffer" in uploadedFile &&
        typeof uploadedFile.arrayBuffer === "function"
      ) {
        fileName = uuidv4();

        // Use a more reliable temp path for Windows
        const tempDir = process.env.TEMP || process.env.TMP || "/tmp";
        const tempFilePath = `${tempDir}/${fileName}.pdf`;

        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

        try {
          await fs.writeFile(tempFilePath, fileBuffer);
          console.log(`📄 File written to: ${tempFilePath}`);
        } catch (writeError) {
          console.error("❌ Failed to write temp file:", writeError);
          throw new Error(`Failed to write temporary file: ${writeError}`);
        }
        console.log(`📄 Starting PDF parsing for: ${tempFilePath}`);

        try {
          console.log(
            `📄 Using pdf2json to parse PDF, buffer size: ${fileBuffer.length} bytes`
          );

          const PdfParserCtor = await loadPdfParser();
          const pdfParser = new PdfParserCtor(null, 1);

          // Calculate dynamic timeout based on file size
          const fileSizeMB = fileBuffer.length / (1024 * 1024);
          const dynamicTimeout = Math.max(30000, 30000 + (fileSizeMB * 3000)); // 30s base + 3s per MB
          console.log(`📄 PDF size: ${fileSizeMB.toFixed(2)}MB, parsing timeout: ${(dynamicTimeout/1000).toFixed(0)}s`);

          // Parse PDF with pdf2json using Promise wrapper
          parsedText = await new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error(`PDF2JSON parsing timeout after ${(dynamicTimeout/1000).toFixed(0)} seconds`));
            }, dynamicTimeout);

            pdfParser.on("pdfParser_dataReady", () => {
              clearTimeout(timeout);

              // Extract text with table structure preservation
              const text = extractStructuredTextFromPdfData(pdfParser) || "";

              // Get actual page count from pdf2json
              pageCount = pdfParser.data?.Pages?.length || 1;

              console.log(`📄 pdf2json extracted ${text.length} characters with table structure from ${pageCount} pages`);
              resolve(text);
            });

            pdfParser.on("pdfParser_dataError", (errData: any) => {
              clearTimeout(timeout);
              console.error("❌ pdf2json parsing error:", errData.parserError);
              reject(
                new Error(`PDF2JSON parsing failed: ${errData.parserError}`)
              );
            });

            console.log(
              `📄 Loading PDF with pdf2json from temp file: ${tempFilePath}`
            );
            pdfParser.loadPDF(tempFilePath);
          });

          console.log("✅ PDF parsing completed successfully with pdf2json");
          console.log(
            `📄 Extracted text length: ${parsedText.length} characters`
          );

          // Debug: Show first 500 chars of extracted text
          if (parsedText.length > 0) {
            console.log(
              `📝 First 500 chars of extracted text:`,
              parsedText.substring(0, 500)
            );
          } else {
            console.warn("⚠️ No text was extracted from the PDF!");
          }

          // Clean up temp file if it was created
          try {
            await fs.unlink(tempFilePath);
            console.log(`🗑️ Cleaned up temp file: ${tempFilePath}`);
          } catch (cleanupError) {
            console.warn("⚠️ Failed to clean up temp file:", cleanupError);
          }
        } catch (parseError) {
          console.error("❌ PDF parsing with pdf2json failed:", parseError);

          // Clean up temp file on error
          try {
            await fs.unlink(tempFilePath);
            console.log(`🗑️ Cleaned up temp file after error: ${tempFilePath}`);
          } catch (cleanupError) {
            console.warn(
              "⚠️ Failed to clean up temp file after error:",
              cleanupError
            );
          }

          throw new Error(
            `PDF parsing failed: ${parseError instanceof Error ? parseError.message : String(parseError)}`
          );
        }
      } else {
        console.log(
          "Uploaded file is not in the expected format or missing required methods."
        );
        console.log(
          "Expected: object with arrayBuffer method, got:",
          typeof uploadedFile,
          uploadedFile
        );
        return new NextResponse(
          "Uploaded file is not in the expected format or missing required methods.",
          {
            status: 500,
          }
        );
      }
    } else {
      console.log("No files found.");
      return new NextResponse("No File Found", { status: 404 });
    }

    const response = NextResponse.json({
      text: parsedText,
      pageCount: pageCount || 1,
      fileName: fileName
    });
    console.log(
      `✅ PDF Parser API: Successfully processed file, returning ${parsedText.length} characters from ${pageCount} pages`
    );
    return response;
  } catch (error) {
    console.error("❌ PDF Parser API: Unexpected error:", error);
    return new NextResponse(
      `PDF parsing failed: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}

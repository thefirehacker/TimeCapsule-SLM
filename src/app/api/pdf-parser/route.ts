import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  console.log("📄 PDF Parser API: Request received");
  
  try {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll("FILE");
    let fileName = "";
    let parsedText = "";

    console.log(`📄 PDF Parser API: Found ${uploadedFiles.length} uploaded files`);

    if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[0];
    console.log("Uploaded file:", uploadedFile);

    if (uploadedFile instanceof File) {
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
        console.log(`📄 Using pdf2json to parse PDF, buffer size: ${fileBuffer.length} bytes`);
        
        // Import pdf2json (Node.js compatible)
        const PDFParser = require("pdf2json");
        const pdfParser = new PDFParser(null, 1);
        
        // Parse PDF with pdf2json using Promise wrapper
        parsedText = await new Promise<string>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("PDF2JSON parsing timeout after 30 seconds"));
          }, 30000);

          pdfParser.on("pdfParser_dataReady", () => {
            clearTimeout(timeout);
            const text = pdfParser.getRawTextContent() || "";
            console.log(`📄 pdf2json extracted ${text.length} characters`);
            resolve(text);
          });

          pdfParser.on("pdfParser_dataError", (errData: any) => {
            clearTimeout(timeout);
            console.error("❌ pdf2json parsing error:", errData.parserError);
            reject(new Error(`PDF2JSON parsing failed: ${errData.parserError}`));
          });

          console.log(`📄 Loading PDF with pdf2json from temp file: ${tempFilePath}`);
          pdfParser.loadPDF(tempFilePath);
        });
        
        console.log("✅ PDF parsing completed successfully with pdf2json");
        console.log(`📄 Extracted text length: ${parsedText.length} characters`);
        
        // Debug: Show first 500 chars of extracted text
        if (parsedText.length > 0) {
          console.log(`📝 First 500 chars of extracted text:`, parsedText.substring(0, 500));
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
          console.warn("⚠️ Failed to clean up temp file after error:", cleanupError);
        }
        
        throw new Error(`PDF parsing failed: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      }
    } else {
      console.log("Uploaded file is not in the expected format.");
      return new NextResponse("Uploaded file is not in the expected format.", {
        status: 500,
      });
    }
  } else {
    console.log("No files found.");
    return new NextResponse("No File Found", { status: 404 });
  }

    const response = new NextResponse(parsedText);
    response.headers.set("FileName", fileName);
    console.log(`✅ PDF Parser API: Successfully processed file, returning ${parsedText.length} characters`);
    return response;
    
  } catch (error) {
    console.error("❌ PDF Parser API: Unexpected error:", error);
    return new NextResponse(
      `PDF parsing failed: ${error instanceof Error ? error.message : String(error)}`, 
      { status: 500 }
    );
  }
}

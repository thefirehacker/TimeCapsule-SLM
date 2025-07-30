import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll("FILE");
  let fileName = "";
  let parsedText = "";

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

      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error("❌ PDF parsing error:", errData.parserError);
      });

      pdfParser.on("pdfParser_dataReady", () => {
        console.log("✅ PDF parsing completed successfully");
        parsedText = (pdfParser as any).getRawTextContent() || "";
        console.log(
          `📄 Extracted text length: ${parsedText.length} characters`
        );
      });

      try {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("PDF parsing timeout after 30 seconds"));
          }, 30000);

          pdfParser.on("pdfParser_dataReady", () => {
            clearTimeout(timeout);
            resolve(true);
          });

          pdfParser.on("pdfParser_dataError", (errData: any) => {
            clearTimeout(timeout);
            reject(new Error(`PDF parsing failed: ${errData.parserError}`));
          });

          console.log(`📄 Loading PDF file: ${tempFilePath}`);
          pdfParser.loadPDF(tempFilePath);
        });

        // Clean up temp file
        try {
          await fs.unlink(tempFilePath);
          console.log(`🗑️ Cleaned up temp file: ${tempFilePath}`);
        } catch (cleanupError) {
          console.warn("⚠️ Failed to clean up temp file:", cleanupError);
        }
      } catch (parseError) {
        console.error("❌ PDF parsing failed:", parseError);
        throw parseError;
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
  return response;
}

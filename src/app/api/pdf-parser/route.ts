import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "child_process";
import path from "path";
import { ProcessingResult, TableData } from "@/types/chunks";

// Function to call Python table extraction script
async function extractTablesWithPython(pdfPath: string): Promise<{
  tables: TableData[];
  text: string;
  error?: string;
}> {
  return new Promise((resolve) => {
    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "table_extractor.py"
    );
    const pythonProcess = spawn(
      "python3",
      [scriptPath, pdfPath, "--method", "auto"],
      {
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // Set timeout for table extraction
    const timeout = setTimeout(() => {
      pythonProcess.kill("SIGTERM");
      resolve({
        tables: [],
        text: "",
        error: "Table extraction timeout after 60 seconds",
      });
    }, 60000);

    pythonProcess.on("close", (code) => {
      clearTimeout(timeout);

      if (code !== 0) {
        console.error("❌ Python table extraction failed:", stderr);
        resolve({
          tables: [],
          text: "",
          error: `Python script failed with code ${code}: ${stderr}`,
        });
        return;
      }

      try {
        const result = JSON.parse(stdout);

        if (result.error) {
          console.error("❌ Table extraction error:", result.error);
          resolve({
            tables: [],
            text: result.text || "",
            error: result.error,
          });
          return;
        }

        console.log(
          `✅ Successfully extracted ${result.tables?.length || 0} tables`
        );
        resolve({
          tables: result.tables || [],
          text: result.text || "",
        });
      } catch (parseError) {
        console.error("❌ Failed to parse Python output:", parseError);
        console.error("Raw output:", stdout);
        resolve({
          tables: [],
          text: "",
          error: `Failed to parse extraction results: ${parseError}`,
        });
      }
    });

    pythonProcess.on("error", (error) => {
      clearTimeout(timeout);
      console.error("❌ Failed to start Python process:", error);
      resolve({
        tables: [],
        text: "",
        error: `Failed to start table extraction: ${error.message}`,
      });
    });
  });
}

export async function POST(req: NextRequest) {
  console.log("📄 PDF Parser API: Request received");

  try {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll("FILE");
    let fileName = "";
    let parsedText = "";
    let extractedTables: TableData[] = [];
    let tableExtractionResult: {
      tables: TableData[];
      text: string;
      error?: string;
    } | null = null;
    let pdf2jsonText = "";

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
          // Enhanced processing: Extract both text and tables
          console.log(
            `📄 Starting enhanced PDF processing, buffer size: ${fileBuffer.length} bytes`
          );

          // Step 1: Extract tables using Python script
          console.log("🔄 Step 1: Extracting tables with Python script...");
          tableExtractionResult = await extractTablesWithPython(tempFilePath);

          extractedTables = tableExtractionResult.tables;
          let pythonExtractedText = tableExtractionResult.text;

          if (tableExtractionResult.error) {
            console.warn(
              "⚠️ Table extraction had issues:",
              tableExtractionResult.error
            );
          }

          console.log(`📊 Extracted ${extractedTables.length} tables`);

          // Step 2: Extract text using pdf2json as fallback/supplement
          console.log("🔄 Step 2: Extracting text with pdf2json...");

          try {
            const PDFParser = require("pdf2json");
            const pdfParser = new PDFParser(null, 1);

            pdf2jsonText = await new Promise<string>((resolve, reject) => {
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
                console.error(
                  "❌ pdf2json parsing error:",
                  errData.parserError
                );
                reject(
                  new Error(`PDF2JSON parsing failed: ${errData.parserError}`)
                );
              });

              pdfParser.loadPDF(tempFilePath);
            });
          } catch (pdf2jsonError) {
            console.warn(
              "⚠️ pdf2json extraction failed, using Python-extracted text only:",
              pdf2jsonError
            );
          }

          // Step 3: Combine and process results
          console.log("🔄 Step 3: Processing and combining results...");

          // Use Python-extracted text as primary, pdf2json as fallback
          parsedText = pythonExtractedText || pdf2jsonText;

          if (!parsedText && pdf2jsonText) {
            parsedText = pdf2jsonText;
            console.log("📄 Using pdf2json text as primary source");
          } else if (pythonExtractedText) {
            console.log("📄 Using Python-extracted text as primary source");
          }

          // Create enhanced processing result
          const processingResult: ProcessingResult = {
            text: parsedText,
            tables: extractedTables,
            chunks: [], // Will be populated later if needed
            metadata: {
              totalTables: extractedTables.length,
              extractionMethod: [
                ...(tableExtractionResult.error ? [] : ["python-tables"]),
                ...(pdf2jsonText ? ["pdf2json-text"] : []),
              ],
              processingTime: Date.now(),
            },
          };

          console.log("✅ Enhanced PDF processing completed successfully");
          console.log(
            `📄 Final text length: ${parsedText.length} characters, Tables: ${extractedTables.length}`
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

          // Debug: Show table information
          if (extractedTables.length > 0) {
            console.log(`📊 Table summary:`);
            extractedTables.forEach((table, idx) => {
              console.log(
                `  Table ${idx + 1}: ${table.rows?.length || 0} rows, Page ${table.metadata?.pageNumber || "unknown"}`
              );
            });
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

    // Return enhanced response with both text and table data
    const enhancedResponse = {
      text: parsedText,
      tables: extractedTables || [],
      metadata: {
        fileName: fileName,
        hasStructuredData: extractedTables && extractedTables.length > 0,
        tableCount: extractedTables ? extractedTables.length : 0,
        textLength: parsedText.length,
        extractionMethods: [
          ...(tableExtractionResult?.error ? [] : ["python-tables"]),
          ...(pdf2jsonText ? ["pdf2json-text"] : []),
        ],
      },
    };

    const response = new NextResponse(JSON.stringify(enhancedResponse));
    response.headers.set("Content-Type", "application/json");
    response.headers.set("FileName", fileName);
    response.headers.set(
      "HasTables",
      String(extractedTables && extractedTables.length > 0)
    );
    response.headers.set(
      "TableCount",
      String(extractedTables ? extractedTables.length : 0)
    );

    console.log(
      `✅ PDF Parser API: Successfully processed file, returning ${parsedText.length} characters and ${extractedTables ? extractedTables.length : 0} tables`
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

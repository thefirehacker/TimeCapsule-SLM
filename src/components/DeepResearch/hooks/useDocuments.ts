import { useState, useCallback, useEffect } from "react";
import { DocumentData } from "@/components/VectorStore/VectorStore";
import { pdfParser, PDFParser } from "@/lib/PDFParser";
import mammoth from 'mammoth';

export interface DocumentStatus {
  count: number;
  totalSize: number;
  vectorCount: number;
  chunkCount: number;
  totalChunks: number;
  totalVectors: number;
}

export interface UseDocumentsReturn {
  documents: DocumentData[];
  documentStatus: DocumentStatus;
  isUploading: boolean;
  showDocumentManager: boolean;
  setShowDocumentManager: (show: boolean) => void;
  handleFileUpload: (files: FileList) => Promise<void>;
  deleteDocument: (docId: string) => Promise<void>;
  updateDocumentStatus: () => Promise<void>;
  // Enhanced chunk management
  getDocumentChunks: (docId: string) => Promise<any[]>;
  getChunkDetails: (docId: string, chunkId: string) => Promise<any>;
}

export function useDocuments(vectorStore: any): UseDocumentsReturn {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    count: 0,
    totalSize: 0,
    vectorCount: 0,
    chunkCount: 0,
    totalChunks: 0,
    totalVectors: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showDocumentManager, setShowDocumentManager] = useState(false);

  const updateDocumentStatus = useCallback(async () => {
    if (!vectorStore) return;

    try {
      const docs = await vectorStore.getAllDocuments();
      const totalSize = docs.reduce(
        (sum: number, doc: DocumentData) => sum + (doc.metadata?.filesize || 0),
        0
      );

      // Enhanced statistics calculation
      const totalChunks = docs.reduce(
        (sum: number, doc: DocumentData) => sum + (doc.chunks?.length || 0),
        0
      );

      const totalVectors = docs.reduce(
        (sum: number, doc: DocumentData) => sum + (doc.vectors?.length || 0),
        0
      );

      setDocuments(docs);
      setDocumentStatus({
        count: docs.length,
        totalSize,
        vectorCount: docs.length, // Each document contributes to the vector count
        chunkCount: docs.length, // Each document contributes to the chunk count
        totalChunks,
        totalVectors,
      });

      console.log(`📊 Document status updated:`, {
        documents: docs.length,
        totalSize: formatFileSize(totalSize),
        totalChunks,
        totalVectors,
        avgChunksPerDoc:
          docs.length > 0 ? (totalChunks / docs.length).toFixed(1) : 0,
        avgVectorsPerDoc:
          docs.length > 0 ? (totalVectors / docs.length).toFixed(1) : 0,
      });
    } catch (error) {
      console.error("Failed to update document status:", error);
    }
  }, [vectorStore]);

  // Helper function to convert HTML to structured text with markers
  const convertHtmlToStructuredText = (html: string): string => {
    let structuredText = '';
    
    // Parse HTML using DOMParser (available in browser)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Process tables with structural markers
    const tables = doc.querySelectorAll('table');
    tables.forEach(table => {
      const placeholder = doc.createElement('div');
      placeholder.textContent = '<START_TABLE>';
      table.parentNode?.insertBefore(placeholder, table);
      
      // Process table headers
      const headers = table.querySelectorAll('th');
      if (headers.length > 0) {
        const headerText = Array.from(headers).map(th => th.textContent?.trim() || '').join(' | ');
        const headerDiv = doc.createElement('div');
        headerDiv.textContent = `<TABLE_HEADER>${headerText}</TABLE_HEADER>`;
        table.parentNode?.insertBefore(headerDiv, table);
      }
      
      // Process table rows
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
          const rowText = Array.from(cells).map(td => td.textContent?.trim() || '').join(' | ');
          const rowDiv = doc.createElement('div');
          rowDiv.textContent = `<TABLE_ROW>${rowText}</TABLE_ROW>`;
          table.parentNode?.insertBefore(rowDiv, table);
        }
      });
      
      const endPlaceholder = doc.createElement('div');
      endPlaceholder.textContent = '<END_TABLE>';
      table.parentNode?.insertBefore(endPlaceholder, table.nextSibling);
      
      // Remove original table
      table.remove();
    });
    
    // Process lists with markers
    const lists = doc.querySelectorAll('ul, ol');
    lists.forEach(list => {
      const startMarker = doc.createElement('div');
      startMarker.textContent = '<START_LIST>';
      list.parentNode?.insertBefore(startMarker, list);
      
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        const itemDiv = doc.createElement('div');
        itemDiv.textContent = `<LIST_ITEM>${item.textContent?.trim() || ''}</LIST_ITEM>`;
        list.parentNode?.insertBefore(itemDiv, list);
      });
      
      const endMarker = doc.createElement('div');
      endMarker.textContent = '<END_LIST>';
      list.parentNode?.insertBefore(endMarker, list.nextSibling);
      
      list.remove();
    });
    
    // Process headers with section markers
    const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(header => {
      const title = header.textContent?.trim() || '';
      const sectionDiv = doc.createElement('div');
      sectionDiv.textContent = `<START_SECTION:${title}>\n${title}\n<END_SECTION>`;
      header.parentNode?.replaceChild(sectionDiv, header);
    });
    
    // Process paragraphs
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach(para => {
      const text = para.textContent?.trim() || '';
      if (text.length > 0) {
        // Check for measurement data
        const numericPattern = /\d+\.?\d*\s*(hours?|minutes?|seconds?|ms|[BMK]|GB|MB|KB|tokens?|%)/gi;
        const hasMultipleNumbers = (text.match(numericPattern) || []).length >= 3;
        
        if (hasMultipleNumbers) {
          para.textContent = `<START_MEASUREMENT_DATA>\n${text}\n<END_MEASUREMENT_DATA>`;
        } else {
          para.textContent = `<START_PARAGRAPH>\n${text}\n<END_PARAGRAPH>`;
        }
      }
    });
    
    // Get final text content
    structuredText = doc.body.textContent || '';
    
    // Clean up extra whitespace
    structuredText = structuredText.replace(/\n{3,}/g, '\n\n').trim();
    
    return structuredText;
  };

  // Helper function to validate extracted content quality
  const validateExtractedContent = useCallback(
    (content: string, filename: string): string => {
      // Check for excessive binary/garbage characters
      const garbageRatio = (content.match(/[^\x20-\x7E\n\r\t]/g) || []).length / content.length;
      const hasReadableWords = /\b[a-zA-Z]{3,}\b/.test(content);
      
      if (garbageRatio > 0.3) {
        throw new Error(`File ${filename} contains too much binary/corrupted content (${Math.round(garbageRatio * 100)}% corrupted)`);
      }
      
      if (!hasReadableWords) {
        throw new Error(`File ${filename} does not contain readable text`);
      }
      
      if (content.length < 10) {
        throw new Error(`File ${filename} is too short or empty after extraction`);
      }
      
      console.log(`✅ Content validation passed for ${filename}: ${content.length} chars, ${Math.round((1 - garbageRatio) * 100)}% readable`);
      return content;
    },
    []
  );

  // Helper function to extract text content from different file types
  const extractFileContent = useCallback(
    async (file: File): Promise<string> => {
      try {
        // Check if it's a PDF file
        if (PDFParser.isPDF(file)) {
          console.log(`📄 Processing PDF file: ${file.name}`);

          // Use PDF parser for PDF files
          const pdfResult = await pdfParser.parsePDF(file, {
            maxPages: 100,
            maxTextLength: 1000000, // 1MB text limit
            includeMetadata: true,
            onProgress: (progress) => {
              console.log(`📊 PDF parsing: ${progress.message}`);
            },
          });

          if (pdfResult.metadata.hasText) {
            console.log(
              `✅ PDF parsed successfully: ${pdfResult.metadata.pageCount} pages, ${pdfResult.metadata.textLength} characters`
            );
            return validateExtractedContent(pdfResult.text, file.name);
          } else {
            console.warn(`⚠️ No text extracted from PDF: ${file.name}`);
            throw new Error(`No text content could be extracted from ${file.name}`);
          }
        } else if (file.name.endsWith('.docx') || file.type.includes('wordprocessingml')) {
          // DOCX files - extract text with structural markers using mammoth
          console.log(`📄 Processing DOCX file with structural detection: ${file.name}`);
          const arrayBuffer = await file.arrayBuffer();
          
          // Use convertToHtml to get structured content that preserves tables
          const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
          
          if (!htmlResult.value || htmlResult.value.trim().length === 0) {
            // Fall back to raw text extraction
            const textResult = await mammoth.extractRawText({ arrayBuffer });
            if (!textResult.value || textResult.value.trim().length === 0) {
              throw new Error(`No text content could be extracted from ${file.name}`);
            }
            return validateExtractedContent(textResult.value, file.name);
          }
          
          // Convert HTML to text with structural markers
          const structuredText = convertHtmlToStructuredText(htmlResult.value);
          
          console.log(`✅ DOCX structured text extracted: ${structuredText.length} characters with markers`);
          return validateExtractedContent(structuredText, file.name);
        } else if (
          file.type.startsWith("text/") ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".md") ||
          file.name.endsWith(".json")
        ) {
          // Text files - read as text
          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
              const content = event.target?.result as string;
              resolve(validateExtractedContent(content, file.name));
            };

            reader.onerror = () => {
              reject(new Error(`Failed to read file: ${file.name}`));
            };

            reader.readAsText(file);
          });
        } else {
          // Unsupported file types - throw error instead of creating garbage
          throw new Error(`Unsupported file type: ${file.type}. Supported formats: PDF, DOCX, TXT, MD, JSON`);
        }
      } catch (error) {
        console.error(`❌ Failed to extract content from ${file.name}:`, error);
        throw new Error(
          `Failed to process file content: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    },
    [validateExtractedContent]
  );

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (!vectorStore || !files.length) return;

      setIsUploading(true);
      try {
        console.log(`📚 Processing ${files.length} files...`);

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log(
            `📄 Processing file ${i + 1}/${files.length}: ${file.name}`
          );

          try {
            // Check file type and show appropriate message
            if (PDFParser.isPDF(file)) {
              console.log(
                `📄 PDF detected: ${file.name} - will extract text content`
              );
            }

            // Extract file content
            const content = await extractFileContent(file);

            // Process with VectorStore
            await vectorStore.addDocument(file, content, (progress: any) => {
              console.log(
                `📊 Processing ${file.name}: ${progress.message} (${progress.progress}%)`
              );
            });

            console.log(`✅ Successfully processed: ${file.name}`);
          } catch (error) {
            console.error(`❌ Failed to process ${file.name}:`, error);
            
            // Show user-friendly error message
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.warn(`⚠️ User notification: Failed to process ${file.name}: ${errorMessage}`);
            
            // You can add UI notification here if available:
            // showErrorToast(`Failed to process ${file.name}: ${errorMessage}`);
            
            // Continue with other files instead of failing the entire batch
          }
        }

        await updateDocumentStatus();
        console.log(`✅ File upload complete`);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [vectorStore, extractFileContent, updateDocumentStatus]
  );

  const deleteDocument = useCallback(
    async (docId: string) => {
      if (!vectorStore) return;

      try {
        await vectorStore.deleteDocument(docId);
        await updateDocumentStatus();
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    },
    [vectorStore, updateDocumentStatus]
  );

  // Enhanced chunk management methods
  const getDocumentChunks = useCallback(
    async (docId: string) => {
      if (!vectorStore) return [];

      try {
        const doc = await vectorStore.getDocument(docId);
        if (!doc) return [];

        return doc.chunks.map((chunk: any, index: number) => {
          const vector = doc.vectors.find((v: any) => v.chunkId === chunk.id);
          return {
            ...chunk,
            index,
            vector: vector || null,
            hasVector: !!vector,
          };
        });
      } catch (error) {
        console.error("Failed to get document chunks:", error);
        return [];
      }
    },
    [vectorStore]
  );

  const getChunkDetails = useCallback(
    async (docId: string, chunkId: string) => {
      if (!vectorStore) return null;

      try {
        const doc = await vectorStore.getDocument(docId);
        if (!doc) return null;

        const chunk = doc.chunks.find((c: any) => c.id === chunkId);
        const vector = doc.vectors.find((v: any) => v.chunkId === chunkId);

        if (!chunk) return null;

        return {
          chunk,
          vector,
          document: {
            id: doc.id,
            title: doc.title,
            metadata: doc.metadata,
          },
        };
      } catch (error) {
        console.error("Failed to get chunk details:", error);
        return null;
      }
    },
    [vectorStore]
  );

  useEffect(() => {
    if (vectorStore) {
      updateDocumentStatus();
    }
  }, [vectorStore, updateDocumentStatus]);

  // Helper function for formatting file sizes
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return {
    documents,
    documentStatus,
    isUploading,
    showDocumentManager,
    setShowDocumentManager,
    handleFileUpload,
    deleteDocument,
    updateDocumentStatus,
    // Enhanced chunk management
    getDocumentChunks,
    getChunkDetails,
  };
}

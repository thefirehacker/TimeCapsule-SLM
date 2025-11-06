"use client";

import React, { useState, useEffect } from "react";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { VectorStore } from "@/components/VectorStore/VectorStore";

interface KBPDFSelectorProps {
  vectorStore: VectorStore | null;
  onSelect: (selection: KBPDFSelection | null) => void;
  initialSelection?: KBPDFSelection;
}

export interface KBPDFSelection {
  kbDocumentId: string;
  filename: string;
  title: string;
  startPage: number;
  endPage: number;
  totalPages: number;
  filesize: number;
  uploadedAt: string;
}

interface PDFDocument {
  id: string;
  filename: string;
  title: string;
  metadata: {
    filesize: number;
    uploadedAt: string;
    pageCount?: number;
  };
}

export function KBPDFSelector({
  vectorStore,
  onSelect,
  initialSelection,
}: KBPDFSelectorProps) {
  const [pdfDocuments, setPdfDocuments] = useState<PDFDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>(
    initialSelection?.kbDocumentId || ""
  );
  const [startPage, setStartPage] = useState<number>(
    initialSelection?.startPage || 1
  );
  const [endPage, setEndPage] = useState<number>(
    initialSelection?.endPage || 1
  );
  const [totalPages, setTotalPages] = useState<number>(
    initialSelection?.totalPages || 1
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load PDF documents from KB
  useEffect(() => {
    const loadPDFDocuments = async () => {
      if (!vectorStore) {
        setError("Knowledge Base not initialized");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get all documents from KB
        const allDocs = await vectorStore.getAllDocuments();

        // Filter for PDF files
        const pdfDocs = allDocs
          .filter(
            (doc) =>
              doc.metadata?.filetype === "application/pdf" ||
              doc.metadata?.filename?.toLowerCase().endsWith(".pdf")
          )
          .map((doc) => ({
            id: doc.id,
            filename: doc.metadata?.filename || doc.title,
            title: doc.title,
            metadata: {
              filesize: doc.metadata?.filesize || 0,
              uploadedAt: doc.metadata?.uploadedAt || new Date().toISOString(),
              pageCount: doc.metadata?.pageCount || 1,
            },
          }));

        setPdfDocuments(pdfDocs);

        if (pdfDocs.length === 0) {
          setError(
            "No PDF documents found in Knowledge Base. Please upload PDFs first."
          );
        }
      } catch (err) {
        console.error("Failed to load PDF documents:", err);
        setError("Failed to load PDF documents from Knowledge Base");
      } finally {
        setLoading(false);
      }
    };

    loadPDFDocuments();
  }, [vectorStore]);

  // Update total pages when document selection changes
  useEffect(() => {
    if (selectedDocId) {
      const selectedDoc = pdfDocuments.find((doc) => doc.id === selectedDocId);
      if (selectedDoc) {
        const pages = selectedDoc.metadata.pageCount || 1;
        setTotalPages(pages);

        // Reset page range if current values exceed document pages
        if (startPage > pages) setStartPage(1);
        if (endPage > pages) setEndPage(pages);
      }
    }
  }, [selectedDocId, pdfDocuments]);

  // Notify parent of selection changes
  useEffect(() => {
    if (selectedDocId && startPage && endPage) {
      const selectedDoc = pdfDocuments.find((doc) => doc.id === selectedDocId);
      if (selectedDoc && validatePageRange()) {
        const selection: KBPDFSelection = {
          kbDocumentId: selectedDocId,
          filename: selectedDoc.filename,
          title: selectedDoc.title,
          startPage,
          endPage,
          totalPages,
          filesize: selectedDoc.metadata.filesize,
          uploadedAt: selectedDoc.metadata.uploadedAt,
        };
        onSelect(selection);
      } else {
        onSelect(null);
      }
    } else {
      onSelect(null);
    }
  }, [selectedDocId, startPage, endPage, pdfDocuments, totalPages]);

  const validatePageRange = (): boolean => {
    if (startPage < 1 || endPage < 1) return false;
    if (startPage > totalPages || endPage > totalPages) return false;
    if (startPage > endPage) return false;
    return true;
  };

  const getValidationMessage = (): string | null => {
    if (!selectedDocId) return null;
    if (startPage < 1 || endPage < 1) return "Page numbers must be at least 1";
    if (startPage > totalPages || endPage > totalPages)
      return `Page numbers cannot exceed ${totalPages}`;
    if (startPage > endPage) return "Start page must be less than or equal to end page";
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-sm text-gray-600">
          Loading PDF documents...
        </span>
      </div>
    );
  }

  const validationMessage = getValidationMessage();
  const isValid = validatePageRange();
  const selectedDoc = pdfDocuments.find((doc) => doc.id === selectedDocId);

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!error && (
        <>
          {/* PDF Document Selector */}
          <div className="space-y-2">
            <Label htmlFor="pdf-select">Select PDF from Knowledge Base</Label>
            <Select value={selectedDocId} onValueChange={setSelectedDocId}>
              <SelectTrigger id="pdf-select">
                <SelectValue placeholder="Choose a PDF document..." />
              </SelectTrigger>
              <SelectContent className="max-w-[400px]">
                {pdfDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex items-center gap-2 min-w-0 max-w-full">
                      <FileText className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                        <span className="font-medium truncate block" title={doc.title}>{doc.title}</span>
                        <span className="text-xs text-gray-500 truncate block" title={doc.filename}>
                          {doc.filename} • {formatFileSize(doc.metadata.filesize)} •{" "}
                          {doc.metadata.pageCount || "?"} pages
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Document Info */}
          {selectedDoc && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 whitespace-normal break-words" title={selectedDoc.title}>
                    {selectedDoc.title}
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 whitespace-normal break-words" title={selectedDoc.filename}>
                    {selectedDoc.filename}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-blue-600 dark:text-blue-400 flex-wrap">
                    <span>{totalPages} pages</span>
                    <span>{formatFileSize(selectedDoc.metadata.filesize)}</span>
                    <span>
                      Uploaded:{" "}
                      {new Date(selectedDoc.metadata.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page Range Selector */}
          {selectedDocId && (
            <div className="space-y-3">
              <Label>Page Range (like YouTube start/duration)</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="start-page" className="text-xs">
                    Start Page
                  </Label>
                  <Input
                    id="start-page"
                    type="number"
                    min={1}
                    max={totalPages}
                    value={startPage}
                    onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                    className={!isValid ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-page" className="text-xs">
                    End Page
                  </Label>
                  <Input
                    id="end-page"
                    type="number"
                    min={1}
                    max={totalPages}
                    value={endPage}
                    onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                    className={!isValid ? "border-red-500" : ""}
                  />
                </div>
              </div>

              {/* Page Range Info */}
              <div className="flex items-center gap-2 text-xs">
                {isValid ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 dark:text-green-400">
                      Selected {endPage - startPage + 1} page
                      {endPage - startPage + 1 > 1 ? "s" : ""} (
                      {startPage === endPage
                        ? `page ${startPage}`
                        : `pages ${startPage}-${endPage}`}
                      )
                    </span>
                  </>
                ) : (
                  validationMessage && (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-700 dark:text-red-400">
                        {validationMessage}
                      </span>
                    </>
                  )
                )}
              </div>

              {/* Quick Select Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartPage(1);
                    setEndPage(totalPages);
                  }}
                >
                  All Pages
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartPage(1);
                    setEndPage(1);
                  }}
                >
                  First Page
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartPage(totalPages);
                    setEndPage(totalPages);
                  }}
                  disabled={totalPages < 1}
                >
                  Last Page
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

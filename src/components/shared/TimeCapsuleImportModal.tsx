"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Package,
  MessageSquare,
  Bot,
  Database,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useTimeCapsuleImportExport,
  TimeCapsule,
} from "@/hooks/useTimeCapsuleImportExport";

interface TimeCapsuleImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

interface ImportPreview {
  fileName: string;
  fileSize: number;
  data: any;
  timeCapsules: TimeCapsule[];
  totalItems: {
    documents: number;
    research: number;
    aiFrames: number;
  };
  totalSize: number;
  isValid: boolean;
  error?: string;
}

export function TimeCapsuleImportModal({
  open,
  onOpenChange,
  onImportComplete,
}: TimeCapsuleImportModalProps) {
  const {
    importTimeCapsules,
    validateImportData,
    isImporting,
    importProgress,
    error,
  } = useTimeCapsuleImportExport();

  const [importPreview, setImportPreview] = useState<ImportPreview | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File validation and preview
  const processFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        const isValid = validateImportData(data);

        if (!isValid) {
          setImportPreview({
            fileName: file.name,
            fileSize: file.size,
            data: null,
            timeCapsules: [],
            totalItems: { documents: 0, research: 0, aiFrames: 0 },
            totalSize: 0,
            isValid: false,
            error: "Invalid TimeCapsule file format",
          });
          return;
        }

        const timeCapsules: TimeCapsule[] = data.timeCapsules || [];

        // Calculate totals
        let totalDocuments = 0;
        let totalResearch = 0;
        let totalAIFrames = 0;
        let totalSize = 0;

        timeCapsules.forEach((tc) => {
          tc.bubblSpaces.forEach((bs) => {
            totalDocuments += bs.documents.length;
            totalResearch += bs.research.length;
            totalAIFrames += bs.aiFrames.length;

            bs.documents.forEach((doc) => {
              totalSize += doc.metadata.filesize || 0;
            });
          });
        });

        setImportPreview({
          fileName: file.name,
          fileSize: file.size,
          data,
          timeCapsules,
          totalItems: {
            documents: totalDocuments,
            research: totalResearch,
            aiFrames: totalAIFrames,
          },
          totalSize,
          isValid: true,
        });
      } catch (err) {
        setImportPreview({
          fileName: file.name,
          fileSize: file.size,
          data: null,
          timeCapsules: [],
          totalItems: { documents: 0, research: 0, aiFrames: 0 },
          totalSize: 0,
          isValid: false,
          error: err instanceof Error ? err.message : "Failed to parse file",
        });
      }
    },
    [validateImportData]
  );

  // Handle file selection
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;

      if (!file.name.endsWith(".json")) {
        setImportPreview({
          fileName: file.name,
          fileSize: file.size,
          data: null,
          timeCapsules: [],
          totalItems: { documents: 0, research: 0, aiFrames: 0 },
          totalSize: 0,
          isValid: false,
          error: "Please select a JSON file",
        });
        return;
      }

      processFile(file);
    },
    [processFile]
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  // Handle import
  const handleImport = async () => {
    if (!importPreview?.data) return;

    try {
      setImportSuccess(false);
      const file = new File(
        [JSON.stringify(importPreview.data)],
        importPreview.fileName,
        {
          type: "application/json",
        }
      );

      const success = await importTimeCapsules(file);

      if (success) {
        setImportSuccess(true);
        onImportComplete?.();

        // Auto-close after success
        setTimeout(() => {
          onOpenChange(false);
          resetModal();
        }, 3000);
      }
    } catch (err) {
      console.error("Import failed:", err);
    }
  };

  // Reset modal state
  const resetModal = () => {
    setImportPreview(null);
    setImportSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!isImporting) {
      onOpenChange(false);
      resetModal();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const canImport = importPreview?.isValid && !isImporting;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import TimeCapsule
          </DialogTitle>
          <DialogDescription>
            Import TimeCapsule data from a previously exported JSON file. All
            data will be properly organized in your TimeCapsule structure.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4">
          {/* File Selection Area */}
          {!importPreview && (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Drop TimeCapsule file here</h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse for a JSON export file
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="w-4 h-4 mr-2" />
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          )}

          {/* Import Preview */}
          {importPreview && (
            <div className="space-y-4">
              {/* File Info */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{importPreview.fileName}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatFileSize(importPreview.fileSize)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetModal}
                  disabled={isImporting}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Validation Status */}
              {!importPreview.isValid ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {importPreview.error || "Invalid file format"}
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {/* Preview Statistics */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Import Preview</h4>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <div className="text-muted-foreground">
                          TimeCapsules
                        </div>
                        <div className="font-medium">
                          {importPreview.timeCapsules.length}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Total Size</div>
                        <div className="font-medium">
                          {formatFileSize(importPreview.totalSize)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-muted-foreground">Documents</div>
                          <div className="font-medium">
                            {importPreview.totalItems.documents}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-muted-foreground">Research</div>
                          <div className="font-medium">
                            {importPreview.totalItems.research}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="text-muted-foreground">AI Frames</div>
                          <div className="font-medium">
                            {importPreview.totalItems.aiFrames}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TimeCapsule Structure Preview */}
                  <div className="border rounded-lg">
                    <div className="p-3 border-b bg-muted/30">
                      <h4 className="font-medium">Structure Preview</h4>
                    </div>
                    <div className="p-3 max-h-40 overflow-y-auto">
                      {importPreview.timeCapsules.map((tc) => (
                        <div key={tc.id} className="space-y-2">
                          <div className="flex items-center gap-2 font-medium">
                            <Package className="w-4 h-4" />
                            {tc.name}
                            <Badge variant="secondary">
                              {tc.bubblSpaces.length} BubblSpaces
                            </Badge>
                          </div>
                          {tc.bubblSpaces.map((bs) => (
                            <div
                              key={bs.id}
                              className="ml-6 flex items-center gap-2 text-sm"
                            >
                              <Database className="w-3 h-3 text-muted-foreground" />
                              {bs.name}
                              <Badge variant="outline" className="text-xs">
                                {bs.documents.length +
                                  bs.research.length +
                                  bs.aiFrames.length}{" "}
                                items
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Import Progress */}
              {isImporting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Importing TimeCapsule...
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {importProgress}%
                    </span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                </div>
              )}

              {/* Success Message */}
              {importSuccess && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    TimeCapsule imported successfully! All data has been
                    properly organized.
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isImporting}
          >
            {importSuccess ? "Close" : "Cancel"}
          </Button>
          {importPreview?.isValid && (
            <Button
              onClick={handleImport}
              disabled={!canImport}
              className="min-w-[120px]"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


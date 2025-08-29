"use client";

import { useState, useEffect } from "react";
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
  Download,
  Package,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileDown,
} from "lucide-react";
import { HierarchicalCheckbox } from "./HierarchicalCheckbox";
import {
  useTimeCapsuleImportExport,
  TimeCapsule,
  ExportSelection,
} from "@/hooks/useTimeCapsuleImportExport";

interface TimeCapsuleExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TimeCapsuleExportModal({
  open,
  onOpenChange,
}: TimeCapsuleExportModalProps) {
  const {
    buildTimeCapsuleData,
    exportTimeCapsules,
    createExportSelection,
    isExporting,
    exportProgress,
    error,
  } = useTimeCapsuleImportExport();

  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [selection, setSelection] = useState<ExportSelection>({
    timeCapsules: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [exportStats, setExportStats] = useState({
    totalItems: 0,
    selectedItems: 0,
    totalSize: 0,
    selectedSize: 0,
  });

  // Load TimeCapsule data when modal opens
  useEffect(() => {
    if (open) {
      loadTimeCapsuleData();
    }
  }, [open]);

  // Calculate export statistics
  useEffect(() => {
    calculateExportStats();
  }, [selection, timeCapsules]);

  const loadTimeCapsuleData = async () => {
    try {
      setIsLoading(true);
      const data = await buildTimeCapsuleData();
      setTimeCapsules(data);

      if (data.length > 0) {
        const initialSelection = createExportSelection(data);
        setSelection(initialSelection);
      }
    } catch (err) {
      console.error("Failed to load TimeCapsule data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateExportStats = () => {
    let totalItems = 0;
    let selectedItems = 0;
    let totalSize = 0;
    let selectedSize = 0;

    timeCapsules.forEach((tc) => {
      const tcSelection = selection.timeCapsules[tc.id];

      tc.bubblSpaces.forEach((bs) => {
        const bsSelection = tcSelection?.bubblSpaces[bs.id];

        // Documents
        bs.documents.forEach((doc) => {
          totalItems++;
          totalSize += doc.metadata.filesize || 0;

          if (bsSelection?.documents[doc.id]) {
            selectedItems++;
            selectedSize += doc.metadata.filesize || 0;
          }
        });

        // Research
        bs.research.forEach((research) => {
          totalItems++;

          if (bsSelection?.research[research.id]) {
            selectedItems++;
          }
        });

        // AI Frames
        bs.aiFrames.forEach((aiFrame) => {
          totalItems++;

          if (bsSelection?.aiFrames[aiFrame.id]) {
            selectedItems++;
          }
        });
      });
    });

    setExportStats({
      totalItems,
      selectedItems,
      totalSize,
      selectedSize,
    });
  };

  const handleExport = async () => {
    try {
      await exportTimeCapsules(selection);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const canExport = exportStats.selectedItems > 0 && !isExporting && !isLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Export TimeCapsule
          </DialogTitle>
          <DialogDescription>
            Select the TimeCapsule data you want to export. You can choose
            specific documents, research sessions, and AI frames from different
            BubblSpaces.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Loading TimeCapsule data...
                </p>
              </div>
            </div>
          ) : timeCapsules.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">No TimeCapsule data found</p>
                <p className="text-sm text-muted-foreground">
                  Create some documents or research to export
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Export Statistics */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Total Items</div>
                    <div className="font-medium">{exportStats.totalItems}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Selected Items</div>
                    <div className="font-medium text-primary">
                      {exportStats.selectedItems}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Size</div>
                    <div className="font-medium">
                      {formatFileSize(exportStats.totalSize)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Selected Size</div>
                    <div className="font-medium text-primary">
                      {formatFileSize(exportStats.selectedSize)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Interface */}
              <div className="border rounded-lg">
                <div className="p-3 border-b bg-muted/30">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileDown className="w-4 h-4" />
                    Select Data to Export
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use checkboxes to select specific items. Parent selections
                    include all children.
                  </p>
                </div>

                <div className="p-4">
                  <HierarchicalCheckbox
                    timeCapsules={timeCapsules}
                    selection={selection}
                    onSelectionChange={setSelection}
                  />
                </div>
              </div>

              {/* Export Progress */}
              {isExporting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Exporting TimeCapsule...
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {exportProgress}%
                    </span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              )}

              {/* Success Message */}
              {exportProgress === 100 && !isExporting && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    TimeCapsule export completed successfully! The file has been
                    downloaded.
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

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {exportStats.selectedItems > 0 && (
              <Badge variant="secondary">
                {exportStats.selectedItems} items selected
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={!canExport}
              className="min-w-[120px]"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronRight,
  Package,
  MessageSquare,
  FileText,
  Bot,
  Clock,
  Folder,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TimeCapsule,
  BubblSpace,
  ExportSelection,
} from "@/hooks/useTimeCapsuleImportExport";

interface HierarchicalItem {
  id: string;
  name: string;
  type:
    | "timecapsule"
    | "bubblspace"
    | "documents"
    | "research"
    | "aiframes"
    | "document"
    | "research-item"
    | "aiframe-item";
  children?: HierarchicalItem[];
  count?: number;
  size?: number;
  metadata?: any;
}

interface HierarchicalCheckboxProps {
  timeCapsules: TimeCapsule[];
  selection: ExportSelection;
  onSelectionChange: (selection: ExportSelection) => void;
  className?: string;
}

interface CheckboxState {
  checked: boolean;
  indeterminate: boolean;
}

export function HierarchicalCheckbox({
  timeCapsules,
  selection,
  onSelectionChange,
  className,
}: HierarchicalCheckboxProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Convert TimeCapsule data to hierarchical structure
  const hierarchicalData: HierarchicalItem[] = timeCapsules.map((tc) => ({
    id: tc.id,
    name: tc.name,
    type: "timecapsule" as const,
    count:
      tc.metadata.totalDocuments +
      tc.metadata.totalResearch +
      tc.metadata.totalAIFrames,
    size: tc.metadata.totalSize,
    children: tc.bubblSpaces.map((bs) => ({
      id: bs.id,
      name: bs.name,
      type: "bubblspace" as const,
      count: bs.documents.length + bs.research.length + bs.aiFrames.length,
      children: [
        {
          id: `${bs.id}-documents`,
          name: "User Documents",
          type: "documents" as const,
          count: bs.documents.length,
          children: bs.documents.map((doc) => ({
            id: doc.id,
            name: doc.title,
            type: "document" as const,
            size: doc.metadata.filesize,
            metadata: doc.metadata,
          })),
        },
        {
          id: `${bs.id}-research`,
          name: "Deep Research",
          type: "research" as const,
          count: bs.research.length,
          children: bs.research.map((research) => ({
            id: research.id,
            name: research.title,
            type: "research-item" as const,
            metadata: research,
          })),
        },
        {
          id: `${bs.id}-aiframes`,
          name: "AI Frames",
          type: "aiframes" as const,
          count: bs.aiFrames.length,
          children: bs.aiFrames.map((aiFrame) => ({
            id: aiFrame.id,
            name: aiFrame.title,
            type: "aiframe-item" as const,
            metadata: aiFrame,
          })),
        },
      ].filter((category) => category.count! > 0), // Only show categories with items
    })),
  }));

  // Get icon for item type
  const getIcon = (type: string, expanded?: boolean) => {
    const iconClass = "w-4 h-4 flex-shrink-0";

    switch (type) {
      case "timecapsule":
        return <Package className={iconClass} />;
      case "bubblspace":
        return expanded ? (
          <Folder className={iconClass} />
        ) : (
          <Database className={iconClass} />
        );
      case "documents":
        return <FileText className={iconClass} />;
      case "research":
        return <MessageSquare className={iconClass} />;
      case "aiframes":
        return <Bot className={iconClass} />;
      case "document":
        return <FileText className={cn(iconClass, "text-muted-foreground")} />;
      case "research-item":
        return (
          <MessageSquare className={cn(iconClass, "text-muted-foreground")} />
        );
      case "aiframe-item":
        return <Bot className={cn(iconClass, "text-muted-foreground")} />;
      default:
        return <Folder className={iconClass} />;
    }
  };

  // Get checkbox state for an item
  const getCheckboxState = useCallback(
    (item: HierarchicalItem, parentPath: string[] = []): CheckboxState => {
      const fullPath = [...parentPath, item.id];

      if (item.type === "timecapsule") {
        const tcSelection = selection.timeCapsules[item.id];
        if (!tcSelection) return { checked: false, indeterminate: false };

        const bubblSpaces =
          timeCapsules.find((tc) => tc.id === item.id)?.bubblSpaces || [];
        const selectedCount = bubblSpaces.filter(
          (bs) => tcSelection.bubblSpaces[bs.id]?.selected
        ).length;

        if (selectedCount === 0)
          return { checked: false, indeterminate: false };
        if (selectedCount === bubblSpaces.length)
          return { checked: true, indeterminate: false };
        return { checked: false, indeterminate: true };
      }

      if (item.type === "bubblspace") {
        const [tcId] = parentPath;
        const bsSelection = selection.timeCapsules[tcId]?.bubblSpaces[item.id];
        if (!bsSelection) return { checked: false, indeterminate: false };

        return { checked: bsSelection.selected, indeterminate: false };
      }

      if (
        item.type === "documents" ||
        item.type === "research" ||
        item.type === "aiframes"
      ) {
        const [tcId, bsId] = parentPath;
        const bsSelection = selection.timeCapsules[tcId]?.bubblSpaces[bsId];
        if (!bsSelection) return { checked: false, indeterminate: false };

        const categoryKey =
          item.type === "documents"
            ? "documents"
            : item.type === "research"
              ? "research"
              : "aiFrames";
        const categoryItems =
          bsSelection[categoryKey as keyof typeof bsSelection];
        const selectedCount = Object.values(
          categoryItems as Record<string, boolean>
        ).filter(Boolean).length;
        const totalCount = item.children?.length || 0;

        if (selectedCount === 0)
          return { checked: false, indeterminate: false };
        if (selectedCount === totalCount)
          return { checked: true, indeterminate: false };
        return { checked: false, indeterminate: true };
      }

      // Individual items
      const [tcId, bsId, categoryId] = parentPath;
      const bsSelection = selection.timeCapsules[tcId]?.bubblSpaces[bsId];
      if (!bsSelection) return { checked: false, indeterminate: false };

      const categoryType = categoryId.endsWith("-documents")
        ? "documents"
        : categoryId.endsWith("-research")
          ? "research"
          : "aiFrames";
      const isSelected =
        bsSelection[categoryType as keyof typeof bsSelection][
          item.id as keyof any
        ];

      return { checked: !!isSelected, indeterminate: false };
    },
    [selection, timeCapsules]
  );

  // Handle checkbox change
  const handleCheckboxChange = useCallback(
    (item: HierarchicalItem, checked: boolean, parentPath: string[] = []) => {
      const newSelection = JSON.parse(
        JSON.stringify(selection)
      ) as ExportSelection;

      if (item.type === "timecapsule") {
        if (!newSelection.timeCapsules[item.id]) {
          newSelection.timeCapsules[item.id] = {
            selected: false,
            bubblSpaces: {},
          };
        }

        const tc = timeCapsules.find((tc) => tc.id === item.id);
        if (!tc) return;

        tc.bubblSpaces.forEach((bs) => {
          if (!newSelection.timeCapsules[item.id].bubblSpaces[bs.id]) {
            newSelection.timeCapsules[item.id].bubblSpaces[bs.id] = {
              selected: false,
              documents: {},
              research: {},
              aiFrames: {},
            };
          }

          newSelection.timeCapsules[item.id].bubblSpaces[bs.id].selected =
            checked;

          // Set all items in bubblspace
          bs.documents.forEach((doc) => {
            newSelection.timeCapsules[item.id].bubblSpaces[bs.id].documents[
              doc.id
            ] = checked;
          });
          bs.research.forEach((research) => {
            newSelection.timeCapsules[item.id].bubblSpaces[bs.id].research[
              research.id
            ] = checked;
          });
          bs.aiFrames.forEach((aiFrame) => {
            newSelection.timeCapsules[item.id].bubblSpaces[bs.id].aiFrames[
              aiFrame.id
            ] = checked;
          });
        });
      } else if (item.type === "bubblspace") {
        const [tcId] = parentPath;
        if (!newSelection.timeCapsules[tcId]) return;

        newSelection.timeCapsules[tcId].bubblSpaces[item.id].selected = checked;

        const tc = timeCapsules.find((tc) => tc.id === tcId);
        const bs = tc?.bubblSpaces.find((bs) => bs.id === item.id);
        if (!bs) return;

        // Set all items in bubblspace
        bs.documents.forEach((doc) => {
          newSelection.timeCapsules[tcId].bubblSpaces[item.id].documents[
            doc.id
          ] = checked;
        });
        bs.research.forEach((research) => {
          newSelection.timeCapsules[tcId].bubblSpaces[item.id].research[
            research.id
          ] = checked;
        });
        bs.aiFrames.forEach((aiFrame) => {
          newSelection.timeCapsules[tcId].bubblSpaces[item.id].aiFrames[
            aiFrame.id
          ] = checked;
        });
      } else if (
        item.type === "documents" ||
        item.type === "research" ||
        item.type === "aiframes"
      ) {
        const [tcId, bsId] = parentPath;
        const categoryKey =
          item.type === "documents"
            ? "documents"
            : item.type === "research"
              ? "research"
              : "aiFrames";

        item.children?.forEach((child) => {
          (
            newSelection.timeCapsules[tcId].bubblSpaces[bsId][
              categoryKey as keyof any
            ] as any
          )[child.id] = checked;
        });
      } else {
        // Individual items
        const [tcId, bsId, categoryId] = parentPath;
        const categoryType = categoryId.endsWith("-documents")
          ? "documents"
          : categoryId.endsWith("-research")
            ? "research"
            : "aiFrames";

        (
          newSelection.timeCapsules[tcId].bubblSpaces[bsId][
            categoryType as keyof any
          ] as any
        )[item.id] = checked;

        // Update parent bubblspace selection if needed
        const bsSelection = newSelection.timeCapsules[tcId].bubblSpaces[bsId];
        const hasAnySelected =
          Object.values(bsSelection.documents).some(Boolean) ||
          Object.values(bsSelection.research).some(Boolean) ||
          Object.values(bsSelection.aiFrames).some(Boolean);

        bsSelection.selected = hasAnySelected;
      }

      onSelectionChange(newSelection);
    },
    [selection, timeCapsules, onSelectionChange]
  );

  // Toggle expansion
  const toggleExpansion = useCallback((itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Render item
  const renderItem = (
    item: HierarchicalItem,
    level: number = 0,
    parentPath: string[] = []
  ): React.ReactNode => {
    const currentPath = [...parentPath, item.id];
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const checkboxState = getCheckboxState(item, parentPath);
    const isLeafItem = !hasChildren;

    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-2 rounded hover:bg-accent/50 transition-colors",
            level === 0 && "border-b border-border/30 pb-2 mb-2"
          )}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {/* Expansion toggle */}
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleExpansion(item.id)}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          ) : (
            <div className="w-6" />
          )}

          {/* Checkbox */}
          <Checkbox
            checked={checkboxState.checked}
            ref={(ref) => {
              if (ref) {
                ref.indeterminate = checkboxState.indeterminate;
              }
            }}
            onCheckedChange={(checked) =>
              handleCheckboxChange(item, !!checked, parentPath)
            }
            className="data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary"
          />

          {/* Icon */}
          {getIcon(item.type, isExpanded)}

          {/* Label and metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-medium truncate",
                  level === 0 && "text-base",
                  level === 1 && "text-sm",
                  level >= 2 && "text-sm text-muted-foreground"
                )}
              >
                {item.name}
              </span>

              {item.count !== undefined && (
                <Badge variant="secondary" className="text-xs">
                  {item.count} items
                </Badge>
              )}

              {item.size !== undefined && (
                <Badge variant="outline" className="text-xs">
                  {formatFileSize(item.size)}
                </Badge>
              )}
            </div>

            {/* Additional metadata for leaf items */}
            {isLeafItem && item.metadata && (
              <div className="text-xs text-muted-foreground mt-1">
                {item.type === "document" && (
                  <span>
                    {item.metadata.filetype} •{" "}
                    {new Date(item.metadata.uploadedAt).toLocaleDateString()}
                  </span>
                )}
                {item.type === "research-item" && (
                  <span>
                    {item.metadata.wordCount} words •{" "}
                    {new Date(item.metadata.timestamp).toLocaleDateString()}
                  </span>
                )}
                {item.type === "aiframe-item" && (
                  <span>
                    {item.metadata.type} •{" "}
                    {new Date(item.metadata.timestamp).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children!.map((child) =>
              renderItem(child, level + 1, currentPath)
            )}
          </div>
        )}
      </div>
    );
  };

  // Auto-expand TimeCapsules and BubblSpaces on mount
  useEffect(() => {
    const toExpand = new Set<string>();

    hierarchicalData.forEach((tc) => {
      toExpand.add(tc.id);
      tc.children?.forEach((bs) => {
        toExpand.add(bs.id);
      });
    });

    setExpandedItems(toExpand);
  }, []);

  if (hierarchicalData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No TimeCapsule data found</p>
        <p className="text-sm">Create some documents or research to export</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="h-[400px] w-full overflow-y-auto">
        <div className="space-y-1 pr-4">
          {hierarchicalData.map((item) => renderItem(item))}
        </div>
      </div>
    </div>
  );
}


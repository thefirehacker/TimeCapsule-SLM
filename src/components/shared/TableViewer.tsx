"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  EyeOff,
  Download,
  Copy,
  Grid3X3,
  FileText,
  Code,
  MoreHorizontal,
} from "lucide-react";
import { TableData, tableToHtml, tableToMarkdown } from "@/types/chunks";

interface TableViewerProps {
  tables: TableData[];
  title?: string;
  className?: string;
  maxHeight?: string;
  showExportOptions?: boolean;
  showMetadata?: boolean;
}

export function TableViewer({
  tables,
  title = "Document Tables",
  className = "",
  maxHeight = "400px",
  showExportOptions = true,
  showMetadata = true,
}: TableViewerProps) {
  const [expandedTables, setExpandedTables] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"formatted" | "raw" | "markdown">(
    "formatted"
  );

  const toggleTableExpansion = (tableIndex: number) => {
    setExpandedTables((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tableIndex)) {
        newSet.delete(tableIndex);
      } else {
        newSet.add(tableIndex);
      }
      return newSet;
    });
  };

  const exportTable = (
    table: TableData,
    format: "csv" | "json" | "html" | "markdown"
  ) => {
    let content = "";
    let filename = "";
    let mimeType = "";

    switch (format) {
      case "csv":
        content = table.rows
          .map((row) =>
            row.cells
              .map((cell) => `"${cell.content.replace(/"/g, '""')}"`)
              .join(",")
          )
          .join("\n");
        filename = "table.csv";
        mimeType = "text/csv";
        break;

      case "json":
        const jsonData = {
          caption: table.caption,
          headers: table.headers,
          rows: table.rows.map((row) => row.cells.map((cell) => cell.content)),
          metadata: table.metadata,
        };
        content = JSON.stringify(jsonData, null, 2);
        filename = "table.json";
        mimeType = "application/json";
        break;

      case "html":
        content = tableToHtml(table);
        filename = "table.html";
        mimeType = "text/html";
        break;

      case "markdown":
        content = tableToMarkdown(table);
        filename = "table.md";
        mimeType = "text/markdown";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyTableData = async (
    table: TableData,
    format: "text" | "markdown" | "html"
  ) => {
    let content = "";

    switch (format) {
      case "text":
        content = table.rows
          .map((row) => row.cells.map((cell) => cell.content).join("\t"))
          .join("\n");
        break;
      case "markdown":
        content = tableToMarkdown(table);
        break;
      case "html":
        content = tableToHtml(table);
        break;
    }

    try {
      await navigator.clipboard.writeText(content);
      // You might want to add a toast notification here
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  if (!tables || tables.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No tables found in this document</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Grid3X3 className="w-5 h-5" />
            {title} ({tables.length})
          </h3>
          {showExportOptions && (
            <div className="flex items-center gap-2">
              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as any)}
              >
                <TabsList className="h-8">
                  <TabsTrigger value="formatted" className="text-xs">
                    Formatted
                  </TabsTrigger>
                  <TabsTrigger value="raw" className="text-xs">
                    Raw
                  </TabsTrigger>
                  <TabsTrigger value="markdown" className="text-xs">
                    Markdown
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {tables.map((table, tableIndex) => {
          const isExpanded = expandedTables.has(tableIndex);
          const hasValidRows = table.rows && table.rows.length > 0;

          return (
            <Card key={tableIndex} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Grid3X3 className="w-4 h-4" />
                      {table.caption || `Table ${tableIndex + 1}`}
                    </CardTitle>
                    {showMetadata && (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {table.rows?.length || 0} rows
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {table.rows?.[0]?.cells?.length || 0} columns
                        </Badge>
                        {table.metadata?.pageNumber && (
                          <Badge variant="outline" className="text-xs">
                            Page {table.metadata.pageNumber}
                          </Badge>
                        )}
                        {table.metadata?.extractionMethod && (
                          <Badge variant="outline" className="text-xs">
                            {table.metadata.extractionMethod}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {showExportOptions && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyTableData(table, "text")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => exportTable(table, "csv")}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTableExpansion(tableIndex)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {isExpanded ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && hasValidRows && (
                <CardContent className="pt-0">
                  <ScrollArea className="w-full" style={{ maxHeight }}>
                    {viewMode === "formatted" && (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            {table.rows[0]?.isHeader && (
                              <TableRow>
                                {table.rows[0].cells.map((cell, cellIndex) => (
                                  <TableHead
                                    key={cellIndex}
                                    className={`text-${cell.alignment || "left"}`}
                                    colSpan={cell.colspan}
                                    rowSpan={cell.rowspan}
                                  >
                                    {cell.content}
                                  </TableHead>
                                ))}
                              </TableRow>
                            )}
                          </TableHeader>
                          <TableBody>
                            {table.rows
                              .slice(table.rows[0]?.isHeader ? 1 : 0)
                              .map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                  {row.cells.map((cell, cellIndex) => (
                                    <TableCell
                                      key={cellIndex}
                                      className={`text-${cell.alignment || "left"}`}
                                      colSpan={cell.colspan}
                                      rowSpan={cell.rowspan}
                                    >
                                      {cell.content}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}

                    {viewMode === "raw" && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {JSON.stringify(table, null, 2)}
                        </pre>
                      </div>
                    )}

                    {viewMode === "markdown" && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {tableToMarkdown(table)}
                        </pre>
                      </div>
                    )}
                  </ScrollArea>

                  {showExportOptions && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                      <span className="text-xs text-muted-foreground">
                        Export as:
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportTable(table, "csv")}
                        className="text-xs"
                      >
                        CSV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportTable(table, "json")}
                        className="text-xs"
                      >
                        JSON
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportTable(table, "html")}
                        className="text-xs"
                      >
                        HTML
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportTable(table, "markdown")}
                        className="text-xs"
                      >
                        Markdown
                      </Button>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TableViewer;


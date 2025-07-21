"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  BookOpen,
  StickyNote,
  Download,
  Eye,
  Copy,
  CheckCircle2,
} from "lucide-react";

interface ResearchOutputProps {
  researchResults: string;
  currentTab: "research" | "sources" | "notes";
  onTabChange: (tab: "research" | "sources" | "notes") => void;
  onClearOutput: () => void;
  onExportResults: () => void;
}

export function ResearchOutput({
  researchResults,
  currentTab,
  onTabChange,
  onClearOutput,
  onExportResults,
}: ResearchOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(researchResults);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatMarkdownToHTML = (markdown: string): string => {
    if (!markdown) return "";

    return (
      markdown
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold mt-8 mb-6 text-slate-900 dark:text-slate-100">$1</h1>'
        )

        // Bold and Italic
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>'
        )
        .replace(
          /\*(.*?)\*/g,
          '<em class="italic text-slate-700 dark:text-slate-300">$1</em>'
        )

        // Lists
        .replace(
          /^\* (.*$)/gim,
          '<li class="mb-1 text-slate-700 dark:text-slate-300">$1</li>'
        )
        .replace(
          /^- (.*$)/gim,
          '<li class="mb-1 text-slate-700 dark:text-slate-300">$1</li>'
        )
        .replace(
          /^\d+\. (.*$)/gim,
          '<li class="mb-1 text-slate-700 dark:text-slate-300">$1</li>'
        )

        // Code blocks
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm text-slate-800 dark:text-slate-200">$1</code></pre>'
        )
        .replace(
          /`(.*?)`/g,
          '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm text-slate-800 dark:text-slate-200">$1</code>'
        )

        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
        )

        // Line breaks
        .replace(
          /\n\n/g,
          '</p><p class="mb-4 text-slate-700 dark:text-slate-300">'
        )
        .replace(/\n/g, "<br/>")

        // Wrap in paragraphs
        .replace(
          /^(.+)/,
          '<p class="mb-4 text-slate-700 dark:text-slate-300">$1'
        )
        .replace(/(.+)$/, "$1</p>")
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
        <FileText className="w-8 h-8 text-slate-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          No Research Results Yet
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Enter a research query in the controls panel and click "Generate
          Research" to see results here.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!researchResults.trim()) {
      return renderEmptyState();
    }

    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: formatMarkdownToHTML(researchResults),
          }}
        />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Research Output
            </h2>
            {researchResults && (
              <Badge variant="secondary" className="ml-2">
                {Math.ceil(researchResults.length / 500)} min read
              </Badge>
            )}
          </div>

          {researchResults && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="space-x-2"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onExportResults}
                className="space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 ">
        <Tabs
          value={currentTab}
          onValueChange={(value) => onTabChange(value as any)}
        >
          <div className="border-b border-slate-200 dark:border-slate-700 px-4">
            <TabsList className="h-10">
              <TabsTrigger value="research" className="space-x-2">
                <FileText className="w-4 h-4" />
                <span>Research</span>
              </TabsTrigger>
              <TabsTrigger value="sources" className="space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Sources</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="space-x-2">
                <StickyNote className="w-4 h-4" />
                <span>Notes</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="research" className="m-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-6">{renderContent()}</div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="sources" className="m-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Sources and references will appear here when available
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="notes" className="m-0 h-full">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="text-center py-12">
                  <StickyNote className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Personal notes and annotations will appear here
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

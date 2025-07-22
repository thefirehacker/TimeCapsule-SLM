"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  BookOpen,
  StickyNote,
  Download,
  Copy,
  CheckCircle2,
  Brain,
  Loader2,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ResearchOutputProps {
  researchResults: string;
  thinkingOutput?: string; // AI thinking process
  isStreaming?: boolean; // Whether content is currently streaming
  currentTab: "research" | "sources" | "notes";
  onTabChange: (tab: "research" | "sources" | "notes") => void;
  onClearOutput: () => void;
  onExportResults: () => void;
}

export function ResearchOutput({
  researchResults,
  thinkingOutput,
  isStreaming = false,
  currentTab,
  onTabChange,
  onClearOutput,
  onExportResults,
}: ResearchOutputProps) {
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [typingIndicator, setTypingIndicator] = useState("");

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    if (scrollRef.current && (isStreaming || researchResults)) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [researchResults, thinkingOutput, isStreaming]);

  // Typing indicator animation for streaming
  useEffect(() => {
    if (isStreaming) {
      const dots = ["", ".", "..", "..."];
      let index = 0;
      const interval = setInterval(() => {
        setTypingIndicator(dots[index]);
        index = (index + 1) % dots.length;
      }, 500);
      return () => clearInterval(interval);
    } else {
      setTypingIndicator("");
    }
  }, [isStreaming]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(researchResults);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const renderThinkingOutput = () => {
    if (!thinkingOutput) return null;

    return (
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            AI Thinking Process
          </span>
          {isStreaming && (
            <Loader2 className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-spin" />
          )}
        </div>
        <div className="text-sm text-blue-700 dark:text-blue-300 whitespace-pre-wrap">
          {thinkingOutput}
        </div>
      </div>
    );
  };

  const renderStreamingIndicator = () => {
    if (!isStreaming) return null;

    return (
      <div className="flex items-center gap-2 mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
        <span className="text-sm text-purple-700 dark:text-purple-300">
          Generating research{typingIndicator}
        </span>
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
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
    if (!researchResults.trim() && !isStreaming) {
      return renderEmptyState();
    }

    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {renderThinkingOutput()}

        {researchResults && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // Custom styling for different elements
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-8 mb-6 text-slate-900 dark:text-slate-100">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-slate-700 dark:text-slate-300">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-slate-700 dark:text-slate-300">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 dark:text-slate-400 mb-4">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {researchResults}
          </ReactMarkdown>
        )}

        {renderStreamingIndicator()}
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
            {isStreaming && (
              <Badge variant="default" className="ml-2 bg-purple-500">
                <Sparkles className="w-3 h-3 mr-1" />
                Streaming
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
                disabled={isStreaming}
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
                disabled={isStreaming}
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
            <ScrollArea className="h-full" ref={scrollRef}>
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

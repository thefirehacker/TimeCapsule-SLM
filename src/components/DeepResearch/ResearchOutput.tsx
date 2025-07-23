"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PromptBox, ResearchType } from "@/components/ui/chatgpt-prompt-input";
import { ResearchConfig } from "./hooks/useResearch";
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
  Edit3,
  Save,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ResearchOutputProps {
  researchResults: string;
  thinkingOutput?: string;
  isStreaming?: boolean;
  onClearOutput: () => void;
  onExportResults: () => void;
  onUpdateResults?: (newContent: string) => void;

  // Prompt input props
  prompt: string;
  onPromptChange: (prompt: string) => void;
  researchConfig: ResearchConfig;
  onResearchConfigChange: (config: ResearchConfig) => void;
  onGenerateResearchStream: () => void;
  isGenerating: boolean;
  connectionState: {
    connected: boolean;
    connecting: boolean;
    error: string | null;
    baseURL: string;
    availableModels: string[];
    selectedModel: string;
    lastConnected: Date | null;
  };
}

export function ResearchOutput({
  researchResults,
  thinkingOutput,
  isStreaming = false,
  onClearOutput,
  onExportResults,
  onUpdateResults,
  prompt,
  onPromptChange,
  researchConfig,
  onResearchConfigChange,
  onGenerateResearchStream,
  isGenerating,
  connectionState,
}: ResearchOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [typingIndicator, setTypingIndicator] = useState("");

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    if (scrollRef.current && (isStreaming || researchResults)) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [researchResults, thinkingOutput, isStreaming]);

  // Update edited content when research results change
  useEffect(() => {
    if (!isEditing) {
      setEditedContent(researchResults);
    }
  }, [researchResults, isEditing]);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(researchResults);
  };

  const handleSave = () => {
    if (onUpdateResults) {
      onUpdateResults(editedContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(researchResults);
  };

  const handleResearchTypeChange = (type: ResearchType) => {
    onResearchConfigChange({
      ...researchConfig,
      type,
    });
  };

  const handleDepthChange = (depth: "quick" | "detailed" | "comprehensive") => {
    onResearchConfigChange({
      ...researchConfig,
      depth,
    });
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
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center">
        <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Ready to Research
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          Enter your research question below to get started. I'll analyze your
          query and provide comprehensive insights.
        </p>
      </div>
      {!connectionState.connected && (
        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg max-w-md">
          <p className="text-sm text-orange-700 dark:text-orange-300">
            Connect to Ollama in the sidebar to start researching
          </p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (!researchResults.trim() && !isStreaming) {
      return renderEmptyState();
    }

    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {renderThinkingOutput()}

        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Edit Research Content
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Button>
                <Button size="sm" onClick={handleSave} className="space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
            <Textarea
              ref={textareaRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Edit your research content here..."
              className="min-h-[400px] font-mono text-sm resize-none"
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Action Bar - Only show when there's content */}
      {researchResults && !isEditing && (
        <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-950/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="space-x-1">
                <Brain className="w-3 h-3" />
                <span>{Math.ceil(researchResults.length / 500)} min read</span>
              </Badge>
              {isStreaming && (
                <Badge variant="default" className="bg-purple-500 space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Streaming</span>
                </Badge>
              )}
              {isEditing && (
                <Badge variant="default" className="bg-orange-500 space-x-1">
                  <Edit3 className="w-3 h-3" />
                  <span>Editing</span>
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="space-x-2"
                disabled={isStreaming}
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </Button>

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
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 relative">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="p-8 pb-32">{renderContent()}</div>
        </ScrollArea>

        {/* Floating Prompt Input */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent">
          <div className="max-w-4xl mx-auto">
            <PromptBox
              value={prompt}
              onChange={onPromptChange}
              onSubmit={(promptText, researchType, researchDepth) => {
                onPromptChange(promptText);
                handleResearchTypeChange(researchType);
                handleDepthChange(researchDepth);
                onGenerateResearchStream();
              }}
              selectedResearchType={researchConfig.type}
              onResearchTypeChange={handleResearchTypeChange}
              selectedResearchDepth={researchConfig.depth}
              onResearchDepthChange={handleDepthChange}
              isGenerating={isGenerating}
              disabled={!connectionState.connected}
              placeholder={
                connectionState.connected
                  ? "What would you like to research? Ask anything..."
                  : "Connect to Ollama to start researching..."
              }
              className="shadow-xl border-2 backdrop-blur-sm bg-white/95 dark:bg-slate-950/95"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

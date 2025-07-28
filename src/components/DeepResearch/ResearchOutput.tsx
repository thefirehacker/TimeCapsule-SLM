"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptBox, ResearchType } from "@/components/ui/chatgpt-prompt-input";
import { ResearchConfig } from "./hooks/useResearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  User,
  Bot,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  thinkingOutput?: string;
}

interface ResearchOutputProps {
  researchResults: string;
  thinkingOutput: string;
  isStreaming?: boolean;
  onClearOutput: () => void;
  onExportResults: () => void;
  onUpdateResults: (newContent: string) => void;
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
  onConnectAI?: () => void;

  // RAG Integration
  enableRAG?: boolean;
  onRAGSearch?: (query: string) => Promise<any>;
  showRAGContext?: boolean;

  // Web Search Integration
  webSearchEnabled?: boolean;
  onWebSearch?: (query: string) => Promise<any>;
  webSearchStatus?: {
    configured: boolean;
    lastSearch?: Date | null;
    searchCount?: number;
  };
}

// Separate component for collapsible thinking output
function ThinkingOutput({
  content,
  isStreaming = false,
}: {
  content: string;
  isStreaming?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-3 bg-gradient-to-r from-secondary/40 to-secondary/60 border border-border/60 rounded-lg hover:from-secondary/60 hover:to-secondary/80 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Brain
              className={`w-4 h-4 text-primary ${isStreaming ? "animate-pulse" : ""}`}
            />
            <span className="text-sm font-medium text-foreground">
              AI Thinking Process
            </span>
            {isStreaming && (
              <div className="flex space-x-1">
                <div
                  className="w-1 h-1 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1 h-1 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1 h-1 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-1 rounded-full">
              {content.length.toLocaleString()} chars
            </span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-primary transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-4 h-4 text-primary transition-transform duration-200" />
            )}
          </div>
        </div>
      </button>
      {isExpanded && (
        <div className="mt-2 p-4 bg-secondary/20 border border-border/40 rounded-lg backdrop-blur-sm">
          <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-mono tracking-tight">
            {content}
          </div>
        </div>
      )}
    </div>
  );
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
  onConnectAI,
  // RAG Integration
  enableRAG = false,
  onRAGSearch,
  showRAGContext = false,
  // Web Search Integration
  webSearchEnabled = false,
  onWebSearch,
  webSearchStatus,
}: ResearchOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [typingIndicator, setTypingIndicator] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // Check if user is near bottom of scroll area
  const isNearBottom = () => {
    if (!scrollRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  // Handle user scroll to detect manual scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const isAtBottom = isNearBottom();
    setAutoScroll(isAtBottom);

    // Detect if user is actively scrolling
    setIsUserScrolling(true);
    setTimeout(() => setIsUserScrolling(false), 150);
  };

  // Auto-scroll to bottom only when user is at bottom and not manually scrolling
  useEffect(() => {
    if (autoScroll && !isUserScrolling && !isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, autoScroll, isUserScrolling, isStreaming]);

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

  // Update AI message content
  useEffect(() => {
    if (currentMessageId && researchResults) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === currentMessageId
            ? { ...msg, content: researchResults, thinkingOutput }
            : msg
        )
      );
    }
  }, [researchResults, thinkingOutput, currentMessageId]);

  // Clear current message when streaming stops
  useEffect(() => {
    if (!isStreaming && currentMessageId) {
      setCurrentMessageId(null);
    }
  }, [isStreaming, currentMessageId]);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
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

  const handleSubmit = (
    promptText: string,
    researchType: ResearchType,
    researchDepth: "quick" | "detailed" | "comprehensive",
    ragContext?: any
  ) => {
    // Create messages immediately before the prompt gets cleared
    if (promptText.trim() && !currentMessageId) {
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: promptText.trim(),
        timestamp: new Date(),
      };

      // Add AI message placeholder
      const aiMessageId = `ai-${Date.now()}`;
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        type: "ai",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, aiMessage]);
      setCurrentMessageId(aiMessageId);
    }

    // Update prompt and trigger research
    onPromptChange(promptText);
    handleResearchTypeChange(researchType);
    handleDepthChange(researchDepth);
    onGenerateResearchStream();
  };

  const renderStreamingIndicator = () => {
    if (!isStreaming) return null;

    return (
      <div className="flex items-center gap-2 mt-3 p-3 bg-secondary/30 border border-border rounded-lg">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        <span className="text-sm text-muted-foreground">
          Generating research{typingIndicator}
        </span>
        <div className="flex space-x-1">
          <div
            className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-8">
      <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
        <Brain className="w-12 h-12 text-primary" />
      </div>
      <div className="space-y-3 max-w-md">
        <h3 className="text-2xl font-semibold text-foreground">
          Ready to Research
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Enter your research question below to get started. I'll analyze your
          query and provide comprehensive insights.
        </p>
      </div>
      {!connectionState.connected && (
        <div className="p-6 bg-card border border-border rounded-lg max-w-md space-y-4">
          <div className="flex items-center justify-center gap-2 text-destructive mb-3">
            <Bot className="w-5 h-5" />
            <span className="font-medium">AI Not Connected</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Connect to Ollama to start researching and unlock the full potential
            of AI-powered analysis.
          </p>
          <Button onClick={onConnectAI} className="w-full">
            <Bot className="w-4 h-4 mr-2" />
            Connect AI
          </Button>
        </div>
      )}
    </div>
  );

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.type === "user";
    const isCurrentMessage = message.id === currentMessageId;

    return (
      <div
        key={message.id}
        className={`flex gap-4 p-6 border-b border-border last:border-b-0 ${
          isUser ? "bg-background" : "bg-secondary/20"
        }`}
      >
        <Avatar className="w-10 h-10 flex-shrink-0 border border-border">
          <AvatarImage src={isUser ? undefined : undefined} />
          <AvatarFallback className="text-sm bg-secondary text-secondary-foreground">
            {isUser ? (
              <User className="w-5 h-5" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">
              {isUser ? "You" : "AI Assistant"}
            </span>
            <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="space-y-3">
            {isUser ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground text-base leading-relaxed m-0 p-4 bg-secondary/30 border border-border rounded-lg">
                  {message.content}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {message.thinkingOutput && (
                  <ThinkingOutput
                    content={message.thinkingOutput}
                    isStreaming={isCurrentMessage && isStreaming}
                  />
                )}
                {message.content && (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
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
                            <code
                              className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        h1: ({ children }) => (
                          <h1 className="text-xl font-bold mt-6 mb-4 text-foreground border-b border-border pb-2">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-base font-semibold mt-4 mb-2 text-foreground">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-4 text-foreground leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-foreground leading-relaxed">
                            {children}
                          </li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4 bg-muted/30 py-2 rounded-r-lg">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-primary hover:underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto mb-4">
                            <table className="min-w-full border border-border rounded-lg">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-border px-4 py-2 text-foreground">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
                {isCurrentMessage && isStreaming && renderStreamingIndicator()}

                {/* Action buttons for AI messages */}
                {message.content && !isCurrentMessage && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(message.content)}
                      className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                      className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                      disabled={isStreaming}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const blob = new Blob([message.content], {
                          type: "text/markdown",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `research-${new Date().toISOString().split("T")[0]}.md`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                      disabled={isStreaming}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (messages.length === 0 && !isStreaming) {
      return renderEmptyState();
    }

    return (
      <div className="divide-y divide-border">
        {messages.map(renderMessage)}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Action Bar - Only show when there's content */}
      {messages.length > 0 && !isEditing && (
        <div className="border-b border-border p-4 bg-background/95 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="space-x-1">
                <Brain className="w-3 h-3" />
                <span>{messages.length} messages</span>
              </Badge>
              {isStreaming && (
                <Badge
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Streaming</span>
                </Badge>
              )}
              {isEditing && (
                <Badge
                  variant="default"
                  className="bg-orange-600 hover:bg-orange-700 space-x-1"
                >
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
                onClick={() => handleCopy(researchResults)}
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

      {/* Chat Messages Area */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="h-full overflow-y-auto overflow-x-hidden"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="pb-32 px-6">{renderContent()}</div>
        </div>

        {/* Auto-scroll indicator */}
        {!autoScroll && messages.length > 0 && (
          <div className="absolute bottom-4 right-4 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                  setAutoScroll(true);
                }
              }}
              className="shadow-lg backdrop-blur-sm bg-background/90 border-2 hover:bg-secondary/80"
            >
              <ChevronDown className="w-4 h-4 mr-2" />
              Scroll to bottom
            </Button>
          </div>
        )}
      </div>

      {/* Fixed Prompt Input at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background via-background/98 to-transparent pt-8 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <PromptBox
            value={prompt}
            onChange={onPromptChange}
            onSubmit={handleSubmit}
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
            compact={messages.length > 0}
            className="shadow-2xl border-2 backdrop-blur-sm bg-background/98 transition-all duration-300"
            // RAG Integration
            enableRAG={enableRAG}
            onRAGSearch={onRAGSearch}
            showRAGContext={showRAGContext}
            // Web Search Integration
            webSearchEnabled={webSearchEnabled}
            onWebSearch={onWebSearch}
            webSearchStatus={webSearchStatus}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  FileText,
  BookOpen,
  StickyNote,
  Trash2,
  Star,
  CheckCircle2,
  AlertCircle,
  Info,
  Download,
  Eye,
  Edit3,
  Save,
} from "lucide-react";

interface ResearchOutputProps {
  researchResults: string;
  currentTab: "research" | "sources" | "notes";
  onTabChange: (tab: "research" | "sources" | "notes") => void;
  onClearOutput: () => void;
}

export function ResearchOutput({
  researchResults,
  currentTab,
  onTabChange,
  onClearOutput,
}: ResearchOutputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState("");

  // Initialize editable content when research results change
  useEffect(() => {
    if (researchResults && !isEditing) {
      const htmlContent = convertMarkdownToHTML(researchResults);
      setEditableContent(htmlContent);
    }
  }, [researchResults, isEditing]);

  const handleEditToggle = () => {
    if (!isEditing) {
      // Entering edit mode - initialize content
      const htmlContent = researchResults
        ? convertMarkdownToHTML(researchResults)
        : "";
      setEditableContent(htmlContent);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you could call a callback to save the content
    // For now, we'll just exit edit mode
    setIsEditing(false);
  };

  const handleContentChange = (content: string) => {
    setEditableContent(content);
  };
  const convertMarkdownToHTML = (content: string) => {
    if (!content) return "";

    // Convert markdown to HTML for the rich text editor
    let html = content
      // Headers
      .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")

      // Bold and italic
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")

      // Strikethrough
      .replace(/~~(.*?)~~/g, "<s>$1</s>")

      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")

      // Math equations
      .replace(/\$\$([^$]+)\$\$/g, '<span class="math-formula">$1</span>')
      .replace(/\\\[(.*?)\\\]/g, '<span class="math-formula">$1</span>')
      .replace(/\\\((.*?)\\\)/g, '<span class="math-formula">$1</span>')

      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")

      // Blockquotes
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")

      // Lists - handle nested structure
      .replace(/^(\s*)- (.*$)/gim, "<li>$2</li>")
      .replace(/^(\s*)\d+\. (.*$)/gim, "<li>$2</li>")

      // Horizontal rules
      .replace(/^---$/gim, "<hr>")
      .replace(/^\*\*\*$/gim, "<hr>")

      // Line breaks and paragraphs
      .replace(/\n\n/g, "</p><p>")
      .replace(/^\n/g, "<p>")
      .replace(/\n$/g, "</p>");

    // Wrap in paragraph tags if not already wrapped
    if (!html.startsWith("<") && html.trim()) {
      html = `<p>${html}</p>`;
    }

    // Clean up any double paragraph tags
    html = html.replace(/<p><\/p>/g, "");

    return html;
  };

  const renderEmptyState = () => (
    <div className="flex items-start justify-cen h-full">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full">
              <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl text-slate-900 dark:text-slate-100">
            Welcome to Deep Research Studio
          </CardTitle>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Your AI-powered research companion with rich text editing, math
            equations, and professional formatting
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  Quick Start Guide
                </h4>
              </div>
              <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
                    1
                  </span>
                  Connect to your AI provider
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
                    2
                  </span>
                  Add research topics
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
                    3
                  </span>
                  Configure research parameters
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
                    4
                  </span>
                  Generate comprehensive research
                </li>
              </ol>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">
                  Key Features
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Rich Text Editor with Toolbar
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Math Equations & Code Highlighting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Image Upload & Tables
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Professional Markdown Output
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Export & Edit Capabilities
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Info className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                Available Research Types
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {[
                { type: "📚 Academic", desc: "Scholarly research" },
                { type: "📈 Market", desc: "Industry analysis" },
                { type: "⚙️ Technology", desc: "Technical deep-dive" },
                { type: "🏆 Competitive", desc: "Competition study" },
                { type: "📊 Trend", desc: "Pattern analysis" },
                { type: "📖 Literature", desc: "Content review" },
              ].map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="justify-start p-2 h-auto"
                >
                  <div className="text-left">
                    <div className="font-medium text-purple-700 dark:text-purple-300">
                      {item.type}
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">
                      {item.desc}
                    </div>
                  </div>
                </Badge>
              ))}
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="h-full border-0 shadow-lg">
        <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Research Output
              {isEditing && (
                <Badge variant="outline" className="ml-2">
                  Editing
                </Badge>
              )}
            </CardTitle>
            {researchResults && (
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={handleEditToggle}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                <Button
                  onClick={onClearOutput}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0 h-[calc(100%-4rem)]">
          {!researchResults ? (
            renderEmptyState()
          ) : (
            <Tabs
              value={currentTab}
              onValueChange={(value) => onTabChange(value as typeof currentTab)}
              className="h-full flex flex-col"
            >
              <div className="px-6 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800">
                  <TabsTrigger
                    value="research"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Research
                  </TabsTrigger>
                  <TabsTrigger
                    value="sources"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Sources
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="flex items-center gap-2"
                  >
                    <StickyNote className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="research" className="h-full m-0">
                  <div className="h-full p-6">
                    <RichTextEditor
                      key={isEditing ? "editing" : "viewing"} // Force re-mount when mode changes
                      content={
                        isEditing
                          ? editableContent || "<p>Start writing here...</p>"
                          : convertMarkdownToHTML(researchResults || "")
                      }
                      onChange={isEditing ? handleContentChange : undefined}
                      editable={isEditing}
                      className="min-h-[600px]"
                      placeholder={
                        isEditing
                          ? "Start typing your content here..."
                          : researchResults
                          ? "Click Edit to modify the content..."
                          : "Research results will appear here..."
                      }
                    />
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                          Research Sources & Methodology
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                          This research was generated using AI analysis and
                          synthesis, combining general knowledge with your
                          uploaded document knowledge base.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Methodology
                          </h3>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            Our AI research methodology employs advanced
                            language models to analyze, synthesize, and generate
                            comprehensive insights from multiple data sources
                            and knowledge bases.
                          </p>
                        </Card>

                        <Card className="p-4">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                            Source Categories
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                icon: "🧠",
                                title: "AI Knowledge Base",
                                desc: "Core training data and reasoning capabilities",
                              },
                              {
                                icon: "📚",
                                title: "Academic Literature",
                                desc: "Scholarly articles and research papers",
                              },
                              {
                                icon: "📊",
                                title: "Industry Reports",
                                desc: "Market analysis and industry publications",
                              },
                              {
                                icon: "⚙️",
                                title: "Technical Documentation",
                                desc: "Specifications and whitepapers",
                              },
                              {
                                icon: "📄",
                                title: "Uploaded Documents",
                                desc: "User-provided materials with direct content extraction",
                              },
                            ].map((source, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                              >
                                <span className="text-lg">{source.icon}</span>
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-slate-100">
                                    {source.title}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {source.desc}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>

                        <Card className="p-4 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
                          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Important Notice
                          </h3>
                          <p className="text-sm text-amber-800 dark:text-amber-200">
                            This AI-generated research should be used as a
                            starting point for further investigation and
                            verified independently for critical applications.
                          </p>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="notes" className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                          Research Notes & Analytics
                        </h2>
                      </div>

                      <div className="grid gap-4">
                        <Card className="p-4">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                            Research Parameters
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">
                                Generated:
                              </span>
                              <Badge variant="outline">
                                {new Date().toLocaleString()}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">
                                Status:
                              </span>
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-200"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Complete
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600 dark:text-slate-400">
                                Format:
                              </span>
                              <Badge variant="outline">Markdown Enhanced</Badge>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                            Action Items
                          </h3>
                          <div className="space-y-2">
                            {[
                              "Review and validate key findings",
                              "Conduct additional research on specific areas",
                              "Share results with stakeholders",
                              "Plan follow-up research phases",
                              "Export results for archival purposes",
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
                              >
                                <input
                                  type="checkbox"
                                  className="rounded border-slate-300"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Card>

                        <Card className="p-4 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Research Enhancement Tips
                          </h3>
                          <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span>
                                <strong>Add Documents:</strong> Upload relevant
                                PDFs, Word docs, or text files to enhance
                                analysis
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span>
                                <strong>Multiple Perspectives:</strong> Include
                                documents from various sources and viewpoints
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span>
                                <strong>Current Information:</strong> Add recent
                                reports or articles for up-to-date insights
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span>
                                <strong>Cross-Reference:</strong> Verify
                                findings across multiple sources for accuracy
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          )}
        </CardContent>

        {researchResults && (
          <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>
                  Research generated • {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-3 w-3" />
                <span>Use Export options to save your research</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Maximize2,
  Minimize2,
  Loader2,
  X,
} from "lucide-react";

interface ResearchOutputProps {
  researchResults: string;
  currentTab: "research" | "sources" | "notes";
  onTabChange: (tab: "research" | "sources" | "notes") => void;
  onClearOutput: () => void;
  aiAssistant?: any; // For summarization
}

export function ResearchOutput({
  researchResults,
  currentTab,
  onTabChange,
  onClearOutput,
  aiAssistant,
}: ResearchOutputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  
  // Summarization state
  const [summarizationLevel, setSummarizationLevel] = useState<'none' | 'brief' | 'moderate' | 'concise'>('none');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [summarizedContent, setSummarizedContent] = useState<string>("");
  const [showSummaryControls, setShowSummaryControls] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Initialize editable content when research results change
  useEffect(() => {
    console.log(`🔍 DEBUG: ResearchOutput received researchResults:`, {
      hasResults: !!researchResults,
      length: researchResults?.length || 0,
      preview: researchResults?.substring(0, 200) + '...',
      isEditing
    });
    
    if (researchResults && !isEditing) {
      const htmlContent = formatMarkdownToHTML(researchResults);
      setEditableContent(htmlContent);
      
      // Auto-show summary controls if content is long (>10,000 characters)
      if (researchResults.length > 10000) {
        setShowSummaryControls(true);
      }
      
      // Store original content and reset summarization state
      setOriginalContent(researchResults);
      setSummarizedContent("");
      setSummarizationLevel('none');
    }
  }, [researchResults, isEditing]);

  const handleEditToggle = () => {
    if (!isEditing) {
      // Entering edit mode - initialize content
      const htmlContent = researchResults
        ? formatMarkdownToHTML(researchResults)
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

  // Summarization functionality
  const handleSummarization = async (level: 'brief' | 'moderate' | 'concise') => {
    if (!aiAssistant || !originalContent) {
      console.warn('AI Assistant not available or no content to summarize');
      return;
    }

    setIsSummarizing(true);
    setSummarizationLevel(level);

    try {
      const summarizationPrompts = {
        brief: {
          instruction: 'Create a brief summary that captures the key points and essential information',
          targetReduction: 0.3,
          preserveElements: ['main headings', 'critical code blocks', 'important conclusions']
        },
        moderate: {
          instruction: 'Create a moderate summary that maintains important details and examples',
          targetReduction: 0.6,
          preserveElements: ['headings', 'code blocks', 'key examples', 'important lists', 'conclusions']
        },
        concise: {
          instruction: 'Create a very concise summary with only the most essential information',
          targetReduction: 0.2,
          preserveElements: ['main headings', 'critical code blocks', 'key conclusions']
        }
      };

      const config = summarizationPrompts[level];
      const targetLength = Math.round(originalContent.length * config.targetReduction);

      const prompt = `You are an expert content summarizer. Create a ${level} summary of the following research content.

## Instructions:
- ${config.instruction}
- Target length: approximately ${targetLength} characters (${Math.round(targetLength/5)} words)
- Preserve: ${config.preserveElements.join(', ')}
- Maintain the original markdown structure and formatting
- Keep all essential code examples and technical details
- Remove redundant explanations and verbose descriptions
- Ensure the summary is complete and self-contained

## Content to Summarize:
${originalContent}

## ${level.charAt(0).toUpperCase() + level.slice(1)} Summary:`;

      const summarized = await aiAssistant.generateContent(prompt, 'research');
      setSummarizedContent(summarized);
      
      // Update the display content
      const htmlContent = formatMarkdownToHTML(summarized);
      setEditableContent(htmlContent);

      console.log(`✅ Summarization completed`, {
        level,
        originalLength: originalContent.length,
        summarizedLength: summarized.length,
        reductionAchieved: Math.round((1 - summarized.length / originalContent.length) * 100) + '%'
      });

    } catch (error) {
      console.error('❌ Summarization failed:', error);
      // Reset to original content on error
      setSummarizationLevel('none');
      const htmlContent = formatMarkdownToHTML(originalContent);
      setEditableContent(htmlContent);
    } finally {
      setIsSummarizing(false);
    }
  };

  const resetToOriginal = () => {
    setSummarizationLevel('none');
    setSummarizedContent("");
    const htmlContent = formatMarkdownToHTML(originalContent);
    setEditableContent(htmlContent);
  };

  const toggleSummaryControls = () => {
    setShowSummaryControls(!showSummaryControls);
  };

  // Utility function for markdown to HTML conversion
  const formatMarkdownToHTML = (markdown: string): string => {
    let html = markdown;

    // Convert headers
    html = html.replace(
      /^#{6}\s(.+)$/gm,
      '<h6 style="color: #4facfe; margin: 20px 0 10px 0; font-weight: 600; font-size: 14px;">$1</h6>'
    );
    html = html.replace(
      /^#{5}\s(.+)$/gm,
      '<h5 style="color: #4facfe; margin: 20px 0 10px 0; font-weight: 600; font-size: 16px;">$1</h5>'
    );
    html = html.replace(
      /^#{4}\s(.+)$/gm,
      '<h4 style="color: #4facfe; margin: 20px 0 10px 0; font-weight: 600; font-size: 18px;">$1</h4>'
    );
    html = html.replace(
      /^#{3}\s(.+)$/gm,
      '<h3 style="color: #4facfe; margin: 25px 0 15px 0; font-weight: 700; font-size: 20px;">$1</h3>'
    );
    html = html.replace(
      /^#{2}\s(.+)$/gm,
      '<h2 style="color: #00f2fe; margin: 30px 0 20px 0; font-weight: 700; font-size: 24px;">$1</h2>'
    );
    html = html.replace(
      /^#{1}\s(.+)$/gm,
      '<h1 style="color: #00f2fe; margin: 30px 0 20px 0; font-weight: 800; font-size: 28px; border-bottom: 2px solid rgba(79, 172, 254, 0.3); padding-bottom: 10px;">$1</h1>'
    );

    // Convert bold text
    html = html.replace(
      /\*\*(.+?)\*\*/g,
      '<strong style="color: #4facfe; font-weight: 600;">$1</strong>'
    );

    // Convert italic text
    html = html.replace(
      /\*(.+?)\*/g,
      '<em style="color: rgba(255, 255, 255, 0.8); font-style: italic;">$1</em>'
    );

    // Convert unordered lists
    html = html.replace(
      /^[\s]*[-*+]\s(.+)$/gm,
      '<li style="margin: 5px 0; color: rgba(255, 255, 255, 0.9);">$1</li>'
    );

    // Convert ordered lists
    html = html.replace(
      /^[\s]*\d+\.\s(.+)$/gm,
      '<li style="margin: 5px 0; color: rgba(255, 255, 255, 0.9);">$1</li>'
    );

    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/(<li[^>]*>.*?<\/li>[\s\S]*?)+/g, (match) => {
      if (match.includes("- ") || match.includes("* ") || match.includes("+ ")) {
        return `<ul style="margin: 15px 0; padding-left: 20px; list-style-type: disc;">${match}</ul>`;
      } else {
        return `<ol style="margin: 15px 0; padding-left: 20px; list-style-type: decimal;">${match}</ol>`;
      }
    });

    // Convert code blocks
    html = html.replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```/g, "").trim();
      return `<pre style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 15px; margin: 15px 0; overflow-x: auto; font-family: 'Monaco', 'Menlo', monospace; font-size: 13px; color: #a8f7a8;"><code>${code}</code></pre>`;
    });

    // Convert inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; padding: 2px 6px; font-family: Monaco, Menlo, monospace; font-size: 12px; color: #a8f7a8;">$1</code>'
    );

    // Convert line breaks
    html = html.replace(
      /\n\n/g,
      '</p><p style="margin: 15px 0; color: rgba(255, 255, 255, 0.9); line-height: 1.8;">'
    );
    html = html.replace(/\n/g, "<br/>");

    // Wrap in paragraph tags
    html = `<p style="margin: 15px 0; color: rgba(255, 255, 255, 0.9); line-height: 1.8;">${html}</p>`;

    // Convert blockquotes
    html = html.replace(
      /^>\s(.+)$/gm,
      '<blockquote style="border-left: 4px solid #4facfe; margin: 20px 0; padding: 15px 20px; background: rgba(79, 172, 254, 0.1); color: rgba(255, 255, 255, 0.8); font-style: italic;">$1</blockquote>'
    );

    // Convert tables (basic support)
    html = html.replace(/\|(.+?)\|/g, (match) => {
      const cells = match.split("|").filter((cell) => cell.trim());
      const tableCells = cells
        .map(
          (cell) =>
            `<td style="padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">${cell.trim()}</td>`
        )
        .join("");
      return `<tr>${tableCells}</tr>`;
    });

    // Simple table wrapping
    if (html.includes("<tr>")) {
      html = html.replace(
        /(<tr>.*?<\/tr>)/g,
        '<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">$1</table>'
      );
    }

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
            <div className="grid grid-cols-1 gap-2 text-sm">
              {[
                { type: "🔬 Deep Research", desc: "AI-powered intent-based research that adapts to your specific goals" },
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
              {summarizationLevel !== 'none' && (
                <Badge variant="outline" className="ml-2 text-purple-600 border-purple-200">
                  {summarizationLevel.charAt(0).toUpperCase() + summarizationLevel.slice(1)} Summary
                </Badge>
              )}
            </CardTitle>
            {researchResults && (
              <div className="flex items-center gap-2">
                {/* Summarization Toggle */}
                {originalContent.length > 5000 && typeof window !== 'undefined' && (
                  <Button
                    onClick={toggleSummaryControls}
                    variant="outline"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 border-purple-200 hover:border-purple-300"
                  >
                    {showSummaryControls ? <Minimize2 className="h-4 w-4 mr-1" /> : <Maximize2 className="h-4 w-4 mr-1" />}
                    {showSummaryControls ? 'Hide' : 'Summary'}
                  </Button>
                )}
                
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
                  onClick={() => setIsFullScreen(true)}
                  variant="outline"
                  size="sm"
                  className="text-slate-600 hover:text-slate-700 border-slate-200 hover:border-slate-300"
                >
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Full Screen
                </Button>
                
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
          
          {/* Summarization Controls */}
          {showSummaryControls && researchResults && aiAssistant && typeof window !== 'undefined' && (
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  Report Length Control
                </Label>
                <div className="flex items-center gap-2 text-xs text-purple-700 dark:text-purple-300">
                  <span>Original: {Math.round(originalContent.length / 1000)}k chars</span>
                  {summarizedContent && (
                    <span>• Current: {Math.round(summarizedContent.length / 1000)}k chars</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-xs text-purple-600 dark:text-purple-400">
                    <span>Concise</span>
                    <span>Brief</span>
                    <span>Moderate</span>
                    <span>Full</span>
                  </div>
                  <div className="relative">
                    {/* Custom Range Input */}
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="1"
                      value={
                        summarizationLevel === 'concise' ? 0 :
                        summarizationLevel === 'brief' ? 1 :
                        summarizationLevel === 'moderate' ? 2 : 3
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value === 0) handleSummarization('concise');
                        else if (value === 1) handleSummarization('brief');
                        else if (value === 2) handleSummarization('moderate');
                        else resetToOriginal();
                      }}
                      disabled={isSummarizing}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer dark:bg-purple-700 disabled:opacity-50"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #a855f7 33%, #c084fc 66%, #e9d5ff 100%)`
                      }}
                    />
                  </div>
                </div>
                
                {isSummarizing && (
                  <div className="flex items-center gap-2 text-purple-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Summarizing...</span>
                  </div>
                )}
                
                {summarizationLevel !== 'none' && !isSummarizing && (
                  <Button
                    onClick={resetToOriginal}
                    variant="outline"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 border-purple-200 hover:border-purple-300"
                  >
                    Reset to Full
                  </Button>
                )}
              </div>
              
              <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                <p>
                  <strong>💡 Smart Summarization:</strong> AI preserves key information, code examples, and important conclusions while reducing length.
                  {summarizationLevel !== 'none' && summarizedContent && (
                    <span className="ml-2 font-medium">
                      Reduced by {Math.round((1 - summarizedContent.length / originalContent.length) * 100)}%
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
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
                            : editableContent || formatMarkdownToHTML(researchResults || "")
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

      {/* Full Screen Modal */}
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-[98vw] max-h-[98vh] h-[98vh] w-[98vw] p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Research Output - Full Screen
                {summarizationLevel !== 'none' && (
                  <Badge variant="outline" className="ml-2 text-purple-600 border-purple-200">
                    {summarizationLevel.charAt(0).toUpperCase() + summarizationLevel.slice(1)} Summary
                  </Badge>
                )}
              </DialogTitle>
              <div className="flex items-center gap-2">
                {/* Mini Summary Controls in Full Screen */}
                {originalContent.length > 5000 && aiAssistant && (
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-slate-600 dark:text-slate-400">Length:</Label>
                    <select
                      value={summarizationLevel}
                      onChange={(e) => {
                        const value = e.target.value as typeof summarizationLevel;
                        if (value === 'none') resetToOriginal();
                        else handleSummarization(value as 'brief' | 'moderate' | 'concise');
                      }}
                      disabled={isSummarizing}
                      className="text-sm border border-slate-200 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      <option value="concise">Concise</option>
                      <option value="brief">Brief</option>
                      <option value="moderate">Moderate</option>
                      <option value="none">Full</option>
                    </select>
                    {isSummarizing && (
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    )}
                  </div>
                )}
                <Button
                  onClick={() => setIsFullScreen(false)}
                  variant="outline"
                  size="sm"
                  className="text-slate-600 hover:text-slate-700"
                >
                  <Minimize2 className="h-4 w-4 mr-1" />
                  Exit Full Screen
                </Button>
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="flex-1 p-6">
            <RichTextEditor
              content={editableContent || formatMarkdownToHTML(researchResults || "")}
              onChange={undefined}
              editable={false}
              className="min-h-[calc(95vh-8rem)]"
              placeholder="Research results will appear here..."
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

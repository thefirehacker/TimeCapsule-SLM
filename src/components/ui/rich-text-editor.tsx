"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { StarterKit } from "@tiptap/starter-kit";
import { Mathematics } from "@tiptap/extension-mathematics";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { createLowlight } from "lowlight";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Palette,
  Download,
  Copy,
  Calculator,
} from "lucide-react";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "katex/dist/katex.min.css";

// Configure lowlight for code highlighting
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import markdown from "highlight.js/lib/languages/markdown";

// Create and configure lowlight
const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("json", json);
lowlight.register("sql", sql);
lowlight.register("markdown", markdown);

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  placeholder?: string;
  className?: string;
  format?: 'markdown' | 'html';
}

export function RichTextEditor({
  content,
  onChange,
  editable = true,
  placeholder = "Start typing...",
  className = "",
  format = 'html',
}: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert markdown to HTML if format is markdown
  const htmlContent = useMemo(() => {
    if (format === 'markdown' && content) {
      return markdownToHtml(content);
    }
    return content;
  }, [content, format]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      Mathematics,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg shadow-md",
        },
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class:
            "border-collapse border border-slate-300 dark:border-slate-700",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-slate-300 dark:border-slate-700",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class:
            "border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-semibold p-2",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-slate-300 dark:border-slate-700 p-2",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class:
            "bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300",
        },
      }),
      TextStyle,
      Color,
    ],
    content: htmlContent || (editable ? "<p></p>" : ""),
    editable,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-slate dark:prose-invert max-w-none min-h-[500px] p-4 focus:outline-none ${className}`,
      },
    },
  });

  // Track transitioning state to prevent race conditions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update editable state when prop changes
  useEffect(() => {
    if (editor) {
      // Mark as transitioning to block other operations
      setIsTransitioning(true);
      editor.setEditable(editable);

      // Wait for transition to complete (increased to 100ms for safety)
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }
  }, [editor, editable]);

  // Focus the editor when it becomes editable
  useEffect(() => {
    if (editor && editable && !isTransitioning) {
      // Small delay to ensure the editor is ready
      setTimeout(() => {
        if (editor && !editor.isDestroyed) {
          editor.commands.focus();
        }
      }, 100);
    }
  }, [editor, editable, isTransitioning]);

  // Update content when prop changes (with enhanced race condition prevention)
  useEffect(() => {
    if (!editor || isTransitioning) return; // Block during transitions

    // Double-check editor state hasn't been destroyed
    if (editor.isDestroyed) return;

    // Prevent content updates during editable state transitions
    const isEditableTransitioning = editor.isEditable !== editable;
    if (isEditableTransitioning) {
      // Wait for editable state to stabilize first
      return;
    }

    if (htmlContent !== editor.getHTML()) {
      // Increased delay from 0ms to 50ms for better DOM stability
      setTimeout(() => {
        // Enhanced safety checks before content update
        if (editor && !editor.isDestroyed && !isTransitioning) {
          // Check if editor view is still valid
          if (editor.view && !editor.view.isDestroyed) {
            editor.commands.setContent(htmlContent || (editable ? "<p></p>" : ""));
          }
        }
      }, 50);
    }
  }, [editor, htmlContent, editable, isTransitioning]);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && editor) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          editor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  const handleImageUrlAdd = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  }, [imageUrl, editor]);

  const handleLinkAdd = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
  }, [linkUrl, editor]);

  const handleMathFormula = useCallback(() => {
    if (editor) {
      const formula = prompt("Enter LaTeX formula:");
      if (formula) {
        editor.chain().focus().insertContent(`$$${formula}$$`).run();
      }
    }
  }, [editor]);

  const exportAsMarkdown = useCallback(() => {
    if (editor) {
      // Convert HTML to markdown (simplified)
      const html = editor.getHTML();
      const markdown = html
        .replace(/<h1[^>]*>/g, "# ")
        .replace(/<h2[^>]*>/g, "## ")
        .replace(/<h3[^>]*>/g, "### ")
        .replace(/<\/h[1-6]>/g, "\n\n")
        .replace(/<strong[^>]*>/g, "**")
        .replace(/<\/strong>/g, "**")
        .replace(/<em[^>]*>/g, "*")
        .replace(/<\/em>/g, "*")
        .replace(/<code[^>]*>/g, "`")
        .replace(/<\/code>/g, "`")
        .replace(/<ul[^>]*>/g, "")
        .replace(/<\/ul>/g, "\n")
        .replace(/<li[^>]*>/g, "- ")
        .replace(/<\/li>/g, "\n")
        .replace(/<ol[^>]*>/g, "")
        .replace(/<\/ol>/g, "\n")
        .replace(/<p[^>]*>/g, "")
        .replace(/<\/p>/g, "\n\n")
        .replace(/<br[^>]*>/g, "\n")
        .replace(/<[^>]*>/g, "")
        .trim();

      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "research-output.md";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [editor]);

  const copyToClipboard = useCallback(() => {
    if (editor) {
      navigator.clipboard.writeText(editor.getText());
    }
  }, [editor]);

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      if (editor && !editor.isDestroyed) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Toolbar */}
      {editable && (
        <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Text formatting */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                  editor.isActive("bold")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Bold (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                  editor.isActive("italic")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Italic (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={
                  editor.isActive("strike")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={
                  editor.isActive("code")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Inline Code"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>

            {/* Headings */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 })
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 })
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 })
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </div>

            {/* Lists */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                  editor.isActive("bulletList")
                    ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                  editor.isActive("orderedList")
                    ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={
                  editor.isActive("blockquote")
                    ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
                title="Blockquote"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </div>

            {/* Advanced features */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMathFormula}
                className="hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:text-amber-700 dark:hover:text-amber-300 transition-all duration-200"
                title="Insert Math Formula"
              >
                <Calculator className="h-4 w-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-emerald-100 dark:hover:bg-emerald-900/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200"
                    title="Insert Image"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-xl rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="image-url"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Image URL
                      </Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="image-url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={handleImageUrlAdd}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="image-upload"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Upload Image
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-cyan-100 dark:hover:bg-cyan-900/50 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all duration-200"
                    title="Insert Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-xl rounded-lg">
                  <div className="space-y-3">
                    <Label
                      htmlFor="link-url"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Link URL
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="link-url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={handleLinkAdd}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                className="hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200"
                title="Insert Table"
              >
                <TableIcon className="h-4 w-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-pink-100 dark:hover:bg-pink-900/50 hover:text-pink-700 dark:hover:text-pink-300 transition-all duration-200"
                    title="Text Color"
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-xl rounded-lg">
                  <div className="space-y-3">
                    <Label
                      htmlFor="text-color"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Text Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-8 rounded cursor-pointer"
                      />
                      <Button
                        size="sm"
                        onClick={() =>
                          editor.chain().focus().setColor(textColor).run()
                        }
                        className="bg-pink-600 hover:bg-pink-700 text-white flex-1"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* History */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="hover:bg-orange-100 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="hover:bg-orange-100 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-transparent"
                title="Redo (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export toolbar for read-only mode */}
      {!editable && (
        <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={exportAsMarkdown}
                className="hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                title="Export as Markdown"
              >
                <Download className="h-4 w-4 mr-2" />
                Export MD
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200"
                title="Copy to Clipboard"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Text
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="relative">
        <EditorContent editor={editor} />

        {/* Bubble Menu for text selection */}
        {editable && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: "top",
              hideOnClick: true,
              interactive: true,
            }}
          >
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={
                  editor.isActive("bold")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={
                  editor.isActive("italic")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={
                  editor.isActive("strike")
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                }
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </div>
          </BubbleMenu>
        )}

        {/* Floating Menu for empty lines */}
        {editable && (
          <FloatingMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              placement: "left",
              offset: [0, 0],
              hideOnClick: true,
              interactive: true,
            }}
          >
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 shadow-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200"
                title="Add Heading"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200"
                title="Add List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                title="Add Code Block"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>
          </FloatingMenu>
        )}
      </div>
    </div>
  );
}

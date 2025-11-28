"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VectorStoreInitModal from "@/components/VectorStoreInitModal";
import {
  Network,
  Layers,
  Edit3,
  Target,
  Plus,
  Database,
  MessageCircle,
  Bot,
  Eye,
  Settings,
  RefreshCcw,
  Save,
  BookOpen,
  Upload,
  FileText,
  Package,
  Search,
  Download,
  Printer,
  Trash2,
  X,
  Loader2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Plug,
  Edit,
  Sparkles,
  Copy,
  AlertTriangle,
} from "lucide-react";

// Import VectorStore and providers
import { VectorStore } from "../../components/VectorStore/VectorStore";
import { useVectorStore } from "../../components/providers/VectorStoreProvider";
import { usePageAnalytics } from "@/components/analytics/Analytics";
import { useDocuments } from "@/components/DeepResearch/hooks/useDocuments";

// Import Graph Integration (keeping in src/components/ai-graphs)
import { FrameGraphIntegration } from "@/components/ai-graphs";

// Import Metadata Management
import { BubblSpaceDialog } from "@/components/ui/bubblspace-dialog";
import { TimeCapsuleDialog } from "@/components/ui/timecapsule-dialog";
import { SafeImportDialog } from "@/components/ui/safe-import-dialog";
import { ChapterDialog } from "@/components/ai-graphs/chapter-dialog";
import { KnowledgeBaseSection } from "@/components/ui/knowledge-base-section";
import { AIFlowBuilderPanel } from "./components/AIFlowBuilderPanel";
import { SessionContinuationDialog } from "./components/SessionContinuationDialog";
import { TimeCapsuleSelector } from "./components/TimeCapsuleSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getMetadataManager, MetadataManager } from "@/lib/MetadataManager";
import {
  getGraphStorageManager,
  GraphStorageManager,
} from "@/lib/GraphStorageManager";
import { useTimeCapsule } from "./hooks/useTimeCapsule";
import {
  BubblSpace,
  TimeCapsuleMetadata,
  EnhancedTimeCapsule,
  ImportOptions,
  ImportResult,
  MetadataUtils,
} from "@/types/timecapsule";
import { debugFrames, debugStorage, debugSync } from "@/lib/debugUtils";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "@/components/ui/sign-in";
import { TIMECAPSULE_VERSION } from "@/lib/version";

// Import NEW MODULAR COMPONENTS
import {
  AIFrame,
  GraphState,
  generateFrameId,
  loadFramesFromKnowledgeBase,
  getTimeCapsuleCombinedData,
  setTimeCapsuleCombinedData,
  DEFAULT_FRAME,
  exportFramesToJson,
  importFramesFromJson,
} from "./index";
import type { Chapter } from "./types/frames";

// UNIFIED: Replace old fragmented storage with unified system
import { useUnifiedStorage } from "./hooks/useUnifiedStorage";
import { useAIFlowBuilder, PlannerChapter } from "./hooks/useAIFlowBuilder";
import type { UnifiedAIFrame } from "./lib/unifiedStorage";
import type { FlowGeneratedFrame } from "@/lib/multi-agent/interfaces/Context";
import {
  buildFrameAttachment,
  makeAttachmentInstanceId,
} from "./lib/attachmentUtils";
import { ChunkViewerModal } from "@/components/shared/ChunkViewerModal";
import { getBuildEnv, isLocalBuildEnv } from "./utils/buildEnv";

interface FrameCreationData {
  goal: string;
  videoUrl: string;
  startTime?: number;
  duration?: number;
  contentType?: "video" | "pdf" | "text";
  title?: string;
  pdfUrl?: string;
  pdfPages?: string;
  pdfNotes?: string;
  textContent?: string;
  textNotes?: string;
}

interface CreateFrameOptions {
  title?: string;
  goal?: string;
  chapterId?: string;
  selectFrame?: boolean;
}

const DEFAULT_CHAPTER_COLOR = "#3B82F6";
const EMPTY_CHAPTER_FORM: {
  title: string;
  description: string;
  color: string;
  conceptIds: string[];
  linkSequentially: boolean;
} = {
  title: "",
  description: "",
  color: DEFAULT_CHAPTER_COLOR,
  conceptIds: [],
  linkSequentially: false,
};

const EXPORT_BRAND_URL = "https://timecapsule.bubblspace.com";

type PrintableFrameSummary = {
  title: string;
  goal?: string;
  context?: string;
  takeaways?: string;
  notes?: string;
  concepts?: string[];
  attachments?: PrintableAttachmentSummary[];
};

type PrintableChapterSummary = {
  title: string;
  description?: string;
  frames: PrintableFrameSummary[];
  index: number;
};

interface FramesExportPayload {
  title: string;
  subtitle: string;
  stats: {
    frames: number;
    chapters: number;
    concepts: number;
  };
  chapters: PrintableChapterSummary[];
  standaloneFrames: PrintableFrameSummary[];
  includeGraph: boolean;
  graphEdges: Array<{ source: string; target: string }>;
  generatedAt: string;
}

type PrintableAttachmentSummary = {
  title: string;
  type?: string;
  source?: string;
  description?: string;
  excerpt?: string;
};

type SnapshotAttachment = {
  id?: string;
  type?: string;
  description?: string;
  notes?: string;
  title?: string;
  name?: string;
  url?: string;
  originalSourceId?: string;
  data?: Record<string, any>;
};

const hasAttachmentDataPayload = (
  attachment: any
): attachment is { id?: string; type?: string; data: Record<string, any> } => {
  return Boolean(
    attachment &&
      typeof attachment === "object" &&
      attachment.data &&
      typeof attachment.data === "object"
  );
};

const canonicalizeSnapshotAttachment = (
  attachment: SnapshotAttachment | AIFrame["attachment"] | undefined,
  frameId: string
): AIFrame["attachment"] | undefined => {
  if (!attachment) return undefined;

  if (hasAttachmentDataPayload(attachment)) {
    const pointer =
      attachment.data.originalUrl ||
      attachment.data.kbDocumentId ||
      attachment.data.pdfUrl ||
      attachment.data.videoUrl ||
      attachment.id ||
      attachment.type;

    const inferredKbSource =
      attachment.data.pdfSource === "knowledge_base" ||
      Boolean(attachment.data.kbDocumentId) ||
      (typeof attachment.data.originalUrl === "string" &&
        attachment.data.originalUrl.length > 0 &&
        !attachment.data.originalUrl.startsWith("http"));

    return {
      ...attachment,
      id: makeAttachmentInstanceId(frameId, pointer),
      data: {
        ...attachment.data,
        originalUrl:
          attachment.data.originalUrl ||
          attachment.data.pdfUrl ||
          attachment.data.videoUrl ||
          attachment.data.text ||
          attachment.data.notes,
        kbDocumentId:
          attachment.data.kbDocumentId ||
          (inferredKbSource
            ? attachment.data.originalUrl ||
              attachment.data.pdfUrl ||
              pointer
            : attachment.data.kbDocumentId),
        pdfSource:
          attachment.data.pdfSource ||
          (inferredKbSource ? "knowledge_base" : attachment.data.pdfSource),
      },
    };
  }

  const legacy = attachment as SnapshotAttachment;
  const rawUrl = typeof legacy.url === "string" ? legacy.url.trim() : "";
  const looksLikeKbSlug =
    (rawUrl && !/^https?:\/\//i.test(rawUrl)) ||
    (legacy.originalSourceId &&
      !legacy.originalSourceId.toLowerCase().startsWith("http")) ||
    (legacy.type && legacy.type.toLowerCase() === "pdf-kb") ||
    rawUrl.toLowerCase().endsWith(".pdf");

  const builderSource: FlowGeneratedFrame["attachment"] = {
    type: looksLikeKbSlug ? "pdf-kb" : legacy.type || "text",
    description:
      legacy.description || legacy.notes || legacy.title || legacy.name || "",
    url: rawUrl,
    originalSourceId:
      legacy.originalSourceId || (looksLikeKbSlug ? rawUrl : undefined),
  };

  return buildFrameAttachment(builderSource, frameId);
};

const escapeHtml = (value?: string | null): string => {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const truncateText = (value: string, limit = 420): string => {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit).trim()}…`;
};

const renderFrameSection = (
  label: string,
  content?: string,
  placeholder = "Not provided yet."
) => {
  if (!content) {
    return `
      <div class="frame-section muted">
        <p class="frame-section-label">${escapeHtml(label)}</p>
        <p class="frame-section-placeholder">${escapeHtml(placeholder)}</p>
      </div>
    `;
  }

  return `
    <div class="frame-section">
      <p class="frame-section-label">${escapeHtml(label)}</p>
      <p class="frame-section-text">${escapeHtml(truncateText(content, 800))}</p>
    </div>
  `;
};

const renderFrameContentBlock = (frame: PrintableFrameSummary, index: number) => {
  const conceptsMarkup =
    frame.concepts && frame.concepts.length
      ? `<div class="frame-concepts">
          ${frame.concepts
            .map(
              (concept) =>
                `<span class="frame-concept-pill">${escapeHtml(
                  truncateText(concept, 80)
                )}</span>`
            )
            .join("")}
        </div>`
      : "";

  const attachmentsMarkup =
    frame.attachments && frame.attachments.length
      ? `<div class="frame-attachments">
          <p class="frame-section-label attachments-label">Resources & Attachments</p>
          <div class="attachment-grid">
            ${frame.attachments
              .map(
                (attachment) => `
                <div class="attachment-card">
                  <div class="attachment-icon">
                    ${(attachment.type || "DOC")
                      .slice(0, 3)
                      .toUpperCase()}
                  </div>
                  <div class="attachment-body">
                    <p class="attachment-title">${escapeHtml(
                      truncateText(attachment.title, 60)
                    )}</p>
                    <p class="attachment-meta">${escapeHtml(
                      [
                        attachment.type || "Document",
                        attachment.source || "Knowledge Base",
                      ].join(" · ")
                    )}</p>
                    <p class="attachment-description">${escapeHtml(
                      truncateText(
                        attachment.excerpt ||
                          attachment.description ||
                          "Reference included with this frame.",
                        120
                      )
                    )}</p>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>`
      : "";

  const notesSection = frame.notes
    ? `
      <div class="frame-section">
        <p class="frame-section-label">Notes & References</p>
        <p class="frame-section-text">${escapeHtml(truncateText(frame.notes, 600))}</p>
      </div>
    `
    : "";

  return `
    <article class="frame-block">
      <header class="frame-block-header">
        <div>
          <p class="frame-index">Frame ${index + 1}</p>
          <h3>${escapeHtml(frame.title || `Frame ${index + 1}`)}</h3>
        </div>
      </header>
      <div class="frame-block-body">
        ${renderFrameSection("Learning Goal", frame.goal)}
        ${renderFrameSection("Context & Background", frame.context)}
        ${renderFrameSection("Key Takeaways", frame.takeaways)}
        ${notesSection}
        ${conceptsMarkup}
        ${attachmentsMarkup}
      </div>
      <footer class="frame-block-footer">${EXPORT_BRAND_URL}</footer>
    </article>
  `;
};

const generateFramesExportHtml = (payload: FramesExportPayload): string => {
  const overviewCards = payload.chapters
    .map(
      (chapter) => `
        <div class="overview-card">
          <p class="overview-label">Chapter ${chapter.index}</p>
          <h3>${escapeHtml(chapter.title)}</h3>
          <p class="overview-description">
            ${escapeHtml(chapter.description || "No description provided.")}
          </p>
          <p class="overview-meta">${chapter.frames.length} frame${chapter.frames.length === 1 ? "" : "s"}</p>
        </div>
      `
    )
    .join("");

  const overviewSection =
    payload.chapters.length > 0
      ? `<div class="overview-grid">${overviewCards}</div>`
      : `<p class="chapter-empty">No chapters available yet. Start by creating your first chapter.</p>`;

  const chapterPages =
    payload.chapters.length === 0
      ? `
        <section class="page chapter-page">
          <h2>No chapters defined</h2>
          <p class="chapter-empty">Create chapters and frames to populate this export.</p>
          <footer class="page-footer">${EXPORT_BRAND_URL}</footer>
        </section>
      `
      : payload.chapters
          .map((chapter) => {
            const framesMarkup =
              chapter.frames.length > 0
                ? chapter.frames
                    .map((frame, frameIndex) =>
                      renderFrameContentBlock(frame, frameIndex)
                    )
                    .join("")
                : `<p class="chapter-empty">No frames assigned to this chapter yet.</p>`;
            return `
              <section class="page chapter-page">
                <header class="chapter-header">
                  <div>
                    <p class="chapter-label">Chapter ${chapter.index}</p>
                    <h2>${escapeHtml(chapter.title)}</h2>
                    <p class="chapter-description">
                      ${escapeHtml(chapter.description || "This chapter does not have a description yet.")}
                    </p>
                  </div>
                  <span class="chapter-count">${chapter.frames.length} frame${chapter.frames.length === 1 ? "" : "s"}</span>
                </header>
                ${framesMarkup}
                <footer class="page-footer">${EXPORT_BRAND_URL}</footer>
              </section>
            `;
          })
          .join("");

  const standaloneSection =
    payload.standaloneFrames.length === 0
      ? ""
      : `
        <section class="page standalone-page">
          <h2>Standalone Frames</h2>
          <p class="standalone-subtitle">
            Frames that have not yet been assigned to a chapter.
          </p>
          ${payload.standaloneFrames
          .map((frame, index) => renderFrameContentBlock(frame, index))
            .join("")}
          <footer class="page-footer">${EXPORT_BRAND_URL}</footer>
        </section>
      `;

  const graphSection =
    payload.includeGraph && payload.graphEdges.length > 0
      ? `
        <section class="page graph-page">
          <h2>Graph Overview</h2>
          <p class="graph-subtitle">Relationships between frames and chapters at export time.</p>
          <div class="graph-list">
            ${payload.graphEdges
              .map(
                (edge, idx) => `
                  <div class="graph-row">
                    <span class="graph-index">${idx + 1}.</span>
                    <span class="graph-source">${escapeHtml(edge.source)}</span>
                    <span class="graph-arrow">→</span>
                    <span class="graph-target">${escapeHtml(edge.target)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
          <footer class="page-footer">${EXPORT_BRAND_URL}</footer>
        </section>
      `
      : "";

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(payload.title)}</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
            background: #f8fafc;
            color: #0f172a;
          }
          .page {
            width: 8.27in;
            min-height: 11.69in;
            padding: 1.1in;
            margin: 0 auto;
            background: #ffffff;
            display: flex;
            flex-direction: column;
          }
          .page + .page {
            page-break-before: always;
          }
          h1, h2, h3, h4 {
            margin: 0;
            color: #0f172a;
          }
          p {
            margin: 0;
            color: #475569;
            line-height: 1.5;
          }
          .cover {
            align-items: center;
            text-align: center;
            justify-content: center;
            gap: 1.5rem;
          }
          .cover-badge {
            text-transform: uppercase;
            letter-spacing: 0.4em;
            font-size: 0.75rem;
            color: #94a3b8;
          }
          .cover h1 {
            font-size: 2.75rem;
            line-height: 1.2;
          }
          .cover-stats {
            display: flex;
            gap: 2.5rem;
            margin-top: 1.5rem;
          }
          .cover-stats div {
            text-align: center;
          }
          .cover-stats p:first-child {
            font-size: 2.5rem;
            font-weight: 600;
            color: #0f172a;
          }
          .cover-stats p:last-child {
            font-size: 0.85rem;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.2em;
          }
          .page-footer {
            margin-top: auto;
            font-size: 0.8rem;
            text-align: center;
            color: #94a3b8;
          }
          .overview-page h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
          }
          .overview-card {
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            padding: 1.1rem;
            background: #f8fafc;
            min-height: 180px;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .overview-label {
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.3em;
            color: #94a3b8;
          }
          .overview-description {
            font-size: 0.95rem;
          }
          .overview-meta {
            margin-top: auto;
            font-weight: 600;
            color: #0f172a;
          }
          .chapter-header {
            display: flex;
            justify-content: space-between;
            gap: 1.5rem;
            align-items: flex-start;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
          }
          .chapter-label {
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.4em;
            color: #94a3b8;
            margin-bottom: 0.35rem;
          }
          .chapter-description {
            margin-top: 0.75rem;
            font-size: 1rem;
            color: #475569;
          }
          .chapter-count {
            font-weight: 600;
            color: #0f172a;
          }
          .frame-block + .frame-block { margin-top: 1.25rem; }
          .frame-block {
            border: 1px solid #e2e8f0;
            border-radius: 1.3rem;
            padding: 1.25rem;
            background: linear-gradient(135deg, #f9fafb, #ffffff);
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }
          .frame-block-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1rem;
          }
          .frame-index {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #94a3b8;
          }
          .frame-block-header h3 {
            font-size: 1.4rem;
            color: #0f172a;
            margin-top: 0.2rem;
          }
          .frame-focus-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #94a3b8;
          }
          .frame-block-body {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .frame-section {
            padding: 0.75rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.9rem;
            background: #fff;
          }
          .frame-section.muted {
            background: #fafafa;
            border-style: dashed;
            color: #94a3b8;
          }
          .frame-section-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: #94a3b8;
            margin-bottom: 0.4rem;
          }
          .attachments-label {
            margin-bottom: 0.6rem;
          }
          .frame-section-text {
            font-size: 0.95rem;
            color: #0f172a;
            line-height: 1.4;
          }
          .frame-section-placeholder {
            font-size: 0.9rem;
            font-style: italic;
            color: #9ca3af;
          }
          .frame-concepts {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-top: 0.4rem;
          }
          .frame-concept-pill {
            padding: 0.2rem 0.6rem;
            font-size: 0.75rem;
            border: 1px solid #e2e8f0;
            border-radius: 999px;
            background: #eef2ff;
            color: #3730a3;
          }
          .frame-attachments {
            margin-top: 0.75rem;
          }
          .attachment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 0.6rem;
          }
          .attachment-card {
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            padding: 0.75rem;
            display: flex;
            gap: 0.75rem;
            background: #ffffff;
            box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.08);
          }
          .attachment-icon {
            width: 40px;
            height: 40px;
            border-radius: 0.8rem;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            font-size: 0.75rem;
            letter-spacing: 0.15em;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .attachment-body {
            flex: 1;
          }
          .attachment-title {
            font-weight: 600;
            font-size: 0.9rem;
            color: #0f172a;
            margin-bottom: 0.2rem;
          }
          .attachment-meta {
            font-size: 0.72rem;
            color: #8b5cf6;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin-bottom: 0.2rem;
          }
          .attachment-description {
            font-size: 0.8rem;
            color: #475569;
            line-height: 1.35;
          }
          .frame-block-footer {
            font-size: 0.75rem;
            color: #94a3b8;
            text-align: right;
          }
          .graph-page h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          .graph-list {
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
          }
          .graph-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.95rem;
            color: #0f172a;
          }
          .graph-index {
            font-weight: 600;
            color: #94a3b8;
            width: 2rem;
          }
          .graph-source,
          .graph-target {
            font-weight: 600;
          }
          .graph-arrow {
            color: #94a3b8;
          }
          @media print {
            body {
              background: #ffffff !important;
              color: #0f172a;
            }
            .page {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <section class="page cover">
          <p class="cover-badge">TimeCapsule · AI Frames Export</p>
          <h1>${escapeHtml(payload.title)}</h1>
          <p>${escapeHtml(payload.subtitle)}</p>
          <div class="cover-stats">
            <div>
              <p>${payload.stats.chapters}</p>
              <p>Chapters</p>
            </div>
            <div>
              <p>${payload.stats.frames}</p>
              <p>Frames</p>
            </div>
            <div>
              <p>${payload.stats.concepts}</p>
              <p>Concepts</p>
            </div>
          </div>
          <p class="overview-description" style="margin-top: 1.5rem;">
            Generated on ${escapeHtml(payload.generatedAt)} · ${EXPORT_BRAND_URL}
          </p>
        </section>

        <section class="page overview-page">
          <h2>Chapter Overview</h2>
          ${overviewSection}
          <footer class="page-footer">${EXPORT_BRAND_URL}</footer>
        </section>

        ${chapterPages}
        ${standaloneSection}
        ${graphSection}
      </body>
    </html>
  `;
};

const openPrintPreview = (html: string) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const blob = new Blob([html], { type: "text/html" });
  const popupUrl = URL.createObjectURL(blob);
  const popupWindow = window.open(popupUrl, "_blank", "noopener,noreferrer");

  if (popupWindow) {
    const handlePopupLoad = () => {
      try {
        popupWindow.focus();
        popupWindow.print();
      } finally {
        popupWindow.removeEventListener("load", handlePopupLoad);
        URL.revokeObjectURL(popupUrl);
      }
    };
    popupWindow.addEventListener("load", handlePopupLoad, { once: true });
    return;
  }

  URL.revokeObjectURL(popupUrl);

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const cleanup = () => {
    iframe.removeEventListener("load", handleLoad);
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  };

  const handleLoad = () => {
    try {
      const contentWindow = iframe.contentWindow;
      if (contentWindow) {
        contentWindow.focus();
        contentWindow.print();
      } else {
        console.error("Printable iframe window unavailable");
      }
    } finally {
      cleanup();
    }
  };

  iframe.addEventListener("load", handleLoad, { once: true });
  iframe.srcdoc = html;
};

// Main component with dramatically reduced size
export default function AIFramesPage() {
  // ============================================================================
  // CRITICAL: ALL HOOKS MUST BE CALLED AT THE TOP LEVEL
  // No conditional logic, early returns, or loops before all hooks are called
  // ============================================================================

  // Authentication hooks
  const { data: session, status } = useSession();
  const router = useRouter();
  const buildEnv = getBuildEnv();
  const requireAuth = buildEnv === "cloud";
  const localBridgeEnabled = isLocalBuildEnv();

  // Page analytics (must be called before any conditional returns)
  const pageAnalytics = usePageAnalytics("AI-Frames", "learning");

  // VectorStore hooks (must be called consistently)
  const {
    vectorStore: providerVectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    error: vectorStoreError,
    processingAvailable,
    processingStatus,
  } = useVectorStore();

  // Essential state hooks
  const [isCreationMode, setIsCreationMode] = useState(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // UNIFIED: Replace old fragmented storage with unified system
  const unifiedStorage = useUnifiedStorage({
    vectorStore: providerVectorStore,
    vectorStoreInitialized,
  });

  const timeCapsule = useTimeCapsule(providerVectorStore);

  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [documentManagerTab, setDocumentManagerTab] = useState("user");
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");
  const [semanticSearchResults, setSemanticSearchResults] = useState<any[]>([]);
  const [currentSemanticQuery, setCurrentSemanticQuery] = useState("");
  const [showSemanticResults, setShowSemanticResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchThreshold, setSearchThreshold] = useState(0.1);
  const [currentChunk, setCurrentChunk] = useState<any>(null);
  const [showChunkView, setShowChunkView] = useState(false);
  const [chunkViewerDocument, setChunkViewerDocument] = useState<any | null>(null);
  const [chunkViewerChunks, setChunkViewerChunks] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [graphResetKey, setGraphResetKey] = useState(0);

  // Function to trigger graph reset
  const triggerGraphReset = useCallback(() => {
    setGraphResetKey((prev) => prev + 1);
    // Ensure edges are also cleared to prevent duplicate edge keys
    unifiedStorage.updateGraphState({ nodes: [], edges: [] });
    console.log('🧹 Graph reset: cleared nodes and edges');
  }, [unifiedStorage]);

  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportForm, setExportForm] = useState({
    title: "",
    subtitle: "",
    includeGraph: false,
  });

  // ✅ NEW: Session continuation dialog state
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [sessionDialogConfig, setSessionDialogConfig] = useState<{
    type: "ai-flow" | "swe-bridge" | "manual";
    currentSessionName?: string;
    onContinue: () => void;
    onCreateNew: () => void;
  } | null>(null);

  // Session delete confirmation dialog state
  const [showDeleteSessionDialog, setShowDeleteSessionDialog] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<{ id: string; name: string; frameCount: number } | null>(null);

  const framesByChapter = useMemo(() => {
    const map = new Map<string, UnifiedAIFrame[]>();
    unifiedStorage.frames.forEach((frame) => {
      const key = frame.chapterId || frame.parentFrameId || "__standalone__";
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(frame);
    });
    return map;
  }, [unifiedStorage.frames]);

  const frameLookup = useMemo(() => {
    const lookup = new Map<string, UnifiedAIFrame>();
    unifiedStorage.frames.forEach((frame) => {
      lookup.set(frame.id, frame);
    });
    return lookup;
  }, [unifiedStorage.frames]);

  const extractFrameAttachments = useCallback(
    (frame: UnifiedAIFrame): PrintableAttachmentSummary[] => {
      if (!frame) {
        return [];
      }

      const attachments: PrintableAttachmentSummary[] = [];

      if (Array.isArray(frame.documents) && frame.documents.length > 0) {
        attachments.push(
          ...frame.documents
            .map((doc: any) => {
              const meta = doc?.metadata || {};
              const primaryTitle =
                doc?.name || meta.filename || doc?.title || "Attachment";
              const docType = doc?.type || meta.filetype || meta.docType;
              const sourceLabel = meta.source || doc?.source || "Knowledge Base";

              const excerptCandidate =
                (typeof doc?.content === "string" && doc?.content) ||
                (typeof doc?.preview === "string" && doc?.preview) ||
                (typeof doc?.summary === "string" && doc?.summary) ||
                (typeof meta.summary === "string" && meta.summary) ||
                (typeof doc?.notes === "string" && doc?.notes) ||
                undefined;

              const description =
                doc?.description ||
                meta.description ||
                (excerptCandidate ? undefined : doc?.url);

              return {
                title: primaryTitle,
                type: docType,
                source: sourceLabel,
                description: description,
                excerpt: excerptCandidate,
              };
            })
            .filter(
              (attachment) =>
                attachment.title || attachment.description || attachment.excerpt
            )
            .map((attachment) => ({
              ...attachment,
              excerpt: attachment.excerpt
                ? truncateText(attachment.excerpt, 400)
                : undefined,
              description: attachment.description
                ? truncateText(String(attachment.description), 160)
                : undefined,
            }))
        );
      }

      if (frame.attachment) {
        const attachmentType = frame.attachment.type || "attachment";
        const data = frame.attachment.data || {};
        const originalType = (data.originalType || attachmentType).toLowerCase();
        const attachmentTitle =
          data.title || data.filename || attachmentType.toUpperCase();

        let attachmentSource = "Attachment";
        if (originalType === "pdf-kb") {
          attachmentSource = "Knowledge Base";
        } else if (attachmentType === "pdf") {
          attachmentSource = "PDF";
        } else if (attachmentType === "text") {
          attachmentSource = "Text Snippet";
        } else if (attachmentType === "video") {
          attachmentSource = "Video Clip";
        }

        const attachmentDescription =
          data.pages ||
          data.pageCount ||
          data.notes ||
          data.description ||
          data.pdfUrl ||
          undefined;

        const attachmentExcerpt =
          data.notes ||
          data.summary ||
          (typeof data.content === "string" ? data.content : undefined);

        attachments.push({
          title: attachmentTitle,
          type: originalType || attachmentType,
          source: attachmentSource,
          description: attachmentDescription
            ? truncateText(String(attachmentDescription), 160)
            : undefined,
          excerpt: attachmentExcerpt
            ? truncateText(String(attachmentExcerpt), 400)
            : undefined,
        });
      }

      return attachments;
    },
    []
  );

  const standaloneFrames = useMemo(() => {
    return framesByChapter.get("__standalone__") || [];
  }, [framesByChapter]);

  const dispatchForceSave = useCallback(
    (reason: string) => {
      if (typeof window === "undefined") {
        return;
      }

      window.dispatchEvent(
        new CustomEvent("force-save-frames", {
          detail: {
            reason,
            timestamp: Date.now(),
            graphState: unifiedStorage.graphState,
          },
        })
      );
    },
    [unifiedStorage.graphState]
  );

  const delay = useCallback(
    (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );

  const ensureActiveTimeCapsuleId = useCallback(async (): Promise<string | null> => {
    const getExistingCapsuleId = () =>
      timeCapsule.timeCapsules?.[0]?.id || null;

    let attempts = 0;
    while (attempts < 10) {
      if (timeCapsule.activeTimeCapsuleId) {
        return timeCapsule.activeTimeCapsuleId;
      }

      if (timeCapsule.timeCapsules?.length) {
        const firstId = getExistingCapsuleId();
        if (firstId && timeCapsule.switchTimeCapsule) {
          await timeCapsule.switchTimeCapsule(firstId);
        }
        return firstId;
      }

      if (timeCapsule.isLoading) {
        attempts += 1;
        await delay(200);
        continue;
      }

      if (timeCapsule.createTimeCapsule) {
        const created = await timeCapsule.createTimeCapsule(
          "My First Project",
          "Auto-created for SWE Bridge sync"
        );
        if (created?.id) {
          if (timeCapsule.switchTimeCapsule) {
            await timeCapsule.switchTimeCapsule(created.id);
          }
          return created.id;
        }
      }

      attempts += 1;
      await delay(200);
    }

    return null;
  }, [
    delay,
    timeCapsule.activeTimeCapsuleId,
    timeCapsule.createTimeCapsule,
    timeCapsule.isLoading,
    timeCapsule.switchTimeCapsule,
    timeCapsule.timeCapsules,
  ]);

  const runWithImportGuard = useCallback(
    async (action: () => Promise<void>) => {
      importingFromLocalBridgeRef.current = true;
      try {
        await action();
      } finally {
        importingFromLocalBridgeRef.current = false;
      }
    },
    []
  );

  const handlePullFromLocalBridge = useCallback(async () => {
    if (!localBridgeEnabled) {
      return;
    }
    const activeTimeCapsuleId = await ensureActiveTimeCapsuleId();
    if (!activeTimeCapsuleId) {
      console.warn(
        "⚠️ Cannot sync SWE Bridge data because no TimeCapsule could be initialized."
      );
      setLocalBridgeSyncState("error");
      setTimeout(() => setLocalBridgeSyncState("idle"), 2000);
      return;
    }
    try {
      setLocalBridgeSyncState("syncing");
      const response = await fetch("/api/local/aiframes/state");
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();

      const stampSnapshotForSession = async (
        overrides: { sessionId?: string; timeCapsuleId?: string } = {}
      ) => {
        const sessionId = overrides.sessionId || flowBuilder.activeSessionId;
        if (!sessionId) {
          console.warn(
            "⚠️ Unable to stamp SWE Bridge data because no active session is available."
          );
          return null;
        }

        const resolvedTimeCapsuleId =
          overrides.timeCapsuleId ||
          flowBuilder.sessions.find((session) => session.id === sessionId)
            ?.timeCapsuleId ||
          activeTimeCapsuleId ||
          undefined;

        if (!resolvedTimeCapsuleId) {
          console.warn(
            "⚠️ Unable to resolve TimeCapsule for SWE Bridge payload; falling back to active capsule"
          );
        }

        if (Array.isArray(data.frames)) {
          const stampedFrames = data.frames.map((frame: AIFrame, index: number) => {
            const safeFrameId =
              typeof frame.id === "string" && frame.id.trim().length > 0
                ? frame.id
                : `swe_frame_${index}_${Date.now()}`;
            const canonicalAttachment = canonicalizeSnapshotAttachment(
              frame.attachment,
              safeFrameId
            );

            return {
              ...frame,
              id: safeFrameId,
              attachment: canonicalAttachment,
              sessionId,
              timeCapsuleId:
                (frame.timeCapsuleId && frame.timeCapsuleId !== "default"
                  ? frame.timeCapsuleId
                  : resolvedTimeCapsuleId) || activeTimeCapsuleId,
            };
          });

          const mergedFrames = sessionId
            ? [
                ...unifiedStorage.frames.filter(
                  (frame) => frame.sessionId !== sessionId
                ),
                ...stampedFrames,
              ]
            : [...unifiedStorage.frames, ...stampedFrames];

          unifiedStorage.updateFrames(mergedFrames);
          if (flowBuilder.updateSessionFrameCount) {
            await flowBuilder.updateSessionFrameCount(mergedFrames, sessionId);
          }
        }

        if (Array.isArray(data.chapters)) {
          const stampedChapters = data.chapters.map((chapter: Chapter) => ({
            ...chapter,
            sessionId,
            timeCapsuleId:
              (chapter.timeCapsuleId && chapter.timeCapsuleId !== "default"
                ? chapter.timeCapsuleId
                : resolvedTimeCapsuleId) || activeTimeCapsuleId,
          }));

          const mergedChapters = sessionId
            ? [
                ...unifiedStorage.chapters.filter(
                  (chapter) => chapter.sessionId !== sessionId
                ),
                ...stampedChapters,
              ]
            : [...unifiedStorage.chapters, ...stampedChapters];

          unifiedStorage.updateChapters(mergedChapters);
        }

        return { sessionId, timeCapsuleId: resolvedTimeCapsuleId };
      };

      const applyGraphStateAndSave = async (graphState?: GraphState, sessionId?: string) => {
        if (graphState) {
          unifiedStorage.updateGraphState(graphState);
        }
        const targetSessionId = sessionId || flowBuilder.activeSessionId;
        if (flowBuilder.saveCurrentSession && targetSessionId) {
          await flowBuilder.saveCurrentSession(true);
        }
      };

      // ✅ NEW: Session dialog logic for SWE Bridge sync
      if (Array.isArray(data.frames) && data.frames.length > 0) {
        const hasActiveSession = flowBuilder.activeSessionId;
        const activeSession = flowBuilder.sessions.find(
          (s) => s.id === flowBuilder.activeSessionId
        );
        const activeSource = activeSession?.source;

        // If no session or session is not SWE Bridge, show dialog
        if (!hasActiveSession || activeSource !== "swe-bridge") {
          console.log("🔔 Showing session dialog for SWE Bridge sync");
          setSessionDialogConfig({
            type: "swe-bridge",
            currentSessionName: activeSession?.name,
            onContinue: async () => {
              console.log("✅ Continuing with existing session for SWE Bridge");
              await runWithImportGuard(async () => {
                const stamped = await stampSnapshotForSession();
                await applyGraphStateAndSave(
                  data.graphState,
                  stamped?.sessionId ?? flowBuilder.activeSessionId ?? undefined
                );
              });
              const latestStamp =
                data?.metadata?.lastUpdated || new Date().toISOString();
              localBridgeRemoteStampRef.current = latestStamp;
              localBridgeLastPulledRef.current = latestStamp;
              setLocalBridgeHasPendingData(false);
              setLocalBridgeSyncState("success");

              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("auto-layout-requested", {
                    detail: { source: "local-bridge" },
                  })
                );
              }

              setTimeout(() => setLocalBridgeSyncState("idle"), 2000);
            },
            onCreateNew: async () => {
              console.log("🆕 Creating new SWE Bridge session");
              // Create new SWE Bridge session (await to ensure session exists before loading data)
              const newSession = await flowBuilder.createNewSessionAsync(
                "swe-bridge",
                `SWE Sync ${new Date().toLocaleString()}`,
                triggerGraphReset,
                {
                  timeCapsuleId: activeTimeCapsuleId,
                }
              );

              await runWithImportGuard(async () => {
                const stamped = await stampSnapshotForSession({
                  sessionId: newSession?.id,
                  timeCapsuleId:
                    newSession?.timeCapsuleId ||
                    activeTimeCapsuleId ||
                    undefined,
                });
                
                // Generate complete graph state from frames and chapters
                let appliedGraphState: GraphState | undefined = data.graphState;
                if (Array.isArray(data.chapters) && Array.isArray(data.frames)) {
                  const completeGraphState = flowBuilder.generateGraphState(
                    data.chapters, 
                    data.frames
                  );
                  console.log("📊 Generated graph state from SWE data:", {
                    nodeCount: completeGraphState.nodes.length,
                    edgeCount: completeGraphState.edges.length,
                    frameNodes: completeGraphState.nodes.filter(n => n.type === 'aiframe').length,
                    chapterNodes: completeGraphState.nodes.filter(n => n.type === 'chapter').length
                  });
                  appliedGraphState = completeGraphState;
                } else if (data.graphState) {
                  // Fallback to provided graphState if generation fails
                  console.log("⚠️ Using fallback graphState from SWE Bridge");
                  appliedGraphState = data.graphState;
                }
                await applyGraphStateAndSave(
                  appliedGraphState,
                  stamped?.sessionId ?? newSession?.id ?? undefined
                );
              });
              const latestStamp =
                data?.metadata?.lastUpdated || new Date().toISOString();
              localBridgeRemoteStampRef.current = latestStamp;
              localBridgeLastPulledRef.current = latestStamp;
              setLocalBridgeHasPendingData(false);
              setLocalBridgeSyncState("success");

              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("auto-layout-requested", {
                    detail: { source: "local-bridge" },
                  })
                );
              }

              setTimeout(() => setLocalBridgeSyncState("idle"), 2000);
            },
          });
          setShowSessionDialog(true);
          return; // Wait for user choice
        }
      }

      // Normal sync flow (no frames or already has SWE Bridge session)
      await runWithImportGuard(async () => {
        const stamped = await stampSnapshotForSession();
        await applyGraphStateAndSave(data.graphState, stamped?.sessionId);
      });
      const latestStamp =
        data?.metadata?.lastUpdated || new Date().toISOString();
      localBridgeRemoteStampRef.current = latestStamp;
      localBridgeLastPulledRef.current = latestStamp;
      setLocalBridgeHasPendingData(false);
      setLocalBridgeSyncState("success");

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auto-layout-requested", {
            detail: { source: "local-bridge" },
          })
        );
      }

      setTimeout(() => setLocalBridgeSyncState("idle"), 2000);
    } catch (error) {
      console.error("Failed to sync from local SWE bridge:", error);
      setLocalBridgeSyncState("error");
      setTimeout(() => setLocalBridgeSyncState("idle"), 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    localBridgeEnabled,
    ensureActiveTimeCapsuleId,
    unifiedStorage.updateFrames,
    unifiedStorage.updateChapters,
    unifiedStorage.updateGraphState,
    // flowBuilder is used but not in deps - it's accessed via closure and is stable
    setSessionDialogConfig,
    setShowSessionDialog,
  ]);

  const broadcastChapterGraphSync = useCallback(
    (chapter: Chapter, frameIds: string[]) => {
      if (typeof window === "undefined" || !chapter?.id) {
        return;
      }

      // Defer to next tick so we don't mutate graph state during render
      const detail = {
        chapterId: chapter.id,
        frameIds,
        chapter: {
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
          color: chapter.color,
          conceptIds: chapter.conceptIds,
          frameIds,
          linkSequentially: chapter.linkSequentially,
          order: chapter.order,
        },
      };

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("graph-chapter-sync", { detail }));
        window.dispatchEvent(
          new CustomEvent("chapter-frames-updated", {
            detail: {
              chapterId: chapter.id,
              frameIds,
            },
          })
        );
      }, 0);
    },
    []
  );

  const flowBuilder = useAIFlowBuilder({
    vectorStore: providerVectorStore,
    vectorStoreInitialized,
    onAcceptFrames: (frames: AIFrame[]) => {
      // Replace all frames with the ones from the switched session
      unifiedStorage.updateFrames(frames);
      console.log(`✅ Loaded ${frames.length} frames from session into workspace`);
    },
    getGraphState: () => unifiedStorage.graphState,
    setGraphState: (state) => {
      unifiedStorage.updateGraphState(state);
    },
    setIsSwitching: (switching) => {
      isSwitchingSessionRef.current = switching;
    },
  });

  // Track last-saved graph hash to avoid redundant session saves
  const lastSavedGraphHashRef = useRef<string>("");
  
  // Track session switching to prevent contamination
  const isSwitchingSessionRef = useRef(false);
  const importingFromLocalBridgeRef = useRef(false);

  // Debug: Log session state changes
  useEffect(() => {
    console.log(`🔍 [PAGE-RENDER] Active session changed:`, {
      activeSessionId: flowBuilder.activeSessionId,
      sessionsCount: flowBuilder.sessions.length,
      sessionsList: flowBuilder.sessions.map(s => ({ id: s.id, name: s.name, source: s.source }))
    });
  }, [flowBuilder.activeSessionId, flowBuilder.sessions]);

  // Session-based frame filtering with TimeCapsule isolation
  const sessionFilteredFrames = useMemo(() => {
    // No active session: show all frames from active TimeCapsule
    if (!flowBuilder.activeSessionId) {
      return unifiedStorage.frames.filter(f => 
        f.timeCapsuleId === timeCapsule.activeTimeCapsuleId
      );
    }
    
    // Active session: show only frames from that session in the active TimeCapsule
    return unifiedStorage.frames.filter(f => 
      f.timeCapsuleId === timeCapsule.activeTimeCapsuleId &&
      f.sessionId === flowBuilder.activeSessionId
    );
  }, [unifiedStorage.frames, flowBuilder.activeSessionId, timeCapsule.activeTimeCapsuleId]);

  // Session-based chapter filtering
  const sessionFilteredChapters = useMemo(() => {
    // No active session: show all chapters from active TimeCapsule
    if (!flowBuilder.activeSessionId) {
      return unifiedStorage.chapters.filter(c => 
        c.timeCapsuleId === timeCapsule.activeTimeCapsuleId
      );
    }
    
      // Active session: show only chapters from that session in the active TimeCapsule
      return unifiedStorage.chapters.filter(c => 
        c.timeCapsuleId === timeCapsule.activeTimeCapsuleId &&
        c.sessionId === flowBuilder.activeSessionId
      );
  }, [unifiedStorage.chapters, flowBuilder.activeSessionId, timeCapsule.activeTimeCapsuleId]);

  // Persist authoritative graph changes into the active session (prevents edge loss on session switch)
  useEffect(() => {
    const nodes = unifiedStorage.graphState.nodes || [];
    const edges = unifiedStorage.graphState.edges || [];

    // Skip if switching sessions to prevent contamination
    if (isSwitchingSessionRef.current) {
      console.log('⏭️ Skipping session save during switch');
      return;
    }

    if (!flowBuilder.activeSessionId || !flowBuilder.saveCurrentSession) {
      return;
    }

    // Lightweight hash to detect meaningful graph changes
    const currentHash = `${nodes.length}:${edges.length}:${nodes
      .map((n) => n.id)
      .join(",")}|${edges.map((e) => e.id).join(",")}`;

    if (currentHash === lastSavedGraphHashRef.current) {
      return;
    }

    lastSavedGraphHashRef.current = currentHash;
    flowBuilder.saveCurrentSession(false); // Use existing debounce inside the hook

    console.log("🔄 [SESSION] Graph changed, queued session save", {
      sessionId: flowBuilder.activeSessionId,
      nodeCount: nodes.length,
      edgeCount: edges.length,
    });
  }, [
    unifiedStorage.graphState.nodes,
    unifiedStorage.graphState.edges,
    flowBuilder.activeSessionId,
    flowBuilder.saveCurrentSession,
  ]);

  // Ensure graph is cleared once when switching to a session with no frames/chapters
  const lastClearedSessionRef = useRef<string | null>(null);
  useEffect(() => {
    if (!flowBuilder.activeSessionId) return;
    if (importingFromLocalBridgeRef.current) {
      return;
    }
    const hasGraphContent = (unifiedStorage.graphState.nodes?.length || 0) > 0 || (unifiedStorage.graphState.edges?.length || 0) > 0;
    const shouldClear =
      sessionFilteredFrames.length === 0 &&
      sessionFilteredChapters.length === 0 &&
      hasGraphContent &&
      lastClearedSessionRef.current !== flowBuilder.activeSessionId;
    if (shouldClear) {
      unifiedStorage.updateGraphState({ nodes: [], edges: [], selectedNodeId: null });
      triggerGraphReset();
      lastClearedSessionRef.current = flowBuilder.activeSessionId;
    }
    if (sessionFilteredFrames.length > 0 || sessionFilteredChapters.length > 0) {
      lastClearedSessionRef.current = null;
    }
  }, [
    flowBuilder.activeSessionId,
    sessionFilteredFrames.length,
    sessionFilteredChapters.length,
    unifiedStorage.graphState.nodes?.length,
    unifiedStorage.graphState.edges?.length,
    triggerGraphReset,
    unifiedStorage,
  ]);

  // REMOVED: Infinite loop fix - session frame count is already tracked by session metadata
  // The useEffect here was causing infinite saves by triggering re-renders on every save

  // TimeCapsule switch event listeners
  useEffect(() => {
    const handleSwitchStart = () => {
      console.log('🧹 Clearing workspace for TimeCapsule switch');
      // Clear graph state
      if (triggerGraphReset) {
        triggerGraphReset();
      }
    };
    
    const handleSwitched = async (event: Event) => {
      const customEvent = event as CustomEvent;
      const { timeCapsuleId } = customEvent.detail;
      console.log(`📥 Loading data for TimeCapsule: ${timeCapsuleId}`);
      
      // Reload frames for new TimeCapsule
      await unifiedStorage.loadAll();
      
      // Reload sessions for new TimeCapsule
      if (flowBuilder.loadSessions) {
        await flowBuilder.loadSessions();
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('timecapsule-switch-start', handleSwitchStart);
      window.addEventListener('timecapsule-switched', handleSwitched);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('timecapsule-switch-start', handleSwitchStart);
        window.removeEventListener('timecapsule-switched', handleSwitched);
      }
    };
  }, [unifiedStorage, flowBuilder, triggerGraphReset]);

  // REMOVED: ID-FALLBACK useEffect (caused race condition with stale closures)
  // ID assignment now happens in handleFramesChange with FRESH data (Sage Cheat Sheet compliance)

  const workspaceStats = useMemo(() => {
    const frames = sessionFilteredFrames;
    const chapters = unifiedStorage.chapters;
    const totalConcepts = frames.reduce(
      (acc, frame) => acc + (frame.aiConcepts?.length || 0),
      0
    );
    const masteredFrames = frames.reduce(
      (acc, frame) => acc + (frame.masteryState === "completed" ? 1 : 0),
      0
    );

    return {
      frames: frames.length,
      masteredFrames,
      chapters: chapters.length,
      concepts: totalConcepts,
    };
  }, [sessionFilteredFrames, unifiedStorage.chapters]);

  const fileToDataUrl = useCallback((file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read image for OCR"));
      reader.readAsDataURL(file);
    });
  }, []);

  const canUseVisionUploads =
    flowBuilder.aiProviders.providerReady.openrouter &&
    flowBuilder.aiProviders.openrouter.connectionState.visionMode === "vision";

  const knowledgeBaseErrorMessage = vectorStoreError || unifiedStorage.error || null;
  const knowledgeBaseUnavailable = Boolean(knowledgeBaseErrorMessage);

  const flowPanelReady =
    (vectorStoreInitialized && !vectorStoreInitializing && !unifiedStorage.isLoading) ||
    knowledgeBaseUnavailable;

  const describeImageWithVision = useCallback(
    async (file: File) => {
      if (!canUseVisionUploads) {
        throw new Error(
          "Vision model not available. Enable OpenRouter vision mode in AI Controls to upload images."
        );
      }
      const dataUrl = await fileToDataUrl(file);
      const response = await flowBuilder.aiProviders.callLLM({
        tier: "vision",
        prompt: "Extract the textual and diagrammatic information from this study artifact.",
        messages: [
          {
            role: "system",
            content:
              "You are an OCR specialist. Return a concise JSON object with fields text, keywords, and diagramSummary describing the uploaded learning resource. Text should capture readable phrases exactly as shown. Diagram summary should describe shapes or flows if present.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `File name: ${file.name}\nDescribe any equations, code, or numbered steps so they can be searched inside the knowledge base.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: dataUrl,
                },
              },
            ],
          },
        ],
        responseFormat: { type: "json_object" },
        metadata: { action: "kb_image_ingest", filename: file.name },
      });

      try {
        const parsed = JSON.parse(response.content);
        const body = [
          parsed.text,
          parsed.diagramSummary ? `Diagram: ${parsed.diagramSummary}` : null,
          Array.isArray(parsed.keywords) && parsed.keywords.length
            ? `Keywords: ${parsed.keywords.join(", ")}`
            : null,
        ]
          .filter(Boolean)
          .join("\n\n");
        return body || response.content;
      } catch {
        return response.content;
      }
    },
    [canUseVisionUploads, fileToDataUrl, flowBuilder.aiProviders]
  );

  const documentsHook = useDocuments(providerVectorStore, {
    analyzeImage: canUseVisionUploads ? describeImageWithVision : undefined,
  });
  const [isFlowPanelOpen, setIsFlowPanelOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarManualOverride, setSidebarManualOverride] = useState(false);

  // Graph state management
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Loading state to prevent multiple concurrent KB loading calls
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);

  // Dialog states
  const [showVectorStoreInitModal, setShowVectorStoreInitModal] =
    useState(false);
  const [showBubblSpaceDialog, setShowBubblSpaceDialog] = useState(false);
  const [showTimeCapsuleDialog, setShowTimeCapsuleDialog] = useState(false);
  const [showSafeImportDialog, setShowSafeImportDialog] = useState(false);
  const [showChapterDialog, setShowChapterDialog] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterFormData, setChapterFormData] = useState(() => ({
    ...EMPTY_CHAPTER_FORM,
  }));
  const [selectedChapterFrameIds, setSelectedChapterFrameIds] = useState<string[]>([]);
  const [pendingChapterFrames, setPendingChapterFrames] = useState<Record<string, AIFrame>>({});

  const [showChapterProcessing, setShowChapterProcessing] = useState(false);
  const chapterProcessingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const vectorStoreReady =
    vectorStoreInitialized &&
    !vectorStoreInitializing &&
    providerVectorStore?.initialized !== false;
  const [localBridgeSyncState, setLocalBridgeSyncState] = useState<
    "idle" | "syncing" | "success" | "error"
  >("idle");
  const [localBridgeHasPendingData, setLocalBridgeHasPendingData] =
    useState(false);
  const localBridgeRemoteStampRef = useRef<string | null>(null);
  const localBridgeLastPulledRef = useRef<string | null>(null);
  const localBridgeCtaLabel =
    localBridgeSyncState === "syncing"
      ? "Syncing..."
      : localBridgeSyncState === "success"
      ? "Pulled!"
      : localBridgeSyncState === "error"
      ? "Retry pull"
      : "Pull from Local SWE";
  const localBridgeButtonDisabled = localBridgeSyncState === "syncing";

  // Ref hooks
  const metadataManagerRef = useRef<MetadataManager | null>(null);
  const graphStorageManagerRef = useRef<GraphStorageManager | null>(null);

  // ============================================================================
  // ALL EFFECT HOOKS - Must be called consistently on every render
  // ============================================================================

  // Authentication redirect effect
  useEffect(() => {
    if (!requireAuth) return;
    if (status === "loading") return; // Still loading

    if (!session) {
      const currentUrl = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      router.push(`/auth/signin?callbackUrl=${currentUrl}`);
    }
  }, [requireAuth, session, status, router]);

  // Initialize managers
  useEffect(() => {
    const initializeManagers = async () => {
      if (providerVectorStore && vectorStoreInitialized) {
        try {
          metadataManagerRef.current = getMetadataManager(providerVectorStore);
          graphStorageManagerRef.current =
            await getGraphStorageManager(providerVectorStore);
          console.log("✅ Managers initialized successfully");
        } catch (error) {
          console.error("❌ Failed to initialize managers:", error);
          // Don't crash the page, just log the error
          // The app can still function without GraphStorageManager
        }
      }
    };

    initializeManagers();
  }, [providerVectorStore, vectorStoreInitialized]);

  useEffect(() => {
    setPendingChapterFrames((prev) => {
      if (!prev || Object.keys(prev).length === 0) {
        return prev;
      }

      const existingIds = new Set(unifiedStorage.frames.map((frame) => frame.id));
      let changed = false;
      const next: Record<string, AIFrame> = {};

      Object.entries(prev).forEach(([id, frame]) => {
        if (existingIds.has(id)) {
          changed = true;
          return;
        }
        next[id] = frame;
      });

      return changed ? next : prev;
    });
  }, [unifiedStorage.frames]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleSaveSuccess = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.background && showChapterProcessing) {
        if (chapterProcessingTimeoutRef.current) {
          clearTimeout(chapterProcessingTimeoutRef.current);
          chapterProcessingTimeoutRef.current = null;
        }
        setShowChapterProcessing(false);
      }
    };

    window.addEventListener("unified-save-success", handleSaveSuccess as EventListener);

    return () => {
      window.removeEventListener("unified-save-success", handleSaveSuccess as EventListener);
      if (chapterProcessingTimeoutRef.current) {
        clearTimeout(chapterProcessingTimeoutRef.current);
        chapterProcessingTimeoutRef.current = null;
      }
    };
  }, [showChapterProcessing]);

  // FIXED: Enhanced VectorStore modal management for stability
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (vectorStoreInitializing && !vectorStoreReady && !showVectorStoreInitModal) {
      setShowVectorStoreInitModal(true);
    }

    if ((vectorStoreReady || vectorStoreError) && showVectorStoreInitModal) {
      const delay = vectorStoreError ? 0 : 2000;
      timeoutId = setTimeout(() => {
        setShowVectorStoreInitModal(false);
      }, delay);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [vectorStoreInitializing, vectorStoreReady, vectorStoreError, showVectorStoreInitModal]);

  useEffect(() => {
    if (!localBridgeEnabled || typeof window === "undefined") {
      return;
    }

    const handleLocalBridgeSynced = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      const savedAt: string =
        detail?.savedAt || new Date().toISOString();
      localBridgeRemoteStampRef.current = savedAt;
      localBridgeLastPulledRef.current = savedAt;
      setLocalBridgeHasPendingData(false);
    };

    window.addEventListener(
      "local-bridge-synced",
      handleLocalBridgeSynced as EventListener
    );

    return () => {
      window.removeEventListener(
        "local-bridge-synced",
        handleLocalBridgeSynced as EventListener
      );
    };
  }, [localBridgeEnabled]);

  useEffect(() => {
    if (!localBridgeEnabled) {
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const response = await fetch("/api/local/aiframes/state", {
          cache: "no-store",
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const updatedStamp: string | undefined = data?.metadata?.lastUpdated;
        if (!updatedStamp) {
          return;
        }

        if (!localBridgeRemoteStampRef.current) {
          localBridgeRemoteStampRef.current = updatedStamp;
          if (!localBridgeLastPulledRef.current) {
            localBridgeLastPulledRef.current = updatedStamp;
          }
          return;
        }

        const incoming = Date.parse(updatedStamp);
        const currentRemote = Date.parse(
          localBridgeRemoteStampRef.current || ""
        );

        if (incoming > currentRemote) {
          localBridgeRemoteStampRef.current = updatedStamp;
          const lastPulled = Date.parse(
            localBridgeLastPulledRef.current || ""
          );
          if (
            localBridgeLastPulledRef.current &&
            incoming > lastPulled &&
            !cancelled
          ) {
            setLocalBridgeHasPendingData(true);
          }
        }
      } catch (error) {
        console.warn("Local SWE bridge poll failed:", error);
      }
    };

    const interval = setInterval(poll, 8000);
    poll();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [localBridgeEnabled]);

  // CRITICAL FIX: Simplified, reliable loading logic
  useEffect(() => {
    const loadInitialData = async () => {
      // Prevent concurrent loading calls only
      if (isLoadingInitialData) return;

      try {
        setIsLoadingInitialData(true);

        console.log("🔄 Loading initial data with unified storage...");

        // UNIFIED: Use single load method
        const success = await unifiedStorage.loadAll();

        if (success) {
          console.log("✅ Unified storage load completed successfully");
        } else {
          console.log("📭 No data found in unified storage");
        }

        console.log("✅ Initial data loading complete");
      } catch (error) {
        console.error("❌ Error loading initial data:", error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    // Trigger loading on mount
    loadInitialData();
  }, []); // Only run on mount

  // Load documents when VectorStore is ready
  useEffect(() => {
    const loadDocuments = async () => {
      if (!vectorStoreReady || !providerVectorStore) {
        return;
      }

      try {
        const allDocuments = await providerVectorStore.getAllDocuments();
        setDocuments(allDocuments);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("Vector Store not initialized")
        ) {
          console.log("VectorStore still initializing, will retry when ready");
        } else {
          console.error("Failed to load documents:", error);
        }
      }
    };

    loadDocuments();
  }, [vectorStoreReady, providerVectorStore]);

  // Listen for KB document changes (e.g., session deletions)
  useEffect(() => {
    const handleKBDocumentsChanged = async () => {
      if (!vectorStoreReady || !providerVectorStore) return;
      try {
        const allDocuments = await providerVectorStore.getAllDocuments();
        setDocuments(allDocuments);
        console.log('📚 KB documents refreshed after change');
      } catch (error) {
        console.error('Failed to refresh KB documents:', error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('kb-documents-changed', handleKBDocumentsChanged);
      return () => window.removeEventListener('kb-documents-changed', handleKBDocumentsChanged);
    }
  }, [vectorStoreReady, providerVectorStore]);

  // CRITICAL FIX: Expose sync methods for FrameGraphIntegration to use (reduced logging frequency)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const aiFramesApp = {
        vectorStore: providerVectorStore,
        vectorStoreInitialized,
        frames: unifiedStorage.frames,
        // UNIFIED: Expose unified storage methods
        saveAll: unifiedStorage.saveAll,
        loadAll: unifiedStorage.loadAll,
        updateFrames: unifiedStorage.updateFrames,
        updateGraphState: unifiedStorage.updateGraphState,
        clearAll: unifiedStorage.clearAll,
        // OPTIMISTIC: Legacy compatibility using optimistic updates (no more blocking!)
        saveFramesToStorage: () => {
          /* Frames auto-save via optimistic updates */
        },
        syncFramesToVectorStore: () => {
          /* VectorStore syncs via background saves */
        },
        syncGraphChangesToKB: () => {
          /* Knowledge Base syncs via background saves */
        },
        loadFramesFromStorage: unifiedStorage.loadAll,
        broadcastFrameChanges: unifiedStorage.updateFrames,
      };

      (window as any).aiFramesApp = aiFramesApp;

      // REDUCED SPAM: Only log when frame count changes or VectorStore state changes
      if (
        (window as any).lastLoggedFrameCount !== aiFramesApp.frames.length ||
        (window as any).lastLoggedVectorStoreState !== vectorStoreInitialized
      ) {
        console.log("🔧 AI-Frames unified storage interface updated:", {
          hasVectorStore: !!aiFramesApp.vectorStore,
          vectorStoreInitialized: aiFramesApp.vectorStoreInitialized,
          frameCount: aiFramesApp.frames.length,
          hasUnifiedMethods: typeof aiFramesApp.saveAll === "function",
        });
        (window as any).lastLoggedFrameCount = aiFramesApp.frames.length;
        (window as any).lastLoggedVectorStoreState = vectorStoreInitialized;
      }
    }
  }, [
    providerVectorStore,
    vectorStoreInitialized,
    unifiedStorage.frames.length,
  ]);

  // ============================================================================
  // ALL CALLBACK HOOKS - Must be called consistently on every render
  // ============================================================================

  // Handle frame clear
  const handleClearFrames = useCallback(async () => {
    try {
      await unifiedStorage.clearAll();
      setCurrentFrameIndex(0);
      setGraphResetKey((prev) => prev + 1);
      setPendingChapterFrames({});
      console.log("🗑️ All frames cleared");
    } catch (error) {
      console.error("❌ Failed to clear AI Frames:", error);
    }
  }, [unifiedStorage]);

  // Handle graph state updates
  const handleGraphStateUpdate = useCallback(
    (graphState: GraphState) => {
      unifiedStorage.updateGraphState(graphState);
      // Also update session's graph state
      flowBuilder.setCurrentGraphState(graphState);
    },
    [unifiedStorage, flowBuilder]
  );

  // Frame navigation
  const handleFrameNavigation = useCallback(
    (direction: "next" | "prev") => {
      const newIndex =
        direction === "next"
          ? Math.min(currentFrameIndex + 1, unifiedStorage.frames.length - 1)
          : Math.max(currentFrameIndex - 1, 0);

      // CRITICAL LOG: Debug frame index changes
      console.log("🔍 Frame navigation debug:", {
        direction,
        currentIndex: currentFrameIndex,
        newIndex,
        frameCount: unifiedStorage.frames.length,
      });

      setCurrentFrameIndex(newIndex);
    },
    [currentFrameIndex, unifiedStorage.frames.length]
  );

  // Save frames handler
  const handleSaveFrames = useCallback(async (): Promise<boolean> => {
    // OPTIMISTIC: Manual save now triggers background save
    try {
      unifiedStorage.updateFrames(unifiedStorage.frames); // Triggers optimistic save
      return true; // Optimistic saves always succeed immediately
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    }
  }, [unifiedStorage]);

  // Load frames handler
  const handleLoadFrames = useCallback(async (): Promise<boolean> => {
    try {
      const success = await unifiedStorage.loadAll();
      return success;
    } catch (error) {
      console.error("Load failed:", error);
      return false;
    }
  }, [unifiedStorage]);

  const handleSidebarHide = useCallback(() => {
    setSidebarCollapsed(true);
    setSidebarManualOverride(true);
  }, []);

  const handleSidebarShow = useCallback(() => {
    setSidebarCollapsed(false);
    setSidebarManualOverride(true);
  }, []);

  const handleViewModeChange = useCallback(
    (mode: "graph" | "split" | "linear") => {
      if (mode === "linear") {
        setSidebarCollapsed(false);
        setSidebarManualOverride(false);
        return;
      }
      if (mode === "split") {
        if (!sidebarManualOverride) {
          setSidebarCollapsed(true);
        }
        return;
      }
      if (!sidebarManualOverride) {
        setSidebarCollapsed(false);
      }
    },
    [sidebarManualOverride]
  );

  // Handle frames change
  const handleFramesChange = useCallback(
    (newFrames: any[]) => {
      // Get existing frames from storage
      const existingFrames = unifiedStorage.frames;
      
      // Convert the frames to ensure they have the correct type and order
      // AND assign timeCapsuleId + sessionId for proper isolation (FRESH data, no stale closures)
      const convertedFrames = newFrames.map((frame) => ({
        ...frame,
        order: frame.order ?? 0,
        // Assign IDs inline with FRESH data (Sage Cheat Sheet compliance - no stale closures)
        timeCapsuleId: frame.timeCapsuleId && frame.timeCapsuleId !== 'default'
          ? frame.timeCapsuleId 
          : timeCapsule.activeTimeCapsuleId || frame.timeCapsuleId || '',
        sessionId: frame.sessionId || flowBuilder.activeSessionId || undefined,
      }));

      // Create a map of existing frames by ID
      const frameMap = new Map(existingFrames.map(f => [f.id, f]));
      
      // Merge: update existing frames or add new ones
      convertedFrames.forEach(newFrame => {
        frameMap.set(newFrame.id, newFrame);
      });
      
      // Convert back to array
      const mergedFrames = Array.from(frameMap.values());

      console.log(`🔧 handleFramesChange: Merged ${convertedFrames.length} new frames with ${existingFrames.length} existing frames`, {
        totalAfterMerge: mergedFrames.length,
        activeTimeCapsuleId: timeCapsule.activeTimeCapsuleId,
        activeSessionId: flowBuilder.activeSessionId,
        framesWithBoth: mergedFrames.filter(f => f.timeCapsuleId && f.sessionId).length,
      });

      // Update storage with MERGED frames
      unifiedStorage.updateFrames(mergedFrames);
      
      // Sync deletions to active session
      if (flowBuilder.syncFrameDeletions && flowBuilder.frameDrafts.length > 0) {
        const currentFrameIds = new Set(mergedFrames.map(f => f.id));
        flowBuilder.syncFrameDeletions(currentFrameIds);
      }
    },
    [unifiedStorage, flowBuilder, timeCapsule.activeTimeCapsuleId]
  );

  const handleCreateFrame = useCallback(
    (options: CreateFrameOptions = {}): AIFrame => {
      const { title, goal, chapterId, selectFrame = true } = options;
      const now = new Date().toISOString();
      const currentSessionId = flowBuilder.activeSessionId || undefined;
      const currentTimeCapsuleId = timeCapsule.activeTimeCapsuleId || undefined;
      const existingOrders = unifiedStorage.frames
        .map((frame) => (typeof frame.order === "number" ? frame.order : null))
        .filter((value): value is number => value !== null);
      const nextOrder = existingOrders.length
        ? Math.max(...existingOrders) + 1
        : 1;

      // Auto-create manual session if needed
      let sessionForFrame: string | null = flowBuilder.activeSessionId;
      console.log(`📊 [PAGE] Before session check - activeSessionId: ${flowBuilder.activeSessionId}, sessions count: ${flowBuilder.sessions.length}`);
      
      if (!flowBuilder.activeSessionId || 
          (flowBuilder.sessions.find(s => s.id === flowBuilder.activeSessionId)?.source !== "manual")) {
        console.log("🆕 [PAGE] Auto-creating manual session for manual frame creation");
        const newSession = flowBuilder.createNewSession("manual", "Manual Session", triggerGraphReset, {
          skipClear: true, // Auto-creation: preserve any existing nodes
          timeCapsuleId: timeCapsule.activeTimeCapsuleId || undefined
        });
        sessionForFrame = newSession.id;
        console.log(`✅ [PAGE] Created session ${sessionForFrame}`);
        console.log(`📋 [PAGE] Sessions array now:`, flowBuilder.sessions.map(s => ({ id: s.id, name: s.name })));
      } else {
        console.log(`✓ [PAGE] Using existing session: ${sessionForFrame}`);
      }

      const fallbackIndex = unifiedStorage.frames.length + 1;
      const newFrame: AIFrame = {
        id: generateFrameId(),
        title: title?.trim() || `Untitled Frame ${fallbackIndex}`,
        goal: goal?.trim() || "",
        informationText: "",
        videoUrl: "",
        startTime: 0,
        duration: 0,
        afterVideoText: "",
        aiConcepts: [],
        conceptIds: [],
        isGenerated: false,
        sourceGoal: "",
        sourceUrl: "",
        order: nextOrder,
        bubblSpaceId: undefined,
        timeCapsuleId: undefined,
        parentFrameId: chapterId,
        chapterId,
        type: "frame",
        createdAt: now,
        updatedAt: now,
        sessionId: sessionForFrame || flowBuilder.activeSessionId || undefined,
        attachment: undefined,
        notes: "",
        documents: [],
      };

      const updatedFrames = [...unifiedStorage.frames, newFrame];
      unifiedStorage.updateFrames(updatedFrames);

      // Sync frame to active session (use sessionForFrame which has the just-created session ID)
      if (sessionForFrame && flowBuilder.syncFrameToSession) {
        console.log(`🔄 Syncing frame ${newFrame.id} to session ${sessionForFrame}`);
        flowBuilder.syncFrameToSession(newFrame);
      }

      if (selectFrame) {
        const newIndex = updatedFrames.findIndex((frame) => frame.id === newFrame.id);
        if (newIndex >= 0) {
          setCurrentFrameIndex(newIndex);
        }
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("external-frame-created", {
            detail: { frame: newFrame },
          })
        );
      }

      return newFrame;
    },
    [setCurrentFrameIndex, unifiedStorage.frames, unifiedStorage.updateFrames, flowBuilder]
  );

  const handleCreateFrameInline = useCallback(
    async (options: CreateFrameOptions = {}): Promise<AIFrame> => {
      const frame = handleCreateFrame({ ...options, selectFrame: false });
      if (frame && frame.id) {
        setPendingChapterFrames((prev) => ({
          ...prev,
          [frame.id]: frame,
        }));
      }
      return frame;
    },
    [handleCreateFrame]
  );

  // ✅ NEW: Helper to ensure a manual session exists for frame drops
  const ensureManualSession = useCallback(() => {
    console.log("🔍 Checking for manual session...", {
      activeSessionId: flowBuilder.activeSessionId,
      sessionsCount: flowBuilder.sessions.length,
    });

    // If no active session OR active session is not manual, create one
    if (
      !flowBuilder.activeSessionId ||
      flowBuilder.sessions.find((s) => s.id === flowBuilder.activeSessionId)?.source !== "manual"
    ) {
      console.log("🆕 Auto-creating manual session for frame drop");
      const newSession = flowBuilder.createNewSession("manual", "Manual Session", triggerGraphReset, { 
        skipClear: true, // Don't clear workspace during auto-creation
        timeCapsuleId: timeCapsule.activeTimeCapsuleId || undefined
      });
      console.log("✅ Manual session created:", newSession.id);
      return newSession.id;
    }

    console.log("✅ Using existing manual session:", flowBuilder.activeSessionId);
    return flowBuilder.activeSessionId;
  }, [flowBuilder, triggerGraphReset, timeCapsule.activeTimeCapsuleId]);

  // ✅ NEW: Event listener for ensuring manual session on frame drop
  useEffect(() => {
    const handleEnsureManualSession = () => {
      ensureManualSession();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("ensure-manual-session", handleEnsureManualSession);
      return () => window.removeEventListener("ensure-manual-session", handleEnsureManualSession);
    }
  }, [ensureManualSession]);

  // ✅ NEW: Auto-assign sessionId to orphaned frames after they're saved
  useEffect(() => {
    if (!flowBuilder.activeSessionId) return;
    
    const orphanedFrames = unifiedStorage.frames.filter(f => 
      !f.sessionId && 
      (!f.timeCapsuleId || f.timeCapsuleId === timeCapsule.activeTimeCapsuleId)
    );
    
    if (orphanedFrames.length > 0) {
      console.log(`🔧 Found ${orphanedFrames.length} orphaned frames, assigning to session ${flowBuilder.activeSessionId}`);
      
      const fixedFrames = unifiedStorage.frames.map(f => 
        (!f.sessionId && (!f.timeCapsuleId || f.timeCapsuleId === timeCapsule.activeTimeCapsuleId))
          ? { 
              ...f, 
              sessionId: flowBuilder.activeSessionId || undefined,
              timeCapsuleId: timeCapsule.activeTimeCapsuleId || f.timeCapsuleId
            }
          : f
      );
      
      unifiedStorage.updateFrames(fixedFrames);
      console.log(`✅ Assigned sessionId to ${orphanedFrames.length} orphaned frames`);
      
      // Update session frame count after assignment
      if (flowBuilder.activeSessionId) {
        flowBuilder.updateSessionFrameCount(fixedFrames);
      }
    }
  }, [unifiedStorage.frames.length, flowBuilder.activeSessionId, flowBuilder.updateSessionFrameCount, timeCapsule.activeTimeCapsuleId, unifiedStorage]);

  // ✅ NEW: Auto-assign sessionId/timeCapsuleId to orphaned chapters so linear view sees them
  useEffect(() => {
    if (!flowBuilder.activeSessionId) return;
    
    const orphanedChapters = unifiedStorage.chapters.filter(c =>
      !c.sessionId &&
      (!c.timeCapsuleId || c.timeCapsuleId === timeCapsule.activeTimeCapsuleId)
    );
    
    if (orphanedChapters.length > 0) {
      console.log(`🔧 Found ${orphanedChapters.length} orphaned chapters, assigning to session ${flowBuilder.activeSessionId}`);
      
      const fixedChapters = unifiedStorage.chapters.map(c =>
        (!c.sessionId && (!c.timeCapsuleId || c.timeCapsuleId === timeCapsule.activeTimeCapsuleId))
          ? { 
              ...c, 
              sessionId: flowBuilder.activeSessionId || undefined,
              timeCapsuleId: timeCapsule.activeTimeCapsuleId || c.timeCapsuleId 
            }
          : c
      );
      
      unifiedStorage.updateChapters(fixedChapters);
      console.log(`✅ Assigned sessionId to ${orphanedChapters.length} orphaned chapters`);
    }
  }, [unifiedStorage.chapters.length, flowBuilder.activeSessionId, timeCapsule.activeTimeCapsuleId, unifiedStorage]);

  // ✅ NEW: Event listener for AI Flow session continuation dialog
  useEffect(() => {
    const handleAIFlowSessionCheck = (event: any) => {
      const { currentSession } = event.detail;
      console.log("🔔 Received AI Flow session check event", { currentSession });

      setSessionDialogConfig({
        type: "ai-flow",
        currentSessionName: currentSession?.name,
        onContinue: () => {
          window.dispatchEvent(
            new CustomEvent("ai-flow-session-response", {
              detail: { createNew: false },
            })
          );
          setShowSessionDialog(false);
        },
        onCreateNew: () => {
          window.dispatchEvent(
            new CustomEvent("ai-flow-session-response", {
              detail: { createNew: true },
            })
          );
          setShowSessionDialog(false);
        },
      });
      setShowSessionDialog(true);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("ai-flow-session-check", handleAIFlowSessionCheck);
      return () => window.removeEventListener("ai-flow-session-check", handleAIFlowSessionCheck);
    }
  }, [setSessionDialogConfig, setShowSessionDialog]);

  const handleAcceptAIFrames = useCallback(
    (frames: AIFrame[], plannerChapters?: PlannerChapter[]) => {
      if (!frames.length) return;

      const existingMaxOrder = unifiedStorage.frames.reduce(
        (max, frame) =>
          typeof frame.order === "number"
            ? Math.max(max, frame.order)
            : max,
        0
      );

      const timestamp = new Date().toISOString();
      const normalized: UnifiedAIFrame[] = frames.map((frame, index) => ({
        ...frame,
        order: existingMaxOrder + index + 1,
        createdAt: frame.createdAt || timestamp,
        updatedAt: timestamp,
        sessionId:
          frame.sessionId || flowBuilder.activeSessionId || undefined,
        timeCapsuleId:
          frame.timeCapsuleId ||
          timeCapsule.activeTimeCapsuleId ||
          undefined,
        metadata: {
          version: "2.0",
          createdAt: frame.createdAt || timestamp,
          updatedAt: timestamp,
          source: "ai-frames" as const,
          lastSaved: timestamp,
        },
      }));

      // Debug logging to verify frame IDs match chapter references
      console.log(`📦 Accept All: Pushing ${normalized.length} frames and ${plannerChapters?.length || 0} chapters`);
      console.log(`📦 Frame IDs:`, normalized.map(f => f.id));
      console.log(`📦 Chapter frame mappings:`, plannerChapters?.map(c => ({ chapterId: c.id, frameIds: c.frames.map(f => f.id) })));

      // ✅ REPLACE AI Flow content (not append) - Remove old AI Flow frames/chapters
      // Keep frames from other sources (manual, SWE-bridge, etc.)
      const oldAIFlowFrameIds = unifiedStorage.frames
        .filter(f => f.metadata?.source === "ai-frames")
        .map(f => f.id);
      
      const nonAIFlowFrames = unifiedStorage.frames.filter(
        f => f.metadata?.source !== "ai-frames"
      );
      
      // Remove chapters that reference old AI Flow frames
      const nonAIFlowChapters = unifiedStorage.chapters.filter(
        c => !c.frameIds.some(fid => oldAIFlowFrameIds.includes(fid))
      );

      console.log(`🔄 Replacing AI Flow content: removing ${oldAIFlowFrameIds.length} old frames, adding ${normalized.length} new frames`);

      // ⚠️ CRITICAL FIX: Regenerate graphState with CONVERTED frames (not raw generator output)
      // The plan.graphState contains raw attachment data; we need to regenerate with normalized frames
      let graphStateToUse: any = null;
      let chaptersToUse = nonAIFlowChapters;
      
      if (plannerChapters && plannerChapters.length > 0) {
        // ALWAYS regenerate graphState with normalized (converted) frames
        // This ensures attachment data is properly structured
        const allFrames = [...nonAIFlowFrames, ...normalized];
        graphStateToUse = flowBuilder.generateGraphState(plannerChapters, allFrames);
        console.log(`✅ Regenerated graphState with ${normalized.length} converted frames (proper attachment structure)`);
        
        // ✅ FIX: Convert plannerChapters to Chapter[] format to replace old chapters
        const convertedChapters: Chapter[] = plannerChapters.map((pc) => ({
          id: pc.id,
          title: pc.title,
          description: pc.goal,
          color: pc.color,
          order: pc.order,
          frameIds: pc.frames.map(f => f.id),
          conceptIds: [],
          createdAt: timestamp,
          updatedAt: timestamp,
          sessionId: flowBuilder.activeSessionId || undefined,
          timeCapsuleId: timeCapsule.activeTimeCapsuleId || undefined,
        }));
        
        chaptersToUse = [...nonAIFlowChapters, ...convertedChapters];
        console.log(`🔄 Chapters: removing ${unifiedStorage.chapters.length - nonAIFlowChapters.length} old AI Flow chapters, adding ${convertedChapters.length} new chapters`);
      } else {
        // Fallback: no plannerChapters means manual frames only
        console.warn('⚠️ No plannerChapters provided');
      }

      // ✅ ATOMIC UPDATE: Use batch update (like SWE Bridge) to prevent race conditions
      console.log('✅ Using atomic batchUpdate with replaced content (prevents duplicate nodes)');
      unifiedStorage.batchUpdate({
        frames: [...nonAIFlowFrames, ...normalized],
        chapters: chaptersToUse,
        graphState: graphStateToUse,
      });
      
      // Debug: Log state after batchUpdate
      console.log('📊 After batchUpdate:', {
        frameCount: unifiedStorage.frames.length,
        chapterCount: unifiedStorage.chapters.length,
        graphStateNodeCount: graphStateToUse?.nodes?.length,
        graphStateChapterNodeCount: graphStateToUse?.nodes?.filter((n: any) => n.type === 'chapter').length,
        graphStateFrameNodeCount: graphStateToUse?.nodes?.filter((n: any) => n.type === 'aiframe').length,
      });

      // Trigger auto-layout
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auto-layout-requested", {
            detail: { source: "ai-flow-accept" },
          })
        );
      }

      // Close Flow Builder panel after accepting frames
      setIsFlowPanelOpen(false);
      console.log('✅ Flow Builder panel closed after accepting frames');
    },
    [unifiedStorage, flowBuilder, setIsFlowPanelOpen]
  );

  const handleExportFrames = useCallback(() => {
    try {
      const payload = exportFramesToJson(
        unifiedStorage.frames,
        unifiedStorage.chapters,
        unifiedStorage.graphState
      );
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-frames-${new Date().toISOString().split("T")[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      console.error("Failed to export AI Frames:", exportError);
    }
  }, [unifiedStorage.frames, unifiedStorage.chapters, unifiedStorage.graphState]);

  const handleImportFramesFromFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const importResult = importFramesFromJson(text);
        const {
          frames: importedFrames,
          chapters: importedChapters,
          graphState: importedGraphState,
          metadata,
        } = importResult;

        if (!importedFrames.length && !importedChapters.length) {
          console.warn("Import skipped: no frames or chapters found in file");
          return;
        }

        const timestamp = new Date().toISOString();
        const normalizedFrames = importedFrames.map((frame, index) => ({
          ...frame,
          id:
            metadata.isFullExport && frame.id
              ? frame.id
              : generateFrameId(),
          order:
            typeof frame.order === "number" ? frame.order : index + 1,
          createdAt: frame.createdAt || timestamp,
          updatedAt:
            metadata.isFullExport && frame.updatedAt
              ? frame.updatedAt
              : timestamp,
        }));

        if (metadata.isFullExport) {
          unifiedStorage.updateFrames(normalizedFrames);
          unifiedStorage.updateChapters(importedChapters);
          if (importedGraphState) {
            unifiedStorage.updateGraphState(importedGraphState);
          }
          return;
        }

        const maxOrder = unifiedStorage.frames.reduce(
          (max, frame) =>
            typeof frame.order === "number"
              ? Math.max(max, frame.order)
              : max,
          0
        );

        const appendedFrames = normalizedFrames.map((frame, index) => ({
          ...frame,
          order: maxOrder + index + 1,
          updatedAt: timestamp,
        }));

        unifiedStorage.updateFrames([
          ...unifiedStorage.frames,
          ...appendedFrames,
        ]);
      } catch (importError) {
        console.error("Failed to import AI Frames:", importError);
      }
    },
    [
      unifiedStorage.frames,
      unifiedStorage.chapters,
      unifiedStorage.graphState,
      unifiedStorage.updateFrames,
      unifiedStorage.updateChapters,
      unifiedStorage.updateGraphState,
    ]
  );

  const resetChapterDialogState = useCallback(() => {
    setEditingChapter(null);
    setChapterFormData({ ...EMPTY_CHAPTER_FORM });
    setSelectedChapterFrameIds([]);
  }, []);

  const determineChapterSequential = useCallback(
    (chapter: Chapter | null): boolean => {
      if (chapter?.linkSequentially === true) {
        return true;
      }
      if (chapter?.linkSequentially === false) {
        return false;
      }
      if (!chapter || !Array.isArray(chapter.frameIds) || chapter.frameIds.length < 2) {
        return false;
      }

      const frameIds = chapter.frameIds.filter(Boolean);
      if (frameIds.length < 2) {
        return false;
      }

      const nodes = unifiedStorage.graphState?.nodes || [];
      const edges = unifiedStorage.graphState?.edges || [];
      if (!nodes.length || !edges.length) {
        return false;
      }

      const nodeLookup = new Map<string, string>();
      nodes.forEach((node: any) => {
        if (node?.type === "aiframe") {
          const frameId = node?.data?.frameId;
          if (frameId && frameIds.includes(frameId)) {
            nodeLookup.set(frameId, node.id);
          }
        }
      });

      if (nodeLookup.size < frameIds.length) {
        return false;
      }

      for (let index = 0; index < frameIds.length - 1; index += 1) {
        const sourceNodeId = nodeLookup.get(frameIds[index]);
        const targetNodeId = nodeLookup.get(frameIds[index + 1]);
        if (!sourceNodeId || !targetNodeId) {
          return false;
        }

        const hasEdge = edges.some(
          (edge: any) => edge.source === sourceNodeId && edge.target === targetNodeId
        );
        if (!hasEdge) {
          return false;
        }
      }

      return true;
    },
    [unifiedStorage.graphState]
  );

  const openCreateChapterDialog = useCallback(() => {
    resetChapterDialogState();
    setPendingChapterFrames({});
    setShowChapterDialog(true);
  }, [resetChapterDialogState]);

  const openEditChapterDialog = useCallback(
    (chapter: Chapter) => {
      setEditingChapter(chapter);
      setChapterFormData({
        title: chapter.title || "",
        description: chapter.description || "",
        color: chapter.color || DEFAULT_CHAPTER_COLOR,
        conceptIds: chapter.conceptIds || [],
        linkSequentially:
          typeof chapter.linkSequentially === "boolean"
            ? chapter.linkSequentially
            : determineChapterSequential(chapter),
      });
      setSelectedChapterFrameIds(chapter.frameIds || []);
      setShowChapterDialog(true);
    },
    [determineChapterSequential]
  );

  const handleChapterFrameSelection = useCallback((frameId: string, isSelected: boolean) => {
    setSelectedChapterFrameIds((prev) => {
      if (isSelected) {
        if (prev.includes(frameId)) {
          return prev;
        }
        return [...prev, frameId];
      }
      return prev.filter((id) => id !== frameId);
    });
  }, []);

  const deselectAllChapterFrames = useCallback(() => {
    setSelectedChapterFrameIds([]);
  }, []);

  const getFramesSnapshot = useCallback((): UnifiedAIFrame[] => {
    const frameMap = new Map<string, UnifiedAIFrame>();

    unifiedStorage.frames.forEach((frame) => {
      frameMap.set(frame.id, frame);
    });

    Object.values(pendingChapterFrames).forEach((frame) => {
      if (frameMap.has(frame.id)) {
        return;
      }
      const createdAt = frame.createdAt || new Date().toISOString();
      const updatedAt = frame.updatedAt || createdAt;
      frameMap.set(frame.id, {
        ...frame,
        metadata: {
          version: "2.0",
          createdAt,
          updatedAt,
          source: "ai-frames" as const,
          lastSaved: "",
        },
      });
    });

    return Array.from(frameMap.values());
  }, [pendingChapterFrames, unifiedStorage.frames]);

  const applyChapterAssignments = useCallback(
    (chapterId: string, frameIds: string[], frames: UnifiedAIFrame[]): UnifiedAIFrame[] => {
      const selectedSet = new Set(frameIds);
      return frames.map((frame) => {
        if (selectedSet.has(frame.id)) {
          return {
            ...frame,
            chapterId,
            parentFrameId: chapterId,
          };
        }

        if (frame.chapterId === chapterId && !selectedSet.has(frame.id)) {
          return {
            ...frame,
            chapterId: undefined,
            parentFrameId: undefined,
          };
        }

        if (selectedSet.has(frame.id) && frame.chapterId && frame.chapterId !== chapterId) {
          return {
            ...frame,
            chapterId,
            parentFrameId: chapterId,
          };
        }

        return frame;
      });
    },
    []
  );

  const syncChapterFrames = useCallback(
    (chapters: Chapter[], frames: UnifiedAIFrame[]): Chapter[] =>
      chapters.map((chapter, index) => ({
        ...chapter,
        frameIds: frames
          .filter((frame) => frame.chapterId === chapter.id)
          .map((frame) => frame.id),
        order: typeof chapter.order === "number" ? chapter.order : index,
      })),
    []
  );

  const queueSequentialUnlink = useCallback((chapterId: string) => {
    if (typeof window === "undefined" || !chapterId) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("unlink-chapter-frames-sequentially", {
        detail: { chapterId },
      })
    );
  }, []);

  const queueSequentialLink = useCallback((chapterId: string, frameIds: string[]) => {
    if (typeof window === "undefined" || !chapterId || frameIds.length < 2) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("link-chapter-frames-sequentially", {
        detail: { chapterId, frameIds, attempt: 0 },
      })
    );
  }, []);

  const handleDeleteChapter = useCallback(
    (chapterId: string) => {
      const filteredChapters = unifiedStorage.chapters.filter(
        (chapter) => chapter.id !== chapterId
      );

      const updatedFrames = unifiedStorage.frames.map((frame) =>
        frame.chapterId === chapterId
          ? { ...frame, chapterId: undefined, parentFrameId: undefined }
          : frame
      );

      const reorderedChapters = syncChapterFrames(
        filteredChapters.map((chapter, index) => ({
          ...chapter,
          order: index,
        })),
        updatedFrames
      );

      unifiedStorage.updateFrames(updatedFrames);
      unifiedStorage.updateChapters(reorderedChapters);
    },
    [unifiedStorage.chapters, unifiedStorage.frames, syncChapterFrames]
  );

  // Knowledge Base search
  const handleKnowledgeBaseSearch = useCallback(async () => {
    if (!providerVectorStore || !documentSearchQuery.trim()) {
      setShowSemanticResults(false);
      setSemanticSearchResults([]);
      setCurrentSemanticQuery("");
      return;
    }

    setIsSearching(true);
    try {
      const results = await providerVectorStore.searchSimilar(
        documentSearchQuery,
        searchThreshold,
        30
      );

      setSemanticSearchResults(results);
      setCurrentSemanticQuery(documentSearchQuery);
      setShowSemanticResults(results.length > 0);
    } catch (error) {
      console.error("KB Semantic search failed:", error);
      setSemanticSearchResults([]);
      setShowSemanticResults(false);
    } finally {
      setIsSearching(false);
    }
  }, [providerVectorStore, documentSearchQuery, searchThreshold]);

  // Clear Knowledge Base search
  const clearKnowledgeBaseSearch = useCallback(() => {
    setDocumentSearchQuery("");
    setShowSemanticResults(false);
    setSemanticSearchResults([]);
    setCurrentSemanticQuery("");
  }, []);

  const handleOpenExportDialog = useCallback(() => {
    const defaultTitle = `AI Frames Lesson Plan (${new Date().toLocaleDateString()})`;
    const defaultSubtitle = `Frames: ${workspaceStats.frames} · Chapters: ${workspaceStats.chapters}`;

    setExportForm((prev) => {
      const nextTitle = prev.title || defaultTitle;
      const nextSubtitle = prev.subtitle || defaultSubtitle;
      if (prev.title === nextTitle && prev.subtitle === nextSubtitle) {
        return prev;
      }
      return {
        ...prev,
        title: nextTitle,
        subtitle: nextSubtitle,
      };
    });

    setExportDialogOpen(true);
  }, [workspaceStats.frames, workspaceStats.chapters]);

  const handleExportPDF = useCallback(() => {
    const timestamp = new Date();
    const title =
      exportForm.title.trim() ||
      `AI Frames Lesson Plan (${timestamp.toLocaleDateString()})`;
    const subtitle =
      exportForm.subtitle.trim() ||
      `Frames: ${workspaceStats.frames} · Chapters: ${workspaceStats.chapters}`;
    const orderedChapters = [...unifiedStorage.chapters].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
    const printableChapters: PrintableChapterSummary[] = orderedChapters.map(
      (chapter, index) => {
        const mergedFramesMap = new Map<string, UnifiedAIFrame>();
        unifiedStorage.frames.forEach((frame) => {
          const belongsToChapter =
            frame.chapterId === chapter.id ||
            frame.parentFrameId === chapter.id ||
            (chapter.frameIds?.includes(frame.id) ?? false);
          if (belongsToChapter) {
            mergedFramesMap.set(frame.id, frame);
          }
        });
        const mergedFrames = Array.from(mergedFramesMap.values()).sort(
          (a, b) => {
            const posA = chapter.frameIds?.indexOf(a.id) ?? -1;
            const posB = chapter.frameIds?.indexOf(b.id) ?? -1;
            const orderA = a.order ?? (posA >= 0 ? posA : Number.MAX_SAFE_INTEGER);
            const orderB = b.order ?? (posB >= 0 ? posB : Number.MAX_SAFE_INTEGER);
            return orderA - orderB;
          }
        );
        return {
          title: chapter.title || `Chapter ${index + 1}`,
          description: chapter.description,
          frames: mergedFrames.map((frame) => ({
            title: frame.title || "Untitled frame",
            goal:
              frame.goal ||
              frame.informationText ||
              frame.afterVideoText ||
              "",
            context: frame.informationText,
            takeaways: frame.afterVideoText,
            notes: frame.notes,
            concepts: frame.conceptIds?.length
              ? frame.conceptIds
              : frame.aiConcepts || [],
            attachments: extractFrameAttachments(frame),
          })),
          index: index + 1,
        };
      }
    );
    const printableStandalone: PrintableFrameSummary[] = standaloneFrames.map(
      (frame) => ({
        title: frame.title || "Untitled frame",
        goal:
          frame.goal || frame.informationText || frame.afterVideoText || "",
        context: frame.informationText,
        takeaways: frame.afterVideoText,
        notes: frame.notes,
        concepts: frame.conceptIds?.length
          ? frame.conceptIds
          : frame.aiConcepts || [],
        attachments: extractFrameAttachments(frame),
      })
    );
    const graphState = unifiedStorage.graphState;
    const nodeLabelLookup =
      graphState?.nodes?.reduce<Record<string, string>>((acc, node) => {
        acc[node.id] =
          node.data?.title || node.data?.label || node.id || "Untitled";
        return acc;
      }, {}) || {};
    const graphEdges =
      graphState?.edges?.map((edge) => ({
        source: nodeLabelLookup[edge.source] || edge.source,
        target: nodeLabelLookup[edge.target] || edge.target,
      })) || [];

    const exportHtml = generateFramesExportHtml({
      title,
      subtitle,
      stats: {
        frames: workspaceStats.frames,
        chapters: workspaceStats.chapters,
        concepts: workspaceStats.concepts,
      },
      chapters: printableChapters,
      standaloneFrames: printableStandalone,
      includeGraph: exportForm.includeGraph,
      graphEdges,
      generatedAt: timestamp.toLocaleString(),
    });
    if (process.env.NODE_ENV !== "production") {
      console.log("[AI Frames] Export payload", {
        chapters: printableChapters.length,
        chapterFrames: printableChapters.map((chapter) => ({
          title: chapter.title,
          frames: chapter.frames.length,
        })),
        standaloneFrames: printableStandalone.length,
      });
    }

    openPrintPreview(exportHtml);
    setExportDialogOpen(false);
  }, [
    exportForm,
    framesByChapter,
    standaloneFrames,
    frameLookup,
    extractFrameAttachments,
    unifiedStorage.chapters,
    unifiedStorage.graphState,
    workspaceStats.chapters,
    workspaceStats.concepts,
    workspaceStats.frames,
  ]);


  const handleOpenDocumentChunks = useCallback(
    async (
      docId: string,
      options: { document?: any | null; chunkId?: string } = {}
    ) => {
      try {
        let docData = options.document;
        if (!docData || !Array.isArray(docData.chunks)) {
          docData =
            documents.find((doc) => doc.id === docId) ||
            (providerVectorStore
              ? await providerVectorStore.getDocument(docId)
              : null);
        }

        if (!docData) {
          console.warn("Document not found in knowledge base:", docId);
          return;
        }

        const chunks = Array.isArray(docData.chunks)
          ? docData.chunks
          : docData.content
          ? [
              {
                id: `${docId}-full`,
                content: docData.content,
                startIndex: 0,
                endIndex: docData.content.length,
              },
            ]
          : [];

        const selectedChunk =
          (options.chunkId &&
            chunks.find((chunk: any) => chunk.id === options.chunkId)) ||
          (chunks.length
            ? chunks[0]
            : {
                id: `${docId}-placeholder`,
                content: docData.content || "No content available",
                startIndex: 0,
                endIndex: (docData.content || "").length,
              });

        setChunkViewerDocument(docData);
        setChunkViewerChunks(chunks);
        setCurrentChunk(selectedChunk);
        setShowChunkView(true);
      } catch (error) {
        console.error("Failed to open document chunks:", error);
      }
    },
    [documents, providerVectorStore]
  );

  const handleNavigateChunk = useCallback(
    (chunkId: string) => {
      const nextChunk = chunkViewerChunks.find((chunk) => chunk.id === chunkId);
      if (nextChunk) {
        setCurrentChunk(nextChunk);
      }
    },
    [chunkViewerChunks]
  );

  // Download document
  const downloadDocument = useCallback(
    (docId: string) => {
      const doc = documents.find((d) => d.id === docId);
      if (doc) {
        const blob = new Blob([doc.content], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${doc.title}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    [documents]
  );

  useEffect(() => {
    if (!showChunkView) {
      setChunkViewerDocument((prev: any) => (prev ? null : prev));
      setChunkViewerChunks((prev: any) => (prev.length ? [] : prev));
      setCurrentChunk((prev: any) => (prev ? null : prev));
    }
  }, [showChunkView]);

  // Delete document
  const deleteDocument = useCallback(
    async (docId: string) => {
      if (providerVectorStore) {
        try {
          await providerVectorStore.deleteDocument(docId);
          setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
        } catch (error) {
          console.error("Failed to delete document:", error);
        }
      }
    },
    [providerVectorStore]
  );

  // ============================================================================
  // MEMOIZED VALUES - Computed values that depend on state
  // ============================================================================

  // Fix FrameGraphIntegration props by ensuring order is always a number
  const framesWithOrder = useMemo(
    () =>
      sessionFilteredFrames.map((frame) => ({
        ...frame,
        order: frame.order ?? 0,
      })),
    [sessionFilteredFrames]
  );

  const frameOrderLookup = useMemo(() => {
    const lookup = new Map<string, number>();
    framesWithOrder.forEach((frame) => {
      lookup.set(frame.id, typeof frame.order === "number" ? frame.order : 0);
    });

    let fallbackOrder = framesWithOrder.length + 1;
    Object.values(pendingChapterFrames).forEach((frame) => {
      if (!lookup.has(frame.id)) {
        const orderValue =
          typeof frame.order === "number" ? frame.order : fallbackOrder;
        lookup.set(frame.id, orderValue);
        fallbackOrder += 1;
      }
    });

    return lookup;
  }, [framesWithOrder, pendingChapterFrames]);

  const getOrderedFrameIds = useCallback(
    (frameIds: string[]): string[] => {
      const maxOrder = Number.MAX_SAFE_INTEGER;
      return [...frameIds].sort((a, b) => {
        const orderA = frameOrderLookup.get(a) ?? maxOrder;
        const orderB = frameOrderLookup.get(b) ?? maxOrder;
        if (orderA === orderB) {
          return a.localeCompare(b);
        }
        return orderA - orderB;
      });
    },
    [frameOrderLookup]
  );

  const framesForChapterDialog = useMemo<UnifiedAIFrame[]>(() => {
    const existingIds = new Set(framesWithOrder.map((frame) => frame.id));
    const additionalFrames = Object.values(pendingChapterFrames)
      .filter((frame) => !existingIds.has(frame.id))
      .map<UnifiedAIFrame>((frame) => {
        const createdAt = frame.createdAt || new Date().toISOString();
        const updatedAt = frame.updatedAt || createdAt;
        return {
          ...frame,
          metadata: {
            version: "2.0",
            createdAt,
            updatedAt,
            source: "ai-frames" as const,
            lastSaved: "",
          },
        };
      });

    return [...framesWithOrder, ...additionalFrames];
  }, [framesWithOrder, pendingChapterFrames]);

  const selectAllChapterFrames = useCallback(() => {
    const framesToSelect = framesForChapterDialog.filter((frame) => {
      if (editingChapter) {
        return true;
      }
      return !frame.chapterId;
    });
    setSelectedChapterFrameIds(framesToSelect.map((frame) => frame.id));
  }, [framesForChapterDialog, editingChapter]);

  const handleCreateChapter = useCallback(() => {
    const trimmedTitle = chapterFormData.title.trim();
    if (!trimmedTitle) {
      return;
    }

    setShowChapterProcessing(true);
    if (chapterProcessingTimeoutRef.current) {
      clearTimeout(chapterProcessingTimeoutRef.current);
    }
    chapterProcessingTimeoutRef.current = setTimeout(() => {
      setShowChapterProcessing(false);
      chapterProcessingTimeoutRef.current = null;
    }, 30000);

    try {
      const orderedSelection = getOrderedFrameIds(selectedChapterFrameIds);
      const chapterId = `chapter_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const now = new Date().toISOString();
      const currentSessionId = flowBuilder.activeSessionId || undefined;
      const currentTimeCapsuleId = timeCapsule.activeTimeCapsuleId || undefined;

      const frameSnapshot = getFramesSnapshot();
      const updatedFrames = applyChapterAssignments(
        chapterId,
        orderedSelection,
        frameSnapshot
      );

      const baseChapter: Chapter = {
        id: chapterId,
        title: trimmedTitle,
        description: chapterFormData.description.trim(),
        color: chapterFormData.color || DEFAULT_CHAPTER_COLOR,
        conceptIds: Array.from(new Set(chapterFormData.conceptIds)).filter(Boolean),
        frameIds: orderedSelection,
        order: unifiedStorage.chapters.length,
        timeCapsuleId: currentTimeCapsuleId,
        sessionId: currentSessionId,
        createdAt: now,
        updatedAt: now,
        linkSequentially: chapterFormData.linkSequentially,
      };

      const chaptersWithNew = [...unifiedStorage.chapters, baseChapter];
      const framesWithAssignments = updatedFrames.map(frame =>
        orderedSelection.includes(frame.id)
          ? { 
              ...frame, 
              chapterId: chapterId, 
              parentFrameId: chapterId,
              sessionId: frame.sessionId || currentSessionId,
              timeCapsuleId: frame.timeCapsuleId || currentTimeCapsuleId
            }
          : frame
      );

      const chaptersWithAssignments = syncChapterFrames(chaptersWithNew, framesWithAssignments).map(
        (chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                conceptIds: baseChapter.conceptIds,
                color: baseChapter.color,
                description: baseChapter.description,
                createdAt: baseChapter.createdAt,
                updatedAt: now,
                order: baseChapter.order,
                frameIds: orderedSelection,
                linkSequentially: baseChapter.linkSequentially,
                sessionId: chapter.sessionId || currentSessionId,
                timeCapsuleId: chapter.timeCapsuleId || currentTimeCapsuleId
              }
            : chapter
      );

      unifiedStorage.updateFrames(framesWithAssignments);
      unifiedStorage.updateChapters(chaptersWithAssignments);
      setPendingChapterFrames((prev) => {
        if (!prev) {
          return prev;
        }
        const next = { ...prev };
        orderedSelection.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      setShowChapterDialog(false);
      resetChapterDialogState();

      queueSequentialUnlink(chapterId);
      if (chapterFormData.linkSequentially && orderedSelection.length > 1) {
        setTimeout(() => queueSequentialLink(chapterId, orderedSelection), 300);
      }

      broadcastChapterGraphSync(baseChapter, orderedSelection);
      dispatchForceSave("chapter-created");
    } catch (error) {
      console.error("Failed to create chapter:", error);
      if (chapterProcessingTimeoutRef.current) {
        clearTimeout(chapterProcessingTimeoutRef.current);
        chapterProcessingTimeoutRef.current = null;
      }
      setShowChapterProcessing(false);
    }
  }, [
    applyChapterAssignments,
    chapterFormData.color,
    chapterFormData.conceptIds,
    chapterFormData.description,
    chapterFormData.linkSequentially,
    chapterFormData.title,
    getFramesSnapshot,
    getOrderedFrameIds,
    queueSequentialLink,
    queueSequentialUnlink,
    resetChapterDialogState,
    selectedChapterFrameIds,
    syncChapterFrames,
    dispatchForceSave,
    broadcastChapterGraphSync,
    unifiedStorage.chapters,
    unifiedStorage.updateChapters,
    unifiedStorage.updateFrames,
  ]);

  const handleEditChapter = useCallback(() => {
    if (!editingChapter) {
      return;
    }

    const trimmedTitle = chapterFormData.title.trim();
    if (!trimmedTitle) {
      return;
    }

    setShowChapterProcessing(true);
    if (chapterProcessingTimeoutRef.current) {
      clearTimeout(chapterProcessingTimeoutRef.current);
    }
    chapterProcessingTimeoutRef.current = setTimeout(() => {
      setShowChapterProcessing(false);
      chapterProcessingTimeoutRef.current = null;
    }, 30000);

    try {
      const orderedSelection = getOrderedFrameIds(selectedChapterFrameIds);
      const now = new Date().toISOString();

      const frameSnapshot = getFramesSnapshot();
      const updatedFrames = applyChapterAssignments(
        editingChapter.id,
        orderedSelection,
        frameSnapshot
      );

      let updatedChapterRecord: Chapter | null = null;
      const updatedChapters = unifiedStorage.chapters.map((chapter) =>
        chapter.id === editingChapter.id
          ? ((updatedChapterRecord = {
              ...chapter,
              title: trimmedTitle,
              description: chapterFormData.description.trim(),
              color: chapterFormData.color || DEFAULT_CHAPTER_COLOR,
              conceptIds: Array.from(new Set(chapterFormData.conceptIds)).filter(Boolean),
              frameIds: orderedSelection,
              updatedAt: now,
              linkSequentially: chapterFormData.linkSequentially,
            }),
            updatedChapterRecord)
          : chapter
      );

      const framesWithAssignments = updatedFrames.map(frame =>
        orderedSelection.includes(frame.id)
          ? { ...frame, chapterId: editingChapter.id, parentFrameId: editingChapter.id }
          : frame
      );

      const syncedChapters = syncChapterFrames(updatedChapters, framesWithAssignments);

      unifiedStorage.updateFrames(framesWithAssignments);
      unifiedStorage.updateChapters(syncedChapters);
      setPendingChapterFrames((prev) => {
        if (!prev) {
          return prev;
        }
        const next = { ...prev };
        orderedSelection.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      setShowChapterDialog(false);
      resetChapterDialogState();

      queueSequentialUnlink(editingChapter.id);
      if (chapterFormData.linkSequentially && orderedSelection.length > 1) {
        setTimeout(() => queueSequentialLink(editingChapter.id, orderedSelection), 300);
      }

      if (!updatedChapterRecord) {
        updatedChapterRecord = {
          ...editingChapter,
          title: trimmedTitle,
          description: chapterFormData.description.trim(),
          color: chapterFormData.color || DEFAULT_CHAPTER_COLOR,
          conceptIds: Array.from(new Set(chapterFormData.conceptIds)).filter(Boolean),
          frameIds: orderedSelection,
          updatedAt: now,
          linkSequentially: chapterFormData.linkSequentially,
        };
      }

      broadcastChapterGraphSync(updatedChapterRecord, orderedSelection);
      dispatchForceSave("chapter-updated");
    } catch (error) {
      console.error("Failed to update chapter:", error);
      if (chapterProcessingTimeoutRef.current) {
        clearTimeout(chapterProcessingTimeoutRef.current);
        chapterProcessingTimeoutRef.current = null;
      }
      setShowChapterProcessing(false);
    }
  }, [
    applyChapterAssignments,
    chapterFormData.color,
    chapterFormData.conceptIds,
    chapterFormData.description,
    chapterFormData.linkSequentially,
    chapterFormData.title,
    editingChapter,
    getFramesSnapshot,
    getOrderedFrameIds,
    queueSequentialLink,
    queueSequentialUnlink,
    resetChapterDialogState,
    selectedChapterFrameIds,
    syncChapterFrames,
    dispatchForceSave,
    broadcastChapterGraphSync,
    unifiedStorage.chapters,
    unifiedStorage.updateChapters,
    unifiedStorage.updateFrames,
  ]);

  const availableConcepts = useMemo(() => {
    const conceptSet = new Set<string>();

    unifiedStorage.frames.forEach((frame) => {
      frame.aiConcepts?.forEach((concept) => {
        if (concept) conceptSet.add(concept);
      });
      frame.conceptIds?.forEach((concept) => {
        if (concept) conceptSet.add(concept);
      });
    });

    unifiedStorage.chapters.forEach((chapter) => {
      chapter.conceptIds?.forEach((concept) => {
        if (concept) conceptSet.add(concept);
      });
    });

    return Array.from(conceptSet).sort((a, b) => a.localeCompare(b));
  }, [unifiedStorage.frames, unifiedStorage.chapters]);

  // ============================================================================
  // CONDITIONAL LOGIC - Now safe to use after all hooks are called
  // ============================================================================

  // Show loading while checking auth or redirecting
  if (requireAuth && (status === "loading" || !session)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {status === "loading"
              ? "Checking authentication..."
              : "Redirecting to sign-in..."}
          </p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // COMPONENT LOGIC & HELPER FUNCTIONS
  // ============================================================================

  // Document management functions - copied from Deep Research
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Tab configuration for AI Frames Knowledge Base Manager
  const aiFramesTabConfigs = [
    {
      id: "user",
      label: "User Docs",
      icon: Upload,
      filter: (doc: any) => {
        return !(
          doc.title.toLowerCase().includes("agent log") ||
          doc.metadata.source === "research_state" ||
          doc.metadata.source === "ai-frames" ||
          doc.title.toLowerCase().includes("ai-frame") ||
          doc.metadata.source === "timecapsule_export" ||
          doc.metadata.source === "timecapsule_import" ||
          doc.metadata.source === "aiframes_import" ||
          doc.metadata.source === "aiframes_combined" ||
          doc.title.toLowerCase().includes("timecapsule") ||
          doc.metadata.isGenerated === true ||
          doc.metadata.documentType === "flow-session"
        );
      },
    },
    {
      id: "aiFrames",
      label: "AI Frames",
      icon: Bot,
      filter: (doc: any) => {
        return (
          doc.metadata.source === "ai-frames" ||
          doc.title.toLowerCase().includes("ai-frame") ||
          doc.metadata.documentType === "flow-session"
        );
      },
    },
    {
      id: "system",
      label: "System",
      icon: Package,
      filter: (doc: any) => {
        return (
          doc.metadata.source === "timecapsule_export" ||
          doc.metadata.source === "timecapsule_import" ||
          doc.metadata.source === "aiframes_import" ||
          doc.metadata.source === "aiframes_combined" ||
          doc.title.toLowerCase().includes("timecapsule") ||
          doc.metadata.isGenerated === true
        );
      },
    },
    {
      id: "agentLogs",
      label: "Logs",
      icon: Settings,
      filter: (doc: any) => {
        return (
          doc.title.toLowerCase().includes("agent log") ||
          doc.metadata.source === "research_state"
        );
      },
    },
  ];

  // Legacy function for backward compatibility (if needed elsewhere)
  const categorizeDocuments = (docs: any[]) => {
    const categories: Record<string, any[]> = {};

    // Initialize categories
    aiFramesTabConfigs.forEach((config) => {
      categories[config.id] = [];
    });

    // Categorize each document
    docs.forEach((doc) => {
      aiFramesTabConfigs.forEach((config) => {
        if (config.filter(doc)) {
          categories[config.id].push(doc);
        }
      });
    });

    return categories;
  };

  const getDocumentCategoryCounts = () => {
    const counts: Record<string, number> = {};
    aiFramesTabConfigs.forEach((config) => {
      counts[config.id] = documents.filter(config.filter).length;
    });
    return counts;
  };

  const getSemanticResultsByCategory = (category: string) => {
    return semanticSearchResults.filter((result) => {
      const doc = result.document;
      if (!doc) return false;

      switch (category) {
        case "user":
          return !(
            doc.title.toLowerCase().includes("agent log") ||
            doc.metadata.source === "research_state" ||
            doc.metadata.source === "ai-frames" ||
            doc.title.toLowerCase().includes("ai-frame") ||
            doc.metadata.source === "timecapsule_export" ||
            doc.metadata.source === "timecapsule_import" ||
            doc.metadata.source === "aiframes_import" ||
            doc.metadata.source === "aiframes_combined" ||
            doc.title.toLowerCase().includes("timecapsule") ||
            doc.metadata.isGenerated === true ||
            doc.metadata.documentType === "flow-session"
          );
        case "aiFrames":
          return (
            doc.metadata.source === "ai-frames" ||
            doc.title.toLowerCase().includes("ai-frame") ||
            doc.metadata.documentType === "flow-session"
          );
        case "system":
          return (
            doc.metadata.source === "timecapsule_export" ||
            doc.metadata.source === "timecapsule_import" ||
            doc.metadata.source === "aiframes_import" ||
            doc.metadata.source === "aiframes_combined" ||
            doc.title.toLowerCase().includes("timecapsule") ||
            doc.metadata.isGenerated === true
          );
        case "agentLogs":
          return (
            doc.title.toLowerCase().includes("agent log") ||
            doc.metadata.source === "research_state"
          );
        default:
          return false;
      }
    });
  };

  const getFilteredDocumentsByCategory = (category: string) => {
    if (showSemanticResults && semanticSearchResults.length > 0) {
      return getSemanticResultsByCategory(category);
    }

    const categorized = categorizeDocuments(documents);
    const categoryDocs =
      categorized[category as keyof typeof categorized] || [];

    if (!documentSearchQuery.trim()) {
      return categoryDocs;
    }

    return categoryDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(documentSearchQuery.toLowerCase()) ||
        doc.metadata.description
          ?.toLowerCase()
          .includes(documentSearchQuery.toLowerCase())
    );
  };

  // All hooks moved to top section - no more hooks after this point

  // Main render - SIMPLIFIED: Only FrameGraphIntegration with built-in Save Graph functionality
  return (
    <>
      <div>
      {/* Hidden file input for KB document uploads */}
      <input
        id="kb-file-upload"
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.md"
        className="hidden"
        onChange={async (e) => {
          if (e.target.files) {
            await documentsHook.handleFileUpload(e.target.files);

            // Refresh documents list to show newly uploaded files
            if (providerVectorStore) {
              const allDocuments = await providerVectorStore.getAllDocuments();
              setDocuments(allDocuments);
            }

            e.target.value = ""; // Reset input
          }
        }}
      />
      <input
        id="ai-frames-import"
        type="file"
        accept=".json"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          await handleImportFramesFromFile(file);
          event.target.value = "";
        }}
      />
      
      <div className="min-h-screen flex flex-col gap-6">
        {flowPanelReady ? (
          <AIFlowBuilderPanel
            flowBuilder={flowBuilder}
            onAcceptFrames={(frames, chapters) => handleAcceptAIFrames(frames, chapters)}
            isOpen={isFlowPanelOpen}
            onToggle={() => setIsFlowPanelOpen(false)}
            workspaceStats={workspaceStats}
            knowledgeBaseUnavailable={knowledgeBaseUnavailable}
            knowledgeBaseUnavailableMessage={knowledgeBaseErrorMessage}
            onGraphReset={triggerGraphReset}
            activeTimeCapsuleId={timeCapsule.activeTimeCapsuleId || undefined}
            allFrames={unifiedStorage.frames}
          />
        ) : (
          <div className="min-h-[32rem] rounded-3xl border border-slate-200 bg-white/70 flex flex-col items-center justify-center gap-4 text-center text-slate-500">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
            <div>
              <p className="font-semibold text-slate-700">Preparing AI Flow Builder…</p>
              <p className="text-sm text-slate-500">
                Loading unified storage and Knowledge Base snapshots.
              </p>
            </div>
          </div>
        )}
        {(localBridgeEnabled || !isFlowPanelOpen) && (
          <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end gap-3 pointer-events-none">
            {!isFlowPanelOpen && (
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-3 rounded-full shadow-xl flex items-center gap-2 pointer-events-auto"
                onClick={() => setIsFlowPanelOpen(true)}
              >
                <Bot className="h-4 w-4" />
                Open Flow Builder
              </button>
            )}
            {localBridgeEnabled && (
              <button
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto"
                onClick={handlePullFromLocalBridge}
                disabled={localBridgeButtonDisabled}
              >
                <Plug className="h-4 w-4" />
                {localBridgeCtaLabel}
              </button>
            )}
          </div>
        )}
        {localBridgeEnabled && localBridgeHasPendingData && (
          <div className="fixed top-24 right-6 z-40 w-full max-w-sm bg-white/95 border border-slate-200 rounded-2xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                SWE agent uploaded new frames
              </p>
              <span className="text-xs text-emerald-600 font-semibold">
                Live Bridge
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Click pull to sync the latest plan from Codex/Cursor into this workspace.
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={() => {
                  setLocalBridgeHasPendingData(false);
                  void handlePullFromLocalBridge();
                }}
              >
                Pull & Sync
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLocalBridgeHasPendingData(false)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
        {/* SIMPLIFIED: Direct FrameGraphIntegration - no duplicate save systems */}
        <div className="flex-1 overflow-hidden h-screen pt-24">
          {/* FIXED: Dual pane layout like Deep Research - sidebar + main content */}
          <div className="flex h-full relative">
            {/* Left Sidebar - Knowledge Base Section like Deep Research */}
            <div
              className={`relative flex-shrink-0 transition-all duration-300 ${
                sidebarCollapsed ? "w-0" : "w-80"
              }`}
            >
              {!sidebarCollapsed && (
                <div className="bg-gray-50 border-r border-gray-200 h-full flex flex-col">
                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        AI-Frames
                      </h3>
                      <p className="text-sm text-gray-600">
                        Interactive AI learning platform
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Version {TIMECAPSULE_VERSION}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-900"
                      onClick={handleSidebarHide}
                      title="Hide knowledge tools panel"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* TimeCapsule Project Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">TimeCapsules (Projects)</label>
                    <TimeCapsuleSelector
                      timeCapsules={timeCapsule.timeCapsules}
                      activeId={timeCapsule.activeTimeCapsuleId}
                      onSwitch={timeCapsule.switchTimeCapsule}
                      onCreate={timeCapsule.createTimeCapsule}
                      onRename={async (id, newName) => {
                        await timeCapsule.updateTimeCapsule(id, { name: newName });
                      }}
                      sessions={flowBuilder.sessions}
                      frames={unifiedStorage.frames}
                    />
                    <p className="text-xs text-slate-500">
                      {flowBuilder.sessions.filter(s => s.timeCapsuleId === timeCapsule.activeTimeCapsuleId).length} sessions · {sessionFilteredFrames.length} frames · {timeCapsule.activeTimeCapsule?.documentCount || 0} docs
                    </p>
                  </div>

              {/* Knowledge Base Section - EXACTLY like Deep Research */}
              <KnowledgeBaseSection
                documentStatus={{
                  count: documents.filter(aiFramesTabConfigs[0].filter).length,
                  totalSize: documents
                    .filter(aiFramesTabConfigs[0].filter)
                    .reduce((sum, doc) => sum + (doc.metadata?.filesize || 0), 0),
                  vectorCount: 0,
                }}
                onUploadDocuments={() =>
                  document.getElementById("kb-file-upload")?.click()
                }
                onManageKnowledge={() => {
                  console.log(
                    "Manage KB button clicked - opening Knowledge Base Manager"
                  );
                  setShowDocumentManager(true);
                }}
                onScrapeUrl={() => {
                  console.log("Scrape URL functionality");
                }}
              />

              {/* Frame Stats */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Frame Statistics
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Frames:</span>
                    <Badge variant="outline">
                      {unifiedStorage.frames.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mode:</span>
                    <Badge variant={isCreationMode ? "default" : "secondary"}>
                      {isCreationMode ? "Creator" : "Learner"}
                    </Badge>
                  </div>

                  {/* UNIFIED: Auto-save status */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    {unifiedStorage.isLoading ? (
                      <Badge variant="outline" className="text-blue-600">
                        <Zap className="h-3 w-3 mr-1 animate-pulse" />
                        Auto-saving...
                      </Badge>
                    ) : unifiedStorage.hasUnsavedChanges ? (
                      <Badge variant="outline" className="text-orange-600">
                        <Save className="h-3 w-3 mr-1" />
                        Unsaved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-green-600">
                        <Save className="h-3 w-3 mr-1" />
                        Saved
                      </Badge>
                    )}
                  </div>
                  
                  {/* Recent Sessions Display (up to 3) */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Recent Sessions:</span>
                        {flowBuilder.sessions.length > 3 && (
                          <span className="text-xs text-gray-500">{flowBuilder.sessions.length} total</span>
                        )}
                      </div>
                      {(() => {
                        // Helper function to get relative time
                        const getRelativeTime = (date: Date | string) => {
                          const now = new Date();
                          const targetDate = typeof date === 'string' ? new Date(date) : date;
                          const diff = now.getTime() - targetDate.getTime();
                          const minutes = Math.floor(diff / 60000);
                          if (minutes < 1) return 'just now';
                          if (minutes < 60) return `${minutes}m ago`;
                          const hours = Math.floor(minutes / 60);
                          if (hours < 24) return `${hours}h ago`;
                          const days = Math.floor(hours / 24);
                          if (days < 30) return `${days}d ago`;
                          return new Date(targetDate).toLocaleDateString();
                        };

                        // Session type configuration
                        const sessionTypeConfig = {
                          "manual": {
                            icon: Edit,
                            color: "blue",
                            borderColor: "border-blue-400",
                            bgColor: "bg-blue-50",
                            iconBgColor: "bg-blue-100",
                            iconColor: "text-blue-600",
                          },
                          "ai-flow": {
                            icon: Bot,
                            color: "purple",
                            borderColor: "border-purple-400",
                            bgColor: "bg-purple-50",
                            iconBgColor: "bg-purple-100",
                            iconColor: "text-purple-600",
                          },
                          "swe-bridge": {
                            icon: Plug,
                            color: "teal",
                            borderColor: "border-teal-400",
                            bgColor: "bg-teal-50",
                            iconBgColor: "bg-teal-100",
                            iconColor: "text-teal-600",
                          },
                        };

                        // Get up to 3 most recent sessions, sorted by updatedAt
                        const recentSessions = [...flowBuilder.sessions]
                          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                          .slice(0, 3);

                        if (recentSessions.length === 0) {
                          return (
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                              <p className="text-xs text-gray-500 text-center">No sessions yet</p>
                          </div>
                          );
                        }

                        return recentSessions.map((session) => {
                          const isActive = session.id === flowBuilder.activeSessionId;
                          const config = sessionTypeConfig[session.source as keyof typeof sessionTypeConfig] || sessionTypeConfig["manual"];
                          const SessionIcon = config.icon;
                          const sessionFrameCount = unifiedStorage.frames.filter(f => f.sessionId === session.id).length;

                          return (
                            <div
                              key={session.id}
                              className={`group/card relative rounded-xl border-l-4 p-2.5 cursor-pointer transition-all ${
                                isActive
                                  ? `${config.borderColor} ${config.bgColor} border-r border-t border-b ${config.borderColor} shadow-sm`
                                  : 'border-l-slate-300 border-r border-t border-b border-slate-200 bg-white hover:bg-slate-50 hover:border-l-slate-400'
                              }`}
                              onClick={() => {
                                if (!isActive) {
                                  flowBuilder.switchSession(session.id, triggerGraphReset);
                                }
                              }}
                            >
                              <div className="flex items-start gap-2">
                                <div className={`p-1 rounded-lg ${isActive ? config.iconBgColor : 'bg-slate-100'} flex-shrink-0`}>
                                  <SessionIcon className={`h-3.5 w-3.5 ${isActive ? config.iconColor : 'text-slate-500'}`} />
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  {isActive ? (
                                    <div className="group/input relative flex items-center gap-1">
                                      <input
                                        type="text"
                                        value={session.name}
                                        onChange={(e) => flowBuilder.renameSession(session.id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className={`font-semibold text-sm text-gray-900 bg-transparent border-b border-transparent hover:border-${config.color}-300 focus:border-${config.color}-500 outline-none transition-colors flex-1 min-w-0 pb-0.5`}
                                        placeholder="Session name..."
                                      />
                                      <Edit className="h-3 w-3 text-slate-400 opacity-0 group-hover/input:opacity-100 transition-opacity flex-shrink-0" />
                                    </div>
                                  ) : (
                                    <div className="font-semibold text-sm text-gray-900 truncate">
                                      {session.name}
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <div className="flex items-center gap-1">
                                        <Layers className="h-3 w-3" />
                                        <span className="font-medium">{sessionFrameCount}</span>
                                      </div>
                                      <span>•</span>
                                      <span>{getRelativeTime(session.updatedAt)}</span>
                                      {isActive && (
                                        <>
                                          <span>•</span>
                                          <Badge className="bg-emerald-500 text-white text-[10px] px-1.5 py-0">Active</Badge>
                                        </>
                                      )}
                                    </div>
                                    {/* Quick Actions - show on hover */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          flowBuilder.duplicateSession(session.id, triggerGraphReset);
                                        }}
                                        className="h-6 w-6 p-0 hover:bg-purple-100"
                                        title="Duplicate session"
                                      >
                                        <Copy className="h-3 w-3 text-purple-600" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSessionToDelete({
                                            id: session.id,
                                            name: session.name,
                                            frameCount: sessionFrameCount
                                          });
                                          setShowDeleteSessionDialog(true);
                                        }}
                                        className="h-6 w-6 p-0 hover:bg-red-100"
                                        title="Delete session"
                                      >
                                        <Trash2 className="h-3 w-3 text-red-600" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-1">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                          onClick={() => {
                            flowBuilder.createNewSession("manual", undefined, triggerGraphReset, {
                              skipClear: false, // CRITICAL FIX (Issue 13): Clear graph for manual session creation
                              timeCapsuleId: timeCapsule.activeTimeCapsuleId || undefined
                            });
                          }}
                        >
                          <Sparkles className="h-4 w-4 mr-1.5" />
                          New Session
                        </Button>
                      <Button
                        variant="outline"
                        size="sm"
                          className="flex-1"
                        onClick={() => {
                          setIsFlowPanelOpen(true);
                          // Scroll to Flow Sessions section after panel opens
                          setTimeout(() => {
                              const flowSessionsSection = document.getElementById('flow-sessions-section');
                            if (flowSessionsSection) {
                              flowSessionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              } else {
                                console.warn('⚠️ Flow sessions section not found');
                            }
                          }, 300);
                        }}
                      >
                          <Bot className="h-4 w-4 mr-1.5" />
                          Manage All
                      </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Import / Export
                  </h4>
                  <p className="text-xs text-gray-500">
                    Backup your AI Frames workspace, share flows with teammates, or plan future sync services.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                    onClick={() =>
                      document.getElementById("ai-frames-import")?.click()
                    }
                  >
                    <Upload className="h-4 w-4" />
                    Import JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                    onClick={handleExportFrames}
                  >
                    <Download className="h-4 w-4" />
                    Export JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                    onClick={handleOpenExportDialog}
                  >
                    <Printer className="h-4 w-4" />
                    Export PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center gap-2 text-gray-400"
                    disabled
                  >
                    <Plug className="h-4 w-4" />
                    Timecapsule sync (coming soon)
                  </Button>
                </div>
              </div>

              {/* Chapter Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Chapters
                  </h4>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={openCreateChapterDialog}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {sessionFilteredChapters.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No chapters defined. Create one to group frames.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {sessionFilteredChapters.map((chapter) => {
                      const frameCount = chapter.frameIds?.length || 0;
                      const conceptCount = chapter.conceptIds?.length || 0;

                      return (
                        <Card key={chapter.id} className="shadow-sm">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                  <span
                                    className="inline-block h-3 w-3 rounded-full"
                                    style={{ backgroundColor: chapter.color || DEFAULT_CHAPTER_COLOR }}
                                  ></span>
                                  {chapter.title || "Untitled Chapter"}
                                </CardTitle>
                                {chapter.description && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {chapter.description}
                                  </p>
                                )}
                              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditChapterDialog(chapter)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete chapter "${chapter.title}"? Frames will be left unassigned.`
                      )
                    ) {
                      handleDeleteChapter(chapter.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Badge variant="outline">
                                {frameCount} {frameCount === 1 ? "frame" : "frames"}
                              </Badge>
                              <Badge variant="outline">
                                {conceptCount} {conceptCount === 1 ? "concept" : "concepts"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
                  </div>
                  {/* End Scrollable Content Area */}

                  {/* Danger Zone - Fixed at Bottom */}
                  <div className="border-t border-gray-200 p-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Danger Zone
                    </h4>
                    <p className="text-xs text-gray-500">
                      Remove every AI Frame, chapter, and graph connection from this space.
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        setShowClearConfirm(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete All AI Frames
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area - Graph Integration */}
            <div className="flex-1 h-full overflow-hidden">
              {/* FIXED: Enhanced VectorStore readiness check for stability */}
              {vectorStoreInitialized &&
              !vectorStoreInitializing &&
              providerVectorStore?.initialized !== false ? (
                <FrameGraphIntegration
                  key={graphResetKey}
                  frames={framesWithOrder}
                  onFramesChange={handleFramesChange}
                  isCreationMode={isCreationMode}
                  currentFrameIndex={currentFrameIndex}
                  onFrameIndexChange={(newIndex) => {
                    console.log("🔍 CRITICAL: Frame index change called:", {
                      oldIndex: currentFrameIndex,
                      newIndex,
                      frameCount: unifiedStorage.frames.length,
                      stackTrace: new Error().stack?.split("\n")[1],
                    });
                    setCurrentFrameIndex(newIndex);
                  }}
                  onCreateFrame={handleCreateFrame}
                  chapters={sessionFilteredChapters}
                  onChaptersChange={unifiedStorage.updateChapters}
                  onGraphChange={handleGraphStateUpdate}
                  initialGraphState={unifiedStorage.graphState}
                  graphStorageManager={graphStorageManagerRef.current}
                  onViewModeChange={handleViewModeChange}
                  sidebarCollapsed={sidebarCollapsed}
                  onShowSidebar={handleSidebarShow}
                  activeSessionId={flowBuilder.activeSessionId || undefined}
                  activeTimeCapsuleId={timeCapsule.activeTimeCapsuleId || undefined}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                      Initializing Knowledge Base...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Status:{" "}
                      {vectorStoreInitialized ? "Initialized" : "Initializing"}
                      {vectorStoreInitializing && " (Loading...)"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals - PRESERVATION: Keep existing dialogs */}
      <Dialog
        open={showChapterProcessing}
        onOpenChange={(open) => {
          if (!open) {
            if (chapterProcessingTimeoutRef.current) {
              clearTimeout(chapterProcessingTimeoutRef.current);
              chapterProcessingTimeoutRef.current = null;
            }
            setShowChapterProcessing(false);
          }
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Applying chapter changes
            </DialogTitle>
            <DialogDescription>
              Updating frame connections. This may take a few seconds.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-gray-600">
            Please keep this page open while updates complete.
          </div>
        </DialogContent>
      </Dialog>
      {(vectorStoreInitializing || showVectorStoreInitModal) && (
        <VectorStoreInitModal
          isOpen={showVectorStoreInitModal}
          progress={
            vectorStoreInitializing ? 50 : vectorStoreInitialized ? 100 : 0
          }
          status={
            vectorStoreError
              ? "error"
              : vectorStoreReady
              ? "ready"
              : "initializing"
          }
          message={
            vectorStoreError ||
            (vectorStoreReady
              ? "Knowledge Base ready!"
              : vectorStoreInitializing
                ? "Initializing Knowledge Base..."
                : "Preparing Knowledge Base...")
          }
          onClose={() => setShowVectorStoreInitModal(false)}
        />
      )}
      <BubblSpaceDialog
        isOpen={showBubblSpaceDialog}
        onClose={() => setShowBubblSpaceDialog(false)}
        onSave={(bubblSpace) => {
          console.log("Save bubblspace:", bubblSpace);
          setShowBubblSpaceDialog(false);
        }}
      />
      <TimeCapsuleDialog
        isOpen={showTimeCapsuleDialog}
        onClose={() => setShowTimeCapsuleDialog(false)}
        onSave={(timeCapsule) => {
          console.log("Save timecapsule:", timeCapsule);
          setShowTimeCapsuleDialog(false);
        }}
        bubblSpaces={[]}
      />
      <SafeImportDialog
        isOpen={showSafeImportDialog}
        onClose={() => setShowSafeImportDialog(false)}
        timeCapsuleData={null}
        onImport={async (options) => {
          console.log("Import with options:", options);
          return {
            success: true,
            message: "Import completed successfully",
            details: { itemsImported: {} },
          };
        }}
      />
      <ChapterDialog
        open={showChapterDialog}
        onOpenChange={(open) => {
          setShowChapterDialog(open);
          if (!open) {
            resetChapterDialogState();
          }
        }}
        editingChapter={editingChapter ? { ...editingChapter, description: editingChapter.description || '' } as any : null}
        chapterFormData={chapterFormData}
        setChapterFormData={setChapterFormData}
        selectedFrameIds={selectedChapterFrameIds}
        frames={framesForChapterDialog}
        availableConcepts={availableConcepts}
        onFrameSelection={handleChapterFrameSelection}
        onSelectAll={selectAllChapterFrames}
          onDeselectAll={deselectAllChapterFrames}
          onCreateChapter={handleCreateChapter}
          onEditChapter={handleEditChapter}
          onCreateFrameInline={handleCreateFrameInline}
          onCancel={() => {
            setPendingChapterFrames({});
            dispatchForceSave("chapter-dialog-cancelled");
          }}
        />
      {/* ✅ NEW: Session Continuation Dialog */}
      {showSessionDialog && sessionDialogConfig && (
        <SessionContinuationDialog
          open={showSessionDialog}
          onOpenChange={setShowSessionDialog}
          currentSessionName={
            sessionDialogConfig.currentSessionName ||
            flowBuilder.sessions.find((s) => s.id === flowBuilder.activeSessionId)?.name ||
            "Current Session"
          }
          actionType={sessionDialogConfig.type}
          onContinue={() => {
            sessionDialogConfig.onContinue();
            setShowSessionDialog(false);
          }}
          onCreateNew={() => {
            sessionDialogConfig.onCreateNew();
            setShowSessionDialog(false);
          }}
        />
      )}

      {/* Session Delete Confirmation Dialog */}
      <Dialog open={showDeleteSessionDialog} onOpenChange={setShowDeleteSessionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl font-semibold">Delete Session?</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-slate-600 pt-2">
              This action cannot be undone. This will permanently delete the session and all associated data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Session Info */}
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                Session to Delete
              </p>
              <p className="text-base font-semibold text-slate-900 break-words mb-2">
                {sessionToDelete?.name}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Layers className="h-4 w-4" />
                <span className="font-medium">{sessionToDelete?.frameCount || 0} frames</span>
                <span className="text-slate-400">•</span>
                <span>will be deleted</span>
              </div>
            </div>

            {/* Warning Message */}
            {(sessionToDelete?.frameCount || 0) > 0 && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Warning: Frame Data Loss</p>
                  <p className="text-xs mt-1">
                    All {sessionToDelete?.frameCount} frame{sessionToDelete?.frameCount !== 1 ? 's' : ''} in this session will be permanently deleted.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteSessionDialog(false);
                setSessionToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (sessionToDelete) {
                  flowBuilder.deleteSession(sessionToDelete.id);
                }
                setShowDeleteSessionDialog(false);
                setSessionToDelete(null);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Export AI Frames PDF
            </DialogTitle>
            <DialogDescription>
              Customize the cover page and optionally include a graph summary before printing or saving as PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-title">Cover Title</Label>
              <Input
                id="export-title"
                value={exportForm.title}
                onChange={(event) =>
                  setExportForm((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
                placeholder="AI Frames Lesson Plan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="export-subtitle">Subtitle</Label>
              <Input
                id="export-subtitle"
                value={exportForm.subtitle}
                onChange={(event) =>
                  setExportForm((prev) => ({
                    ...prev,
                    subtitle: event.target.value,
                  }))
                }
                placeholder="Generated from the Knowledge Base"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="export-include-graph"
                type="checkbox"
                checked={exportForm.includeGraph}
                onChange={(event) =>
                  setExportForm((prev) => ({
                    ...prev,
                    includeGraph: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
              <Label htmlFor="export-include-graph" className="text-sm">
                Include graph overview page
              </Label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExportPDF}>Generate PDF</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {showChunkView && chunkViewerDocument && currentChunk && (
        <ChunkViewerModal
          isOpen={showChunkView}
          onClose={() => setShowChunkView(false)}
          chunk={currentChunk}
          document={chunkViewerDocument}
          allChunks={chunkViewerChunks}
          onNavigateChunk={handleNavigateChunk}
        />
      )}

      </div>

      {/* Document Manager Modal - Complete Deep Research implementation */}
      {showDocumentManager && (
        <Dialog
          open={showDocumentManager}
          onOpenChange={(open) => {
            if (!open) setShowDocumentManager(false);
          }}
        >
          <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Knowledge Base Manager
                </DialogTitle>
                <DialogDescription>
                  Organized view of your documents by category. Search and manage
                  your knowledge base content.
                </DialogDescription>
              </div>

              {/* Upload Button */}
              <Button
                onClick={() => document.getElementById("kb-file-upload")?.click()}
                disabled={documentsHook.isUploading}
                className="space-x-2"
                size="sm"
              >
                {documentsHook.isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Files</span>
                  </>
                )}
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <Tabs
              value={documentManagerTab}
              onValueChange={setDocumentManagerTab}
              className="flex flex-col h-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  User Docs ({getDocumentCategoryCounts().user})
                </TabsTrigger>
                <TabsTrigger
                  value="aiFrames"
                  className="flex items-center gap-2"
                >
                  <Bot className="h-4 w-4" />
                  AI Frames ({getDocumentCategoryCounts().aiFrames})
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  System ({getDocumentCategoryCounts().system})
                </TabsTrigger>
                <TabsTrigger
                  value="agentLogs"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Logs ({getDocumentCategoryCounts().agentLogs})
                </TabsTrigger>
              </TabsList>

              {/* Search Section */}
              <div className="mb-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Search & Semantic Query
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Semantic search ${documentManagerTab} documents...`}
                        value={documentSearchQuery}
                        onChange={(e) => {
                          setDocumentSearchQuery(e.target.value);
                          if (!e.target.value.trim() && showSemanticResults) {
                            setShowSemanticResults(false);
                            setSemanticSearchResults([]);
                            setCurrentSemanticQuery("");
                          }
                        }}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleKnowledgeBaseSearch()
                        }
                      />
                      <Button
                        onClick={handleKnowledgeBaseSearch}
                        disabled={isSearching}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {isSearching ? "Searching..." : "Search"}
                      </Button>
                      {(documentSearchQuery || showSemanticResults) && (
                        <Button
                          onClick={clearKnowledgeBaseSearch}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Label htmlFor="search-threshold">
                        Similarity threshold:
                      </Label>
                      <Input
                        id="search-threshold"
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        value={searchThreshold}
                        onChange={(e) =>
                          setSearchThreshold(parseFloat(e.target.value))
                        }
                        className="w-20"
                      />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-1 mb-1">
                        <Search className="h-3 w-3" />
                        <span className="font-medium">
                          AI-Powered Semantic Search
                        </span>
                      </div>
                      <p>
                        Search by meaning, not just keywords. Shows relevant
                        document chunks with similarity scores.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Document Content Tabs */}
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="user" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Upload className="h-4 w-4 text-green-600" />
                        {showSemanticResults
                          ? `Semantic Search: User Documents (${getFilteredDocumentsByCategory("user").length} results)`
                          : `User Documents (${getDocumentCategoryCounts().user})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from your uploaded files and scraped content. Showing relevant chunks with similarity scores.`
                          : `Your uploaded files, scraped content, and personal documents. These are available for learning research attachment.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("user").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("user").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-green-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {showSemanticResults
                                          ? "📄 User"
                                          : "📄 Upload"}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No user documents found.</p>
                          <p className="text-sm">
                            Upload files or scrape URLs to add content to your
                            knowledge base.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="aiFrames" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        {showSemanticResults
                          ? `Semantic Search: AI Frames (${getFilteredDocumentsByCategory("aiFrames").length} results)`
                          : `AI Frames (${getDocumentCategoryCounts().aiFrames})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from AI-generated learning frames and educational content.`
                          : `AI-generated learning frames and educational content from the AI-Frames system.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("aiFrames").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("aiFrames").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-blue-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs text-blue-600"
                                      >
                                        🎓 AI Frame
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No AI frames found.</p>
                          <p className="text-sm">
                            AI frames will appear here when synced from the
                            AI-Frames system.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="system" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-600" />
                        {showSemanticResults
                          ? `Semantic Search: System & Metadata (${getFilteredDocumentsByCategory("system").length} results)`
                          : `System & Metadata (${getDocumentCategoryCounts().system})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from TimeCapsules, BubblSpace exports, research outputs, and other system-generated content.`
                          : `TimeCapsules, BubblSpace exports, research outputs, and other system-generated content.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("system").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("system").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-purple-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs text-purple-600"
                                      >
                                        {(showSemanticResults
                                          ? doc.document?.metadata?.source ||
                                            doc.metadata?.source
                                          : doc.metadata?.source) ===
                                        "timecapsule_export"
                                          ? "📦 Export"
                                          : (
                                                showSemanticResults
                                                  ? doc.document?.metadata
                                                      ?.isGenerated ||
                                                    doc.metadata?.isGenerated
                                                  : doc.metadata?.isGenerated
                                              )
                                            ? "🤖 Generated"
                                            : "⚙️ System"}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No system documents found.</p>
                          <p className="text-sm">
                            TimeCapsule exports and system content will appear
                            here.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="agentLogs" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Settings className="h-4 w-4 text-orange-600" />
                        {showSemanticResults
                          ? `Semantic Search: Agent Logs (${getFilteredDocumentsByCategory("agentLogs").length} results)`
                          : `Agent Logs (${getDocumentCategoryCounts().agentLogs})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from multi-agent research session logs, performance metrics, and processing details.`
                          : `Multi-agent research session logs, performance metrics, and processing details.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("agentLogs").length >
                      0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("agentLogs").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-orange-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs text-orange-600"
                                      >
                                        📋 Agent Log
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No agent logs found.</p>
                          <p className="text-sm">
                            Agent processing logs will appear here after
                            multi-agent research sessions.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="flex justify-between items-center p-6 pt-4 flex-shrink-0 border-t">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Total: {documents.length} documents •{" "}
              {formatFileSize(
                documents.reduce(
                  (sum, doc) => sum + (doc.metadata?.filesize || 0),
                  0
                )
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowDocumentManager(false)}
            >
              Close
            </Button>
          </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete all AI Frames?</DialogTitle>
            <DialogDescription>
              This removes every frame, chapter, and graph connection from the workspace. You can’t undo this action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setShowClearConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await handleClearFrames();
                setShowClearConfirm(false);
              }}
            >
              Delete Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

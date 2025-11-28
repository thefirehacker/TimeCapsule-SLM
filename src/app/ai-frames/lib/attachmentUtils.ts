import type { FlowGeneratedFrame } from "@/lib/multi-agent/interfaces/Context";
import type { AIFrame } from "@/app/ai-frames/types/frames";

export type CanonicalAttachmentType = "video" | "pdf" | "text";

const NON_KEY_CHARS_REGEX = /[^a-zA-Z0-9_\-./]+/g;

export const normalizeAttachmentType = (
  generatorType: string | undefined
): CanonicalAttachmentType => {
  if (!generatorType) return "text";
  switch (generatorType.toLowerCase()) {
    case "video":
    case "youtube":
    case "clip":
      return "video";
    case "pdf":
    case "pdf_excerpt":
    case "pdf-kb":
    case "document_pdf":
      return "pdf";
    case "text":
    case "text_excerpt":
    case "document":
    case "code":
    case "diagram":
    case "image":
    default:
      return "text";
  }
};

const extractFilenameFromUrl = (url: string): string => {
  if (!url) return "";
  const parts = url.split("/");
  return parts[parts.length - 1] || url;
};

const extractUrlLikeValue = (value?: string): string => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const explicitMatch = trimmed.match(/https?:\/\/\S+/i);
  if (explicitMatch?.[0]) {
    return explicitMatch[0];
  }
  if (
    trimmed.toLowerCase().endsWith(".pdf") ||
    trimmed.toLowerCase().endsWith(".mp4")
  ) {
    return trimmed;
  }
  return "";
};

export const makeAttachmentInstanceId = (
  frameId: string,
  pointer?: string
): string => {
  const fallbackPointer = pointer && pointer.length > 0 ? pointer : "attachment";
  const sanitizedPointer = fallbackPointer
    .replace(NON_KEY_CHARS_REGEX, "_")
    .slice(-256); // keep tail for uniqueness without blowing up IDs
  return `${frameId}::${sanitizedPointer}`;
};

type AttachmentSource = FlowGeneratedFrame["attachment"];

export const buildFrameAttachment = (
  source: AttachmentSource | undefined,
  frameId: string
): AIFrame["attachment"] | undefined => {
  if (!source) return undefined;

  const normalizedType = normalizeAttachmentType(source.type);
  const rawType = source.type || "";
  const description =
    typeof source.description === "string" ? source.description.trim() : "";
  const providedUrl =
    typeof source.url === "string" ? source.url.trim() : "";
  const originalSourceId =
    typeof source.originalSourceId === "string"
      ? source.originalSourceId.trim()
      : "";
  const urlFromDescription = extractUrlLikeValue(description);
  const candidatePointer = providedUrl || urlFromDescription || originalSourceId;
  const httpUrlMatch = candidatePointer.match(/^https?:\/\/\S+/i);
  const httpUrl = httpUrlMatch ? httpUrlMatch[0] : "";
  const looksHttp = httpUrl.length > 0;
  const normalizedPointer = candidatePointer;
  const kbDocumentId =
    typeof source.kbDocumentId === "string" ? source.kbDocumentId.trim() : "";
  const pointerLooksLikeKbSlug =
    normalizedType === "pdf" && !looksHttp && normalizedPointer.length > 0;
  const isKBPdf =
    normalizedType === "pdf" &&
    (rawType?.toLowerCase() === "pdf-kb" ||
      Boolean(originalSourceId) ||
      Boolean(kbDocumentId) ||
      pointerLooksLikeKbSlug);

  const requiresUrl = normalizedType !== "text";
  const hasPointer = requiresUrl
    ? Boolean(normalizedPointer || originalSourceId || kbDocumentId)
    : Boolean(description.length || normalizedPointer);
  const hasDescription = description.length > 0;

  if ((requiresUrl && !hasPointer) || (!requiresUrl && !hasDescription)) {
    return undefined;
  }

  const pointerForId =
    normalizedPointer ||
    originalSourceId ||
    kbDocumentId ||
    `attachment_${frameId}`;
  const attachmentId = makeAttachmentInstanceId(frameId, pointerForId);

  const explicitPdfSource =
    typeof (source as any).pdfSource === "string"
      ? ((source as any).pdfSource as string)
      : undefined;

  const pdfSource = explicitPdfSource
    ? explicitPdfSource
    : isKBPdf
      ? "knowledge_base"
      : looksHttp
        ? "url"
        : normalizedPointer
          ? "local"
          : "url";

  const derivedKbId =
    isKBPdf && (kbDocumentId || originalSourceId || pointerLooksLikeKbSlug)
      ? kbDocumentId || originalSourceId || normalizedPointer
      : undefined;

  const baseData: Record<string, any> = {
    title:
      description ||
      (normalizedPointer ? extractFilenameFromUrl(normalizedPointer) : "Attachment"),
    notes: description || "",
    description: description || undefined,
    originalType: rawType,
    originalUrl: normalizedPointer || originalSourceId || undefined,
    originalAttachment: source,
    kbDocumentId: derivedKbId,
  };

  const attachmentData =
    normalizedType === "video"
      ? {
          ...baseData,
          videoUrl: httpUrl || normalizedPointer,
          startTime: 0,
          duration: 480,
        }
      : normalizedType === "pdf"
        ? {
            ...baseData,
            pdfUrl: pdfSource === "knowledge_base" ? "" : httpUrl || normalizedPointer,
            pages: "",
            pdfFileName: extractFilenameFromUrl(
              normalizedPointer || originalSourceId
            ),
            pdfSource,
            kbDocumentId: baseData.kbDocumentId,
          }
        : {
            ...baseData,
            text: description || normalizedPointer,
          };

  return {
    id: attachmentId,
    type: normalizedType,
    data: attachmentData,
  };
};


"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Search,
  Users,
  DollarSign,
  GraduationCap,
  Code,
  TrendingUp,
  Brain,
  Plus,
  Settings2,
  Send,
  X,
  Mic,
  Lightbulb,
  Loader2,
  Database,
  Wifi,
  WifiOff,
} from "lucide-react";

// Types
interface RAGContext {
  query: string;
  relevantDocuments: Array<{
    id: string;
    title: string;
    similarity: number;
    chunkContent: string;
    chunkIndex: number;
    source: string;
    metadata?: any;
    retrievalContext: {
      queryId: string;
      retrievalTime: number;
      processingTime: number;
    };
  }>;
  searchResults: any[];
  contextText: string;
  metadata: {
    searchTime: number;
    documentCount: number;
    chunkCount: number;
    averageSimilarity: number;
    searchThreshold: number;
  };
}

export type ResearchType =
  | "deep-research"
  | "social"
  | "finance"
  | "academic"
  | "technical"
  | "market";

export type ResearchDepth = "quick" | "detailed" | "comprehensive";

interface PromptBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (
    prompt: string,
    type: ResearchType,
    depth: ResearchDepth,
    ragContext?: any,
    webSearchContext?: any
  ) => void;
  selectedResearchType?: ResearchType;
  onResearchTypeChange?: (type: ResearchType) => void;
  selectedResearchDepth?: ResearchDepth;
  onResearchDepthChange?: (depth: ResearchDepth) => void;
  isGenerating?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  compact?: boolean;
  // RAG Integration
  enableRAG?: boolean;
  onRAGSearch?: (query: string) => Promise<RAGContext | null>;
  onRAGToggle?: (enabled: boolean) => void;
  // Web Search Integration
  webSearchEnabled?: boolean;
  onWebSearch?: (query: string) => Promise<any>;
  onWebSearchToggle?: (enabled: boolean) => void;
  webSearchStatus?: {
    configured: boolean;
    lastSearch?: Date | null;
    searchCount?: number;
  };
  // Voice Integration
  onVoiceRecord?: () => void;
  isRecording?: boolean;
  // File Attachment
  onFileAttach?: (file: File) => void;
  acceptedFileTypes?: string;
}

// Utility function
function cn(
  ...inputs: (string | number | boolean | null | undefined)[]
): string {
  return inputs.filter(Boolean).join(" ");
}

// Radix Primitives
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-md bg-popover text-popover-foreground px-1.5 py-1 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {props.children}
      {showArrow && <TooltipPrimitive.Arrow className="-my-px fill-popover" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 rounded-xl bg-popover dark:bg-[#303030] p-3 text-popover-foreground dark:text-white shadow-md outline-none animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      <div className="relative bg-card dark:bg-[#303030] rounded-[28px] overflow-hidden shadow-2xl p-1">
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 z-10 rounded-full bg-background/50 dark:bg-[#303030] p-1 hover:bg-accent dark:hover:bg-[#515151] transition-all">
          <X className="h-5 w-5 text-muted-foreground dark:text-gray-200 hover:text-foreground dark:hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Configuration data
const researchTypes = [
  {
    type: "deep-research" as ResearchType,
    label: "Deep Research",
    shortName: "Deep",
    icon: Brain,
    description: "Comprehensive analysis",
  },
  {
    type: "social" as ResearchType,
    label: "Social Research",
    shortName: "Social",
    icon: Users,
    description: "Social trends & culture",
  },
  {
    type: "finance" as ResearchType,
    label: "Financial Analysis",
    shortName: "Finance",
    icon: DollarSign,
    description: "Financial insights",
  },
  {
    type: "academic" as ResearchType,
    label: "Academic Research",
    shortName: "Academic",
    icon: GraduationCap,
    description: "Scholarly research",
  },
  {
    type: "technical" as ResearchType,
    label: "Technical Analysis",
    shortName: "Technical",
    icon: Code,
    description: "Technical insights",
  },
  {
    type: "market" as ResearchType,
    label: "Market Research",
    shortName: "Market",
    icon: TrendingUp,
    description: "Market insights",
  },
];

const researchDepthOptions = [
  {
    value: "quick" as ResearchDepth,
    label: "Quick Research",
    shortName: "Quick",
    description: "Key points & overview",
  },
  {
    value: "detailed" as ResearchDepth,
    label: "Detailed Analysis",
    shortName: "Detailed",
    description: "Comprehensive analysis",
  },
  {
    value: "comprehensive" as ResearchDepth,
    label: "Deep Research",
    shortName: "Deep",
    description: "Exhaustive investigation",
  },
];

const samplePrompts = [
  "Analyze the impact of AI on modern education systems",
  "Compare renewable energy adoption across different countries",
  "Examine the role of social media in political movements",
  "Investigate emerging trends in sustainable finance",
];

export const PromptBox = React.forwardRef<HTMLTextAreaElement, PromptBoxProps>(
  (
    {
      className,
      value = "",
      onChange,
      onSubmit,
      selectedResearchType = "deep-research",
      onResearchTypeChange,
      selectedResearchDepth = "detailed",
      onResearchDepthChange,
      isGenerating = false,
      disabled = false,
      placeholder = "What would you like to research? Ask anything...",
      compact = false,
      enableRAG = false,
      onRAGSearch,
      onRAGToggle,
      webSearchEnabled = false,
      onWebSearch,
      onWebSearchToggle,
      webSearchStatus,
      onVoiceRecord,
      isRecording = false,
      onFileAttach,
      acceptedFileTypes = "image/*",
      ...props
    },
    ref
  ) => {
    const internalTextareaRef = React.useRef<HTMLTextAreaElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = React.useState(value);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [isResearchTypesOpen, setIsResearchTypesOpen] = React.useState(false);
    const [isSamplesOpen, setIsSamplesOpen] = React.useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false);
    const [isRAGSearching, setIsRAGSearching] = React.useState(false);
    const [isWebSearching, setIsWebSearching] = React.useState(false);

    React.useImperativeHandle(ref, () => internalTextareaRef.current!, []);

    const currentValue = onChange ? value || "" : internalValue;

    React.useLayoutEffect(() => {
      const textarea = internalTextareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const maxHeight = compact ? 120 : 300;
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;
      }
    }, [currentValue, compact]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (currentValue.trim() && !isGenerating && !disabled && onSubmit) {
          handleSubmitWithContext(currentValue.trim());
        }
      }
    };

    const handleSubmitWithContext = async (prompt: string) => {
      let ragContextToSubmit: RAGContext | null = null;
      let webContextToSubmit: any = null;

      // Debug logging
      console.log("🔍 Submit context check:", {
        enableRAG,
        webSearchEnabled,
        webSearchConfigured: webSearchStatus?.configured,
        hasRAGSearch: !!onRAGSearch,
        hasWebSearch: !!onWebSearch,
      });

      // Only perform RAG search if explicitly enabled
      if (enableRAG && onRAGSearch) {
        console.log("🔍 Performing RAG search...");
        setIsRAGSearching(true);
        try {
          ragContextToSubmit = await onRAGSearch(prompt);
        } catch (error) {
          console.error("RAG search failed:", error);
        } finally {
          setIsRAGSearching(false);
        }
      }

      // Only perform web search if explicitly enabled AND configured
      if (webSearchEnabled && onWebSearch && webSearchStatus?.configured) {
        console.log("🔍 Performing web search...");
        setIsWebSearching(true);
        try {
          webContextToSubmit = await onWebSearch(prompt);
        } catch (error) {
          console.error("Web search failed:", error);
        } finally {
          setIsWebSearching(false);
        }
      } else {
        console.log("🔍 Web search skipped:", {
          webSearchEnabled,
          hasWebSearch: !!onWebSearch,
          configured: webSearchStatus?.configured,
        });
      }

      if (onSubmit) {
        onSubmit(
          prompt,
          selectedResearchType,
          selectedResearchDepth,
          ragContextToSubmit || undefined,
          webContextToSubmit || undefined
        );
      }

      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (currentValue.trim() && !isGenerating && !disabled && onSubmit) {
        handleSubmitWithContext(currentValue.trim());
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (onFileAttach) {
          onFileAttach(file);
        } else if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
      event.target.value = "";
    };

    const handleRemoveImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleSampleClick = (sample: string) => {
      if (onChange) {
        onChange(sample);
      } else {
        setInternalValue(sample);
      }
      setIsSamplesOpen(false);
    };

    const handleResearchTypeSelect = (type: ResearchType) => {
      onResearchTypeChange?.(type);
      setIsResearchTypesOpen(false);
    };

    const handleResearchDepthSelect = (depth: ResearchDepth) => {
      onResearchDepthChange?.(depth);
    };

    const hasValue = currentValue.trim().length > 0 || imagePreview;
    const activeResearchType = researchTypes.find(
      (t) => t.type === selectedResearchType
    );
    const activeResearchDepth = researchDepthOptions.find(
      (d) => d.value === selectedResearchDepth
    );
    const ActiveResearchIcon = activeResearchType?.icon;

    return (
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "flex flex-col rounded-[28px] p-2 shadow-sm transition-colors bg-background border cursor-text",
            compact && "rounded-2xl p-3",
            className
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept={acceptedFileTypes}
            disabled={disabled}
          />

          {imagePreview && (
            <Dialog
              open={isImageDialogOpen}
              onOpenChange={setIsImageDialogOpen}
            >
              <div className="relative mb-1 w-fit rounded-[1rem] px-1 pt-1">
                <button
                  type="button"
                  className="transition-transform"
                  onClick={() => setIsImageDialogOpen(true)}
                  disabled={disabled}
                >
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="h-14.5 w-14.5 rounded-[1rem]"
                  />
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-background/50 text-foreground transition-colors hover:bg-accent"
                  aria-label="Remove image"
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <DialogContent>
                <img
                  src={imagePreview}
                  alt="Full size preview"
                  className="w-full max-h-[95vh] object-contain rounded-[24px]"
                />
              </DialogContent>
            </Dialog>
          )}

          <textarea
            ref={internalTextareaRef}
            rows={compact ? 1 : 3}
            value={currentValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isGenerating}
            className={cn(
              "custom-scrollbar w-full resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 focus-visible:outline-none",
              compact ? "p-2 text-sm min-h-10" : "p-4 min-h-20"
            )}
            {...props}
          />

          <div className={cn("mt-0.5 p-1 pt-0", compact && "mt-1 p-0")}>
            <TooltipProvider delayDuration={100}>
              <div className="flex items-center gap-2">
                {/* Essential buttons - always visible */}
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || isGenerating}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Attach file</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow={true}>
                      <p>Attach file</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={onVoiceRecord}
                        disabled={disabled || isGenerating}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                          isRecording
                            ? "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">
                          {isRecording ? "Stop recording" : "Record voice"}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow={true}>
                      <p>{isRecording ? "Stop recording" : "Record voice"}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Search toggles - always visible */}
                <div className="flex items-center gap-1">
                  <div className="h-4 w-px bg-border" />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => onRAGToggle?.(!enableRAG)}
                        disabled={disabled || isGenerating}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                          enableRAG
                            ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <Database className="h-4 w-4" />
                        <span className="sr-only">
                          {enableRAG ? "Disable" : "Enable"} knowledge base
                          search
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow={true}>
                      <p>
                        {enableRAG ? "Disable" : "Enable"} knowledge base search
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => onWebSearchToggle?.(!webSearchEnabled)}
                        disabled={
                          disabled ||
                          isGenerating ||
                          !webSearchStatus?.configured
                        }
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                          webSearchEnabled
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {webSearchEnabled ? (
                          <Wifi className="h-4 w-4" />
                        ) : (
                          <WifiOff className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {webSearchEnabled ? "Disable" : "Enable"} web search
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow={true}>
                      <p>
                        {webSearchEnabled ? "Disable" : "Enable"} web search
                        {!webSearchStatus?.configured &&
                          " (API not configured)"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Configuration and submit */}
                <div className="ml-auto flex items-center gap-2">
                  {!compact && (
                    <>
                      <Popover
                        open={isResearchTypesOpen}
                        onOpenChange={setIsResearchTypesOpen}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                disabled={disabled || isGenerating}
                                className="flex h-8 items-center gap-2 rounded-full p-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Settings2 className="h-4 w-4" />
                                <span>Configure</span>
                              </button>
                            </PopoverTrigger>
                          </TooltipTrigger>
                          <TooltipContent side="top" showArrow={true}>
                            <p>Research Configuration</p>
                          </TooltipContent>
                        </Tooltip>
                        <PopoverContent
                          side="top"
                          align="start"
                          className="w-80"
                        >
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm text-foreground">
                                Research Type
                              </h4>
                              <div className="space-y-1">
                                {researchTypes.map((research) => {
                                  const IconComponent = research.icon;
                                  const isSelected =
                                    selectedResearchType === research.type;

                                  return (
                                    <button
                                      key={research.type}
                                      onClick={() =>
                                        handleResearchTypeSelect(research.type)
                                      }
                                      className={cn(
                                        "w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors hover:bg-accent",
                                        isSelected
                                          ? "bg-accent text-accent-foreground"
                                          : "text-muted-foreground hover:text-foreground"
                                      )}
                                    >
                                      <IconComponent className="w-4 h-4 shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">
                                          {research.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {research.description}
                                        </div>
                                      </div>
                                      {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="border-t pt-3">
                              <h4 className="font-medium text-sm text-foreground mb-2">
                                Research Depth
                              </h4>
                              <div className="space-y-1">
                                {researchDepthOptions.map((depth) => {
                                  const isSelected =
                                    selectedResearchDepth === depth.value;

                                  return (
                                    <button
                                      key={depth.value}
                                      onClick={() =>
                                        handleResearchDepthSelect(depth.value)
                                      }
                                      className={cn(
                                        "w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors hover:bg-accent",
                                        isSelected
                                          ? "bg-accent text-accent-foreground"
                                          : "text-muted-foreground hover:text-foreground"
                                      )}
                                    >
                                      <Search className="w-4 h-4 shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">
                                          {depth.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {depth.description}
                                        </div>
                                      </div>
                                      {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover
                        open={isSamplesOpen}
                        onOpenChange={setIsSamplesOpen}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                disabled={disabled || isGenerating}
                                className="flex h-8 items-center gap-2 rounded-full p-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Lightbulb className="h-4 w-4" />
                                <span>Examples</span>
                              </button>
                            </PopoverTrigger>
                          </TooltipTrigger>
                          <TooltipContent side="top" showArrow={true}>
                            <p>Sample Prompts</p>
                          </TooltipContent>
                        </Tooltip>
                        <PopoverContent side="top" align="start">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">
                              Try these examples
                            </h4>
                            <div className="space-y-2">
                              {samplePrompts.map((sample, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSampleClick(sample)}
                                  className="w-full text-left p-2 text-xs rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                                >
                                  "{sample}"
                                </button>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      {(activeResearchType || activeResearchDepth) && (
                        <>
                          <div className="h-4 w-px bg-border" />
                          <div className="flex items-center gap-1">
                            {activeResearchType && (
                              <div className="flex h-7 items-center gap-2 rounded-md px-2 text-xs bg-secondary text-secondary-foreground border">
                                {ActiveResearchIcon && (
                                  <ActiveResearchIcon className="h-3 w-3" />
                                )}
                                <span>{activeResearchType.shortName}</span>
                              </div>
                            )}
                            {activeResearchDepth && (
                              <div className="flex h-7 items-center gap-2 rounded-md px-2 text-xs bg-secondary text-secondary-foreground border">
                                <Search className="h-3 w-3" />
                                <span>{activeResearchDepth.shortName}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="submit"
                        disabled={
                          !hasValue ||
                          isGenerating ||
                          disabled ||
                          isRAGSearching ||
                          isWebSearching
                        }
                        className={cn(
                          "flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
                          compact ? "h-8 w-8 p-0" : "h-9 px-4"
                        )}
                      >
                        {isGenerating || isRAGSearching || isWebSearching ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {!compact && (
                              <span className="ml-2">
                                {isRAGSearching
                                  ? "Searching..."
                                  : isWebSearching
                                    ? "Web searching..."
                                    : "Streaming..."}
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {!compact && <span className="ml-2">Generate</span>}
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow={true}>
                      <p>
                        {isRAGSearching
                          ? "Searching knowledge base..."
                          : isWebSearching
                            ? "Searching web for context..."
                            : isGenerating
                              ? "Research streaming in progress..."
                              : "Generate Research"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </form>
    );
  }
);

PromptBox.displayName = "PromptBox";

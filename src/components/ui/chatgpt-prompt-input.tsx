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
  Globe,
  Plus,
  Settings2,
  Send,
  X,
  Mic,
  Lightbulb,
  Loader2,
  Link,
} from "lucide-react";

// RAG Types
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

// --- Utility Function & Radix Primitives ---
type ClassValue = string | number | boolean | null | undefined;
function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

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
const DialogTrigger = DialogPrimitive.Trigger;
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

// Research Types Configuration
export type ResearchType =
  | "deep-research"
  | "social"
  | "finance"
  | "academic"
  | "technical"
  | "market";

export type ResearchDepth = "quick" | "detailed" | "comprehensive";

const researchTypes = [
  {
    type: "deep-research" as ResearchType,
    label: "Deep Research",
    shortName: "Deep",
    icon: Brain,
    description: "Comprehensive analysis",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    type: "social" as ResearchType,
    label: "Social Research",
    shortName: "Social",
    icon: Users,
    description: "Social trends & culture",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    type: "finance" as ResearchType,
    label: "Financial Analysis",
    shortName: "Finance",
    icon: DollarSign,
    description: "Financial insights",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    type: "academic" as ResearchType,
    label: "Academic Research",
    shortName: "Academic",
    icon: GraduationCap,
    description: "Scholarly research",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    type: "technical" as ResearchType,
    label: "Technical Analysis",
    shortName: "Technical",
    icon: Code,
    description: "Technical insights",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    type: "market" as ResearchType,
    label: "Market Research",
    shortName: "Market",
    icon: TrendingUp,
    description: "Market insights",
    color: "bg-red-500/10 text-red-600 border-red-200",
  },
];

const researchDepthOptions = [
  {
    value: "quick" as ResearchDepth,
    label: "Quick Research",
    shortName: "Quick",
    description: "Key points & overview",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    value: "detailed" as ResearchDepth,
    label: "Detailed Analysis",
    shortName: "Detailed",
    description: "Comprehensive analysis",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    value: "comprehensive" as ResearchDepth,
    label: "Deep Research",
    shortName: "Deep",
    description: "Exhaustive investigation",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
];

const samplePrompts = [
  "Analyze the impact of AI on modern education systems",
  "Compare renewable energy adoption across different countries",
  "Examine the role of social media in political movements",
  "Investigate emerging trends in sustainable finance",
];

interface PromptBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (
    prompt: string,
    type: ResearchType,
    depth: "quick" | "detailed" | "comprehensive",
    ragContext?: any,
    webSearchContext?: any
  ) => void;
  selectedResearchType?: ResearchType;
  onResearchTypeChange?: (type: ResearchType) => void;
  selectedResearchDepth?: "quick" | "detailed" | "comprehensive";
  onResearchDepthChange?: (
    depth: "quick" | "detailed" | "comprehensive"
  ) => void;
  isGenerating?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  compact?: boolean; // Add compact mode for chat interface
  // RAG Integration
  enableRAG?: boolean;
  ragService?: any;
  onRAGSearch?: (query: string) => Promise<RAGContext | null>;
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
      compact = false, // Add compact prop
      // RAG Integration
      enableRAG = false,
      ragService,
      onRAGSearch,
      showRAGContext = false,
      // Web Search Integration
      webSearchEnabled = false,
      onWebSearch,
      webSearchStatus,
      ...props
    },
    ref
  ) => {
    const internalTextareaRef = React.useRef<HTMLTextAreaElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = React.useState(value);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [isResearchTypesOpen, setIsResearchTypesOpen] = React.useState(false);
    const [isResearchDepthOpen, setIsResearchDepthOpen] = React.useState(false);
    const [isSamplesOpen, setIsSamplesOpen] = React.useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false);
    // RAG State
    const [ragContext, setRagContext] = React.useState<RAGContext | null>(null);
    const [isRAGSearching, setIsRAGSearching] = React.useState(false);
    const [ragSearchResults, setRagSearchResults] = React.useState<any[]>([]);

    // Web Search State
    const [webSearchContext, setWebSearchContext] = React.useState<any>(null);
    const [isWebSearching, setIsWebSearching] = React.useState(false);

    React.useImperativeHandle(ref, () => internalTextareaRef.current!, []);

    const currentValue = onChange ? value || "" : internalValue;

    React.useLayoutEffect(() => {
      const textarea = internalTextareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const maxHeight = compact ? 120 : 300; // Reduced max height for compact mode
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
          handleSubmitWithRAG(currentValue.trim());
        }
      }
    };

    const handleSubmitWithRAG = async (prompt: string) => {
      let context: RAGContext | null = null;

      // Perform RAG search if enabled
      if (enableRAG && (onRAGSearch || ragService)) {
        setIsRAGSearching(true);
        try {
          if (onRAGSearch) {
            context = await onRAGSearch(prompt);
          } else if (ragService) {
            context = await ragService.searchWithRAG(prompt, {
              threshold: 0.3,
              limit: 5,
              maxContextLength: 2000,
            });
          }
          setRagContext(context);
        } catch (error) {
          console.error("RAG search failed:", error);
        } finally {
          setIsRAGSearching(false);
        }
      }

      // Perform web search if enabled
      if (webSearchEnabled && onWebSearch) {
        setIsWebSearching(true);
        try {
          const webContext = await onWebSearch(prompt);
          setWebSearchContext(webContext);
        } catch (error) {
          console.error("Web search failed:", error);
        } finally {
          setIsWebSearching(false);
        }
      }

      // Submit with combined context
      if (onSubmit) {
        onSubmit(
          prompt,
          selectedResearchType,
          selectedResearchDepth,
          context || undefined,
          webSearchContext || undefined
        );
      }

      // Clear the input after submission
      if (onChange) {
        onChange("");
      } else {
        setInternalValue("");
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (currentValue.trim() && !isGenerating && !disabled && onSubmit) {
        handleSubmitWithRAG(currentValue.trim());
      }
    };

    const handlePlusClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      event.target.value = "";
    };

    const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
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
      if (onResearchTypeChange) {
        onResearchTypeChange(type);
      }
      setIsResearchTypesOpen(false);
    };

    const handleResearchDepthSelect = (depth: ResearchDepth) => {
      if (onResearchDepthChange) {
        onResearchDepthChange(depth);
      }
      setIsResearchDepthOpen(false);
    };

    const hasValue = currentValue.trim().length > 0 || imagePreview;
    const activeResearchType = researchTypes.find(
      (t) => t.type === selectedResearchType
    );
    const activeResearchDepth = researchDepthOptions.find(
      (d) => d.value === selectedResearchDepth
    );
    const ActiveResearchIcon = activeResearchType?.icon;

    // RAG context display
    const showRAGResults =
      showRAGContext && ragContext && ragContext.relevantDocuments.length > 0;

    return (
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "flex flex-col rounded-[28px] p-2 shadow-sm transition-colors bg-background border cursor-text",
            compact && "rounded-2xl p-3", // More compact styling
            className
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            disabled={disabled}
          />

          {/* Image Preview */}
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

          {/* Main Textarea */}
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

          {/* RAG Context Display */}
          {showRAGResults && (
            <div className="mt-2 p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">RAG Context Found</span>
                <span className="text-xs text-muted-foreground">
                  ({ragContext!.metadata.documentCount} docs,{" "}
                  {ragContext!.metadata.chunkCount} chunks)
                </span>
              </div>
              <div className="text-xs text-muted-foreground max-h-20 overflow-y-auto">
                {ragContext!.relevantDocuments.slice(0, 3).map((doc, index) => (
                  <div key={index} className="mb-1">
                    <span className="font-medium">{doc.title}</span>
                    <span className="ml-2">
                      ({(doc.similarity * 100).toFixed(1)}% match)
                    </span>
                  </div>
                ))}
                {ragContext!.relevantDocuments.length > 3 && (
                  <div className="text-muted-foreground">
                    +{ragContext!.relevantDocuments.length - 3} more documents
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Web Search Context Display */}
          {webSearchContext &&
            webSearchContext.results &&
            webSearchContext.results.length > 0 && (
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Web Search Results
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    ({webSearchContext.metadata.resultCount} results found)
                  </span>
                </div>
                <div className="text-xs max-h-24 overflow-y-auto space-y-1">
                  {webSearchContext.results
                    .slice(0, 3)
                    .map((result: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      >
                        <Link className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-blue-900 dark:text-blue-100 truncate">
                            {result.title}
                          </div>
                          <div className="text-blue-600 dark:text-blue-400 text-xs truncate">
                            {result.url}
                          </div>
                          {result.description && (
                            <div className="text-blue-700 dark:text-blue-300 text-xs line-clamp-2 mt-0.5">
                              {result.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {webSearchContext.results.length > 3 && (
                    <div className="text-blue-600 dark:text-blue-400 text-center pt-1">
                      +{webSearchContext.results.length - 3} more results
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Bottom Controls */}
          <div className={cn("mt-0.5 p-1 pt-0", compact && "mt-1 p-0")}>
            <TooltipProvider delayDuration={100}>
              <div className="flex items-center gap-2">
                {/* Left side controls - Hide in compact mode */}
                {!compact && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={handlePlusClick}
                          disabled={disabled || isGenerating}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-6 w-6" />
                          <span className="sr-only">Attach image</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" showArrow={true}>
                        <p>Attach image</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Research Type Selector */}
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
                      <PopoverContent side="top" align="start" className="w-80">
                        <div className="space-y-4">
                          {/* Research Type */}
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

                    {/* Sample Prompts */}
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

                    {/* Active Configuration Badges */}
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

                {/* Right-aligned buttons container */}
                <div className="ml-auto flex items-center gap-3">
                  {!compact && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          disabled={disabled || isGenerating}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Mic className="h-5 w-5" />
                          <span className="sr-only">Record voice</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" showArrow={true}>
                        <p>Record voice</p>
                      </TooltipContent>
                    </Tooltip>
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Lightbulb } from "lucide-react";

interface ResearchPromptProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

const samplePrompts = [
  "Analyze the impact of AI on modern education systems",
  "Compare renewable energy adoption across different countries",
  "Examine the role of social media in political movements",
  "Investigate emerging trends in sustainable finance",
];

export function ResearchPrompt({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  disabled = false,
}: ResearchPromptProps) {
  const [showSamples, setShowSamples] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating && !disabled) {
      onGenerate();
    }
  };

  const handleSampleClick = (samplePrompt: string) => {
    onPromptChange(samplePrompt);
    setShowSamples(false);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Research Query
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSamples(!showSamples)}
          className="text-xs"
        >
          <Lightbulb className="w-3 h-3 mr-1" />
          Examples
        </Button>
      </div>

      {showSamples && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try these examples:</p>
          <div className="space-y-1">
            {samplePrompts.map((sample, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-auto p-2 text-left justify-start text-xs text-muted-foreground hover:text-foreground"
                onClick={() => handleSampleClick(sample)}
              >
                "{sample}"
              </Button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="What would you like to research? Ask anything..."
          className="min-h-[100px] resize-none"
          disabled={disabled}
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {prompt.length}/2000 characters
          </div>

          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating || disabled}
            className="space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Researching...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate Research</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

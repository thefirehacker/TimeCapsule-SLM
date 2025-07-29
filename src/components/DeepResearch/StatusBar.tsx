"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Bot, CheckCircle2, Loader2 } from "lucide-react";

interface StatusBarProps {
  message: string;
  isGenerating?: boolean;
  aiConnected?: boolean;
}

export function StatusBar({
  message,
  isGenerating = false,
  aiConnected = false,
}: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    if (isGenerating) return <Loader2 className="w-3 h-3 animate-spin" />;
    if (aiConnected) return <CheckCircle2 className="w-3 h-3" />;
    return <Bot className="w-3 h-3" />;
  };

  const getStatusColor = () => {
    if (isGenerating) return "bg-blue-500/10 text-blue-600 border-blue-200/50 dark:border-blue-800/30";
    if (aiConnected) return "bg-green-500/10 text-green-600 border-green-200/50 dark:border-green-800/30";
    return "bg-muted/50 text-muted-foreground border-border";
  };

  const getStatusText = () => {
    if (isGenerating) return "Generating Research...";
    if (message) return message;
    if (aiConnected) return "Ready to Research";
    return "Connect AI to Start";
  };

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-card border-t border-border">
      <div className="flex items-center gap-3">
        <Badge 
          variant="outline" 
          className={`${getStatusColor()} text-xs font-medium`}
        >
          {getStatusIcon()}
          <span className="ml-1.5">{getStatusText()}</span>
        </Badge>

        {aiConnected && !isGenerating && (
          <div className="text-xs text-muted-foreground">
            AI Connected • Ready for Research
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        <span className="font-mono">{currentTime}</span>
      </div>
    </div>
  );
}

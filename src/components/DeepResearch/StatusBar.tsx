"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

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

  const getStatusColor = () => {
    if (isGenerating) return "bg-blue-500/10 text-blue-600 border-blue-200";
    if (aiConnected) return "bg-green-500/10 text-green-600 border-green-200";
    return "bg-slate-500/10 text-slate-600 border-slate-200";
  };

  const getStatusText = () => {
    if (isGenerating) return "Generating Research...";
    if (message) return message;
    if (aiConnected) return "Ready to Research";
    return "Connect AI to Start";
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className={getStatusColor()}>
          {isGenerating && (
            <div className="w-2 h-2 bg-current rounded-full animate-pulse mr-2" />
          )}
          {getStatusText()}
        </Badge>

        {aiConnected && !isGenerating && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            AI Connected • Ready for Research
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Clock className="w-3 h-3" />
        <span>{currentTime}</span>
      </div>
    </div>
  );
}

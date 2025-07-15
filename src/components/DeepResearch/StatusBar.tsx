"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Globe, Zap, Activity, Wifi } from "lucide-react";

interface StatusBarProps {
  message: string;
}

export function StatusBar({ message }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 z-50 shadow-lg">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Activity className="h-4 w-4 text-green-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <Badge
                variant="outline"
                className="text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                <Zap className="h-3 w-3 mr-1" />
                Deep Research Studio
              </Badge>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 truncate flex-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="truncate">
                {message || "Ready to research • Waiting for your input"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-xs">
                {mounted ? currentTime : "--:--:--"}
              </span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
              >
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

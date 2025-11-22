"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, GitBranch, PenTool } from "lucide-react";

interface SessionContinuationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSessionName: string;
  actionType: "ai-flow" | "swe-bridge" | "manual";
  onContinue: () => void;
  onCreateNew: () => void;
}

export function SessionContinuationDialog({
  open,
  onOpenChange,
  currentSessionName,
  actionType,
  onContinue,
  onCreateNew,
}: SessionContinuationDialogProps) {
  const getActionIcon = () => {
    switch (actionType) {
      case "ai-flow":
        return <Sparkles className="h-5 w-5 text-purple-500" />;
      case "swe-bridge":
        return <GitBranch className="h-5 w-5 text-blue-500" />;
      case "manual":
        return <PenTool className="h-5 w-5 text-emerald-500" />;
    }
  };

  const getActionTitle = () => {
    switch (actionType) {
      case "ai-flow":
        return "Starting AI Flow";
      case "swe-bridge":
        return "SWE Bridge Sync";
      case "manual":
        return "Manual Frame Creation";
    }
  };

  const getActionDescription = () => {
    switch (actionType) {
      case "ai-flow":
        return "You're about to start an AI Flow generation.";
      case "swe-bridge":
        return "You're about to sync frames from the SWE Bridge.";
      case "manual":
        return "You're about to create a manual frame.";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            {getActionIcon()}
            <DialogTitle className="text-xl font-semibold">{getActionTitle()}</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-slate-600 pt-1">
            {getActionDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Current Session Display */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">
              Current Active Session
            </p>
            <p className="text-base font-semibold text-slate-900 break-words">
              {currentSessionName}
            </p>
          </div>

          {/* Question */}
          <div className="text-center">
            <p className="text-sm text-slate-700">
              Would you like to continue with your current session or start a new one?
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 mt-4 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={() => {
              onContinue();
              onOpenChange(false);
            }}
            className="w-full sm:flex-1 h-11 text-sm font-medium"
          >
            Continue Current Session
          </Button>
          <Button
            onClick={() => {
              onCreateNew();
              onOpenChange(false);
            }}
            className="w-full sm:flex-1 h-11 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
            Create New Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


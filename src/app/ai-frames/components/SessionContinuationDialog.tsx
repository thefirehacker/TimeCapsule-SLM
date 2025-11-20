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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {getActionIcon()}
            <DialogTitle className="text-xl">{getActionTitle()}</DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            {getActionDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm font-medium text-slate-700 mb-1">Current Active Session:</p>
            <p className="text-base font-semibold text-slate-900">{currentSessionName}</p>
          </div>

          <p className="text-sm text-slate-600">
            Would you like to continue with your current session or start a new one?
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              onContinue();
              onOpenChange(false);
            }}
            className="flex-1"
          >
            Continue Current Session
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onCreateNew();
              onOpenChange(false);
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Create New Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


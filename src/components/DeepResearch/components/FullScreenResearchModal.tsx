/**
 * Full-Screen Research Modal
 * 
 * Perplexity-style expandable research process viewer
 * Provides detailed research step visibility with chat history navigation
 */

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResearchSteps, ResearchStep } from "./ResearchSteps";
import { 
  X, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  History,
  Search,
  Download,
  Filter
} from "lucide-react";

export interface ResearchSession {
  id: string;
  query: string;
  timestamp: number;
  steps: ResearchStep[];
  status: 'active' | 'completed' | 'failed';
  duration?: number;
  resultCount?: number;
}

interface FullScreenResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession: ResearchSession | null;
  sessions: ResearchSession[];
  expandedSteps: Set<string>;
  onStepClick: (step: ResearchStep) => void;
  onSessionSwitch?: (sessionId: string) => void;
}

export function FullScreenResearchModal({
  isOpen,
  onClose,
  currentSession,
  sessions,
  expandedSteps,
  onStepClick,
  onSessionSwitch,
}: FullScreenResearchModalProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    currentSession?.id || null
  );
  const [searchFilter, setSearchFilter] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  // Update selected session when current session changes
  useEffect(() => {
    if (currentSession) {
      setSelectedSessionId(currentSession.id);
    }
  }, [currentSession]);

  // Get the selected session
  const selectedSession = sessions.find(s => s.id === selectedSessionId) || currentSession;

  // Filter sessions based on search
  const filteredSessions = sessions.filter(session =>
    session.query.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Handle session selection
  const handleSessionSelect = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    onSessionSwitch?.(sessionId);
    setShowHistory(false);
  };

  // Handle export
  const handleExport = () => {
    if (!selectedSession) return;
    
    const exportData = {
      session: selectedSession,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-session-${selectedSession.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-4 bg-background border border-border rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Research Process</h2>
            </div>
            
            {selectedSession && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {selectedSession.status}
                </Badge>
                {selectedSession.duration && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(selectedSession.duration / 1000)}s
                  </Badge>
                )}
                {selectedSession.resultCount && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedSession.resultCount} results
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs"
            >
              <History className="w-4 h-4 mr-1" />
              History ({sessions.length})
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              disabled={!selectedSession}
              className="text-xs"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>

            <Separator orientation="vertical" className="h-6" />

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Session History Sidebar */}
          {showHistory && (
            <div className="w-80 border-r border-border bg-card/30 flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium mb-3">Research Sessions</h3>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {filteredSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSessionSelect(session.id)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        selectedSessionId === session.id
                          ? 'bg-primary/10 border-primary/20 border'
                          : 'hover:bg-card/50'
                      }`}
                    >
                      <div className="font-medium text-sm truncate mb-1">
                        {session.query}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {new Date(session.timestamp).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {session.steps.length} steps
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Main Research Content */}
          <div className="flex-1 flex flex-col">
            {selectedSession ? (
              <>
                {/* Session Header */}
                <div className="p-4 border-b border-border bg-card/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        {selectedSession.query}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          Started: {new Date(selectedSession.timestamp).toLocaleString()}
                        </span>
                        {selectedSession.duration && (
                          <span>
                            Duration: {Math.round(selectedSession.duration / 1000)}s
                          </span>
                        )}
                      </div>
                    </div>

                    {sessions.length > 1 && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentIndex = sessions.findIndex(s => s.id === selectedSessionId);
                            const prevIndex = currentIndex > 0 ? currentIndex - 1 : sessions.length - 1;
                            handleSessionSelect(sessions[prevIndex].id);
                          }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-xs text-muted-foreground px-2">
                          {sessions.findIndex(s => s.id === selectedSessionId) + 1} of {sessions.length}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentIndex = sessions.findIndex(s => s.id === selectedSessionId);
                            const nextIndex = currentIndex < sessions.length - 1 ? currentIndex + 1 : 0;
                            handleSessionSelect(sessions[nextIndex].id);
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Research Steps */}
                <div className="flex-1 p-4">
                  <ResearchSteps
                    steps={selectedSession.steps}
                    onStepClick={onStepClick}
                    expandedSteps={expandedSteps}
                    className="h-full"
                    fullScreenMode={true}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Maximize2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Research Session Selected</h3>
                  <p className="text-sm">
                    Start a research query to see the detailed process here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
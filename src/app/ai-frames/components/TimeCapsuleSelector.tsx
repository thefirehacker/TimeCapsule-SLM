/**
 * TimeCapsuleSelector Component
 * Dropdown in header to switch between TimeCapsules (projects)
 */

'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, ChevronDown, Edit, Check, X, Share2 } from "lucide-react";
import { TimeCapsule } from '@/lib/kb/types/timecapsule';
import { SharedCapsuleSelection, SharedTimeCapsuleSummary } from '../hooks/useTimeCapsule';

export interface TimeCapsuleSelectorProps {
  timeCapsules: TimeCapsule[];
  activeId: string | null;
  onSwitch: (id: string) => void;
  onCreate: (name: string, description: string) => Promise<TimeCapsule | null>;
  onRename?: (id: string, newName: string) => Promise<void>;
  sessions?: any[];  // To calculate session count per TimeCapsule
  frames?: any[];    // To calculate frame count per TimeCapsule
  sharedTimeCapsules?: SharedTimeCapsuleSummary[];
  onSharedSelect?: (capsule: SharedTimeCapsuleSummary) => void;
  activeSharedCapsule?: SharedCapsuleSelection | null;
  sharedLoading?: boolean;
  shareState?: {
    isShared: boolean;
    collaboratorCount: number;
  };
}

export function TimeCapsuleSelector({
  timeCapsules,
  activeId,
  onSwitch,
  onCreate,
  onRename,
  sessions = [],
  frames = [],
  sharedTimeCapsules = [],
  onSharedSelect,
  activeSharedCapsule,
  sharedLoading = false,
  shareState,
}: TimeCapsuleSelectorProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  
  const activeTimeCapsule = timeCapsules.find(tc => tc.id === activeId);
  const viewingShared = activeSharedCapsule && activeSharedCapsule.frameSetId === activeId;
  
  // Calculate counts per TimeCapsule
  const getTimeCapsuleCounts = (tcId: string) => {
    const sessionCount = sessions.filter(s => s.timeCapsuleId === tcId).length;
    const frameCount = frames.filter(f => f.timeCapsuleId === tcId).length;
    const docCount = timeCapsules.find(tc => tc.id === tcId)?.documentCount || 0;
    return { sessionCount, frameCount, docCount };
  };

  const handleCreate = async () => {
    // For now, create with default name
    // TODO: Show dialog to get name and description
    const timestamp = new Date().toLocaleString();
    await onCreate(`New Project ${timestamp}`, 'A new workspace');
    setShowCreateDialog(false);
  };

  const handleStartEdit = (tc: TimeCapsule, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(tc.id);
    setEditingName(tc.name);
  };

  const handleSaveEdit = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onRename && editingName.trim() && editingName !== timeCapsules.find(tc => tc.id === id)?.name) {
      await onRename(id, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
    setEditingName('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[220px] justify-between"
        >
          <div className="flex items-center gap-2 overflow-hidden text-left">
            <Package className="h-4 w-4 flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="truncate">
                {viewingShared
                  ? `${activeSharedCapsule?.title || "Shared project"}`
                  : activeTimeCapsule?.name || "Select Project"}
              </span>
              {(shareState?.isShared || viewingShared) && (
                <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                  <Share2 className="h-3 w-3" />
                  {viewingShared
                    ? "Shared project"
                    : shareState?.collaboratorCount
                    ? `${shareState.collaboratorCount} collaborator${shareState.collaboratorCount === 1 ? "" : "s"}`
                    : "Link active"}
                </span>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        <DropdownMenuLabel>TimeCapsule</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {timeCapsules.map((tc) => {
          const counts = getTimeCapsuleCounts(tc.id);
          const isEditing = editingId === tc.id;
          
          return (
            <DropdownMenuItem
              key={tc.id}
              onClick={() => !isEditing && onSwitch(tc.id)}
              className={`group ${activeId === tc.id ? 'bg-accent' : ''} ${isEditing ? 'bg-blue-50' : ''}`}
              onSelect={(e) => {
                if (isEditing) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2 w-full">
                  {isEditing ? (
                    <>
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === 'Enter') {
                            handleSaveEdit(tc.id);
                          } else if (e.key === 'Escape') {
                            handleCancelEdit(e as any);
                          }
                        }}
                        className="h-7 text-sm font-medium flex-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => handleSaveEdit(tc.id, e)}
                        className="h-6 w-6 p-0 hover:bg-green-100"
                      >
                        <Check className="h-3 w-3 text-green-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="h-6 w-6 p-0 hover:bg-red-100"
                      >
                        <X className="h-3 w-3 text-red-600" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="font-medium flex-1">{tc.name}</span>
                      {onRename && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleStartEdit(tc, e)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-blue-100"
                        >
                          <Edit className="h-3 w-3 text-blue-600" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {counts.sessionCount} sessions · {counts.frameCount} frames · {counts.docCount} docs
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Shared with me</DropdownMenuLabel>
        {sharedTimeCapsules.length ? (
          sharedTimeCapsules.map((shared) => (
            <DropdownMenuItem
              key={`shared-${shared.id}`}
              className="flex flex-col items-start gap-1 opacity-90"
              disabled={sharedLoading && activeSharedCapsule?.frameSetId === shared.id}
              onSelect={async (e) => {
                e.preventDefault();
                if (sharedLoading) return;
                await onSharedSelect?.(shared);
              }}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-medium truncate">{shared.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  Shared
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Owner:{" "}
                {shared.ownerName || shared.ownerEmail
                  ? `${shared.ownerName ?? "Unknown"}${
                      shared.ownerEmail ? ` (${shared.ownerEmail})` : ""
                    }`
                  : "Unknown"}{" "}
                · Updated{" "}
                {shared.updatedAt
                  ? new Date(shared.updatedAt).toLocaleDateString()
                  : "recently"}
              </p>
              <span className="text-[11px] text-blue-600">
                {sharedLoading && activeSharedCapsule?.frameSetId === shared.id
                  ? "Loading…"
                  : "Click to load inside AI Frames"}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled className="text-xs text-muted-foreground">
            No shared projects yet.
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


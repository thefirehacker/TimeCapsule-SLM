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
import { Package, Plus, ChevronDown, Edit, Check, X } from 'lucide-react';
import { TimeCapsule } from '@/lib/kb/types/timecapsule';
import { SharedTimeCapsuleSummary } from '../hooks/useTimeCapsule';

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
}: TimeCapsuleSelectorProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  
  const activeTimeCapsule = timeCapsules.find(tc => tc.id === activeId);
  
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
          className="min-w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="truncate">
              {activeTimeCapsule?.name || 'Select Project'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
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
              onSelect={(e) => {
                e.preventDefault();
                onSharedSelect?.(shared);
              }}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-medium truncate">{shared.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  Shared
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Owner: {shared.ownerUserId || "Unknown"} · Updated{" "}
                {shared.updatedAt
                  ? new Date(shared.updatedAt).toLocaleDateString()
                  : "recently"}
              </p>
              {shared.shareToken ? (
                <span className="text-[11px] text-blue-600">
                  Click to open shared link in a new tab
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">
                  Waiting for owner to generate a share link
                </span>
              )}
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


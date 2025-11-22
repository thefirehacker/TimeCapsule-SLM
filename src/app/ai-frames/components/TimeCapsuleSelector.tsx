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
import { Package, Plus, ChevronDown } from 'lucide-react';
import { TimeCapsule } from '@/lib/kb/types/timecapsule';

export interface TimeCapsuleSelectorProps {
  timeCapsules: TimeCapsule[];
  activeId: string | null;
  onSwitch: (id: string) => void;
  onCreate: (name: string, description: string) => Promise<TimeCapsule | null>;
}

export function TimeCapsuleSelector({
  timeCapsules,
  activeId,
  onSwitch,
  onCreate,
}: TimeCapsuleSelectorProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const activeTimeCapsule = timeCapsules.find(tc => tc.id === activeId);

  const handleCreate = async () => {
    // For now, create with default name
    // TODO: Show dialog to get name and description
    const timestamp = new Date().toLocaleString();
    await onCreate(`New Project ${timestamp}`, 'A new workspace');
    setShowCreateDialog(false);
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
      <DropdownMenuContent align="start" className="w-[250px]">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {timeCapsules.map((tc) => (
          <DropdownMenuItem
            key={tc.id}
            onClick={() => onSwitch(tc.id)}
            className={activeId === tc.id ? 'bg-accent' : ''}
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="font-medium">{tc.name}</div>
              <div className="text-xs text-muted-foreground">
                {tc.frameCount || 0} frames · {tc.documentCount || 0} docs
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


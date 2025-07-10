"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Badge } from './badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { Separator } from './separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Switch } from './switch';
import { X, Plus, Palette, Star, Package, Users, Settings, Trash2 } from 'lucide-react';
import { 
  BubblSpace, 
  validateBubblSpace, 
  DEFAULT_BUBBLSPACE 
} from '../../types/timecapsule';

interface BubblSpaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bubblSpace?: BubblSpace | null;
  onSave: (bubblSpace: Partial<BubblSpace>) => void;
  onDelete?: (id: string) => void;
  existingBubblSpaces?: BubblSpace[];
}

const PRESET_COLORS = [
  '#6366F1', // Indigo
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
];

const PRESET_ICONS = [
  { icon: Package, label: 'Project' },
  { icon: Users, label: 'Team' },
  { icon: Star, label: 'Favorite' },
  { icon: Settings, label: 'System' },
];

export function BubblSpaceDialog({
  isOpen,
  onClose,
  bubblSpace,
  onSave,
  onDelete,
  existingBubblSpaces = [],
}: BubblSpaceDialogProps) {
  const [formData, setFormData] = useState<Partial<BubblSpace>>({
    ...DEFAULT_BUBBLSPACE,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newTag, setNewTag] = useState('');

  const isEditing = !!bubblSpace;

  useEffect(() => {
    if (isOpen) {
      if (bubblSpace) {
        setFormData({ ...bubblSpace });
      } else {
        setFormData({
          ...DEFAULT_BUBBLSPACE,
          color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)],
        });
      }
      setErrors([]);
      setNewTag('');
    }
  }, [isOpen, bubblSpace]);

  const handleInputChange = (field: keyof BubblSpace, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    const tags = formData.tags || [];
    if (!tags.includes(newTag.trim())) {
      handleInputChange('tags', [...tags, newTag.trim()]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const tags = formData.tags || [];
    handleInputChange('tags', tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    const validationErrors = validateBubblSpace(formData);
    
    // Check for duplicate names (excluding current if editing)
    const duplicateName = existingBubblSpaces.some(space => 
      space.name.toLowerCase() === formData.name?.toLowerCase() &&
      space.id !== bubblSpace?.id
    );
    
    if (duplicateName) {
      validationErrors.push('A BubblSpace with this name already exists');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to save BubblSpace']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bubblSpace || !onDelete) return;
    
    setIsLoading(true);
    try {
      await onDelete(bubblSpace.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to delete BubblSpace']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (newTag.trim()) {
        handleAddTag();
      } else {
        handleSave();
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: formData.color || PRESET_COLORS[0] }}
              />
              {isEditing ? 'Edit BubblSpace' : 'Create New BubblSpace'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update your BubblSpace settings and organization.'
                : 'Create a new workspace to organize your learning and research projects.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Error Display */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="text-red-800">
                    <h4 className="font-medium">Please fix the following errors:</h4>
                    <ul className="mt-2 list-disc list-inside text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter BubblSpace name..."
                  onKeyDown={handleKeyDown}
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(formData.name || '').length}/100 characters
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this BubblSpace is for..."
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(formData.description || '').length}/500 characters
                </p>
              </div>
            </div>

            <Separator />

            {/* Customization */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Customization
              </h4>
              
              {/* Color Selection */}
              <div>
                <Label>Color Theme</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleInputChange('color', color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === color
                          ? 'border-gray-400 ring-2 ring-blue-500 ring-offset-2'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      maxLength={50}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-red-100"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Settings */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Set as Default BubblSpace</Label>
                  <p className="text-xs text-gray-500">
                    This will be your primary workspace for new projects
                  </p>
                </div>
                <Switch
                  checked={formData.isDefault || false}
                  onCheckedChange={(checked) => handleInputChange('isDefault', checked)}
                />
              </div>
            </div>

            {/* Metadata (for editing) */}
            {isEditing && bubblSpace && (
              <>
                <Separator />
                <div className="space-y-2 text-xs text-gray-500">
                  <p><strong>Created:</strong> {new Date(bubblSpace.createdAt).toLocaleString()}</p>
                  <p><strong>Updated:</strong> {new Date(bubblSpace.updatedAt).toLocaleString()}</p>
                  <p><strong>ID:</strong> {bubblSpace.id}</p>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              {isEditing && onDelete && (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isLoading}
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading || !formData.name?.trim()}
              >
                {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete BubblSpace</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{bubblSpace?.name}"? This will also delete all associated TimeCapsules and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 
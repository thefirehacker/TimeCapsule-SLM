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
import { X, Plus, Clock, Tag, Shield, BookOpen, Users, Lightbulb, Target, Trash2, Package } from 'lucide-react';
import { 
  TimeCapsuleMetadata, 
  BubblSpace,
  validateTimeCapsule, 
  DEFAULT_TIMECAPSULE,
  MetadataUtils
} from '../../types/timecapsule';

interface TimeCapsuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  timeCapsule?: TimeCapsuleMetadata | null;
  onSave: (timeCapsule: Partial<TimeCapsuleMetadata>) => void;
  onDelete?: (id: string) => void;
  bubblSpaces: BubblSpace[];
  defaultBubblSpaceId?: string;
}

const CATEGORY_OPTIONS = [
  { value: 'research', label: 'Research', icon: BookOpen, description: 'Research and analysis projects' },
  { value: 'learning', label: 'Learning', icon: Target, description: 'Educational and training content' },
  { value: 'training', label: 'Training', icon: Users, description: 'Training materials and courses' },
  { value: 'collaboration', label: 'Collaboration', icon: Users, description: 'Team projects and shared work' },
  { value: 'other', label: 'Other', icon: Package, description: 'General purpose projects' },
];

const PRIVACY_OPTIONS = [
  { value: 'private', label: 'Private', icon: Shield, description: 'Only you can access this TimeCapsule' },
  { value: 'shared', label: 'Shared', icon: Users, description: 'Share with specific team members' },
  { value: 'public', label: 'Public', icon: Package, description: 'Public access (if supported)' },
];

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' },
];

export function TimeCapsuleDialog({
  isOpen,
  onClose,
  timeCapsule,
  onSave,
  onDelete,
  bubblSpaces,
  defaultBubblSpaceId,
}: TimeCapsuleDialogProps) {
  const [formData, setFormData] = useState<Partial<TimeCapsuleMetadata>>({
    ...DEFAULT_TIMECAPSULE,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newTag, setNewTag] = useState('');

  const isEditing = !!timeCapsule;

  useEffect(() => {
    if (isOpen) {
      if (timeCapsule) {
        setFormData({ ...timeCapsule });
      } else {
        const selectedCategory = 'learning'; // Default based on context
        setFormData({
          ...DEFAULT_TIMECAPSULE,
          name: MetadataUtils.generateTimeCapsuleName(selectedCategory),
          bubblSpaceId: defaultBubblSpaceId || (bubblSpaces[0]?.id || ''),
          category: selectedCategory,
        });
      }
      setErrors([]);
      setNewTag('');
    }
  }, [isOpen, timeCapsule, defaultBubblSpaceId, bubblSpaces]);

  const handleInputChange = (field: keyof TimeCapsuleMetadata, value: any) => {
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
    const validationErrors = validateTimeCapsule(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to save TimeCapsule']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!timeCapsule || !onDelete) return;
    
    setIsLoading(true);
    try {
      await onDelete(timeCapsule.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to delete TimeCapsule']);
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

  const selectedBubblSpace = bubblSpaces.find(bs => bs.id === formData.bubblSpaceId);
  const selectedCategory = CATEGORY_OPTIONS.find(cat => cat.value === formData.category);
  const selectedPrivacy = PRIVACY_OPTIONS.find(priv => priv.value === formData.privacy);
  const selectedDifficulty = DIFFICULTY_OPTIONS.find(diff => diff.value === formData.difficulty);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedBubblSpace && (
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: selectedBubblSpace.color || '#3B82F6' }}
                />
              )}
              {isEditing ? 'Edit TimeCapsule' : 'Create New TimeCapsule'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Update your TimeCapsule settings and metadata.'
                : 'Create a new TimeCapsule to save your learning and research session.'
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
                <Label htmlFor="name">TimeCapsule Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter TimeCapsule name..."
                  onKeyDown={handleKeyDown}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(formData.name || '').length}/200 characters
                </p>
              </div>

              <div>
                <Label htmlFor="bubblspace">BubblSpace *</Label>
                <Select
                  value={formData.bubblSpaceId || ''}
                  onValueChange={(value) => handleInputChange('bubblSpaceId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a BubblSpace..." />
                  </SelectTrigger>
                  <SelectContent>
                    {bubblSpaces.map((bubblSpace) => (
                      <SelectItem key={bubblSpace.id} value={bubblSpace.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: bubblSpace.color || '#3B82F6' }}
                          />
                          <span>{bubblSpace.name}</span>
                          {bubblSpace.isDefault && (
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedBubblSpace && (
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedBubblSpace.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this TimeCapsule contains..."
                  rows={3}
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(formData.description || '').length}/1000 characters
                </p>
              </div>
            </div>

            <Separator />

            {/* Categories and Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category || 'other'}
                  onValueChange={(value) => handleInputChange('category', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{category.label}</div>
                              <div className="text-xs text-gray-500">{category.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Privacy */}
              <div>
                <Label>Privacy</Label>
                <Select
                  value={formData.privacy || 'private'}
                  onValueChange={(value) => handleInputChange('privacy', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIVACY_OPTIONS.map((privacy) => {
                      const IconComponent = privacy.icon;
                      return (
                        <SelectItem key={privacy.value} value={privacy.value}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{privacy.label}</div>
                              <div className="text-xs text-gray-500">{privacy.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div>
                <Label>Difficulty Level</Label>
                <Select
                  value={formData.difficulty || 'beginner'}
                  onValueChange={(value) => handleInputChange('difficulty', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_OPTIONS.map((difficulty) => (
                      <SelectItem key={difficulty.value} value={difficulty.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${difficulty.color}`}>
                            {difficulty.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estimated Duration */}
              <div>
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.estimatedDuration || ''}
                  onChange={(e) => handleInputChange('estimatedDuration', parseInt(e.target.value) || undefined)}
                  placeholder="e.g. 60"
                  min="1"
                  max="10080" // 1 week
                />
                {formData.estimatedDuration && (
                  <p className="text-xs text-gray-500 mt-1">
                    ≈ {MetadataUtils.formatDuration(formData.estimatedDuration)}
                  </p>
                )}
              </div>
            </div>

            <Separator />

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

            {/* Current Selection Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">BubblSpace:</span>
                  <div className="flex items-center gap-1 mt-1">
                    {selectedBubblSpace && (
                      <>
                        <div 
                          className="w-2 h-2 rounded"
                          style={{ backgroundColor: selectedBubblSpace.color }}
                        />
                        <span className="font-medium">{selectedBubblSpace.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <div className="flex items-center gap-1 mt-1">
                    {selectedCategory && (
                      <>
                        <selectedCategory.icon className="w-3 h-3" />
                        <span className="font-medium">{selectedCategory.label}</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Privacy:</span>
                  <div className="flex items-center gap-1 mt-1">
                    {selectedPrivacy && (
                      <>
                        <selectedPrivacy.icon className="w-3 h-3" />
                        <span className="font-medium">{selectedPrivacy.label}</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Difficulty:</span>
                  <div className="mt-1">
                    {selectedDifficulty && (
                      <Badge className={`text-xs ${selectedDifficulty.color}`}>
                        {selectedDifficulty.label}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata (for editing) */}
            {isEditing && timeCapsule && (
              <>
                <Separator />
                <div className="space-y-2 text-xs text-gray-500">
                  <p><strong>Created:</strong> {new Date(timeCapsule.createdAt).toLocaleString()}</p>
                  <p><strong>Updated:</strong> {new Date(timeCapsule.updatedAt).toLocaleString()}</p>
                  <p><strong>Version:</strong> {timeCapsule.version}</p>
                  <p><strong>ID:</strong> {timeCapsule.id}</p>
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
                disabled={isLoading || !formData.name?.trim() || !formData.bubblSpaceId}
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
            <AlertDialogTitle>Delete TimeCapsule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{timeCapsule?.name}"? This action cannot be undone.
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
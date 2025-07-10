"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Label } from './label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './alert-dialog';
import { Separator } from './separator';
import { Switch } from './switch';
import { Badge } from './badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Progress } from './progress';
import { 
  AlertTriangle, 
  Shield, 
  Database, 
  FileText, 
  Video, 
  BookOpen, 
  Settings, 
  Package,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { 
  EnhancedTimeCapsule,
  ImportOptions,
  ImportResult,
  DEFAULT_IMPORT_OPTIONS,
  MetadataUtils,
  BubblSpace,
  TimeCapsuleMetadata
} from '../../types/timecapsule';

interface SafeImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  timeCapsuleData: EnhancedTimeCapsule | null;
  onImport: (options: ImportOptions) => Promise<ImportResult>;
  existingData?: {
    bubblSpaces: BubblSpace[];
    timeCapsules: TimeCapsuleMetadata[];
    hasResearchData: boolean;
    hasAIFramesData: boolean;
    hasVectorStoreData: boolean;
  };
}

export function SafeImportDialog({
  isOpen,
  onClose,
  timeCapsuleData,
  onImport,
  existingData,
}: SafeImportDialogProps) {
  const [importOptions, setImportOptions] = useState<ImportOptions>(DEFAULT_IMPORT_OPTIONS);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState<'review' | 'importing' | 'complete'>('review');

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen && timeCapsuleData) {
      setImportOptions(DEFAULT_IMPORT_OPTIONS);
      setImportProgress(0);
      setImportResult(null);
      setCurrentStep('review');
    }
  }, [isOpen, timeCapsuleData]);

  const handleOptionChange = (key: keyof ImportOptions, value: any) => {
    setImportOptions(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectiveImportChange = (key: keyof ImportOptions['selectiveImport'], value: boolean) => {
    setImportOptions(prev => ({
      ...prev,
      selectiveImport: {
        ...prev.selectiveImport,
        [key]: value,
      },
    }));
  };

  const handleStartImport = () => {
    // Check if there will be data conflicts
    const hasConflicts = (
      (importOptions.mode === 'replace') && 
      (existingData?.hasResearchData || existingData?.hasAIFramesData || existingData?.hasVectorStoreData)
    );

    if (hasConflicts && importOptions.confirmOverwrite) {
      setShowWarningDialog(true);
    } else {
      executeImport();
    }
  };

  const executeImport = async () => {
    if (!timeCapsuleData) return;

    setCurrentStep('importing');
    setIsImporting(true);
    setImportProgress(0);

    try {
      // Simulate progress updates
      const progressSteps = [
        { step: 'Preparing import...', progress: 10 },
        { step: 'Creating backup...', progress: 25 },
        { step: 'Importing BubblSpace...', progress: 40 },
        { step: 'Importing TimeCapsule metadata...', progress: 55 },
        { step: 'Importing research data...', progress: 70 },
        { step: 'Importing AI-Frames...', progress: 85 },
        { step: 'Finalizing...', progress: 100 },
      ];

      for (const step of progressSteps) {
        setImportProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
      }

      const result = await onImport(importOptions);
      setImportResult(result);
      setCurrentStep('complete');
    } catch (error) {
      setImportResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: { itemsImported: {} },
      });
      setCurrentStep('complete');
    } finally {
      setIsImporting(false);
    }
  };

  const getConflictWarnings = () => {
    const warnings: string[] = [];
    
    if (importOptions.mode === 'replace') {
      if (existingData?.hasResearchData && importOptions.selectiveImport.research) {
        warnings.push('Your existing research data will be completely replaced');
      }
      if (existingData?.hasAIFramesData && importOptions.selectiveImport.aiFrames) {
        warnings.push('Your existing AI-Frames will be completely replaced');
      }
      if (existingData?.hasVectorStoreData && importOptions.selectiveImport.vectorStore) {
        warnings.push('Your existing Knowledge Base will be completely replaced');
      }
    }

    return warnings;
  };

  const getImportSummary = () => {
    if (!timeCapsuleData) return null;

    const items: Array<{ label: string; count: number; icon: React.ComponentType<any>; enabled: boolean }> = [
      {
        label: 'BubblSpace',
        count: 1,
        icon: Package,
        enabled: importOptions.selectiveImport.bubblSpace,
      },
      {
        label: 'TimeCapsule Metadata',
        count: 1,
        icon: Settings,
        enabled: importOptions.selectiveImport.timeCapsuleMetadata,
      },
      {
        label: 'Research Topics',
        count: timeCapsuleData.research?.topics?.length || 0,
        icon: BookOpen,
        enabled: importOptions.selectiveImport.research && !!timeCapsuleData.research,
      },
      {
        label: 'AI-Frames',
        count: timeCapsuleData.aiFramesData?.frames?.length || 0,
        icon: Video,
        enabled: importOptions.selectiveImport.aiFrames && !!timeCapsuleData.aiFramesData,
      },
      {
        label: 'Documents',
        count: timeCapsuleData.vectorStore?.documents?.length || 0,
        icon: FileText,
        enabled: importOptions.selectiveImport.vectorStore && !!timeCapsuleData.vectorStore,
      },
    ];

    return items.filter(item => item.count > 0);
  };

  if (!timeCapsuleData) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import TimeCapsule
            </DialogTitle>
            <DialogDescription>
              {currentStep === 'review' && 'Review import settings and potential conflicts before proceeding.'}
              {currentStep === 'importing' && 'Importing your TimeCapsule data...'}
              {currentStep === 'complete' && 'Import process completed.'}
            </DialogDescription>
          </DialogHeader>

          {currentStep === 'review' && (
            <div className="space-y-6">
              {/* TimeCapsule Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: timeCapsuleData.bubblSpace.color || '#3B82F6' }}
                    />
                    {timeCapsuleData.timeCapsuleMetadata.name}
                  </CardTitle>
                  <CardDescription>
                    From BubblSpace: {timeCapsuleData.bubblSpace.name} • 
                    Exported: {new Date(timeCapsuleData.metadata.exportedAt).toLocaleDateString()} • 
                    Size: {timeCapsuleData.metadata.fileSize ? MetadataUtils.formatFileSize(timeCapsuleData.metadata.fileSize) : 'Unknown'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {timeCapsuleData.timeCapsuleMetadata.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">
                      {timeCapsuleData.timeCapsuleMetadata.category}
                    </Badge>
                    <Badge variant="outline">
                      {timeCapsuleData.timeCapsuleMetadata.privacy}
                    </Badge>
                    {timeCapsuleData.timeCapsuleMetadata.difficulty && (
                      <Badge variant="outline">
                        {timeCapsuleData.timeCapsuleMetadata.difficulty}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="import-options" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="import-options">Import Options</TabsTrigger>
                  <TabsTrigger value="selective-import">Select Data</TabsTrigger>
                  <TabsTrigger value="warnings">Warnings</TabsTrigger>
                </TabsList>

                <TabsContent value="import-options" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Import Mode</CardTitle>
                      <CardDescription>
                        Choose how to handle existing data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            importOptions.mode === 'replace' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleOptionChange('mode', 'replace')}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <input 
                              type="radio" 
                              checked={importOptions.mode === 'replace'}
                              onChange={() => handleOptionChange('mode', 'replace')}
                            />
                            <span className="font-medium">Replace</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Completely replace existing data with imported data. Existing data will be lost.
                          </p>
                        </div>

                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            importOptions.mode === 'merge' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleOptionChange('mode', 'merge')}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <input 
                              type="radio" 
                              checked={importOptions.mode === 'merge'}
                              onChange={() => handleOptionChange('mode', 'merge')}
                            />
                            <span className="font-medium">Merge</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Add imported data to existing data. Conflicts may occur with duplicate items.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Create Backup Before Import</Label>
                            <p className="text-xs text-gray-500">
                              Recommended - Create a backup of your current data before importing
                            </p>
                          </div>
                          <Switch
                            checked={importOptions.backupExisting}
                            onCheckedChange={(checked) => handleOptionChange('backupExisting', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Confirm Dangerous Operations</Label>
                            <p className="text-xs text-gray-500">
                              Show warning dialogs before replacing data
                            </p>
                          </div>
                          <Switch
                            checked={importOptions.confirmOverwrite}
                            onCheckedChange={(checked) => handleOptionChange('confirmOverwrite', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="selective-import" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Data to Import</CardTitle>
                      <CardDescription>
                        Choose which components to include in the import
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getImportSummary()?.map((item, index) => {
                          const IconComponent = item.icon;
                          const selectiveKey = index === 0 ? 'bubblSpace' : 
                                              index === 1 ? 'timeCapsuleMetadata' :
                                              index === 2 ? 'research' :
                                              index === 3 ? 'aiFrames' : 'vectorStore';
                          
                          return (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-gray-500" />
                                <div>
                                  <div className="font-medium">{item.label}</div>
                                  <div className="text-sm text-gray-500">
                                    {item.count} item{item.count !== 1 ? 's' : ''}
                                  </div>
                                </div>
                              </div>
                              <Switch
                                checked={item.enabled}
                                onCheckedChange={(checked) => 
                                  handleSelectiveImportChange(selectiveKey as keyof ImportOptions['selectiveImport'], checked)
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="warnings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Potential Conflicts
                      </CardTitle>
                      <CardDescription>
                        Review potential data conflicts before importing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {getConflictWarnings().length > 0 ? (
                        <div className="space-y-3">
                          {getConflictWarnings().map((warning, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-amber-800">{warning}</p>
                            </div>
                          ))}
                          
                          {importOptions.backupExisting && (
                            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-green-800">
                                A backup will be created automatically before replacing any data.
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <p className="text-sm text-green-800">
                            No conflicts detected. The import should proceed safely.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentStep === 'importing' && (
            <div className="space-y-6 py-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-medium mb-2">Importing TimeCapsule</h3>
                <p className="text-gray-600">Please wait while we import your data...</p>
              </div>

              <div className="max-w-md mx-auto">
                <Progress value={importProgress} className="h-2" />
                <p className="text-center text-sm text-gray-500 mt-2">
                  {importProgress}% complete
                </p>
              </div>
            </div>
          )}

          {currentStep === 'complete' && importResult && (
            <div className="space-y-6 py-8">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  importResult.success ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {importResult.success ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {importResult.success ? 'Import Successful!' : 'Import Failed'}
                </h3>
                <p className="text-gray-600">{importResult.message}</p>
              </div>

              {importResult.success && importResult.details && (
                <Card>
                  <CardHeader>
                    <CardTitle>Import Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {importResult.details.itemsImported.topics && (
                        <div className="text-center">
                          <div className="font-medium text-lg">{importResult.details.itemsImported.topics}</div>
                          <div className="text-gray-500">Topics</div>
                        </div>
                      )}
                      {importResult.details.itemsImported.frames && (
                        <div className="text-center">
                          <div className="font-medium text-lg">{importResult.details.itemsImported.frames}</div>
                          <div className="text-gray-500">Frames</div>
                        </div>
                      )}
                      {importResult.details.itemsImported.documents && (
                        <div className="text-center">
                          <div className="font-medium text-lg">{importResult.details.itemsImported.documents}</div>
                          <div className="text-gray-500">Documents</div>
                        </div>
                      )}
                      {importResult.details.backupCreated && (
                        <div className="text-center">
                          <div className="font-medium text-lg">✓</div>
                          <div className="text-gray-500">Backup Created</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            {currentStep === 'review' && (
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleStartImport} disabled={isImporting}>
                  Import TimeCapsule
                </Button>
              </div>
            )}

            {currentStep === 'importing' && (
              <Button variant="outline" onClick={onClose} disabled={isImporting}>
                Cancel
              </Button>
            )}

            {currentStep === 'complete' && (
              <Button onClick={onClose}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning Confirmation Dialog */}
      <AlertDialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Confirm Data Replacement
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to replace existing data. This action cannot be undone.
              
              {importOptions.backupExisting && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800">
                    ✓ A backup will be created before replacing your data.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowWarningDialog(false);
                executeImport();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Proceed with Import
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 
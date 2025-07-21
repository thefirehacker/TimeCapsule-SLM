"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Database, Shield, CheckCircle } from 'lucide-react';

interface VectorStoreInitModalProps {
  isOpen: boolean;
  progress?: number;
  status?: 'initializing' | 'loading' | 'ready' | 'error';
  message?: string;
}

export default function VectorStoreInitModal({
  isOpen,
  progress = 0,
  status = 'initializing',
  message
}: VectorStoreInitModalProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const [showingReady, setShowingReady] = useState(false);
  const [minDisplayTime] = useState(Date.now());

  // Enhanced timing control
  useEffect(() => {
    if (isOpen && !internalOpen) {
      setInternalOpen(true);
      setShowingReady(false);
    }
  }, [isOpen, internalOpen]);

  // Handle ready state with proper timing
  useEffect(() => {
    if (!isOpen && status === 'ready' && internalOpen) {
      setShowingReady(true);
      
      // Calculate delays
      const timeSinceStart = Date.now() - minDisplayTime;
      const minTotalTime = 3000;
      const minReadyTime = 2000;
      
      const remainingTotalTime = Math.max(0, minTotalTime - timeSinceStart);
      const finalDelay = Math.max(remainingTotalTime, minReadyTime);
      
      // Close after calculated delay
      const timeoutId = setTimeout(() => {
        setInternalOpen(false);
        setShowingReady(false);
      }, finalDelay);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, status, internalOpen, minDisplayTime]);

  // Handle non-ready closing
  useEffect(() => {
    if (!isOpen && status !== 'ready' && internalOpen && !showingReady) {
      const timeSinceStart = Date.now() - minDisplayTime;
      const minTotalTime = 3000;
      
      if (timeSinceStart < minTotalTime) {
        const timeoutId = setTimeout(() => {
          setInternalOpen(false);
        }, minTotalTime - timeSinceStart);
        
        return () => clearTimeout(timeoutId);
      } else {
        setInternalOpen(false);
      }
    }
  }, [isOpen, status, internalOpen, showingReady, minDisplayTime]);

  // Use internal open state for better timing control
  const effectiveStatus = showingReady ? 'ready' : status;
  
  const getStatusIcon = () => {
    switch (effectiveStatus) {
      case 'initializing':
        return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
      case 'loading':
        return <Database className="w-8 h-8 animate-pulse text-blue-500" />;
      case 'ready':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'error':
        return <Shield className="w-8 h-8 text-red-500" />;
      default:
        return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
    }
  };

  const getStatusMessage = () => {
    if (message && !showingReady) return message;
    
    switch (effectiveStatus) {
      case 'initializing':
        return 'Preparing your secure local Knowledge Base...';
      case 'loading':
        return 'Loading existing data from secure storage...';
      case 'ready':
        return 'Knowledge Base is ready!';
      case 'error':
        return 'Failed to initialize Knowledge Base. Please refresh the page.';
      default:
        return 'Preparing your secure local Knowledge Base...';
    }
  };

  const getProgressMessage = () => {
    if (progress > 0 && progress < 100) {
      return `${Math.round(progress)}% complete`;
    }
    return null;
  };

  return (
    <Dialog open={internalOpen} onOpenChange={(open) => {
      // FIXED: Allow modal to be closed when VectorStore is ready
      if (!open && (status === 'ready' || showingReady)) {
        setInternalOpen(false);
        setShowingReady(false);
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-500" />
            Secure Knowledge Base
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Status Icon */}
          <div className="flex items-center justify-center">
            {getStatusIcon()}
          </div>
          
          {/* Status Message */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {getStatusMessage()}
            </p>
            {getProgressMessage() && effectiveStatus !== 'ready' && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getProgressMessage()}
              </p>
            )}
          </div>
          
          {/* Progress Bar */}
          {progress > 0 && progress < 100 && effectiveStatus !== 'ready' && (
            <div className="w-full max-w-sm">
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Security Notice */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4" />
              <span className="font-medium">100% Local & Secure</span>
            </div>
            <p>
              Your data is processed entirely on your device. Nothing is sent to external servers.
            </p>
          </div>
          
          {/* Loading States */}
          {effectiveStatus === 'initializing' && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>Initializing secure storage...</span>
            </div>
          )}
          
          {effectiveStatus === 'loading' && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Database className="w-4 h-4 animate-pulse" />
              <span>Loading your knowledge base...</span>
            </div>
          )}
          
          {effectiveStatus === 'ready' && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Ready to use!</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
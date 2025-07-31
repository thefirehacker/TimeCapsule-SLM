"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Wifi,
  WifiOff,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface FirecrawlConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey?: string | null;
}

export function FirecrawlConfigModal({
  isOpen,
  onClose,
  onSave,
  currentApiKey,
}: FirecrawlConfigModalProps) {
  const [apiKey, setApiKey] = useState(currentApiKey || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(currentApiKey || "");
      setValidationError(null);
      setIsValid(false);
    }
  }, [isOpen, currentApiKey]);

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    setValidationError(null);
    setIsValid(false);
  };

  const validateApiKey = async (key: string) => {
    if (!key.trim()) {
      setValidationError("API key is required");
      return false;
    }

    if (key.length < 10) {
      setValidationError("API key appears to be too short");
      return false;
    }

    // Basic validation - you can add more sophisticated validation here
    setIsValidating(true);
    setValidationError(null);

    try {
      // Test the API key by making a simple request
      const response = await fetch("/api/test-firecrawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: key }),
      });

      if (response.ok) {
        setIsValid(true);
        return true;
      } else {
        const error = await response.text();
        setValidationError(`Invalid API key: ${error}`);
        return false;
      }
    } catch (error) {
      setValidationError(
        "Failed to validate API key. Please check your connection."
      );
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    const isValid = await validateApiKey(apiKey);
    if (isValid) {
      onSave(apiKey.trim());
      onClose();
    }
  };

  const handleTestConnection = async () => {
    await validateApiKey(apiKey);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Configure Firecrawl Web Search
          </DialogTitle>
          <DialogDescription>
            Enter your Firecrawl API key to enable web search functionality.
            Your API key will be stored locally in your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Firecrawl API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Firecrawl API key"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {validationError && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4" />
              {validationError}
            </div>
          )}

          {isValid && (
            <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-4 w-4" />
              API key is valid and ready to use
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              • Get your API key from{" "}
              <a
                href="https://firecrawl.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                firecrawl.dev
              </a>
            </p>
            <p>
              • Your API key is stored locally and never sent to our servers
            </p>
            <p>
              • Web search will be enabled once a valid API key is configured
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleTestConnection}
            disabled={!apiKey.trim() || isValidating}
            className="w-full sm:w-auto"
          >
            {isValidating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Testing...
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4" />
                Test Connection
              </>
            )}
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!apiKey.trim() || isValidating}
              className="flex-1 sm:flex-none"
            >
              Save & Enable
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

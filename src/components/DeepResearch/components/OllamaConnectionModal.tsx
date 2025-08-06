"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Server,
  Wifi,
  WifiOff,
} from "lucide-react";

interface OllamaConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (baseURL: string, model: string) => Promise<boolean>;
  onTestConnection: (
    baseURL: string
  ) => Promise<{ success: boolean; models: string[] }>;
  connectionState: {
    connected: boolean;
    connecting: boolean;
    error: string | null;
    baseURL: string;
    availableModels: string[];
    selectedModel: string;
    isAutoReconnecting?: boolean;
  };
}

export function OllamaConnectionModal({
  open,
  onOpenChange,
  onConnect,
  onTestConnection,
  connectionState,
}: OllamaConnectionModalProps) {
  const [baseURL, setBaseURL] = useState("http://localhost:11434");
  const [selectedModel, setSelectedModel] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    models: string[];
    error?: string;
  } | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setBaseURL(connectionState.baseURL || "http://localhost:11434");
      setSelectedModel(connectionState.selectedModel || "");
      setTestResult(null);
    }
  }, [open, connectionState]);

  // Validate URL format
  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleTest = async () => {
    if (!baseURL.trim()) {
      setTestResult({
        success: false,
        models: [],
        error: "Please enter a valid URL",
      });
      return;
    }

    if (!isValidURL(baseURL)) {
      setTestResult({
        success: false,
        models: [],
        error: "Please enter a valid URL format (e.g., http://localhost:11434)",
      });
      return;
    }

    setTesting(true);
    setTestResult(null);
    setSelectedModel("");

    try {
      const result = await onTestConnection(baseURL);
      setTestResult(result);

      if (result.success && result.models.length > 0) {
        // Auto-select saved model if available, otherwise prioritize Gemma models
        let modelToSelect =
          connectionState.selectedModel &&
          result.models.includes(connectionState.selectedModel)
            ? connectionState.selectedModel
            : null;

        if (!modelToSelect) {
          // Since models are already sorted with Gemma first, just take the first one
          modelToSelect = result.models[0];
        }

        setSelectedModel(modelToSelect);
      } else if (result.success && result.models.length === 0) {
        setTestResult({
          ...result,
          error:
            "No models found. Install a model using: ollama pull llama2 or ollama pull mistral. Then restart the connection test.",
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        models: [],
        error:
          error instanceof Error ? error.message : "Connection test failed",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleConnect = async () => {
    if (!selectedModel) {
      setTestResult({
        success: false,
        models: testResult?.models || [],
        error: "Please select a model",
      });
      return;
    }

    const success = await onConnect(baseURL, selectedModel);
    if (success) {
      onOpenChange(false);
    }
  };

  const isConnectionValid = testResult?.success && selectedModel;
  const hasModels = testResult?.models && testResult.models.length > 0;
  const showError = testResult?.error || connectionState.error;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Connect to Ollama
            {connectionState.connected && (
              <Badge variant="secondary" className="ml-2">
                <Wifi className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            )}
            {connectionState.isAutoReconnecting && (
              <Badge variant="outline" className="ml-2">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Auto-reconnecting
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Connect to your local Ollama server to start using AI for research
            generation. Make sure Ollama is running on your system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Connection URL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="ollama-url">Ollama Server URL</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("https://ollama.com", "_blank")}
                className="text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Install Ollama
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                id="ollama-url"
                value={baseURL}
                onChange={(e) => {
                  setBaseURL(e.target.value);
                  setTestResult(null); // Clear previous test results
                }}
                placeholder="http://localhost:11434"
                disabled={testing || connectionState.connecting}
                className={
                  !isValidURL(baseURL) && baseURL ? "border-red-300" : ""
                }
              />
              <Button
                onClick={handleTest}
                disabled={
                  testing || connectionState.connecting || !baseURL.trim()
                }
                variant="outline"
                size="icon"
              >
                {testing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </Button>
            </div>
            {baseURL && !isValidURL(baseURL) && (
              <p className="text-xs text-red-500">
                Please enter a valid URL (e.g., http://localhost:11434)
              </p>
            )}
          </div>

          {/* Connection Test Results */}
          {testResult && (
            <Card>
              <CardContent className="p-4">
                {testResult.success ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium">
                        Connection successful!
                      </span>
                    </div>
                    {hasModels ? (
                      <div className="space-y-2">
                        <Label>
                          Available Models ({testResult.models.length})
                        </Label>
                        <div className="text-xs text-muted-foreground mb-2">
                          💡 Our platform is optimized for Gemma models, but
                          feel free to try others.
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto p-2 bg-muted/50 rounded">
                          {testResult.models.map((model) => (
                            <Badge
                              key={model}
                              variant="outline"
                              className="text-xs"
                            >
                              {model}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Alert>
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription>
                          No models found. Install a model using:{" "}
                          <code className="bg-muted px-1 rounded">
                            ollama pull llama2
                          </code>{" "}
                          or{" "}
                          <code className="bg-muted px-1 rounded">
                            ollama pull mistral
                          </code>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-600">
                      <WifiOff className="w-4 h-4" />
                      <span className="font-medium">Connection failed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {testResult.error || "Unable to connect to Ollama server"}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded">
                      <p className="font-medium">Troubleshooting:</p>
                      <p>
                        • Start Ollama server: <code>ollama serve</code>
                      </p>
                      <p>
                        • Configure origins (if needed):{" "}
                        <code>
                          OLLAMA_HOST=0.0.0.0 OLLAMA_ORIGINS="*" ollama serve
                        </code>
                      </p>
                      <p>
                        • Install a model: <code>ollama pull llama2</code>
                      </p>
                      <p>
                        • Check Ollama status: <code>ollama list</code>
                      </p>
                      <p>
                        • Check if Ollama is running: <code>ollama ps</code>
                      </p>
                      <p>• Verify the URL is correct and accessible</p>
                      <p>• Check firewall settings if using a remote server</p>
                      <p>
                        • Restart Ollama:{" "}
                        <code>pkill ollama && ollama serve</code>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Model Selection */}
          {hasModels && (
            <div className="space-y-2">
              <Label htmlFor="model-select">Select Model</Label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={connectionState.connecting}
              >
                <SelectTrigger id="model-select">
                  <SelectValue placeholder="Choose a model..." />
                </SelectTrigger>
                <SelectContent>
                  {testResult.models.map((model, index) => {
                    const isGemma = model.toLowerCase().includes("gemma");
                    return (
                      <SelectItem key={model} value={model}>
                        <div className="flex items-center gap-2">
                          <Server className="w-3 h-3" />
                          <span>{model}</span>
                          {isGemma && (
                            <Badge variant="secondary" className="text-xs ml-1">
                              Optimized
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Connection Error */}
          {showError && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{showError}</AlertDescription>
            </Alert>
          )}

          {/* Footer Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={connectionState.connecting}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              {!testResult?.success && (
                <Button
                  variant="outline"
                  onClick={handleTest}
                  disabled={testing || !baseURL.trim() || !isValidURL(baseURL)}
                >
                  {testing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Test Connection
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={handleConnect}
                disabled={
                  !isConnectionValid ||
                  connectionState.connecting ||
                  connectionState.isAutoReconnecting
                }
              >
                {connectionState.isAutoReconnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Auto-reconnecting...
                  </>
                ) : connectionState.connecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4 mr-2" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

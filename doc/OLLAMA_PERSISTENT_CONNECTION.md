# Ollama Persistent Connection Implementation

## Overview

The Ollama Persistent Connection system provides automatic reconnection to local Ollama servers after page refreshes, ensuring a seamless user experience. Users no longer need to manually reconnect to their AI models every time they refresh the page or navigate between components.

## 🎯 **Key Features**

### ✅ **Automatic Reconnection**
- **Smart Detection**: Automatically detects saved connection configurations
- **Age Validation**: Only reconnects if the saved connection is less than 24 hours old
- **Model Preservation**: Reconnects to the exact same model that was previously used
- **Server Persistence**: Maintains the same server URL across sessions

### ✅ **Visual Feedback**
- **Connection States**: Clear indicators for all connection states (connecting, auto-reconnecting, connected)
- **Progress Indicators**: Loading spinners and status messages during reconnection
- **Error Handling**: Graceful error display with troubleshooting information
- **Saved Configuration Display**: Shows which model and server will be used for reconnection

### ✅ **Robust Error Handling**
- **Connection Timeouts**: 15-second timeout with retry logic
- **Model Validation**: Ensures the saved model is still available on the server
- **Fallback Mechanisms**: Graceful degradation when reconnection fails
- **User Control**: Manual connection options when auto-reconnection fails

## 🏗️ **Architecture**

### Core Components

#### 1. **useOllamaConnection Hook** (`src/components/DeepResearch/hooks/useOllamaConnection.ts`)
- **State Management**: Manages connection state, auto-reconnection flags, and client references
- **Configuration Persistence**: Handles localStorage storage and retrieval
- **Connection Logic**: Implements connection, disconnection, and testing functions
- **Auto-Reconnection**: Orchestrates automatic reconnection process

#### 2. **OllamaConnectionModal** (`src/components/DeepResearch/components/OllamaConnectionModal.tsx`)
- **Connection Interface**: Provides UI for manual connection setup
- **Auto-Reconnection Status**: Shows auto-reconnection progress
- **Model Selection**: Displays available models and allows selection
- **Connection Testing**: Tests server connectivity before connecting

#### 3. **ControlsPanel** (`src/components/DeepResearch/ControlsPanel.tsx`)
- **Connection Status**: Shows current connection state and saved configuration
- **Quick Actions**: Provides connect/disconnect buttons
- **Status Indicators**: Visual feedback for all connection states

#### 4. **ResearchOutput** (`src/components/DeepResearch/ResearchOutput.tsx`)
- **Connection Integration**: Integrates connection status into research interface
- **Auto-Reconnection Banner**: Shows reconnection progress during page load
- **Dynamic Placeholders**: Updates prompt placeholders based on connection state

### Data Flow

```
Page Load → Check localStorage → Load saved config → Validate age → Auto-reconnect
    ↓
Connection Success → Update state → Save new config → Enable AI features
    ↓
Connection Failure → Show error → Allow manual connection → Preserve saved config
```

## 🔧 **Technical Implementation**

### 1. **Configuration Storage**

```typescript
// Configuration structure stored in localStorage
interface SavedConnectionConfig {
  baseURL: string;           // Ollama server URL
  selectedModel: string;     // Model name (e.g., "llama2")
  lastConnected: string;     // ISO timestamp of last successful connection
  version: string;          // Config version for future compatibility
}

// Storage key and constants
const STORAGE_KEY = "ollama-connection-config";
const MAX_CONNECTION_AGE_HOURS = 24; // Don't auto-reconnect if older than 24 hours
const CONNECTION_TIMEOUT = 15000;    // 15 seconds timeout
const MAX_RETRIES = 3;              // Maximum retry attempts
```

### 2. **Auto-Reconnection Logic**

```typescript
// Auto-reconnection effect that runs after connect function is defined
useEffect(() => {
  // Only attempt auto-reconnect if we have saved config and haven't tried yet
  if (hasAttemptedAutoReconnectRef.current) {
    return;
  }

  const savedConfig = localStorage.getItem(STORAGE_KEY);
  if (savedConfig) {
    try {
      const config = JSON.parse(savedConfig);
      if (config.baseURL && config.selectedModel && !connectionState.connected) {
        hasAttemptedAutoReconnectRef.current = true;
        
        // Auto-reconnect with a small delay
        const autoReconnect = async () => {
          console.log("🔄 Attempting auto-reconnection...");
          setConnectionState(prev => ({ ...prev, isAutoReconnecting: true }));
          
          try {
            const success = await connect(config.baseURL, config.selectedModel);
            if (success) {
              console.log("✅ Auto-reconnection successful");
            } else {
              console.log("❌ Auto-reconnection failed");
            }
          } catch (error) {
            console.error("❌ Auto-reconnection error:", error);
          } finally {
            setConnectionState(prev => ({ ...prev, isAutoReconnecting: false }));
          }
        };
        
        // Small delay to ensure component is fully mounted
        setTimeout(autoReconnect, 500);
      }
    } catch (error) {
      console.warn("Failed to parse saved config for auto-reconnect:", error);
    }
  } else {
    hasAttemptedAutoReconnectRef.current = true;
  }
}, [connect, connectionState.connected]);
```

### 3. **Connection State Management**

```typescript
interface OllamaConnectionState {
  connected: boolean;           // Currently connected
  connecting: boolean;          // Manual connection in progress
  isAutoReconnecting: boolean;  // Auto-reconnection in progress
  error: string | null;         // Connection error message
  baseURL: string;             // Server URL
  availableModels: string[];   // Available models on server
  selectedModel: string;       // Currently selected model
  lastConnected: Date | null;  // Timestamp of last connection
}
```

### 4. **Configuration Validation**

```typescript
// Check if the saved connection is not too old
const isConnectionValid = !config.lastConnected || (() => {
  const lastConnected = new Date(config.lastConnected);
  const now = new Date();
  const hoursDiff = (now.getTime() - lastConnected.getTime()) / (1000 * 60 * 60);
  return hoursDiff < MAX_CONNECTION_AGE_HOURS;
})();

if (!isConnectionValid) {
  console.log("⏰ Saved connection is too old, skipping auto-reconnect");
  localStorage.removeItem(STORAGE_KEY);
  return;
}
```

## 🎨 **User Interface Components**

### 1. **Connection Status Indicators**

#### ControlsPanel Connection Card
```tsx
{connectionState.connected ? (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Status:</span>
      <Badge variant="default" className="bg-primary text-primary-foreground">
        Connected
      </Badge>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Model:</span>
      <span className="font-medium text-xs text-foreground">
        {connectionState.selectedModel}
      </span>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">Server:</span>
      <span className="font-medium text-xs truncate max-w-24 text-foreground">
        {connectionState.baseURL}
      </span>
    </div>
    {connectionState.lastConnected && (
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Connected:</span>
        <span className="font-medium text-xs text-foreground">
          {new Date(connectionState.lastConnected).toLocaleTimeString()}
        </span>
      </div>
    )}
    <Button variant="outline" size="sm" onClick={onDisconnectAI} className="w-full">
      Disconnect
    </Button>
  </div>
) : (
  <div className="space-y-2">
    <p className="text-sm text-muted-foreground">
      {connectionState.isAutoReconnecting
        ? "Auto-reconnecting to Ollama..."
        : connectionState.connecting
        ? "Connecting to Ollama..."
        : "Connect to Ollama to start researching"}
    </p>
    {connectionState.error && (
      <p className="text-xs text-destructive">{connectionState.error}</p>
    )}
    <Button
      onClick={onConnectAI}
      className="w-full"
      disabled={connectionState.connecting || connectionState.isAutoReconnecting}
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
          Connect AI
        </>
      )}
    </Button>
  </div>
)}
```

#### ResearchOutput Auto-Reconnection Banner
```tsx
{connectionState.isAutoReconnecting && (
  <div className="mb-4 p-3 bg-accent/30 border border-border/50 rounded-lg flex items-center gap-3">
    <Loader2 className="w-4 h-4 animate-spin text-primary" />
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">
        Auto-reconnecting to Ollama
      </p>
      <p className="text-xs text-muted-foreground">
        Attempting to reconnect to {connectionState.selectedModel} at {connectionState.baseURL}
      </p>
    </div>
  </div>
)}
```

### 2. **Saved Configuration Display**

```tsx
{connectionState.selectedModel && !connectionState.connected && (
  <div className="p-3 bg-accent/20 border border-border/50 rounded-lg">
    <p className="text-sm text-muted-foreground font-medium">
      Saved Configuration
    </p>
    <p className="text-xs text-muted-foreground mt-1">
      Model: <span className="font-mono text-foreground">{connectionState.selectedModel}</span>
    </p>
    <p className="text-xs text-muted-foreground">
      Server: <span className="font-mono text-foreground">{connectionState.baseURL}</span>
    </p>
  </div>
)}
```

## 🔄 **Connection Lifecycle**

### 1. **Initial Connection**
```
User connects → Test connection → Validate model → Create client → Save config → Update state
```

### 2. **Page Refresh**
```
Page loads → Load saved config → Validate age → Set auto-reconnect flag → Attempt reconnection
```

### 3. **Auto-Reconnection Success**
```
Auto-reconnect starts → Test connection → Validate model → Create client → Update state → Clear auto-reconnect flag
```

### 4. **Auto-Reconnection Failure**
```
Auto-reconnect starts → Test fails → Show error → Clear auto-reconnect flag → Allow manual connection
```

## 🛡️ **Error Handling & Recovery**

### 1. **Connection Timeouts**
```typescript
const testConnection = async (baseURL: string) => {
  let controller: AbortController | null = null;
  
  try {
    controller = new AbortController();
    const timeoutId = setTimeout(() => controller?.abort(), CONNECTION_TIMEOUT);
    
    const response = await fetch(`${baseURL}/api/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    // Process response...
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Connection timeout after ${CONNECTION_TIMEOUT / 1000}s`);
    }
    throw error;
  }
};
```

### 2. **Model Validation**
```typescript
// Test the client with a simple generation
try {
  const modelInstance = client(selectedModel);
  const generationResult = await generateText({
    model: modelInstance,
    prompt: 'Say "Connection test successful" to confirm.',
    maxTokens: 20,
    temperature: 0.1,
  });
  
  if (!generationResult?.text) {
    throw new Error("No response from model");
  }
} catch (modelError) {
  throw new Error(
    `Failed to use model '${selectedModel}'. Make sure it's downloaded in Ollama using 'ollama pull ${selectedModel}'`
  );
}
```

### 3. **Graceful Degradation**
```typescript
// If auto-reconnection fails, preserve saved config for manual connection
if (!success) {
  console.log("❌ Auto-reconnection failed");
  // Don't clear saved config - let user try manual connection
  // Show error message with troubleshooting tips
}
```

## 📊 **Performance Considerations**

### 1. **Optimization Strategies**
- **Delayed Initialization**: 500ms delay ensures component is fully mounted
- **Single Attempt**: Prevents multiple auto-reconnection attempts
- **Smart Validation**: Only validates connection age when needed
- **Minimal State Updates**: Efficient state management with proper dependencies

### 2. **Memory Management**
- **Ref-based Tracking**: Uses refs to track auto-reconnection attempts
- **Cleanup Functions**: Proper cleanup in useEffect return functions
- **Abort Controllers**: Cancels ongoing requests when component unmounts

### 3. **Network Efficiency**
- **Connection Pooling**: Reuses client instances when possible
- **Timeout Management**: Prevents hanging connections
- **Retry Logic**: Intelligent retry with exponential backoff

## 🧪 **Testing Scenarios**

### 1. **Successful Auto-Reconnection**
1. Connect to Ollama manually
2. Refresh the page
3. **Expected**: Auto-reconnects to the same model within 1-2 seconds

### 2. **Failed Auto-Reconnection**
1. Connect to Ollama manually
2. Stop Ollama server
3. Refresh the page
4. **Expected**: Shows error message, allows manual connection

### 3. **Expired Configuration**
1. Connect to Ollama manually
2. Wait 24+ hours
3. Refresh the page
4. **Expected**: Clears expired config, no auto-reconnection attempt

### 4. **Model Unavailable**
1. Connect to specific model
2. Remove model from Ollama (`ollama rm model-name`)
3. Refresh the page
4. **Expected**: Shows model-specific error, allows reconnection with different model

### 5. **Network Issues**
1. Connect to remote Ollama server
2. Disconnect network
3. Refresh the page
4. **Expected**: Shows network error, preserves saved config

## 🔧 **Configuration Options**

### Environment Variables
```bash
# Optional: Override default timeout (15 seconds)
OLLAMA_CONNECTION_TIMEOUT=20000

# Optional: Override max connection age (24 hours)
OLLAMA_MAX_CONNECTION_AGE_HOURS=48

# Optional: Override max retries (3 attempts)
OLLAMA_MAX_RETRIES=5
```

### Customization Points
```typescript
// Override default base URL
const DEFAULT_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

// Override timeout settings
const CONNECTION_TIMEOUT = parseInt(process.env.OLLAMA_CONNECTION_TIMEOUT || "15000");

// Override age validation
const MAX_CONNECTION_AGE_HOURS = parseInt(process.env.OLLAMA_MAX_CONNECTION_AGE_HOURS || "24");
```

## 🚀 **Future Enhancements**

### 1. **Advanced Configuration Management**
- **Multiple Server Support**: Save configurations for multiple Ollama servers
- **Model Preferences**: Remember preferred models for different use cases
- **Connection Profiles**: Named connection profiles for different environments

### 2. **Enhanced Error Recovery**
- **Automatic Model Download**: Automatically download missing models
- **Server Discovery**: Automatic discovery of Ollama servers on local network
- **Health Monitoring**: Continuous health checks for active connections

### 3. **User Experience Improvements**
- **Connection History**: Track and display connection history
- **Performance Metrics**: Show connection speed and reliability metrics
- **Smart Suggestions**: Suggest optimal models based on usage patterns

### 4. **Enterprise Features**
- **Multi-User Support**: Shared connection configurations across team
- **Security Integration**: Integration with enterprise authentication systems
- **Audit Logging**: Comprehensive logging of connection events

## 📋 **Troubleshooting Guide**

### Common Issues

#### 1. **Auto-Reconnection Not Working**
**Symptoms**: Page refresh doesn't reconnect automatically
**Solutions**:
- Check browser console for error messages
- Verify localStorage contains valid configuration
- Ensure Ollama server is running and accessible
- Check if saved connection is older than 24 hours

#### 2. **Wrong Model Reconnects**
**Symptoms**: Different model connects than expected
**Solutions**:
- Check saved configuration in localStorage
- Verify model is still available on server
- Clear saved configuration and reconnect manually

#### 3. **Connection Timeouts**
**Symptoms**: Connection attempts timeout frequently
**Solutions**:
- Check network connectivity to Ollama server
- Verify Ollama server is responsive
- Increase timeout value if needed
- Check firewall settings

#### 4. **State Inconsistencies**
**Symptoms**: UI shows wrong connection state
**Solutions**:
- Refresh page to reset state
- Check for multiple connection attempts
- Clear browser cache and localStorage
- Restart Ollama server

### Debug Commands

```javascript
// Check saved configuration
console.log("Saved config:", localStorage.getItem("ollama-connection-config"));

// Check connection state
console.log("Connection state:", connectionState);

// Test server connectivity
fetch("http://localhost:11434/api/tags")
  .then(response => response.json())
  .then(data => console.log("Available models:", data.models));

// Clear saved configuration
localStorage.removeItem("ollama-connection-config");
```

## 📚 **API Reference**

### useOllamaConnection Hook

```typescript
interface UseOllamaConnectionReturn {
  connectionState: OllamaConnectionState;
  connect: (baseURL: string, model?: string) => Promise<boolean>;
  disconnect: () => void;
  testConnection: (baseURL: string) => Promise<{ success: boolean; models: string[] }>;
  generateContent: (prompt: string) => Promise<string>;
  generateContentStream: (prompt: string) => AsyncIterable<string>;
  clearSavedConnection: () => void;
  isReady: boolean;
}
```

### OllamaConnectionState Interface

```typescript
interface OllamaConnectionState {
  connected: boolean;
  connecting: boolean;
  isAutoReconnecting: boolean;
  error: string | null;
  baseURL: string;
  availableModels: string[];
  selectedModel: string;
  lastConnected: Date | null;
}
```

## 🎯 **Benefits Summary**

### For Users
- ✅ **Seamless Experience**: No manual reconnection required
- ✅ **Time Saving**: Automatic reconnection saves setup time
- ✅ **Reliability**: Robust error handling and recovery
- ✅ **Transparency**: Clear feedback about connection status

### For Developers
- ✅ **Maintainable Code**: Clean, modular architecture
- ✅ **Extensible Design**: Easy to add new features
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Optimized for minimal overhead

### For System Administrators
- ✅ **Stable Connections**: Reduced connection failures
- ✅ **User Productivity**: Less time spent on connection issues
- ✅ **Monitoring**: Comprehensive logging and error tracking
- ✅ **Configuration Management**: Flexible configuration options

---

**Version**: 1.0  
**Last Updated**: 2024  
**Next Review**: Annual  

*This implementation provides a robust, user-friendly persistent connection system that significantly improves the Ollama integration experience.* 
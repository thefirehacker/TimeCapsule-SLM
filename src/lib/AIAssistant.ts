export interface AISession {
  provider: 'ollama' | 'lmstudio' | 'openai' | 'local';
  model: string;
  baseURL: string;
  connected: boolean;
}

export interface AIStatus {
  connected: boolean;
  provider: 'ollama' | 'lmstudio' | 'openai' | 'local';
  model?: string;
  baseURL?: string;
  error?: string;
}

export class AIAssistant {
  private aiSession: AISession | null = null;
  private onStatusChange: ((status: AIStatus) => void) | null = null;

  constructor() {
    console.log('🤖 AIAssistant initialized');
  }

  setStatusChangeCallback(callback: (status: AIStatus) => void) {
    this.onStatusChange = callback;
  }

  private notifyStatusChange(status: AIStatus) {
    if (this.onStatusChange) {
      this.onStatusChange(status);
    }
  }

  async testOllamaConnection(baseURL: string): Promise<{ success: boolean; models?: any[]; error?: string }> {
    try {
      console.log(`🔍 Testing Ollama connection at: ${baseURL}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${baseURL}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Ollama connection test passed, available models:', data.models?.length || 0);
      
      return { 
        success: true, 
        models: data.models || [] 
      };
      
    } catch (error) {
      console.error('❌ Ollama connection test failed:', error);
      
      let errorMessage = '';
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Connection timeout. Ollama may be slow or unresponsive.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Cannot connect to Ollama server. Make sure Ollama is running and accessible.';
        } else if (error.message.includes('CORS')) {
          errorMessage = 'CORS error - Ollama server is not allowing cross-origin requests.';
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = 'Unknown connection error';
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }

  async connectToOllama(baseURL: string, selectedModel: string): Promise<boolean> {
    try {
      console.log(`🦙 Connecting to Ollama at ${baseURL} with model ${selectedModel}`);
      
      // Test the connection first
      const testResult = await this.testOllamaConnection(baseURL);
      if (!testResult.success) {
        this.notifyStatusChange({
          connected: false,
          provider: 'ollama',
          error: testResult.error
        });
        return false;
      }
      
      // Verify the selected model exists
      const modelExists = testResult.models?.some(m => m.name === selectedModel);
      if (!modelExists) {
        const error = `Model "${selectedModel}" not found. Available models: ${testResult.models?.map(m => m.name).join(', ')}`;
        this.notifyStatusChange({
          connected: false,
          provider: 'ollama',
          error
        });
        return false;
      }
      
      // Create AI session
      this.aiSession = {
        provider: 'ollama',
        model: selectedModel,
        baseURL: baseURL,
        connected: true
      };
      
      // Notify successful connection
      this.notifyStatusChange({
        connected: true,
        provider: 'ollama',
        model: selectedModel,
        baseURL: baseURL
      });
      
      console.log(`✅ Successfully connected to Ollama with model: ${selectedModel}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to connect to Ollama:', error);
      this.notifyStatusChange({
        connected: false,
        provider: 'ollama',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  async generateContent(prompt: string, type: 'general' | 'research' = 'general'): Promise<string> {
    if (!this.aiSession || !this.aiSession.connected) {
      throw new Error('AI not connected. Please connect to an AI provider first.');
    }

    if (this.aiSession.provider !== 'ollama') {
      throw new Error(`Provider '${this.aiSession.provider}' is not currently supported`);
    }

    try {
      console.log(`🤖 Generating ${type} content with Ollama...`);
      
      // Build the chat prompt using Qwen format
      const chatPrompt = `<|im_start|>system
You are a helpful AI assistant. Provide clear, accurate, and informative responses. Always respond in plain text format.<|im_end|>
<|im_start|>user
${prompt}<|im_end|>
<|im_start|>assistant
`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minute timeout
      
      const response = await fetch(`${this.aiSession.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.aiSession.model,
          prompt: chatPrompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            num_predict: 2000,
            stop: ['<|im_end|>']
          }
        })
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const content = data.response || '';
      
      console.log(`✅ Generated content (${content.length} characters)`);
      return content.trim();
      
    } catch (error) {
      console.error('❌ Content generation failed:', error);
      
      // Check if it's a connection error
      if (error instanceof Error && this.isOllamaConnectionError(error.message)) {
        this.aiSession.connected = false;
        this.notifyStatusChange({
          connected: false,
          provider: 'ollama',
          error: 'Connection lost during generation'
        });
      }
      
      throw error;
    }
  }

  private isOllamaConnectionError(errorMessage: string): boolean {
    const ollamaErrors = [
      'Failed to fetch',
      'CORS',
      'NetworkError',
      'Connection refused',
      'Ollama connection failed',
      'localhost:11434',
      'timeout',
      'AbortError',
      'TypeError: Failed to fetch'
    ];
    
    return ollamaErrors.some(error => 
      errorMessage.toLowerCase().includes(error.toLowerCase())
    );
  }

  disconnect() {
    if (this.aiSession) {
      this.aiSession.connected = false;
      this.aiSession = null;
      
      this.notifyStatusChange({
        connected: false,
        provider: 'ollama'
      });
      
      console.log('🔌 AI disconnected');
    }
  }

  isConnected(): boolean {
    return this.aiSession?.connected || false;
  }

  getSession(): AISession | null {
    return this.aiSession;
  }

  getAvailableModels(): string[] {
    // Common Ollama models in order of preference
    return [
      'qwen2.5:7b',
      'qwen2.5:3b', 
      'qwen2.5:1.5b',
      'qwen2.5:0.5b',
      'qwen:7b',
      'qwen:4b',
      'qwen:1.8b',
      'llama3.2:3b',
      'llama3.2:1b',
      'llama3.1:8b',
      'llama3.1:70b',
      'gemma2:9b',
      'gemma2:2b',
      'mistral:7b',
      'phi3:3.8b'
    ];
  }

  selectBestModel(availableModels: any[]): string {
    // Priority order for model selection
    const modelPriority = this.getAvailableModels();
    
    // Find the best available model
    for (const priority of modelPriority) {
      const found = availableModels.find(m => 
        m.name.toLowerCase().includes(priority.toLowerCase()) ||
        m.name.toLowerCase().includes(priority.split(':')[0].toLowerCase())
      );
      if (found) {
        return found.name;
      }
    }
    
    // Fallback to first available model
    return availableModels[0]?.name || 'qwen2.5:0.5b';
  }
} 
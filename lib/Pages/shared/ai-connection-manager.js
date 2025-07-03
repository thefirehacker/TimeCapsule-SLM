/**
 * Shared AI Connection Manager - Universal AI state management for TimeCapsule-SLM
 * Used by DeepResearch, Playground, and Canvas to share AI connections
 */
class SharedAIConnectionManager {
  constructor() {
    this.aiAssistant = null;
    this.isConnected = false;
    this.currentProvider = null;
    this.connectionSettings = null;
    this.connectionListeners = [];
    this.lastError = null;
    
    // Load persisted connection state
    this.loadConnectionState();
    
    // Listen for page visibility changes to refresh connection state
    this.setupPageVisibilityListener();
    
    console.log('🤖 Shared AI Connection Manager initialized');
    
    // Check and restore connection after a short delay to allow page to load
    setTimeout(() => {
      this.checkAndRestoreConnection();
    }, 1000);
  }

  /**
   * Connect to AI provider and share across all environments
   */
  async connectAI(provider, settings = {}) {
    try {
      console.log(`🔌 Connecting to AI provider: ${provider}`);
      
      // If we already have a connection to the same provider with same settings, reuse it
      if (this.isConnected && this.currentProvider === provider && 
          JSON.stringify(this.connectionSettings) === JSON.stringify(settings)) {
        console.log('✅ Reusing existing AI connection');
        this.notifyListeners('connected', this.aiAssistant);
        return this.aiAssistant;
      }
      
      // Disconnect existing connection if different
      if (this.isConnected && (this.currentProvider !== provider || 
          JSON.stringify(this.connectionSettings) !== JSON.stringify(settings))) {
        console.log('🔄 Switching AI provider, disconnecting current connection');
        this.disconnect();
      }
      
      // Create new AI assistant instance if needed
      if (!this.aiAssistant) {
        if (window.AIAssistantBackend) {
          this.aiAssistant = new window.AIAssistantBackend();
        } else {
          throw new Error('AIAssistantBackend not available');
        }
      }
      
      // Set provider and initialize
      this.aiAssistant.setProvider(provider);
      
      // Set up status change callback BEFORE attempting connection
      this.setupStatusChangeCallback();
      
      // Handle different provider types
      switch (provider) {
        case 'ollama':
          await this.connectOllama(settings);
          break;
        case 'lmstudio':
          await this.connectLMStudio(settings);
          break;
        case 'openai':
          await this.connectOpenAI(settings);
          break;
        case 'local':
          await this.connectLocal(settings);
          break;
        default:
          throw new Error(`Unknown AI provider: ${provider}`);
      }
      
      // Note: Connection state is now updated via the status change callback
      // Only set these as fallback if callback wasn't triggered
      if (!this.isConnected) {
        this.isConnected = true;
        this.currentProvider = provider;
        this.connectionSettings = { ...settings };
        this.lastError = null;
        
        // Persist connection state
        this.saveConnectionState();
        
        console.log(`✅ AI connected successfully (fallback): ${provider}`);
        this.notifyListeners('connected', this.aiAssistant);
      }
      
      return this.aiAssistant;
      
    } catch (error) {
      console.error('❌ AI connection failed:', error);
      this.lastError = error;
      this.isConnected = false;
      this.notifyListeners('error', error);
      throw error;
    }
  }
  
  /**
   * Connect to Ollama
   */
  async connectOllama(settings = {}) {
    const baseURL = settings.baseURL || 'http://localhost:11434';
    
    // Initialize Ollama connection
    await this.aiAssistant.initializeOllama(baseURL);
    
    console.log(`🦙 Ollama connected at ${baseURL}`);
  }
  
  /**
   * Connect to LM Studio
   */
  async connectLMStudio(settings = {}) {
    const baseURL = settings.baseURL || 'http://localhost:1234';
    
    // Initialize LM Studio connection
    await this.aiAssistant.initializeLMStudio(baseURL);
    
    console.log(`🏠 LM Studio connected at ${baseURL}`);
  }
  
  /**
   * Connect to OpenAI
   */
  async connectOpenAI(settings = {}) {
    if (!settings.apiKey) {
      throw new Error('OpenAI API key required');
    }
    
    // Initialize OpenAI connection
    await this.aiAssistant.initializeOpenAI(settings.apiKey);
    
    console.log('🌐 OpenAI connected');
  }
  
  /**
   * Connect to Local AI
   */
  async connectLocal(settings = {}) {
    // Initialize local AI connection
    await this.aiAssistant.initializeLocal();
    
    console.log('🤖 Local AI connected');
  }
  
  /**
   * Disconnect from current AI provider
   */
  disconnect() {
    if (this.isConnected) {
      console.log(`🔌 Disconnecting from ${this.currentProvider}`);
      this.isConnected = false;
      this.currentProvider = null;
      this.connectionSettings = null;
      this.lastError = null;
      
      // Clear saved state
      this.clearConnectionState();
      
      this.notifyListeners('disconnected');
    }
  }
  
  /**
   * Get current AI assistant instance
   */
  getAIAssistant() {
    return this.isConnected ? this.aiAssistant : null;
  }
  
  /**
   * Check if AI is connected
   */
  isAIConnected() {
    return this.isConnected && this.aiAssistant;
  }
  
  /**
   * Get current provider info
   */
  getProviderInfo() {
    if (!this.isConnected) {
      return {
        isConnected: false,
        provider: null,
        model: null,
        baseURL: null
      };
    }
    
    return {
      isConnected: this.isConnected,
      provider: this.currentProvider,
      model: this.connectionSettings?.model || null,
      baseURL: this.connectionSettings?.baseURL || null,
      settings: this.connectionSettings,
      lastError: this.lastError
    };
  }
  
  /**
   * Set connection manually (for Canvas and other special cases)
   */
  setConnection(provider, aiAssistant, settings = {}) {
    this.currentProvider = provider;
    this.aiAssistant = aiAssistant;
    this.isConnected = true;
    this.connectionSettings = settings;
    this.lastError = null;
    
    // Persist connection state
    this.saveConnectionState();
    
    console.log(`🔗 Manual connection set: ${provider}`);
    this.notifyListeners('connected', aiAssistant);
  }
  
  /**
   * Save connection state to localStorage
   */
  saveConnectionState() {
    try {
      const state = {
        isConnected: this.isConnected,
        currentProvider: this.currentProvider,
        connectionSettings: this.connectionSettings ? {
          ...this.connectionSettings,
          // Remove sensitive data from persistence
          apiKey: undefined,
          password: undefined
        } : null,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('sharedAIConnection', JSON.stringify(state));
      console.log('💾 AI connection state saved to localStorage');
    } catch (error) {
      console.warn('⚠️ Failed to save connection state:', error);
    }
  }
  
  /**
   * Load connection state from localStorage
   */
  loadConnectionState() {
    try {
      const savedState = localStorage.getItem('sharedAIConnection');
      if (savedState) {
        const state = JSON.parse(savedState);
        
        // Check if state is recent (within 24 hours)
        const stateAge = new Date() - new Date(state.timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (stateAge < maxAge && state.isConnected) {
          this.isConnected = state.isConnected;
          this.currentProvider = state.currentProvider;
          this.connectionSettings = state.connectionSettings;
          
          console.log('📂 Loaded AI connection state from localStorage:', {
            provider: this.currentProvider,
            connected: this.isConnected
          });
          
          // Try to restore AI assistant instance
          this.restoreAIAssistant();
        } else {
          console.log('🕒 Saved connection state is too old or disconnected, clearing...');
          this.clearConnectionState();
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to load connection state:', error);
      this.clearConnectionState();
    }
  }
  
  /**
   * Clear connection state from localStorage
   */
  clearConnectionState() {
    try {
      localStorage.removeItem('sharedAIConnection');
      console.log('🗑️ Cleared AI connection state from localStorage');
    } catch (error) {
      console.warn('⚠️ Failed to clear connection state:', error);
    }
  }
  
  /**
   * Restore AI assistant instance from saved state
   */
  async restoreAIAssistant() {
    if (!this.isConnected || !this.currentProvider) {
      return;
    }
    
    try {
      await this.initializeAIAssistant();
      
      if (this.aiAssistant && this.connectionSettings) {
        // Try to restore the connection based on provider
        console.log(`🔄 Attempting to restore ${this.currentProvider} connection...`);
        
        // Set the provider on the AI assistant
        this.aiAssistant.setProvider(this.currentProvider);
        
        // Set up status change callback for restored connection
        this.setupStatusChangeCallback();
        
        // Restore connection settings based on provider
        try {
          switch (this.currentProvider) {
            case 'ollama':
              if (this.connectionSettings.baseURL) {
                await this.aiAssistant.initializeOllama(this.connectionSettings.baseURL);
                console.log(`✅ Ollama connection restored to ${this.connectionSettings.baseURL}`);
              }
              break;
            case 'lmstudio':
              if (this.connectionSettings.baseURL) {
                await this.aiAssistant.initializeLMStudio(this.connectionSettings.baseURL);
                console.log(`✅ LM Studio connection restored to ${this.connectionSettings.baseURL}`);
              }
              break;
            case 'openai':
              // Note: API keys are not persisted for security, so we can't restore OpenAI connections
              console.log('⚠️ OpenAI connections require re-authentication (API key not persisted)');
              this.clearConnectionState();
              return;
            case 'local':
              await this.aiAssistant.initializeLocal();
              console.log('✅ Local AI connection restored');
              break;
          }
          
          // Notify listeners of successful restoration
          this.notifyListeners('connected', this.aiAssistant);
          console.log('✅ AI connection fully restored from saved state');
          
        } catch (connectionError) {
          console.warn('⚠️ Failed to restore actual connection:', connectionError);
          // Clear state if connection fails
          this.clearConnectionState();
          this.isConnected = false;
          this.currentProvider = null;
          this.connectionSettings = null;
          this.notifyListeners('error', { message: 'Failed to restore connection: ' + connectionError.message });
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to restore AI assistant:', error);
      this.clearConnectionState();
      this.isConnected = false;
      this.currentProvider = null;
      this.connectionSettings = null;
    }
  }
  
  /**
   * Set up page visibility listener to refresh connection state
   */
  setupPageVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Page became visible, refresh connection state
        console.log('📄 Page became visible, refreshing AI connection state...');
        this.refreshConnectionState();
      }
    });
    
    // Also listen for focus events as a fallback
    window.addEventListener('focus', () => {
      console.log('🔍 Window focused, refreshing AI connection state...');
      this.refreshConnectionState();
    });
  }
  
  /**
   * Refresh connection state when page becomes visible
   */
  async refreshConnectionState() {
    // Reload connection state from localStorage
    this.loadConnectionState();
    
    // Notify listeners about current state
    if (this.isConnected && this.aiAssistant) {
      console.log('🔄 Notifying listeners of existing connection');
      this.notifyListeners('connected', this.aiAssistant);
    } else if (this.isConnected && !this.aiAssistant) {
      // We have a saved connection but no AI assistant - try to restore
      console.log('🔄 Attempting to restore AI assistant from saved state');
      await this.restoreAIAssistant();
    }
  }
  
  /**
   * Check and restore connection on page load
   */
  async checkAndRestoreConnection() {
    console.log('🔍 Checking for saved AI connection...');
    
    if (this.isConnected && this.currentProvider) {
      console.log(`📂 Found saved connection: ${this.currentProvider}`);
      
      if (!this.aiAssistant) {
        console.log('🔄 No AI assistant instance, attempting to restore...');
        await this.restoreAIAssistant();
      } else {
        console.log('✅ AI assistant already available, notifying listeners');
        this.notifyListeners('connected', this.aiAssistant);
      }
    } else {
      console.log('📭 No saved AI connection found');
    }
  }
  
  /**
   * Set up status change callback on AI assistant
   */
  setupStatusChangeCallback() {
    if (!this.aiAssistant) {
      console.warn('⚠️ Cannot set up status callback - no AI assistant instance');
      return;
    }
    
    // Mark that callback is being set to avoid duplicates
    this.aiAssistant._statusCallbackSet = true;
    
    this.aiAssistant.onStatusChange = (status) => {
      console.log('🔄 Shared Manager: AI Status Change:', status);
      
      if (status.connected) {
        // Update shared manager state
        this.isConnected = true;
        this.currentProvider = status.provider;
        this.connectionSettings = {
          ...this.connectionSettings,
          model: status.model,
          baseURL: status.baseURL
        };
        this.lastError = null;
        
        // Persist connection state
        this.saveConnectionState();
        
        console.log(`✅ Shared Manager: AI connected via callback: ${status.provider}`);
        this.notifyListeners('connected', this.aiAssistant);
      } else if (status.error) {
        this.lastError = { message: status.error };
        this.isConnected = false;
        this.notifyListeners('error', { message: status.error });
      } else {
        this.isConnected = false;
        this.currentProvider = null;
        this.notifyListeners('disconnected');
      }
    };
    
    console.log('✅ Status change callback set up on AI assistant');
  }

  /**
   * Add connection event listener
   */
  addConnectionListener(callback) {
    this.connectionListeners.push(callback);
    
    // Immediately notify of current state
    if (this.isConnected) {
      callback('connected', this.aiAssistant);
    }
  }
  
  /**
   * Remove connection event listener
   */
  removeConnectionListener(callback) {
    this.connectionListeners = this.connectionListeners.filter(listener => listener !== callback);
  }
  
  /**
   * Notify all listeners of connection events
   */
  notifyListeners(event, data = null) {
    this.connectionListeners.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('❌ Error in connection listener:', error);
      }
    });
  }
  
  /**
   * Show AI selection modal (if needed for new connections)
   */
  async showAISelectionModal() {
    // If we don't have an AI assistant yet, create one
    if (!this.aiAssistant) {
      await this.initializeAIAssistant();
    }
    
    if (this.aiAssistant && typeof this.aiAssistant.showAISelectionModal === 'function') {
      return await this.aiAssistant.showAISelectionModal();
    } else {
      throw new Error('AI selection modal not available - AI assistant could not be initialized');
    }
  }
  
  /**
   * Initialize AI assistant if not already available
   */
  async initializeAIAssistant() {
    if (this.aiAssistant) {
      return this.aiAssistant;
    }
    
    try {
      // Try to get AI assistant from global scope
      const AIClass = window.AIAssistant || window.AIAssistantBackend;
      
      if (AIClass) {
        this.aiAssistant = new AIClass();
        
        // Sync with global agreement status immediately
        if (this.aiAssistant.checkGlobalAgreementStatus) {
          this.aiAssistant.checkGlobalAgreementStatus();
        }
        
        // Set up status change callback
        this.setupStatusChangeCallback();
        
        console.log('✅ AI Assistant initialized in shared manager');
        return this.aiAssistant;
      } else {
        throw new Error('AI Assistant class not available in global scope');
      }
    } catch (error) {
      console.error('❌ Failed to initialize AI Assistant:', error);
      throw error;
    }
  }
  
  /**
   * Generate content using current AI connection
   */
  async generateContent(prompt, context = 'general', options = {}) {
    if (!this.isConnected || !this.aiAssistant) {
      throw new Error('AI not connected. Please connect to an AI provider first.');
    }
    
    return await this.aiAssistant.generateContent(prompt, context, options);
  }
  
  /**
   * Get connection status for UI display
   */
  getConnectionStatus() {
    if (!this.isConnected) {
      return {
        status: 'disconnected',
        message: '🤖 AI: Not Connected',
        class: 'info'
      };
    }
    
    if (this.lastError) {
      return {
        status: 'error',
        message: `AI Connection Issue - ${this.lastError.message}`,
        class: 'error'
      };
    }
    
    return {
      status: 'connected',
      message: `🤖 AI: Connected (${this.currentProvider})`,
      class: 'success'
    };
  }
  
  /**
   * Export connection settings (without sensitive data)
   */
  exportConnectionSettings() {
    if (!this.isConnected) {
      return null;
    }
    
    const settings = { ...this.connectionSettings };
    
    // Remove sensitive data
    delete settings.apiKey;
    delete settings.password;
    
    return {
      provider: this.currentProvider,
      settings: settings,
      timestamp: new Date().toISOString()
    };
  }
  
  /**
   * Import connection settings
   */
  async importConnectionSettings(connectionData) {
    if (!connectionData || !connectionData.provider) {
      throw new Error('Invalid connection data');
    }
    
    return await this.connectAI(connectionData.provider, connectionData.settings || {});
  }
}

// Create global shared instance
if (typeof window !== 'undefined') {
  window.SharedAIConnection = window.SharedAIConnection || new SharedAIConnectionManager();
  console.log('🌐 Shared AI Connection Manager available globally');
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharedAIConnectionManager;
} 
/**
 * PlaygroundApp - Main AI Playground Application
 * Handles AI connections, deep research, chat, and session management
 */
class PlaygroundApp {
  constructor() {
    this.chatHistory = [];
    this.currentSession = null;
    this.aiAssistant = null;
    this.deepResearch = null;
    this.search = null; // Will be initialized with PlaygroundSearch
    this.isConnected = false;
    this.isResearching = false;
    this.sharedListenerSetup = false;
    this.lastConnectionMessageTime = 0;
    
    this.init();
  }
  
  async init() {
    console.log('🚀 Initializing AI Playground...');
    
    // Make this instance globally available
    window.playgroundApp = this;
    
    // Clear any previous session states
    this.clearSuccessMessages();
    this.isConnected = false;
    
    // Initialize User Agreement System
    if (window.userAgreement) {
      window.userAgreement.initializeForPage();
    }
    
    // Initialize Google Analytics
    if (window.AppConfig) {
      window.AppConfig.initializeGA4();
      // Track initial page view
      window.AppConfig.trackPageView('AI Playground - TimeCapsule-SLM', window.location.href);
    }
    
    // Initialize second navbar for Playground page
    setTimeout(() => {
      if (window.SecondNavbar) {
        window.SecondNavbar.init('playground');
      }
    }, 300);
    
    // Render navigation
    this.renderNavigation();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize components
    await this.initializeComponents();
    
    // Listen for shared AI connection changes
    this.setupSharedConnectionListener();
    
    // Ensure button text is correct
    setTimeout(() => {
      this.updateConnectButtonText();
    }, 100);
    
    console.log('✅ AI Playground initialized');
  }
  
  renderNavigation() {
    // Navigation is now handled automatically by bubblspace-navbar.js
    // No manual rendering needed
  }
  
  setupEventListeners() {
    // AI Connection
    document.getElementById('connectAI').addEventListener('click', () => this.connectAI());
    document.getElementById('aiProviderSelect').addEventListener('change', () => this.updateAIProvider());
    
    // Deep Research
    document.getElementById('startResearch').addEventListener('click', () => this.startDeepResearch());
    document.getElementById('researchTopic').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.startDeepResearch();
    });
    
    // Document Management (delegated to search module)
    document.getElementById('uploadDocuments').addEventListener('click', () => {
      if (this.search) this.search.uploadDocuments();
    });
    document.getElementById('manageDocuments').addEventListener('click', async () => {
      if (this.search) await this.search.manageDocuments();
    });
    document.getElementById('documentInput').addEventListener('change', (e) => {
      if (this.search) this.search.handleDocumentUpload(e);
    });
    
    // TimeCapsule
    document.getElementById('exportTimeCapsule').addEventListener('click', () => this.exportTimeCapsule());
    document.getElementById('loadTimeCapsule').addEventListener('click', () => this.loadTimeCapsule());
    document.getElementById('loadTimeCapsuleInput').addEventListener('change', (e) => this.handleTimeCapsuleLoad(e));
    
    // Session Controls
    document.getElementById('clearChat').addEventListener('click', () => this.clearChat());
    document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
    
    // Chat
    document.getElementById('chatSend').addEventListener('click', () => this.sendChatMessage());
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendChatMessage();
      }
    });
    
    // Auto-resize chat input
    document.getElementById('chatInput').addEventListener('input', (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    });
  }
  
  async initializeComponents() {
    try {
      // Check for existing shared connection and trigger restoration if needed
      if (window.SharedAIConnection) {
        // Trigger connection restoration check
        await window.SharedAIConnection.checkAndRestoreConnection();
        
        if (window.SharedAIConnection.isAIConnected()) {
          const currentProvider = window.SharedAIConnection.getProviderInfo();
          console.log('✅ Found existing shared AI connection:', currentProvider);
          
          // Use existing connection
          this.aiAssistant = window.SharedAIConnection.getAIAssistant();
          if (this.aiAssistant) {
            this.aiAssistant.onStatusChange = (status) => this.handleAIStatusChange(status);
            
            // Update UI to reflect connection
            this.isConnected = true;
            this.updateStatus('aiStatus', `Connected (${currentProvider.provider})`, 'success');
            this.updateConnectButtonText();
            
            // Only add message if we don't already have a recent connection message
            if (!this.hasRecentConnectionMessage()) {
              this.addChatMessage('system', `🤖 Using existing AI connection (${currentProvider.provider}). Ready to help!`);
              this.lastConnectionMessageTime = Date.now();
            }
          }
        } else {
          console.log('🔍 No active shared connection found after restoration check');
        }
      } else {
        // Initialize AI Assistant for new connections
        if (window.AIAssistantBackend) {
          this.aiAssistant = new AIAssistantBackend();
          
          // Set up status change callback to handle connection updates
          this.aiAssistant.onStatusChange = (status) => this.handleAIStatusChange(status);
          
          this.updateStatus('aiStatus', 'Ready to Connect', 'info');
        } else {
          this.updateStatus('aiStatus', 'AI Backend Not Available', 'error');
        }
      }
      
      // Initialize Search Module with slight delay to ensure all scripts are loaded
      if (window.PlaygroundSearch) {
        this.search = new PlaygroundSearch(this);
        // Add small delay to allow other components to initialize first
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.search.initializeVectorStore();
      }
      
    } catch (error) {
      console.error('❌ Component initialization failed:', error);
      this.updateStatus('aiStatus', 'Initialization Failed', 'error');
    }
  }
  
  setupSharedConnectionListener() {
    if (window.SharedAIConnection && !this.sharedListenerSetup) {
      // Listen for connection changes from other pages
      window.SharedAIConnection.addConnectionListener((event, data) => {
        console.log('🔄 Playground received shared connection event:', event, data);
        
        if (event === 'connected') {
          this.aiAssistant = data;
          this.aiAssistant.onStatusChange = (status) => this.handleAIStatusChange(status);
          
          const providerInfo = window.SharedAIConnection.getProviderInfo();
          this.isConnected = true;
          this.updateStatus('aiStatus', `Connected (${providerInfo.provider})`, 'success');
          this.updateConnectButtonText();
          
          // Only add message if we don't already have a recent connection message
          if (!this.hasRecentConnectionMessage()) {
            this.addChatMessage('system', `🤖 AI connected via ${providerInfo.provider}. Ready to help!`);
            this.lastConnectionMessageTime = Date.now();
          }
        } else if (event === 'disconnected') {
          this.isConnected = false;
          this.updateStatus('aiStatus', 'Ready to Connect', 'info');
          this.updateConnectButtonText();
          this.addChatMessage('system', '🔌 AI disconnected');
        } else if (event === 'error') {
          this.isConnected = false;
          this.updateStatus('aiStatus', 'Connection Issue', 'error');
          this.updateConnectButtonText();
          this.addChatMessage('system', `❌ AI connection error: ${data.message}`);
        }
      });
      
      this.sharedListenerSetup = true;
    }
  }
  
  async connectAI() {
    const connectButton = document.getElementById('connectAI');
    const provider = document.getElementById('aiProviderSelect').value;
    
    try {
      // Clear any previous states first
      this.clearSuccessMessages();
      this.isConnected = false;
      
      // Disable button and show connecting state
      connectButton.disabled = true;
      connectButton.textContent = 'Connecting...';
      this.updateStatus('aiStatus', 'Connecting...', 'info');
      
      console.log(`🔌 Attempting to connect to ${provider}...`);
      console.log('🔍 SharedAIConnection available:', !!window.SharedAIConnection);
      
      // Check if we already have a shared AI connection
      if (window.SharedAIConnection && window.SharedAIConnection.isAIConnected()) {
        const currentProvider = window.SharedAIConnection.getProviderInfo();
        console.log('✅ Shared AI connection already exists:', currentProvider);
        
        // Use existing connection
        this.aiAssistant = window.SharedAIConnection.getAIAssistant();
        this.aiAssistant.onStatusChange = (status) => this.handleAIStatusChange(status);
        
        // Update UI to reflect connection
        this.isConnected = true;
        this.updateStatus('aiStatus', `Connected (${currentProvider.provider})`, 'success');
        this.updateConnectButtonText();
        
        // Only add message if we don't already have a recent connection message
        if (!this.hasRecentConnectionMessage()) {
          this.addChatMessage('system', `🤖 Using existing AI connection (${currentProvider.provider}). Ready to help!`);
          this.lastConnectionMessageTime = Date.now();
        }
        
        connectButton.disabled = false;
        return;
      }
      
      // No existing connection, create new one using shared manager
      if (window.SharedAIConnection) {
        console.log(`🔌 Creating new shared AI connection for ${provider}...`);
        
        // Set up connection listener for this instance
        const connectionListener = (event, data) => {
          console.log('🔄 AI Connection Event:', event, data);
          
          if (event === 'connected') {
            this.aiAssistant = data;
            this.aiAssistant.onStatusChange = (status) => this.handleAIStatusChange(status);
            
            this.isConnected = true;
            this.updateStatus('aiStatus', `Connected (${window.SharedAIConnection.currentProvider})`, 'success');
            this.updateConnectButtonText();
            
            // Only add message if we don't already have a recent connection message
            if (!this.hasRecentConnectionMessage()) {
              this.addChatMessage('system', `🤖 AI Assistant connected using ${window.SharedAIConnection.currentProvider}. Ready to help!`);
              this.lastConnectionMessageTime = Date.now();
            }
            
            connectButton.disabled = false;
          } else if (event === 'error') {
            this.isConnected = false;
            this.updateStatus('aiStatus', 'Connection Issue', 'error');
            this.updateConnectButtonText();
            this.addChatMessage('system', `AI connection issue: ${data.message}`);
            
            connectButton.disabled = false;
          } else if (event === 'disconnected') {
            this.aiAssistant = null;
            this.isConnected = false;
            this.updateStatus('aiStatus', 'Ready to Connect', 'info');
            this.updateConnectButtonText();
            this.addChatMessage('system', '🔌 AI Disconnected');
            
            connectButton.disabled = false;
          }
        };
        
        // Add listener
        window.SharedAIConnection.addConnectionListener(connectionListener);
        
        // Show AI selection modal through shared manager
        await window.SharedAIConnection.showAISelectionModal();
        
        // Reset button state since the modal will handle the actual connection
        connectButton.disabled = false;
        this.updateConnectButtonText();
        this.updateStatus('aiStatus', 'Please complete connection in the modal', 'info');
        
        return;
      }
      
      // Fallback to original logic if shared manager not available
      console.warn('⚠️ Shared AI Connection Manager not available, falling back to local connection');
      
      if (!this.aiAssistant) {
        throw new Error('AI Assistant not available');
      }
      
      console.log(`🔍 PLAYGROUND: About to show AI selection modal for '${provider}'`);
      console.log(`🔍 PLAYGROUND: aiAssistant object:`, this.aiAssistant);
      
      // Set the provider first, then show the modal (which allows custom URL input)
      this.aiAssistant.setProvider(provider);
      this.aiAssistant.showAISelectionModal();
      
      // Reset button state since the modal will handle the actual connection
      connectButton.disabled = false;
      this.updateConnectButtonText();
      this.updateStatus('aiStatus', 'Please complete connection in the modal', 'info');
      
    } catch (error) {
      console.error('❌ AI connection setup failed:', error);
      
      // Reset button state
      connectButton.disabled = false;
      this.updateConnectButtonText();
      this.updateStatus('aiStatus', 'Setup Failed', 'error');
      
      this.addChatMessage('system', `❌ Failed to setup AI connection: ${error.message}`);
    }
  }
  
  handleAIStatusChange(status) {
    console.log('🔄 AI Status Change:', status);
    
    if (status.connected) {
      this.isConnected = true;
      this.updateStatus('aiStatus', `Connected (${status.provider})`, 'success');
      this.updateConnectButtonText();
      
      // Only add message if we don't already have a recent connection message
      if (!this.hasRecentConnectionMessage()) {
        this.addChatMessage('system', `🤖 AI Assistant connected using ${status.provider}. Ready to help!`);
        this.lastConnectionMessageTime = Date.now();
      }
    } else if (status.error) {
      this.isConnected = false;
      this.updateStatus('aiStatus', 'Connection Issue', 'error');
      this.updateConnectButtonText();
      this.addChatMessage('system', `AI connection issue: ${status.error}`);
    } else {
      this.isConnected = false;
      this.updateStatus('aiStatus', 'Ready to Connect', 'info');
      this.updateConnectButtonText();
    }
  }

  updateAIProvider() {
    const connectButton = document.getElementById('connectAI');
    const provider = document.getElementById('aiProviderSelect').value;
    
    if (this.isConnected) {
      this.addChatMessage('system', '⚠️ AI provider changed. Please reconnect.');
      this.isConnected = false;
    }
    
    // Reset UI state
    this.updateStatus('aiStatus', 'Ready to Connect', 'info');
    this.updateConnectButtonText();
    connectButton.disabled = false;
    
    console.log(`🔄 AI provider changed to ${provider}`);
  }
  
  updateConnectButtonText() {
    const connectButton = document.getElementById('connectAI');
    
    // Check if AI is connected
    let isConnected = false;
    let currentProvider = null;
    
    // Check shared connection first
    if (window.SharedAIConnection && window.SharedAIConnection.isAIConnected()) {
      isConnected = true;
      const providerInfo = window.SharedAIConnection.getProviderInfo();
      currentProvider = providerInfo.provider;
    }
    // Fallback to local connection check
    else if (this.isConnected && this.aiAssistant) {
      isConnected = true;
      currentProvider = document.getElementById('aiProviderSelect').value;
    }
    
    if (isConnected) {
      const connectedLabels = {
        'ollama': '🦙 Connected (Ollama)',
        'lmstudio': '🏠 Connected (LM Studio)', 
        'openai': '🚀 Connected (OpenAI)',
        'local': '🧠 Connected (Local Qwen)'
      };
      
      connectButton.textContent = connectedLabels[currentProvider] || '✅ AI Connected';
    } else {
      const provider = document.getElementById('aiProviderSelect').value;
      const providerLabels = {
        'ollama': '🦙 Connect Ollama',
        'lmstudio': '🏠 Connect LM Studio', 
        'openai': '🚀 Connect OpenAI',
        'local': '🧠 Connect Local Qwen'
      };
      
      connectButton.textContent = providerLabels[provider] || 'Connect AI';
    }
  }
  
  async startDeepResearch() {
    const topic = document.getElementById('researchTopic').value.trim();
    if (!topic) {
      this.addChatMessage('system', '⚠️ Please enter a research topic');
      return;
    }
    
    if (this.isResearching) {
      this.addChatMessage('system', '⚠️ Research already in progress');
      return;
    }
    
    try {
      this.isResearching = true;
      this.addChatMessage('system', `🔍 Starting deep research on: "${topic}"`);
      
      const depth = document.getElementById('researchDepth').value;
      
      // Use deep research module if available, otherwise simulate
      const research = await this.performDeepResearch(topic, depth);
      
      this.addChatMessage('assistant', `## 📊 Research Results: ${topic}\n\n${research}`);
      
      // Store research in session
      this.currentSession = {
        ...this.currentSession,
        lastResearch: {
          topic,
          depth,
          results: research,
          timestamp: new Date().toISOString()
        }
      };
      
    } catch (error) {
      console.error('❌ Research failed:', error);
      this.addChatMessage('system', `❌ Research failed: ${error.message}`);
      
      // Show Ollama troubleshooting helper if it's an Ollama connection error during research
      const provider = document.getElementById('aiProviderSelect').value;
      if (provider === 'ollama' && this.isOllamaConnectionError(error.message)) {
        this.isConnected = false; // Mark as disconnected
        this.updateStatus('aiStatus', 'Connection Lost', 'error');
        this.showOllamaTroubleshootingHelper(error.message);
      }
    } finally {
      this.isResearching = false;
    }
  }
  
  async performDeepResearch(topic, depth) {
    // Try to use DeepResearch module if available
    if (window.DeepResearchEngine && this.deepResearch) {
      try {
        return await this.deepResearch.conductResearch(topic, depth);
      } catch (error) {
        console.warn('DeepResearch module failed, falling back to simulation:', error);
      }
    }
    
    // Fallback simulation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `### Summary
Research topic: ${topic}
Analysis depth: ${depth}

### Key Findings
- Finding 1: Relevant information about ${topic}
- Finding 2: Important insights discovered
- Finding 3: Additional research points

### Sources
- Academic papers and publications
- Industry reports and analysis
- Expert opinions and interviews

### Recommendations
Based on the research, here are the key recommendations:
1. Continue investigation into specific aspects
2. Consider related topics for further study
3. Apply findings to practical applications

*Note: This is a demo implementation. Real deep research would integrate with actual research APIs and databases.*`;
  }
  
  async sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    this.addChatMessage('user', message);
    input.value = '';
    input.style.height = 'auto';
    
    // Enhanced AI connection validation
    let aiAssistant = this.aiAssistant;
    
    // If local AI assistant is null, try to get from shared connection
    if (!aiAssistant && window.SharedAIConnection && window.SharedAIConnection.isAIConnected()) {
      console.log('🔍 Local AI assistant is null, trying shared connection...');
      aiAssistant = window.SharedAIConnection.getAIAssistant();
      if (aiAssistant) {
        // Update our local reference
        this.aiAssistant = aiAssistant;
        this.aiAssistant.onStatusChange = (status) => this.handleAIStatusChange(status);
        this.isConnected = true;
        console.log('✅ Successfully retrieved AI assistant from shared connection');
      }
    }
    
    // Final validation - ensure we have both connection state and valid assistant
    if (!this.isConnected || !aiAssistant) {
      this.addChatMessage('system', '⚠️ Please connect AI assistant first');
      console.error('❌ Chat blocked: isConnected =', this.isConnected, ', aiAssistant =', !!aiAssistant);
      return;
    }
    
    // Additional validation for AI assistant object
    if (!aiAssistant.generateContent || typeof aiAssistant.generateContent !== 'function') {
      this.addChatMessage('system', '❌ AI assistant is not properly initialized. Please reconnect.');
      console.error('❌ AI assistant missing generateContent method:', aiAssistant);
      return;
    }

    try {
      // Check for document-related queries (RAG) using search module
      let response;
      if (this.search && this.search.isDocumentQuery(message)) {
        response = await this.search.handleRAGQuery(message);
      } else {
        response = await aiAssistant.generateContent(message, 'general');
      }
      
      this.addChatMessage('assistant', response);
      
    } catch (error) {
      console.error('❌ Chat failed:', error);
      this.addChatMessage('system', `❌ Error: ${error.message}`);
      
      // Show Ollama troubleshooting helper if it's an Ollama connection error during chat
      const provider = document.getElementById('aiProviderSelect').value;
      if (provider === 'ollama' && this.isOllamaConnectionError(error.message)) {
        this.isConnected = false; // Mark as disconnected
        this.updateStatus('aiStatus', 'Connection Lost', 'error');
        this.showOllamaTroubleshootingHelper(error.message);
      }
    }
  }
  
  exportTimeCapsule() {
    const timeCapsule = {
      type: 'playground_session',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      data: {
        chatHistory: this.chatHistory,
        currentSession: this.currentSession,
        aiProvider: document.getElementById('aiProviderSelect').value,
        lastResearchTopic: document.getElementById('researchTopic').value,
        searchStats: this.search ? this.search.getVectorStoreStats() : null
      }
    };
    
    const blob = new Blob([JSON.stringify(timeCapsule, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground_session_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.addChatMessage('system', '💾 Session exported as TimeCapsule');
  }
  
  loadTimeCapsule() {
    document.getElementById('loadTimeCapsuleInput').click();
  }
  
  async handleTimeCapsuleLoad(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const timeCapsule = JSON.parse(text);
      
      if (timeCapsule.type !== 'playground_session') {
        throw new Error('Invalid TimeCapsule type');
      }
      
      // Restore session
      this.chatHistory = timeCapsule.data.chatHistory || [];
      this.currentSession = timeCapsule.data.currentSession || null;
      
      // Restore UI state
      if (timeCapsule.data.aiProvider) {
        document.getElementById('aiProviderSelect').value = timeCapsule.data.aiProvider;
      }
      if (timeCapsule.data.lastResearchTopic) {
        document.getElementById('researchTopic').value = timeCapsule.data.lastResearchTopic;
      }
      
      // Re-render chat
      this.renderChatHistory();
      
      this.addChatMessage('system', `📂 Loaded session from ${new Date(timeCapsule.timestamp).toLocaleString()}`);
      
    } catch (error) {
      console.error('❌ TimeCapsule load failed:', error);
      this.addChatMessage('system', `❌ Failed to load TimeCapsule: ${error.message}`);
    }
    
    event.target.value = '';
  }
  
  clearChat() {
    this.chatHistory = [];
    this.renderChatHistory();
    this.addChatMessage('system', '🗑️ Chat cleared');
  }
  
  clearAll() {
    this.chatHistory = [];
    this.currentSession = null;
    this.isConnected = false;
    
    // Reset UI
    document.getElementById('researchTopic').value = '';
    document.getElementById('chatInput').value = '';
    
    // Reset status
    this.updateStatus('aiStatus', 'Ready to Connect', 'info');
    this.updateStatus('vectorStatus', 'Vector Store Ready', 'info');
    
    // Show empty state
    this.showEmptyState();
    
    this.addChatMessage('system', '🔄 All data reset');
  }
  
  addChatMessage(type, content) {
    const message = {
      type,
      content,
      timestamp: new Date().toISOString()
    };
    
    this.chatHistory.push(message);
    this.renderChatHistory();
    
    // Scroll to bottom
    const displayContent = document.getElementById('displayContent');
    displayContent.scrollTop = displayContent.scrollHeight;
  }
  
  renderChatHistory() {
    const displayContent = document.getElementById('displayContent');
    
    if (this.chatHistory.length === 0) {
      this.showEmptyState();
      return;
    }
    
    let html = '<div class="chat-messages">';
    
    this.chatHistory.forEach(message => {
      html += `
        <div class="chat-message ${message.type}">
          <div class="message-content">
            ${this.formatMessage(message.content)}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    displayContent.innerHTML = html;
    
    // Highlight code blocks
    if (window.hljs) {
      displayContent.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  }
  
  formatMessage(content) {
    if (window.marked) {
      return marked.parse(content);
    }
    return content.replace(/\n/g, '<br>');
  }
  
  showEmptyState() {
    const displayContent = document.getElementById('displayContent');
    displayContent.innerHTML = `
      <div class="empty-state">
        <h2>🚀 Welcome to AI Playground</h2>
        <p>
          This is your space to interact with AI Personas, conduct deep research, and chat with your documents using RAG.
          <br><br>
          <strong>Get Started:</strong>
          <br>• Connect your AI assistant
          <br>• Upload documents for RAG-powered chat
          <br>• Start a research topic
          <br>• Begin chatting below
        </p>
      </div>
    `;
  }
  
  updateStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.className = `status-indicator ${type}`;
      
      // Also handle main display banner for aiStatus
      if (elementId === 'aiStatus') {
        this.updateMainDisplayBanner(message, type);
      }
    }
  }
  
  updateMainDisplayBanner(message, type) {
    const displayContent = document.getElementById('displayContent');
    if (!displayContent) return;
    
    // Remove any existing status banners
    const existingBanners = displayContent.querySelectorAll('.connection-status-banner');
    existingBanners.forEach(banner => banner.remove());
    
    // Only show success banner for actual connections
    if (type === 'success' && this.isConnected) {
      const banner = document.createElement('div');
      banner.className = 'connection-status-banner success';
      banner.innerHTML = `🤖 AI Assistant connected using ${this.getCurrentProvider()}. Ready to help!`;
      
      // Insert at the top of display content
      if (displayContent.firstChild) {
        displayContent.insertBefore(banner, displayContent.firstChild);
      } else {
        displayContent.appendChild(banner);
      }
    }
  }
  
  getCurrentProvider() {
    const providerSelect = document.getElementById('aiProviderSelect');
    return providerSelect ? providerSelect.value : 'AI';
  }
  
  hasRecentConnectionMessage() {
    // Check if we've added a connection message in the last 5 seconds
    return (Date.now() - this.lastConnectionMessageTime) < 5000;
  }
  
  clearSuccessMessages() {
    // Clear any success banners
    const displayContent = document.getElementById('displayContent');
    if (displayContent) {
      const banners = displayContent.querySelectorAll('.connection-status-banner');
      banners.forEach(banner => banner.remove());
    }
    
    // Remove success messages from chat that might be lingering
    this.chatHistory = this.chatHistory.filter(msg => 
      !(msg.type === 'system' && msg.content.includes('connected using'))
    );
    this.renderChatHistory();
  }
  
  // Session management
  saveSession() {
    const sessionData = {
      chatHistory: this.chatHistory,
      currentSession: this.currentSession,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('playgroundSession', JSON.stringify(sessionData));
    this.addChatMessage('system', '💾 Session saved locally');
  }
  
  loadSession() {
    try {
      const saved = localStorage.getItem('playgroundSession');
      if (saved) {
        const sessionData = JSON.parse(saved);
        this.chatHistory = sessionData.chatHistory || [];
        this.currentSession = sessionData.currentSession || null;
        this.renderChatHistory();
        this.addChatMessage('system', `📂 Session restored from ${new Date(sessionData.timestamp).toLocaleString()}`);
        return true;
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
    return false;
  }
  
  // Ollama troubleshooting helpers
  isOllamaConnectionError(errorMessage) {
    const ollamaErrors = [
      'Failed to fetch',
      'CORS',
      'NetworkError',
      'Connection refused',
      'Ollama connection failed',
      'localhost:11434',
      'timeout',
      'message channel closed',
      'response was received',
      'asynchronous response',
      'net::ERR_CONNECTION_REFUSED',
      'net::ERR_FAILED',
      'AbortError',
      'TypeError: Failed to fetch'
    ];
    
    return ollamaErrors.some(error => 
      errorMessage.toLowerCase().includes(error.toLowerCase())
    );
  }
  
  // Method to test Ollama connection and show troubleshooting if needed
  async testOllamaConnection() {
    const provider = document.getElementById('aiProviderSelect').value;
    if (provider !== 'ollama') {
      console.log('Not using Ollama, skipping connection test');
      return;
    }
    
    try {
      console.log('🔍 Testing Ollama connection...');
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        timeout: 5000
      });
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }
      
      console.log('✅ Ollama connection test passed');
      return true;
    } catch (error) {
      console.error('❌ Ollama connection test failed:', error);
      this.isConnected = false;
      this.updateStatus('aiStatus', 'Connection Lost', 'error');
      this.addChatMessage('system', `❌ Ollama connection lost: ${error.message}`);
      this.showOllamaTroubleshootingHelper(error.message);
      return false;
    }
  }

  showOllamaTroubleshootingHelper(errorMessage) {
    console.log('🛠️ showOllamaTroubleshootingHelper called with error:', errorMessage);
    console.log('🔍 Current DOM state:', {
      existingModals: document.querySelectorAll('.troubleshooting-modal').length,
      bodyChildren: document.body.children.length
    });
    
    // Remove any existing troubleshooting modals
    const existingModals = document.querySelectorAll('.troubleshooting-modal');
    existingModals.forEach(modal => {
      console.log('🗑️ Removing existing modal:', modal);
      modal.remove();
    });
    
    const modal = document.createElement('div');
    modal.className = 'troubleshooting-modal';
    console.log('📝 Created troubleshooting modal element');
    modal.innerHTML = `
      <div class="troubleshooting-content">
        <div class="troubleshooting-header">
          <h2>🛠️ Ollama Connection Failed</h2>
          <button class="close-modal" onclick="this.closest('.troubleshooting-modal').remove()">✕</button>
        </div>
        
        <div class="error-details">
          <p><strong>Error:</strong> ${errorMessage}</p>
        </div>
        
        <div class="troubleshooting-steps">
          <h3>🚀 Platform-Specific Quick Fix Commands:</h3>
          
          <!-- macOS Section -->
          <div class="command-group">
            <h4>🍎 macOS Commands:</h4>
            <div style="margin-bottom: 15px;">
              <strong>1. Kill Existing Ollama Process:</strong>
              <div class="command-box">
                <code>pkill -f ollama</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('pkill -f ollama')">📋 Copy</button>
              </div>
              <div class="command-box">
                <code>sudo pkill -f ollama</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('sudo pkill -f ollama')">📋 Copy</button>
              </div>
              <p class="command-note"><strong>GUI Alternative:</strong> Activity Monitor → Search "ollama" → Force Quit</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>2. Start Ollama with CORS:</strong>
              <div class="command-box">
                <code>OLLAMA_ORIGINS="*" ollama serve</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('OLLAMA_ORIGINS=&quot;*&quot; ollama serve')">📋 Copy</button>
              </div>
            </div>
            
            <div>
              <strong>3. Pull Model (if needed):</strong>
              <div class="command-box">
                <code>ollama pull qwen3:0.6b</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('ollama pull qwen3:0.6b')">📋 Copy</button>
              </div>
            </div>
          </div>
          
          <!-- Linux Section -->
          <div class="command-group">
            <h4>🐧 Linux Commands:</h4>
            <div style="margin-bottom: 15px;">
              <strong>1. Kill Existing Ollama Process:</strong>
              <div class="command-box">
                <code>pkill -f ollama</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('pkill -f ollama')">📋 Copy</button>
              </div>
              <div class="command-box">
                <code>sudo pkill -f ollama</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('sudo pkill -f ollama')">📋 Copy</button>
              </div>
              <div class="command-box">
                <code>sudo systemctl stop ollama</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('sudo systemctl stop ollama')">📋 Copy</button>
              </div>
              <p class="command-note"><strong>Alternative:</strong> System Monitor → Find "ollama" → End Process</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>2. Start Ollama with CORS:</strong>
              <div class="command-box">
                <code>OLLAMA_ORIGINS="*" ollama serve</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('OLLAMA_ORIGINS=&quot;*&quot; ollama serve')">📋 Copy</button>
              </div>
              <div class="command-box">
                <code>sudo systemctl start ollama</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('sudo systemctl start ollama')">📋 Copy</button>
              </div>
            </div>
            
            <div>
              <strong>3. Pull Model (if needed):</strong>
              <div class="command-box">
                <code>ollama pull qwen3:0.6b</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('ollama pull qwen3:0.6b')">📋 Copy</button>
              </div>
            </div>
          </div>
          
          <!-- Windows Section -->
          <div class="command-group">
            <h4>🪟 Windows Commands:</h4>
            <div style="margin-bottom: 15px;">
              <strong>1. Kill Existing Ollama Process:</strong>
              <div class="command-box">
                <code>taskkill /f /im ollama.exe</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('taskkill /f /im ollama.exe')">📋 Copy</button>
              </div>
              <div class="command-box">
                <code>Get-Process ollama | Stop-Process -Force</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('Get-Process ollama | Stop-Process -Force')">📋 Copy</button>
              </div>
              <p class="command-note"><strong>GUI Alternative:</strong> Task Manager → Find "ollama" → End Task</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>2. Start Ollama with CORS:</strong>
              <div class="command-box">
                <code>set OLLAMA_ORIGINS=* && ollama serve</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('set OLLAMA_ORIGINS=* && ollama serve')">📋 Copy</button>
              </div>
              <div class="command-box">
                <code>$env:OLLAMA_ORIGINS="*"; ollama serve</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('$env:OLLAMA_ORIGINS=&quot;*&quot;; ollama serve')">📋 Copy</button>
              </div>
              <p class="command-note">First command for CMD, second for PowerShell</p>
            </div>
            
            <div>
              <strong>3. Pull Model (if needed):</strong>
              <div class="command-box">
                <code>ollama pull qwen3:0.6b</code>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('ollama pull qwen3:0.6b')">📋 Copy</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="troubleshooting-checklist">
          <h3>📋 Troubleshooting Checklist:</h3>
          <ul>
            <li>✅ Ollama is installed from <a href="https://ollama.ai" target="_blank">ollama.ai</a></li>
            <li>✅ Port 11434 is not blocked by firewall</li>
            <li>✅ CORS is enabled (OLLAMA_ORIGINS set)</li>
            <li>✅ At least one model is pulled</li>
            <li>✅ Ollama service is running</li>
          </ul>
        </div>
        
                 <div class="troubleshooting-actions">
           <button class="btn secondary" onclick="window.open('https://ollama.ai', '_blank')">📥 Download Ollama</button>
           <button class="btn secondary" onclick="window.playgroundApp?.testOllamaConnection()">🔍 Test Connection</button>
           <button class="btn primary" onclick="this.closest('.troubleshooting-modal').remove(); document.getElementById('connectAI').click();">🔄 Try Again</button>
         </div>
      </div>
    `;
    
    // Modal styles are handled by CSS, just ensure visibility
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    
    document.body.appendChild(modal);
    console.log('✅ Troubleshooting modal added to DOM');
    console.log('🔍 Modal visibility check:', {
      modalInDOM: document.contains(modal),
      modalStyle: modal.style.cssText,
      modalDisplay: getComputedStyle(modal).display,
      modalOpacity: getComputedStyle(modal).opacity
    });
    
    // Add click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        console.log('🔒 Closing troubleshooting modal via click outside');
        modal.remove();
      }
    });
    
    console.log('🎯 Troubleshooting modal setup complete');
  }

  // Statistics and analytics
  getSessionStats() {
    return {
      messageCount: this.chatHistory.length,
      userMessages: this.chatHistory.filter(m => m.type === 'user').length,
      assistantMessages: this.chatHistory.filter(m => m.type === 'assistant').length,
      systemMessages: this.chatHistory.filter(m => m.type === 'system').length,
      isConnected: this.isConnected,
      isResearching: this.isResearching,
      searchStats: this.search ? this.search.getVectorStoreStats() : null
    };
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.PlaygroundApp = PlaygroundApp;
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlaygroundApp;
}

// Global function to manually trigger Ollama troubleshooting
window.testOllamaConnection = function() {
  if (window.playgroundApp && window.playgroundApp.testOllamaConnection) {
    window.playgroundApp.testOllamaConnection();
  } else {
    console.error('Playground app not available');
  }
};

  // Global function to manually show troubleshooting helper
window.showOllamaTroubleshooting = function(errorMessage = 'Manual trigger') {
  if (window.playgroundApp && window.playgroundApp.showOllamaTroubleshootingHelper) {
    window.playgroundApp.showOllamaTroubleshootingHelper(errorMessage);
  } else {
    console.error('Playground app not available');
  }
};

// Global function to test UI states
window.testPlaygroundUIStates = function() {
  if (!window.playgroundApp) {
    console.error('Playground app not available');
    return;
  }
  
  const app = window.playgroundApp;
  console.log('🧪 Testing Playground UI States:');
  console.log('  - isConnected:', app.isConnected);
  console.log('  - aiAssistant exists:', !!app.aiAssistant);
  
  const connectBtn = document.getElementById('connectAI');
  const aiStatus = document.getElementById('aiStatus');
  const banners = document.querySelectorAll('.connection-status-banner');
  
  console.log('  - Connect button text:', connectBtn?.textContent);
  console.log('  - Connect button disabled:', connectBtn?.disabled);
  console.log('  - AI Status text:', aiStatus?.textContent);
  console.log('  - AI Status class:', aiStatus?.className);
  console.log('  - Success banners count:', banners.length);
  
  // Test error state
  console.log('🔴 Testing error state...');
  app.updateStatus('aiStatus', 'Connection Failed', 'error');
  app.clearSuccessMessages();
  app.isConnected = false;
  
  if (connectBtn) {
    connectBtn.textContent = 'Connect AI';
    connectBtn.disabled = false;
  }
  
  console.log('✅ Error state applied');
};

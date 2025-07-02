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
    
    this.init();
  }
  
  async init() {
    console.log('🚀 Initializing AI Playground...');
    
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
      // Initialize AI Assistant
      if (window.AIAssistantBackend) {
        this.aiAssistant = new AIAssistantBackend();
        this.updateStatus('aiStatus', 'AI Assistant Ready', 'success');
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
  
  async connectAI() {
    try {
      if (!this.aiAssistant) {
        throw new Error('AI Assistant not available');
      }
      
      this.updateStatus('aiStatus', 'Connecting...', 'info');
      
      const provider = document.getElementById('aiProviderSelect').value;
      await this.aiAssistant.initialize(provider);
      
      this.isConnected = true;
      this.updateStatus('aiStatus', `Connected (${provider})`, 'success');
      
      // Add welcome message
      this.addChatMessage('system', `🤖 AI Assistant connected using ${provider}. Ready to help!`);
      
    } catch (error) {
      console.error('❌ AI connection failed:', error);
      this.updateStatus('aiStatus', 'Connection Failed', 'error');
      this.addChatMessage('system', `❌ Failed to connect AI: ${error.message}`);
    }
  }
  
  updateAIProvider() {
    if (this.isConnected) {
      this.addChatMessage('system', '⚠️ AI provider changed. Please reconnect.');
      this.isConnected = false;
      this.updateStatus('aiStatus', 'Ready to Connect', 'info');
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
    
    // Check if AI is connected
    if (!this.isConnected || !this.aiAssistant) {
      this.addChatMessage('system', '⚠️ Please connect AI assistant first');
      return;
    }
    
    try {
      // Check for document-related queries (RAG) using search module
      let response;
      if (this.search && this.search.isDocumentQuery(message)) {
        response = await this.search.handleRAGQuery(message);
      } else {
        response = await this.aiAssistant.generateContent(message, 'general');
      }
      
      this.addChatMessage('assistant', response);
      
    } catch (error) {
      console.error('❌ Chat failed:', error);
      this.addChatMessage('system', `❌ Error: ${error.message}`);
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
    }
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

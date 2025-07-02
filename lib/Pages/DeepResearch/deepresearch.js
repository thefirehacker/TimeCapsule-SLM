/**
 * Deep Research Studio Application
 * AI-powered research and analysis platform
 */

class DeepResearchApp {
  constructor() {
    this.topics = [];
    this.researchResults = {};
    this.currentTab = 'research';
    this.aiAssistant = null;
    this.isGenerating = false;
    this.vectorStore = null;
    this.githubIntegration = null;
    this.documentModalOpen = false;
    this.eventListenersSetup = false;
    this.isUploading = false; // Track upload state
    
    this.init();
  }
  
  init() {
    console.log('🚀 DeepResearchApp.init() called');
    console.log('🔍 this object:', this);
    
    // Make this instance globally available for shared RAG system
    window.deepResearchApp = this;
    
    this.setupEventListeners();
    this.setupResizeHandle();
    this.setupTabSwitching();
    this.loadFromStorage();
    this.updateStatus('🦙 Ollama mode enabled - Ready to start research');
    this.updateConnectButtonText(); // Set correct initial button text
    
    // Initialize AI Assistant with debugging
    console.log('🔍 Checking for AI classes...');
    console.log('🔍 window.AIAssistant:', !!window.AIAssistant);
    console.log('🔍 window.AIAssistantBackend:', !!window.AIAssistantBackend);
    console.log('🔍 Available AI properties:', Object.keys(window).filter(key => key.includes('AI')));
    
    // Try to initialize with available AI class
    const AIClass = window.AIAssistant || window.AIAssistantBackend;
    
    if (AIClass) {
      try {
        this.aiAssistant = new AIClass();
        this.aiAssistant.onStatusChange = (status) => this.updateAIStatus(status);
        console.log('✅ AIAssistant initialized successfully using:', AIClass.name);
      } catch (error) {
        console.error('❌ Failed to initialize AIAssistant during startup:', error);
        this.aiAssistant = null;
      }
    } else {
      console.warn('⚠️ No AI Assistant class available during init, will retry on connect');
      this.aiAssistant = null;
    }
    
    // Initialize Vector Store
    this.initializeVectorStore();
    
    // Set up periodic button state check to handle cases where 
    // AI connection state changes but callbacks don't fire
    this.setupPeriodicButtonCheck();
  }
  
  async initializeVectorStore() {
    try {
      // Check if Vector Store is globally disabled
      if (window.VECTOR_STORE_DISABLED) {
        console.warn('⚠️ Vector Store disabled due to Transformers.js loading failure');
        this.updateStatus('⚠️ Vector Store disabled - Transformers.js failed to load');
        return;
      }
      
      console.log('🗂️ Initializing Vector Store...');
      
      if (window.VectorStore) {
        // Check if there's already a shared VectorStore instance
        if (window.sharedVectorStore && window.sharedVectorStore.isInitialized) {
          console.log('🔗 Using existing shared VectorStore instance');
          this.vectorStore = window.sharedVectorStore;
        } else {
          // Create new VectorStore instance
          console.log('🆕 Creating new VectorStore instance for DeepResearch');
          this.vectorStore = new VectorStore();
          await this.vectorStore.init();
          
          // Make it available globally for other components
          window.sharedVectorStore = this.vectorStore;
        }
        
        console.log('✅ Vector Store initialized');
        this.updateStatus('📚 Vector Store ready for document management');
        this.updateDocumentStatus();
        this.updateGenerateButton();
      } else {
        console.warn('⚠️ VectorStore class not available');
        this.updateStatus('⚠️ Vector Store not available - document features disabled');
        this.updateDocumentStatus();
      }
    } catch (error) {
      console.error('❌ Vector Store initialization failed:', error);
      this.updateStatus('❌ Vector Store initialization failed: ' + error.message);
      
      // Disable vector store features if initialization fails
      this.vectorStore = null;
    }
  }
  
  setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    // Prevent duplicate event listeners by checking if already set up
    if (this.eventListenersSetup) {
      console.log('⚠️ Event listeners already set up, skipping');
      return;
    }
    // Wait for all required buttons to exist
    const tryAttach = () => {
      const exportBtn = document.getElementById('exportTimeCapsule');
      const loadBtn = document.getElementById('loadTimeCapsule');
      const loadInput = document.getElementById('loadTimeCapsuleInput');
      if (!exportBtn || !loadBtn || !loadInput) {
        console.log('[DEBUG] Waiting for TimeCapsule buttons to exist...');
        setTimeout(tryAttach, 100);
        return;
      }
      exportBtn.addEventListener('click', () => {
        console.log('[DEBUG] Export TimeCapsule button clicked');
        this.exportTimeCapsule();
      });
      loadBtn.addEventListener('click', () => {
        console.log('[DEBUG] Load TimeCapsule button clicked');
        loadInput.click();
      });
      loadInput.addEventListener('change', (e) => {
        console.log('[DEBUG] loadTimeCapsuleInput file selected');
        this.loadTimeCapsule(e);
      });
      this.eventListenersSetup = true;
      console.log('[DEBUG] TimeCapsule event listeners attached');
    };
    tryAttach();
    
    // AI Connection
    const connectBtn = document.getElementById('connectAI');
    console.log('🔍 connectAI button found:', !!connectBtn, connectBtn);
    
    if (connectBtn) {
      connectBtn.addEventListener('click', () => {
        console.log('🖱️ Connect AI button clicked - event listener triggered');
        this.connectAI();
      });
      console.log('✅ Connect AI event listener attached');
    } else {
      console.error('❌ Connect AI button not found in DOM');
    }
    
    // Topic Management
    document.getElementById('addTopic').addEventListener('click', () => this.addTopic());
    document.getElementById('topicTitle').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTopic();
    });
    
    // Research Actions
    document.getElementById('generateResearch').addEventListener('click', () => this.generateResearch());
    document.getElementById('exportResearch').addEventListener('click', () => this.exportResearch());
    document.getElementById('clearResearchOutput').addEventListener('click', () => this.clearResearchOutput());
    document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
    
    // AI Provider Selection
    document.getElementById('aiProviderSelect').addEventListener('change', () => this.updateAIProvider());
    
    // Document Management
    document.getElementById('uploadDocuments').addEventListener('click', () => this.showDocumentUpload());
    document.getElementById('uploadRepository').addEventListener('click', () => this.showRepositoryInput());
    document.getElementById('manageDocuments').addEventListener('click', () => this.showDocumentManager());
    document.getElementById('documentInput').addEventListener('change', (e) => this.handleDocumentUpload(e));
    
    // Mark as set up to prevent duplicates
    this.eventListenersSetup = true;
  }
  
  setupResizeHandle() {
    const resizeHandle = document.getElementById('resizeHandle');
    const container = document.querySelector('.container');
    let isResizing = false;
    let currentEditorFr = 1.2;
    let currentCanvasFr = 2.4;
    
    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      resizeHandle.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      
      const containerRect = container.getBoundingClientRect();
      const mousePosRelative = e.clientX - containerRect.left;
      const containerWidth = containerRect.width;
      const leftPanelWidth = 280 + 10; // Controls panel + gap
      const handleWidth = 6;
      const rightPanelStart = containerWidth - 10;
      
      const availableWidth = rightPanelStart - leftPanelWidth - handleWidth;
      const mouseInAvailable = mousePosRelative - leftPanelWidth;
      const editorRatio = Math.max(0.1, Math.min(0.9, mouseInAvailable / availableWidth));
      
      currentEditorFr = Math.max(0.4, Math.min(3.5, editorRatio * 3.9 + 0.1));
      currentCanvasFr = Math.max(0.4, Math.min(3.5, 4.0 - currentEditorFr));
      
      container.style.gridTemplateColumns = `280px ${currentEditorFr}fr 6px ${currentCanvasFr}fr`;
    });
    
    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        resizeHandle.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        this.updateStatus(`Layout: ${currentEditorFr.toFixed(1)}:${currentCanvasFr.toFixed(1)} ratio`);
      }
    });
    
    // Double-click to reset
    resizeHandle.addEventListener('dblclick', () => {
      currentEditorFr = 1.2;
      currentCanvasFr = 2.4;
      container.style.gridTemplateColumns = '280px 1.2fr 6px 2.4fr';
      this.updateStatus('Layout reset to default 1:2 ratio');
    });
  }
  
  setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });
  }
  
  setupPeriodicButtonCheck() {
    // Check button state every 2 seconds to ensure it's accurate
    // This handles cases where AI connection state changes but callbacks don't fire
    setInterval(() => {
      // Only update if not currently generating to avoid UI conflicts
      if (!this.isGenerating) {
        this.updateGenerateButton();
      }
    }, 2000);
    
    // Also do an initial check after a short delay to allow AI initialization
    setTimeout(() => {
      this.updateGenerateButton();
    }, 1000);
  }
  
  switchTab(tab) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    this.currentTab = tab;
    this.renderOutput();
  }
  
  async connectAI() {
    console.log('🚀 CONNECT AI BUTTON CLICKED - Method called!');
    
    const connectBtn = document.getElementById('connectAI');
    const provider = document.getElementById('aiProviderSelect').value;
    
    console.log('🔍 Connect AI Debug Info:');
    console.log('  - connectAI method executing');
    console.log('  - connectBtn element:', !!connectBtn);
    console.log('  - selected provider:', provider);
    console.log('  - this.aiAssistant exists:', !!this.aiAssistant);
    
    connectBtn.disabled = true;
    connectBtn.innerHTML = '<span class="loading-spinner"></span> Connecting...';
    
    try {
      // If AIAssistant wasn't available during init, try to initialize it now
      if (!this.aiAssistant) {
        console.log('🔄 AIAssistant not initialized during startup, attempting initialization...');
        
        // Try different possible class names
        const AIClass = window.AIAssistant || window.AIAssistantBackend;
        
        if (AIClass) {
          try {
            this.aiAssistant = new AIClass();
            this.aiAssistant.onStatusChange = (status) => this.updateAIStatus(status);
            console.log('✅ AIAssistant initialized on connect using:', AIClass.name);
          } catch (initError) {
            console.error('❌ Failed to initialize AIAssistant on connect:', initError);
            throw new Error('Failed to initialize AI Assistant: ' + initError.message);
          }
        } else {
          // Final check - see what's actually available
          console.error('🔍 Final debug - window.AIAssistant:', !!window.AIAssistant);
          console.error('🔍 window.AIAssistantBackend:', !!window.AIAssistantBackend);
          console.error('🔍 All AI-related globals:', Object.keys(window).filter(key => key.toLowerCase().includes('ai')));
          throw new Error('AI Assistant class not available. Please refresh the page and try again.');
        }
      }
      
      if (this.aiAssistant) {
        console.log(`🔌 Showing connection modal for ${provider}...`);
        
        // Set up callback to handle successful connection
        this.aiAssistant.onStatusChange = (status) => {
          console.log('🔄 AI Status callback received:', status);
          if (status.connected) {
            this.isConnected = true;
            this.updateStatus('🤖 AI Assistant connected successfully');
            this.updateGenerateButton();
            connectBtn.innerHTML = '✅ Connected';
            connectBtn.disabled = false;
          } else if (status.error) {
            this.updateStatus(`❌ AI connection failed: ${status.error}`);
            connectBtn.disabled = false;
          }
        };
        
        // Set the provider and show the configuration modal instead of connecting directly
        this.aiAssistant.setProvider(provider);
        this.aiAssistant.showAISelectionModal();
        
        this.updateStatus('⚙️ Please configure connection settings in the modal');
        connectBtn.disabled = false;
      } else {
        throw new Error('AI Assistant initialization failed');
      }
    } catch (error) {
      console.error('AI connection failed:', error);
      this.updateStatus('❌ AI connection failed: ' + error.message);
      
      // Show Ollama troubleshooting helper if it's an Ollama connection error
      if (provider === 'ollama' && this.isOllamaConnectionError(error.message)) {
        this.showOllamaTroubleshootingHelper(error.message);
      }
    } finally {
      connectBtn.disabled = false;
      this.updateConnectButtonText();
    }
  }
  
  updateAIProvider() {
    const provider = document.getElementById('aiProviderSelect').value;
    this.updateStatus(`🔄 AI Provider changed to ${provider}`);
    this.updateAIStatus({ connected: false, provider });
    this.updateConnectButtonText();
  }
  
  updateConnectButtonText() {
    const provider = document.getElementById('aiProviderSelect').value;
    const connectBtn = document.getElementById('connectAI');
    
    const providerLabels = {
      'ollama': '🦙 Connect Ollama',
      'lmstudio': '🏠 Connect LM Studio', 
      'openai': '🚀 Connect OpenAI',
      'local': '🧠 Connect Local Qwen'
    };
    
    connectBtn.innerHTML = providerLabels[provider] || '🔌 Connect AI';
  }
  
  updateAIStatus(status) {
    const statusEl = document.getElementById('aiStatus');
    const headerStatus = document.getElementById('headerAIStatus');
    
    console.log('🔄 AI Status Update:', status);
    
    if (status.connected) {
      statusEl.className = 'ai-status connected';
      statusEl.innerHTML = `<div>🤖 AI: Connected (${status.provider})</div>`;
      if (headerStatus) headerStatus.textContent = `AI Connected (${status.provider})`;
      this.updateStatus(`✅ AI Connected (${status.provider}) - Ready to generate research!`);
    } else if (status.error) {
      statusEl.className = 'ai-status error';
      statusEl.innerHTML = `<div>❌ AI: Error - ${status.error}</div>`;
      if (headerStatus) headerStatus.textContent = 'AI Error';
      this.updateStatus(`❌ AI Error: ${status.error}`);
    } else {
      statusEl.className = 'ai-status';
      statusEl.innerHTML = `<div>🤖 AI: Not Connected</div>`;
      if (headerStatus) headerStatus.textContent = 'AI Integration';
    }
    
    // Always update generate button when AI status changes
    this.updateGenerateButton();
    
    // Save AI connection state to help with button state persistence
    if (status.connected) {
      localStorage.setItem('deepResearch_aiConnected', JSON.stringify({
        connected: true,
        provider: status.provider,
        timestamp: Date.now()
      }));
    } else {
      localStorage.removeItem('deepResearch_aiConnected');
    }
  }
  
  addTopic() {
    const titleInput = document.getElementById('topicTitle');
    const descInput = document.getElementById('topicDescription');
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    
    if (!title) {
      this.updateStatus('❌ Please enter a topic title');
      return;
    }
    
    const topic = {
      id: Date.now(),
      title,
      description: description || 'No description provided',
      timestamp: new Date().toISOString()
    };
    
    this.topics.push(topic);
    this.renderTopics();
    this.updateGenerateButton();
    this.saveToStorage();
    
    // Clear inputs
    titleInput.value = '';
    descInput.value = '';
    
    this.updateStatus(`✅ Added topic: "${title}"`);
  }
  
  deleteTopic(topicId) {
    this.topics = this.topics.filter(topic => topic.id !== topicId);
    this.renderTopics();
    this.updateGenerateButton();
    this.saveToStorage();
    this.updateStatus('🗑️ Topic deleted');
  }
  
  selectTopic(topicId) {
    // Remove previous selection
    document.querySelectorAll('.structure-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    // Add selection to clicked item
    const selectedItem = document.querySelector(`[data-topic-id="${topicId}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }
    
    const topic = this.topics.find(t => t.id === topicId);
    if (topic) {
      this.updateStatus(`📌 Selected: ${topic.title}`);
    }
  }
  
  renderTopics() {
    const structureList = document.getElementById('structureList');
    
    if (this.topics.length === 0) {
      structureList.innerHTML = `
        <div class="empty-state">
          <h3>📝 No Topics Yet</h3>
          <p>Add research topics using the form on the left to build your research structure.</p>
        </div>
      `;
      return;
    }
    
    structureList.innerHTML = this.topics.map((topic, index) => `
      <div class="structure-item" data-topic-id="${topic.id}">
        <div class="structure-item-content" onclick="deepResearch.selectTopic(${topic.id})">
          <div class="structure-item-title">${index + 1}. ${topic.title}</div>
          <div class="structure-item-subtitle">${topic.description}</div>
        </div>
        <div class="structure-item-actions">
          <button class="action-btn" onclick="deepResearch.moveTopic(${topic.id}, 'up')" title="Move Up">↑</button>
          <button class="action-btn" onclick="deepResearch.moveTopic(${topic.id}, 'down')" title="Move Down">↓</button>
          <button class="action-btn delete" onclick="deepResearch.deleteTopic(${topic.id})" title="Delete">🗑️</button>
        </div>
      </div>
    `).join('');
  }
  
  moveTopic(topicId, direction) {
    const topicIndex = this.topics.findIndex(t => t.id === topicId);
    if (topicIndex === -1) return;
    
    const newIndex = direction === 'up' ? topicIndex - 1 : topicIndex + 1;
    
    if (newIndex < 0 || newIndex >= this.topics.length) return;
    
    // Swap topics
    [this.topics[topicIndex], this.topics[newIndex]] = [this.topics[newIndex], this.topics[topicIndex]];
    
    this.renderTopics();
    this.saveToStorage();
    this.updateStatus(`📋 Moved topic ${direction}`);
  }
  
  updateGenerateButton() {
    const generateBtn = document.getElementById('generateResearch');
    const hasTopics = this.topics.length > 0;
    
    // Check AI connection with fallback to stored state
    let hasAI = this.aiAssistant && this.aiAssistant.isConnected;
    
    // Fallback: check stored connection state if AI assistant check fails
    if (!hasAI) {
      try {
        const storedConnection = localStorage.getItem('deepResearch_aiConnected');
        if (storedConnection) {
          const connectionData = JSON.parse(storedConnection);
          // Consider connection valid if stored within last 30 minutes
          const connectionAge = Date.now() - connectionData.timestamp;
          hasAI = connectionData.connected && connectionAge < (30 * 60 * 1000);
          
          if (hasAI) {
            console.log('🔄 Using stored AI connection state as fallback');
          }
        }
      } catch (error) {
        console.warn('⚠️ Failed to check stored AI connection state:', error);
      }
    }
    
    const hasDocuments = this.vectorStore && this.vectorStore.isInitialized && 
                        this.vectorStore.collections && 
                        this.vectorStore.collections.documents &&
                        this.vectorStore.collections.documents.size > 0;
    
    generateBtn.disabled = !hasTopics || !hasAI || this.isGenerating;
    
    if (this.isGenerating) {
      if (hasDocuments) {
        generateBtn.innerHTML = '<span class="loading-spinner"></span> Generating with Documents...';
      } else {
        generateBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
      }
    } else if (!hasAI) {
      const provider = document.getElementById('aiProviderSelect').value;
      const providerNames = {
        'ollama': 'Ollama',
        'lmstudio': 'LM Studio', 
        'openai': 'OpenAI',
        'local': 'Local Qwen'
      };
      generateBtn.innerHTML = `🔌 Connect ${providerNames[provider] || 'AI'} First`;
    } else if (!hasTopics) {
      generateBtn.innerHTML = '📝 Add Topics First';
    } else {
      if (hasDocuments) {
        const docCount = this.vectorStore.collections.documents.size;
        generateBtn.innerHTML = `🚀 Generate Research (${docCount} docs)`;
      } else {
        generateBtn.innerHTML = '🚀 Generate Research';
      }
    }
    
    // Update document status indicator
    this.updateDocumentStatus();
  }
  
  updateDocumentStatus() {
    const statusIcon = document.getElementById('docStatusIcon');
    const statusText = document.getElementById('docStatusText');
    const statusDetails = document.getElementById('docStatusDetails');
    const statusContainer = document.getElementById('documentStatus');
    
    if (!statusIcon || !statusText || !statusDetails || !statusContainer) return;
    
    const hasDocuments = this.vectorStore && this.vectorStore.isInitialized && 
                        this.vectorStore.collections && 
                        this.vectorStore.collections.documents &&
                        this.vectorStore.collections.documents.size > 0;
    
    if (hasDocuments) {
      const stats = this.vectorStore.getStats();
      statusIcon.textContent = '📚';
      statusText.textContent = `${stats.documents} documents integrated`;
      statusDetails.textContent = `${stats.vectors} searchable chunks • ${stats.images} images • Enhanced research enabled`;
      statusContainer.style.background = 'rgba(76, 175, 80, 0.2)';
      statusContainer.style.borderColor = 'rgba(76, 175, 80, 0.5)';
    } else if (window.VECTOR_STORE_DISABLED) {
      statusIcon.textContent = '⚠️';
      statusText.textContent = 'Document features disabled';
      statusDetails.textContent = 'Transformers.js failed to load - refresh page to retry';
      statusContainer.style.background = 'rgba(255, 152, 0, 0.2)';
      statusContainer.style.borderColor = 'rgba(255, 152, 0, 0.5)';
    } else {
      statusIcon.textContent = '📂';
      statusText.textContent = 'No documents uploaded';
      statusDetails.textContent = 'Upload documents to enhance research with your content';
      statusContainer.style.background = 'rgba(255, 255, 255, 0.1)';
      statusContainer.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
  }
  
  async generateResearch() {
    // Check AI connection with more detailed error handling
    if (!this.aiAssistant) {
      this.updateStatus('❌ AI Assistant not initialized - please refresh the page and try again');
      return;
    }
    
    if (!this.aiAssistant.isConnected) {
      // Check if we have a stored connection state indicating recent connection
      try {
        const storedConnection = localStorage.getItem('deepResearch_aiConnected');
        if (storedConnection) {
          const connectionData = JSON.parse(storedConnection);
          const connectionAge = Date.now() - connectionData.timestamp;
          
          if (connectionData.connected && connectionAge < (30 * 60 * 1000)) {
            this.updateStatus('🔄 AI connection detected but not active - attempting to reconnect...');
            
            // Try to reconnect using stored provider
            try {
              await this.aiAssistant.initialize(connectionData.provider);
              this.updateStatus('✅ AI reconnected successfully');
            } catch (reconnectError) {
              console.error('Failed to reconnect AI:', reconnectError);
              this.updateStatus('❌ Failed to reconnect AI - please connect manually');
              localStorage.removeItem('deepResearch_aiConnected');
              this.updateGenerateButton();
              return;
            }
          } else {
            this.updateStatus('❌ Please connect AI first');
            return;
          }
        } else {
          this.updateStatus('❌ Please connect AI first');
          return;
        }
      } catch (error) {
        console.error('Error checking AI connection state:', error);
        this.updateStatus('❌ Please connect AI first');
        return;
      }
    }
    
    if (this.topics.length === 0) {
      this.updateStatus('❌ Please add at least one topic');
      return;
    }
    
    this.isGenerating = true;
    this.updateGenerateButton();
    
    try {
      const researchType = document.getElementById('researchType').value;
      const researchDepth = document.getElementById('researchDepth').value;
      
      // Check if documents are available
      const hasDocuments = this.vectorStore && this.vectorStore.isInitialized && 
                          this.vectorStore.collections && 
                          this.vectorStore.collections.documents &&
                          this.vectorStore.collections.documents.size > 0;
      
      if (hasDocuments) {
        const docCount = this.vectorStore.collections.documents.size;
        const vectorCount = this.vectorStore.collections.vectors.size;
        this.updateStatus(`🔍 Searching ${docCount} documents (${vectorCount} chunks) for relevant context...`);
      } else {
        this.updateStatus('🔄 Preparing research prompt...');
      }
      
      // Build research prompt with document integration
      const prompt = await this.buildResearchPrompt(researchType, researchDepth);
      
      if (hasDocuments) {
        this.updateStatus('🤖 Generating enhanced research report with document insights...');
      } else {
        this.updateStatus('🤖 Generating research content...');
      }
      
      // Generate research using AI
      const response = await this.aiAssistant.generateContent(prompt, 'research');
      
      console.log('🔍 Generated response:', {
        type: typeof response,
        hasContent: !!response?.content,
        responseLength: typeof response === 'string' ? response.length : 'N/A',
        preview: typeof response === 'string' ? response.substring(0, 100) + '...' : response
      });
      
      // Handle both string response and object response formats
      let content = '';
      if (typeof response === 'string' && response.trim()) {
        content = response.trim();
      } else if (response && response.content) {
        content = response.content;
      }
      
      if (content) {
        this.researchResults.research = content;
        this.researchResults.sources = this.generateSources(hasDocuments);
        this.researchResults.notes = this.generateNotes(hasDocuments);
        this.researchResults.timestamp = new Date().toISOString();
        this.researchResults.hasDocuments = hasDocuments;
        this.researchResults.documentCount = hasDocuments ? this.vectorStore.collections.documents.size : 0;
        
        console.log('✅ Research results stored, calling renderOutput()');
        this.renderOutput();
        this.saveToStorage();
        
        if (hasDocuments) {
          const docCount = this.vectorStore.collections.documents.size;
          this.updateStatus(`✅ Enhanced research report generated successfully with insights from ${docCount} documents!`);
        } else {
          this.updateStatus('✅ Research generated successfully!');
        }
      } else {
        console.error('❌ No valid content found in response:', response);
        throw new Error('No content generated - response was empty or invalid');
      }
    } catch (error) {
      console.error('Research generation failed:', error);
      this.updateStatus('❌ Research generation failed: ' + error.message);
    } finally {
      this.isGenerating = false;
      this.updateGenerateButton();
    }
  }
  
  async buildResearchPrompt(researchType, researchDepth) {
    const topicsList = this.topics.map((topic, index) => 
      `${index + 1}. ${topic.title} - ${topic.description}`
    ).join('\n');
    
    const depthInstructions = {
      overview: 'Provide a concise overview with key points and main insights.',
      detailed: 'Provide detailed analysis with comprehensive explanations and examples.',
      comprehensive: 'Provide comprehensive research with deep analysis, multiple perspectives, and extensive coverage.'
    };
    
    const typeInstructions = {
      academic: 'Focus on scholarly sources, theoretical frameworks, and rigorous analysis.',
      market: 'Focus on market trends, competitive landscape, and business implications.',
      technology: 'Focus on technical specifications, innovations, and future developments.',
      competitive: 'Focus on competitor analysis, market positioning, and strategic insights.',
      trend: 'Focus on emerging trends, future predictions, and impact analysis.',
      literature: 'Focus on existing literature, research findings, and knowledge synthesis.'
    };
    
    // Enhanced document context retrieval
    let contextSection = '';
    let documentStats = '';
    
    if (this.vectorStore && this.vectorStore.isInitialized) {
      try {
        console.log('🔍 Searching for relevant context in knowledge base...');
        
        // Get knowledge base statistics
        const stats = this.vectorStore.getStats();
        if (stats.documents > 0) {
          documentStats = `\n📊 Knowledge Base Available: ${stats.documents} documents, ${stats.vectors} searchable chunks, ${stats.images} images`;
        }
        
        // Enhanced search strategy: search for each topic individually and combine results
        const allSearches = [];
        
        // Search 1: Combined topics (general context)
        const allTopicsText = this.topics.map(t => `${t.title} ${t.description}`).join(' ');
        allSearches.push(
          this.vectorStore.search(allTopicsText, {
            limit: 8,
            minSimilarity: 0.25 // Lower threshold for broader context
          }).then(results => ({ type: 'general', results }))
        );
        
        // Search 2: Individual topic searches (specific context)
        for (const topic of this.topics) {
          const topicQuery = `${topic.title} ${topic.description}`;
          allSearches.push(
            this.vectorStore.search(topicQuery, {
              limit: 3,
              minSimilarity: 0.3
            }).then(results => ({ type: 'specific', topic: topic.title, results }))
          );
        }
        
        // Search 3: Research type specific search
        const typeKeywords = {
          academic: 'research study analysis method methodology findings conclusion',
          market: 'market trends competition business industry analysis revenue growth',
          technology: 'technology innovation development technical specifications features',
          competitive: 'competitor competition analysis market share strategy positioning',
          trend: 'trend emerging future prediction forecast development pattern',
          literature: 'literature review research paper study findings analysis summary'
        };
        
        if (typeKeywords[researchType]) {
          allSearches.push(
            this.vectorStore.search(typeKeywords[researchType], {
              limit: 4,
              minSimilarity: 0.2
            }).then(results => ({ type: 'domain', results }))
          );
        }
        
        // Execute all searches with increased timeout for complex document sets
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Context search timeout - document search took too long')), 45000);
        });
        
        console.log(`🔍 Starting enhanced search across ${allSearches.length} search queries...`);
        
        const searchResults = await Promise.race([
          Promise.allSettled(allSearches),
          timeoutPromise
        ]);
        
        // Process and deduplicate results
        const allRelevantDocs = new Map(); // Use Map to deduplicate by document + chunk
        let totalResults = 0;
        
        for (const searchResult of searchResults) {
          if (searchResult.status === 'fulfilled' && searchResult.value.results) {
            const { type, topic, results } = searchResult.value;
            
            for (const doc of results) {
              const key = `${doc.documentId}_${doc.chunkIndex}`;
              if (!allRelevantDocs.has(key) || allRelevantDocs.get(key).similarity < doc.similarity) {
                allRelevantDocs.set(key, {
                  ...doc,
                  searchType: type,
                  relatedTopic: topic
                });
              }
            }
            totalResults += results.length;
          }
        }
        
        // Sort by similarity and take top results
        const sortedDocs = Array.from(allRelevantDocs.values())
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 15); // Increased limit for more comprehensive context
        
        if (sortedDocs.length > 0) {
          const highRelevance = sortedDocs.filter(doc => doc.similarity >= 0.4);
          const mediumRelevance = sortedDocs.filter(doc => doc.similarity >= 0.25 && doc.similarity < 0.4);
          const lowRelevance = sortedDocs.filter(doc => doc.similarity < 0.25);
          
          contextSection = `

📚 KNOWLEDGE BASE CONTEXT (${sortedDocs.length} relevant excerpts found):

${highRelevance.length > 0 ? `🔴 HIGH RELEVANCE SOURCES (${highRelevance.length}):
${highRelevance.map((doc, index) => 
  `${index + 1}. 📄 "${doc.document?.name || 'Unknown Document'}" (Chunk ${doc.chunkIndex + 1}, ${(doc.similarity * 100).toFixed(1)}% match)
   ${doc.relatedTopic ? `🎯 Related to: ${doc.relatedTopic}` : ''}
   💡 Content: "${doc.content.substring(0, 400)}${doc.content.length > 400 ? '...' : ''}"`
).join('\n\n')}

` : ''}${mediumRelevance.length > 0 ? `🟡 MEDIUM RELEVANCE SOURCES (${mediumRelevance.length}):
${mediumRelevance.map((doc, index) => 
  `${index + 1}. 📄 "${doc.document?.name || 'Unknown Document'}" (${(doc.similarity * 100).toFixed(1)}% match)
   💡 "${doc.content.substring(0, 300)}${doc.content.length > 300 ? '...' : ''}"`
).join('\n\n')}

` : ''}${lowRelevance.length > 0 ? `🟢 SUPPORTING SOURCES (${lowRelevance.length}):
${lowRelevance.slice(0, 5).map((doc, index) => 
  `${index + 1}. 📄 "${doc.document?.name || 'Unknown Document'}" (${(doc.similarity * 100).toFixed(1)}% match)
   💡 "${doc.content.substring(0, 200)}${doc.content.length > 200 ? '...' : ''}"`
).join('\n\n')}

` : ''}🎯 RESEARCH INSTRUCTION: Please carefully analyze and incorporate insights from the above document excerpts into your research. Use specific quotes, data points, and findings from these sources to support your analysis. Reference the document names when citing information.`;
          
          console.log(`✅ Enhanced context search found ${sortedDocs.length} relevant excerpts from ${totalResults} total matches`);
          console.log(`📊 Relevance breakdown: ${highRelevance.length} high, ${mediumRelevance.length} medium, ${lowRelevance.length} supporting`);
        } else {
          console.log('ℹ️ No relevant context found in knowledge base');
        }
      } catch (error) {
        console.warn('⚠️ Failed to retrieve context from vector store:', error);
        if (error.message.includes('timeout')) {
          console.warn('⚠️ Context search timed out after 45 seconds - continuing without document context');
          contextSection = `

⚠️ DOCUMENT SEARCH TIMEOUT NOTICE:
The search through your uploaded documents took too long and was cancelled to prevent the application from freezing. 
This may happen with large document collections or complex queries.

Research will continue using general AI knowledge. To improve performance:
- Consider reducing the number of uploaded documents
- Upload smaller, more focused documents
- Try searching with more specific topics

`;
        } else {
          contextSection = `

⚠️ DOCUMENT SEARCH ERROR:
An error occurred while searching your uploaded documents: ${error.message}
Research will continue using general AI knowledge only.

`;
        }
      }
    }
    
    return `
# 🔬 ${researchType.toUpperCase()} RESEARCH REQUEST

## 📋 Research Scope & Context${documentStats}
**Research Topics:**
${topicsList}

**Research Type:** ${researchType} research
**Depth Level:** ${researchDepth}
**AI Analysis:** Enhanced with document knowledge base integration

## 📚 Research Guidelines
${typeInstructions[researchType]}
${depthInstructions[researchDepth]}${contextSection}

## 📝 Required Output Structure
Please provide a comprehensive research report in markdown format with the following sections:

### 1. 🎯 Executive Summary
- Brief overview of key findings from both general knowledge and uploaded documents
- Primary insights and conclusions
- Critical recommendations

### 2. 📊 Individual Topic Analysis
For each research topic:
- **Topic Background:** Context and importance
- **Key Findings:** From both AI knowledge and document sources
- **Supporting Evidence:** Specific quotes and data from uploaded documents
- **Analysis:** Detailed examination with citations
- **Document References:** Which specific documents provided insights

### 3. 🔗 Cross-Topic Insights & Connections
- Relationships and patterns across topics
- Synergies and conflicts identified
- Integrated analysis from multiple document sources

### 4. 📈 Key Findings & Evidence
- Major discoveries and insights
- Statistical data and metrics (from documents when available)
- Quotes and specific references from uploaded materials
- Validation of findings across multiple sources

### 5. 💡 Implications & Impact Assessment
- Strategic implications
- Potential risks and opportunities
- Market/technological/academic impact (based on research type)

### 6. 🎯 Actionable Recommendations
- Specific, actionable next steps
- Prioritized recommendations
- Implementation considerations
- Areas requiring further research

### 7. 📚 Source Integration Summary
- Overview of how uploaded documents contributed to the analysis
- Key document insights that shaped conclusions
- Areas where additional documentation would be beneficial

## 🎯 Special Instructions:
1. **Document Integration:** Actively incorporate and cite specific content from the uploaded documents
2. **Evidence-Based:** Support all major points with evidence from the knowledge base when available
3. **Citation Format:** Use document names and page/chunk references: *"According to [Document Name] (Chunk X)..."*
4. **Cross-Reference:** Connect insights across different documents and topics
5. **Quality Assessment:** Note the strength of evidence and any limitations in the available documentation
6. **Professional Tone:** Maintain academic/professional standards appropriate for ${researchType} research

Generate a thorough, well-structured research report that seamlessly integrates your AI knowledge with the specific insights from the uploaded documents.
    `.trim();
  }
  
  generateSources(hasDocuments = false) {
    const docInfo = hasDocuments && this.vectorStore ? this.vectorStore.getStats() : null;
    
    return `# 📚 Research Sources

## Methodology
This research was conducted using AI analysis and synthesis combining:
1. **General AI Knowledge**: Trained knowledge base and reasoning capabilities
${hasDocuments ? `2. **Uploaded Document Knowledge Base**: ${docInfo.documents} uploaded documents with ${docInfo.vectors} searchable text chunks
3. **Semantic Search Integration**: Vector-based similarity matching to find relevant content` : '2. **Public Knowledge**: Established information and best practices'}

${hasDocuments ? `## 📄 Document Integration
- **Documents Analyzed**: ${docInfo.documents} files
- **Content Chunks**: ${docInfo.vectors} searchable segments  
- **Images/Media**: ${docInfo.images} visual elements catalogued
- **Search Strategy**: Multi-tiered semantic search with relevance scoring
- **Integration Method**: Context-aware AI synthesis with direct document citations

## 📊 Document Sources
The following types of documents were integrated into this research:
${this.vectorStore ? this.getDocumentSourcesSummary() : 'Document information not available'}

` : ''}## Source Categories
- **AI Knowledge Base**: Core training data and reasoning capabilities
- **Academic Literature**: Scholarly articles and research papers (general knowledge)
- **Industry Reports**: Market analysis and industry publications (general knowledge)
- **Technology Documentation**: Technical specifications and whitepapers (general knowledge)
- **News and Media**: Current events and trending topics (general knowledge)
- **Government Data**: Public datasets and official statistics (general knowledge)
${hasDocuments ? `- **Uploaded Documents**: User-provided materials with direct content extraction and analysis
- **Document Citations**: Specific references to uploaded materials with chunk-level precision` : ''}

## Reliability Assessment
${hasDocuments ? `**High Reliability**: Direct quotes and data from uploaded documents provide primary source validation.
**Medium Reliability**: AI synthesis of uploaded content with cross-document validation.
**Standard Reliability**: General AI knowledge cross-referenced where possible.` : `All information has been cross-referenced and validated against multiple sources where possible.`}

Please verify critical information independently for your specific use case.

## Data Currency
Research generated on: ${new Date().toLocaleDateString()}
Topics analyzed: ${this.topics.length}
${hasDocuments ? `Documents integrated: ${docInfo.documents}
Vector embeddings: ${docInfo.vectors}` : ''}

${hasDocuments ? `*Note: This research integrates both AI knowledge and your specific uploaded documents for enhanced accuracy and relevance.*` : `*Note: This AI-generated research should be used as a starting point for further investigation.*`}`;
  }
  
  generateNotes(hasDocuments = false) {
    const topicNotes = this.topics.map((topic, index) => 
      `## ${index + 1}. ${topic.title}\n- **Description**: ${topic.description}\n- **Added**: ${new Date(topic.timestamp).toLocaleDateString()}\n- **Status**: Analyzed ✅${hasDocuments ? '\n- **Document Integration**: Enhanced with uploaded document context' : ''}\n`
    ).join('\n');
    
    const docInfo = hasDocuments && this.vectorStore ? this.vectorStore.getStats() : null;
    
    return `# 📝 Research Notes

${topicNotes}

## Research Parameters
- **Type**: ${document.getElementById('researchType').value}
- **Depth**: ${document.getElementById('researchDepth').value}
- **Generated**: ${new Date().toLocaleString()}
- **AI Provider**: ${document.getElementById('aiProviderSelect').value}
${hasDocuments ? `- **Document Integration**: ${docInfo.documents} documents, ${docInfo.vectors} searchable chunks
- **Vector Store**: Semantic search enabled with similarity matching` : '- **Document Integration**: No documents uploaded'}

${hasDocuments ? `## 📚 Document Analysis Summary
- **Total Documents**: ${docInfo.documents}
- **Content Chunks**: ${docInfo.vectors} (processed for semantic search)
- **Images/Media**: ${docInfo.images}
- **Integration Method**: Multi-tier semantic search with context extraction
- **Search Strategy**: 
  - General topic search (broader context)
  - Individual topic analysis (specific insights)
  - Research type keywords (domain-specific content)
- **Citation Format**: Document name + chunk reference for traceability

## 🔍 Document Quality Assessment
${this.vectorStore ? this.getDocumentQualityNotes() : 'Assessment not available'}

` : ''}## Next Steps
- [ ] Review and validate key findings
${hasDocuments ? '- [ ] Cross-reference document citations for accuracy' : ''}
- [ ] Conduct additional research on specific areas
${hasDocuments ? '- [ ] Upload additional relevant documents if needed' : '- [ ] Consider uploading relevant documents for enhanced analysis'}
- [ ] Share results with stakeholders
- [ ] Plan follow-up research phases
${hasDocuments ? '- [ ] Update document knowledge base as new information becomes available' : ''}

## Export Options
Use the "Export Results" button to save this research in various formats for sharing and archival purposes.

${hasDocuments ? `## 💡 Research Enhancement Tips
- **Document Coverage**: Review if additional documents could strengthen the analysis
- **Citation Verification**: Cross-check quoted content against original documents
- **Context Validation**: Ensure document excerpts maintain original meaning
- **Source Diversity**: Consider adding documents from different perspectives or time periods` : `## 💡 Research Enhancement Tips
- **Add Documents**: Upload relevant PDFs, Word docs, or text files to enhance analysis
- **Multiple Perspectives**: Include documents from various sources and viewpoints
- **Current Information**: Add recent reports or articles for up-to-date insights`}`;
  }
  
  getDocumentSourcesSummary() {
    if (!this.vectorStore || !this.vectorStore.collections) return 'No documents available';
    
    const docs = Array.from(this.vectorStore.collections.documents.values());
    const typeCount = {};
    
    docs.forEach(doc => {
      const ext = doc.name.toLowerCase().split('.').pop();
      const category = this.getDocumentCategory(ext);
      typeCount[category] = (typeCount[category] || 0) + 1;
    });
    
    return Object.entries(typeCount)
      .map(([category, count]) => `- **${category}**: ${count} file(s)`)
      .join('\n');
  }
  
  getDocumentCategory(extension) {
    const categories = {
      'pdf': 'PDF Documents',
      'doc': 'Word Documents', 'docx': 'Word Documents',
      'xls': 'Spreadsheets', 'xlsx': 'Spreadsheets',
      'ppt': 'Presentations', 'pptx': 'Presentations',
      'txt': 'Text Files', 'md': 'Markdown Files',
      'js': 'Code Files', 'py': 'Code Files', 'html': 'Code Files', 'css': 'Code Files',
      'json': 'Data Files', 'xml': 'Data Files', 'csv': 'Data Files',
      'jpg': 'Images', 'jpeg': 'Images', 'png': 'Images', 'gif': 'Images'
    };
    
    return categories[extension] || 'Other Files';
  }
  
  getDocumentQualityNotes() {
    if (!this.vectorStore || !this.vectorStore.collections) return 'Assessment not available';
    
    const docs = Array.from(this.vectorStore.collections.documents.values());
    const vectors = Array.from(this.vectorStore.collections.vectors.values());
    
    let totalChunks = vectors.length;
    let avgChunkSize = 0;
    
    if (vectors.length > 0) {
      avgChunkSize = Math.round(vectors.reduce((sum, v) => sum + (v.content?.length || 0), 0) / vectors.length);
    }
    
    return `- **Processing Quality**: ${totalChunks} text chunks extracted successfully
- **Average Chunk Size**: ~${avgChunkSize} characters per chunk
- **Searchability**: All text content indexed for semantic search
- **Content Distribution**: Evenly distributed across ${docs.length} source documents
- **Recommendation**: ${totalChunks > 50 ? 'Excellent' : totalChunks > 20 ? 'Good' : 'Limited'} document coverage for comprehensive analysis`;
  }
  
  renderOutput() {
    const outputContent = document.getElementById('outputContent');
    const content = this.researchResults[this.currentTab];
    
    if (content) {
      outputContent.innerHTML = marked.parse(content);
      
      // Apply syntax highlighting to code blocks
      outputContent.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    } else {
      this.renderEmptyOutput();
    }
  }
  
  renderEmptyOutput() {
    const outputContent = document.getElementById('outputContent');
    outputContent.innerHTML = `
      <div class="empty-state">
        <h3>🌟 Welcome to Deep Research Studio</h3>
        <p>This AI-powered platform helps you conduct comprehensive research and analysis.</p>
        
        <h3>🚀 Quick Start Guide:</h3>
        <ol>
          <li>Connect to your preferred AI provider</li>
          <li>Add research topics using the left panel</li>
          <li>Select your research type and depth</li>
          <li>Click "Generate Research" to begin analysis</li>
          <li>Review AI-generated content in markdown format</li>
        </ol>
        
        <h3>✨ Features:</h3>
        <ul>
          <li><strong>Multiple AI Providers:</strong> Ollama, LM Studio, OpenAI API, Local Qwen</li>
          <li><strong>Research Types:</strong> Academic, Market, Technology, Competitive, Trend Analysis</li>
          <li><strong>Structured Approach:</strong> Build topic hierarchies for comprehensive research</li>
          <li><strong>Markdown Output:</strong> Professional formatting with syntax highlighting</li>
          <li><strong>Export Options:</strong> Save and share your research results</li>
        </ul>
      </div>
    `;
  }
  
  exportResearch() {
    if (!this.researchResults.research) {
      this.updateStatus('❌ No research to export - generate research first');
      return;
    }
    
    const exportData = {
      topics: this.topics,
      results: this.researchResults,
      metadata: {
        researchType: document.getElementById('researchType').value,
        researchDepth: document.getElementById('researchDepth').value,
        aiProvider: document.getElementById('aiProviderSelect').value,
        exportDate: new Date().toISOString()
      }
    };
    
    // Create markdown export
    const markdownContent = `# Deep Research Studio Export

## Research Overview
- **Type**: ${exportData.metadata.researchType}
- **Depth**: ${exportData.metadata.researchDepth}
- **Generated**: ${new Date(exportData.metadata.exportDate).toLocaleString()}
- **Topics**: ${this.topics.length}

## Topics Analyzed
${this.topics.map((topic, index) => `${index + 1}. **${topic.title}** - ${topic.description}`).join('\n')}

---

${this.researchResults.research}

---

${this.researchResults.sources}

---

${this.researchResults.notes}
`;
    
    // Download as markdown file
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deep-research-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.updateStatus('📥 Research exported successfully');
  }
  
  clearResearchOutput() {
    if (Object.keys(this.researchResults).length === 0) {
      this.updateStatus('⚠️ No research output to clear');
      return;
    }
    
    if (confirm('Are you sure you want to clear the research output? Your topics will be preserved.')) {
      this.researchResults = {};
      this.renderEmptyOutput();
      this.saveToStorage();
      this.updateStatus('🗑️ Research output cleared - topics preserved');
    }
  }
  
  clearAll() {
    if (confirm('Are you sure you want to clear all topics and research results?')) {
      this.topics = [];
      this.researchResults = {};
      this.renderTopics();
      this.renderEmptyOutput();
      this.updateGenerateButton();
      this.saveToStorage();
      this.updateStatus('🗑️ All data cleared');
    }
  }
  
  saveToStorage() {
    try {
      const data = {
        topics: this.topics,
        researchResults: this.researchResults,
        settings: {
          researchType: document.getElementById('researchType').value,
          researchDepth: document.getElementById('researchDepth').value,
          aiProvider: document.getElementById('aiProviderSelect').value
        }
      };
      localStorage.setItem('deepResearchData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }
  
  loadFromStorage() {
    try {
      const data = localStorage.getItem('deepResearchData');
      if (data) {
        const parsed = JSON.parse(data);
        this.topics = parsed.topics || [];
        this.researchResults = parsed.researchResults || {};
        
        if (parsed.settings) {
          document.getElementById('researchType').value = parsed.settings.researchType || 'academic';
          document.getElementById('researchDepth').value = parsed.settings.researchDepth || 'detailed';
          document.getElementById('aiProviderSelect').value = parsed.settings.aiProvider || 'ollama';
        }
        
        this.renderTopics();
        if (this.researchResults.research) {
          this.renderOutput();
        }
        this.updateGenerateButton();
        this.updateDocumentStatus();
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  }
  
  updateStatus(message) {
    const statusBar = document.getElementById('statusBar');
    statusBar.textContent = message;
    
    // Auto-hide status after 5 seconds
    clearTimeout(this.statusTimeout);
    this.statusTimeout = setTimeout(() => {
      statusBar.textContent = 'Ready to research';
    }, 5000);
  }
  
  // Document Management Methods
  showDocumentUpload() {
    if (!this.vectorStore) {
      if (window.VECTOR_STORE_DISABLED) {
        this.updateStatus('❌ Document features disabled - Transformers.js failed to load');
      } else {
        this.updateStatus('❌ Vector Store not initialized');
      }
      return;
    }
    document.getElementById('documentInput').click();
  }
  
  async handleDocumentUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    try {
      this.updateStatus(`📄 Uploading ${files.length} document(s)...`);
      
      const results = await this.vectorStore.addDocuments(files);
      
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      let message = `✅ Uploaded ${successful} document(s)`;
      if (failed > 0) {
        message += `, ${failed} failed`;
      }
      
      this.updateStatus(message);
      this.updateDocumentStatus();
      this.updateGenerateButton();
      
      // Clear file input
      event.target.value = '';
      
    } catch (error) {
      console.error('❌ Document upload failed:', error);
      this.updateStatus('❌ Document upload failed: ' + error.message);
    }
  }
  
  showRepositoryInput() {
    this.updateStatus('🚧 GitHub repository integration coming soon! Please use "📄 Upload Documents" for now.');
  }
  
  async handleRepositoryUpload(repoUrl) {
    this.updateStatus('🚧 GitHub repository integration coming soon! Please upload individual files for now.');
  }
  
  showDocumentManager() {
    if (!this.vectorStore) {
      if (window.VECTOR_STORE_DISABLED) {
        alert('❌ Document features are disabled because Transformers.js failed to load.\n\nPlease:\n1. Check your internet connection\n2. Refresh the page\n3. Wait for the embedding model to download (~23MB)');
      } else {
        this.updateStatus('❌ Vector Store not initialized');
      }
      return;
    }
    
    // Prevent multiple modals from opening - improved check
    const existingModal = document.getElementById('documentModal') || document.querySelector('.document-modal');
    if (this.documentModalOpen || existingModal) {
      console.log('📚 Document modal already open, bringing to front');
      if (existingModal) {
        existingModal.style.zIndex = '3000';
        existingModal.scrollIntoView();
      }
      return;
    }
    
    this.documentModalOpen = true;
    this.createDocumentModal();
  }
  
  async createDocumentModal() {
    const modal = document.createElement('div');
    modal.className = 'document-modal';
    modal.id = 'documentModal';
    
    modal.innerHTML = `
      <div class="document-modal-content">
        <div class="document-modal-header">
          <h2>📚 Knowledge Base Manager</h2>
          <button class="close-modal" onclick="deepResearch.closeDocumentModal()">✕</button>
        </div>
        
        <div class="vector-stats">
          <h3>📊 Vector Store Statistics</h3>
          <div class="stats-grid" id="vectorStats">
            <div class="stat-item">
              <div class="stat-value" id="statDocuments">0</div>
              <div class="stat-label">Documents</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="statVectors">0</div>
              <div class="stat-label">Embeddings</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="statImages">0</div>
              <div class="stat-label">Images</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="statRepositories">0</div>
              <div class="stat-label">Repositories</div>
            </div>
          </div>
        </div>
        
        <div class="upload-area" id="uploadArea">
          <h3>📄 Upload Documents</h3>
          <p>Drag & drop files here or click to browse</p>
          <p style="font-size: 12px; color: rgba(255,255,255,0.7);">
            Supported: .txt, .md, .js, .py, .html, .css, .json, .xml, .csv, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .png, .gif
          </p>
          <input type="file" id="modalDocumentInput" multiple accept=".txt,.md,.js,.py,.html,.css,.json,.xml,.csv,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.bmp,.webp" style="display: none;">
        </div>
        
        <div>
          <h3>📦 Add GitHub Repository</h3>
          <p style="font-size: 14px; color: rgba(255,152,0,0.8); margin-bottom: 10px;">
            🚧 GitHub integration coming soon! For now, please upload individual files.
          </p>
          <input type="text" class="repository-input" id="repositoryUrl" 
                 placeholder="https://github.com/owner/repository" disabled>
          <button class="btn primary" onclick="deepResearch.addRepositoryFromModal()" disabled>📦 Add Repository</button>
          <p style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 8px;">
            Feature under development. Will support: .md, .txt, .js, .py, .html, .css, .json, .yml
          </p>
        </div>
        
        <div>
          <h3>📄 Uploaded Documents</h3>
          <div class="document-list" id="documentList">
            <div style="text-align: center; padding: 20px; color: rgba(255,255,255,0.7);">
              Loading documents...
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn secondary" onclick="deepResearch.quickSearch()">⚡ Quick Search</button>
          <button class="btn secondary" onclick="deepResearch.searchDocuments()">🔍 Advanced Search</button>
          <button class="btn secondary" onclick="deepResearch.exportVectorStore()">📥 Export Data</button>
          <button class="btn" style="background: rgba(255,69,0,0.3);" onclick="deepResearch.clearVectorStore()">🗑️ Clear All</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup upload area
    this.setupUploadArea();
    
    // Load and display documents
    await this.loadDocumentList();
    
    // Update statistics
    this.updateVectorStats();
    
    // Add click-outside-to-close functionality
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeDocumentModal();
      }
    });
    
    // Add smooth show animation
    setTimeout(() => {
      modal.classList.add('show');
      modal.style.opacity = '1';
    }, 10);
  }
  
  setupUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('modalDocumentInput');
    
    if (!uploadArea || !fileInput) {
      console.error('❌ Upload area elements not found');
      return;
    }
    
    // Remove existing event listeners to prevent duplicates
    const newUploadArea = uploadArea.cloneNode(true);
    const newFileInput = fileInput.cloneNode(true);
    
    uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
    fileInput.parentNode.replaceChild(newFileInput, fileInput);
    
    // Add fresh event listeners
    newUploadArea.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('📁 Upload area clicked, opening file dialog');
      newFileInput.click();
    });
    
    newFileInput.addEventListener('change', async (e) => {
      console.log('📄 Files selected:', e.target.files.length);
      if (e.target.files.length > 0) {
        await this.handleModalDocumentUpload(e);
      }
    });
    
    // Drag and drop functionality
    newUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      newUploadArea.classList.add('dragover');
    });
    
    newUploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      newUploadArea.classList.remove('dragover');
    });
    
    newUploadArea.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      newUploadArea.classList.remove('dragover');
      
      console.log('📂 Files dropped:', e.dataTransfer.files.length);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        await this.handleModalDocumentUpload({ target: { files } });
      }
    });
    
    console.log('✅ Upload area event listeners set up');
  }
  
  async handleModalDocumentUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    // Prevent concurrent uploads
    if (this.isUploading) {
      console.log('⚠️ Upload already in progress, ignoring new upload');
      this.updateStatus('⚠️ Upload already in progress, please wait...');
      return;
    }
    
    this.isUploading = true;
    
    try {
      console.log(`📄 Starting upload of ${files.length} files`);
      
      const uploadArea = document.getElementById('uploadArea');
      if (!uploadArea) {
        console.error('❌ Upload area not found');
        return;
      }
      
      // Show progress with file names
      const fileNames = files.map(f => f.name).join(', ');
      uploadArea.innerHTML = `
        <h3>📄 Uploading ${files.length} document(s)...</h3>
        <div class="loading-spinner"></div>
        <div style="font-size: 12px; margin-top: 10px; color: rgba(255,255,255,0.8);">
          ${fileNames.length > 100 ? fileNames.substring(0, 100) + '...' : fileNames}
        </div>
        <div style="font-size: 10px; margin-top: 5px; color: rgba(255,255,255,0.6);">
          Processing... This may take a moment for large files.
        </div>
      `;
      
      // Process files one by one to prevent UI freezing
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        try {
          console.log(`📄 Processing file ${i + 1}/${files.length}: ${file.name}`);
          
          // Update progress
          uploadArea.querySelector('h3').textContent = `📄 Processing ${file.name} (${i + 1}/${files.length})...`;
          
          // Yield control to prevent UI freezing
          await new Promise(resolve => setTimeout(resolve, 10));
          
          const docId = await this.vectorStore.addDocument(file);
          results.push({ success: true, docId, fileName: file.name });
          
          console.log(`✅ Successfully processed: ${file.name}`);
          
        } catch (fileError) {
          console.error(`❌ Failed to process ${file.name}:`, fileError);
          results.push({ success: false, error: fileError.message, fileName: file.name });
        }
      }
      
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      // Reset upload area
      uploadArea.innerHTML = `
        <h3>📄 Upload Documents</h3>
        <p>Drag & drop files here or click to browse</p>
        <p style="font-size: 12px; color: rgba(255,255,255,0.7);">
          Supported: .txt, .md, .js, .py, .html, .css, .json, .xml, .csv, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .png, .gif
        </p>
        <input type="file" id="modalDocumentInput" multiple accept=".txt,.md,.js,.py,.html,.css,.json,.xml,.csv,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.bmp,.webp" style="display: none;">
      `;
      
      // Re-setup upload area
      this.setupUploadArea();
      
      // Reload document list and stats
      await this.loadDocumentList();
      this.updateVectorStats();
      this.updateDocumentStatus();
      this.updateGenerateButton();
      
      let message = `✅ Uploaded ${successful} document(s)`;
      if (failed > 0) {
        message += `, ${failed} failed`;
        console.log('❌ Failed files:', results.filter(r => !r.success));
      }
      
      this.updateStatus(message);
      
      // Clear file input to allow re-uploading same files
      try {
        // Find the current file input element (in case it was replaced)
        const currentFileInput = document.getElementById('modalDocumentInput');
        if (currentFileInput) {
          currentFileInput.value = '';
          console.log('📄 File input cleared successfully');
        } else if (event.target) {
          event.target.value = '';
          console.log('📄 Original file input cleared successfully');
        }
      } catch (clearError) {
        console.log('ℹ️ Could not clear file input (not critical):', clearError.message);
      }
      
    } catch (error) {
      console.error('❌ Modal document upload failed:', error);
      this.updateStatus('❌ Document upload failed: ' + error.message);
      
      // Try to reset upload area even on error
      try {
        const uploadArea = document.getElementById('uploadArea');
        if (uploadArea) {
          uploadArea.innerHTML = `
            <h3 style="color: rgba(255,69,0,0.8);">❌ Upload Failed</h3>
            <p>${error.message}</p>
            <button class="btn secondary" onclick="location.reload()">🔄 Refresh Page</button>
          `;
        }
      } catch (resetError) {
        console.error('❌ Failed to reset upload area:', resetError);
      }
    } finally {
      // Always reset upload state
      this.isUploading = false;
      console.log('📄 Upload process completed, state reset');
    }
  }
  
  async loadDocumentList() {
    const documentList = document.getElementById('documentList');
    
    try {
      // Check if vector store is properly initialized
      if (!this.vectorStore || !this.vectorStore.isInitialized) {
        documentList.innerHTML = `
          <div style="text-align: center; padding: 20px; color: rgba(255,152,0,0.8);">
            ⚠️ Vector Store not initialized. Please refresh the page and try again.
          </div>
        `;
        return;
      }
      
      // Check if collections exist
      if (!this.vectorStore.collections || !this.vectorStore.collections.documents) {
        documentList.innerHTML = `
          <div style="text-align: center; padding: 20px; color: rgba(255,152,0,0.8);">
            ⚠️ Vector Store collections not ready. Please refresh the page and try again.
          </div>
        `;
        return;
      }
      
      const documents = await this.vectorStore.getAllDocuments();
      
      if (!documents || documents.length === 0) {
        documentList.innerHTML = `
          <div style="text-align: center; padding: 20px; color: rgba(255,255,255,0.7);">
            <h3>📁 No Documents Yet</h3>
            <p>Upload documents using the area above to get started.</p>
            <p style="font-size: 12px; margin-top: 15px; color: rgba(255,255,255,0.5);">
              <strong>Supported Types:</strong><br>
              📄 Text: .txt, .md, .js, .py, .html, .css, .json, .xml, .csv<br>
              📊 Office: .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx<br>
              🖼️ Images: .jpg, .png, .gif, .webp, .bmp
            </p>
          </div>
        `;
        return;
      }
      
      documentList.innerHTML = documents.map(doc => {
        // Count chunks for this document
        const chunkCount = Array.from(this.vectorStore.collections.vectors.values())
          .filter(vector => vector.documentId === doc.id).length;
        
        return `
          <div class="document-item">
            <div class="document-info">
              <div class="document-name">
                ${doc.type === 'image' ? '🖼️' : doc.type === 'office' ? '📊' : '📄'} ${doc.name}
              </div>
              <div class="document-meta">
                Type: ${doc.type} • Size: ${this.formatFileSize(doc.size)} • Added: ${new Date(doc.createdAt).toLocaleDateString()}
                ${chunkCount > 0 ? `<br>📑 Processed into ${chunkCount} searchable chunk${chunkCount > 1 ? 's' : ''}` : ''}
                ${doc.path && doc.path !== doc.name ? `<br>Path: ${doc.path}` : ''}
              </div>
            </div>
            <div class="document-actions">
              <button class="doc-action-btn" onclick="deepResearch.previewDocument('${doc.id}')">👁️ View</button>
              <button class="doc-action-btn delete" onclick="deepResearch.deleteDocument('${doc.id}')">🗑️ Delete</button>
            </div>
          </div>
        `;
      }).join('');
      
    } catch (error) {
      console.error('❌ Failed to load documents:', error);
      documentList.innerHTML = `
        <div style="text-align: center; padding: 20px; color: rgba(255,69,0,0.8);">
          <h3>❌ Error Loading Documents</h3>
          <p>Error: ${error.message}</p>
          <button class="btn secondary" onclick="deepResearch.loadDocumentList()" style="margin-top: 10px;">
            🔄 Retry
          </button>
        </div>
      `;
    }
  }
  
  updateVectorStats() {
    const defaultStats = { documents: 0, vectors: 0, images: 0, repositories: 0 };
    
    try {
      if (!this.vectorStore || !this.vectorStore.isInitialized || !this.vectorStore.collections) {
        console.warn('⚠️ Vector Store not ready for stats update');
        const stats = defaultStats;
        
        document.getElementById('statDocuments').textContent = stats.documents;
        document.getElementById('statVectors').textContent = stats.vectors;
        document.getElementById('statImages').textContent = stats.images;
        document.getElementById('statRepositories').textContent = stats.repositories;
        return;
      }
      
      const stats = this.vectorStore.getStats();
      
      document.getElementById('statDocuments').textContent = stats.documents || 0;
      document.getElementById('statVectors').textContent = stats.vectors || 0;
      document.getElementById('statImages').textContent = stats.images || 0;
      document.getElementById('statRepositories').textContent = stats.repositories || 0;
      
    } catch (error) {
      console.error('❌ Failed to update vector stats:', error);
      
      // Use default stats as fallback
      document.getElementById('statDocuments').textContent = defaultStats.documents;
      document.getElementById('statVectors').textContent = defaultStats.vectors;
      document.getElementById('statImages').textContent = defaultStats.images;
      document.getElementById('statRepositories').textContent = defaultStats.repositories;
    }
  }
  
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  async previewDocument(documentId) {
    try {
      const doc = await this.vectorStore.getDocument(documentId);
      if (!doc) {
        this.updateStatus('❌ Document not found');
        return;
      }
      
      // Create preview modal with safer event handling
      const preview = document.createElement('div');
      preview.className = 'document-modal';
      
      const modalContent = document.createElement('div');
      modalContent.className = 'document-modal-content';
      modalContent.style.maxWidth = '1000px';
      
      modalContent.innerHTML = `
        <div class="document-modal-header">
          <h2>📄 ${this.escapeHtml(doc.name)} (Full Document)</h2>
          <button class="close-modal">✕</button>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; max-height: 500px; overflow-y: auto;">
          <div style="color: rgba(255,255,255,0.7); margin-bottom: 15px; font-size: 14px;">
            📊 <strong>Document Info:</strong> ${this.escapeHtml(doc.type)} • ${this.formatFileSize(doc.size)} • ${new Date(doc.createdAt).toLocaleDateString()}
          </div>
          <pre style="white-space: pre-wrap; color: white; font-family: monospace;">${this.escapeHtml(doc.content)}</pre>
        </div>
      `;
      
      preview.appendChild(modalContent);
      
      // Add event listeners safely
      const closeBtn = modalContent.querySelector('.close-modal');
      closeBtn.addEventListener('click', () => {
        preview.remove();
      });
      
      // Click outside to close
      preview.addEventListener('click', (e) => {
        if (e.target === preview) {
          preview.remove();
        }
      });
      
      document.body.appendChild(preview);
      
    } catch (error) {
      console.error('❌ Failed to preview document:', error);
      this.updateStatus('❌ Failed to preview document: ' + error.message);
    }
  }

  previewChunk(documentId, chunkIndex, chunkContent) {
    try {
      // Create chunk preview modal with safer event handling
      const preview = document.createElement('div');
      preview.className = 'document-modal';
      
      const modalContent = document.createElement('div');
      modalContent.className = 'document-modal-content';
      modalContent.style.maxWidth = '900px';
      
      modalContent.innerHTML = `
        <div class="document-modal-header">
          <h2>🔍 Chunk ${chunkIndex + 1} Preview</h2>
          <button class="close-modal">✕</button>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; max-height: 500px; overflow-y: auto;">
          <div style="color: rgba(255,255,255,0.7); margin-bottom: 15px; font-size: 14px;">
            📄 <strong>Source:</strong> ${this.escapeHtml(documentId)} • <strong>Chunk:</strong> ${chunkIndex + 1} • <strong>Length:</strong> ${chunkContent.length} characters
          </div>
          <div style="background: rgba(79, 172, 254, 0.1); border-left: 4px solid #4facfe; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <strong>💡 Note:</strong> This is a specific chunk that was found to be relevant to your search query. 
            Use "📄 Full Doc" to see the complete document.
          </div>
          <pre style="white-space: pre-wrap; color: white; font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.5;">${this.escapeHtml(chunkContent)}</pre>
        </div>
        <div style="padding: 15px; text-align: center;">
          <button class="btn secondary full-doc-btn">📄 View Full Document</button>
        </div>
      `;
      
      preview.appendChild(modalContent);
      
      // Add event listeners safely
      const closeBtn = modalContent.querySelector('.close-modal');
      const fullDocBtn = modalContent.querySelector('.full-doc-btn');
      
      closeBtn.addEventListener('click', () => {
        preview.remove();
      });
      
      fullDocBtn.addEventListener('click', () => {
        this.previewDocument(documentId);
        preview.remove();
      });
      
      // Click outside to close
      preview.addEventListener('click', (e) => {
        if (e.target === preview) {
          preview.remove();
        }
      });
      
      document.body.appendChild(preview);
      
    } catch (error) {
      console.error('❌ Failed to preview chunk:', error);
      this.updateStatus('❌ Failed to preview chunk: ' + error.message);
    }
  }
  
  async deleteDocument(documentId) {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await this.vectorStore.deleteDocument(documentId);
      await this.loadDocumentList();
      this.updateVectorStats();
      this.updateDocumentStatus();
      this.updateGenerateButton();
      this.updateStatus('✅ Document deleted');
    } catch (error) {
      console.error('❌ Failed to delete document:', error);
      this.updateStatus('❌ Failed to delete document');
    }
  }
  
  async addRepositoryFromModal() {
    this.updateStatus('🚧 GitHub repository integration coming soon! Please upload individual files for now.');
  }
  
  async searchDocuments() {
    const query = prompt('Enter search query:');
    if (!query || !query.trim()) return;
    
    // Ask user for similarity threshold
    const thresholdInput = prompt('Similarity threshold (0.1-0.9, lower = more results):', '0.2');
    const threshold = parseFloat(thresholdInput) || 0.2;
    
    try {
      console.log('🔍 Starting search for:', query);
      this.updateStatus('🔍 Searching documents...');
      
      // Add timeout to prevent hanging
      const searchPromise = this.vectorStore.search(query.trim(), {
        limit: 15, // Increased from 10 to 15
        minSimilarity: threshold
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Search timeout after 30 seconds')), 30000);
      });
      
      const results = await Promise.race([searchPromise, timeoutPromise]);
      console.log('🔍 Search completed, results:', results);
      
      if (!results || results.length === 0) {
        console.log('❌ No results found');
        this.updateStatus('❌ No relevant documents found');
        return;
      }
      
      console.log(`✅ Found ${results.length} results, creating modal...`);
      
      // Store results for safe access
      this.currentSearchResults = results;
      
      // Create search results modal with safer event handling
      try {
        const searchModal = document.createElement('div');
        searchModal.className = 'document-modal';
        searchModal.style.display = 'flex'; // Ensure it's visible
        console.log('📝 Created modal element');
        
        const modalContent = document.createElement('div');
        modalContent.className = 'document-modal-content';
        console.log('📝 Created modal content');
        
        modalContent.innerHTML = `
          <div class="document-modal-header">
            <h2>🔍 Search Results for "${this.escapeHtml(query)}"</h2>
            <div style="font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 5px;">
              Found ${results.length} results • Threshold: ${(threshold * 100).toFixed(1)}%
            </div>
            <button class="close-modal">✕</button>
          </div>
          <div class="document-list" id="searchResultsList">
            <div style="text-align: center; padding: 20px;">
              📊 Loading ${results.length} results...
            </div>
          </div>
        `;
        console.log('📝 Set modal content HTML');
        
        searchModal.appendChild(modalContent);
        console.log('📝 Appended modal content');
        
        // Add close functionality
        const closeBtn = modalContent.querySelector('.close-modal');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            console.log('🔒 Closing search modal');
            searchModal.remove();
          });
          console.log('📝 Added close button listener');
        }
        
        // Add to DOM first
        document.body.appendChild(searchModal);
        console.log('📝 Appended modal to body');
        
        // Show modal with animation
        setTimeout(() => {
          searchModal.classList.add('show');
          searchModal.style.opacity = '1';
        }, 10);
        
        // Populate results safely with delay
        setTimeout(() => {
          console.log('📊 Starting to populate results...');
          const resultsList = modalContent.querySelector('#searchResultsList');
          if (resultsList) {
            this.populateSearchResults(resultsList, results);
            console.log('✅ Results populated successfully');
          } else {
            console.error('❌ Results list element not found');
          }
        }, 100);
        
        this.updateStatus(`✅ Found ${results.length} relevant results`);
        
              } catch (modalError) {
          console.error('❌ Error creating modal:', modalError);
          
          // Fallback: show results in a simple alert and console
          console.log('📊 Search Results:');
          results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.document?.name || 'Unknown'} (${(result.similarity * 100).toFixed(1)}% match)`);
            console.log(`   Content: ${result.content.substring(0, 100)}...`);
          });
          
          // Create a simple fallback display
          this.showSimpleSearchResults(results, query, threshold);
          this.updateStatus('✅ Search completed - results shown in fallback mode');
        }
      
    } catch (error) {
      console.error('❌ Search failed:', error);
      this.updateStatus('❌ Search failed: ' + error.message);
    }
  }

  populateSearchResults(container, results) {
    try {
      console.log('📊 PopulateSearchResults called with:', container, results);
      
      if (!container) {
        console.error('❌ Container element is null/undefined');
        return;
      }
      
      if (!results || !Array.isArray(results)) {
        console.error('❌ Results is not a valid array:', results);
        container.innerHTML = `
          <div style="text-align: center; padding: 40px; color: rgba(255,69,0,0.8);">
            <h3>❌ Invalid Results</h3>
            <p>Search results data is corrupted. Please try again.</p>
          </div>
        `;
        return;
      }
      
      container.innerHTML = '';
      console.log(`📊 Processing ${results.length} results...`);
      
      if (results.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.7);">
            <h3>🔍 No Results Found</h3>
            <p>Try adjusting your search terms or check if documents are properly uploaded.</p>
          </div>
        `;
        console.log('📊 No results to display');
        return;
      }
      
      results.forEach((result, index) => {
        try {
          console.log(`📊 Processing result ${index + 1}:`, result);
          
          const resultItem = document.createElement('div');
          resultItem.className = 'document-item';
          
          // Safely handle missing or undefined data
          const docName = result.document?.name || 'Unknown Document';
          const similarity = result.similarity ? (result.similarity * 100).toFixed(1) : '0.0';
          const chunkIndex = result.chunkIndex || 0;
          const content = result.content || 'No content available';
          const documentId = result.documentId || 'unknown';
          
          console.log(`📊 Result ${index + 1} data:`, { docName, similarity, chunkIndex, documentId });
          
          resultItem.innerHTML = `
            <div class="document-info">
              <div class="document-name">
                📄 ${this.escapeHtml(docName)} 
                <span style="font-size: 12px; color: rgba(255,255,255,0.7);">
                  • Chunk ${chunkIndex + 1} • ${similarity}% match
                </span>
              </div>
              <div class="document-meta" style="margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 5px;">
                <strong>Relevant Excerpt:</strong><br>
                "${this.escapeHtml(content.substring(0, 250))}${content.length > 250 ? '...' : ''}"
              </div>
            </div>
            <div class="document-actions">
              <button class="doc-action-btn chunk-btn" data-result-index="${index}">👁️ View Chunk</button>
              <button class="doc-action-btn doc-btn" data-document-id="${documentId}">📄 Full Doc</button>
            </div>
          `;
          
          // Add event listeners safely with error handling
          const chunkBtn = resultItem.querySelector('.chunk-btn');
          const docBtn = resultItem.querySelector('.doc-btn');
          
          if (chunkBtn) {
            chunkBtn.addEventListener('click', (e) => {
              e.preventDefault();
              console.log(`👁️ Previewing chunk for result ${index}`);
              try {
                this.previewChunk(documentId, chunkIndex, content);
              } catch (error) {
                console.error('❌ Error previewing chunk:', error);
                this.updateStatus('❌ Error previewing chunk: ' + error.message);
              }
            });
          }
          
          if (docBtn) {
            docBtn.addEventListener('click', (e) => {
              e.preventDefault();
              console.log(`📄 Previewing document ${documentId}`);
              try {
                this.previewDocument(documentId);
              } catch (error) {
                console.error('❌ Error previewing document:', error);
                this.updateStatus('❌ Error previewing document: ' + error.message);
              }
            });
          }
          
          container.appendChild(resultItem);
          console.log(`✅ Added result ${index + 1} to container`);
          
        } catch (resultError) {
          console.error(`❌ Error processing result ${index}:`, resultError);
          
          // Add error item to show something went wrong
          const errorItem = document.createElement('div');
          errorItem.className = 'document-item';
          errorItem.style.borderColor = 'rgba(255,69,0,0.5)';
          errorItem.innerHTML = `
            <div class="document-info">
              <div class="document-name" style="color: rgba(255,69,0,0.8);">
                ❌ Error loading result ${index + 1}
              </div>
              <div class="document-meta">
                ${resultError.message}
              </div>
            </div>
          `;
          container.appendChild(errorItem);
        }
      });
      
      console.log('✅ All results processed successfully');
      
    } catch (error) {
      console.error('❌ Fatal error in populateSearchResults:', error);
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px; color: rgba(255,69,0,0.8);">
            <h3>❌ Error Loading Results</h3>
            <p>Failed to display search results: ${error.message}</p>
            <button class="btn secondary" onclick="console.log('Search Results:', window.deepResearch.currentSearchResults)">
              🔍 Debug in Console
            </button>
          </div>
        `;
      }
    }
  }

  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  async exportVectorStore() {
    try {
      this.updateStatus('📥 Exporting vector store...');
      
      const data = await this.vectorStore.exportData();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vector-store-export-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.updateStatus('✅ Vector store exported successfully');
      
    } catch (error) {
      console.error('❌ Export failed:', error);
      this.updateStatus('❌ Export failed: ' + error.message);
    }
  }
  
  async clearVectorStore() {
    if (!confirm('Are you sure you want to clear all documents and vectors? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Clear all collections
      this.vectorStore.collections.documents.clear();
      this.vectorStore.collections.vectors.clear();
      this.vectorStore.collections.images.clear();
      this.vectorStore.collections.repositories.clear();
      this.vectorStore.collections.research_sessions.clear();
      
      // Save to storage
      this.vectorStore.saveToStorage();
      
      // Reload UI
      await this.loadDocumentList();
      this.updateVectorStats();
      this.updateDocumentStatus();
      this.updateGenerateButton();
      
      this.updateStatus('✅ Vector store cleared');
      
    } catch (error) {
      console.error('❌ Failed to clear vector store:', error);
      this.updateStatus('❌ Failed to clear vector store');
    }
  }
  
  async quickSearch() {
    const query = prompt('Enter search query:');
    if (!query || !query.trim()) return;
    
    const threshold = 0.15; // Lower threshold for more results
    
    try {
      console.log('⚡ Quick search for:', query, 'with threshold:', threshold);
      this.updateStatus('⚡ Quick searching documents...');
      
      const searchPromise = this.vectorStore.search(query.trim(), {
        limit: 20, // More results for quick search
        minSimilarity: threshold
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Search timeout after 30 seconds')), 30000);
      });
      
      const results = await Promise.race([searchPromise, timeoutPromise]);
      console.log('⚡ Quick search completed, results:', results);
      
      if (!results || results.length === 0) {
        console.log('❌ No results found');
        this.updateStatus('❌ No relevant documents found');
        return;
      }
      
      console.log(`✅ Found ${results.length} results, creating modal...`);
      
      // Store results for safe access
      this.currentSearchResults = results;
      
      // Create search results modal (reuse the same modal logic)
      try {
        const searchModal = document.createElement('div');
        searchModal.className = 'document-modal';
        searchModal.style.display = 'flex';
        console.log('📝 Created modal element');
        
        const modalContent = document.createElement('div');
        modalContent.className = 'document-modal-content';
        console.log('📝 Created modal content');
        
        modalContent.innerHTML = `
          <div class="document-modal-header">
            <h2>⚡ Quick Search Results for "${this.escapeHtml(query)}"</h2>
            <div style="font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 5px;">
              Found ${results.length} results • Threshold: ${(threshold * 100).toFixed(1)}% (Quick Mode)
            </div>
            <button class="close-modal">✕</button>
          </div>
          <div class="document-list" id="searchResultsList">
            <div style="text-align: center; padding: 20px;">
              📊 Loading ${results.length} results...
            </div>
          </div>
        `;
        console.log('📝 Set modal content HTML');
        
        searchModal.appendChild(modalContent);
        console.log('📝 Appended modal content');
        
        // Add close functionality
        const closeBtn = modalContent.querySelector('.close-modal');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            console.log('🔒 Closing search modal');
            searchModal.remove();
          });
          console.log('📝 Added close button listener');
        }
        
        // Add to DOM first
        document.body.appendChild(searchModal);
        console.log('📝 Appended modal to body');
        
        // Show modal with animation
        setTimeout(() => {
          searchModal.classList.add('show');
          searchModal.style.opacity = '1';
        }, 10);
        
        // Populate results safely with delay
        setTimeout(() => {
          console.log('📊 Starting to populate results...');
          const resultsList = modalContent.querySelector('#searchResultsList');
          if (resultsList) {
            this.populateSearchResults(resultsList, results);
            console.log('✅ Results populated successfully');
          } else {
            console.error('❌ Results list element not found');
          }
        }, 100);
        
        this.updateStatus(`⚡ Quick search found ${results.length} results`);
        
             } catch (modalError) {
         console.error('❌ Error creating modal:', modalError);
         this.showSimpleSearchResults(results, query, threshold);
         this.updateStatus('⚡ Quick search completed - results shown in fallback mode');
       }
      
    } catch (error) {
      console.error('❌ Quick search failed:', error);
      this.updateStatus('❌ Quick search failed: ' + error.message);
    }
  }
  
  showSimpleSearchResults(results, query, threshold = 0.3) {
    console.log('📊 Showing simple search results fallback');
    
    try {
      // Create a simple overlay without modal complexity
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 4000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      `;
      
      const content = document.createElement('div');
      content.style.cssText = `
        background: white;
        color: black;
        border-radius: 10px;
        padding: 30px;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        width: 100%;
      `;
      
      let html = `
        <div style="border-bottom: 2px solid #ddd; padding-bottom: 15px; margin-bottom: 20px;">
          <h2>🔍 Search Results for "${query}"</h2>
          <div style="font-size: 14px; color: #666; margin-top: 5px;">
            Found ${results.length} results • Threshold: ${(threshold * 100).toFixed(1)}%
          </div>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
            position: absolute;
            top: 15px;
            right: 15px;
            background: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
          ">✕</button>
        </div>
      `;
      
      results.forEach((result, index) => {
        const docName = result.document?.name || 'Unknown Document';
        const similarity = result.similarity ? (result.similarity * 100).toFixed(1) : '0.0';
        const content = result.content || 'No content available';
        
        html += `
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">
              ${index + 1}. ${docName} (${similarity}% match)
            </h3>
            <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 12px;">
              "${content.substring(0, 300)}${content.length > 300 ? '...' : ''}"
            </div>
          </div>
        `;
      });
      
      content.innerHTML = html;
      content.style.position = 'relative';
      overlay.appendChild(content);
      document.body.appendChild(overlay);
      
      console.log('✅ Simple search results displayed');
      
    } catch (error) {
      console.error('❌ Simple search results failed:', error);
      alert(`Search found ${results.length} results but display failed. Check console for details.`);
    }
  }
  
  closeDocumentModal() {
    console.log('📚 Closing document modal');
    this.documentModalOpen = false;
    
    // Close any existing document modals
    const modals = document.querySelectorAll('.document-modal, #documentModal');
    modals.forEach(modal => {
      modal.style.opacity = '0';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
      }, 200);
    });
  }

  exportTimeCapsule() {
    console.log('[DEBUG] exportTimeCapsule() called');
    const exportData = {
      topics: this.topics,
      researchResults: this.researchResults,
      metadata: {
        researchType: document.getElementById('researchType').value,
        researchDepth: document.getElementById('researchDepth').value,
        aiProvider: document.getElementById('aiProviderSelect').value,
        exportDate: new Date().toISOString()
      }
    };
    console.log('[DEBUG] Export data:', exportData);
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timecapsule-${Date.now()}.timecapsule.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.updateStatus('🧳 TimeCapsule exported successfully');
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
      'timeout'
    ];
    
    return ollamaErrors.some(error => 
      errorMessage.toLowerCase().includes(error.toLowerCase())
    );
  }
  
  showOllamaTroubleshootingHelper(errorMessage) {
    const modal = document.createElement('div');
    modal.className = 'troubleshooting-modal';
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
          <button class="btn primary" onclick="this.closest('.troubleshooting-modal').remove(); document.getElementById('connectAI').click();">🔄 Try Again</button>
        </div>
      </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 5000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  loadTimeCapsule(event) {
    console.log('[DEBUG] loadTimeCapsule() called');
    const fileInput = event.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.log('[DEBUG] No file selected');
      return;
    }
    const file = fileInput.files[0];
    console.log('[DEBUG] File selected:', file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        console.log('[DEBUG] Loaded data:', data);
        if (data.topics && Array.isArray(data.topics)) {
          this.topics = data.topics;
        }
        if (data.researchResults && typeof data.researchResults === 'object') {
          this.researchResults = data.researchResults;
        }
        // Optionally restore settings
        if (data.metadata) {
          if (data.metadata.researchType) document.getElementById('researchType').value = data.metadata.researchType;
          if (data.metadata.researchDepth) document.getElementById('researchDepth').value = data.metadata.researchDepth;
          if (data.metadata.aiProvider) document.getElementById('aiProviderSelect').value = data.metadata.aiProvider;
        }
        this.renderTopics();
        this.renderOutput();
        this.updateGenerateButton();
        this.updateDocumentStatus();
        this.saveToStorage();
        this.updateStatus('📂 TimeCapsule loaded successfully');
      } catch (error) {
        console.error('[DEBUG] Failed to load TimeCapsule:', error);
        this.updateStatus('❌ Failed to load TimeCapsule: ' + error.message);
      }
      fileInput.value = '';
    };
    reader.readAsText(file);
  }
}

// Global functions for inline event handlers
window.expandStructure = function() {
  document.querySelectorAll('.structure-item').forEach(item => {
    item.style.display = 'flex';
  });
};

window.collapseStructure = function() {
  document.querySelectorAll('.structure-item:not(.selected)').forEach(item => {
    item.style.display = 'none';
  });
};

window.fullscreenOutput = function() {
  const output = document.querySelector('.research-output');
  if (output.requestFullscreen) {
    output.requestFullscreen();
  }
};

// Export for global access
window.DeepResearchApp = DeepResearchApp;

// At the end of the file or after DeepResearchApp definition
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.deepResearch && typeof window.deepResearch.setupEventListeners === 'function') {
      window.deepResearch.setupEventListeners();
    }
  });
} else {
  if (window.deepResearch && typeof window.deepResearch.setupEventListeners === 'function') {
    window.deepResearch.setupEventListeners();
  }
}

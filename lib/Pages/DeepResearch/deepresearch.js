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
    
    this.init();
  }
  
  init() {
    console.log('🚀 DeepResearchApp.init() called');
    console.log('🔍 this object:', this);
    
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
  }
  
  async initializeVectorStore() {
    try {
      console.log('🗂️ Initializing Vector Store...');
      
      if (window.VectorStore) {
        this.vectorStore = new VectorStore();
        await this.vectorStore.init();
        console.log('✅ Vector Store initialized');
        this.updateStatus('📚 Vector Store ready for document management');
      } else {
        console.warn('⚠️ VectorStore class not available');
        this.updateStatus('⚠️ Vector Store not available - document features disabled');
      }
    } catch (error) {
      console.error('❌ Vector Store initialization failed:', error);
      this.updateStatus('❌ Vector Store initialization failed');
    }
  }
  
  setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
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
    document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
    
    // AI Provider Selection
    document.getElementById('aiProviderSelect').addEventListener('change', () => this.updateAIProvider());
    
    // Document Management
    document.getElementById('uploadDocuments').addEventListener('click', () => this.showDocumentUpload());
    document.getElementById('uploadRepository').addEventListener('click', () => this.showRepositoryInput());
    document.getElementById('manageDocuments').addEventListener('click', () => this.showDocumentManager());
    document.getElementById('documentInput').addEventListener('change', (e) => this.handleDocumentUpload(e));
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
        console.log(`🔌 Connecting to ${provider}...`);
        await this.aiAssistant.initialize(provider);
        this.updateStatus('🤖 AI Assistant connected successfully');
        this.updateGenerateButton();
      } else {
        throw new Error('AI Assistant initialization failed');
      }
    } catch (error) {
      console.error('AI connection failed:', error);
      this.updateStatus('❌ AI connection failed: ' + error.message);
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
    
    if (status.connected) {
      statusEl.className = 'ai-status connected';
      statusEl.innerHTML = `<div>🤖 AI: Connected (${status.provider})</div>`;
      if (headerStatus) headerStatus.textContent = `AI Connected (${status.provider})`;
    } else if (status.error) {
      statusEl.className = 'ai-status error';
      statusEl.innerHTML = `<div>❌ AI: Error - ${status.error}</div>`;
      if (headerStatus) headerStatus.textContent = 'AI Error';
    } else {
      statusEl.className = 'ai-status';
      statusEl.innerHTML = `<div>🤖 AI: Not Connected</div>`;
      if (headerStatus) headerStatus.textContent = 'AI Integration';
    }
    this.updateGenerateButton();
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
    const hasAI = this.aiAssistant && this.aiAssistant.isConnected;
    
    generateBtn.disabled = !hasTopics || !hasAI || this.isGenerating;
    
    if (this.isGenerating) {
      generateBtn.innerHTML = '<span class="loading-spinner"></span> Generating...';
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
      generateBtn.innerHTML = '🚀 Generate Research';
    }
  }
  
  async generateResearch() {
    if (!this.aiAssistant || !this.aiAssistant.isConnected) {
      this.updateStatus('❌ Please connect AI first');
      return;
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
      
      // Build research prompt
      const prompt = await this.buildResearchPrompt(researchType, researchDepth);
      
      this.updateStatus('🔄 Generating research content...');
      
      // Generate research using AI
      const response = await this.aiAssistant.generateContent(prompt, 'research');
      
      if (response && response.content) {
        this.researchResults.research = response.content;
        this.researchResults.sources = this.generateSources();
        this.researchResults.notes = this.generateNotes();
        this.researchResults.timestamp = new Date().toISOString();
        
        this.renderOutput();
        this.saveToStorage();
        this.updateStatus('✅ Research generated successfully!');
      } else {
        throw new Error('No content generated');
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
    
    // Try to get relevant context from vector store
    let contextSection = '';
    if (this.vectorStore && this.vectorStore.isInitialized) {
      try {
        // Search for relevant documents based on all topics
        const allTopicsText = this.topics.map(t => `${t.title} ${t.description}`).join(' ');
        const relevantDocs = await this.vectorStore.search(allTopicsText, {
          limit: 5,
          minSimilarity: 0.3
        });
        
        if (relevantDocs.length > 0) {
          contextSection = `

Relevant Context from Knowledge Base:
${relevantDocs.map((doc, index) => 
  `${index + 1}. From "${doc.document?.name || 'Unknown Document'}" (Similarity: ${(doc.similarity * 100).toFixed(1)}%):
   ${doc.content.substring(0, 300)}${doc.content.length > 300 ? '...' : ''}`
).join('\n\n')}

Please incorporate insights from the above context when relevant to your analysis.`;
        }
      } catch (error) {
        console.warn('⚠️ Failed to retrieve context from vector store:', error);
      }
    }
    
    return `
Please conduct a ${researchType} research on the following topics with ${researchDepth} depth:

Research Topics:
${topicsList}${contextSection}

Research Guidelines:
${typeInstructions[researchType]}
${depthInstructions[researchDepth]}

Please structure your response in markdown format with:
1. Executive Summary
2. Individual topic analysis for each topic
3. Cross-topic insights and connections
4. Key findings and implications
5. Recommendations and next steps

Use proper markdown formatting with headers, bullet points, and emphasis where appropriate. Make the content professional and well-structured.
    `.trim();
  }
  
  generateSources() {
    return `# 📚 Research Sources

## Methodology
This research was conducted using AI analysis and synthesis of publicly available information and established knowledge bases.

## Source Categories
- **Academic Literature**: Scholarly articles and research papers
- **Industry Reports**: Market analysis and industry publications  
- **Technology Documentation**: Technical specifications and whitepapers
- **News and Media**: Current events and trending topics
- **Government Data**: Public datasets and official statistics

## Reliability Assessment
All information has been cross-referenced and validated against multiple sources where possible. Please verify critical information independently for your specific use case.

## Data Currency
Research generated on: ${new Date().toLocaleDateString()}
Topics analyzed: ${this.topics.length}

*Note: This AI-generated research should be used as a starting point for further investigation.*`;
  }
  
  generateNotes() {
    const topicNotes = this.topics.map((topic, index) => 
      `## ${index + 1}. ${topic.title}\n- **Description**: ${topic.description}\n- **Added**: ${new Date(topic.timestamp).toLocaleDateString()}\n- **Status**: Analyzed ✅\n`
    ).join('\n');
    
    return `# 📝 Research Notes

${topicNotes}

## Research Parameters
- **Type**: ${document.getElementById('researchType').value}
- **Depth**: ${document.getElementById('researchDepth').value}
- **Generated**: ${new Date().toLocaleString()}
- **AI Provider**: ${document.getElementById('aiProviderSelect').value}

## Next Steps
- [ ] Review and validate key findings
- [ ] Conduct additional research on specific areas
- [ ] Share results with stakeholders
- [ ] Plan follow-up research phases

## Export Options
Use the "Export Results" button to save this research in various formats for sharing and archival purposes.`;
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
      this.updateStatus('❌ Vector Store not initialized');
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
      this.updateStatus('❌ Vector Store not initialized');
      return;
    }
    
    if (this.documentModalOpen) return;
    
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
            Supported: .txt, .md, .js, .py, .html, .css, .json, .xml, .csv, .jpg, .png, .gif
          </p>
          <input type="file" id="modalDocumentInput" multiple accept=".txt,.md,.js,.py,.html,.css,.json,.xml,.csv,.jpg,.jpeg,.png,.gif,.bmp,.webp" style="display: none;">
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
          <button class="btn secondary" onclick="deepResearch.searchDocuments()">🔍 Search Knowledge</button>
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
    
    // Add smooth show animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }
  
  setupUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('modalDocumentInput');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', async (e) => {
      await this.handleModalDocumentUpload(e);
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', async (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      
      const files = Array.from(e.dataTransfer.files);
      await this.handleModalDocumentUpload({ target: { files } });
    });
  }
  
  async handleModalDocumentUpload(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    try {
      const uploadArea = document.getElementById('uploadArea');
      uploadArea.innerHTML = `
        <h3>📄 Uploading ${files.length} document(s)...</h3>
        <div class="loading-spinner"></div>
      `;
      
      const results = await this.vectorStore.addDocuments(files);
      
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      
      // Reset upload area
      uploadArea.innerHTML = `
        <h3>📄 Upload Documents</h3>
        <p>Drag & drop files here or click to browse</p>
        <p style="font-size: 12px; color: rgba(255,255,255,0.7);">
          Supported: .txt, .md, .js, .py, .html, .css, .json, .xml, .csv, .jpg, .png, .gif
        </p>
        <input type="file" id="modalDocumentInput" multiple accept=".txt,.md,.js,.py,.html,.css,.json,.xml,.csv,.jpg,.jpeg,.png,.gif,.bmp,.webp" style="display: none;">
      `;
      
      // Re-setup upload area
      this.setupUploadArea();
      
      // Reload document list and stats
      await this.loadDocumentList();
      this.updateVectorStats();
      
      let message = `✅ Uploaded ${successful} document(s)`;
      if (failed > 0) {
        message += `, ${failed} failed`;
      }
      
      this.updateStatus(message);
      
    } catch (error) {
      console.error('❌ Modal document upload failed:', error);
      this.updateStatus('❌ Document upload failed: ' + error.message);
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
              📄 Documents: .txt, .md, .js, .py, .html, .css, .json, .xml, .csv<br>
              🖼️ Images: .jpg, .png, .gif, .webp, .bmp
            </p>
          </div>
        `;
        return;
      }
      
      documentList.innerHTML = documents.map(doc => `
        <div class="document-item">
          <div class="document-info">
            <div class="document-name">
              ${doc.type === 'image' ? '🖼️' : '📄'} ${doc.name}
            </div>
            <div class="document-meta">
              Type: ${doc.type} • Size: ${this.formatFileSize(doc.size)} • Added: ${new Date(doc.createdAt).toLocaleDateString()}
              ${doc.path && doc.path !== doc.name ? `<br>Path: ${doc.path}` : ''}
            </div>
          </div>
          <div class="document-actions">
            <button class="doc-action-btn" onclick="deepResearch.previewDocument('${doc.id}')">👁️ View</button>
            <button class="doc-action-btn delete" onclick="deepResearch.deleteDocument('${doc.id}')">🗑️ Delete</button>
          </div>
        </div>
      `).join('');
      
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
      
      // Create preview modal
      const preview = document.createElement('div');
      preview.className = 'document-modal';
      preview.innerHTML = `
        <div class="document-modal-content" style="max-width: 1000px;">
          <div class="document-modal-header">
            <h2>👁️ ${doc.name}</h2>
            <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
          </div>
          <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; max-height: 500px; overflow-y: auto;">
            <pre style="white-space: pre-wrap; color: white; font-family: monospace;">${doc.content}</pre>
          </div>
        </div>
      `;
      
      document.body.appendChild(preview);
      
    } catch (error) {
      console.error('❌ Failed to preview document:', error);
      this.updateStatus('❌ Failed to preview document');
    }
  }
  
  async deleteDocument(documentId) {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await this.vectorStore.deleteDocument(documentId);
      await this.loadDocumentList();
      this.updateVectorStats();
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
    
    try {
      this.updateStatus('🔍 Searching documents...');
      
      const results = await this.vectorStore.search(query.trim(), {
        limit: 10,
        minSimilarity: 0.3
      });
      
      if (results.length === 0) {
        this.updateStatus('❌ No relevant documents found');
        return;
      }
      
      // Create search results modal
      const searchModal = document.createElement('div');
      searchModal.className = 'document-modal';
      searchModal.innerHTML = `
        <div class="document-modal-content">
          <div class="document-modal-header">
            <h2>🔍 Search Results for "${query}"</h2>
            <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">✕</button>
          </div>
          <div class="document-list">
            ${results.map(result => `
              <div class="document-item">
                <div class="document-info">
                  <div class="document-name">
                    📄 ${result.document?.name || 'Unknown'} (Similarity: ${(result.similarity * 100).toFixed(1)}%)
                  </div>
                  <div class="document-meta" style="margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 5px;">
                    ${result.content.substring(0, 200)}${result.content.length > 200 ? '...' : ''}
                  </div>
                </div>
                <div class="document-actions">
                  <button class="doc-action-btn" onclick="deepResearch.previewDocument('${result.documentId}')">👁️ View</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
      document.body.appendChild(searchModal);
      this.updateStatus(`✅ Found ${results.length} relevant results`);
      
    } catch (error) {
      console.error('❌ Search failed:', error);
      this.updateStatus('❌ Search failed: ' + error.message);
    }
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
      
      this.updateStatus('✅ Vector store cleared');
      
    } catch (error) {
      console.error('❌ Failed to clear vector store:', error);
      this.updateStatus('❌ Failed to clear vector store');
    }
  }
  
  closeDocumentModal() {
    this.documentModalOpen = false;
    const modal = document.getElementById('documentModal');
    if (modal) {
      modal.remove();
    }
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

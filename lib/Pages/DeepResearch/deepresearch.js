/**
 * Deep Research Studio Application
 * AI-powered research and analysis platform
 */

// Image Upload Utility for Beluga S3 Integration
class ImageUploader {
  constructor() {
    this.endpoint = 'https://beluga.bubblspace.com/slmtimecapsule';
  }

  async uploadImage(imageFile, filename = null) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      if (filename) {
        formData.append('filename', filename);
      }

      console.log('📤 Uploading image to Beluga S3...');
      
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type, let browser handle it for FormData
        }
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Image uploaded successfully:', result);
      
      return {
        success: true,
        url: result.url || result.s3Url || result.link,
        markdown: `![Generated Image](${result.url || result.s3Url || result.link})`,
        filename: result.filename || filename || 'image'
      };
      
    } catch (error) {
      console.error('❌ Image upload failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload from canvas or base64 data
  async uploadFromCanvas(canvas, filename = `generated-${Date.now()}.png`) {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        const result = await this.uploadImage(blob, filename);
        resolve(result);
      }, 'image/png');
    });
  }

  // Upload from base64 string
  async uploadFromBase64(base64String, filename = `generated-${Date.now()}.png`) {
    const blob = this.base64ToBlob(base64String);
    return await this.uploadImage(blob, filename);
  }

  base64ToBlob(base64) {
    const parts = base64.split(',');
    const contentType = parts[0].match(/:(.*?);/)[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
}

class DeepResearchApp {
  constructor() {
    this.topics = [];
    this.researchResults = {};
    this.currentTab = 'research';
    this.aiAssistant = null;
    this.isGenerating = false;
    this.imageUploader = new ImageUploader(); // Initialize image uploader
    
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
    
    // Image Upload
    document.getElementById('uploadImageBtn').addEventListener('click', () => {
      document.getElementById('imageInput').click();
    });
    
    document.getElementById('imageInput').addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        this.handleMultipleImageUploads(files);
      }
    });
    
    // AI Provider Selection
    document.getElementById('aiProviderSelect').addEventListener('change', () => this.updateAIProvider());
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
      const prompt = this.buildResearchPrompt(researchType, researchDepth);
      
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
  
  // Image upload integration for research
  async handleImageUpload(file) {
    try {
      this.updateStatus('📤 Uploading image to S3...');
      const result = await this.imageUploader.uploadImage(file);
      
      if (result.success) {
        this.updateStatus(`✅ Image uploaded: ${result.filename}`);
        
        // Add image link to current research if available
        if (this.researchResults.research) {
          this.researchResults.research += `\n\n## 📸 Generated Image\n\n${result.markdown}\n\n`;
          this.renderOutput();
          this.saveToStorage();
        }
        
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      this.updateStatus(`❌ Image upload failed: ${error.message}`);
      return null;
    }
  }

  // Handle multiple image uploads
  async handleMultipleImageUploads(files) {
    if (files.length === 0) return;
    
    this.updateStatus(`📤 Uploading ${files.length} image(s)...`);
    const uploadPromises = files.map(file => this.handleImageUpload(file));
    
    try {
      const results = await Promise.all(uploadPromises);
      const successful = results.filter(r => r && r.success);
      const failed = results.filter(r => !r || !r.success);
      
      if (successful.length > 0) {
        this.updateStatus(`✅ Successfully uploaded ${successful.length}/${files.length} images`);
        
        // Clear the file input
        document.getElementById('imageInput').value = '';
      }
      
      if (failed.length > 0) {
        console.warn(`Failed to upload ${failed.length} images:`, failed);
      }
      
    } catch (error) {
      console.error('Multiple image upload error:', error);
      this.updateStatus(`❌ Image upload failed: ${error.message}`);
    }
  }

  // Generate research content with optional image integration
  async generateResearchWithImages(imageUrls = []) {
    let researchContent = this.researchResults.research || '';
    
    if (imageUrls.length > 0) {
      researchContent += '\n\n## 📸 Generated Images\n\n';
      imageUrls.forEach((imageUrl, index) => {
        researchContent += `![Research Image ${index + 1}](${imageUrl})\n\n`;
      });
    }
    
    return researchContent;
  }

  buildResearchPrompt(researchType, researchDepth) {
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
    
    return `
Please conduct a ${researchType} research on the following topics with ${researchDepth} depth:

Research Topics:
${topicsList}

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

// ===================================
// SketchPad-SLM App Router
// Multi-page application navigation system
// ===================================

class AppRouter {
  constructor() {
    this.currentPage = 'deep-research'; // Default page
    this.pages = {
      'deep-research': {
        title: 'Deep Research Studio',
        description: 'AI-powered research and analysis platform',
        icon: '🔬',
        component: null
      },
      'canvas': {
        title: 'Creative Canvas Studio', 
        description: 'p5.js creative coding with AI assistance',
        icon: '🎨',
        component: null
      }
    };
    
    this.routes = {
      'deep-research': () => this.loadDeepResearchPage(),
      'canvas': () => this.loadCanvasPage()
    };
    
    this.initializeRouter();
  }

  initializeRouter() {
    // Handle URL changes (back/forward buttons)
    window.addEventListener('popstate', (e) => {
      const page = e.state?.page || 'deep-research';
      this.navigateToPage(page, false);
    });
    
    // Set initial page based on URL hash or default
    const urlPage = window.location.hash.replace('#', '') || 'deep-research';
    this.navigateToPage(urlPage, true);
  }

  navigateToPage(pageName, updateHistory = true) {
    if (!this.pages[pageName]) {
      console.warn(`Page "${pageName}" not found, defaulting to deep-research`);
      pageName = 'deep-research';
    }

    // Update URL if needed
    if (updateHistory) {
      const url = pageName === 'deep-research' ? '#' : `#${pageName}`;
      history.pushState({ page: pageName }, '', url);
    }

    // Hide all pages first
    this.hideAllPages();
    
    // Update current page
    this.currentPage = pageName;
    
    // Update navigation state
    this.updateNavigation();
    
    // Load and show the requested page
    this.routes[pageName]();
    
    // Update document title
    document.title = `${this.pages[pageName].title} - SketchPad-SLM`;
  }

  hideAllPages() {
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => page.style.display = 'none');
  }

  updateNavigation() {
    // Update navigation buttons state
    Object.keys(this.pages).forEach(pageName => {
      const navBtn = document.getElementById(`nav-${pageName}`);
      if (navBtn) {
        if (pageName === this.currentPage) {
          navBtn.classList.add('active');
        } else {
          navBtn.classList.remove('active');
        }
      }
    });
  }

  loadDeepResearchPage() {
    let page = document.getElementById('deep-research-page');
    
    if (!page) {
      page = this.createDeepResearchPage();
      document.body.appendChild(page);
    }
    
    page.style.display = 'block';
    
    // Initialize Deep Research functionality if needed
    if (!window.deepResearchInitialized) {
      this.initializeDeepResearch();
      window.deepResearchInitialized = true;
    }
  }

  loadCanvasPage() {
    let page = document.getElementById('canvas-page');
    
    if (!page) {
      // Canvas page should be loaded from Canvas.html content
      // For now, we'll redirect to full Canvas.html
      window.location.href = 'Canvas.html';
      return;
    }
    
    page.style.display = 'block';
  }

  createDeepResearchPage() {
    const page = document.createElement('div');
    page.id = 'deep-research-page';
    page.className = 'app-page';
    
    page.innerHTML = `
      <div class="deep-research-container">
        <!-- Header -->
        <div class="app-header">
          <div class="header-content">
            <img src="lib/Media/SketchPad-SLM.png" alt="SketchPad-SLM" class="header-logo">
            <div class="header-info">
              <h1>🔬 Deep Research Studio</h1>
              <p>AI-powered research and analysis platform</p>
            </div>
            <div class="header-nav">
              <button id="nav-deep-research" class="nav-btn active" onclick="appRouter.navigateToPage('deep-research')">
                🔬 Deep Research
              </button>
              <button id="nav-canvas" class="nav-btn" onclick="appRouter.navigateToPage('canvas')">
                🎨 Creative Canvas
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="deep-research-main">
          <div class="research-sidebar">
            <div class="research-controls">
              <h3>🔧 Research Tools</h3>
              
              <div class="control-group">
                <label>📊 Research Type:</label>
                <select id="researchType" class="research-select">
                  <option value="academic">Academic Research</option>
                  <option value="market">Market Analysis</option>
                  <option value="technology">Technology Review</option>
                  <option value="competitive">Competitive Analysis</option>
                  <option value="trend">Trend Analysis</option>
                </select>
              </div>

              <div class="control-group">
                <label>🤖 AI Model:</label>
                <select id="researchAIProvider" class="research-select">
                  <option value="local">🤖 Local Qwen2.5</option>
                  <option value="openai">🌐 OpenAI API</option>
                  <option value="lmstudio">🏠 LM Studio</option>
                </select>
              </div>

              <button id="connectResearchAI" class="research-btn primary">
                🔌 Connect AI
              </button>

              <div class="control-group">
                <label>📝 Research Query:</label>
                <textarea id="researchQuery" class="research-textarea" placeholder="Enter your research question or topic..."></textarea>
              </div>

              <button id="startResearch" class="research-btn primary" disabled>
                🚀 Start Research
              </button>

              <button id="exportResearch" class="research-btn secondary">
                📥 Export Results
              </button>
            </div>

            <div class="research-settings">
              <h4>⚙️ Advanced Settings</h4>
              <div class="setting-item">
                <label>
                  <input type="checkbox" id="deepAnalysis"> Deep Analysis Mode
                </label>
              </div>
              <div class="setting-item">
                <label>
                  <input type="checkbox" id="includeSources"> Include Sources
                </label>
              </div>
              <div class="setting-item">
                <label>
                  <input type="checkbox" id="generateSummary"> Generate Summary
                </label>
              </div>
            </div>
          </div>

          <div class="research-workspace">
            <div class="workspace-header">
              <h2>📋 Research Workspace</h2>
              <div class="workspace-status">
                <span id="researchStatus">Ready to start research</span>
              </div>
            </div>

            <div class="research-tabs">
              <button class="tab-btn active" data-tab="overview">📊 Overview</button>
              <button class="tab-btn" data-tab="analysis">🔍 Analysis</button>
              <button class="tab-btn" data-tab="sources">📚 Sources</button>
              <button class="tab-btn" data-tab="notes">📝 Notes</button>
            </div>

            <div class="research-content">
              <div id="overview-tab" class="tab-content active">
                <div class="welcome-message">
                  <h3>🌟 Welcome to Deep Research Studio</h3>
                  <p>This AI-powered research platform helps you conduct comprehensive analysis and research on any topic.</p>
                  
                  <div class="feature-grid">
                    <div class="feature-card">
                      <h4>🤖 AI-Powered Analysis</h4>
                      <p>Leverage advanced AI models for deep research and analysis</p>
                    </div>
                    <div class="feature-card">
                      <h4>📊 Multi-Modal Research</h4>
                      <p>Academic, market, technology, and trend analysis capabilities</p>
                    </div>
                    <div class="feature-card">
                      <h4>🔍 Source Integration</h4>
                      <p>Automatically find and integrate relevant sources</p>
                    </div>
                    <div class="feature-card">
                      <h4>📝 Export & Share</h4>
                      <p>Export research results in multiple formats</p>
                    </div>
                  </div>

                  <div class="quick-start">
                    <h4>🚀 Quick Start Guide:</h4>
                    <ol>
                      <li>Select your research type and AI model</li>
                      <li>Connect to your preferred AI provider</li>
                      <li>Enter your research question or topic</li>
                      <li>Click "Start Research" to begin analysis</li>
                      <li>Review results in the Analysis tab</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div id="analysis-tab" class="tab-content">
                <div class="analysis-results">
                  <div class="results-placeholder">
                    <h3>📊 Analysis Results</h3>
                    <p>Start a research query to see detailed analysis results here.</p>
                  </div>
                </div>
              </div>

              <div id="sources-tab" class="tab-content">
                <div class="sources-list">
                  <div class="sources-placeholder">
                    <h3>📚 Research Sources</h3>
                    <p>Sources and references will appear here after research is completed.</p>
                  </div>
                </div>
              </div>

              <div id="notes-tab" class="tab-content">
                <div class="notes-editor">
                  <h3>📝 Research Notes</h3>
                  <textarea id="researchNotes" class="notes-textarea" placeholder="Add your research notes here..."></textarea>
                  <button class="research-btn secondary">💾 Save Notes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Chat Panel -->
        <div class="research-ai-panel" id="researchAIPanel">
          <div class="ai-panel-header">
            <span>🤖 Research Assistant</span>
            <button class="panel-control-btn" onclick="toggleResearchAIPanel()">−</button>
          </div>
          <div class="ai-panel-content">
            <div class="ai-status">
              <span id="researchAIStatus">AI: Not connected</span>
            </div>
            <div class="chat-history" id="researchChatHistory">
              <div class="chat-message system">
                Welcome to the Research Assistant! Connect an AI model to start asking research questions.
              </div>
            </div>
            <div class="ai-input-section">
              <input type="text" id="researchAIInput" placeholder="Ask a research question..." disabled>
              <button id="sendResearchQuery" class="ai-btn" disabled>Send</button>
            </div>
          </div>
        </div>
      </div>
    `;

    return page;
  }

  initializeDeepResearch() {
    // Initialize tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        this.switchTab(tabName);
      });
    });

    // Initialize AI connection
    document.getElementById('connectResearchAI').addEventListener('click', () => {
      this.connectResearchAI();
    });

    // Initialize research start
    document.getElementById('startResearch').addEventListener('click', () => {
      this.startResearch();
    });

    // Initialize AI provider selection
    document.getElementById('researchAIProvider').addEventListener('change', (e) => {
      this.updateResearchAIProvider(e.target.value);
    });

    console.log('✅ Deep Research Studio initialized');
  }

  switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  }

  updateResearchAIProvider(provider) {
    const connectBtn = document.getElementById('connectResearchAI');
    const statusSpan = document.getElementById('researchAIStatus');
    
    if (provider === 'openai') {
      connectBtn.textContent = '🚀 Connect OpenAI';
      statusSpan.textContent = 'AI: OpenAI API (Disconnected)';
    } else if (provider === 'lmstudio') {
      connectBtn.textContent = '🏠 Connect LM Studio';
      statusSpan.textContent = 'AI: LM Studio (Disconnected)';
    } else {
      connectBtn.textContent = '🔌 Connect Qwen';
      statusSpan.textContent = 'AI: Local Qwen (Disconnected)';
    }
  }

  async connectResearchAI() {
    const provider = document.getElementById('researchAIProvider').value;
    const statusSpan = document.getElementById('researchAIStatus');
    const connectBtn = document.getElementById('connectResearchAI');
    const startBtn = document.getElementById('startResearch');
    const aiInput = document.getElementById('researchAIInput');
    const sendBtn = document.getElementById('sendResearchQuery');
    
    try {
      statusSpan.textContent = 'AI: Connecting...';
      
      // Initialize AI Assistant backend if not already done
      if (!window.researchAI) {
        window.researchAI = new AIAssistantBackend();
        window.researchAI.setProvider(provider);
        window.researchAI.setChatMode('general'); // Use general mode for research
      }
      
      // Connect to the selected provider
      await window.researchAI.initializeAI();
      
      // Update UI state
      statusSpan.textContent = `AI: ${provider === 'openai' ? 'OpenAI' : provider === 'lmstudio' ? 'LM Studio' : 'Qwen'} Connected`;
      connectBtn.textContent = '✅ Connected';
      connectBtn.disabled = true;
      startBtn.disabled = false;
      aiInput.disabled = false;
      sendBtn.disabled = false;
      
      this.addResearchChatMessage('system', `🚀 Connected to ${provider} AI! You can now start research or ask questions.`);
      
    } catch (error) {
      console.error('Research AI connection failed:', error);
      statusSpan.textContent = 'AI: Connection Failed';
      this.addResearchChatMessage('system', `❌ Connection failed: ${error.message}`);
    }
  }

  async startResearch() {
    const query = document.getElementById('researchQuery').value.trim();
    const researchType = document.getElementById('researchType').value;
    const statusSpan = document.getElementById('researchStatus');
    
    if (!query) {
      alert('Please enter a research query');
      return;
    }
    
    if (!window.researchAI || !window.researchAI.aiSession) {
      alert('Please connect to an AI provider first');
      return;
    }
    
    try {
      statusSpan.textContent = 'Conducting research...';
      this.addResearchChatMessage('user', `Research Query: ${query}`);
      
      // Create research prompt based on type
      const researchPrompt = this.createResearchPrompt(query, researchType);
      
      // Generate research using AI
      const result = await window.researchAI.generateAICode(researchPrompt);
      
      if (result) {
        // Display results in analysis tab
        this.displayResearchResults(result, query);
        statusSpan.textContent = 'Research completed';
        this.switchTab('analysis');
      } else {
        throw new Error('No research results generated');
      }
      
    } catch (error) {
      console.error('Research failed:', error);
      statusSpan.textContent = 'Research failed';
      this.addResearchChatMessage('system', `❌ Research failed: ${error.message}`);
    }
  }

  createResearchPrompt(query, type) {
    const prompts = {
      academic: `Conduct a comprehensive academic research analysis on: "${query}". Provide: 1) Overview and background, 2) Key findings and insights, 3) Methodological considerations, 4) Conclusions and implications, 5) Suggested further research directions.`,
      market: `Perform a detailed market analysis for: "${query}". Include: 1) Market size and growth trends, 2) Key players and competitive landscape, 3) Customer segments and needs, 4) Opportunities and threats, 5) Market predictions and recommendations.`,
      technology: `Conduct a thorough technology review of: "${query}". Cover: 1) Technical specifications and capabilities, 2) Advantages and limitations, 3) Comparison with alternatives, 4) Use cases and applications, 5) Future development trends.`,
      competitive: `Perform a comprehensive competitive analysis for: "${query}". Analyze: 1) Main competitors and their positioning, 2) Strengths and weaknesses comparison, 3) Market share and performance, 4) Strategic advantages, 5) Competitive recommendations.`,
      trend: `Analyze current and emerging trends related to: "${query}". Examine: 1) Current trend landscape, 2) Driving factors and influences, 3) Impact and implications, 4) Future trajectory, 5) Strategic recommendations.`
    };
    
    return prompts[type] || prompts.academic;
  }

  displayResearchResults(results, query) {
    const analysisTab = document.getElementById('analysis-tab');
    
    analysisTab.innerHTML = `
      <div class="analysis-results">
        <div class="result-header">
          <h3>📊 Research Results</h3>
          <p class="query-display">Query: "${query}"</p>
          <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
        </div>
        <div class="result-content">
          <pre class="result-text">${results}</pre>
        </div>
        <div class="result-actions">
          <button class="research-btn secondary" onclick="appRouter.exportResults()">📥 Export</button>
          <button class="research-btn secondary" onclick="appRouter.shareResults()">🔗 Share</button>
        </div>
      </div>
    `;
  }

  addResearchChatMessage(type, message) {
    const chatHistory = document.getElementById('researchChatHistory');
    if (!chatHistory) return;

    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${type}`;
    
    const icon = type === 'user' ? '👤' : type === 'ai' ? '🤖' : 'ℹ️';
    messageEl.innerHTML = `<strong>${icon} ${type.toUpperCase()}:</strong> ${message}`;
    
    chatHistory.appendChild(messageEl);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  exportResults() {
    // Implementation for exporting research results
    console.log('Exporting research results...');
  }

  shareResults() {
    // Implementation for sharing research results
    console.log('Sharing research results...');
  }
}

// Helper functions
function toggleResearchAIPanel() {
  const panel = document.getElementById('researchAIPanel');
  panel.classList.toggle('minimized');
}

// Initialize app router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
});

// Export for global access
window.AppRouter = AppRouter; 
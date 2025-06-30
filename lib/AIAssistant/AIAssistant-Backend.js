// ===================================
// AI Assistant Backend Module
// SketchPad-SLM - AI-powered Creative Coding Studio
// ===================================

class AIAssistantBackend {
  constructor() {
    // AI State Variables
    this.aiSession = null;
    this.chatHistory = [];
    this.chatMode = 'creative'; // 'creative' or 'general'
    this.aiProvider = 'local'; // 'local' = Qwen, 'openai' = OpenAI API, 'lmstudio' = LM Studio
    this.openaiApiKey = ''; // Session API key
    this.canvaCore = null;
    
    // Agreement and UI state
    this.userAgreementAccepted = false;
    this.agreementTimestamp = null;
    this.agreementModalOpen = false;
    this.pendingAIInitialization = false;
    
    // Context Templates (customizable by user)
    this.customContexts = {
      general: {
        systemPrompt: 'You are a helpful AI assistant. Answer questions clearly and informatively.',
        userTemplate: 'Question: {prompt}\n\nAnswer this question clearly and informatively (maximum 10 lines). Be direct and helpful.'
      },
      creative: {
        systemPrompt: 'You are a p5.js creative coding assistant. Generate compact, creative p5.js code that creates visual art and animations. Always respond in JSON format.',
        userTemplate: `Create p5.js code for: {prompt}

REQUIREMENTS:
1. Use compact syntax with t=0 and draw=_=>{...} pattern
2. Always include t||createCanvas(w=800,h=600) for setup
3. Use t+=0.01 to 0.1 for animation timing
4. Create visually interesting patterns using sin(), cos(), loops
5. Use fill() and stroke() for colors
6. Available functions: ellipse(), rect(), line(), point(), triangle(), arc()
7. Use mathematical patterns: sin(t+i), cos(t*2+i*0.1), etc.

EXAMPLES:
- Spiral: for(i=0;i<100;i++){x=400+cos(t+i*0.1)*i*2; y=300+sin(t+i*0.1)*i*2; ellipse(x,y,5)}
- Particles: for(i=0;i<50;i++){ellipse(400+sin(t+i)*100, 300+cos(t+i*0.5)*100, 8)}
- Waves: for(i=0;i<800;i+=10){ellipse(i, 300+sin(i*0.02+t)*50, 6)}

Return response as JSON:
{
  "code": "t=0\\ndraw=_=>{\\n  t||createCanvas(w=800,h=600)\\n  background(0,20)\\n  t+=0.05\\n  // your creative code here\\n}",
  "description": "Brief description of the animation"
}`
      }
    };
    
    // System prompt for AI
    this.SYSTEM_PROMPT = `You are an AI assistant for SketchPad-SLM, a creative coding studio that uses p5.js with compact JavaScript syntax.

IMPORTANT RULES:
1. Always generate COMPACT p5.js code that works in our editor
2. Use the specific syntax patterns shown below
3. Keep code concise and creative
4. Focus on visual/generative art patterns

REQUIRED CODE STRUCTURE:
- Use compact syntax: t=0,draw=_=>{...}
- Always include: t||createCanvas(w,h) for setup
- Use global variables: t (time), w/h (dimensions)
- Animation: increment t each frame
- Drawing: use p5.js functions like point(), ellipse(), stroke(), fill()

EXAMPLES OF GOOD CODE:
1. Simple animation:
t=0
draw=_=>{
  t||createCanvas(w=800,h=600)
  background(0)
  t+=0.05
  fill(sin(t)*127+128,cos(t)*127+128,255)
  ellipse(w/2+sin(t)*100,h/2+cos(t)*100,50,50)
}

2. Particle system:
t=0
draw=_=>{
  t||createCanvas(w=800,h=600)
  background(0,20)
  t+=0.02
  for(i=0;i<100;i++){
    x=w/2+sin(t+i)*i*2
    y=h/2+cos(t+i*0.1)*i*2
    fill(i*2,255-i*2,255)
    ellipse(x,y,5,5)
  }
}

AVAILABLE FUNCTIONS:
- Drawing: point(), line(), ellipse(), rect(), arc(), triangle()
- Color: fill(), stroke(), noFill(), noStroke(), background()
- Math: sin(), cos(), noise(), random(), mag(), PI, TWO_PI
- Canvas: createCanvas(), strokeWeight()

When user asks for something, generate creative, compact p5.js code that creates visual art matching their request.`;
  }

  // ===================================
  // USER AGREEMENT SYSTEM
  // ===================================

  showUserAgreement() {
    if (this.agreementModalOpen) {
      console.log('⚠️ Agreement modal already open - skipping duplicate');
      return;
    }

    const existingAIModal = document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]');
    if (existingAIModal) {
      existingAIModal.remove();
      console.log('🔄 Closed existing AI modal before showing agreement');
    }

    this.agreementModalOpen = true;
    
    const modal = document.createElement('div');
    modal.className = 'user-agreement-modal';
    modal.id = 'userAgreementModal';
    
    modal.innerHTML = `
      <div class="user-agreement-content">
        <div class="agreement-header">
          <h2>📋 Usage Agreement & Terms</h2>
          <p style="font-size: 14px; color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">
            Please review these important terms before using AI features
          </p>
        </div>
        
        <div class="agreement-section">
          <h3>🤖 AI Technology Usage</h3>
          <p>SketchPad-SLM integrates artificial intelligence for <strong>workflow automation and creative assistance</strong>. AI features include:</p>
          <ul>
            <li>Local Qwen2.5 language model with optimized inference for offline code generation</li>
            <li>OpenAI API integration for advanced AI capabilities</li>
            <li>LM Studio integration for local model serving</li>
            <li>Automated p5.js code generation and creative coding assistance</li>
            <li>Context-aware chat and programming help</li>
          </ul>
        </div>
        
        <div class="warning-box">
          <h4>⚠️ IMPORTANT AI ACCURACY DISCLAIMER</h4>
          <p><strong>AI is NOT a fully accurate tool.</strong> Generated code, responses, and suggestions may contain errors, bugs, or inaccuracies. All AI output should be thoroughly reviewed, tested, and validated by the end user before implementation or reliance.</p>
        </div>
        
        <div class="agreement-section">
          <h3>👤 User Responsibilities</h3>
          <p>By using AI features, you acknowledge and agree to:</p>
          <ul>
            <li><strong>Review all AI-generated content</strong> for accuracy and appropriateness</li>
            <li><strong>Test generated code</strong> before using in production environments</li>
            <li><strong>Verify AI responses</strong> against authoritative sources when needed</li>
            <li><strong>Use AI as an assistant tool</strong>, not as a replacement for human judgment</li>
            <li><strong>Comply with OpenAI's usage policies</strong> when using API features</li>
          </ul>
        </div>
        
        <div class="agreement-section">
          <h3>🛡️ Liability Limitation</h3>
          <p><strong>AIEDX Private Limited or any of its employees</strong> provides AI features "as-is" and makes no warranties regarding:</p>
          <ul>
            <li>Accuracy, completeness, or reliability of AI-generated content</li>
            <li>Suitability for any particular purpose or use case</li>
            <li>Absence of errors, bugs, or security vulnerabilities in generated code</li>
            <li>Compliance with any specific standards or requirements</li>
          </ul>
          <p><strong>AIEDX Private Limited or any of its employees shall not be liable</strong> for any direct, indirect, incidental, consequential, or punitive damages arising from or related to the use of AI features.</p>
        </div>
        
        <div class="agreement-section">
          <h3>🔒 Data & Privacy</h3>
          <p>When using AI features:</p>
          <ul>
            <li><strong>Local AI:</strong> Processing happens on your device, no data sent to external servers</li>
            <li><strong>API Mode:</strong> Your prompts and responses are sent to OpenAI according to their privacy policy</li>
            <li><strong>LM Studio:</strong> Fully local processing, no external data transmission</li>
            <li><strong>Session Data:</strong> API keys are stored temporarily in browser memory only</li>
            <li><strong>No Persistent Storage:</strong> We do not permanently store your AI interactions</li>
          </ul>
        </div>
        
        <div class="agreement-actions">
          <div class="agreement-checkbox">
            <input type="checkbox" id="agreementCheckbox">
            <label for="agreementCheckbox">I have read, understood, and agree to these terms</label>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="context-btn secondary" onclick="aiAssistant.declineAgreement()">Decline</button>
            <button class="context-btn primary" id="acceptAgreementBtn" disabled onclick="aiAssistant.acceptAgreement()">Accept & Continue</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('agreementCheckbox').addEventListener('change', (e) => {
      document.getElementById('acceptAgreementBtn').disabled = !e.target.checked;
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        console.log('⚠️ Agreement must be accepted or declined - cannot close by clicking outside');
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }

  acceptAgreement() {
    this.userAgreementAccepted = true;
    this.agreementTimestamp = Date.now();
    this.agreementModalOpen = false;
    
    const modal = document.getElementById('userAgreementModal');
    if (modal) {
      modal.remove();
    }
    
    console.log('✅ User agreement accepted');
    
    if (this.pendingAIInitialization) {
      console.log('🔄 Proceeding with pending AI initialization');
      this.pendingAIInitialization = false;
      this.initializeAI();
    }
  }

  declineAgreement() {
    this.userAgreementAccepted = false;
    this.agreementModalOpen = false;
    this.pendingAIInitialization = false;
    
    const modal = document.getElementById('userAgreementModal');
    if (modal) {
      modal.remove();
    }
    
    console.log('❌ User agreement declined');
    this.updateStatus('AI features require user agreement acceptance');
    this.addChatMessage('system', 'AI features are disabled. Accept the usage agreement to enable AI assistance.');
  }

  // ===================================
  // AI INITIALIZATION & CONNECTION
  // ===================================

  async initializeAI() {
    try {
      this.updateStatus('🤖 Initializing AI system...');
      document.getElementById('aiStatus').textContent = 'AI: Checking...';
      
      this.pendingAIInitialization = true;
      
      if (!this.userAgreementAccepted) {
        console.log('🔒 User explicitly requested AI - showing agreement first');
        this.showUserAgreement();
        return;
      }
      
      if (this.agreementModalOpen) {
        console.log('⚠️ Agreement modal is open - deferring AI initialization');
        return;
      }
      
      console.log('✅ User explicitly requested AI and agreement is accepted - showing AI selection');
      this.pendingAIInitialization = false;
      this.showAISelectionModal();
      
    } catch (error) {
      console.error('AI initialization error:', error);
      this.pendingAIInitialization = false;
      this.fallbackToTemplates();
    }
  }

  showAISelectionModal() {
    if (this.agreementModalOpen) {
      console.log('⚠️ Agreement modal is open - cannot show AI selection modal');
      return;
    }
    
    if (!this.userAgreementAccepted) {
      console.log('⚠️ User agreement not accepted - cannot show AI selection modal');
      this.showUserAgreement();
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'ai-selection-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.7); z-index: 2000; display: flex;
      align-items: center; justify-content: center;
    `;
    
    if (this.aiProvider === 'openai') {
      modal.innerHTML = this.getOpenAIModalHTML();
    } else if (this.aiProvider === 'lmstudio') {
      modal.innerHTML = this.getLMStudioModalHTML();
    } else {
      modal.innerHTML = this.getLocalQwenModalHTML();
    }
    
    this.addModalStyles();
    document.body.appendChild(modal);
    this.setupModalEventListeners(modal);
  }

  getOpenAIModalHTML() {
    return `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
          <h2 style="color: white; margin-bottom: 20px; text-align: center;">🚀 OpenAI API Models</h2>
        
        <div style="margin-bottom: 20px;">
            <label style="color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 10px; display: block;">Select Model:</label>
            <select id="apiModelSelect" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.1); 
                                               border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; 
                                               color: white; font-size: 14px;">
              <option value="gpt-4o-mini">GPT-4o Mini (Fast & Cost-Effective)</option>
              <option value="gpt-4o">GPT-4o (Most Capable)</option>
            </select>
          </div>
          
          <div style="color: rgba(255,255,255,0.6); font-size: 12px; margin-bottom: 20px; text-align: center;">
            📝 Requires valid OpenAI API key<br/>
            💰 API usage charges apply based on your OpenAI plan
          </div>
          
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="connectApiModel" class="ai-option-btn" style="flex: 1;">
              🔌 Connect OpenAI API
          </button>
        </div>
          
          <button id="closeModal" style="background: rgba(255,255,255,0.2); border: none; 
                  color: white; padding: 8px 16px; border-radius: 5px; cursor: pointer; 
                  float: right; margin-top: 10px;">Cancel</button>
        </div>
      `;
  }

  getLMStudioModalHTML() {
    return `
      <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); 
                  border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
          <h2 style="color: white; margin-bottom: 20px; text-align: center;">🏠 LM Studio Connection</h2>
        
        <div style="margin-bottom: 20px;">
            <button id="connectLMStudio" class="ai-option-btn">
              🔌 Connect to LM Studio
          </button>
          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 5px;">
              Connects to LM Studio running on localhost:1234
          </p>
        </div>
          
          <div style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 20px; text-align: center;">
            📋 Requirements:<br/>
            • LM Studio must be running on port 1234<br/>
            • A model must be loaded in LM Studio<br/>
            • CORS must be enabled in LM Studio settings<br/>
            • No API key required - fully local
          </div>
        
        <button id="closeModal" style="background: rgba(255,255,255,0.2); border: none; 
                color: white; padding: 8px 16px; border-radius: 5px; cursor: pointer; 
                float: right; margin-top: 10px;">Cancel</button>
      </div>
    `;
  }

  getLocalQwenModalHTML() {
    return `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                  border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        <h2 style="color: white; margin-bottom: 20px; text-align: center;">🤖 Local Qwen2.5</h2>
      
      <div style="margin-bottom: 20px;">
          <button id="selectJanus" class="ai-option-btn">
            🚀 Load Qwen2.5-0.5B (~500MB)
        </button>
        <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 5px;">
            Optimized inference with proper generation parameters. No API costs.
        </p>
      </div>
        
        <div style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 20px; text-align: center;">
          ⚠️ Requires WebGPU support and 2GB+ RAM<br/>
          Model cached after first download for instant future loading
        </div>
      
      <button id="closeModal" style="background: rgba(255,255,255,0.2); border: none; 
              color: white; padding: 8px 16px; border-radius: 5px; cursor: pointer; 
              float: right; margin-top: 10px;">Cancel</button>
    </div>
    `;
  }

  addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-option-btn {
        width: 100%; padding: 15px; margin: 5px 0; background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.3); border-radius: 10px; color: white;
        font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;
      }
      .ai-option-btn:hover {
        background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5);
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  }

  setupModalEventListeners(modal) {
    if (this.aiProvider === 'openai') {
      document.getElementById('connectApiModel').onclick = () => {
        const selectedModel = document.getElementById('apiModelSelect').value;
        document.body.removeChild(modal);
        this.initializeApiModel(selectedModel);
      };
    } else if (this.aiProvider === 'lmstudio') {
      document.getElementById('connectLMStudio').onclick = () => {
        document.body.removeChild(modal);
        this.initializeLMStudio();
      };
    } else {
      document.getElementById('selectJanus').onclick = () => {
        document.body.removeChild(modal);
        this.initializeJanus();
      };
    }
    
    document.getElementById('closeModal').onclick = () => {
      document.body.removeChild(modal);
      this.updateStatus('AI initialization cancelled');
      this.addChatMessage('system', 'AI initialization cancelled.');
    };
  }

  // ===================================
  // AI PROVIDER IMPLEMENTATIONS
  // ===================================

  async initializeApiModel(modelName) {
    try {
      this.updateStatus('🚀 Connecting to OpenAI API...');
      document.getElementById('aiStatus').textContent = 'AI: Connecting to API...';
      
      const apiKey = document.getElementById('openaiApiKey').value.trim();
      if (!apiKey) {
        throw new Error('OpenAI API key is required');
      }
      
      this.openaiApiKey = apiKey;
      
      // Test the API connection
      const testResponse = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!testResponse.ok) {
        throw new Error(`API test failed: ${testResponse.status}`);
      }
      
      this.aiSession = { provider: 'openai', model: modelName, apiKey: apiKey };
      document.getElementById('aiStatus').textContent = `AI: ${modelName} Ready`;
      document.getElementById('initAIBtn').textContent = `🚀 ${modelName} Ready`;
      
      this.updateStatus(`✅ Connected to ${modelName} via OpenAI API`);
      this.addChatMessage('system', `🚀 Connected to ${modelName}! You can now generate creative p5.js code and get AI assistance.`);
      
    } catch (error) {
      console.error('OpenAI API initialization failed:', error);
      document.getElementById('aiStatus').textContent = 'AI: API Failed';
      document.getElementById('initAIBtn').textContent = '❌ API Failed';
      this.updateStatus('❌ OpenAI API connection failed: ' + error.message);
      this.addChatMessage('system', `❌ OpenAI API connection failed: ${error.message}`);
      this.fallbackToTemplates();
    }
  }

  async initializeLMStudio() {
    try {
      this.updateStatus('🏠 Connecting to LM Studio...');
      document.getElementById('aiStatus').textContent = 'AI: Connecting to LM Studio...';
      
      // Test connection to LM Studio
      const testResponse = await fetch('http://localhost:1234/v1/models', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!testResponse.ok) {
        throw new Error(`LM Studio connection failed: ${testResponse.status}`);
      }
      
      const models = await testResponse.json();
      const availableModel = models.data && models.data.length > 0 ? models.data[0].id : 'local-model';
      
      this.aiSession = { provider: 'lmstudio', model: availableModel };
      document.getElementById('aiStatus').textContent = `AI: LM Studio Ready`;
      document.getElementById('initAIBtn').textContent = `🏠 LM Studio Ready`;
      
      this.updateStatus(`✅ Connected to LM Studio (${availableModel})`);
      this.addChatMessage('system', `🏠 Connected to LM Studio! You can now generate creative p5.js code locally.`);
      
    } catch (error) {
      console.error('LM Studio initialization failed:', error);
      document.getElementById('aiStatus').textContent = 'AI: LM Studio Failed';
      document.getElementById('initAIBtn').textContent = '❌ LM Studio Failed';
      
      let errorMessage = 'LM Studio connection failed. ';
      if (error.message.includes('CORS')) {
        errorMessage += 'Please enable CORS in LM Studio settings (Server → Enable CORS) and restart the server.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Make sure LM Studio is running on port 1234 with a model loaded.';
      } else {
        errorMessage += error.message;
      }
      
      this.updateStatus('❌ ' + errorMessage);
      this.addChatMessage('system', `❌ ${errorMessage}`);
      this.fallbackToTemplates();
    }
  }

  async initializeJanus() {
    try {
      this.updateStatus('🤖 Loading Qwen2.5 model...');
      document.getElementById('aiStatus').textContent = 'AI: Loading model...';
      
      // Import the canvas agent
      const { canvas } = await import('/lib/agent/canvas.js');
      this.canvaCore = canvas;
      
      // Load the model
      await this.canvaCore.loadModel();
      
      this.aiSession = { provider: 'local', model: 'Qwen2.5-0.5B' };
      document.getElementById('aiStatus').textContent = 'AI: Qwen2.5 Ready';
      document.getElementById('initAIBtn').textContent = '🚀 Qwen2.5 Ready';
      
      this.updateStatus('✅ Qwen2.5 model loaded successfully!');
      this.addChatMessage('system', '🚀 Qwen2.5 model loaded! You can now generate creative p5.js code locally.');
      
    } catch (error) {
      console.error('Qwen2.5 initialization failed:', error);
      document.getElementById('aiStatus').textContent = 'AI: Load Failed';
      document.getElementById('initAIBtn').textContent = '❌ Load Failed';
      this.updateStatus('❌ Failed to load Qwen2.5: ' + error.message);
      this.addChatMessage('system', `❌ Failed to load Qwen2.5: ${error.message}`);
      this.fallbackToTemplates();
    }
  }

  disconnectAI() {
    this.aiSession = null;
    this.canvaCore = null;
    this.openaiApiKey = '';
    
    document.getElementById('aiStatus').textContent = 'AI: Not connected';
    document.getElementById('initAIBtn').textContent = '🔌 Connect';
    document.getElementById('initAIBtn').style.display = 'inline-block';
    document.getElementById('disconnectAIBtn').style.display = 'none';
    
    this.updateStatus('AI disconnected');
    this.addChatMessage('system', 'AI disconnected. Click Connect to re-enable AI features.');
  }

  // ===================================
  // CODE GENERATION
  // ===================================

  async generateAICode(userPrompt) {
    if (!this.aiSession) {
      this.addChatMessage('system', '❌ AI not connected. Please connect to an AI provider first.');
      return null;
    }

    try {
      this.addChatMessage('user', userPrompt);
      this.updateStatus('🤖 Generating code...');

      let result;
      
      if (this.aiSession.provider === 'local') {
        result = await this.canvaCore.generateCode(userPrompt, this.aiSession);
      } else if (this.aiSession.provider === 'openai') {
        result = await this.handleStandardOpenAIGeneration(userPrompt);
      } else if (this.aiSession.provider === 'lmstudio') {
        result = await this.handleLMStudioGeneration(userPrompt);
      }

      if (result && result.code) {
        this.addChatMessage('ai', `Generated: ${result.description || 'Creative p5.js animation'}`);
        this.updateStatus('✅ Code generated successfully!');
        return result.code;
      } else {
        throw new Error('No code generated');
      }

    } catch (error) {
      console.error('Code generation failed:', error);
      this.addChatMessage('ai', `❌ Generation failed: ${error.message}`);
      this.updateStatus('❌ Code generation failed');
      return null;
    }
  }

  async handleStandardOpenAIGeneration(userPrompt) {
    const systemMessage = {
      role: 'system',
      content: this.customContexts.creative.systemPrompt
    };
    
    const userMessage = {
      role: 'user', 
      content: this.customContexts.creative.userTemplate.replace('{prompt}', userPrompt)
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.aiSession.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.aiSession.model,
        messages: [systemMessage, userMessage],
        max_tokens: 1000,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch {
      return { code: content, description: 'Generated code' };
    }
  }

  async handleLMStudioGeneration(userPrompt) {
    const systemMessage = {
      role: 'system',
      content: this.customContexts.creative.systemPrompt
    };
    
    const userMessage = {
      role: 'user',
      content: this.customContexts.creative.userTemplate.replace('{prompt}', userPrompt)
    };

    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.aiSession.model,
        messages: [systemMessage, userMessage],
        max_tokens: 1000,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`LM Studio error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch {
      return { code: content, description: 'Generated code' };
    }
  }

  // ===================================
  // UI HELPERS
  // ===================================

  updateStatus(message) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = message;
    }
  }

  addChatMessage(type, message) {
    const chatHistory = document.getElementById('chatHistory');
    if (!chatHistory) return;

    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${type}`;
    
    const icon = type === 'user' ? '👤' : type === 'ai' ? '🤖' : 'ℹ️';
    messageEl.innerHTML = `<strong>${icon} ${type.toUpperCase()}:</strong> ${message}`;
    
    chatHistory.appendChild(messageEl);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  toggleAIPanel() {
    const panel = document.getElementById('aiFloatingPanel');
    const toggleBtn = document.getElementById('aiToggleBtn');
    
    if (panel.classList.contains('hidden')) {
      panel.classList.remove('hidden');
      toggleBtn.classList.add('active');
    } else {
      panel.classList.add('hidden');
      toggleBtn.classList.remove('active');
    }
  }

  minimizeAIPanel() {
    const panel = document.getElementById('aiFloatingPanel');
    const content = document.getElementById('aiContent');
    
    if (panel.classList.contains('minimized')) {
      panel.classList.remove('minimized');
      content.classList.remove('minimized');
    } else {
      panel.classList.add('minimized');
      content.classList.add('minimized');
    }
  }

  fallbackToTemplates() {
    this.updateStatus('Using template-based generation as fallback');
    this.addChatMessage('system', 'AI connection failed. Using template-based generation.');
  }

  // ===================================
  // UTILITY METHODS
  // ===================================

  setProvider(provider) {
    this.aiProvider = provider;
    this.updateHeaderAIStatus();
  }

  setChatMode(mode) {
    this.chatMode = mode;
    const btn = document.getElementById('chatModeBtn');
    if (btn) {
      btn.textContent = mode === 'creative' ? '🎨 Creative Mode' : '💬 General Mode';
    }
  }

  updateHeaderAIStatus() {
    const headerStatus = document.getElementById('headerAIStatus');
    const connectBtn = document.getElementById('initAIBtn');
    
    if (!headerStatus || !connectBtn) return;
    
    if (this.aiProvider === 'openai') {
      headerStatus.textContent = '🤖 OpenAI API';
      connectBtn.textContent = '🚀 Connect OpenAI';
    } else if (this.aiProvider === 'lmstudio') {
      headerStatus.textContent = '🏠 LM Studio';
      connectBtn.textContent = '🏠 Connect LM Studio';
    } else {
      headerStatus.textContent = '🤖 Local AI';
      connectBtn.textContent = '🔌 Connect Qwen';
    }
  }
}

// Export for use in other modules
window.AIAssistantBackend = AIAssistantBackend;

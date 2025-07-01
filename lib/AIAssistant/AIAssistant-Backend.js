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
    this.aiProvider = 'ollama'; // 'ollama' = Ollama, 'lmstudio' = LM Studio, 'openai' = OpenAI API, 'local' = Local Qwen
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
      },
      // Qwen-specific chat templates for Ollama
      qwen: {
        general: {
          buildPrompt: (systemPrompt, userMessage) => `<|im_start|>system\n${systemPrompt}<|im_end|>\n<|im_start|>user\n${userMessage}<|im_end|>\n<|im_start|>assistant\n`,
          parseResponse: (response, fullPrompt) => response.replace(fullPrompt, '').replace(/<\|im_end\|>/g, '').trim()
        },
        creative: {
          buildPrompt: (systemPrompt, userMessage) => `<|im_start|>system\n${systemPrompt}<|im_end|>\n<|im_start|>user\n${userMessage}<|im_end|>\n<|im_start|>assistant\n`,
          parseResponse: (response, fullPrompt) => response.replace(fullPrompt, '').replace(/<\|im_end\|>/g, '').trim()
        }
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
            <button class="context-btn secondary" id="declineAgreementBtn">Decline</button>
            <button class="context-btn primary" id="acceptAgreementBtn" disabled>Accept & Continue</button>
          </div>
        </div>
      </div>
    `;
    
    // Add CSS styles for the agreement modal
    modal.style.cssText = `
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%;
      background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(30,30,60,0.9) 100%);
      backdrop-filter: blur(10px);
      z-index: 3000; 
      display: flex;
      align-items: center; 
      justify-content: center;
      overflow-y: auto;
      padding: 20px;
      box-sizing: border-box;
      opacity: 1;
      visibility: visible;
      animation: modalFadeIn 0.3s ease-out;
    `;
    
    // Add styles for the content
    const style = document.createElement('style');
    style.textContent = `
      @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes buttonPulse {
        0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
        70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
        100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
      }
      
      .user-agreement-content {
        background: linear-gradient(145deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
        border-radius: 20px;
        padding: 40px;
        max-width: 700px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 
          0 25px 50px rgba(0,0,0,0.25),
          0 0 0 1px rgba(255,255,255,0.1),
          inset 0 1px 0 rgba(255,255,255,0.1);
        color: white;
        animation: modalFadeIn 0.4s ease-out;
        position: relative;
      }
      
      .user-agreement-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      }
      
      .agreement-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        padding-bottom: 20px;
      }
      
      .agreement-header h2 {
        color: white;
        margin: 0 0 10px 0;
        font-size: 28px;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        background: linear-gradient(135deg, #fff 0%, #f0f8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .agreement-header p {
        color: rgba(255,255,255,0.8);
        font-size: 16px;
        margin: 0;
      }
      
      .agreement-section {
        margin: 25px 0;
        padding: 0 10px;
      }
      
      .agreement-section h3 {
        color: #f0f8ff;
        margin: 25px 0 15px 0;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .agreement-section p, .agreement-section li {
        color: rgba(255,255,255,0.85);
        line-height: 1.7;
        font-size: 15px;
        margin-bottom: 10px;
      }
      
      .agreement-section ul {
        padding-left: 20px;
      }
      
      .agreement-section li {
        margin-bottom: 8px;
        position: relative;
      }
      
      .agreement-section li::marker {
        color: #87ceeb;
      }
      
      .warning-box {
        background: linear-gradient(135deg, rgba(255,69,58,0.15) 0%, rgba(255,149,0,0.15) 100%);
        border: 2px solid rgba(255,149,0,0.3);
        border-radius: 15px;
        padding: 20px;
        margin: 25px 0;
        position: relative;
        overflow: hidden;
      }
      
      .warning-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, #ff453a, #ff9500, #ff453a);
      }
      
      .warning-box h4 {
        color: #ffcc00;
        margin: 0 0 15px 0;
        font-size: 18px;
        font-weight: 700;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      }
      
      .agreement-actions {
        margin-top: 40px;
        text-align: center;
        padding-top: 30px;
        border-top: 1px solid rgba(255,255,255,0.2);
      }
      
      .agreement-checkbox {
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 15px;
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      
      .agreement-checkbox input[type="checkbox"] {
        transform: scale(1.4);
        accent-color: #007aff;
      }
      
      .agreement-checkbox label {
        color: rgba(255,255,255,0.95);
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
      }
      
      .context-btn {
        padding: 16px 32px;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin: 0 8px;
        position: relative;
        overflow: hidden;
        min-width: 140px;
      }
      
      .context-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      
      .context-btn:hover::before {
        left: 100%;
      }
      
      .context-btn.primary {
        background: linear-gradient(135deg, #007aff 0%, #0051d5 100%);
        color: white;
        box-shadow: 0 4px 20px rgba(0,122,255,0.3);
      }
      
      .context-btn.primary:hover:not(:disabled) {
        background: linear-gradient(135deg, #0051d5 0%, #003c9b 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,122,255,0.4);
        animation: buttonPulse 1.5s infinite;
      }
      
      .context-btn.primary:disabled {
        background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
        color: rgba(255,255,255,0.5);
        cursor: not-allowed;
        box-shadow: none;
      }
      
      .context-btn.secondary {
        background: rgba(255,255,255,0.1);
        color: white;
        border: 2px solid rgba(255,255,255,0.3);
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }
      
      .context-btn.secondary:hover {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
      
      /* Custom scrollbar */
      .user-agreement-content::-webkit-scrollbar {
        width: 8px;
      }
      
      .user-agreement-content::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.1);
        border-radius: 4px;
      }
      
      .user-agreement-content::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.3);
        border-radius: 4px;
      }
      
      .user-agreement-content::-webkit-scrollbar-thumb:hover {
        background: rgba(255,255,255,0.5);
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    console.log('✅ Agreement modal created and styled');
    
    // Ensure modal is visible (fix for opacity issue)
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.display = 'flex';
    
    // Set up event listeners for agreement buttons
    document.getElementById('agreementCheckbox').addEventListener('change', (e) => {
      document.getElementById('acceptAgreementBtn').disabled = !e.target.checked;
    });
    
    document.getElementById('acceptAgreementBtn').addEventListener('click', () => {
      console.log('✅ Accept button clicked');
      this.acceptAgreement();
    });
    
    document.getElementById('declineAgreementBtn').addEventListener('click', () => {
      console.log('❌ Decline button clicked');
      this.declineAgreement();
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
      this.updateElementText('aiStatus', 'AI: Checking...');
      
      this.pendingAIInitialization = true;
      
      // Check if agreement is already accepted
      if (!this.userAgreementAccepted) {
        console.log('🔒 User explicitly requested AI - showing agreement first');
        this.showUserAgreement();
        return;
      } else {
        console.log('✅ Agreement already accepted - proceeding directly to AI selection');
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
    } else if (this.aiProvider === 'ollama') {
      modal.innerHTML = this.getOllamaModalHTML();
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

  getOllamaModalHTML() {
    return `
      <div style="background: linear-gradient(135deg, #00d4aa 0%, #00a67d 100%); 
                  border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
          <h2 style="color: white; margin-bottom: 20px; text-align: center;">🦙 Ollama Connection</h2>
        
        <div style="margin-bottom: 20px;">
            <button id="connectOllama" class="ai-option-btn">
              🔌 Connect to Ollama
          </button>
          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 5px;">
              Connects to Ollama running on localhost:11434
          </p>
        </div>
          
          <div style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 20px; text-align: center;">
            📋 Requirements:<br/>
            • Ollama must be installed and running<br/>
            • Qwen 2.5 or Qwen 3 model must be pulled<br/>
            • Example: <code style="background: rgba(0,0,0,0.3); padding: 2px 4px; border-radius: 3px;">ollama pull qwen3:0.6b</code><br/>
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
    } else if (this.aiProvider === 'ollama') {
      document.getElementById('connectOllama').onclick = () => {
        document.body.removeChild(modal);
        this.initializeOllama();
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
      this.updateElementText('aiStatus', 'AI: Connecting to API...');
      
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
      this.updateElementText('aiStatus', `AI: ${modelName} Ready`);
      this.updateElementText('initAIBtn', `🚀 ${modelName} Ready`);
      
      this.updateStatus(`✅ Connected to ${modelName} via OpenAI API`);
      this.addChatMessage('system', `🚀 Connected to ${modelName}! You can now generate creative p5.js code and get AI assistance.`);
      
    } catch (error) {
      console.error('OpenAI API initialization failed:', error);
      this.updateElementText('aiStatus', 'AI: API Failed');
      this.updateElementText('initAIBtn', '❌ API Failed');
      this.updateStatus('❌ OpenAI API connection failed: ' + error.message);
      this.addChatMessage('system', `❌ OpenAI API connection failed: ${error.message}`);
      this.fallbackToTemplates();
    }
  }

  async initializeLMStudio() {
    try {
      this.updateStatus('🏠 Connecting to LM Studio...');
      this.updateElementText('aiStatus', 'AI: Connecting to LM Studio...');
      
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
      this.updateElementText('aiStatus', `AI: LM Studio Ready`);
      this.updateElementText('initAIBtn', `🏠 LM Studio Ready`);
      
      this.updateStatus(`✅ Connected to LM Studio (${availableModel})`);
      this.addChatMessage('system', `🏠 Connected to LM Studio! You can now generate creative p5.js code locally.`);
      
    } catch (error) {
      console.error('LM Studio initialization failed:', error);
      this.updateElementText('aiStatus', 'AI: LM Studio Failed');
      this.updateElementText('initAIBtn', '❌ LM Studio Failed');
      
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

  async initializeOllama() {
    try {
      this.updateStatus('🦙 Connecting to Ollama...');
      this.updateElementText('aiStatus', 'AI: Connecting to Ollama...');
      
      // Test connection to Ollama with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const testResponse = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!testResponse.ok) {
        throw new Error(`Ollama connection failed: ${testResponse.status} ${testResponse.statusText}`);
      }
      
      const modelsData = await testResponse.json();
      
      // Find the best available Qwen model (prioritize newer versions)
      let selectedModel = null;
      const modelPriority = ['qwen3:0.6b', 'qwen2.5:7b', 'qwen2.5:3b', 'qwen2.5:1.5b', 'qwen2.5:0.5b', 'qwen:7b', 'qwen:4b', 'qwen:1.8b'];
      
      for (const priority of modelPriority) {
        const found = modelsData.models?.find(m => m.name.includes(priority.split(':')[0]));
        if (found) {
          selectedModel = found.name;
          break;
        }
      }
      
      // Fallback to first available model
      if (!selectedModel) {
        selectedModel = modelsData.models?.[0]?.name || 'qwen3:0.6b';
      }
      
      this.aiSession = { provider: 'ollama', model: selectedModel, baseURL: 'http://localhost:11434' };
      
      this.updateElementText('aiStatus', `AI: Ollama (${selectedModel}) Ready`);
      this.updateElementText('initAIBtn', `🦙 Ollama Ready`);
      
      this.updateStatus(`✅ Connected to Ollama (${selectedModel})`);
      this.addChatMessage('system', `🦙 Connected to Ollama! Using model: ${selectedModel}. You can now generate content with GGUF models locally.`);
      
    } catch (error) {
      console.error('Ollama initialization failed:', error);
      this.updateElementText('aiStatus', 'AI: Ollama Failed');
      this.updateElementText('initAIBtn', '❌ Ollama Failed');
      
      let errorMessage = 'Ollama connection failed. ';
      if (error.name === 'AbortError') {
        errorMessage += 'Connection timeout (>10s). Ollama may be slow or unresponsive. Try: 1) Restart Ollama service 2) Use a smaller model 3) Check system resources';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('CORS')) {
        errorMessage += 'Cannot connect to Ollama server. Make sure: 1) Ollama is installed (https://ollama.ai) 2) Run: "ollama serve" in terminal 3) Pull a model: "ollama pull qwen3:0.6b" 4) Check that port 11434 is available';
      } else if (error.message.includes('404')) {
        errorMessage += 'Ollama API endpoint not found. Make sure you have the latest version of Ollama installed and it\'s running properly.';
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
      this.updateElementText('aiStatus', 'AI: Loading model...');
      
      // Import the canvas agent
      const { canvas } = await import('/lib/agent/canvas.js');
      this.canvaCore = canvas;
      
      // Load the model
      await this.canvaCore.loadModel();
      
      this.aiSession = { provider: 'local', model: 'Qwen2.5-0.5B' };
      this.updateElementText('aiStatus', 'AI: Qwen2.5 Ready');
      this.updateElementText('initAIBtn', '🚀 Qwen2.5 Ready');
      
      this.updateStatus('✅ Qwen2.5 model loaded successfully!');
      this.addChatMessage('system', '🚀 Qwen2.5 model loaded! You can now generate creative p5.js code locally.');
      
    } catch (error) {
      console.error('Qwen2.5 initialization failed:', error);
      this.updateElementText('aiStatus', 'AI: Load Failed');
      this.updateElementText('initAIBtn', '❌ Load Failed');
      this.updateStatus('❌ Failed to load Qwen2.5: ' + error.message);
      this.addChatMessage('system', `❌ Failed to load Qwen2.5: ${error.message}`);
      this.fallbackToTemplates();
    }
  }

  disconnectAI() {
    this.aiSession = null;
    this.canvaCore = null;
    this.openaiApiKey = '';
    
    this.updateElementText('aiStatus', 'AI: Not connected');
    this.updateElementText('initAIBtn', '🔌 Connect');
    
    const initAIBtnEl = document.getElementById('initAIBtn');
    const disconnectAIBtnEl = document.getElementById('disconnectAIBtn');
    
    if (initAIBtnEl) {
      initAIBtnEl.style.display = 'inline-block';
    }
    if (disconnectAIBtnEl) {
      disconnectAIBtnEl.style.display = 'none';
    }
    
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
      } else if (this.aiSession.provider === 'ollama') {
        result = await this.handleOllamaGeneration(userPrompt);
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

  async handleOllamaGeneration(userPrompt) {
    try {
      // Build Qwen chat prompt using proper template
      const systemPrompt = this.customContexts.creative.systemPrompt;
      const userMessage = this.customContexts.creative.userTemplate.replace('{prompt}', userPrompt);
      const chatPrompt = this.customContexts.qwen.creative.buildPrompt(systemPrompt, userMessage);
      
      // Console log the formatted prompt for debugging
      console.log('🦙 Ollama Query (Creative):', chatPrompt);
      
      // Ollama API call for creative coding with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for generation
      
      const response = await fetch(`${this.aiSession.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        signal: controller.signal,
        body: JSON.stringify({
          model: this.aiSession.model,
          prompt: chatPrompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 1200,
            stop: ['<|im_end|>']
          }
        })
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const rawContent = data.response || '';
      
      // Parse response using Qwen template
      let parsedContent = this.customContexts.qwen.creative.parseResponse(rawContent, '');
      
      console.log('🦙 Ollama Response (Creative):', parsedContent);
      
      // Try to parse as JSON first
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(parsedContent);
        console.log('Parsed JSON:', jsonResponse);
        
        const code = jsonResponse.code?.replace(/\\n/g, '\n').replace(/\\t/g, '\t') || '';
        const description = jsonResponse.description || 'Ollama generated creative code!';
        
        return { code, description };
        
      } catch (parseError) {
        console.log('JSON Parse Failed, trying fallback extraction:', parseError);
        
        // Fallback: Try to extract code between backticks or other patterns
        const codeMatch = parsedContent.match(/```(?:javascript|js)?\n?([\s\S]*?)\n?```/);
        if (codeMatch) {
          return { code: codeMatch[1].trim(), description: 'Code extracted from Ollama response' };
        } else if (parsedContent.includes('createCanvas') || parsedContent.includes('draw=') || parsedContent.includes('background(')) {
          // Try to extract p5.js code patterns directly
          const p5Match = parsedContent.match(/(t\s*=\s*0[\s\S]*?draw\s*=\s*[^{]*{[\s\S]*?})/);
          if (p5Match) {
            return { code: p5Match[1].trim(), description: 'P5.js pattern extracted from Ollama response' };
          } else {
            return { code: parsedContent, description: 'Raw code from Ollama' };
          }
        } else {
          return { code: '', description: parsedContent || 'Ollama response could not be parsed as code' };
        }
      }
      
    } catch (error) {
      console.error('Ollama generation error:', error);
      if (error.name === 'AbortError') {
        throw new Error('Ollama generation timeout (>30s). The model may be too slow or overloaded. Try using a smaller model or check system resources.');
      } else {
        throw new Error(`Ollama generation failed: ${error.message}`);
      }
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

  updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
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
    } else if (this.aiProvider === 'ollama') {
      headerStatus.textContent = '🦙 Ollama';
      connectBtn.textContent = '🦙 Connect Ollama';
    } else {
      headerStatus.textContent = '🤖 Local AI';
      connectBtn.textContent = '🔌 Connect Qwen';
    }
  }
  
  // ===================================
  // COMPATIBILITY LAYER FOR DEEPRESEARCH
  // ===================================

  // DeepResearch compatibility methods
  async initialize(provider) {
    this.setProvider(provider);
    await this.initializeAI();
  }

  get isConnected() {
    return this.aiSession !== null;
  }

  async generateContent(prompt, type = 'creative') {
    if (type === 'research') {
      // For research generation, use general context instead of creative
      this.setChatMode('general');
      
      try {
        // Build general research prompt
        const systemPrompt = this.customContexts.general.systemPrompt;
        const userMessage = `Research Query: ${prompt}\n\nPlease provide a comprehensive research response with detailed analysis, key findings, and actionable insights. Structure your response with clear sections and include relevant examples where applicable.`;
        
        let content = '';
        
        if (this.aiSession.provider === 'ollama') {
          const chatPrompt = this.customContexts.qwen.general.buildPrompt(systemPrompt, userMessage);
          
          // Add timeout for research generation - increased for complex document-enhanced research
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout for research
          
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
                max_tokens: 2000,
                stop: ['<|im_end|>']
              }
            })
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status}`);
          }
          
          const data = await response.json();
          content = this.customContexts.qwen.general.parseResponse(data.response || '', '');
          
        } else {
          throw new Error('Only Ollama provider is currently supported for research generation');
        }
        
        return { content: content.trim() };
        
      } catch (error) {
        console.error('Research generation error:', error);
        if (error.name === 'AbortError') {
          throw new Error('Research generation timeout (>2 minutes). The model may be too slow or overloaded. Try using a smaller/faster model like llama3.2:3b or check system resources.');
        } else {
          throw error;
        }
      }
    } else {
      // For other types, use the existing generateAICode method
      const code = await this.generateAICode(prompt);
      return { content: code };
    }
  }

  // Status change callback property
  set onStatusChange(callback) {
    this._onStatusChange = callback;
    
    // Trigger initial status if AI is already connected
    if (this.isConnected && callback) {
      callback({
        connected: true,
        provider: this.aiSession.provider
      });
    }
  }
}

// Export for use in other modules
window.AIAssistantBackend = AIAssistantBackend;

// Compatibility alias for DeepResearch
window.AIAssistant = AIAssistantBackend;

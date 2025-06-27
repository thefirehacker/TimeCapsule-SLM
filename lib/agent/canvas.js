/**
 * SketchPad-SLM AI Agent System
 * Advanced multi-agent system for p5.js code generation and improvement
 */

class CanvaCore {
  constructor() {
    this.conversationHistory = [];
    this.maxAgentTries = 2;
    this.canvaScan = new CanvaScan(this);
    this.canvaArtist = new CanvaArtist(this);
    this.currentSession = null;
    this.debugMode = true;
  }

  /**
   * Main orchestration method - manages the entire code generation pipeline
   */
  async generateCode(userPrompt, aiSession) {
    this.currentSession = aiSession;
    this.log('🎯 CanvaCore: Starting code generation pipeline', 'info', { userPrompt, model: aiSession.model });
    
    // Dev logger pipeline start
    if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
      window.devLogger.startPipeline(userPrompt);
    }
    
    // Add user message to conversation history
    this.addToHistory('user', userPrompt);
    
    try {
      // Stage 1: Initial code generation
      this.log('🎯 CanvaCore: Stage 1 - Initial code generation', 'info');
      let generatedCode = await this.initialCodeGeneration(userPrompt);
      
      if (!generatedCode || generatedCode.length < 10) {
        throw new Error('Initial code generation failed - empty response');
      }
      
      // Stage 2: Code validation and scanning
      this.log('🎯 CanvaCore: Stage 2 - Code validation and scanning', 'info');
      const scanResult = await this.canvaScan.analyzeCode(generatedCode, userPrompt);
      
      if (!scanResult.isValid) {
        this.log('🔍 CanvaScan: Code issues detected, attempting repair', 'warning', { issues: scanResult.issues });
        generatedCode = await this.canvaScan.repairCode(generatedCode, scanResult.issues, userPrompt);
      } else {
        this.log('🔍 CanvaScan: Code validation passed', 'success', { confidence: scanResult.confidence });
      }
      
      // Stage 3: Creativity enhancement
      this.log('🎯 CanvaCore: Stage 3 - Creativity evaluation', 'info');
      const creativityResult = await this.canvaArtist.evaluateCreativity(generatedCode, userPrompt);
      
      if (creativityResult.needsImprovement) {
        this.log('🎨 CanvaArtist: Enhancing creativity', 'info', { score: creativityResult.score, suggestions: creativityResult.suggestions });
        generatedCode = await this.canvaArtist.enhanceCreativity(generatedCode, creativityResult.suggestions, userPrompt);
      } else {
        this.log('🎨 CanvaArtist: Creativity level acceptable', 'success', { score: creativityResult.score });
      }
      
      // Stage 4: Final validation with runtime testing
      this.log('🎯 CanvaCore: Stage 4 - Final validation and runtime testing', 'info');
      const finalValidation = await this.validateFinalCode(generatedCode);
      
      if (!finalValidation.isValid) {
        if (finalValidation.runtimeFailure) {
          this.log('🧪 Runtime execution failed - attempting CanvaScan repair', 'warning');
          // Try one more repair attempt for runtime failures
          generatedCode = await this.canvaScan.repairCode(generatedCode, [finalValidation.error], userPrompt);
          
          // Test again after repair
          const retestValidation = await this.validateFinalCode(generatedCode);
          if (!retestValidation.isValid) {
            throw new Error(`Final validation failed after repair: ${retestValidation.error}`);
          }
        } else {
          throw new Error(`Final validation failed: ${finalValidation.error}`);
        }
      }
      
      // Add successful result to history
      this.addToHistory('assistant', `Generated p5.js code for: ${userPrompt}`, generatedCode);
      
      this.log('✅ CanvaCore: Code generation pipeline completed successfully', 'success');
      return {
        code: generatedCode,
        description: `Advanced p5.js animation for "${userPrompt}" - Multi-agent enhanced`,
        metadata: {
          scanPassed: scanResult.isValid,
          creativityEnhanced: creativityResult.needsImprovement,
          agentTries: this.getAgentTryCount(),
          runtimeTested: finalValidation.runtimeTested,
          visualOutput: finalValidation.visualOutput,
          executionVerified: finalValidation.isValid
        }
      };
      
    } catch (error) {
      this.log(`❌ CanvaCore: Pipeline failed - ${error.message}`, 'error');
      this.addToHistory('system', `Error: ${error.message}`);
      
      // No fallbacks - return error
      throw new Error(`CanvaCore pipeline failed: ${error.message}`);
    }
  }

  /**
   * Initial code generation using the current AI session
   */
  async initialCodeGeneration(userPrompt) {
    this.log('🚀 CanvaCore: Starting initial code generation', 'info');
    
    if (!this.currentSession || this.currentSession.type !== 'openai') {
      throw new Error('OpenAI session required for advanced agent system');
    }
    
    const enhancedPrompt = this.buildEnhancedPrompt(userPrompt);
    
    try {
      const requestBody = {
        model: this.currentSession.model,
        messages: this.buildMessageHistory(enhancedPrompt),
        max_tokens: 1500,
        temperature: 0.8,
        response_format: { type: "json_object" }
      };
      
      const requestHeaders = {
        'Authorization': `Bearer ${this.currentSession.apiKey}`,
        'Content-Type': 'application/json'
      };
      
      // Log API request
      if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
        window.devLogger.logRequest(
          'https://api.openai.com/v1/chat/completions',
          'POST',
          requestHeaders,
          requestBody,
          'INITIAL_GENERATION'
        );
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      // Log API response
      if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
        window.devLogger.logResponse(
          null,
          response.status,
          Object.fromEntries(response.headers.entries()),
          data,
          'INITIAL_GENERATION'
        );
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const content = JSON.parse(data.choices[0].message.content);
      
      this.log('✅ Initial code generation completed', 'success', { codeLength: content.code?.length || 0 });
      return content.code?.replace(/\\n/g, '\n').replace(/\\t/g, '\t') || '';
      
    } catch (error) {
      this.log(`❌ Initial generation failed: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Build enhanced prompt with better instructions
   */
  buildEnhancedPrompt(userPrompt) {
    return `Create advanced p5.js code for: ${userPrompt}

CRITICAL REQUIREMENTS:
1. Use ONLY compact syntax: t=0, draw=_=>{...} pattern
2. ALWAYS include: t||createCanvas(w=800,h=600) at start
3. Use t+=0.01 to 0.1 for smooth animation
4. Create VISUALLY RICH patterns using mathematical functions
5. Use multiple layers of animation for depth
6. AVOID: let/const declarations, complex transformations, nested push/pop
7. USE: Direct coordinate calculations, sin/cos patterns, color gradients

ADVANCED TECHNIQUES:
- Layered animations: Multiple for loops with different patterns
- Color cycling: sin(t+i)*127+128 for dynamic colors  
- Particle systems: Arrays of moving elements
- Mathematical art: Fibonacci, fractals, wave interference
- Visual effects: Trails, opacity, size variations

EXAMPLES OF EXCELLENCE:
- Spiral galaxy: for(i=0;i<200;i++){a=t+i*0.1;r=i*3;x=400+cos(a)*r;y=300+sin(a)*r;fill(sin(a)*127+128,cos(a+1)*127+128,255);ellipse(x,y,8)}
- Particle explosion: for(i=0;i<100;i++){x=400+sin(t+i)*i*4;y=300+cos(t+i*0.7)*i*4;fill(i*2,255-i*2,255);ellipse(x,y,6)}
- Wave interference: for(i=0;i<800;i+=5)for(j=0;j<600;j+=5){d=mag(i-400,j-300);fill(sin(d*0.1-t*3)*127+128,cos(d*0.05-t*2)*127+128,255);ellipse(i,j,3)}

Return JSON: {"code": "complete_working_code", "description": "what_it_creates"}`;
  }

  /**
   * Build message history including previous conversations
   */
  buildMessageHistory(prompt) {
    const systemMessage = {
      role: 'system',
      content: 'You are an expert p5.js creative coding agent. Generate sophisticated, visually stunning animations using compact syntax. Always respond in JSON format with working code.'
    };
    
    const messages = [systemMessage];
    
    // Add recent conversation history (last 6 messages)
    const recentHistory = this.conversationHistory.slice(-6);
    messages.push(...recentHistory);
    
    // Add current prompt
    messages.push({ role: 'user', content: prompt });
    
    return messages;
  }

  /**
   * Validate final generated code with runtime execution test
   */
  async validateFinalCode(code) {
    try {
      // Basic syntax check
      new Function(code);
      
      // Check required patterns
      if (!code.includes('t=0')) {
        return { isValid: false, error: 'Missing t=0 initialization' };
      }
      
      if (!code.includes('draw=')) {
        return { isValid: false, error: 'Missing draw function' };
      }
      
      if (!code.includes('createCanvas')) {
        return { isValid: false, error: 'Missing createCanvas call' };
      }
      
      // Check for forbidden patterns
      if (code.includes('let ') || code.includes('const ')) {
        return { isValid: false, error: 'Contains forbidden let/const declarations' };
      }
      
      // NEW: Runtime execution test
      const runtimeResult = await this.testCodeExecution(code);
      if (!runtimeResult.success) {
        return { 
          isValid: false, 
          error: `Runtime error: ${runtimeResult.error}`,
          runtimeFailure: true 
        };
      }
      
      return { 
        isValid: true, 
        runtimeTested: true,
        visualOutput: runtimeResult.hasVisualOutput 
      };
      
    } catch (syntaxError) {
      return { isValid: false, error: `Syntax error: ${syntaxError.message}` };
    }
  }

  /**
   * Test code execution in a sandboxed environment
   */
  async testCodeExecution(code) {
    return new Promise((resolve) => {
      this.log('🧪 CanvaCore: Testing code execution...', 'info', { codeLength: code.length });
      
      // Create a temporary canvas for testing
      const testCanvas = document.createElement('canvas');
      testCanvas.width = 400;
      testCanvas.height = 400;
      testCanvas.style.position = 'absolute';
      testCanvas.style.left = '-9999px'; // Hide off-screen
      testCanvas.id = 'test-canvas-' + Date.now();
      document.body.appendChild(testCanvas);
      
             let executionSuccess = false;
       let errorMessage = '';
       let hasVisualOutput = false;
       let visualOutputDetails = [];
       let testP5Instance = null;
      
      // Set up error capture
      const originalError = window.onerror;
      const errors = [];
      
      window.onerror = (msg, url, line, col, error) => {
        errors.push({ msg, error: error?.message || msg });
        return false; // Don't prevent default handling
      };
      
      try {
        // Create test p5 instance
        testP5Instance = new p5((p) => {
          // Override p5 functions for testing
          const originalCreateCanvas = p.createCanvas;
          p.createCanvas = function(w, h) {
            // Use our test canvas
            p._renderer = p.createRenderer(p.P2D, testCanvas);
            p.width = w || 400;
            p.height = h || 400;
            return p._renderer;
          };
          
                     // Track if visual output occurs - comprehensive drawing function detection
           const drawingFunctions = [
             'ellipse', 'rect', 'line', 'point',           // Basic shapes
             'triangle', 'quad', 'arc',                    // More shapes  
             'bezier', 'curve',                            // Curves
             'text', 'image',                              // Text and images
             'vertex', 'beginShape', 'endShape'            // Custom shapes
           ];
           
           const originalFunctions = {};
           
                       drawingFunctions.forEach(funcName => {
              if (p[funcName]) {
                originalFunctions[funcName] = p[funcName];
                p[funcName] = function(...args) {
                  hasVisualOutput = true;
                  if (!visualOutputDetails.includes(funcName)) {
                    visualOutputDetails.push(funcName);
                  }
                  return originalFunctions[funcName].apply(this, args);
                };
              }
            });
          
          // Make p5 functions globally available for test
          const p5Functions = ['createCanvas', 'background', 'stroke', 'point', 'sin', 'cos', 'mag', 'noise', 'noFill', 'arc', 'fill', 'noStroke', 'strokeWeight', 'ellipse', 'rect', 'line', 'triangle'];
          p5Functions.forEach(fn => {
            if (p[fn]) window[fn] = p[fn].bind(p);
          });
          
          // Constants
          window.PI = p.PI;
          window.TWO_PI = p.TWO_PI;
          window.w = 400;
          window.h = 400;
          
          try {
            // Execute the test code
            eval(code);
            
            // Test if draw function exists and can be called
            if (window.draw && typeof window.draw === 'function') {
              // Run draw function a few times to test for runtime errors
              for (let i = 0; i < 3; i++) {
                window.draw();
              }
              executionSuccess = true;
            } else {
              errorMessage = 'No draw function found after code execution';
            }
            
          } catch (execError) {
            errorMessage = execError.message;
            this.log(`🧪 Code execution test failed: ${execError.message}`, 'error');
          }
        });
        
        // Wait a bit for execution to complete
        setTimeout(() => {
          // Clean up
          if (testP5Instance) {
            testP5Instance.remove();
          }
          document.body.removeChild(testCanvas);
          window.onerror = originalError;
          
          // Check for captured errors
          if (errors.length > 0) {
            errorMessage = errors[0].msg;
            executionSuccess = false;
          }
          
                     this.log(`🧪 Execution test complete: ${executionSuccess ? 'SUCCESS' : 'FAILED'}`, executionSuccess ? 'success' : 'error', {
             executionSuccess,
             hasVisualOutput,
             visualFunctions: visualOutputDetails,
             errorCount: errors.length
           });
           
           if (hasVisualOutput) {
             this.log(`🎨 Visual output detected: ${visualOutputDetails.join(', ')}`, 'success');
           } else {
             this.log('⚠️ No visual output detected', 'warning');
           }
           
           resolve({
             success: executionSuccess,
             error: errorMessage,
             hasVisualOutput: hasVisualOutput,
             visualFunctions: visualOutputDetails,
             errors: errors
           });
        }, 1000); // 1 second test duration
        
      } catch (setupError) {
        // Clean up on setup error
        if (testCanvas.parentNode) {
          document.body.removeChild(testCanvas);
        }
        window.onerror = originalError;
        
        resolve({
          success: false,
          error: `Setup error: ${setupError.message}`,
          hasVisualOutput: false
        });
      }
    });
  }



  /**
   * Add message to conversation history
   */
  addToHistory(role, content, code = null) {
    const message = { role, content };
    if (code) {
      message.metadata = { code };
    }
    
    this.conversationHistory.push(message);
    
    // Keep only last 20 messages to manage memory
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  }

  /**
   * Get total agent try count
   */
  getAgentTryCount() {
    return (this.canvaScan.tryCount || 0) + (this.canvaArtist.tryCount || 0);
  }

  /**
   * Logging utility
   */
  log(message, level = 'info', data = null) {
    if (!this.debugMode) return;
    
    const colors = {
      info: '#4facfe',
      success: '#4CAF50', 
      warning: '#FF9800',
      error: '#f44336'
    };
    
    console.log(`%c${message}`, `color: ${colors[level]}; font-weight: bold;`);
    
    // Send to dev logger if available
    if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
      const stage = message.includes('CanvaCore:') ? 'CORE' : 
                   message.includes('CanvaScan:') ? 'SCAN' : 
                   message.includes('CanvaArtist:') ? 'ARTIST' : 'SYSTEM';
      window.devLogger.logPipeline(stage, message, data, level);
    }
  }
}

/**
 * CanvaScan Agent - Code Analysis and Repair
 */
class CanvaScan {
  constructor(core) {
    this.core = core;
    this.tryCount = 0;
  }

  /**
   * Analyze code for issues including runtime testing
   */
  async analyzeCode(code, originalPrompt) {
    this.core.log('🔍 CanvaScan: Analyzing code for issues', 'info');
    
    const issues = [];
    
    // Syntax validation
    try {
      new Function(code);
    } catch (error) {
      issues.push(`Syntax error: ${error.message}`);
    }
    
    // Pattern validation
    if (!code.includes('t=0')) issues.push('Missing time variable initialization');
    if (!code.includes('draw=')) issues.push('Missing draw function');
    if (!code.includes('createCanvas')) issues.push('Missing canvas creation');
    if (code.includes('let ') || code.includes('const ')) issues.push('Contains forbidden variable declarations');
    if (code.includes('push()') && code.includes('pop()')) issues.push('Complex transformations may cause issues');
    
    // Visual completeness check
    if (!code.includes('fill(') && !code.includes('stroke(')) issues.push('No visual styling detected');
    if (!code.includes('ellipse(') && !code.includes('rect(') && !code.includes('line(')) issues.push('No drawing commands detected');
    
    // NEW: Quick runtime test if basic checks pass
    if (issues.length === 0) {
      this.core.log('🔍 CanvaScan: Running quick execution test...', 'info');
      const runtimeResult = await this.core.testCodeExecution(code);
      if (!runtimeResult.success) {
        issues.push(`Runtime execution failed: ${runtimeResult.error}`);
        this.core.log(`🔍 CanvaScan: Runtime test failed - ${runtimeResult.error}`, 'warning');
      } else if (!runtimeResult.hasVisualOutput) {
        issues.push('Code executes but produces no visual output');
        this.core.log('🔍 CanvaScan: No visual output detected', 'warning');
      }
    }
    
    const isValid = issues.length === 0;
    
    this.core.log(`🔍 CanvaScan: Analysis complete - ${isValid ? 'PASSED' : 'ISSUES FOUND'}`, isValid ? 'success' : 'warning');
    
    return {
      isValid,
      issues,
      confidence: isValid ? 1.0 : Math.max(0.1, 1.0 - (issues.length * 0.2)),
      runtimeTested: true
    };
  }

  /**
   * Repair code issues
   */
  async repairCode(code, issues, originalPrompt) {
    if (this.tryCount >= this.core.maxAgentTries) {
      this.core.log('🔍 CanvaScan: Max tries reached, returning original code', 'warning');
      return code;
    }
    
    this.tryCount++;
    this.core.log(`🔍 CanvaScan: Attempting repair (try ${this.tryCount}/${this.core.maxAgentTries})`, 'info');
    
    const repairPrompt = this.buildRepairPrompt(code, issues, originalPrompt);
    
    try {
      const requestBody = {
        model: this.core.currentSession.model,
        messages: [
          {
            role: 'system',
            content: 'You are a p5.js code repair specialist. Fix code issues while maintaining the original creative intent. Always respond in JSON format.'
          },
          { role: 'user', content: repairPrompt }
        ],
        max_tokens: 1200,
        temperature: 0.3,
        response_format: { type: "json_object" }
      };
      
      const requestHeaders = {
        'Authorization': `Bearer ${this.core.currentSession.apiKey}`,
        'Content-Type': 'application/json'
      };
      
      // Log API request
      if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
        window.devLogger.logRequest(
          'https://api.openai.com/v1/chat/completions',
          'POST',
          requestHeaders,
          requestBody,
          'CODE_REPAIR'
        );
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      // Log API response
      if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
        window.devLogger.logResponse(
          null,
          response.status,
          Object.fromEntries(response.headers.entries()),
          data,
          'CODE_REPAIR'
        );
      }
      
      if (!response.ok) {
        throw new Error(`Repair API error: ${response.status}`);
      }
      
      const result = JSON.parse(data.choices[0].message.content);
      
      const repairedCode = result.code?.replace(/\\n/g, '\n').replace(/\\t/g, '\t') || code;
      
      this.core.log('🔍 CanvaScan: Code repair completed', 'success', { originalLength: code.length, repairedLength: repairedCode.length });
      return repairedCode;
      
    } catch (error) {
      this.core.log(`🔍 CanvaScan: Repair failed - ${error.message}`, 'error');
      return code; // Return original if repair fails
    }
  }

  /**
   * Build repair prompt
   */
  buildRepairPrompt(code, issues, originalPrompt) {
    return `Fix this p5.js code that was generated for: "${originalPrompt}"

CURRENT CODE:
${code}

DETECTED ISSUES:
${issues.map(issue => `- ${issue}`).join('\n')}

REPAIR REQUIREMENTS:
1. Fix all detected issues
2. Maintain the original creative intent
3. Use only compact syntax (t=0, draw=_=>{...})
4. Ensure code follows SketchPad-SLM patterns
5. Keep visual appeal and animation quality

Return JSON: {"code": "fixed_code", "changes": "what_was_fixed"}`;
  }
}

/**
 * CanvaArtist Agent - Creativity Enhancement
 */
class CanvaArtist {
  constructor(core) {
    this.core = core;
    this.tryCount = 0;
  }

  /**
   * Evaluate creativity level of generated code
   */
  async evaluateCreativity(code, originalPrompt) {
    this.core.log('🎨 CanvaArtist: Evaluating creativity', 'info');
    
    const creativityScore = this.calculateCreativityScore(code);
    const suggestions = this.generateSuggestions(code, originalPrompt);
    
    const needsImprovement = creativityScore < 0.7;
    
    this.core.log(`🎨 CanvaArtist: Creativity score ${creativityScore.toFixed(2)} - ${needsImprovement ? 'NEEDS IMPROVEMENT' : 'GOOD'}`, 
                  needsImprovement ? 'warning' : 'success');
    
    return {
      score: creativityScore,
      needsImprovement,
      suggestions
    };
  }

  /**
   * Calculate creativity score based on code analysis
   */
  calculateCreativityScore(code) {
    let score = 0.3; // Base score
    
    // Check for mathematical complexity
    if (code.includes('sin(') && code.includes('cos(')) score += 0.2;
    if (code.includes('noise(')) score += 0.1;
    if (code.includes('random(')) score += 0.1;
    
    // Check for animation sophistication
    if (code.match(/for\s*\(/g)?.length >= 2) score += 0.2; // Multiple loops
    if (code.includes('t+i') || code.includes('t*i')) score += 0.15; // Time-based variation
    
    // Check for visual richness
    if (code.includes('fill(') && code.includes('stroke(')) score += 0.1;
    if (code.match(/fill\([^)]*sin|cos/)) score += 0.15; // Dynamic colors
    
    // Check for particle systems or complex patterns
    if (code.match(/for.*{.*ellipse.*}/)) score += 0.1; // Particle-like patterns
    
    return Math.min(1.0, score);
  }

  /**
   * Generate creativity enhancement suggestions
   */
  generateSuggestions(code, originalPrompt) {
    const suggestions = [];
    
    if (!code.includes('sin(') || !code.includes('cos(')) {
      suggestions.push('Add trigonometric functions for organic movement');
    }
    
    if (code.match(/for\s*\(/g)?.length < 2) {
      suggestions.push('Add multiple animation layers with nested loops');
    }
    
    if (!code.match(/fill\([^)]*sin|cos/)) {
      suggestions.push('Implement dynamic color cycling using mathematical functions');
    }
    
    if (!code.includes('background(') || !code.match(/background\([^)]*,\s*\d+\)/)) {
      suggestions.push('Add trailing effects with transparent background');
    }
    
    if (code.split('\n').length < 8) {
      suggestions.push('Increase visual complexity with more animation elements');
    }
    
    return suggestions;
  }

  /**
   * Enhance creativity of the code
   */
  async enhanceCreativity(code, suggestions, originalPrompt) {
    if (this.tryCount >= this.core.maxAgentTries) {
      this.core.log('🎨 CanvaArtist: Max tries reached, returning original code', 'warning');
      return code;
    }
    
    this.tryCount++;
    this.core.log(`🎨 CanvaArtist: Enhancing creativity (try ${this.tryCount}/${this.core.maxAgentTries})`, 'info');
    
    const enhancementPrompt = this.buildEnhancementPrompt(code, suggestions, originalPrompt);
    
    try {
      const requestBody = {
        model: this.core.currentSession.model,
        messages: [
          {
            role: 'system',
            content: 'You are a creative p5.js enhancement specialist. Transform good code into visually stunning masterpieces while maintaining performance. Always respond in JSON format.'
          },
          { role: 'user', content: enhancementPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.9,
        response_format: { type: "json_object" }
      };
      
      const requestHeaders = {
        'Authorization': `Bearer ${this.core.currentSession.apiKey}`,
        'Content-Type': 'application/json'
      };
      
      // Log API request
      if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
        window.devLogger.logRequest(
          'https://api.openai.com/v1/chat/completions',
          'POST',
          requestHeaders,
          requestBody,
          'CREATIVITY_ENHANCEMENT'
        );
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      // Log API response
      if (typeof window !== 'undefined' && window.devLogger && window.devModeActive) {
        window.devLogger.logResponse(
          null,
          response.status,
          Object.fromEntries(response.headers.entries()),
          data,
          'CREATIVITY_ENHANCEMENT'
        );
      }
      
      if (!response.ok) {
        throw new Error(`Enhancement API error: ${response.status}`);
      }
      
      const result = JSON.parse(data.choices[0].message.content);
      
      const enhancedCode = result.code?.replace(/\\n/g, '\n').replace(/\\t/g, '\t') || code;
      
      this.core.log('🎨 CanvaArtist: Creativity enhancement completed', 'success', { originalLength: code.length, enhancedLength: enhancedCode.length });
      return enhancedCode;
      
    } catch (error) {
      this.core.log(`🎨 CanvaArtist: Enhancement failed - ${error.message}`, 'error');
      return code; // Return original if enhancement fails
    }
  }

  /**
   * Build enhancement prompt
   */
  buildEnhancementPrompt(code, suggestions, originalPrompt) {
    return `Enhance this p5.js code to be more visually stunning for: "${originalPrompt}"

CURRENT CODE:
${code}

ENHANCEMENT SUGGESTIONS:
${suggestions.map(s => `- ${s}`).join('\n')}

ENHANCEMENT GOALS:
1. Make it visually spectacular and mesmerizing
2. Add multiple layers of animation depth
3. Implement sophisticated mathematical patterns
4. Create dynamic color schemes that evolve over time
5. Add particle systems or complex geometric patterns
6. Maintain smooth 60fps performance
7. Keep compact syntax (no let/const, no complex transformations)

ADVANCED TECHNIQUES TO CONSIDER:
- Wave interference patterns
- Fibonacci spirals
- Fractal-like recursive patterns  
- Color harmony using HSB color space
- Multiple time scales (t, t*2, t*0.5)
- Layered transparency effects
- Mathematical art (polar coordinates, parametric equations)

Return JSON: {"code": "enhanced_spectacular_code", "enhancements": "what_was_improved"}`;
  }
}

// Export the main CanvaCore class
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CanvaCore, CanvaScan, CanvaArtist };
} else {
  window.CanvaCore = CanvaCore;
  window.CanvaScan = CanvaScan;
  window.CanvaArtist = CanvaArtist;
}

/**
 * WebGL Draw Call Monitoring Example
 * This shows how to detect visual output by monitoring GPU draw calls
 */

class WebGLDrawCallMonitor {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = null;
    this.drawCallCount = 0;
    this.drawCallTypes = [];
    this.originalMethods = {};
    this.isMonitoring = false;
  }

  /**
   * Start monitoring WebGL draw calls
   */
  startMonitoring() {
    // Get WebGL context from canvas
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    
    if (!this.gl) {
      console.warn('WebGL not available - cannot monitor draw calls');
      return false;
    }

    console.log('🎮 Starting WebGL draw call monitoring...');
    this.isMonitoring = true;
    this.drawCallCount = 0;
    this.drawCallTypes = [];

    // Monitor primary drawing methods
    this.wrapDrawMethod('drawArrays');
    this.wrapDrawMethod('drawElements');
    this.wrapDrawMethod('drawArraysInstanced');
    this.wrapDrawMethod('drawElementsInstanced');

    return true;
  }

  /**
   * Wrap a WebGL draw method to monitor calls
   */
  wrapDrawMethod(methodName) {
    if (!this.gl[methodName]) return;

    // Store original method
    this.originalMethods[methodName] = this.gl[methodName];

    // Replace with monitoring wrapper
    this.gl[methodName] = (...args) => {
      if (this.isMonitoring) {
        this.drawCallCount++;
        
        // Record draw call details
        const drawCall = {
          method: methodName,
          mode: this.getDrawMode(args[0]),
          vertexCount: args[1],
          timestamp: Date.now()
        };
        
        this.drawCallTypes.push(drawCall);
        
        console.log(`🎮 WebGL Draw Call #${this.drawCallCount}:`, drawCall);
      }

      // Call original method
      return this.originalMethods[methodName].apply(this.gl, args);
    };
  }

  /**
   * Convert WebGL primitive mode to human-readable string
   */
  getDrawMode(mode) {
    const gl = this.gl;
    const modes = {
      [gl.POINTS]: 'POINTS',
      [gl.LINES]: 'LINES', 
      [gl.LINE_STRIP]: 'LINE_STRIP',
      [gl.LINE_LOOP]: 'LINE_LOOP',
      [gl.TRIANGLES]: 'TRIANGLES',
      [gl.TRIANGLE_STRIP]: 'TRIANGLE_STRIP',
      [gl.TRIANGLE_FAN]: 'TRIANGLE_FAN'
    };
    return modes[mode] || `UNKNOWN(${mode})`;
  }

  /**
   * Stop monitoring and restore original methods
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;

    console.log(`🎮 Stopping WebGL monitoring. Total draw calls: ${this.drawCallCount}`);
    
    // Restore original methods
    Object.keys(this.originalMethods).forEach(methodName => {
      this.gl[methodName] = this.originalMethods[methodName];
    });

    this.isMonitoring = false;
    return this.getResults();
  }

  /**
   * Get monitoring results
   */
  getResults() {
    return {
      hasVisualOutput: this.drawCallCount > 0,
      drawCallCount: this.drawCallCount,
      drawCallTypes: this.drawCallTypes,
      uniqueMethods: [...new Set(this.drawCallTypes.map(call => call.method))],
      uniqueModes: [...new Set(this.drawCallTypes.map(call => call.mode))]
    };
  }
}

/**
 * Example usage with p5.js WEBGL mode
 */
function testWebGLMonitoring() {
  // Create p5.js sketch with WEBGL renderer
  new p5((p) => {
    let monitor;
    
    p.setup = function() {
      // Create WEBGL canvas
      const canvas = p.createCanvas(400, 400, p.WEBGL);
      
      // Start monitoring WebGL draw calls
      monitor = new WebGLDrawCallMonitor(canvas.canvas);
      monitor.startMonitoring();
    };
    
    p.draw = function() {
      p.background(0);
      
      // These p5.js calls will trigger WebGL draw calls
      p.fill(255, 0, 0);
      p.box(50);                    // → gl.drawElements() calls
      
      p.fill(0, 255, 0);
      p.sphere(30);                 // → Multiple gl.drawArrays() calls
      
      p.stroke(255);
      p.line(-100, 0, 0, 100, 0, 0); // → gl.drawArrays(LINES, ...)
    };
    
    // Stop monitoring after 3 seconds and show results
    setTimeout(() => {
      const results = monitor.stopMonitoring();
      console.log('🎮 WebGL Monitoring Results:', results);
      
      if (results.hasVisualOutput) {
        console.log(`✅ Visual output detected: ${results.drawCallCount} draw calls`);
        console.log(`📊 Draw methods used: ${results.uniqueMethods.join(', ')}`);
        console.log(`🎨 Primitive types: ${results.uniqueModes.join(', ')}`);
      } else {
        console.log('❌ No visual output detected');
      }
    }, 3000);
  });
}

/**
 * What you'd see in console:
 * 
 * 🎮 Starting WebGL draw call monitoring...
 * 🎮 WebGL Draw Call #1: {method: "drawElements", mode: "TRIANGLES", vertexCount: 36, timestamp: 1699123456789}
 * 🎮 WebGL Draw Call #2: {method: "drawArrays", mode: "TRIANGLES", vertexCount: 960, timestamp: 1699123456790}
 * 🎮 WebGL Draw Call #3: {method: "drawArrays", mode: "LINES", vertexCount: 2, timestamp: 1699123456791}
 * 🎮 Stopping WebGL monitoring. Total draw calls: 3
 * 🎮 WebGL Monitoring Results: {
 *   hasVisualOutput: true,
 *   drawCallCount: 3,
 *   drawCallTypes: [...],
 *   uniqueMethods: ["drawElements", "drawArrays"],
 *   uniqueModes: ["TRIANGLES", "LINES"]
 * }
 * ✅ Visual output detected: 3 draw calls
 * 📊 Draw methods used: drawElements, drawArrays  
 * 🎨 Primitive types: TRIANGLES, LINES
 */

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebGLDrawCallMonitor;
} else {
  window.WebGLDrawCallMonitor = WebGLDrawCallMonitor;
} 
# Canvas3D-LLM

> A live p5.js code editor with Monaco Editor and AI World Generator.

Canvas3D-LLM provides a split-view p5.js live editor where you can write compact JavaScript code and see it execute immediately. It also includes an AI-powered world generator using modern Small Language Models that run directly in your browser.

---

## 🚀 Features

- **Canvas.html**: Live p5.js editor with Monaco
  - Split-view: code editor on left, canvas on right
  - Execute code from editor with "Draw" button
  - Supports compact JavaScript and creative coding patterns
  
- **WorldGenerator.html**: AI-powered world creator
  - 5 modern SLMs (Phi-3, Gemma, Qwen2, TinyLlama, SmolLM)
  - Visual world maps with interactive locations
  - Custom code editor for world generation logic
  - Save/load functionality for persistent worlds

---

## 🎨 Code Editor Usage

### Compact JavaScript Patterns

The editor supports **compact JavaScript syntax** for creative coding. Examples:

**Fish Animation** (Parametric curve with trigonometric functions):
```javascript
a=(x,y,d=mag(k=(4+cos(y))*cos(x/4),e=y/8-20))=>point((q=sin(k*3)+sin(y/19+9)*k*(6+sin(e*14-d)))*cos(d/8+t/4)+50*cos(c=d-t)+200,q*sin(c)+d*7*sin(c/4)+200)
t=0,draw=$=>{t||createCanvas(w=400,w);background(9);stroke(w,116);for(t+=PI/120,i=1e4;i--;)a(i,i/235)}
```

**Noise-based Pattern** (Perlin noise with arcs):
```javascript
t=0
draw=_=>{t++||createCanvas(W=720,W)
background(0)
noFill()
F=p=>noise(p/W-t/W)*35
X=cos(A=F(0)+PI)*99+360
Y=sin(A)*99+360
for(i=0;i<W;i++)stroke(W,255-i/3)+arc(X+=cos(A=F(i))*2,Y+=sin(A)*2,S=40-i/20,S,A-(D=i**2/W),A+D,PIE)}
```

### Available p5.js Functions

All standard p5.js functions are available:
- **Drawing**: `point()`, `line()`, `ellipse()`, `rect()`, `arc()`, `triangle()`
- **Color**: `fill()`, `stroke()`, `noFill()`, `noStroke()`, `background()`
- **Math**: `sin()`, `cos()`, `noise()`, `mag()`, `PI`, `TWO_PI`
- **Canvas**: `createCanvas()`, `strokeWeight()`

---

## 🤖 LLM Instructions for Creative Coding

When generating p5.js code for this editor, follow these patterns:

### Structure
```javascript
// Global variables (optional)
t=0

// Main draw function
draw=_=>{
  // Setup canvas (only once)
  t||createCanvas(400,400)
  
  // Animation logic
  t+=0.05
  
  // Drawing commands
  background(0)
  // ... your creative code
}
```

### Pattern Types to Generate

1. **Parametric Curves**: Use trigonometric functions with time `t`
   ```javascript
   x=sin(t)*100+200
   y=cos(t*1.5)*50+200
   ```

2. **Particle Systems**: Loop through arrays or use for loops
   ```javascript
   for(i=0;i<1000;i++){
     point(random(400),random(400))
   }
   ```

3. **Geometric Patterns**: Nested loops with mathematical relationships
   ```javascript
   for(i=0;i<20;i++)for(j=0;j<20;j++){
     ellipse(i*20,j*20,sin(i+j+t)*10,sin(i+j+t)*10)
   }
   ```

4. **Noise-based**: Use `noise()` for organic movement
   ```javascript
   x=noise(t)*400
   y=noise(t+100)*400
   ```

### Tips for Compact Code
- Use comma operator: `t=0,x=200,y=200`
- Inline assignments: `ellipse(x=sin(t)*100,y=cos(t)*100,20,20)`
- Ternary operators: `t>PI?background(0):background(255)`
- Short variable names: `t`, `i`, `x`, `y`, `w`, `h`

---

## 💾 Getting Started

1. **Clone or download the repository**
2. **Open Canvas.html** in your browser for the live editor
3. **Open WorldGenerator.html** for the AI world generator
4. **Start coding!** - No build step required

### Quick Start
1. Open `Canvas.html`
2. Type or paste p5.js code in the left editor
3. Click "Draw" to execute
4. Modify code and click "Draw" again to see changes

---

## 🌍 World Generator

1. Open `WorldGenerator.html`
2. Select an AI model and click "Load Selected Model"
3. Choose world settings (type, size, theme)
4. Click "Generate New World"
5. Explore with the AI chat or edit custom generation code

---

## 📄 Files

- `Canvas.html` - Live p5.js code editor
- `WorldGenerator.html` - AI world generator  
- `WorldGenerator-v2.html` - Enhanced world generator
- `Script01.js` - Utility scripts
- `CREDITS` - Attribution for algorithms
- `LICENSE.md` - Apache 2.0 License

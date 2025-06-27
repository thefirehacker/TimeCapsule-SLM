<div align="center">
  
  <img src="https://mybubblpublic.s3.ap-south-1.amazonaws.com/SketchPad-SLM.png" alt="SketchPad-SLM Logo" width="180" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
  
  # 🎨 SketchPad-SLM
  
  ### *AI-powered creative coding studio for generating stunning p5.js visual art and animations*
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Available-00C851?style=for-the-badge&logo=rocket)](https://sketchpad.bubblspace.com)
  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
  [![AI Powered](https://img.shields.io/badge/🤖_AI-Powered-ff6b35?style=for-the-badge)](https://sketchpad.bubblspace.com)
  [![Made with Love](https://img.shields.io/badge/Made_with-❤️-red?style=for-the-badge)](https://x.com/thefirehacker)
  
  ---
  
  ## 🌐 **✨ Experience Live Now! ✨**
  
  ### **🎯 [Launch SketchPad-SLM →](https://sketchpad.bubblspace.com)**
  
  <table>
  <tr>
  <td width="50%" align="center">
    
  **🚀 Instant Access**
  
  No downloads, no setup - just click and create!
  Professional-grade creative coding in your browser.
    
  </td>
  <td width="50%" align="center">
    
  **🤖 AI-Powered**
  
  Local FP16 AI & OpenAI integration for intelligent code generation and creative assistance.
    
  </td>
  </tr>
  </table>
  
  ### 🎨 **What You Get:**
  
  <div align="left" style="margin: 20px 0;">
  
  💻 **Real-time Monaco Editor** with p5.js integration  
  🧠 **Dual AI Modes**: Local Qwen2.5 FP16 + OpenAI API  
  ⚙️ **Custom Context Templates** for personalized AI behavior  
  📱 **Responsive Design** that works on all devices  
  🎯 **One-Click Execution** with instant visual feedback  
  🔒 **Privacy First** with local AI processing option  
  
  </div>
  
  ---
  
</div>

## 🎯 **What is SketchPad-SLM?**

SketchPad-SLM is a **revolutionary creative coding platform** that combines the power of **p5.js**, **Monaco Editor**, and **cutting-edge AI** to create an unparalleled digital art creation experience. Write code, see instant results, and let AI amplify your creativity!

<div align="center">

### 🎨 **Create → Generate → Visualize**

</div>

---

## 🚀 **Core Features**

<table>
<tr>
<td width="50%">

### 🎨 **Canvas Studio**
- **Monaco Editor Integration** - Professional code editing
- **Real-time Execution** - Instant visual feedback  
- **Split-view Design** - Code left, canvas right
- **Compact JavaScript** - Optimized for creative coding
- **Copy & Share** - Export your creations easily

</td>
<td width="50%">

### 🤖 **AI Powerhouse**
- **Local FP16 Qwen2.5** - Privacy-focused AI (1GB model)
- **OpenAI Integration** - GPT-4o, GPT-4o Mini support
- **Custom Templates** - Personalize AI behavior
- **Smart Suggestions** - Context-aware code generation
- **Dual Mode Support** - Local + Cloud AI options

</td>
</tr>
</table>

### 🌍 **World Generator** *(Bonus Feature)*
- **5 Modern SLMs** - Phi-3, Gemma, Qwen2, TinyLlama, SmolLM
- **Interactive Maps** - Visual world exploration
- **Persistent Worlds** - Save and load your creations
- **Custom Logic** - Advanced world generation scripting

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

## 🚀 **Getting Started**

<div align="center">

### 🎯 **Choose Your Adventure!**

</div>

<table>
<tr>
<td width="50%" align="center">

### 🌐 **Instant Online** *(Recommended)*

**🎯 [Launch Now →](https://sketchpad.bubblspace.com)**

✅ **Zero Setup** - Works immediately  
✅ **Full AI Features** - Local FP16 + OpenAI  
✅ **Professional Grade** - Production ready  
✅ **Always Updated** - Latest features  

</td>
<td width="50%" align="center">

### 💻 **Local Development**

**📁 Clone & Code**

```bash
git clone https://github.com/thefirehacker/SketchPad-SLM
cd SketchPad-SLM
# Open Canvas.html in browser
```

✅ **Full Source Access**  
✅ **Customization Ready**  
✅ **Offline Capable**  
✅ **Development Mode**

</td>
</tr>
</table>

---

### 🎯 **Quick Start Guide**

<div align="left">

**Step 1:** 🌐 **[Open SketchPad-SLM](https://sketchpad.bubblspace.com)** in your browser  
**Step 2:** 🤖 **Choose AI Mode** - Local FP16 (privacy) or OpenAI API (power)  
**Step 3:** 🎨 **Start Creating** - Type code or chat with AI for generation  
**Step 4:** ▶️ **Hit "Draw"** - See your art come to life instantly!  
**Step 5:** 🎊 **Share & Enjoy** - Copy, save, and show off your creations  

</div>

### 🛠️ **Development Setup** *(For Contributors)*

```bash
# Install dependencies
npm i -g live-server

# Start local server
live-server .

# Open http://localhost:8080/Canvas.html
# Select AI model and start coding!
```

---

## 🌍 World Generator

1. Open `WorldGenerator.html`
2. Select an AI model and click "Load Selected Model"
3. Choose world settings (type, size, theme)
4. Click "Generate New World"
5. Explore with the AI chat or edit custom generation code

---

## 📄 **Project Structure**

<table>
<tr>
<td width="50%">

### 🎨 **Core Files**
- `Canvas.html` - Main creative coding studio
- `WorldGenerator.html` - AI world creator
- `WorldGenerator-v2.html` - Enhanced world generator
- `Script01.js` - Utility functions and helpers

</td>
<td width="50%">

### 📋 **Documentation**
- `README.md` - This comprehensive guide
- `CREDITS` - Algorithm attributions
- `LICENSE` - Apache 2.0 License
- `lib/` - Assets and design templates

</td>
</tr>
</table>

---

## 🚀 **Powered By**

<div align="center">
  
  <a href="https://bubblspace.com" target="_blank">
    <img src="lib/Media/BubblLogZoomed.png" alt="BubblSpace" width="120" style="margin: 20px;">
  </a>
  
  ### **Proudly Supported by [BubblSpace](https://bubblspace.com)**
  
  *Building the future of AI-powered creativity and collaboration*
  
  [![Visit BubblSpace](https://img.shields.io/badge/🌐_Visit-BubblSpace.com-4285f4?style=for-the-badge)](https://bubblspace.com)
  
</div>

---

<div align="center">

### 🧙‍♂️ **Created with ❤️ by [FireHacker](https://x.com/thefirehacker)**

**Made for creators, developers, and digital artists worldwide**

[![Twitter Follow](https://img.shields.io/twitter/follow/thefirehacker?style=social)](https://x.com/thefirehacker)
[![GitHub stars](https://img.shields.io/github/stars/thefirehacker/SketchPad-SLM?style=social)](https://github.com/thefirehacker/SketchPad-SLM)

---

*⭐ If you found this project helpful, please give it a star! ⭐*

</div>

# SketchPad-SLM

> A lightweight in-browser p5.js live editor with built-in small-LM code fixes.

SketchPad-LM lets you write, preview, and auto-correct p5.js sketches entirely in the browser. It pairs the Monaco code editor with p5.js rendering, and a tiny on-device language model (via WebAssembly) to suggest style or syntax improvements on demand.

---

## 🚀 Features

- **Split-view editor & canvas**  
  Live editing powered by [Monaco Editor](https://github.com/microsoft/monaco-editor) on the left, p5.js canvas on the right.
- **“Draw” button**  
  Compile and render your latest code with a single click—old sketches are torn down cleanly.
- **Small-LM auto-fix**  
  A lightweight WebAssembly model suggests and applies code fixes (indentation, semicolons, common JS pitfalls).
- **No build step**  
  All dependencies (Monaco, p5.js, WebAssembly LM) load via CDN—just open `index.html`.

---

## 💾 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/thefirehacker/SketchPad-SLM.git
   cd SketchPad-LM

<div align="center">
  
  <img src="https://mybubblpublic.s3.ap-south-1.amazonaws.com/TimeCapsule_03.png" alt="TimeCapsule-SLM Logo" width="180" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
  
  # 💊 TimeCapsule-SLM
  
  ### *Complete AI-powered research & creative platform with DeepResearch*
  ### **Generate Novel Ideas • Build AI Content • Enable Collaborative Knowledge Discovery**
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Available-00C851?style=for-the-badge&logo=rocket)](https://timecapsule.bubblspace.com/)
  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)
  [![AI Powered](https://img.shields.io/badge/🤖_AI-Powered-ff6b35?style=for-the-badge)](https://timecapsule.bubblspace.com/)
  [![Made with Love](https://img.shields.io/badge/Made_with-❤-red?style=for-the-badge)](https://x.com/thefirehacker)
  
</div>

---

## 🔗 **Quick Links**
- [🚀 Key Features](#-key-features-2024)
- [🌐 Experience Live Now](#-experience-live-now)
- [🚦 How to Start](#-how-to-start)
- [🐳 Docker Support- In Progress](DOCKER.md)
- [🔗 How to Share](#-how-to-share)
- [💬 Join Discord Community](https://discord.gg/ExQ8fCv9)
- [🦙 Ollama Integration](#-ollama-integration)
- [🏠 LM Studio Integration](#-lm-studio-integration)
- [🔬 DeepResearch Usage](#-deepresearch-timecapsule-usage)
- [🎮 Playground Usage](#-playground-usage)
- [📄 Project Structure](#-project-structure)
- [🚀 Powered By](#-powered-by)

---

## 🚀 **Key Features **

<div align="center">

### 🧠 **In-Browser RAG** | 🔗 **TimeCapsule Sharing** | 📚 **Knowledge Base** | 🤖 **Local LLM Support**

</div>

<table>
<tr>
<td width="50%">

### 🧠 **In-Browser RAG**
Semantic search and Retrieval-Augmented Generation with your own documents—directly in your browser. **No server, no data leaves your device.**

### 📚 **Knowledge Base Integration**
Upload PDFs, text, and images to build a private, searchable research knowledge base with intelligent document analysis.

</td>
<td width="50%">

### 🔗 **TimeCapsule Sharing**
Export and load full research sessions as `.timecapsule.json` files. **Instantly share, restore, or collaborate** on research with anyone.

### 🤖 **Local LLM Support**
Use **Ollama**, **LM Studio**, **OpenAI**, and **Anthropic**—privacy-first, cost-effective, and lightning fast.

</td>
</tr>
</table>

---

## 🌐 **✨ Experience Live Now! ✨**

<div align="center">

### **🎯 [Launch TimeCapsule-SLM →](https://timecapsule.bubblspace.com/)**

<table>
<tr>
<td width="50%" align="center">
  
**🚀 Instant Access**

No downloads, no setup - just click and create!
Professional-grade research and creative coding in your browser.
  
</td>
<td width="50%" align="center">
  
**🤖 AI-Powered**

**Ollama**, **LM Studio** & **API** (**OpenAI**, **Anthropic**) integration for intelligent research analysis and creative code generation.
  
</td>
</tr>
</table>

### 💊 **What You Get:**

🔬 **DeepResearch TimeCapsule** - Comprehensive AI-powered research platform  
🎮 **Playground** - Execute TimeCapsules with creative coding  
🧠 **Triple AI Mode**: Ollama, LM Studio and APIs (OpenAI, Anthropic)  
⚙️ **Custom Context Templates** for personalized AI behavior  
📱 **Responsive Design** that works on all devices  
🔄 **Seamless Navigation** between research and creative modes  
🔒 **Privacy First** with multiple local AI options  

</div>

---

## 🚦 **How to Start**

<div align="center">

### 🎯 **Get Research-Ready in 5 Minutes**

</div>

<table>
<tr>
<td width="33%">

### 🌐 **Option 1: Instant Online** *(Recommended)*
1. 🎯 **Go to** [timecapsule.bubblspace.com](https://timecapsule.bubblspace.com/)
2. 🔬 **Click "DeepResearch"**
3. 🦙 **Start Ollama** (see setup below)
4. 🤖 **Pull a model:** `ollama pull qwen3:0.6b`
5. 📚 **Add documents** in Knowledge Manager
6. 📝 **Add research topics** and click **Generate**

</td>
<td width="33%">

### 🐳 **Option 2: Docker** *(Easy Deploy)*
1. 📁 **Clone:** `git clone https://github.com/thefirehacker/TimeCapsule-SLM`
2. 📂 **Navigate:** `cd TimeCapsule-SLM`
3. 🐳 **Start:** `docker-compose --profile ai-enabled up -d`
4. 🌐 **Access:** `http://localhost:3000`
5. 🦙 **Pull model:** `docker exec timecapsule-ollama ollama pull qwen3:0.6b`
6. 🚀 **Start researching!**

</td>
<td width="33%">

### 💻 **Option 3: Local Development**
1. 📁 **Clone:** `git clone https://github.com/thefirehacker/TimeCapsule-SLM`
2. 📂 **Navigate:** `cd TimeCapsule-SLM`
3. 🌐 **Open:** `DeepResearch.html` in browser
4. 🦙 **Setup Ollama** (see integration guide)
5. 🚀 **Start researching!**

</td>
</tr>
</table>

### 🦙 **Quick Ollama Setup** *(Essential for local AI)*

```bash
# 1. Install Ollama from https://ollama.ai

# 2. Pull recommended model
ollama pull qwen3:0.6b

# 3. Start with CORS enabled (CRITICAL)
OLLAMA_ORIGINS="https://timecapsule.bubblspace.com/,http://localhost:3000" ollama serve

# 4. Connect in TimeCapsule-SLM
```

> **💡 Pro Tip:** For best results, use **Ollama** with the `qwen3:0.6b` model. **LM Studio** and **APIs** (OpenAI, Anthropic) are also fully supported.

---

## 🔗 **How to Share**

<div align="center">

### 🤝 **Collaborate & Share Research Instantly**

</div>

<table>
<tr>
<td width="50%" align="center">

### 📤 **Export TimeCapsule**
1. 🔬 **Complete your research** in DeepResearch
2. 💾 **Click "Export TimeCapsule"** button
3. 📁 **Save** `.timecapsule.json` file
4. 🤝 **Share** with colleagues or save for later

**Perfect for:** Research collaboration, session backup, knowledge sharing

</td>
<td width="50%" align="center">

### 📥 **Load TimeCapsule** 
1. 📂 **Click "Load TimeCapsule"** button
2. 🗂️ **Select** `.timecapsule.json` file
3. ⚡ **Instantly restore** topics and research output
4. 🔄 **Continue** where you left off

**Perfect for:** Resuming sessions, importing shared research, team collaboration

</td>
</tr>
</table>

### 🎯 **TimeCapsule Features**
- **🔄 Complete Session Restore** - All topics, research results, and notes
- **📊 Multi-Tab Support** - Research, Sources, and Notes tabs preserved
- **🤝 Team Collaboration** - Share research across teams instantly
- **💾 Session Backup** - Never lose your research progress
- **🌐 Cross-Platform** - Works on any device with TimeCapsule-SLM

---

## 🦙 **Ollama Integration**

<div align="center">

### 🎯 **Local AI Power + Privacy First**
**Complete platform-specific setup guides for macOS, Linux & Windows**

</div>

<table>
<tr>
<td width="50%">

### 🚀 **Why Ollama?**
- **🔒 Fully Private** - All processing happens locally
- **💰 Zero API Costs** - No usage fees or limits
- **⚡ Lightning Fast** - Optimized GGUF models
- **🎛️ Model Library** - Easy model management
- **🌐 REST API** - Simple integration

</td>
<td width="50%">

### 🛠️ **Setup Requirements**
- **Ollama App** - Download from [ollama.ai](https://ollama.ai)
- **AI Model** - Any compatible GGUF model
- **CORS Enabled** - **CRITICAL** for web access
- **Port 11434** - Default Ollama server port

</td>
</tr>
</table>

---

## 🍎 **macOS Setup Guide**

### 📥 **Step 1: Install Ollama**
```bash
# Method 1: Direct download (recommended)
# Download from https://ollama.ai and install .app

# Method 2: Homebrew
brew install ollama
```

### 🤖 **Step 2: Pull a Model**
```bash
# Recommended: Fast and efficient
ollama pull qwen3:0.6b
```

### 🔧 **Step 3: Start with CORS** (**CRITICAL**)
```bash
# Kill any existing processes first
pkill -f ollama

# Start with CORS enabled (for testing)
OLLAMA_ORIGINS="*" ollama serve

# For production (recommended)
OLLAMA_ORIGINS="https://timecapsule.bubblspace.com/,http://localhost:3000" ollama serve
```

### 🔧 **macOS Troubleshooting**

**❌ "Operation not permitted" Error:**
```bash
# Method 1: Use sudo
sudo pkill -f ollama

# Method 2: Activity Monitor (GUI)
# 1. Open Activity Monitor (Applications → Utilities)
# 2. Search for "ollama"
# 3. Select process and click "Force Quit"

# Method 3: Homebrew service (if installed via brew)
brew services stop ollama
brew services start ollama
```

**❌ CORS Issues:**
```bash
# 1. Stop Ollama completely
sudo pkill -f ollama

# 2. Wait 3 seconds
sleep 3

# 3. Start with CORS
OLLAMA_ORIGINS="*" ollama serve

# 4. Test connection
curl http://localhost:11434/api/tags
```

---

## 🐧 **Linux Setup Guide**

### 📥 **Step 1: Install Ollama**
```bash
# Official installer (recommended)
curl -fsSL https://ollama.ai/install.sh | sh

# Or download directly from https://ollama.ai
```

### 🤖 **Step 2: Pull a Model**
```bash
# Recommended model
ollama pull qwen3:0.6b
```

### 🔧 **Step 3: Configure CORS with systemctl** (**CRITICAL**)

**For systemd-based Linux distributions (Ubuntu, Debian, CentOS, etc.):**

```bash
# 1. Stop any running Ollama instances
ps aux | grep ollama
sudo pkill -f ollama

# 2. Edit the ollama service configuration
sudo systemctl edit ollama.service

# 3. Add the following environment variables:
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"

# For production, use specific origins:
# Environment="OLLAMA_ORIGINS=https://timecapsule.bubblspace.com/,http://localhost:3000"

# 4. Save and exit the editor (Ctrl+X, then Y, then Enter)

# 5. Reload systemd and restart ollama service
sudo systemctl daemon-reload
sudo systemctl restart ollama.service

# 6. Enable auto-start on boot (optional)
sudo systemctl enable ollama.service

# 7. Verify the service is running
sudo systemctl status ollama.service

# 8. Test the connection
curl http://localhost:11434/api/tags
```

**Alternative: Manual start (if not using systemd):**
```bash
# Stop any existing processes
sudo pkill -f ollama

# Start manually with CORS
OLLAMA_ORIGINS="*" ollama serve

# Or for production:
# OLLAMA_ORIGINS="https://timecapsule.bubblspace.com/,http://localhost:3000" ollama serve
```

### 🔧 **Linux Troubleshooting**

**❌ Service Issues:**
```bash
# Check service logs
sudo journalctl -u ollama.service -f

# Restart service
sudo systemctl restart ollama.service

# Check service status
sudo systemctl status ollama.service
```

**❌ Permission Issues:**
```bash
# Stop with elevated permissions
sudo pkill -f ollama

# Check for lingering processes
ps aux | grep ollama

# Force kill if needed
sudo kill -9 $(pgrep ollama)
```

**❌ CORS Configuration:**
```bash
# Verify environment variables are set
sudo systemctl show ollama.service | grep Environment

# If not set, re-edit the service:
sudo systemctl edit ollama.service
# Add Environment variables as shown above
sudo systemctl daemon-reload
sudo systemctl restart ollama.service
```

**📚 Reference:** [Ollama CORS Configuration Guide](https://objectgraph.com/blog/ollama-cors/)

---

## 🪟 **Windows Setup Guide**

### 📥 **Step 1: Install Ollama**
```powershell
# Download from https://ollama.ai and install the .exe
# Or use package manager (if available)
```

### 🤖 **Step 2: Pull a Model**
```powershell
# Open Command Prompt or PowerShell
ollama pull qwen3:0.6b
```

### 🔧 **Step 3: Start with CORS** (**CRITICAL**)
```powershell
# Method 1: Stop existing processes
taskkill /f /im ollama.exe

# Method 2: Start with CORS (Command Prompt)
set OLLAMA_ORIGINS=* && ollama serve

# Method 3: Start with CORS (PowerShell)
$env:OLLAMA_ORIGINS="*"; ollama serve

# For production (specific origins):
# $env:OLLAMA_ORIGINS="https://timecapsule.bubblspace.com/,http://localhost:3000"; ollama serve
```

### 🔧 **Windows Troubleshooting**

**❌ Process Issues:**
```powershell
# Method 1: Task Manager (GUI)
# 1. Open Task Manager (Ctrl+Shift+Esc)
# 2. Look for "ollama.exe" in Processes tab
# 3. Right-click and select "End task"

# Method 2: Command line
taskkill /f /im ollama.exe

# Method 3: Find by port
netstat -ano | findstr :11434
# Note the PID and kill it:
taskkill /f /pid <PID>
```

**❌ CORS Issues:**
```powershell
# 1. Stop all ollama processes
taskkill /f /im ollama.exe

# 2. Wait 3 seconds
timeout /t 3

# 3. Start with CORS
$env:OLLAMA_ORIGINS="*"; ollama serve

# 4. Test connection (if curl is available)
curl http://localhost:11434/api/tags
```

**❌ Environment Variables:**
```powershell
# Set permanently (requires restart)
setx OLLAMA_ORIGINS "*"

# Set for current session only
$env:OLLAMA_ORIGINS="*"
```

---

## 🎯 **Universal Commands & Verification**

### 🧪 **Test Your Setup**
```bash
# 1. Check if Ollama is running
curl http://localhost:11434/api/tags

# 2. List installed models
ollama list

# 3. Test model response
curl http://localhost:11434/api/generate -d '{
  "model": "qwen3:0.6b",
  "prompt": "Hello",
  "stream": false
}'
```

### 📦 **Recommended Models**

| Model | Size | Best For | Performance |
|-------|------|----------|-------------|
| **qwen3:0.6b** | ~400MB | Fast responses, testing | 🌟🌟🌟🌟⭐ |
| **qwen2.5:3b** | ~2GB | Balanced quality/speed | 🌟🌟🌟🌟🌟 |
| **llama3.2:3b** | ~2GB | General purpose | 🌟🌟🌟⭐⭐ |

```bash
# Pull additional models:
ollama pull qwen2.5:3b
ollama pull llama3.2:3b
```

### 🆘 **Universal Reset (All Platforms)**

**If everything fails, complete reset:**
```bash
# 1. Stop all Ollama processes
# macOS/Linux: sudo pkill -f ollama
# Windows: taskkill /f /im ollama.exe

# 2. Wait 5 seconds
sleep 5  # macOS/Linux
# timeout /t 5  # Windows

# 3. Start fresh with CORS
OLLAMA_ORIGINS="*" ollama serve
# Windows PowerShell: $env:OLLAMA_ORIGINS="*"; ollama serve

# 4. Pull a model (in new terminal)
ollama pull qwen3:0.6b

# 5. Test setup
curl http://localhost:11434/api/tags
```

> **💡 Pro Tips**: 
> - **Linux Users:** Use systemctl for persistent CORS configuration
> - **macOS Users:** Use Activity Monitor for stubborn processes
> - **Windows Users:** Use Task Manager or PowerShell for process management
> - **All Platforms:** Use `OLLAMA_ORIGINS="*"` for testing, then restrict to specific domains
> - **Always verify** your setup with: `curl http://localhost:11434/api/tags`

---

## 🏠 **LM Studio Integration**

<div align="center">

### 🎯 **Local AI Power + No API Costs**

</div>

<table>
<tr>
<td width="50%">

### 🚀 **Why LM Studio?**
- **🔒 Fully Private** - All processing happens locally
- **💰 Zero API Costs** - No usage fees or limits
- **⚡ Fast Response** - Direct local connection
- **🎛️ Model Control** - Use any compatible model
- **🌐 OpenAI Compatible** - Standard API format

</td>
<td width="50%">

### 🛠️ **Setup Requirements**
- **LM Studio App** - Download from [lmstudio.ai](https://lmstudio.ai)
- **Compatible Model** - Any chat-capable model
- **Local Server** - LM Studio server on port 1234
- **CORS Enabled** - Allow cross-origin requests

</td>
</tr>
</table>

### 📋 **Quick Setup Guide**

> **🚨 KEY REQUIREMENT**: You **MUST** enable CORS in LM Studio for TimeCapsule-SLM to connect.

**Step 1:** 📥 **Download LM Studio** from [lmstudio.ai](https://lmstudio.ai) and install it  
**Step 2:** 🤖 **Download a Model** - Search for models like `Qwen3 0.6B`
**Step 3:** 🚀 **Start Local Server** - Click "Start Server" in LM Studio (port 1234)  
**Step 4:** ⚙️ **Enable CORS** - **IMPORTANT**: In LM Studio → Settings → Server → Enable "CORS"  
**Step 5:** 🔄 **Restart Server** - Stop and restart the LM Studio server  
**Step 6:** 💊 **Connect in TimeCapsule** - Select "🏠 LM Studio" from AI provider dropdown  
**Step 7:** 🔌 **Click Connect** - TimeCapsule will auto-detect your model  

### 🎯 **Recommended Models**

| Model | Size | Best For | Performance |
|-------|------|----------|-------------|
| **Qwen2.5-7B-Instruct** | ~4GB | Research analysis, detailed coding responses | 🌟🌟🌟🌟🌟 |

---

## 🔬 **DeepResearch TimeCapsule Usage**

<div align="center">

### 🧠 **AI-Powered Research Generation**

</div>

### 📊 **Research Workflow**
1. **📝 Add Topics** - Define research areas with descriptions
2. **🎯 Select Type** - Choose from Academic, Market, Technology, Competitive, Trend, Literature
3. **📏 Set Depth** - Pick Overview, Detailed, or Comprehensive analysis  
4. **🤖 Generate Research** - AI creates structured, professional reports and TimeCapsules
5. **📤 Export Results** - Download as `.timecapsule.json` files for sharing

### 🎯 **Research Types Explained**
- **📚 Academic** - Scholarly analysis with citations and methodology
- **📈 Market** - Industry trends, competition, and market analysis
- **🔧 Technology** - Technical deep-dives and implementation insights  
- **🏢 Competitive** - Competitor analysis and market positioning
- **📊 Trend** - Emerging patterns and future predictions
- **📖 Literature** - Comprehensive literature reviews and surveys

---

## 🎮 **Playground Usage**

<div align="center">

### 🎨 **Creative Coding with AI Assistance**

</div>



---

## 📄 **Project Structure**

<div align="center">

### 📁 **Clean, Organized Architecture**

</div>

<table>
<tr>
<td width="50%">

### 💊 **Core Application Files**
| File | Description |
|------|-------------|
| `DeepResearch.html` | DeepResearch TimeCapsule studio |
| `Playground.html` | Playground creative AI environment |
| `Canvas.html` | Creative CodingEnvironment |
| `index.html` | Main platform homepage |
| `Script01.js` | Utility functions and helpers |

</td>
<td width="50%">

### 📋 **Documentation & Assets**
| File | Description |
|------|-------------|
| `README.md` | This comprehensive guide |
| `CREDITS` | Algorithm attributions |
| `LICENSE` | Apache 2.0 License |
| `lib/` | Assets and design templates |

</td>
</tr>
</table>

### 📂 **Library Structure**
- **`lib/agent/`** - Canvas AI agents
- **`lib/AIAssistant/`** - AI backend integration
- **`lib/Designs/`** - Creative coding templates
- **`lib/Pages/`** - Component libraries
- **`lib/Media/`** - Images and assets

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

**Made for researchers, creators, developers, and digital artists worldwide**

[![Twitter Follow](https://img.shields.io/twitter/follow/thefirehacker?style=social)](https://x.com/thefirehacker)
[![GitHub stars](https://img.shields.io/github/stars/thefirehacker/TimeCapsule-SLM?style=social)](https://github.com/thefirehacker/TimeCapsule-SLM)
[![Discord](https://img.shields.io/badge/💬_Join-Discord_Community-7289da?style=for-the-badge)](https://discord.gg/ExQ8fCv9)

---

## 💬 **Support & Community**

<div align="center">

**Need Help? We're Here for You!**

🎧 **Join our Discord Community**: [discord.gg/ExQ8fCv9](https://discord.gg/ExQ8fCv9)  
📧 **Email Support**: [support@bubblspace.com](mailto:support@bubblspace.com)  
🐛 **Report Issues**: [GitHub Issues](https://github.com/thefirehacker/TimeCapsule-SLM/issues)  
📚 **Documentation**: [Main README](README.md) • [Docker Guide](DOCKER.md)  

*Get help with setup, AI integration, research workflows, and more!*

</div>

---

*⭐ If you found this project helpful, please give it a star! ⭐*

</div>

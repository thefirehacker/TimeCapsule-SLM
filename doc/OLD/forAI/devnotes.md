# SketchPad-SLM Developer Notes

## 🔒 Content Security Policy (CSP) Configuration

### Overview
SketchPad-SLM uses a **dual CSP strategy** to ensure compatibility across different deployment environments while maintaining security.

### CSP Implementation Strategy

#### 1. **Dual CSP Headers**
- **Primary**: Server-level headers via `amplify.yml` (Amplify deployments)
- **Fallback**: Meta tag in `Canvas.html` (local dev, other hosting platforms)
- **Precedence**: HTTP headers override meta tags when both are present

#### 2. **Current CSP Configuration**

##### Required Directives for Core Functionality:
```csp
script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:
```
- `'unsafe-eval'` - **CRITICAL** for Monaco Editor JavaScript execution
- `'unsafe-inline'` - Required for p5.js sketch execution
- `https:` - CDN resources (Monaco, p5.js, Transformers.js)
- `data: blob:` - WebWorkers and dynamic content

##### Current API Endpoints in CSP:
```csp
connect-src 'self' 
  https://api.openai.com
  https://www.google-analytics.com
  https://analytics.google.com
  https://cdn.jsdelivr.net
  https://unpkg.com
  wss:
```

### 🚨 **IMPORTANT: Adding New API Endpoints**

When adding new AI services or APIs, you **MUST** update CSP in **BOTH** locations:

#### Step 1: Update `amplify.yml`
```yaml
connect-src 'self' 
  https://api.openai.com
  https://NEW-API-ENDPOINT.com     # ← ADD HERE
  https://www.google-analytics.com
  # ... existing endpoints
```

#### Step 2: Update `Canvas.html` Meta Tag
```html
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:;
  style-src 'self' 'unsafe-inline' https: data:;
  connect-src 'self' https: wss:;  <!-- This covers new endpoints -->
  img-src 'self' data: https: blob:;
  font-src 'self' data: https:;
  worker-src 'self' blob: data:;
  object-src 'none';
">
```

### 🔧 **Common API Endpoints to Add**

#### AI/ML Services:
- `https://api.anthropic.com` - Claude API
- `https://api.cohere.ai` - Cohere API  
- `https://api.together.xyz` - Together AI
- `https://api.replicate.com` - Replicate API
- `https://api.huggingface.co` - Hugging Face Inference API
- `https://generativelanguage.googleapis.com` - Google Gemini API

#### Local AI Services (Localhost):
- `http://localhost:11434` - Ollama API (requires CORS configuration)
- `http://localhost:1234` - LM Studio API (CORS enabled by default)

### 🔥 **CRITICAL: Ollama CORS Configuration**

**Problem**: Ollama blocks requests from deployed domains by default
**Solution**: Configure CORS origins before starting Ollama

#### Method 1: Environment Variable (Recommended)
```bash
export OLLAMA_ORIGINS="https://timecapsule.bubblspace.com,http://localhost:3000,http://localhost:8000"
ollama serve
```

#### Method 2: Inline Environment Variable
```bash
OLLAMA_ORIGINS="https://timecapsule.bubblspace.com,http://localhost:3000" ollama serve
```

#### Method 3: Persistent Setup (Add to ~/.zshrc)
```bash
echo 'export OLLAMA_ORIGINS="https://timecapsule.bubblspace.com,http://localhost:3000"' >> ~/.zshrc
source ~/.zshrc
```

#### Verify CORS is Working:
```bash
curl -H "Origin: https://timecapsule.bubblspace.com" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS http://localhost:11434/api/tags -v
```
**Expected**: `HTTP/1.1 204 No Content` with `Access-Control-Allow-Origin` header

#### WebSocket Services:
- `wss://api.openai.com` - OpenAI streaming
- `wss://api.anthropic.com` - Claude streaming
- `wss://your-websocket-service.com` - Custom WebSocket APIs

#### CDN/Assets:
- `https://huggingface.co` - Model downloads
- `https://cdn.openai.com` - OpenAI assets
- `https://storage.googleapis.com` - Google Cloud Storage

### 🧪 **Testing CSP Changes**

#### 1. **Local Testing**
```bash
# Open Canvas.html directly in browser
open Canvas.html
# Check DevTools Console for CSP violations
```

#### 2. **Amplify Testing**
```bash
# Deploy and check response headers
curl -I https://your-amplify-url.com
# Look for: Content-Security-Policy header
```

#### 3. **CSP Violation Detection**
```javascript
// Add to Canvas.html for debugging
document.addEventListener('securitypolicyviolation', (e) => {
  console.error('CSP Violation:', e.violatedDirective, e.blockedURI);
});
```

### 🚨 **Critical CSP Requirements**

#### **NEVER Remove These:**
- `'unsafe-eval'` - Monaco Editor will break completely
- `'unsafe-inline'` - p5.js sketches won't execute
- `https://cdn.jsdelivr.net` - Monaco Editor dependency
- `https://unpkg.com` - p5.js and other libraries

#### **Always Test After Changes:**
1. Monaco Editor loads and highlights code
2. p5.js sketches execute when clicking "Draw"
3. AI API calls work without CORS errors
4. No CSP violations in DevTools Console

### 📝 **CSP Update Checklist**

When adding new APIs or services:

- [ ] Identify all domains the new service uses
- [ ] Update `amplify.yml` connect-src directive
- [ ] Update `Canvas.html` meta tag (if needed)
- [ ] Test locally by opening Canvas.html
- [ ] Deploy to Amplify and test live site
- [ ] Check DevTools Console for violations
- [ ] Verify all existing functionality still works
- [ ] Document the change in this file

### 🔍 **Debugging CSP Issues**

#### Common Error Messages:
```
"Refused to execute inline script because it violates CSP"
→ Add 'unsafe-inline' to script-src

"Refused to connect to 'https://api.example.com'"  
→ Add domain to connect-src

"Refused to evaluate a string as JavaScript because 'unsafe-eval'"
→ Add 'unsafe-eval' to script-src (REQUIRED for Monaco)
```

#### Quick CSP Test:
```javascript
// Test in DevTools Console
fetch('https://new-api-endpoint.com/test')
  .then(r => console.log('✅ CSP allows this endpoint'))
  .catch(e => console.error('❌ CSP blocks this endpoint:', e));
```

### 🎯 **Best Practices**

1. **Principle of Least Privilege**: Only add domains you actually need
2. **Test Both Environments**: Local (meta tag) and Amplify (headers)
3. **Document Changes**: Update this file when adding new services
4. **Monitor Console**: Always check for CSP violations after changes
5. **Gradual Rollout**: Test new APIs in development before production

### 🔗 **Related Files**
- `amplify.yml` - Server-level CSP headers
- `Canvas.html` - Fallback CSP meta tag
- `config.js` - API configuration and initialization

---
*Last Updated: 2024 - CSP configured for OpenAI API, Google Analytics, Monaco Editor, and p5.js*

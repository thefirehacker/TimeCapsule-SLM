# 🔧 Custom URL Configuration for AI Services

TimeCapsule-SLM now supports custom server URLs for both Ollama and LM Studio, allowing you to connect to external servers or non-standard ports.

## 🦙 **Ollama Custom URL Configuration**

### Quick Setup
1. Click **"🦙 Ollama"** in the AI Provider dropdown
2. Click **"🦙 Connect Ollama"** button  
3. In the modal, modify the **"🌐 Ollama Server URL"** field
4. Click **"🔌 Connect to Ollama"**

### Example URLs

| Use Case | URL | Description |
|----------|-----|-------------|
| **Local Default** | `http://localhost:11434` | Standard local Ollama |
| **External Server** | `http://192.168.1.100:11434` | Ollama on local network |
| **Custom Port** | `http://localhost:8080` | Ollama on custom port |
| **Domain Name** | `http://ollama.myserver.com:11434` | External domain |

### External Ollama Server Setup

**On your external server:**
```bash
# Start Ollama with CORS enabled for your TimeCapsule domain
OLLAMA_ORIGINS="http://your-timecapsule-domain.com,http://localhost:3000" ollama serve

# Or allow all origins (less secure, for testing only)
OLLAMA_ORIGINS="*" ollama serve
```

## 🏠 **LM Studio Custom URL Configuration**

### Quick Setup
1. Click **"🏠 LM Studio"** in the AI Provider dropdown
2. Click **"🏠 Connect LM Studio"** button
3. In the modal, modify the **"🌐 LM Studio Server URL"** field  
4. Click **"🔌 Connect to LM Studio"**

### Example URLs

| Use Case | URL | Description |
|----------|-----|-------------|
| **Local Default** | `http://localhost:1234` | Standard local LM Studio |
| **External Server** | `http://192.168.1.50:1234` | LM Studio on local network |
| **Custom Port** | `http://localhost:5000` | LM Studio on custom port |
| **Domain Name** | `http://lmstudio.myserver.com:1234` | External domain |

### External LM Studio Server Setup

**In LM Studio on your external server:**
1. Go to **Settings** → **Server**
2. Enable **"CORS"** option
3. Set **"Network Interface"** to **"0.0.0.0"** (all interfaces)
4. Start the local server
5. Ensure firewall allows port 1234

## 💾 **Persistent Configuration**

- **Automatic Saving**: URLs are automatically saved to browser localStorage
- **Session Persistence**: Your custom URLs persist across browser sessions
- **Per-Service**: Each service (Ollama/LM Studio) has independent URL storage

### Manual localStorage Management
```javascript
// Set custom URLs programmatically
localStorage.setItem('timecapsule_ollama_url', 'http://my-ollama-server:11434');
localStorage.setItem('timecapsule_lmstudio_url', 'http://my-lmstudio-server:1234');

// Get current URLs
console.log('Ollama URL:', localStorage.getItem('timecapsule_ollama_url'));
console.log('LM Studio URL:', localStorage.getItem('timecapsule_lmstudio_url'));

// Reset to defaults
localStorage.removeItem('timecapsule_ollama_url');
localStorage.removeItem('timecapsule_lmstudio_url');
```

## 🔐 **Security Considerations**

### CORS Configuration
- **External servers must enable CORS** for your TimeCapsule domain
- **Avoid using `OLLAMA_ORIGINS="*"`** in production environments
- **Use specific domain allowlists** for better security

### Network Security
- **Use HTTPS** when possible for external connections
- **Ensure firewall rules** allow necessary ports
- **Consider VPN/tunneling** for secure external access

## 🛠️ **Troubleshooting**

### Common Issues

**❌ "Failed to fetch" Error**
```
Solution: Check if the server URL is accessible and CORS is enabled
Test: curl http://your-server:port/api/tags (for Ollama)
Test: curl http://your-server:port/v1/models (for LM Studio)
```

**❌ "CORS" Error**
```
Ollama: Set OLLAMA_ORIGINS environment variable
LM Studio: Enable CORS in Settings → Server
```

**❌ "Connection timeout"**
```
Check network connectivity and server status
Verify firewall/port forwarding settings
Test with local connection first
```

### Debug Mode
Enable debug logging in browser console:
```javascript
// Enable verbose logging
localStorage.setItem('timecapsule_debug', 'true');

// Check connection logs
// Look for "🦙 Connecting to Ollama at:" or "🏠 Connecting to LM Studio at:"
```

## 📋 **Best Practices**

1. **Test Local First**: Always verify local connections work before configuring external URLs
2. **Use Specific Origins**: Configure CORS with specific domains rather than wildcard
3. **Monitor Performance**: External connections may have higher latency
4. **Backup Configuration**: Note your working URLs for easy restoration
5. **Version Compatibility**: Ensure external servers run compatible Ollama/LM Studio versions

## 🚀 **Advanced Configuration**

### SSH Tunneling (Alternative Method)
```bash
# Forward external Ollama to local port
ssh -L 11434:localhost:11434 user@external-server

# Forward external LM Studio to local port  
ssh -L 1234:localhost:1234 user@external-server

# Then use localhost URLs in TimeCapsule-SLM
```

### Docker Networking
```bash
# Access Ollama in Docker from host
docker run -p 11434:11434 ollama/ollama

# Use http://host.docker.internal:11434 in TimeCapsule (if running in Docker)
# Or http://localhost:11434 from host browser
```

---

**💡 Need Help?** Join our [Discord community](https://discord.gg/ExQ8fCv9) for real-time support with custom URL configuration! 
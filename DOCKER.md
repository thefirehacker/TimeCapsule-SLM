# 🐳 Docker Support for TimeCapsule-SLM

Run TimeCapsule-SLM in a containerized environment with full AI support including Ollama integration.

## 🚀 Quick Start

### Option 1: Docker Run (Simple)
```bash
# Pull and run the latest image
docker run -d -p 3000:80 --name timecapsule-slm timecapsule-slm:latest

# Access at http://localhost:3000
```

### Option 2: Docker Compose (Recommended)
```bash
# Clone the repository
git clone https://github.com/thefirehacker/TimeCapsule-SLM.git
cd TimeCapsule-SLM

# Start TimeCapsule-SLM only
docker-compose up -d

# Start with Ollama AI support
docker-compose --profile ai-enabled up -d

# Access at http://localhost:3000
```

---

## 📋 Prerequisites

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **RAM**: 4GB+ (8GB+ recommended with AI services)
- **Storage**: 2GB+ free space (10GB+ with AI models)

---

## 🛠️ Build from Source

```bash
# Clone the repository
git clone https://github.com/thefirehacker/TimeCapsule-SLM.git
cd TimeCapsule-SLM

# Build the Docker image
docker build -t timecapsule-slm:latest .

# Run the container
docker run -d -p 3000:80 --name timecapsule-slm timecapsule-slm:latest
```

---

## 🤖 AI Integration Options

### Option 1: With Ollama (Local AI)
```bash
# Start TimeCapsule-SLM with Ollama
docker-compose --profile ai-enabled up -d

# Pull a model in the Ollama container
docker exec timecapsule-ollama ollama pull qwen2.5:0.5b

# Verify Ollama is running
curl http://localhost:11434/api/version
```

### Option 2: External AI Services
```bash
# Start without AI containers (use external Ollama/LM Studio)
docker-compose up -d timecapsule-slm

# Configure external AI in TimeCapsule-SLM UI:
# NEW: Custom URL Configuration Available!
# 1. Click "🦙 Connect Ollama" or "🏠 Connect LM Studio"
# 2. Modify the server URL in the modal:
#    - Ollama: http://host.docker.internal:11434
#    - LM Studio: http://host.docker.internal:1234
#    - External: http://your-server:11434
# 3. URLs persist across sessions in localStorage
# - OpenAI API: Enter your API key
```

---

## ⚙️ Configuration

### Environment Variables
Create a `.env` file for customization:

```bash
# .env
TIMECAPSULE_PORT=3000
OLLAMA_PORT=11434
OLLAMA_ORIGINS=http://localhost:3000
RESTART_POLICY=unless-stopped
```

### Custom docker-compose Override
```yaml
# docker-compose.override.yml
version: '3.8'
services:
  timecapsule-slm:
    ports:
      - "8080:80"  # Custom port
    environment:
      - CUSTOM_VAR=value
```

---

## 📊 Service Management

### Basic Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update to latest
docker-compose pull && docker-compose up -d
```

### Health Checks
```bash
# Check service status
docker-compose ps

# Check container health
docker inspect --format='{{.State.Health.Status}}' timecapsule-slm

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' timecapsule-slm
```

---

## 💾 Data Persistence

### Ollama Models
Models are automatically persisted in Docker volumes:
```bash
# List Ollama models
docker exec timecapsule-ollama ollama list

# Backup Ollama data
docker run --rm -v timecapsule-slm_ollama_data:/data -v $(pwd):/backup alpine tar czf /backup/ollama-backup.tar.gz -C /data .

# Restore Ollama data
docker run --rm -v timecapsule-slm_ollama_data:/data -v $(pwd):/backup alpine tar xzf /backup/ollama-backup.tar.gz -C /data
```

### User Data
TimeCapsule-SLM stores data in browser localStorage. For enterprise use, consider:
- External database integration
- Shared volume mounts
- Network storage solutions

---

## 🌐 Production Deployment

### Reverse Proxy (Nginx)
```nginx
# nginx.conf
server {
    listen 80;
    server_name timecapsule.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Traefik Labels (Already included)
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.timecapsule.rule=Host(`timecapsule.yourdomain.com`)"
  - "traefik.http.services.timecapsule.loadbalancer.server.port=80"
```

### Docker Swarm
```bash
# Deploy to swarm
docker stack deploy -c docker-compose.yml timecapsule-stack

# Scale services
docker service scale timecapsule-stack_timecapsule-slm=3
```

---

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Check what's using the port
sudo lsof -i :3000

# Use different port
docker-compose up -d -p 8080:80
```

**Ollama Connection Failed**
```bash
# Check Ollama service
docker-compose logs ollama

# Test Ollama API
curl http://localhost:11434/api/version

# Restart Ollama
docker-compose restart ollama
```

**External Server Connection Issues**
```bash
# Test external Ollama server
curl http://your-external-server:11434/api/tags

# Verify CORS on external server
OLLAMA_ORIGINS="http://localhost:3000,https://your-domain.com" ollama serve

# Test external LM Studio
curl http://your-external-server:1234/v1/models

# Enable CORS in LM Studio: Settings → Server → Enable CORS
```

**CORS Issues**
```bash
# Verify OLLAMA_ORIGINS environment
docker-compose exec ollama env | grep OLLAMA_ORIGINS

# Update origins in docker-compose.yml
environment:
  - OLLAMA_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Logs and Debugging
```bash
# View all logs
docker-compose logs

# Follow specific service logs
docker-compose logs -f timecapsule-slm

# Debug container
docker-compose exec timecapsule-slm /bin/sh

# Check container resource usage
docker stats
```

---

## 🚀 Performance Optimization

### Resource Limits
```yaml
# docker-compose.yml
services:
  timecapsule-slm:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

### Caching
```dockerfile
# Multi-stage build for better caching
FROM nginx:alpine AS base
# ... optimization steps
```

---

## 📚 Additional Resources

- **Docker Hub**: [timecapsule-slm](https://hub.docker.com/r/firehacker/timecapsule-slm)
- **GitHub**: [TimeCapsule-SLM](https://github.com/thefirehacker/TimeCapsule-SLM)
- **Documentation**: [Main README](README.md)
- **Issues**: [GitHub Issues](https://github.com/thefirehacker/TimeCapsule-SLM/issues)

---

## 💡 Tips for Success

1. **Start Simple**: Use `docker-compose up -d` first
2. **Add AI Gradually**: Enable Ollama with `--profile ai-enabled`
3. **Monitor Resources**: Use `docker stats` to monitor usage
4. **Backup Data**: Regular backups of Ollama models and user data
5. **Update Regularly**: Pull latest images for security updates

---

## 💬 **Need Help?**

🎧 **Discord Community**: [discord.gg/ExQ8fCv9](https://discord.gg/ExQ8fCv9) - Get real-time help with Docker setup  
📧 **Email Support**: [support@bubblspace.com](mailto:support@bubblspace.com) - Technical support and questions  
🐛 **Report Issues**: [GitHub Issues](https://github.com/thefirehacker/TimeCapsule-SLM/issues) - Bug reports and feature requests  

*Our community is here to help you get TimeCapsule-SLM running smoothly!* 
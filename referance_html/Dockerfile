# TimeCapsule-SLM Docker Image
# Lightweight nginx-based container for static web application

FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy TimeCapsule-SLM application files
COPY . .

# Expose port 80
EXPOSE 80

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Labels for better container management
LABEL maintainer="FireHacker <contact@firehacker.dev>"
LABEL description="TimeCapsule-SLM: AI-powered Research & Creative Platform"
LABEL version="1.0"
LABEL org.opencontainers.image.source="https://github.com/thefirehacker/TimeCapsule-SLM"
LABEL org.opencontainers.image.title="TimeCapsule-SLM"
LABEL org.opencontainers.image.description="Complete AI-powered research & creative platform with DeepResearch"

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 
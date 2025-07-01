/**
 * TimeCapsule-SLM Authentication System
 * Handles GitHub OAuth, secure sessions, and API access control
 */

class AuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.githubAccessToken = null;
    this.apiToken = null; // Beluga API token (server-generated)
    this.sessionExpiry = null;
    this.refreshToken = null;
    
    // GitHub OAuth configuration
    this.githubClientId = this.getGitHubClientId();
    this.githubRedirectUri = this.getRedirectUri();
    this.belugaApiBase = window.AppConfig?.BELUGA_API_BASE || this.getEnvVar('BELUGA_API_BASE') || 'https://beluga.bubblspace.com';
    
    // Security configuration
    this.requestSigningKey = null; // User-specific signing key
    this.tokenRefreshInterval = null;
    
    // Request optimization
    this.requestCache = new Map();
    this.cacheExpiry = 30 * 1000; // 30 seconds cache
    
    // Initialize authentication state
    this.initializeAuth();
  }
  
  // Get environment variable from multiple sources
  getEnvVar(name) {
    // Use AppConfig's getEnvVar method (same as GA4)
    if (window.AppConfig && window.AppConfig.getEnvVar) {
      return window.AppConfig.getEnvVar(name);
    }
    
    // Fallback to direct access if AppConfig not available
    return window.ENV?.[name] || 
           window[name] || 
           localStorage.getItem(`env_${name}`) ||
           null;
  }
  
  // Initialize authentication from stored session
  async initializeAuth() {
    try {
      const storedAuth = localStorage.getItem('timecapsule_auth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        
        // Verify stored session is still valid
        if (authData.sessionExpiry && Date.now() < authData.sessionExpiry) {
          // Verify GitHub token is still valid
          const isValid = await this.verifyGitHubToken(authData.githubAccessToken);
          if (isValid) {
            this.isAuthenticated = true;
            this.user = authData.user;
            this.githubAccessToken = authData.githubAccessToken;
            this.apiToken = authData.apiToken;
            this.requestSigningKey = authData.requestSigningKey;
            this.sessionExpiry = authData.sessionExpiry;
            
            console.log('✅ Restored valid authentication session');
            this.updateAuthUI();
            this.startTokenRefresh();
            return;
          }
        }
        
        // Clear invalid session
        this.clearAuth();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      this.clearAuth();
    }
  }
  
  // Start GitHub OAuth flow
  async startGitHubAuth() {
    if (!this.githubClientId) {
      console.error('GitHub Client ID not configured');
      alert('GitHub OAuth not configured. Please set GITHUB_CLIENT_ID in environment.');
      return;
    }
    
    // Generate state parameter for CSRF protection
    const state = this.generateRandomString(32);
    localStorage.setItem('oauth_state', state);
    
    // Build OAuth URL
    const scope = 'user:email read:user';
    const oauthUrl = `https://github.com/login/oauth/authorize?` +
      `client_id=${this.githubClientId}&` +
      `redirect_uri=${encodeURIComponent(this.githubRedirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}`;
    
    // Redirect to GitHub OAuth
    window.location.href = oauthUrl;
  }
  
  // Handle OAuth callback (call this on redirect page)
  async handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = localStorage.getItem('oauth_state');
    
    // Verify CSRF state
    if (!state || state !== storedState) {
      throw new Error('Invalid OAuth state parameter - possible CSRF attack');
    }
    
    if (!code) {
      throw new Error('No authorization code received from GitHub');
    }
    
    try {
      // Exchange code for access token through your backend
      const tokenResponse = await fetch(`${this.belugaApiBase}/auth/github/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          state: state,
          redirect_uri: this.githubRedirectUri
        })
      });
      
      if (!tokenResponse.ok) {
        throw new Error(`Token exchange failed: ${tokenResponse.status}`);
      }
      
      const authData = await tokenResponse.json();
      
      // Store authentication data
      this.isAuthenticated = true;
      this.user = authData.user;
      this.githubAccessToken = authData.github_token;
      this.apiToken = authData.api_token;
      this.requestSigningKey = authData.signing_key;
      this.sessionExpiry = Date.now() + (authData.expires_in * 1000);
      
      // Persist to localStorage
      this.saveAuth();
      this.updateAuthUI();
      this.startTokenRefresh();
      
      // Clean up OAuth state
      localStorage.removeItem('oauth_state');
      
      console.log('✅ GitHub OAuth completed successfully');
      return true;
      
    } catch (error) {
      console.error('OAuth callback error:', error);
      this.clearAuth();
      throw error;
    }
  }
  
  // Verify GitHub token is still valid
  async verifyGitHubToken(token) {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  }
  
  // Make authenticated request to Beluga API with proper security
  async authenticatedRequest(endpoint, options = {}) {
    if (!this.isAuthenticated || !this.apiToken) {
      throw new Error('Authentication required. Please sign in first.');
    }
    
    // Check request cache for GET requests
    const cacheKey = `${options.method || 'GET'}_${endpoint}`;
    if ((options.method || 'GET') === 'GET') {
      const cachedResponse = this.getCachedRequest(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Check if token needs refresh
    if (this.sessionExpiry && Date.now() > (this.sessionExpiry - 300000)) { // 5 minutes before expiry
      await this.refreshAuthToken();
    }
    
    // Retry logic for nonce conflicts
    const maxRetries = 2;
    let lastError = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const url = `${this.belugaApiBase}/${endpoint.replace(/^\//, '')}`;
        const timestamp = Date.now();
        const nonce = this.generateRandomString(16);
        
        // Validate nonce timestamp locally first
        if (!this.isNonceValid(nonce)) {
          continue; // Generate new nonce
        }
        
        // Create request signature for security
        const requestData = {
          method: options.method || 'GET',
          url: url,
          timestamp: timestamp,
          nonce: nonce,
          user_id: this.user.id
        };
        
        // Add body hash for POST/PUT requests
        if (options.body && !options.body instanceof FormData) {
          requestData.body_hash = await this.hashString(
            typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
          );
        }
        
        // Generate request signature
        const signature = await this.signRequest(requestData, this.requestSigningKey);
        
        // Enhanced security headers
        const secureHeaders = {
          'Authorization': `Bearer ${this.apiToken}`,
          'X-GitHub-Token': this.githubAccessToken,
          'X-User-ID': this.user.id.toString(),
          'X-Username': this.user.login,
          'X-Timestamp': timestamp.toString(),
          'X-Nonce': nonce,
          'X-Signature': signature,
          'X-TimeCapsule-Version': '3.1.0',
          'Content-Type': 'application/json',
          ...options.headers
        };
        
        // Remove Content-Type for FormData
        if (options.body instanceof FormData) {
          delete secureHeaders['Content-Type'];
        }
        
        const response = await fetch(url, {
          ...options,
          headers: secureHeaders
        });
        
        if (response.status === 400) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.error && errorData.error.includes('nonce')) {
            lastError = new Error(`Nonce error: ${errorData.error}`);
            continue; // Retry with new nonce
          }
        }
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        // Cache successful GET requests
        if ((options.method || 'GET') === 'GET' && response.ok) {
          this.cacheRequest(cacheKey, response.clone());
        }
        
        return response;
        
      } catch (error) {
        lastError = error;
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Small delay before retry
        await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
      }
    }
    
    throw lastError;
  }
  
  // Validate nonce timestamp locally
  isNonceValid(nonce) {
    try {
      const [timestampStr] = nonce.split('_');
      if (!timestampStr) return false;
      
      const timestamp = parseInt(timestampStr);
      const now = Date.now();
      
      // Nonce should not be older than 15 minutes
      return (now - timestamp) <= (15 * 60 * 1000);
    } catch (error) {
      return false;
    }
  }
  
  // Get cached request if available and not expired
  getCachedRequest(cacheKey) {
    const cached = this.requestCache.get(cacheKey);
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp > this.cacheExpiry) {
      this.requestCache.delete(cacheKey);
      return null;
    }
    
    return cached.response;
  }
  
  // Cache successful request response
  cacheRequest(cacheKey, response) {
    this.requestCache.set(cacheKey, {
      response: response,
      timestamp: Date.now()
    });
    
    // Clean expired cache entries periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
      this.cleanExpiredCache();
    }
  }
  
  // Clean expired cache entries
  cleanExpiredCache() {
    const now = Date.now();
    for (const [key, cached] of this.requestCache.entries()) {
      if (now - cached.timestamp > this.cacheExpiry) {
        this.requestCache.delete(key);
      }
    }
  }
  
  // Refresh authentication token
  async refreshAuthToken() {
    try {
      const response = await fetch(`${this.belugaApiBase}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.githubAccessToken}`
        },
        body: JSON.stringify({
          user_id: this.user.id,
          refresh_token: this.refreshToken
        })
      });
      
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      
      const authData = await response.json();
      
      // Update tokens
      this.apiToken = authData.api_token;
      this.requestSigningKey = authData.signing_key;
      this.sessionExpiry = Date.now() + (authData.expires_in * 1000);
      
      this.saveAuth();
      console.log('✅ Authentication token refreshed');
      
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.signOut();
      throw error;
    }
  }
  
  // Sign request for security
  async signRequest(requestData, signingKey) {
    const message = [
      requestData.method,
      requestData.url,
      requestData.timestamp,
      requestData.nonce,
      requestData.user_id,
      requestData.body_hash || ''
    ].join('|');
    
    return await this.hmacSHA256(message, signingKey);
  }
  
  // HMAC-SHA256 signing
  async hmacSHA256(message, key) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(message);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Hash string using SHA-256
  async hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Generate cryptographically secure random string with timestamp
  generateRandomString(length) {
    // Include timestamp for auto-expiry validation
    const timestamp = Date.now();
    const randomBytes = new Uint8Array(Math.max(8, length - 8)); // Ensure minimum randomness
    crypto.getRandomValues(randomBytes);
    const randomHex = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
    
    // Format: timestamp_randomhex (backend can validate timestamp)
    return `${timestamp}_${randomHex}`;
  }
  
  // Start automatic token refresh
  startTokenRefresh() {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
    
    // Refresh token every 50 minutes (assuming 1 hour expiry)
    this.tokenRefreshInterval = setInterval(async () => {
      try {
        await this.refreshAuthToken();
      } catch (error) {
        console.error('Automatic token refresh failed:', error);
        this.signOut();
      }
    }, 50 * 60 * 1000);
  }
  
  // Sign out user
  signOut() {
    this.isAuthenticated = false;
    this.user = null;
    this.githubAccessToken = null;
    this.apiToken = null;
    this.requestSigningKey = null;
    this.sessionExpiry = null;
    this.refreshToken = null;
    
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
      this.tokenRefreshInterval = null;
    }
    
    this.clearAuth();
    this.updateAuthUI();
    
    console.log('✅ User signed out successfully');
  }
  
  // Save authentication data
  saveAuth() {
    const authData = {
      user: this.user,
      githubAccessToken: this.githubAccessToken,
      apiToken: this.apiToken,
      requestSigningKey: this.requestSigningKey,
      sessionExpiry: this.sessionExpiry,
      refreshToken: this.refreshToken
    };
    
    localStorage.setItem('timecapsule_auth', JSON.stringify(authData));
  }
  
  // Clear authentication data
  clearAuth() {
    localStorage.removeItem('timecapsule_auth');
    localStorage.removeItem('oauth_state');
  }
  
  // Update authentication UI
  updateAuthUI() {
    const signInBtn = document.getElementById('authSignInBtn');
    const signOutBtn = document.getElementById('authSignOutBtn');
    const userInfo = document.getElementById('authUserInfo');
    const userAvatar = document.getElementById('authUserAvatar');
    const userName = document.getElementById('authUserName');
    const authMessage = document.getElementById('authRequiredMessage');
    
    if (this.isAuthenticated && this.user) {
      // Show authenticated state
      if (signInBtn) signInBtn.style.display = 'none';
      if (signOutBtn) signOutBtn.style.display = 'inline-block';
      if (userInfo) userInfo.style.display = 'flex';
      if (authMessage) authMessage.style.display = 'none';
      
      if (userAvatar) userAvatar.src = this.user.avatar_url || '';
      if (userName) userName.textContent = this.user.name || this.user.login || 'Unknown User';
      
      console.log('✅ Auth UI updated - authenticated');
    } else {
      // Show unauthenticated state
      if (signInBtn) signInBtn.style.display = 'inline-block';
      if (signOutBtn) signOutBtn.style.display = 'none';
      if (userInfo) userInfo.style.display = 'none';
      if (authMessage) authMessage.style.display = 'block';
      
      console.log('ℹ️ Auth UI updated - not authenticated');
    }
  }
  
  // Get user information
  getUserInfo() {
    return this.isAuthenticated ? {
      id: this.user.id,
      login: this.user.login,
      name: this.user.name,
      email: this.user.email,
      avatar_url: this.user.avatar_url
    } : null;
  }
  
  // Check if user has specific permission
  hasPermission(permission) {
    // Basic permission check - extend as needed
    const basicPermissions = ['upload', 'view', 'comment'];
    return basicPermissions.includes(permission);
  }
  
  // Get GitHub Client ID based on environment mode
  getGitHubClientId() {
    // Use AppConfig values directly (same pattern as GA4)
    const envMode = window.AppConfig?.ENV_MODE || this.getEnvVar('ENV_MODE') || 'dev';
    
    if (envMode === 'dev') {
      // Development environment - use LOCAL_GITHUB_CLIENT_ID
      const localClientId = window.AppConfig?.LOCAL_GITHUB_CLIENT_ID || this.getEnvVar('LOCAL_GITHUB_CLIENT_ID');
      if (!localClientId) {
        console.warn('⚠️ LOCAL_GITHUB_CLIENT_ID not set for development environment');
        return null;
      }
      return localClientId;
    } else {
      // Production environment - use GITHUB_CLIENT_ID
      const prodClientId = window.AppConfig?.GITHUB_CLIENT_ID || this.getEnvVar('GITHUB_CLIENT_ID');
      if (!prodClientId) {
        console.warn('⚠️ GITHUB_CLIENT_ID not set for production environment');
        return null;
      }
      return prodClientId;
    }
  }
  
  // Get redirect URI based on environment mode
  getRedirectUri() {
    // Use AppConfig values directly (same pattern as GA4)
    const envMode = window.AppConfig?.ENV_MODE || this.getEnvVar('ENV_MODE') || 'dev';
    
    if (envMode === 'dev') {
      // Development environment - use localhost:8000
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : ':8000';
      return `${protocol}//${hostname}${port}/auth/github/callback`;
    } else {
      // Production environment - hardcoded production URI
      return 'https://timecapsule.bubblspace.com/auth/github/callback';
    }
  }
}

// Export for global access
window.AuthManager = AuthManager;

console.log('🔐 Auth: Authentication system initialized'); 
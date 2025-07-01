# Backend Implementation Instructions - TimeCapsule-SLM Security

## Environment Variables Required

```bash
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_production_client_id
GITHUB_CLIENT_SECRET=your_github_production_client_secret

# JWT Security
JWT_SECRET=generate_random_32_char_string
JWT_EXPIRES_IN=1h

# Request Signing
HMAC_SECRET_KEY=generate_random_32_char_string

# AWS S3 (for file uploads)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET_NAME=your_bucket_name

# Security Limits
MAX_FILE_SIZE=10485760
RATE_LIMIT_PER_HOUR=100
NONCE_EXPIRY_MINUTES=15
```

## Required Dependencies

Install these npm packages:
```bash
npm install express cors helmet jsonwebtoken multer aws-sdk axios express-rate-limit crypto
```

## Security Architecture Instructions

### 1. In-Memory Nonce Manager
- Create a singleton class to manage nonces in server memory (Map data structure)
- Store nonce + timestamp pairs with automatic cleanup every 5 minutes
- Validate nonce format: "timestamp_randomhex" and check timestamp is within 15 minutes
- Reject duplicate nonces and expired nonces
- No database required - pure in-memory solution

### 2. Security Middleware Chain
Create middleware functions in this order:

**A. JWT Validation**
- Verify Bearer token from Authorization header
- Decode user information from JWT
- Set req.user with decoded data

**B. GitHub Token Validation** 
- Extract X-GitHub-Token header
- Make API call to GitHub: GET https://api.github.com/user
- Verify user ID matches X-User-ID header
- Set req.githubUser with GitHub user data

**C. Request Signature Validation**
- Extract headers: X-Signature, X-Timestamp, X-Nonce, X-User-ID
- Validate timestamp (reject if older than 5 minutes)
- Check nonce with NonceManager (reject if used/expired)
- Generate HMAC-SHA256 signature of request data
- Compare with provided signature

**D. Rate Limiting**
- Track requests per user per hour in memory Map
- Allow 100 requests per hour per user
- Reset counter every hour
- Return 429 status if exceeded

### 3. Required API Endpoints

**POST /auth/github/callback**
- Accept: code, state, redirect_uri
- Exchange code for GitHub access token
- Fetch user info from GitHub API
- Generate JWT token with user data
- Generate HMAC signing key for user
- Return: user data, github_token, api_token (JWT), signing_key

**POST /slmtimecapsule** 
- Apply all security middleware
- Validate file upload (type, size limits)
- Upload to S3 with server-side encryption
- Return upload confirmation

### 4. File Upload Security
- Validate MIME types: image/jpeg, image/png, image/gif, image/webp
- Limit file size to 10MB
- Generate random S3 filenames
- Enable S3 server-side encryption (AES256)
- Scan file headers for validation

### 5. Error Handling Standards
Return consistent error format:
```json
{
  "error": "descriptive_error_message",
  "code": "ERROR_CODE",
  "timestamp": 1234567890
}
```

### 6. Security Headers
Always include in responses:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY  
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000

### 7. Logging Requirements
Log these security events:
- Failed authentication attempts
- Invalid signatures
- Rate limit violations
- Nonce reuse attempts
- File upload attempts

### 8. Health Check Endpoint
**GET /health**
- Return nonce manager statistics
- No authentication required
- Include: active_nonces_count, server_uptime

## Security Flow Summary

```
1. Client sends request with JWT + GitHub token + signed headers
2. Validate JWT → Extract user info
3. Validate GitHub token → Verify with GitHub API  
4. Validate signature → Check HMAC + nonce + timestamp
5. Check rate limits → Allow/deny based on user quota
6. Process request → Upload file or return data
7. Return response with security headers
```

## Implementation Notes

- Use Node.js Express framework
- All validation should be synchronous where possible
- Use async/await for GitHub API calls and S3 uploads
- Implement graceful error handling for all external API calls
- Include request correlation IDs for debugging
- Set up CORS for frontend domain only

**Priority: Security over performance - validate everything, trust nothing from client**

## Frontend-Backend Request Flow

### Headers Expected from Frontend:
```
Authorization: Bearer JWT_TOKEN
X-GitHub-Token: GITHUB_ACCESS_TOKEN
X-User-ID: USER_ID
X-Username: USERNAME
X-Timestamp: UNIX_TIMESTAMP_MS
X-Nonce: TIMESTAMP_RANDOMHEX
X-Signature: HMAC_SHA256_SIGNATURE
X-TimeCapsule-Version: 3.1.0
```

### Signature Generation Algorithm:
1. Create request data object with method, url, timestamp, nonce, user_id
2. Add body_hash if POST/PUT request
3. Sort keys alphabetically
4. Create query string format: key1=value1&key2=value2
5. Generate HMAC-SHA256 with secret key
6. Return hex string

### Rate Limiting Implementation:
- Use Map to track: userId → { count, resetTime }
- Reset counter every hour
- Increment on each request
- Block if count > 100

### Nonce Management:
- Format: "1234567890123_abc123def456"
- Split on underscore to get timestamp
- Validate timestamp within 15 minutes
- Store in Map with current timestamp
- Auto-cleanup expired nonces every 5 minutes

## S3 Upload Configuration

```javascript
// S3 Upload Parameters
{
  Bucket: S3_BUCKET_NAME,
  Key: `uploads/${userId}/${randomFileName}`,
  Body: fileBuffer,
  ContentType: detectedMimeType,
  ServerSideEncryption: 'AES256',
  Metadata: {
    'uploaded-by': userId,
    'upload-timestamp': timestamp,
    'original-filename': sanitizedFileName
  }
}
```

## Error Codes to Return

- `AUTH_REQUIRED`: 401 - Missing or invalid JWT
- `GITHUB_TOKEN_INVALID`: 401 - GitHub token validation failed
- `SIGNATURE_INVALID`: 400 - HMAC signature mismatch
- `NONCE_USED`: 400 - Nonce already used or expired
- `TIMESTAMP_OLD`: 400 - Request timestamp too old
- `RATE_LIMITED`: 429 - Too many requests
- `FILE_TOO_LARGE`: 400 - File exceeds size limit
- `INVALID_FILE_TYPE`: 400 - Unsupported file format
- `UPLOAD_FAILED`: 500 - S3 upload error

## Performance Optimizations

1. **In-Memory Operations**: All security checks use memory-based storage
2. **Async GitHub Validation**: Don't block on GitHub API calls
3. **Efficient Cleanup**: Batch cleanup of expired data
4. **Request Caching**: Cache GitHub user data for 5 minutes
5. **Connection Pooling**: Reuse HTTP connections to GitHub API

## Testing Requirements

- Unit tests for all middleware functions
- Integration tests for complete request flow
- Load testing for rate limiting
- Security testing for signature validation
- File upload testing with various file types
- Error handling testing for all edge cases

**Implementation Priority: Security → Reliability → Performance**

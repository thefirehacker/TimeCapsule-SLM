# AWS Amplify Deployment Guide for DeepResearch TimeCapsule

## 🚀 Deployment Steps

### 1. Connect Repository
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your GitHub/GitLab repository
4. Select the `4.0.0_next.js` branch

### 2. Environment Variables Setup
In the Amplify Console, go to **App settings** → **Environment variables** and add:

**Required for GA4 Analytics:**
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_NAME=DeepResearch TimeCapsule
NEXT_PUBLIC_SITE_URL=https://your-domain.amplifyapp.com
```

**Optional Analytics Configuration:**
```
GA4_ANONYMIZE_IP=true
GA4_DEBUG_MODE=false
```

### 3. Build Configuration
The `amplify.yml` file is already configured to:
- ✅ Install dependencies with `npm ci`
- ✅ Build Next.js application
- ✅ Verify GA4 environment variables
- ✅ Cache node_modules and .next for faster builds
- ✅ Set security headers
- ✅ Optimize static asset caching

### 4. Domain Setup (Optional)
1. Go to **App settings** → **Domain management**
2. Add your custom domain
3. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

### 5. Verification
After deployment:
1. Check browser console for GA4 initialization
2. Verify analytics in GA4 Real-time reports
3. Test document upload and AI features

## 🔧 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure GA4 measurement ID format: `G-XXXXXXXXXX`

### GA4 Not Tracking
- Verify `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set in Amplify console
- Check Real-time reports in Google Analytics
- Events may take 5-10 minutes to appear

### Performance Issues
- Enable caching in `amplify.yml` (already configured)
- Use Amplify's CDN for static assets

## 📊 GA4 Events Tracked
- Page views
- AI connections
- Research generation
- Document uploads
- Search queries
- Knowledge base management
- User engagement

## 🔐 Security Headers
The deployment includes security headers:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=() 
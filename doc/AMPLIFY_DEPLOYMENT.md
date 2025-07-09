# AWS Amplify Deployment Guide for DeepResearch TimeCapsule

## 🚨 IMPORTANT: Branch Name Issue Fix

**Problem:** Branch name `4.0.0_next.js` causes Amplify backend environment errors.

**Solution Options:**

### Option 1: Create New Branch (Recommended)
```bash
git checkout -b main
git push origin main
```
Then use `main` branch in Amplify.

### Option 2: Use Current Branch (Frontend Only)
Keep using `4.0.0_next.js` but ensure **no backend** is configured in Amplify.

---

## 🚀 Deployment Steps

### 1. Connect Repository
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your GitHub/GitLab repository
4. **Important:** Select `main` branch (or ensure frontend-only for `4.0.0_next.js`)

### 2. App Configuration
**Build Settings:** Amplify should auto-detect Next.js. If not, manually set:
- **Framework:** Next.js
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Node.js version:** 18 or 20

### 3. Environment Variables Setup
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

### 4. Advanced Settings
**Important:** In Amplify Console → App settings → General:
- **App type:** Frontend only (no backend)
- **Platform:** Web
- **Service role:** None required for frontend-only

### 5. Build Configuration
The `amplify.yml` file is configured for:
- ✅ Frontend-only deployment (no backend services)
- ✅ Install dependencies with `npm ci`
- ✅ Build Next.js application with SSR support
- ✅ Verify GA4 environment variables
- ✅ Cache node_modules and .next for faster builds
- ✅ Set security headers
- ✅ Optimize static asset caching

### 6. Domain Setup (Optional)
1. Go to **App settings** → **Domain management**
2. Add your custom domain
3. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

### 7. Verification
After deployment:
1. Check browser console for GA4 initialization
2. Verify analytics in GA4 Real-time reports
3. Test document upload and AI features

---

## 🔧 Troubleshooting

### Build Fails with "AppID not found"
**Cause:** Trying to use Amplify backend services  
**Fix:** 
1. Go to Amplify Console → App settings → General
2. Ensure "App type" is set to "Frontend only"
3. Remove any backend environment associations

### Invalid Backend Environment Name
**Cause:** Branch name `4.0.0_next.js` contains invalid characters  
**Fix:** 
1. Create new branch with simple name (e.g., `main`, `production`)
2. Or ensure frontend-only deployment (no backend)

### Framework Detection Issues
**Fix:** Manually set in Amplify Console:
- Build command: `npm run build`
- Build output directory: `.next`
- Install command: `npm ci`

### GA4 Not Tracking
- Verify `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set in Amplify console
- Check Real-time reports in Google Analytics
- Events may take 5-10 minutes to appear

### Performance Issues
- Enable caching in `amplify.yml` (already configured)
- Use Amplify's CDN for static assets

---

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

---

## 📋 Quick Fix Summary

1. **Remove backend section** from `amplify.yml` ✅ (Fixed)
2. **Use simple branch name** or ensure frontend-only deployment
3. **Set environment variables** in Amplify Console
4. **Verify framework detection** (Next.js, not React)
5. **Test GA4 tracking** after deployment 
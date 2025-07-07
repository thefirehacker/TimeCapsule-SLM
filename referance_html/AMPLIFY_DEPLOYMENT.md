# AWS Amplify Deployment Guide

## 🚀 Quick Setup

### 1. **Set Environment Variables in Amplify Console**

Navigate to: **Amplify Console → Your App → Environment Variables**

Add these variables:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `GA4_MEASUREMENT_ID` | `G-*********` | Your actual GA4 tracking ID |
| `SITE_NAME` | `SketchPad-SLM` | Site name for analytics |
| `SITE_URL` | `https://your-app.amplifyapp.com` | Your Amplify domain |
| `GA4_DEBUG_MODE` | `false` | Debug mode (true/false) |
| `GA4_ANONYMIZE_IP` | `true` | IP anonymization (true/false) |

### 2. **What Gets Maintained Automatically**

✅ **Automatically handled by Amplify:**
- Environment variable injection during build
- `config.js` generation with your actual values
- SSL certificates and HTTPS
- CDN distribution
- Auto-deployments on git push

✅ **You only maintain:**
- Environment variables in Amplify Console
- Your source code in git repository

## 🔧 Build Process

The `amplify.yml` file handles:

1. **Pre-build**: Injects environment variables into `config.js`
2. **Build**: Processes all static files 
3. **Deploy**: Serves the built application

## 📝 Environment Variable Management

### **Development vs Production**

You can set different values for different branches:

**Main Branch (Production):**
```
GA4_MEASUREMENT_ID = G-**********
GA4_DEBUG_MODE = false
SITE_URL = https://main.your-app.amplifyapp.com
```

**Develop Branch (Staging):**
```
GA4_MEASUREMENT_ID = G-DIFFERENT-ID  
GA4_DEBUG_MODE = true
SITE_URL = https://develop.your-app.amplifyapp.com
```

### **How to Update Variables**

1. Go to **Amplify Console → Environment Variables**
2. Edit values directly in the UI
3. **Trigger new build** (variables only update on new deployments)
4. Changes apply immediately after build completes

## 🔒 Security Benefits

- ✅ **No secrets in git repository**
- ✅ **Environment-specific configurations**
- ✅ **Build-time injection** (not runtime)
- ✅ **Branch-specific variables** supported

## 🚀 Deployment Steps

1. **Connect Repository**
   - Link your git repository to Amplify
   - Select branch for auto-deployment

2. **Configure Build Settings**
   - Amplify will auto-detect `amplify.yml`
   - Override build commands if needed

3. **Set Environment Variables**
   - Add all variables from the table above
   - Use your actual GA4 measurement ID

4. **Deploy**
   - Push to connected branch
   - Amplify builds and deploys automatically
   - Environment variables are injected during build

## 🔍 Verification

After deployment:

1. **Check build logs** for environment variable injection
2. **Browser console** shows GA4 initialization
3. **GA4 Real-time reports** show traffic
4. **Check generated config.js** has your actual values

## 🛠️ Troubleshooting

**Variables not updating?**
- Trigger a new build manually
- Environment variables only update during build process

**GA4 not working?**
- Check browser console for initialization message
- Verify GA4_MEASUREMENT_ID format (G-XXXXXXXXXX)
- Check Real-time reports in GA4 dashboard

**Build failures?**
- Check Amplify build logs
- Ensure all required environment variables are set
- Verify `amplify.yml` syntax 
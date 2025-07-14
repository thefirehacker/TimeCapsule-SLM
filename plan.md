# Development Plan - Authentication & Manage Button Fix

## Issues Identified

### 1. NextAuth Authentication Error ✅ FIXED
- **Error**: `ClientFetchError: Failed to fetch` with "Authentication Error: You do not have permission to sign in"
- **Error Code**: `AccessDenied`
- **Root Cause**: Missing `AUTH_SECRET` environment variable
- **Solution**: Added AUTH_SECRET to .env.local
- **Status**: ✅ RESOLVED

### 2. Manage Button Not Working in AI Frames ✅ FIXED
- **Issue**: Manage button called `deepResearchApp.showDocumentManager()` but didn't open dialog
- **Root Cause**: The button was calling external DeepResearch method instead of local state
- **Solution**: Changed to `setShowDocumentManager(true)` to use local Document Manager
- **Status**: ✅ RESOLVED

### 3. NEW ISSUE: DynamoDB Environment Variable Mismatch 🔥 CRITICAL
- **Error**: `UnrecognizedClientException: The security token included in the request is invalid`
- **Root Cause**: Environment variable naming mismatch
  - Code expects: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
  - .env.local has: `ACCESS_KEY_ID_AWS` and `SECRET_ACCESS_KEY_AWS`
- **Impact**: Authentication fails when trying to access DynamoDB
- **Status**: 🔥 NEEDS IMMEDIATE FIX

## Solution Plan

### Phase 1: Fix DynamoDB Environment Variables (URGENT)
- [ ] Update .env.local to use correct AWS environment variable names
- [ ] Test authentication flow works
- [ ] Verify DynamoDB connection

### Phase 2: Test All Functionality
- [x] Test Manage button opens Document Manager dialog in AI Frames
- [x] Test NextAuth authentication flow works locally
- [ ] Test full authentication flow with DynamoDB
- [ ] Verify user creation and login works

## Implementation Status

### Completed ✅
1. **Authentication Error**: Fixed missing AUTH_SECRET
2. **Manage Button**: Fixed to use local Document Manager dialog
3. **Identified root cause**: DynamoDB environment variable mismatch

### Pending ⏳
1. **Fix DynamoDB environment variables**: Update variable names in .env.local
2. **Test full authentication**: Verify complete auth flow works

### Next Steps
1. Fix environment variable names immediately
2. Test authentication end-to-end
3. Verify all functionality works as expected

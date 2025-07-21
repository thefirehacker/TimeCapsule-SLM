# Canvas3D-LLM Build Fix Plan

## Current Issue Analysis (2025-07-21)

### Build Problems Identified:
1. **Missing Module Error**: `ollama-ai-provider` module not found during build
2. **Zod Version Conflict**: Project uses zod v4.0.5, but AI SDK packages expect zod v3.23.8+
3. **NPM Install Failure**: Dependency resolution conflicts preventing package installation

### Root Cause:
The npm install is failing due to peer dependency conflicts with zod versions, which means the `ollama-ai-provider` package (listed in package.json) is not actually installed. This causes the module resolution to fail during build.

### Dependency Conflicts:
- Project: `zod@4.0.5`
- AI SDK packages expect: `zod@^3.23.8`
- Affected packages: `@ai-sdk/provider-utils`, `@ai-sdk/react`, `@ai-sdk/ui-utils`, `ai`, `ollama-ai-provider`

## Solution Plan:

### Option 1: Downgrade zod (Recommended for quick fix)
- Downgrade zod from v4.0.5 to v3.23.8+ for compatibility
- Install packages successfully
- Test build and functionality

### Option 2: Force install with legacy peer deps
- Use npm install with --legacy-peer-deps flag
- May have potential compatibility issues but allows mixed versions

### Option 3: Update AI SDK packages (If available)
- Check for newer versions of AI SDK that support zod v4.x
- Update if compatible versions exist

## Todo List:
1. Identify which zod version to use for maximum compatibility
2. Update package.json with compatible zod version
3. Clear node_modules and package-lock.json
4. Reinstall dependencies
5. Test build process
6. Verify Deep Research functionality works with ollama-ai-provider
7. Document the fix for future reference

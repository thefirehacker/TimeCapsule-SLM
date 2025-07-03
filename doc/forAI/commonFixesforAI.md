## Common Fixes for AI Development

### Analytics & Window Object Method Calls
- **ALWAYS check method existence**: Use `if (window.AppConfig && typeof window.AppConfig.methodName === 'function')` before calling any window object methods
- **Never assume methods exist**: Even if the object exists, the specific method might not be loaded yet or could be missing
- **AWS Amplify overwrites files**: If using Amplify, ensure all tracking methods are included in `amplify.yml` config generation, not just local files
- **Deployment sync**: After updating `amplify.yml`, push to repo - Amplify auto-detects and rebuilds with new configuration

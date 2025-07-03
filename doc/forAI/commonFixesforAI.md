## Common Fixes for AI Development

### Analytics & Window Object Method Calls
- **ALWAYS check method existence**: Use `if (window.AppConfig && typeof window.AppConfig.methodName === 'function')` before calling any window object methods
- **Never assume methods exist**: Even if the object exists, the specific method might not be loaded yet or could be missing

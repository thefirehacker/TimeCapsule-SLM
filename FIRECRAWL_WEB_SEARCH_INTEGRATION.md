# Firecrawl Web Search Integration

This document describes the implementation of the Firecrawl web search integration feature that allows users to configure their API key and enable web search functionality.

## Overview

The Firecrawl web search integration provides users with the ability to:

- Configure their Firecrawl API key through a user-friendly modal
- Store the API key securely in localStorage
- Enable/disable web search functionality
- Validate API keys before saving
- Integrate web search results with the research system

## Components

### 1. FirecrawlConfigModal (`src/components/ui/firecrawl-config-modal.tsx`)

A modal component that allows users to:

- Enter their Firecrawl API key
- Test the API key validity
- Save the configuration
- View validation feedback

**Features:**

- Password field with show/hide toggle
- Real-time API key validation
- Error handling and user feedback
- Secure storage in localStorage
- Link to Firecrawl documentation

### 2. Updated PromptBox (`src/components/ui/prompt-input.tsx`)

Enhanced the existing PromptBox component to:

- Show web search toggle button with configuration state
- Open configuration modal when API is not configured
- Handle web search enable/disable logic
- Provide visual feedback for configuration status

**New Props:**

- `onWebSearchConfigure?: (apiKey: string) => void` - Handler for API key configuration

### 3. API Endpoint (`src/app/api/test-firecrawl/route.ts`)

A server-side endpoint that:

- Validates Firecrawl API keys
- Tests the API with a simple search query
- Returns validation results to the client

### 4. Enhanced FirecrawlService (`src/lib/FirecrawlService.ts`)

Updated the service to:

- Check if API key is configured
- Provide configuration status
- Handle API key management

**New Methods:**

- `isConfigured` - Check if API key is available
- `getCurrentApiKey()` - Get current API key (for display)
- Enhanced `getStatus()` - Include configuration status

## Usage

### Basic Integration

```tsx
import { PromptBox } from "@/components/ui/prompt-input";
import { getFirecrawlService } from "@/lib/FirecrawlService";

function MyComponent() {
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [webSearchStatus, setWebSearchStatus] = useState({
    configured: false,
    lastSearch: null,
    searchCount: 0,
  });

  const handleWebSearchConfigure = (apiKey: string) => {
    // Store API key in localStorage
    localStorage.setItem("firecrawl_api_key", apiKey);

    // Update service
    const firecrawlService = getFirecrawlService();
    firecrawlService.setApiKey(apiKey);

    // Update status
    setWebSearchStatus((prev) => ({ ...prev, configured: true }));
  };

  const handleWebSearch = async (query: string) => {
    const firecrawlService = getFirecrawlService();
    return await firecrawlService.searchWeb(query);
  };

  return (
    <PromptBox
      webSearchEnabled={webSearchEnabled}
      onWebSearchToggle={setWebSearchEnabled}
      onWebSearch={handleWebSearch}
      onWebSearchConfigure={handleWebSearchConfigure}
      webSearchStatus={webSearchStatus}
    />
  );
}
```

### User Flow

1. **Initial State**: Web search button shows as disabled (orange color) with "Configure" tooltip
2. **Configuration**: User clicks the web search button → Modal opens
3. **API Key Entry**: User enters their Firecrawl API key
4. **Validation**: User can test the API key before saving
5. **Save**: Valid API key is stored in localStorage and web search is enabled
6. **Usage**: Web search button now shows as enabled (green) and can be toggled

## Visual States

### Web Search Button States

1. **Not Configured** (Orange):
   - Icon: `WifiOff`
   - Color: `text-orange-600`
   - Tooltip: "Configure web search (Click to configure API)"
   - Action: Opens configuration modal

2. **Configured but Disabled** (Gray):
   - Icon: `WifiOff`
   - Color: `text-muted-foreground`
   - Tooltip: "Enable web search"
   - Action: Enables web search

3. **Configured and Enabled** (Green):
   - Icon: `Wifi`
   - Color: `text-green-600`
   - Tooltip: "Disable web search"
   - Action: Disables web search

## Security Considerations

- API keys are stored in localStorage (client-side only)
- API keys are never sent to our servers except for validation
- Validation endpoint only tests the API key and doesn't store it
- API key input field is masked by default with show/hide toggle

## Error Handling

- Invalid API keys show validation errors
- Network errors are handled gracefully
- User-friendly error messages
- Retry functionality for failed validations

## Future Enhancements

- Server-side API key storage (with user authentication)
- API key rotation and management
- Usage analytics and rate limiting
- Multiple API key support
- Advanced search options configuration

## Dependencies

- `@mendable/firecrawl-js` - Firecrawl SDK
- `@radix-ui/react-dialog` - Modal component
- `lucide-react` - Icons
- `next/server` - API routes

## Configuration

To use this feature, users need to:

1. Sign up for a Firecrawl account at [firecrawl.dev](https://firecrawl.dev)
2. Get their API key from the dashboard
3. Click the web search button in the PromptBox
4. Enter and validate their API key
5. Start using web search functionality

The system will automatically remember the API key for future sessions.

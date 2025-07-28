# Firecrawl Web Search Integration

## Overview

The DeepResearch application now includes powerful web search capabilities powered by Firecrawl, enabling the AI to access real-time information from the web alongside your local knowledge base. This creates a comprehensive research system that combines local documents with fresh web content.

## 🌐 **How It Works**

1. **Hybrid Research**: Combines local knowledge base (RAG) + real-time web search
2. **Automatic Integration**: Web search happens automatically during research generation
3. **Clean Link Display**: Shows referenced sources with clickable links
4. **Intelligent Context**: Merges web content with document context for AI prompts

## 🚀 **Key Features**

### ✅ **Automatic Web Search**

- Searches the web automatically when generating research
- Finds 5 most relevant web pages for your query
- Extracts main content from each page
- Ranks results by relevance score

### ✅ **Clean Source Display**

- Shows web search results with clear visual indicators
- Displays page titles, URLs, and descriptions
- Clickable links to original sources
- Organized layout separate from local document results

### ✅ **Smart Content Integration**

- Combines web content with local documents in AI prompts
- Provides context from both sources to the AI
- Maintains clear separation between local and web sources
- Optimizes content length for better performance

### ✅ **User-Friendly Controls**

- Easy toggle to enable/disable web search
- Simple API key configuration
- Real-time status indicators
- Search count tracking

## 📋 **Setup Instructions**

### 1. Get Your Firecrawl API Key

1. Visit [firecrawl.dev](https://firecrawl.dev/)
2. Sign up for an account
3. Navigate to your dashboard
4. Copy your API key

### 2. Configure in DeepResearch

1. **Open DeepResearch** in your application
2. **Look for the "Web Search" section** in the left sidebar
3. **Toggle "Enable Web Search"** to ON
4. **Enter your Firecrawl API key** in the password field
5. **Verify the status shows "Ready"** with a green checkmark

### 3. Environment Variable (Optional)

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_FIRECRAWL_API_KEY=your-firecrawl-api-key-here
```

## 🎯 **Usage Examples**

### Research Enhancement

**You ask**: "What are the latest developments in AI safety?"

**System automatically**:

1. 🔍 Searches your knowledge base for relevant documents
2. 🌐 Searches the web for latest AI safety news
3. 📚 Combines both sources in the AI prompt
4. 🤖 Generates comprehensive research with both local and web context

### Visual Indicators

During research generation, you'll see:

- **"🔍 Searching knowledge base for relevant context..."**
- **"🌐 Searching the web for additional context..."**
- **"📚 Found 3 relevant documents with 8 chunks"**
- **"🌐 Web Search Results (5 results found)"**

### Clean Source Display

The interface shows two distinct sections:

1. **RAG Context Found** (gray background)
   - Shows documents from your knowledge base
   - Displays similarity percentages
2. **Web Search Results** (blue background)
   - Shows web pages found
   - Displays titles, URLs, and descriptions
   - Clickable links to sources

## 🔧 **Configuration Options**

### Web Search Settings

```typescript
{
  limit: 5,              // Number of web results to fetch
  maxContentLength: 2000,// Max characters per page
  language: 'en',        // Search language
  excludeDomains: [],    // Domains to exclude
  includeDomains: []     // Domains to prioritize
}
```

### Research Configuration

- **Include Web Search**: Toggle web search on/off per research session
- **Research Types**: All research types support web search
- **Research Depth**: Web search adapts to quick/detailed/comprehensive modes

## 📊 **Status Monitoring**

### Web Search Panel

- **Status**: Shows "Ready" or "Setup Required"
- **Searches**: Tracks number of web searches performed
- **Last Search**: Shows when web search was last used

### Real-Time Feedback

- **Progress indicators** during web search
- **Result counts** (e.g., "5 results found")
- **Error handling** with graceful fallbacks

## 🎨 **UI Components**

### ControlsPanel Web Search Section

```typescript
- Toggle switch for enabling web search
- API key input field (password type)
- Status badges (Ready/Setup Required)
- Search statistics display
- Link to Firecrawl website
```

### PromptBox Context Display

```typescript
- RAG Context (gray background)
  - Document titles and similarity scores
  - Chunk count indicators

- Web Search Results (blue background)
  - Page titles with link icons
  - Full URLs for reference
  - Page descriptions
  - Hover effects for better UX
```

### Research Output Enhancement

```typescript
- Combined thinking process messages
- Integrated source references
- Seamless context switching
- Enhanced research quality
```

## 🔄 **Integration Flow**

### 1. User Submits Query

```
User: "Latest trends in renewable energy"
```

### 2. Automatic Search Process

```
🔍 Searching knowledge base... (RAG)
🌐 Searching web... (Firecrawl)
📊 Combining contexts...
```

### 3. Context Generation

```typescript
// AI receives enhanced prompt with:
## RELEVANT CONTEXT FROM KNOWLEDGE BASE
### Source 1: renewable_energy_report.pdf (89% relevance)
[Content from local document...]

## RELEVANT CONTEXT FROM WEB SEARCH
### Source 1: Latest Renewable Energy Trends 2024
[Fresh content from web...]
```

### 4. Enhanced Research Output

```
AI generates comprehensive research using:
- Your uploaded documents (knowledge base)
- Latest web information (Firecrawl)
- Combined context for accuracy
```

## 🛡️ **Security & Privacy**

### API Key Storage

- Stored securely in localStorage
- Never sent to external servers except Firecrawl
- Can be cleared anytime

### Data Handling

- Web search is performed client-side
- No query data stored on external servers
- Content extracted using Firecrawl's secure API

### Graceful Fallbacks

- Works without web search if API key not configured
- Continues research if web search fails
- Clear error messages and status indicators

## 🚨 **Error Handling**

### Common Issues & Solutions

**"Setup Required" Status**

- ✅ Enter valid Firecrawl API key
- ✅ Check internet connection
- ✅ Verify API key permissions

**Web Search Fails**

- ✅ System continues with local documents only
- ✅ Clear error messages displayed
- ✅ No interruption to research flow

**Rate Limiting**

- ✅ Respects Firecrawl API limits
- ✅ Shows appropriate error messages
- ✅ Suggests trying again later

## 📈 **Performance Considerations**

### Optimization Features

- **Parallel Processing**: RAG and web search run simultaneously
- **Content Limiting**: Max 2000 characters per web page
- **Result Limiting**: Top 5 most relevant results only
- **Smart Caching**: Avoids redundant searches

### Expected Performance

- **Web Search**: ~2-5 seconds
- **Content Extraction**: ~1-3 seconds per page
- **Total Overhead**: ~5-10 seconds for enhanced research
- **Fallback Speed**: Instant if web search disabled

## 🔮 **Future Enhancements**

### Planned Features

- [ ] **Custom Search Domains**: Prioritize specific websites
- [ ] **Search Result Caching**: Cache results for repeated queries
- [ ] **Advanced Filtering**: Filter by date, content type, etc.
- [ ] **Source Citation**: Automatic citation generation
- [ ] **Search History**: Track and replay previous searches
- [ ] **Multiple Search Engines**: Support for additional search providers

### Advanced Integrations

- [ ] **News Search Mode**: Focus on recent news articles
- [ ] **Academic Search**: Prioritize scholarly sources
- [ ] **Local Business**: Location-based search results
- [ ] **Image Search**: Include relevant images from web

## 🎯 **Best Practices**

### For Optimal Results

1. **Use Specific Queries**: More specific = better web results
2. **Enable for Current Topics**: Web search excels at recent information
3. **Combine with Documents**: Upload relevant docs for context
4. **Monitor Usage**: Keep track of API usage limits

### API Key Management

1. **Keep Secure**: Don't share your API key
2. **Monitor Usage**: Check Firecrawl dashboard regularly
3. **Rotate Keys**: Update keys periodically for security
4. **Backup Configuration**: Save API key securely

## 📞 **Support & Troubleshooting**

### Getting Help

- **Firecrawl Documentation**: [firecrawl.dev/docs](https://firecrawl.dev/docs)
- **API Status**: Check Firecrawl status page
- **Browser Console**: Check for error messages
- **Network Tab**: Verify API requests

### Debug Information

```typescript
// Check web search status
const firecrawlService = getFirecrawlService();
console.log("Firecrawl Status:", firecrawlService.getStatus());

// Monitor search performance
console.log("Last web search time:", webSearchStatus.lastSearch);
console.log("Total searches:", webSearchStatus.searchCount);
```

## ✨ **Conclusion**

The Firecrawl integration transforms DeepResearch into a powerful hybrid research tool that combines the depth of your personal knowledge base with the breadth of real-time web information. This creates a comprehensive research experience that keeps you informed with both your curated documents and the latest developments from the web.

**Key Benefits:**

- ✅ **Comprehensive Research**: Local documents + web content
- ✅ **Real-Time Information**: Access to latest web data
- ✅ **Clean Source Display**: Clear references and links
- ✅ **Seamless Integration**: Works automatically with existing RAG system
- ✅ **User-Friendly**: Simple setup and clear visual feedback

# Pattern Tester Guide

## Overview

The Pattern Tester is a debugging tool that tests regex patterns directly against document chunks stored in IndexedDB/RxDB - exactly how the deep research multi-agent system works. This tool helps identify why specific patterns (like GRPO extraction) might be failing by testing them against the actual data structure used in production.

## Requirements Summary

### Core Purpose
Debug regex pattern extraction by testing patterns against actual VectorStore/RxDB chunks, matching the exact execution logic of the multi-agent research system.

### Key Capabilities
1. **Direct RxDB Testing** - No intermediate data loading, tests run directly on database chunks
2. **Pattern Validation** - Test patterns copied from deep research output to verify extraction
3. **Chunk Inspection** - View any chunk by ID to understand data structure
4. **Similarity Search** - Find related chunks using semantic search
5. **Production Parity** - Uses identical regex execution as `ExtractionAgent`

## Interface Overview

### Top Tools Row
- **Chunk Viewer** (left): Enter chunk ID to view full content and document info
- **Similarity Search** (right): Search for similar chunks across all documents

### Main Interface
- **Left Panel**: Pattern input and document selection
- **Right Panel**: Test results with detailed match information

## Step-by-Step Usage

### 1. Select Documents to Test

Documents load automatically from RxDB when the page opens:

1. **View available documents** - Shows name, type, and chunk count
2. **Select documents** using checkboxes
3. **Use bulk actions**: "Select All" or "Clear" buttons
4. **Monitor selection**: Counter shows "X of Y documents selected"

**No manual loading required** - The system fetches chunks when you execute the test.

### 2. Enter Regex Patterns

Copy patterns from deep research output or create new ones:

**Supported Formats:**
```
# Simple pattern
/GRPO/gi

# With description
GRPO Pattern: /Group Relative Policy Optimization \(GRPO\)[^\n]{0,100}/gi

# Multiple patterns (one per line)
/GRPO/gi
/\b[A-Z]{2,}\b.*method/gi
/\d+(\.\d+)?%?\s*(improvement|accuracy|score)/gi
```

**Pattern Parsing** (matches ExtractionAgent.ts):
- Patterns in `/pattern/flags` format are parsed exactly
- Patterns without slashes get `gi` flags by default
- Each pattern is tested against every chunk independently

### 3. Execute Pattern Test

1. Click **"Execute Pattern Test"**
2. System automatically:
   - Fetches chunks for selected documents from RxDB
   - Applies each pattern to every chunk
   - Extracts matches with surrounding context
   - Calculates confidence scores

### 4. Analyze Results

#### Summary Statistics
- **Total Matches**: All successful extractions
- **Patterns**: Number of patterns tested
- **Documents**: Number of documents with matches

#### Per-Pattern Results
Each pattern shows:
- **Description and regex code**
- **Match count badge**
- **For each match**:
  - Document source name
  - Chunk ID (click to copy, includes View button)
  - Extracted content (match[1] or match[0])
  - Context (50 chars before/after match)
  - Confidence score (95% for regex matches)
  - Document ID for reference
- **"Show All X Matches"** button for patterns with >3 matches

#### Match Interactions
- **Copy Chunk ID**: Click the chunk badge
- **View Full Chunk**: Click "View" button
- **Inspect in Chunk Viewer**: ID is auto-populated

### 5. Use Chunk Viewer

View any chunk's complete content:

1. **Enter chunk ID** (or click View from a match)
2. **Click search button** or press Enter
3. **View displays**:
   - Chunk ID
   - Document title and filename
   - Full chunk content in monospace font
   - Scrollable for long content

### 6. Use Similarity Search

Find related chunks semantically:

1. **Enter search query**
2. **Click search** or press Enter
3. **Results show**:
   - Document title
   - Similarity percentage
   - Chunk ID
   - Content preview (first 200 chars)
   - "View Full Chunk" link

### 7. Export Results

Click **"Export CSV"** to download comprehensive results:

**CSV Columns:**
- Pattern
- Description
- Match Content
- Source
- Document ID
- Chunk ID
- Full Context
- Confidence
- Chunk Start Index (placeholder)
- Chunk End Index (placeholder)

## Testing GRPO Extraction

### Recommended Test Patterns

Start simple and add complexity:

```
# Level 1: Basic presence
/GRPO/gi
/Group Relative Policy Optimization/gi

# Level 2: With acronym
/Group Relative Policy Optimization \(GRPO\)/gi

# Level 3: With context
/Group Relative Policy Optimization \(GRPO\)[^\n]{0,100}/gi

# Level 4: Method detection
/GRPO.*(?:method|algorithm|approach)/gi

# Level 5: Performance claims
/GRPO.*(?:outperforms|superior|better)/gi
```

### Debugging Process

1. **Verify document selection** - Ensure GRPO document is selected
2. **Start with `/GRPO/gi`** - Confirms basic presence
3. **If no matches**:
   - Check document is in VectorStore
   - Try similarity search for "GRPO"
   - Verify chunks aren't empty
4. **If simple works but complex fails**:
   - Check escaping (especially parentheses)
   - Adjust context length `{0,100}`
   - Test pattern components separately

## Technical Details

### How It Matches Production

The Pattern Tester uses identical logic to `ExtractionAgent.extractUsingRegexPatterns()`:

```javascript
// Pattern parsing (line 814-818)
const regexMatch = regexStr.match(/^\/(.+)\/([gimuy]*)$/);
const regexBody = regexMatch ? regexMatch[1] : regexStr;
const regexFlags = regexMatch ? regexMatch[2] : 'gi';
const regex = new RegExp(regexBody, regexFlags);

// Chunk processing (line 823-849)
for (const chunk of chunks) {
  while ((match = regex.exec(chunk.text)) !== null) {
    const extractedContent = match[1] || match[0];
    // Extract with context...
  }
  regex.lastIndex = 0; // Reset for global patterns
}
```

### API Integration

#### Document List
`GET /api/documents/list`
- Returns array of documents with metadata
- No fallback data - direct VectorStore connection

#### Chunk Loading
`GET /api/documents/chunks?documentIds=id1,id2`
- Filters chunks by document IDs
- Returns chunk text, IDs, and metadata

#### Chunk Viewer
`GET /api/chunks/[id]`
- Returns specific chunk with full content
- Includes associated document information

#### Similarity Search
`POST /api/search/similarity`
- Body: `{ query: string, limit: number }`
- Returns chunks sorted by similarity score

### VectorStore Connection

- **No fallback data** - Direct RxDB connection only
- **Initialization**: APIs create new VectorStore instance and connect
- **Error handling**: Returns empty arrays or error messages if connection fails
- **Real data only**: Tests against actual indexed documents

## Best Practices

1. **Test incrementally** - Start simple, add complexity gradually
2. **Use document selection** - Test specific documents to isolate issues
3. **Copy working patterns** - Use patterns that work in Pattern Tester in production
4. **Check chunk boundaries** - Content might span multiple chunks
5. **Export for analysis** - CSV helps identify patterns in large result sets
6. **Verify with Chunk Viewer** - Inspect actual chunk content when patterns fail

## Common Issues

### "No documents found"
- Check VectorStore initialization in main app
- Verify documents are properly indexed
- Check browser console for RxDB errors

### "Pattern finds 0 matches"
1. Verify document selection
2. Test simplest pattern first: `text` not `/text/gi`
3. Use Similarity Search to verify content exists
4. Check if content spans chunk boundaries

### "VectorStore initialization failed"
- Not using fallback data anymore
- Check IndexedDB in browser DevTools
- Verify no blocking browser extensions
- Try incognito mode to rule out storage issues

### Pattern works here but not in production
- Ensure PatternGenerator creates patterns with `regexPattern` property
- Verify document filtering matches between environments
- Check that production uses same document selection

## Performance Considerations

- **Chunk processing**: Large documents take time
- **Pattern complexity**: Complex regex increases processing time
- **No cross-chunk matching**: Each chunk processed independently
- **Browser limitations**: Very large result sets may slow UI

## Workflow Integration

### From Deep Research to Pattern Tester

1. **Run deep research** query
2. **Check research output** for generated patterns
3. **Copy patterns** from debug info
4. **Open Pattern Tester** (`/pattern-tester`)
5. **Select same documents** used in research
6. **Paste and test** patterns
7. **Debug failures** using Chunk Viewer
8. **Export results** for detailed analysis

### From Pattern Tester to Production

1. **Validate patterns** in Pattern Tester
2. **Note which patterns work**
3. **Update PatternGenerator** if needed
4. **Test in deep research** with same query
5. **Verify extraction** matches Pattern Tester results

---

This tool provides accurate testing that exactly matches how the deep research multi-agent system extracts data, making it an essential debugging tool for pattern extraction issues.
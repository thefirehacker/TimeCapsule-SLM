# Pattern Tester Guide

## Overview

The Pattern Tester is a debugging tool that tests regex patterns directly against document chunks stored in IndexedDB/RxDB - exactly how the deep research multi-agent system works. This tool helps identify why specific patterns (like GRPO extraction) might be failing by testing them against the same data structure used in production.

## Key Difference from Before

**Old approach**: Load data into a textarea, test patterns against text
**New approach**: Select documents, test patterns directly against RxDB chunks (matching production behavior)

## Accessing the Pattern Tester

Navigate to: `/pattern-tester` in your application

## Interface Overview

The Pattern Tester interface has been redesigned to match the actual deep research flow:

### Left Panel - Input Section
- **Regex Patterns**: Enter patterns copied from deep research output
- **Document Selection**: Choose which documents to test against
- **Execute Button**: Run patterns directly on selected documents

### Right Panel - Results Section
- **Summary**: Overview of matches found
- **Pattern Results**: Detailed results showing actual matches with context
- **Export CSV**: Download comprehensive results for analysis

## Step-by-Step Usage Guide

### 1. Select Documents to Test

The Pattern Tester now works like the actual ExtractionAgent - it tests patterns directly against document chunks in RxDB:

1. **Documents automatically load** from RxDB when page opens
2. **Select documents** using checkboxes:
   - Click individual documents to toggle selection
   - Use "Select All" to test against all documents
   - Use "Clear" to deselect all
3. **View document info**:
   - Document name and type
   - Number of chunks per document
   - Selection count shown at bottom

**No manual data loading needed!** The system fetches chunks directly from RxDB when you execute the test.

### 2. Enter Regex Patterns

Copy patterns from the deep research output or create your own:

**Format Options:**

```
Simple pattern:
/Group Relative Policy Optimization \(GRPO\)[^\n]{0,100}/gi

With description:
GRPO Pattern: /Group Relative Policy Optimization \(GRPO\)[^\n]{0,100}/gi

Multiple patterns (one per line):
/GRPO/gi
/\b[A-Z]{2,}\b.*method/gi
/\d+(\.\d+)?%?\s*(improvement|accuracy|score)/gi
```

**Important**: The Pattern Tester uses the same regex parsing as ExtractionAgent.ts:
- Patterns in `/pattern/flags` format are parsed exactly
- Patterns without slashes get `gi` flags by default
- Regex is applied to each chunk independently

### 3. Execute Pattern Test

1. Click **"Execute Pattern Test"**
2. The system:
   - Fetches chunks for selected documents from RxDB
   - Applies each pattern to every chunk (same as ExtractionAgent.ts lines 823-849)
   - Extracts matches with context
   - Shows results organized by pattern

### 4. Analyze Results

**Summary Section:**
- **Total Matches**: Number of successful extractions across all patterns
- **Patterns**: Number of patterns tested
- **Documents**: Number of documents with matches

**Pattern Results:**
Each pattern shows:
- **Description and regex code**
- **Number of matches found**
- **For each match**:
  - Document source
  - Chunk ID
  - Extracted content (match[1] or match[0])
  - Context (50 chars before/after)
  - Confidence score (always 0.95 for regex matches)

### 5. Export Results

Click **"Export CSV"** to download results with:
- Pattern used
- Description
- Match content
- Source document
- Document ID
- Chunk ID
- Full context
- Confidence score

## Testing GRPO Extraction

### Why GRPO Extraction Might Fail

The Pattern Tester helps debug issues like:

1. **Pattern syntax errors**: Incorrect escaping or flags
2. **Content not in chunks**: GRPO text might be split across chunks
3. **Case sensitivity**: Pattern might need `i` flag
4. **Context length**: Pattern might be too restrictive

### Recommended GRPO Test Patterns

```
# Basic tests (start here)
/GRPO/gi
/Group Relative Policy Optimization/gi

# With parentheses (need escaping)
/Group Relative Policy Optimization \(GRPO\)/gi

# With context
/Group Relative Policy Optimization \(GRPO\)[^\n]{0,100}/gi

# Method detection
/GRPO.*(?:method|algorithm|approach)/gi

# Performance claims
/GRPO.*(?:outperforms|superior|better)/gi
```

### Debugging Process

1. **Start simple**: Test `/GRPO/gi` first
2. **If no matches**: 
   - Verify document selection
   - Check if GRPO content exists in selected documents
   - Try fallback documents if RxDB isn't working
3. **If matches found with simple pattern but not complex**:
   - Gradually add complexity
   - Check escaping (especially parentheses)
   - Adjust context length `{0,100}` as needed

## How It Matches Production

The Pattern Tester now exactly matches how ExtractionAgent works:

```javascript
// ExtractionAgent.ts line 814-818
const regexMatch = regexStr.match(/^\/(.+)\/([gimuy]*)$/);
const regexBody = regexMatch ? regexMatch[1] : regexStr;
const regexFlags = regexMatch ? regexMatch[2] : 'gi';
const regex = new RegExp(regexBody, regexFlags);

// ExtractionAgent.ts line 823-849
for (const chunk of chunks) {
  while ((match = regex.exec(chunk.text)) !== null) {
    // Extract and store matches
  }
  regex.lastIndex = 0; // Reset for global patterns
}
```

The Pattern Tester uses identical logic, ensuring test results match production behavior.

## API Integration

### Document List API
`GET /api/documents/list`
- Returns available documents with metadata
- Used to populate document selector

### Chunks API
`GET /api/documents/chunks?documentIds=id1,id2`
- Fetches chunks for specified document IDs
- Filters chunks to selected documents
- Returns same structure as used by ExtractionAgent

## Fallback Data

When RxDB/VectorStore is unavailable, the system provides fallback GRPO content:
- 3 GRPO paper chunks with real GRPO content
- 1 sample document chunk for testing
- Allows pattern testing even without database access

## Best Practices

1. **Test patterns incrementally**: Start simple, add complexity gradually
2. **Use document selection**: Test against specific documents to isolate issues
3. **Check chunk boundaries**: Content might be split across chunks
4. **Match production patterns**: Copy exact patterns from deep research output
5. **Export for analysis**: Use CSV export to analyze patterns across many matches
6. **Verify with context**: Check the context field to understand what's being matched

## Common Issues and Solutions

### "No matches found" for known content

**Solution**: 
- Verify document is selected
- Start with simplest possible pattern
- Check if content spans multiple chunks
- Try without flags first: `GRPO` instead of `/GRPO/gi`

### Pattern works in Pattern Tester but not in deep research

**Solution**:
- Ensure PatternGenerator is creating patterns with `regexPattern` property
- Check that patterns are being passed correctly to ExtractionAgent
- Verify document filtering in deep research matches your test

### RxDB not loading

**Solution**:
- Fallback data will be used automatically
- Check browser console for VectorStore initialization errors
- Try refreshing the page
- Verify IndexedDB is not blocked by browser settings

## Performance Notes

- Testing is done in browser, so large documents may take time
- Patterns are applied sequentially for accurate debugging
- Each chunk is processed independently (no cross-chunk matching)
- Global regex flags are reset between chunks to ensure all matches are found

---

This redesigned Pattern Tester provides accurate testing that matches exactly how the deep research multi-agent system extracts data, making it an effective debugging tool for pattern extraction issues.
# Regex Pattern Extraction Tools

This folder contains two regex pattern extraction tools that extract patterns from the AI Agent system logs and test them against flat files.

## Files

- **`Patterntest.ts`** - Node.js version for testing against local files
- **`PatternExtractorBrowser.ts`** - Browser version for extracting from IndexedDB
- **`pattern_extraction_results.csv`** - Sample output with 449 matches from logs.md

## Extracted Patterns

The tools contain **40 regex patterns** extracted from the logs, including:

### Person/Author Patterns (26 patterns)
- Person patterns: `Zhihong Shao[^\n]*(?:developed|created|proposes|implements)[^\n]*`
- Authorship patterns: `(?:author|by|from)\s*[^\n]*Zhihong Shao[^\n]*`
- Covers 13 researchers: Zhihong Shao, Peiyi Wang, Qihao Zhu, Ruoxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, Y. K. Li, Y. Wu, Daya Guo, Toby Simonds, Tufa Labs

### Method/Concept Patterns (9 patterns)
- `Group Relative Policy Optimization (GRPO)[^\n]{0,100}` - 11 matches
- `language models[^\n]{0,100}` - 54 matches
- `Reinforcement Learning[^\n]{0,100}` - 54 matches
- `Chain-of-Thought[^\n]{0,100}` - 20 matches
- `Program-of-Thought[^\n]{0,100}` - 13 matches
- `mathematical reasoning[^\n]{0,80}` - 27 matches
- `instruction tuning[^\n]{0,80}` - 16 matches

### Academic Paper Patterns (5 patterns)
- Method introduction: `\b(?:proposed|introduces|presents|develops|implements|creates)\s+[A-Z][^\n]{10,80}`
- Technical methods: `\b(?:algorithm|method|approach|technique|framework)\s+[A-Z][^\n]{5,60}`
- Performance results: `\b(?:performance|accuracy|results?|evaluation)\s+[^\n]{5,80}` - 24 matches
- Dataset mentions: `\b(?:dataset|corpus|benchmark)\s+[A-Z][^\n]{5,60}` - 3 matches
- Model architecture: `\b(?:model|architecture|network)\s+[A-Z][^\n]{5,60}` - 10 matches

## Usage

### Option 1: Node.js Version (Local Files)

```bash
cd Test/Regex
npx ts-node Patterntest.ts
```

**What it does:**
- Tests patterns against `logs.md` and other text files
- Generates CSV output in the same folder
- Shows summary with top performing patterns

**Sample Results from logs.md:**
- 40/40 successful patterns
- 449 total matches
- Top patterns: Language models (54), Reinforcement Learning (54), Mathematical reasoning (27)

### Option 2: Browser Version (IndexedDB)

1. **Load the browser script in your app:**
   ```typescript
   import { BrowserPatternExtractor } from './Test/Regex/PatternExtractorBrowser';
   ```

2. **Or use in browser console:**
   ```javascript
   // The script auto-loads when included
   extractPatterns(); // Convenience function
   ```

3. **Manual usage:**
   ```javascript
   const extractor = new BrowserPatternExtractor();
   await extractor.extractFromIndexedDB();
   extractor.exportToCSV('my_results.csv');
   
   // Get summary
   const summary = extractor.getSummary();
   console.log(summary);
   ```

**What it does:**
- Accesses documents stored in IndexedDB (`deepresearch_vectorstore`)
- Tests patterns against document content and chunks
- Automatically downloads CSV results
- Shows extraction summary in console

## CSV Output Format

The generated CSV contains:
- **Pattern**: The regex pattern used
- **Description**: Human-readable description
- **MatchCount**: Number of matches found
- **Matches**: First 3 matches (pipe-separated)
- **SourceDocument/SourceFile**: Source of the data
- **DocumentId**: Document ID (browser version)
- **Timestamp**: When extraction was performed

## Pattern Performance

Based on testing against logs.md:

| Pattern Type | Success Rate | Top Performer | Matches |
|-------------|-------------|---------------|---------|
| Method/Concept | 100% | Language models | 54 |
| Academic Paper | 100% | Performance results | 24 |
| Person/Author | 100% | Y. Wu authorship | 5 |

## Browser Integration

The browser version is designed to work with the Canvas3D-LLM IndexedDB structure:

```typescript
interface DocumentData {
  id: string;
  title: string;
  content: string;
  metadata: {
    filename: string;
    documentType: string;
  };
  chunks: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  }>;
}
```

## Key Features

1. **No Semantic Search**: Pure regex-based extraction for fast, deterministic results
2. **Flat File Support**: Works with text content stored in IndexedDB
3. **CSV Export**: Structured output for analysis
4. **Performance Metrics**: Shows match counts and success rates
5. **Browser Compatible**: Direct access to IndexedDB without server
6. **Progress Tracking**: Console output shows extraction progress

## Use Cases

- Extract research paper entities (authors, methods, concepts)
- Analyze document content patterns
- Performance benchmarking of regex patterns
- Data extraction from browser-stored documents
- Academic paper analysis and citation extraction

## Notes

- Patterns are case-insensitive (`gi` flags)
- Content length limits prevent overly long matches
- Browser version requires IndexedDB access
- CSV files can be opened in Excel or processed programmatically
- All patterns extracted from actual AI agent execution logs

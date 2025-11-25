# Issue #005: Knowledge Base - PDF Text Extraction & Chunking Improvements

**Status**: =' **IN PROGRESS**  
**Priority**: HIGH - Critical for RAG Performance  
**Type**: Bug Fix & Enhancement  
**Created**: 2025-08-01  
**Updated**: 2025-08-01  
**Assignee**: AI Assistant  
**Labels**: knowledge-base, pdf-parsing, chunking, rag, performance

## Problem Description

The current PDF text extraction and chunking system has significant limitations affecting RAG performance:

### Current Issues:
1. **Insufficient Text Extraction**: 
   - 1.5MB PDF files only yielding 27KB of extracted text
   - pdf2json missing significant content from complex PDFs
   - No support for tables, multi-column layouts, or embedded content

2. **Limited Chunking Effectiveness**:
   - Large PDFs producing only 8 chunks (insufficient for good RAG)
   - 500 words per chunk may be too large for precise retrieval
   - No overlap between chunks causing context loss

3. **RAG Performance Impact**:
   - Poor semantic search results due to limited content
   - Users reporting "non-sensical" AI responses
   - Multiple identical documents appearing in search results

4. **Query Intelligence Limitations** (CRITICAL):
   - Literal semantic matching fails for contextual queries
   - Query "top 3 runs" gets low similarity (0.268) despite relevant content
   - No query expansion or intent understanding
   - Single-stage search misses related concepts

## Root Cause Analysis

Based on investigation of console logs:
```
=� PDF file size: 1.48 MB
 PDF parsed: 14 pages, 27,550 characters extracted
=� Document stats: 27,550 characters, 3,534 words
 Created 8 chunks (3,534 words � 500 words/chunk = ~8)
```

The chunking math is correct, but the PDF extraction is severely limited.

## TODO - Improvements Required

### 1. Replace PDF Parser (Priority: HIGH)
- [ ] Replace pdf2json with pdf-parse or pdfjs-dist
- [ ] Implement proper text extraction for:
  - [ ] Multi-column layouts
  - [ ] Tables and structured content
  - [ ] Headers, footers, and metadata
- [ ] Add extraction validation and preview
- [ ] Handle different PDF versions and encodings

### 2. Optimize Chunking Strategy (Priority: HIGH)
- [ ] Reduce chunk size from 500 to 200-300 words
- [ ] Implement sliding window with 50-100 word overlap
- [ ] Add sentence boundary detection to avoid mid-sentence splits
- [ ] Consider semantic chunking based on document structure

### 3. Enhance Processing Pipeline (Priority: MEDIUM)
- [ ] Add progress indicators for large PDFs
- [ ] Implement extraction quality metrics
- [ ] Cache processed documents to avoid re-processing
- [ ] Add support for incremental updates

### 4. Intelligent RAG Query Processing (Priority: CRITICAL)
- [ ] **Hybrid Query Expansion**: Implement rule-based + LLM query expansion
  - [ ] Rule-based patterns for common query types (performance, comparison, technical)
  - [ ] LLM fallback for complex/ambiguous queries
  - [ ] Query intent classification system
- [ ] **Multi-Stage Search Architecture**: 
  - [ ] Stage 1: Query analysis and expansion
  - [ ] Stage 2: Broad topic matching with expanded queries
  - [ ] Stage 3: Contextual re-ranking based on original intent
  - [ ] Stage 4: Result synthesis and relevance scoring
- [ ] **Perplexity-Style Research Flow**:
  - [ ] Dynamic step generation and tracking
  - [ ] LLM-controlled RAG/web search decisions
  - [ ] Detailed step transparency with source references
  - [ ] Real-time research orchestration
- [ ] **Advanced Search Intelligence**:
  - [ ] Content-aware similarity thresholds
  - [ ] Cross-reference validation between sources
  - [ ] Automatic query refinement based on results

## Technical Implementation Notes

### Current Implementation:
```typescript
// /src/app/api/pdf-parser/route.ts
const pdfParser = new PDFParser(null, 1);
parsedText = pdfParser.getRawTextContent(); // Limited extraction
```

### Proposed Implementation:
```typescript
// Option 1: pdf-parse
import pdf from 'pdf-parse';
const data = await pdf(dataBuffer);
const text = data.text; // Better extraction

// Option 2: pdfjs-dist
import * as pdfjsLib from 'pdfjs-dist';
// More complex but better control over extraction
```

### Chunking Improvements:
```javascript
// Current: Fixed 500 words, no overlap
const wordsPerChunk = 500;
const maxChunks = 50;

// Proposed: Smaller chunks with overlap
const wordsPerChunk = 250;
const overlapWords = 50;
const maxChunks = 200; // Increase limit for large documents
```

### Intelligent Query Processing:
```typescript
// Current: Single literal search
const results = await vectorStore.searchSimilar(query, 0.3, 8);

// Proposed: Multi-stage intelligent search
async function intelligentRAGSearch(query: string) {
  // Stage 1: Analyze query intent
  const analysis = analyzeQuery(query); // "top 3 runs" → intent: "performance"
  
  // Stage 2: Expand query with related terms
  const expandedQueries = expandQuery(query, analysis.intent);
  // ["performance results", "benchmark data", "training speeds", "optimization results"]
  
  // Stage 3: Multi-query search with lower thresholds
  const allResults = await Promise.all(
    expandedQueries.map(q => vectorStore.searchSimilar(q, 0.15, 10))
  );
  
  // Stage 4: Re-rank by original query intent and content relevance
  return rankByRelevance(allResults.flat(), query, analysis);
}
```

### Perplexity-Style Research Steps:
```typescript
// Research orchestration with step tracking
const researchSteps = [
  { type: 'analysis', status: 'completed', query: 'top 3 runs', intent: 'performance' },
  { type: 'rag_search', status: 'in_progress', queries: ['benchmark results', 'training speeds'] },
  { type: 'web_search', status: 'pending', reason: 'Need recent performance data' },
  { type: 'synthesis', status: 'pending', sources: 15 }
];
```

## Success Criteria

1. **Text Extraction**: Extract >90% of visible text from standard PDFs
2. **Chunk Generation**: Generate appropriate number of chunks (50-100 for large docs)
3. **RAG Performance**: Improved semantic search accuracy and relevance
4. **User Experience**: Clear progress indicators and extraction previews
5. **Query Intelligence**: 
   - Contextual queries (e.g. "top 3 runs") find relevant content >80% similarity
   - Multi-stage search finds 3x more relevant results than single-stage
   - Query expansion generates 4-6 related search terms automatically
6. **Research Transparency**:
   - All RAG/web searches displayed as trackable steps
   - Source references linked to specific document chunks
   - Research reasoning and confidence scores visible

## Related Files

### Existing Files:
- `/src/app/api/pdf-parser/route.ts` - PDF parsing API endpoint
- `/src/lib/PDFParser.ts` - PDF parser service
- `/public/workers/embeddingWorker.js` - Chunking implementation
- `/src/lib/workers/DocumentProcessor.ts` - Document processing pipeline

### New Files (To Be Created):
- `/src/lib/QueryIntelligenceService.ts` - Hybrid query expansion and intent analysis
- `/src/lib/ResearchOrchestrator.ts` - LLM-driven research step orchestration
- `/src/components/DeepResearch/components/ResearchSteps.tsx` - Step tracking UI component
- `/cursor_claudecode_ai/specs/intelligent-rag-spec.md` - Technical specification

## Notes

- OCR functionality will be addressed in a future issue
- Focus on text-based PDFs for now
- Maintain backwards compatibility with existing documents
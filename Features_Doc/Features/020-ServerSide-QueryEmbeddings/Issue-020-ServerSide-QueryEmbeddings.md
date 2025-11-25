# Issue-020: Server-Side Query Embeddings for Semantic Search

## Status
**Created:** 2025-11-18
**Status:** Planning - Awaiting Approval
**Priority:** High - Blocking semantic search functionality

## Problem Statement

### Current Issue
Multiple features are failing with semantic search errors:
1. **Knowledge Base Semantic Search**: "Search is unavailable. Please refresh the page and try again."
2. **AI Flow Builder**: "Knowledge Base returned no relevant chunks. Add documents to the KB before running Flow Builder."
3. **Agent Systems** (RAGToolSystem, AgentCoordinator): RAG queries failing silently

### Root Cause
While document embeddings are correctly generated on the server and stored in client-side IndexedDB, the search query embeddings are still being generated client-side using `documentProcessor.generateEmbedding()`. This fails because:

1. The client-side embedding model (`documentProcessor`) is not initialized/available
2. Search queries need embeddings to compare against stored document embeddings
3. Mismatch: Documents use server-side embeddings, queries try to use client-side embeddings

### Current Architecture
```
Document Upload Flow (Working):
File → Server → Extract Text → Chunk → Generate Embeddings (Server) → Return to Client → Store in IndexedDB ✅

Search Flow (Broken):
Query → Generate Embedding (Client - FAILS) → Compare with stored embeddings → Return results ❌
```

### Desired Architecture (Consistent Server-Side Embeddings)
```
Document Upload Flow:
File → Server → Extract Text → Chunk → Generate Embeddings (Server) → Return to Client → Store in IndexedDB ✅

Search Flow (To Implement):
Query → Server API → Generate Embedding (Server) → Return to Client → Compare with local stored embeddings → Return results ✅
```

### Impact Analysis - Systems Affected

**Fixing `searchSimilar()` will automatically fix ALL these systems:**

1. **VectorStore.searchSimilar()** - Direct semantic search
   - Used by: KB Manager UI, manual searches
   - Location: `/src/components/VectorStore/VectorStore.ts` line 1325

2. **VectorStore.searchHybrid()** - Hybrid search (semantic + keyword)
   - Calls: `searchSimilar()` internally at line 1505
   - Used by: **AI Flow Builder** (line 1051 in useAIFlowBuilder.ts)
   - Also uses: Knowledge context building for frame generation

3. **RAGToolSystem.searchKnowledge()** - Agent RAG queries
   - Calls: `searchSimilar()` at line 97
   - Used by: Multi-agent research system
   - Location: `/src/lib/RAGToolSystem.ts`

4. **AgentCoordinator.buildAgentPrompt()** - Agent context building
   - Calls: `searchSimilar()` at line 466
   - Used by: All agents needing KB context
   - Location: `/src/lib/AgentCoordinator.ts`

5. **Orchestrator.discoverAndSampleDocuments()** - Document discovery
   - Likely calls: `searchSimilar()` indirectly
   - Used by: Master orchestrator for multi-agent research
   - Location: `/src/lib/multi-agent/core/Orchestrator.ts`

**Single Point of Fix:** Since all these systems funnel through `searchSimilar()`, implementing server-side query embeddings in `searchSimilar()` will fix ALL dependent systems automatically.

## Architecture Principles (DO NOT DEVIATE)

### Core Rules
1. **ALL embeddings are ALWAYS generated server-side** (documents AND search queries)
2. **ALL KB data is ALWAYS stored client-side** (IndexedDB via RxDB)
3. **ALL vector search is ALWAYS performed client-side** (using locally stored embeddings)
4. **Server ONLY provides embedding generation service** (does NOT store or search)

### Data Flow
- **Server Role**: Compute-heavy operations (text extraction, embedding generation)
- **Client Role**: Data storage (IndexedDB), data retrieval (vector search), UI interactions
- **Privacy**: All user data remains on client, server only processes transient requests

## Technical Specification

### Files to Modify

#### 1. Create New API Endpoint
**File**: `/src/app/api/kb/embed-query/route.ts` (NEW)
- Accept POST request with query text
- Generate embedding using existing `generateServerEmbeddings()`
- Return embedding vector
- Handle errors gracefully

**Request Format**:
```typescript
POST /api/kb/embed-query
Content-Type: application/json
{
  "query": "search text"
}
```

**Response Format**:
```typescript
{
  "embedding": [0.123, -0.456, ...], // 384-dimensional array
  "model": "bge-small-en-v1.5",
  "timestamp": "2025-11-18T..."
}
```

**Error Response**:
```typescript
{
  "error": "Error message",
  "details": "Additional context"
}
```

#### 2. Modify VectorStore Search Method
**File**: `/src/components/VectorStore/VectorStore.ts`
- Modify `searchSimilar()` method (lines 1325-1472)
- Replace client-side embedding generation with server API call
- Keep all other logic (similarity calculation, ranking, filtering) unchanged
- Maintain RAG tracking functionality
- Handle network errors appropriately

**Current Code (Line 1369)**:
```typescript
const queryEmbedding = await this.documentProcessor.generateEmbedding(query);
```

**New Code**:
```typescript
const queryEmbedding = await this.generateQueryEmbedding(query);
```

**New Method to Add**:
```typescript
private async generateQueryEmbedding(query: string): Promise<number[]> {
  const response = await fetch('/api/kb/embed-query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to generate query embedding: ${response.statusText}`);
  }
  
  const { embedding } = await response.json();
  return embedding;
}
```

#### 3. Remove/Update Client-Side Embedding Checks
**File**: `/src/components/VectorStore/VectorStore.ts`
- Lines 1340-1349: Update ready state checks
- Remove dependency on `documentProcessor` for search
- Keep `documentProcessor` check only for direct document uploads (if still needed)
- Update error messages to reflect server-based architecture

**Current Check (Lines 1347-1348)**:
```typescript
} else if (!this.documentProcessor || !this._processorAvailable) {
  throw new Error('Search is unavailable. Please refresh the page and try again.');
}
```

**Update to**:
```typescript
// No client-side processor check needed for search
// Embedding generation happens on server
```

### Dependencies
- Server-side embedding function: `generateServerEmbeddings()` in `/src/lib/server/embedding.ts` (already exists)
- Model: `bge-small-en-v1.5` (already bundled and working for document embeddings)

### Edge Cases to Handle

1. **Network Failures**
   - Server unreachable during search
   - Timeout on embedding generation
   - Show user-friendly error: "Search temporarily unavailable. Please check your connection."

2. **Empty Query**
   - Validate query length before sending to server
   - Minimum 2 characters for meaningful search

3. **Concurrent Searches**
   - Multiple searches triggered rapidly
   - Use debouncing on client-side (if not already implemented)
   - Server should handle concurrent requests safely

4. **Large Queries**
   - Max query length limit (e.g., 1000 characters)
   - Truncate or reject overly long queries

5. **Model Consistency**
   - Ensure same model version for documents and queries
   - Document model used in metadata for verification

### Performance Considerations

1. **Latency**
   - Network round-trip adds ~100-500ms vs client-side
   - Acceptable trade-off for consistency and reliability
   - Consider caching common queries (future optimization)

2. **Server Load**
   - Embedding generation is CPU-intensive
   - Consider rate limiting if needed
   - Monitor server costs

3. **Fallback Strategy**
   - If server fails, show graceful error (no fallback to client-side)
   - Maintain architecture consistency

## Testing Requirements

### Unit Tests
1. API endpoint responds with correct embedding format
2. VectorStore calls API correctly
3. Error handling for network failures
4. Empty/invalid query handling

### Integration Tests
1. End-to-end search flow: query → embedding → results
2. Search with stored documents returns expected results
3. Similarity scoring works correctly with server embeddings
4. Document type filtering still works

### Manual Tests
1. Upload document → verify embeddings stored
2. Search for content → verify results returned
3. Test with various query types (short, long, special characters)
4. Test network failure scenarios (disconnect, slow connection)
5. Test with multiple document types
6. Verify RAG tracking logs correctly

## Success Criteria

- [ ] Search functionality works without client-side embedding model
- [ ] Query embeddings generated on server
- [ ] Search results match expected semantic similarity
- [ ] No regression in upload functionality
- [ ] Graceful error handling for network issues
- [ ] Performance acceptable (search completes in < 2 seconds typically)
- [ ] Console logs show server-side embedding generation
- [ ] RAG tracking captures query embedding source

## Rollback Plan

If implementation fails:
1. Revert VectorStore changes
2. Remove API endpoint
3. Document issues encountered
4. Current state remains (search broken but uploads work)

## Future Enhancements (Not in Scope)

1. Query embedding caching (client or server)
2. Batch query embedding generation
3. Alternative embedding models selection
4. Hybrid search (semantic + keyword)
5. Query rewriting/expansion

## Related Issues

- Issue-017: KB Enhancement with server-side document embeddings (completed)
- Issue-013: File Upload Embedding Improvements (related)
- Issue-011: Document Grounding KB (related)

## Notes

- This change completes the transition to fully server-side embeddings
- Maintains data privacy (KB stays on client)
- Provides consistent embedding generation
- Removes dependency on client-side embedding model download
- Simplifies client-side code


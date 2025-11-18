# TODO-020: Server-Side Query Embeddings Implementation

## Overview
Implement server-side query embedding generation to enable semantic search functionality with consistent server-side embedding generation for both documents and queries.

**Architecture**: Server generates embeddings, Client stores and searches locally.

---

## Phase 1: Create Server-Side Query Embedding API

### Task 1.1: Create API Endpoint
**File**: `/src/app/api/kb/embed-query/route.ts` (NEW)
**Status**: ⏳ Pending
**Estimated Time**: 15 minutes

**Details**:
- Create new Next.js API route file
- Import `generateServerEmbeddings` from `/src/lib/server/embedding.ts`
- Implement POST handler
- Accept JSON body with `{ query: string }`
- Call `generateServerEmbeddings([query])` to get single embedding
- Return JSON with `{ embedding: number[], model: string, timestamp: string }`
- Add error handling for:
  - Missing query field
  - Empty query
  - Query too long (>1000 chars)
  - Embedding generation failures
- Add logging for debugging
- Use "use server" directive

**Acceptance Criteria**:
- [ ] API responds to POST /api/kb/embed-query
- [ ] Returns 400 for invalid requests
- [ ] Returns 200 with embedding array for valid queries
- [ ] Logs query length and generation time
- [ ] Handles errors gracefully with descriptive messages

**Code Structure**:
```typescript
"use server";
import { NextRequest, NextResponse } from "next/server";
import { generateServerEmbeddings } from "@/lib/server/embedding";

export async function POST(req: NextRequest) {
  // Validate request
  // Extract query
  // Validate query (length, content)
  // Generate embedding
  // Return response
  // Handle errors
}
```

---

### Task 1.2: Test API Endpoint Manually
**File**: Use browser dev tools or curl
**Status**: ⏳ Pending
**Estimated Time**: 10 minutes

**Details**:
- Start dev server
- Test with curl or Postman
- Test cases:
  1. Valid query: `{ "query": "test search" }`
  2. Empty query: `{ "query": "" }`
  3. Missing query field: `{}`
  4. Long query: 1000+ characters
- Verify response format matches spec
- Check server logs for embedding generation

**Test Commands**:
```bash
# Valid query
curl -X POST http://localhost:3000/api/kb/embed-query \
  -H "Content-Type: application/json" \
  -d '{"query":"test search"}'

# Empty query
curl -X POST http://localhost:3000/api/kb/embed-query \
  -H "Content-Type: application/json" \
  -d '{"query":""}'
```

**Acceptance Criteria**:
- [ ] Valid query returns 200 with embedding array (length 384)
- [ ] Empty query returns 400 error
- [ ] Missing query field returns 400 error
- [ ] Response time < 500ms for typical query
- [ ] Console shows embedding generation logs

---

## Phase 2: Modify VectorStore to Use Server API

### Task 2.1: Add Private Method for Query Embedding
**File**: `/src/components/VectorStore/VectorStore.ts`
**Status**: ⏳ Pending
**Estimated Time**: 20 minutes

**Details**:
- Add new private method `generateQueryEmbedding(query: string): Promise<number[]>`
- Location: After line 1320, before `searchSimilar()` method
- Implement fetch call to `/api/kb/embed-query`
- Add request timeout (10 seconds)
- Parse response and extract embedding array
- Add comprehensive error handling:
  - Network errors (offline, timeout)
  - HTTP errors (400, 500)
  - Invalid response format
  - Empty/invalid embedding array
- Add logging for debugging
- Add performance timing logs

**Implementation**:
```typescript
/**
 * Generate query embedding using server-side API
 * @param query Search query text
 * @returns Embedding vector (384 dimensions)
 * @throws Error if embedding generation fails
 */
private async generateQueryEmbedding(query: string): Promise<number[]> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('/api/kb/embed-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Server error: ${response.status} ${response.statusText}`
      );
    }
    
    const { embedding } = await response.json();
    
    if (!Array.isArray(embedding) || embedding.length !== 384) {
      throw new Error('Invalid embedding format received from server');
    }
    
    const duration = Date.now() - startTime;
    console.log(`🧠 Generated query embedding via server in ${duration}ms`);
    
    return embedding;
  } catch (error: any) {
    console.error('❌ Failed to generate query embedding:', error);
    
    if (error.name === 'AbortError') {
      throw new Error('Query embedding generation timed out. Please try again.');
    }
    
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to embedding service. Please check your connection.');
    }
    
    throw error;
  }
}
```

**Acceptance Criteria**:
- [ ] Method compiles without TypeScript errors
- [ ] Proper error handling for all failure modes
- [ ] Returns valid number array (length 384)
- [ ] Logs generation time
- [ ] Timeout after 10 seconds
- [ ] Clear error messages for users

---

### Task 2.2: Modify searchSimilar Method
**File**: `/src/components/VectorStore/VectorStore.ts`
**Status**: ⏳ Pending
**Estimated Time**: 15 minutes

**Details**:
- Locate `searchSimilar()` method (line 1325)
- Find line 1369: `const queryEmbedding = await this.documentProcessor.generateEmbedding(query);`
- Replace with: `const queryEmbedding = await this.generateQueryEmbedding(query);`
- Update surrounding try-catch to handle new error types
- Keep all other logic unchanged (similarity calculation, ranking, filtering)
- Update console logs to reflect server-side generation
- Ensure RAG tracking still captures embedding generation time

**Specific Changes**:
```typescript
// OLD (Line 1369):
const queryEmbedding = await this.documentProcessor.generateEmbedding(query);

// NEW:
const queryEmbedding = await this.generateQueryEmbedding(query);
```

**Acceptance Criteria**:
- [ ] Line 1369 replaced with new method call
- [ ] No TypeScript errors
- [ ] Try-catch properly handles new errors
- [ ] RAG tracking updated with server-side timing
- [ ] Console logs indicate server-side embedding

---

### Task 2.3: Remove Client-Side Processor Checks for Search
**File**: `/src/components/VectorStore/VectorStore.ts`
**Status**: ⏳ Pending
**Estimated Time**: 10 minutes

**Details**:
- Locate lines 1340-1349 in `searchSimilar()` method
- Current code checks for `documentProcessor` availability
- Remove or modify these checks since search no longer needs client-side processor
- Keep initialization check (`!this.isInitialized`)
- Remove checks for:
  - `downloadStatus === 'downloading'`
  - `downloadStatus === 'error'`
  - `!this.documentProcessor`
  - `!this._processorAvailable`
- Add new check for query validity (length, content)
- Update error messages to reflect architecture

**Current Code (Lines 1336-1349)**:
```typescript
if (!this.isInitialized) {
  throw new Error('Vector Store not initialized');
}

// Enhanced ready state management for search
const downloadStatus = this._downloadStatus;

if (downloadStatus === 'downloading') {
  throw new Error('AI models are still downloading in the background. Search will be available shortly.');
} else if (downloadStatus === 'error') {
  throw new Error('AI model download failed. Semantic search requires AI processing capabilities.');
} else if (!this.documentProcessor || !this._processorAvailable) {
  throw new Error('Search is unavailable. Please refresh the page and try again.');
}
```

**New Code**:
```typescript
if (!this.isInitialized) {
  throw new Error('Vector Store not initialized');
}

// Validate query
if (!query || query.trim().length < 2) {
  throw new Error('Search query must be at least 2 characters long');
}

if (query.length > 1000) {
  console.warn('Query exceeds 1000 characters, truncating...');
  query = query.substring(0, 1000);
}
```

**Acceptance Criteria**:
- [ ] Removed all `documentProcessor` checks from search
- [ ] Added query validation
- [ ] Error messages updated
- [ ] No TypeScript errors
- [ ] Search no longer depends on client-side model status

---

## Phase 3: Testing and Validation

### Task 3.1: Manual Integration Testing
**Status**: ⏳ Pending
**Estimated Time**: 45 minutes

**Test Cases**:

1. **Upload and Search Flow (KB Manager)**
   - [ ] Upload a PDF document
   - [ ] Verify document stored in IndexedDB
   - [ ] Verify embeddings stored in vectors array
   - [ ] Perform search for content in document
   - [ ] Verify search returns relevant chunks
   - [ ] Check console logs for server-side embedding generation

2. **AI Flow Builder Integration** ⭐ PRIMARY CONCERN
   - [ ] Upload a document (e.g., "ddp learning plan")
   - [ ] Go to AI Frames page
   - [ ] Click "Flow Builder" button
   - [ ] Enter a query (e.g., "create learning plan for ddp")
   - [ ] Verify: "Building knowledge context..." appears
   - [ ] Verify: NO ERROR "Knowledge Base returned no relevant chunks"
   - [ ] Verify: Context found and frames generated
   - [ ] Check console for: `🔍 Hybrid Search` logs
   - [ ] Check console for: Server-side embedding API calls
   - [ ] Verify final AI Frames created successfully

3. **Agent Systems (RAG Tools)**
   - [ ] Trigger agent-based research (if applicable)
   - [ ] Verify agents can query KB
   - [ ] Check console for RAG query logs
   - [ ] Verify no "Search unavailable" errors

4. **Search Variations**
   - [ ] Short query (2-3 words)
   - [ ] Long query (50+ words)
   - [ ] Query with special characters
   - [ ] Query in different language
   - [ ] Multiple searches in rapid succession
   - [ ] Verify each returns appropriate results

5. **Document Type Filtering**
   - [ ] Upload documents of different types
   - [ ] Search with documentTypes filter
   - [ ] Verify only matching types returned

6. **Error Handling**
   - [ ] Search with empty query → expect error
   - [ ] Search with very long query → expect truncation or error
   - [ ] Disconnect network → perform search → expect error message
   - [ ] Verify error messages are user-friendly

7. **Performance**
   - [ ] Measure search time (query → results)
   - [ ] Should complete in < 2 seconds for typical case
   - [ ] Check network tab for API call timing
   - [ ] Verify no unnecessary API calls

**Testing Procedure**:
```
1. Clear browser cache and IndexedDB
2. Refresh page
3. Upload test document (e.g., PDF with known content)
4. Wait for upload completion
5. Open DevTools console and network tab
6. Perform search query
7. Verify:
   - API call to /api/kb/embed-query
   - Response contains embedding array
   - Search results displayed
   - Console shows timing logs
   - Results are semantically relevant
```

**Acceptance Criteria**:
- [ ] All test cases pass
- [ ] No console errors
- [ ] Search completes successfully
- [ ] Results are semantically relevant
- [ ] Performance is acceptable
- [ ] Error handling works as expected

---

### Task 3.2: Browser Console Verification
**Status**: ⏳ Pending
**Estimated Time**: 10 minutes

**Details**:
- Open browser DevTools
- Navigate to Application tab → IndexedDB
- Verify document structure includes vectors array
- Perform search and monitor Console tab
- Verify logs show:
  - RAG query start
  - Server-side embedding generation
  - Embedding generation time
  - Document retrieval
  - Similarity calculations
  - Results count and ranking

**Expected Console Output**:
```
🔍 RAG Query <id>: Searching for "test query" with threshold: 0.3
🧠 Generated query embedding via server in 245ms
📚 RAG Query <id>: Retrieved all 3 documents
✅ RAG Query <id>: Found 5 results in 280ms
```

**Acceptance Criteria**:
- [ ] Logs show server-side embedding generation
- [ ] Timing logs present
- [ ] No error messages
- [ ] Document vectors visible in IndexedDB
- [ ] RAG tracking logs complete

---

### Task 3.3: Edge Case Testing
**Status**: ⏳ Pending
**Estimated Time**: 20 minutes

**Test Scenarios**:

1. **Network Failures**
   - [ ] Disconnect network during search
   - [ ] Slow network (throttle to 3G)
   - [ ] Server error (simulate 500 response)
   - [ ] Timeout (query takes >10 seconds)
   - Verify graceful error messages

2. **Empty/Invalid States**
   - [ ] Search with no documents uploaded
   - [ ] Search with documents but no embeddings
   - [ ] Search immediately after upload (race condition)

3. **Concurrent Operations**
   - [ ] Trigger 3 searches simultaneously
   - [ ] Upload document while search in progress
   - [ ] Multiple tabs searching same query

4. **Data Integrity**
   - [ ] Verify embedding dimensions (384)
   - [ ] Verify similarity scores in range [0, 1]
   - [ ] Verify chunk IDs match between chunks and vectors
   - [ ] Cross-check results with document content

**Acceptance Criteria**:
- [ ] All edge cases handled gracefully
- [ ] No crashes or unhandled errors
- [ ] User-friendly error messages
- [ ] System remains stable
- [ ] Data integrity maintained

---

## Phase 4: Cleanup and Documentation

### Task 4.1: Code Cleanup
**Status**: ⏳ Pending
**Estimated Time**: 15 minutes

**Details**:
- Remove unused imports related to client-side embedding
- Clean up commented code
- Ensure consistent error handling patterns
- Verify all console.log statements are meaningful
- Check for TypeScript any types and replace with proper types
- Ensure code follows project style guidelines

**Files to Review**:
- `/src/components/VectorStore/VectorStore.ts`
- `/src/app/api/kb/embed-query/route.ts`
- `/src/lib/server/embedding.ts` (verify no changes needed)

**Acceptance Criteria**:
- [ ] No unused imports
- [ ] No commented code
- [ ] Consistent error handling
- [ ] Proper TypeScript types
- [ ] Code passes linter

---

### Task 4.2: Update Architecture Memory
**Status**: ⏳ Pending
**Estimated Time**: 5 minutes

**Details**:
- Document in AI memory that:
  - ALL embeddings are ALWAYS server-side (documents and queries)
  - KB storage is ALWAYS client-side (IndexedDB)
  - Vector search is ALWAYS client-side (local comparison)
  - Server ONLY provides embedding generation service

**Acceptance Criteria**:
- [ ] Architecture principles stored in AI memory
- [ ] No future confusion about embedding location

---

### Task 4.3: Final Verification
**Status**: ⏳ Pending
**Estimated Time**: 10 minutes

**Details**:
- Run through complete user flow:
  1. Upload document
  2. Verify storage in IndexedDB
  3. Perform search
  4. Verify results
  5. Test with different document types
- Check for any regressions in existing functionality
- Verify RAG tracking dashboard (if exists)
- Test in both development and production builds

**Acceptance Criteria**:
- [ ] Complete user flow works end-to-end
- [ ] No regressions in existing features
- [ ] Production build works (if tested)
- [ ] All acceptance criteria from previous tasks met

---

## Summary Checklist

### Phase 1: Server API
- [ ] Task 1.1: Create API endpoint
- [ ] Task 1.2: Test API endpoint

### Phase 2: Client Integration
- [ ] Task 2.1: Add generateQueryEmbedding method
- [ ] Task 2.2: Modify searchSimilar method
- [ ] Task 2.3: Remove client-side processor checks

### Phase 3: Testing
- [ ] Task 3.1: Manual integration testing
- [ ] Task 3.2: Browser console verification
- [ ] Task 3.3: Edge case testing

### Phase 4: Finalization
- [ ] Task 4.1: Code cleanup
- [ ] Task 4.2: Update architecture memory
- [ ] Task 4.3: Final verification

---

## Risk Assessment

**High Risk**:
- Network reliability for embedding generation
  - Mitigation: Clear error messages, retry logic if needed

**Medium Risk**:
- Performance impact of network round-trip
  - Mitigation: Monitor and optimize, consider caching in future

**Low Risk**:
- Breaking existing functionality
  - Mitigation: Comprehensive testing, clear rollback plan

---

## Rollback Procedure

If critical issues found:
1. Revert `/src/components/VectorStore/VectorStore.ts` changes
2. Delete `/src/app/api/kb/embed-query/route.ts`
3. Document issues in this file
4. Create new issue with lessons learned

---

## Success Metrics

- [ ] Semantic search works without errors
- [ ] Search response time < 2 seconds (95th percentile)
- [ ] Zero client-side embedding model dependencies for search
- [ ] User-friendly error messages for all failure modes
- [ ] No regressions in document upload
- [ ] Console logs clearly show server-side architecture

---

## Notes

- Maintain backward compatibility where possible
- Focus on user experience (clear errors, reasonable performance)
- Architecture consistency is priority (server-side embeddings always)
- Document any deviations from plan with rationale

---

**Last Updated**: 2025-11-18
**Next Review**: After Phase 2 completion


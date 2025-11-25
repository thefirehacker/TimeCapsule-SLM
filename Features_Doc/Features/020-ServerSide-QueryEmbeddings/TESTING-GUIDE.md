# Testing Guide: Server-Side Query Embeddings

## Status: Implementation Complete ✅
**Dev Server:** Running at http://localhost:3000
**API Endpoint:** `/api/kb/embed-query` ✅ Tested and working

---

## What Was Changed

### 1. New API Endpoint
- **File:** `/src/app/api/kb/embed-query/route.ts`
- **Purpose:** Generate embeddings for search queries on the server
- **Status:** ✅ Working (validated with curl)

### 2. VectorStore Modifications
- **File:** `/src/components/VectorStore/VectorStore.ts`
- **Changes:**
  - Added `generateQueryEmbedding()` private method (line 1331)
  - Modified `searchSimilar()` to use server-side embeddings (line 1418)
  - Removed client-side processor checks (lines 1389-1398)
  - Added query validation (length checks)

### 3. Architecture Update
- All embeddings now generated server-side
- KB data remains client-side (IndexedDB)
- Vector search remains client-side (local comparison)

---

## Manual Testing Required

### Test 1: Upload Document ✅ (Should already work)
1. Go to http://localhost:3000
2. Open Knowledge Base Manager
3. Upload a PDF or text document
4. ✅ Verify document appears in list
5. ✅ Check console for "Server processed" message
6. ✅ Open DevTools → Application → IndexedDB → Check document has vectors array

### Test 2: KB Semantic Search 🔍 (PRIMARY TEST)
1. In Knowledge Base Manager, enter a search query (e.g., "ddp" or any content from your uploaded doc)
2. Click Search button
3. **Expected Console Logs:**
   ```
   🔍 RAG Query <id>: Searching for "ddp" with threshold: 0.3
   🧠 Generated query embedding via server in <X>ms
   📚 RAG Query <id>: Retrieved all X documents
   ✅ RAG Query <id>: Found X results in <Y>ms
   ```
4. **Expected Results:**
   - Search completes successfully
   - Relevant chunks returned
   - No error messages
5. **Check Network Tab:**
   - Should see POST request to `/api/kb/embed-query`
   - Response should contain embedding array

### Test 3: AI Flow Builder 🎯 (YOUR ORIGINAL ISSUE)
1. Make sure you have a document uploaded (e.g., "ddp learning plan")
2. Go to AI Frames page (http://localhost:3000/ai-frames)
3. Click **"Flow Builder"** button
4. Enter a query: "create learning plan for ddp"
5. **Expected Console Logs:**
   ```
   🔍 Hybrid Search: "create learning plan for ddp" (semantic: 0.75, keyword: 0.25)
   🔍 RAG Query <id>: Searching for "..." with threshold: X
   🧠 Generated query embedding via server in <X>ms
   📚 RAG Query <id>: Retrieved all X documents
   ✅ Hybrid Search: X results (from Y semantic + Z keyword)
   ```
6. **Expected Behavior:**
   - "Building knowledge context..." appears
   - **NO ERROR** "Knowledge Base returned no relevant chunks"
   - Context found and displayed
   - AI Frames generation proceeds
7. **Check Network Tab:**
   - Should see POST to `/api/kb/embed-query`
   - Response with embedding array

---

## Error Scenarios to Test

### Test 4: Empty Query
1. Try searching with empty text
2. **Expected:** Error message "Search query must be at least 2 characters long"

### Test 5: Very Short Query
1. Try searching with 1 character (e.g., "a")
2. **Expected:** Error message "Search query must be at least 2 characters long"

### Test 6: Network Failure Simulation
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Try searching
4. **Expected:** User-friendly error "Unable to connect to embedding service"
5. Re-enable network

---

## Success Criteria Checklist

- [ ] Document upload still works (no regression)
- [ ] KB semantic search works without errors
- [ ] **AI Flow Builder works** (no "no relevant chunks" error)
- [ ] Console shows "Generated query embedding via server"
- [ ] Network tab shows `/api/kb/embed-query` API calls
- [ ] Search results are semantically relevant
- [ ] Empty query shows validation error
- [ ] Network failure shows user-friendly error
- [ ] Search completes in < 2 seconds typically

---

## What to Look For

### ✅ Good Signs
- Console log: "🧠 Generated query embedding via server in Xms"
- Network request to `/api/kb/embed-query` with 200 status
- Search results returned
- AI Flow Builder successfully builds context
- No "Search unavailable" errors
- No "documentProcessor" errors

### ❌ Bad Signs
- Error: "Search is unavailable"
- Error: "documentProcessor is not defined"
- Error: "Knowledge Base returned no relevant chunks" (in Flow Builder)
- Network request fails (500 error)
- No results when there should be matches
- Console errors about embeddings

---

## Troubleshooting

### If Search Fails
1. Check console for error messages
2. Check Network tab for `/api/kb/embed-query` request
   - Status: Should be 200
   - Response: Should have `embedding` array
3. Check server logs for embedding generation errors
4. Verify documents exist in IndexedDB with vectors

### If AI Flow Builder Fails
1. Verify KB search works first (Test 2)
2. Check console for hybrid search logs
3. Ensure documents are actually uploaded
4. Check documentTypes filter in request

### If API Fails
1. Verify dev server is running
2. Check server console for errors
3. Test API directly with curl:
   ```bash
   curl -X POST http://localhost:3000/api/kb/embed-query \
     -H "Content-Type: application/json" \
     -d '{"query":"test"}'
   ```
4. Check for WASM/embedding model issues in server logs

---

## Reporting Results

Please test and report back with:

1. **Test 2 Result** (KB Semantic Search): ✅ or ❌
   - If ❌, paste console error
   
2. **Test 3 Result** (AI Flow Builder): ✅ or ❌
   - If ❌, paste console error
   
3. **Screenshots** (if possible):
   - Console logs showing server-side embedding
   - Network tab showing API call
   - AI Flow Builder working (or error message)

4. **Performance:**
   - Typical search time: ___ ms
   - API response time: ___ ms

---

## Next Steps After Testing

- **If all tests pass:** Mark implementation complete, close Issue-020
- **If tests fail:** Debug based on error messages, iterate on fixes
- **If performance poor:** Consider optimizations (caching, batch processing)

---

**Last Updated:** 2025-11-18
**Implementation Status:** Complete - Awaiting User Testing
**Critical Test:** AI Flow Builder (Test 3)


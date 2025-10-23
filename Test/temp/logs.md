# before refresh :attaching the chapter to frame

useUnifiedStorage.ts:351 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 0, nodeCount: 2, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 11-wejufiqfne
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (:3000/index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:385:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:385
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:864
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:150
setTimeout
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:148
triggerNodeChanges @ index.js:5054
updateNodePositions @ index.js:5042
eval @ index.js:2246
call @ dispatch.js:61
gesture @ drag.js:159
mouseupped @ drag.js:89
eval @ on.js:7
VectorStore.ts:1517 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761216060253-0jwifn3lc (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 12-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1761216060253-0jwifn3lc, Rev: 12-wejufiqfne)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 11-wejufiqfne
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 12-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 12-wejufiqfne)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:387 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-23T14:25:45.185Z'}
EnhancedLearningGraph.tsx:1099 🎯 Node drop detected - chapter added, triggering delayed unified save
useUnifiedStorage.ts:276 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 12-wejufiqfne
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (:3000/index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:304:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:304
useUnifiedStorage.useEffect.handleForceSaveEvent @ useUnifiedStorage.ts:940
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1111
setTimeout
EnhancedLearningGraph.useCallback[onDrop] @ EnhancedLearningGraph.tsx:1102
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:1517 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761216060253-0jwifn3lc (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 13-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1761216060253-0jwifn3lc, Rev: 13-wejufiqfne)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 12-wejufiqfne
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 13-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 13-wejufiqfne)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:305 🔒 PRIORITY SAVE: Completed with result: {success: true}
useUnifiedStorage.ts:351 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 2, edgeCount: 1, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 13-wejufiqfne
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (:3000/index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:385:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:385
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:864
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:150
VectorStore.ts:1517 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761216060253-0jwifn3lc (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 14-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1761216060253-0jwifn3lc, Rev: 14-wejufiqfne)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 13-wejufiqfne
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 14-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 14-wejufiqfne)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:387 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-23T14:25:48.192Z'}
FrameGraphIntegration.tsx:856 🔗 ID GENERATION: Connection document ID created: {originalConnectionId: 'edge_node_1761229545517_ct7u8tcja_0_node_1761216239632_9tc79ki90_0_1761229548410_krl65rpz2', originalLength: 90, generatedDocId: 'conn-vjkgi9', generatedLength: 11, schemaCompliant: true}
FrameGraphIntegration.tsx:897 🔗 SCHEMA CHECK: Connection document structure before insertion: {hasId: true, idLength: 11, hasTitle: true, hasContent: true, hasMetadata: true, …}
useUnifiedStorage.ts:351 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 2, edgeCount: 2, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 14-wejufiqfne
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (:3000/index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:385:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:385
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphConnectionEvent @ useUnifiedStorage.ts:968
EnhancedLearningGraph.useCallback[onConnect] @ EnhancedLearningGraph.tsx:834
onConnectExtended @ index.js:2385
onPointerUp @ index.js:2505
VectorStore.ts:1517 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761216060253-0jwifn3lc (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1723 ✅ Document inserted: conn-vjkgi9
VectorStore.ts:2171 🔍 Verifying document persistence: conn-vjkgi9 (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
EnhancedLearningGraph.tsx:885 🎯 Connection created, triggering unified save with fresh state: {edgeId: 'edge_node_1761229545517_ct7u8tcja_0_node_1761216239632_9tc79ki90_0_1761229548410_krl65rpz2', source: 'node_1761229545517_ct7u8tcja_0', target: 'node_1761216239632_9tc79ki90_0', totalEdges: 3, isAttachment: false}
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 15-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1761216060253-0jwifn3lc, Rev: 15-wejufiqfne)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 14-wejufiqfne
VectorStore.ts:1581 📋 Retrieved latest revision for conn-vjkgi9: 1-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: Connection: New Chapter → f1 (ID: conn-vjkgi9, Rev: 1-wejufiqfne)
FrameGraphIntegration.tsx:910 ✅ Connection inserted successfully: {connectionId: 'edge_node_1761229545517_ct7u8tcja_0_node_1761216239632_9tc79ki90_0_1761229548410_krl65rpz2', documentId: 'conn-vjkgi9', idLength: 11}
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 15-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 15-wejufiqfne)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:387 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-23T14:25:48.723Z'}
useUnifiedStorage.ts:351 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 3, edgeCount: 3, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 15-wejufiqfne
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (:3000/index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:385:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:385
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:864
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:150
VectorStore.ts:1517 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761216060253-0jwifn3lc (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 16-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1761216060253-0jwifn3lc, Rev: 16-wejufiqfne)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 15-wejufiqfne
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 16-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 16-wejufiqfne)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:387 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-23T14:25:53.223Z'}
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
useUnifiedStorage.ts:351 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 3, edgeCount: 2, frameIds: Array(1), …}
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 16-wejufiqfne
unifiedStorage.ts:442 ⚠️ IndexedDB save failed: NotFoundError: Failed to execute 'transaction' on 'IDBDatabase': One of the specified object stores was not found.
    at UnifiedStorageManager.saveToIndexedDB (unifiedStorage.ts:431:30)
    at async Promise.allSettled (:3000/index 2)
    at async UnifiedStorageManager.saveAll (unifiedStorage.ts:77:23)
    at async useUnifiedStorage.useCallback[queueBackgroundSave] (useUnifiedStorage.ts:385:25)
overrideMethod @ hook.js:608
saveToIndexedDB @ unifiedStorage.ts:442
await in saveToIndexedDB
saveAll @ unifiedStorage.ts:80
useUnifiedStorage.useCallback[queueBackgroundSave] @ useUnifiedStorage.ts:385
await in useUnifiedStorage.useCallback[queueBackgroundSave]
useUnifiedStorage.useEffect.handleGraphElementChangedEvent @ useUnifiedStorage.ts:864
EnhancedLearningGraph.useCallback[handleNodesChange] @ EnhancedLearningGraph.tsx:150
VectorStore.ts:1517 📊 Synced frame AI-Frame: f1 to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-frame-1761216060253-0jwifn3lc (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-frame-1761216060253-0jwifn3lc: 17-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame: f1 (ID: aiframe-frame-1761216060253-0jwifn3lc, Rev: 17-wejufiqfne)
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 16-wejufiqfne
VectorStore.ts:1517 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2171 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2216 💾 Database flush completed
VectorStore.ts:1581 📋 Retrieved latest revision for aiframe-chapters: 17-wejufiqfne
VectorStore.ts:2184 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 17-wejufiqfne)
unifiedStorage.ts:90 ✅ Unified save completed successfully
useUnifiedStorage.ts:387 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-10-23T14:26:55.905Z'}
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332


# after refresh